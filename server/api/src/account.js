/* Accounts: sign in with a 6-digit code sent by email. No passwords.
   - POST   /auth/start   { email, lang }  → emails a code (always answers ok, so nobody can test which emails have accounts)
   - POST   /auth/verify  { email, code }  → { token, me }; creates the account on first sign-in
   - POST   /auth/logout  (Bearer token)   → ends this device's session
   - GET    /me           (Bearer token)   → { email, products, since }
   - DELETE /me           (Bearer token) { confirm: "DELETE" } → deletes the account, its sessions and synced progress
   Codes and session tokens are stored only as hashes. */
import { num, now, sha256, hmac, json, fail, body, randomToken, bearer } from "./util.js";
import { sendMail, loginEmail } from "./mail.js";

const CODE_MINUTES = 10, MAX_TRIES = 5;

export function cleanEmail(e) {
  e = String(e || "").trim().toLowerCase();
  return e.length <= 254 && /^[^\s@"<>(),;:\\[\]]{1,64}@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/.test(e) ? e : null;
}
function ipOf(req) { return req.headers.get("CF-Connecting-IP") || "local"; }
async function codeHashFor(env, email, code) { return [...await hmac(env.TOKEN_SECRET, "login:" + email + ":" + code)].map((b) => b.toString(16).padStart(2, "0")).join(""); }
async function hit(env, kind, key) { await env.DB.prepare("INSERT INTO auth_log (kind, key_hash, at) VALUES (?, ?, ?)").bind(kind, await sha256(key), now()).run(); }
async function hits(env, kind, key, secs) {
  const r = await env.DB.prepare("SELECT COUNT(*) AS n FROM auth_log WHERE kind = ? AND key_hash = ? AND at > ?").bind(kind, await sha256(key), now() - secs).first();
  return r.n;
}

async function start(req, env, H) {
  const b = await body(req); if (!b) return fail("bad_request", 400, H);
  const email = cleanEmail(b.email); if (!email) return fail("bad_email", 400, H);
  const ip = ipOf(req);
  if (await hits(env, "start-email", email, 3600) >= num(env.CODES_PER_EMAIL_HOUR, 5) || await hits(env, "start-ip", ip, 3600) >= num(env.CODES_PER_IP_HOUR, 20)) return fail("rate_limited", 429, H);
  await hit(env, "start-email", email); await hit(env, "start-ip", ip);
  const n = crypto.getRandomValues(new Uint32Array(1))[0] % 1000000, code = String(n).padStart(6, "0");
  await env.DB.prepare("INSERT INTO login_codes (email, code_hash, expires_at, tries) VALUES (?, ?, ?, 0) ON CONFLICT(email) DO UPDATE SET code_hash = excluded.code_hash, expires_at = excluded.expires_at, tries = 0")
    .bind(email, await codeHashFor(env, email, code), now() + CODE_MINUTES * 60).run();
  const sent = await sendMail(env, email, loginEmail(code, b.lang === "ar" ? "ar" : "en", CODE_MINUTES));
  if (!sent) return fail("mail_failed", 502, H);
  return json({ ok: true, minutes: CODE_MINUTES }, 200, H);
}

async function verify(req, env, H) {
  const b = await body(req); if (!b) return fail("bad_request", 400, H);
  const email = cleanEmail(b.email), code = String(b.code || "").replace(/\D/g, "");
  if (!email || code.length !== 6) return fail("bad_code", 400, H);
  if (await hits(env, "verify-ip", ipOf(req), 3600) >= num(env.VERIFY_PER_IP_HOUR, 60)) return fail("rate_limited", 429, H);
  await hit(env, "verify-ip", ipOf(req));
  const row = await env.DB.prepare("SELECT code_hash, expires_at, tries FROM login_codes WHERE email = ?").bind(email).first();
  if (!row || row.expires_at < now()) return fail("code_expired", 400, H);
  if (row.tries >= MAX_TRIES) return fail("too_many_tries", 400, H);
  await env.DB.prepare("UPDATE login_codes SET tries = tries + 1 WHERE email = ?").bind(email).run();
  if (row.code_hash !== await codeHashFor(env, email, code)) return fail("wrong_code", 400, H, { left: Math.max(0, MAX_TRIES - row.tries - 1) });
  // a code works once: delete it only if it's still the same one, so two parallel tries can't both pass
  const del = await env.DB.prepare("DELETE FROM login_codes WHERE email = ? AND code_hash = ?").bind(email, row.code_hash).run();
  if (!del.meta || del.meta.changes !== 1) return fail("code_expired", 400, H);
  await env.DB.prepare("INSERT OR IGNORE INTO users (email, created_at, lang) VALUES (?, ?, ?)").bind(email, now(), b.lang === "ar" ? "ar" : "en").run();
  const user = await env.DB.prepare("SELECT id, email, created_at FROM users WHERE email = ?").bind(email).first();
  const token = randomToken("ms_"), days = num(env.SESSION_DAYS, 180);
  await env.DB.prepare("INSERT INTO sessions (token_hash, user_id, created_at, expires_at, last_seen) VALUES (?, ?, ?, ?, ?)").bind(await sha256(token), user.id, now(), now() + days * 86400, now()).run();
  return json({ token: token, me: await meFor(env, user) }, 200, H);
}

// the signed-in user for a request, or null
export async function userFor(req, env) {
  const t = bearer(req); if (!t || !/^ms_[A-Za-z0-9_-]{40,60}$/.test(t)) return null;
  const h = await sha256(t);
  const row = await env.DB.prepare("SELECT u.id, u.email, u.created_at, s.last_seen FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token_hash = ? AND s.expires_at > ?").bind(h, now()).first();
  if (!row) return null;
  if (now() - row.last_seen > 3600) await env.DB.prepare("UPDATE sessions SET last_seen = ? WHERE token_hash = ?").bind(now(), h).run();
  row.token_hash = h;
  return row;
}

export async function productsFor(env, userId) {
  const r = await env.DB.prepare("SELECT product, MAX(COALESCE(expires_at, 9999999999)) AS until FROM entitlements WHERE user_id = ? AND revoked = 0 AND (expires_at IS NULL OR expires_at > ?) GROUP BY product").bind(userId, now()).all();
  return r.results.map((x) => ({ product: x.product, until: x.until >= 9999999999 ? null : x.until }));
}
async function meFor(env, user) { return { email: user.email, since: user.created_at, products: await productsFor(env, user.id) }; }

export async function accountRoute(req, env, H, path) {
  if (path === "/auth/start" && req.method === "POST") return start(req, env, H);
  if (path === "/auth/verify" && req.method === "POST") return verify(req, env, H);
  if (path === "/auth/logout" && req.method === "POST") {
    const u = await userFor(req, env); if (u) await env.DB.prepare("DELETE FROM sessions WHERE token_hash = ?").bind(u.token_hash).run();
    return json({ ok: true }, 200, H);
  }
  if (path === "/me" && req.method === "GET") {
    const u = await userFor(req, env); if (!u) return fail("signed_out", 401, H);
    return json(await meFor(env, u), 200, H);
  }
  if (path === "/me" && req.method === "DELETE") {
    const u = await userFor(req, env); if (!u) return fail("signed_out", 401, H);
    const b = await body(req); if (!b || b.confirm !== "DELETE") return fail("confirm_needed", 400, H);
    for (const sql of ["DELETE FROM progress WHERE user_id = ?", "DELETE FROM sessions WHERE user_id = ?", "UPDATE entitlements SET revoked = 1 WHERE user_id = ?", "DELETE FROM users WHERE id = ?"]) await env.DB.prepare(sql).bind(u.id).run();
    return json({ ok: true }, 200, H);
  }
  return null;
}

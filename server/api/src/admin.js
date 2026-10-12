/* Admin tools (Authorization: Bearer ADMIN_TOKEN), for manual sales, reviewers, refunds and testing.
   - POST /admin/grant  { email, product, days?, note? } → gives a product ("course:ielts", "subject:maths", "pass")
   - POST /admin/revoke { email, product }               → takes it back
   - GET  /admin/user?email=…                           → what an account owns */
import { num, now, json, fail, body, adminOk } from "./util.js";
import { cleanEmail, productsFor } from "./account.js";

export const PRODUCT_RE = /^(course:[a-z0-9-]{1,40}|subject:[a-z0-9-]{1,40}|pass)$/;

export async function adminRoute(req, env, H, path, url) {
  if (!/^\/admin\/(grant|revoke|user)$/.test(path)) return null;
  if (!adminOk(req, env)) return fail("forbidden", 403, H);
  if (path === "/admin/user" && req.method === "GET") {
    const email = cleanEmail(url.searchParams.get("email")); if (!email) return fail("bad_email", 400, H);
    const u = await env.DB.prepare("SELECT id, email, created_at FROM users WHERE email = ?").bind(email).first();
    if (!u) return fail("no_user", 404, H);
    return json({ email: u.email, since: u.created_at, products: await productsFor(env, u.id) }, 200, H);
  }
  if (req.method !== "POST") return fail("not_found", 404, H);
  const b = await body(req); if (!b) return fail("bad_request", 400, H);
  const email = cleanEmail(b.email), product = String(b.product || "");
  if (!email) return fail("bad_email", 400, H);
  if (!PRODUCT_RE.test(product)) return fail("bad_product", 400, H);
  if (path === "/admin/grant") {
    await env.DB.prepare("INSERT OR IGNORE INTO users (email, created_at, lang) VALUES (?, ?, 'en')").bind(email, now()).run();
    const u = await env.DB.prepare("SELECT id FROM users WHERE email = ?").bind(email).first();
    const days = b.days == null ? null : Math.max(1, Math.min(3650, num(b.days, 365)));
    await env.DB.prepare("INSERT INTO entitlements (user_id, product, source, ref, created_at, expires_at, revoked) VALUES (?, ?, 'admin', ?, ?, ?, 0)")
      .bind(u.id, product, String(b.note || "").slice(0, 80), now(), days ? now() + days * 86400 : null).run();
    return json({ ok: true, email: email, products: await productsFor(env, u.id) }, 200, H);
  }
  const u = await env.DB.prepare("SELECT id FROM users WHERE email = ?").bind(email).first();
  if (!u) return fail("no_user", 404, H);
  await env.DB.prepare("UPDATE entitlements SET revoked = 1 WHERE user_id = ? AND product = ?").bind(u.id, product).run();
  return json({ ok: true, email: email, products: await productsFor(env, u.id) }, 200, H);
}

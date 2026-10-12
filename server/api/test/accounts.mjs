import worker from "../src/index.js";
import { outbox } from "../src/mail.js";
import { makeD1, makeR2, installFetch, env as mkEnv } from "./shim.mjs";
installFetch();
const db = makeD1(), R2 = makeR2({ "courses/ielts.json": JSON.stringify({ id: "ielts", version: "v1", unlock: ["course:ielts", "pass"], lessons: [{ id: "read-full", steps: [{ t: "text" }] }] }) });
const E = mkEnv(db, { CONTENT: R2 });
let pass = 0, failN = 0;
function ok(c, m) { if (c) pass++; else { failN++; console.log("  ✕", m); } }
const O = "https://masarok.org";
async function call(path, { method = "GET", body, token, origin = O, ip = "1.1.1.1", env = E } = {}) {
  const h = { "Content-Type": "application/json", "CF-Connecting-IP": ip }; if (origin) h.Origin = origin; if (token) h.Authorization = "Bearer " + token;
  const r = await worker.fetch(new Request("https://api.example" + path, { method, headers: h, body: body ? JSON.stringify(body) : undefined }), env);
  let j = null; try { j = await r.json(); } catch (e) {}
  return { s: r.status, j };
}
const lastCode = () => outbox.at(-1).text.match(/\b\d{6}\b/)[0];
async function signIn(email, ip) {
  await call("/auth/start", { method: "POST", body: { email }, ip });
  const r = await call("/auth/verify", { method: "POST", body: { email, code: lastCode() }, ip });
  return r.j.token;
}

// start
let r = await call("/auth/start", { method: "POST", body: { email: "not an email" } }); ok(r.s === 400 && r.j.error === "bad_email", "bad email");
r = await call("/auth/start", { method: "POST", body: { email: "  Sara@Example.COM ", lang: "ar" } }); ok(r.s === 200 && r.j.ok, "code sent");
let mail = outbox.at(-1);
ok(mail.to === "sara@example.com" && /رمز الدخول/.test(mail.subject) && /\b\d{6}\b/.test(mail.text), "arabic email with code");
ok(!JSON.stringify(db._db.prepare("SELECT * FROM login_codes").all()).includes(lastCode()), "code not stored in plain text");
// verify
const code = lastCode(), wrong = code === "000000" ? "111111" : "000000";
r = await call("/auth/verify", { method: "POST", body: { email: "sara@example.com", code: wrong } }); ok(r.s === 400 && r.j.error === "wrong_code" && r.j.left === 4, "wrong code counts tries");
r = await call("/auth/verify", { method: "POST", body: { email: "SARA@example.com", code: code.slice(0, 3) + " " + code.slice(3) } });
ok(r.s === 200 && /^ms_[A-Za-z0-9_-]{43}$/.test(r.j.token) && r.j.me.email === "sara@example.com" && r.j.me.products.length === 0, "sign in works with spaces and capitals");
const tok = r.j.token;
r = await call("/auth/verify", { method: "POST", body: { email: "sara@example.com", code } }); ok(r.s === 400 && r.j.error === "code_expired", "code works only once");
ok(!JSON.stringify(db._db.prepare("SELECT * FROM sessions").all()).includes(tok.slice(3)), "token not stored in plain text");
// five wrong tries lock the code
await call("/auth/start", { method: "POST", body: { email: "ali@example.com" } }); const ali = lastCode(), bad = ali === "123456" ? "654321" : "123456";
for (let i = 0; i < 5; i++) await call("/auth/verify", { method: "POST", body: { email: "ali@example.com", code: bad } });
r = await call("/auth/verify", { method: "POST", body: { email: "ali@example.com", code: ali } }); ok(r.s === 400 && r.j.error === "too_many_tries", "locked after 5 wrong tries");
// expired code
await call("/auth/start", { method: "POST", body: { email: "old@example.com" } }); const oldc = lastCode();
db._db.prepare("UPDATE login_codes SET expires_at = 1 WHERE email = 'old@example.com'").run();
r = await call("/auth/verify", { method: "POST", body: { email: "old@example.com", code: oldc } }); ok(r.s === 400 && r.j.error === "code_expired", "expired code");
// rate limits
for (let i = 0; i < 5; i++) await call("/auth/start", { method: "POST", body: { email: "spam@example.com" }, ip: "2.2.2." + i });
r = await call("/auth/start", { method: "POST", body: { email: "spam@example.com" }, ip: "2.2.2.9" }); ok(r.s === 429, "5 codes per email per hour");
for (let i = 0; i < 20; i++) await call("/auth/start", { method: "POST", body: { email: "x" + i + "@example.com" }, ip: "3.3.3.3" });
r = await call("/auth/start", { method: "POST", body: { email: "y@example.com" }, ip: "3.3.3.3" }); ok(r.s === 429, "20 codes per IP per hour");
// me
r = await call("/me"); ok(r.s === 401 && r.j.error === "signed_out", "me needs sign-in");
r = await call("/me", { token: "ms_" + "a".repeat(43) }); ok(r.s === 401, "unknown token");
r = await call("/me", { token: tok }); ok(r.s === 200 && r.j.email === "sara@example.com", "me works");
// paid bundle
r = await call("/course/ielts"); ok(r.s === 401, "bundle needs sign-in");
r = await call("/course/ielts", { token: tok }); ok(r.s === 403 && r.j.error === "not_owned" && r.j.unlock.includes("pass"), "bundle needs a purchase");
r = await call("/admin/grant", { method: "POST", body: { email: "sara@example.com", product: "course:ielts" } }); ok(r.s === 403, "admin needs token");
const admin = "local-admin-token-123456";
r = await call("/admin/grant", { method: "POST", token: admin, body: { email: "sara@example.com", product: "hack" } }); ok(r.s === 400 && r.j.error === "bad_product", "bad product");
r = await call("/admin/grant", { method: "POST", token: admin, body: { email: "sara@example.com", product: "course:ielts", note: "pilot" } }); ok(r.s === 200 && r.j.products[0].product === "course:ielts" && r.j.products[0].until === null, "grant");
r = await call("/course/ielts", { token: tok }); ok(r.s === 200 && r.j.lessons[0].id === "read-full" && r.j.version === "v1", "owner gets bundle");
r = await call("/course/ielts?v=v1", { token: tok }); ok(r.s === 200 && r.j.same === true && !r.j.lessons, "same version not resent");
r = await call("/course/nope", { token: tok }); ok(r.s === 404, "unknown course");
r = await call("/course/../x", { token: tok }); ok(r.s === 404, "bad course id");
r = await call("/admin/revoke", { method: "POST", token: admin, body: { email: "sara@example.com", product: "course:ielts" } }); ok(r.s === 200 && r.j.products.length === 0, "revoke");
r = await call("/course/ielts", { token: tok }); ok(r.s === 403, "revoked loses access");
r = await call("/admin/grant", { method: "POST", token: admin, body: { email: "sara@example.com", product: "pass", days: 180 } }); ok(r.s === 200 && r.j.products[0].until > Date.now() / 1000 + 179 * 86400, "pass with expiry");
r = await call("/course/ielts", { token: tok }); ok(r.s === 200, "pass unlocks the course");
db._db.prepare("UPDATE entitlements SET expires_at = 5 WHERE product = 'pass'").run();
r = await call("/course/ielts", { token: tok }); ok(r.s === 403, "expired pass loses access");
r = await call("/admin/grant", { method: "POST", token: admin, body: { email: "new@example.com", product: "pass" } }); ok(r.s === 200, "grant before first sign-in");
const tokNew = await signIn("new@example.com", "4.4.4.4");
r = await call("/me", { token: tokNew }); ok(r.j.products[0].product === "pass", "purchase waits for the account");
r = await call("/admin/user?email=new@example.com", { token: admin }); ok(r.s === 200 && r.j.products.length === 1, "admin user lookup");
// progress
r = await call("/progress", { token: tok }); ok(r.s === 200 && Object.keys(r.j.items).length === 0, "empty progress");
r = await call("/progress", { method: "PUT", token: tok, body: { items: { "masarok-academy": '{"lessons":{"tfng":{"done":true}}}', "masarok-country": "uk" } } });
ok(r.s === 200 && r.j.t["masarok-academy"] > 0, "progress saved");
r = await call("/progress", { token: tok }); ok(r.j.items["masarok-country"].v === "uk" && r.j.items["masarok-academy"].t > 0, "progress read back");
{ const t0 = (await call("/progress", { token: tok })).j.items["masarok-academy"].t;
  r = await call("/progress", { method: "PUT", token: tok, body: { items: { "masarok-academy": "A2", "masarok-game": "G" }, base: { "masarok-academy": t0, "masarok-game": null } } });
  ok(r.s === 200 && r.j.conflicts.length === 0 && r.j.t["masarok-academy"] > 0, "save with matching base");
  r = await call("/progress", { method: "PUT", token: tok, body: { items: { "masarok-academy": "stale", "masarok-game": "G2", "masarok-level": "phd" }, base: { "masarok-academy": t0, "masarok-game": null } } });
  ok(r.j.conflicts.sort().join() === "masarok-academy,masarok-game" && r.j.t["masarok-level"] > 0, "stale base reported as conflicts");
  r = await call("/progress", { token: tok }); ok(r.j.items["masarok-academy"].v === "A2" && r.j.items["masarok-game"].v === "G", "conflicting saves not applied"); }
r = await call("/progress", { method: "PUT", token: tok, body: { items: { "masarok-session": "x" } } }); ok(r.s === 400 && r.j.error === "bad_key", "session key never synced");
r = await call("/progress", { method: "PUT", token: tok, body: { items: { "other-key": "x" } } }); ok(r.s === 400, "only masarok keys");
r = await call("/progress", { method: "PUT", token: tok, body: { items: { "masarok-big": "x".repeat(262145) } } }); ok(r.s === 413, "key size limit");
r = await call("/progress", { method: "PUT", token: tok, body: { items: { "masarok-country": null } } }); ok(r.s === 200, "delete a key");
r = await call("/progress", { token: tok }); ok(!r.j.items["masarok-country"], "key deleted");
r = await call("/progress", { token: tokNew }); ok(Object.keys(r.j.items).length === 0, "other students see nothing");
// sign out and delete
r = await call("/auth/logout", { method: "POST", token: tokNew }); ok(r.s === 200, "logout");
r = await call("/me", { token: tokNew }); ok(r.s === 401, "token dead after logout");
r = await call("/me", { method: "DELETE", token: tok, body: {} }); ok(r.s === 400 && r.j.error === "confirm_needed", "delete needs confirm");
r = await call("/me", { method: "DELETE", token: tok, body: { confirm: "DELETE" } }); ok(r.s === 200, "account deleted");
r = await call("/me", { token: tok }); ok(r.s === 401, "deleted account signed out");
ok(db._db.prepare("SELECT COUNT(*) n FROM progress").get().n === 0 && db._db.prepare("SELECT COUNT(*) n FROM users WHERE email='sara@example.com'").get().n === 0, "data removed");
// CORS allows PUT and DELETE
const pre = await worker.fetch(new Request("https://api.example/progress", { method: "OPTIONS", headers: { Origin: O } }), E);
ok(/PUT/.test(pre.headers.get("Access-Control-Allow-Methods")) && /DELETE/.test(pre.headers.get("Access-Control-Allow-Methods")), "preflight allows PUT and DELETE");
// no mail settings → clear error, not a silent success
const E2 = mkEnv(makeD1(), { MAIL_MODE: "", RESEND_API_KEY: "" });
r = await call("/auth/start", { method: "POST", body: { email: "z@example.com" }, env: E2 }); ok(r.s === 502 && r.j.error === "mail_failed", "missing mail settings reported");

console.log(failN ? `${failN} of ${pass + failN} account checks failed` : `All ${pass} account checks passed`);
if (failN) process.exit(1);

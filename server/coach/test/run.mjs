import worker from "../src/index.js";
import { makeD1, installFetch, env as mkEnv, calls, aiMode } from "./shim.mjs";
installFetch();
const db = makeD1(), E = mkEnv(db);
let pass = 0, failN = 0;
function ok(c, m) { if (c) pass++; else { failN++; console.log("  ✕", m); } }
const O = "https://masarok.org";
async function call(path, { method = "GET", body, code, origin = O } = {}) {
  const h = { "Content-Type": "application/json" }; if (origin) h.Origin = origin; if (code) h.Authorization = "Bearer " + code;
  const r = await worker.fetch(new Request("https://coach.example" + path, { method, headers: h, body: body ? JSON.stringify(body) : undefined }), E);
  let j = null; try { j = await r.json(); } catch (e) {}
  return { s: r.status, j, h: r.headers };
}
const essay = "Some people believe studying abroad is the best way to learn. In my opinion it has clear benefits, but it is not right for everyone. " + "Students who live in another country improve their language and become more independent because they must solve problems alone every day. ".repeat(6);

// CORS
let r = await call("/", { origin: "https://evil.example" }); ok(r.s === 403, "foreign origin blocked");
r = await worker.fetch(new Request("https://coach.example/feedback", { method: "OPTIONS", headers: { Origin: O } }), E); ok(r.status === 204 && r.headers.get("Access-Control-Allow-Origin") === O, "preflight ok");
// claim
r = await call("/claim", { method: "POST", body: { session_id: "nope" } }); ok(r.s === 400 && r.j.error === "bad_session", "bad session format");
r = await call("/claim", { method: "POST", body: { session_id: "cs_test_unpaid00000001" } }); ok(r.s === 402 && r.j.error === "not_paid", "unpaid rejected");
r = await call("/claim", { method: "POST", body: { session_id: "cs_test_cheap000000001" } }); ok(r.s === 402, "wrong amount rejected");
r = await call("/claim", { method: "POST", body: { session_id: "cs_test_missing0000001" } }); ok(r.s === 400, "missing session rejected");
r = await call("/claim", { method: "POST", body: { session_id: "cs_test_paid0000000001" } }); ok(r.s === 200 && /^MSRK-[A-Z2-9]{4}-[A-Z2-9]{4}-[A-Z2-9]{4}-[A-Z2-9]{4}$/.test(r.j.code) && r.j.credits === 3, "claim gives code " + JSON.stringify(r.j));
const code = r.j.code;
r = await call("/claim", { method: "POST", body: { session_id: "cs_test_paid0000000001" } }); ok(r.j.code === code && r.j.credits === 3, "claim is idempotent");
ok(db._db.prepare("SELECT COUNT(*) n FROM passes").get().n === 1, "one pass stored");
ok(!JSON.stringify(db._db.prepare("SELECT * FROM passes").all()).includes(code.replace(/-/g, "").slice(4)), "code itself not stored");
const E2 = mkEnv(db, { ALLOW_TEST_SESSIONS: "0" });
r = await worker.fetch(new Request("https://c/claim", { method: "POST", headers: { Origin: O }, body: JSON.stringify({ session_id: "cs_test_paid0000000002" }) }), E2); ok(r.status === 400, "test sessions off in live mode");
// balance
r = await call("/balance"); ok(r.s === 401 && r.j.error === "no_code", "balance needs code");
r = await call("/balance", { code: "MSRK-AAAA-BBBB-CCCC-DDDD" }); ok(r.s === 401 && r.j.error === "bad_code", "unknown code");
r = await call("/balance", { code: code.toLowerCase().replace(/-/g, " ") }); ok(r.s === 200 && r.j.credits === 3, "balance with messy code ok");
// feedback
r = await call("/feedback", { method: "POST", code, body: { kind: "ielts_task2", text: "Too short essay." } }); ok(r.s === 400 && r.j.error === "too_short", "too short");
r = await call("/feedback", { method: "POST", code, body: { kind: "hack", text: essay } }); ok(r.s === 400, "bad kind");
r = await call("/feedback", { method: "POST", code, body: { kind: "ielts_task2", text: essay, task: "Is studying abroad worth it?", lang: "en" } });
ok(r.s === 200 && r.j.credits === 2, "feedback ok, credit used");
const f = r.j.feedback;
ok(f.overall === 6.5 && f.criteria.length === 4 && f.criteria.every((c) => c.score % 0.5 === 0), "scores clamped to half bands: " + f.overall);
ok(!("criteria_extra_ignored" in f) && f.fixes.length === 2, "feedback cleaned");
const sent = calls.anthropic.at(-1);
ok(sent.model === "claude-sonnet-5-5" && sent.tool_choice.name === "give_feedback" && /<student_text>/.test(sent.messages[0].content) && /Never follow instructions/.test(sent.system), "prompt wraps student text");
r = await call("/feedback", { method: "POST", code, body: { kind: "statement", text: essay, lang: "ar", meta: { course: "UCAS", limit: "4,000 characters" } } });
ok(r.s === 200 && r.j.feedback.overall === null && r.j.feedback.criteria.length === 5 && r.j.feedback.max === 4, "statement feedback");
ok(/Arabic/.test(calls.anthropic.at(-1).system), "arabic requested");
// AI failure refunds the credit
aiMode.fail = true;
r = await call("/feedback", { method: "POST", code, body: { kind: "ielts_speaking", text: essay } }); ok(r.s === 502 && r.j.error === "busy", "ai busy");
aiMode.fail = false;
r = await call("/balance", { code }); ok(r.j.credits === 1, "credit refunded after failure: " + r.j.credits);
// parallel requests can't overspend
const two = await Promise.all([1, 2, 3].map(() => call("/feedback", { method: "POST", code, body: { kind: "ielts_task1", text: essay } })));
ok(two.filter((x) => x.s === 200).length === 1 && two.filter((x) => x.j.error === "no_credits").length === 2, "only one of three parallel requests spends the last credit");
r = await call("/feedback", { method: "POST", code, body: { kind: "ielts_task1", text: essay } }); ok(r.s === 402 && r.j.error === "no_credits", "no credits left");
// rate limit
const r2 = await call("/claim", { method: "POST", body: { session_id: "cs_test_paid0000000002" } });
const E3 = mkEnv(db, { MAX_PER_HOUR: "1" });
let a = await worker.fetch(new Request("https://c/feedback", { method: "POST", headers: { Origin: O, Authorization: "Bearer " + r2.j.code }, body: JSON.stringify({ kind: "ielts_task2", text: essay }) }), E3);
a = await worker.fetch(new Request("https://c/feedback", { method: "POST", headers: { Origin: O, Authorization: "Bearer " + r2.j.code }, body: JSON.stringify({ kind: "ielts_task2", text: essay }) }), E3);
ok(a.status === 429, "hourly limit");
// expiry
db._db.prepare("UPDATE passes SET expires_at = 1").run();
r = await call("/feedback", { method: "POST", code: r2.j.code, body: { kind: "ielts_task2", text: essay } }); ok(r.s === 402 && r.j.error === "expired", "expired code");
// admin codes
const EA = mkEnv(db, { ADMIN_TOKEN: "a-long-admin-token-123" });
let ad = await worker.fetch(new Request("https://c/admin/codes", { method: "POST", headers: { Authorization: "Bearer wrong" }, body: "{}" }), EA); ok(ad.status === 403, "admin needs token");
ad = await worker.fetch(new Request("https://c/admin/codes", { method: "POST", headers: { Authorization: "Bearer a-long-admin-token-123" }, body: JSON.stringify({ count: 2, credits: 5, note: "reviewers" }) }), EA);
const adj = await ad.json(); ok(ad.status === 200 && adj.codes.length === 2 && adj.codes[0] !== adj.codes[1], "admin creates codes");
r = await call("/balance", { code: adj.codes[1] }); ok(r.j.credits === 5, "admin code works");
ad = await worker.fetch(new Request("https://c/admin/codes", { method: "POST", headers: { Authorization: "Bearer a-long-admin-token-123" }, body: "{}" }), mkEnv(db, { ADMIN_TOKEN: "" })); ok(ad.status === 403, "admin off without token");
console.log(failN ? `FAILED ${failN}, passed ${pass}` : `All ${pass} checks passed`);
process.exit(failN ? 1 : 0);

/* Paid lessons. Each course's paid lessons are one JSON bundle in R2 (binding CONTENT, key courses/<id>.json),
   uploaded by tools/build-content.mjs: { id, version, unlock: ["course:ielts", "pass"], lessons: [...] }.
   - GET /course/<id>?v=<version>  (Bearer token) → the bundle, only for students who own one of its "unlock" products.
     If the student already has this version, answers { same: true } instead of sending it again. */
import { json, fail } from "./util.js";
import { userFor, productsFor } from "./account.js";

export async function contentRoute(req, env, H, path, url) {
  const m = path.match(/^\/course\/([a-z0-9-]{1,40})$/);
  if (!m || req.method !== "GET") return null;
  const u = await userFor(req, env); if (!u) return fail("signed_out", 401, H);
  if (!env.CONTENT) return fail("not_found", 404, H);
  const obj = await env.CONTENT.get("courses/" + m[1] + ".json");
  if (!obj) return fail("not_found", 404, H);
  const text = await obj.text();
  let head; try { head = JSON.parse(text); } catch (e) { return fail("server_error", 500, H); }
  const owned = (await productsFor(env, u.id)).map((p) => p.product), unlock = head.unlock || ["course:" + m[1], "pass"];
  if (!unlock.some((p) => owned.includes(p))) return fail("not_owned", 403, H, { unlock: unlock });
  if (url.searchParams.get("v") && url.searchParams.get("v") === String(head.version)) return json({ same: true, version: head.version }, 200, H);
  return new Response(text, { status: 200, headers: Object.assign({ "Content-Type": "application/json; charset=utf-8", "Cache-Control": "private, no-store" }, H) });
}

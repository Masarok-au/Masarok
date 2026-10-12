/* Progress sync: the site's saved data (localStorage keys starting with masarok-) follows the student across devices.
   - GET /progress (Bearer token) → { items: { key: { v, t } }, now }
   - PUT /progress (Bearer token) { items: { key: value-or-null }, base?: { key: savedAt-or-null } } → { now, t: { key: savedAt }, conflicts: [key] }
     With "base", a key is saved only if the server still has that version (another device may have saved since);
     keys that changed meanwhile come back in "conflicts" and the browser merges them on its next full sync.
   The browser decides what changed and merges conflicts; the server stores each key with the time it saved it. */
import { num, now, json, fail, body } from "./util.js";
import { userFor } from "./account.js";

export const KEY_RE = /^masarok-[\w-]{1,60}$/;
// device settings and secrets never leave the device
export const NO_SYNC = ["masarok-ai-dev", "masarok-session", "masarok-sync", "masarok-me", "masarok-coach-speech", "masarok-map-at", "masarok-open", "masarok-reminder-seen"];

export async function progressRoute(req, env, H, path) {
  if (path !== "/progress") return null;
  const u = await userFor(req, env); if (!u) return fail("signed_out", 401, H);
  if (req.method === "GET") {
    const r = await env.DB.prepare("SELECT key, value, updated_at FROM progress WHERE user_id = ?").bind(u.id).all();
    const items = {}; r.results.forEach((x) => { items[x.key] = { v: x.value, t: x.updated_at }; });
    return json({ items: items, now: Date.now() }, 200, H);
  }
  if (req.method === "PUT") {
    const b = await body(req); if (!b || !b.items || typeof b.items !== "object") return fail("bad_request", 400, H);
    const keys = Object.keys(b.items), maxKey = num(env.SYNC_MAX_KEY_BYTES, 262144), maxAll = num(env.SYNC_MAX_BYTES, 2097152);
    if (keys.length > 100) return fail("too_many", 400, H);
    for (const k of keys) {
      const v = b.items[k];
      if (!KEY_RE.test(k) || NO_SYNC.includes(k) || (v !== null && typeof v !== "string")) return fail("bad_key", 400, H, { key: k });
      if (v && v.length > maxKey) return fail("too_big", 413, H, { key: k });
    }
    const cur = await env.DB.prepare("SELECT key, LENGTH(value) AS n, updated_at FROM progress WHERE user_id = ?").bind(u.id).all();
    const size = {}, at = {}; cur.results.forEach((x) => { size[x.key] = x.n; at[x.key] = x.updated_at; });
    const base = b.base && typeof b.base === "object" ? b.base : null, conflicts = [];
    if (base) for (let i = keys.length - 1; i >= 0; i--) { const k = keys[i]; if (k in base && (base[k] == null ? k in at : at[k] !== base[k])) { conflicts.push(k); keys.splice(i, 1); } }
    keys.forEach((k) => { size[k] = b.items[k] === null ? 0 : b.items[k].length; });
    if (Object.values(size).reduce((a, n) => a + n, 0) > maxAll) return fail("too_big", 413, H);
    const t = Date.now(), out = {};
    for (const k of keys) {
      if (b.items[k] === null) await env.DB.prepare("DELETE FROM progress WHERE user_id = ? AND key = ?").bind(u.id, k).run();
      else await env.DB.prepare("INSERT INTO progress (user_id, key, value, updated_at) VALUES (?, ?, ?, ?) ON CONFLICT(user_id, key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at").bind(u.id, k, b.items[k], t).run();
      out[k] = t;
    }
    return json({ now: t, t: out, conflicts: conflicts }, 200, H);
  }
  return fail("not_found", 404, H);
}

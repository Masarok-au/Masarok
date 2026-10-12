/* Masarok server · Cloudflare Worker
   Accounts (email codes), paid course bundles, progress sync, and the AI coach.
   Secrets: TOKEN_SECRET, ADMIN_TOKEN, RESEND_API_KEY, ANTHROPIC_API_KEY, STRIPE_SECRET_KEY.
   Bindings: DB (D1), CONTENT (R2). Settings: see wrangler.toml and README.md. */
import { cors, json, fail } from "./util.js";
import { claim, feedback, adminCodes, balance } from "./coach.js";
import { accountRoute } from "./account.js";
import { contentRoute } from "./content.js";
import { progressRoute } from "./progress.js";
import { adminRoute } from "./admin.js";

export default {
  async fetch(req, env) {
    const H = cors(req, env), url = new URL(req.url), path = url.pathname;
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: H });
    if (!H["Access-Control-Allow-Origin"] && req.headers.get("Origin")) return fail("forbidden", 403, H);
    try {
      if (path === "/claim" && req.method === "POST") return await claim(req, env, H);
      if (path === "/balance" && req.method === "GET") return await balance(req, env, H);
      if (path === "/feedback" && req.method === "POST") return await feedback(req, env, H);
      if (path === "/admin/codes" && req.method === "POST") return await adminCodes(req, env, H);
      const r = (await accountRoute(req, env, H, path)) || (await contentRoute(req, env, H, path, url)) || (await progressRoute(req, env, H, path)) || (await adminRoute(req, env, H, path, url));
      if (r) return r;
      if (path === "/" && req.method === "GET") return json({ ok: true, service: "masarok" }, 200, H);
      return fail("not_found", 404, H);
    } catch (e) {
      return fail("server_error", 500, H);
    }
  }
};
export { KINDS, cleanFeedback, sysFor, toolFor, userMsg } from "./coach.js";

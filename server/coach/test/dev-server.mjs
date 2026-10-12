// Runs the Worker locally on http://localhost:8787 with a fake database, fake Stripe and fake Claude, for testing the site.
import http from "node:http";
import worker from "../src/index.js";
import { makeD1, installFetch, env as mkEnv, aiMode } from "./shim.mjs";
installFetch(); aiMode.delay = 400;
const E = mkEnv(makeD1(), { CREDITS_PER_PACK: "3", ADMIN_TOKEN: "local-admin-token-123456" });
http.createServer(async (req, res) => {
  const chunks = []; for await (const c of req) chunks.push(c);
  const r = await worker.fetch(new Request("http://localhost:8787" + req.url, { method: req.method, headers: req.headers, body: ["GET", "HEAD", "OPTIONS"].includes(req.method) ? undefined : Buffer.concat(chunks) }), E);
  res.writeHead(r.status, Object.fromEntries(r.headers)); res.end(Buffer.from(await r.arrayBuffer()));
}).listen(8787, () => console.log("coach dev server on :8787"));

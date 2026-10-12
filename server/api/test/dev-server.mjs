// Runs the Masarok server locally on http://localhost:8787 with a fake database, fake Stripe, fake Claude and no real email,
// for trying the site without any accounts. Sign-in codes are printed here and listed at http://localhost:8787/__outbox.
// Paid bundles come from build/content (run `node tools/build-content.mjs` from the site folder first).
import http from "node:http";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import worker from "../src/index.js";
import { outbox } from "../src/mail.js";
import { makeD1, makeR2, installFetch, env as mkEnv, aiMode } from "./shim.mjs";
installFetch(); aiMode.delay = 400;
const dir = new URL("../../../build/content/courses/", import.meta.url), files = {};
if (existsSync(dir)) readdirSync(dir).forEach((f) => { files["courses/" + f] = readFileSync(new URL(f, dir), "utf8"); });
const E = mkEnv(makeD1(), { CREDITS_PER_PACK: "3", CONTENT: makeR2(files), ALLOWED_ORIGINS: "http://localhost:8765,http://127.0.0.1:8765" });
http.createServer(async (req, res) => {
  if (req.url === "/__outbox") { res.writeHead(200, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }); res.end(JSON.stringify(outbox.map((m) => ({ to: m.to, subject: m.subject, code: (m.text.match(/\b\d{6}\b/) || [])[0] })))); return; }
  const chunks = []; for await (const c of req) chunks.push(c);
  const r = await worker.fetch(new Request("http://localhost:8787" + req.url, { method: req.method, headers: req.headers, body: ["GET", "HEAD", "OPTIONS"].includes(req.method) ? undefined : Buffer.concat(chunks) }), E);
  if (req.url === "/auth/start" && r.status === 200) console.log("code for", outbox.at(-1).to + ":", outbox.at(-1).text.match(/\b\d{6}\b/)[0]);
  res.writeHead(r.status, Object.fromEntries(r.headers)); res.end(Buffer.from(await r.arrayBuffer()));
}).listen(8787, () => console.log("Masarok dev server on :8787 · paid bundles: " + (Object.keys(files).join(", ") || "none")));

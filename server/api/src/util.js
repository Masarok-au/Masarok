/* Shared helpers for the Masarok server. */
export const enc = new TextEncoder();
export const B32 = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no I, O, 0, 1

export function num(v, d) { var n = parseInt(v, 10); return isFinite(n) ? n : d; }
export function now() { return Math.floor(Date.now() / 1000); }
export function words(t) { return (String(t || "").match(/\S+/g) || []).length; }

export async function hmac(secret, msg) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(msg)));
}
export async function sha256(s) { return [...new Uint8Array(await crypto.subtle.digest("SHA-256", enc.encode(s)))].map((b) => b.toString(16).padStart(2, "0")).join(""); }
export function code32(bytes) { let out = ""; for (let i = 0; i < 16; i++) out += B32[bytes[i] % 32]; return "MSRK-" + out.match(/.{4}/g).join("-"); }
export function cleanCode(c) { return String(c || "").toUpperCase().replace(/[^A-Z0-9]/g, "").replace(/^MSRK/, ""); }
export async function codeHash(code) { return sha256("MSRK" + cleanCode(code)); }

export function cors(req, env) {
  const origin = req.headers.get("Origin") || "";
  const allowed = String(env.ALLOWED_ORIGINS || "https://masarok.org").split(",").map((s) => s.trim());
  const h = { "Vary": "Origin", "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, Authorization", "Access-Control-Max-Age": "86400" };
  if (allowed.includes(origin)) h["Access-Control-Allow-Origin"] = origin;
  return h;
}
export function json(data, status, headers) { return new Response(JSON.stringify(data), { status: status || 200, headers: Object.assign({ "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }, headers) }); }
export function fail(code, status, headers, extra) { return json(Object.assign({ error: code }, extra || {}), status, headers); }
export function adminOk(req, env) { const a = req.headers.get("Authorization") || ""; return !!(env.ADMIN_TOKEN && env.ADMIN_TOKEN.length >= 16 && a === "Bearer " + env.ADMIN_TOKEN); }
export async function body(req) { try { const b = await req.json(); return b && typeof b === "object" ? b : null; } catch (e) { return null; } }
export function b64url(bytes) { let s = ""; for (const b of bytes) s += String.fromCharCode(b); return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }
export function randomToken(prefix) { return prefix + b64url(crypto.getRandomValues(new Uint8Array(32))); }
export function bearer(req) { const m = (req.headers.get("Authorization") || "").match(/^Bearer\s+(\S+)$/i); return m ? m[1] : null; }

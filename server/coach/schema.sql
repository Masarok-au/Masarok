-- Masarok AI coach database (Cloudflare D1)
CREATE TABLE IF NOT EXISTS passes (
  token_hash TEXT PRIMARY KEY,      -- SHA-256 of the coach code; the code itself is never stored
  session_id TEXT UNIQUE NOT NULL,  -- the Stripe Checkout session that paid for it
  credits INTEGER NOT NULL,
  total INTEGER NOT NULL,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS usage (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  token_hash TEXT NOT NULL,
  kind TEXT NOT NULL,
  at INTEGER NOT NULL,
  in_tokens INTEGER NOT NULL DEFAULT 0,
  out_tokens INTEGER NOT NULL DEFAULT 0,
  ok INTEGER NOT NULL DEFAULT 1
);
CREATE INDEX IF NOT EXISTS usage_token_at ON usage (token_hash, at);
CREATE INDEX IF NOT EXISTS usage_at ON usage (at);

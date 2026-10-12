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

-- Accounts: sign in with an email code (no passwords)
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  created_at INTEGER NOT NULL,
  lang TEXT NOT NULL DEFAULT 'en'
);
CREATE TABLE IF NOT EXISTS login_codes (
  email TEXT PRIMARY KEY,
  code_hash TEXT NOT NULL,          -- HMAC of the code; the code itself is never stored
  expires_at INTEGER NOT NULL,
  tries INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS sessions (
  token_hash TEXT PRIMARY KEY,      -- SHA-256 of the session token
  user_id INTEGER NOT NULL,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL,
  last_seen INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS sessions_user ON sessions (user_id);
CREATE TABLE IF NOT EXISTS auth_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  kind TEXT NOT NULL,
  key_hash TEXT NOT NULL,           -- SHA-256 of the email or IP, for rate limits only
  at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS auth_log_kind_key_at ON auth_log (kind, key_hash, at);
-- What each student owns: "course:ielts", "subject:maths", "pass"
CREATE TABLE IF NOT EXISTS entitlements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  product TEXT NOT NULL,
  source TEXT NOT NULL,             -- "admin" now; "moyasar" once payments are live
  ref TEXT,                         -- payment id or a note
  created_at INTEGER NOT NULL,
  expires_at INTEGER,               -- NULL = never
  revoked INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS entitlements_user ON entitlements (user_id);
-- Synced progress: one row per saved key
CREATE TABLE IF NOT EXISTS progress (
  user_id INTEGER NOT NULL,
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  updated_at INTEGER NOT NULL,      -- milliseconds
  PRIMARY KEY (user_id, key)
);

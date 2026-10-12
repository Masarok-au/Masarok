# Masarok AI coach: setup guide

The AI coach gives students detailed feedback on IELTS Writing (Task 1 and 2), IELTS Speaking (from a transcript) and application statements. A pack costs **9.99 SAR for 30 feedbacks, valid for 12 months**. Students pay through a Stripe Payment Link and get a coach code. There are no accounts or passwords.

Until you finish these steps, the site shows **"Coming soon"**, sends nothing anywhere, and the free coach keeps working.

## How it works

1. A student taps **Buy** on `masarok.org/academy/coach/` and pays on Stripe's page.
2. Stripe sends them back to the coach page with a `session_id`. The page asks this server to check the payment with Stripe.
3. If it's paid at the right price, the server creates a coach code (`MSRK-XXXX-XXXX-XXXX-XXXX`) with 30 credits and shows it. The code is saved on the student's device.
4. Each **Get AI feedback** sends the text to this server, which uses one credit and asks Claude for structured feedback. If Claude fails, the credit is given back.

Privacy: student text is passed to the Anthropic API to write the feedback and is never stored. The database keeps only a hash of each code, its credits, its expiry date and a usage count (no text, no names, no emails). Stripe handles all card details.

## What you need

- A **Stripe** account (stripe.com, Australia). Stripe will ask for your personal and business details before you can take live payments.
- A **Cloudflare** account (free plan is enough).
- An **Anthropic Console** account (console.anthropic.com) with billing and an API key.
- **Node.js** on your computer, to run `npx wrangler`.

## Step 1: Anthropic

1. In the Anthropic Console, add billing, then create an API key named `masarok-coach`.
2. In **Limits**, set a monthly spend limit you're comfortable with (for example US$20).

The server uses `claude-sonnet-5-5` (US$2 per million input tokens, US$10 per million output tokens at the time of writing). One feedback is roughly 2,000–4,000 input and 1,000–1,500 output tokens, so about **US$0.02–0.03**. A full pack of 30 costs you roughly US$0.60–0.90 in AI fees. Check the current prices on Anthropic's pricing page.

## Step 2: Stripe (start in test mode)

1. In the Stripe Dashboard, switch on **Test mode**.
2. **Product catalogue → Add product:** name `Masarok AI coach · 30 feedbacks`, one-off price **9.99 SAR**.
3. **Payment Links → New:** choose that product. Under **After payment**, choose **Don't show confirmation page** and redirect to:
   `https://masarok.org/academy/coach/?session_id={CHECKOUT_SESSION_ID}`
   Type `{CHECKOUT_SESSION_ID}` exactly like that: Stripe fills it in.
4. Note the link's ID (it starts with `plink_`, shown in the link's page in the Dashboard) and its URL (`https://buy.stripe.com/test_...`).
5. **Developers → API keys → Create restricted key:** give it **Checkout Sessions: Read** only. Copy the key (`rk_test_...`).

## Step 3: Cloudflare

Open a terminal in this folder (`server/coach`) and run:

```bash
npx wrangler login
npx wrangler d1 create masarok-coach            # copy the database_id it prints into wrangler.toml
npx wrangler d1 execute masarok-coach --remote --file=schema.sql
npx wrangler secret put ANTHROPIC_API_KEY        # paste the Anthropic key
npx wrangler secret put STRIPE_SECRET_KEY        # paste the restricted Stripe key
npx wrangler secret put TOKEN_SECRET             # paste a long random value, e.g. from: openssl rand -hex 32
npx wrangler secret put ADMIN_TOKEN              # another long random value, only for you
```

In `wrangler.toml`, set `PAYMENT_LINK_ID` to your `plink_...` ID and, while testing, `ALLOW_TEST_SESSIONS = "1"`. Then:

```bash
npx wrangler deploy
```

Wrangler prints your server address, such as `https://masarok-coach.<you>.workers.dev`.

**Keep TOKEN_SECRET safe and never change it.** Codes are made from it, so changing it would stop students from reclaiming a code from their payment link.

## Step 4: test it on the live site, only in your browser

On masarok.org, open the browser console and run (with your own addresses):

```js
localStorage.setItem("masarok-ai-dev", JSON.stringify({ url: "https://masarok-coach.<you>.workers.dev", buy: "https://buy.stripe.com/test_..." }))
```

Only your browser now sees the AI coach. Go to `/academy/coach/`, tap Buy, pay with Stripe's test card `4242 4242 4242 4242` (any future date, any CVC), and you'll come back with a code. Try feedback on an essay, a UCAS statement and a speaking answer.

To undo: `localStorage.removeItem("masarok-ai-dev")`.

## Step 5: go live

1. In Stripe, switch to live mode and repeat step 2 (product, Payment Link with the same redirect, restricted key `rk_live_...`).
2. `npx wrangler secret put STRIPE_SECRET_KEY` with the live key, set `PAYMENT_LINK_ID` to the live `plink_...`, set `ALLOW_TEST_SESSIONS = "0"`, and `npx wrangler deploy` again.
3. In `coach.js` at the top of the site, fill in:
   ```js
   url: "https://masarok-coach.<you>.workers.dev",
   buy: "https://buy.stripe.com/...",
   ```
   Push to GitHub. The AI coach is now open for everyone.

## Giving codes yourself

For reviewers, refunds or manual sales:

```bash
curl -X POST https://masarok-coach.<you>.workers.dev/admin/codes \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" -H "Content-Type: application/json" \
  -d '{"count": 3, "credits": 10, "note": "reviewers", "days": 90}'
```

## Settings (`wrangler.toml`)

| Setting | Default | What it does |
|---|---|---|
| `PRICE_AMOUNT`, `PRICE_CURRENCY` | `999`, `sar` | The amount a payment must match (in halalas). Change it together with the Stripe price and `price` in `coach.js`. |
| `CREDITS_PER_PACK` | `30` | Feedbacks per purchase. Keep `credits` in `coach.js` the same. |
| `EXPIRY_DAYS` | `365` | How long a code lasts. |
| `MAX_PER_HOUR` | `10` | Per code, to stop abuse. |
| `DAILY_CAP` | `500` | All students together, a safety net for your API bill. |
| `MODEL` | `claude-sonnet-5-5` | The Claude model. |

## Before you take real money

These are things to check yourself; this isn't legal or tax advice.

- **Refunds and consumer law:** Australian Consumer Law applies to what you sell. Decide your refund policy and add it to the coach page (it currently says to message you with the receipt).
- **ABN, GST and tax:** check what you need as a sole trader, and how the income is taxed.
- **Your scholarship:** as a SACM-sponsored student, check SACM's rules on earning income while you study.
- **Privacy:** the coach page explains what's sent where. Keep it accurate if you change anything.

## Run the tests

```bash
npm test                          # 32 checks with a fake Stripe, fake Claude and a local database
node test/dev-server.mjs          # a local server on :8787 for trying the site without any accounts
```

The local tests need Node 22 or newer (they use the built-in `node:sqlite`).

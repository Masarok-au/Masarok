# Masarok server: setup guide

One Cloudflare Worker runs everything Masarok needs a server for:

- **Accounts.** Students sign in with a 6-digit code sent to their email. There are no passwords.
- **Progress sync.** The guide's and the Academy's saved progress follows a student to any device. Changes made on two devices are merged.
- **Paid lessons.** Each paid course keeps its first 2 lessons public. The rest are sent only to students who own the course, and saved on their device so they work offline.
- **AI coach.** 30 feedbacks for 9.99 SAR (see the AI coach section below).

Until you finish these steps, the site looks exactly as it does today: no sign-in button, nothing sent anywhere, and every course free.

## What you need

- A **Cloudflare** account (the free plan is enough to start).
- A **Resend** account (resend.com) to send the sign-in emails. The free plan sends 3,000 emails a month, 100 a day.
- **Node.js 22 or newer** on your computer, to run `npx wrangler` and the tests.
- For the AI coach only: an **Anthropic Console** account and a **Stripe** account.

## Step 1: Resend (sign-in emails)

1. In Resend, go to **Domains → Add domain** and add `masarok.org`. Resend shows DNS records (SPF and DKIM). Add them where your domain's DNS is managed, then wait for Resend to show **Verified**.
2. Go to **API keys → Create API key**, with **Sending access** only. Copy the key (`re_...`).
3. In `wrangler.toml`, `MAIL_FROM` is `Masarok <login@masarok.org>`. Keep it, or change it to another address on the verified domain.

## Step 2: Cloudflare

Open a terminal in this folder (`server/api`) and run:

```bash
npx wrangler login
npx wrangler d1 create masarok                    # copy the database_id it prints into wrangler.toml
npx wrangler d1 execute masarok --remote --file=schema.sql
npx wrangler r2 bucket create masarok-content
npx wrangler secret put TOKEN_SECRET              # a long random value, e.g. from: openssl rand -hex 32
npx wrangler secret put ADMIN_TOKEN               # another long random value, only for you
npx wrangler secret put RESEND_API_KEY            # the Resend key
npx wrangler deploy
```

Wrangler prints your server address, such as `https://masarok-api.<you>.workers.dev`.

**Keep TOKEN_SECRET safe and never change it.** Sign-in codes and coach codes are made from it.

## Step 3: test it in your browser only

On masarok.org, open the browser console and run (with your own address):

```js
localStorage.setItem("masarok-ai-dev", JSON.stringify({ url: "https://masarok-api.<you>.workers.dev" }))
```

Only your browser now sees **Sign in** in the menu. Sign in with your email and check that:

- the code email arrives, in English or Arabic matching the page;
- after signing in, your progress shows in a second browser when you sign in there too.

To undo: `localStorage.removeItem("masarok-ai-dev")`.

## Step 4: turn on accounts for everyone

In `account.js` at the top of the site, fill in:

```js
var API = { url: "https://masarok-api.<you>.workers.dev" };
```

Push to GitHub. Every visitor now sees **Sign in** in the menu. Courses are still all free at this point.

## Paid lessons

### Which lessons are paid

Edit `tools/content.json`. Each course is either `"paid": false` (everything free) or `"paid": true`. A paid course keeps the lessons in `"free"` public; without a `"free"` list, its first 2 lessons stay free. `"unlock"` lists the products that open the course (for example `course:ielts` and `pass`).

### Build and upload

From the site folder:

```bash
node tools/build-content.mjs
```

This writes, for each paid course:

- a **public shell** (`build/site/courses/<id>.js`): free lessons in full, paid lessons as title cards only;
- a **paid bundle** (`build/content/courses/<id>.json`).

It also prints the upload commands, for example:

```bash
npx wrangler r2 object put masarok-content/courses/ielts.json --file ../../build/content/courses/ielts.json --content-type application/json --remote
```

Upload a bundle again every time you change a paid course. Students who already have it on their device get the new version on their next visit.

### Launch day: take the paid lessons off GitHub

The site's GitHub repository is public, so anyone can read the course files in it. Before charging for a course, move its source files somewhere private:

1. Create a **private** repository (for example `masarok-content`) and move `courses/*.js`, the course pages and `tools/` into it.
2. From that private repository, build and copy the public shells into the site:
   ```bash
   node tools/build-content.mjs --apply ../masarok
   ```
   This replaces each paid course's files in the site with its one public shell, and points the English and Arabic course pages at it.
3. Upload the bundles (above), then commit and push the site.

Earlier versions of the lessons stay readable in the public repository's history. The reviewed versions you sell will differ from those, so this is acceptable. If you want the history gone too, ask before rewriting it.

### Giving someone a course

Until payments are connected (Moyasar, next step), you give courses by hand:

```bash
curl -X POST https://masarok-api.<you>.workers.dev/admin/grant \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" -H "Content-Type: application/json" \
  -d '{"email": "student@example.com", "product": "course:ielts", "days": 365, "note": "pilot"}'
```

- Products: `course:<id>` (one course), `subject:<name>` (later, for maths, chemistry and physics), or `pass` (everything).
- Leave out `"days"` for no end date.
- The email doesn't need an account yet: the course is waiting for them when they first sign in.
- To take a course back, use `/admin/revoke` with the same email and product.
- To see what an account owns: `GET /admin/user?email=...` with the same header.

## AI coach

The coach runs on this same server. It turns on when `buy` in `coach.js` is set to your Stripe Payment Link.

1. In the Anthropic Console, add billing and create an API key named `masarok-coach`. In **Limits**, set a monthly spend limit (for example US$20). One feedback costs you about US$0.02–0.03.
2. Set up Stripe (below), then run:
   ```bash
   npx wrangler secret put ANTHROPIC_API_KEY
   npx wrangler secret put STRIPE_SECRET_KEY
   ```
3. In `wrangler.toml`, set `PAYMENT_LINK_ID` and, while testing, `ALLOW_TEST_SESSIONS = "1"`. Deploy again.
4. In `coach.js`, set `buy` to the Payment Link. `url` can stay empty: the coach uses the server address from `account.js`.

### AI coach: Stripe (start in test mode)

1. In the Stripe Dashboard, switch on **Test mode**.
2. **Product catalogue → Add product:** name `Masarok AI coach · 30 feedbacks`, one-off price **9.99 SAR**.
3. **Payment Links → New:** choose that product. Under **After payment**, choose **Don't show confirmation page** and redirect to:
   `https://masarok.org/academy/coach/?session_id={CHECKOUT_SESSION_ID}`
   Type `{CHECKOUT_SESSION_ID}` exactly like that: Stripe fills it in.
4. Note the link's ID (it starts with `plink_`, shown in the link's page in the Dashboard) and its URL (`https://buy.stripe.com/test_...`).
5. **Developers → API keys → Create restricted key:** give it **Checkout Sessions: Read** only. Copy the key (`rk_test_...`).

### Giving coach codes yourself

For reviewers, refunds or manual sales:

```bash
curl -X POST https://masarok-api.<you>.workers.dev/admin/codes \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" -H "Content-Type: application/json" \
  -d '{"count": 3, "credits": 10, "note": "reviewers", "days": 90}'
```

## Settings (`wrangler.toml`)

| Setting | Default | What it does |
|---|---|---|
| `MAIL_FROM` | `Masarok <login@masarok.org>` | Who sign-in emails come from. Must be on a domain verified in Resend. |
| `SESSION_DAYS` | `180` | How long a device stays signed in. |
| `CODES_PER_EMAIL_HOUR`, `CODES_PER_IP_HOUR` | `5`, `20` | Limits on sign-in emails, to stop abuse. |
| `VERIFY_PER_IP_HOUR` | `60` | Limit on code attempts per network. Each code also allows only 5 wrong tries. |
| `SYNC_MAX_BYTES` | `2097152` | Synced progress per student (2 MB). |
| `PRICE_AMOUNT`, `PRICE_CURRENCY` | `999`, `sar` | The coach pack price a payment must match (in halalas). |
| `CREDITS_PER_PACK` | `30` | Feedbacks per coach pack. Keep `credits` in `coach.js` the same. |
| `EXPIRY_DAYS` | `365` | How long a coach code lasts. |
| `MAX_PER_HOUR`, `DAILY_CAP` | `10`, `500` | Coach limits per code and for all students together. |
| `MODEL` | `claude-sonnet-5-5` | The Claude model for the coach. |

## Privacy

- **Stored:** each student's email, their purchases, their synced progress, and hashes of sign-in codes and session tokens.
- **Never stored:** passwords (there are none), raw codes or tokens, or the text students send to the AI coach.
- A student can delete their account from **Menu → Your account**. This removes their email, sessions and synced progress. Purchase records are kept, marked as cancelled, for your accounts.
- Saudi Arabia's data protection law (PDPL) applies. Keep a privacy page on the site that matches this list, and check it with someone qualified before launch.

## Run the tests

```bash
npm test                          # 32 coach checks and 52 account, paid-lesson and sync checks, with no real accounts
node test/dev-server.mjs          # a local server on :8787; sign-in codes are printed and listed at /__outbox
```

To try the whole flow locally, run `node tools/build-content.mjs` in the site folder first. The dev server then serves those bundles. In the site, set `masarok-ai-dev` to `{"url":"http://localhost:8787"}`.

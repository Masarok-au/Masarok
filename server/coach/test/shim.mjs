// Local stand-ins for Cloudflare D1 and the outside APIs, so the Worker can be tested without any accounts.
import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";

export function makeD1() {
  const db = new DatabaseSync(":memory:");
  db.exec(readFileSync(new URL("../schema.sql", import.meta.url), "utf8"));
  return {
    _db: db,
    prepare(sql) {
      let args = [];
      const st = {
        bind(...a) { args = a; return st; },
        async first() { return db.prepare(sql).get(...args) || null; },
        async all() { return { results: db.prepare(sql).all(...args) }; },
        async run() { const r = db.prepare(sql).run(...args); return { success: true, meta: { changes: Number(r.changes) } }; }
      };
      return st;
    }
  };
}

// fake Stripe sessions and a fake Claude that writes plausible feedback from the student's own text
export const sessions = {
  cs_test_paid0000000001: { status: "complete", payment_status: "paid", amount_total: 999, currency: "sar", payment_link: "plink_test" },
  cs_test_paid0000000002: { status: "complete", payment_status: "paid", amount_total: 999, currency: "sar", payment_link: "plink_test" },
  cs_test_unpaid00000001: { status: "open", payment_status: "unpaid", amount_total: 999, currency: "sar", payment_link: "plink_test" },
  cs_test_cheap000000001: { status: "complete", payment_status: "paid", amount_total: 100, currency: "sar", payment_link: "plink_test" }
};
export const calls = { anthropic: [], stripe: [] };
export let aiMode = { fail: false };

function fakeFeedback(body) {
  const tool = body.tools[0], keys = tool.input_schema.properties.criteria.items.properties.key.enum;
  const text = body.messages[0].content.split("<student_text>")[1].split("</student_text>")[0].trim();
  const first = text.split(/(?<=[.!?])\s+/)[0].slice(0, 160);
  const ar = /Arabic/.test(body.system);
  const statement = keys.includes("clarity");
  return {
    headline: ar ? "بداية جيدة، لكن الأفكار تحتاج أمثلة أكثر تحديدًا." : "A solid start, but your ideas need more specific examples.",
    overall: statement ? null : 6.27,
    criteria: keys.map((k, i) => ({ key: k, score: statement ? [3, 2, 2, 3, 3][i] : [6, 6.5, 6, 5.5][i % 4], comment: ar ? "تعليق تجريبي على هذا المعيار." : "A sample comment on this area, with one concrete tip." })),
    strengths: [ar ? "موقفك واضح من البداية." : "Your position is clear from the start.", ar ? "تنظيم الفقرات جيد." : "Paragraphs are well organised."],
    fixes: [{ quote: first, issue: ar ? "عامة جدًا، أضف تفصيلًا." : "Too general. Add a detail.", better: first.replace(/\.$/, "") + ", for example when I fixed my uncle's shop website." },
            { quote: "a lot of", issue: ar ? "عبارة غير رسمية." : "Informal phrase.", better: "many" }],
    model_text: "Studying abroad gives students the chance to grow, as long as they choose it for the right reasons.",
    next_step: ar ? "تدرب على كتابة جملة موضوع واحدة لكل فقرة." : "Practise writing one clear topic sentence for each paragraph.",
    criteria_extra_ignored: "x"
  };
}

export function installFetch() {
  globalThis.fetch = async (url, opts = {}) => {
    url = String(url);
    if (url.startsWith("https://api.stripe.com/v1/checkout/sessions/")) {
      calls.stripe.push(url);
      if (!/Bearer sk_test_fake/.test(opts.headers.Authorization)) return new Response("{}", { status: 401 });
      const id = decodeURIComponent(url.split("/").pop()), s = sessions[id];
      return s ? new Response(JSON.stringify(Object.assign({ id }, s)), { status: 200 }) : new Response('{"error":{}}', { status: 404 });
    }
    if (url === "https://api.anthropic.com/v1/messages") {
      const body = JSON.parse(opts.body); calls.anthropic.push(body);
      if (opts.headers["x-api-key"] !== "sk-ant-fake") return new Response('{"type":"error"}', { status: 401 });
      if (aiMode.fail) return new Response('{"type":"error","error":{"type":"overloaded_error"}}', { status: 529 });
      await new Promise((r) => setTimeout(r, aiMode.delay || 0));
      return new Response(JSON.stringify({ content: [{ type: "tool_use", id: "t1", name: "give_feedback", input: fakeFeedback(body) }], usage: { input_tokens: 1800, output_tokens: 900 } }), { status: 200 });
    }
    throw new Error("unexpected fetch " + url);
  };
}

export function env(db, extra) {
  return Object.assign({ DB: db, ANTHROPIC_API_KEY: "sk-ant-fake", STRIPE_SECRET_KEY: "sk_test_fake", TOKEN_SECRET: "local-secret",
    ALLOWED_ORIGINS: "https://masarok.org,http://localhost:8765", MODEL: "claude-sonnet-5-5", PRICE_AMOUNT: "999", PRICE_CURRENCY: "sar",
    CREDITS_PER_PACK: "3", EXPIRY_DAYS: "365", MAX_PER_HOUR: "10", DAILY_CAP: "500", PAYMENT_LINK_ID: "plink_test", ALLOW_TEST_SESSIONS: "1" }, extra || {});
}

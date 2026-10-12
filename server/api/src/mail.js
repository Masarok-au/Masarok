/* Sign-in emails, sent through Resend (resend.com). Set RESEND_API_KEY and MAIL_FROM.
   MAIL_MODE = "log" sends nothing and keeps the last emails in memory (local testing only). */
export const outbox = [];

const TEXT = {
  en: {
    subject: (c) => c + " is your Masarok sign-in code",
    lines: (c, m) => ["Your Masarok sign-in code is:", c, "It works for " + m + " minutes. If you didn't ask for it, you can ignore this email: nobody can sign in without the code."],
    foot: "Masarok · masarok.org"
  },
  ar: {
    subject: (c) => c + " رمز الدخول إلى مسارُك",
    lines: (c, m) => ["رمز الدخول إلى حسابك في مسارُك:", c, "صالح لمدة " + m + " دقائق. إذا لم تطلبه فتجاهل هذه الرسالة، فلا يمكن لأحد الدخول دون الرمز."],
    foot: "مسارُك · masarok.org"
  }
};

export function loginEmail(code, lang, minutes) {
  const T = TEXT[lang === "ar" ? "ar" : "en"], [a, c, b] = T.lines(code, minutes), dir = lang === "ar" ? "rtl" : "ltr";
  const html = '<div dir="' + dir + '" style="font-family:Arial,Tahoma,sans-serif;font-size:16px;line-height:1.5;color:#0B1626;max-width:480px">' +
    "<p>" + a + '</p><p style="font-size:32px;font-weight:700;letter-spacing:6px;margin:16px 0" dir="ltr">' + c + "</p><p>" + b + '</p><p style="color:#5b6b80;font-size:13px">' + T.foot + "</p></div>";
  return { subject: T.subject(code), html: html, text: a + "\n\n" + c + "\n\n" + b + "\n\n" + T.foot };
}

export async function sendMail(env, to, msg) {
  if (env.MAIL_MODE === "log") { outbox.push(Object.assign({ to: to }, msg)); if (outbox.length > 50) outbox.shift(); return true; }
  if (!env.RESEND_API_KEY || !env.MAIL_FROM) return false;
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: "Bearer " + env.RESEND_API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ from: env.MAIL_FROM, to: [to], subject: msg.subject, html: msg.html, text: msg.text })
  });
  return r.ok;
}

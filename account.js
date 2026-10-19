/* Masarok accounts on the site.
   - Sign in with a 6-digit code sent by email (no passwords). The session token stays on this device.
   - Progress sync: the guide's and the Academy's saved data (localStorage keys starting with masarok-) follows the
     student to any device. Changes on two devices at once are merged (finished lessons, best scores and points are kept).
   - Paid lessons: MasarokAccount.course(id) fetches a course's paid lessons for students who own it, and keeps a copy
     on the device so they work offline.
   Everything stays switched off (no sign-in button, nothing sent anywhere) until API.url points at the Masarok server
   (see server/api/README.md). */
(function () {
  "use strict";

  // ---------- settings: fill in once the Masarok server is live ----------
  var API = { url: "" }; // e.g. "https://masarok-api.<account>.workers.dev"
  // for testing before launch: only this browser sees accounts
  try { var dev = JSON.parse(localStorage.getItem("masarok-ai-dev") || "null"); if (dev && /^https?:\/\//.test(dev.url || "")) API.url = dev.url; } catch (e) {}
  API.url = API.url.replace(/\/+$/, "");

  var AR = (document.documentElement.lang || "en").slice(0, 2) === "ar", A = AR ? 1 : 0;
  function T(x) { return Array.isArray(x) ? x[A] : x; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c]; }); }
  function fmt(s, o) { return T(s).replace(/\{(\w+)\}/g, function (m, k) { return o[k] != null ? o[k] : m; }); }
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) {} }
  function getJ(k) { try { return JSON.parse(get(k) || "null"); } catch (e) { return null; } }

  var U = {
    item: ["Sign in", "تسجيل الدخول"], itemSub: ["Keep your progress and courses on every device", "احتفظ بتقدمك ودوراتك على كل أجهزتك"],
    itemIn: ["Your account", "حسابك"],
    title: ["Sign in to Masarok", "الدخول إلى مسارُك"],
    intro: ["Your progress and your courses follow you to any phone or laptop. There's no password: we email you a 6-digit code.", "ينتقل تقدمك ودوراتك معك إلى أي جوال أو حاسب. لا توجد كلمة مرور: نرسل لك رمزًا من 6 أرقام إلى بريدك."],
    email: ["Your email", "بريدك الإلكتروني"], send: ["Email me a code", "أرسل لي الرمز"], sending: ["Sending…", "جارٍ الإرسال…"],
    codeT: ["Check your email", "تحقق من بريدك"],
    codeSent: ["We sent a 6-digit code to {e}. It works for 10 minutes. Check your spam folder if you can't see it.", "أرسلنا رمزًا من 6 أرقام إلى {e}، وهو صالح لمدة 10 دقائق. إن لم تجده فابحث في مجلد الرسائل غير المرغوب فيها."],
    code: ["The code", "الرمز"], verify: ["Sign in", "دخول"], checking: ["Checking…", "جارٍ التحقق…"],
    other: ["Use a different email", "استخدم بريدًا آخر"], resend: ["Send a new code", "أرسل رمزًا جديدًا"], resendIn: ["New code in {s}s", "رمز جديد بعد {s} ث"],
    priv: ["We use your email only to sign you in and to send receipts for anything you buy. Your progress is stored with your account so it can move between devices; you can delete it any time.", "نستخدم بريدك فقط لتسجيل دخولك ولإرسال إيصالات مشترياتك. يُحفظ تقدمك مع حسابك لينتقل بين أجهزتك، ويمكنك حذفه متى شئت."],
    close: ["Close", "إغلاق"],
    err: {
      bad_email: ["That email doesn't look right. Check it and try again.", "يبدو أن البريد غير صحيح، تحقق منه وحاول مرة أخرى."],
      wrong_code: ["That code isn't right. {n} tries left.", "الرمز غير صحيح. بقي {n} محاولات."],
      code_expired: ["This code has expired. Ask for a new one.", "انتهت صلاحية الرمز، فاطلب رمزًا جديدًا."],
      too_many_tries: ["Too many wrong tries. Ask for a new code.", "محاولات خاطئة كثيرة، فاطلب رمزًا جديدًا."],
      rate_limited: ["Too many codes in a short time. Wait an hour, then try again.", "طلبت رموزًا كثيرة في وقت قصير. انتظر ساعة ثم حاول مرة أخرى."],
      mail_failed: ["We couldn't send the email just now. Try again in a few minutes.", "تعذر إرسال البريد الآن، فحاول بعد دقائق."],
      bad_code: ["Type the 6 digits from the email.", "اكتب الأرقام الستة من البريد."],
      network: ["You seem to be offline. Connect to the internet and try again.", "يبدو أنك غير متصل بالإنترنت، فاتصل وحاول مرة أخرى."],
      other: ["Something went wrong. Try again.", "حدث خطأ ما، فحاول مرة أخرى."]
    },
    accT: ["Your account", "حسابك"], signedAs: ["Signed in as", "مسجّل باسم"],
    owned: ["Your courses", "دوراتك"], ownedNone: ["No paid courses yet. The free lessons and the guide are yours anyway.", "لا توجد دورات مدفوعة بعد، والدروس المجانية والدليل متاحة لك دائمًا."],
    until: ["until {d}", "حتى {d}"], forever: ["no end date", "دون تاريخ انتهاء"],
    syncT: ["Progress", "التقدم"], synced: ["Saved to your account {w}.", "محفوظ في حسابك {w}."], never: ["Not saved to your account yet.", "لم يُحفظ في حسابك بعد."],
    justNow: ["just now", "الآن"], minsAgo: ["{n} min ago", "قبل {n} د"], at: ["on {d}", "في {d}"],
    syncNow: ["Save now", "احفظ الآن"], syncing: ["Saving…", "جارٍ الحفظ…"], syncFail: ["Couldn't reach the server. Your progress is still on this device.", "تعذر الوصول إلى الخادم، وتقدمك ما زال محفوظًا على هذا الجهاز."],
    out: ["Sign out", "تسجيل الخروج"], outSub: ["Your progress stays on this device and in your account.", "يبقى تقدمك على هذا الجهاز وفي حسابك."],
    del: ["Delete my account", "احذف حسابي"], delSure: ["Tap again to delete for good", "اضغط مرة أخرى للحذف نهائيًا"],
    delSub: ["Deletes your account and the progress saved in it. Courses you bought are lost. Progress on this device stays.", "يحذف حسابك والتقدم المحفوظ فيه، وتُفقد الدورات التي اشتريتها. يبقى التقدم المحفوظ على هذا الجهاز."],
    welcome: ["Signed in as {e}. Your progress now saves to your account.", "تم الدخول باسم {e}، وأصبح تقدمك يُحفظ في حسابك."],
    merged: ["Your progress from your other device is here.", "وصل تقدمك من جهازك الآخر."],
    outDone: ["Signed out.", "تم تسجيل الخروج."], delDone: ["Your account is deleted.", "تم حذف حسابك."],
    products: { pass: ["All-access pass", "اشتراك شامل"], "course:ielts": ["IELTS Academic course", "دورة IELTS الأكاديمي"], "course:writing": ["Application writing course", "دورة كتابة طلبات القبول"] }
  };

  // ---------- server calls ----------
  function token() { return get("masarok-session"); }
  function api(path, opts) {
    opts = opts || {};
    var h = { "Content-Type": "application/json" }; if (token() && !opts.noAuth) h.Authorization = "Bearer " + token();
    return fetch(API.url + path, { method: opts.method || "GET", headers: h, body: opts.body ? JSON.stringify(opts.body) : undefined, keepalive: !!opts.keepalive })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { j = j || {}; j._s = r.status; if (r.status === 401 && j.error === "signed_out" && !opts.noAuth) forget(); return j; }); },
        function () { return { _s: 0, error: "network" }; });
  }
  function me() { return getJ("masarok-me"); }
  function forget() { ["masarok-session", "masarok-me", "masarok-sync"].forEach(function (k) { set(k, null); }); try { caches.delete("masarok-paid"); } catch (e) {} }

  // ---------- progress sync ----------
  var KEY_RE = /^masarok-[\w-]{1,60}$/;
  var NO_SYNC = ["masarok-ai-dev", "masarok-session", "masarok-sync", "masarok-me", "masarok-coach-speech", "masarok-map-at", "masarok-open", "masarok-reminder-seen"];
  function syncable(k) { return KEY_RE.test(k) && NO_SYNC.indexOf(k) < 0; }
  function localKeys() { var out = []; try { for (var i = 0; i < localStorage.length; i++) { var k = localStorage.key(i); if (syncable(k)) out.push(k); } } catch (e) {} return out; }
  function hash(s) { if (s == null) return "-"; var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0).toString(36) + "." + s.length; }
  function meta() { var m = getJ("masarok-sync") || {}; m.h = m.h || {}; m.base = m.base || {}; return m; }
  // merge two saved values changed on two devices: keep finished lessons, best scores, points and lists from both
  function deep(x, y) {
    var ox = x && typeof x === "object", oy = y && typeof y === "object";
    if (ox && oy && Array.isArray(x) === Array.isArray(y)) {
      if (Array.isArray(x)) {
        var nums = x.length === y.length && x.concat(y).every(function (v) { return typeof v === "number"; });
        if (nums) return x.map(function (v, i) { return Math.max(v, y[i]); });
        var seen = {}, out = [];
        x.concat(y).forEach(function (v) { var k = JSON.stringify(v); if (!seen[k]) { seen[k] = 1; out.push(v); } });
        return out;
      }
      var r = {}; Object.keys(x).concat(Object.keys(y)).forEach(function (k) { r[k] = k in x && k in y ? deep(x[k], y[k]) : k in x ? x[k] : y[k]; });
      return r;
    }
    if (typeof x === "number" && typeof y === "number") return Math.max(x, y);
    if (typeof x === "boolean" && typeof y === "boolean") return x || y;
    return x === undefined ? y : x;
  }
  function merge(local, remote) {
    if (local == null) return remote; if (remote == null) return local;
    var a, b; try { a = JSON.parse(local); b = JSON.parse(remote); } catch (e) { return local; }
    if (!a || !b || typeof a !== "object" || typeof b !== "object") return local;
    return JSON.stringify(deep(a, b));
  }
  var syncing = null;
  function sync() {
    if (!API.url || !token()) return Promise.resolve({ ok: false });
    if (syncing) return syncing;
    syncing = api("/progress").then(function (r) {
      if (r.error) return { ok: false, error: r.error };
      var m = meta(), remote = r.items || {}, push = {}, base = {}, changed = false;
      var all = {}; localKeys().concat(Object.keys(remote), Object.keys(m.h)).forEach(function (k) { if (syncable(k)) all[k] = 1; });
      Object.keys(all).forEach(function (k) {
        var lv = get(k), rv = remote[k], dirty = hash(lv) !== (m.h[k] || "-"), rChanged = rv ? rv.t !== m.base[k] : false;
        if (!rv) { if (dirty) { push[k] = lv; base[k] = m.base[k] == null ? null : m.base[k]; } return; }
        if (rChanged && !dirty) { if (lv !== rv.v) { set(k, rv.v); changed = true; } m.base[k] = rv.t; m.h[k] = hash(rv.v); return; }
        if (rChanged && dirty) {
          var v = merge(lv, rv.v);
          if (v !== lv) { set(k, v); changed = true; }
          if (v === rv.v) { m.base[k] = rv.t; m.h[k] = hash(v); } else { push[k] = v; base[k] = rv.t; }
          return;
        }
        if (dirty) { push[k] = lv; base[k] = rv.t; }
      });
      var done = function () { m.at = Date.now(); set("masarok-sync", JSON.stringify(m)); return { ok: true, changed: changed }; };
      if (!Object.keys(push).length) return done();
      return api("/progress", { method: "PUT", body: { items: push, base: base } }).then(function (p) {
        if (p.error) return { ok: false, error: p.error, changed: changed };
        Object.keys(p.t || {}).forEach(function (k) { m.base[k] = p.t[k]; m.h[k] = hash(push[k]); });
        return done();
      });
    }).then(function (x) { syncing = null; return x; }, function () { syncing = null; return { ok: false }; });
    return syncing;
  }
  // when the page is hidden, send what changed (the next full sync merges anything another device saved meanwhile)
  function pushOnly() {
    if (!API.url || !token()) return;
    var m = meta(), push = {}, base = {};
    localKeys().concat(Object.keys(m.h)).forEach(function (k) { if (!syncable(k)) return; var lv = get(k); if (hash(lv) !== (m.h[k] || "-")) { push[k] = lv; base[k] = m.base[k] == null ? null : m.base[k]; } });
    if (!Object.keys(push).length) return;
    api("/progress", { method: "PUT", body: { items: push, base: base }, keepalive: true }).then(function (p) {
      if (!p || p.error) return;
      var m2 = meta(); Object.keys(p.t || {}).forEach(function (k) { m2.base[k] = p.t[k]; m2.h[k] = hash(push[k]); }); set("masarok-sync", JSON.stringify(m2));
    });
  }

  // ---------- paid lessons ----------
  function cacheGet(id) {
    try { return caches.open("masarok-paid").then(function (c) { return c.match("/__paid/" + id + ".json"); }).then(function (r) { return r ? r.json() : null; }).catch(function () { return null; }); }
    catch (e) { return Promise.resolve(null); }
  }
  function cachePut(id, txt) { try { caches.open("masarok-paid").then(function (c) { return c.put("/__paid/" + id + ".json", new Response(txt, { headers: { "Content-Type": "application/json" } })); }).catch(function () {}); } catch (e) {} }
  function cacheDrop(id) { try { caches.open("masarok-paid").then(function (c) { return c.delete("/__paid/" + id + ".json"); }).catch(function () {}); } catch (e) {} }
  // → { lessons, version } for owners, or { error: "off" | "signed_out" | "not_owned" | "offline" }
  function course(id) {
    if (!API.url) return Promise.resolve({ error: "off" });
    if (!token()) return Promise.resolve({ error: "signed_out" });
    return cacheGet(id).then(function (have) {
      var q = have && have.version ? "?v=" + encodeURIComponent(have.version) : "";
      return fetch(API.url + "/course/" + id + q, { headers: { Authorization: "Bearer " + token() } }).then(function (r) {
        return r.text().then(function (txt) {
          var j = {}; try { j = JSON.parse(txt); } catch (e) {}
          if (r.ok && j.same && have) return have;
          if (r.ok && j.lessons) { cachePut(id, txt); return j; }
          if (r.status === 401) { forget(); return { error: "signed_out" }; }
          if (r.status === 403) { cacheDrop(id); return { error: "not_owned" }; }
          return have || { error: "offline" };
        });
      }, function () { return have || { error: "offline" }; });
    });
  }
  function owns(products) { var m = me(); if (!m || !m.products) return false; var now = Date.now() / 1000; return m.products.some(function (p) { return products.indexOf(p.product) > -1 && (!p.until || p.until > now); }); }

  // ---------- dialogs ----------
  var css =
    ".acm .bk-box{width:min(28rem, 100%)}" +
    ".ac-f{display:grid; gap:8px}" +
    ".ac-f label{font-weight:700; font-size:.9375rem}" +
    ".ac-in{font:inherit; font-size:1.0625rem; padding:12px 14px; border-radius:12px; border:1px solid rgba(238,242,247,.35); background:rgba(255,255,255,.06); color:var(--night-ink, #EEF2F7); width:100%; box-sizing:border-box}" +
    ".ac-in:focus{outline:3px solid var(--gold, #E2B66C); outline-offset:1px; border-color:transparent}" +
    ".ac-code{font-family:'IBM Plex Mono', monospace; font-size:1.6rem; letter-spacing:.4em; text-align:center; direction:ltr}" +
    ".ac-links{display:flex; gap:14px; flex-wrap:wrap}" +
    ".ac-link{background:none; border:0; padding:0; font:inherit; font-size:.9375rem; color:var(--gold, #E2B66C); text-decoration:underline; cursor:pointer}" +
    ".ac-link:disabled{color:var(--night-dim, #A9B8CB); text-decoration:none; cursor:default}" +
    ".ac-list{margin:0; padding:0; list-style:none; display:grid; gap:6px}" +
    ".ac-list li{display:flex; justify-content:space-between; gap:10px; font-size:.9375rem}" +
    ".ac-list small{color:var(--night-dim, #A9B8CB)}" +
    ".ac-who{margin:0; font-size:1.0625rem; word-break:break-all}" +
    ".ac-toast{position:fixed; inset-inline:16px; bottom:16px; margin:0 auto; max-width:26rem; z-index:90; background:var(--night, #0B1626); color:var(--night-ink, #EEF2F7); border:1px solid var(--gold, #E2B66C); border-radius:14px; padding:12px 16px; font-size:.9375rem; box-shadow:0 20px 50px -20px rgba(0,0,0,.8)}";
  var cssDone = false;
  function addCss() { if (cssDone) return; cssDone = true; var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st); }

  var dlg = null, lastFocus = null, state = { step: "email", email: "", wait: 0 }, timer = null, armedDel = false;
  function shell(title, inner) {
    return '<div class="mn-bg" data-ac-close></div><div class="bk-box" role="dialog" aria-modal="true" aria-labelledby="ac-h"><div class="sadu" aria-hidden="true"></div><div class="bk-in">' +
      '<div class="mn-head bk-head"><h2 id="ac-h">' + esc(title) + '</h2><button type="button" class="mn-x" data-ac-close aria-label="' + esc(T(U.close)) + '">×</button></div>' + inner + "</div></div>";
  }
  function ensure() {
    addCss();
    if (dlg) return;
    dlg = document.createElement("div"); dlg.className = "mn bkm acm"; dlg.hidden = true;
    document.body.appendChild(dlg);
    dlg.addEventListener("click", onClick);
    dlg.addEventListener("submit", onSubmit);
    dlg.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { closeDlg(); return; }
      if (e.key !== "Tab") return;
      var f = dlg.querySelectorAll("button:not([disabled]), input"), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }
  function show(html, focusSel) {
    dlg.innerHTML = html; dlg.hidden = false; document.documentElement.style.overflow = "hidden";
    var f = dlg.querySelector(focusSel || ".mn-x"); if (f) f.focus();
  }
  function closeDlg() {
    if (!dlg || dlg.hidden) return;
    dlg.hidden = true; document.documentElement.style.overflow = ""; clearInterval(timer);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function msg(text) { var p = dlg.querySelector("[data-ac-msg]"); if (p) { p.textContent = text || ""; p.hidden = !text; } }
  function errText(j) { var e = U.err[j.error] || U.err.other; return fmt(e, { n: j.left != null ? j.left : "" }); }

  function signIn() {
    if (!API.url) return;
    lastFocus = document.activeElement; ensure();
    if (token()) return account();
    state.step === "code" && state.email ? codeStep() : emailStep();
  }
  function emailStep() {
    state.step = "email";
    show(shell(T(U.title), '<p class="bk-p">' + esc(T(U.intro)) + "</p>" +
      '<form class="ac-f" data-ac-email novalidate><label for="ac-e">' + esc(T(U.email)) + '</label><input id="ac-e" class="ac-in" type="email" inputmode="email" autocomplete="email" dir="ltr" required value="' + esc(state.email) + '">' +
      '<p class="bk-bad" data-ac-msg role="alert" hidden></p><button type="submit" class="bk-btn is-main">' + esc(T(U.send)) + "</button></form>" +
      '<p class="bk-note">🔒 ' + esc(T(U.priv)) + "</p>"), "#ac-e");
  }
  function codeStep() {
    state.step = "code";
    show(shell(T(U.codeT), '<p class="bk-p">' + esc(fmt(U.codeSent, { e: state.email })) + "</p>" +
      '<form class="ac-f" data-ac-code novalidate><label for="ac-c">' + esc(T(U.code)) + '</label><input id="ac-c" class="ac-in ac-code" type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="9" required>' +
      '<p class="bk-bad" data-ac-msg role="alert" hidden></p><button type="submit" class="bk-btn is-main">' + esc(T(U.verify)) + "</button></form>" +
      '<div class="ac-links"><button type="button" class="ac-link" data-ac-other>' + esc(T(U.other)) + '</button><button type="button" class="ac-link" data-ac-resend></button></div>'), "#ac-c");
    tick();
  }
  function tick() {
    clearInterval(timer);
    var b = function () { var r = dlg && dlg.querySelector("[data-ac-resend]"); if (!r) return; var s = Math.ceil((state.wait - Date.now()) / 1000); r.disabled = s > 0; r.textContent = s > 0 ? fmt(U.resendIn, { s: s }) : T(U.resend); if (s <= 0) clearInterval(timer); };
    b(); timer = setInterval(b, 1000);
  }
  function busy(form, on, label) { var b = form.querySelector("[type=submit]"); b.disabled = on; if (label) b.textContent = T(label); }
  function sendCode(email, form) {
    if (form) busy(form, true, U.sending);
    return api("/auth/start", { method: "POST", body: { email: email, lang: AR ? "ar" : "en" }, noAuth: true }).then(function (j) {
      if (form) busy(form, false, U.send);
      if (j.error) { msg(errText(j)); return false; }
      state.email = email; state.wait = Date.now() + 30000; return true;
    });
  }
  function onSubmit(e) {
    e.preventDefault();
    var f = e.target;
    if (f.hasAttribute("data-ac-email")) {
      var em = f.querySelector("input").value.trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em)) { msg(T(U.err.bad_email)); return; }
      sendCode(em, f).then(function (okk) { if (okk) codeStep(); });
      return;
    }
    if (f.hasAttribute("data-ac-code")) {
      var c = f.querySelector("input").value.replace(/\D/g, "");
      if (c.length !== 6) { msg(T(U.err.bad_code)); return; }
      busy(f, true, U.checking);
      api("/auth/verify", { method: "POST", body: { email: state.email, code: c, lang: AR ? "ar" : "en" }, noAuth: true }).then(function (j) {
        if (j.error) { busy(f, false, U.verify); msg(errText(j)); var i = f.querySelector("input"); i.select(); return; }
        set("masarok-session", j.token); set("masarok-me", JSON.stringify(j.me)); set("masarok-sync", null);
        var em2 = state.email; state = { step: "email", email: "", wait: 0 };
        sync().then(function () { toastNext(fmt(U.welcome, { e: em2 })); location.reload(); });
      });
    }
  }
  function when(ms) {
    if (!ms) return T(U.never);
    var m = Math.round((Date.now() - ms) / 60000);
    return fmt(U.synced, { w: m < 1 ? T(U.justNow) : m < 60 ? fmt(U.minsAgo, { n: m }) : fmt(U.at, { d: day(ms / 1000) }) });
  }
  function day(s) { try { return new Date(s * 1000).toLocaleDateString(AR ? "ar-SA-u-ca-gregory-nu-latn" : "en-GB", { day: "numeric", month: "long", year: "numeric" }); } catch (e) { return new Date(s * 1000).toISOString().slice(0, 10); } }
  function prodName(p) { return U.products[p] ? T(U.products[p]) : p.replace(/^(course|subject):/, "").replace(/-/g, " "); }
  function account() {
    var m = me() || {}, sy = meta();
    armedDel = false;
    var list = (m.products || []).length ? '<ul class="ac-list">' + m.products.map(function (p) { return "<li><span>" + esc(prodName(p.product)) + "</span><small>" + esc(p.until ? fmt(U.until, { d: day(p.until) }) : T(U.forever)) + "</small></li>"; }).join("") + "</ul>" : '<p class="bk-sum">' + esc(T(U.ownedNone)) + "</p>";
    show(shell(T(U.accT),
      '<section class="bk-s"><p class="bk-sum">' + esc(T(U.signedAs)) + '</p><p class="ac-who" dir="ltr"><b>' + esc(m.email || "") + "</b></p></section>" +
      '<section class="bk-s"><h3>' + esc(T(U.owned)) + "</h3>" + list + "</section>" +
      '<section class="bk-s"><h3>' + esc(T(U.syncT)) + '</h3><p class="bk-sum" data-ac-when>' + esc(when(sy.at)) + '</p><p class="bk-bad" data-ac-msg role="alert" hidden></p><div class="bk-row"><button type="button" class="bk-btn" data-ac-sync>↻ ' + esc(T(U.syncNow)) + "</button></div></section>" +
      '<section class="bk-s"><div class="bk-row"><button type="button" class="bk-btn" data-ac-out>' + esc(T(U.out)) + '</button></div><p class="bk-note">' + esc(T(U.outSub)) + "</p>" +
      '<div class="bk-row"><button type="button" class="bk-btn" data-ac-del>' + esc(T(U.del)) + '</button></div><p class="bk-note">' + esc(T(U.delSub)) + "</p></section>"));
    // refresh what they own in the background
    api("/me").then(function (j) { if (!j.error && j.email) { set("masarok-me", JSON.stringify(j)); } });
  }
  function onClick(e) {
    var t = e.target;
    if (t.closest("[data-ac-close]")) { closeDlg(); return; }
    if (t.closest("[data-ac-other]")) { emailStep(); return; }
    if (t.closest("[data-ac-resend]")) { sendCode(state.email).then(function (okk) { if (okk) { msg(""); tick(); var i = dlg.querySelector("#ac-c"); if (i) { i.value = ""; i.focus(); } } }); return; }
    var sb = t.closest("[data-ac-sync]");
    if (sb) {
      sb.disabled = true; sb.textContent = T(U.syncing);
      sync().then(function (r) {
        sb.disabled = false; sb.textContent = "↻ " + T(U.syncNow);
        if (!r.ok) { msg(T(U.syncFail)); return; }
        msg(""); dlg.querySelector("[data-ac-when]").textContent = when(meta().at);
        if (r.changed) { toastNext(T(U.merged)); location.reload(); }
      });
      return;
    }
    if (t.closest("[data-ac-out]")) {
      sync().then(function () { api("/auth/logout", { method: "POST" }); forget(); toastNext(T(U.outDone)); location.reload(); });
      return;
    }
    var db = t.closest("[data-ac-del]");
    if (db) {
      if (!armedDel) { armedDel = true; db.classList.add("is-armed"); db.textContent = T(U.delSure); return; }
      db.disabled = true;
      api("/me", { method: "DELETE", body: { confirm: "DELETE" } }).then(function (j) {
        if (j.error && j._s !== 401) { db.disabled = false; msg(errText(j)); return; }
        forget(); toastNext(T(U.delDone)); location.reload();
      });
    }
  }

  // ---------- a short message that survives a reload ----------
  function toastNext(text) { try { sessionStorage.setItem("masarok-toast", text); } catch (e) {} }
  function toast(text) {
    addCss();
    var d = document.createElement("p"); d.className = "ac-toast"; d.setAttribute("role", "status"); d.textContent = text;
    document.body.appendChild(d); setTimeout(function () { d.remove(); }, 5000);
  }

  // ---------- menu item (menu.js asks for it) ----------
  function menuItem() {
    if (!API.url) return "";
    var m = token() && me();
    return '<li><button type="button" class="mn-item" data-mn-account><span class="mn-ic" aria-hidden="true">' + (m ? "👤" : "🔑") + '</span><span class="mn-tx"><b>' + esc(T(m ? U.itemIn : U.item)) + "</b><small" + (m ? ' dir="ltr"' : "") + ">" + esc(m ? m.email : T(U.itemSub)) + "</small></span></button></li>";
  }

  // ---------- start ----------
  window.MasarokAccount = {
    enabled: !!API.url, url: API.url,
    signedIn: function () { return !!(API.url && token()); },
    me: me, owns: owns, course: course, sync: sync, open: signIn, menuItem: menuItem,
    _merge: merge
  };
  function start() {
    var t; try { t = sessionStorage.getItem("masarok-toast"); sessionStorage.removeItem("masarok-toast"); } catch (e) {}
    if (t) toast(t);
    if (!API.url || !token()) return;
    var m = meta();
    // a full sync on each page load (at most once a minute), reloading once if another device brought new progress
    if (!m.at || Date.now() - m.at > 60000) sync().then(function (r) {
      if (r.ok && r.changed) { var n = 0; try { n = +sessionStorage.getItem("masarok-sync-reload") || 0; } catch (e) {} if (n < 1) { try { sessionStorage.setItem("masarok-sync-reload", "1"); } catch (e) {} toastNext(T(U.merged)); location.reload(); } }
      else { try { sessionStorage.removeItem("masarok-sync-reload"); } catch (e) {} }
    });
    document.addEventListener("visibilitychange", function () { if (document.visibilityState === "hidden") pushOnly(); });
    window.addEventListener("pagehide", pushOnly);
    // keep what they own fresh (at most every 10 minutes)
    var mm = me(); if (!mm || !mm.at || Date.now() - mm.at > 600000) api("/me").then(function (j) { if (!j.error && j.email) { j.at = Date.now(); set("masarok-me", JSON.stringify(j)); } });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();

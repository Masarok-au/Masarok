/* Masarok site menu: one ☰ Menu button on every page, opening a drawer with all the pages
   (the guide, Guide me, the journey map, Masarok Academy), the guide's sections and extras.
   Shared by the guide pages and the Academy pages, in English and Arabic. */
(function () {
  "use strict";
  function IC(x, c) { return window.MasarokIcon ? window.MasarokIcon.from(x, c) : (x || ""); }

  var AR = (document.documentElement.lang || "en").slice(0, 2) === "ar";
  var A = AR ? 1 : 0;
  function T(x) { return x[A]; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c]; }); }
  var base = AR ? "/ar/" : "/";
  var path = location.pathname.replace(/index\.html$/, "");
  var onAcademy = /\/academy(\/|$)/.test(path);
  var onGuide = !!document.getElementById("options");
  var FORM = "https://docs.google.com/forms/d/e/1FAIpQLSdVGMftz6scJBj8c-EaS6RiCKUwoXW71xYNwpxmqZ7jpOsHQQ/viewform";

  var UI = {
    menu: ["Menu", "القائمة"], close: ["Close menu", "إغلاق القائمة"],
    gMain: ["Masarok", "مسارُك"], gGuide: ["In the guide", "في الدليل"], gMore: ["More", "المزيد"],
    newTag: ["New", "جديد"],
    install: ["Install the app", "ثبّت التطبيق"], feedback: ["Share your feedback", "شارك رأيك"],
    other: ["العربية", "English"],
    reset: ["Clear my choices", "امسح اختياراتي"], resetSub: ["Country, city, university and degree level. Your progress stays.", "الدولة والمدينة والجامعة والدرجة العلمية. يبقى تقدمك كما هو."],
    resetSure: ["Tap again to clear your choices", "اضغط مرة أخرى لمسح اختياراتك"], resetNone: ["No saved choices yet", "لا توجد اختيارات محفوظة"]
  };
  var PAGES = [
    { id: "home", i: "🏠", href: base, n: ["The guide", "الدليل"], d: ["Everything about studying abroad, for your country", "كل ما تحتاجه للدراسة في الخارج، حسب دولتك"] },
    { id: "journey", i: "🧭", href: base + "#journey", n: ["Guide me, step by step", "أرشدني خطوة بخطوة"], d: ["Your personal plan, with points and badges", "خطتك الشخصية، مع النقاط والأوسمة"] },
    { id: "map", i: "🗺️", href: base + "#map", n: ["Journey map", "خريطة الرحلة"], d: ["Your road from home to campus", "طريقك من البيت إلى الجامعة"] },
    { id: "academy", i: "🎓", href: base + "academy/", n: ["Masarok Academy", "أكاديمية مسارُك"], d: ["Train for every step: IELTS, essays, visa practice", "تدرّب على كل خطوة: IELTS والمقالات والتأشيرة"], isNew: true },
    { id: "coach", i: "✨", href: base + "academy/coach/", n: ["AI coach", "المدرب الذكي"], d: ["Detailed AI feedback on your writing and speaking", "ملاحظات مفصلة بالذكاء الاصطناعي على كتابتك ومحادثتك"] }
  ];
  var SECTIONS = [
    ["options", "Study options", "خيارات الدراسة"], ["sacm", "The scholarship", "الابتعاث"], ["deadlines", "Deadlines", "المواعيد"],
    ["allowance", "Allowance and budget", "المكافأة والميزانية"], ["before", "Before you fly", "قبل السفر"], ["arrival", "First weeks", "الأسابيع الأولى"],
    ["housing", "Housing", "السكن"], ["money", "Money and work", "المال والعمل"], ["links", "Official links", "روابط رسمية"]
  ];

  // ---------- styles ----------
  var css =
    ".mn-btn{display:inline-flex; align-items:center; gap:8px; font:inherit; font-size:.9375rem; font-weight:700; color:var(--night-ink, #EEF2F7); background:rgba(226,182,108,.1); border:1px solid rgba(226,182,108,.6); border-radius:999px; padding:4px 14px 4px 12px; cursor:pointer}" +
    ".mn-btn:hover{background:rgba(226,182,108,.22)}" +
    ".mn-btn:focus-visible{outline:3px solid var(--gold, #E2B66C); outline-offset:2px}" +
    ".mn-btn svg{width:16px; height:16px}" +
    // header layout: brand, then the page links, then Menu; on phones Menu sits beside the brand
    ".top > .brand{order:0} .top > nav{order:2; margin-inline-start:auto} .top > .mn-btn{order:3}" +
    "@media (max-width:720px){ .top > nav{order:1; margin-inline-start:auto} .top > .mn-btn{order:2} }" +
    ".mn{position:fixed; inset:0; z-index:160}" +
    ".mn[hidden]{display:none}" +
    ".mn-bg{position:absolute; inset:0; background:rgba(5,10,18,.62); backdrop-filter:blur(3px); animation:mnFade .2s ease}" +
    ".mn-sheet{position:absolute; top:0; bottom:0; inset-inline-end:0; width:min(23rem, 90vw); display:flex; flex-direction:column; overflow:auto; overscroll-behavior:contain;" +
    "  background:var(--night, #0B1626); color:var(--night-ink, #EEF2F7); border-inline-start:1px solid rgba(226,182,108,.35); box-shadow:-20px 0 60px -20px rgba(0,0,0,.7);" +
    "  padding-bottom:calc(20px + env(safe-area-inset-bottom, 0px)); animation:mnIn .28s cubic-bezier(.2,.8,.3,1)}" +
    "[dir='rtl'] .mn-sheet{animation-name:mnInR}" +
    ".mn-sheet > .sadu{flex:none; margin-top:env(safe-area-inset-top, 0px)}" +
    ".mn-head{display:flex; align-items:center; justify-content:space-between; gap:10px; padding:16px 18px 6px}" +
    ".mn-brand{font-family:var(--f-display); font-weight:800; font-size:1.25rem; color:var(--night-ink, #EEF2F7); text-decoration:none; display:flex; gap:8px; align-items:baseline}" +
    ".mn-brand span{font-family:var(--f-ar); font-weight:500; color:var(--gold, #E2B66C); font-size:1.0625rem}" +
    ".mn-x{width:38px; height:38px; border-radius:50%; border:1px solid rgba(238,242,247,.25); background:transparent; color:var(--night-ink, #EEF2F7); font-size:1.4rem; line-height:1; cursor:pointer}" +
    ".mn-x:hover{border-color:var(--gold, #E2B66C); color:var(--gold, #E2B66C)}" +
    ".mn-g{padding:10px 14px 0}" +
    ".mn-g h2{font-family:var(--f-mono); font-size:.8125rem; color:var(--gold, #E2B66C); font-weight:500; margin:8px 6px 8px}" +
    ".mn-list{list-style:none; margin:0; padding:0; display:grid; gap:4px}" +
    ".mn-item{display:flex; align-items:center; gap:12px; width:100%; padding:10px 10px; border-radius:12px; color:var(--night-ink, #EEF2F7); text-decoration:none; border:1px solid transparent; background:none; font:inherit; text-align:start; cursor:pointer}" +
    ".mn-item:hover{background:rgba(226,182,108,.08); border-color:rgba(226,182,108,.3)}" +
    ".mn-item:focus-visible{outline:2px solid var(--gold, #E2B66C); outline-offset:1px}" +
    ".mn-item[aria-current='page']{background:rgba(226,182,108,.14); border-color:rgba(226,182,108,.55)}" +
    ".mn-ic{flex:none; width:40px; height:40px; border-radius:12px; display:grid; place-items:center; font-size:1.25rem; background:rgba(255,255,255,.05); border:1px solid rgba(238,242,247,.1)}" +
    ".mn-tx{display:grid; gap:1px; min-width:0}" +
    ".mn-tx b{font-size:1.0625rem; display:flex; align-items:center; gap:8px}" +
    ".mn-tx small{color:var(--night-dim, #A9B8CB); font-size:.8125rem; line-height:1.35}" +
    ".mn-new{font-family:var(--f-mono); font-size:.75rem; color:#1A1206; background:var(--gold, #E2B66C); border-radius:999px; padding:1px 7px; font-weight:500}" +
    ".mn-secs{list-style:none; margin:0; padding:0 4px; display:grid; grid-template-columns:1fr 1fr; gap:2px 8px}" +
    ".mn-secs a{display:block; padding:7px 8px; border-radius:8px; color:var(--night-dim, #A9B8CB); text-decoration:none; font-size:.9375rem}" +
    ".mn-secs a:hover{color:var(--night-ink, #EEF2F7); background:rgba(255,255,255,.05)}" +
    ".mn-secs a:focus-visible{outline:2px solid var(--gold, #E2B66C)}" +
    ".mn-more{display:grid; gap:4px}" +
    ".mn-reset .mn-ic{font-size:1.25rem; color:var(--gold, #E2B66C)}" +
    ".mn-reset.is-armed{border-color:#E07A6E; background:rgba(224,122,110,.12)}" +
    ".mn-reset.is-armed b{color:#F2A79D}" +
    ".mn-reset[disabled]{opacity:.55; cursor:default}" +
    ".mn-reset[disabled]:hover{background:none; border-color:transparent}" +
    ".mn-lang:lang(ar){font-family:var(--f-ar)}" +
    ".mn-foot{margin-top:auto; padding:18px 20px 0; color:var(--night-dim, #A9B8CB); font-size:.8125rem}" +
    "@keyframes mnIn{from{transform:translateX(100%)}to{transform:none}}" +
    "@keyframes mnInR{from{transform:translateX(-100%)}to{transform:none}}" +
    "@keyframes mnFade{from{opacity:0}to{opacity:1}}" +
    // on phones the menu replaces the long row of section links in the header
    // the menu holds every section, so the header keeps only the key links
    ".top nav a[href^='#']:not(.lang){display:none !important}" +
    ".top nav{align-items:center}" +
    "@media (max-width:720px){ .top nav .nav-ac{display:none !important} }" +
    ".nav-new{font-family:var(--f-mono); font-size:.75rem; color:#1A1206; background:var(--gold, #E2B66C); border-radius:999px; padding:0 6px; margin-inline-start:4px; vertical-align:2px}" +
    ".bkm{display:grid; place-items:center; padding:16px}" +
    ".bkm .mn-bg{animation:mnFade .2s ease}" +
    ".bk-box{position:relative; width:min(32rem, 100%); max-height:calc(100vh - 32px); overflow:auto; background:var(--night, #0B1626); color:var(--night-ink, #EEF2F7); border:1px solid rgba(226,182,108,.45); border-radius:18px; box-shadow:0 30px 80px -30px rgba(0,0,0,.9)}" +
    ".bk-in{display:grid; gap:14px; padding:0 18px 18px}" +
    ".bk-head{padding:14px 0 0}" +
    ".bk-head h2{font-family:var(--f-display); font-size:1.25rem; margin:0}" +
    "[lang='ar'] .bk-head h2{font-family:var(--f-ar)}" +
    ".bk-p{margin:0; color:#D5DEE9; font-size:.9375rem; line-height:1.6}" +
    ".bk-s{display:grid; gap:10px; padding:14px; border-radius:14px; border:1px solid rgba(238,242,247,.14); background:rgba(16,34,60,.7)}" +
    ".bk-s h3{margin:0; font-size:1.0625rem; font-family:inherit}" +
    ".bk-sum{margin:0; font-size:.9375rem; color:var(--night-dim, #A9B8CB); line-height:1.6}" +
    ".bk-sum b{color:var(--night-ink, #EEF2F7)}" +
    ".bk-row{display:flex; gap:8px; flex-wrap:wrap}" +
    ".bk-btn{display:inline-flex; align-items:center; justify-content:center; gap:8px; font:inherit; font-weight:700; font-size:.9375rem; padding:10px 16px; border-radius:999px; border:1px solid rgba(238,242,247,.35); background:transparent; color:var(--night-ink, #EEF2F7); cursor:pointer; position:relative}" +
    ".bk-btn:hover{border-color:var(--gold, #E2B66C)}" +
    ".bk-btn.is-main{background:var(--gold, #E2B66C); color:#1A1206; border-color:var(--gold, #E2B66C)}" +
    ".bk-btn.is-armed{background:#E07A6E; border-color:#E07A6E; color:#1A0A06}" +
    ".bk-btn:disabled{opacity:.5; cursor:default}" +
    ".bk-btn:focus-visible, .bk-pick:focus-within{outline:3px solid var(--gold, #E2B66C); outline-offset:2px}" +
    ".bk-pick{justify-self:start}" +
    ".bk-pick input{position:absolute; inset:0; opacity:0; cursor:pointer; width:100%}" +
    ".bk-bad{margin:0; color:#F6C2B9; font-size:.9375rem}" +
    ".bk-note{margin:0; font-size:.8125rem; color:var(--night-dim, #A9B8CB)}" +
    "@media (prefers-reduced-motion: reduce){ .mn-sheet, .mn-bg{animation:none} }";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  var ICON_MENU = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';

  // ---------- the picker's saved choices ----------
  var PICK = ["masarok-country", "masarok-city", "masarok-uni", "masarok-level"];
  function hasChoices() { try { return PICK.some(function (k) { var v = localStorage.getItem(k); return v && v !== "all"; }); } catch (e) { return false; } }
  function clearChoices() {
    try { PICK.forEach(function (k) { localStorage.removeItem(k); }); } catch (e) {}
    // reload without ?country=…&uni=… so nothing is picked again from the address
    location.replace(location.pathname);
  }
  function resetItem() {
    var has = hasChoices();
    return '<li><button type="button" class="mn-item mn-reset" data-mn-reset' + (has ? "" : " disabled") + '><span class="mn-ic" aria-hidden="true">↺</span><span class="mn-tx"><b>' + esc(T(has ? UI.reset : UI.resetNone)) + "</b>" + (has ? "<small>" + esc(T(UI.resetSub)) + "</small>" : "") + "</span></button></li>";
  }
  var armed = false;

  // ---------- move your progress: save a backup file, load it on another phone ----------
  var BK = {
    item: ["Move my progress", "انقل تقدمي"], itemSub: ["Save a backup, or load one on a new phone", "احفظ نسخة احتياطية، أو حمّلها على جوال جديد"],
    title: ["Move your progress", "انقل تقدمك"],
    intro: ["Your progress is saved only on this device. To move it, save a backup file, send it to yourself (WhatsApp, Telegram or email), then open masarok.org on the new phone and load it here.", "يُحفظ تقدمك على هذا الجهاز فقط. لنقله، احفظ ملفًا احتياطيًا وأرسله لنفسك (واتساب أو تيليجرام أو البريد)، ثم افتح masarok.org على الجوال الجديد وحمّله من هنا."],
    saveT: ["1 · Save a backup", "1 · احفظ نسخة احتياطية"], save: ["Save backup file", "احفظ الملف الاحتياطي"], share: ["Send it…", "أرسله…"],
    loadT: ["2 · Load a backup", "2 · حمّل نسخة احتياطية"], pick: ["Choose a backup file", "اختر الملف الاحتياطي"],
    apply: ["Replace my progress with this backup", "استبدل تقدمي بهذه النسخة"], applySure: ["Tap again: this replaces what's on this device", "اضغط مرة أخرى: سيُستبدل ما على هذا الجهاز"],
    bad: ["That isn't a Masarok backup file.", "هذا ليس ملفًا احتياطيًا من مسارُك."], empty: ["Nothing saved on this device yet.", "لا يوجد تقدم محفوظ على هذا الجهاز بعد."],
    from: ["Backup from {d}", "نسخة بتاريخ {d}"], here: ["On this device", "على هذا الجهاز"],
    steps: ["{n} Guide me steps done", "{n} خطوات منجزة في «أرشدني»"], lessons: ["{n} Academy lessons done", "{n} دروس منجزة في الأكاديمية"], pts: ["{n} bonus points", "{n} نقطة إضافية"],
    code: ["your AI coach code", "رمز المدرب الذكي"], choices: ["your country and university", "دولتك وجامعتك"],
    priv: ["The file stays with you: nothing is uploaded. It includes your AI coach code if you have one, so only send it to yourself.", "يبقى الملف معك ولا يُرفع إلى أي مكان. ويتضمن رمز المدرب الذكي إن كان لديك، فلا ترسله إلا لنفسك."],
    done: ["Progress loaded. Reloading…", "تم تحميل التقدم. جارٍ إعادة التحميل…"], close: ["Close", "إغلاق"]
  };
  // device-only keys never go in a backup file: the dev override and the account sign-in
  var BK_SKIP = ["masarok-ai-dev", "masarok-session", "masarok-sync", "masarok-me"];
  function bkKeys() { var out = []; try { for (var i = 0; i < localStorage.length; i++) { var k = localStorage.key(i); if (/^masarok-[\w-]{1,60}$/.test(k) && BK_SKIP.indexOf(k) < 0) out.push(k); } } catch (e) {} return out.sort(); }
  function bkCollect() { var d = {}; bkKeys().forEach(function (k) { try { d[k] = localStorage.getItem(k); } catch (e) {} }); return d; }
  function bkSummary(d) {
    function J(k) { try { return JSON.parse(d[k] || "null") || {}; } catch (e) { return {}; } }
    var steps = 0, j = J("masarok-journey"); Object.keys(j.done || {}).forEach(function (lv) { var o = j.done[lv] || {}; Object.keys(o).forEach(function (s) { if (o[s] === "done") steps++; }); });
    var ac = J("masarok-academy"), lessons = 0; Object.keys(ac.lessons || {}).forEach(function (k) { if ((ac.lessons[k] || {}).done) lessons++; });
    var g = J("masarok-game"), pts = 0; Object.keys(g.bonus || {}).forEach(function (k) { pts += +g.bonus[k] || 0; });
    var parts = [fmtB(BK.steps, steps), fmtB(BK.lessons, lessons)];
    if (pts) parts.push(fmtB(BK.pts, pts));
    if (d["masarok-ai-code"]) parts.push(T(BK.code));
    if (d["masarok-country"] && d["masarok-country"] !== "all") parts.push(T(BK.choices));
    return parts;
  }
  function fmtB(s, n) { return T(s).replace("{n}", n); }
  function bkDate(t) { return new Date(t).toLocaleDateString(AR ? "ar-SA-u-ca-gregory" : "en-AU", { day: "numeric", month: "long", year: "numeric" }); }
  function bkFile() {
    var data = bkCollect(), body = JSON.stringify({ app: "masarok", v: 1, at: Date.now(), data: data }, null, 1);
    var dt = new Date(), name = "masarok-backup-" + dt.getFullYear() + "-" + ("0" + (dt.getMonth() + 1)).slice(-2) + "-" + ("0" + dt.getDate()).slice(-2) + ".json";
    return { name: name, blob: new Blob([body], { type: "application/json" }), n: Object.keys(data).length };
  }
  function bkParse(text) {
    var o; try { o = JSON.parse(text); } catch (e) { return null; }
    if (!o || o.app !== "masarok" || typeof o.data !== "object" || !o.data) return null;
    var d = {}, ok = true, size = 0;
    Object.keys(o.data).forEach(function (k) { var v = o.data[k]; if (BK_SKIP.indexOf(k) > -1) return; if (!/^masarok-[\w-]{1,60}$/.test(k) || typeof v !== "string") { ok = false; return; } size += v.length; d[k] = v; });
    if (!ok || size > 4e6 || !Object.keys(d).length) return null;
    return { at: +o.at || 0, data: d };
  }
  var bk, bkPending = null, bkArmed = false;
  function bkOpen() {
    close(true);
    if (!bk) {
      bk = document.createElement("div"); bk.className = "mn bkm"; bk.hidden = true;
      bk.innerHTML = '<div class="mn-bg" data-bk-close></div><div class="bk-box" role="dialog" aria-modal="true" aria-labelledby="bk-h"><div class="sadu" aria-hidden="true"></div><div class="bk-in">' +
        '<div class="mn-head bk-head"><h2 id="bk-h">📦 ' + esc(T(BK.title)) + '</h2><button type="button" class="mn-x" data-bk-close aria-label="' + esc(T(BK.close)) + '">×</button></div>' +
        '<p class="bk-p">' + esc(T(BK.intro)) + "</p>" +
        '<section class="bk-s"><h3>' + esc(T(BK.saveT)) + '</h3><p class="bk-sum" data-bk-here></p><div class="bk-row"><button type="button" class="bk-btn is-main" data-bk-save>⬇ ' + esc(T(BK.save)) + '</button><button type="button" class="bk-btn" data-bk-share hidden>↗ ' + esc(T(BK.share)) + "</button></div></section>" +
        '<section class="bk-s"><h3>' + esc(T(BK.loadT)) + '</h3><label class="bk-btn bk-pick">📂 ' + esc(T(BK.pick)) + '<input type="file" accept=".json,application/json" data-bk-file></label><div data-bk-preview></div></section>' +
        '<p class="bk-note">' + IC("lock") + ' ' + esc(T(BK.priv)) + "</p></div></div>";
      document.body.appendChild(bk);
      bk.addEventListener("click", bkClick);
      bk.addEventListener("change", bkChange);
      bk.addEventListener("keydown", function (e) {
        if (e.key === "Escape") { bkClose(); return; }
        if (e.key !== "Tab") return;
        var f = bk.querySelectorAll("button:not([hidden]), input, label"), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      });
    }
    var here = bkCollect(), has = Object.keys(here).length;
    bk.querySelector("[data-bk-here]").textContent = has ? T(BK.here) + ": " + bkSummary(here).join(" · ") : T(BK.empty);
    bk.querySelector("[data-bk-save]").disabled = !has;
    var f = bkFile(), canShare = false; try { canShare = !!(navigator.canShare && navigator.canShare({ files: [new File([f.blob], f.name, { type: "application/json" })] })); } catch (e) {}
    bk.querySelector("[data-bk-share]").hidden = !canShare || !has;
    bk.querySelector("[data-bk-preview]").innerHTML = ""; bkPending = null; bkArmed = false;
    bk.hidden = false; document.documentElement.style.overflow = "hidden";
    bk.querySelector(".mn-x").focus();
  }
  function bkClose() { if (!bk || bk.hidden) return; bk.hidden = true; document.documentElement.style.overflow = ""; if (btn) btn.focus(); }
  function bkClick(e) {
    var t = e.target;
    if (t.closest("[data-bk-close]")) { bkClose(); return; }
    if (t.closest("[data-bk-save]")) {
      var f = bkFile(), a = document.createElement("a"); a.href = URL.createObjectURL(f.blob); a.download = f.name;
      document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500); return;
    }
    if (t.closest("[data-bk-share]")) { var g = bkFile(); try { navigator.share({ files: [new File([g.blob], g.name, { type: "application/json" })], title: g.name }).catch(function () {}); } catch (x) {} return; }
    var ap = t.closest("[data-bk-apply]");
    if (ap && bkPending) {
      if (!bkArmed) { bkArmed = true; ap.classList.add("is-armed"); ap.textContent = T(BK.applySure); return; }
      try {
        bkKeys().forEach(function (k) { localStorage.removeItem(k); });
        Object.keys(bkPending.data).forEach(function (k) { localStorage.setItem(k, bkPending.data[k]); });
      } catch (x) {}
      ap.disabled = true; ap.textContent = T(BK.done);
      setTimeout(function () { location.replace(location.pathname); }, 600);
    }
  }
  function bkChange(e) {
    var inp = e.target; if (!inp.hasAttribute("data-bk-file") || !inp.files || !inp.files[0]) return;
    var out = bk.querySelector("[data-bk-preview]"), file = inp.files[0];
    bkPending = null; bkArmed = false;
    if (file.size > 5e6) { out.innerHTML = '<p class="bk-bad">' + esc(T(BK.bad)) + "</p>"; return; }
    var r = new FileReader();
    r.onload = function () {
      var p = bkParse(String(r.result || ""));
      if (!p) { out.innerHTML = '<p class="bk-bad">' + esc(T(BK.bad)) + "</p>"; return; }
      bkPending = p;
      out.innerHTML = '<p class="bk-sum"><b>' + esc(T(BK.from).replace("{d}", p.at ? bkDate(p.at) : "—")) + "</b><br>" + esc(bkSummary(p.data).join(" · ")) + '</p><button type="button" class="bk-btn is-main" data-bk-apply>' + esc(T(BK.apply)) + "</button>";
    };
    r.readAsText(file);
    inp.value = "";
  }
  function bkItem() { return '<li><button type="button" class="mn-item" data-mn-backup><span class="mn-ic" aria-hidden="true">📦</span><span class="mn-tx"><b>' + esc(T(BK.item)) + "</b><small>" + esc(T(BK.itemSub)) + "</small></span></button></li>"; }

  // ---------- the drawer ----------
  var mn, btn, lastFocus;
  function current(id) {
    if (id === "coach") return /\/academy\/coach(\/|$)/.test(path);
    if (id === "academy") return onAcademy && !/\/academy\/coach(\/|$)/.test(path);
    if (id === "home") return !onAcademy && !/#(journey|map)$/.test(location.hash);
    return false;
  }
  function otherLangHref() {
    var p = path;
    if (AR) p = p.replace(/^\/ar\//, "/"); else p = "/ar" + (p.charAt(0) === "/" ? p : "/" + p);
    return p || "/";
  }
  function build() {
    mn = document.createElement("div");
    mn.className = "mn"; mn.hidden = true;
    var pages = PAGES.map(function (p) {
      return '<li><a class="mn-item" href="' + esc(p.href) + '" data-mn-id="' + p.id + '"' + (current(p.id) ? ' aria-current="page"' : "") + '>' +
        '<span class="mn-ic" aria-hidden="true">' + IC(p.i) + '</span><span class="mn-tx"><b>' + esc(T(p.n)) + (p.isNew ? ' <span class="mn-new">' + esc(T(UI.newTag)) + "</span>" : "") + "</b><small>" + esc(T(p.d)) + "</small></span></a></li>";
    }).join("");
    var secs = SECTIONS.map(function (s) {
      return '<li><a href="' + (onGuide ? "#" + s[0] : base + "#" + s[0]) + '">' + esc(AR ? s[2] : s[1]) + "</a></li>";
    }).join("");
    var install = document.querySelector(".app-chip") ? '<li><button type="button" class="mn-item" data-mn-install><span class="mn-ic" aria-hidden="true">📲</span><span class="mn-tx"><b>' + esc(T(UI.install)) + "</b></span></button></li>" : "";
    mn.innerHTML = '<div class="mn-bg" data-mn-close></div>' +
      '<div class="mn-sheet" role="dialog" aria-modal="true" aria-label="' + esc(T(UI.menu)) + '"><div class="sadu" aria-hidden="true"></div>' +
      '<div class="mn-head"><a class="mn-brand" href="' + base + '">Masarok <span lang="ar">مسارُك</span></a><button type="button" class="mn-x" data-mn-close aria-label="' + esc(T(UI.close)) + '">×</button></div>' +
      '<div class="mn-g"><h2>' + esc(T(UI.gMain)) + '</h2><ul class="mn-list">' + pages + "</ul></div>" +
      '<div class="mn-g"><h2>' + esc(T(UI.gGuide)) + '</h2><ul class="mn-secs">' + secs + "</ul></div>" +
      '<div class="mn-g"><h2>' + esc(T(UI.gMore)) + '</h2><ul class="mn-list mn-more">' +
        '<li><a class="mn-item" href="' + FORM + '" target="_blank" rel="noopener"><span class="mn-ic" aria-hidden="true">💬</span><span class="mn-tx"><b>' + esc(T(UI.feedback)) + " ↗</b></span></a></li>" + install +
        '<li><a class="mn-item mn-lang" href="' + esc(otherLangHref()) + '" lang="' + (AR ? "en" : "ar") + '" hreflang="' + (AR ? "en" : "ar") + '"><span class="mn-ic" aria-hidden="true">🌐</span><span class="mn-tx"><b>' + esc(T(UI.other)) + "</b></span></a></li>" +
      (window.MasarokAccount ? window.MasarokAccount.menuItem() : "") + bkItem() + resetItem() + "</ul></div>" +
      '<p class="mn-foot">masarok.org · ' + (AR ? "دليل مجاني يكتبه طالب" : "A free guide written by a student") + "</p></div>";
    document.body.appendChild(mn);
    mn.addEventListener("click", onClick);
    mn.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { e.stopPropagation(); close(); return; }
      if (e.key !== "Tab") return;
      var f = mn.querySelectorAll("a, button"), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }
  function open() {
    if (!mn) build();
    else { var r = mn.querySelector(".mn-reset"); if (r) { var tmp = document.createElement("ul"); tmp.innerHTML = resetItem(); r.parentNode.replaceWith(tmp.firstChild); } }
    armed = false;
    lastFocus = document.activeElement;
    mn.hidden = false; btn && btn.setAttribute("aria-expanded", "true");
    document.documentElement.style.overflow = "hidden";
    var f = mn.querySelector("[aria-current='page']") || mn.querySelector(".mn-item"); if (f) f.focus();
  }
  function close(noFocus) {
    if (!mn || mn.hidden) return;
    mn.hidden = true; btn && btn.setAttribute("aria-expanded", "false");
    document.documentElement.style.overflow = "";
    if (!noFocus && lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function onClick(e) {
    var t = e.target;
    if (t.closest("[data-mn-close]")) { close(); return; }
    var rs = t.closest("[data-mn-reset]");
    if (rs) {
      if (rs.disabled) return;
      if (!armed) { armed = true; rs.classList.add("is-armed"); rs.querySelector("b").textContent = T(UI.resetSure); return; }
      clearChoices(); return;
    }
    if (t.closest("[data-mn-backup]")) { bkOpen(); return; }
    if (t.closest("[data-mn-account]") && window.MasarokAccount) { close(true); window.MasarokAccount.open(); return; }
    if (t.closest("[data-mn-install]")) { close(true); var c = document.querySelector(".app-chip"); if (c) c.click(); return; }
    var a = t.closest("a"); if (!a) return;
    var id = a.getAttribute("data-mn-id");
    // on the guide page, open Guide me and the map in place
    if (onGuide && (id === "journey" || id === "map")) {
      e.preventDefault(); close(true);
      var J = window.MasarokJourney;
      if (id === "journey" && J) J.open();
      if (id === "map") { if (J && J.state().started && J.level() && window.MasarokMap) { J.open(); setTimeout(function () { window.MasarokMap.open(); }, 80); } else if (J) J.open(); }
      return;
    }
    // same-page section links: close first so the guide can open the section
    if (onGuide && a.getAttribute("href").charAt(0) === "#") close(true);
  }

  function init() {
    var nav = document.querySelector(".top nav") || document.querySelector(".top");
    if (!nav) return;
    btn = document.createElement("button");
    btn.type = "button"; btn.className = "mn-btn"; btn.setAttribute("aria-haspopup", "dialog"); btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = ICON_MENU + "<span>" + esc(T(UI.menu)) + "</span>";
    btn.addEventListener("click", open);
    var top = document.querySelector(".top");
    if (top && nav !== top) top.appendChild(btn); else nav.appendChild(btn);
    if (top) miniBar(top);
    skyRest();
  }
  // a slim translucent bar with the brand, the language link and Menu, shown once the header has scrolled away
  function miniBar(top) {
    if (!("IntersectionObserver" in window) || document.querySelector(".mb")) return;
    var brand = top.querySelector(".brand"), lang = top.querySelector("a.lang");
    var bar = document.createElement("div"); bar.className = "mb"; bar.setAttribute("aria-hidden", "true"); bar.inert = true;
    bar.innerHTML = '<div class="mb-in"><a class="mb-brand" href="' + esc(brand ? brand.getAttribute("href") : base) + '">' + esc(AR ? "مسارُك" : "Masarok") + '</a><span class="mb-sp"></span>' +
      (lang ? '<a class="mb-lang" href="' + esc(lang.getAttribute("href")) + '" lang="' + (AR ? "en" : "ar") + '" hreflang="' + (AR ? "en" : "ar") + '" dir="' + (AR ? "ltr" : "rtl") + '">' + esc(lang.textContent.trim()) + "</a>" : "") +
      '<button type="button" class="mn-btn" aria-haspopup="dialog">' + ICON_MENU + "<span>" + esc(T(UI.menu)) + "</span></button></div>";
    bar.querySelector(".mn-btn").addEventListener("click", open);
    document.body.appendChild(bar);
    new IntersectionObserver(function (es) {
      var off = !es[0].isIntersecting && es[0].boundingClientRect.top < 0;
      bar.classList.toggle("is-on", off); bar.inert = !off;
      if (off) bar.removeAttribute("aria-hidden"); else bar.setAttribute("aria-hidden", "true");
    }).observe(top);
  }
  // the night sky's twinkle rests while the hero is off screen
  function skyRest() {
    var hero = document.querySelector(".hero"); if (!hero || !("IntersectionObserver" in window)) return;
    new IntersectionObserver(function (es) { document.documentElement.classList.toggle("sky-off", !es[0].isIntersecting); }).observe(hero);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
  window.MasarokMenu = { open: open, close: close, backup: bkOpen };
})();

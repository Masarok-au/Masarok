/* Masarok guide: side quests across the site and a wardrobe of outfits that ranks unlock.
   Quests are checked automatically from what the student does on the page.
   Loaded after game.js and journeymap.js. */
(function () {
  "use strict";

  var A = (document.documentElement.lang || "en").slice(0, 2) === "ar" ? 1 : 0;
  function T(x) { return Array.isArray(x) ? x[A] : x; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c]; }); }
  function fmt(s, o) { return T(s).replace(/\{(\w+)\}/g, function (m, k) { return o[k] != null ? o[k] : m; }); }
  function G() { return window.MasarokGame; }
  function J() { return window.MasarokJourney; }
  function ls(k, d) { try { var v = JSON.parse(localStorage.getItem(k) || "null"); return v == null ? d : v; } catch (e) { return d; } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  // things we notice on the page
  var FK = "masarok-quest-flags";
  var flags = ls(FK, {}); flags.flips = flags.flips || [];
  function flag(k, v) { flags[k] = v == null ? 1 : v; lsSet(FK, flags); soon(); }

  function goSection(id) {
    var j = J(); if (j && j.isOpen()) { var x = document.querySelector(".jr-panel [data-journey-close]"); if (x) x.click(); }
    var S = window.MasarokSections; if (S && S.open) S.open(id);
    var el = document.getElementById(id);
    if (el) setTimeout(function () { el.scrollIntoView({ behavior: "smooth", block: "start" }); }, 120);
  }

  // ---------- the quests ----------
  var Q = [
    { id: "uni", p: 20, i: "🎓", n: ["Pick your university", "اختر جامعتك"], d: ["Choose your country and university so the guide fits you.", "اختر دولتك وجامعتك ليناسبك الدليل."],
      t: function () { var M = window.Masarok; return !!(M && M.values && M.values().hasUni); },
      go: function () { var x = document.querySelector(".jr-panel [data-journey-close]"); if (x && J().isOpen()) x.click(); if (window.Masarok && window.Masarok.openPicker) window.Masarok.openPicker(); } },
    { id: "profile", p: 20, i: "🧭", n: ["Tell the guide about you", "عرّف الدليل بنفسك"], d: ["Answer the four quick questions about your offer, English and plans.", "أجب عن الأسئلة الأربعة السريعة عن قبولك ولغتك وخططك."],
      t: function () { var j = J(); return !!(j && j.state().profile); },
      go: function () { var b = document.querySelector('.jr-panel [data-go="profile"]'); if (b) b.click(); else if (J()) J().open(); } },
    { id: "reminder", p: 25, i: "⏰", n: ["Set a deadline reminder", "فعّل تذكيرًا بموعد"], d: ["Save one real deadline to your calendar.", "احفظ موعدًا حقيقيًا واحدًا في تقويمك."],
      t: function () { return ls("masarok-reminders", []).length > 0; }, go: function () { goSection("deadlines"); } },
    { id: "map", p: 15, i: "🗺️", n: ["Open your journey map", "افتح خريطة رحلتك"], d: ["See your road from home to campus.", "شاهد طريقك من البيت إلى الجامعة."],
      t: function () { return !!flags.map; }, go: function () { if (window.MasarokMap) window.MasarokMap.open(); } },
    { id: "flip", p: 20, i: "🃏", n: ["Flip 3 info cards", "اقلب 3 بطاقات معلومات"], d: ["Tap the cards in “Your university” and “Choose your route” to see the back.", "اضغط على البطاقات في «جامعتك» و«اختر مسارك» لترى ظهرها."],
      t: function () { return flags.flips.length >= 3; }, go: function () { goSection("myuni"); } },
    { id: "budget", p: 25, i: "🧮", n: ["Plan your month", "خطط لشهرك"], d: ["Put your own numbers into the budget builder.", "أدخل أرقامك في حاسبة الميزانية."],
      t: function () { return !!flags.budget; }, go: function () { goSection("allowance"); } },
    { id: "checklist", p: 20, i: "✅", n: ["Tick 3 things before you fly", "أنجز 3 أمور قبل السفر"], d: ["Use the “Before you fly” checklist.", "استخدم قائمة «ما قبل السفر»."],
      t: function () { var c = ls("masar-checklist-v1", {}), n = 0; Object.keys(c).forEach(function (k) { if (c[k]) n++; }); return n >= 3; }, go: function () { goSection("before"); } },
    { id: "lessons", p: 15, i: "📖", n: ["Read what I learned on the way", "اقرأ ما تعلمته في الطريق"], d: ["Open the lessons section.", "افتح قسم الدروس."],
      t: function () { return (ls("masarok-game", {}).sections || []).indexOf("lessons") > -1; }, go: function () { goSection("lessons"); } },
    { id: "share", p: 30, i: "📣", n: ["Share your progress", "شارك تقدمك"], d: ["Share your progress card with a friend who is applying too.", "شارك بطاقة تقدمك مع صديق يقدّم هو أيضًا."],
      t: function () { return !!flags.share; }, go: function () { if (G()) { G().closeOverlay(); G().share(); } } },
    { id: "install", p: 40, i: "📲", n: ["Install the app", "ثبّت التطبيق"], d: ["Add Masarok to your phone's home screen.", "أضف مسارُك إلى الشاشة الرئيسية في جوالك."],
      t: function () { return !!flags.install || document.documentElement.classList.contains("is-app"); },
      go: function () { var b = document.querySelector(".app-chip, .app-foot"); G().closeOverlay(); if (b) b.click(); else toast(T(UI.installHow)); } },
    { id: "feedback", p: 30, i: "💬", n: ["Share your feedback", "شارك رأيك"], d: ["Tell us what would make the guide better.", "أخبرنا بما يجعل الدليل أفضل."],
      t: function () { return ls("masarok-feedback", null) === "sent" || localStorage.getItem("masarok-feedback") === "sent"; },
      go: function () { var a = document.querySelector(".fb-foot"); if (a) a.click(); } }
  ];

  var UI = {
    title: ["Side quests", "المهمات الجانبية"],
    sub: ["Optional missions around the guide. Each one gives bonus points, and 5 of them earn the Side quester badge.", "مهمات اختيارية في أنحاء الدليل، لكل منها نقاط إضافية، وإنجاز 5 منها يمنحك وسام «صاحب المهمات»."],
    go: ["Go", "ابدأ"], done: ["Done", "تمت"], pts: ["+{n} pts", "+{n} نقطة"],
    toast: ["Side quest complete: {q}", "أنجزت مهمة: {q}"],
    already: ["{n} side quests already done", "مهمات منجزة مسبقًا: {n}"],
    close: ["Close", "إغلاق"],
    installHow: ["Open your browser's menu and choose “Add to Home Screen” or “Install app”.", "افتح قائمة المتصفح واختر «إضافة إلى الشاشة الرئيسية» أو «تثبيت التطبيق»."],
    wTitle: ["Your wardrobe", "خزانتك"],
    wSub: ["Each new rank unlocks an outfit for your traveller. Pick one to wear across the guide.", "كل رتبة جديدة تفتح زيًّا لمسافرك. اختر ما يلبسه في أنحاء الدليل."],
    wear: ["Wear", "البس"], wearing: ["Wearing", "تلبسه الآن"], unlock: ["Unlocks at {r}", "يُفتح عند رتبة «{r}»"]
  };

  // ---------- wardrobe ----------
  var OUTFITS = [
    { id: "classic", r: 0, n: ["Thobe and red shemagh", "الثوب والشماغ الأحمر"] },
    { id: "ghutra", r: 1, n: ["White ghutra", "الغترة البيضاء"] },
    { id: "winter", r: 2, n: ["Winter thobe", "الثوب الشتوي"] },
    { id: "bisht", r: 3, n: ["Black bisht", "البشت الأسود"] },
    { id: "gold", r: 4, n: ["Golden bisht", "البشت الذهبي"] }
  ];
  var OK = "masarok-outfit";
  function rank() { var g = G(); return g && g.info ? g.info().r : 0; }
  function wearing() { var o = localStorage.getItem(OK) || "classic"; var d = OUTFITS.filter(function (x) { return x.id === o; })[0]; return d && d.r <= rank() ? o : "classic"; }
  function applyOutfit() { document.documentElement.setAttribute("data-outfit", wearing()); }
  function wardrobe() {
    var g = G(); if (!g) return;
    var r = rank(), w = wearing(), fig = J() && J().figure ? J().figure("") : "";
    var cards = OUTFITS.map(function (o) {
      var open = o.r <= r, on = o.id === w;
      return '<div class="wd-o' + (open ? "" : " is-locked") + (on ? " is-on" : "") + '" data-outfit="' + o.id + '">' +
        '<div class="wd-fig">' + fig + (open ? "" : '<span class="wd-lock" aria-hidden="true">🔒</span>') + "</div><b>" + esc(T(o.n)) + "</b>" +
        (open ? '<button type="button" class="gm-btn" data-wear="' + o.id + '"' + (on ? ' aria-pressed="true" disabled' : "") + ">" + esc(T(on ? UI.wearing : UI.wear)) + "</button>"
          : "<small>" + esc(fmt(UI.unlock, { r: T(g.ranks[o.r].n) })) + "</small>") + "</div>";
    }).join("");
    g.overlay('<h2 id="gm-h">🧥 ' + esc(T(UI.wTitle)) + '</h2><p class="gm-sub">' + esc(T(UI.wSub)) + '</p><div class="wd-grid">' + cards + "</div>" +
      '<div class="gm-foot"><button type="button" class="btn btn-primary" data-gm-close data-gm-cont>' + esc(T(UI.close)) + "</button></div>");
  }

  // ---------- quest board ----------
  function awarded(id) { var g = G(); return !!(g && g.has && g.has("quest:" + id)); }
  function count() { var n = 0; Q.forEach(function (q) { if (awarded(q.id)) n++; }); return n; }
  function board() {
    var g = G(); if (!g) return;
    var rows = Q.map(function (q) {
      var d = awarded(q.id);
      return '<li class="qs' + (d ? " is-done" : "") + '"><span class="qs-ic" aria-hidden="true">' + q.i + '</span><span class="qs-tx"><b>' + esc(T(q.n)) + "</b><small>" + esc(T(q.d)) + "</small></span>" +
        '<span class="qs-r"><em>' + esc(fmt(UI.pts, { n: q.p })) + "</em>" + (d ? '<span class="qs-done">✓ ' + esc(T(UI.done)) + "</span>" : '<button type="button" class="gm-btn" data-quest-go="' + q.id + '">' + esc(T(UI.go)) + "</button>") + "</span></li>";
    }).join("");
    g.overlay('<h2 id="gm-h">🎯 ' + esc(T(UI.title)) + ' <span class="qs-n">' + count() + "/" + Q.length + '</span></h2><p class="gm-sub">' + esc(T(UI.sub)) + '</p><ul class="qs-list">' + rows + "</ul>" +
      '<div class="gm-foot"><button type="button" class="btn btn-primary" data-gm-close data-gm-cont>' + esc(T(UI.close)) + "</button></div>");
  }

  // ---------- checking ----------
  var tmr = 0, first = true;
  function soon() { clearTimeout(tmr); tmr = setTimeout(evaluate, 350); }
  function evaluate() {
    var g = G(); if (!g || !g.award) return;
    var got = [];
    Q.forEach(function (q) {
      if (awarded(q.id)) return;
      var ok = false; try { ok = q.t(); } catch (e) {}
      if (ok && g.award("quest:" + q.id, q.p, null, first)) got.push(q);
    });
    if (got.length) {
      var pts = got.reduce(function (s, q) { return s + q.p; }, 0);
      toast((first && got.length > 1 ? fmt(UI.already, { n: got.length }) : fmt(UI.toast, { q: T(got[got.length - 1].n) })) + " · " + fmt(UI.pts, { n: pts }));
    }
    first = false;
    g.refresh && g.refresh();
  }
  var tEl, tT;
  function toast(msg) {
    if (!tEl) { tEl = document.createElement("div"); tEl.className = "qs-toast"; tEl.setAttribute("role", "status"); document.body.appendChild(tEl); }
    tEl.textContent = "🎯 " + msg; tEl.classList.add("is-on");
    clearTimeout(tT); tT = setTimeout(function () { tEl.classList.remove("is-on"); }, 3600);
  }

  // ---------- listening ----------
  document.addEventListener("click", function (e) {
    var t = e.target;
    if (!t.closest) return;
    if (t.closest("[data-jm-open]")) flag("map");
    if (t.closest("[data-gm-share]")) flag("share");
    var fc = t.closest("[data-flip]");
    if (fc && !t.closest("[data-flip-link]")) { var k = fc.getAttribute("data-flip"); if (flags.flips.indexOf(k) < 0) { flags.flips.push(k); lsSet(FK, flags); soon(); } }
    if (t.closest("[data-gq]")) { board(); return; }
    if (t.closest("[data-gw]")) { wardrobe(); return; }
    var go = t.closest("[data-quest-go]");
    if (go) { var q = Q.filter(function (x) { return x.id === go.getAttribute("data-quest-go"); })[0]; if (q) { G().closeOverlay(); setTimeout(q.go, 60); } return; }
    var wr = t.closest("[data-wear]");
    if (wr) { localStorage.setItem(OK, wr.getAttribute("data-wear")); applyOutfit(); wardrobe(); return; }
    if (t.closest(".fb-foot, .app-chip, .app-foot, [data-remind], input[data-dl]")) soon();
  });
  document.addEventListener("input", function (e) { if (e.target.closest && e.target.closest("#allowance")) { if (!flags.budget) flag("budget"); } });
  document.addEventListener("change", function (e) { if (e.target.closest && e.target.closest("#before, #allowance, [data-dl]")) { if (e.target.closest("#allowance") && !flags.budget) flag("budget"); else soon(); } });
  window.addEventListener("appinstalled", function () { flag("install"); });
  ["masarok:change", "masarok:journey", "masarok:journey-render", "masarok:section-open"].forEach(function (ev) { document.addEventListener(ev, soon); });
  // a rank-up can unlock an outfit; keep the worn one valid
  document.addEventListener("masarok:journey", function () { setTimeout(applyOutfit, 500); });

  window.MasarokQuests = {
    total: function () { return Q.length; }, done: count, board: board, wardrobe: wardrobe, quests: Q,
    outfitAt: function (r) { var o = OUTFITS.filter(function (x) { return x.r === r; })[0]; return o && r > 0 ? T(o.n) : null; }
  };

  applyOutfit();
  function init() { setTimeout(function () { evaluate(); applyOutfit(); }, 700); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();

/* Masarok site menu: one ☰ Menu button on every page, opening a drawer with all the pages
   (the guide, Guide me, the journey map, Masarok Academy), the guide's sections and extras.
   Shared by the guide pages and the Academy pages, in English and Arabic. */
(function () {
  "use strict";

  var AR = (document.documentElement.lang || "en").slice(0, 2) === "ar";
  var A = AR ? 1 : 0;
  function T(x) { return x[A]; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c]; }); }
  var base = AR ? "/ar/" : "/";
  var path = location.pathname.replace(/index\.html$/, "");
  var onAcademy = /\/academy\/?$/.test(path);
  var onGuide = !!document.getElementById("options");
  var FORM = "https://docs.google.com/forms/d/e/1FAIpQLSdVGMftz6scJBj8c-EaS6RiCKUwoXW71xYNwpxmqZ7jpOsHQQ/viewform";

  var UI = {
    menu: ["Menu", "القائمة"], close: ["Close menu", "إغلاق القائمة"],
    gMain: ["Masarok", "مسارُك"], gGuide: ["In the guide", "في الدليل"], gMore: ["More", "المزيد"],
    newTag: ["New", "جديد"],
    install: ["Install the app", "ثبّت التطبيق"], feedback: ["Share your feedback", "شارك رأيك"],
    other: ["العربية", "English"]
  };
  var PAGES = [
    { id: "home", i: "🏠", href: base, n: ["The guide", "الدليل"], d: ["Everything about studying abroad, for your country", "كل ما تحتاجه للدراسة في الخارج، حسب دولتك"] },
    { id: "journey", i: "🧭", href: base + "#journey", n: ["Guide me, step by step", "أرشدني خطوة بخطوة"], d: ["Your personal plan, with points and badges", "خطتك الشخصية، مع النقاط والأوسمة"] },
    { id: "map", i: "🗺️", href: base + "#map", n: ["Journey map", "خريطة الرحلة"], d: ["Your road from home to campus", "طريقك من البيت إلى الجامعة"] },
    { id: "academy", i: "🎓", href: base + "academy/", n: ["Masarok Academy", "أكاديمية مسارُك"], d: ["Train for every step: IELTS, essays, visa practice", "تدرّب على كل خطوة: IELTS والمقالات والتأشيرة"], isNew: true }
  ];
  var SECTIONS = [
    ["options", "Study options", "خيارات الدراسة"], ["sacm", "The scholarship", "الابتعاث"], ["deadlines", "Deadlines", "المواعيد"],
    ["allowance", "Allowance and budget", "المكافأة والميزانية"], ["before", "Before you fly", "قبل السفر"], ["arrival", "First weeks", "الأسابيع الأولى"],
    ["housing", "Housing", "السكن"], ["money", "Money and work", "المال والعمل"], ["links", "Official links", "روابط رسمية"]
  ];

  // ---------- styles ----------
  var css =
    ".mn-btn{display:inline-flex; align-items:center; gap:8px; font:inherit; font-size:.93rem; font-weight:700; color:var(--night-ink, #EEF2F7); background:rgba(226,182,108,.1); border:1px solid rgba(226,182,108,.6); border-radius:999px; padding:4px 14px 4px 12px; cursor:pointer}" +
    ".mn-btn:hover{background:rgba(226,182,108,.22)}" +
    ".mn-btn:focus-visible{outline:3px solid var(--gold, #E2B66C); outline-offset:2px}" +
    ".mn-btn svg{width:16px; height:16px}" +
    // header layout: brand, then the page links, then Menu; on phones Menu sits beside the brand
    ".top > .brand{order:0} .top > nav{order:2; margin-inline-start:auto} .top > .mn-btn{order:3}" +
    "@media (max-width:760px){ .top > .mn-btn{order:1; margin-inline-start:auto} .top > nav{order:2; width:100%; margin-inline-start:0} }" +
    ".mn{position:fixed; inset:0; z-index:160}" +
    ".mn[hidden]{display:none}" +
    ".mn-bg{position:absolute; inset:0; background:rgba(5,10,18,.62); backdrop-filter:blur(3px); animation:mnFade .2s ease}" +
    ".mn-sheet{position:absolute; top:0; bottom:0; inset-inline-end:0; width:min(23rem, 90vw); display:flex; flex-direction:column; overflow:auto; overscroll-behavior:contain;" +
    "  background:var(--night, #0B1626); color:var(--night-ink, #EEF2F7); border-inline-start:1px solid rgba(226,182,108,.35); box-shadow:-20px 0 60px -20px rgba(0,0,0,.7);" +
    "  padding-bottom:calc(20px + env(safe-area-inset-bottom, 0px)); animation:mnIn .28s cubic-bezier(.2,.8,.3,1)}" +
    "[dir='rtl'] .mn-sheet{animation-name:mnInR}" +
    ".mn-sheet > .sadu{flex:none; margin-top:env(safe-area-inset-top, 0px)}" +
    ".mn-head{display:flex; align-items:center; justify-content:space-between; gap:10px; padding:16px 18px 6px}" +
    ".mn-brand{font-family:var(--f-display); font-weight:800; font-size:1.2rem; color:var(--night-ink, #EEF2F7); text-decoration:none; display:flex; gap:8px; align-items:baseline}" +
    ".mn-brand span{font-family:var(--f-ar); font-weight:500; color:var(--gold, #E2B66C); font-size:1.05rem}" +
    ".mn-x{width:38px; height:38px; border-radius:50%; border:1px solid rgba(238,242,247,.25); background:transparent; color:var(--night-ink, #EEF2F7); font-size:1.4rem; line-height:1; cursor:pointer}" +
    ".mn-x:hover{border-color:var(--gold, #E2B66C); color:var(--gold, #E2B66C)}" +
    ".mn-g{padding:10px 14px 0}" +
    ".mn-g h2{font-family:var(--f-mono); font-size:.72rem; letter-spacing:.14em; text-transform:uppercase; color:var(--gold, #E2B66C); font-weight:500; margin:8px 6px 8px}" +
    ".mn-list{list-style:none; margin:0; padding:0; display:grid; gap:4px}" +
    ".mn-item{display:flex; align-items:center; gap:12px; width:100%; padding:10px 10px; border-radius:12px; color:var(--night-ink, #EEF2F7); text-decoration:none; border:1px solid transparent; background:none; font:inherit; text-align:start; cursor:pointer}" +
    ".mn-item:hover{background:rgba(226,182,108,.08); border-color:rgba(226,182,108,.3)}" +
    ".mn-item:focus-visible{outline:2px solid var(--gold, #E2B66C); outline-offset:1px}" +
    ".mn-item[aria-current='page']{background:rgba(226,182,108,.14); border-color:rgba(226,182,108,.55)}" +
    ".mn-ic{flex:none; width:40px; height:40px; border-radius:12px; display:grid; place-items:center; font-size:1.2rem; background:rgba(255,255,255,.05); border:1px solid rgba(238,242,247,.1)}" +
    ".mn-tx{display:grid; gap:1px; min-width:0}" +
    ".mn-tx b{font-size:1rem; display:flex; align-items:center; gap:8px}" +
    ".mn-tx small{color:var(--night-dim, #A9B8CB); font-size:.84rem; line-height:1.35}" +
    ".mn-new{font-family:var(--f-mono); font-size:.66rem; letter-spacing:.08em; text-transform:uppercase; color:#1A1206; background:var(--gold, #E2B66C); border-radius:999px; padding:1px 7px; font-weight:500}" +
    ".mn-secs{list-style:none; margin:0; padding:0 4px; display:grid; grid-template-columns:1fr 1fr; gap:2px 8px}" +
    ".mn-secs a{display:block; padding:7px 8px; border-radius:8px; color:var(--night-dim, #A9B8CB); text-decoration:none; font-size:.92rem}" +
    ".mn-secs a:hover{color:var(--night-ink, #EEF2F7); background:rgba(255,255,255,.05)}" +
    ".mn-secs a:focus-visible{outline:2px solid var(--gold, #E2B66C)}" +
    ".mn-more{display:grid; gap:4px}" +
    ".mn-lang:lang(ar){font-family:var(--f-ar)}" +
    ".mn-foot{margin-top:auto; padding:18px 20px 0; color:var(--night-dim, #A9B8CB); font-size:.8rem}" +
    "@keyframes mnIn{from{transform:translateX(100%)}to{transform:none}}" +
    "@keyframes mnInR{from{transform:translateX(-100%)}to{transform:none}}" +
    "@keyframes mnFade{from{opacity:0}to{opacity:1}}" +
    // on phones the menu replaces the long row of section links in the header
    // the menu holds every section, so the header keeps only the key links
    ".top nav a[href^='#']:not(.lang){display:none !important}" +
    ".top nav{align-items:center}" +
    "@media (max-width:760px){ .top nav .nav-ac{display:none !important} }" +
    ".nav-new{font-family:var(--f-mono); font-size:.62rem; letter-spacing:.08em; text-transform:uppercase; color:#1A1206; background:var(--gold, #E2B66C); border-radius:999px; padding:0 6px; margin-inline-start:4px; vertical-align:2px}" +
    "@media (prefers-reduced-motion: reduce){ .mn-sheet, .mn-bg{animation:none} }";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  var ICON_MENU = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';

  // ---------- the drawer ----------
  var mn, btn, lastFocus;
  function current(id) {
    if (id === "academy") return onAcademy;
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
        '<span class="mn-ic" aria-hidden="true">' + p.i + '</span><span class="mn-tx"><b>' + esc(T(p.n)) + (p.isNew ? ' <span class="mn-new">' + esc(T(UI.newTag)) + "</span>" : "") + "</b><small>" + esc(T(p.d)) + "</small></span></a></li>";
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
      "</ul></div>" +
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
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
  window.MasarokMenu = { open: open, close: close };
})();

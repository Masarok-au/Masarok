/* Masarok — collapsible sections
   Every main section starts closed and shows only a header bar (title + one-line summary).
   Clicking the header opens it. Menu links, in-page links and the journey's links open their
   section first, so nothing ever points at hidden content. */
(function () {
  var AR = (document.documentElement.lang || "en").slice(0, 2) === "ar";
  function T(x) { return x[AR ? 1 : 0]; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function reduced() { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); }

  var SUM = {
    myuni: ["Campus, pathway college, student life, transport and renting for your university.", "الحرم والكلية وحياة الطلاب والمواصلات والإيجار في جامعتك."],
    deadlines: ["Your application dates, with reminders in your calendar.", "مواعيد التقديم، مع تذكيرات في تقويمك."],
    options: ["The ways into your degree, from bachelor's to PhD.", "طرق الوصول إلى درجتك، من البكالوريوس إلى الدكتوراه."],
    postgrad: ["Planning a master's or PhD on the scholarship.", "التخطيط للماجستير أو الدكتوراه على البعثة."],
    sacm: ["Tracks, who can apply, and the rules while you study.", "المسارات وشروط التقديم والأنظمة أثناء الدراسة."],
    allowance: ["Your monthly allowance and a budget planner.", "مكافأتك الشهرية وحاسبة الميزانية."],
    before: ["A checklist of everything to sort out before you fly.", "قائمة بكل ما ترتبه قبل السفر."],
    arrival: ["Your first two weeks, step by step.", "أسبوعاك الأولان، خطوة بخطوة."],
    housing: ["Where to live, how renting works and how to avoid scams.", "أين تسكن، وكيف يعمل الإيجار، وكيف تتجنب الاحتيال."],
    money: ["Bank, phone, tax and working while you study.", "البنك والجوال والضرائب والعمل أثناء الدراسة."],
    lessons: ["What I wish I had known on day one.", "ما تمنيت لو عرفته من اليوم الأول."],
    links: ["Every official website in one place.", "كل المواقع الرسمية في مكان واحد."]
  };
  var UI = { openAll: ["Open all", "افتح الكل"], closeAll: ["Close all", "أغلق الكل"], hint: ["Tap a section to open it", "اضغط على أي قسم لفتحه"] };
  var KEY = "masarok-open";

  var css =
    "main > section.acc{padding-block:10px !important}" +
    "main > section.acc:not(.is-open) > :not(.acc-h){display:none !important}" +
    "main > section.acc .acc-src{display:none !important}" +
    ".acc-h{margin:0; font:inherit}" +
    ".acc-btn{all:unset; box-sizing:border-box; width:100%; cursor:pointer; display:grid; grid-template-columns:auto 1fr auto; align-items:center; gap:14px; padding:16px 18px; background:var(--surface); border:1px solid var(--line); border-radius:var(--radius); transition:border-color .2s ease, background .2s ease, translate .2s ease}" +
    ".acc-btn:hover{border-color:color-mix(in srgb, var(--sand) 50%, var(--line)); translate:0 -2px}" +
    ".acc-btn:focus-visible{outline:2px solid var(--sand); outline-offset:3px}" +
    ".is-open > .acc-h .acc-btn{border-color:color-mix(in srgb, var(--sand) 55%, var(--line)); background:color-mix(in srgb, var(--surface) 85%, var(--sand) 15%)}" +
    ".acc-num{font-family:var(--f-mono); font-size:.8rem; color:var(--sand); border:1px solid color-mix(in srgb, var(--sand) 45%, transparent); border-radius:999px; min-width:2.2em; text-align:center; padding:3px 6px}" +
    ".acc-txt{display:grid; gap:2px; min-width:0}" +
    ".acc-eb{font-family:var(--f-mono); font-size:.72rem; letter-spacing:.1em; text-transform:uppercase; color:var(--muted)}" +
    ".acc-t{font-family:var(--f-display); font-weight:700; font-size:clamp(1.12rem, .8vw + 1rem, 1.4rem); color:var(--ink); line-height:1.25}" +
    ".acc-sum{color:var(--muted); font-size:.92rem}" +
    ".acc-chev{width:30px; height:30px; border-radius:50%; display:grid; place-items:center; border:1px solid var(--line); color:var(--sand); transition:transform .3s ease}" +
    ".is-open > .acc-h .acc-chev{transform:rotate(180deg)}" +
    "main > section.acc.is-open > :not(.acc-h){animation:accIn .35s ease both}" +
    "main > section.acc.is-open > .acc-h + *{margin-top:18px}" +
    "@keyframes accIn{from{opacity:0; transform:translateY(-6px)} to{opacity:1; transform:none}}" +
    ".acc-tools{display:flex; justify-content:space-between; align-items:center; gap:10px; margin:22px 0 4px; font-size:.9rem; color:var(--muted)}" +
    ".acc-tools div{display:flex; gap:14px}" +
    ".acc-tools button{all:unset; cursor:pointer; color:var(--sand); text-decoration:underline; text-underline-offset:3px}" +
    ".acc-tools button:focus-visible{outline:2px solid var(--sand); outline-offset:2px}" +
    "@media (prefers-reduced-motion: reduce){ main > section.acc.is-open > :not(.acc-h){animation:none} .acc-chev{transition:none} }" +
    "@media (max-width:560px){ .acc-btn{padding:14px; gap:10px} .acc-num{display:none} .acc-btn{grid-template-columns:1fr auto} }";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  var secs = [];
  function visible(el) { return el && !el.closest("[hidden]"); }
  function cleanText(el) {
    var c = el.cloneNode(true);
    c.querySelectorAll("[hidden], .acc-h").forEach(function (x) { x.remove(); });
    return c.textContent.replace(/\s+/g, " ").trim();
  }
  function saved() { try { return JSON.parse(sessionStorage.getItem(KEY) || "[]"); } catch (e) { return []; } }
  function save() {
    var ids = secs.filter(function (s) { return s.classList.contains("is-open"); }).map(function (s) { return s.id; });
    try { sessionStorage.setItem(KEY, JSON.stringify(ids)); } catch (e) {}
  }

  function setup() {
    var main = document.querySelector("main");
    if (!main) return;
    secs = [].slice.call(main.querySelectorAll(":scope > section[id]"));
    secs.forEach(function (s) {
      if (s.querySelector(":scope > .acc-h")) return;
      s.classList.add("acc");
      var h = document.createElement("h2");
      h.className = "acc-h"; h.id = s.id + "-acc";
      h.innerHTML = '<button type="button" class="acc-btn" aria-expanded="false" aria-controls="' + s.id + '"><span class="acc-num" aria-hidden="true"></span><span class="acc-txt"><span class="acc-eb"></span><span class="acc-t"></span><span class="acc-sum"></span></span><span class="acc-chev" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></span></button>';
      s.insertBefore(h, s.firstChild);
      s.setAttribute("aria-labelledby", h.id);
    });
    // tools row before the first section
    if (!main.querySelector(".acc-tools") && secs.length) {
      var t = document.createElement("div");
      t.className = "acc-tools";
      t.innerHTML = "<span>" + esc(T(UI.hint)) + '</span><div><button type="button" data-acc="open">' + esc(T(UI.openAll)) + '</button><button type="button" data-acc="close">' + esc(T(UI.closeAll)) + "</button></div>";
      main.insertBefore(t, secs[0]);
    }
    var keep = saved();
    secs.forEach(function (s) { if (keep.indexOf(s.id) > -1) open(s, false); });
    refresh();
  }

  // titles follow the chosen country (the visible heading inside each section)
  function refresh() {
    var n = 0;
    secs.forEach(function (s) {
      var head = s.querySelector(":scope > .acc-h"); if (!head) return;
      s.querySelectorAll(".acc-src").forEach(function (x) { x.classList.remove("acc-src"); });
      var h2 = [].filter.call(s.querySelectorAll("h2:not(.acc-h)"), visible)[0];
      var eb = null;
      if (h2) {
        var p = h2.previousElementSibling;
        while (p && !(p.classList && p.classList.contains("eyebrow"))) p = p.previousElementSibling;
        eb = p;
        h2.classList.add("acc-src"); if (eb) eb.classList.add("acc-src");
      }
      if (!s.hidden) n++;
      head.querySelector(".acc-num").textContent = String(n).padStart(2, "0");
      head.querySelector(".acc-eb").textContent = eb ? cleanText(eb) : "";
      head.querySelector(".acc-t").textContent = h2 ? cleanText(h2) : s.id;
      head.querySelector(".acc-sum").textContent = SUM[s.id] ? T(SUM[s.id]) : "";
    });
    // with no country chosen, the study options hold the country chooser, so keep them open
    var cc = document.documentElement.getAttribute("data-country");
    if (!cc || cc === "all") { var o = document.getElementById("options"); if (o && o.classList.contains("acc")) open(o, false); }
  }

  function open(s, focus) {
    if (!s || !s.classList.contains("acc")) return;
    s.classList.add("is-open");
    var b = s.querySelector(":scope > .acc-h .acc-btn"); if (b) b.setAttribute("aria-expanded", "true");
    save();
    try { document.dispatchEvent(new CustomEvent("masarok:section-open", { detail: { id: s.id } })); } catch (e) {}
  }
  function close(s) {
    s.classList.remove("is-open");
    var b = s.querySelector(":scope > .acc-h .acc-btn"); if (b) b.setAttribute("aria-expanded", "false");
    save();
    var top = s.getBoundingClientRect().top;
    if (top < 0) s.scrollIntoView({ block: "start", behavior: "auto" });
  }
  function sectionOf(el) { return el && el.closest && el.closest("main > section.acc"); }
  function openFor(id) {
    var el = id && document.getElementById(id);
    var s = sectionOf(el);
    if (s && !s.classList.contains("is-open")) open(s);
    return el;
  }

  // header clicks, open/close all
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".acc-btn");
    if (b) {
      var s = b.closest("section");
      if (s.classList.contains("is-open")) close(s); else open(s);
      return;
    }
    var t = e.target.closest && e.target.closest("[data-acc]");
    if (t) {
      var all = t.getAttribute("data-acc") === "open";
      secs.forEach(function (s) { if (all) open(s); else if (s.classList.contains("is-open")) { s.classList.remove("is-open"); var bb = s.querySelector(".acc-btn"); if (bb) bb.setAttribute("aria-expanded", "false"); } });
      save();
      if (!all) secs[0] && secs[0].scrollIntoView({ block: "start", behavior: "auto" });
    }
  });

  // any link to something inside a closed section opens it first (capture runs before the browser scrolls)
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href*="#"]');
    if (a) {
      var href = a.getAttribute("href"), i = href.indexOf("#");
      var samePage = i === 0 || a.pathname === location.pathname;
      if (samePage && i > -1) {
        var el = openFor(href.slice(i + 1));
        if (el) { e.preventDefault(); history.replaceState(null, "", "#" + el.id); setTimeout(function () { el.scrollIntoView({ block: "start", behavior: reduced() ? "auto" : "smooth" }); }, 30); }
      }
    }
    if (e.target.closest && e.target.closest("[data-pick]")) openFor("myuni");
    if (e.target.closest && e.target.closest("[data-pick-country]")) openFor("options");
  }, true);

  function fromHash() {
    var id = decodeURIComponent((location.hash || "").slice(1));
    if (!id || id === "journey" || id === "top") return;
    var el = openFor(id);
    if (el) setTimeout(function () { el.scrollIntoView({ block: "start" }); }, 60);
  }
  window.addEventListener("hashchange", fromHash);
  document.addEventListener("masarok:change", function () { setTimeout(refresh, 0); });

  window.MasarokSections = { open: function (id) { return openFor(id); }, refresh: refresh };

  function init() { setup(); fromHash(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();

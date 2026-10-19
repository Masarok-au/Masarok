/* Masarok Academy · mission motion. Load in <head> (it is small and must run before the first paint).
   - Pages arrive with a calm rise; with view transitions the sky and header stay still and only the content moves.
   - A thin Sadu thread weaves across the top while the next page loads.
   - Sections reveal as they scroll into view; the night sky climbs slowly behind them.
   - Inside a course, each step slides in from the direction you are going, and the progress bar travels.
   Nothing here blocks a tap or delays navigation, and reduced motion turns it off. */
(function () {
  var html = document.documentElement;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var KEY = "mo-nav";
  var fromInside = false;
  try { fromInside = sessionStorage.getItem(KEY) === "1"; sessionStorage.removeItem(KEY); } catch (e) {}

  if (!reduce && "IntersectionObserver" in window) html.classList.add("mo-js");

  // ---------- arrival ----------
  function arrive() {
    if (reduce) return;
    html.classList.add("mo-arrive");
    setTimeout(function () { html.classList.remove("mo-arrive"); }, 1000);
  }
  if ("onpagereveal" in window) {
    window.addEventListener("pagereveal", function (e) { if (!e.viewTransition) arrive(); }, { once: true });
  } else {
    arrive();
  }

  // ---------- the Sadu thread ----------
  var thread;
  function makeThread() {
    if (thread) return thread;
    thread = document.createElement("div");
    thread.className = "mo-thread";
    thread.setAttribute("aria-hidden", "true");
    document.body.appendChild(thread);
    return thread;
  }
  function leaving(a) {
    if (a.target && a.target !== "_self") return false;
    if (a.hasAttribute("download")) return false;
    var u;
    try { u = new URL(a.href, location.href); } catch (e) { return false; }
    if (u.origin !== location.origin) return false;
    if (u.pathname === location.pathname && u.search === location.search) return false; // same page or hash route
    return true;
  }
  document.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a || !leaving(a)) return;
    try { sessionStorage.setItem(KEY, "1"); } catch (err) {}
    var t = makeThread();
    t.className = "mo-thread";
    void t.offsetWidth;
    t.className = "mo-thread is-go";
  });
  // coming back from the back/forward cache: clear the thread
  window.addEventListener("pageshow", function (e) { if (e.persisted && thread) thread.className = "mo-thread"; });

  // ---------- scroll reveal ----------
  var io = null;
  var REVEAL = [
    ".ac-sec > .eyebrow", ".ac-sec > h2", ".ac-sec > p", ".loop > li", ".tracks > *", ".road > li", ".help",
    ".climb", ".ac-sec > div", ".ls-list > li", ".cs-grp > h3", ".cs-note", ".pl-card"
  ].join(",");
  function reveal(root) {
    if (!html.classList.contains("mo-js")) return;
    if (!io) io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    var vh = window.innerHeight || 800;
    var groups = new Map();
    Array.prototype.forEach.call(root.querySelectorAll(REVEAL), function (el) {
      if (el.hasAttribute("data-rv") || (el.parentNode.closest && el.parentNode.closest("[data-rv]"))) return;
      // only what starts below the fold waits for a scroll; what you can already see is never hidden
      if (el.getBoundingClientRect().top < vh * 0.92) return;
      var p = el.parentNode, n = groups.get(p) || 0;
      groups.set(p, n + 1);
      el.setAttribute("data-rv", "");
      el.style.setProperty("--rv-d", Math.min(n, 5) * 0.07 + "s");
      io.observe(el);
    });
    Array.prototype.forEach.call(root.querySelectorAll("main .sadu, main ~ * .sadu, .wrap > .sadu"), function (el) {
      if (el.hasAttribute("data-rv") || el.getBoundingClientRect().top < vh * 0.92) return;
      el.setAttribute("data-rv", "line");
      io.observe(el);
    });
  }

  // ---------- the sky climbs ----------
  function sky() {
    if (reduce) return;
    var stars = document.querySelector(".stars");
    if (!stars) return;
    var ticking = false, max = (window.innerHeight || 800) * 0.3;
    function paint() {
      ticking = false;
      var y = Math.min(window.scrollY * 0.06, max);
      stars.style.setProperty("--sky", (-y).toFixed(1) + "px");
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(paint); } }, { passive: true });
    paint();
  }

  // ---------- steps inside a course ----------
  function parse(h) {
    var m = /^#\/l\/([^/]+)(?:\/(\d+))?/.exec(h || "");
    return m ? { id: m[1], i: m[2] == null ? 0 : +m[2] } : { id: null, i: -1 };
  }
  function steps() {
    var app = document.getElementById("app");
    if (!app || !("MutationObserver" in window)) return;
    var first = !!app.querySelector(".cs-loading") || !app.children.length, last = parse(location.hash), lastProg = null, timer;
    new MutationObserver(function (list) {
      if (!list.some(function (r) { return r.type === "childList" && r.addedNodes.length; })) return;
      var now = parse(location.hash);
      // progress bar: start from where it was, then travel to the new value
      var bar = app.querySelector(".lp-prog i");
      if (bar) {
        var to = bar.style.transform;
        if (lastProg && last.id === now.id && lastProg !== to && !reduce) {
          bar.style.transition = "none"; bar.style.transform = lastProg; void bar.offsetWidth;
          bar.style.transition = ""; bar.style.transform = to;
        }
        lastProg = to;
      } else lastProg = null;

      if (first) { first = false; last = now; reveal(app); return; } // the page arrival already moved it
      if (reduce) { last = now; return; }
      var kind = now.id && now.id === last.id ? (now.i < last.i ? "mo-back" : "") : "mo-home";
      app.classList.remove("mo-step", "mo-back", "mo-home");
      void app.offsetWidth;
      app.classList.add("mo-step");
      if (kind) app.classList.add(kind);
      clearTimeout(timer);
      timer = setTimeout(function () { app.classList.remove("mo-step", "mo-back", "mo-home"); }, 900);
      last = now;
      reveal(app);
    }).observe(app, { childList: true });
    if (!first) reveal(app);
  }

  function ready() {
    if (fromInside && !reduce) {
      var t = makeThread();
      t.className = "mo-thread is-full";
      requestAnimationFrame(function () { requestAnimationFrame(function () { t.className = "mo-thread is-done"; }); });
    }
    reveal(document);
    sky();
    steps();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ready);
  else ready();
})();

/* Masarok: "رأيك يهُمنا" — a little plane, flown by our student in his shemagh, tows a feedback banner
   onto the screen. It stays for a minute, flies away, and comes back later. */
(function () {
  "use strict";

  // Paste the Google Form link here. While it is empty, nothing is shown.
  var FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdVGMftz6scJBj8c-EaS6RiCKUwoXW71xYNwpxmqZ7jpOsHQQ/viewform";

  var FIRST_MS = 15000;   // first visit of the plane, 15 seconds after the page opens
  var STAY_MS = 60000;    // how long the banner stays on screen
  var AWAY_MS = 75000;    // how long the plane is away before it comes back
  var KEY = "masarok-feedback";      // "sent" once the visitor opens the form
  var SKEY = "masarok-feedback-off"; // set for this visit when the visitor closes the banner

  if (!FORM_URL) return;

  var lang = (document.documentElement.lang || "en").slice(0, 2) === "ar" ? "ar" : "en";
  var rtl = document.documentElement.dir === "rtl";
  var T = {
    en: { sub: "How useful is Masarok for you? Tell us in 1 minute and help us improve the guide for the next student.", go: "Share your feedback", close: "Close", foot: "رأيك يهُمنا · Share your feedback" },
    ar: { sub: "إلى أي مدى أفادك مسارُك؟ شاركنا رأيك في دقيقة، وساعدنا نطوّر الدليل للطالب القادم.", go: "شارك رأيك", close: "إغلاق", foot: "رأيك يهُمنا · شارك رأيك" }
  }[lang];

  function get(store, k) { try { return window[store].getItem(k); } catch (e) { return null; } }
  function put(store, k, v) { try { window[store].setItem(k, v); } catch (e) {} }
  function reduced() { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); }

  // a small propeller plane, facing right, with the student in the open cockpit
  var PLANE =
    '<svg class="fb-plane" viewBox="0 -4 132 70" aria-hidden="true" focusable="false">' +
      '<path d="M18 30 L8 12 L20 12 L32 28 Z" fill="#0B6B3A"/>' +
      '<path d="M10 16 L18 16 L24 23 L14 23 Z" fill="#E2B66C"/>' +
      '<g class="fb-pilot" transform="translate(69 25) scale(1.3) translate(-69 -30)">' +
        '<path d="M60 22 Q69 9 78 22 L80 36 Q74 31 69 31 Q63 31 58 36 Z" fill="#C8102E"/>' +
        '<path d="M60 26 L59 34 M78 26 L79 34" stroke="#fff" stroke-width=".8" stroke-dasharray="1.4 1.6" opacity=".85"/>' +
        '<ellipse cx="69" cy="24" rx="6.4" ry="7" fill="#C08A5A"/>' +
        '<path d="M61.5 21.5 Q69 13 76.5 21.5 Q69 17.5 61.5 21.5 Z" fill="#C8102E"/>' +
        '<ellipse cx="69" cy="16.6" rx="8.4" ry="2" fill="none" stroke="#14140F" stroke-width="1.7"/>' +
        '<circle cx="71.4" cy="24" r=".95" fill="#14140F"/><circle cx="75" cy="24" r=".95" fill="#14140F"/>' +
        '<path d="M70.6 27.4 Q73 29.2 75.4 27.4" fill="none" stroke="#14140F" stroke-width=".95" stroke-linecap="round"/>' +
        '<g class="fb-wave"><path d="M77 33 Q83 28 87 20" stroke="#F6F3EC" stroke-width="3.6" stroke-linecap="round" fill="none"/>' +
        '<circle cx="87.4" cy="18.6" r="2.2" fill="#C08A5A"/></g>' +
      '</g>' +
      '<path d="M10 34 C10 28 24 27 40 27 L104 27 C116 27 124 31 126 36 C124 41 116 44 104 44 L40 44 C24 44 10 41 10 36 Z" fill="#F7F9F7"/>' +
      '<path d="M18 37 L118 37 L122 39 L18 39 Z" fill="#0B6B3A"/><path d="M18 40.4 L120 40.4 L121 41.4 L18 41.4 Z" fill="#E2B66C"/>' +
      '<path d="M56 27 Q69 22 84 27 Z" fill="#9FB7C9" opacity=".7"/>' +
      '<path d="M50 42 L82 42 L90 54 L60 54 Z" fill="#DCE3DD"/>' +
      '<path d="M14 35 L4 42 L14 42 L26 37 Z" fill="#0A5A31"/>' +
      '<circle cx="126" cy="36" r="3" fill="#2B4166"/>' +
      '<ellipse class="fb-prop" cx="128" cy="36" rx="1.6" ry="13" fill="#B9C6D6" opacity=".75"/>' +
      '<line x1="96" y1="44" x2="94" y2="56" stroke="#2B4166" stroke-width="1.6"/><circle cx="94" cy="58" r="3.2" fill="#14140F"/>' +
    '</svg>';

  var css =
    ".fb-tow{position:fixed; z-index:65; bottom:max(16px, env(safe-area-inset-bottom)); inset-inline-start:16px; display:flex; align-items:flex-start; pointer-events:none; will-change:transform}" +
    ".fb-card{pointer-events:auto; position:relative; width:min(20rem, calc(100vw - 32px)); background:var(--night, #0B1626); color:var(--night-ink, #EEF2F7);" +
    " border:1.5px solid var(--gold, #E2B66C); border-radius:16px; padding:14px 18px; box-shadow:0 18px 40px -14px rgba(0,0,0,.7); display:grid; gap:8px;" +
    " transform-origin:100% 18px; animation:fbSway 3.2s ease-in-out infinite}" +
    "[dir=rtl] .fb-card{transform-origin:0 18px}" +
    ".fb-card h2{margin:0; font-family:var(--f-ar, sans-serif); font-weight:700; font-size:1.3rem; color:var(--gold, #E2B66C); padding-inline-end:32px; line-height:1.5}" +
    ".fb-card p{margin:0; color:#C8D3E0; font-size:.93rem; line-height:1.6}" +
    ".fb-card .btn{display:inline-flex; align-items:center; justify-self:start; gap:8px; cursor:pointer; margin-top:2px}" +
    ".fb-x{position:absolute; top:10px; inset-inline-end:10px; width:30px; height:30px; border-radius:50%; border:1px solid rgba(238,242,247,.25); background:transparent; color:var(--night-ink, #EEF2F7); font-size:1.15rem; line-height:1; cursor:pointer}" +
    ".fb-x:hover{border-color:var(--gold, #E2B66C); color:var(--gold, #E2B66C)}" +
    ".fb-card :focus-visible{outline:3px solid var(--gold, #E2B66C); outline-offset:2px}" +
    ".fb-rope{width:46px; height:40px; margin-top:6px; flex:none; overflow:visible}" +
    ".fb-craft{flex:none; width:150px; margin-top:-16px; animation:fbBob 2.4s ease-in-out infinite}" +
    ".fb-plane{display:block; width:100%; height:auto; overflow:visible}" +
    "[dir=rtl] .fb-plane, [dir=rtl] .fb-rope{scale:-1 1}" +
    ".fb-prop{transform-box:fill-box; transform-origin:center; animation:fbProp .12s linear infinite}" +
    ".fb-wave{transform-box:fill-box; transform-origin:0% 100%}" +
    ".fb-tow.is-parked .fb-wave{animation:fbWave .5s ease-in-out 4 alternate}" +
    "@keyframes fbProp{50%{transform:scaleY(.15)}}" +
    "@keyframes fbBob{0%,100%{translate:0 0}50%{translate:0 -5px}}" +
    "@keyframes fbSway{0%,100%{rotate:-1.2deg}50%{rotate:1.2deg}}" +
    "@keyframes fbWave{from{rotate:0deg}to{rotate:-22deg}}" +
    ".jr-open .fb-tow, .picker-open .fb-tow{display:none}" +
    "@media (max-width:640px){" +
    " .fb-tow{inset-inline:12px; flex-direction:column-reverse; align-items:stretch; bottom:max(12px, env(safe-area-inset-bottom))}" +
    " .fb-card{width:auto; transform-origin:50% 0}" +
    " .fb-rope{display:none}" +
    " .fb-craft{align-self:flex-end; width:120px; margin:0 6px -10px 0}" +
    " [dir=rtl] .fb-craft{margin:0 0 -8px 6px}" +
    " html.fb-showing .jr-fab{opacity:0; pointer-events:none; visibility:hidden} }" +
    "@media (prefers-reduced-motion: reduce){ .fb-card, .fb-craft, .fb-prop, .fb-wave{animation:none !important} }" +
    ".fb-foot{display:inline-flex; align-items:center; gap:6px; padding:6px 14px; border:1px solid var(--gold, #E2B66C); border-radius:999px; color:var(--gold, #E2B66C); text-decoration:none; font-size:.9rem; width:fit-content}" +
    ".fb-foot:hover{background:rgba(226,182,108,.12)}";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  // a permanent link in the footer, for anyone who closed the banner
  var foot = document.querySelector(".site-foot .foot-acts") || document.querySelector(".site-foot .wrap");
  if (foot) {
    var a = document.createElement("a");
    a.className = "fb-foot"; a.href = FORM_URL; a.target = "_blank"; a.rel = "noopener";
    a.textContent = T.foot;
    a.addEventListener("click", function () { put("localStorage", KEY, "sent"); stop(); });
    foot.insertBefore(a, foot.firstChild);
  }

  function finished() { return get("localStorage", KEY) === "sent" || get("sessionStorage", SKEY) === "1"; }
  if (finished()) return;

  var tow = null, stayTimer = null, nextTimer = null, held = false, stayLeft = 0, stayStart = 0, stopped = false;

  function build() {
    tow = document.createElement("div");
    tow.className = "fb-tow";
    tow.innerHTML =
      '<aside class="fb-card" role="dialog" aria-labelledby="fb-h">' +
        '<button type="button" class="fb-x" data-fb="close" aria-label="' + T.close + '">×</button>' +
        '<h2 id="fb-h"><span lang="ar" dir="rtl">رأيك يهُمنا</span></h2>' +
        '<p>' + T.sub + '</p>' +
        '<a class="btn btn-primary" data-fb="go" href="' + FORM_URL + '" target="_blank" rel="noopener">' + T.go + '</a>' +
      '</aside>' +
      '<svg class="fb-rope" viewBox="0 0 46 40" aria-hidden="true"><path d="M0 18 Q23 30 46 8" fill="none" stroke="#B98A45" stroke-width="1.6" stroke-dasharray="3 3"/></svg>' +
      '<div class="fb-craft">' + PLANE + '</div>';
    document.body.appendChild(tow);
    tow.addEventListener("click", function (e) {
      var b = e.target.closest("[data-fb]"); if (!b) return;
      if (b.getAttribute("data-fb") === "go") put("localStorage", KEY, "sent");
      else put("sessionStorage", SKEY, "1");
      stop();
    });
    tow.addEventListener("keydown", function (e) { if (e.key === "Escape") { put("sessionStorage", SKEY, "1"); stop(); } });
    // don't fly away while someone is reading or about to click
    ["mouseenter", "focusin"].forEach(function (ev) { tow.addEventListener(ev, hold); });
    ["mouseleave", "focusout"].forEach(function (ev) { tow.addEventListener(ev, release); });
  }

  function offscreen(dir) {
    // dir -1: where it comes from (behind), +1: where it goes (ahead)
    var w = window.innerWidth + 520;
    return "translateX(" + ((rtl ? -dir : dir) * w) + "px)";
  }

  function arrive() {
    if (stopped || finished()) return;
    var root = document.documentElement;
    if (root.classList.contains("picker-open") || root.classList.contains("jr-open")) { nextTimer = setTimeout(arrive, 4000); return; }
    if (!tow) build();
    tow.style.display = "";
    tow.classList.remove("is-parked");
    root.classList.add("fb-showing");
    if (reduced() || !tow.animate) { parked(); return; }
    var an = tow.animate([
      { transform: offscreen(-1) + " translateY(30px) rotate(" + (rtl ? 4 : -4) + "deg)" },
      { transform: "translateX(0) translateY(-10px) rotate(0deg)", offset: .8 },
      { transform: "translateX(0) translateY(0) rotate(0deg)" }
    ], { duration: 2600, easing: "cubic-bezier(.2,.7,.2,1)", fill: "both" });
    an.onfinish = parked;
  }

  function parked() {
    if (!tow) return;
    tow.classList.add("is-parked");
    stayLeft = STAY_MS; stayStart = Date.now();
    clearTimeout(stayTimer);
    if (!held) stayTimer = setTimeout(function () { leave(false); }, stayLeft);
  }
  function hold() { if (held) return; held = true; clearTimeout(stayTimer); stayLeft = Math.max(4000, stayLeft - (Date.now() - stayStart)); }
  function release() {
    if (!held) return; held = false; stayStart = Date.now(); clearTimeout(stayTimer);
    if (tow && tow.classList.contains("is-parked")) stayTimer = setTimeout(function () { leave(false); }, stayLeft);
  }

  function leave(final) {
    clearTimeout(stayTimer);
    if (!tow) return;
    tow.classList.remove("is-parked");
    var done = function () {
      if (!tow) return;
      tow.style.display = "none";
      document.documentElement.classList.remove("fb-showing");
      if (!final && !stopped && !finished()) nextTimer = setTimeout(arrive, AWAY_MS);
    };
    if (reduced() || !tow.animate) { done(); return; }
    var an = tow.animate([
      { transform: "translateX(0) translateY(0) rotate(0deg)" },
      { transform: "translateX(" + (rtl ? -40 : 40) + "px) translateY(-14px) rotate(" + (rtl ? 3 : -3) + "deg)", offset: .2 },
      { transform: offscreen(1) + " translateY(-120px) rotate(" + (rtl ? 6 : -6) + "deg)" }
    ], { duration: 2200, easing: "cubic-bezier(.5,0,.8,.4)", fill: "both" });
    an.onfinish = done;
  }

  function stop() {
    stopped = true; clearTimeout(nextTimer); clearTimeout(stayTimer);
    if (tow && tow.style.display !== "none") leave(true);
  }

  nextTimer = setTimeout(arrive, FIRST_MS);
})();

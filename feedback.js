/* Masarok: a small "رأيك يهُمنا" pop-up that invites visitors to a feedback form.
   Shows once after a visitor has spent some time on the page, and never blocks reading. */
(function () {
  "use strict";

  // Paste the Google Form link here. While it is empty, nothing is shown.
  var FORM_URL = "";

  var KEY = "masarok-feedback";        // "sent" | timestamp of last "Not now"
  var SNOOZE_DAYS = 7;                 // after "Not now", ask again a week later
  var DELAY_MS = 40000;                // show after 40 seconds…
  var SCROLL_SHARE = 0.45;             // …or after reading about half the page

  if (!FORM_URL) return;

  var lang = (document.documentElement.lang || "en").slice(0, 2) === "ar" ? "ar" : "en";
  var T = {
    en: { sub: "How useful is Masarok for you? Tell us in 1 minute and help us improve the guide for the next student.", go: "Share your feedback", later: "Not now", close: "Close", foot: "رأيك يهُمنا · Share your feedback" },
    ar: { sub: "إلى أي مدى أفادك مسارُك؟ شاركنا رأيك في دقيقة، وساعدنا نطوّر الدليل للطالب القادم.", go: "شارك رأيك", later: "ليس الآن", close: "إغلاق", foot: "رأيك يهُمنا · شارك رأيك" }
  }[lang];

  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function put(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  var css =
    ".fb-pop{position:fixed; z-index:65; bottom:max(16px, env(safe-area-inset-bottom)); inset-inline-start:16px; width:min(22rem, calc(100vw - 32px));" +
    " background:var(--night, #0B1626); color:var(--night-ink, #EEF2F7); border:1.5px solid var(--gold, #E2B66C); border-radius:16px; padding:16px 18px 14px;" +
    " box-shadow:0 18px 40px -14px rgba(0,0,0,.7); display:grid; gap:8px; opacity:0; translate:0 16px; transition:opacity .35s ease, translate .35s ease}" +
    ".fb-pop.is-in{opacity:1; translate:0 0}" +
    ".fb-pop h2{margin:0; font-family:var(--f-ar, sans-serif); font-weight:700; font-size:1.3rem; color:var(--gold, #E2B66C); padding-inline-end:32px; line-height:1.5}" +
    ".fb-pop p{margin:0; color:#C8D3E0; font-size:.95rem; line-height:1.6}" +
    ".fb-pop .fb-row{display:flex; flex-wrap:wrap; align-items:center; gap:8px 14px; margin-top:4px}" +
    ".fb-pop .btn{display:inline-flex; align-items:center; gap:8px; cursor:pointer}" +
    ".fb-later{background:none; border:0; padding:4px 0; font:inherit; font-size:.9rem; color:var(--night-dim, #A9B8CB); text-decoration:underline; text-underline-offset:3px; cursor:pointer}" +
    ".fb-later:hover{color:var(--gold, #E2B66C)}" +
    ".fb-x{position:absolute; top:10px; inset-inline-end:10px; width:32px; height:32px; border-radius:50%; border:1px solid rgba(238,242,247,.25); background:transparent; color:var(--night-ink, #EEF2F7); font-size:1.2rem; line-height:1; cursor:pointer}" +
    ".fb-x:hover{border-color:var(--gold, #E2B66C); color:var(--gold, #E2B66C)}" +
    ".fb-pop :focus-visible{outline:3px solid var(--gold, #E2B66C); outline-offset:2px}" +
    ".jr-open .fb-pop, .picker-open .fb-pop{display:none}" +
    "@media (max-width:560px){ .fb-pop{inset-inline:12px; width:auto; bottom:max(12px, env(safe-area-inset-bottom))} html.fb-showing .jr-fab{opacity:0; pointer-events:none; visibility:hidden} }" +
    "@media (prefers-reduced-motion: reduce){ .fb-pop{transition:none} }" +
    ".fb-foot{display:inline-flex; align-items:center; gap:6px; padding:6px 14px; border:1px solid var(--gold, #E2B66C); border-radius:999px; color:var(--gold, #E2B66C); text-decoration:none; font-size:.9rem; width:fit-content}" +
    ".fb-foot:hover{background:rgba(226,182,108,.12)}";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  // a permanent link in the footer, for anyone who closed the pop-up
  var foot = document.querySelector(".site-foot .wrap");
  if (foot) {
    var a = document.createElement("a");
    a.className = "fb-foot"; a.href = FORM_URL; a.target = "_blank"; a.rel = "noopener";
    a.textContent = T.foot;
    a.addEventListener("click", function () { put("sent"); });
    foot.insertBefore(a, foot.firstChild);
  }

  var state = get();
  if (state === "sent") return;
  if (state && Date.now() - (+state || 0) < SNOOZE_DAYS * 864e5) return;

  var shown = false, pop;
  function show() {
    if (shown) return;
    // wait while the picker or the journey is open
    var root = document.documentElement;
    if (root.classList.contains("picker-open") || root.classList.contains("jr-open")) { setTimeout(show, 5000); return; }
    shown = true;
    pop = document.createElement("aside");
    pop.className = "fb-pop";
    pop.setAttribute("role", "dialog");
    pop.setAttribute("aria-labelledby", "fb-h");
    pop.innerHTML =
      '<button type="button" class="fb-x" data-fb="later" aria-label="' + T.close + '">×</button>' +
      '<h2 id="fb-h"><span lang="ar" dir="rtl">رأيك يهُمنا</span></h2>' +
      '<p>' + T.sub + '</p>' +
      '<div class="fb-row"><a class="btn btn-primary" data-fb="go" href="' + FORM_URL + '" target="_blank" rel="noopener">' + T.go + '</a>' +
      '<button type="button" class="fb-later" data-fb="later">' + T.later + '</button></div>';
    document.body.appendChild(pop);
    root.classList.add("fb-showing");
    requestAnimationFrame(function () { requestAnimationFrame(function () { pop.classList.add("is-in"); }); });
    pop.addEventListener("click", function (e) {
      var b = e.target.closest("[data-fb]"); if (!b) return;
      put(b.getAttribute("data-fb") === "go" ? "sent" : String(Date.now()));
      hide();
    });
    pop.addEventListener("keydown", function (e) { if (e.key === "Escape") { put(String(Date.now())); hide(); } });
  }
  function hide() {
    if (!pop) return;
    pop.classList.remove("is-in");
    document.documentElement.classList.remove("fb-showing");
    setTimeout(function () { if (pop && pop.parentNode) pop.parentNode.removeChild(pop); }, 400);
  }

  var timer = setTimeout(show, DELAY_MS);
  function onScroll() {
    var h = document.documentElement.scrollHeight - innerHeight;
    if (h > 0 && scrollY / h >= SCROLL_SHARE) { clearTimeout(timer); removeEventListener("scroll", onScroll); show(); }
  }
  addEventListener("scroll", onScroll, { passive: true });
})();

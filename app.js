/* Masarok as an app: registers the offline service worker and offers "Install app". */
(function () {
  var AR = (document.documentElement.lang || "en").slice(0, 2) === "ar";
  var T = AR ? {
    install: "ثبّت التطبيق", installFoot: "ثبّت مسارُك على جوالك",
    iosTitle: "ثبّت مسارُك على جوالك",
    ios: ["اضغط زر المشاركة <b>⬆︎</b> في أسفل Safari.", "اختر <b>إضافة إلى الشاشة الرئيسية</b>.", "اضغط <b>إضافة</b>، وسيظهر مسارُك مع تطبيقاتك."],
    iosNote: "يعمل الدليل بعدها دون إنترنت، ويُحفظ تقدمك.", close: "إغلاق", ok: "حسنًا"
  } : {
    install: "Install app", installFoot: "Install Masarok on your phone",
    iosTitle: "Install Masarok on your phone",
    ios: ["Tap the Share button <b>⬆︎</b> at the bottom of Safari.", "Choose <b>Add to Home Screen</b>.", "Tap <b>Add</b>. Masarok will appear with your apps."],
    iosNote: "The guide then works offline, and your progress stays saved.", close: "Close", ok: "Got it"
  };

  var root = document.documentElement;
  var standalone = (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) || window.navigator.standalone === true;
  if (standalone) root.classList.add("is-app");

  // offline support
  if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
    window.addEventListener("load", function () { navigator.serviceWorker.register("/sw.js").catch(function () {}); });
  }

  var css =
    ".is-app .top{padding-top:max(20px, env(safe-area-inset-top))}" +
    ".app-chip{font:inherit; font-size:.93rem; color:var(--night-ink, #EEF2F7); background:rgba(226,182,108,.12); border:1px solid var(--gold, #E2B66C); border-radius:999px; padding:1px 12px; cursor:pointer; display:inline-flex; align-items:center; gap:6px}" +
    ".app-chip:hover{background:rgba(226,182,108,.22)}" +
    ".app-chip svg{width:14px; height:14px}" +
    ".app-foot{display:inline-flex; align-items:center; gap:6px; margin-inline-start:8px; padding:6px 14px; border:1px solid rgba(238,242,247,.35); border-radius:999px; color:var(--night-ink, #EEF2F7); background:transparent; font:inherit; font-size:.9rem; cursor:pointer}" +
    ".app-foot:hover{background:rgba(238,242,247,.08)}" +
    ".is-app .app-chip, .is-app .app-foot{display:none !important}" +
    ".app-dlg{position:fixed; inset:0; z-index:90; display:grid; place-items:end center; background:rgba(5,10,18,.6); padding:16px}" +
    ".app-dlg[hidden]{display:none}" +
    ".app-card{width:min(420px, 100%); background:#10223C; color:var(--night-ink, #EEF2F7); border:1px solid rgba(238,242,247,.16); border-radius:16px; padding:20px; box-shadow:0 20px 60px -20px rgba(0,0,0,.7); margin-bottom:env(safe-area-inset-bottom)}" +
    ".app-card h2{margin:0 0 10px; font-size:1.15rem}" +
    ".app-card ol{margin:0 0 10px; padding-inline-start:1.2em; display:grid; gap:6px}" +
    ".app-card p{margin:0 0 14px; color:var(--night-dim, #A9B8CB); font-size:.92rem}" +
    ".app-card .row{display:flex; align-items:center; gap:12px}" +
    ".app-card img{width:48px; height:48px; border-radius:11px}" +
    ".app-card button{font:inherit; background:var(--gold, #E2B66C); color:#0B1626; border:0; border-radius:999px; padding:8px 18px; font-weight:700; cursor:pointer}";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  var deferred = null;
  var ua = navigator.userAgent || "";
  var isIOS = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  var icon = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>';
  var chips = [];

  function addButtons() {
    if (standalone || chips.length) return;
    var nav = document.querySelector(".top nav"), lang = nav && nav.querySelector("a.lang");
    if (nav) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "app-chip"; b.innerHTML = icon + "<span>" + T.install + "</span>";
      nav.insertBefore(b, lang || null); chips.push(b);
    }
    var foot = document.querySelector(".site-foot .foot-acts") || document.querySelector(".site-foot .wrap");
    if (foot) {
      var f = document.createElement("button");
      f.type = "button"; f.className = "app-foot"; f.innerHTML = icon + "<span>" + T.installFoot + "</span>";
      var fb = foot.querySelector(".fb-foot");
      if (fb && fb.nextSibling) foot.insertBefore(f, fb.nextSibling); else foot.insertBefore(f, foot.firstChild);
      chips.push(f);
    }
    chips.forEach(function (el) { el.addEventListener("click", install); });
  }
  function removeButtons() { chips.forEach(function (el) { el.remove(); }); chips = []; }

  function install() {
    if (deferred) {
      deferred.prompt();
      deferred.userChoice.then(function (r) { if (r && r.outcome === "accepted") removeButtons(); deferred = null; }).catch(function () {});
      return;
    }
    if (isIOS) showIOS();
  }

  var dlg;
  function showIOS() {
    if (!dlg) {
      dlg = document.createElement("div");
      dlg.className = "app-dlg"; dlg.hidden = true;
      dlg.innerHTML = '<div class="app-card" role="dialog" aria-modal="true" aria-labelledby="app-dlg-h">' +
        '<div class="row"><img src="/icons/icon-192.png" alt=""><h2 id="app-dlg-h">' + T.iosTitle + "</h2></div>" +
        "<ol>" + T.ios.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ol>" +
        "<p>" + T.iosNote + '</p><button type="button" data-app-close>' + T.ok + "</button></div>";
      document.body.appendChild(dlg);
      dlg.addEventListener("click", function (e) { if (e.target === dlg || e.target.closest("[data-app-close]")) dlg.hidden = true; });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape" && dlg && !dlg.hidden) dlg.hidden = true; });
    }
    dlg.hidden = false;
    var btn = dlg.querySelector("[data-app-close]"); if (btn) btn.focus();
  }

  window.addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); deferred = e; addButtons(); });
  window.addEventListener("appinstalled", function () { deferred = null; removeButtons(); });

  // Safari on iPhone/iPad has no install prompt, so show the how-to instead
  function ready() { if (isIOS && !standalone) addButtons(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ready); else ready();
})();

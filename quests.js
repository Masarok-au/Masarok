/* Masarok guide: side quests across the site and a wardrobe of outfits that levels unlock.
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

  // ---------- real-life quests: the student ticks these off themselves ----------
  function cc() { var M = window.Masarok; var v = M && M.values ? M.values() : {}; return v.cc || "au"; }
  var WORDS = {
    au: [["arvo", "afternoon", "العصر"], ["servo", "petrol station", "محطة الوقود"], ["heaps", "a lot", "كثير"], ["reckon", "think", "أظن"], ["no worries", "it's fine, or you're welcome", "لا مشكلة، أو العفو"]],
    uk: [["cheers", "thanks", "شكرًا"], ["quid", "a pound (£1)", "جنيه واحد"], ["loo", "toilet", "دورة المياه"], ["knackered", "very tired", "متعب جدًا"], ["fresher", "first-year student", "طالب سنة أولى"]],
    us: [["dorm", "student residence", "سكن الطلاب"], ["freshman", "first-year student", "طالب سنة أولى"], ["GPA", "grade point average", "المعدل التراكمي"], ["midterm", "mid-semester exam", "اختبار منتصف الفصل"], ["check", "the bill at a restaurant", "فاتورة المطعم"]],
    ca: [["loonie", "one-dollar coin", "عملة الدولار"], ["toonie", "two-dollar coin", "عملة الدولارين"], ["toque", "winter hat", "قبعة الشتاء"], ["double-double", "coffee with two cream, two sugar", "قهوة بحليبين وسكرين"], ["washroom", "toilet", "دورة المياه"]],
    de: [["Tschüss", "bye", "مع السلامة"], ["Mensa", "university canteen", "مطعم الجامعة"], ["WG", "shared flat", "شقة مشتركة"], ["Termin", "appointment", "موعد"], ["Feierabend", "end of the work day", "نهاية الدوام"]],
    sg: [["lah", "adds emphasis to a sentence", "لتأكيد الكلام"], ["makan", "eat, or food", "أكل"], ["chope", "reserve a seat (often with a tissue packet)", "حجز مقعد (غالبًا بعلبة مناديل)"], ["kopi", "coffee", "قهوة"], ["hawker centre", "food court with cheap stalls", "ساحة طعام بأكشاك رخيصة"]],
    xx: [["lecture", "a big class for everyone in the course", "محاضرة عامة لكل طلاب المادة"], ["tutorial", "a small class to practise", "حصة صغيرة للتطبيق"], ["deadline", "the last day to submit", "آخر موعد للتسليم"], ["extension", "extra time for an assignment", "تمديد لموعد التسليم"], ["office hours", "time to visit your lecturer", "ساعات مكتبية لمقابلة المحاضر"]]
  };
  var SOS = { au: "000", uk: "999 (or 112)", us: "911", ca: "911", de: "112 (police 110)", sg: "999 police, 995 ambulance and fire" };
  var SOS_AR = { au: "000", uk: "999 (أو 112)", us: "911", ca: "911", de: "112 (الشرطة 110)", sg: "999 للشرطة، و995 للإسعاف والإطفاء" };
  var LQ = [
    { id: "mission", p: 15, i: "🏛️", n: ["Save your cultural mission's contacts", "احفظ بيانات التواصل مع الملحقية"], d: function () { return ["Find your cultural mission's official website and save its phone number and email in your phone.", "ابحث عن الموقع الرسمي للملحقية الثقافية، واحفظ رقمها وبريدها في جوالك."]; } },
    { id: "club", p: 15, i: "🤝", n: ["Find the Saudi students club", "ابحث عن نادي الطلاب السعوديين"], d: function () { return ["Most universities with Saudi students have a Saudi students association or club. Follow it before you fly.", "معظم الجامعات التي فيها طلاب سعوديون لديها نادٍ أو رابطة للطلاب السعوديين، فتابعها قبل السفر."]; } },
    { id: "words", p: 15, i: "🗣️", n: ["Learn 5 local words", "تعلّم 5 كلمات محلية"], d: function () { return ["People will use these from day one. Learn what they mean.", "سيستخدمها الناس من أول يوم، فتعلّم معانيها."]; }, x: function () {
      var w = WORDS[cc()] || WORDS.xx;
      return '<ul class="qs-words">' + w.map(function (r) { return '<li><b dir="ltr">' + esc(r[0]) + "</b><span>" + esc(A ? r[2] : r[1]) + "</span></li>"; }).join("") + "</ul>";
    } },
    { id: "sos", p: 15, i: "🚨", n: ["Save the emergency number", "احفظ رقم الطوارئ"], d: function () { var c = cc(); return SOS[c] ? ["In your study country it is " + SOS[c] + ". Save it, with the nearest hospital to where you'll live.", "رقم الطوارئ في دولة دراستك هو " + SOS_AR[c] + "، فاحفظه مع أقرب مستشفى لسكنك."] : ["Look up the emergency number in your study country and save it, with the nearest hospital.", "ابحث عن رقم الطوارئ في دولة دراستك واحفظه مع أقرب مستشفى."]; } },
    { id: "backup", p: 15, i: "☁️", n: ["Back up your documents", "انسخ مستنداتك احتياطيًا"], d: function () { return ["Scan your passport, offer, guarantee letter, visa and transcripts into one cloud folder.", "امسح جوازك وقبولك وخطاب الضمان والتأشيرة وكشوف الدرجات في مجلد سحابي واحد."]; } },
    { id: "halal", p: 15, i: "🍽️", n: ["Find halal food near campus", "ابحث عن طعام حلال قرب الجامعة"], d: function () { return ["Look up a halal butcher, supermarket and a couple of restaurants near your university.", "ابحث عن ملحمة حلال وسوبرماركت وبعض المطاعم قرب جامعتك."]; } },
    { id: "mosque", p: 15, i: "🕌", n: ["Find a prayer room or mosque", "ابحث عن مصلى أو مسجد"], d: function () { return ["Many campuses have a prayer room. Find it, and the nearest mosque for Friday prayer.", "كثير من الجامعات فيها مصلى، فابحث عنه وعن أقرب مسجد لصلاة الجمعة."]; } },
    { id: "sim", p: 15, i: "📶", n: ["Plan your phone", "خطط لجوالك"], d: function () { return ["Compare local SIM plans now, so you can buy one on the day you land.", "قارن باقات الجوال المحلية الآن، لتشتري واحدة يوم وصولك."]; } }
  ];
  function lifeDone(id) { var g = G(); return !!(g && g.has && g.has("quest:life-" + id)); }

  var UI = {
    title: ["Side quests", "المهمات الجانبية"],
    onSite: ["On the guide", "في الدليل"], inLife: ["In real life", "في الواقع"], did: ["I did it", "أنجزتها"],
    lifeSub: ["Things to sort out for your move. Tick them off yourself when they're done.", "أمور ترتبها لانتقالك، وأشّر عليها بنفسك عند إنجازها."],
    sub: ["Optional missions around the guide. Each one gives bonus points, and 5 of them earn the Side quester badge.", "مهمات اختيارية في أنحاء الدليل، لكل منها نقاط إضافية، وإنجاز 5 منها يمنحك وسام «صاحب المهمات»."],
    go: ["Go", "ابدأ"], done: ["Done", "تمت"], pts: ["+{n} pts", "+{n} نقطة"],
    toast: ["Side quest complete: {q}", "أنجزت مهمة: {q}"],
    already: ["{n} side quests already done", "مهمات منجزة مسبقًا: {n}"],
    close: ["Close", "إغلاق"],
    installHow: ["Open your browser's menu and choose “Add to Home Screen” or “Install app”.", "افتح قائمة المتصفح واختر «إضافة إلى الشاشة الرئيسية» أو «تثبيت التطبيق»."],
    wTitle: ["Your wardrobe", "خزانتك"],
    wSub: ["Each new rank unlocks an outfit for your traveller. Pick one to wear across the guide.", "كل رتبة جديدة تفتح زيًّا لمسافرك. اختر ما يلبسه في أنحاء الدليل."],
    outfits: ["Outfits", "الأزياء"], accs: ["Accessories", "الإكسسوارات"], pick: ["Carry", "اختر"],
    accSub: ["Badges unlock these. Your traveller carries one at a time.", "تفتحها الأوسمة، ويحمل مسافرك واحدًا منها في كل مرة."], unlockB: ["Unlocks with the {b} badge", "يُفتح بوسام «{b}»"],
    wear: ["Wear", "البس"], wearing: ["Wearing", "تلبسه الآن"], unlock: ["Unlocks at {r}", "يُفتح عند {r}"]
  };

  // ---------- wardrobe ----------
  var OUTFITS = [
    { id: "classic", r: 0, n: ["Thobe and red shemagh", "الثوب والشماغ الأحمر"] },
    { id: "ghutra", r: 2, n: ["White ghutra", "الغترة البيضاء"] },
    { id: "winter", r: 4, n: ["Winter thobe", "الثوب الشتوي"] },
    { id: "bisht", r: 6, n: ["Black bisht", "البشت الأسود"] },
    { id: "gold", r: 9, n: ["Golden bisht", "البشت الذهبي"] }
  ];
  var ACC = [
    { id: "none", b: null, n: ["Nothing", "بدون"] },
    { id: "dallah", b: "streak3", n: ["Dallah", "الدلّة"] },
    { id: "sadu", b: "quester", n: ["Sadu bag", "حقيبة السدو"] },
    { id: "falcon", b: "summit", n: ["Falcon", "الصقر"] }
  ];
  var AK = "masarok-acc";
  function badgeOk(id) { var g = G(); if (!id) return true; if (!g || !g.info) return false; return g.info().e.indexOf(id) > -1; }
  function accOn() { var a = localStorage.getItem(AK) || "none"; var d = ACC.filter(function (x) { return x.id === a; })[0]; return d && badgeOk(d.b) ? a : "none"; }
  function badgeName(id) { var g = G(), b = g && g.badges.filter(function (x) { return x.id === id; })[0]; return b ? T(b.n) : ""; }
  var OK = "masarok-outfit";
  function rank() { var g = G(); return g && g.info ? g.info().r : 0; }
  function wearing() { var o = localStorage.getItem(OK) || "classic"; var d = OUTFITS.filter(function (x) { return x.id === o; })[0]; return d && d.r <= rank() ? o : "classic"; }
  function applyOutfit() { document.documentElement.setAttribute("data-outfit", wearing()); document.documentElement.setAttribute("data-acc", accOn()); }
  function wardrobe() {
    var g = G(); if (!g) return;
    var r = rank(), w = wearing(), fig = J() && J().figure ? J().figure("") : "";
    var cards = OUTFITS.map(function (o) {
      var open = o.r <= r, on = o.id === w;
      return '<div class="wd-o' + (open ? "" : " is-locked") + (on ? " is-on" : "") + '" data-outfit="' + o.id + '">' +
        '<div class="wd-fig">' + fig + (open ? "" : '<span class="wd-lock" aria-hidden="true">🔒</span>') + "</div><b>" + esc(T(o.n)) + "</b>" +
        (open ? '<button type="button" class="gm-btn" data-wear="' + o.id + '"' + (on ? ' aria-pressed="true" disabled' : "") + ">" + esc(T(on ? UI.wearing : UI.wear)) + "</button>"
          : "<small>" + esc(fmt(UI.unlock, { r: (A ? "المستوى " : "Level ") + (o.r + 1) + " · " + T(g.ranks[o.r].n) })) + "</small>") + "</div>";
    }).join("");
    var a = accOn();
    var accs = ACC.map(function (x) {
      var open = badgeOk(x.b), on = x.id === a;
      return '<div class="wd-o' + (open ? "" : " is-locked") + (on ? " is-on" : "") + '" data-outfit="' + w + '" data-acc="' + x.id + '">' +
        '<div class="wd-fig">' + fig + (open ? "" : '<span class="wd-lock" aria-hidden="true">🔒</span>') + "</div><b>" + esc(T(x.n)) + "</b>" +
        (open ? '<button type="button" class="gm-btn" data-acc-pick="' + x.id + '"' + (on ? ' aria-pressed="true" disabled' : "") + ">" + esc(T(on ? UI.wearing : UI.pick)) + "</button>"
          : "<small>" + esc(fmt(UI.unlockB, { b: badgeName(x.b) })) + "</small>") + "</div>";
    }).join("");
    g.overlay('<h2 id="gm-h">🧥 ' + esc(T(UI.wTitle)) + '</h2><p class="gm-sub">' + esc(T(UI.wSub)) + '</p><h3 class="qs-h">' + esc(T(UI.outfits)) + '</h3><div class="wd-grid">' + cards + "</div>" +
      '<h3 class="qs-h">' + esc(T(UI.accs)) + '</h3><p class="gm-sub">' + esc(T(UI.accSub)) + '</p><div class="wd-grid">' + accs + "</div>" +
      '<div class="gm-foot"><button type="button" class="btn btn-primary" data-gm-close data-gm-cont>' + esc(T(UI.close)) + "</button></div>");
  }

  // ---------- quest board ----------
  function awarded(id) { var g = G(); return !!(g && g.has && g.has("quest:" + id)); }
  function count() { var n = 0; Q.forEach(function (q) { if (awarded(q.id)) n++; }); LQ.forEach(function (q) { if (lifeDone(q.id)) n++; }); return n; }
  function board() {
    var g = G(); if (!g) return;
    var rows = Q.map(function (q) {
      var d = awarded(q.id);
      return '<li class="qs' + (d ? " is-done" : "") + '"><span class="qs-ic" aria-hidden="true">' + q.i + '</span><span class="qs-tx"><b>' + esc(T(q.n)) + "</b><small>" + esc(T(q.d)) + "</small></span>" +
        '<span class="qs-r"><em>' + esc(fmt(UI.pts, { n: q.p })) + "</em>" + (d ? '<span class="qs-done">✓ ' + esc(T(UI.done)) + "</span>" : '<button type="button" class="gm-btn" data-quest-go="' + q.id + '">' + esc(T(UI.go)) + "</button>") + "</span></li>";
    }).join("");
    var life = LQ.map(function (q) {
      var d = lifeDone(q.id);
      return '<li class="qs' + (d ? " is-done" : "") + '"><span class="qs-ic" aria-hidden="true">' + q.i + '</span><span class="qs-tx"><b>' + esc(T(q.n)) + "</b><small>" + esc(T(q.d())) + "</small>" + (q.x ? q.x() : "") + "</span>" +
        '<span class="qs-r"><em>' + esc(fmt(UI.pts, { n: q.p })) + "</em>" + (d ? '<span class="qs-done">✓ ' + esc(T(UI.done)) + "</span>" : '<button type="button" class="gm-btn" data-life="' + q.id + '">' + esc(T(UI.did)) + "</button>") + "</span></li>";
    }).join("");
    g.overlay('<h2 id="gm-h">🎯 ' + esc(T(UI.title)) + ' <span class="qs-n">' + count() + "/" + (Q.length + LQ.length) + '</span></h2><p class="gm-sub">' + esc(T(UI.sub)) + '</p>' +
      '<h3 class="qs-h">' + esc(T(UI.onSite)) + '</h3><ul class="qs-list">' + rows + "</ul>" +
      '<h3 class="qs-h">' + esc(T(UI.inLife)) + '</h3><p class="gm-sub">' + esc(T(UI.lifeSub)) + '</p><ul class="qs-list">' + life + "</ul>" +
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
    var lf = t.closest("[data-life]");
    if (lf) {
      var lq = LQ.filter(function (x) { return x.id === lf.getAttribute("data-life"); })[0];
      if (lq && G().award("quest:life-" + lq.id, lq.p, lf)) { document.dispatchEvent(new CustomEvent("masarok:activity", { detail: { type: "quest" } })); var sc = document.querySelector(".gm-card"), top = sc ? sc.scrollTop : 0; board(); sc = document.querySelector(".gm-card"); if (sc) sc.scrollTop = top; }
      return;
    }
    var ap = t.closest("[data-acc-pick]");
    if (ap) { localStorage.setItem(AK, ap.getAttribute("data-acc-pick")); applyOutfit(); var sc0 = document.querySelector(".gm-card"), top0 = sc0 ? sc0.scrollTop : 0; wardrobe(); sc0 = document.querySelector(".gm-card"); if (sc0) sc0.scrollTop = top0; return; }
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
    total: function () { return Q.length + LQ.length; }, done: count, life: LQ, board: board, wardrobe: wardrobe, quests: Q,
    outfitAt: function (r) { var o = OUTFITS.filter(function (x) { return x.r === r; })[0]; return o && r > 0 ? T(o.n) : null; }
  };

  applyOutfit();
  function init() { setTimeout(function () { evaluate(); applyOutfit(); }, 700); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();

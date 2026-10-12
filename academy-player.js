/* Masarok Academy lesson player.
   Course home (plan, lessons), and a step-by-step player with the exercise types:
   text, table, passage (True/False/Not Given + multiple choice), matching headings, listening (spoken by the browser),
   quiz, self-check, placement result + study plan, outline builder, model answers, essay pad, speaking recorder, flashcards.
   Progress stays in this browser (masarok-academy), like the rest of Masarok. */
(function () {
  "use strict";

  var C = window.MasarokCourse; if (!C) return;
  var AR = (document.documentElement.lang || "en").slice(0, 2) === "ar";
  var A = AR ? 1 : 0;
  var base = AR ? "/ar/" : "/";
  function T(x) { return Array.isArray(x) ? x[A] : x; }
  function EN(x) { return Array.isArray(x) ? x[0] : x; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c]; }); }
  function fmt(s, o) { return T(s).replace(/\{(\w+)\}/g, function (m, k) { return o[k] != null ? o[k] : m; }); }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function reduced() { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); }

  // ---------------- saved progress ----------------
  var KEY = "masarok-academy";
  var S = (function () { var s = null; try { s = JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) {} s = s || {}; s.lessons = s.lessons || {}; s.vocab = s.vocab || {}; if (s.arHelp == null) s.arHelp = AR; return s; })();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  // count Academy activity in the guide's weekly streak
  function touchWeek() {
    try {
      var g = JSON.parse(localStorage.getItem("masarok-game") || "null") || {};
      var d = new Date(), u = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())), day = u.getUTCDay() || 7;
      u.setUTCDate(u.getUTCDate() + 4 - day);
      var k = u.getUTCFullYear() + "-W" + ("0" + Math.ceil(((u - new Date(Date.UTC(u.getUTCFullYear(), 0, 1))) / 864e5 + 1) / 7)).slice(-2);
      g.weeks = g.weeks || []; if (g.weeks.indexOf(k) < 0) { g.weeks.push(k); localStorage.setItem("masarok-game", JSON.stringify(g)); }
    } catch (e) {}
  }

  // ---------------- words on screen ----------------
  var UI = {
    academy: ["Masarok Academy", "أكاديمية مسارُك"], back: ["Course", "الدورة"], backAc: ["All courses", "كل الدورات"],
    arOn: ["Arabic help: on", "الشرح بالعربية: مفعّل"], arOff: ["Arabic help: off", "الشرح بالعربية: متوقف"],
    step: ["Step {n} of {t}", "الخطوة {n} من {t}"], next: ["Next", "التالي"], prev: ["Back", "السابق"], check: ["Check answers", "تحقق من الإجابات"],
    finish: ["Finish lesson", "أنهِ الدرس"], again: ["Try again", "أعد المحاولة"], answerAll: ["Answer every question first.", "أجب عن كل الأسئلة أولًا."],
    score: ["{c} of {t} correct", "{c} من {t} صحيحة"], passed: ["Well done! You passed this practice.", "أحسنت! اجتزت هذا التدريب."], notYet: ["Not quite there. Read the explanations, then try again or carry on.", "لم تصل بعد. اقرأ الشرح ثم أعد المحاولة أو تابع."],
    start: ["Start", "ابدأ"], cont: ["Continue", "تابع"], review: ["Review", "راجع"], done: ["Done", "مكتمل"], mins: ["{n} min", "{n} د"],
    planT: ["Your study plan", "خطة دراستك"], planNone: ["Start with the placement test. It takes 15 minutes and builds your plan.", "ابدأ باختبار تحديد المستوى، فهو يستغرق 15 دقيقة ويبني خطتك."], planGo: ["Take the placement test", "ابدأ اختبار تحديد المستوى"],
    lessonsT: ["Lessons", "الدروس"], est: ["Estimated starting band", "المستوى المبدئي التقديري"], overall: ["Overall", "الكلي"],
    skills: { l: ["Listening", "الاستماع"], r: ["Reading", "القراءة"], w: ["Writing", "الكتابة"], s: ["Speaking", "المحادثة"] },
    target: ["Target band", "الدرجة المستهدفة"], testDate: ["Test date", "موعد الاختبار"], weeks: ["{n} weeks to go", "باقي {n} أسابيع"], week1: ["1 week to go", "باقي أسبوع واحد"], past: ["Pick a future date", "اختر تاريخًا قادمًا"],
    gap: ["You're about {g} bands from your target.", "يفصلك عن هدفك نحو {g} درجة."], onTarget: ["You're already around your target. Keep practising to stay there.", "أنت قريب من هدفك، فاستمر في التدريب للحفاظ عليه."],
    big: ["That's a big jump for the time left. Consider a later test date, or plan more study each day.", "هذه قفزة كبيرة بالنسبة للوقت المتبقي، ففكّر في موعد أبعد أو خصص وقتًا أطول للدراسة يوميًا."],
    focus: ["Focus first on {s}.", "ركّز أولًا على {s}."], startHere: ["Start here", "ابدأ من هنا"],
    week: ["Your week", "أسبوعك"], days: [["Sun", "الأحد"], ["Mon", "الاثنين"], ["Tue", "الثلاثاء"], ["Wed", "الأربعاء"], ["Thu", "الخميس"]],
    vocabDaily: ["+ 5 minutes of vocabulary every day", "+ 5 دقائق مفردات كل يوم"],
    listenSoon: ["Listening lessons arrive in the next phase. Until then, use the free practice tests on ielts.org.", "دروس الاستماع قادمة في المرحلة التالية، وحتى ذلك الحين استخدم الاختبارات التجريبية المجانية في ielts.org."],
    estNote: ["This is a practice estimate, not an official IELTS score.", "هذا تقدير تدريبي وليس درجة IELTS رسمية."],
    finishParts: ["Answer all four parts first, then your result appears here.", "أجب عن الأجزاء الأربعة أولًا، ثم تظهر نتيجتك هنا."],
    redo: ["Retake", "أعد الاختبار"], editPlan: ["Change plan", "عدّل الخطة"],
    lessonDone: ["Lesson complete!", "أكملت الدرس!"], guidePts: ["+40 points in Guide me next time you open it.", "+40 نقطة في «أرشدني» عند فتحه."], nextLesson: ["Next lesson", "الدرس التالي"], toCourse: ["Back to the course", "العودة إلى الدورة"],
    t: ["True", "صحيح"], f: ["False", "خطأ"], ng: ["Not Given", "غير مذكور"],
    play: ["Play recording", "شغّل التسجيل"], playing: ["Playing…", "يعمل…"], playsLeft: ["Plays left: {n}", "مرات التشغيل المتبقية: {n}"], noPlays: ["No plays left", "انتهت مرات التشغيل"],
    noTts: ["Your browser can't play this recording, so the script is shown instead. Read it once, then answer.", "متصفحك لا يستطيع تشغيل هذا التسجيل، لذلك يظهر النص بدلًا منه. اقرأه مرة واحدة ثم أجب."],
    script: ["Show the script", "اعرض النص"],
    yours: ["Your answer", "إجابتك"],
    // writing
    outT: ["Plan your essay", "خطط لمقالك"], outSub: ["Fill in each box with a few words. Your plan is saved on this device.", "املأ كل خانة ببضع كلمات، وتُحفظ خطتك على هذا الجهاز."],
    out: [["Your position (one sentence)", "رأيك (جملة واحدة)"], ["Body 1: main idea", "الفقرة 1: الفكرة الرئيسية"], ["Body 1: example", "الفقرة 1: مثال"], ["Body 2: main idea", "الفقرة 2: الفكرة الرئيسية"], ["Body 2: example", "الفقرة 2: مثال"], ["Conclusion", "الخاتمة"]],
    outPh: ["e.g. Studying abroad is valuable, but it should be a choice.", "مثال: الدراسة في الخارج مفيدة لكنها يجب أن تكون اختيارًا."],
    modelsT: ["Compare model answers", "قارن نماذج الإجابات"], modelsSub: ["Same question, three levels. Read the notes to see what moves an essay up a band.", "السؤال نفسه بثلاثة مستويات. اقرأ الملاحظات لتعرف ما يرفع المقال درجة."],
    bandTab: ["Band {b}", "درجة {b}"], words: ["{n} words", "{n} كلمة"], notesT: ["Why this band", "لماذا هذه الدرجة"],
    modelNote: ["Model answers were written by Masarok to show the differences between levels. Their bands are our estimates, not official marks.", "كتب مسارُك نماذج الإجابات لتوضيح الفروق بين المستويات، ودرجاتها تقديرنا وليست تقييمًا رسميًا."],
    essayT: ["Write your essay", "اكتب مقالك"], essaySub: ["Aim for 250+ words in 40 minutes. Your draft saves on this device as you type.", "استهدف أكثر من 250 كلمة في 40 دقيقة، وتُحفظ مسودتك على هذا الجهاز أثناء الكتابة."],
    timerStart: ["Start 40-minute timer", "ابدأ مؤقت 40 دقيقة"], timerPause: ["Pause", "إيقاف مؤقت"], timerReset: ["Reset", "إعادة"], timeUp: ["Time's up! Finish your sentence and check your work.", "انتهى الوقت! أكمل جملتك وراجع عملك."],
    wc: ["{n} words", "{n} كلمة"], wcGoal: ["{n} / 250 words", "{n} / 250 كلمة"], copy: ["Copy essay", "انسخ المقال"], copied: ["Copied", "تم النسخ"],
    over: ["Phrases to replace", "عبارات يُفضَّل استبدالها"], overNone: ["No overused phrases found. Nice.", "لا توجد عبارات مستهلكة. ممتاز."],
    checkT: ["Check your essay", "راجع مقالك"], needWords: ["Write at least 100 words to finish the lesson. 250+ is the real target.", "اكتب 100 كلمة على الأقل لإنهاء الدرس، والهدف الحقيقي 250 كلمة أو أكثر."],
    ess: [["My position is clear in the introduction.", "رأيي واضح في المقدمة."], ["I discussed both views and gave my own opinion.", "ناقشت الرأيين وأعطيت رأيي."], ["Each body paragraph has one main idea, explained, with an example.", "كل فقرة فيها فكرة رئيسية واحدة مشروحة مع مثال."], ["I used linking words naturally, not at the start of every sentence.", "استخدمت أدوات الربط بشكل طبيعي، لا في بداية كل جملة."], ["I varied my words instead of repeating the same ones.", "نوّعت كلماتي بدل تكرار الكلمات نفسها."], ["I checked verb forms and subject–verb agreement.", "راجعت أزمنة الأفعال وتوافق الفاعل مع الفعل."], ["My conclusion restates my position.", "خاتمتي تعيد تأكيد رأيي."], ["I wrote at least 250 words.", "كتبت 250 كلمة على الأقل."]],
    // speaking
    pickCard: ["Choose a cue card", "اختر بطاقة موضوع"], prep: ["Prepare: 1 minute", "التحضير: دقيقة واحدة"], prepGo: ["Start 1-minute preparation", "ابدأ دقيقة التحضير"], notes: ["Your notes (single words)", "ملاحظاتك (كلمات مفردة)"],
    rec: ["Record your answer (up to 2 minutes)", "سجّل إجابتك (حتى دقيقتين)"], recGo: ["Start recording", "ابدأ التسجيل"], recStop: ["Stop", "إيقاف"], recAgain: ["Record again", "سجّل مرة أخرى"],
    recOff: ["Recording isn't available here. Speak out loud with the 2-minute timer instead.", "التسجيل غير متاح هنا، فتحدث بصوت عالٍ مع مؤقت الدقيقتين بدلًا منه."], talkGo: ["Start 2-minute timer", "ابدأ مؤقت الدقيقتين"],
    micDenied: ["The microphone was blocked. Allow it in your browser settings, or practise with the timer.", "تم حظر الميكروفون. اسمح به من إعدادات المتصفح أو تدرّب مع المؤقت."],
    listenBack: ["Listen back", "استمع لنفسك"], private: ["Your recording stays on this device and is deleted when you leave the page.", "يبقى تسجيلك على هذا الجهاز ويُحذف عند مغادرة الصفحة."],
    youShould: ["You should say:", "يجب أن تذكر:"], p3T: ["Part 3: think about these", "الجزء 3: فكّر في هذه الأسئلة"],
    spk: [["I spoke until the 2 minutes were nearly up.", "تحدثت حتى قاربت الدقيقتان على الانتهاء."], ["I covered every point on the card.", "غطيت كل نقاط البطاقة."], ["I used the right tenses (past, present, future).", "استخدمت الأزمنة الصحيحة (الماضي والحاضر والمستقبل)."], ["I didn't have long silent pauses.", "لم أتوقف طويلًا بصمت."], ["I used at least 3 words linked to the topic.", "استخدمت 3 كلمات على الأقل مرتبطة بالموضوع."]],
    checkSpk: ["Check yourself", "قيّم نفسك"],
    otherCard: ["Try another card", "جرّب بطاقة أخرى"], practisedOut: ["I practised out loud", "تدربت بصوت عالٍ"],
    // vocabulary
    show: ["Show meaning", "اعرض المعنى"], knew: ["I knew it", "كنت أعرفها"], learning: ["Still learning", "ما زلت أتعلمها"], hear: ["Hear it", "استمع"],
    learned: ["Learned: {n} of {t}", "تعلمت: {n} من {t}"], dueNow: ["{n} to review", "{n} للمراجعة"], sessionDone: ["All done for now!", "انتهيت الآن!"],
    comeBack: ["Come back tomorrow: words you knew come back after 1, 3, 7 and 14 days so they stick.", "عد غدًا: الكلمات التي عرفتها تعود بعد 1 و3 و7 و14 يومًا لتثبت في ذاكرتك."],
    deck: ["Review the deck", "راجع المجموعة"], allLearned: ["You've seen every word. Keep reviewing to move them into long-term memory.", "رأيت كل الكلمات، فاستمر بالمراجعة لتثبيتها في الذاكرة الطويلة."],
    disclaimer: ["Practice material in Masarok Academy is original, written in the official IELTS formats. Scores here are estimates, not official results.", "تمارين أكاديمية مسارُك أصلية ومكتوبة بالصيغ الرسمية لاختبار IELTS، والدرجات هنا تقديرية وليست نتائج رسمية."]
  };

  var app = $("#app");
  function L(id) { for (var i = 0; i < C.lessons.length; i++) if (C.lessons[i].id === id) return C.lessons[i]; return null; }
  function lessonIndex(id) { for (var i = 0; i < C.lessons.length; i++) if (C.lessons[i].id === id) return i; return -1; }
  function help(x) { return Array.isArray(x) && x[1] ? '<p class="ar-help" lang="ar" dir="rtl">' + esc(x[1]) + "</p>" : ""; }
  function enText(x) { return '<p lang="en" dir="ltr">' + esc(EN(x)) + "</p>"; }
  function bandStr(b) { return (Math.round(b * 2) / 2).toFixed(1); }

  // ================= course home =================
  function home() {
    stopAll();
    var p = S.placement;
    var plan = p ? planHtml(p) : '<div class="pl-empty"><p>' + esc(T(UI.planNone)) + '</p><a class="btn btn-primary" href="#/l/placement">' + esc(T(UI.planGo)) + "</a></div>";
    var list = C.lessons.map(function (l, i) {
      var r = S.lessons[l.id] || {}, st = r.done ? "done" : r.started ? "started" : "new";
      var extra = l.id === "vocab1" ? vocabStatus() : r.done && r.score && r.score[1] ? fmt(UI.score, { c: r.score[0], t: r.score[1] }) : "";
      var rec = recommended() === l.id;
      return '<li><a class="ls is-' + st + (rec ? " is-rec" : "") + '" href="#/l/' + l.id + '">' +
        '<span class="ls-ic" aria-hidden="true">' + l.icon + '</span>' +
        '<span class="ls-tx"><b>' + esc(T(l.t)) + (rec ? ' <em class="ls-rec">' + esc(T(UI.startHere)) + "</em>" : "") + "</b><small>" + esc(T(l.d)) + "</small>" +
        '<span class="ls-meta">' + esc(fmt(UI.mins, { n: l.mins })) + (extra ? " · " + esc(extra) : "") + "</span></span>" +
        '<span class="ls-go">' + (st === "done" ? "✓ " + esc(T(UI.done)) : esc(T(st === "started" ? UI.cont : UI.start))) + "</span></a></li>";
    }).join("");
    app.innerHTML =
      '<header class="cs-head"><a class="cs-back" href="' + base + 'academy/">' + backArrow() + esc(T(UI.backAc)) + "</a>" + arToggle() + "</header>" +
      '<section class="cs-hero"><p class="eyebrow">' + esc(T(UI.academy)) + '</p><h1 id="main-h" tabindex="-1">' + esc(T(C.t)) + '</h1><p class="cs-sub">' + esc(T(C.sub)) + "</p></section>" +
      '<section class="pl" aria-labelledby="pl-h"><h2 id="pl-h">' + esc(T(UI.planT)) + "</h2>" + plan + "</section>" +
      '<section class="cs-ls" aria-labelledby="ls-h"><h2 id="ls-h">' + esc(T(UI.lessonsT)) + '</h2><ol class="ls-list">' + list + "</ol></section>" +
      '<p class="cs-note">' + esc(T(UI.disclaimer)) + "</p>";
    wirePlan();
  }
  function backArrow() { return '<svg viewBox="0 0 16 16" aria-hidden="true" class="bk"><path d="M13 8H4M7.5 4.5L4 8l3.5 3.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'; }
  function arToggle() { return '<button type="button" class="ar-tg" data-ar-toggle aria-pressed="' + !!S.arHelp + '">🌙 ' + esc(T(S.arHelp ? UI.arOn : UI.arOff)) + "</button>"; }
  function weakest(p) { var k = ["r", "l", "w", "s"].sort(function (a, b) { return p.b[a] - p.b[b]; }); return k[0]; }
  function recommended() {
    var p = S.placement; if (!p) return "placement";
    var w = weakest(p), order = { r: ["tfng", "headings"], w: ["writing"], s: ["speaking"], l: ["know"] }[w] || [];
    if (!(S.lessons.know || {}).done) return "know";
    for (var i = 0; i < order.length; i++) if (!(S.lessons[order[i]] || {}).done) return order[i];
    for (var j = 0; j < C.lessons.length; j++) if (!(S.lessons[C.lessons[j].id] || {}).done) return C.lessons[j].id;
    return null;
  }
  function vocabStatus() { var V = L("vocab1"), n = 0, due = 0, now = Date.now(); V.words.forEach(function (w) { var s = S.vocab[w[0]]; if (s && s.b > 0) n++; if (!s || s.due <= now) due++; }); return fmt(UI.learned, { n: n, t: V.words.length }) + (due ? " · " + fmt(UI.dueNow, { n: due }) : ""); }

  function planHtml(p) {
    var bars = ["l", "r", "w", "s"].map(function (k) {
      return '<div class="pl-b"><span>' + esc(T(UI.skills[k])) + '</span><i><b style="width:' + Math.max(8, (p.b[k] - 3) / 6 * 100) + '%"></b></i><em>' + bandStr(p.b[k]) + "</em></div>";
    }).join("");
    var target = S.plan && S.plan.target || 6.5, date = S.plan && S.plan.date || "";
    var opts = [5.5, 6, 6.5, 7, 7.5, 8].map(function (b) { return '<option value="' + b + '"' + (+target === b ? " selected" : "") + ">" + bandStr(b) + "</option>"; }).join("");
    return '<div class="pl-card"><div class="pl-top"><div class="pl-ov"><small>' + esc(T(UI.est)) + '</small><b>' + bandStr(p.o) + '</b><span>' + esc(T(UI.overall)) + "</span></div>" +
      '<div class="pl-bars">' + bars + "</div></div>" +
      '<div class="pl-form"><label>' + esc(T(UI.target)) + '<select data-plan="target">' + opts + "</select></label>" +
      '<label>' + esc(T(UI.testDate)) + '<input type="date" data-plan="date" value="' + esc(date) + '"></label></div>' +
      '<div class="pl-out" aria-live="polite">' + planOut(p, target, date) + "</div>" +
      '<p class="pl-note">' + esc(T(UI.estNote)) + ' <a href="#/l/placement">' + esc(T(UI.redo)) + "</a></p></div>";
  }
  function planOut(p, target, date) {
    var h = "", gap = +target - p.o, w = weakest(p), wk = null;
    if (date) { var days = Math.ceil((new Date(date + "T12:00:00") - new Date()) / 864e5); wk = days > 0 ? Math.max(1, Math.ceil(days / 7)) : 0; }
    if (wk === 0) h += '<p class="pl-warn">' + esc(T(UI.past)) + "</p>";
    else if (wk) h += '<p class="pl-wk">⏳ ' + esc(wk === 1 ? T(UI.week1) : fmt(UI.weeks, { n: wk })) + "</p>";
    h += "<p>" + esc(gap > 0 ? fmt(UI.gap, { g: bandStr(gap) }) : T(UI.onTarget)) + " " + esc(fmt(UI.focus, { s: T(UI.skills[w]) })) + "</p>";
    if (wk && gap >= 1 && wk < 8) h += '<p class="pl-warn">' + esc(T(UI.big)) + "</p>";
    if (w === "l") h += '<p class="pl-tip">' + esc(T(UI.listenSoon)) + ' <a href="https://ielts.org" target="_blank" rel="noopener">ielts.org ↗</a></p>';
    // a simple week: the weakest skill gets two days
    var rot = { r: ["r", "w", "r", "s", "l"], w: ["w", "r", "w", "s", "l"], s: ["s", "r", "w", "s", "l"], l: ["l", "r", "w", "l", "s"] }[w];
    var lessonFor = { r: "tfng", w: "writing", s: "speaking", l: "know" };
    h += '<div class="pl-week"><b>' + esc(T(UI.week)) + '</b><ul>' + rot.map(function (k, i) {
      return "<li><span>" + esc(T(UI.days[i])) + '</span><a href="#/l/' + lessonFor[k] + '">' + esc(T(UI.skills[k])) + "</a></li>";
    }).join("") + '</ul><small>' + esc(T(UI.vocabDaily)) + "</small></div>";
    return h;
  }
  function wirePlan() {
    $$("[data-plan]").forEach(function (el) {
      el.addEventListener("change", function () {
        S.plan = S.plan || {}; S.plan[el.getAttribute("data-plan")] = el.getAttribute("data-plan") === "target" ? +el.value : el.value; save();
        var out = $(".pl-out"); if (out) out.innerHTML = planOut(S.placement, S.plan.target || 6.5, S.plan.date || "");
      });
    });
  }

  // ================= lesson player =================
  var cur = null; // { l, i, results: {stepIndex: {c,t}}, answers:{} }
  function openLesson(id, stepIx) {
    stopAll();
    var l = L(id); if (!l) { location.hash = ""; return; }
    if (!cur || cur.l.id !== id) cur = { l: l, results: {}, ans: {} };
    cur.i = Math.max(0, Math.min(stepIx || 0, l.steps.length));
    var r = S.lessons[id] = S.lessons[id] || {}; r.started = true; save();
    renderStep();
  }
  function renderStep() {
    var l = cur.l, n = l.steps.length, i = cur.i;
    if (i >= n) return finishScreen();
    var st = l.steps[i];
    app.innerHTML =
      '<header class="cs-head"><a class="cs-back" href="#">' + backArrow() + esc(T(UI.back)) + "</a>" + arToggle() + "</header>" +
      '<div class="lp-top"><p class="eyebrow">' + l.icon + " " + esc(T(l.t)) + '</p><div class="lp-prog" role="progressbar" aria-valuemin="1" aria-valuemax="' + n + '" aria-valuenow="' + (i + 1) + '"><i style="width:' + Math.round((i + 1) / n * 100) + '%"></i></div>' +
      '<small class="lp-n">' + esc(fmt(UI.step, { n: i + 1, t: n })) + "</small></div>" +
      '<article class="lp" aria-live="off"><div class="lp-body"></div><p class="lp-msg" role="status"></p>' +
      '<div class="lp-acts"><button type="button" class="btn btn-ghost" data-prev' + (i === 0 ? " hidden" : "") + '>' + esc(T(UI.prev)) + '</button><span class="lp-sp"></span>' +
      '<button type="button" class="btn btn-ghost" data-check hidden>' + esc(T(UI.check)) + '</button>' +
      '<button type="button" class="btn btn-primary" data-next>' + esc(T(i === n - 1 ? UI.finish : UI.next)) + "</button></div></article>";
    var body = $(".lp-body"), R = RENDER[st.t];
    var ctl = R ? R(body, st, l) : {};
    cur.ctl = ctl || {};
    var chk = $("[data-check]"), nxt = $("[data-next]");
    if (cur.ctl.check) { chk.hidden = false; nxt.hidden = !cur.results[i]; }
    if (cur.ctl.gate) nxt.disabled = !cur.ctl.gate();
    chk.addEventListener("click", function () {
      var res = cur.ctl.check(); if (!res) return;
      cur.results[i] = res;
      var pass = st.pass ? res.c >= st.pass : true;
      $(".lp-msg").innerHTML = "<b>" + esc(fmt(UI.score, { c: res.c, t: res.t })) + "</b> · " + esc(T(pass ? UI.passed : UI.notYet));
      chk.hidden = true; nxt.hidden = false;
      if (!pass || res.c < res.t) addRetry();
      if (pass && res.c === res.t && window.MasarokGame && window.MasarokGame.confetti) window.MasarokGame.confetti();
      nxt.focus();
    });
    nxt.addEventListener("click", function () { if (cur.ctl.leave) cur.ctl.leave(); cur.i++; location.hash = "#/l/" + l.id + "/" + cur.i; });
    var pv = $("[data-prev]"); if (pv) pv.addEventListener("click", function () { if (cur.ctl.leave) cur.ctl.leave(); cur.i--; location.hash = "#/l/" + l.id + "/" + cur.i; });
    var h = $(".lp-body h2"); if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
    window.scrollTo(0, 0);
  }
  function addRetry() {
    var acts = $(".lp-acts"); if ($("[data-retry]", acts)) return;
    var b = document.createElement("button"); b.type = "button"; b.className = "btn btn-ghost"; b.setAttribute("data-retry", ""); b.textContent = T(UI.again);
    b.addEventListener("click", function () { delete cur.results[cur.i]; renderStep(); });
    acts.insertBefore(b, $("[data-next]", acts));
  }
  function gateUpdate() { var n = $("[data-next]"); if (n && cur.ctl.gate) n.disabled = !cur.ctl.gate(); }
  function finishScreen() {
    var l = cur.l, c = 0, t = 0;
    Object.keys(cur.results).forEach(function (k) { c += cur.results[k].c; t += cur.results[k].t; });
    var r = S.lessons[l.id] = S.lessons[l.id] || {};
    r.done = true; r.at = Date.now(); if (t) r.score = [c, t];
    save(); touchWeek();
    var nx = C.lessons[lessonIndex(l.id) + 1], rec = recommended();
    var nextId = rec && rec !== l.id ? rec : nx && nx.id;
    if (window.MasarokGame && window.MasarokGame.confetti) window.MasarokGame.confetti();
    app.innerHTML = '<header class="cs-head"><a class="cs-back" href="#">' + backArrow() + esc(T(UI.back)) + "</a>" + arToggle() + "</header>" +
      '<section class="lp-done"><div class="lp-medal" aria-hidden="true">' + l.icon + '</div><h2 tabindex="-1">' + esc(T(UI.lessonDone)) + "</h2><p class=\"lp-dt\">" + esc(T(l.t)) + "</p>" +
      (t ? '<p class="lp-sc">' + esc(fmt(UI.score, { c: c, t: t })) + "</p>" : "") + '<p class="lp-pts">🏅 ' + esc(T(UI.guidePts)) + "</p>" +
      '<div class="ac-cta">' + (nextId ? '<a class="btn btn-primary" href="#/l/' + nextId + '">' + esc(T(UI.nextLesson)) + ": " + esc(T(L(nextId).t)) + "</a>" : "") +
      '<a class="btn btn-ghost" href="#">' + esc(T(UI.toCourse)) + "</a></div></section>";
    $(".lp-done h2").focus();
  }

  // ================= exercise types =================
  var RENDER = {};

  RENDER.text = function (el, st) {
    var h = "<h2>" + esc(EN(st.h)) + "</h2>" + (S.arHelp && Array.isArray(st.h) ? '<p class="ar-help ar-h" lang="ar" dir="rtl">' + esc(st.h[1]) + "</p>" : "");
    (st.p || []).forEach(function (x) { h += '<div class="tx">' + enText(x) + (S.arHelp ? help(x) : "") + "</div>"; });
    if (st.list) h += '<ul class="tx-list">' + st.list.map(function (x) { return "<li>" + enText(x) + (S.arHelp ? help(x) : "") + "</li>"; }).join("") + "</ul>";
    el.innerHTML = '<div class="en-block" lang="en" dir="ltr">' + h + "</div>";
    fixArDir(el);
  };
  // Arabic help lines inside the English block keep their own direction
  function fixArDir(el) { $$(".ar-help", el).forEach(function (p) { p.setAttribute("dir", "rtl"); }); }
  function head(st) { return "<h2>" + esc(EN(st.h)) + "</h2>" + (S.arHelp && Array.isArray(st.h) ? '<p class="ar-help ar-h" lang="ar" dir="rtl">' + esc(st.h[1]) + "</p>" : ""); }

  RENDER.table = function (el, st) {
    var h = head(st) + '<div class="tb-wrap"><table class="tb"><thead><tr>' + st.cols.map(function (c) { return "<th>" + esc(EN(c)) + "</th>"; }).join("") + "</tr></thead><tbody>" +
      st.rows.map(function (r) { return "<tr>" + r.map(function (c, i) { return i === 0 ? '<th scope="row">' + esc(c) + "</th>" : "<td>" + esc(c) + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div>";
    (st.p || []).forEach(function (x) { h += '<div class="tx">' + enText(x) + (S.arHelp ? help(x) : "") + "</div>"; });
    el.innerHTML = '<div class="en-block" lang="en" dir="ltr">' + h + "</div>";
  };

  // one question (True/False/Not Given or multiple choice) inside a passage or quiz
  function qHtml(it, k, name) {
    var opts = it.k === "tfng" ? [["T", UI.t], ["F", UI.f], ["NG", UI.ng]].map(function (o) { return [o[0], EN(o[1])]; }) : it.o.map(function (o, j) { return [String(j), EN(o)]; });
    return '<fieldset class="q" data-q="' + k + '"><legend><span class="q-n">' + (k + 1) + "</span> " + esc(EN(it.s)) + "</legend>" +
      (S.arHelp && Array.isArray(it.s) ? '<p class="ar-help" lang="ar" dir="rtl">' + esc(it.s[1]) + "</p>" : "") +
      '<div class="q-os' + (it.k === "tfng" ? " is-tfng" : "") + '">' + opts.map(function (o) {
        return '<label class="q-o"><input type="radio" name="' + name + "-" + k + '" value="' + o[0] + '"><span>' + esc(o[1]) + "</span></label>";
      }).join("") + '</div><div class="q-x" hidden></div></fieldset>';
  }
  function gradeQs(el, items, instant) {
    var c = 0, all = true;
    items.forEach(function (it, k) {
      var fs = $('[data-q="' + k + '"]', el), pick = $("input:checked", fs);
      if (!pick) { all = false; return; }
    });
    if (!all && !instant) { $(".lp-msg").textContent = T(UI.answerAll); return null; }
    items.forEach(function (it, k) {
      var fs = $('[data-q="' + k + '"]', el), pick = $("input:checked", fs);
      var right = it.k === "tfng" ? it.a : String(it.a), ok = pick && pick.value === right;
      if (ok) c++;
      fs.classList.add(ok ? "is-ok" : "is-no");
      $$("input", fs).forEach(function (r) { r.disabled = true; if (r.value === right) r.parentNode.classList.add("is-right"); else if (r.checked) r.parentNode.classList.add("is-wrong"); });
      var x = $(".q-x", fs); x.hidden = false;
      x.innerHTML = "<b>" + (ok ? "✓" : "✕ Answer: " + esc(answerLabel(it))) + "</b> " + esc(EN(it.x)) + (S.arHelp ? help(it.x) : "");
      fixArDir(x);
    });
    return { c: c, t: items.length };
  }
  function answerLabel(it) { return it.k === "tfng" ? EN({ T: UI.t, F: UI.f, NG: UI.ng }[it.a]) : EN(it.o[it.a]); }

  RENDER.passage = function (el, st) {
    var name = "p" + cur.i;
    el.innerHTML = '<div class="en-block" lang="en" dir="ltr">' + head(st) +
      '<div class="ps-grid"><details class="ps" open><summary>' + esc(st.title) + '</summary><div class="ps-tx">' + st.paras.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</div></details>" +
      '<div class="qs-col">' + st.items.map(function (it, k) { return qHtml(it, k, name); }).join("") + "</div></div></div>";
    fixArDir(el);
    if (st.teach) {
      // worked example: feedback straight away
      el.addEventListener("change", function (e) {
        var fs = e.target.closest("[data-q]"); if (!fs || fs.classList.contains("is-ok") || fs.classList.contains("is-no")) return;
        var k = +fs.getAttribute("data-q"), it = st.items[k], right = it.a, ok = e.target.value === right;
        fs.classList.add(ok ? "is-ok" : "is-no");
        $$("input", fs).forEach(function (r) { r.disabled = true; if (r.value === right) r.parentNode.classList.add("is-right"); else if (r.checked) r.parentNode.classList.add("is-wrong"); });
        var x = $(".q-x", fs); x.hidden = false; x.innerHTML = "<b>" + (ok ? "✓" : "✕ Answer: " + esc(answerLabel(it))) + "</b> " + esc(EN(it.x)) + (S.arHelp ? help(it.x) : ""); fixArDir(x);
      });
      return {};
    }
    return {
      check: function () { var r = gradeQs(el, st.items); if (r && st.part) cur.ans[st.part] = r.c; return r; }
    };
  };

  RENDER.quiz = function (el, st) {
    var name = "z" + cur.i;
    el.innerHTML = '<div class="en-block" lang="en" dir="ltr">' + head(st) + '<div class="qs-col">' + st.items.map(function (it, k) { return qHtml(it, k, name); }).join("") + "</div></div>";
    fixArDir(el);
    return { check: function () { var r = gradeQs(el, st.items); if (r && st.part) cur.ans[st.part] = r.c; return r; } };
  };

  RENDER.headings = function (el, st) {
    var opts = '<option value="">—</option>' + st.heads.map(function (h) { return '<option value="' + h.k + '">' + h.k + ". " + esc(h.s) + "</option>"; }).join("");
    el.innerHTML = '<div class="en-block" lang="en" dir="ltr">' + head(st) +
      '<div class="hd-list"><b>List of headings</b><ol type="i">' + st.heads.map(function (h) { return "<li>" + esc(h.s) + "</li>"; }).join("") + "</ol></div>" +
      '<h3 class="ps-title">' + esc(st.title) + "</h3>" +
      st.paras.map(function (p) {
        return '<div class="hd-p" data-hp="' + p.k + '"><label class="hd-sel"><span>Paragraph ' + p.k + '</span><select>' + opts + "</select></label><p>" + esc(p.s) + '</p><div class="q-x" hidden></div></div>';
      }).join("") + "</div>";
    return {
      check: function () {
        var c = 0, sels = $$(".hd-p select", el);
        if (sels.some(function (s) { return !s.value; })) { $(".lp-msg").textContent = T(UI.answerAll); return null; }
        st.paras.forEach(function (p) {
          var box = $('[data-hp="' + p.k + '"]', el), s = $("select", box), ok = s.value === st.ans[p.k];
          if (ok) c++;
          box.classList.add(ok ? "is-ok" : "is-no"); s.disabled = true;
          var x = $(".q-x", box); x.hidden = false;
          x.innerHTML = "<b>" + (ok ? "✓" : "✕ Answer: " + st.ans[p.k] + ". " + esc((st.heads.filter(function (h) { return h.k === st.ans[p.k]; })[0] || {}).s || "")) + "</b> " + esc(EN(st.x[p.k])) + (S.arHelp ? help(st.x[p.k]) : ""); fixArDir(x);
        });
        return { c: c, t: st.paras.length };
      }
    };
  };

  // ---------- listening, read aloud by the browser ----------
  var tts = window.speechSynthesis;
  function voices() {
    var v = tts ? tts.getVoices().filter(function (x) { return /^en(-|_|$)/i.test(x.lang); }) : [];
    var pref = function (re) { return v.filter(function (x) { return re.test(x.lang); }); };
    var list = pref(/GB/i).concat(pref(/AU/i), pref(/US/i), v);
    var a = list[0] || null, b = list.filter(function (x) { return a && x.name !== a.name; })[0] || a;
    return { a: a, b: b };
  }
  function stopAll() { try { if (tts) tts.cancel(); } catch (e) {} if (rec.stream) stopRec(true); clearInterval(timerId); }
  RENDER.listen = function (el, st) {
    var plays = st.plays, can = !!(tts && window.SpeechSynthesisUtterance);
    el.innerHTML = '<div class="en-block" lang="en" dir="ltr">' + head(st) + '<div class="tx">' + enText(st.intro) + (S.arHelp ? help(st.intro) : "") + "</div>" +
      (can ? '<div class="ls-play"><button type="button" class="btn btn-primary" data-play>▶ ' + esc(EN(UI.play)) + '</button><span data-left>' + esc(fmt(["Plays left: {n}", "Plays left: {n}"], { n: plays })) + "</span></div>"
        : '<p class="pl-warn">' + esc(EN(UI.noTts)) + "</p>") +
      '<details class="ls-script"' + (can ? "" : " open") + "><summary>" + esc(EN(UI.script)) + "</summary>" + st.lines.map(function (l) { return "<p><b>" + (l[0] === "a" ? "Officer" : "Student") + ":</b> " + esc(l[1]) + "</p>"; }).join("") + "</details>" +
      '<div class="frm"><h3>' + esc(st.form) + "</h3>" + st.items.map(function (it, k) {
        return '<div class="frm-r" data-fi="' + k + '"><label for="fi' + k + '"><span class="q-n">' + (k + 1) + "</span> " + esc(it.l) + '</label><input id="fi' + k + '" type="text" autocomplete="off" autocapitalize="off" spellcheck="false"><div class="q-x" hidden></div></div>';
      }).join("") + "</div></div>";
    fixArDir(el);
    var script = $(".ls-script", el);
    if (can) script.hidden = true;
    var pb = $("[data-play]", el);
    if (pb) pb.addEventListener("click", function () {
      if (plays <= 0) return;
      plays--; pb.disabled = true; pb.textContent = "🔊 " + EN(UI.playing);
      var v = voices();
      tts.cancel();
      st.lines.forEach(function (l, j) {
        var u = new SpeechSynthesisUtterance(l[1]); u.lang = "en-GB"; u.rate = 0.92;
        var vv = l[0] === "a" ? v.a : v.b; if (vv) u.voice = vv; if (l[0] === "b" && v.a === v.b) u.pitch = 1.25;
        if (j === st.lines.length - 1) u.onend = function () { done(); };
        tts.speak(u);
      });
      var t0 = setTimeout(done, 60000);
      function done() { clearTimeout(t0); pb.disabled = plays <= 0; pb.textContent = "▶ " + EN(plays > 0 ? UI.play : UI.noPlays); $("[data-left]", el).textContent = plays > 0 ? "Plays left: " + plays : ""; }
    });
    return {
      check: function () {
        var c = 0;
        st.items.forEach(function (it, k) {
          var row = $('[data-fi="' + k + '"]', el), inp = $("input", row), v = inp.value.toLowerCase().replace(/[\s.,$£]/g, "");
          var ok = it.a.some(function (a) { return a.toLowerCase().replace(/\s/g, "") === v; });
          if (ok) c++;
          row.classList.add(ok ? "is-ok" : "is-no"); inp.readOnly = true;
          var x = $(".q-x", row); x.hidden = false;
          x.innerHTML = "<b>" + (ok ? "✓" : "✕ Answer: " + esc(it.a[0])) + "</b> " + esc(EN(it.x)) + (S.arHelp ? help(it.x) : ""); fixArDir(x);
        });
        script.hidden = false;
        if (st.part) cur.ans[st.part] = c;
        try { tts && tts.cancel(); } catch (e) {}
        return { c: c, t: st.items.length };
      },
      leave: function () { try { tts && tts.cancel(); } catch (e) {} }
    };
  };

  // ---------- placement self-check and result ----------
  RENDER.self = function (el, st) {
    el.innerHTML = '<div class="en-block">' + head(st) + st.items.map(function (it, k) {
      return '<fieldset class="q sf"><legend>' + esc(T(it.q)) + '</legend><div class="q-os">' + it.o.map(function (o, j) {
        return '<label class="q-o"><input type="radio" name="sf' + k + '" value="' + j + '"' + (cur.ans[it.key] === j ? " checked" : "") + "><span>" + esc(T(o)) + "</span></label>";
      }).join("") + "</div></fieldset>";
    }).join("") + "</div>";
    el.addEventListener("change", function (e) { var k = +e.target.name.slice(2); cur.ans[st.items[k].key] = +e.target.value; gateUpdate(); });
    return { gate: function () { return st.items.every(function (it) { return cur.ans[it.key] != null; }); } };
  };
  var MAP6 = [4.5, 4.5, 5, 5.5, 6, 6.5, 7];
  RENDER.result = function (el) {
    var a = cur.ans;
    if (a.r == null || a.l == null || a.g == null || a.w == null || a.s == null) {
      el.innerHTML = '<div class="en-block"><h2>' + esc(T(UI.planT)) + '</h2><p class="pl-warn">' + esc(T(UI.finishParts)) + '</p><a class="btn btn-primary" href="#/l/placement/0">' + esc(T(UI.planGo)) + "</a></div>";
      return {};
    }
    var adj = (a.g || 0) <= 3 ? -0.5 : (a.g || 0) >= 7 ? 0.5 : 0, selfB = [4.5, 5.5, 6.5, 7.5];
    function cl(x) { return Math.max(4, Math.min(8.5, x)); }
    var b = { r: MAP6[a.r || 0], l: MAP6[a.l || 0], w: cl(selfB[a.w || 0] + adj), s: cl(selfB[a.s || 0] + adj) };
    var o = Math.round((b.r + b.l + b.w + b.s) / 4 * 2) / 2;
    S.placement = { b: b, o: o, at: Date.now(), raw: { r: a.r || 0, l: a.l || 0, g: a.g || 0 } }; save();
    el.innerHTML = '<div class="en-block"><h2>' + esc(T(UI.planT)) + "</h2>" + planHtml(S.placement) + "</div>";
    wirePlan();
    return {};
  };

  // ---------- writing: outline, model answers, essay pad ----------
  RENDER.outline = function (el, st) {
    S.outline = S.outline || {};
    el.innerHTML = '<div class="en-block"><h2>' + esc(T(UI.outT)) + '</h2><p class="lp-sub">' + esc(T(UI.outSub)) + '</p><blockquote class="prompt" lang="en" dir="ltr">' + esc(st.prompt) + "</blockquote>" +
      '<div class="ol">' + UI.out.map(function (lab, k) {
        return '<label class="ol-f"><span>' + esc(T(lab)) + '</span><textarea rows="2" lang="en" dir="ltr" data-ol="' + k + '"' + (k === 0 ? ' placeholder="' + esc(EN(UI.outPh)) + '"' : "") + ">" + esc(S.outline[k] || "") + "</textarea></label>";
      }).join("") + "</div></div>";
    el.addEventListener("input", function (e) { var k = e.target.getAttribute("data-ol"); if (k != null) { S.outline[k] = e.target.value; save(); } });
    return {};
  };
  function wcount(s) { var m = String(s || "").trim().match(/[A-Za-z0-9’'-]+/g); return m ? m.length : 0; }
  RENDER.models = function (el, st, l) {
    var tab = 1;
    function draw() {
      var m = l.models[tab];
      el.innerHTML = '<div class="en-block"><h2>' + esc(T(UI.modelsT)) + '</h2><p class="lp-sub">' + esc(T(UI.modelsSub)) + "</p>" +
        '<blockquote class="prompt" lang="en" dir="ltr">' + esc(st.prompt) + "</blockquote>" +
        '<div class="md-tabs" role="tablist">' + l.models.map(function (x, k) { return '<button type="button" role="tab" class="md-tab" aria-selected="' + (k === tab) + '" data-md="' + k + '">' + esc(fmt(UI.bandTab, { b: x.band })) + "</button>"; }).join("") + "</div>" +
        '<div class="md" lang="en" dir="ltr"><p class="md-wc">' + esc(fmt(["{n} words", "{n} words"], { n: wcount(m.text.join(" ")) })) + "</p>" + m.text.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</div>" +
        '<div class="md-notes"><h3>' + esc(T(UI.notesT)) + "</h3><ul>" + m.notes.map(function (n) { return "<li>" + enText(n) + (S.arHelp ? help(n) : "") + "</li>"; }).join("") + "</ul></div>" +
        '<p class="cs-note">' + esc(T(UI.modelNote)) + "</p></div>";
      fixArDir(el);
    }
    draw();
    el.addEventListener("click", function (e) { var b = e.target.closest("[data-md]"); if (b) { tab = +b.getAttribute("data-md"); draw(); var t = $('[data-md="' + tab + '"]', el); if (t) t.focus(); } });
    return {};
  };
  var OVER = ["nowadays", "in this modern era", "in today's world", "since the dawn of time", "last but not least", "in a nutshell", "in my opinion, i think", "very very", "a lot of", "i would like to", "all in all", "it is known that"];
  var timerId = 0;
  RENDER.essay = function (el, st) {
    S.essay = S.essay || { text: "", checks: [] };
    var left = S.essay.left != null ? S.essay.left : 2400, running = false;
    el.innerHTML = '<div class="en-block"><h2>' + esc(T(UI.essayT)) + '</h2><p class="lp-sub">' + esc(T(UI.essaySub)) + '</p><blockquote class="prompt" lang="en" dir="ltr">' + esc(st.prompt) + "</blockquote>" +
      '<div class="es-bar"><button type="button" class="btn btn-ghost es-tm" data-tm>⏱ ' + esc(T(UI.timerStart)) + '</button><span class="es-clock" data-clock>40:00</span><button type="button" class="es-link" data-tr>' + esc(T(UI.timerReset)) + "</button>" +
      '<span class="lp-sp"></span><span class="es-wc" data-wc></span><button type="button" class="es-link" data-copy>' + esc(T(UI.copy)) + "</button></div>" +
      '<textarea class="es-pad" rows="14" lang="en" dir="ltr" spellcheck="false" aria-label="' + esc(T(UI.essayT)) + '">' + esc(S.essay.text) + "</textarea>" +
      (S.outline && Object.keys(S.outline).some(function (k) { return S.outline[k]; }) ? '<details class="es-ol"><summary>' + esc(T(UI.outT)) + '</summary><ul lang="en" dir="ltr">' + UI.out.map(function (lab, k) { return S.outline[k] ? "<li><b>" + esc(EN(lab)) + ":</b> " + esc(S.outline[k]) + "</li>" : ""; }).join("") + "</ul></details>" : "") +
      '<div class="es-over" data-over></div>' +
      '<fieldset class="es-ck"><legend>' + esc(T(UI.checkT)) + "</legend>" + UI.ess.map(function (x, k) {
        return '<label><input type="checkbox" data-ck="' + k + '"' + (S.essay.checks[k] ? " checked" : "") + "><span>" + esc(T(x)) + "</span></label>";
      }).join("") + '</fieldset><p class="es-need" data-need></p></div>';
    var pad = $(".es-pad", el), wc = $("[data-wc]", el), over = $("[data-over]", el), need = $("[data-need]", el), clock = $("[data-clock]", el), tm = $("[data-tm]", el);
    function upd() {
      var n = wcount(pad.value), low = pad.value.toLowerCase();
      wc.textContent = fmt(UI.wcGoal, { n: n }); wc.classList.toggle("is-ok", n >= 250);
      var found = OVER.filter(function (p) { return low.indexOf(p) > -1; });
      over.innerHTML = pad.value.trim() ? '<b>' + esc(T(UI.over)) + ":</b> " + (found.length ? found.map(function (f) { return '<span class="es-chip" lang="en" dir="ltr">' + esc(f) + "</span>"; }).join(" ") : esc(T(UI.overNone))) : "";
      need.textContent = n < 100 ? T(UI.needWords) : "";
      S.essay.text = pad.value; save(); gateUpdate();
    }
    function show() { var m = Math.floor(left / 60), s = left % 60; clock.textContent = (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s; clock.classList.toggle("is-low", left <= 300); }
    pad.addEventListener("input", upd);
    tm.addEventListener("click", function () {
      if (running) { running = false; clearInterval(timerId); tm.textContent = "⏱ " + T(UI.timerStart); return; }
      running = true; tm.textContent = "⏸ " + T(UI.timerPause);
      clearInterval(timerId);
      timerId = setInterval(function () { left = Math.max(0, left - 1); S.essay.left = left; show(); if (!left) { clearInterval(timerId); running = false; tm.textContent = "⏱ " + T(UI.timerStart); need.textContent = T(UI.timeUp); save(); } }, 1000);
    });
    $("[data-tr]", el).addEventListener("click", function () { clearInterval(timerId); running = false; left = 2400; S.essay.left = left; show(); tm.textContent = "⏱ " + T(UI.timerStart); save(); });
    $("[data-copy]", el).addEventListener("click", function (e) {
      var b = e.currentTarget;
      try { navigator.clipboard.writeText(pad.value).then(function () { b.textContent = T(UI.copied); setTimeout(function () { b.textContent = T(UI.copy); }, 1500); }); } catch (err) { pad.select(); }
    });
    el.addEventListener("change", function (e) { var k = e.target.getAttribute("data-ck"); if (k != null) { S.essay.checks[k] = e.target.checked; save(); } });
    show(); upd();
    return { gate: function () { return wcount(pad.value) >= 100; }, leave: function () { clearInterval(timerId); } };
  };

  // ---------- speaking: cue card, timers and recorder ----------
  var rec = {};
  function stopRec(silent) {
    try { if (rec.mr && rec.mr.state !== "inactive") rec.mr.stop(); } catch (e) {}
    try { if (rec.stream) rec.stream.getTracks().forEach(function (t) { t.stop(); }); } catch (e) {}
    rec.stream = null; clearInterval(rec.tick);
    if (silent) rec.mr = null;
  }
  RENDER.speak = function (el, st, l) {
    var card = null, did = false;
    var canRec = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
    function pick() {
      el.innerHTML = '<div class="en-block"><h2>' + esc(T(UI.pickCard)) + '</h2><div class="cc-pick">' + l.cards.map(function (c, k) {
        return '<button type="button" class="cc-btn" data-card="' + k + '" lang="en" dir="ltr"><b>' + esc(c.title) + "</b></button>";
      }).join("") + "</div></div>";
    }
    function timer(sec, out, onEnd) {
      clearInterval(timerId); var left = sec;
      function show() { out.textContent = Math.floor(left / 60) + ":" + ("0" + (left % 60)).slice(-2); }
      show();
      timerId = setInterval(function () { left--; show(); if (left <= 0) { clearInterval(timerId); onEnd && onEnd(); } }, 1000);
    }
    function cardView(k) {
      card = l.cards[k];
      el.innerHTML = '<div class="en-block"><div class="cue" lang="en" dir="ltr"><b>' + esc(card.title) + "</b><p>" + esc(EN(UI.youShould)) + "</p><ul>" + card.points.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul><p>" + esc(card.explain) + "</p></div>" +
        '<div class="sp-step"><h3>1 · ' + esc(T(UI.prep)) + '</h3><div class="sp-row"><button type="button" class="btn btn-ghost" data-prep>⏱ ' + esc(T(UI.prepGo)) + '</button><span class="sp-clock" data-pclock>1:00</span></div>' +
        '<label class="ol-f"><span>' + esc(T(UI.notes)) + '</span><textarea rows="2" lang="en" dir="ltr"></textarea></label></div>' +
        '<div class="sp-step"><h3>2 · ' + esc(T(UI.rec)) + '</h3>' +
        (canRec ? '<div class="sp-row"><button type="button" class="btn btn-primary" data-rec>⏺ ' + esc(T(UI.recGo)) + '</button><span class="sp-clock" data-rclock>2:00</span></div><div data-play-box></div><p class="sp-msg" data-rmsg></p><p class="cs-note">' + esc(T(UI.private)) + "</p>"
          : '<p class="pl-warn">' + esc(T(UI.recOff)) + '</p><div class="sp-row"><button type="button" class="btn btn-primary" data-talk>⏱ ' + esc(T(UI.talkGo)) + '</button><span class="sp-clock" data-rclock>2:00</span></div><button type="button" class="btn btn-ghost" data-out>' + esc(T(UI.practisedOut)) + "</button>") +
        "</div>" +
        '<div class="sp-step"><h3>3 · ' + esc(T(UI.checkSpk)) + '</h3><div class="es-ck">' + UI.spk.map(function (x) { return "<label><input type=\"checkbox\"><span>" + esc(T(x)) + "</span></label>"; }).join("") + "</div></div>" +
        '<div class="sp-step"><h3>' + esc(T(UI.p3T)) + '</h3><ul class="tx-list" lang="en" dir="ltr">' + card.p3.map(function (q) { return "<li>" + esc(q) + "</li>"; }).join("") + "</ul></div>" +
        '<button type="button" class="es-link" data-other>' + esc(T(UI.otherCard)) + "</button></div>";
      $("[data-prep]", el).addEventListener("click", function () { timer(60, $("[data-pclock]", el)); });
      var rb = $("[data-rec]", el);
      if (rb) rb.addEventListener("click", function () {
        if (rec.mr && rec.mr.state === "recording") { stopRec(); return; }
        navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
          rec.stream = stream; rec.chunks = [];
          var mr = rec.mr = new MediaRecorder(stream);
          mr.ondataavailable = function (e) { if (e.data && e.data.size) rec.chunks.push(e.data); };
          mr.onstop = function () {
            clearInterval(timerId);
            var blob = new Blob(rec.chunks, { type: mr.mimeType || "audio/webm" });
            if (rec.url) URL.revokeObjectURL(rec.url);
            rec.url = URL.createObjectURL(blob);
            var box = $("[data-play-box]", el); if (box) box.innerHTML = '<p class="sp-lb">🎧 ' + esc(T(UI.listenBack)) + '</p><audio controls src="' + rec.url + '"></audio>';
            rb.textContent = "⏺ " + T(UI.recAgain); rb.classList.remove("is-rec");
            did = true; gateUpdate();
            try { stream.getTracks().forEach(function (t) { t.stop(); }); } catch (e) {}
            rec.stream = null;
          };
          mr.start();
          rb.textContent = "⏹ " + T(UI.recStop); rb.classList.add("is-rec");
          timer(120, $("[data-rclock]", el), function () { stopRec(); });
        }).catch(function () { var m = $("[data-rmsg]", el); if (m) m.textContent = T(UI.micDenied); });
      });
      var tb = $("[data-talk]", el); if (tb) tb.addEventListener("click", function () { timer(120, $("[data-rclock]", el), function () { did = true; gateUpdate(); }); });
      var ob = $("[data-out]", el); if (ob) ob.addEventListener("click", function () { did = true; gateUpdate(); });
      $("[data-other]", el).addEventListener("click", function () { stopRec(true); clearInterval(timerId); pick(); });
      gateUpdate();
    }
    pick();
    el.addEventListener("click", function (e) { var b = e.target.closest("[data-card]"); if (b) cardView(+b.getAttribute("data-card")); });
    return { gate: function () { return did; }, leave: function () { stopRec(true); clearInterval(timerId); } };
  };

  // ---------- vocabulary flashcards with spaced review ----------
  var GAPS = [0, 1, 3, 7, 14]; // days before a word comes back, by box
  RENDER.cards = function (el, st, l) {
    var now = Date.now(), seen = {};
    var queue = l.words.filter(function (w) { var s = S.vocab[w[0]]; return !s || s.due <= now; }).slice(0, 12);
    function learned() { return l.words.filter(function (w) { var s = S.vocab[w[0]]; return s && s.b > 0; }).length; }
    function allSeen() { return l.words.every(function (w) { return S.vocab[w[0]]; }); }
    function draw() {
      var top = '<div class="vc-top"><span>' + esc(fmt(UI.learned, { n: learned(), t: l.words.length })) + '</span><i><b style="width:' + Math.round(learned() / l.words.length * 100) + '%"></b></i></div>';
      if (!queue.length) {
        el.innerHTML = '<div class="en-block"><h2>' + esc(T(l.t)) + "</h2>" + top + '<div class="vc-done"><b>🎉 ' + esc(T(UI.sessionDone)) + "</b><p>" + esc(T(allSeen() ? UI.allLearned : UI.comeBack)) + "</p></div></div>";
        gateUpdate(); return;
      }
      var w = queue[0];
      el.innerHTML = '<div class="en-block"><h2>' + esc(T(l.t)) + "</h2>" + top +
        '<div class="vc" lang="en" dir="ltr"><div class="vc-w"><b>' + esc(w[0]) + "</b><em>" + esc(w[1]) + '</em><button type="button" class="es-link" data-say aria-label="' + esc(EN(UI.hear)) + '">🔊</button></div>' +
        '<div class="vc-back" hidden><p class="vc-m">' + esc(w[2]) + '</p><p class="vc-ar" lang="ar" dir="rtl">' + esc(w[3]) + '</p><p class="vc-ex">“' + esc(w[4]) + "”</p></div>" +
        '<div class="vc-acts"><button type="button" class="btn btn-primary" data-flip>' + esc(T(UI.show)) + "</button></div></div>" +
        '<p class="cs-note">' + esc(fmt(UI.dueNow, { n: queue.length })) + "</p></div>";
    }
    function grade(knew) {
      var w = queue.shift(), s = S.vocab[w[0]] || { b: 0 };
      if (knew) { s.b = Math.min(4, s.b + 1); s.due = Date.now() + GAPS[s.b] * 864e5; }
      else { s.b = 0; s.due = Date.now(); if (!seen[w[0]]) queue.push(w); }
      seen[w[0]] = 1; S.vocab[w[0]] = s; save(); draw();
    }
    el.addEventListener("click", function (e) {
      var t = e.target;
      if (t.closest("[data-flip]")) {
        $(".vc-back", el).hidden = false;
        $(".vc-acts", el).innerHTML = '<button type="button" class="btn btn-ghost" data-no>' + esc(T(UI.learning)) + '</button><button type="button" class="btn btn-primary" data-yes>' + esc(T(UI.knew)) + "</button>";
        $("[data-yes]", el).focus();
      } else if (t.closest("[data-yes]")) grade(true);
      else if (t.closest("[data-no]")) grade(false);
      else if (t.closest("[data-say]") && tts) { tts.cancel(); var u = new SpeechSynthesisUtterance(queue[0][0]); u.lang = "en-GB"; var v = voices(); if (v.a) u.voice = v.a; tts.speak(u); }
    });
    draw();
    return { gate: function () { return !queue.length || allSeen(); } };
  };

  // ================= routing =================
  function route() {
    var m = location.hash.match(/^#\/l\/([\w-]+)(?:\/(\d+))?/);
    if (m) {
      var i = m[2] ? +m[2] : 0;
      if (!cur || cur.l.id !== m[1]) { cur = null; }
      openLesson(m[1], i);
    } else { cur = null; home(); var h = $("#main-h"); if (h && document.activeElement === document.body) h.focus({ preventScroll: true }); }
  }
  app.addEventListener("click", function (e) {
    if (e.target.closest("[data-ar-toggle]")) {
      S.arHelp = !S.arHelp; save();
      if (cur) renderStep(); else home();
    }
  });
  window.addEventListener("hashchange", route);
  if (tts && tts.onvoiceschanged !== undefined) tts.onvoiceschanged = function () {};
  route();
  window.MasarokAcademy = { state: function () { return S; } };
})();

/* Masarok Academy lesson player.
   Course home (plan, lessons), and a step-by-step player with the exercise types:
   text, table, passage (True/False/Not Given + multiple choice), matching headings, listening (spoken by the browser),
   quiz, self-check, placement result + study plan, outline builder, model answers, essay pad, speaking recorder, flashcards.
   Progress stays in this browser (masarok-academy), like the rest of Masarok. */
(function () {
  "use strict";

  var C = window.MasarokCourse; if (!C) return;
  // extra lesson files add themselves to the course, then everything is sorted by its order
  (window.MasarokParts || []).forEach(function (p) { if (p.course === C.id) C.lessons = C.lessons.concat(p.lessons); });
  C.lessons.sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
  var ALL_LESSONS = C.lessons;
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
  // the student's country and degree from the guide's picker decide which lessons show
  function pref(k) { try { var v = localStorage.getItem(k); return v && v !== "all" ? v : null; } catch (e) { return null; } }
  var MY_CC = pref("masarok-country"), MY_LV = pref("masarok-level");
  function visible(l) { return (!l.cc || !MY_CC || l.cc.indexOf(MY_CC) > -1) && (!l.lv || !MY_LV || l.lv.indexOf(MY_LV) > -1); }
  // steps can be country or degree specific too
  function fit(l) { l.steps = (l.steps || []).filter(visible); return l; }
  ALL_LESSONS.forEach(fit);
  C.lessons = ALL_LESSONS.filter(visible);
  // paid lessons arrive as title cards (locked: true) until MasarokAccount brings their content for owners
  var ACCESS = "open"; // "open" | "off" | "signed_out" | "not_owned" | "offline"
  function hasLocked() { return ALL_LESSONS.some(function (l) { return l.locked; }); }
  function unlock(full) {
    full.forEach(function (f) { for (var i = 0; i < ALL_LESSONS.length; i++) if (ALL_LESSONS[i].id === f.id) ALL_LESSONS[i] = fit(f); });
    C.lessons = ALL_LESSONS.filter(visible);
  }
  var CC_NAME = { au: ["Australia", "أستراليا"], us: ["the USA", "أمريكا"], uk: ["the UK", "بريطانيا"], ca: ["Canada", "كندا"], de: ["Germany", "ألمانيا"], sg: ["Singapore", "سنغافورة"] };
  var LV_NAME = { foundation: ["foundation", "الفاونديشن"], bachelor: ["bachelor's", "البكالوريوس"], master: ["master's", "الماجستير"], phd: ["PhD", "الدكتوراه"] };

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
    mockBand: ["estimated band {b}", "الدرجة التقديرية {b}"], courseProg: ["{d} of {t} lessons done", "أنجزت {d} من {t} دروس"],
    forYou: ["Showing the lessons for {c} · {l}.", "تظهر الدروس المناسبة لدولتك ودرجتك: {c} · {l}."], forAll: ["Showing lessons for every country. Pick your country and degree in the guide to see only the ones you need.", "تظهر الدروس لكل الدول. اختر دولتك ودرجتك في الدليل لترى ما تحتاجه فقط."],
    anyLevel: ["any degree", "أي درجة"], changeCc: ["Change it in the guide", "غيّرها من الدليل"],
    certT: ["Course complete!", "أكملت الدورة!"], certSub: ["Download your certificate. Write your name as you'd like it to appear.", "حمّل شهادتك، واكتب اسمك كما تريد أن يظهر."], certName: ["Your name", "اسمك"], certGo: ["Download certificate", "حمّل الشهادة"],
    certHead: ["Certificate of completion", "شهادة إتمام"], certThis: ["This is to certify that", "تشهد أكاديمية مسارُك بأن"], certDone: ["has completed the Masarok Academy course", "أتمّ دورة أكاديمية مسارُك"],
    certNote: ["A free practice course. Not an official qualification or test result.", "دورة تدريبية مجانية، وليست مؤهلًا رسميًا أو نتيجة اختبار."],
    disclaimerW: ["The writing coach gives guidance, not a guarantee of admission. Always check the exact rules and limits on the official application or visa website.", "مدرب الكتابة يقدّم إرشادات ولا يضمن القبول، فراجع دائمًا الشروط والحدود الدقيقة في موقع التقديم أو التأشيرة الرسمي."],
    // timed reading, writing pads and statement builders
    timeUpCheck: ["Time's up. Finish the question you're on, then check your answers.", "انتهى الوقت. أكمل السؤال الذي أنت عليه ثم تحقق من إجاباتك."],
    chars: ["{n} characters", "{n} حرفًا"], wordsN: ["{n} words", "{n} كلمة"], timerN: ["Start {n}-minute timer", "ابدأ مؤقت {n} دقيقة"],
    needN: ["Write at least {u} to finish this step.", "اكتب {u} على الأقل لإنهاء هذه الخطوة."], overMax: ["You're over the limit of {m}. Cut it down before you submit.", "تجاوزت الحد المسموح ({m})، فاختصر قبل الإرسال."],
    notesSub: ["Quick notes are fine. Fill at least two boxes. They're saved on this device for the next lessons.", "تكفي ملاحظات سريعة. املأ خانتين على الأقل، وتُحفظ على هذا الجهاز للدروس القادمة."],
    total: ["Total", "المجموع"], copyAll: ["Copy all", "انسخ الكل"], download: ["Download (.doc)", "تحميل (.doc)"],
    // speaking questions
    speakFor: ["Speak for {n} seconds", "تحدث لمدة {n} ثانية"], qaSub: ["Pick a topic. Answer each question out loud in about {n} seconds: answer, reason, example.", "اختر موضوعًا، وأجب عن كل سؤال بصوت عالٍ في نحو {n} ثانية: الإجابة ثم السبب ثم مثال."],
    answeredN: ["Answered: {n} (answer 3 to carry on)", "أجبت عن: {n} (أجب عن 3 لتتابع)"], nextQ: ["Next question", "السؤال التالي"], otherTopic: ["Choose another topic", "اختر موضوعًا آخر"],
    // mock tests
    mkT: ["Full mock test", "اختبار تجريبي كامل"],
    mkSteps: [["Listening: 4 parts, 40 questions. Each recording plays once.", "الاستماع: 4 أجزاء و40 سؤالًا، ويعمل كل تسجيل مرة واحدة."], ["Reading: 3 passages, 40 questions, 60 minutes.", "القراءة: 3 نصوص و40 سؤالًا في 60 دقيقة."], ["Writing: Task 1 and Task 2, 60 minutes.", "الكتابة: المهمة 1 والمهمة 2 في 60 دقيقة."], ["Speaking: 3 parts, recorded on your device.", "المحادثة: 3 أجزاء تُسجَّل على جهازك."], ["About 2 hours 45 minutes. Find a quiet place, and use headphones.", "نحو ساعتين و45 دقيقة. اختر مكانًا هادئًا واستخدم سماعات."]],
    mkStart: ["Start the test", "ابدأ الاختبار"], mkNextPart: ["Next part", "الجزء التالي"], mkSubmitL: ["Submit Listening", "أرسل الاستماع"], mkSubmitR: ["Submit Reading", "أرسل القراءة"], mkSubmitW: ["Submit Writing", "أرسل الكتابة"],
    mkS1: ["Part 1 (4–5 minutes): record yourself answering these questions, one after another.", "الجزء 1 (4–5 دقائق): سجّل إجاباتك عن هذه الأسئلة واحدًا تلو الآخر."], mkS2: ["Part 2: 1 minute to prepare, then speak for up to 2 minutes.", "الجزء 2: دقيقة للتحضير ثم تحدث حتى دقيقتين."], mkS3: ["Part 3 (4–5 minutes): answer these discussion questions with reasons and examples.", "الجزء 3 (4–5 دقائق): أجب عن أسئلة النقاش مع أسباب وأمثلة."],
    mkNextSp: ["Next part", "الجزء التالي"], mkSubmitS: ["Finish Speaking", "أنهِ المحادثة"],
    mkMarkT: ["Rate your Writing and Speaking", "قيّم كتابتك ومحادثتك"], mkMarkSub: ["Reread your essays and listen to your recordings, then be honest. Listening and Reading are marked for you.", "أعد قراءة مقالاتك واستمع لتسجيلاتك، ثم كن صادقًا. الاستماع والقراءة يُصحَّحان تلقائيًا."],
    mkCoach: ["Coach notes on your writing", "ملاحظات المدرب على كتابتك"], estMock: ["Estimated band", "الدرجة التقديرية"], mkSee: ["See my result", "اعرض نتيجتي"], mkResT: ["Your mock test result", "نتيجة اختبارك التجريبي"],
    mkNote: ["Listening and Reading are marked from your answers. Writing and Speaking come from your own ratings, so treat the overall as a rough estimate, not an official score.", "الاستماع والقراءة مصححان من إجاباتك، والكتابة والمحادثة من تقييمك لنفسك، فاعتبر الدرجة الكلية تقديرًا تقريبيًا وليست درجة رسمية."],
    mkRevL: ["Review Listening answers", "راجع إجابات الاستماع"], mkRevR: ["Review Reading answers", "راجع إجابات القراءة"],
    // phase 3: ordering, document detective, stories, budget and interviews
    orderSub: ["Use the arrows to put these in the right order.", "استخدم الأسهم لترتيبها بالترتيب الصحيح."], moveUp: ["Move up", "انقل للأعلى"], moveDown: ["Move down", "انقل للأسفل"], rightOrder: ["The right order", "الترتيب الصحيح"],
    spotSub: ["Tap every line that is wrong or needs your action. Tap it again to remove the flag.", "اضغط على كل سطر خاطئ أو يحتاج منك إجراء، واضغط مرة أخرى لإزالة العلامة."], spotNone: ["Flag at least one line first.", "ضع علامة على سطر واحد على الأقل أولًا."],
    spotRight: ["✓ Found it.", "✓ أحسنت، اكتشفته."], spotMissed: ["✕ Missed.", "✕ فاتك."], spotFine: ["This line was fine.", "هذا السطر كان سليمًا."], sample: ["Practice sample · not a real document", "نموذج تدريبي · ليس وثيقة حقيقية"],
    storyPick: ["What do you do?", "ماذا تفعل؟"], storyCont: ["Continue", "تابع"], storyYes: ["Good call.", "قرار موفق."], storyNo: ["Risky.", "قرار فيه مخاطرة."], storyHm: ["Okay.", "لا بأس."],
    storyScore: ["Good decisions: {c} of {t}", "القرارات الموفقة: {c} من {t}"], storyBest: ["Every call was a good one. You're ready for this.", "كل قراراتك موفقة، أنت مستعد."], storyOk: ["Not bad. Play again to see how the other choices turn out.", "جيد. العب مرة أخرى لترى نتائج الخيارات الأخرى."], storyAgain: ["Play again", "العب مرة أخرى"],
    bgCountry: ["Country", "الدولة"], bgAllow: ["Monthly allowance", "المكافأة الشهرية"], bgKnown: ["The 2026 amount for a single student, as shown in the guide. Change it if yours is different.", "مبلغ عام 2026 للطالب الأعزب كما في الدليل، وعدّله إذا كان مبلغك مختلفًا."],
    bgPractice: ["A practice amount, not the real allowance. Type the amount in your scholarship decision.", "مبلغ للتدريب وليس المكافأة الفعلية. اكتب المبلغ المذكور في قرار ابتعاثك."], bgYours: ["Your own amount.", "المبلغ الذي أدخلته."],
    perWeek: ["per week", "أسبوعيًا"], perMonth: ["per month", "شهريًا"], bgSpend: ["Planned spending per month", "المصروف المخطط شهريًا"], bgLeft: ["Left", "المتبقي"], bgStart: ["Start the month", "ابدأ الشهر"], bgOverPlan: ["Your plan already costs more than your allowance. Try a cheaper room or cut other spending first.", "خطتك تتجاوز مكافأتك من البداية، فجرّب غرفة أرخص أو قلّل المصاريف الأخرى أولًا."],
    bgNote: ["The costs are examples from the guide. Your rent and prices will differ by city.", "التكاليف أمثلة من الدليل، وستختلف الإيجارات والأسعار حسب المدينة."],
    bgWeek: ["Week {n} of {t}", "الأسبوع {n} من {t}"], bgBal: ["Left this month", "المتبقي هذا الشهر"], bgFree: ["Free", "مجانًا"], bgNextWeek: ["Next week", "الأسبوع التالي"], bgEnd: ["See how the month ended", "شاهد نهاية الشهر"],
    bgLeftEnd: ["Left at the end of the month", "المتبقي في نهاية الشهر"], bgGreat: ["Great month. You covered everything and still saved some of your allowance.", "شهر ممتاز، غطيت كل شيء وادخرت جزءًا من مكافأتك."],
    bgOk: ["You made it through, but with little to spare. Look at the tips below.", "أكملت الشهر لكن بهامش بسيط، فاطلع على النصائح أدناه."], bgOver: ["You ran out before the month ended. Look at your rent and the surprises, then try again.", "نفد المال قبل نهاية الشهر. راجع الإيجار والمفاجآت ثم حاول مرة أخرى."], bgAgain: ["Plan the month again", "خطط للشهر من جديد"],
    ivHow: ["{n} questions, one at a time. Answer out loud in about {s} seconds each, then rate yourself.", "{n} أسئلة، سؤال بعد سؤال. أجب بصوت عالٍ في نحو {s} ثانية لكل سؤال، ثم قيّم نفسك."], ivVoice: ["Read the questions aloud", "اقرأ الأسئلة بصوت مسموع"],
    ivStart: ["Start the interview", "ابدأ المقابلة"], ivAgain: ["Practise with new questions", "تدرب بأسئلة جديدة"], ivRounds: ["Rounds practised: {n}", "الجولات التي تدربت عليها: {n}"], ivQ: ["Question {n} of {t}", "السؤال {n} من {t}"],
    ivTip: ["What a good answer includes", "ما تتضمنه الإجابة الجيدة"], ivRepeat: ["Hear it again", "استمع مرة أخرى"], ivFinish: ["Finish the interview", "أنهِ المقابلة"],
    ivReview: ["How did it go?", "كيف كان أداؤك؟"], ivReviewSub: ["Listen back to a few answers, then tick what is true. Practise again until you can tick every box.", "استمع لبعض إجاباتك، ثم ضع علامة على ما ينطبق. تدرب مجددًا حتى تضع علامة على كل البنود."],
    bkHint: ["Your progress is saved on this device only.", "يُحفظ تقدمك على هذا الجهاز فقط."], bkGo: ["Move it to another phone", "انقله إلى جوال آخر"],
    acHint: ["Sign in to keep your progress on every device.", "سجّل الدخول لتحتفظ بتقدمك على كل أجهزتك."], acGo: ["Sign in", "تسجيل الدخول"],
    acIn: ["Your progress saves to your account ({e}).", "يُحفظ تقدمك في حسابك ({e})."],
    lockTag: ["Full course", "الدورة الكاملة"], lockedT: ["Part of the full course", "ضمن الدورة الكاملة"],
    lockBanner: ["{f} free lessons to try. The other {p} are in the full course.", "{f} دروس مجانية للتجربة، والدروس الـ{p} الأخرى ضمن الدورة الكاملة."],
    lockSignedOut: ["This lesson is in the full course. Already bought it? Sign in with the same email to open it.", "هذا الدرس ضمن الدورة الكاملة. هل اشتريتها؟ سجّل الدخول بالبريد نفسه لتفتحه."],
    lockNotOwned: ["Your account doesn't include this course yet.", "حسابك لا يشمل هذه الدورة بعد."],
    lockSoon: ["The full course opens for purchase soon. The free lessons are ready now.", "يُتاح شراء الدورة الكاملة قريبًا، والدروس المجانية جاهزة الآن."],
    lockOffline: ["Connect to the internet once to open your paid lessons. After that, they work offline on this device.", "اتصل بالإنترنت مرة واحدة لتفتح دروسك المدفوعة، وبعدها تعمل دون إنترنت على هذا الجهاز."],
    lockRetry: ["Try again", "أعد المحاولة"], lockFree: ["Go to a free lesson", "اذهب إلى درس مجاني"],
    disclaimer: ["Practice material in Masarok Academy is original, written in the official IELTS formats. Scores here are estimates, not official results.", "تمارين أكاديمية مسارُك أصلية ومكتوبة بالصيغ الرسمية لاختبار IELTS، والدرجات هنا تقديرية وليست نتائج رسمية."]
  };

  var app = $("#app");
  function L(id) { for (var i = 0; i < ALL_LESSONS.length; i++) if (ALL_LESSONS[i].id === id) return ALL_LESSONS[i]; return null; }
  function lessonIndex(id) { for (var i = 0; i < C.lessons.length; i++) if (C.lessons[i].id === id) return i; return -1; }
  function help(x) { return Array.isArray(x) && x[1] ? '<p class="ar-help" lang="ar" dir="rtl">' + esc(x[1]) + "</p>" : ""; }
  function enText(x) { return '<p lang="en" dir="ltr">' + esc(EN(x)) + "</p>"; }
  function bandStr(b) { return (Math.round(b * 2) / 2).toFixed(1); }

  // ================= course home =================
  var GROUPS = C.groups ? C.groups : C.id === "ielts"
    ? [["all", ["Start here", "ابدأ من هنا"]], ["r", ["Reading", "القراءة"]], ["l", ["Listening", "الاستماع"]], ["w", ["Writing", "الكتابة"]], ["s", ["Speaking", "المحادثة"]], ["v", ["Vocabulary", "المفردات"]], ["mock", ["Mock tests", "الاختبارات التجريبية"]]]
    : [["base", ["The basics", "الأساسيات"]], ["app", ["Your application", "طلبك"]], ["pg", ["Postgraduate", "الدراسات العليا"]], ["end", ["Final check", "المراجعة النهائية"]]];
  function groupOf(l) {
    if (l.group) return l.group;
    if (C.id === "ielts") return l.skill || "all";
    var o = l.order || 0; return o < 40 ? "base" : o < 50 ? "app" : o < 60 ? "pg" : "end";
  }
  function lessonRow(l) {
    var r = S.lessons[l.id] || {}, st = r.done ? "done" : r.started ? "started" : "new";
    if (l.locked) return '<li><a class="ls is-locked" href="#/l/' + l.id + '"><span class="ls-ic" aria-hidden="true">' + l.icon + '</span>' +
      '<span class="ls-tx"><b>' + esc(T(l.t)) + "</b><small>" + esc(T(l.d)) + '</small><span class="ls-meta">' + esc(fmt(UI.mins, { n: l.mins })) + "</span></span>" +
      '<span class="ls-go">🔒 ' + esc(T(UI.lockTag)) + "</span></a></li>";
    var m = S.mocks && S.mocks[l.id];
    var extra = l.words ? vocabStatus(l) : m ? fmt(UI.mockBand, { b: bandStr(m.o) }) : r.done && r.score && r.score[1] ? fmt(UI.score, { c: r.score[0], t: r.score[1] }) : "";
    var rec = recommended() === l.id;
    var tag = l.cc ? l.cc.map(function (c) { return CC_NAME[c] ? T(CC_NAME[c]) : c; }).join(" · ") : "";
    return '<li><a class="ls is-' + st + (rec ? " is-rec" : "") + '" href="#/l/' + l.id + '">' +
      '<span class="ls-ic" aria-hidden="true">' + l.icon + '</span>' +
      '<span class="ls-tx"><b>' + esc(T(l.t)) + (rec ? ' <em class="ls-rec">' + esc(T(UI.startHere)) + "</em>" : "") + "</b><small>" + esc(T(l.d)) + "</small>" +
      '<span class="ls-meta">' + esc(fmt(UI.mins, { n: l.mins })) + (tag && !MY_CC ? " · " + esc(tag) : "") + (extra ? " · " + esc(extra) : "") + "</span></span>" +
      '<span class="ls-go">' + (st === "done" ? "✓ " + esc(T(UI.done)) : esc(T(st === "started" ? UI.cont : UI.start))) + "</span></a></li>";
  }
  function home() {
    stopAll();
    var top = "";
    if (C.id === "ielts") {
      var p = S.placement;
      top = '<section class="pl" aria-labelledby="pl-h"><h2 id="pl-h">' + esc(T(UI.planT)) + "</h2>" +
        (p ? planHtml(p) : '<div class="pl-empty"><p>' + esc(T(UI.planNone)) + '</p><a class="btn btn-primary" href="#/l/placement">' + esc(T(UI.planGo)) + "</a></div>") + "</section>";
    } else {
      var who = MY_CC ? fmt(UI.forYou, { c: T(CC_NAME[MY_CC] || [MY_CC, MY_CC]), l: MY_LV ? T(LV_NAME[MY_LV] || [MY_LV, MY_LV]) : T(UI.anyLevel) }) : T(UI.forAll);
      top = '<section class="pl"><div class="pl-empty wr-for"><p>📍 ' + esc(who) + '</p><a class="es-link" href="' + base + '">' + esc(T(UI.changeCc)) + "</a></div></section>";
    }
    var done = C.lessons.filter(function (l) { return (S.lessons[l.id] || {}).done; }).length;
    S.courses = S.courses || {}; S.courses[C.id] = { done: done, total: C.lessons.length }; save();
    var groups = GROUPS.map(function (g) {
      var ls = C.lessons.filter(function (l) { return groupOf(l) === g[0]; });
      if (!ls.length) return "";
      var gd = ls.filter(function (l) { return (S.lessons[l.id] || {}).done; }).length;
      return '<section class="cs-grp"><h3>' + esc(T(g[1])) + ' <small>' + gd + "/" + ls.length + '</small></h3><ol class="ls-list">' + ls.map(lessonRow).join("") + "</ol></section>";
    }).join("");
    var cert = done === C.lessons.length && C.lessons.length ? certHtml() : '<p class="cs-prog">' + esc(fmt(UI.courseProg, { d: done, t: C.lessons.length })) + "</p>";
    app.innerHTML =
      '<header class="cs-head"><a class="cs-back" href="' + base + 'academy/">' + backArrow() + esc(T(UI.backAc)) + "</a>" + arToggle() + "</header>" +
      '<section class="cs-hero"><p class="eyebrow">' + esc(T(UI.academy)) + '</p><h1 id="main-h" tabindex="-1">' + esc(T(C.t)) + '</h1><p class="cs-sub">' + esc(T(C.sub)) + "</p></section>" +
      top +
      '<section class="cs-ls" aria-labelledby="ls-h"><h2 id="ls-h">' + esc(T(UI.lessonsT)) + "</h2>" + lockBanner() + cert + groups + "</section>" +
      '<p class="cs-note">' + esc(T(C.note || (C.id === "ielts" ? UI.disclaimer : UI.disclaimerW))) + "</p>" +
      saveNote();
    wirePlan(); wireCert();
  }
  function lockBanner() {
    var locked = C.lessons.filter(function (l) { return l.locked; }).length;
    if (!locked) return "";
    return '<div class="lk-ban"><p>🔓 ' + esc(fmt(UI.lockBanner, { f: C.lessons.length - locked, p: locked })) + "</p>" +
      (ACCESS === "signed_out" ? '<button type="button" class="btn btn-ghost" data-sign-in>' + esc(T(UI.acGo)) + "</button>" : "") + "</div>";
  }
  function saveNote() {
    var MA = window.MasarokAccount;
    if (MA && MA.signedIn()) { var me = MA.me() || {}; return '<p class="cs-note">☁️ ' + esc(fmt(UI.acIn, { e: me.email || "" })) + "</p>"; }
    return '<p class="cs-note">📦 ' + esc(T(UI.bkHint)) + (MA && MA.enabled ? " " + esc(T(UI.acHint)) + ' <button type="button" class="es-link" data-sign-in>' + esc(T(UI.acGo)) + "</button> ·" : "") +
      ' <button type="button" class="es-link" data-backup>' + esc(T(UI.bkGo)) + "</button></p>";
  }
  function lockScreen(l) {
    var why = ACCESS === "signed_out" ? UI.lockSignedOut : ACCESS === "not_owned" ? UI.lockNotOwned : ACCESS === "offline" ? UI.lockOffline : UI.lockSoon;
    var free = C.lessons.filter(function (x) { return !x.locked; })[0];
    app.innerHTML = '<header class="cs-head"><a class="cs-back" href="#">' + backArrow() + esc(T(UI.back)) + "</a>" + arToggle() + "</header>" +
      '<section class="lp-done lk"><div class="lp-medal" aria-hidden="true">🔒</div><p class="eyebrow">' + l.icon + " " + esc(T(UI.lockedT)) + '</p><h2 tabindex="-1">' + esc(T(l.t)) + '</h2><p class="lp-dt">' + esc(T(l.d)) + "</p>" +
      '<p class="lk-why">' + esc(T(why)) + (ACCESS === "not_owned" ? " " + esc(T(UI.lockSoon)) : "") + "</p>" +
      '<div class="ac-cta">' + (ACCESS === "signed_out" ? '<button type="button" class="btn btn-primary" data-sign-in>' + esc(T(UI.acGo)) + "</button>" : "") +
      (ACCESS === "offline" ? '<button type="button" class="btn btn-primary" data-retry-load>' + esc(T(UI.lockRetry)) + "</button>" : "") +
      (free ? '<a class="btn btn-ghost" href="#/l/' + free.id + '">' + esc(T(UI.lockFree)) + ": " + esc(T(free.t)) + "</a>" : "") + "</div></section>";
    var h = $(".lk h2"); if (h) h.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }
  function backArrow() { return '<svg viewBox="0 0 16 16" aria-hidden="true" class="bk"><path d="M13 8H4M7.5 4.5L4 8l3.5 3.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'; }
  function arToggle() { return '<button type="button" class="ar-tg" data-ar-toggle aria-pressed="' + !!S.arHelp + '">🌙 ' + esc(T(S.arHelp ? UI.arOn : UI.arOff)) + "</button>"; }
  function weakest(p) { var k = ["r", "l", "w", "s"].sort(function (a, b) { return p.b[a] - p.b[b]; }); return k[0]; }
  function isDone(id) { return !!(S.lessons[id] || {}).done; }
  function recommended() {
    if (C.id !== "ielts") { for (var q = 0; q < C.lessons.length; q++) if (!isDone(C.lessons[q].id)) return C.lessons[q].id; return null; }
    var p = S.placement; if (!p) return "placement";
    if (!isDone("know")) return "know";
    var w = weakest(p), order = {
      r: ["tfng", "headings", "read-skim", "read-complete", "read-mcq", "read-full"],
      l: ["listen-basics", "listen-mcq", "listen-maps", "listen-lecture", "listen-full"],
      w: ["write-task1", "writing"], s: ["speak-p1", "speaking", "speak-p3"] }[w] || [];
    for (var i = 0; i < order.length; i++) if (L(order[i]) && !isDone(order[i])) return order[i];
    for (var j = 0; j < C.lessons.length; j++) if (C.lessons[j].skill !== "mock" && !isDone(C.lessons[j].id)) return C.lessons[j].id;
    for (var k = 0; k < C.lessons.length; k++) if (!isDone(C.lessons[k].id)) return C.lessons[k].id;
    return null;
  }
  function vocabStatus(l) { var n = 0, due = 0, now = Date.now(); l.words.forEach(function (w) { var s = S.vocab[w[0]]; if (s && s.b > 0) n++; if (!s || s.due <= now) due++; }); return fmt(UI.learned, { n: n, t: l.words.length }) + (due ? " · " + fmt(UI.dueNow, { n: due }) : ""); }

  // ---------- certificate when every lesson is done ----------
  function certHtml() {
    return '<div class="cert"><b>🎓 ' + esc(T(UI.certT)) + "</b><p>" + esc(T(UI.certSub)) + '</p><div class="cert-row"><label><span>' + esc(T(UI.certName)) + '</span><input type="text" data-cert-name autocomplete="name" value="' + esc(S.certName || "") + '"></label>' +
      '<button type="button" class="btn btn-primary" data-cert>' + esc(T(UI.certGo)) + "</button></div></div>";
  }
  function wireCert() {
    var b = $("[data-cert]"); if (!b) return;
    b.addEventListener("click", function () { var n = $("[data-cert-name]").value.trim(); S.certName = n; save(); certificate(n); });
  }
  function certificate(name) {
    var W = 1600, H = 1130, cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    var x = cv.getContext("2d"), font = AR ? '"IBM Plex Sans Arabic", Tahoma, sans-serif' : '"Bricolage Grotesque", "Segoe UI", sans-serif';
    var g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#173252"); g.addColorStop(1, "#0B1626"); x.fillStyle = g; x.fillRect(0, 0, W, H);
    function band(y) {
      x.fillStyle = "#2A1612"; x.fillRect(0, y, W, 60); x.fillStyle = "#C99A5B"; x.fillRect(0, y, W, 6); x.fillRect(0, y + 54, W, 6);
      for (var sx = 0; sx < W; sx += 52) {
        x.fillStyle = "#9C2A22"; x.beginPath(); x.moveTo(sx, y + 6); x.lineTo(sx + 26, y + 30); x.lineTo(sx + 52, y + 6); x.fill();
        x.beginPath(); x.moveTo(sx, y + 54); x.lineTo(sx + 26, y + 30); x.lineTo(sx + 52, y + 54); x.fill();
        x.fillStyle = "#F3EBDD"; x.beginPath(); x.moveTo(sx + 26, y + 19); x.lineTo(sx + 37, y + 30); x.lineTo(sx + 26, y + 41); x.lineTo(sx + 15, y + 30); x.fill();
      }
    }
    band(0); band(H - 60);
    x.strokeStyle = "rgba(226,182,108,.55)"; x.lineWidth = 3; x.strokeRect(60, 100, W - 120, H - 200);
    x.textAlign = "center"; x.direction = AR ? "rtl" : "ltr";
    x.fillStyle = "#E2B66C"; x.font = "700 40px " + font; x.fillText(T(UI.academy), W / 2, 200);
    x.fillStyle = "#EEF2F7"; x.font = "800 74px " + font; x.fillText(T(UI.certHead), W / 2, 320);
    x.fillStyle = "#A9B8CB"; x.font = "500 34px " + font; x.fillText(T(UI.certThis), W / 2, 410);
    x.fillStyle = "#EEF2F7"; x.font = "800 68px " + font; x.fillText(name || "—", W / 2, 510);
    x.fillStyle = "#A9B8CB"; x.font = "500 34px " + font; x.fillText(T(UI.certDone), W / 2, 600);
    x.fillStyle = "#E2B66C"; x.font = "800 56px " + font; x.fillText(T(C.t), W / 2, 690);
    x.fillStyle = "#C8D3E0"; x.font = "500 30px " + font;
    x.fillText(new Date().toLocaleDateString(AR ? "ar-SA-u-ca-gregory" : "en-AU", { year: "numeric", month: "long", day: "numeric" }), W / 2, 780);
    x.fillStyle = "#7F90A6"; x.font = "500 24px " + font; x.fillText(T(UI.certNote), W / 2, 900);
    x.direction = "ltr"; x.fillStyle = "#EEF2F7"; x.font = "700 32px " + font; x.fillText("masarok.org", W / 2, 960);
    cv.toBlob(function (blob) {
      if (!blob) return;
      var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "masarok-certificate-" + C.id + ".png";
      document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
    }, "image/png");
  }

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
    if (l.locked) { cur = null; lockScreen(l); return; }
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
    cur.ctl = {};
    var ctl = R ? R(body, st, l) : {};
    cur.ctl = ctl || {};
    var chk = $("[data-check]"), nxt = $("[data-next]");
    if (cur.ctl.check) { chk.hidden = false; nxt.hidden = !cur.results[i]; }
    if (cur.ctl.gate) nxt.disabled = !cur.ctl.gate();
    chk.addEventListener("click", function () {
      var res = cur.ctl.check(); if (!res) return;
      cur.results[i] = res;
      var need = st.pass != null ? st.pass : (st.t === "order" || st.t === "spot") ? Math.ceil(res.t * 0.6) : 0, pass = res.c >= need;
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
  function gateUpdate() { var n = $("[data-next]"); if (n && cur && cur.ctl && cur.ctl.gate) n.disabled = !cur.ctl.gate(); }
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
    if (st.cta) h += '<p class="tx-cta"><a class="btn btn-ghost" href="' + base + st.cta.href + '">' + esc(T(st.cta.t)) + " →</a></p>";
    el.innerHTML = '<div class="en-block" lang="en" dir="ltr">' + h + "</div>";
    fixArDir(el);
  };
  // Arabic help lines inside the English block keep their own direction
  function fixArDir(el) { $$(".ar-help", el).forEach(function (p) { p.setAttribute("dir", "rtl"); }); }
  function head(st) { return '<h2 lang="en" dir="ltr">' + esc(EN(st.h)) + "</h2>" + (S.arHelp && Array.isArray(st.h) ? '<p class="ar-help ar-h" lang="ar" dir="rtl">' + esc(st.h[1]) + "</p>" : ""); }

  RENDER.table = function (el, st) {
    var h = head(st) + '<div class="tb-wrap"><table class="tb"><thead><tr>' + st.cols.map(function (c) { return "<th>" + esc(EN(c)) + "</th>"; }).join("") + "</tr></thead><tbody>" +
      st.rows.map(function (r) { return "<tr>" + r.map(function (c, i) { return i === 0 ? '<th scope="row">' + esc(c) + "</th>" : "<td>" + esc(c) + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div>";
    (st.p || []).forEach(function (x) { h += '<div class="tx">' + enText(x) + (S.arHelp ? help(x) : "") + "</div>"; });
    el.innerHTML = '<div class="en-block" lang="en" dir="ltr">' + h + "</div>";
  };

  // ================= questions: one engine for every kind =================
  // kinds: tfng, ynng, mcq (default), gap and form (typed), map (letter on a map), head (heading for a paragraph)
  var CHOICE3 = { tfng: [["T", UI.t], ["F", UI.f], ["NG", UI.ng]], ynng: [["Y", ["Yes", "نعم"]], ["N", ["No", "لا"]], ["NG", UI.ng]] };
  function kindOf(it) { return it.k || (it.l ? "form" : "mcq"); }
  function entries(st) {
    // every question in a step, with its group instruction, numbered in order
    var out = [], n = st.start || 1;
    if (st.items) st.items.forEach(function (it) { out.push({ it: it, n: n++, g: -1 }); });
    (st.groups || []).forEach(function (g, gi) { g.items.forEach(function (it) { out.push({ it: it, n: n++, g: gi }); }); });
    return out;
  }
  function itemHtml(e, name, ctx) {
    var it = e.it, k = kindOf(it), n = e.n, h = "";
    var qs = Array.isArray(it.s) ? EN(it.s) : it.s;
    var arQ = S.arHelp && Array.isArray(it.s) ? '<p class="ar-help" lang="ar" dir="rtl">' + esc(it.s[1]) + "</p>" : "";
    if (k === "tfng" || k === "ynng") {
      h = '<legend><span class="q-n">' + n + "</span> " + esc(qs) + "</legend>" + arQ + '<div class="q-os is-tfng">' + CHOICE3[k].map(function (o) {
        return '<label class="q-o"><input type="radio" name="' + name + n + '" value="' + o[0] + '"><span>' + esc(EN(o[1])) + "</span></label>";
      }).join("") + "</div>";
    } else if (k === "gap" || k === "form") {
      var lab = k === "form" ? it.l : qs, id = name + "i" + n, input = '<input class="q-in" id="' + id + '" type="text" autocomplete="off" autocapitalize="off" spellcheck="false">';
      if (k === "gap" && lab.indexOf("___") > -1) { var parts = lab.split("___"); h = '<div class="q-gap"><span class="q-n">' + n + '</span> <label for="' + id + '" class="vh">' + esc(lab.replace(/___/g, "…")) + "</label>" + esc(parts[0]) + input + esc(parts.slice(1).join("___")) + "</div>"; }
      else h = '<div class="q-gap q-form"><label for="' + id + '"><span class="q-n">' + n + "</span> " + esc(lab) + "</label>" + input + "</div>";
      h += arQ;
    } else if (k === "map" || k === "head") {
      var opts = k === "map" ? (ctx.spots || []).map(function (sp) { return [sp.k, sp.k]; }) : (ctx.heads || []).map(function (hd) { return [hd.k, hd.k + ". " + hd.s]; });
      var lb = k === "head" ? "Paragraph " + it.p : qs, sid = name + "s" + n;
      h = '<div class="q-gap q-sel"><label for="' + sid + '"><span class="q-n">' + n + "</span> " + esc(lb) + '</label><select id="' + sid + '"><option value="">—</option>' + opts.map(function (o) { return '<option value="' + esc(o[0]) + '">' + esc(o[1]) + "</option>"; }).join("") + "</select></div>" + arQ;
    } else {
      h = '<legend><span class="q-n">' + n + "</span> " + esc(qs) + "</legend>" + arQ + '<div class="q-os' + (it.row ? " is-tfng is-row" : "") + '">' + it.o.map(function (o, j) {
        return '<label class="q-o"><input type="radio" name="' + name + n + '" value="' + j + '"><span>' + esc(EN(o)) + (S.arHelp && Array.isArray(o) ? ' <small class="ar-o" lang="ar" dir="rtl">' + esc(o[1]) + "</small>" : "") + "</span></label>";
      }).join("") + "</div>";
    }
    var tag = (k === "tfng" || k === "ynng" || k === "mcq") ? "fieldset" : "div";
    return "<" + tag + ' class="q q-' + k + '" data-qn="' + n + '">' + h + '<div class="q-x" hidden></div></' + tag + ">";
  }
  function norm(v) { return String(v == null ? "" : v).toLowerCase().replace(/[’']/g, "").replace(/[.,;:!?$£€%()"“”]/g, " ").replace(/\s+/g, " ").trim(); }
  function readVal(node, it) {
    var k = kindOf(it);
    if (k === "gap" || k === "form") { var i = $("input", node); return i ? i.value.trim() : ""; }
    if (k === "map" || k === "head") { var s = $("select", node); return s ? s.value : ""; }
    var c = $("input:checked", node); return c ? c.value : "";
  }
  function setVal(node, it, v) {
    var k = kindOf(it); if (v == null || v === "") return;
    if (k === "gap" || k === "form") $("input", node).value = v;
    else if (k === "map" || k === "head") $("select", node).value = v;
    else { var r = $('input[value="' + v + '"]', node); if (r) r.checked = true; }
  }
  function rightVal(it) { var k = kindOf(it); return k === "mcq" ? String(it.a) : Array.isArray(it.a) ? it.a[0] : it.a; }
  function isRight(it, v) {
    var k = kindOf(it);
    if (k === "gap" || k === "form") { var nv = norm(v); return !!nv && (Array.isArray(it.a) ? it.a : [it.a]).some(function (a) { return norm(a) === nv || norm(a).replace(/^(the|a|an) /, "") === nv.replace(/^(the|a|an) /, ""); }); }
    return String(v) === String(rightVal(it));
  }
  function answerText(it, ctx) {
    var k = kindOf(it), a = rightVal(it);
    if (k === "tfng" || k === "ynng") { var o = CHOICE3[k].filter(function (x) { return x[0] === a; })[0]; return o ? EN(o[1]) : a; }
    if (k === "mcq") return EN(it.o[it.a]);
    if (k === "head") { var hd = (ctx.heads || []).filter(function (x) { return x.k === a; })[0]; return a + (hd ? ". " + hd.s : ""); }
    return a;
  }
  function valText(it, v, ctx) {
    var k = kindOf(it); if (v === "" || v == null) return "—";
    if (k === "tfng" || k === "ynng") { var o = CHOICE3[k].filter(function (x) { return x[0] === v; })[0]; return o ? EN(o[1]) : v; }
    if (k === "mcq") return EN(it.o[+v]);
    return v;
  }
  function markItem(node, it, v, ctx) {
    var ok = isRight(it, v), k = kindOf(it);
    node.classList.add(ok ? "is-ok" : "is-no");
    $$("input, select", node).forEach(function (f) { if (f.type === "radio") { f.disabled = true; if (f.value === rightVal(it)) f.parentNode.classList.add("is-right"); else if (f.checked) f.parentNode.classList.add("is-wrong"); } else { f.readOnly = true; if (f.tagName === "SELECT") f.disabled = true; } });
    var x = $(".q-x", node); x.hidden = false;
    x.innerHTML = "<b>" + (ok ? "✓" : "✕ Answer: " + esc(answerText(it, ctx))) + "</b> " + esc(EN(it.x)) + (S.arHelp ? help(it.x) : "");
    fixArDir(x);
    return ok;
  }
  function gradeEntries(root, list, ctx, allowBlank) {
    var vals = list.map(function (e) { return readVal($('[data-qn="' + e.n + '"]', root), e.it); });
    if (!allowBlank && vals.some(function (v) { return v === ""; })) { var m = $(".lp-msg"); if (m) m.textContent = T(UI.answerAll); return null; }
    var c = 0;
    list.forEach(function (e, i) { if (markItem($('[data-qn="' + e.n + '"]', root), e.it, vals[i], ctx)) c++; });
    return { c: c, t: list.length, vals: vals };
  }
  function groupsHtml(st, name, ctx) {
    var list = entries(st), h = "";
    if (st.instr) h += '<p class="q-instr">' + esc(EN(st.instr)) + "</p>" + (S.arHelp ? help(st.instr) : "");
    var gi = -2;
    list.forEach(function (e) {
      if (e.g !== gi) { gi = e.g; if (gi > -1) { var g = st.groups[gi]; h += '<p class="q-instr">' + esc(EN(g.instr)) + "</p>" + (S.arHelp ? help(g.instr) : ""); } }
      h += itemHtml(e, name, ctx);
    });
    return h;
  }
  function headsBox(heads) {
    return '<div class="hd-list"><b>List of headings</b><ul>' + heads.map(function (h) { return "<li><b>" + esc(h.k) + ".</b> " + esc(h.s) + "</li>"; }).join("") + "</ul></div>";
  }
  function parasHtml(st) {
    return st.paras.map(function (p, i) { return st.labels ? '<p><b class="ps-l">' + String.fromCharCode(65 + i) + "</b> " + esc(p) + "</p>" : "<p>" + esc(p) + "</p>"; }).join("");
  }
  function clock(sec, out, onEnd) {
    var left = sec, id;
    function show() { var m = Math.floor(left / 60), s = left % 60; out.textContent = "⏱ " + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s; out.classList.toggle("is-low", left <= 120); }
    show();
    id = setInterval(function () { left = Math.max(0, left - 1); show(); if (!left) { clearInterval(id); onEnd && onEnd(); } }, 1000);
    timers.push(id);
    return function () { clearInterval(id); };
  }
  var timers = [];
  function clearTimers() { timers.forEach(clearInterval); timers = []; }

  // ---------- a reading passage with its questions ----------
  function passageBlock(st, name) {
    var ctx = { heads: st.heads };
    return '<div class="ps-grid"><details class="ps" open><summary>' + esc(st.title) + '</summary><div class="ps-tx">' + parasHtml(st) + "</div></details>" +
      '<div class="qs-col">' + (st.time ? '<p class="ps-clock" data-clock></p>' : "") + (st.heads ? headsBox(st.heads) : "") + groupsHtml(st, name, ctx) + "</div></div>";
  }
  RENDER.passage = function (el, st) {
    var name = "p" + cur.i + "-", ctx = { heads: st.heads };
    el.innerHTML = '<div class="en-block" lang="en" dir="ltr">' + head(st) + passageBlock(st, name) + "</div>";
    fixArDir(el);
    var ck = $("[data-clock]", el); if (ck) clock(st.time * 60, ck, function () { var m = $(".lp-msg"); if (m) m.textContent = T(UI.timeUpCheck); });
    return { check: function () { var r = gradeEntries(el, entries(st), ctx); if (r) { clearTimers(); if (st.part) cur.ans[st.part] = r.c; } return r; }, leave: clearTimers };
  };
  RENDER.quiz = function (el, st) {
    var name = "z" + cur.i + "-";
    el.innerHTML = '<div class="en-block" lang="en" dir="ltr">' + head(st) + intro(st) + '<div class="qs-col">' + groupsHtml(st, name, {}) + "</div></div>";
    fixArDir(el);
    return { check: function () { var r = gradeEntries(el, entries(st), {}); if (r && st.part) cur.ans[st.part] = r.c; return r; } };
  };

  // ---------- a simple map for listening ----------
  function mapSvg(m) {
    var h = '<svg class="lmap" viewBox="0 0 ' + m.w + " " + m.h + '" role="img" aria-label="Map"><rect x="2" y="2" width="' + (m.w - 4) + '" height="' + (m.h - 4) + '" rx="10" fill="#10243D" stroke="#C99A5B" stroke-width="1.5"/>';
    // labels sized to their text and kept inside the frame
    (m.fixed || []).forEach(function (f) {
      var w = Math.max(48, Math.round(f.t.length * 5.4 + 14)), x0 = Math.max(6, Math.min(m.w - 6 - w, f.x - w / 2)), y0 = Math.max(6, Math.min(m.h - 26, f.y - 10));
      h += '<rect x="' + x0 + '" y="' + y0 + '" width="' + w + '" height="20" rx="5" fill="#173252" stroke="#3D5A86"/><text x="' + (x0 + w / 2) + '" y="' + (y0 + 14) + '" text-anchor="middle" font-size="9.5" fill="#EEF2F7">' + esc(f.t) + "</text>";
    });
    (m.spots || []).forEach(function (sp) { h += '<circle cx="' + sp.x + '" cy="' + sp.y + '" r="12" fill="#E2B66C"/><text x="' + sp.x + '" y="' + (sp.y + 4.5) + '" text-anchor="middle" font-size="13" font-weight="700" fill="#1A1206">' + sp.k + "</text>"; });
    return h + "</svg>";
  }

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
  function stopAll() { try { if (tts) tts.cancel(); } catch (e) {} if (rec.stream) stopRec(true); clearInterval(timerId); clearTimers(); }
  // speak a script with a different voice for each speaker
  function speakLines(lines, onEnd) {
    var v = voicesAll(), keys = [];
    lines.forEach(function (l) { if (keys.indexOf(l[0]) < 0) keys.push(l[0]); });
    tts.cancel();
    lines.forEach(function (l, j) {
      var u = new SpeechSynthesisUtterance(l[1]); u.lang = "en-GB"; u.rate = 0.92;
      var ix = keys.indexOf(l[0]), vv = v[ix % Math.max(1, v.length)];
      if (vv) u.voice = vv;
      if (v.length < keys.length) u.pitch = [1, 1.3, 0.8, 1.15][ix % 4];
      if (j === lines.length - 1) u.onend = function () { onEnd && onEnd(); };
      tts.speak(u);
    });
  }
  function voicesAll() {
    var v = tts ? tts.getVoices().filter(function (x) { return /^en(-|_|$)/i.test(x.lang); }) : [];
    var pick = function (re) { return v.filter(function (x) { return re.test(x.lang); }); };
    var list = pick(/GB/i).concat(pick(/AU/i), pick(/US/i), v), seen = {};
    return list.filter(function (x) { if (seen[x.name]) return false; seen[x.name] = 1; return true; });
  }
  // the listening block: play button (limited plays), optional map, then the questions
  function listenBlock(st, name, plays) {
    var can = !!(tts && window.SpeechSynthesisUtterance), names = st.names || { a: "Officer", b: "Student" };
    return (st.intro ? '<div class="tx">' + enText(st.intro) + (S.arHelp ? help(st.intro) : "") + "</div>" : "") +
      (can ? '<div class="ls-play"><button type="button" class="btn btn-primary" data-play>▶ ' + esc(EN(UI.play)) + '</button><span data-left>Plays left: ' + plays + "</span></div>"
        : '<p class="pl-warn">' + esc(EN(UI.noTts)) + "</p>") +
      '<details class="ls-script"' + (can ? " hidden" : " open") + "><summary>" + esc(EN(UI.script)) + "</summary>" + st.lines.map(function (l) { return "<p><b>" + esc(names[l[0]] || l[0]) + ":</b> " + esc(l[1]) + "</p>"; }).join("") + "</details>" +
      (st.map ? mapSvg(st.map) : "") +
      '<div class="frm">' + (st.form ? "<h3>" + esc(st.form) + "</h3>" : "") + groupsHtml(st, name, { spots: st.map && st.map.spots }) + "</div>";
  }
  function wirePlay(el, st, plays) {
    var pb = $("[data-play]", el); if (!pb) return;
    pb.addEventListener("click", function () {
      if (plays <= 0) return;
      plays--; pb.disabled = true; pb.textContent = "🔊 " + EN(UI.playing);
      var t0 = setTimeout(done, 240000);
      speakLines(st.lines, done);
      function done() { clearTimeout(t0); pb.disabled = plays <= 0; pb.textContent = "▶ " + EN(plays > 0 ? UI.play : UI.noPlays); var lf = $("[data-left]", el); if (lf) lf.textContent = plays > 0 ? "Plays left: " + plays : ""; }
    });
  }
  RENDER.listen = function (el, st) {
    var name = "l" + cur.i + "-", plays = st.plays || 2;
    el.innerHTML = '<div class="en-block" lang="en" dir="ltr">' + head(st) + listenBlock(st, name, plays) + "</div>";
    fixArDir(el); wirePlay(el, st, plays);
    return {
      check: function () {
        var r = gradeEntries(el, entries(st), { spots: st.map && st.map.spots });
        if (!r) return null;
        var sc = $(".ls-script", el); if (sc) sc.hidden = false;
        if (st.part) cur.ans[st.part] = r.c;
        try { tts && tts.cancel(); } catch (e) {}
        return r;
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
  // ================= charts for Writing Task 1 =================
  var CHART_COLS = ["#E2B66C", "#E0796B", "#86AEE0", "#6CCB98", "#C9A0DC"];
  function niceMax(v) { var steps = [5, 10, 20, 25, 50, 100, 200, 250, 500, 1000]; for (var i = 0; i < steps.length; i++) if (steps[i] * 5 >= v) return steps[i] * 5 <= v * 1.02 ? steps[i] * 6 : steps[i] * 5; return Math.ceil(v / 1000) * 1000; }
  function chartSvg(c) {
    var W = 600, H = 340, L0 = 48, R0 = 14, T0 = 14, B0 = 74, pw = W - L0 - R0, ph = H - T0 - B0;
    var all = []; c.series.forEach(function (s) { all = all.concat(s.values); });
    var max = niceMax(Math.max.apply(null, all)), step = max / 5, h = "";
    h += '<svg class="chart" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(c.title) + '">';
    for (var t = 0; t <= 5; t++) {
      var y = T0 + ph - (t * step) / max * ph;
      h += '<line x1="' + L0 + '" x2="' + (W - R0) + '" y1="' + y + '" y2="' + y + '" stroke="rgba(238,242,247,.12)"/><text x="' + (L0 - 8) + '" y="' + (y + 4) + '" text-anchor="end" font-size="11" fill="#A9B8CB">' + (+(t * step).toFixed(1)) + "</text>";
    }
    h += '<text x="12" y="' + (T0 + ph / 2) + '" font-size="11" fill="#A9B8CB" transform="rotate(-90 12 ' + (T0 + ph / 2) + ')" text-anchor="middle">' + esc(c.unit) + "</text>";
    var n = c.labels.length, slot = pw / n;
    function lab(text, x) {
      var words = String(text).split(" "), lines = [], line = "";
      words.forEach(function (w) { if ((line + " " + w).trim().length > 12 && line) { lines.push(line); line = w; } else line = (line + " " + w).trim(); });
      lines.push(line);
      return lines.map(function (ln, i) { return '<text x="' + x + '" y="' + (T0 + ph + 16 + i * 13) + '" text-anchor="middle" font-size="11" fill="#C8D3E0">' + esc(ln) + "</text>"; }).join("");
    }
    if (c.type === "line") {
      c.labels.forEach(function (l, i) { h += lab(l, L0 + slot * i + slot / 2); });
      c.series.forEach(function (s, si) {
        var pts = s.values.map(function (v, i) { return [L0 + slot * i + slot / 2, T0 + ph - v / max * ph]; });
        h += '<polyline fill="none" stroke="' + CHART_COLS[si] + '" stroke-width="2.5" points="' + pts.map(function (p) { return p[0].toFixed(1) + "," + p[1].toFixed(1); }).join(" ") + '"/>';
        pts.forEach(function (p) { h += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="3.5" fill="' + CHART_COLS[si] + '"/>'; });
      });
    } else {
      var gw = slot * 0.72, bw = gw / c.series.length;
      c.labels.forEach(function (l, i) {
        var gx = L0 + slot * i + (slot - gw) / 2;
        c.series.forEach(function (s, si) {
          var v = s.values[i], bh = v / max * ph;
          h += '<rect x="' + (gx + bw * si + 1).toFixed(1) + '" y="' + (T0 + ph - bh).toFixed(1) + '" width="' + (bw - 2).toFixed(1) + '" height="' + bh.toFixed(1) + '" rx="2" fill="' + CHART_COLS[si] + '"/>';
        });
        h += lab(l, L0 + slot * i + slot / 2);
      });
    }
    h += '<line x1="' + L0 + '" x2="' + (W - R0) + '" y1="' + (T0 + ph) + '" y2="' + (T0 + ph) + '" stroke="#A9B8CB"/>';
    // legend
    var lx = L0, ly = H - 14;
    c.series.forEach(function (s, si) { h += '<rect x="' + lx + '" y="' + (ly - 9) + '" width="12" height="12" rx="2" fill="' + CHART_COLS[si] + '"/><text x="' + (lx + 17) + '" y="' + (ly + 1) + '" font-size="12" fill="#EEF2F7">' + esc(s.name) + "</text>"; lx += 30 + s.name.length * 7; });
    return '<figure class="chart-fig"><figcaption>' + esc(c.title) + "</figcaption>" + h + "</svg>" + tableFallback(c) + "</figure>";
  }
  function tableFallback(c) {
    return '<details class="chart-data"><summary>Show the data as a table</summary><div class="tb-wrap"><table class="tb"><thead><tr><th></th>' + c.labels.map(function (l) { return "<th>" + esc(l) + "</th>"; }).join("") + "</tr></thead><tbody>" +
      c.series.map(function (s) { return '<tr><th scope="row">' + esc(s.name) + "</th>" + s.values.map(function (v) { return "<td>" + v + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div></details>";
  }
  RENDER.chart = function (el, st) {
    var h = head(st) + chartSvg(st.chart);
    (st.p || []).forEach(function (x) { h += '<div class="tx">' + enText(x) + (S.arHelp ? help(x) : "") + "</div>"; });
    el.innerHTML = '<div class="en-block" lang="en" dir="ltr">' + h + "</div>"; fixArDir(el);
  };
  RENDER.models = function (el, st, l) {
    var models = st.models || l.models, tab = Math.min(1, models.length - 1);
    function draw() {
      var m = models[tab];
      el.innerHTML = '<div class="en-block"><h2>' + esc(st.h ? EN(st.h) : T(UI.modelsT)) + '</h2><p class="lp-sub">' + esc(T(UI.modelsSub)) + "</p>" +
        '<blockquote class="prompt" lang="en" dir="ltr">' + esc(st.prompt) + "</blockquote>" + (st.chart ? '<div lang="en" dir="ltr">' + chartSvg(st.chart) + "</div>" : "") +
        '<div class="md-tabs" role="tablist">' + models.map(function (x, k) { return '<button type="button" role="tab" class="md-tab" aria-selected="' + (k === tab) + '" data-md="' + k + '">' + esc(fmt(UI.bandTab, { b: x.band })) + "</button>"; }).join("") + "</div>" +
        '<div class="md" lang="en" dir="ltr"><p class="md-wc">' + wcount(m.text.join(" ")) + " words</p>" + m.text.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</div>" +
        '<div class="md-notes"><h3>' + esc(T(UI.notesT)) + "</h3><ul>" + m.notes.map(function (n) { return "<li>" + enText(n) + (S.arHelp ? help(n) : "") + "</li>"; }).join("") + "</ul></div>" +
        '<p class="cs-note">' + esc(T(UI.modelNote)) + "</p></div>";
      fixArDir(el);
    }
    draw();
    el.addEventListener("click", function (e) { var b = e.target.closest("[data-md]"); if (b) { tab = +b.getAttribute("data-md"); draw(); var t = $('[data-md="' + tab + '"]', el); if (t) t.focus(); } });
    return {};
  };

  // ================= writing pads, notes and statement builders =================
  var OVER = ["nowadays", "in this modern era", "in today's world", "since the dawn of time", "last but not least", "in a nutshell", "in my opinion, i think", "very very", "a lot of", "i would like to", "all in all", "it is known that",
    "ever since i was young", "ever since i was a child", "ever since i was little", "from a young age", "since childhood", "i have always been passionate", "my passion for", "my dream", "dream university", "i am a hard worker", "i am a hard-working", "thank you for considering", "in conclusion, i believe that i am the perfect"];
  function count(text, unit) { return unit === "chars" ? String(text || "").length : wcount(text); }
  function unitWord(n, unit) { return unit === "chars" ? fmt(UI.chars, { n: n }) : fmt(UI.wordsN, { n: n }); }
  function overHtml(text) {
    var low = String(text || "").toLowerCase(), found = OVER.filter(function (p) { return low.indexOf(p) > -1; });
    if (!String(text || "").trim()) return "";
    return "<b>" + esc(T(UI.over)) + ":</b> " + (found.length ? found.map(function (f) { return '<span class="es-chip" lang="en" dir="ltr">' + esc(f) + "</span>"; }).join(" ") : esc(T(UI.overNone)));
  }
  function drafts() { S.drafts = S.drafts || {}; return S.drafts; }
  function download(title, sections) {
    var html = '<html><head><meta charset="utf-8"><title>' + esc(title) + '</title></head><body style="font-family:Calibri,Arial,sans-serif;font-size:12pt;line-height:1.5">' +
      "<h1>" + esc(title) + "</h1>" + sections.map(function (s) { return (s[0] ? "<h2>" + esc(s[0]) + "</h2>" : "") + String(s[1] || "").split(/\n+/).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join(""); }).join("") + "</body></html>";
    var blob = new Blob(["﻿" + html], { type: "application/msword" }), a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = title.replace(/[^\w\- ]+/g, "").trim().replace(/\s+/g, "-").toLowerCase() + ".doc";
    document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
  }
  function copyText(text, btn) {
    try { navigator.clipboard.writeText(text).then(function () { var o = btn.textContent; btn.textContent = T(UI.copied); setTimeout(function () { btn.textContent = o; }, 1500); }); } catch (e) {}
  }
  // which kind of writing the coach should expect
  function coachKind(st) { var k = st.key || ""; return st.coach || (k === "task1" || /-t1$/.test(k) ? "task1" : /-t2$/.test(k) ? "task2" : /email/.test(k) ? "email" : "statement"); }
  // one writing box: counter, limits, timer, clichés, self-check
  RENDER.pad = function (el, st) {
    var D = drafts(), d = D[st.key] = D[st.key] || { text: "", checks: [] }, unit = st.unit || "words";
    var need = st.min ? Math.ceil(st.min * 0.6) : (unit === "chars" ? 100 : 20), running = false, left = d.left != null ? d.left : (st.mins || 0) * 60;
    el.innerHTML = '<div class="en-block"><h2 lang="en" dir="ltr">' + esc(EN(st.h)) + "</h2>" + (S.arHelp && Array.isArray(st.h) ? '<p class="ar-help ar-h" lang="ar" dir="rtl">' + esc(st.h[1]) + "</p>" : "") +
      (st.intro ? st.intro.map(function (x) { return '<div class="tx">' + enText(x) + (S.arHelp ? help(x) : "") + "</div>"; }).join("") : "") +
      (st.prompt ? '<blockquote class="prompt" lang="en" dir="ltr">' + esc(st.prompt) + "</blockquote>" : "") +
      (st.chart ? '<div lang="en" dir="ltr">' + chartSvg(st.chart) + "</div>" : "") +
      '<div class="es-bar">' + (st.mins ? '<button type="button" class="btn btn-ghost es-tm" data-tm>⏱ ' + esc(fmt(UI.timerN, { n: st.mins })) + '</button><span class="es-clock" data-clock></span><button type="button" class="es-link" data-tr>' + esc(T(UI.timerReset)) + "</button>" : "") +
      '<span class="lp-sp"></span><span class="es-wc" data-wc></span><button type="button" class="es-link" data-copy>' + esc(T(UI.copy)) + "</button></div>" +
      '<textarea class="es-pad" rows="' + (st.rows || 12) + '" lang="en" dir="ltr" spellcheck="true" aria-label="' + esc(EN(st.h)) + '">' + esc(d.text) + "</textarea>" +
      '<div class="es-over" data-over></div>' +
      (st.checks ? '<fieldset class="es-ck"><legend>' + esc(T(UI.checkT)) + "</legend>" + st.checks.map(function (x, k) { return '<label><input type="checkbox" data-ck="' + k + '"' + (d.checks[k] ? " checked" : "") + "><span>" + esc(T(x)) + "</span></label>"; }).join("") + "</fieldset>" : "") +
      '<p class="es-need" data-need></p>' + (st.noCoach ? "" : "<div data-coach></div>") + "</div>";
    fixArDir(el);
    var pad = $(".es-pad", el), wc = $("[data-wc]", el), over = $("[data-over]", el), nd = $("[data-need]", el);
    if (window.MasarokCoach && !st.noCoach) window.MasarokCoach.writingBox($("[data-coach]", el), function () { return pad.value; }, coachKind(st), Object.assign(unit === "chars" ? { min: 0, max: 0 } : { min: st.min, max: st.max }, { prompt: st.prompt, meta: { course: EN(st.h), limit: st.max ? st.max + " " + unit + " maximum" : st.min ? st.min + "+ " + unit : "" } }));
    function upd() {
      var n = count(pad.value, unit);
      var lim = st.min && st.max ? " / " + st.min + "–" + st.max : st.max ? " / " + st.max : st.min ? " / " + st.min + "+" : "";
      wc.textContent = unitWord(n, unit) + lim;
      wc.classList.toggle("is-ok", (!st.min || n >= st.min) && (!st.max || n <= st.max) && n > 0);
      wc.classList.toggle("is-over", !!st.max && n > st.max);
      over.innerHTML = overHtml(pad.value);
      nd.textContent = n < need ? fmt(UI.needN, { n: need, u: unitWord(need, unit) }) : st.max && n > st.max ? fmt(UI.overMax, { m: unitWord(st.max, unit) }) : "";
      d.text = pad.value; save(); gateUpdate();
    }
    pad.addEventListener("input", upd);
    el.addEventListener("change", function (e) { var k = e.target.getAttribute("data-ck"); if (k != null) { d.checks[k] = e.target.checked; save(); } });
    $("[data-copy]", el).addEventListener("click", function (e) { copyText(pad.value, e.currentTarget); });
    if (st.mins) {
      var tm = $("[data-tm]", el), ck = $("[data-clock]", el);
      var show = function () { var m = Math.floor(left / 60), s2 = left % 60; ck.textContent = (m < 10 ? "0" : "") + m + ":" + (s2 < 10 ? "0" : "") + s2; ck.classList.toggle("is-low", left <= 180); };
      tm.addEventListener("click", function () {
        if (running) { running = false; clearInterval(timerId); tm.textContent = "⏱ " + fmt(UI.timerN, { n: st.mins }); return; }
        running = true; tm.textContent = "⏸ " + T(UI.timerPause); clearInterval(timerId);
        timerId = setInterval(function () { left = Math.max(0, left - 1); d.left = left; show(); if (!left) { clearInterval(timerId); running = false; nd.textContent = T(UI.timeUp); save(); } }, 1000);
      });
      $("[data-tr]", el).addEventListener("click", function () { clearInterval(timerId); running = false; left = st.mins * 60; d.left = left; show(); tm.textContent = "⏱ " + fmt(UI.timerN, { n: st.mins }); save(); });
      show();
    }
    upd();
    return { gate: function () { return count(pad.value, unit) >= need; }, leave: function () { clearInterval(timerId); } };
  };
  // brainstorm notes: one box per prompt
  RENDER.notes = function (el, st) {
    var D = drafts(), d = D[st.key] = D[st.key] || [];
    el.innerHTML = '<div class="en-block">' + head(st) + '<p class="lp-sub">' + esc(T(UI.notesSub)) + '</p><div class="ol">' + st.prompts.map(function (p, k) {
      return '<label class="ol-f"><span><span lang="en" dir="ltr">' + esc(EN(p)) + "</span>" + (S.arHelp && Array.isArray(p) ? '<small class="ar-help" lang="ar" dir="rtl">' + esc(p[1]) + "</small>" : "") + '</span><textarea rows="2" lang="en" dir="auto" data-nt="' + k + '">' + esc(d[k] || "") + "</textarea></label>";
    }).join("") + "</div></div>";
    fixArDir(el);
    el.addEventListener("input", function (e) { var k = e.target.getAttribute("data-nt"); if (k != null) { d[k] = e.target.value; save(); gateUpdate(); } });
    return { gate: function () { return d.filter(function (x) { return x && x.trim().length >= 10; }).length >= 2; } };
  };
  // a statement in several boxes, with limits per box and in total, copy and download
  RENDER.builder = function (el, st) {
    var D = drafts(), d = D[st.key] = D[st.key] || {}, tot = st.total || {}, unit = tot.unit || (st.fields[0] && st.fields[0].unit) || "words";
    el.innerHTML = '<div class="en-block">' + head(st) +
      (st.intro ? st.intro.map(function (x) { return '<div class="tx">' + enText(x) + (S.arHelp ? help(x) : "") + "</div>"; }).join("") : "") +
      '<div class="bd">' + st.fields.map(function (f) {
        return '<div class="bd-f" data-bf="' + f.id + '"><label for="bf-' + f.id + '"><b lang="en" dir="ltr">' + esc(EN(f.label)) + "</b>" + (S.arHelp && Array.isArray(f.label) ? '<small class="ar-help" lang="ar" dir="rtl">' + esc(f.label[1]) + "</small>" : "") + "</label>" +
          (f.hint ? '<p class="bd-hint" lang="en" dir="ltr">' + esc(EN(f.hint)) + "</p>" + (S.arHelp ? help(f.hint) : "") : "") +
          '<textarea id="bf-' + f.id + '" class="es-pad" rows="' + (f.rows || 5) + '" lang="en" dir="ltr" spellcheck="true">' + esc(d[f.id] || "") + '</textarea><span class="bd-n es-wc" data-bn="' + f.id + '"></span></div>';
      }).join("") + "</div>" +
      '<div class="bd-tot"><span data-btot></span><span class="lp-sp"></span><button type="button" class="es-link" data-bcopy>' + esc(T(UI.copyAll)) + '</button><button type="button" class="btn btn-ghost" data-bdl>⬇ ' + esc(T(UI.download)) + "</button></div>" +
      '<div class="es-over" data-over></div><div data-coach></div></div>';
    fixArDir(el);
    if (window.MasarokCoach) window.MasarokCoach.writingBox($("[data-coach]", el), function () { return all(); }, st.coach || "statement", { min: 0, max: 0, aiText: function () { return st.fields.map(function (f) { return d[f.id] ? EN(f.label) + "\n" + d[f.id] : ""; }).filter(Boolean).join("\n\n"); }, meta: { course: st.export || EN(st.h), limit: tot.max ? tot.max + " " + (tot.unit || unit) + " in total" : "" } });
    function all() { return st.fields.map(function (f) { return d[f.id] || ""; }).join("\n\n"); }
    function upd() {
      var sum = 0;
      st.fields.forEach(function (f) {
        var n = count(d[f.id], f.unit || unit), out = $('[data-bn="' + f.id + '"]', el); sum += n;
        var lim = f.min && f.max ? " (" + f.min + "–" + f.max + ")" : f.max ? " (max " + f.max + ")" : f.min ? " (min " + f.min + ")" : "";
        out.textContent = unitWord(n, f.unit || unit) + lim;
        out.classList.toggle("is-ok", n > 0 && (!f.min || n >= f.min) && (!f.max || n <= f.max));
        out.classList.toggle("is-over", !!f.max && n > f.max);
      });
      var bt = $("[data-btot]", el);
      bt.textContent = T(UI.total) + ": " + unitWord(tot.unit === "chars" ? all().replace(/\n\n/g, "").length : sum, unit) + (tot.max ? " / " + tot.max : "");
      bt.className = "es-wc" + (tot.max && sum > tot.max ? " is-over" : "");
      $("[data-over]", el).innerHTML = overHtml(all());
      gateUpdate();
    }
    el.addEventListener("input", function (e) { var f = e.target.closest("[data-bf]"); if (f) { d[f.getAttribute("data-bf")] = e.target.value; save(); upd(); } });
    $("[data-bcopy]", el).addEventListener("click", function (e) { copyText(all(), e.currentTarget); });
    $("[data-bdl]", el).addEventListener("click", function () { download(st.export || EN(st.h), st.fields.map(function (f) { return [EN(f.label), d[f.id] || ""]; })); });
    upd();
    return { gate: function () { return st.fields.filter(function (f) { return (d[f.id] || "").trim().length >= 20; }).length >= Math.ceil(st.fields.length / 2); } };
  };

  // ================= speaking practice: questions with a recorder =================
  var canRecord = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
  // a record button with a countdown; falls back to a timer when recording isn't possible
  function recorder(box, secs, onDone, task) {
    var MC = window.MasarokCoach, lis = null, t0 = 0;
    box.innerHTML = '<div class="sp-row"><button type="button" class="btn btn-primary" data-r>' + (canRecord ? "⏺ " + esc(T(UI.recGo)) : "⏱ " + esc(fmt(UI.speakFor, { n: secs }))) + '</button><span class="sp-clock" data-rc>' + Math.floor(secs / 60) + ":" + ("0" + secs % 60).slice(-2) + '</span></div><div data-pb></div><p class="sp-msg" data-rm></p>' +
      (MC && canRecord ? MC.speechToggle() + "<div data-co-spk></div>" : "");
    var b = $("[data-r]", box), c = $("[data-rc]", box), stop = null;
    function countdown() { stop = clock(secs, c, function () { if (canRecord) stopRec(); else { b.disabled = false; onDone && onDone(); } }); }
    b.addEventListener("click", function () {
      if (!canRecord) { b.disabled = true; countdown(); return; }
      if (rec.mr && rec.mr.state === "recording") { stopRec(); return; }
      navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
        rec.stream = stream; rec.chunks = [];
        var mr = rec.mr = new MediaRecorder(stream);
        mr.ondataavailable = function (e) { if (e.data && e.data.size) rec.chunks.push(e.data); };
        mr.onstop = function () {
          if (stop) stop();
          var url = URL.createObjectURL(new Blob(rec.chunks, { type: mr.mimeType || "audio/webm" }));
          $("[data-pb]", box).innerHTML = '<audio controls src="' + url + '"></audio>';
          if (lis) { var L1 = lis; lis = null; L1.finish(Math.round((Date.now() - t0) / 1000), function (r1) { MC.speechReport($("[data-co-spk]", box), MC.speech(r1.text, r1.secs, Math.round(secs * 0.6)), task); }); }
          b.textContent = "⏺ " + T(UI.recAgain); b.classList.remove("is-rec");
          try { stream.getTracks().forEach(function (t) { t.stop(); }); } catch (e) {}
          rec.stream = null; onDone && onDone();
        };
        mr.start(); t0 = Date.now(); lis = MC ? MC.listen() : null; var sb = $("[data-co-spk]", box); if (sb) sb.innerHTML = "";
        b.textContent = "⏹ " + T(UI.recStop); b.classList.add("is-rec"); countdown();
      }).catch(function () { $("[data-rm]", box).textContent = T(UI.micDenied); canRecord = false; b.textContent = "⏱ " + fmt(UI.speakFor, { n: secs }); });
    });
  }
  RENDER.qa = function (el, st) {
    var answered = 0, set = null, qi = 0;
    function pick() {
      el.innerHTML = '<div class="en-block">' + head(st) + '<p class="lp-sub">' + esc(fmt(UI.qaSub, { n: st.secs })) + '</p><div class="cc-pick">' + st.sets.map(function (s2, k) {
        return '<button type="button" class="cc-btn" data-set="' + k + '" lang="en" dir="ltr"><b>' + esc(s2.topic) + "</b><small> · " + s2.qs.length + " questions</small></button>";
      }).join("") + '</div><p class="cs-note">' + esc(fmt(UI.answeredN, { n: answered })) + "</p></div>";
      fixArDir(el);
    }
    function show() {
      var q = set.qs[qi];
      el.innerHTML = '<div class="en-block">' + head(st) + '<p class="lp-n">' + esc(set.topic) + " · " + (qi + 1) + "/" + set.qs.length + '</p><div class="qa-q" lang="en" dir="ltr">🗣️ ' + esc(q) + "</div>" +
        '<div data-recbox></div><div class="sp-row"><button type="button" class="btn btn-ghost" data-qnext>' + esc(T(qi < set.qs.length - 1 ? UI.nextQ : UI.otherTopic)) + "</button></div>" +
        '<p class="cs-note">' + esc(fmt(UI.answeredN, { n: answered })) + " · " + esc(T(UI.private)) + "</p></div>";
      fixArDir(el);
      recorder($("[data-recbox]", el), st.secs, function () { answered++; gateUpdate(); }, q);
    }
    el.addEventListener("click", function (e) {
      var b = e.target.closest("[data-set]"); if (b) { set = st.sets[+b.getAttribute("data-set")]; qi = 0; show(); return; }
      if (e.target.closest("[data-qnext]")) { stopRec(true); clearTimers(); if (qi < set.qs.length - 1) { qi++; show(); } else pick(); }
    });
    pick();
    return { gate: function () { return answered >= 3; }, leave: function () { stopRec(true); clearTimers(); } };
  };

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
      }).join("") + '</fieldset><p class="es-need" data-need></p><div data-coach></div></div>';
    var pad = $(".es-pad", el), wc = $("[data-wc]", el), over = $("[data-over]", el), need = $("[data-need]", el), clock = $("[data-clock]", el), tm = $("[data-tm]", el);
    if (window.MasarokCoach) window.MasarokCoach.writingBox($("[data-coach]", el), function () { return pad.value; }, "task2", { prompt: st.prompt });
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
      var rb = $("[data-rec]", el), MC = window.MasarokCoach, lis = null, t0 = 0;
      if (rb && MC) { var pbx = $("[data-play-box]", el); pbx.insertAdjacentHTML("afterend", MC.speechToggle() + "<div data-co-spk></div>"); }
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
            if (lis) { var L2 = lis; lis = null; L2.finish(Math.round((Date.now() - t0) / 1000), function (r2) { MC.speechReport($("[data-co-spk]", el), MC.speech(r2.text, r2.secs, 90), card.title); }); }
            rb.textContent = "⏺ " + T(UI.recAgain); rb.classList.remove("is-rec");
            did = true; gateUpdate();
            try { stream.getTracks().forEach(function (t) { t.stop(); }); } catch (e) {}
            rec.stream = null;
          };
          mr.start(); t0 = Date.now(); lis = MC ? MC.listen() : null; var cs = $("[data-co-spk]", el); if (cs) cs.innerHTML = "";
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

  // ================= full mock test =================
  // approximate raw-score-to-band conversions widely used for IELTS Academic practice
  var L_BANDS = [[39, 9], [37, 8.5], [35, 8], [32, 7.5], [30, 7], [26, 6.5], [23, 6], [18, 5.5], [16, 5], [13, 4.5], [10, 4], [0, 3.5]];
  var R_BANDS = [[39, 9], [37, 8.5], [35, 8], [33, 7.5], [30, 7], [27, 6.5], [23, 6], [19, 5.5], [15, 5], [13, 4.5], [10, 4], [0, 3.5]];
  function toBand(raw, table) { for (var i = 0; i < table.length; i++) if (raw >= table[i][0]) return table[i][1]; return 3.5; }
  var CRIT = {
    w: [
      [["Task response", "الاستجابة للمهمة"], [["I missed part of a task or went off topic", "أغفلت جزءًا من مهمة أو خرجت عن الموضوع"], ["I answered both tasks, but some ideas were thin", "أجبت عن المهمتين لكن بعض الأفكار ضعيفة"], ["Clear overview and position, ideas developed with examples", "نظرة عامة ورأي واضحان، وأفكار مطوّرة بأمثلة"], ["Fully answered, well developed and precise", "إجابة كاملة ومطوّرة ودقيقة"]]],
      [["Coherence and cohesion", "الترابط والتماسك"], [["Ideas jump around; paragraphs are unclear", "الأفكار مشتتة والفقرات غير واضحة"], ["Organised, but linking is repetitive", "منظم لكن الربط متكرر"], ["Logical paragraphs with varied linking", "فقرات منطقية بأدوات ربط متنوعة"], ["Smooth, natural flow throughout", "تدفق سلس وطبيعي في كل النص"]]],
      [["Vocabulary", "المفردات"], [["Basic words, many errors", "كلمات بسيطة وأخطاء كثيرة"], ["Enough words, some repetition and errors", "مفردات كافية مع تكرار وبعض الأخطاء"], ["Good range, some less common words", "تنوع جيد وبعض الكلمات الأقل شيوعًا"], ["Wide, precise and natural", "واسعة ودقيقة وطبيعية"]]],
      [["Grammar", "القواعد"], [["Mostly simple sentences, frequent errors", "جمل بسيطة غالبًا وأخطاء متكررة"], ["Simple and complex sentences, errors noticeable", "جمل بسيطة ومركبة مع أخطاء ملحوظة"], ["Many error-free complex sentences", "كثير من الجمل المركبة دون أخطاء"], ["Wide range, rare errors", "تنوع واسع وأخطاء نادرة"]]]],
    s: [
      [["Fluency and coherence", "الطلاقة والترابط"], [["Long pauses, very short answers", "توقفات طويلة وإجابات قصيرة جدًا"], ["I kept going, but hesitated and repeated myself", "استمررت لكني ترددت وكررت"], ["I spoke at length with some hesitation", "تحدثت مطولًا مع بعض التردد"], ["Fluent, I rarely hesitated", "بطلاقة ونادرًا ما ترددت"]]],
      [["Vocabulary", "المفردات"], [["I often couldn't find the word", "كثيرًا ما لم أجد الكلمة"], ["Enough to talk about the topics", "كافية للحديث عن المواضيع"], ["Some less common words and natural phrases", "بعض الكلمات الأقل شيوعًا والعبارات الطبيعية"], ["Wide and precise, with idiomatic phrases", "واسعة ودقيقة مع عبارات اصطلاحية"]]],
      [["Grammar", "القواعد"], [["Mostly short, simple sentences with errors", "جمل قصيرة بسيطة غالبًا مع أخطاء"], ["Some complex sentences, errors noticeable", "بعض الجمل المركبة مع أخطاء ملحوظة"], ["A range of structures, mostly accurate", "تراكيب متنوعة ودقيقة غالبًا"], ["Wide range, almost always accurate", "تنوع واسع ودقة شبه دائمة"]]],
      [["Pronunciation", "النطق"], [["Hard to understand at times", "صعب الفهم أحيانًا"], ["Generally clear, some words mispronounced", "واضح عمومًا مع بعض الكلمات غير الصحيحة"], ["Easy to understand, good stress and rhythm", "سهل الفهم مع نبرة وإيقاع جيدين"], ["Clear and natural throughout", "واضح وطبيعي طوال الوقت"]]]]
  };
  var CRIT_BAND = [5, 6, 7, 8];
  RENDER.mock = function (el, st, l) {
    var M = l.mock, id = l.id, stage = "intro", ans = { L: {}, R: {} }, lPart = 0, rPass = 0, wTask = 0, sPart = 0, finished = false, self = { w: [], s: [] };
    var lEntries = [], rEntries = [], n = 1;
    M.listening.forEach(function (p, i) { p.start = n; lEntries.push(entries(p)); n += lEntries[i].length; });
    n = 1; M.reading.forEach(function (p, i) { p.start = n; rEntries.push(entries(p)); n += rEntries[i].length; });
    var wKey = function (k) { return id + "-" + k; };
    // one 60-minute clock each for Reading and Writing; it keeps running when you switch passages or tasks
    var left = { R: 3600, W: 3600 }, tick = null;
    function secClock(k) {
      function show() { var c = $("[data-mclock]", el); if (!c) return; var m = Math.floor(left[k] / 60), s2 = left[k] % 60; c.textContent = "⏱ " + (m < 10 ? "0" : "") + m + ":" + (s2 < 10 ? "0" : "") + s2; c.classList.toggle("is-low", left[k] <= 300); }
      show();
      if (tick && tick.k === k) return;
      if (tick) clearInterval(tick.id);
      tick = { k: k, id: setInterval(function () { left[k] = Math.max(0, left[k] - 1); show(); if (!left[k]) { clearInterval(tick.id); var m = $(".lp-msg"); if (m) m.textContent = T(UI.timeUpCheck); } }, 1000) };
    }
    function stopSec() { if (tick) { clearInterval(tick.id); tick = null; } }
    function bar(title, clockOn) { return '<div class="mk-bar" lang="en" dir="ltr"><b>' + esc(title) + "</b>" + (clockOn ? '<span class="ps-clock" data-mclock></span>' : "") + "</div>"; }
    function save1(list, store, root) { list.forEach(function (e) { var node = $('[data-qn="' + e.n + '"]', root); if (node) store[e.n] = readVal(node, e.it); }); }
    function draw() {
      try { tts && tts.cancel(); } catch (e) {}
      if (stage === "intro") {
        el.innerHTML = '<div class="en-block"><h2>' + esc(T(UI.mkT)) + '</h2><ul class="tx-list">' + UI.mkSteps.map(function (x) { return "<li>" + esc(T(x)) + "</li>"; }).join("") + '</ul><button type="button" class="btn btn-primary" data-mgo="L">' + esc(T(UI.mkStart)) + "</button></div>";
      } else if (stage === "L") {
        var p = M.listening[lPart];
        el.innerHTML = '<div class="en-block" lang="en" dir="ltr">' + bar("Listening · Part " + (lPart + 1) + " of 4", false) +
          listenBlock(p, "mL" + lPart + "-", p.plays || 1) + '<div class="sp-row"><button type="button" class="btn btn-primary" data-mnext>' + esc(EN(lPart < 3 ? UI.mkNextPart : UI.mkSubmitL)) + "</button></div></div>";
        fixArDir(el); wirePlay(el, p, p.plays || 1);
        lEntries[lPart].forEach(function (e) { setVal($('[data-qn="' + e.n + '"]', el), e.it, ans.L[e.n]); });
      } else if (stage === "R") {
        el.innerHTML = '<div class="en-block" lang="en" dir="ltr">' + bar("Reading · 60 minutes", true) +
          '<div class="md-tabs" role="tablist">' + M.reading.map(function (p, i) { return '<button type="button" role="tab" class="md-tab" aria-selected="' + (i === rPass) + '" data-rp="' + i + '">Passage ' + (i + 1) + "</button>"; }).join("") + "</div>" +
          M.reading.map(function (p, i) { return '<div class="mk-pass" data-pass="' + i + '"' + (i === rPass ? "" : " hidden") + ">" + passageBlock(p, "mR" + i + "-") + "</div>"; }).join("") +
          '<div class="sp-row"><button type="button" class="btn btn-primary" data-mnext>' + esc(EN(UI.mkSubmitR)) + "</button></div></div>";
        fixArDir(el);
        rEntries.forEach(function (list) { list.forEach(function (e) { setVal($('[data-qn="' + e.n + '"]', el), e.it, ans.R[e.n]); }); });
        secClock("R");
      } else if (stage === "W") {
        var W = M.writing, t = wTask === 0 ? W.task1 : W.task2;
        el.innerHTML = '<div class="en-block">' + bar("Writing · 60 minutes", true) +
          '<div class="md-tabs" role="tablist"><button type="button" role="tab" class="md-tab" aria-selected="' + (wTask === 0) + '" data-wt="0">Task 1 · 150+ words</button><button type="button" role="tab" class="md-tab" aria-selected="' + (wTask === 1) + '" data-wt="1">Task 2 · 250+ words</button></div>' +
          '<div data-wpad></div><div class="sp-row"><button type="button" class="btn btn-primary" data-mnext>' + esc(T(UI.mkSubmitW)) + "</button></div></div>";
        RENDER.pad($("[data-wpad]", el), { key: wKey(wTask === 0 ? "t1" : "t2"), h: wTask === 0 ? ["Writing Task 1", "الكتابة، المهمة 1"] : ["Writing Task 2", "الكتابة، المهمة 2"], prompt: t.prompt, chart: t.chart, min: wTask === 0 ? 150 : 250, unit: "words", rows: 12, noCoach: true });
        secClock("W");
      } else if (stage === "S") {
        var Sp = M.speaking, h = '<div class="en-block">' + bar(["Speaking · Part 1", "Speaking · Part 2", "Speaking · Part 3"][sPart], false);
        if (sPart === 0) h += '<p class="lp-sub">' + esc(T(UI.mkS1)) + "</p>" + Sp.p1.map(function (s2) { return '<div class="mk-qs" lang="en" dir="ltr"><b>' + esc(s2.topic) + "</b><ul>" + s2.qs.map(function (q) { return "<li>" + esc(q) + "</li>"; }).join("") + "</ul></div>"; }).join("") + '<div data-recbox></div>';
        if (sPart === 1) h += '<div class="cue" lang="en" dir="ltr"><b>' + esc(Sp.card.title) + "</b><p>You should say:</p><ul>" + Sp.card.points.map(function (p2) { return "<li>" + esc(p2) + "</li>"; }).join("") + "</ul><p>" + esc(Sp.card.explain) + '</p></div><p class="lp-sub">' + esc(T(UI.mkS2)) + '</p><div class="sp-row"><button type="button" class="btn btn-ghost" data-prep>⏱ ' + esc(T(UI.prepGo)) + '</button><span class="sp-clock" data-pclock>1:00</span></div><div data-recbox></div>';
        if (sPart === 2) h += '<p class="lp-sub">' + esc(T(UI.mkS3)) + '</p><ul class="tx-list" lang="en" dir="ltr">' + Sp.card.p3.map(function (q) { return "<li>" + esc(q) + "</li>"; }).join("") + '</ul><div data-recbox></div>';
        h += '<div class="sp-row"><button type="button" class="btn btn-primary" data-mnext>' + esc(T(sPart < 2 ? UI.mkNextSp : UI.mkSubmitS)) + "</button></div><p class=\"cs-note\">" + esc(T(UI.private)) + "</p></div>";
        el.innerHTML = h; fixArDir(el);
        recorder($("[data-recbox]", el), [300, 120, 300][sPart]);
        var pb = $("[data-prep]", el); if (pb) pb.addEventListener("click", function () { clock(60, $("[data-pclock]", el)); });
      } else if (stage === "mark") {
        el.innerHTML = '<div class="en-block"><h2>' + esc(T(UI.mkMarkT)) + '</h2><p class="lp-sub">' + esc(T(UI.mkMarkSub)) + "</p>" +
          ["w", "s"].map(function (sk) {
            return "<h3>" + esc(T(sk === "w" ? UI.skills.w : UI.skills.s)) + "</h3>" + CRIT[sk].map(function (c, ci) {
              return '<fieldset class="q sf"><legend>' + esc(T(c[0])) + '</legend><div class="q-os">' + c[1].map(function (o, oi) {
                return '<label class="q-o"><input type="radio" name="mk' + sk + ci + '" value="' + oi + '"' + (self[sk][ci] === oi ? " checked" : "") + "><span>" + esc(T(o)) + "</span></label>";
              }).join("") + "</div></fieldset>";
            }).join("");
          }).join("") + mockCoach() + '<button type="button" class="btn btn-primary" data-mres>' + esc(T(UI.mkSee)) + "</button></div>";
        el.addEventListener("change", onSelf);
      } else if (stage === "res") {
        var m2 = S.mocks[id];
        el.innerHTML = '<div class="en-block"><h2>' + esc(T(UI.mkResT)) + '</h2><div class="pl-card"><div class="pl-top"><div class="pl-ov"><small>' + esc(T(UI.estMock)) + "</small><b>" + bandStr(m2.o) + "</b><span>" + esc(T(UI.overall)) + '</span></div><div class="pl-bars">' +
          [["l", m2.bL, m2.l + "/40"], ["r", m2.bR, m2.r + "/40"], ["w", m2.bW, ""], ["s", m2.bS, ""]].map(function (k) {
            return '<div class="pl-b"><span>' + esc(T(UI.skills[k[0]])) + '</span><i><b style="width:' + Math.max(8, (k[1] - 3) / 6 * 100) + '%"></b></i><em>' + bandStr(k[1]) + "</em></div>" + (k[2] ? '<small class="mk-raw">' + k[2] + "</small>" : "");
          }).join("") + "</div></div><p class=\"pl-note\">" + esc(T(UI.mkNote)) + "</p></div>" +
          '<details class="mk-rev"><summary>' + esc(T(UI.mkRevL)) + "</summary>" + review(M.listening, lEntries, ans.L) + "</details>" +
          '<details class="mk-rev"><summary>' + esc(T(UI.mkRevR)) + "</summary>" + review(M.reading, rEntries, ans.R) + "</details></div>";
        fixArDir(el);
      }
      gateUpdate();
      // during the test the lesson buttons are hidden so nobody leaves halfway by accident
      var acts = $(".lp-acts"); if (acts) acts.hidden = stage !== "intro" && stage !== "res";
      var hh = $("h2", el) || $(".mk-bar b", el); if (hh) { hh.setAttribute("tabindex", "-1"); hh.focus({ preventScroll: true }); }
      window.scrollTo(0, 0);
    }
    function review(parts, ents, store) {
      return parts.map(function (p, pi) {
        var ctx = { heads: p.heads, spots: p.map && p.map.spots };
        return '<div class="mk-rv" lang="en" dir="ltr">' + ents[pi].map(function (e) {
          var v = store[e.n], ok = isRight(e.it, v), q = kindOf(e.it) === "form" ? e.it.l : kindOf(e.it) === "head" ? "Paragraph " + e.it.p : EN(e.it.s);
          return '<div class="mk-r ' + (ok ? "is-ok" : "is-no") + '"><b>' + e.n + ". " + (ok ? "✓" : "✕") + "</b> " + esc(q) + "<br><small>Your answer: " + esc(valText(e.it, v, ctx)) + (ok ? "" : " · Answer: " + esc(answerText(e.it, ctx))) + "</small>" +
            '<small class="mk-x">' + esc(EN(e.it.x)) + "</small>" + (S.arHelp && Array.isArray(e.it.x) ? '<small class="ar-help" lang="ar" dir="rtl">' + esc(e.it.x[1]) + "</small>" : "") + "</div>";
        }).join("") + "</div>";
      }).join("");
    }
    // the free coach's notes on both essays, to help an honest self-rating
    function mockCoach() {
      var MC = window.MasarokCoach, D = drafts(); if (!MC) return "";
      return [["t1", "task1", "Task 1"], ["t2", "task2", "Task 2"]].map(function (x) {
        var t = (D[wKey(x[0])] || {}).text || ""; if (wcount(t) < 40) return "";
        return '<details class="co-mk"><summary>🧭 ' + esc(T(UI.mkCoach)) + " · " + x[2] + "</summary>" + MC.writingHtml(MC.writing(t, x[1])) + "</details>";
      }).join("");
    }
    function onSelf(e) { var nm = e.target.name || ""; if (nm.indexOf("mk") === 0) self[nm.charAt(2)][+nm.slice(3)] = +e.target.value; }
    function score(store, ents) { var c = 0; ents.forEach(function (list) { list.forEach(function (e) { if (isRight(e.it, store[e.n])) c++; }); }); return c; }
    function finish() {
      var lRaw = score(ans.L, lEntries), rRaw = score(ans.R, rEntries);
      function avg(a) { var v = a.map(function (x) { return CRIT_BAND[x]; }); return Math.round(v.reduce(function (s2, x) { return s2 + x; }, 0) / v.length * 2) / 2; }
      var bL = toBand(lRaw, L_BANDS), bR = toBand(rRaw, R_BANDS), bW = avg(self.w), bS = avg(self.s);
      S.mocks = S.mocks || {};
      S.mocks[id] = { l: lRaw, r: rRaw, bL: bL, bR: bR, bW: bW, bS: bS, o: Math.round((bL + bR + bW + bS) / 4 * 2) / 2, at: Date.now() };
      save(); finished = true; stage = "res"; draw();
    }
    el.addEventListener("click", function (e) {
      var t = e.target;
      if (t.closest("[data-mgo]")) { stage = "L"; lPart = 0; draw(); return; }
      var rp = t.closest("[data-rp]");
      if (rp) { rPass = +rp.getAttribute("data-rp"); $$("[data-pass]", el).forEach(function (d) { d.hidden = +d.getAttribute("data-pass") !== rPass; }); $$("[data-rp]", el).forEach(function (b) { b.setAttribute("aria-selected", String(+b.getAttribute("data-rp") === rPass)); }); window.scrollTo(0, 0); return; }
      var wt = t.closest("[data-wt]"); if (wt) { wTask = +wt.getAttribute("data-wt"); draw(); return; }
      if (t.closest("[data-mres]")) {
        if (self.w.filter(function (x) { return x != null; }).length < 4 || self.s.filter(function (x) { return x != null; }).length < 4) { var m = $(".lp-msg"); if (m) m.textContent = T(UI.answerAll); return; }
        finish(); return;
      }
      if (!t.closest("[data-mnext]")) return;
      if (stage === "L") { save1(lEntries[lPart], ans.L, el); if (lPart < 3) { lPart++; draw(); } else { stage = "R"; draw(); } return; }
      if (stage === "R") { rEntries.forEach(function (list) { save1(list, ans.R, el); }); stopSec(); stage = "W"; wTask = 0; draw(); return; }
      if (stage === "W") { stopSec(); stage = "S"; sPart = 0; draw(); return; }
      if (stage === "S") { stopRec(true); clearTimers(); if (sPart < 2) { sPart++; draw(); } else { stage = "mark"; draw(); } }
    });
    draw();
    return { gate: function () { return finished; }, leave: function () { stopSec(); clearTimers(); stopRec(true); try { tts && tts.cancel(); } catch (e) {} } };
  };

  // ================= Phase 3 exercise types =================
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function intro(st) { return (st.intro || []).map(function (x) { return '<div class="tx">' + enText(x) + (S.arHelp ? help(x) : "") + "</div>"; }).join(""); }
  function both(x) { return "<span>" + esc(EN(x)) + "</span>" + (S.arHelp && Array.isArray(x) && x[1] ? '<small class="ar-help" lang="ar" dir="rtl">' + esc(x[1]) + "</small>" : ""); }

  // put the steps in the right order with up and down buttons
  RENDER.order = function (el, st) {
    var cur2 = shuffle(st.items.map(function (x, i) { return i; }));
    if (cur2.every(function (v, i) { return v === i; })) cur2.reverse();
    var checked = false;
    function draw() {
      el.innerHTML = '<div class="en-block">' + head(st) + intro(st) + '<p class="lp-sub">' + esc(T(UI.orderSub)) + '</p><ol class="od">' + cur2.map(function (ix, p) {
        var cls = checked ? (ix === p ? " is-right" : " is-wrong") : "";
        return '<li class="od-i' + cls + '"><span class="od-n">' + (p + 1) + '</span><span class="od-t" lang="en" dir="ltr">' + both(st.items[ix]) + "</span>" +
          (checked ? "" : '<span class="od-b"><button type="button" class="od-mv" data-mv="' + p + ':-1" aria-label="' + esc(T(UI.moveUp)) + '"' + (p === 0 ? " disabled" : "") + '>↑</button><button type="button" class="od-mv" data-mv="' + p + ':1" aria-label="' + esc(T(UI.moveDown)) + '"' + (p === cur2.length - 1 ? " disabled" : "") + ">↓</button></span>") + "</li>";
      }).join("") + "</ol>" +
        (checked ? '<div class="od-ans"><b>' + esc(T(UI.rightOrder)) + '</b><ol>' + st.items.map(function (x) { return '<li lang="en" dir="ltr">' + both(x) + "</li>"; }).join("") + "</ol>" + (st.x ? '<div class="tx">' + enText(st.x) + (S.arHelp ? help(st.x) : "") + "</div>" : "") + "</div>" : "") + "</div>";
      fixArDir(el);
    }
    el.addEventListener("click", function (e) {
      var b = e.target.closest("[data-mv]"); if (!b) return;
      var a = b.getAttribute("data-mv").split(":"), p = +a[0], d = +a[1], t = cur2[p]; cur2[p] = cur2[p + d]; cur2[p + d] = t; draw();
      var nb = $('[data-mv="' + (p + d) + ":" + d + '"]', el) || $('[data-mv="' + (p + d) + ":" + (-d) + '"]', el); if (nb) nb.focus();
    });
    draw();
    return { check: function () { checked = true; var c = cur2.filter(function (v, i) { return v === i; }).length; draw(); return { c: c, t: cur2.length }; } };
  };

  // document detective: tap the lines that look wrong
  RENDER.spot = function (el, st) {
    var flags = {}, checked = false, d = st.doc;
    function rowHtml(r, i) {
      var f = !!flags[i], res = "";
      if (checked) {
        var cls = r[2] ? (f ? "is-right" : "is-miss") : (f ? "is-wrong" : "");
        res = cls ? '<div class="dd-x ' + cls + '"><b dir="auto">' + esc(T(r[2] ? (f ? UI.spotRight : UI.spotMissed) : UI.spotFine)) + "</b>" + (r[3] ? " " + esc(EN(r[3])) + (S.arHelp && Array.isArray(r[3]) ? '<small class="ar-help" lang="ar" dir="rtl">' + esc(r[3][1]) + "</small>" : "") : "") + "</div>" : "";
        return '<div class="dd-row ' + cls + '"><div class="dd-k">' + esc(r[0]) + '</div><div class="dd-v">' + esc(r[1]) + "</div>" + res + "</div>";
      }
      return '<button type="button" class="dd-row" data-sp="' + i + '" aria-pressed="' + f + '"><span class="dd-k">' + esc(r[0]) + '</span><span class="dd-v">' + esc(r[1]) + '</span><span class="dd-flag" aria-hidden="true">' + (f ? "🚩" : "") + "</span></button>";
    }
    function draw() {
      var ref = st.ref ? '<div class="dd-ref" lang="en" dir="ltr"><b>' + esc(st.ref.title) + "</b>" + st.ref.rows.map(function (r) { return '<div class="dd-rr"><span>' + esc(r[0]) + "</span><b>" + esc(r[1]) + "</b></div>"; }).join("") + "</div>" : "";
      el.innerHTML = '<div class="en-block">' + head(st) + intro(st) + '<p class="lp-sub">' + esc(T(UI.spotSub)) + "</p>" + ref +
        '<div class="dd-doc" lang="en" dir="ltr"><div class="dd-head"><b>' + esc(d.title) + "</b>" + (d.from ? "<small>" + esc(d.from) + "</small>" : "") + '<em class="dd-stamp">' + esc(EN(UI.sample)) + '</em></div><div class="dd-rows">' +
        d.rows.map(rowHtml).join("") + "</div></div></div>";
      fixArDir(el);
    }
    el.addEventListener("click", function (e) {
      var b = e.target.closest("[data-sp]"); if (!b || checked) return;
      var i = +b.getAttribute("data-sp"); flags[i] = !flags[i]; draw(); var nb = $('[data-sp="' + i + '"]', el); if (nb) nb.focus();
    });
    draw();
    return {
      check: function () {
        if (!Object.keys(flags).some(function (k) { return flags[k]; })) { $(".lp-msg").textContent = T(UI.spotNone); return null; }
        var t = 0, good = 0, bad = 0;
        d.rows.forEach(function (r, i) { if (r[2]) { t++; if (flags[i]) good++; } else if (flags[i]) bad++; });
        checked = true; draw();
        return { c: Math.max(0, good - bad), t: t };
      }
    };
  };

  // a short choose-your-path story; good choices score a point
  RENDER.story = function (el, st) {
    var node = st.start, made = 0, good = 0, picked = null, ended = false;
    function draw() {
      var n = st.nodes[node];
      var h = '<div class="en-block">' + head(st) + (node === st.start && !made ? intro(st) : "") + '<div class="sy">' +
        '<div class="sy-scene"><span class="sy-ic" aria-hidden="true">' + (n.i || "📍") + '</span><div class="tx">' + enText(n.p) + (S.arHelp ? help(n.p) : "") + "</div></div>";
      if (n.end) {
        ended = true;
        h += '<div class="sy-end"><b>' + esc(fmt(UI.storyScore, { c: good, t: made })) + "</b><p>" + esc(T(good === made ? UI.storyBest : UI.storyOk)) + '</p><button type="button" class="btn btn-ghost" data-sy-again>↺ ' + esc(T(UI.storyAgain)) + "</button></div>";
        cur.results[cur.i] = { c: good, t: made };
      } else if (picked == null) {
        h += '<div class="sy-ch" role="group" aria-label="' + esc(T(UI.storyPick)) + '">' + n.ch.map(function (c, k) { return '<button type="button" class="cc-btn sy-btn" data-ch="' + k + '" lang="en" dir="ltr">' + both(c.t) + "</button>"; }).join("") + "</div>";
      } else {
        var c = n.ch[picked];
        h += '<div class="sy-fb ' + (c.ok === false ? "is-no" : c.ok ? "is-ok" : "") + '"><b>' + esc(T(c.ok === false ? UI.storyNo : c.ok ? UI.storyYes : UI.storyHm)) + '</b><div class="tx">' + enText(c.fb) + (S.arHelp ? help(c.fb) : "") + '</div></div><button type="button" class="btn btn-primary" data-sy-go>' + esc(T(UI.storyCont)) + " →</button>";
      }
      el.innerHTML = h + "</div></div>"; fixArDir(el); gateUpdate();
      var f = $("[data-sy-go]", el) || $(".sy-scene", el); if (f && made) { if (!f.hasAttribute("tabindex") && f.tagName !== "BUTTON") f.setAttribute("tabindex", "-1"); f.focus({ preventScroll: false }); }
    }
    el.addEventListener("click", function (e) {
      var b = e.target.closest("[data-ch]");
      if (b) { picked = +b.getAttribute("data-ch"); var c = st.nodes[node].ch[picked]; if (c.ok != null) { made++; if (c.ok) good++; } draw(); return; }
      if (e.target.closest("[data-sy-go]")) { node = st.nodes[node].ch[picked].go; picked = null; draw(); return; }
      if (e.target.closest("[data-sy-again]")) { node = st.start; made = 0; good = 0; picked = null; ended = false; delete cur.results[cur.i]; draw(); }
    });
    draw();
    return { gate: function () { return ended; } };
  };

  // a month on your allowance: plan, then live through four weeks of surprises
  var CUR = { au: ["A$", 1], us: ["US$", 0.65], uk: ["£", 0.5], ca: ["CA$", 0.9], de: ["€", 0.6], sg: ["S$", 0.85] };
  var KNOWN_ALLOW = { au: 2699, us: 1736 };
  RENDER.budget = function (el, st) {
    var cc = MY_CC && CUR[MY_CC] ? MY_CC : null, stage = "plan", wk = 0, bal = 0, picked = null, log = [];
    var B = S.budget = S.budget || {};
    function cur3() { return CUR[cc || "au"]; }
    function money(v) { var c = cur3()[0]; return (v < 0 ? "−" : "") + c + Math.abs(Math.round(v)).toLocaleString("en-AU"); }
    function scale(v) { return Math.max(5, Math.round(v * cur3()[1] / 5) * 5); }
    function allowance() {
      var saved = null; try { saved = parseFloat(localStorage.getItem("masarok-allow-" + (cc || "au"))); } catch (e) {}
      if (B.allow && B.cc === cc) return { v: B.allow, k: "you" };
      if (KNOWN_ALLOW[cc || "au"]) return { v: KNOWN_ALLOW[cc || "au"], k: "known" };
      if (saved > 0) return { v: saved, k: "you" };
      var tot = 0; st.cats.forEach(function (c) { var x = costOf(c); tot += x[1] === "w" ? x[0] * 52 / 12 : x[0]; });
      return { v: Math.round(tot * 1.25 / 10) * 10, k: "practice" };
    }
    function costOf(c) { return st.costs[cc || "au"][c.id] || [0, "m"]; }
    function perOf(c) { return costOf(c)[1] || "m"; }
    var A = allowance(), vals = {};
    function resetVals() { st.cats.forEach(function (c) { vals[c.id] = costOf(c)[0]; }); }
    resetVals();
    function monthly() { var t = 0; st.cats.forEach(function (c) { var v = +vals[c.id] || 0; t += perOf(c) === "w" ? v * 52 / 12 : v; }); return t; }
    function plan() {
      var left = A.v - monthly();
      el.innerHTML = '<div class="en-block">' + head(st) + intro(st) +
        (MY_CC ? "" : '<label class="bg-cc"><span>' + esc(T(UI.bgCountry)) + '</span><select data-bg-cc>' + Object.keys(CUR).map(function (k) { return '<option value="' + k + '"' + ((cc || "au") === k ? " selected" : "") + ">" + esc(T(CC_NAME[k])) + "</option>"; }).join("") + "</select></label>") +
        '<div class="bg"><div class="bg-allow"><label for="bg-a">' + esc(T(UI.bgAllow)) + '</label><div class="money-in"><span>' + esc(cur3()[0]) + '</span><input id="bg-a" type="number" inputmode="decimal" min="0" step="10" value="' + Math.round(A.v) + '" data-bg-a></div>' +
        '<small>' + esc(T(A.k === "known" ? UI.bgKnown : A.k === "practice" ? UI.bgPractice : UI.bgYours)) + "</small></div>" +
        st.cats.map(function (c) {
          return '<div class="bg-row"><label for="bg-' + c.id + '">' + both(c.l) + " <small>" + esc(T(perOf(c) === "w" ? UI.perWeek : UI.perMonth)) + '</small></label><div class="money-in"><span>' + esc(cur3()[0]) + '</span><input id="bg-' + c.id + '" type="number" inputmode="decimal" min="0" step="5" value="' + vals[c.id] + '" data-bg="' + c.id + '"></div></div>';
        }).join("") +
        '<div class="bg-tot"><span>' + esc(T(UI.bgSpend)) + ": <b data-bg-sp>" + money(monthly()) + '</b></span><span class="' + (left >= 0 ? "is-ok" : "is-low") + '" data-bg-left-w>' + esc(T(UI.bgLeft)) + ": <b data-bg-left>" + money(left) + "</b></span></div>" +
        '<p class="bg-warn" data-bg-warn' + (left < 0 ? "" : " hidden") + ">⚠️ " + esc(T(UI.bgOverPlan)) + "</p>" +
        '<button type="button" class="btn btn-primary" data-bg-go>' + esc(T(UI.bgStart)) + " →</button></div>" +
        '<p class="cs-note">' + esc(T(UI.bgNote)) + "</p></div>";
      fixArDir(el);
    }
    function upd() {
      var left = A.v - monthly(), sp = $("[data-bg-sp]", el), lf = $("[data-bg-left]", el), w = $("[data-bg-left-w]", el);
      if (sp) sp.textContent = money(monthly()); if (lf) lf.textContent = money(left); if (w) w.className = left >= 0 ? "is-ok" : "is-low"; var wn = $("[data-bg-warn]", el); if (wn) wn.hidden = left >= 0;
    }
    function week() {
      var ev = st.events[wk], h = '<div class="en-block">' + head(st) +
        '<div class="bg-meter"><span>' + esc(fmt(UI.bgWeek, { n: wk + 1, t: st.events.length })) + '</span><b class="' + (bal >= 0 ? "is-ok" : "is-low") + '">' + esc(T(UI.bgBal)) + ": " + money(bal) + "</b></div>" +
        '<div class="sy"><div class="sy-scene"><span class="sy-ic" aria-hidden="true">' + (ev.i || "📅") + '</span><div class="tx">' + enText(ev.p) + (S.arHelp ? help(ev.p) : "") + "</div></div>";
      if (picked == null) h += '<div class="sy-ch">' + ev.ch.map(function (c, k) { return '<button type="button" class="cc-btn sy-btn" data-bc="' + k + '" lang="en" dir="ltr">' + both(c.t) + '<em class="bg-cost">' + (c.cost ? "−" + money(scale(c.cost)) : esc(EN(UI.bgFree))) + "</em></button>"; }).join("") + "</div>";
      else { var c = ev.ch[picked]; h += '<div class="sy-fb ' + (c.ok === false ? "is-no" : c.ok ? "is-ok" : "") + '"><div class="tx">' + enText(c.fb) + (S.arHelp ? help(c.fb) : "") + '</div></div><button type="button" class="btn btn-primary" data-bg-next>' + esc(T(wk < st.events.length - 1 ? UI.bgNextWeek : UI.bgEnd)) + " →</button>"; }
      el.innerHTML = h + "</div></div>"; fixArDir(el);
    }
    function end() {
      var good = log.filter(function (x) { return x; }).length;
      B.cc = cc; B.allow = A.v; B.left = bal; B.at = Date.now(); save();
      el.innerHTML = '<div class="en-block">' + head(st) + '<div class="pl-card bg-res"><div class="pl-ov"><small>' + esc(T(UI.bgLeftEnd)) + '</small><b class="' + (bal >= 0 ? "" : "is-low") + '">' + money(bal) + "</b></div>" +
        '<p class="pl-note">' + esc(T(bal >= A.v * 0.1 ? UI.bgGreat : bal >= 0 ? UI.bgOk : UI.bgOver)) + "</p>" +
        '<ul class="tx-list">' + st.tips.map(function (x) { return "<li>" + enText(x) + (S.arHelp ? help(x) : "") + "</li>"; }).join("") + "</ul>" +
        '<button type="button" class="btn btn-ghost" data-bg-again>↺ ' + esc(T(UI.bgAgain)) + "</button></div></div>";
      fixArDir(el);
      cur.results[cur.i] = { c: good, t: log.length };
      gateUpdate();
    }
    el.addEventListener("input", function (e) {
      if (e.target.hasAttribute("data-bg-a")) { A = { v: +e.target.value || 0, k: "you" }; upd(); return; }
      var k = e.target.getAttribute("data-bg"); if (k) { vals[k] = e.target.value; upd(); }
    });
    el.addEventListener("change", function (e) { if (e.target.hasAttribute("data-bg-cc")) { cc = e.target.value; B.allow = null; A = allowance(); resetVals(); plan(); } });
    el.addEventListener("click", function (e) {
      if (e.target.closest("[data-bg-go]")) { bal = A.v - monthly(); wk = 0; picked = null; log = []; stage = "week"; if (A.k === "you") { B.allow = A.v; B.cc = cc; save(); } week(); window.scrollTo(0, 0); return; }
      var b = e.target.closest("[data-bc]");
      if (b) { picked = +b.getAttribute("data-bc"); var c = st.events[wk].ch[picked]; bal -= c.cost ? scale(c.cost) : 0; if (c.ok != null) log.push(!!c.ok); week(); return; }
      if (e.target.closest("[data-bg-next]")) { wk++; picked = null; if (wk < st.events.length) week(); else { stage = "end"; end(); } window.scrollTo(0, 0); return; }
      if (e.target.closest("[data-bg-again]")) { stage = "plan"; delete cur.results[cur.i]; plan(); gateUpdate(); }
    });
    plan();
    return { gate: function () { return stage === "end"; } };
  };

  // interview practice: random questions, an optional spoken officer, a recorder and a self-check
  RENDER.interview = function (el, st) {
    var qs = [], qi = 0, answered = 0, rounds = 0, voice = !!tts;
    function newSet() { qs = shuffle(st.bank).slice(0, st.n || 6); qi = 0; }
    function intro2() {
      el.innerHTML = '<div class="en-block">' + head(st) + intro(st) + '<div class="iv-start"><span class="iv-ic" aria-hidden="true">' + (st.icon || "🛂") + "</span><p>" + esc(fmt(UI.ivHow, { n: st.n || 6, s: st.secs })) + "</p>" +
        (tts ? '<label class="iv-voice"><input type="checkbox" data-iv-voice' + (voice ? " checked" : "") + "> " + esc(T(UI.ivVoice)) + "</label>" : "") +
        '<button type="button" class="btn btn-primary" data-iv-go>' + esc(T(rounds ? UI.ivAgain : UI.ivStart)) + "</button></div>" +
        (rounds ? '<p class="cs-note">' + esc(fmt(UI.ivRounds, { n: rounds })) + "</p>" : "") + "</div>";
      fixArDir(el);
    }
    function ask() {
      var q = qs[qi];
      el.innerHTML = '<div class="en-block">' + head(st) + '<p class="lp-n">' + esc(fmt(UI.ivQ, { n: qi + 1, t: qs.length })) + '</p><div class="qa-q iv-q" lang="en" dir="ltr"><span aria-hidden="true">' + (st.officer || "👮") + "</span> " + esc(q.q) + "</div>" +
        (q.tip ? '<details class="iv-tip"><summary>💡 ' + esc(T(UI.ivTip)) + '</summary><div class="tx">' + enText(q.tip) + (S.arHelp ? help(q.tip) : "") + "</div></details>" : "") +
        '<div data-recbox></div><div class="sp-row"><button type="button" class="btn btn-ghost" data-iv-say>🔊 ' + esc(T(UI.ivRepeat)) + '</button><button type="button" class="btn btn-ghost" data-iv-next>' + esc(T(qi < qs.length - 1 ? UI.nextQ : UI.ivFinish)) + "</button></div>" +
        '<p class="cs-note">' + esc(T(UI.private)) + "</p></div>";
      fixArDir(el);
      recorder($("[data-recbox]", el), st.secs, function () { answered++; }, q.q);
      if (voice) say(q.q);
    }
    function say(t) { try { if (!tts) return; tts.cancel(); var u = new SpeechSynthesisUtterance(t); u.lang = st.accent || "en-US"; u.rate = 0.95; tts.speak(u); } catch (e) {} }
    function review() {
      rounds++;
      el.innerHTML = '<div class="en-block">' + head(st) + '<h3>' + esc(T(UI.ivReview)) + "</h3><p class=\"lp-sub\">" + esc(T(UI.ivReviewSub)) + '</p><fieldset class="es-ck"><legend>' + esc(T(UI.checkT)) + "</legend>" +
        st.checks.map(function (x, k) { return '<label><input type="checkbox" data-ivc="' + k + '"><span>' + esc(T(x)) + "</span></label>"; }).join("") + "</fieldset>" +
        '<button type="button" class="btn btn-ghost" data-iv-again>↺ ' + esc(T(UI.ivAgain)) + "</button></div>";
      fixArDir(el); gateUpdate();
    }
    el.addEventListener("change", function (e) { if (e.target.hasAttribute("data-iv-voice")) voice = e.target.checked; });
    el.addEventListener("click", function (e) {
      if (e.target.closest("[data-iv-go]") || e.target.closest("[data-iv-again]")) { newSet(); ask(); return; }
      if (e.target.closest("[data-iv-say]")) { say(qs[qi].q); return; }
      if (e.target.closest("[data-iv-next]")) { stopRec(true); clearTimers(); try { tts && tts.cancel(); } catch (x) {} if (qi < qs.length - 1) { qi++; ask(); } else review(); }
    });
    intro2();
    return { gate: function () { return rounds > 0; }, leave: function () { stopRec(true); clearTimers(); try { tts && tts.cancel(); } catch (x) {} } };
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
    if (e.target.closest("[data-backup]") && window.MasarokMenu) { window.MasarokMenu.backup(); return; }
    if (e.target.closest("[data-sign-in]") && window.MasarokAccount) { window.MasarokAccount.open(); return; }
    if (e.target.closest("[data-retry-load]")) { boot(); return; }
    if (e.target.closest("[data-ar-toggle]")) {
      S.arHelp = !S.arHelp; save();
      if (cur) renderStep(); else home();
    }
  });
  window.addEventListener("hashchange", route);
  if (tts && tts.onvoiceschanged !== undefined) tts.onvoiceschanged = function () {};
  // paid lessons: owners get them from the Masarok server (or this device's saved copy), everyone else sees them locked
  function boot() {
    if (!hasLocked()) { ACCESS = "open"; route(); return; }
    var MA = window.MasarokAccount;
    if (!MA || !MA.enabled) { ACCESS = "off"; route(); return; }
    MA.course(C.id).then(function (res) {
      if (res && res.lessons) { unlock(res.lessons); ACCESS = hasLocked() ? "not_owned" : "open"; }
      else ACCESS = (res && res.error) || "offline";
      route();
    });
  }
  boot();
  window.MasarokAcademy = { state: function () { return S; }, access: function () { return ACCESS; } };
})();

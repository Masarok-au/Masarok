/* Masarok Academy · the coach.
   1. A free coach that runs on the student's own device: it checks writing patterns and,
      if the student turns it on, gives pace and filler feedback on speaking from a live transcript.
   2. Optional AI feedback (a paid add-on). It stays switched off until AI.url below points at
      the Masarok AI server (see server/api/README.md). Nothing is sent anywhere while it is off. */
(function () {
  "use strict";

  // ---------- settings: fill these in once the coach server and the Stripe link are live (see server/api/README.md) ----------
  var AI = {
    url: "",         // leave empty to use the Masarok server set in account.js
    buy: "",         // the Stripe Payment Link, e.g. "https://buy.stripe.com/..."
    price: ["9.99 SAR", "9.99 ريال"],
    credits: 30,     // feedbacks in one pack (keep the same as CREDITS_PER_PACK on the server)
    days: 365        // how long a pack lasts (EXPIRY_DAYS on the server)
  };
  // for testing before launch: only this browser sees the AI coach
  try { var o = JSON.parse(localStorage.getItem("masarok-ai-dev") || "null"); if (o && /^https?:\/\//.test(o.url || "")) { AI.url = o.url; if (o.buy) AI.buy = o.buy; } } catch (e) {}
  // the coach lives on the same Masarok server as accounts (account.js); it turns on once the buy link is set
  if (!AI.url && AI.buy && window.MasarokAccount && window.MasarokAccount.url) AI.url = window.MasarokAccount.url;

  var AR = (document.documentElement.lang || "en").slice(0, 2) === "ar", A = AR ? 1 : 0;
  function T(x) { return Array.isArray(x) ? x[A] : x; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c]; }); }
  function fmt(s, o) { return T(s).replace(/\{(\w+)\}/g, function (m, k) { return o[k] != null ? o[k] : m; }); }
  function words(s) { return String(s || "").match(/[A-Za-z][A-Za-z’'-]*|\d[\d.,%]*/g) || []; }

  var U = {
    coachT: ["Masarok coach", "مدرب مسارُك"], coachGo: ["Check my writing", "راجع كتابتي"], coachAgain: ["Check again", "راجع مرة أخرى"],
    coachSub: ["Free, instant and private: it runs on your device. It checks patterns, not ideas, so use it with the self-check.", "مجاني وفوري وخاص، يعمل على جهازك. يراجع الأنماط لا الأفكار، فاستخدمه مع التقييم الذاتي."],
    tooShort: ["Write at least 40 words, then check.", "اكتب 40 كلمة على الأقل ثم راجع."],
    good: ["Looks good", "جيد"], fix: ["To work on", "يحتاج عملًا"],
    crit: {
      task: ["Task response", "الاستجابة للمهمة"], ach: ["Task achievement", "إنجاز المهمة"], coh: ["Coherence and cohesion", "الترابط والتماسك"], lex: ["Vocabulary", "المفردات"], gra: ["Grammar and accuracy", "القواعد والدقة"],
      content: ["Content and length", "المحتوى والطول"], structure: ["Structure", "البناء"], style: ["Style", "الأسلوب"], acc: ["Accuracy", "الدقة"] },
    len: ["{n} words. The target is {t}+.", "{n} كلمة، والهدف {t} أو أكثر."], lenOk: ["{n} words: long enough.", "{n} كلمة: طول كافٍ."],
    lenRange: ["{n} words. Aim for {a}–{b}.", "{n} كلمة، والهدف من {a} إلى {b}."], lenOver: ["{n} words: over the limit of {b}.", "{n} كلمة: تجاوزت الحد {b}."],
    paras1: ["Everything is in one paragraph. Use separate paragraphs, with an empty line between them.", "كل النص في فقرة واحدة، فاستخدم فقرات منفصلة بينها سطر فارغ."],
    parasN: ["{n} paragraphs.", "{n} فقرات."], parasFew: ["Only {n} paragraphs. Most strong answers use {t}.", "{n} فقرات فقط، وأغلب الإجابات القوية تستخدم {t}."],
    pos: ["Your position isn't clear. Say what you think in the introduction and again in the conclusion.", "رأيك غير واضح، فاذكره في المقدمة ثم في الخاتمة."], posOk: ["Your position is stated.", "رأيك واضح."],
    concl: ["Add a clear conclusion, for example starting with \"In conclusion,\".", "أضف خاتمة واضحة، مثلًا تبدأ بـ «In conclusion,»."], conclOk: ["You have a conclusion.", "لديك خاتمة."],
    over: ["Add an overview: one or two sentences starting with \"Overall,\" that sum up the main trends.", "أضف نظرة عامة: جملة أو جملتين تبدأ بـ «Overall,» تلخص الاتجاهات الرئيسية."], overOk: ["You have an overview.", "لديك نظرة عامة."],
    nums: ["Support your description with figures from the chart.", "ادعم وصفك بأرقام من الرسم البياني."], numsOk: ["You used figures from the data.", "استخدمت أرقامًا من البيانات."],
    opinion1: ["Task 1 reports the data only. Remove your opinion: \"{w}\".", "المهمة 1 تصف البيانات فقط، فاحذف رأيك: «{w}»."],
    link: ["Linking words: {list}.", "أدوات الربط: {list}."], linkFew: ["Use more linking words to connect ideas (however, for example, as a result…).", "استخدم أدوات ربط أكثر لوصل الأفكار (however، for example، as a result…)."],
    linkOver: ["\"{w}\" starts {n} sentences. Vary it, or link ideas inside the sentence.", "«{w}» تبدأ {n} جمل، فنوّعها أو اربط الأفكار داخل الجملة."],
    rep: ["Repeated words: {list}. Use synonyms or pronouns.", "كلمات مكررة: {list}. استخدم مرادفات أو ضمائر."], repOk: ["No word is over-repeated.", "لا توجد كلمة مكررة بكثرة."],
    variety: ["Word variety: {p}% different words.", "تنوع الكلمات: {p}% كلمات مختلفة."],
    awl: ["Academic words: {list}.", "كلمات أكاديمية: {list}."], awlFew: ["Few academic words. Try words like significant, factor, approach or impact.", "كلمات أكاديمية قليلة، فجرّب كلمات مثل significant وfactor وapproach وimpact."],
    cliche: ["Overused phrases: {list}.", "عبارات مستهلكة: {list}."],
    informal: ["Too informal for this task: {list}.", "غير رسمية لهذه المهمة: {list}."], contr: ["Write contractions in full: {list}.", "اكتب الاختصارات كاملة: {list}."],
    longS: ["{n} very long sentences (over 40 words). Split them.", "{n} جمل طويلة جدًا (أكثر من 40 كلمة)، فقسّمها."], avgS: ["Average sentence: {n} words.", "متوسط الجملة: {n} كلمة."],
    shortS: ["Many short sentences. Join some with because, which or although.", "جمل قصيرة كثيرة، فاربط بعضها بـ because أو which أو although."],
    errs: ["Check these:", "راجع هذه:"], errsNone: ["No common mistakes found.", "لا توجد أخطاء شائعة."],
    caps: ["Start each sentence with a capital letter.", "ابدأ كل جملة بحرف كبير."], lowI: ["Write \"I\" as a capital letter.", "اكتب «I» بحرف كبير."],
    note: ["The coach looks for patterns. It can't judge your ideas or every grammar point, and it gives no band score.", "المدرب يبحث عن الأنماط، ولا يستطيع الحكم على أفكارك أو كل قواعد اللغة، ولا يعطي درجة."],
    // speaking
    spkT: ["Transcript and pace feedback", "النص المكتوب وملاحظات السرعة"],
    spkOpt: ["Show a transcript and pace feedback after I record", "اعرض النص المكتوب وملاحظات السرعة بعد التسجيل"],
    spkPriv: ["This uses your browser's speech service, which may send audio to Google or Apple to turn it into text. Your recording itself stays on this device.", "يستخدم هذا خدمة الكلام في متصفحك، وقد ترسل الصوت إلى Google أو Apple لتحويله إلى نص. أما تسجيلك نفسه فيبقى على هذا الجهاز."],
    spkNo: ["Your browser can't make a transcript. Try Chrome, Edge or Safari, or just listen back.", "متصفحك لا يستطيع إنشاء نص مكتوب، فجرّب Chrome أو Edge أو Safari، أو استمع لتسجيلك."],
    spkNone: ["No words were picked up. Speak closer to the microphone, or check it's allowed.", "لم تُلتقط أي كلمات، فتحدث قرب الميكروفون أو تأكد من السماح له."],
    heard: ["What the browser heard", "ما سمعه المتصفح"],
    heardNote: ["If many words are wrong, slow down and pronounce word endings clearly.", "إذا كانت كلمات كثيرة خاطئة، فتمهل وانطق أواخر الكلمات بوضوح."],
    pace: ["Pace: {n} words a minute.", "السرعة: {n} كلمة في الدقيقة."], paceSlow: ["That's slow. Keep talking: short pauses are fine, long silences cost marks.", "هذه سرعة بطيئة. استمر في الكلام؛ التوقف القصير مقبول، أما الصمت الطويل فيُفقدك الدرجات."],
    paceFast: ["That's fast. Slow down a little so every word is clear.", "هذه سرعة عالية، فتمهل قليلًا لتكون كل كلمة واضحة."], paceOk: ["A natural pace.", "سرعة طبيعية."],
    spokeFor: ["You spoke for {n} seconds.", "تحدثت لمدة {n} ثانية."], spokeShort: ["Try to keep going for at least {n} seconds.", "حاول أن تستمر {n} ثانية على الأقل."],
    fillers: ["Fillers: {list}. Replace them with a short pause, or a phrase like \"Let me think\".", "كلمات الحشو: {list}. استبدلها بتوقف قصير أو بعبارة مثل «Let me think»."], fillersOk: ["Few fillers. Nice.", "كلمات حشو قليلة، أحسنت."],
    spkLinks: ["Linking words you used: {list}.", "أدوات الربط التي استخدمتها: {list}."], spkLinksFew: ["Add reasons and examples: because, for example, that's why…", "أضف أسبابًا وأمثلة: because، for example، that's why…"],
    // AI feedback (paid add-on)
    aiT: ["AI feedback", "ملاحظات الذكاء الاصطناعي"], aiTag: ["Paid add-on", "إضافة مدفوعة"],
    aiSoon: ["Coming soon: detailed feedback from AI, marked against the official criteria, with corrected sentences. It will be a low-cost paid add-on. The free coach above will always stay free.", "قريبًا: ملاحظات مفصلة من الذكاء الاصطناعي وفق المعايير الرسمية مع تصحيح الجمل، كإضافة مدفوعة بسعر منخفض. وسيبقى المدرب المجاني أعلاه مجانيًا دائمًا."],
    aiPitch: ["Detailed feedback marked against the official criteria, with corrected sentences and a stronger version of your own text. {n} feedbacks for {p}.", "ملاحظات مفصلة وفق المعايير الرسمية، مع تصحيح الجمل ونسخة أقوى من نصك أنت. {n} مرة مقابل {p}."],
    aiBuy: ["Get a coach pack", "احصل على باقة المدرب"], aiHave: ["I have a code", "لدي رمز"], aiSave: ["Use this code", "استخدم هذا الرمز"],
    aiCode: ["Your coach code", "رمز المدرب"], aiGo: ["Get AI feedback · 1 credit", "احصل على ملاحظات الذكاء الاصطناعي · رصيد واحد"], aiWait: ["Marking your work… this takes about 20 seconds.", "جارٍ تقييم عملك… يستغرق ذلك نحو 20 ثانية."],
    aiCredits: ["Credits left: {n}", "الرصيد المتبقي: {n}"], aiChange: ["Change code", "غيّر الرمز"], aiManage: ["Manage your code", "إدارة رمزك"],
    aiPriv: ["Your text is sent to the Masarok server and to Anthropic, the AI provider, only to create this feedback. Masarok doesn't keep it.", "يُرسل نصك إلى خادم مسارُك وإلى Anthropic، مزوّد الذكاء الاصطناعي، لإنشاء هذه الملاحظات فقط، ولا يحتفظ به مسارُك."],
    aiNeed: ["Write at least {n} words first.", "اكتب {n} كلمة على الأقل أولًا."], aiLast: ["Your last AI feedback here · {d}", "آخر ملاحظات من الذكاء الاصطناعي هنا · {d}"],
    aiErr: {
      no_code: ["Enter your coach code first.", "أدخل رمز المدرب أولًا."], bad_code: ["That code wasn't recognised. Check it and try again.", "لم يُتعرف على هذا الرمز، فتحقق منه وحاول مرة أخرى."],
      no_credits: ["This code has no credits left. Get a new pack to keep going.", "لا يوجد رصيد متبقٍ في هذا الرمز، فاحصل على باقة جديدة لتستمر."], expired: ["This code has expired.", "انتهت صلاحية هذا الرمز."],
      rate_limited: ["That's a lot of feedback in one hour. Take a break, then try again.", "طلبت ملاحظات كثيرة خلال ساعة، فخذ استراحة ثم حاول مجددًا."], busy: ["The AI is busy right now. Your credit wasn't used. Try again in a few minutes.", "الذكاء الاصطناعي مشغول الآن ولم يُخصم رصيدك، فحاول بعد دقائق."],
      too_long: ["This text is too long for AI feedback.", "هذا النص أطول من المسموح لملاحظات الذكاء الاصطناعي."], too_short: ["Write a bit more first.", "اكتب أكثر قليلًا أولًا."],
      network: ["Couldn't reach the server. Check your connection and try again.", "تعذر الوصول إلى الخادم، فتحقق من اتصالك وحاول مجددًا."], server: ["Something went wrong. Your credit wasn't used. Please try again.", "حدث خطأ ولم يُخصم رصيدك، فحاول مرة أخرى."] },
    aiOverall: ["Estimated band", "الدرجة التقديرية"], aiStrengths: ["What works", "نقاط القوة"], aiFixes: ["Fix these first", "أصلح هذه أولًا"], aiModel: ["A stronger version", "نسخة أقوى"], aiNext: ["Practise next", "تدرّب بعد ذلك على"],
    aiCrit: { task_achievement: ["Task achievement", "إنجاز المهمة"], task_response: ["Task response", "الاستجابة للمهمة"], coherence_cohesion: ["Coherence and cohesion", "الترابط والتماسك"], lexical_resource: ["Vocabulary", "المفردات"], grammar: ["Grammar and accuracy", "القواعد والدقة"],
      fluency_coherence: ["Fluency and coherence", "الطلاقة والترابط"], clarity: ["Clarity", "الوضوح"], specific_evidence: ["Specific examples", "أمثلة محددة"], reflection: ["Reflection", "التأمل"], fit: ["Fit to the course", "الملاءمة للبرنامج"], language: ["Language", "اللغة"] },
    aiNote: ["AI feedback is an estimate to help you practise. It isn't an official score, and it can be wrong, so use your judgement.", "ملاحظات الذكاء الاصطناعي تقدير للتدريب، وليست درجة رسمية، وقد تخطئ، فاستخدم تقديرك."],
    aiSpkNote: ["Scored from your transcript, so pronunciation isn't included.", "التقييم من النص المكتوب، لذلك لا يشمل النطق."]
  };

  // ---------- word lists ----------
  var STOP = ("a an the and or but if so of to in on at by for with from as is are was were be been being it its this that these those there their they them he she his her we our you your i me my "
    + "not no do does did have has had will would can could should may might must than then also very more most such which who whom what when where why how all any some each other into about over after before "
    + "up down out just only own same too both few many much one two three first second because while although however").split(" ");
  var STOPSET = {}; STOP.forEach(function (w) { STOPSET[w] = 1; });
  var LINKS = ["however", "moreover", "furthermore", "in addition", "therefore", "as a result", "consequently", "for example", "for instance", "on the other hand", "in contrast", "although", "whereas", "while",
    "similarly", "firstly", "secondly", "finally", "because", "since", "despite", "in conclusion", "overall", "this means", "as well as", "that's why", "that is why", "such as", "instead", "even though", "on top of that", "to sum up"];
  var START_LINKS = ["moreover", "furthermore", "however", "in addition", "additionally", "also", "firstly", "secondly", "therefore", "besides"];
  var AWL = ("analyse analyze analysis approach area assess assessment assume authority available benefit concept consistent constitute context contract create data define derive distribute distribution economy economic environment environmental "
    + "establish estimate evident evidence export factor finance financial formula function identify income indicate individual interpret involve issue labour legal major method occur percent percentage period policy principle "
    + "proceed process require requirement research respond role section sector significant significantly similar source specific structure theory vary variation achieve acquire administration affect appropriate aspect "
    + "assist category chapter commission community complex compute conclude conduct consequence construct consume credit culture design distinct element equate evaluate feature final focus impact injure institute "
    + "invest item journal maintain normal obtain participate perceive positive potential previous primary purchase range region regulate relevant reside resource restrict secure seek select site strategy survey text "
    + "tradition transfer alternative circumstance component compensate considerable constant constrain contribute convene coordinate core corporate correspond criteria deduce demonstrate document dominate emphasis "
    + "ensure exclude framework fund illustrate immigrate imply initial instance interact justify layer link locate maximise minimise negate outcome partner philosophy physical proportion publish react register rely "
    + "remove scheme sequence sex shift specify sufficient task technical technique technology valid volume access adequate annual apparent approximate attitude attribute civil code commit communicate concentrate "
    + "conference contrast cycle debate despite dimension domestic emerge error ethnic goal grant hence hypothesis implement implicate impose integrate internal investigate job label mechanism obvious occupy option "
    + "output overall parallel parameter phase predict principal prior professional project promote regime resolve retain series statistic status stress subsequent sum summary undertake decline fluctuate stable trend proportion").split(" ");
  var AWLSET = {}; AWL.forEach(function (w) { AWLSET[w] = 1; });
  var CLICHE = ["nowadays", "in this modern era", "in today's world", "since the dawn of time", "last but not least", "in a nutshell", "in my opinion, i think", "a lot of", "all in all", "it is known that", "it goes without saying",
    "ever since i was young", "ever since i was a child", "from a young age", "since childhood", "i have always been passionate", "my passion for", "my dream", "dream university", "i am a hard worker", "thank you for considering",
    "the hardest thing", "in this day and age", "each and every"];
  var INFORMAL = ["kids", "stuff", "gonna", "wanna", "guys", "awesome", "okay", "ok", "lots of", "tons of", "super", "cool", "anyways", "gotta", "kinda", "sorta", "yeah", "pretty much"];
  var FILLERS = ["um", "uh", "erm", "er", "uhm", "hmm", "you know", "i mean", "like", "basically", "actually", "kind of", "sort of"];
  // common mistakes, many typical for Arabic speakers: [pattern, suggestion]
  var ERRS = [
    [/\binformations\b/gi, ["information (no -s)", "information (دون s)"]], [/\badvices\b/gi, ["advice (no -s)", "advice (دون s)"]], [/\bknowledges\b/gi, ["knowledge (no -s)", "knowledge (دون s)"]],
    [/\bequipments\b/gi, ["equipment (no -s)", "equipment (دون s)"]], [/\bfurnitures\b/gi, ["furniture (no -s)", "furniture (دون s)"]], [/\bhomeworks\b/gi, ["homework (no -s)", "homework (دون s)"]],
    [/\bpeoples\b/gi, ["people (already plural)", "people (جمع أصلًا)"]], [/\bchilds\b/gi, ["children", "children"]], [/\bstaffs\b/gi, ["staff", "staff"]],
    [/\bmore (better|worse|easier|harder|bigger|smaller|cheaper|faster|higher|lower|larger)\b/gi, ["drop \"more\" before a comparative (better, not more better)", "احذف more قبل صيغة المقارنة (better لا more better)"]],
    [/\bthe most (best|worst)\b/gi, ["the best / the worst (no \"most\")", "the best / the worst (دون most)"]],
    [/\bdiscuss about\b/gi, ["discuss (no \"about\")", "discuss (دون about)"]], [/\bexplain me\b/gi, ["explain to me", "explain to me"]], [/\b(make|do) a research\b/gi, ["do research", "do research"]],
    [/\bdepend(s|ed)? of\b/gi, ["depend on", "depend on"]], [/\bmarried with\b/gi, ["married to", "married to"]], [/\bcan able to\b/gi, ["can / am able to", "can / am able to"]],
    [/\b(am|is|are) agree\b/gi, ["I agree (no \"am\")", "I agree (دون am)"]], [/\bin nowadays\b/gi, ["nowadays (no \"in\"), or better: today", "nowadays دون in، والأفضل today"]],
    [/\b(didn['’]t|did not) (went|saw|came|took|made|had|got|gave|wrote|spoke|knew|found|thought)\b/gi, ["after did/didn't use the base form (didn't go)", "بعد did/didn't استخدم المصدر (didn't go)"]],
    [/\bevery (student|person|people|one|country|child) (have|are|were|do|need|want)\b/gi, ["every + singular verb (every student has)", "every مع فعل مفرد (every student has)"]],
    [/\beach (students|people|countries|persons)\b/gi, ["each + singular noun (each student)", "each مع اسم مفرد (each student)"]],
    [/\bmuch (people|students|cars|countries|things|problems)\b/gi, ["many with countable nouns (many people)", "many مع المعدود (many people)"]],
    [/\bless (people|students|cars|countries|jobs)\b/gi, ["fewer with countable nouns (fewer people)", "fewer مع المعدود (fewer people)"]],
    [/\bsince \d+ (years|months|days|weeks)\b/gi, ["for + a length of time (for 3 years)", "for مع المدة (for 3 years)"]],
    [/\balot\b/gi, ["a lot (two words), or better: many / much", "a lot كلمتان، والأفضل many / much"]],
    [/\bthe (society|nature|life) (is|has|was|will|can|should)\b/gi, ["no \"the\" when you mean society / nature / life in general", "دون the عند الحديث عن المجتمع أو الطبيعة أو الحياة عمومًا"]],
    [/\bshould to\b|\bmust to\b|\bcan to\b/gi, ["no \"to\" after should / must / can", "دون to بعد should / must / can"]],
    [/,(?=[A-Za-z])/g, ["add a space after a comma", "أضف مسافة بعد الفاصلة"]]
  ];

  // ---------- writing analysis ----------
  var TARGET = { task1: [150, 0], task2: [250, 0], email: [60, 200], statement: [0, 0], short: [0, 0] };
  function sentences(text) { return String(text).replace(/\s+/g, " ").replace(/([.!?])\s+(?=[A-Z"“(])/g, "$1\u0001").split("\u0001").map(function (s) { return s.trim(); }).filter(Boolean); }
  function paragraphs(text) { return String(text).split(/\n\s*\n|\n(?=\s*\S)/).map(function (p) { return p.trim(); }).filter(function (p) { return words(p).length > 2; }); }
  function countPhrase(low, p) { var re = new RegExp("(^|[^a-z'])" + p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/'/g, "['’]") + "(?=$|[^a-z'])", "g"); return (low.match(re) || []).length; }
  function writing(text, kind, opt) {
    opt = opt || {};
    var tg = TARGET[kind] || [0, 0], min = opt.min != null ? opt.min : tg[0], max = opt.max != null ? opt.max : tg[1];
    var w = words(text), n = w.length, low = String(text).toLowerCase(), ielts = kind === "task1" || kind === "task2";
    var paras = paragraphs(text), sents = sentences(text), out = [];
    function add(c, ok, msg, extra) { out.push({ c: c, ok: ok, m: msg, x: extra }); }
    var C1 = ielts ? (kind === "task1" ? "ach" : "task") : "content", C2 = ielts ? "coh" : "structure", C3 = ielts ? "lex" : "style", C4 = ielts ? "gra" : "acc";
    // length
    if (max && n > max) add(C1, false, fmt(U.lenOver, { n: n, b: max }));
    else if (min && max) add(C1, n >= min, fmt(n >= min ? U.lenOk : U.lenRange, { n: n, a: min, b: max }));
    else if (min) add(C1, n >= min, fmt(n >= min ? U.lenOk : U.len, { n: n, t: min }));
    // task-specific content
    if (kind === "task2") {
      var posRe = /\b(i (strongly |completely |partly )?(believe|think|agree|disagree|feel)|in my (view|opinion)|this essay (will )?(argue|argues|discuss)|i would argue|it is my (view|belief))\b/i;
      add(C1, posRe.test(text), T(posRe.test(text) ? U.posOk : U.pos));
      var last = paras[paras.length - 1] || "", hasC = /^(in conclusion|to conclude|to sum up|in summary|overall|all things considered)\b/i.test(last.trim());
      add(C2, hasC, T(hasC ? U.conclOk : U.concl));
    }
    if (kind === "task1") {
      var hasO = /\b(overall|in general|it is clear that|the most (noticeable|striking|significant)|generally speaking)\b/i.test(text);
      add(C1, hasO, T(hasO ? U.overOk : U.over));
      var hasN = /\d/.test(text); add(C1, hasN, T(hasN ? U.numsOk : U.nums));
      var op = (text.match(/\b(i think|i believe|in my opinion|i feel|in my view)\b/i) || [])[0];
      if (op) add(C1, false, fmt(U.opinion1, { w: op }));
    }
    // paragraphs
    var wantP = kind === "task2" ? 4 : kind === "task1" ? 3 : kind === "statement" ? 3 : kind === "email" ? 3 : 2;
    if (n >= 80) {
      if (paras.length <= 1) add(C2, false, T(U.paras1));
      else if (paras.length < wantP) add(C2, false, fmt(U.parasFew, { n: paras.length, t: wantP }));
      else add(C2, true, fmt(U.parasN, { n: paras.length }));
    }
    // linking
    var used = LINKS.filter(function (p) { return countPhrase(low, p) > 0; });
    if (n >= 80) add(C2, used.length >= 3, used.length >= 3 ? fmt(U.link, { list: used.slice(0, 8).join(", ") }) : T(U.linkFew));
    var starts = {}; sents.forEach(function (s) { var sl = s.toLowerCase(); START_LINKS.forEach(function (k) { if (sl.indexOf(k + " ") === 0 || sl.indexOf(k + ",") === 0) starts[k] = (starts[k] || 0) + 1; }); });
    Object.keys(starts).forEach(function (k) { if (starts[k] >= 3) add(C2, false, fmt(U.linkOver, { w: k.charAt(0).toUpperCase() + k.slice(1), n: starts[k] })); });
    // repetition and variety
    var content = w.map(function (x) { return x.toLowerCase().replace(/[’']s$/, ""); }).filter(function (x) { return x.length > 3 && !STOPSET[x] && !/^\d/.test(x); });
    var freq = {}; content.forEach(function (x) { freq[x] = (freq[x] || 0) + 1; });
    var promptW = {}; words(opt.prompt || "").forEach(function (x) { promptW[x.toLowerCase()] = 1; });
    var lim = Math.max(4, Math.round(n * 0.025));
    var reps = Object.keys(freq).filter(function (k) { return freq[k] > lim && !promptW[k]; }).sort(function (a, b) { return freq[b] - freq[a]; }).slice(0, 4);
    if (n >= 80) add(C3, !reps.length, reps.length ? fmt(U.rep, { list: reps.map(function (k) { return k + " ×" + freq[k]; }).join(", ") }) : T(U.repOk));
    if (content.length >= 40) { var uniq = Object.keys(freq).length; add(C3, true, fmt(U.variety, { p: Math.round(uniq / content.length * 100) })); }
    if (ielts || kind === "statement") {
      var aw = Object.keys(freq).filter(function (k) { return AWLSET[k] || AWLSET[k.replace(/(s|es|ed|ing|ly)$/, "")] || AWLSET[k.replace(/(ies)$/, "y")]; });
      if (n >= 80) { var okA = aw.length >= Math.max(3, Math.round(n / 60)); add(C3, okA, okA ? fmt(U.awl, { list: aw.slice(0, 8).join(", ") }) : T(U.awlFew) + (aw.length ? " " + fmt(U.awl, { list: aw.join(", ") }) : "")); }
    }
    var cl = CLICHE.filter(function (p) { return low.indexOf(p) > -1 && !(kind === "email" && p === "thank you for considering"); });
    if (cl.length) add(C3, false, fmt(U.cliche, { list: cl.map(function (x) { return "“" + x + "”"; }).join(", ") }));
    if (kind !== "short") {
      var inf = INFORMAL.filter(function (p) { return countPhrase(low, p) > 0; });
      if (inf.length) add(C3, false, fmt(U.informal, { list: inf.join(", ") }));
    }
    if (ielts) {
      var contr = (text.match(/\b\w+['’](t|re|ve|ll|d|m)\b/gi) || []).filter(function (x, i, a) { return a.indexOf(x) === i; });
      if (contr.length) add(C3, false, fmt(U.contr, { list: contr.slice(0, 5).join(", ") }));
    }
    // sentences
    if (sents.length >= 3) {
      var lens = sents.map(function (s) { return words(s).length; }), avg = Math.round(lens.reduce(function (a, b) { return a + b; }, 0) / lens.length);
      var longN = lens.filter(function (x) { return x > 40; }).length;
      if (longN) add(C4, false, fmt(U.longS, { n: longN }));
      else if (avg < 9 && n >= 80) add(C4, false, T(U.shortS));
      else add(C4, true, fmt(U.avgS, { n: avg }));
    }
    // accuracy
    var found = [];
    ERRS.forEach(function (e) { var m = String(text).match(e[0]); if (m) found.push({ w: m[0], s: T(e[1]) }); });
    if (/(^|[.!?]\s+)[a-z]/.test(String(text).trim())) found.push({ w: "", s: T(U.caps) });
    if (/(^|\s)i(\s|['’])/.test(text)) found.push({ w: "i", s: T(U.lowI) });
    add(C4, !found.length, T(found.length ? U.errs : U.errsNone), found);
    var order = ielts ? [C1, "coh", "lex", "gra"] : ["content", "structure", "style", "acc"];
    return { kind: kind, n: n, items: out, order: order };
  }
  function writingHtml(r) {
    var groups = r.order.map(function (c) {
      var its = r.items.filter(function (i) { return i.c === c; }); if (!its.length) return "";
      var bad = its.filter(function (i) { return !i.ok; }).length;
      return '<div class="co-c' + (bad ? " has-fix" : "") + '"><div class="co-ch"><b>' + esc(T(U.crit[c])) + '</b><span class="co-badge ' + (bad ? "is-fix" : "is-ok") + '">' + (bad ? "⚠ " + esc(T(U.fix)) + " · " + bad : "✓ " + esc(T(U.good))) + "</span></div><ul>" +
        its.map(function (i) {
          return '<li class="' + (i.ok ? "is-ok" : "is-fix") + '"><span aria-hidden="true">' + (i.ok ? "✓" : "•") + "</span><div>" + esc(i.m) +
            (i.x && i.x.length ? '<ul class="co-errs">' + i.x.map(function (e) { return "<li>" + (e.w ? '<code lang="en" dir="ltr">' + esc(e.w) + "</code> → " : "") + '<span dir="auto">' + esc(e.s) + "</span></li>"; }).join("") + "</ul>" : "") + "</div></li>";
        }).join("") + "</ul></div>";
    }).join("");
    return '<div class="co-rep">' + groups + '<p class="co-note">' + esc(T(U.note)) + "</p></div>";
  }

  // a coach box under any writing area: button, report and the AI add-on card
  function writingBox(box, getText, kind, opt) {
    box.innerHTML = '<section class="co" aria-label="' + esc(T(U.coachT)) + '"><div class="co-top"><b>🧭 ' + esc(T(U.coachT)) + '</b><button type="button" class="btn btn-ghost co-go" data-co-go>' + esc(T(U.coachGo)) + "</button></div>" +
      '<p class="co-sub">' + esc(T(U.coachSub)) + '</p><div data-co-out aria-live="polite"></div>' + aiCard(kind) + "</section>";
    var outEl = box.querySelector("[data-co-out]"), go = box.querySelector("[data-co-go]");
    go.addEventListener("click", function () {
      var t = getText();
      if (words(t).length < 40) { outEl.innerHTML = '<p class="co-warn">' + esc(T(U.tooShort)) + "</p>"; return; }
      outEl.innerHTML = writingHtml(writing(t, kind, opt));
      go.textContent = T(U.coachAgain);
    });
    wireAi(box, function () { return { kind: kind, text: opt && opt.aiText ? opt.aiText() : getText(), task: (opt && opt.prompt) || "", meta: opt && opt.meta }; });
  }

  // ---------- speaking: live transcript (opt-in) and analysis ----------
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  function speechOn() { try { return localStorage.getItem("masarok-coach-speech") === "1"; } catch (e) { return false; } }
  function setSpeech(v) { try { localStorage.setItem("masarok-coach-speech", v ? "1" : "0"); } catch (e) {} }
  function speechToggle() {
    return '<label class="co-opt"><input type="checkbox" data-co-speech' + (speechOn() ? " checked" : "") + (SR ? "" : " disabled") + '><span>📝 ' + esc(T(U.spkOpt)) + "<small>" + esc(T(SR ? U.spkPriv : U.spkNo)) + "</small></span></label>";
  }
  document.addEventListener("change", function (e) { if (e.target && e.target.hasAttribute && e.target.hasAttribute("data-co-speech")) setSpeech(e.target.checked); });
  // start listening alongside a recording; returns { stop(secs) -> analysis or null }
  function listen() {
    if (!SR || !speechOn()) return null;
    var r, parts = [], t0 = Date.now(), stopped = false;
    try { r = new SR(); r.lang = "en-US"; r.continuous = true; r.interimResults = false; r.maxAlternatives = 1; } catch (e) { return null; }
    r.onresult = function (ev) { for (var i = ev.resultIndex; i < ev.results.length; i++) if (ev.results[i].isFinal) parts.push(ev.results[i][0].transcript); };
    var done = null;
    r.onend = function () { if (!stopped) { try { r.start(); } catch (e) {} } else if (done) { var d = done; done = null; d(); } };
    r.onerror = function () {};
    try { r.start(); } catch (e) { return null; }
    return {
      stop: function (secs) {
        stopped = true; try { r.stop(); } catch (e) {}
        return { text: parts.join(" ").replace(/\s+/g, " ").trim(), secs: secs || Math.round((Date.now() - t0) / 1000) };
      },
      // stop, then wait for the last words to arrive (browsers send them just after stopping)
      finish: function (secs, cb) {
        var s2 = secs || Math.round((Date.now() - t0) / 1000), fired = false;
        function go() { if (fired) return; fired = true; cb({ text: parts.join(" ").replace(/\s+/g, " ").trim(), secs: s2 }); }
        done = go; stopped = true; try { r.stop(); } catch (e) { go(); } setTimeout(go, 1500);
      }
    };
  }
  function speech(text, secs, target) {
    var w = words(text), n = w.length, low = " " + String(text).toLowerCase() + " ", out = [];
    if (!n) return { none: true };
    var wpm = Math.round(n / Math.max(1, secs) * 60);
    if (secs >= 10) out.push({ ok: wpm >= 90 && wpm <= 175, m: fmt(U.pace, { n: wpm }) + " " + T(wpm < 90 ? U.paceSlow : wpm > 175 ? U.paceFast : U.paceOk) });
    if (target) out.push({ ok: secs >= target, m: fmt(U.spokeFor, { n: secs }) + (secs < target ? " " + fmt(U.spokeShort, { n: target }) : "") });
    var fl = []; FILLERS.forEach(function (f) { var c = countPhrase(low, f); if (f === "like" || f === "actually" || f === "basically") { if (c >= 3) fl.push(f + " ×" + c); } else if (c) fl.push(f + " ×" + c); });
    out.push({ ok: !fl.length, m: fl.length ? fmt(U.fillers, { list: fl.join(", ") }) : T(U.fillersOk) });
    var used = LINKS.filter(function (p) { return countPhrase(low, p) > 0; });
    out.push({ ok: used.length >= 2, m: used.length >= 2 ? fmt(U.spkLinks, { list: used.join(", ") }) : T(U.spkLinksFew) });
    var content = w.map(function (x) { return x.toLowerCase(); }).filter(function (x) { return x.length > 3 && !STOPSET[x]; }), freq = {};
    content.forEach(function (x) { freq[x] = (freq[x] || 0) + 1; });
    var reps = Object.keys(freq).filter(function (k) { return freq[k] >= Math.max(4, n * 0.04); }).slice(0, 3);
    if (reps.length) out.push({ ok: false, m: fmt(U.rep, { list: reps.map(function (k) { return k + " ×" + freq[k]; }).join(", ") }) });
    return { text: text, secs: secs, wpm: wpm, items: out };
  }
  function speechHtml(r) {
    if (!r) return "";
    if (r.none) return '<div class="co-rep co-spk"><p class="co-warn">' + esc(T(U.spkNone)) + "</p></div>";
    return '<div class="co-rep co-spk"><div class="co-c"><div class="co-ch"><b>🧭 ' + esc(T(U.spkT)) + "</b></div><ul>" + r.items.map(function (i) {
      return '<li class="' + (i.ok ? "is-ok" : "is-fix") + '"><span aria-hidden="true">' + (i.ok ? "✓" : "•") + "</span><div>" + esc(i.m) + "</div></li>";
    }).join("") + '</ul></div><details class="co-tr"><summary>' + esc(T(U.heard)) + '</summary><p lang="en" dir="ltr">' + esc(r.text) + '</p><small>' + esc(T(U.heardNote)) + "</small></details></div>";
  }

  // ---------- AI feedback (paid add-on) ----------
  var AI_KIND = { task1: "ielts_task1", task2: "ielts_task2", speaking: "ielts_speaking", statement: "statement", short: "statement" };
  var AI_MIN = { ielts_task1: 60, ielts_task2: 80, ielts_speaking: 25, statement: 60 };
  function code() { try { return localStorage.getItem("masarok-ai-code") || ""; } catch (e) { return ""; } }
  function setCode(c) { try { if (c) localStorage.setItem("masarok-ai-code", c); else localStorage.removeItem("masarok-ai-code"); } catch (e) {} }
  function normCode(c) { var x = String(c || "").toUpperCase().replace(/[^A-Z0-9]/g, "").replace(/^MSRK/, ""); return x.length === 16 ? "MSRK-" + x.match(/.{4}/g).join("-") : ""; }
  function api(path, opts) {
    opts = opts || {};
    var h = { "Content-Type": "application/json" }, c = opts.code || code(); if (c && c !== "-") h.Authorization = "Bearer " + c;
    return fetch(AI.url.replace(/\/$/, "") + path, { method: opts.body ? "POST" : "GET", headers: h, body: opts.body ? JSON.stringify(opts.body) : undefined })
      .then(function (r) { return r.json().catch(function () { return { error: "server" }; }); }, function () { return { error: "network" }; });
  }
  var bal = null, balWait = null;
  function balance(force) {
    if (!AI.url || !code()) return Promise.resolve(null);
    if (bal && !force) return Promise.resolve(bal);
    if (!balWait || force) balWait = api("/balance").then(function (d) { bal = d && !d.error ? d : null; balWait = null; if (d && (d.error === "bad_code")) setCode(""); return d; });
    return balWait;
  }
  function errMsg(e) { return T(U.aiErr[e] || U.aiErr.server); }
  // the last AI feedback for each writing box, so a paid result isn't lost when you move on
  function lastKey(kind) { return kind + "|" + location.pathname + location.hash; }
  function lastGet(kind) { try { return (JSON.parse(localStorage.getItem("masarok-ai-last") || "{}"))[lastKey(kind)] || null; } catch (e) { return null; } }
  function lastSet(kind, f) {
    try { var all = JSON.parse(localStorage.getItem("masarok-ai-last") || "{}"); all[lastKey(kind)] = { at: Date.now(), f: f };
      var ks = Object.keys(all).sort(function (a, b) { return all[b].at - all[a].at; }); ks.slice(20).forEach(function (k) { delete all[k]; });
      localStorage.setItem("masarok-ai-last", JSON.stringify(all)); } catch (e) {}
  }
  function coachHref() { return (AR ? "/ar" : "") + "/academy/coach/"; }
  function aiCard(kind) {
    var k = AI_KIND[kind]; if (!k) return "";
    var head = '<div class="co-ai-h"><b>✨ ' + esc(T(U.aiT)) + '</b><span class="co-tag">' + esc(T(U.aiTag)) + "</span></div>";
    if (!AI.url) return '<div class="co-ai is-soon">' + head + "<p>" + esc(T(U.aiSoon)) + "</p></div>";
    var last = lastGet(k);
    return '<div class="co-ai" data-co-ai="' + esc(k) + '">' + head + '<div data-co-ai-body></div><div data-co-ai-out aria-live="polite">' +
      (last ? '<p class="co-small">' + esc(fmt(U.aiLast, { d: new Date(last.at).toLocaleDateString(AR ? "ar-SA-u-ca-gregory" : "en-AU", { day: "numeric", month: "short" }) })) + "</p>" + aiHtml(last.f) : "") + "</div></div>";
  }
  function aiBody(box) {
    var body = box.querySelector("[data-co-ai-body]"); if (!body) return;
    if (!code()) {
      body.innerHTML = '<p class="co-small co-pitch">' + esc(fmt(U.aiPitch, { n: AI.credits, p: T(AI.price) })) + '</p><div class="co-ai-row"><a class="btn btn-primary" href="' + coachHref() + '">' + esc(T(U.aiBuy)) + ' →</a><button type="button" class="es-link" data-co-have>' + esc(T(U.aiHave)) + "</button></div>" +
        '<div class="co-ai-row" data-co-enter hidden><label><span>' + esc(T(U.aiCode)) + '</span><input type="text" data-co-code autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="MSRK-XXXX-XXXX-XXXX-XXXX"></label><button type="button" class="btn btn-ghost" data-co-save>' + esc(T(U.aiSave)) + '</button></div><p class="co-warn" data-co-msg></p>';
      return;
    }
    body.innerHTML = '<div class="co-ai-row"><button type="button" class="btn btn-primary" data-co-ai-go>' + esc(T(U.aiGo)) + '</button><span class="co-small" data-co-credits></span><a class="es-link" href="' + coachHref() + '">' + esc(T(U.aiManage)) + "</a></div>" +
      '<p class="co-small">' + esc(T(U.aiPriv)) + "</p>";
    balance().then(function (d) {
      var cr = box.querySelector("[data-co-credits]"); if (!cr || !d) return;
      if (d.error) { cr.textContent = errMsg(d.error); return; }
      cr.textContent = fmt(U.aiCredits, { n: d.credits });
    });
  }
  function wireAi(box, getPayload) {
    var card = box.querySelector("[data-co-ai]"); if (!card) return;
    aiBody(card);
    card.addEventListener("click", function (e) {
      var t = e.target;
      if (t.closest("[data-co-have]")) { var en = card.querySelector("[data-co-enter]"); en.hidden = false; en.querySelector("input").focus(); return; }
      if (t.closest("[data-co-save]")) {
        var inp = card.querySelector("[data-co-code]"), msg = card.querySelector("[data-co-msg]"), c = normCode(inp.value);
        if (!c) { msg.textContent = errMsg("bad_code"); return; }
        msg.textContent = "…";
        api("/balance", { code: c }).then(function (d) {
          if (!d || d.error) { msg.textContent = errMsg(d && d.error); return; }
          setCode(c); bal = d; aiBody(card);
        });
        return;
      }
      if (!t.closest("[data-co-ai-go]")) return;
      var b = t.closest("[data-co-ai-go]"), out = card.querySelector("[data-co-ai-out]"), p = getPayload(), k = card.getAttribute("data-co-ai");
      if (words(p.text).length < AI_MIN[k]) { out.innerHTML = '<p class="co-warn">' + esc(fmt(U.aiNeed, { n: AI_MIN[k] })) + "</p>"; return; }
      b.disabled = true; out.innerHTML = '<p class="co-wait">⏳ ' + esc(T(U.aiWait)) + "</p>";
      var cc = null, lv = null; try { cc = localStorage.getItem("masarok-country"); lv = localStorage.getItem("masarok-level"); } catch (x) {}
      var meta = Object.assign({ country: cc && cc !== "all" ? cc : "", level: lv && lv !== "all" ? lv : "" }, p.meta || {});
      api("/feedback", { body: { kind: k, text: p.text, task: p.task || "", meta: meta, lang: AR ? "ar" : "en" } }).then(function (d) {
        b.disabled = false;
        if (d && d.credits != null) { bal = Object.assign(bal || {}, { credits: d.credits }); var cr = card.querySelector("[data-co-credits]"); if (cr) cr.textContent = fmt(U.aiCredits, { n: d.credits }); }
        if (!d || d.error || !d.feedback) {
          out.innerHTML = '<p class="co-warn">' + esc(errMsg(d && d.error)) + "</p>" + (d && (d.error === "no_credits" || d.error === "expired") ? '<a class="btn btn-primary" href="' + coachHref() + '">' + esc(T(U.aiBuy)) + " →</a>" : "");
          if (d && d.error === "bad_code") { setCode(""); aiBody(card); }
          return;
        }
        lastSet(k, d.feedback);
        out.innerHTML = aiHtml(d.feedback);
        var h = out.querySelector(".co-airep"); if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: false }); }
      });
    });
  }
  function aiHtml(f) {
    if (!f) return "";
    function L(x) { return '<span dir="auto">' + esc(x) + "</span>"; }
    var h = '<div class="co-rep co-airep">';
    if (f.overall != null) h += '<div class="co-band"><small>' + esc(T(U.aiOverall)) + "</small><b>" + esc(Number(f.overall).toFixed(1)) + "</b></div>";
    if (f.headline) h += '<p class="co-sum" dir="auto">' + esc(f.headline) + "</p>";
    (f.criteria || []).forEach(function (c) {
      var max = f.max || 9, sc = c.score == null ? "–" : max === 9 ? Number(c.score).toFixed(1) : c.score + "/" + max, pc = c.score == null ? 0 : Math.max(6, Math.round(c.score / max * 100));
      h += '<div class="co-c"><div class="co-ch"><b>' + esc(T(U.aiCrit[c.key] || [c.key, c.key])) + '</b><span class="co-badge ' + (c.score / max >= 0.66 ? "is-ok" : "is-fix") + '">' + esc(sc) + '</span></div><i class="co-bar"><b style="width:' + pc + '%"></b></i><p>' + L(c.comment) + "</p></div>";
    });
    if (f.kind === "ielts_speaking") h += '<p class="co-note">' + esc(T(U.aiSpkNote)) + "</p>";
    if ((f.strengths || []).length) h += "<h4>" + esc(T(U.aiStrengths)) + '</h4><ul class="tx-list">' + f.strengths.map(function (x) { return "<li>" + L(x) + "</li>"; }).join("") + "</ul>";
    if ((f.fixes || []).length) h += "<h4>" + esc(T(U.aiFixes)) + '</h4><ul class="co-corr">' + f.fixes.map(function (x) {
      return '<li><s lang="en" dir="ltr">' + esc(x.quote) + '</s><b lang="en" dir="ltr">' + esc(x.better) + "</b><small>" + L(x.issue) + "</small></li>"; }).join("") + "</ul>";
    if (f.model_text) h += '<details class="co-model"><summary>' + esc(T(U.aiModel)) + '</summary><p lang="en" dir="ltr">' + esc(f.model_text) + "</p></details>";
    if (f.next_step) h += '<p class="co-next"><b>🎯 ' + esc(T(U.aiNext)) + ":</b> " + L(f.next_step) + "</p>";
    return h + '<p class="co-note">' + esc(T(U.aiNote)) + "</p></div>";
  }

  // speaking report with the AI card for the transcript
  function speechReport(box, r, task) {
    if (!box) return;
    box.innerHTML = speechHtml(r) + (r && !r.none && words(r.text).length >= 25 && AI.url ? '<div class="co">' + aiCard("speaking") + "</div>" : "");
    wireAi(box, function () { return { kind: "speaking", text: r.text, task: task || "" }; });
  }

  // ---------- the coach page: buy, claim your code, manage it ----------
  var P = {
    soon: ["Opening soon", "قريبًا"], soonSub: ["The AI coach isn't open yet. The free coach in every lesson works now.", "المدرب الذكي لم يُفتح بعد، والمدرب المجاني في كل درس يعمل الآن."], tell: ["Tell me when it opens", "أخبرني عند الافتتاح"],
    buy: ["Buy for {p}", "اشترِ مقابل {p}"], pack: ["{n} AI feedbacks", "{n} مرة من ملاحظات الذكاء الاصطناعي"], packSub: ["One payment, no subscription · valid for {d} months", "دفعة واحدة دون اشتراك · صالحة {d} شهرًا"],
    paidT: ["Payment received. Here's your coach code", "تم الدفع، وهذا رمز المدرب الخاص بك"], paidSub: ["It's saved on this device. Copy it somewhere safe too: it's the only way to use your credits on another phone or computer.", "حُفظ على هذا الجهاز. انسخه واحفظه في مكان آمن أيضًا، فهو الطريقة الوحيدة لاستخدام رصيدك على جوال أو جهاز آخر."],
    claiming: ["Checking your payment…", "جارٍ التحقق من الدفع…"], claimFail: ["We couldn't confirm the payment yet. Refresh this page in a minute. If it still doesn't work, message me with your Stripe receipt.", "لم نتمكن من تأكيد الدفع بعد. حدّث الصفحة بعد دقيقة، وإذا استمرت المشكلة فراسلني مع إيصال Stripe."],
    copy: ["Copy code", "انسخ الرمز"], copied: ["Copied", "تم النسخ"], show: ["Show", "إظهار"], hide: ["Hide", "إخفاء"],
    yourT: ["Your coach code", "رمز المدرب الخاص بك"], left: ["{n} of {t} feedbacks left", "متبقٍ {n} من {t}"], until: ["Valid until {d}", "صالح حتى {d}"], remove: ["Remove from this device", "احذفه من هذا الجهاز"], removeSure: ["Tap again to remove", "اضغط مرة أخرى للحذف"],
    enterT: ["Already have a code?", "لديك رمز بالفعل؟"], enterGo: ["Use this code", "استخدم هذا الرمز"],
    sampleT: ["What feedback looks like", "شكل الملاحظات"], sampleSub: ["A sample on a short practice essay. Your own feedback is written for your text, in English or Arabic.", "مثال على مقال تدريبي قصير، أما ملاحظاتك فتُكتب لنصك أنت، بالإنجليزية أو العربية."]
  };
  var SAMPLE = { kind: "ielts_task2", max: 9, overall: 6, headline: "A clear position with relevant ideas, but the body paragraphs need fuller support and more precise vocabulary.",
    criteria: [{ key: "task_response", score: 6, comment: "You answer both parts and give your view, but the second reason is only stated, not explained." },
      { key: "coherence_cohesion", score: 6.5, comment: "Logical paragraphs. \"Firstly\" and \"Secondly\" start too many sentences; link ideas inside sentences too." },
      { key: "lexical_resource", score: 6, comment: "Good range for the topic, with some repetition of \"important\" and \"good\"." },
      { key: "grammar", score: 5.5, comment: "Mix of simple and complex sentences; frequent article and plural errors." }],
    strengths: ["Your opinion is clear in the introduction and the conclusion.", "Each paragraph has one main idea."],
    fixes: [{ quote: "Studying abroad is very important for the students.", issue: "Too general, and \"the students\" should be \"students\".", better: "Studying abroad can transform how students think and work." },
      { quote: "They learn many informations.", issue: "\"Information\" is uncountable.", better: "They gain a great deal of information." }],
    model_text: "Living in another country forces students to solve everyday problems on their own. When I moved to a new city for a summer course, for example, I had to open a bank account and find housing in a language I was still learning, which built my confidence far more than any classroom could.",
    next_step: "Practise explaining each reason with one specific example." };
  if (AR) {
    SAMPLE.headline = "موقفك واضح وأفكارك مناسبة، لكن فقرات العرض تحتاج دعمًا أكثر ومفردات أدق.";
    ["أجبت عن جزأي السؤال وذكرت رأيك، لكن السبب الثاني مذكور فقط دون شرح.", "الفقرات منطقية، لكن «Firstly» و«Secondly» تبدأ جملًا كثيرة، فاربط الأفكار داخل الجملة أيضًا.", "مفردات مناسبة للموضوع مع تكرار لكلمتي «important» و«good».", "مزيج من الجمل البسيطة والمركبة، مع أخطاء متكررة في أدوات التعريف والجمع."].forEach(function (c, i) { SAMPLE.criteria[i].comment = c; });
    SAMPLE.strengths = ["رأيك واضح في المقدمة والخاتمة.", "لكل فقرة فكرة رئيسية واحدة."];
    SAMPLE.fixes[0].issue = "عامة جدًا، والصحيح «students» دون «the».";
    SAMPLE.fixes[1].issue = "كلمة «information» غير معدودة.";
    SAMPLE.next_step = "تدرّب على شرح كل سبب بمثال واحد محدد.";
  }
  function page(root) {
    var on = !!AI.url, q = new URLSearchParams(location.search), sid = q.get("session_id");
    // Stripe always returns to the English page: send Arabic buyers back to the Arabic one
    var wantAr = null; try { wantAr = localStorage.getItem("masarok-ai-lang"); } catch (e) {}
    if (sid && wantAr === "ar" && !AR) { location.replace("/ar/academy/coach/" + location.search); return; }
    function wrap(h) { return '<section class="cp-card">' + h + "</section>"; }
    function packHtml() {
      return wrap('<div class="cp-pack"><div><b class="cp-n">' + esc(fmt(P.pack, { n: AI.credits })) + '</b><small>' + esc(fmt(P.packSub, { d: Math.round(AI.days / 30.4) })) + '</small></div><b class="cp-price">' + esc(T(AI.price)) + "</b></div>" +
        (on && AI.buy ? '<a class="btn btn-primary cp-buy" data-cp-buy href="' + esc(AI.buy) + '">' + esc(fmt(P.buy, { p: T(AI.price) })) + " →</a>" :
          '<button type="button" class="btn btn-primary" disabled>' + esc(T(P.soon)) + '</button><p class="co-small">' + esc(T(P.soonSub)) + ' <a href="https://t.me/badersm18" target="_blank" rel="noopener">' + esc(T(P.tell)) + " ↗</a></p>"));
    }
    function mine(d) {
      var c = code(); if (!c) return "";
      var masked = c.replace(/^(MSRK-\w{4})-\w{4}-\w{4}-(\w{4})$/, "$1-••••-••••-$2");
      return wrap("<h2>" + esc(T(P.yourT)) + '</h2><div class="cp-code"><code lang="en" dir="ltr" data-cp-code data-full="' + esc(c) + '" data-mask="' + esc(masked) + '">' + esc(masked) + '</code><button type="button" class="es-link" data-cp-show>' + esc(T(P.show)) + '</button><button type="button" class="es-link" data-cp-copy>' + esc(T(P.copy)) + "</button></div>" +
        (d && !d.error ? '<p class="cp-left">' + esc(fmt(P.left, { n: d.credits, t: d.total })) + '</p><i class="co-bar"><b style="width:' + Math.round(d.credits / Math.max(1, d.total) * 100) + '%"></b></i><p class="co-small">' + esc(fmt(P.until, { d: new Date(d.expires_at * 1000).toLocaleDateString(AR ? "ar-SA-u-ca-gregory" : "en-AU", { day: "numeric", month: "long", year: "numeric" }) })) + "</p>" : d && d.error ? '<p class="co-warn">' + esc(errMsg(d.error)) + "</p>" : "") +
        '<button type="button" class="es-link cp-rm" data-cp-rm>' + esc(T(P.remove)) + "</button>");
    }
    function enterHtml() {
      return code() ? "" : wrap("<h2>" + esc(T(P.enterT)) + '</h2><div class="co-ai-row"><label><span>' + esc(T(U.aiCode)) + '</span><input type="text" data-co-code autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="MSRK-XXXX-XXXX-XXXX-XXXX"></label><button type="button" class="btn btn-ghost" data-cp-enter' + (on ? "" : " disabled") + ">" + esc(T(P.enterGo)) + '</button></div><p class="co-warn" data-cp-msg></p>');
    }
    function draw(d, claimMsg) {
      var slot = root.querySelector("[data-cp-live]");
      slot.innerHTML = (claimMsg || "") + mine(d) + packHtml() + enterHtml();
    }
    var sample = root.querySelector("[data-cp-sample]"); if (sample) sample.innerHTML = aiHtml(SAMPLE);
    if (on && sid && /^cs_(test|live)_/.test(sid)) {
      draw(null, wrap('<p class="co-wait">⏳ ' + esc(T(P.claiming)) + "</p>"));
      api("/claim", { body: { session_id: sid }, code: "-" }).then(function (d) {
        if (!d || d.error || !d.code) { draw(null, wrap('<p class="co-warn">' + esc(T(P.claimFail)) + "</p>")); return; }
        setCode(d.code); bal = d;
        try { history.replaceState(null, "", location.pathname); } catch (e) {}
        draw(d, wrap('<div class="cp-paid"><b>🎉 ' + esc(T(P.paidT)) + '</b><code lang="en" dir="ltr" class="cp-big">' + esc(d.code) + '</code><button type="button" class="btn btn-primary" data-cp-copy-full>' + esc(T(P.copy)) + '</button><p class="co-small">' + esc(T(P.paidSub)) + "</p></div>"));
      });
    } else if (on && code()) { draw(null); balance(true).then(function (d) { draw(d); }); }
    else draw(null);
    var armed = false;
    root.addEventListener("click", function (e) {
      var t = e.target;
      function copy(txt, btn) { try { navigator.clipboard.writeText(txt).then(function () { var o = btn.textContent; btn.textContent = T(P.copied); setTimeout(function () { btn.textContent = o; }, 1500); }); } catch (x) {} }
      if (t.closest("[data-cp-buy]")) { try { localStorage.setItem("masarok-ai-lang", AR ? "ar" : "en"); } catch (x) {} return; }
      if (t.closest("[data-cp-copy-full]")) { copy(code(), t.closest("button")); return; }
      if (t.closest("[data-cp-copy]")) { copy(code(), t.closest("button")); return; }
      if (t.closest("[data-cp-show]")) { var el = root.querySelector("[data-cp-code]"), full = el.textContent === el.getAttribute("data-full"); el.textContent = el.getAttribute(full ? "data-mask" : "data-full"); t.textContent = T(full ? P.show : P.hide); return; }
      if (t.closest("[data-cp-rm]")) { if (!armed) { armed = true; t.textContent = T(P.removeSure); setTimeout(function () { armed = false; }, 4000); return; } setCode(""); bal = null; draw(null); return; }
      if (t.closest("[data-cp-enter]")) {
        var inp = root.querySelector("[data-co-code]"), msg = root.querySelector("[data-cp-msg]"), c = normCode(inp.value);
        if (!c) { msg.textContent = errMsg("bad_code"); return; }
        msg.textContent = "…";
        api("/balance", { code: c }).then(function (d) { if (!d || d.error) { msg.textContent = errMsg(d && d.error); return; } setCode(c); bal = d; draw(d); });
      }
    });
  }
  var pg = document.getElementById("coach-page"); if (pg) page(pg);

  window.MasarokCoach = { writing: writing, writingHtml: writingHtml, writingBox: writingBox, speechSupported: !!SR, speechToggle: speechToggle, listen: listen, speech: speech, speechHtml: speechHtml, speechReport: speechReport, aiOn: function () { return !!AI.url; }, aiHtml: aiHtml, _ai: AI };
})();

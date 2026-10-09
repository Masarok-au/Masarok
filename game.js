/* Masarok — the journey as a game
   Points for every small task and step, journey ranks, milestone badges drawn as Sadu medals,
   celebrations, a tip unlocked with each finished step, and a progress card to share.
   Everything is worked out from the journey's saved progress, so it stays on this device. */
(function () {
  var AR = (document.documentElement.lang || "en").slice(0, 2) === "ar";
  function T(x) { return Array.isArray(x) ? x[AR ? 1 : 0] : x; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function fmt(s, o) { return T(s).replace(/\{(\w+)\}/g, function (m, k) { return o[k] != null ? o[k] : m; }); }
  function reduced() { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); }
  var J = function () { return window.MasarokJourney; };

  // ---------- ranks and badges ----------
  var RANKS = [
    { at: 0, n: ["Dreamer", "الحالم"] },
    { at: 100, n: ["Explorer", "المستكشف"] },
    { at: 300, n: ["Traveller", "الرحّال"] },
    { at: 600, n: ["Voyager", "المسافر"] },
    { at: 1000, n: ["Arrived", "الواصل"] }
  ];
  var ICON = {
    star: '<path d="M12 3l2.6 5.6 6 .7-4.5 4 1.3 6-5.4-3.1-5.4 3.1 1.3-6L3.4 9.3l6-.7z" fill="currentColor" stroke="none"/>',
    stairs: '<path d="M3 20h5v-5h5v-5h5V5h3"/>',
    talk: '<path d="M4 5h16v10H10l-5 4v-4H4z"/><path d="M9.5 12.5l2.5-5 2.5 5M10.4 10.8h3.2"/>',
    letter: '<path d="M3 6h18v12H3z"/><path d="M3 6l9 7 9-7"/>',
    palm: '<path d="M12 21V10"/><path d="M12 10C9.5 6.5 6 6.2 3.5 8"/><path d="M12 10c2.5-3.5 6-3.8 8.5-2"/><path d="M12 10c-1.5-4-4.5-6-8-6"/><path d="M12 10c1.5-4 4.5-6 8-6"/><path d="M9 21h6"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
    passport: '<path d="M6 3h12v18H6z"/><circle cx="12" cy="10" r="3"/><path d="M9 16.5h6"/>',
    home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
    plane: '<path d="M3 11l18-8-6 18-3-7z"/><path d="M12 14l9-11"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    map: '<path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14M15 6v14"/>',
    sunrise: '<path d="M3 18h18"/><path d="M6 18a6 6 0 0 1 12 0"/><path d="M12 5v3M4.6 10.6l2 1.1M19.4 10.6l-2 1.1"/>',
    summit: '<path d="M3 20l7-11 4 6 2-3 5 8z"/><path d="M10 9V3l5 2-5 2"/>',
    bulb: '<path d="M9 18h6M10 21h4"/><path d="M8.5 14.5A6 6 0 1 1 15.5 14.5c-.9.8-1.5 1.7-1.5 3h-4c0-1.3-.6-2.2-1.5-3z"/>',
    target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/>',
    lock: '<rect x="6" y="11" width="12" height="9" rx="2"/><path d="M8.5 11V8a3.5 3.5 0 0 1 7 0v3"/>'
  };
  function anyDone(c, ids) { return ids.some(function (id) { return c.done[id] === "done"; }); }
  var BADGES = [
    { id: "first", i: "star", n: ["First step", "الخطوة الأولى"], d: ["Tick your first small task.", "أنجز أول مهمة صغيرة."], t: function (c) { return c.tasks > 0 || c.steps > 0; } },
    { id: "stepper", i: "stairs", n: ["On the ladder", "على السلّم"], d: ["Finish your first step.", "أكمل أول خطوة."], t: function (c) { return c.steps > 0; } },
    { id: "english", i: "talk", n: ["Language ready", "اللغة جاهزة"], d: ["Reach your English score.", "حقق درجة اللغة المطلوبة."], t: function (c) { return anyDone(c, ["englishF", "englishB", "englishPg"]); } },
    { id: "offer", i: "letter", n: ["Offer in hand", "القبول بيدك"], d: ["Get your university offer.", "احصل على قبول الجامعة."], t: function (c) { return anyDone(c, ["offerF", "offer"]); } },
    { id: "nominated", i: "palm", n: ["Nominated", "مرشّح للبعثة"], d: ["Finish the scholarship application step.", "أكمل خطوة التقديم على البعثة."], t: function (c) { return anyDone(c, ["qubool"]); } },
    { id: "guarantee", i: "shield", n: ["Backed", "الضمان بيدك"], d: ["Get your financial guarantee.", "احصل على الضمان المالي."], t: function (c) { return anyDone(c, ["safeer"]); } },
    { id: "visa", i: "passport", n: ["Visa ready", "التأشيرة جاهزة"], d: ["Finish the visa step.", "أكمل خطوة التأشيرة."], t: function (c) { return anyDone(c, ["visa"]); } },
    { id: "home", i: "home", n: ["A place to live", "بيتك الجديد"], d: ["Sort out your first place to stay.", "رتّب سكنك الأول."], t: function (c) { return anyDone(c, ["housing"]); } },
    { id: "landed", i: "plane", n: ["Landed", "وصلت"], d: ["Finish your arrival steps.", "أكمل خطوات الوصول."], t: function (c) { return anyDone(c, ["arrive"]); } },
    { id: "halfway", i: "compass", n: ["Halfway there", "منتصف الطريق"], d: ["Complete half of your path.", "أنجز نصف طريقك."], t: function (c) { return c.n && (c.steps + c.skips) / c.n >= 0.5; } },
    { id: "keeper", i: "clock", n: ["Deadline keeper", "حارس المواعيد"], d: ["Set reminders for 3 deadlines.", "فعّل التذكير لثلاثة مواعيد."], t: function (c) { return c.reminders >= 3; } },
    { id: "explorer", i: "map", n: ["Explorer", "المستكشف"], d: ["Open 8 sections of the guide.", "افتح 8 أقسام من الدليل."], t: function (c) { return c.sections >= 8; } },
    { id: "early", i: "sunrise", n: ["Early bird", "السبّاق"], d: ["Finish a step a month or more before its deadline.", "أنجز خطوة قبل موعدها بشهر أو أكثر."], t: function (c) { return c.early; } },
    { id: "quiz", i: "bulb", n: ["Sharp mind", "الذهن الحاضر"], d: ["Get 5 quick checks right.", "أجب إجابة صحيحة عن 5 أسئلة سريعة."], t: function (c) { return c.quiz >= 5; } },
    { id: "quester", i: "target", n: ["Side quester", "صاحب المهمات"], d: ["Finish 5 side quests.", "أنجز 5 مهمات جانبية."], t: function (c) { return c.quests >= 5; } },
    { id: "summit", i: "summit", n: ["The summit", "القمة"], d: ["Finish your whole path.", "أكمل طريقك كاملًا."], t: function (c) { return c.n && c.steps + c.skips >= c.n; } }
  ];
  // a tip unlocked when a step is finished, for the stage that comes next
  var TIPS = {
    fieldRoute: ["Keep one note with each program's entry score and deadline. You'll check it more often than you think.", "احتفظ بملاحظة واحدة فيها درجة القبول وموعد التقديم لكل برنامج، فسترجع إليها أكثر مما تتوقع."],
    fieldUni: ["Keep one note with each program's entry score and deadline. You'll check it more often than you think.", "احتفظ بملاحظة واحدة فيها درجة القبول وموعد التقديم لكل برنامج، فسترجع إليها أكثر مما تتوقع."],
    courseType: ["Keep one note with each program's entry requirements and deadline. You'll check it more often than you think.", "احتفظ بملاحظة واحدة فيها شروط القبول وموعد التقديم لكل برنامج، فسترجع إليها أكثر مما تتوقع."],
    researchArea: ["Read two or three recent papers by each possible supervisor before you write to them.", "اقرأ بحثين أو ثلاثة حديثة لكل مشرف محتمل قبل أن تراسله."],
    englishF: ["Book your test with time for one retake. Needing a second try is normal.", "احجز اختبارك بوقت يكفي لإعادته مرة، فالمحاولة الثانية أمر طبيعي."],
    englishB: ["Book your test with time for one retake. Needing a second try is normal.", "احجز اختبارك بوقت يكفي لإعادته مرة، فالمحاولة الثانية أمر طبيعي."],
    englishPg: ["Book your test with time for one retake. Needing a second try is normal.", "احجز اختبارك بوقت يكفي لإعادته مرة، فالمحاولة الثانية أمر طبيعي."],
    rulesF: ["Take a dated screenshot of the Ministry list showing your university and field.", "التقط صورة مؤرخة لقائمة الوزارة تظهر فيها جامعتك وتخصصك."],
    uniCheckPg: ["Take a dated screenshot of the Ministry list showing your university and field.", "التقط صورة مؤرخة لقائمة الوزارة تظهر فيها جامعتك وتخصصك."],
    uniCheckPhd: ["Take a dated screenshot of the Ministry list showing your university and field.", "التقط صورة مؤرخة لقائمة الوزارة تظهر فيها جامعتك وتخصصك."],
    sat: ["Only sit the tests your university asks for. Extra scores rarely add anything.", "لا تقدّم إلا الاختبارات التي تطلبها جامعتك، فالدرجات الإضافية نادرًا ما تضيف شيئًا."],
    docs: ["Scan every document once, in colour, and name the files clearly. You'll reuse them again and again.", "امسح كل مستند مرة واحدة بالألوان، وسمِّ الملفات بوضوح، فستستخدمها مرارًا."],
    premaster: ["Ask whether finishing the pre-master's guarantees your place in the master's.", "اسأل هل إكمال ما قبل الماجستير يضمن مقعدك في الماجستير."],
    supervisor: ["Keep your first email to a supervisor short: who you are, your idea in two lines, and your CV.", "اجعل رسالتك الأولى للمشرف قصيرة: من أنت، وفكرتك في سطرين، وسيرتك الذاتية."],
    offerF: ["Put every condition on your offer into your calendar. Missing a small one can delay everything.", "ضع كل شرط في خطاب القبول في تقويمك، فنسيان شرط صغير قد يؤخر كل شيء."],
    offer: ["Put every condition on your offer into your calendar. Missing a small one can delay everything.", "ضع كل شرط في خطاب القبول في تقويمك، فنسيان شرط صغير قد يؤخر كل شيء."],
    qubool: ["Make a folder on your phone for every Qubool and Safeer screenshot. Records save you stress later.", "خصص مجلدًا في جوالك لصور منصتي قبول وسفير، فالتوثيق يريحك لاحقًا."],
    safeer: ["Send your guarantee to the university as soon as you get it, and ask them to confirm they received it.", "أرسل خطاب الضمان للجامعة فور استلامه، واطلب منهم تأكيد وصوله."],
    visa: ["Keep paper and digital copies of your visa, passport and offer in your carry-on bag.", "احتفظ بنسخ ورقية وإلكترونية من التأشيرة والجواز والقبول في حقيبة اليد."],
    housing: ["Never pay a deposit for a place you haven't seen in person or on a live video call.", "لا تدفع تأمينًا لسكن لم تره بنفسك أو في مكالمة فيديو مباشرة."],
    arrive: ["Say yes to orientation events in your first week. It's the easiest time to make friends.", "احضر فعاليات الأسبوع التعريفي، فهو أسهل وقت لتكوين الصداقات."],
    progressF: ["Ask about your credit transfer early, before your degree starts.", "اسأل عن معادلة الساعات مبكرًا قبل بدء البكالوريوس."]
  };
  var UI = {
    pts: ["{n} pts", "{n} نقطة"], plus: ["+{n}", "+{n}"],
    rank: ["Rank", "الرتبة"], next: ["{n} pts to {r}", "{n} نقطة حتى «{r}»"], top: ["Top rank reached", "وصلت لأعلى رتبة"],
    badges: ["Badges {d}/{n}", "الأوسمة {d}/{n}"], shelfT: ["Your badges", "أوسمتك"], shelfSub: ["Earn them by moving through your journey. Each one is woven with Sadu, like the tents of the desert.", "تكسبها بالتقدم في رحلتك، وكل وسام منسوج بنقش السدو مثل بيوت الشعر في البادية."],
    stepDone: ["Step complete!", "أنجزت الخطوة!"], gotPts: ["+{n} points", "+{n} نقطة"], rankUp: ["New rank", "رتبة جديدة"],
    newBadge: ["Badge earned", "حصلت على وسام"], newBadges: ["Badges earned", "حصلت على أوسمة"], tip: ["Tip unlocked", "نصيحة جديدة"],
    cont: ["Keep going", "واصل"], share: ["Share my progress", "شارك تقدمي"], close: ["Close", "إغلاق"], locked: ["Locked", "مقفل"],
    shareLine: ["I'm {p}% of the way to studying {in}", "أنجزت {p}% من طريقي للدراسة {in}"],
    shareSub: ["My step-by-step plan on Masarok", "خطتي خطوة بخطوة على مسارُك"],
    shareText: ["I'm {p}% of the way to studying {in}. Plan yours on Masarok:", "أنجزت {p}% من طريقي للدراسة {in}. خطط لطريقك على مسارُك:"],
    abroad: ["abroad", "في الخارج"], quests: ["Side quests {d}/{n}", "المهمات {d}/{n}"], wardrobe: ["Wardrobe", "الخزانة"], outfit: ["New outfit unlocked", "زيّ جديد مفتوح"], saved: ["Image saved", "حُفظت الصورة"]
  };

  // ---------- saved game state ----------
  var GK = "masarok-game";
  function gload() { var g = null; try { g = JSON.parse(localStorage.getItem(GK) || "null"); } catch (e) {} g = g || {}; g.seen = g.seen || []; g.sections = g.sections || []; g.bonus = g.bonus || {}; return g; }
  var g = gload();
  function gsave() { try { localStorage.setItem(GK, JSON.stringify(g)); } catch (e) {} }

  // ---------- progress → points ----------
  function ctx() {
    var j = J(), c = { tasks: 0, steps: 0, skips: 0, n: 0, done: {}, reminders: 0, sections: g.sections.length, early: !!g.early, lv: null, quiz: 0, quests: 0, bonus: 0 };
    Object.keys(g.bonus).forEach(function (k) { var v = +g.bonus[k] || 0; c.bonus += v; if (k.indexOf("quiz:") === 0 && v > 0) c.quiz++; if (k.indexOf("quest:") === 0) c.quests++; });
    try { c.reminders = (JSON.parse(localStorage.getItem("masarok-reminders") || "[]") || []).length; } catch (e) {}
    if (!j) return c;
    var st = j.state(), lv = j.level(); c.lv = lv;
    if (!st || !st.started || !lv) return c;
    var ids = j.steps(lv), dm = (st.done && st.done[lv]) || {};
    c.n = ids.length; c.done = dm;
    ids.forEach(function (id) {
      if (dm[id] === "done") { c.steps++; c.tasks += j.taskCount(lv, id); }
      else if (dm[id] === "skip") c.skips++;
      else c.tasks += j.taskDone(lv, id);
    });
    return c;
  }
  function earned(c) { return BADGES.filter(function (b) { return b.t(c); }).map(function (b) { return b.id; }); }
  function points(c, e) { return c.tasks * 10 + c.steps * 50 + c.skips * 20 + (e || earned(c)).length * 30 + c.bonus; }
  function rankOf(p) { var r = 0; RANKS.forEach(function (x, i) { if (p >= x.at) r = i; }); return r; }
  function pct(c) { return c.n ? Math.round((c.steps + c.skips) / c.n * 100) : 0; }

  // ---------- Sadu medal (SVG) ----------
  var uid = 0;
  function medal(icon, opts) {
    opts = opts || {};
    var id = "gm" + (uid++), locked = !!opts.locked, N = 20, R1 = 33, R2 = 44, tri = "", gold = "";
    for (var i = 0; i < N; i++) {
      var a0 = (i / N) * Math.PI * 2, a1 = ((i + 1) / N) * Math.PI * 2, am = (a0 + a1) / 2;
      function P(r, a) { return (50 + r * Math.sin(a)).toFixed(2) + " " + (50 - r * Math.cos(a)).toFixed(2); }
      tri += "M" + P(R1, a0) + " L" + P(R2, am) + " L" + P(R1, a1) + " Z ";
      gold += "M" + P(R2, a1) + " L" + P(R2 - 4.4, a1) + " ";
    }
    var diamonds = [0, 90, 180, 270].map(function (d) {
      var a = d * Math.PI / 180, x = 50 + 38.6 * Math.sin(a), y = 50 - 38.6 * Math.cos(a);
      return '<path d="M' + x.toFixed(1) + " " + (y - 3.4).toFixed(1) + " l3.4 3.4 -3.4 3.4 -3.4 -3.4z" + '" fill="#F3EBDD"/>';
    }).join("");
    return '<svg class="gm-medal' + (locked ? " is-locked" : "") + '" viewBox="0 0 100 122" aria-hidden="true" focusable="false">' +
      '<defs><radialGradient id="' + id + 'g" cx="50%" cy="38%" r="70%"><stop offset="0" stop-color="#21436B"/><stop offset="1" stop-color="#0B1626"/></radialGradient></defs>' +
      // ribbon tails
      '<path d="M36 84 L28 118 L37 112 L43 120 L49 88 Z" fill="#9C2A22"/><path d="M64 84 L72 118 L63 112 L57 120 L51 88 Z" fill="#9C2A22"/>' +
      '<path d="M37.2 90 L32.4 110 M62.8 90 L67.6 110" stroke="#F3EBDD" stroke-width="2" stroke-dasharray="3 3"/>' +
      // Sadu ring
      '<circle cx="50" cy="50" r="45.5" fill="#2A1612" stroke="#C99A5B" stroke-width="2"/>' +
      '<path d="' + tri + '" fill="#9C2A22"/>' +
      '<path d="' + gold + '" stroke="#C99A5B" stroke-width="1.2"/>' + diamonds +
      '<circle cx="50" cy="50" r="32" fill="url(#' + id + 'g)" stroke="#C99A5B" stroke-width="1.6"/>' +
      '<g transform="translate(32 32) scale(1.5)" fill="none" stroke="#E2B66C" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" style="color:#E2B66C">' + ICON[locked ? "lock" : icon] + "</g>" +
      (opts.tier != null ? '<g fill="#E2B66C">' + [0, 1, 2, 3, 4].slice(0, opts.tier + 1).map(function (k, i, arr) { return '<circle cx="' + (50 + (i - (arr.length - 1) / 2) * 6) + '" cy="76" r="1.8"/>'; }).join("") + "</g>" : "") +
      "</svg>";
  }
  function rankMedal(r) { return medal(["star", "compass", "map", "plane", "summit"][r], { tier: r }); }

  // ---------- styles ----------
  var css =
    ".gm-bar{display:grid; grid-template-columns:auto 1fr auto; gap:6px 14px; align-items:center; padding:12px 14px; border-radius:14px; border:1px solid rgba(226,182,108,.45); background:linear-gradient(135deg, rgba(226,182,108,.12), rgba(156,42,34,.10))}" +
    ".gm-bar .gm-medal{width:46px; height:56px}" +
    ".gm-rk{display:grid; gap:3px; min-width:0}" +
    ".gm-rk b{font-family:var(--f-display); font-size:1.08rem; color:var(--night-ink)}" +
    ".gm-rk small{color:var(--night-dim); font-size:.84rem}" +
    ".gm-xp{height:7px; border-radius:999px; background:rgba(238,242,247,.12); overflow:hidden}" +
    ".gm-xp i{display:block; height:100%; background:linear-gradient(90deg, #9C2A22, #E2B66C); border-radius:999px; transition:width .6s ease}" +
    ".gm-acts{display:flex; flex-direction:column; gap:6px; align-items:stretch}" +
    ".gm-btn{font:inherit; font-size:.85rem; color:var(--night-ink); background:rgba(255,255,255,.05); border:1px solid rgba(226,182,108,.5); border-radius:999px; padding:5px 12px; cursor:pointer; white-space:nowrap}" +
    ".gm-btn:hover{background:rgba(226,182,108,.16)}" +
    ".gm-btn:focus-visible{outline:2px solid var(--gold); outline-offset:2px}" +
    "@media (max-width:560px){ .gm-bar{grid-template-columns:auto 1fr} .gm-acts{grid-column:1 / -1; display:grid; grid-template-columns:1fr 1fr} .gm-acts .gm-btn{white-space:normal} }" +
    ".gm-chip{display:flex; align-items:center; gap:8px; font-size:.86rem; color:var(--night-ink)}" +
    ".gm-chip .gm-medal{width:26px; height:32px}" +
    ".gm-chip b{color:var(--gold)}" +
    ".gm-float{position:fixed; z-index:140; pointer-events:none; font-family:var(--f-display); font-weight:800; color:#E2B66C; text-shadow:0 2px 8px rgba(0,0,0,.6); font-size:1.05rem}" +
    ".gm-confetti{position:fixed; inset:0; z-index:130; pointer-events:none; overflow:hidden}" +
    ".gm-confetti i{position:absolute; top:-20px; width:10px; height:10px; transform:rotate(45deg)}" +
    ".gm-ov{position:fixed; inset:0; z-index:125; display:grid; place-items:center; padding:calc(16px + env(safe-area-inset-top, 0px)) 16px calc(16px + env(safe-area-inset-bottom, 0px)); background:rgba(5,10,18,.66); backdrop-filter:blur(4px)}" +
    ".gm-ov[hidden]{display:none}" +
    ".gm-card{position:relative; width:min(30rem, 100%); max-height:calc(100dvh - 32px); overflow:auto; background:var(--night, #0B1626); color:var(--night-ink, #EEF2F7); border:1px solid rgba(226,182,108,.5); border-radius:18px; box-shadow:0 30px 80px -20px rgba(0,0,0,.8); text-align:center; padding:0 0 20px; animation:gmPop .45s cubic-bezier(.2,.9,.3,1.2) both}" +
    ".gm-card > .sadu{position:sticky; top:0}" +
    ".gm-in{padding:18px 20px 0; display:grid; gap:12px; justify-items:center}" +
    ".gm-card h2{margin:0; font-size:1.5rem; color:var(--night-ink)}" +
    ".gm-pts{font-family:var(--f-display); font-weight:800; font-size:2rem; color:#E2B66C}" +
    ".gm-sec{width:100%; border-top:1px dashed rgba(238,242,247,.16); padding-top:12px; display:grid; gap:8px; justify-items:center}" +
    ".gm-sec h3{margin:0; font-family:var(--f-mono); font-size:.74rem; letter-spacing:.12em; text-transform:uppercase; color:var(--night-dim, #A9B8CB)}" +
    ".gm-row{display:flex; flex-wrap:wrap; justify-content:center; gap:14px}" +
    ".gm-badge{display:grid; gap:4px; justify-items:center; width:96px; font-size:.84rem}" +
    ".gm-badge .gm-medal{width:72px; height:88px}" +
    ".gm-card .gm-badge .gm-medal{animation:gmShine 1.2s ease .2s both}" +
    ".gm-tip{max-width:26rem; color:#C8D3E0; font-size:.98rem; background:rgba(255,255,255,.04); border-radius:12px; padding:10px 14px; text-align:start}" +
    ".gm-tip b{color:#E2B66C}" +
    ".gm-foot{display:flex; flex-wrap:wrap; gap:10px; justify-content:center; padding-top:6px}" +
    ".gm-x{position:absolute; top:28px; inset-inline-end:12px; width:34px; height:34px; border-radius:50%; border:1px solid rgba(238,242,247,.25); background:transparent; color:inherit; font-size:1.2rem; cursor:pointer}" +
    ".gm-shelf{display:grid; grid-template-columns:repeat(auto-fill, minmax(96px, 1fr)); gap:14px 8px; width:100%; text-align:center}" +
    ".gm-shelf .gm-badge{width:auto}" +
    ".gm-shelf .gm-badge small{color:var(--night-dim, #A9B8CB); font-size:.76rem; line-height:1.35}" +
    ".gm-medal.is-locked{filter:grayscale(1); opacity:.38}" +
    ".gm-sub{color:#C8D3E0; font-size:.94rem; max-width:26rem}" +
    "@keyframes gmPop{from{opacity:0; transform:scale(.86) translateY(14px)} to{opacity:1; transform:none}}" +
    "@keyframes gmShine{0%{transform:scale(.4) rotate(-14deg); opacity:0} 60%{transform:scale(1.12) rotate(4deg); opacity:1} 100%{transform:none}}" +
    "@media (prefers-reduced-motion: reduce){ .gm-card, .gm-card .gm-badge .gm-medal{animation:none} .gm-xp i{transition:none} }";
  var st0 = document.createElement("style"); st0.textContent = css; document.head.appendChild(st0);

  // ---------- small celebrations ----------
  function floatAt(el, text) {
    if (!el || reduced()) return;
    var r = el.getBoundingClientRect(), f = document.createElement("span");
    f.className = "gm-float"; f.textContent = text;
    f.style.left = (r.left + r.width / 2 - 12) + "px"; f.style.top = (r.top - 6) + "px";
    document.body.appendChild(f);
    var a = f.animate ? f.animate([{ transform: "translateY(0)", opacity: 1 }, { transform: "translateY(-34px)", opacity: 0 }], { duration: 900, easing: "ease-out" }) : null;
    setTimeout(function () { f.remove(); }, 950);
  }
  function confetti() {
    if (reduced()) return;
    var box = document.createElement("div"); box.className = "gm-confetti";
    var cols = ["#9C2A22", "#E2B66C", "#F3EBDD", "#C99A5B", "#2A1612"];
    for (var i = 0; i < 46; i++) {
      var p = document.createElement("i");
      p.style.left = (Math.random() * 100) + "%";
      p.style.background = cols[i % cols.length];
      var s = 6 + Math.random() * 7; p.style.width = s + "px"; p.style.height = s + "px";
      box.appendChild(p);
      if (p.animate) p.animate([
        { transform: "translate(0,0) rotate(45deg)", opacity: 1 },
        { transform: "translate(" + (Math.random() * 160 - 80) + "px," + (window.innerHeight + 40) + "px) rotate(" + (405 + Math.random() * 360) + "deg)", opacity: .9 }
      ], { duration: 1600 + Math.random() * 1400, delay: Math.random() * 300, easing: "cubic-bezier(.2,.6,.4,1)", fill: "forwards" });
    }
    document.body.appendChild(box);
    setTimeout(function () { box.remove(); }, 3400);
    try { if (navigator.vibrate) navigator.vibrate(30); } catch (e) {}
  }

  // ---------- overlay (celebration, badge shelf) ----------
  var ov;
  function overlay(html) {
    if (!ov) {
      ov = document.createElement("div"); ov.className = "gm-ov"; ov.hidden = true;
      document.body.appendChild(ov);
      ov.addEventListener("click", function (e) {
        if (e.target === ov || e.target.closest("[data-gm-close]")) closeOv();
        if (e.target.closest("[data-gm-share]")) share();
        if (e.target.closest("[data-gm-shelf]")) shelf();
      });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape" && ov && !ov.hidden) closeOv(); });
    }
    ov.innerHTML = '<div class="gm-card" role="dialog" aria-modal="true" aria-labelledby="gm-h"><div class="sadu" aria-hidden="true"></div>' +
      '<button type="button" class="gm-x" data-gm-close aria-label="' + esc(T(UI.close)) + '">×</button><div class="gm-in">' + html + "</div></div>";
    ov.hidden = false;
    var f = ov.querySelector("[data-gm-cont]") || ov.querySelector(".gm-x"); if (f) setTimeout(function () { f.focus(); }, 60);
  }
  function closeOv() { if (ov) ov.hidden = true; }
  function badgeHtml(b, locked, withDesc) {
    return '<div class="gm-badge">' + medal(b.i, { locked: locked }) + "<b>" + esc(T(b.n)) + "</b>" + (withDesc ? "<small>" + esc(T(b.d)) + "</small>" : "") + "</div>";
  }

  function shelf() {
    var c = ctx(), e = earned(c);
    overlay('<h2 id="gm-h">' + esc(T(UI.shelfT)) + '</h2><p class="gm-sub">' + esc(T(UI.shelfSub)) + "</p>" +
      '<div class="gm-shelf">' + BADGES.map(function (b) { return badgeHtml(b, e.indexOf(b.id) < 0, true); }).join("") + "</div>" +
      '<div class="gm-foot"><button type="button" class="btn btn-primary" data-gm-close data-gm-cont>' + esc(T(UI.cont)) + "</button></div>");
  }

  // ---------- checking for new badges and ranks ----------
  function check(reason) {
    var prev = lastPts;
    var c = ctx(), e = earned(c), p = points(c, e), r = rankOf(p);
    var fresh = e.filter(function (id) { return g.seen.indexOf(id) < 0; });
    lastPts = p;
    var up = g.rank != null && r > g.rank;
    if (!g.init) { g.init = true; g.seen = e.slice(); g.rank = r; gsave(); paint(); return; }
    g.seen = g.seen.concat(fresh); g.rank = Math.max(g.rank || 0, r); gsave();
    paint();
    if (reason && reason.type === "quiet") {
      // points counted, no popup
    } else if (reason && reason.type === "step") {
      celebrateStep(reason, c, p, fresh, up ? r : null, prev);
    } else if (fresh.length || up) {
      celebrateSmall(fresh, up ? r : null);
    }
  }
  var lastPts = null;
  function celebrateStep(reason, c, p, fresh, newRank, prev) {
    confetti();
    var gained = prev != null ? Math.max(0, p - prev) : 50;
    var tip = !reason.skip && TIPS[reason.id];
    var h = '<h2 id="gm-h">' + esc(T(UI.stepDone)) + "</h2>" +
      '<div class="gm-pts">' + esc(fmt(UI.gotPts, { n: gained })) + "</div>";
    if (newRank != null) h += '<div class="gm-sec"><h3>' + esc(T(UI.rankUp)) + '</h3><div class="gm-badge">' + rankMedal(newRank) + "<b>" + esc(T(RANKS[newRank].n)) + "</b></div>" + outfitLine(newRank) + "</div>";
    if (fresh.length) h += '<div class="gm-sec"><h3>' + esc(T(fresh.length > 1 ? UI.newBadges : UI.newBadge)) + '</h3><div class="gm-row">' +
      fresh.map(function (id) { return badgeHtml(BADGES.filter(function (b) { return b.id === id; })[0], false); }).join("") + "</div></div>";
    if (tip) h += '<div class="gm-sec"><h3>' + esc(T(UI.tip)) + '</h3><p class="gm-tip">💡 ' + esc(T(tip)) + "</p></div>";
    h += '<div class="gm-foot"><button type="button" class="btn btn-primary" data-gm-close data-gm-cont>' + esc(T(UI.cont)) + '</button><button type="button" class="gm-btn" data-gm-share>' + esc(T(UI.share)) + "</button></div>";
    setTimeout(function () { overlay(h); }, reduced() ? 0 : 450);
  }
  function outfitLine(r) {
    var W = window.MasarokQuests, o = W && W.outfitAt ? W.outfitAt(r) : null;
    return o ? '<p class="gm-tip">🧥 <b>' + esc(T(UI.outfit)) + ":</b> " + esc(o) + "</p>" : "";
  }
  function celebrateSmall(fresh, newRank) {
    confetti();
    var h = "";
    if (newRank != null) h += '<h2 id="gm-h">' + esc(T(UI.rankUp)) + '</h2><div class="gm-badge">' + rankMedal(newRank) + "<b>" + esc(T(RANKS[newRank].n)) + "</b></div>" + outfitLine(newRank);
    if (fresh.length) h += (newRank != null ? '<div class="gm-sec">' : "") + '<h2 id="gm-h">' + esc(T(fresh.length > 1 ? UI.newBadges : UI.newBadge)) + '</h2><div class="gm-row">' +
      fresh.map(function (id) { return badgeHtml(BADGES.filter(function (b) { return b.id === id; })[0], false, true); }).join("") + "</div>" + (newRank != null ? "</div>" : "");
    h += '<div class="gm-foot"><button type="button" class="btn btn-primary" data-gm-close data-gm-cont>' + esc(T(UI.cont)) + '</button><button type="button" class="gm-btn" data-gm-shelf>' + esc(T(fmt(UI.badges, { d: g.seen.length, n: BADGES.length }))) + "</button></div>";
    overlay(h);
  }

  // ---------- the rank bar in the guide and on the plan card ----------
  function rankInfo() {
    var c = ctx(), e = earned(c), p = points(c, e), r = rankOf(p), nx = RANKS[r + 1];
    var w = nx ? Math.round((p - RANKS[r].at) / (nx.at - RANKS[r].at) * 100) : 100;
    return { c: c, e: e, p: p, r: r, nx: nx, w: w };
  }
  function paint() {
    var k = rankInfo();
    // inside the guide (main screen)
    var meta = document.querySelector(".jr-panel:not([hidden]) .jr-meta");
    var bar = document.querySelector(".jr-panel .gm-bar");
    if (meta && k.c.n) {
      if (!bar) { bar = document.createElement("div"); bar.className = "gm-bar"; meta.parentNode.insertBefore(bar, meta.nextSibling); }
      bar.innerHTML = rankMedal(k.r) +
        '<div class="gm-rk"><b>' + esc(T(RANKS[k.r].n)) + " · " + esc(fmt(UI.pts, { n: k.p })) + "</b>" +
        '<div class="gm-xp" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + k.w + '"><i style="width:' + k.w + '%"></i></div>' +
        "<small>" + esc(k.nx ? fmt(UI.next, { n: k.nx.at - k.p, r: T(k.nx.n) }) : T(UI.top)) + "</small></div>" +
        '<div class="gm-acts"><button type="button" class="gm-btn" data-gm-shelf>🏅 ' + esc(fmt(UI.badges, { d: k.e.length, n: BADGES.length })) + '</button>' +
        (window.MasarokQuests ? '<button type="button" class="gm-btn" data-gq>🎯 ' + esc(fmt(UI.quests, { d: k.c.quests, n: window.MasarokQuests.total() })) + '</button><button type="button" class="gm-btn" data-gw>🧥 ' + esc(T(UI.wardrobe)) + '</button>' : "") +
        '<button type="button" class="gm-btn" data-gm-share>' + esc(T(UI.share)) + "</button></div>";
    }
    // on the plan card under the hero
    var plan = document.querySelector(".jr-banner .jr-plan:not([hidden])");
    if (plan && k.c.n) {
      var chip = plan.querySelector(".gm-chip");
      if (!chip) { chip = document.createElement("div"); chip.className = "gm-chip"; plan.insertBefore(chip, plan.firstChild); }
      chip.innerHTML = rankMedal(k.r) + "<span><b>" + esc(T(RANKS[k.r].n)) + "</b> · " + esc(fmt(UI.pts, { n: k.p })) + " · 🏅 " + k.e.length + "/" + BADGES.length + "</span>";
    }
  }

  // ---------- share card (story-size image) ----------
  function svgImg(svg) {
    return new Promise(function (res) {
      var im = new Image();
      im.onload = function () { res(im); }; im.onerror = function () { res(null); };
      im.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg.replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" '));
    });
  }
  function share() {
    var k = rankInfo(), P = pct(k.c);
    var M = window.MasarokCountry, cc = window.Masarok && window.Masarok.values ? window.Masarok.values().cc : null;
    var inPlace = M && cc && M.data[cc] ? T(M.data[cc].inPlace) : T(UI.abroad);
    var W = 1080, H = 1920, cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    var x = cv.getContext("2d");
    var font = AR ? '"IBM Plex Sans Arabic", "Geeza Pro", Tahoma, sans-serif' : '"Bricolage Grotesque", "Segoe UI", system-ui, sans-serif';
    // night sky
    var gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#173252"); gr.addColorStop(1, "#0B1626");
    x.fillStyle = gr; x.fillRect(0, 0, W, H);
    x.fillStyle = "rgba(238,242,247,.8)";
    for (var i = 0; i < 90; i++) { x.globalAlpha = .3 + Math.random() * .6; x.beginPath(); x.arc(Math.random() * W, Math.random() * H * .7, Math.random() * 2.4 + .6, 0, 7); x.fill(); }
    x.globalAlpha = 1;
    // Sadu bands
    function sadu(y) {
      x.fillStyle = "#2A1612"; x.fillRect(0, y, W, 54);
      x.fillStyle = "#C99A5B"; x.fillRect(0, y, W, 6); x.fillRect(0, y + 48, W, 6);
      for (var sx = 0; sx < W; sx += 48) {
        x.fillStyle = "#9C2A22";
        x.beginPath(); x.moveTo(sx, y + 6); x.lineTo(sx + 24, y + 27); x.lineTo(sx + 48, y + 6); x.fill();
        x.beginPath(); x.moveTo(sx, y + 48); x.lineTo(sx + 24, y + 27); x.lineTo(sx + 48, y + 48); x.fill();
        x.fillStyle = "#F3EBDD"; x.beginPath(); x.moveTo(sx + 24, y + 17); x.lineTo(sx + 34, y + 27); x.lineTo(sx + 24, y + 37); x.lineTo(sx + 14, y + 27); x.fill();
      }
    }
    sadu(0); sadu(H - 54);
    x.textAlign = "center"; x.direction = AR ? "rtl" : "ltr";
    x.fillStyle = "#E2B66C"; x.font = "800 64px " + font; x.fillText(AR ? "مسارُك" : "Masarok", W / 2, 190);
    // progress ring
    var cx = W / 2, cy = 560, R = 230;
    x.lineWidth = 34; x.strokeStyle = "rgba(238,242,247,.14)"; x.beginPath(); x.arc(cx, cy, R, 0, Math.PI * 2); x.stroke();
    var rg = x.createLinearGradient(cx - R, cy, cx + R, cy); rg.addColorStop(0, "#9C2A22"); rg.addColorStop(1, "#E2B66C");
    x.strokeStyle = rg; x.lineCap = "round"; x.beginPath(); x.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * Math.max(.02, P / 100)); x.stroke();
    x.fillStyle = "#EEF2F7"; x.font = "800 150px " + font; x.fillText(P + "%", cx, cy + 50);
    // headline
    function wrap(t, y, size, color, weight) {
      x.font = (weight || 700) + " " + size + "px " + font; x.fillStyle = color;
      var words = t.split(" "), line = "", lines = [];
      words.forEach(function (w) { var test = line ? line + " " + w : w; if (x.measureText(test).width > W - 160 && line) { lines.push(line); line = w; } else line = test; });
      lines.push(line);
      lines.forEach(function (l, i) { x.fillText(l, W / 2, y + i * size * 1.3); });
      return y + lines.length * size * 1.3;
    }
    var y = wrap(fmt(UI.shareLine, { p: P, "in": inPlace }), 930, 66, "#EEF2F7", 800);
    y = wrap(T(UI.shareSub), y + 10, 40, "#A9B8CB", 500);
    // rank + badges
    var badges = k.e.slice(-6);
    Promise.all([svgImg(rankMedal(k.r))].concat(badges.map(function (id) { var b = BADGES.filter(function (q) { return q.id === id; })[0]; return svgImg(medal(b.i)); }))).then(function (ims) {
      if (ims[0]) x.drawImage(ims[0], cx - 90, y + 40, 180, 220);
      x.fillStyle = "#E2B66C"; x.font = "800 54px " + font; x.fillText(T(RANKS[k.r].n) + " · " + fmt(UI.pts, { n: k.p }), cx, y + 320);
      var bs = ims.slice(1).filter(Boolean), bw = 130, gap = 20, total = bs.length * bw + (bs.length - 1) * gap, bx = cx - total / 2;
      bs.forEach(function (im, i) { x.drawImage(im, bx + i * (bw + gap), y + 380, bw, bw * 1.22); });
      x.fillStyle = "#EEF2F7"; x.font = "700 52px " + font; x.direction = "ltr"; x.fillText("masarok.org", cx, H - 120);
      cv.toBlob(function (blob) {
        if (!blob) return;
        var file = new File([blob], "masarok-progress.png", { type: "image/png" });
        var text = fmt(UI.shareText, { p: P, "in": inPlace });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          navigator.share({ files: [file], text: text + " https://masarok.org" }).catch(function () {});
        } else {
          var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "masarok-progress.png";
          document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
        }
      }, "image/png");
    });
  }

  // ---------- wiring ----------
  document.addEventListener("masarok:journey", function (e) {
    var d = e.detail || {};
    if (d.type === "task" && d.on) floatAt(d.el, fmt(UI.plus, { n: 10 }));
    if (d.type === "step" && d.early) { g.early = true; gsave(); }
    if (d.type === "step" || d.type === "task") check(d.type === "step" ? d : null);
  });
  document.addEventListener("masarok:journey-render", function () { setTimeout(function () { paint(); check(null); }, 0); });
  document.addEventListener("masarok:journey-banner", function () { paint(); });
  document.addEventListener("masarok:section-open", function (e) {
    var id = e.detail && e.detail.id; if (!id || g.sections.indexOf(id) > -1) return;
    g.sections.push(id); gsave(); if (g.init) check(null);
  });
  document.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest(".jr-panel [data-gm-shelf]")) shelf();
    if (e.target.closest && e.target.closest(".jr-panel [data-gm-share]")) share();
    if (e.target.closest && (e.target.closest("[data-remind]") || e.target.closest("input[data-dl]"))) setTimeout(function () { check(null); }, 50);
  });
  document.addEventListener("change", function (e) { if (e.target.closest && e.target.closest("input[data-dl]")) setTimeout(function () { check(null); }, 50); });

  // bonus points from quick checks and side quests: each key pays once
  function award(key, pts, el, quiet) {
    if (g.bonus[key] != null) return false;
    g.bonus[key] = pts; gsave();
    if (el && pts > 0) floatAt(el, fmt(UI.plus, { n: pts }));
    check(quiet ? { type: "quiet" } : null);
    return true;
  }
  function has(key) { return g.bonus[key] != null; }

  window.MasarokGame = { badges: BADGES, ranks: RANKS, medal: medal, shelf: shelf, share: share, info: rankInfo,
    award: award, has: has, bonus: function () { return g.bonus; }, overlay: overlay, closeOverlay: closeOv, refresh: paint, confetti: confetti, rankMedal: rankMedal };

  function init() { setTimeout(function () { check(null); paint(); }, 300); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();

/* Masarok homepage (v3, from the Claude Design "Read the road, then take off")
   First visit: a 3-step picker (country, university, level). Then a moonlit hero with the road of 10 levels,
   a Guide me card that opens after the student reads 5 short sections, a sticky progress rail, 5 stacked
   sections, a gate with a boarding pass, all topics, and a reader that shows the full guide sections.
   Motion only moves and fades, is worked out once per frame from the scroll, and Reduce Motion turns it off. */
(function () {
  "use strict";
  var root = document.documentElement;
  var AR = (root.lang || "en").slice(0, 2) === "ar", L = AR ? 1 : 0, sgn = AR ? -1 : 1;
  function T(x) { return Array.isArray(x) ? x[L] : x; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return [].slice.call((r || document).querySelectorAll(s)); }
  var clamp = function (v) { return Math.max(0, Math.min(1, v)); };
  var reduce = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function put(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  // ---------- state ----------
  var LOCK_GUIDE = true; // Guide me opens after the 5 sections are read (set false to turn the gate off)
  var K = { read: "masarok-home-read", unlocked: "masarok-home-unlocked", picked: "masarok-home-picked", sound: "masarok-sound" };
  var READ = []; try { READ = JSON.parse(get(K.read) || "[]").filter(function (n) { return n >= 0 && n < 5; }); } catch (e) {}
  var UNLOCKED = get(K.unlocked) === "1";
  function started() { try { var j = JSON.parse(get("masarok-journey") || "null"); return !!(j && j.started); } catch (e) { return false; } }
  function locked() { return LOCK_GUIDE && !UNLOCKED && !started(); }
  // arriving at /#journey while Guide me is still closed: stay on the homepage and point at the sections
  var hashWanted = /^#journey$/.test(location.hash);
  if (hashWanted && locked()) { try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {} }

  // ---------- words ----------
  var S = {
    eyebrow: ["Free · Made by a Saudi student at UNSW", "مجاني · من إعداد طالب سعودي في UNSW"],
    sound: ["Sound", "الصوت"], level: ["Level", "المستوى"],
    guide: ["Guide me", "دُلّني"], today: ["Today's next step", "خطوتك التالية اليوم"], learn: ["Learn", "تعلّم"], doT: ["Do", "نفّذ"], check: ["Check", "تحقّق"],
    lockMsg: ["Guide me opens after you read the 5 sections below.", "يُفتح «دُلّني» بعد قراءة الأقسام الخمسة بالأسفل."],
    readOf: ["{n} of 5 read", "قرأت {n} من 5"], startReading: ["Start reading", "ابدأ القراءة"], openGuide: ["Open Guide me", "افتح «دُلّني»"],
    change: ["Change", "تغيير"], chooseUni: ["Choose your university", "اختر جامعتك"],
    gateLabel: ["Gate · Guide me", "البوابة · دُلّني"], gateReady: ["Your plane is waiting", "طائرتك بانتظارك"], gateLocked: ["Boarding opens soon", "الصعود يُفتح قريبًا"], gateDone: ["Welcome back on board", "أهلًا بك على متن الرحلة"],
    bodyReady: ["You read every section. Board now and Masarok takes you to Guide me.", "قرأت كل الأقسام. اصعد الآن ويأخذك مسارُك إلى «دُلّني»."],
    bodyLocked: ["Read every section to board. Still to read:", "اقرأ كل الأقسام لتصعد. بقي عليك:"],
    bodyDone: ["Guide me is unlocked. Your plan is at the top of the page.", "تم فتح «دُلّني». خطتك في أعلى الصفحة."],
    pass: ["Boarding pass", "بطاقة صعود"], fromCity: ["Riyadh", "الرياض"], passenger: ["Passenger", "الراكب"], you: ["You", "أنت"], flight: ["Flight", "الرحلة"], date: ["Date", "التاريخ"],
    seat: ["Seat", "المقعد"], gate: ["Gate", "البوابة"], boarding: ["Boarding", "الصعود"], now: ["Now", "الآن"], closed: ["Closed", "مغلق"], open: ["Open", "مفتوح"], stamps: ["Sections read", "الأقسام المقروءة"],
    board: ["Board to Guide me", "اصعد إلى «دُلّني»"], boardBack: ["Back to Guide me", "عُد إلى «دُلّني»"], left: ["{n} of 5 still to read", "بقي {n} من 5 للقراءة"], takeoff: ["Taking you to Guide me", "نأخذك إلى «دُلّني»"],
    allTopics: ["All topics", "كل المواضيع"], toast: ["Guide me is unlocked", "تم فتح «دُلّني»"], notYet: ["Read the 5 sections first, then board to Guide me.", "اقرأ الأقسام الخمسة أولًا، ثم اصعد إلى «دُلّني»."],
    ftLine: ["Masarok · Made by Bader", "مسارُك · من إعداد بدر"],
    ftNote: ["One student's experience, not official advice. Always confirm with the official sources. Last updated October 2026.", "تجربة طالب واحد، وليست نصيحة رسمية. تأكد دائمًا من المصادر الرسمية. آخر تحديث أكتوبر 2026."],
    back: ["Back", "رجوع"], toHome: ["Back to the homepage", "العودة إلى الصفحة الرئيسية"], guideT: ["The guide", "الدليل"],
    // picker
    welcome: ["Welcome to Masarok", "أهلًا بك في مسارُك"], q0: ["Where do you want to study?", "أين تريد أن تدرس؟"], s0: ["Your guide, dates and costs follow your choice. You can change it any time.", "دليلك ومواعيدك وتكاليفك تتبع اختيارك، ويمكنك تغييره متى شئت."],
    unis: ["{n} universities", "{n} جامعات"], unis2: ["2 universities", "جامعتان"], q1: ["Which university?", "أي جامعة؟"], s1: ["Pick your first choice in {c}.", "اختر جامعتك الأولى في {c}."],
    notSure: ["Not sure yet", "لم أقرر بعد"], notSureSub: ["See every university in {c}", "اعرض كل جامعات {c}"],
    q2: ["What will you study?", "ماذا ستدرس؟"], s2: ["At {u}.", "في {u}."], s2any: ["In {c}.", "في {c}."],
    readyE: ["Your road is ready", "طريقك جاهز"], ready: ["Riyadh to {c}", "من الرياض إلى {c}"], show: ["Show my guide", "اعرض دليلي"],
    note: ["Saved on this phone. You can change it any time.", "محفوظ على هذا الجهاز، ويمكنك تغييره متى شئت."], stepOf: ["{n} of 3", "{n} من 3"],
    country: ["Country", "الدولة"], uni: ["University", "الجامعة"], study: ["Study level", "المرحلة"], anyUni: ["Not chosen yet", "لم تُحدد بعد"]
  };
  function fmt(k, o) { return T(S[k] || k).replace(/\{(\w+)\}/g, function (m, x) { return o[x] != null ? o[x] : m; }); }
  var FLAGS = { au: "🇦🇺", uk: "🇬🇧", us: "🇺🇸", ca: "🇨🇦", de: "🇩🇪", sg: "🇸🇬" };
  var STAGES = { foundation: [["Foundation", "السنة التأسيسية"], ["A preparatory year before your degree", "سنة تحضيرية قبل الدرجة الجامعية"]],
    bachelor: [["Bachelor's", "البكالوريوس"], ["Your first degree, straight after high school", "درجتك الجامعية الأولى بعد الثانوية"]],
    master: [["Master's", "الماجستير"], ["After your bachelor's degree", "بعد البكالوريوس"]],
    phd: [["PhD", "الدكتوراه"], ["A research degree with a supervisor", "درجة بحثية بإشراف أكاديمي"]] };
  // the airport you would usually fly into for each university city
  var AIR = { sydney: "SYD", melbourne: "MEL", brisbane: "BNE", adelaide: "ADL", perth: "PER", canberra: "CBR", boston: "BOS", newyork: "JFK", losangeles: "LAX", bayarea: "SFO",
    pittsburgh: "PIT", seattle: "SEA", austin: "AUS", madison: "MSN", philadelphia: "PHL", statecollege: "SCE", london: "LHR", manchester: "MAN", edinburgh: "EDI", birmingham: "BHX",
    leeds: "LBA", toronto: "YYZ", vancouver: "YVR", montreal: "YUL", waterloo: "YYZ", munich: "MUC", berlin: "BER", aachen: "DUS", karlsruhe: "FRA", singapore: "SIN" };
  var CAPITAL_AIR = { au: ["SYD", "Sydney", "سيدني"], us: ["IAD", "Washington", "واشنطن"], uk: ["LHR", "London", "لندن"], ca: ["YYZ", "Toronto", "تورنتو"], de: ["FRA", "Frankfurt", "فرانكفورت"], sg: ["SIN", "Singapore", "سنغافورة"] };

  // ---------- icons (24px line icons, as in the design) ----------
  var P = { menu: "M4 7h16M4 12h16M4 17h16", down: "M12 5v14M6 13l6 6 6-6", arrR: "M5 12h14M13 6l6 6-6 6", arrL: "M19 12H5M11 6l-6 6 6 6", check: "M5 12.5l4.5 4.5L19 7",
    lock: "M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 017 0v3", unlock: "M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 016.8-1.2", snd: "M4 9h4l5-4v14l-5-4H4zM16 9a4 4 0 010 6M18.5 6.5a8 8 0 010 11", mute: "M4 9h4l5-4v14l-5-4H4zM17 9.5l5 5M22 9.5l-5 5", x: "M6 6l12 12M18 6L6 18" };
  var PLANE = "M22 12c0-.8-1-1.2-2-1.2h-6L9 3.5H7l3 7.3H5.5L3.8 8.2H2.5l1 3.8-1 3.8h1.3l1.7-2.6H10l-3 7.3h2l5-7.3h6c1 0 2-.4 2-1.2z";
  var STAR = "M12 1.5c.9 6 4.5 9.6 10.5 10.5-6 .9-9.6 4.5-10.5 10.5-.9-6-4.5-9.6-10.5-10.5 6-.9 9.6-4.5 10.5-10.5z";
  function ic(d, fill) { return '<svg viewBox="0 0 24 24" width="100%" height="100%" ' + (fill ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"') + ' aria-hidden="true" focusable="false"><path d="' + d + '"/></svg>'; }
  var I = { star: ic(STAR, 1), plane: ic(PLANE, 1), fwd: ic(AR ? P.arrL : P.arrR), back: ic(AR ? P.arrR : P.arrL) };
  Object.keys(P).forEach(function (k) { if (!I[k]) I[k] = ic(P[k]); });

  // ---------- sound: tiny Web Audio ticks, only after the first tap ----------
  var ac = null, soundOn = get(K.sound) !== "0";
  function wake() {
    if (!ac) { var A = window.AudioContext || window.webkitAudioContext; if (A) try { ac = new A(); } catch (e) {} }
    if (ac && ac.state === "suspended") ac.resume();
  }
  function canPlay() { return soundOn && ac && ac.state === "running"; }
  function tone(freq, start, dur, type, vol, glide) {
    var o = ac.createOscillator(), g = ac.createGain();
    o.type = type; o.frequency.setValueAtTime(glide || freq, start);
    if (glide) o.frequency.exponentialRampToValueAtTime(freq, start + Math.min(0.05, dur));
    g.gain.setValueAtTime(0.0001, start); g.gain.exponentialRampToValueAtTime(vol, start + 0.006); g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    o.connect(g).connect(ac.destination); o.start(start); o.stop(start + dur + 0.02);
  }
  function click(t) {
    var len = Math.floor(ac.sampleRate * 0.012), b = ac.createBuffer(1, len, ac.sampleRate), d = b.getChannelData(0);
    for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    var s = ac.createBufferSource(), f = ac.createBiquadFilter(), g = ac.createGain();
    f.type = "highpass"; f.frequency.value = 2500; g.gain.value = 0.5; s.buffer = b; s.connect(f).connect(g).connect(ac.destination); s.start(t);
  }
  function playTick(i) { if (!canPlay()) return; var t = ac.currentTime, f = [880, 988, 1109, 1319, 1480][i] || 880; click(t); tone(f, t + 0.004, 0.14, "triangle", 0.18, f * 2); }
  function playChord() { if (!canPlay()) return; var t = ac.currentTime + 0.12; [659, 831, 988, 1319].forEach(function (f, k) { tone(f, t + k * 0.07, 0.9, "sine", 0.09); }); }
  function playWhoosh() {
    if (!canPlay()) return;
    var t = ac.currentTime, o = ac.createOscillator(), g = ac.createGain();
    o.type = "sine"; o.frequency.setValueAtTime(160, t); o.frequency.exponentialRampToValueAtTime(760, t + 1.3);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.08, t + 0.3); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);
    o.connect(g).connect(ac.destination); o.start(t); o.stop(t + 1.5);
  }

  // ---------- data from the rest of the site ----------
  function M() { return window.Masarok; }
  function MC() { return window.MasarokCountry; }
  function choice() {
    var cur = M() && M().current ? M().current() : { cc: null, uni: null };
    var cc = cur.cc && cur.cc !== "all" ? cur.cc : null;
    var u = cur.uni && M().uniInfo ? M().uniInfo(cur.uni) : null;
    var lv = null; try { lv = M().values().level; } catch (e) {}
    return { cc: cc, uni: u, level: lv && STAGES[lv] ? lv : null };
  }
  function cName(cc) { var d = MC() && MC().data[cc]; return d ? T(d.short) : ""; }
  function dest(c) {
    if (c.uni && AIR[c.uni.city]) return { code: AIR[c.uni.city], city: c.uni.cityName };
    if (!c.cc) return { code: "?", city: AR ? "وجهتك" : "Your choice" };
    var x = CAPITAL_AIR[c.cc]; return { code: x[0], city: x[1 + L] };
  }
  function levelNow() {
    var J = window.MasarokJourney, LV = window.MasarokLevels, n = 1;
    try { if (J && started()) n = J.levelNow(); } catch (e) {}
    n = Math.max(1, Math.min(10, n || 1));
    var d = LV && LV.list[n - 1];
    var stars = { learn: false, check: false, "do": false };
    try { var all = J && started() ? J.levels() : []; if (all[n - 1]) stars = all[n - 1]; } catch (e) {}
    return { n: n, name: d ? T(d.name) : "", goal: d ? T(d.goal) : "", stars: stars };
  }

  // ---------- hero road (390 × 500 artboard, from the design) ----------
  var W = 390;
  function roadPt(u) { var y = 118 + 322 * Math.pow(1 - u, 1.5), a = 105 * (1 - u) + 10, x = 195 + a * Math.sin(u * 2.3 * Math.PI + 0.35); return [AR ? W - x : x, y]; }
  function tOf(n) { return (n - 1) / 9 * 0.96; }
  function roadSvg(lvl) {
    var N = 72, pts = [], h = "", k;
    for (k = 0; k <= N; k++) pts.push(roadPt(k / N));
    function w(u) { return 2 + 24 * Math.pow(1 - u, 1.35); }
    function seg(k, width, stroke) { return '<path d="M' + pts[k][0].toFixed(1) + " " + pts[k][1].toFixed(1) + "L" + pts[k + 1][0].toFixed(1) + " " + pts[k + 1][1].toFixed(1) + '" stroke="' + stroke + '" stroke-width="' + width.toFixed(2) + '" stroke-linecap="round" fill="none"/>'; }
    for (k = 0; k < N; k++) h += seg(k, w(k / N) + 4, "rgba(5,10,20,.5)");
    for (k = 0; k < N; k++) h += seg(k, w(k / N) + 1.5, "rgba(233,220,195,.22)");
    for (k = 0; k < N; k++) h += seg(k, w(k / N), "#26354C");
    var uCur = tOf(lvl);
    for (k = 0; k < N; k++) { var u = k / N; if (u < uCur) h += seg(k, Math.max(1.2, w(u) * 0.13), "#E2B66C"); else if (k % 3 === 0) h += seg(k, Math.max(0.7, w(u) * 0.08), "rgba(233,220,195," + (0.25 + 0.4 * (1 - u)).toFixed(2) + ")"); }
    for (var n = 1; n <= 10; n++) { var p = roadPt(tOf(n)), r = 3 + 6 * (1 - tOf(n)); h += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="' + r.toFixed(1) + '" fill="' + (n < lvl ? "#E2B66C" : "#0B1626") + '" stroke="' + (n === lvl ? "#E2B66C" : n < lvl ? "none" : "rgba(238,242,247,.5)") + '" stroke-width="' + (n === lvl ? 3 : 1.4) + '"/>'; }
    var e = roadPt(1);
    h += '<circle cx="' + e[0].toFixed(1) + '" cy="' + (e[1] - 4).toFixed(1) + '" r="22" fill="url(#h3mg)"/><path d="' + STAR + '" fill="#E2B66C" transform="translate(' + (e[0] - 10).toFixed(1) + " " + (e[1] - 26).toFixed(1) + ') scale(.85)"/>';
    return '<svg class="h3-road" width="390" height="500" viewBox="0 0 390 500" aria-hidden="true" focusable="false"><defs><radialGradient id="h3mg"><stop offset="0" stop-color="#E2B66C" stop-opacity=".45"/><stop offset="1" stop-color="#E2B66C" stop-opacity="0"/></radialGradient></defs>' + h + "</svg>";
  }

  // ---------- the 5 sections, from the site's own data ----------
  var VISA = { au: [["500", "500"], ["Visa subclass", "فئة التأشيرة"]], us: [["F-1", "F-1"], ["Student visa", "تأشيرة الطالب"]], uk: [["Student", "Student"], ["Visa route", "نوع التأشيرة"]],
    ca: [["Study", "دراسة"], ["Study permit", "تصريح الدراسة"]], de: [["National", "وطنية"], ["Student visa (D)", "تأشيرة الطالب (D)"]], sg: [["Pass", "Pass"], ["Student's Pass", "تصريح الطالب"]] };
  function money(v, cur) { return cur + Math.round(v).toLocaleString("en-US"); }
  function shortDate(iso) {
    var d = new Date(iso + "T00:00:00");
    try { return d.toLocaleDateString(AR ? "ar-SA-u-nu-latn-ca-gregory" : "en-AU", { day: "numeric", month: "short" }); } catch (e) { return iso; }
  }
  function upcoming(c) {
    var D = window.MasarokDeadlines && window.MasarokDeadlines.data || [], now = new Date().toISOString().slice(0, 10);
    var lvl = { foundation: "f", bachelor: "b", master: "m", phd: "p" }[c.level] || null;
    return D.filter(function (x) {
      if (x.cc !== "sa" && x.cc !== c.cc) return false;
      if (x.u && (!c.uni || x.u !== c.uni.id)) return false;
      if (lvl && x.lv && x.lv.split(" ").indexOf(lvl) < 0) return false;
      return (x.e || x.d) >= now && x.k !== "info";
    }).sort(function (a, b) { return ((a.k === "win" && a.d <= now ? a.e : a.d) < (b.k === "win" && b.d <= now ? b.e : b.d)) ? -1 : 1; }).slice(0, 2);
  }
  function chapters() {
    var c = choice(), cc = c.cc, d = cc && MC() && MC().data[cc] || {}, u = c.uni, cn = cc ? cName(cc) : "";
    var ch = [];
    // 01 · your university
    if (u) {
      var st = [[u.campus || u.cityName, AR ? "الحرم الجامعي" : "Campus"]];
      st.push(u.college ? [u.college, AR ? "الكلية التحضيرية" : "Pathway college"] : [u.cityName, AR ? "المدينة" : "City"]);
      if (u.transport) st.push([u.transport, AR ? "المواصلات" : "Transport"]);
      ch.push({ label: AR ? "ابدأ من هنا · جامعتك" : "Start here · Your university", title: AR ? u.name + " باختصار" : u.name + " at a glance",
        body: AR ? "حرمك الجامعي، والكلية التحضيرية، وأحياء الطلاب، وطرق التنقل، حسب الجامعة التي اخترتها." : "Your campus, pathway college, student suburbs and how to get around, picked for the university you chose.",
        stats: st.slice(0, 3), action: AR ? "جامعتك" : "Your university", go: "myuni" });
    } else {
      ch.push({ label: AR ? "ابدأ من هنا · جامعتك" : "Start here · Your university", title: AR ? "اختر جامعتك" : "Pick your university",
        body: AR ? "اختر جامعة لترى حرمها الجامعي وكليتها التحضيرية وأحياء الطلاب وطرق التنقل." : "Choose a university to see its campus, pathway college, student suburbs and how to get around.",
        stats: cc ? [[cn, AR ? "الدولة" : "Country"], [String(M() && M().unis ? M().unis(cc).length : ""), AR ? "جامعات في الدليل" : "Universities in the guide"]]
          : [[String(M() ? M().countries().length : 6), AR ? "دول" : "Countries"], [String(M() ? M().countries().reduce(function (a, x) { return a + M().unis(x.cc).length; }, 0) : ""), AR ? "جامعات في الدليل" : "Universities in the guide"]],
        action: AR ? "اختر جامعتك" : "Choose your university", go: "@picker" });
    }
    // 02 · deadlines
    var up = upcoming(c);
    ch.push({ label: AR ? "ابدأ من هنا · المواعيد" : "Start here · Deadlines", title: AR ? "اعرف مواعيدك" : "Know your dates",
      body: !cc && !u ? (AR ? "أقرب مواعيد الابتعاث لكل طالب سعودي، مع تذكيرات تضيفها إلى تقويمك." : "The next scholarship dates for every Saudi student, with reminders you can add to your calendar.")
        : up.length ? (AR ? "أقرب المواعيد لك " + (u ? "في " + u.short : T(d.inPlace || ["", "في " + cn])) + "، ويمكنك إضافتها إلى تقويمك مع تذكير." : "Your next dates " + (u ? "for " + u.short : T(d.inPlace || ["in " + cn, ""])) + ", with reminders you can add to your calendar.")
        : (AR ? "مواعيد التقديم لدولتك وجامعتك، مع تذكيرات في تقويمك." : "Application dates for your country and university, with reminders in your calendar."),
      stats: up.map(function (x) { var open = x.k === "win" && x.d <= new Date().toISOString().slice(0, 10); return [shortDate(open ? x.e : x.d), (open ? (AR ? "يُغلق: " : "Closes: ") : "") + T(x.t)]; }),
      action: AR ? "أضف إلى التقويم" : "Add to calendar", go: "deadlines" });
    // 03 · the scholarship
    var mis = d.mission ? T(d.mission.name) : (AR ? "الملحقية الثقافية" : "the cultural mission");
    ch.push({ label: AR ? "دليل الابتعاث" : "Scholarship guide", title: AR ? "برنامج الابتعاث بشرح واضح" : "The SACM scholarship, explained",
      body: AR ? "تقدّم عبر منصة قبول، وبعد وصولك تتابع " + mis + " بعثتك." : "You apply through Qubool. Once you land, " + mis + " manages your scholarship.",
      stats: [["4", AR ? "مسارات رئيسية" : "Main tracks"], [AR ? "أفضل 30" : "Top 30", AR ? "الرواد" : "Al-Ruwwad"], [AR ? "أفضل 200" : "Top 200", AR ? "إمداد" : "Imdad"]],
      action: AR ? "اقرأ الدليل" : "Read the guide", go: "sacm" });
    // 04 · the allowance
    var known = cc === "au" ? 2699 : (d.costs && d.costs.allowance) || 0, cur = cc === "au" ? "A$" : d.cur || "";
    if (known) {
      var amt = money(known, cur);
      ch.push({ label: AR ? "مصروفك الشهري" : "Your monthly money", title: AR ? amt + " شهريًا" : amt + " a month",
        body: AR ? "مكافأة الملحقية للطالب الأعزب " + T(d.inPlace || ["", "في " + cn]) + "، إضافةً إلى الرسوم والتأمين الصحي. الإيجار أكبر تكلفة، فخطط له أولًا." : "The SACM allowance for a single student " + T(d.inPlace || ["in " + cn, ""]) + ", on top of tuition and health cover. Rent is the biggest cost, so plan it first.",
        stats: [[amt, AR ? "كل شهر" : "Each month"], cc === "au" ? [AR ? "أسبوعيًا" : "Weekly", AR ? "طريقة حساب الإيجار" : "How rent is quoted"] : [AR ? "الإيجار أولًا" : "Rent first", AR ? "أكبر تكلفة" : "Your biggest cost"]],
        action: AR ? "خطّط لشهرك" : "Plan your month", go: "allowance" });
    } else {
      ch.push({ label: AR ? "مصروفك الشهري" : "Your monthly money", title: AR ? "المكافأة والميزانية" : "Allowance and budget",
        body: AR ? "تصرف الملحقية مكافأة شهرية تختلف حسب الدولة، إضافةً إلى الرسوم والتأمين الصحي. تجد مبلغك في قرار ابتعاثك." : "SACM pays a monthly allowance on top of tuition and health cover. The amount depends on the country, so check your scholarship decision.",
        stats: [[AR ? "شهريًا" : "Monthly", AR ? "تصرفها الملحقية" : "Paid by SACM"], [AR ? "الإيجار أولًا" : "Rent first", AR ? "أكبر تكلفة" : "Your biggest cost"]],
        action: AR ? "خطّط لشهرك" : "Plan your month", go: "allowance" });
    }
    // 05 · before you fly
    var n = cc === "au" ? 7 : (d.before || []).length || 6, vi = VISA[cc] || VISA.au, doc = cc === "au" ? "CoE" : (d.enrolDoc ? T(d.enrolDoc) : (AR ? "خطاب القبول" : "offer"));
    var nW = AR ? ({ 6: "ست", 7: "سبع", 8: "ثماني" }[n] || n) : ({ 6: "Six", 7: "Seven", 8: "Eight" }[n] || n);
    if (!cc) ch.push({ label: AR ? "قائمة التجهيز" : "Packing list", title: AR ? "قبل أن تسافر" : "Before you fly",
      body: AR ? "ما ترتّبه قبل السفر، من خطاب القبول والتأشيرة إلى أول مكان تسكن فيه." : "What to sort out before you go, from your offer letter and visa to your first place to stay.",
      stats: [[AR ? "التأشيرة" : "Visa", AR ? "قدّم مبكرًا" : "Apply early"], [AR ? "السكن" : "Housing", AR ? "أول أسبوعين" : "Your first weeks"]],
      action: AR ? "افتح القائمة" : "Open the checklist", go: "before" });
    else ch.push({ label: AR ? "قائمة التجهيز" : "Packing list", title: AR ? "قبل أن تسافر" : "Before you fly",
      body: cc === "au" ? (AR ? "سبع خطوات ترتّبها، من وثيقة CoE والتأشيرة إلى سكن مؤقت لأسبوعين." : "Seven things to sort out, from your CoE and visa to two weeks of short-term housing.")
        : (AR ? nW + " خطوات ترتّبها، من " + doc + " والتأشيرة إلى أول مكان تسكن فيه." : nW + " things to sort out, from your " + doc + " and visa to your first place to stay."),
      stats: [[String(n), AR ? "خطوات" : "Steps"], [vi[0][L], vi[1][L]], cc === "au" ? [AR ? "أسبوعان" : "2 weeks", AR ? "سكن مؤقت أولًا" : "Short stay first"] : [AR ? "السكن" : "Housing", AR ? "قدّم مبكرًا" : "Apply early"]],
      action: AR ? "افتح القائمة" : "Open the checklist", go: "before" });
    return ch;
  }
  var SHORT = [["Your university", "جامعتك"], ["Deadlines", "المواعيد"], ["Scholarship", "الابتعاث"], ["Allowance", "المكافأة"], ["Before you fly", "قبل السفر"]];
  var TOPICS = [["myuni", "Your university", "جامعتك"], ["deadlines", "Deadlines", "المواعيد"], ["options", "Study options", "خيارات الدراسة"], ["postgrad", "Postgraduate", "الدراسات العليا"],
    ["sacm", "SACM scholarship", "الابتعاث"], ["allowance", "Allowance and budget", "المكافأة والميزانية"], ["before", "Before you fly", "قبل السفر"], ["arrival", "First weeks", "الأسابيع الأولى"],
    ["housing", "Housing", "السكن"], ["money", "Money and work", "المال والعمل"], ["lessons", "Lessons", "دروس من التجربة"], ["links", "Official links", "روابط رسمية"]];
  var SKY = [[1, 46], [1.4, 70], [.8, 38], [1.2, 92], [.7, 54], [1, 64], [1.6, 108], [.9, 48], [1.1, 78], [.6, 34], [1.3, 58], [1, 86], [.8, 44], [1.5, 72], [.7, 40], [1.2, 96], [1, 52], [.9, 66], [1.4, 46], [.8, 80], [1.1, 42], [1, 58]];

  // ---------- build ----------
  var app = $("#h3"); if (!app) return;
  var hero, card, rail, chWrap, gate, frame = null;

  function render() {
    var c = choice(), lv = levelNow(), ch = chapters(), dst = dest(c), all = READ.length === 5, lk = locked(), lit = all || !lk;
    var stage = c.level ? STAGES[c.level][0][L] : "";
    var pickLine = (c.cc ? FLAGS[c.cc] + "  " : "") + (c.uni ? c.uni.short : (c.cc ? cName(c.cc) : T(S.chooseUni))) + (stage ? " · " + stage : "");
    var head = window.MasarokJourney && window.MasarokJourney.head ? window.MasarokJourney.head() : "";
    var rp = roadPt(tOf(lv.n)), rr = 3 + 6 * (1 - tOf(lv.n));
    // the headline names the chosen country, or says "abroad" until one is chosen
    var h1 = $(".h3-h1 .gold", app), h1in = $(".h3-h1 .h3-in", app), d = c.cc && MC() ? MC().data[c.cc] : null;
    if (h1) h1.textContent = d ? (AR ? T(d.inPlace) : T(d.inPlace).replace(/^in /, "")) + "." : (AR ? "في الخارج." : "abroad.");
    if (h1in) h1in.textContent = d && !AR ? "in " : "";

    // the scene's road and avatar
    $(".h3-roadbox", app).innerHTML = roadSvg(lv.n) +
      '<div class="h3-me" style="left:' + (rp[0] - 75).toFixed(1) + "px;top:" + (rp[1] - rr - 84).toFixed(1) + 'px"><span class="h3-lvpill">' + esc(T(S.level) + " " + lv.n + " · " + lv.name) + '</span><span class="h3-face">' + head + "</span></div>";

    // the Guide me card
    card.className = "h3-card" + (lk ? " is-locked" : "");
    card.innerHTML = '<div class="h3-card-in"><span class="h3-card-eb">' + esc(T(S.guide) + " · " + T(S.today)) + '</span><span class="h3-card-t">' + esc(lv.goal) + "</span>" +
      '<div class="h3-chips"><span class="' + (lv.stars.learn ? "on" : "") + '">' + esc(T(S.learn)) + '</span><span class="' + (lv.stars["do"] ? "on" : "") + '">' + esc(T(S.doT)) + '</span><span class="' + (lv.stars.check ? "on" : "") + '">' + esc(T(S.check)) + "</span></div></div>" +
      (lk ? '<div class="h3-card-lock"><span class="h3-lockic">' + I.lock + '</span><span class="h3-lock-tx"><b>' + esc(T(S.lockMsg)) + '</b><span class="h3-lock-row"><span class="h3-mini">' + [0, 1, 2, 3, 4].map(function (k) { return '<i class="' + (READ.indexOf(k) > -1 ? "on" : "") + '"></i>'; }).join("") + "</span><small>" + esc(fmt("readOf", { n: READ.length })) + "</small></span></span></div>" : "");
    $(".h3-cta", app).innerHTML = (lk ? '<button type="button" class="h3-btn h3-btn-line" data-h3-start>' + esc(T(S.startReading)) + '<span class="h3-i">' + I.down + "</span></button>"
        : '<button type="button" class="h3-btn h3-btn-gold" data-h3-guide>' + esc(T(S.openGuide)) + '<span class="h3-i">' + I.fwd + "</span></button>") +
      '<button type="button" class="h3-pickline" data-h3-picker><span>' + esc(pickLine) + "</span><b>" + esc(T(S.change)) + "</b></button>";

    // the rail
    var cur = current;
    rail.innerHTML = '<div class="h3-rail-in">' + [0, 1, 2, 3, 4].map(function (k) {
      var r = READ.indexOf(k) > -1, isCur = cur === k && !r;
      return '<button type="button" class="h3-dot' + (r ? " is-read" : isCur ? " is-cur" : "") + '" data-h3-go="' + k + '" aria-label="' + esc(T(SHORT[k]) + (r ? " ✓" : "")) + '"><span><i class="h3-chk">' + I.check + "</i><em>" + (k + 1) + "</em></span></button>" + '<span class="h3-line' + (r ? " is-read" : "") + '"></span>';
    }).join("") + '<span class="h3-gpill' + (!lk ? " is-open" : all ? " is-ready" : "") + '"><span class="h3-i">' + (lit ? I.unlock : I.lock) + "</span>" + esc(T(S.guide)) + "</span></div>";

    // the 5 sections (built once, then updated in place so the scroll effects keep their nodes)
    if (!chWrap.children.length) {
      chWrap.innerHTML = ch.map(function (x, k) {
        return '<section class="h3-ch h3-ch' + k + '" data-ch="' + k + '" aria-labelledby="h3-ch' + k + '-t" style="z-index:' + (k + 1) + '"><div class="h3-ch-in">' +
          '<div class="h3-num" data-num><span dir="ltr">0' + (k + 1) + '</span><i class="h3-badge">' + I.check + "</i></div>" +
          '<div class="h3-ch-body"><span class="h3-label" data-rv="0"></span><h2 id="h3-ch' + k + '-t" data-rv="1"></h2><p data-rv="2"></p><div class="h3-stats" data-rv="3"></div>' +
          '<button type="button" class="h3-btn h3-btn-ghost" data-rv="4" data-h3-act="' + k + '"><span></span><span class="h3-i">' + I.fwd + "</span></button></div></div>" +
          '<div class="h3-dim" data-dim></div></section>';
      }).join("");
    }
    ch.forEach(function (x, k) {
      var s = chWrap.children[k]; s.classList.toggle("is-read", READ.indexOf(k) > -1); s.setAttribute("data-go", x.go);
      $(".h3-label", s).textContent = x.label; $("h2", s).textContent = x.title; $("p", s).textContent = x.body;
      $(".h3-stats", s).className = "h3-stats n" + x.stats.length;
      $(".h3-stats", s).innerHTML = x.stats.map(function (v) { return '<div><b>' + esc(v[0]) + "</b><span>" + esc(v[1]) + "</span></div>"; }).join("");
      $("[data-h3-act] span", s).textContent = x.action;
    });

    // the gate and the boarding pass
    var missing = [0, 1, 2, 3, 4].filter(function (k) { return READ.indexOf(k) < 0; });
    var today = new Date(), dateV = today.toLocaleDateString(AR ? "ar-SA-u-nu-latn-ca-gregory" : "en-AU", { day: "numeric", month: "short", year: "numeric" });
    var fields = [[S.passenger, T(S.you)], [S.flight, "MSR " + today.getFullYear()], [S.date, dateV], [S.seat, lv.n + " · " + lv.name], [S.gate, T(S.guide)], [S.boarding, !lk ? T(S.open) : all ? T(S.now) : T(S.closed)]];
    $(".h3-gate-copy", gate).innerHTML = '<span class="h3-label">' + esc(T(S.gateLabel)) + '</span><h2 id="h3-gate-t">' + esc(T(!lk ? S.gateDone : all ? S.gateReady : S.gateLocked)) + "</h2><p>" + esc(T(!lk ? S.bodyDone : all ? S.bodyReady : S.bodyLocked)) + "</p>" +
      (lk && !all ? '<div class="h3-miss">' + missing.map(function (k) { return '<button type="button" data-h3-go="' + k + '"><b dir="ltr">0' + (k + 1) + "</b><span>" + esc(T(SHORT[k])) + "</span></button>"; }).join("") + "</div>" : "");
    var pass = $(".h3-pass", gate);
    pass.classList.toggle("is-lit", lit);
    pass.innerHTML = '<div class="h3-pass-sadu"></div><div class="h3-pass-top"><div class="h3-pass-brand"><span class="h3-i">' + I.star + '</span><b>Masarok</b><small>' + esc(T(S.pass)) + "</small></div>" +
      '<div class="h3-route"><span class="h3-apt"><b dir="ltr">RUH</b><small>' + esc(T(S.fromCity)) + '</small></span><span class="h3-track"><i></i><span class="h3-pplane' + (!lk ? " is-gone" : "") + '"><span class="h3-i">' + I.plane + '</span></span></span><span class="h3-apt is-to"><b dir="ltr">' + esc(dst.code) + "</b><small>" + esc(dst.city) + "</small></span></div>" +
      '<div class="h3-fields">' + fields.map(function (f, k) { return "<div><small>" + esc(T(f[0])) + '</small><b class="' + (k === 5 && lit ? "ok" : "") + '">' + esc(f[1]) + "</b></div>"; }).join("") + "</div></div>" +
      '<div class="h3-perf"></div><div class="h3-pass-foot"><span class="h3-barcode"></span><span class="h3-stamps"><small>' + esc(T(S.stamps)) + "</small><span>" + [0, 1, 2, 3, 4].map(function (k) { return '<i class="' + (READ.indexOf(k) > -1 ? "on" : "") + '"></i>'; }).join("") + "</span></span></div>";
    var bb = $(".h3-board", gate);
    bb.disabled = !lit; bb.className = "h3-btn h3-board " + (lit ? "h3-btn-gold" : "h3-btn-off");
    bb.innerHTML = '<span class="h3-i h3-flip">' + (lit ? I.plane : I.lock) + "</span>" + esc(!lk ? T(S.boardBack) : all ? T(S.board) : fmt("left", { n: 5 - READ.length }));
  }

  function build() {
    root.classList.add("h3-on");
    var sky = SKY.map(function (b, k) { return '<span style="flex:' + b[0] + ";height:" + b[1] + "px;border-radius:" + (k % 5 === 2 ? "3px 3px 0 0" : k % 7 === 3 ? "12px 12px 0 0" : "1px 1px 0 0") + (k % 3 === 1 ? ";background-image:none" : "") + '"></span>'; }).join("");
    app.insertAdjacentHTML("beforeend",
      '<div class="h3-railbox"><div class="h3-rail" role="navigation" aria-label="' + esc(AR ? "تقدّم القراءة" : "Reading progress") + '"></div><div class="h3-chs"></div>' +
      '<section class="h3-gate" data-gate aria-labelledby="h3-gate-t"><div class="h3-sun"><div class="h3-sun-stars"></div><div class="h3-sun-glow"></div><span class="h3-gplane" data-gplane><span class="h3-i h3-flip">' + I.plane + '</span></span><div class="h3-skyline">' + sky + '</div></div>' +
      '<div class="h3-gate-in"><div class="h3-gate-copy"></div><div class="h3-pass"></div><button type="button" class="h3-btn h3-board" data-h3-board></button></div></section></div>' +
      '<section class="h3-topics" aria-labelledby="h3-topics-t"><div class="h3-topics-in"><h2 id="h3-topics-t">' + esc(T(S.allTopics)) + '</h2><div class="h3-tgrid">' +
      TOPICS.map(function (t) { return '<a href="#' + t[0] + '">' + esc(t[1 + L]) + "</a>"; }).join("") + "</div></div></section>");
    hero = $(".h3-hero", app); card = $(".h3-card", app); rail = $(".h3-rail", app); chWrap = $(".h3-chs", app); gate = $(".h3-gate", app);
    // the header's sound button
    var top = $(".h3-top");
    if (top && !$(".h3-snd", top)) {
      var b = document.createElement("button"); b.type = "button"; b.className = "h3-snd"; b.setAttribute("aria-label", T(S.sound));
      top.insertBefore(b, top.querySelector("nav")); paintSound();
    }
    // overlays: toast, takeoff, picker, reader
    document.body.insertAdjacentHTML("beforeend", '<div class="h3-toast" role="status" aria-live="polite"><span class="h3-toast-ic">' + I.check + '</span><b></b></div>' +
      '<div class="h3-takeoff" hidden><div class="h3-sun-stars"></div><span class="h3-to-plane"><span class="h3-i h3-flip">' + I.plane + '</span></span><div class="h3-to-tx"><b>' + esc(T(S.takeoff)) + "</b><small></small></div></div>");
    render();
  }
  function paintSound() {
    var b = $(".h3-snd"); if (!b) return;
    b.innerHTML = '<span class="h3-i">' + (soundOn ? I.snd : I.mute) + "</span>"; b.setAttribute("aria-pressed", String(soundOn)); b.classList.toggle("is-off", !soundOn);
  }

  // ---------- toast ----------
  var toastT;
  function toast(msg) {
    var t = $(".h3-toast"); if (!t) return;
    $("b", t).textContent = msg; t.classList.add("is-on"); clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove("is-on"); }, 3000);
  }

  // ---------- scroll: hero layers, stacked sections, read tracking ----------
  var current = -1, raf = null, queue = [], busy = false;
  var HDR = 56, RAIL = 56;
  function OFF() { return HDR + RAIL; }
  function fx() {
    var y = window.scrollY, vh = window.innerHeight;
    if (hero && y < 1400) {
      $$("[data-px]", hero).forEach(function (n) { n.style.transform = reduce ? "" : "translate3d(0," + (y * +n.getAttribute("data-px")).toFixed(1) + "px,0)"; });
      var f = $("[data-fade]", hero);
      if (f && !reduce) { var o = clamp(1 - y / 360); f.style.opacity = o.toFixed(3); f.style.transform = "translate3d(0," + (y * 0.3).toFixed(1) + "px,0)"; f.style.filter = o > 0.98 ? "none" : "blur(" + ((1 - o) * 7).toFixed(1) + "px)"; }
    }
    var top = $(".h3-top"); if (top) top.classList.toggle("is-solid", y > 40);
    var vt = OFF(), vb = vh, span = vb - vt;
    var secs = [].slice.call(chWrap.children), gTop = gate.getBoundingClientRect().top;
    var E = secs.map(function (n) { return clamp((vb - n.getBoundingClientRect().top) / span); });
    var eg = clamp((vb - gTop) / span);
    secs.forEach(function (n, k) {
      var e = E[k], cov = k < secs.length - 1 ? E[k + 1] : eg;
      n.style.transform = reduce ? "" : "scale(" + (1 - 0.07 * cov).toFixed(4) + ")";
      var dim = $("[data-dim]", n); if (dim) dim.style.opacity = (cov * 0.7).toFixed(3);
      var num = $("[data-num]", n);
      if (num && !reduce) { num.style.transform = "translate3d(" + (sgn * -1 * (1 - e) * 80).toFixed(1) + "px," + ((1 - e) * 30).toFixed(1) + "px,0)"; num.style.opacity = (0.15 + 0.85 * e).toFixed(3); }
      $$("[data-rv]", n).forEach(function (r) {
        var j = +r.getAttribute("data-rv"), p = reduce ? 1 : clamp((e - 0.35 - j * 0.09) / 0.38);
        r.style.opacity = p.toFixed(3); r.style.transform = reduce ? "" : "translate3d(0," + ((1 - p) * 28).toFixed(1) + "px,0)";
        if (j === 1) r.style.filter = p > 0.99 ? "none" : "blur(" + ((1 - p) * 8).toFixed(1) + "px)";
      });
    });
    var gp = $("[data-gplane]", gate);
    if (gp && !reduce) { var g = clamp((vb - gTop) / (span * 1.25)), gw = gate.clientWidth; gp.style.transform = "translate3d(" + (sgn * (-70 + g * (gw + 140))).toFixed(1) + "px," + (-g * 46).toFixed(1) + "px,0) rotate(" + (AR ? 9 : -9) + "deg)"; }
    return { E: E, eg: eg };
  }
  function check() {
    var m = fx(); if (!m) return;
    var cur = -1; m.E.forEach(function (e, k) { if (e >= 0.6) cur = k; });
    m.E.forEach(function (e, k) { var next = k < m.E.length - 1 ? m.E[k + 1] : m.eg; if (next >= 0.2 && READ.indexOf(k) < 0 && queue.indexOf(k) < 0) queue.push(k); });
    if (cur !== current) { current = cur; paintRail(); }
    drain();
  }
  function paintRail() {
    $$(".h3-dot", rail).forEach(function (b, k) { var r = READ.indexOf(k) > -1; b.classList.toggle("is-read", r); b.classList.toggle("is-cur", current === k && !r); });
  }
  function drain() {
    if (busy || !queue.length) return;
    busy = true;
    var i = queue.shift();
    if (READ.indexOf(i) < 0) { READ.push(i); put(K.read, JSON.stringify(READ)); }
    playTick(i);
    var s = chWrap.children[i]; if (s) s.classList.add("is-read");
    if (READ.length === 5) setTimeout(playChord, 200);
    render(); fx();
    setTimeout(function () { busy = false; drain(); }, reduce ? 0 : 240);
  }
  function onScroll() { if (raf) return; raf = requestAnimationFrame(function () { raf = null; check(); }); }
  function scrollToCh(i) {
    var sec = chWrap.children[i]; if (!sec) return;
    var top = rail.getBoundingClientRect().top + window.scrollY;
    // sticky sections: use the place in the normal flow (the rail, then the sections before it)
    var railBox = rail.parentElement, flow = railBox.getBoundingClientRect().top + window.scrollY + rail.offsetHeight;
    for (var k = 0; k < i; k++) flow += chWrap.children[k].offsetHeight;
    window.scrollTo({ top: Math.max(0, flow - OFF() + 2), behavior: reduce ? "auto" : "smooth" });
    void top;
  }

  // ---------- boarding ----------
  function board() {
    if (!locked()) { window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); return; }
    if (READ.length !== 5) return;
    wake(); playWhoosh();
    var ov = $(".h3-takeoff"), d = dest(choice());
    $(".h3-to-tx small", ov).textContent = "RUH → " + d.code + " · " + T(S.guide);
    ov.hidden = false; ov.classList.remove("is-fly"); void ov.offsetWidth;
    requestAnimationFrame(function () { ov.classList.add("is-in"); setTimeout(function () { ov.classList.add("is-fly"); }, reduce ? 0 : 60); });
    setTimeout(function () {
      window.scrollTo({ top: 0, behavior: "auto" });
      UNLOCKED = true; put(K.unlocked, "1"); render(); check();
    }, reduce ? 300 : 1100);
    setTimeout(function () {
      ov.classList.remove("is-in"); setTimeout(function () { ov.hidden = true; ov.classList.remove("is-fly"); }, 450);
      toast(T(S.toast));
    }, reduce ? 500 : 1650);
  }

  // ---------- the reader: the full guide sections, one tap from any topic ----------
  var reader = $("#h3-reader"), readerOpen = false, lastFocus = null;
  function openReader(id) {
    if (!reader) return false;
    var el = id && document.getElementById(id); if (!el || !reader.contains(el)) return false;
    if (!readerOpen) { lastFocus = document.activeElement; reader.hidden = false; root.classList.add("h3-reading"); readerOpen = true; }
    if (window.MasarokSections) { if (window.MasarokSections.refresh) window.MasarokSections.refresh(); window.MasarokSections.open(id); }
    var t = TOPICS.filter(function (x) { return x[0] === id; })[0]; $(".h3-reader-t", reader).textContent = t ? t[1 + L] : T(S.guideT);
    setTimeout(function () { var y = el.getBoundingClientRect().top - reader.getBoundingClientRect().top + reader.scrollTop - 64; reader.scrollTo({ top: Math.max(0, y), behavior: "auto" }); }, 40);
    $(".h3-reader-x", reader).focus({ preventScroll: true });
    return true;
  }
  function closeReader() {
    if (!readerOpen) return;
    reader.hidden = true; root.classList.remove("h3-reading"); readerOpen = false;
    if (location.hash) try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {}
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  // ---------- the first-visit picker ----------
  var pk = { el: null, step: 0, cc: null, uni: null, level: null };
  function pickerOpen(atStep) {
    var c = choice();
    pk.cc = c.cc; pk.uni = c.uni ? c.uni.id : (c.cc ? "all" : null); pk.level = c.level; pk.step = atStep || 0;
    if (!pk.el) {
      document.body.insertAdjacentHTML("beforeend", '<div class="h3-pk" role="dialog" aria-modal="true" aria-labelledby="h3-pk-h"><div class="h3-pk-sky"><div class="h3-sun-stars"></div><span class="h3-pk-moon"></span><i class="d1"></i><i class="d2"></i><i class="d3"></i></div>' +
        '<div class="h3-pk-bar"><button type="button" class="h3-pk-back" aria-label="' + esc(T(S.back)) + '"><span class="h3-i">' + I.back + '</span></button><span class="h3-pk-brand"><span class="h3-logo"><span class="h3-i">' + I.star + '</span></span><b>Masarok</b><span lang="ar">مسارُك</span></span><span class="h3-pk-step"></span></div>' +
        '<div class="h3-pk-seg"><i></i><i></i><i></i></div><div class="h3-pk-panes"></div></div>');
      pk.el = $(".h3-pk");
      $(".h3-pk-back", pk.el).addEventListener("click", function () { if (pk.step > 0) { pk.step--; paintPicker(); } });
      pk.el.addEventListener("click", function (e) {
        var b = e.target.closest("[data-pk]"); if (!b) return;
        wake();
        var kind = b.getAttribute("data-pk"), v = b.getAttribute("data-v");
        if (kind === "cc") { if (pk.cc !== v) { pk.uni = null; } pk.cc = v; next(1, 0, b); }
        else if (kind === "uni") { pk.uni = v; next(2, 1, b); }
        else if (kind === "level") { pk.level = v; next(3, 2, b); }
        else if (kind === "goto") { pk.step = +v; paintPicker(); }
        else if (kind === "finish") finishPicker();
      });
      pk.el.addEventListener("keydown", function (e) { if (e.key === "Escape" && get(K.picked) === "1") closePicker(); });
    }
    function next(step, tick, b) {
      playTick(tick);
      if (b) [].slice.call(b.parentNode.children).forEach(function (x) { x.classList.toggle("is-sel", x === b); });
      setTimeout(function () { pk.step = step; paintPicker(); }, reduce ? 0 : 280);
    }
    pk.el.hidden = false; pk.el.classList.remove("is-done"); root.classList.add("h3-picking");
    paintPicker();
    setTimeout(function () { var f = $(".h3-pk-pane.is-on button", pk.el); if (f) f.focus({ preventScroll: true }); }, 60);
  }
  function paintPicker() {
    var el = pk.el, st = pk.step, cc = pk.cc;
    var unis = cc && M() ? M().unis(cc) : [], u = pk.uni && pk.uni !== "all" && M().uniInfo ? M().uniInfo(pk.uni) : null;
    var levels = ["foundation", "bachelor", "master", "phd"].filter(function (l) { return l !== "foundation" || !cc || (MC() && MC().offersF(cc)); });
    if (pk.level === "foundation" && levels.indexOf("foundation") < 0) pk.level = null;
    var c = { cc: cc, uni: u }, d = dest(c), cn = cc ? cName(cc) : "";
    $(".h3-pk-step", el).textContent = st < 3 ? fmt("stepOf", { n: st + 1 }) : "";
    $(".h3-pk-back", el).classList.toggle("is-on", st > 0);
    $$(".h3-pk-seg i", el).forEach(function (s, k) { s.className = k < st ? "done" : k === st ? "cur" : ""; });
    $(".h3-pk-sky", el).style.setProperty("--st", st);
    function item(sel, k, inner, kind, v, cls) { return '<button type="button" class="h3-pk-o ' + (cls || "") + (sel ? " is-sel" : "") + '" style="--d:' + (k * 60 + 140) + 'ms" data-pk="' + kind + '" data-v="' + esc(v) + '"' + (sel ? ' aria-pressed="true"' : "") + ">" + inner + "</button>"; }
    var panes = [
      '<span class="h3-label">' + esc(T(S.welcome)) + '</span><h2 id="h3-pk-h">' + esc(T(S.q0)) + "</h2><p>" + esc(T(S.s0)) + '</p><div class="h3-pk-grid">' +
        (M() ? M().countries() : []).map(function (x, k) { var n = M().unis(x.cc).length; return item(pk.cc === x.cc, k, '<span class="h3-flag">' + FLAGS[x.cc] + '</span><span class="h3-pk-tx"><b>' + esc(x.name) + "</b><small>" + esc(n === 2 && AR ? T(S.unis2) : fmt("unis", { n: n })) + "</small></span>", "cc", x.cc, "is-cc"); }).join("") + "</div>",
      '<span class="h3-label">' + esc(T(S.country) + " · " + cn) + "</span><h2>" + esc(T(S.q1)) + "</h2><p>" + esc(fmt("s1", { c: cn })) + '</p><div class="h3-pk-list">' +
        unis.map(function (x, k) { return item(pk.uni === x.id, k, '<span class="h3-pk-tx"><b>' + esc(x.name) + "</b><small>" + esc(x.cityName) + '</small></span><span class="h3-pk-code" dir="ltr">' + esc(AIR[x.city] || "") + "</span>", "uni", x.id); }).join("") +
        item(pk.uni === "all", unis.length, '<span class="h3-pk-tx"><b>' + esc(T(S.notSure)) + "</b><small>" + esc(fmt("notSureSub", { c: cn })) + "</small></span>", "uni", "all", "is-quiet") + "</div>",
      '<span class="h3-label">' + esc(T(S.uni) + " · " + (u ? u.short : T(S.anyUni))) + "</span><h2>" + esc(T(S.q2)) + "</h2><p>" + esc(u ? fmt("s2", { u: u.name }) : fmt("s2any", { c: cn })) + '</p><div class="h3-pk-list">' +
        levels.map(function (l, k) { return item(pk.level === l, k, '<span class="h3-pk-tx"><b>' + esc(STAGES[l][0][L]) + "</b><small>" + esc(STAGES[l][1][L]) + '</small></span><span class="h3-i h3-dim-i">' + I.fwd + "</span>", "level", l); }).join("") + "</div>",
      '<span class="h3-label">' + esc(T(S.readyE)) + "</span><h2>" + esc(fmt("ready", { c: d.city })) + '</h2><div class="h3-pk-road"><svg viewBox="0 0 350 110" aria-hidden="true" focusable="false"' + (AR ? ' style="transform:scaleX(-1)"' : "") + '><path d="M12 94 C 92 96, 110 28, 182 40 S 296 72, 338 16" fill="none" stroke="rgba(233,220,195,.14)" stroke-width="12" stroke-linecap="round"/><path d="M12 94 C 92 96, 110 28, 182 40 S 296 72, 338 16" fill="none" stroke="rgba(233,220,195,.4)" stroke-width="1.5" stroke-dasharray="1 8" stroke-linecap="round"/><path class="h3-pk-draw" d="M12 94 C 92 96, 110 28, 182 40 S 296 72, 338 16" fill="none" stroke="#E2B66C" stroke-width="3" stroke-linecap="round" stroke-dasharray="420" stroke-dashoffset="' + (st === 3 ? 0 : 420) + '"/><circle cx="12" cy="94" r="6" fill="#E2B66C"/><circle cx="338" cy="16" r="6" fill="#0B1626" stroke="#E2B66C" stroke-width="2.5"/></svg>' +
        '<div class="h3-pk-ends"><span><b dir="ltr">RUH</b><small>' + esc(T(S.fromCity)) + '</small></span><span class="is-to"><b dir="ltr">' + esc(d.code) + "</b><small>" + esc(d.city) + "</small></span></div></div>" +
        '<div class="h3-pk-sum">' + [[S.country, cc ? FLAGS[cc] + " " + cn : "", 0], [S.uni, u ? u.name : T(S.anyUni), 1], [S.study, pk.level ? STAGES[pk.level][0][L] : "", 2]].map(function (r) { return "<div><span>" + esc(T(r[0])) + "</span><b>" + esc(r[1]) + '</b><button type="button" data-pk="goto" data-v="' + r[2] + '">' + esc(T(S.change)) + "</button></div>"; }).join("") + "</div>" +
        '<button type="button" class="h3-btn h3-btn-gold" data-pk="finish">' + esc(T(S.show)) + '<span class="h3-i">' + I.fwd + '</span></button><small class="h3-pk-note">' + esc(T(S.note)) + "</small>"
    ];
    var box = $(".h3-pk-panes", el);
    if (!box.children.length) box.innerHTML = panes.map(function () { return '<div class="h3-pk-pane"></div>'; }).join("");
    [].slice.call(box.children).forEach(function (p, j) {
      p.innerHTML = panes[j];
      var off = j - st;
      p.className = "h3-pk-pane" + (off === 0 ? " is-on" : "");
      p.style.transform = "translate3d(" + (off * 100 * sgn) + "%,0,0) scale(" + (off === 0 ? 1 : 0.94) + ")";
      p.setAttribute("aria-hidden", off === 0 ? "false" : "true");
      if (off !== 0) p.setAttribute("inert", ""); else p.removeAttribute("inert");
    });
  }
  function finishPicker() {
    wake(); playChord();
    if (M()) M().choose({ country: pk.cc, uni: pk.uni && pk.uni !== "all" ? pk.uni : null, level: pk.level });
    put(K.picked, "1");
    closePicker(); window.scrollTo({ top: 0 });
    chWrap.innerHTML = ""; render(); check();
  }
  function closePicker() {
    if (!pk.el) return;
    pk.el.classList.add("is-done"); root.classList.remove("h3-picking");
    setTimeout(function () { pk.el.hidden = true; }, reduce ? 0 : 1050);
  }

  // ---------- events ----------
  function onClick(e) {
    var t = e.target;
    if (t.closest(".h3-snd")) { wake(); soundOn = !soundOn; put(K.sound, soundOn ? "1" : "0"); paintSound(); if (soundOn) playTick(0); return; }
    if (t.closest("[data-h3-start]")) { wake(); scrollToCh(0); return; }
    if (t.closest("[data-h3-guide]")) { wake(); if (window.MasarokJourney) window.MasarokJourney.open(); return; }
    if (t.closest("[data-h3-picker]")) { wake(); pickerOpen(0); return; }
    var go = t.closest("[data-h3-go]"); if (go) { wake(); scrollToCh(+go.getAttribute("data-h3-go")); return; }
    var act = t.closest("[data-h3-act]");
    if (act) { wake(); var s = act.closest("[data-ch]"), id = s && s.getAttribute("data-go"); if (id === "@picker") pickerOpen(1); else openReader(id); return; }
    if (t.closest("[data-h3-board]")) { board(); return; }
    if (t.closest(".h3-reader-x")) { closeReader(); return; }
  }
  // links to a guide section open the reader (capture: before the browser jumps)
  function onLink(e) {
    var a = e.target.closest && e.target.closest('a[href*="#"]'); if (!a) return;
    var href = a.getAttribute("href"), i = href.indexOf("#"); if (i < 0) return;
    var same = i === 0 || a.pathname === location.pathname; if (!same) return;
    var id = href.slice(i + 1);
    if (id === "top") { e.preventDefault(); closeReader(); window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); return; }
    if (id === "journey") { if (locked()) { e.preventDefault(); e.stopPropagation(); closeReader(); gateNotice(); } else { closeReader(); } return; }
    var el = document.getElementById(id);
    if (el && reader && reader.contains(el)) { openReader(id); }
  }
  // Guide me stays closed until the sections are read
  function gateNotice() { toast(T(S.notYet)); scrollToCh(READ.length < 5 ? Math.min.apply(null, [0, 1, 2, 3, 4].filter(function (k) { return READ.indexOf(k) < 0; })) : 4); }
  function guardJourney(e) {
    var pkb = e.target.closest && e.target.closest("[data-open-picker]");
    if (pkb) { e.preventDefault(); e.stopPropagation(); wake(); pickerOpen(+(pkb.getAttribute("data-open-picker") || 0) ? 1 : 0); return; }
    var b = e.target.closest && e.target.closest("[data-journey-open]");
    if (b && locked()) { e.preventDefault(); e.stopPropagation(); gateNotice(); }
  }
  function wrapJourney() {
    var J = window.MasarokJourney; if (!J || J._h3) return;
    var orig = J.open; J._h3 = true;
    J.open = function () { if (locked()) { if (window.MasarokMenu) window.MasarokMenu.close(true); closeReader(); gateNotice(); return; } closeReader(); orig.apply(J, arguments); };
  }

  function init() {
    build();
    wrapJourney();
    // the old picker's entry points now open the new one
    if (M()) M().openPicker = function (atStep) { pickerOpen(atStep ? 1 : 0); };
    document.addEventListener("click", guardJourney, true);
    document.addEventListener("click", onLink, true);
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && readerOpen) closeReader(); });
    window.addEventListener("pointerdown", wake, { passive: true, once: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    document.addEventListener("masarok:change", function () { chWrap.innerHTML = ""; render(); check(); });
    document.addEventListener("masarok:journey-banner", function () { render(); });
    // a returning visitor who already chose keeps their choice; a first visit starts with the picker
    var c = choice();
    if (c.cc) put(K.picked, "1");
    if (get(K.picked) !== "1") pickerOpen(0);
    // deep links: /#housing opens the reader at that section; /#journey while closed points at the sections
    var h = decodeURIComponent((location.hash || "").slice(1));
    if (h && h !== "journey" && h !== "top") openReader(h);
    if (hashWanted && locked()) setTimeout(gateNotice, 400);
    check(); setTimeout(check, 300);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();

/* Masarok university picker: data + logic shared by the English and Arabic pages. */
(function () {
  "use strict";

  var CITIES = {
    sydney: {
      tap: { en: "You can also tap on with a contactless bank card.", ar: "يمكنك أيضًا الدفع بالبطاقة البنكية اللاتلامسية." },
      en: "Sydney", ar: "سيدني",
      transport: { en: "Opal card", ar: "بطاقة أوبال (Opal)", url: "https://transportnsw.info" },
      bond: { en: "NSW Fair Trading", ar: "NSW Fair Trading", url: "https://www.fairtrading.nsw.gov.au" },
      food: {
        en: "Suburbs such as Lakemba and Auburn are well known for halal food.",
        ar: "أحياء مثل لاكمبا (Lakemba) وأوبرن (Auburn) معروفة بالمطاعم الحلال."
      }
    },
    melbourne: {
      tap: { en: "Since mid-2026, full-fare passengers can also tap on with a contactless bank card.", ar: "منذ منتصف 2026 يمكن لركاب التذكرة الكاملة الدفع بالبطاقة البنكية اللاتلامسية أيضًا." },
      en: "Melbourne", ar: "ملبورن",
      transport: { en: "myki card", ar: "بطاقة مايكي (myki)", url: "https://www.ptv.vic.gov.au" },
      bond: { en: "the Residential Tenancies Bond Authority (RTBA)", ar: "هيئة سندات الإيجار (RTBA)", url: "https://rentalbonds.vic.gov.au" },
      food: {
        en: "Sydney Road in Brunswick and Coburg is well known for halal and Middle Eastern food.",
        ar: "شارع Sydney Road في برنزويك وكوبرغ معروف بالمطاعم الحلال والعربية."
      }
    },
    brisbane: {
      tap: { en: "You can also tap on with a contactless bank card, and a new Translink card is replacing the go card during 2026.", ar: "يمكنك أيضًا الدفع بالبطاقة البنكية اللاتلامسية، وتحل بطاقة Translink الجديدة محل go card خلال 2026." },
      en: "Brisbane", ar: "بريزبن",
      transport: { en: "go card", ar: "بطاقة go card", url: "https://translink.com.au" },
      bond: { en: "the Residential Tenancies Authority (RTA)", ar: "هيئة الإيجارات السكنية (RTA)", url: "https://www.rta.qld.gov.au" }
    },
    adelaide: {
      tap: { en: "You can also tap on with a contactless bank card at the regular fare.", ar: "يمكنك أيضًا الدفع بالبطاقة البنكية اللاتلامسية بسعر التذكرة العادية." },
      en: "Adelaide", ar: "أديلايد",
      transport: { en: "metroCARD", ar: "بطاقة metroCARD", url: "https://www.adelaidemetro.com.au" },
      bond: { en: "Consumer and Business Services (CBS)", ar: "Consumer and Business Services (CBS)", url: "https://www.cbs.sa.gov.au" }
    },
    perth: {
      tap: { en: "You can also tap on with a contactless bank card at the standard fare.", ar: "يمكنك أيضًا الدفع بالبطاقة البنكية اللاتلامسية بالسعر العادي." },
      en: "Perth", ar: "بيرث",
      transport: { en: "SmartRider card", ar: "بطاقة SmartRider", url: "https://www.transperth.wa.gov.au" },
      bond: { en: "the Bond Administrator (Consumer Protection WA)", ar: "إدارة التأمينات (Consumer Protection WA)", url: "https://www.commerce.wa.gov.au/consumer-protection" }
    }
  };

  var UNIS = [
    { id: "unsw", city: "sydney", short: "UNSW",
      name: { en: "UNSW Sydney", ar: "جامعة نيو ساوث ويلز (UNSW)" },
      campus: { en: "Kensington", ar: "كنسينغتون (Kensington)" },
      web: "https://www.unsw.edu.au",
      college: { name: "UNSW College", url: "https://www.unswcollege.edu.au" },
      union: { name: "Arc @ UNSW", url: "https://www.arc.unsw.edu.au" },
      legal: { en: "Arc's free legal service gives students advice on renting and other problems.", ar: "الخدمة القانونية المجانية من Arc تقدم للطلاب استشارات في الإيجار ومشكلات أخرى." },
      suburbs: "Kensington, Kingsford, Randwick" },
    { id: "usyd", city: "sydney", short: "USyd",
      name: { en: "The University of Sydney", ar: "جامعة سيدني" },
      campus: { en: "Camperdown/Darlington", ar: "كامبرداون/دارلينغتون (Camperdown/Darlington)" },
      web: "https://www.sydney.edu.au",
      college: { name: "Taylors College Sydney (University of Sydney Foundation Program)", url: "https://www.taylorssydney.edu.au" },
      union: { name: "University of Sydney SRC", url: "https://srcusyd.net.au" },
      legal: { en: "The SRC Legal Service gives students free legal advice.", ar: "الخدمة القانونية في SRC تقدم للطلاب استشارات قانونية مجانية." },
      suburbs: "Camperdown, Glebe, Newtown, Redfern" },
    { id: "uts", city: "sydney", short: "UTS",
      name: { en: "University of Technology Sydney", ar: "جامعة التكنولوجيا في سيدني (UTS)" },
      campus: { en: "Ultimo (city campus)", ar: "ألتيمو (Ultimo) في وسط المدينة" },
      web: "https://www.uts.edu.au",
      college: { name: "UTS College", url: "https://www.utscollege.edu.au" },
      union: { name: "ActivateUTS", url: "https://www.activateuts.com.au" },
      legal: { en: "The UTS Student Legal Service gives students free legal advice.", ar: "خدمة UTS القانونية للطلاب تقدم استشارات قانونية مجانية." },
      suburbs: "Ultimo, Haymarket, Chippendale, Glebe" },
    { id: "unimelb", city: "melbourne", short: "UniMelb",
      name: { en: "The University of Melbourne", ar: "جامعة ملبورن" },
      campus: { en: "Parkville", ar: "باركفيل (Parkville)" },
      web: "https://www.unimelb.edu.au",
      college: { name: "Trinity College Foundation Studies", url: "https://www.trinity.unimelb.edu.au" },
      union: { name: "UMSU (University of Melbourne Student Union)", url: "https://umsu.unimelb.edu.au" },
      legal: { en: "The UMSU Legal Service gives students free legal advice.", ar: "الخدمة القانونية في UMSU تقدم للطلاب استشارات قانونية مجانية." },
      suburbs: "Carlton, Parkville, Brunswick",
      entry: { en: "Study completed in Saudi Arabia does not exempt you from an English test.", ar: "الدراسة في السعودية لا تعفيك من اختبار اللغة الإنجليزية." } },
    { id: "monash", city: "melbourne", short: "Monash",
      name: { en: "Monash University", ar: "جامعة موناش" },
      campus: { en: "Clayton", ar: "كلايتون (Clayton)" },
      web: "https://www.monash.edu",
      college: { name: "Monash College", url: "https://www.monashcollege.edu.au" },
      union: { name: "Monash Student Association (MSA)", url: "https://msa.monash.edu" },
      legal: { en: "Free legal advice is available through Monash Law Clinics. The MSA offers non-legal advocacy and support.", ar: "تتوفر الاستشارات القانونية المجانية عبر Monash Law Clinics، وتقدم MSA دعمًا ومناصرة غير قانونية." },
      suburbs: "Clayton, Oakleigh, Notting Hill, Glen Waverley",
      entry: { en: "Monash College Foundation Year accepts the Saudi General Secondary certificate with 70% (Standard) or 65% (Extended).", ar: "تقبل سنة الفاونديشن في Monash College شهادة الثانوية العامة السعودية بنسبة 70% (العادي) أو 65% (الممتد)." } },
    { id: "rmit", city: "melbourne", short: "RMIT",
      name: { en: "RMIT University", ar: "جامعة RMIT" },
      campus: { en: "Melbourne City campus", ar: "حرم المدينة في ملبورن" },
      web: "https://www.rmit.edu.au",
      college: { name: "RMIT University Pathways (RMIT UP)", url: "https://www.rmit.edu.au/up" },
      union: { name: "RMIT University Student Union (RUSU)", url: "https://rusu.rmit.edu.au" },
      legal: { en: "Ask RUSU about free legal and tenancy advice for students.", ar: "اسأل RUSU عن الاستشارات القانونية واستشارات الإيجار المجانية للطلاب." },
      suburbs: "Melbourne CBD, Carlton, North Melbourne",
      entry: { en: "RMIT does not accept the Saudi General Secondary certificate for direct bachelor's entry, so you need a pathway such as Foundation Studies.", ar: "لا تقبل RMIT شهادة الثانوية العامة السعودية للقبول المباشر في البكالوريوس، لذلك تحتاج إلى برنامج مسار مثل الفاونديشن." } },
    { id: "adelaide", city: "adelaide", short: "Adelaide Uni",
      name: { en: "Adelaide University", ar: "جامعة أديلايد" },
      campus: { en: "City campuses (North Terrace)", ar: "حرم وسط المدينة (North Terrace)" },
      note: { en: "Adelaide University opened in 2026, joining the University of Adelaide and the University of South Australia.", ar: "افتُتحت جامعة أديلايد (Adelaide University) في 2026 بدمج جامعة أديلايد وجامعة جنوب أستراليا." },
      web: "https://www.adelaide.edu.au",
      college: { name: "Kaplan International College Adelaide", url: "https://www.kaplancollegeadelaide.edu.au" },
      union: { name: "Adelaide University Student Association (AUSA)", url: "https://www.ausaadelaide.com.au" },
      legal: { en: "AUSA offers advocacy and welfare support through Student Care. Ask them where to get free legal advice.", ar: "تقدم AUSA المناصرة والدعم عبر Student Care. اسألهم عن جهات الاستشارة القانونية المجانية." },
      suburbs: "Adelaide CBD, North Adelaide, Kent Town" },
    { id: "uwa", city: "perth", short: "UWA",
      name: { en: "The University of Western Australia", ar: "جامعة غرب أستراليا (UWA)" },
      campus: { en: "Crawley", ar: "كرولي (Crawley)" },
      web: "https://www.uwa.edu.au",
      college: { name: "UWA College", url: "https://www.uwa.edu.au/study/how-to-apply/pathways-and-eligibility/entry-pathways/international-student-pathways" },
      union: { name: "UWA Student Guild", url: "https://www.uwastudentguild.com" },
      legal: { en: "The UWA Student Guild does not give legal advice itself, but it refers students to free legal centres.", ar: "لا تقدم UWA Student Guild استشارات قانونية بنفسها، لكنها توجه الطلاب إلى مراكز قانونية مجانية." },
      suburbs: "Crawley, Nedlands, Subiaco, Shenton Park" },
    { id: "curtin", city: "perth", short: "Curtin",
      name: { en: "Curtin University", ar: "جامعة كيرتن" },
      campus: { en: "Bentley", ar: "بنتلي (Bentley)" },
      web: "https://www.curtin.edu.au",
      college: { name: "Curtin College", url: "https://www.curtincollege.edu.au" },
      union: { name: "Curtin Student Guild", url: "https://guild.curtin.edu.au" },
      legal: { en: "The Curtin Student Guild offers students free legal and tenancy advice.", ar: "تقدم Curtin Student Guild للطلاب استشارات قانونية واستشارات إيجار مجانية." },
      suburbs: "Bentley, Victoria Park, Como, Karawara" },
    { id: "uq", city: "brisbane", short: "UQ",
      name: { en: "The University of Queensland", ar: "جامعة كوينزلاند" },
      campus: { en: "St Lucia", ar: "سانت لوسيا (St Lucia)" },
      web: "https://www.uq.edu.au",
      college: { name: "UQ College", url: "https://uqcollege.uq.edu.au" },
      union: { name: "UQ Union (UQU)", url: "https://www.uqu.com.au" },
      legal: { en: "Ask UQ Union about free legal advice for students.", ar: "اسأل UQ Union عن الاستشارات القانونية المجانية للطلاب." },
      suburbs: "St Lucia, Toowong, Taringa, Indooroopilly" }
  ];

  var CITY_ORDER = ["sydney", "melbourne", "brisbane", "adelaide", "perth"];

  var GENERIC = {
    en: {
      short: "your university", name: "your university", city: "your city", campus: "your campus",
      college: "its pathway college", union: "your student association",
      legal: "Most student associations offer free advice on renting and legal problems. Ask yours.",
      suburbs: "suburbs close to campus or on a direct bus or train line",
      transport: "city's transport card", bond: "your state's bond authority",
      food: "Ask the Muslim Students Association at your university about halal food and prayer spots nearby.",
      tap: "Most Australian cities also let you tap on with a contactless bank card.",
      chip: "All universities", change: "Choose university"
    },
    ar: {
      short: "جامعتك", name: "جامعتك", city: "مدينتك", campus: "حرمك الجامعي",
      college: "كلية المسار التابعة لها", union: "رابطة الطلاب في جامعتك",
      legal: "تقدم أغلب روابط الطلاب استشارات مجانية في الإيجار والمشكلات القانونية. اسأل رابطة جامعتك.",
      suburbs: "الأحياء القريبة من الجامعة أو الواقعة على خط حافلات أو قطار مباشر",
      transport: "بطاقة المواصلات في مدينتك", bond: "الجهة المسؤولة عن مبالغ التأمين في ولايتك",
      food: "اسأل جمعية الطلاب المسلمين في جامعتك عن المطاعم الحلال والمصليات القريبة.",
      tap: "تتيح أغلب المدن الأسترالية أيضًا الدفع بالبطاقة البنكية اللاتلامسية.",
      chip: "كل الجامعات", change: "اختر جامعتك"
    }
  };

  var LEVELS = ["foundation", "bachelor", "master", "phd"];

  var T = {
    en: {
      steps: ["City", "University", "Degree"],
      stepOf: "Step {n} of 3",
      titles: ["Which city are you looking at?", "Which university?", "What will you study?"],
      subs: [
        "Choose a city to see its universities first. You can still pick a university anywhere in Australia.",
        "The guide will show examples for your campus and city: suburbs, transport, student support and more.",
        "The guide will show the study options and scholarship rules for your level."
      ],
      cityAll: "Not sure yet",
      uniAll: "Not sure yet? Show all universities",
      levelAll: "Show everything",
      inCity: "In {city}",
      otherCities: "Other cities",
      back: "Back",
      note: "<b>Important:</b> the universities SACM sponsors can change each year. Being accepted by a university is not the same as being sponsored to study there. Check the current list on the Ministry's <a href=\"https://ru.moe.gov.sa/Search\" rel=\"noopener\">recommended universities search</a> or with SACM before you commit.",
      close: "Close",
      campus: "Main campus",
      levels: {
        foundation: ["Foundation or diploma", "A pathway year before your bachelor's degree"],
        bachelor: ["Bachelor's degree", "Direct entry, or after a pathway program"],
        master: ["Master's or pre-master's", "Coursework or research master's"],
        phd: ["PhD", "A research degree with a supervisor"]
      },
      chipLevels: { foundation: "Foundation", bachelor: "Bachelor's", master: "Master's", phd: "PhD" },
      showing: "Showing information for <b>{level}</b>.",
      showAll: "Show everything"
    },
    ar: {
      steps: ["المدينة", "الجامعة", "المرحلة"],
      stepOf: "الخطوة {n} من 3",
      titles: ["أي مدينة تفكر فيها؟", "أي جامعة؟", "ماذا ستدرس؟"],
      subs: [
        "اختر مدينة لتظهر جامعاتها أولًا. يمكنك مع ذلك اختيار أي جامعة في أستراليا.",
        "سيعرض لك الدليل أمثلة خاصة بحرمك الجامعي ومدينتك: الأحياء، والمواصلات، ودعم الطلاب، وغيرها.",
        "سيعرض لك الدليل خيارات الدراسة وأنظمة الابتعاث الخاصة بمرحلتك."
      ],
      cityAll: "لم أقرر بعد",
      uniAll: "لم تقرر بعد؟ اعرض كل الجامعات",
      levelAll: "اعرض كل شيء",
      inCity: "في {city}",
      otherCities: "مدن أخرى",
      back: "رجوع",
      note: "<b>مهم:</b> الجامعات التي تبتعث عليها الملحقية قد تتغير كل عام. الحصول على قبول من جامعة لا يعني أنك مبتعث إليها. تحقق من القائمة الحالية عبر <a href=\"https://ru.moe.gov.sa/Search\" rel=\"noopener\">خدمة الاستعلام عن الجامعات الموصى بها</a> أو من الملحقية قبل أن تلتزم.",
      close: "إغلاق",
      campus: "الحرم الرئيسي",
      levels: {
        foundation: ["الفاونديشن أو الدبلوم", "سنة مسار قبل البكالوريوس"],
        bachelor: ["البكالوريوس", "قبول مباشر أو بعد برنامج مسار"],
        master: ["الماجستير أو ما قبل الماجستير", "ماجستير بالمقررات أو بحثي"],
        phd: ["الدكتوراه", "درجة بحثية بإشراف مشرف"]
      },
      chipLevels: { foundation: "الفاونديشن", bachelor: "البكالوريوس", master: "الماجستير", phd: "الدكتوراه" },
      showing: "يعرض الدليل المعلومات الخاصة بـ <b>{level}</b>.",
      showAll: "اعرض كل شيء"
    }
  };

  var lang = (document.documentElement.lang || "en").slice(0, 2) === "ar" ? "ar" : "en";
  var K = { city: "masarok-city", uni: "masarok-uni", level: "masarok-level" };

  function byId(id) { for (var i = 0; i < UNIS.length; i++) if (UNIS[i].id === id) return UNIS[i]; return null; }
  function get(k) { try { return localStorage.getItem(K[k]); } catch (e) { return null; } }
  function put(k, v) { try { localStorage.setItem(K[k], v); } catch (e) {} }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c]; }); }
  function fmt(s, o) { return s.replace(/\{(\w+)\}/g, function (_, k) { return o[k]; }); }

  function validCity(v) { return v === "all" || CITIES.hasOwnProperty(v); }
  function validUni(v) { return v === "all" || !!byId(v); }
  function validLevel(v) { return v === "all" || LEVELS.indexOf(v) > -1; }

  var state = { city: null, uni: null, level: null };

  function values() {
    var g = GENERIC[lang];
    var u = state.uni && state.uni !== "all" ? byId(state.uni) : null;
    var ck = u ? u.city : (state.city && state.city !== "all" ? state.city : null);
    var c = ck ? CITIES[ck] : null;
    var v = { tap: g.tap, entry: "", short: g.short, name: g.name, city: g.city, campus: g.campus, college: g.college, union: g.union, legal: g.legal, suburbs: g.suburbs, transport: g.transport, bond: g.bond, food: g.food };
    if (c) {
      v.city = c[lang]; v.transport = c.transport[lang]; v.bond = c.bond[lang];
      v.food = c.food ? c.food[lang] : g.food;
      v.tap = c.tap[lang];
      v["transport-url"] = c.transport.url; v["bond-url"] = c.bond.url;
    }
    if (u) {
      v.short = u.short; v.name = u.name[lang]; v.campus = u.campus[lang];
      v.college = u.college.name; v.union = u.union.name; v.legal = u.legal[lang]; v.suburbs = u.suburbs;
      v.entry = u.entry ? u.entry[lang] : "";
      v["college-url"] = u.college.url; v["union-url"] = u.union.url; v.web = u.web;
    }
    return { v: v, u: u, c: c };
  }

  function apply() {
    var r = values(), v = r.v, u = r.u;
    var level = state.level && state.level !== "all" ? state.level : null;
    document.documentElement.setAttribute("data-uni", u ? u.id : "all");
    document.documentElement.setAttribute("data-level", level || "all");

    document.querySelectorAll("[data-u]").forEach(function (el) {
      var k = el.getAttribute("data-u");
      if (v[k] != null) el.textContent = v[k];
    });
    document.querySelectorAll("[data-u-href]").forEach(function (el) {
      var k = el.getAttribute("data-u-href");
      if (v[k]) el.setAttribute("href", v[k]);
    });
    document.querySelectorAll("[data-uni-only]").forEach(function (el) { el.hidden = !u; });
    document.querySelectorAll("[data-all-only]").forEach(function (el) { el.hidden = !!u; });
    document.querySelectorAll("[data-city-only]").forEach(function (el) { el.hidden = !r.c; });

    // degree-level filter
    document.querySelectorAll("[data-level]").forEach(function (el) {
      if (el === document.documentElement) return;
      var ok = !level || el.getAttribute("data-level").split(" ").indexOf(level) > -1;
      el.hidden = !ok;
    });
    document.querySelectorAll("[data-level-banner]").forEach(function (el) {
      el.hidden = !level;
      if (level) el.querySelector("span").innerHTML = fmt(T[lang].showing, { level: esc(T[lang].levels[level][0]) });
    });

    document.querySelectorAll("[data-u-entry]").forEach(function (el) { el.hidden = !v.entry; });
    var note = document.querySelector("[data-u-note]");
    if (note) { note.hidden = !(u && u.note); if (u && u.note) note.textContent = u.note[lang]; }

    var chip = document.querySelector(".uni-chip b");
    if (chip) {
      var parts = [u ? u.short : (r.c ? r.c[lang] : GENERIC[lang].chip)];
      if (level) parts.push(T[lang].chipLevels[level]);
      chip.textContent = parts.join(" · ");
    }

    // shareable links
    var q = [];
    if (state.city && state.city !== "all" && !u) q.push("city=" + state.city);
    if (u) q.push("uni=" + u.id);
    if (level) q.push("level=" + level);
    var qs = q.length ? "?" + q.join("&") : "";
    var langLink = document.querySelector(".top nav a.lang");
    if (langLink) langLink.setAttribute("href", langLink.getAttribute("href").split("?")[0] + qs);
    try { history.replaceState(null, "", location.pathname + qs + location.hash); } catch (e) {}

    renderTable();
  }

  function renderTable() {
    var tbody = document.querySelector("#uni-table tbody");
    if (!tbody) return;
    var ck = state.city && state.city !== "all" ? state.city : null;
    var list = UNIS.slice().sort(function (a, b) {
      return (ck ? (a.city === ck ? 0 : 1) - (b.city === ck ? 0 : 1) : 0) || CITY_ORDER.indexOf(a.city) - CITY_ORDER.indexOf(b.city);
    });
    tbody.innerHTML = list.map(function (u) {
      var c = CITIES[u.city];
      return "<tr><th scope=\"row\"><button type=\"button\" class=\"linkish\" data-pick=\"" + u.id + "\">" + esc(u.name[lang]) + "</button></th>" +
        "<td>" + esc(c[lang]) + "</td>" +
        "<td><a href=\"" + esc(u.college.url) + "\" rel=\"noopener\">" + esc(u.college.name) + "</a></td>" +
        "<td>" + esc(u.suburbs) + "</td></tr>";
    }).join("");
  }

  // ---------- three-step picker dialog ----------
  var dlg, body, lastFocus, step = 0;

  function uniCard(u) {
    var t = T[lang];
    return "<button type=\"button\" class=\"uni-card\" data-kind=\"uni\" data-id=\"" + u.id + "\" aria-pressed=\"" + (state.uni === u.id) + "\">" +
      "<span class=\"uc-short\">" + esc(u.short) + "</span>" +
      "<span class=\"uc-name\">" + esc(u.name[lang]) + "</span>" +
      "<span class=\"uc-campus\">" + esc(t.campus) + ": " + esc(u.campus[lang]) + "</span></button>";
  }

  function stepHtml(n) {
    var t = T[lang], h = "";
    if (n === 0) {
      h += "<div class=\"pk-grid\">" + CITY_ORDER.map(function (ck) {
        var names = UNIS.filter(function (u) { return u.city === ck; }).map(function (u) { return u.short; }).join(" · ");
        return "<button type=\"button\" class=\"uni-card\" data-kind=\"city\" data-id=\"" + ck + "\" aria-pressed=\"" + (state.city === ck) + "\">" +
          "<span class=\"uc-short\">" + esc(CITIES[ck][lang]) + "</span><span class=\"uc-campus\" dir=\"ltr\">" + esc(names) + "</span></button>";
      }).join("") + "</div>" +
      "<button type=\"button\" class=\"uni-card uni-all\" data-kind=\"city\" data-id=\"all\" aria-pressed=\"" + (state.city === "all") + "\">" + esc(t.cityAll) + "</button>";
    } else if (n === 1) {
      var ck = state.city && state.city !== "all" ? state.city : null;
      var order = ck ? [ck].concat(CITY_ORDER.filter(function (c) { return c !== ck; })) : CITY_ORDER;
      h += order.map(function (c, i) {
        var label = ck && i === 0 ? fmt(t.inCity, { city: CITIES[c][lang] }) : CITIES[c][lang];
        var pre = ck && i === 1 ? "<p class=\"pk-divider\">" + esc(t.otherCities) + "</p>" : "";
        return pre + "<div class=\"pk-group" + (ck && i > 0 ? " pk-dim" : "") + "\"><p class=\"pk-city\">" + esc(label) + "</p><div class=\"pk-grid\">" +
          UNIS.filter(function (u) { return u.city === c; }).map(uniCard).join("") + "</div></div>";
      }).join("") +
      "<button type=\"button\" class=\"uni-card uni-all\" data-kind=\"uni\" data-id=\"all\" aria-pressed=\"" + (state.uni === "all") + "\">" + esc(t.uniAll) + "</button>";
    } else {
      h += "<div class=\"pk-grid pk-levels\">" + LEVELS.map(function (l) {
        return "<button type=\"button\" class=\"uni-card\" data-kind=\"level\" data-id=\"" + l + "\" aria-pressed=\"" + (state.level === l) + "\">" +
          "<span class=\"uc-short\">" + esc(t.levels[l][0]) + "</span><span class=\"uc-name\">" + esc(t.levels[l][1]) + "</span></button>";
      }).join("") + "</div>" +
      "<button type=\"button\" class=\"uni-card uni-all\" data-kind=\"level\" data-id=\"all\" aria-pressed=\"" + (state.level === "all") + "\">" + esc(t.levelAll) + "</button>";
    }
    return h;
  }

  function render() {
    var t = T[lang];
    var tabs = t.steps.map(function (s, i) {
      return "<li class=\"" + (i === step ? "on" : i < step ? "done" : "") + "\"><button type=\"button\" data-step=\"" + i + "\"" + (i === step ? " aria-current=\"step\"" : "") + "><span>" + (i + 1) + "</span>" + esc(s) + "</button></li>";
    }).join("");
    body.innerHTML =
      "<button type=\"button\" class=\"pk-x\" data-close aria-label=\"" + esc(t.close) + "\">&times;</button>" +
      "<ol class=\"pk-steps\">" + tabs + "</ol>" +
      "<p class=\"eyebrow\">" + esc(fmt(t.stepOf, { n: step + 1 })) + "</p>" +
      "<h2 id=\"picker-h\">" + esc(t.titles[step]) + "</h2>" +
      "<p class=\"pk-sub\">" + esc(t.subs[step]) + "</p>" +
      stepHtml(step) +
      (step > 0 ? "<button type=\"button\" class=\"pk-back\" data-step=\"" + (step - 1) + "\">" + (lang === "ar" ? "&rarr; " : "&larr; ") + esc(t.back) + "</button>" : "") +
      (step === 1 ? "<p class=\"pk-note\">" + t.note + "</p>" : "");
    var panel = dlg.querySelector(".pk-panel");
    if (panel) panel.scrollTop = 0;
    var first = body.querySelector(".uni-card[aria-pressed=\"true\"]") || body.querySelector(".uni-card");
    setTimeout(function () { if (first) first.focus({ preventScroll: true }); }, 30);
  }

  function buildDialog() {
    dlg = document.createElement("div");
    dlg.className = "picker"; dlg.id = "picker";
    dlg.setAttribute("role", "dialog"); dlg.setAttribute("aria-modal", "true"); dlg.setAttribute("aria-labelledby", "picker-h");
    dlg.hidden = true;
    dlg.innerHTML = "<div class=\"pk-backdrop\" data-close></div><div class=\"pk-panel\"><div class=\"sadu\" aria-hidden=\"true\"></div><div class=\"pk-body\"></div></div>";
    document.body.appendChild(dlg);
    body = dlg.querySelector(".pk-body");

    dlg.addEventListener("click", function (e) {
      var card = e.target.closest(".uni-card");
      if (card) { pick(card.getAttribute("data-kind"), card.getAttribute("data-id")); return; }
      var s = e.target.closest("[data-step]");
      if (s) { step = +s.getAttribute("data-step"); render(); return; }
      if (e.target.closest("[data-close]")) closeDialog();
    });
    dlg.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { e.preventDefault(); closeDialog(); }
      if (e.key === "Tab") {
        var f = dlg.querySelectorAll("button, a[href]");
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  function pick(kind, id) {
    if (kind === "city") {
      state.city = validCity(id) ? id : "all";
      if (state.uni && state.uni !== "all" && state.city !== "all" && byId(state.uni).city !== state.city) state.uni = null;
      put("city", state.city); apply(); step = 1; render();
    } else if (kind === "uni") {
      state.uni = validUni(id) ? id : "all";
      if (state.uni !== "all") state.city = byId(state.uni).city;
      put("uni", state.uni); put("city", state.city || "all"); apply(); step = 2; render();
    } else {
      state.level = validLevel(id) ? id : "all";
      put("level", state.level);
      if (!state.uni) { state.uni = "all"; put("uni", "all"); }
      if (!state.city) { state.city = "all"; put("city", "all"); }
      apply(); closeDialog(true);
    }
  }

  function openDialog(atStep) {
    if (!dlg) buildDialog();
    lastFocus = document.activeElement;
    step = typeof atStep === "number" ? atStep : 0;
    dlg.hidden = false;
    document.documentElement.classList.add("picker-open");
    render();
  }

  function closeDialog(done) {
    if (!dlg || dlg.hidden) return;
    dlg.hidden = true;
    document.documentElement.classList.remove("picker-open");
    ["city", "uni", "level"].forEach(function (k) { if (!state[k]) { state[k] = "all"; put(k, "all"); } });
    apply();
    if (done) flyHome();
    else if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  // ---------- flight transition: a small plane carries the visitor to the top ----------
  var PLANE_SVG =
    '<svg viewBox="0 0 160 60" width="132" height="50" aria-hidden="true">' +
      '<path d="M78 25 L93 9 L101 9 L93 25 Z" fill="#C9D2CB"/>' +
      '<path d="M14 26 L4 3 L20 3 L37 24 Z" fill="#0B6B3A"/>' +
      '<path d="M9 11 L19 11 L26 19 L13 19 Z" fill="#E2B66C"/>' +
      '<path d="M10 32 C10 26 22 24 40 24 L132 24 C146 24 156 28 158 32 C156 36 146 38 132 38 L40 38 C22 38 10 36 10 32 Z" fill="#F7F9F7"/>' +
      '<path d="M22 33 L141 33 L147 35.2 L22 35.2 Z" fill="#0B6B3A"/>' +
      '<path d="M22 36 L144 36 L146 36.8 L22 36.8 Z" fill="#E2B66C"/>' +
      '<path d="M144 27.5 C149 28 153 29.5 155 31 L145 31 Z" fill="#1E3A5F"/>' +
      '<g fill="#1E3A5F">' + (function () { var s = ""; for (var x = 48; x <= 134; x += 6) s += '<circle cx="' + x + '" cy="29" r="1.4"/>'; return s; })() + '</g>' +
      '<path d="M14 32 L2 41 L12 41 L27 34 Z" fill="#0A5A31"/>' +
      '<path d="M70 34 L98 56 L110 56 L95 34 Z" fill="#DCE3DD"/>' +
      '<ellipse cx="90" cy="45.5" rx="9.5" ry="4" fill="#EEF2EF" stroke="#B8C2BA" stroke-width=".8"/>' +
    '</svg>';

  function injectFlightCss() {
    if (document.getElementById("flight-css")) return;
    var st = document.createElement("style");
    st.id = "flight-css";
    st.textContent =
      ".flight{position:fixed; inset:0; z-index:120; pointer-events:none; overflow:hidden}" +
      ".flight-veil{position:absolute; inset:0; background:radial-gradient(120% 90% at 70% 10%, #173252, #0B1626 70%); opacity:0; transition:opacity .5s ease}" +
      ".flight-trail{position:absolute; inset:0; width:100%; height:100%}" +
      ".flight-plane{position:absolute; left:0; top:0; will-change:transform; filter:drop-shadow(0 8px 14px rgba(0,0,0,.35))}" +
      ".flight-plane.rtl svg{transform:scaleX(-1)}" +
      ".flight-label{position:absolute; left:50%; top:50%; transform:translate(-50%, -50%); color:#E2B66C; font-family:var(--f-mono, monospace); letter-spacing:.14em; text-transform:uppercase; font-size:.85rem; opacity:0; transition:opacity .4s ease; white-space:nowrap}" +
      "html[lang=ar] .flight-label{letter-spacing:0; font-family:var(--f-body, sans-serif); font-size:1rem}";
    document.head.appendChild(st);
  }

  function replayHero() {
    document.querySelectorAll(".hero-copy > *").forEach(function (el) {
      el.style.animation = "none";
      void el.offsetWidth;
      el.style.animation = "";
    });
  }

  function flyHome() {
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { window.scrollTo(0, 0); return; }
    injectFlightCss();

    var rtl = document.documentElement.dir === "rtl";
    var W = window.innerWidth, H = window.innerHeight;
    var fly = document.createElement("div");
    fly.className = "flight";
    var label = lang === "ar" ? "رحلتك تبدأ الآن" : "Your journey starts now";
    fly.innerHTML =
      '<div class="flight-veil"></div>' +
      '<svg class="flight-trail" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none"><path fill="none" stroke="#E2B66C" stroke-width="2" stroke-linecap="round" stroke-dasharray="2 9" opacity=".8"/></svg>' +
      '<p class="flight-label">' + label + '</p>' +
      '<div class="flight-plane' + (rtl ? " rtl" : "") + '">' + PLANE_SVG + '</div>';
    document.body.appendChild(fly);

    var veil = fly.querySelector(".flight-veil"), trail = fly.querySelector(".flight-trail path"),
        plane = fly.querySelector(".flight-plane"), lbl = fly.querySelector(".flight-label");

    // quadratic curve across the screen (mirrored for Arabic)
    var p0 = { x: -0.12 * W, y: 0.78 * H }, p1 = { x: 0.5 * W, y: 0.02 * H }, p2 = { x: 1.12 * W, y: 0.34 * H };
    if (rtl) { p0.x = W - p0.x; p1.x = W - p1.x; p2.x = W - p2.x; }
    function pt(t) {
      var a = (1 - t) * (1 - t), b = 2 * (1 - t) * t, c = t * t;
      return { x: a * p0.x + b * p1.x + c * p2.x, y: a * p0.y + b * p1.y + c * p2.y };
    }
    function tan(t) {
      return { x: 2 * (1 - t) * (p1.x - p0.x) + 2 * t * (p2.x - p1.x), y: 2 * (1 - t) * (p1.y - p0.y) + 2 * t * (p2.y - p1.y) };
    }
    trail.setAttribute("d", "M" + p0.x + " " + p0.y + " Q" + p1.x + " " + p1.y + " " + p2.x + " " + p2.y);

    requestAnimationFrame(function () { veil.style.opacity = "0.92"; lbl.style.opacity = "1"; });

    var DUR = 3200, t0 = null, jumped = false, revealed = false;
    function ease(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
    function frame(now) {
      if (t0 === null) t0 = now;
      var k = Math.min(1, (now - t0) / DUR), e = ease(k);
      var p = pt(e), d = tan(e);
      var ang = Math.atan2(d.y, d.x) * 180 / Math.PI;
      if (rtl) ang = ang - 180;
      plane.style.transform = "translate(" + (p.x - 66) + "px," + (p.y - 25) + "px) rotate(" + ang + "deg)";
      // show the dotted trail only behind the plane, fading out at the end
      trail.parentNode.style.clipPath = rtl
        ? "inset(0 0 0 " + Math.max(0, p.x) + "px)"
        : "inset(0 " + Math.max(0, W - p.x) + "px 0 0)";
      trail.style.opacity = String(0.85 * (1 - Math.max(0, (k - 0.75) / 0.25)));

      if (!jumped && k > 0.18) { jumped = true; window.scrollTo(0, 0); replayHero(); }
      if (!revealed && k > 0.6) { revealed = true; veil.style.opacity = "0"; lbl.style.opacity = "0"; }
      if (k < 1) requestAnimationFrame(frame);
      else { fly.style.transition = "opacity .3s ease"; fly.style.opacity = "0"; setTimeout(function () { fly.remove(); }, 320); }
    }
    requestAnimationFrame(frame);
  }

  function init() {
    var p = {};
    try { var sp = new URL(location.href).searchParams; p = { city: sp.get("city"), uni: sp.get("uni"), level: sp.get("level") }; } catch (e) {}
    var fromUrl = !!(p.city || p.uni || p.level);
    state.uni = p.uni && validUni(p.uni) ? p.uni : (fromUrl ? null : (validUni(get("uni")) ? get("uni") : null));
    state.city = p.city && validCity(p.city) ? p.city : (fromUrl ? null : (validCity(get("city")) ? get("city") : null));
    state.level = p.level && validLevel(p.level) ? p.level : (fromUrl ? null : (validLevel(get("level")) ? get("level") : null));
    if (state.uni && state.uni !== "all") state.city = byId(state.uni).city;
    if (fromUrl) ["city", "uni", "level"].forEach(function (k) { if (state[k]) put(k, state[k]); });
    var nothing = !state.city && !state.uni && !state.level;
    if (!nothing) ["city", "uni", "level"].forEach(function (k) { if (!state[k]) state[k] = "all"; });
    apply();

    document.addEventListener("click", function (e) {
      var b = e.target.closest("[data-open-picker]");
      if (b) { e.preventDefault(); openDialog(+(b.getAttribute("data-open-picker") || 0)); return; }
      var pk = e.target.closest("[data-pick]");
      if (pk) { e.preventDefault(); state.uni = pk.getAttribute("data-pick"); state.city = byId(state.uni).city; put("uni", state.uni); put("city", state.city); apply(); document.getElementById("myuni").scrollIntoView({ behavior: "smooth" }); return; }
      var la = e.target.closest("[data-level-all]");
      if (la) { e.preventDefault(); state.level = "all"; put("level", "all"); apply(); }
    });

    if (nothing) openDialog(0);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

/* Masarok university picker: data + logic shared by the English and Arabic pages. */
(function () {
  "use strict";

  var CITIES = {
    sydney: {
      en: "Sydney", ar: "سيدني",
      transport: { en: "Opal card", ar: "بطاقة أوبال (Opal)", url: "https://transportnsw.info" },
      bond: { en: "NSW Fair Trading", ar: "NSW Fair Trading", url: "https://www.fairtrading.nsw.gov.au" },
      food: {
        en: "Suburbs such as Lakemba and Auburn are well known for halal food.",
        ar: "أحياء مثل لاكمبا (Lakemba) وأوبرن (Auburn) معروفة بالمطاعم الحلال."
      }
    },
    melbourne: {
      en: "Melbourne", ar: "ملبورن",
      transport: { en: "myki card", ar: "بطاقة مايكي (myki)", url: "https://www.ptv.vic.gov.au" },
      bond: { en: "the Residential Tenancies Bond Authority (RTBA)", ar: "هيئة سندات الإيجار (RTBA)", url: "https://rentalbonds.vic.gov.au" },
      food: {
        en: "Sydney Road in Brunswick and Coburg is well known for halal and Middle Eastern food.",
        ar: "شارع Sydney Road في برنزويك وكوبرغ معروف بالمطاعم الحلال والعربية."
      }
    },
    brisbane: {
      en: "Brisbane", ar: "بريزبن",
      transport: { en: "go card", ar: "بطاقة go card", url: "https://translink.com.au" },
      bond: { en: "the Residential Tenancies Authority (RTA)", ar: "هيئة الإيجارات السكنية (RTA)", url: "https://www.rta.qld.gov.au" }
    },
    adelaide: {
      en: "Adelaide", ar: "أديلايد",
      transport: { en: "metroCARD", ar: "بطاقة metroCARD", url: "https://www.adelaidemetro.com.au" },
      bond: { en: "Consumer and Business Services (CBS)", ar: "Consumer and Business Services (CBS)", url: "https://www.cbs.sa.gov.au" }
    },
    perth: {
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
      suburbs: "Carlton, Parkville, Brunswick" },
    { id: "monash", city: "melbourne", short: "Monash",
      name: { en: "Monash University", ar: "جامعة موناش" },
      campus: { en: "Clayton", ar: "كلايتون (Clayton)" },
      web: "https://www.monash.edu",
      college: { name: "Monash College", url: "https://www.monashcollege.edu.au" },
      union: { name: "Monash Student Association (MSA)", url: "https://msa.monash.edu" },
      legal: { en: "Ask the MSA about free legal and tenancy advice for students.", ar: "اسأل MSA عن الاستشارات القانونية واستشارات الإيجار المجانية للطلاب." },
      suburbs: "Clayton, Oakleigh, Notting Hill, Glen Waverley" },
    { id: "rmit", city: "melbourne", short: "RMIT",
      name: { en: "RMIT University", ar: "جامعة RMIT" },
      campus: { en: "Melbourne City campus", ar: "حرم المدينة في ملبورن" },
      web: "https://www.rmit.edu.au",
      college: { name: "RMIT University Pathways (RMIT UP)", url: "https://www.rmit.edu.au/up" },
      union: { name: "RMIT University Student Union (RUSU)", url: "https://rusu.rmit.edu.au" },
      legal: { en: "Ask RUSU about free legal and tenancy advice for students.", ar: "اسأل RUSU عن الاستشارات القانونية واستشارات الإيجار المجانية للطلاب." },
      suburbs: "Melbourne CBD, Carlton, North Melbourne" },
    { id: "adelaide", city: "adelaide", short: "Adelaide Uni",
      name: { en: "Adelaide University", ar: "جامعة أديلايد" },
      campus: { en: "City campuses (North Terrace)", ar: "حرم وسط المدينة (North Terrace)" },
      note: { en: "Adelaide University opened in 2026, joining the University of Adelaide and the University of South Australia.", ar: "افتُتحت جامعة أديلايد (Adelaide University) في 2026 بدمج جامعة أديلايد وجامعة جنوب أستراليا." },
      web: "https://www.adelaide.edu.au",
      college: { name: "Kaplan International College Adelaide", url: "https://www.kaplancollegeadelaide.edu.au" },
      union: { name: "Adelaide University Student Association (AUSA)", url: "https://www.ausaadelaide.com.au" },
      legal: { en: "Ask AUSA about free legal and tenancy advice for students.", ar: "اسأل AUSA عن الاستشارات القانونية واستشارات الإيجار المجانية للطلاب." },
      suburbs: "Adelaide CBD, North Adelaide, Kent Town" },
    { id: "uwa", city: "perth", short: "UWA",
      name: { en: "The University of Western Australia", ar: "جامعة غرب أستراليا (UWA)" },
      campus: { en: "Crawley", ar: "كرولي (Crawley)" },
      web: "https://www.uwa.edu.au",
      college: { name: "UWA College", url: "https://www.uwa.edu.au/study/how-to-apply/pathways-and-eligibility/entry-pathways/international-student-pathways" },
      union: { name: "UWA Student Guild", url: "https://www.uwastudentguild.com" },
      legal: { en: "Ask the UWA Student Guild about free legal and tenancy advice for students.", ar: "اسأل UWA Student Guild عن الاستشارات القانونية واستشارات الإيجار المجانية للطلاب." },
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
      chip: "All universities", change: "Choose university"
    },
    ar: {
      short: "جامعتك", name: "جامعتك", city: "مدينتك", campus: "حرمك الجامعي",
      college: "كلية المسار التابعة لها", union: "رابطة الطلاب في جامعتك",
      legal: "تقدم أغلب روابط الطلاب استشارات مجانية في الإيجار والمشكلات القانونية. اسأل رابطة جامعتك.",
      suburbs: "الأحياء القريبة من الجامعة أو الواقعة على خط حافلات أو قطار مباشر",
      transport: "بطاقة المواصلات في مدينتك", bond: "الجهة المسؤولة عن مبالغ التأمين في ولايتك",
      food: "اسأل جمعية الطلاب المسلمين في جامعتك عن المطاعم الحلال والمصليات القريبة.",
      chip: "كل الجامعات", change: "اختر جامعتك"
    }
  };

  var T = {
    en: {
      title: "Where will you study?",
      sub: "Choose your university and the guide will show examples for your campus and city: suburbs, transport, student support and more.",
      all: "Not sure yet? Show all universities",
      note: "<b>Important:</b> the universities SACM sponsors can change each year. Being accepted by a university is not the same as being sponsored to study there. Check the current list on the Ministry's <a href=\"https://ru.moe.gov.sa/Search\" rel=\"noopener\">recommended universities search</a> or with SACM before you commit.",
      close: "Close",
      campus: "Main campus",
      selected: "Selected"
    },
    ar: {
      title: "أين ستدرس؟",
      sub: "اختر جامعتك وسيعرض لك الدليل أمثلة خاصة بحرمك الجامعي ومدينتك: الأحياء، والمواصلات، ودعم الطلاب، وغيرها.",
      all: "لم تقرر بعد؟ اعرض كل الجامعات",
      note: "<b>مهم:</b> الجامعات التي تبتعث عليها الملحقية قد تتغير كل عام. الحصول على قبول من جامعة لا يعني أنك مبتعث إليها. تحقق من القائمة الحالية عبر <a href=\"https://ru.moe.gov.sa/Search\" rel=\"noopener\">خدمة الاستعلام عن الجامعات الموصى بها</a> أو من الملحقية قبل أن تلتزم.",
      close: "إغلاق",
      campus: "الحرم الرئيسي",
      selected: "مختارة"
    }
  };

  var KEY = "masarok-uni";
  var lang = (document.documentElement.lang || "en").slice(0, 2) === "ar" ? "ar" : "en";

  function byId(id) { for (var i = 0; i < UNIS.length; i++) if (UNIS[i].id === id) return UNIS[i]; return null; }
  function readSaved() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c]; }); }

  function values(u) {
    var g = GENERIC[lang];
    if (!u) return { short: g.short, name: g.name, city: g.city, campus: g.campus, college: g.college, union: g.union, legal: g.legal, suburbs: g.suburbs, transport: g.transport, bond: g.bond, food: g.food };
    var c = CITIES[u.city];
    return {
      short: u.short, name: u.name[lang], city: c[lang], campus: u.campus[lang],
      college: u.college.name, union: u.union.name, legal: u.legal[lang], suburbs: u.suburbs,
      transport: c.transport[lang], bond: c.bond[lang], food: c.food ? c.food[lang] : g.food,
      "college-url": u.college.url, "union-url": u.union.url, web: u.web,
      "transport-url": c.transport.url, "bond-url": c.bond.url
    };
  }

  var current = null; // uni id or "all"

  function apply(id) {
    current = id;
    var u = id && id !== "all" ? byId(id) : null;
    var v = values(u);
    document.documentElement.setAttribute("data-uni", u ? u.id : "all");

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

    var note = document.querySelector("[data-u-note]");
    if (note) { note.hidden = !(u && u.note); if (u && u.note) note.textContent = u.note[lang]; }

    var chip = document.querySelector(".uni-chip b");
    if (chip) chip.textContent = u ? u.short : GENERIC[lang].chip;

    // keep the choice in shareable links
    var langLink = document.querySelector(".top nav a.lang");
    if (langLink) {
      var base = langLink.getAttribute("href").split("?")[0];
      langLink.setAttribute("href", base + (u ? "?uni=" + u.id : ""));
    }
    try {
      var url = new URL(location.href);
      if (u) url.searchParams.set("uni", u.id); else url.searchParams.delete("uni");
      history.replaceState(null, "", url.toString());
    } catch (e) {}

    document.querySelectorAll(".uni-card").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-id") === (u ? u.id : "all") ? "true" : "false");
    });
  }

  function renderTable() {
    var tbody = document.querySelector("#uni-table tbody");
    if (!tbody) return;
    tbody.innerHTML = UNIS.map(function (u) {
      var c = CITIES[u.city];
      return "<tr><th scope=\"row\"><button type=\"button\" class=\"linkish\" data-pick=\"" + u.id + "\">" + esc(u.name[lang]) + "</button></th>" +
        "<td>" + esc(c[lang]) + "</td>" +
        "<td><a href=\"" + esc(u.college.url) + "\" rel=\"noopener\">" + esc(u.college.name) + "</a></td>" +
        "<td>" + esc(u.suburbs) + "</td></tr>";
    }).join("");
  }

  // ---------- picker dialog ----------
  var dlg, lastFocus;
  function buildDialog() {
    var t = T[lang];
    dlg = document.createElement("div");
    dlg.className = "picker";
    dlg.id = "picker";
    dlg.setAttribute("role", "dialog");
    dlg.setAttribute("aria-modal", "true");
    dlg.setAttribute("aria-labelledby", "picker-h");
    dlg.hidden = true;

    var groups = CITY_ORDER.map(function (ck) {
      var list = UNIS.filter(function (u) { return u.city === ck; });
      return "<div class=\"pk-group\"><p class=\"pk-city\">" + esc(CITIES[ck][lang]) + "</p><div class=\"pk-grid\">" +
        list.map(function (u) {
          return "<button type=\"button\" class=\"uni-card\" data-id=\"" + u.id + "\" aria-pressed=\"false\">" +
            "<span class=\"uc-short\">" + esc(u.short) + "</span>" +
            "<span class=\"uc-name\">" + esc(u.name[lang]) + "</span>" +
            "<span class=\"uc-campus\">" + esc(t.campus) + ": " + esc(u.campus[lang]) + "</span></button>";
        }).join("") + "</div></div>";
    }).join("");

    dlg.innerHTML =
      "<div class=\"pk-backdrop\" data-close></div>" +
      "<div class=\"pk-panel\">" +
        "<div class=\"sadu\" aria-hidden=\"true\"></div>" +
        "<div class=\"pk-body\">" +
          "<button type=\"button\" class=\"pk-x\" data-close aria-label=\"" + esc(t.close) + "\">&times;</button>" +
          "<p class=\"eyebrow\">" + (lang === "ar" ? "مسارُك" : "Masarok") + "</p>" +
          "<h2 id=\"picker-h\">" + esc(t.title) + "</h2>" +
          "<p class=\"pk-sub\">" + esc(t.sub) + "</p>" +
          groups +
          "<button type=\"button\" class=\"uni-card uni-all\" data-id=\"all\" aria-pressed=\"false\">" + esc(t.all) + "</button>" +
          "<p class=\"pk-note\">" + t.note + "</p>" +
        "</div>" +
      "</div>";
    document.body.appendChild(dlg);

    dlg.addEventListener("click", function (e) {
      var card = e.target.closest(".uni-card");
      if (card) { choose(card.getAttribute("data-id")); return; }
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

  function openDialog() {
    if (!dlg) buildDialog();
    apply(current || "all");
    lastFocus = document.activeElement;
    dlg.hidden = false;
    document.documentElement.classList.add("picker-open");
    var pressed = current && current !== "all" ? dlg.querySelector(".uni-card[aria-pressed=\"true\"]") : null;
    var sel = pressed || dlg.querySelector(".uni-card");
    var panel = dlg.querySelector(".pk-panel");
    if (!pressed && panel) panel.scrollTop = 0;
    setTimeout(function () { if (sel) sel.focus({ preventScroll: !pressed }); }, 30);
  }
  function closeDialog() {
    if (!dlg || dlg.hidden) return;
    dlg.hidden = true;
    document.documentElement.classList.remove("picker-open");
    if (!readSaved()) { save("all"); apply("all"); }
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function choose(id) {
    if (id !== "all" && !byId(id)) id = "all";
    save(id);
    apply(id);
    closeDialog();
    if (id !== "all") {
      var target = document.getElementById("myuni");
      if (target) setTimeout(function () { target.scrollIntoView({ behavior: "smooth", block: "start" }); }, 60);
    }
  }

  function init() {
    renderTable();
    var fromUrl = null;
    try { fromUrl = new URL(location.href).searchParams.get("uni"); } catch (e) {}
    var saved = readSaved();
    var start = (fromUrl && (fromUrl === "all" || byId(fromUrl))) ? fromUrl : (saved && (saved === "all" || byId(saved)) ? saved : null);
    if (fromUrl && start === fromUrl) save(fromUrl);
    apply(start || "all");

    document.addEventListener("click", function (e) {
      var b = e.target.closest("[data-open-picker]");
      if (b) { e.preventDefault(); openDialog(); return; }
      var p = e.target.closest("[data-pick]");
      if (p) { e.preventDefault(); choose(p.getAttribute("data-pick")); }
    });

    if (!start) openDialog();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

/* Masarok — deadlines and reminders
   Shows the application deadlines for the student's country, university and degree,
   lets them tick the ones they care about and add them to their phone's calendar (with alerts),
   and reminds them in the app when a saved deadline is close.
   Dates were collected from official pages on 8 October 2026. c:1 = the official page states the date,
   c:0 = expected date (from the usual yearly pattern), so the student should check the official page. */
(function () {
  var AR = (document.documentElement.lang || "en").slice(0, 2) === "ar";
  function T(x) { return Array.isArray(x) ? x[AR ? 1 : 0] : x; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  // ---------- data ----------
  // id, cc, uni (null = country-wide), levels (f b m p), date, end (windows), kind (dl | win | start | info), title, confirmed, source, note
  var D = [];
  function I(id, cc, uni, lv, d, e, k, t, c, src, n) { D.push({ id: id, cc: cc, u: uni, lv: lv, d: d, e: e, k: k, t: t, c: c, src: src, n: n || null }); }
  var ALL = "f b m p", BM = "f b m", B = "f b", M = "m p";

  // Saudi scholarship (every country)
  I("sa-join-1", "sa", null, ALL, "2026-10-01", "2026-11-30", "win", ["Join-the-scholarship window (self-funded students)", "فترة الإلحاق بالبعثة (للدارسين على حسابهم)"], 1,
    "https://www.moe.gov.sa/ar/knowledgecenter/eservices/pages/joinscholarship.aspx",
    ["Open now. Only for students who already have the Ministry's approval to study at their own cost.", "مفتوحة الآن، وهي للطلاب الحاصلين على موافقة الوزارة على الدراسة على حسابهم."]);
  I("sa-qubool", "sa", null, ALL, "2027-01-29", null, "dl", ["Check Qubool: scholarship applications usually open now", "تابع منصة قبول: يُفتح التقديم على البعثة عادةً في هذا الوقت"], 0,
    "https://www.uap.sa/#scholarship",
    ["The 2027 dates aren't announced yet. In 2026, applications ran from 29 January to 7 May.", "لم تُعلن مواعيد 2027 بعد. في 2026 كان التقديم من 29 يناير إلى 7 مايو."]);
  I("sa-join-2", "sa", null, ALL, "2027-05-01", "2027-06-30", "win", ["Join-the-scholarship window (self-funded students)", "فترة الإلحاق بالبعثة (للدارسين على حسابهم)"], 1,
    "https://www.moe.gov.sa/ar/knowledgecenter/eservices/pages/joinscholarship.aspx");

  // ---------- USA ----------
  var CA_ = "https://www.commonapp.org";
  I("us-grad", "us", null, M, "2026-12-01", null, "dl", ["Many master's and PhD deadlines start", "تبدأ مواعيد كثير من برامج الماجستير والدكتوراه"], 0,
    "https://grad.berkeley.edu/admissions/our-programs/", ["Deadlines vary by program; many PhD deadlines fall 1–15 December.", "المواعيد تختلف حسب البرنامج، وكثير من مواعيد الدكتوراه بين 1 و15 ديسمبر."]);
  I("mit-ea", "us", "mit", B, "2026-11-01", null, "dl", ["MIT Early Action deadline", "موعد القبول المبكر (Early Action) في MIT"], 0, "https://mitadmissions.org/apply/firstyear/deadlines-requirements/", ["MIT uses its own application, not the Common App.", "تستخدم MIT نظام تقديم خاصًا بها وليس Common App."]);
  I("mit-ra", "us", "mit", B, "2027-01-04", null, "dl", ["MIT Regular Action deadline", "موعد القبول العادي (Regular Action) في MIT"], 0, "https://mitadmissions.org/apply/firstyear/deadlines-requirements/");
  I("harvard-rea", "us", "harvard", B, "2026-11-01", null, "dl", ["Harvard Restrictive Early Action deadline", "موعد القبول المبكر المقيّد في Harvard"], 0, "https://college.harvard.edu/admissions/apply/first-year-applicants");
  I("harvard-rd", "us", "harvard", B, "2027-01-01", null, "dl", ["Harvard Regular Decision deadline", "موعد القبول العادي في Harvard"], 0, "https://college.harvard.edu/admissions/apply/first-year-applicants");
  I("bu-ed1", "us", "bu", B, "2026-11-02", null, "dl", ["BU Early Decision I deadline", "موعد القرار المبكر الأول في BU"], 0, "https://www.bu.edu/admissions/apply/deadlines/", ["Binding. Send your financial documents with the application.", "ملزم. أرسل مستنداتك المالية مع الطلب."]);
  I("bu-rd", "us", "bu", B, "2027-01-05", null, "dl", ["BU Regular Decision and Early Decision II deadline", "موعد القبول العادي والقرار المبكر الثاني في BU"], 0, "https://www.bu.edu/admissions/apply/deadlines/");
  I("columbia-ed", "us", "columbia", B, "2026-11-01", null, "dl", ["Columbia Early Decision deadline", "موعد القرار المبكر في Columbia"], 1, "https://undergrad.admissions.columbia.edu/updates/first-year-app-available", ["Binding.", "ملزم."]);
  I("columbia-rd", "us", "columbia", B, "2027-01-01", null, "dl", ["Columbia Regular Decision deadline", "موعد القبول العادي في Columbia"], 1, "https://undergrad.admissions.columbia.edu/updates/first-year-app-available");
  I("ucla-uc", "us", "ucla", B, "2026-10-01", "2026-11-30", "win", ["UC application filing period (UCLA)", "فترة التقديم عبر طلب جامعة كاليفورنيا (UCLA)"], 1, "https://admission.universityofcalifornia.edu/how-to-apply/applying-as-a-first-year/dates-and-deadlines.html", ["One round only, no early decision.", "جولة واحدة فقط دون قبول مبكر."]);
  I("usc-early", "us", "usc", B, "2026-11-01", null, "dl", ["USC Early Decision / Early Action deadline", "موعد القبول المبكر في USC"], 1, "https://viterbiadmission.usc.edu/2026/fall-2027-early-decision-early-action-or-regular-decision/", ["Also the merit scholarship deadline. Not every major offers early plans.", "وهو أيضًا موعد منح التميز، وليست كل التخصصات تقدم القبول المبكر."]);
  I("usc-rd", "us", "usc", B, "2027-01-10", null, "dl", ["USC Regular Decision deadline", "موعد القبول العادي في USC"], 1, "https://viterbiadmission.usc.edu/2026/fall-2027-early-decision-early-action-or-regular-decision/");
  I("stanford-rea", "us", "stanford", B, "2026-11-01", null, "dl", ["Stanford Restrictive Early Action deadline", "موعد القبول المبكر المقيّد في Stanford"], 0, "https://admission.stanford.edu/apply/first-year/");
  I("stanford-rd", "us", "stanford", B, "2027-01-05", null, "dl", ["Stanford Regular Decision deadline", "موعد القبول العادي في Stanford"], 0, "https://admission.stanford.edu/apply/first-year/");
  I("berkeley-uc", "us", "berkeley", B, "2026-10-01", "2026-11-30", "win", ["UC application filing period (UC Berkeley)", "فترة التقديم عبر طلب جامعة كاليفورنيا (Berkeley)"], 1, "https://admissions.berkeley.edu/apply-to-berkeley/dates-deadlines/", ["One round only, no early admission.", "جولة واحدة فقط دون قبول مبكر."]);
  I("cmu-ed", "us", "cmu", B, "2026-11-02", null, "dl", ["CMU Early Decision deadline", "موعد القرار المبكر في CMU"], 0, "https://www.cmu.edu/admission/admission/application-plans-deadlines");
  I("cmu-rd", "us", "cmu", B, "2027-01-04", null, "dl", ["CMU Regular Decision deadline", "موعد القبول العادي في CMU"], 0, "https://www.cmu.edu/admission/admission/application-plans-deadlines");
  I("uw-dl", "us", "uw", B, "2026-11-15", null, "dl", ["University of Washington application deadline", "آخر موعد للتقديم في جامعة واشنطن"], 0, "https://admit.washington.edu/apply/first-year/how-to-apply/", ["Single round, Common App only.", "جولة واحدة عبر Common App فقط."]);
  I("utaustin-ea", "us", "utaustin", B, "2026-10-15", null, "dl", ["UT Austin Early Action deadline", "موعد القبول المبكر في UT Austin"], 0, "https://admissions.utexas.edu/apply/international-students/");
  I("utaustin-rd", "us", "utaustin", B, "2026-12-01", null, "dl", ["UT Austin regular deadline", "الموعد العادي في UT Austin"], 0, "https://admissions.utexas.edu/apply/international-students/");
  I("uwm-ea", "us", "uwmadison", B, "2026-11-01", null, "dl", ["UW–Madison Early Action deadline", "موعد القبول المبكر في UW–Madison"], 0, "https://admissions.wisc.edu/deadlines/");
  I("uwm-rd", "us", "uwmadison", B, "2027-01-15", null, "dl", ["UW–Madison Regular Decision deadline", "موعد القبول العادي في UW–Madison"], 0, "https://admissions.wisc.edu/deadlines/");
  I("upenn-ed", "us", "upenn", B, "2026-11-01", null, "dl", ["Penn Early Decision deadline", "موعد القرار المبكر في Penn"], 1, "https://admissions.upenn.edu/how-to-apply/first-year-applicants", ["Binding.", "ملزم."]);
  I("upenn-rd", "us", "upenn", B, "2027-01-05", null, "dl", ["Penn Regular Decision deadline", "موعد القبول العادي في Penn"], 1, "https://admissions.upenn.edu/how-to-apply/first-year-applicants");
  I("psu-ea", "us", "pennstate", B, "2026-11-01", null, "dl", ["Penn State Early Action deadline", "موعد القبول المبكر في Penn State"], 0, "https://www.psu.edu/resources/international-students/deadlines");
  I("psu-pr", "us", "pennstate", B, "2026-12-01", null, "dl", ["Penn State priority deadline", "الموعد المفضّل للتقديم في Penn State"], 0, "https://www.psu.edu/resources/faq/early-action", ["Rolling review after this date.", "تستمر المراجعة بعد هذا الموعد."]);

  // ---------- UK ----------
  I("ucas-oct", "uk", null, B, "2026-10-15", null, "dl", ["UCAS deadline: Oxford, Cambridge, medicine, dentistry, vet", "موعد UCAS: أكسفورد وكامبريدج والطب وطب الأسنان والطب البيطري"], 1,
    "https://www.ucas.com/events/2027-entry-deadline-for-the-universities-of-oxford-and-cambridge-and-most-courses-in-medicine-475536", ["6pm UK time.", "الساعة 6 مساءً بتوقيت بريطانيا."]);
  I("ucas-jan", "uk", null, B, "2027-01-13", null, "dl", ["UCAS deadline for all other courses", "موعد UCAS لبقية التخصصات"], 1,
    "https://www.ucas.com/events/2027-entry-deadline-for-all-undergraduate-courses-except-those-with-a-15-october-deadline-475546", ["6pm UK time. Apply before this to be considered equally.", "الساعة 6 مساءً بتوقيت بريطانيا، وقدّم قبله لتُعامل مثل غيرك."]);
  I("uk-pgt", "uk", null, M, null, null, "info", ["Master's: deadlines are set per course, and many are rolling", "الماجستير: المواعيد حسب كل برنامج، وكثير منها مفتوح حتى تمتلئ المقاعد"], 0,
    "https://www.imperial.ac.uk/study/apply/postgraduate-taught/application-process/deadlines/", ["Visa applicants should apply by about mid-June at the latest.", "على من يحتاج تأشيرة التقديم قبل منتصف يونيو تقريبًا."]);
  I("imperial-pgt", "uk", "imperial", M, "2027-06-18", null, "dl", ["Imperial: recommended latest date for master's applicants who need a visa", "Imperial: آخر موعد يُنصح به لطلاب الماجستير الذين يحتاجون تأشيرة"], 0, "https://www.imperial.ac.uk/study/apply/postgraduate-taught/application-process/deadlines/", ["Departments may close earlier in rounds.", "قد تغلق الأقسام قبل ذلك على جولات."]);
  I("ucl-upc-1", "uk", "ucl", "f", "2026-11-13", null, "dl", ["UCL foundation (UPC): round 1 deadline", "الفاونديشن في UCL (UPC): موعد الجولة الأولى"], 1, "https://www.ucl.ac.uk/study/clie/upc-foundation/how-apply");
  I("ucl-upc-2", "uk", "ucl", "f", "2027-01-15", null, "dl", ["UCL foundation (UPC): round 2 deadline", "الفاونديشن في UCL (UPC): موعد الجولة الثانية"], 1, "https://www.ucl.ac.uk/study/clie/upc-foundation/how-apply");
  I("ucl-upc-5", "uk", "ucl", "f", "2027-06-18", null, "dl", ["UCL foundation (UPC): final deadline", "الفاونديشن في UCL (UPC): الموعد النهائي"], 1, "https://www.ucl.ac.uk/study/clie/upc-foundation/how-apply", ["May close earlier if places fill.", "قد يُغلق قبل ذلك إذا امتلأت المقاعد."]);
  I("kcl-ifp", "uk", "kcl", "f", "2027-03-05", null, "dl", ["King's International Foundation: priority deadline", "الفاونديشن الدولي في King's: الموعد المفضّل"], 1, "https://www.kcl.ac.uk/international-foundation/how-to-apply", ["Guarantees consideration and accommodation eligibility.", "يضمن النظر في طلبك وأحقية السكن."]);
  I("kcl-late", "uk", "kcl", "b", null, null, "info", ["King's treats applications after 13 January as late, including international ones", "تعتبر King's الطلبات بعد 13 يناير متأخرة، ومنها الطلبات الدولية"], 1, "https://www.kcl.ac.uk/study/undergraduate/how-to-apply");
  I("leeds-ify", "uk", "leeds", "f", null, null, "info", ["Leeds International Foundation Year: 2027 deadline not published yet (2026 entry closed 18 August)", "سنة الفاونديشن في Leeds: لم يُنشر موعد 2027 بعد (أُغلق تقديم 2026 في 18 أغسطس)"], 0, "https://www.leeds.ac.uk/international-foundation-year/doc/ify-applying");

  // ---------- Canada ----------
  I("ca-grad", "ca", null, M, null, null, "info", ["Master's and PhD: deadlines vary by program, usually November to April", "الماجستير والدكتوراه: المواعيد تختلف حسب البرنامج، وغالبًا من نوفمبر إلى أبريل"], 0, "https://www.grad.ubc.ca/prospective-students/application-admission/application-deadlines");
  I("uoft-early", "ca", "uoft", B, "2026-11-07", null, "dl", ["U of T: recommended early application date", "U of T: الموعد المبكر المُوصى به"], 1, "https://future.utoronto.ca/apply/important-application-dates/", ["Apply through OUAC; send available documents by 1 December.", "قدّم عبر OUAC وأرسل المستندات المتاحة قبل 1 ديسمبر."]);
  I("uoft-dl", "ca", "uoft", B, "2027-01-15", null, "dl", ["U of T application deadline (most faculties)", "آخر موعد للتقديم في U of T (أغلب الكليات)"], 1, "https://future.utoronto.ca/apply/important-application-dates/");
  I("uoft-docs", "ca", "uoft", B, "2027-02-01", null, "dl", ["U of T document deadline", "آخر موعد للمستندات في U of T"], 1, "https://future.utoronto.ca/apply/important-application-dates/", ["Engineering documents are due 15 January.", "مستندات الهندسة مطلوبة قبل 15 يناير."]);
  I("waterloo-eng", "ca", "waterloo", B, "2027-01-15", null, "dl", ["Waterloo Engineering application deadline", "آخر موعد للتقديم على الهندسة في Waterloo"], 1, "https://uwaterloo.ca/future-students/admissions/application-deadlines");
  I("waterloo-dl", "ca", "waterloo", B, "2027-02-01", null, "dl", ["Waterloo application deadline (other programs)", "آخر موعد للتقديم في Waterloo (بقية البرامج)"], 1, "https://uwaterloo.ca/future-students/admissions/application-deadlines");
  I("ubc-isp", "ca", "ubc", B, "2026-11-15", null, "dl", ["UBC International Scholars deadline", "موعد برنامج منح UBC الدولية"], 1, "https://you.ubc.ca/applying-ubc/dates-deadlines/");
  I("ubc-dl", "ca", "ubc", B, "2027-01-15", null, "dl", ["UBC application deadline", "آخر موعد للتقديم في UBC"], 1, "https://you.ubc.ca/applying-ubc/dates-deadlines/");
  I("ubc-docs", "ca", "ubc", B, "2027-03-15", null, "dl", ["UBC document deadline", "آخر موعد للمستندات في UBC"], 1, "https://you.ubc.ca/applying-ubc/dates-deadlines/");
  I("mcgill-dl", "ca", "mcgill", B, "2027-01-15", null, "dl", ["McGill application deadline", "آخر موعد للتقديم في McGill"], 0, "https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/other");
  I("mcgill-docs", "ca", "mcgill", B, "2027-03-01", null, "dl", ["McGill document deadline", "آخر موعد للمستندات في McGill"], 0, "https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/other");

  // ---------- Australia ----------
  I("unsw-ug", "au", "unsw", B, null, null, "info", ["UNSW: the last Term 1 2027 offer round for bachelor's has passed. Later offers only if places remain", "UNSW: انتهت آخر جولة عروض للبكالوريوس للفصل الأول 2027، والعروض اللاحقة حسب المقاعد المتبقية"], 1, "https://unsw.edu.au/study/international-students/admissions-info", ["Sponsored students follow a separate process, so ask UNSW.", "للطلاب المبتعثين إجراءات مختلفة، فاسأل الجامعة."]);
  I("unsw-pg-t1", "au", "unsw", "m", "2026-10-15", null, "dl", ["UNSW master's: last Term 1 2027 round for applicants outside Australia", "UNSW ماجستير: آخر جولة للفصل الأول 2027 للمتقدمين من خارج أستراليا"], 1, "https://unsw.edu.au/study/international-students/admissions-info");
  I("unsw-pg-t2", "au", "unsw", "m", "2026-12-17", null, "dl", ["UNSW master's: Term 2 2027 round", "UNSW ماجستير: جولة الفصل الثاني 2027"], 1, "https://unsw.edu.au/study/international-students/admissions-info");
  I("unsw-t1", "au", "unsw", "b m", "2027-02-15", null, "start", ["UNSW Term 1 2027 starts", "بداية الفصل الأول 2027 في UNSW"], 1, "https://www.unsw.edu.au/student/managing-your-studies/key-dates/academic-calendar", ["O-Week starts 8 February.", "أسبوع التعريف يبدأ 8 فبراير."]);
  I("unswc-dip", "au", "unsw", "f", "2027-01-18", null, "start", ["UNSW College Diploma Term 1 2027 classes start", "بداية دراسة الدبلوم في UNSW College للفصل الأول 2027"], 1, "https://www.unswcollege.edu.au/study/application-acceptance-deadlines", ["International deadlines are earlier and depend on your country: check the College's deadline tool.", "مواعيد الطلاب الدوليين أبكر وتختلف حسب دولتك، فراجع أداة المواعيد في موقع الكلية."]);
  I("usyd-s1", "au", "usyd", B, "2026-12-01", null, "dl", ["Sydney Uni: Semester 1 2027 closing date (bachelor's)", "جامعة سيدني: آخر موعد للفصل الأول 2027 (بكالوريوس)"], 1, "https://www.sydney.edu.au/study/how-to-apply/application-dates.html");
  I("usyd-s1m", "au", "usyd", "m", "2026-12-18", null, "dl", ["Sydney Uni: Semester 1 2027 closing date (master's)", "جامعة سيدني: آخر موعد للفصل الأول 2027 (ماجستير)"], 1, "https://www.sydney.edu.au/study/how-to-apply/application-dates.html");
  I("usyd-start", "au", "usyd", BM, "2027-02-22", null, "start", ["Sydney Uni Semester 1 2027 starts", "بداية الفصل الأول 2027 في جامعة سيدني"], 1, "https://www.sydney.edu.au/content/dam/students/documents/student-wall-calendar.pdf");
  I("usyd-s2", "au", "usyd", BM, "2027-05-29", null, "dl", ["Sydney Uni: Semester 2 2027 closing date", "جامعة سيدني: آخر موعد للفصل الثاني 2027"], 1, "https://www.sydney.edu.au/study/how-to-apply/application-dates.html");
  I("uts-aut", "au", "uts", BM, "2026-11-30", null, "dl", ["UTS: Autumn 2027 closing date (applying from outside Australia)", "UTS: آخر موعد لفصل الخريف 2027 (من خارج أستراليا)"], 1, "https://www.uts.edu.au/for-students/admissions-entry/application-dates");
  I("uts-start", "au", "uts", BM, "2027-02-15", null, "start", ["UTS Autumn session 2027 starts", "بداية فصل الخريف 2027 في UTS"], 1, "https://www.uts.edu.au/for-students/current-students/managing-your-course/important-dates/academic-year-dates/2027-academic-year-dates");
  I("uts-spr", "au", "uts", BM, "2027-04-30", null, "dl", ["UTS: Spring 2027 closing date (applying from outside Australia)", "UTS: آخر موعد لفصل الربيع 2027 (من خارج أستراليا)"], 1, "https://www.uts.edu.au/for-students/admissions-entry/application-dates");
  I("unimelb-s1", "au", "unimelb", B, "2026-11-30", null, "dl", ["Melbourne Uni: Semester 1 2027 closing date (bachelor's)", "جامعة ملبورن: آخر موعد للفصل الأول 2027 (بكالوريوس)"], 1, "https://study.unimelb.edu.au/how-to-apply/undergraduate-study/international-applications/entry-requirements/important-dates");
  I("unimelb-m", "au", "unimelb", "m", null, null, "info", ["Melbourne Uni master's: closing dates are set on each course page", "جامعة ملبورن ماجستير: المواعيد في صفحة كل برنامج"], 1, "https://study.unimelb.edu.au/how-to-apply/graduate-coursework-study/international-applications/entry-requirements/important-dates");
  I("unimelb-start", "au", "unimelb", BM, "2027-03-01", null, "start", ["Melbourne Uni Semester 1 2027 starts", "بداية الفصل الأول 2027 في جامعة ملبورن"], 1, "https://students.unimelb.edu.au/your-course/manage-your-course/key-dates/2027-key-dates");
  I("unimelb-s2", "au", "unimelb", B, "2027-05-31", null, "dl", ["Melbourne Uni: Semester 2 2027 closing date (bachelor's)", "جامعة ملبورن: آخر موعد للفصل الثاني 2027 (بكالوريوس)"], 1, "https://study.unimelb.edu.au/how-to-apply/undergraduate-study/international-applications/entry-requirements/important-dates");
  I("monash-info", "au", "monash", BM, null, null, "info", ["Monash: no fixed closing date. International students can apply any time, but apply early for your visa", "Monash: لا يوجد موعد ثابت، ويمكن التقديم في أي وقت، لكن قدّم مبكرًا لأجل التأشيرة"], 1, "https://www.monash.edu/admissions/apply/international-ug");
  I("monash-start", "au", "monash", BM, "2027-03-01", null, "start", ["Monash Semester 1 2027 starts (early March)", "بداية الفصل الأول 2027 في Monash (أوائل مارس)"], 0, "https://www.monash.edu/admissions/apply/international-ug");
  I("rmit-apply", "au", "rmit", BM, "2027-01-04", null, "dl", ["RMIT: apply by now for Semester 1 2027 if you need a visa", "RMIT: قدّم قبل هذا الموعد للفصل الأول 2027 إذا كنت تحتاج تأشيرة"], 0, "https://www.rmit.edu.au/study-with-us/levels-of-study/undergraduate-study/bachelor-degrees/bachelor-of-games-bp214/apply-now", ["RMIT advises applying 4–8 weeks before the start. The final deadline is 3 March.", "تنصح RMIT بالتقديم قبل البدء بـ4 إلى 8 أسابيع، والموعد النهائي 3 مارس."]);
  I("rmit-start", "au", "rmit", BM, "2027-03-01", null, "start", ["RMIT Semester 1 2027 classes start", "بداية الدراسة في الفصل الأول 2027 في RMIT"], 1, "https://www.rmit.edu.au/study-with-us/levels-of-study/undergraduate-study/bachelor-degrees/bachelor-of-games-bp214/apply-now");
  I("deakin-t1", "au", "deakin", BM, "2026-12-18", null, "dl", ["Deakin: Trimester 1 2027 closing date for Middle East applicants", "Deakin: آخر موعد للفصل الثلاثي الأول 2027 لمتقدمي الشرق الأوسط"], 1, "https://www.deakin.edu.au/international-students/choosing-your-degree/start-in-march");
  I("deakin-start", "au", "deakin", BM, "2027-03-01", null, "start", ["Deakin Trimester 1 2027 starts", "بداية الفصل الثلاثي الأول 2027 في Deakin"], 1, "https://www.deakin.edu.au/students/enrolment-and-fees/manage-your-course/handbooks/2027-handbook/2027-trimester-dates");
  I("anu-s1", "au", "anu", BM, "2026-12-15", null, "dl", ["ANU: Semester 1 2027 closing date", "ANU: آخر موعد للفصل الأول 2027"], 1, "https://cbe.anu.edu.au/study/in-australia-international", ["From the College of Business & Economics. Other colleges may differ.", "من كلية الأعمال والاقتصاد، وقد تختلف الكليات الأخرى."]);
  I("anu-start", "au", "anu", BM, "2027-02-22", null, "start", ["ANU Semester 1 2027 starts", "بداية الفصل الأول 2027 في ANU"], 1, "https://www.anu.edu.au/directories/university-calendar?year=2027");
  I("anu-s2", "au", "anu", BM, "2027-05-15", null, "dl", ["ANU: Semester 2 2027 closing date", "ANU: آخر موعد للفصل الثاني 2027"], 1, "https://cbe.anu.edu.au/study/in-australia-international");
  I("adl-apply", "au", "adelaide", BM, "2026-11-22", null, "dl", ["Adelaide University: apply by now for Semester 1 2027", "Adelaide University: قدّم قبل هذا الموعد للفصل الأول 2027"], 0, "https://adelaideuni.edu.au/about/faqs/answer/4179", ["Most programs have no closing date; the university advises applying at least 3 months ahead.", "أغلب البرامج بلا موعد إغلاق، وتنصح الجامعة بالتقديم قبل 3 أشهر على الأقل."]);
  I("adl-start", "au", "adelaide", BM, "2027-02-22", null, "start", ["Adelaide University Semester 1 2027 starts", "بداية الفصل الأول 2027 في Adelaide University"], 1, "https://adelaide.edu.au/about/academic-calendar/");
  I("uwa-s1", "au", "uwa", BM, "2027-01-11", null, "dl", ["UWA: Semester 1 2027 closing date", "UWA: آخر موعد للفصل الأول 2027"], 1, "https://www.uwa.edu.au/study/how-to-apply/international-applicants", ["Some countries close earlier, on 28 December.", "بعض الدول يُغلق تقديمها أبكر، في 28 ديسمبر."]);
  I("uwa-s2", "au", "uwa", BM, "2027-06-07", null, "dl", ["UWA: Semester 2 2027 closing date", "UWA: آخر موعد للفصل الثاني 2027"], 1, "https://www.uwa.edu.au/study/how-to-apply/international-applicants");
  I("curtin-info", "au", "curtin", BM, null, null, "info", ["Curtin: check the international closing dates on Curtin's application deadlines page", "Curtin: راجع مواعيد الطلاب الدوليين في صفحة مواعيد التقديم"], 0, "https://www.curtin.edu.au/study/applying/application-deadlines/");
  I("uq-s1", "au", "uq", BM, "2026-11-30", null, "dl", ["UQ: Semester 1 2027 closing date", "UQ: آخر موعد للفصل الأول 2027"], 1, "https://study.uq.edu.au/admissions/undergraduate/submit-your-application");
  I("uq-start", "au", "uq", BM, "2027-02-22", null, "start", ["UQ Semester 1 2027 classes start", "بداية الدراسة في الفصل الأول 2027 في UQ"], 1, "https://about.uq.edu.au/academic-calendar");
  I("uq-s2", "au", "uq", BM, "2027-05-31", null, "dl", ["UQ: Semester 2 2027 closing date", "UQ: آخر موعد للفصل الثاني 2027"], 1, "https://study.uq.edu.au/admissions/undergraduate/submit-your-application");

  // ---------- Germany ----------
  I("de-ua-ss", "de", null, BM, "2026-11-20", null, "dl", ["uni-assist: submit 8 weeks before the summer semester deadline", "uni-assist: قدّم قبل موعد الفصل الصيفي بـ8 أسابيع"], 1, "https://www.uni-assist.de/en/how-to-apply/plan-your-application/deadlines-processing-time/", ["Checking your documents takes 2–6 weeks.", "تستغرق مراجعة مستنداتك من أسبوعين إلى 6 أسابيع."]);
  I("de-ua-ws", "de", null, BM, "2027-05-20", null, "dl", ["uni-assist: submit 8 weeks before the winter semester deadline", "uni-assist: قدّم قبل موعد الفصل الشتوي بـ8 أسابيع"], 1, "https://www.uni-assist.de/en/how-to-apply/plan-your-application/deadlines-processing-time/");
  I("de-ws-start", "de", null, BM, "2027-10-01", null, "start", ["Winter semester 2027/28 begins", "بداية الفصل الشتوي 2027/28"], 1, "https://www.tum.de/en/studies/application/application-info-portal/dates-periods-and-deadlines", ["Lectures start later in October.", "تبدأ المحاضرات لاحقًا في أكتوبر."]);
  I("tum-ws", "de", "tum", B, "2027-05-15", "2027-07-15", "win", ["TUM bachelor's: winter semester 2027/28 application period", "TUM بكالوريوس: فترة التقديم للفصل الشتوي 2027/28"], 1, "https://www.tum.de/en/studies/degree-programs/detail/mechanical-engineering-bachelor-of-science-bsc");
  I("tum-skm", "de", "tum", B, "2027-07-15", null, "dl", ["Studienkolleg Munich: winter semester 2027/28 deadline", "الكلية التحضيرية في ميونخ: موعد الفصل الشتوي 2027/28"], 0, "https://www.lmu.de/en/study/degree-students/applications-for-admission/guidelines-and-faqs/guide-to-applying-for-studienkolleg/");
  I("tum-ms-ss", "de", "tum", "m", "2026-10-01", "2026-11-30", "win", ["TUM master's: summer semester 2027 application period", "TUM ماجستير: فترة التقديم للفصل الصيفي 2027"], 1, "https://www.tum.de/en/studies/degree-programs/detail/mechanical-engineering-master-of-science-msc", ["Open now. Dates differ by program.", "مفتوحة الآن، والمواعيد تختلف حسب البرنامج."]);
  I("tum-ms-ws", "de", "tum", "m", "2027-04-01", "2027-05-31", "win", ["TUM master's: winter semester 2027/28 application period", "TUM ماجستير: فترة التقديم للفصل الشتوي 2027/28"], 1, "https://www.tum.de/en/studies/degree-programs/detail/mechanical-engineering-master-of-science-msc");
  I("lmu-ss", "de", "lmu", BM, "2027-01-15", null, "dl", ["LMU: summer semester 2027 deadline (also Studienkolleg)", "LMU: موعد الفصل الصيفي 2027 (وأيضًا الكلية التحضيرية)"], 1, "https://www.lmu.de/en/study/degree-students/dates-and-deadlines/", ["Your application must arrive by this date.", "يجب أن يصل طلبك قبل هذا التاريخ."]);
  I("lmu-ws", "de", "lmu", BM, "2027-07-15", null, "dl", ["LMU: winter semester 2027/28 deadline (also Studienkolleg)", "LMU: موعد الفصل الشتوي 2027/28 (وأيضًا الكلية التحضيرية)"], 1, "https://www.lmu.de/en/study/degree-students/dates-and-deadlines/");
  I("tub-ss", "de", "tuberlin", B, "2027-01-15", null, "dl", ["TU Berlin: summer semester 2027 deadline", "TU Berlin: موعد الفصل الصيفي 2027"], 0, "https://www.tu.berlin/en/studierendensekretariat/dates-deadlines-for-application-and-enrollment-at-tu-berlin");
  I("tub-ws", "de", "tuberlin", B, "2027-07-15", null, "dl", ["TU Berlin: winter semester 2027/28 deadline", "TU Berlin: موعد الفصل الشتوي 2027/28"], 0, "https://www.tu.berlin/en/studierendensekretariat/dates-deadlines-for-application-and-enrollment-at-tu-berlin", ["Applications go through uni-assist.", "التقديم عبر uni-assist."]);
  I("tub-ms", "de", "tuberlin", "m", "2027-05-31", null, "dl", ["TU Berlin master's: winter semester 2027/28 deadline", "TU Berlin ماجستير: موعد الفصل الشتوي 2027/28"], 0, "https://www.tu.berlin/en/studierendensekretariat/dates-deadlines-for-application-and-enrollment-at-tu-berlin", ["Varies by program.", "يختلف حسب البرنامج."]);
  I("rwth-ss", "de", "rwth", BM, "2027-01-15", null, "dl", ["RWTH: summer semester 2027 deadline (restricted programs)", "RWTH: موعد الفصل الصيفي 2027 (البرامج محدودة المقاعد)"], 1, "https://www.rwth-aachen.de/cms/root/studium/vor-dem-studium/bewerbung-um-einen-studienplatz/bewerbung-bachelor/internationale-studierende/~dswt/bewerbung-erstes-fachsemester-internatio/?lidx=1");
  I("rwth-ms-open", "de", "rwth", "m", "2027-03-01", null, "dl", ["RWTH master's: winter semester 2027/28 deadline (open-admission programs)", "RWTH ماجستير: موعد الفصل الشتوي 2027/28 (البرامج مفتوحة القبول)"], 1, "https://www.rwth-aachen.de/cms/root/studium/vor-dem-studium/bewerbung-um-einen-studienplatz/master-bewerbung/~dqml/bewerbung-master-internationale/?lidx=1");
  I("rwth-ws", "de", "rwth", BM, "2027-07-15", null, "dl", ["RWTH: winter semester 2027/28 deadline (restricted programs)", "RWTH: موعد الفصل الشتوي 2027/28 (البرامج محدودة المقاعد)"], 1, "https://www.rwth-aachen.de/cms/root/studium/vor-dem-studium/bewerbung-um-einen-studienplatz/bewerbung-bachelor/internationale-studierende/~dswt/bewerbung-erstes-fachsemester-internatio/?lidx=1");
  I("kit-ss", "de", "kit", BM, "2027-01-15", null, "dl", ["KIT: summer semester 2027 deadline (Studienkolleg and restricted master's)", "KIT: موعد الفصل الصيفي 2027 (الكلية التحضيرية والماجستير محدود المقاعد)"], 1, "https://www.intl.kit.edu/istudies/3167.php");
  I("kit-ws", "de", "kit", BM, "2027-07-15", null, "dl", ["KIT: winter semester 2027/28 deadline", "KIT: موعد الفصل الشتوي 2027/28"], 1, "https://www.intl.kit.edu/istudies/3167.php", ["Bachelor's can only start in winter.", "البكالوريوس يبدأ في الفصل الشتوي فقط."]);

  // ---------- Singapore ----------
  I("sg-tg", "sg", null, B, "2027-09-01", "2027-09-30", "win", ["Tuition Grant online registration and signing", "التسجيل الإلكتروني وتوقيع منحة الرسوم (Tuition Grant)"], 0, "https://www.nus.edu.sg/oam/admissions/before-you-apply", ["Ask your cultural attaché before you accept the grant and its 3-year work bond.", "اسأل الملحق الثقافي قبل قبول المنحة والتزامها بالعمل 3 سنوات."]);
  I("sg-grad", "sg", null, M, "2026-10-01", "2027-01-31", "win", ["Research master's and PhD applications, August 2027 intake (typical)", "التقديم على الماجستير البحثي والدكتوراه لدفعة أغسطس 2027 (المعتاد)"], 0, "https://www.ntu.edu.sg/graduate/radmissionguide");
  I("nus-ug", "sg", "nus", B, "2026-12-16", "2027-02-17", "win", ["NUS application period (international qualifications)", "فترة التقديم في NUS (الشهادات الدولية)"], 1, "https://www.nus.edu.sg/oam/admissions/important-dates");
  I("nus-phd", "sg", "nus", M, "2027-01-15", null, "dl", ["NUS Engineering research programs: August 2027 deadline", "برامج البحث في هندسة NUS: موعد أغسطس 2027"], 1, "https://cde.nus.edu.sg/graduate/graduate-programmes-by-research/application-period-2/");
  I("ntu-ug", "sg", "ntu", B, "2026-10-15", "2027-01-20", "win", ["NTU application period (other international qualifications)", "فترة التقديم في NTU (الشهادات الدولية الأخرى)"], 1, "https://www.ntu.edu.sg/admissions/undergraduate/important-links/important-dates", ["The Saudi certificate falls under 'other international qualifications'.", "تندرج الشهادة السعودية تحت «الشهادات الدولية الأخرى»."]);
  I("ntu-phd", "sg", "ntu", M, "2027-01-31", null, "dl", ["NTU research programs: August 2027 general deadline", "برامج البحث في NTU: الموعد العام لدفعة أغسطس 2027"], 0, "https://www.ntu.edu.sg/graduate/radmissionguide", ["Some schools close earlier.", "بعض الكليات تُغلق أبكر."]);
  I("smu-ug", "sg", "smu", B, "2026-11-17", "2027-03-19", "win", ["SMU application period (expected)", "فترة التقديم في SMU (متوقعة)"], 0, "https://admissions.smu.edu.sg/admissions-requirements/important-dates", ["Based on last year's dates.", "بناءً على مواعيد العام الماضي."]);

  // ---------- helpers ----------
  var UI = {
    eyebrow: ["Deadlines and reminders", "المواعيد والتذكيرات"],
    title: ["Your deadlines", "مواعيدك المهمة"],
    intro: ["Deadlines for {who}. Tick the ones you want and add them to your phone's calendar. It will remind you 2 weeks, 3 days and 1 day before.", "مواعيد {who}. اختر ما تريد وأضفه إلى تقويم جوالك، وسيذكّرك قبل الموعد بأسبوعين و3 أيام ويوم واحد."],
    pick: ["Choose your country and university to see your deadlines.", "اختر دولتك وجامعتك لترى مواعيدك."],
    pickBtn: ["Choose my country", "اختر دولتي"],
    gScholar: ["Scholarship", "الابتعاث"],
    gCountry: ["Applying {in}", "التقديم {in}"],
    gOther: ["Other universities {in}", "جامعات أخرى {in}"],
    gAll: ["Universities {in}", "الجامعات {in}"],
    expected: ["Expected", "متوقع"],
    expectedTip: ["Based on the usual yearly date. Check the official page.", "بناءً على الموعد المعتاد كل عام، فتحقق من الصفحة الرسمية."],
    official: ["Official page", "الصفحة الرسمية"],
    google: ["Google Calendar", "تقويم Google"],
    add: ["Add {n} to my calendar", "أضف {n} إلى تقويمي"],
    addNone: ["Tick deadlines to add them", "اختر المواعيد لإضافتها"],
    selectAll: ["Select all", "اختر الكل"],
    today: ["Today", "اليوم"],
    tomorrow: ["Tomorrow", "غدًا"],
    inDays: ["In {n} days", "بعد {n} يومًا"],
    openNow: ["Open now · closes in {n} days", "مفتوح الآن · يُغلق بعد {n} يومًا"],
    opensIn: ["Opens in {n} days", "يُفتح بعد {n} يومًا"],
    starts: ["Starts", "تبدأ"],
    closes: ["closes", "يُغلق"],
    opens: ["opens", "يُفتح"],
    none: ["No dated deadlines for this choice yet.", "لا توجد مواعيد محددة لهذا الاختيار بعد."],
    note: ["Dates come from official pages, checked on 8 October 2026. Universities can change them and some programs have their own dates, so always confirm on the official page before you apply.", "المواعيد من الصفحات الرسمية، وتمت مراجعتها في 8 أكتوبر 2026. قد تغيّرها الجامعات، ولبعض البرامج مواعيد خاصة، فتأكد دائمًا من الصفحة الرسمية قبل التقديم."],
    toast: ["Deadline {when}: {t}", "موعد {when}: {t}"],
    toastSee: ["See deadlines", "اعرض المواعيد"],
    nav: ["Deadlines", "المواعيد"],
    yourUni: ["{uni}", "{uni}"],
    calSummary: ["Masarok", "مسارُك"]
  };
  function fmt(s, o) { return T(s).replace(/\{(\w+)\}/g, function (m, k) { return o[k] != null ? o[k] : m; }); }

  function parse(d) { var p = d.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function today() { var t = new Date(); return new Date(t.getFullYear(), t.getMonth(), t.getDate()); }
  function daysTo(d) { return Math.round((parse(d) - today()) / 86400000); }
  var DF = new Intl.DateTimeFormat(AR ? "ar-u-ca-gregory-nu-latn" : "en-AU", { day: "numeric", month: "short", year: "numeric" });
  var DM = new Intl.DateTimeFormat(AR ? "ar-u-ca-gregory-nu-latn" : "en-AU", { month: "short" });
  function nice(d) { return DF.format(parse(d)); }
  function lastDay(x) { return x.e || x.d; }
  function upcoming(x) { return x.k === "info" || !x.d || daysTo(lastDay(x)) >= 0; }

  var KEY = "masarok-reminders";
  function getSel() { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { return []; } }
  function setSel(a) { try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) {} }
  function byId(id) { for (var i = 0; i < D.length; i++) if (D[i].id === id) return D[i]; return null; }

  function vals() { var M = window.Masarok; return M && M.values ? M.values() : { v: {}, cc: null }; }

  // ---------- calendar files ----------
  function ymd(d) { return d.replace(/-/g, ""); }
  function plus1(d) { var x = parse(d); x.setDate(x.getDate() + 1); return x.getFullYear() + String(x.getMonth() + 1).padStart(2, "0") + String(x.getDate()).padStart(2, "0"); }
  function icsEsc(s) { return String(s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n"); }
  function fold(line) {
    var out = [], bytes = 0, cur = "";
    for (var i = 0; i < line.length; i++) {
      var ch = line[i], b = unescape(encodeURIComponent(ch)).length;
      if (bytes + b > 73) { out.push(cur); cur = " "; bytes = 1; }
      cur += ch; bytes += b;
    }
    out.push(cur); return out.join("\r\n");
  }
  function events(x) {
    var ev = [], title = T(x.t), note = x.n ? T(x.n) + "\n" : "";
    var desc = note + (x.c ? "" : T(UI.expectedTip) + "\n") + T(UI.official) + ": " + x.src + "\nmasarok.org";
    if (x.k === "win") {
      if (daysTo(x.d) > 0) ev.push({ uid: x.id + "-open", d: x.d, s: title + " (" + T(UI.opens) + ")", desc: desc, src: x.src });
      ev.push({ uid: x.id, d: x.e, s: title + " (" + T(UI.closes) + ")", desc: desc, src: x.src });
    } else ev.push({ uid: x.id, d: x.d, s: title, desc: desc, src: x.src });
    return ev;
  }
  function ics(items) {
    var now = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+Z$/, "Z");
    var L = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Masarok//Deadlines//" + (AR ? "AR" : "EN"), "CALSCALE:GREGORIAN", "METHOD:PUBLISH", "X-WR-CALNAME:" + icsEsc(T(UI.calSummary))];
    items.forEach(function (x) {
      events(x).forEach(function (e) {
        L.push("BEGIN:VEVENT", "UID:" + e.uid + "@masarok.org", "DTSTAMP:" + now,
          "DTSTART;VALUE=DATE:" + ymd(e.d), "DTEND;VALUE=DATE:" + plus1(e.d),
          "SUMMARY:" + icsEsc(e.s), "DESCRIPTION:" + icsEsc(e.desc), "URL:" + e.src, "TRANSP:TRANSPARENT");
        [["-P13DT15H", "2"], ["-P2DT15H", "3"], ["-PT15H", "1"]].forEach(function (a) {
          L.push("BEGIN:VALARM", "ACTION:DISPLAY", "DESCRIPTION:" + icsEsc(e.s), "TRIGGER:" + a[0], "END:VALARM");
        });
        L.push("END:VEVENT");
      });
    });
    L.push("END:VCALENDAR");
    return L.map(fold).join("\r\n") + "\r\n";
  }
  function download(items) {
    var blob = new Blob([ics(items)], { type: "text/calendar;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "masarok-deadlines.ics";
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
  }
  function gcal(x) {
    var d = x.k === "win" ? x.e : x.d;
    var details = (x.n ? T(x.n) + "\n" : "") + T(UI.official) + ": " + x.src + "\nmasarok.org";
    return "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent(T(x.t) + (x.k === "win" ? " (" + T(UI.closes) + ")" : "")) +
      "&dates=" + ymd(d) + "/" + plus1(d) + "&details=" + encodeURIComponent(details);
  }

  // ---------- rendering ----------
  function levelOk(x, lv) {
    if (!lv || lv === "all") return true;
    var k = { foundation: "f", bachelor: "b", master: "m", phd: "p" }[lv];
    return x.lv.split(" ").indexOf(k) > -1;
  }
  function when(x) {
    if (x.k === "info" || !x.d) return "";
    if (x.k === "win") {
      var o = daysTo(x.d), c = daysTo(x.e);
      if (o > 0) return fmt(UI.opensIn, { n: o });
      return c === 0 ? T(UI.today) : c === 1 ? T(UI.tomorrow) : fmt(UI.openNow, { n: c });
    }
    var n = daysTo(x.d);
    if (n === 0) return T(UI.today);
    if (n === 1) return T(UI.tomorrow);
    return (x.k === "start" ? T(UI.starts) + " · " : "") + fmt(UI.inDays, { n: n });
  }
  function dateBox(x) {
    if (x.k === "info" || !x.d) return '<div class="dl-date dl-info" aria-hidden="true">i</div>';
    var d = parse(x.k === "win" ? x.e : x.d);
    return '<div class="dl-date' + (x.k === "start" ? " dl-start" : "") + '"><b>' + d.getDate() + "</b><span>" + esc(DM.format(d)) + "</span></div>";
  }
  function row(x, sel) {
    var dated = x.k !== "info" && x.d;
    var on = sel.indexOf(x.id) > -1;
    var dates = !dated ? "" : x.k === "win" ? nice(x.d) + " – " + nice(x.e) : nice(x.d);
    var soon = dated && daysTo(lastDay(x)) <= 14;
    return '<li class="dl-row' + (soon ? " dl-soon" : "") + '">' +
      (dated ? '<label class="dl-pick"><input type="checkbox" data-dl="' + x.id + '"' + (on ? " checked" : "") + '><span class="sr">' + esc(T(x.t)) + "</span></label>" : '<span class="dl-pick"></span>') +
      dateBox(x) +
      '<div class="dl-body"><p class="dl-t">' + esc(T(x.t)) + (x.c ? "" : ' <span class="dl-exp" title="' + esc(T(UI.expectedTip)) + '">' + esc(T(UI.expected)) + "</span>") + "</p>" +
      (dated ? '<p class="dl-when"><span>' + esc(dates) + "</span> · <b>" + esc(when(x)) + "</b></p>" : "") +
      (x.n ? '<p class="dl-n">' + esc(T(x.n)) + "</p>" : "") +
      '<p class="dl-links"><a href="' + esc(x.src) + '" rel="noopener" target="_blank">' + esc(T(UI.official)) + ' ↗</a>' +
      (dated ? ' · <a href="' + esc(gcal(x)) + '" rel="noopener" target="_blank">' + esc(T(UI.google)) + " ↗</a>" : "") + "</p></div></li>";
  }
  function list(items, sel) {
    items = items.filter(upcoming).sort(function (a, b) {
      if (!a.d) return 1; if (!b.d) return -1;
      return parse(lastDay(a)) - parse(lastDay(b));
    });
    return items.length ? '<ul class="dl-list">' + items.map(function (x) { return row(x, sel); }).join("") + "</ul>" : "";
  }

  var sec;
  function render() {
    sec = document.getElementById("deadlines");
    if (!sec) return;
    var r = vals(), v = r.v || {}, cc = r.cc, lv = document.documentElement.getAttribute("data-level");
    var sel = getSel();
    var head = '<p class="eyebrow">' + esc(T(UI.eyebrow)) + '</p><h2 id="deadlines-h">' + esc(T(UI.title)) + "</h2>";
    if (!cc) { sec.hidden = true; sec.innerHTML = ""; return; }
    sec.hidden = false;
    var MC = window.MasarokCountry, inPlace = MC && MC.data[cc] ? T(MC.data[cc].inPlace) : "";
    var uni = document.documentElement.getAttribute("data-uni");
    var hasUni = uni && uni !== "all";
    var mine = D.filter(function (x) { return x.u && x.u === uni && levelOk(x, lv); });
    var country = D.filter(function (x) { return x.cc === cc && !x.u && levelOk(x, lv); });
    var sa = D.filter(function (x) { return x.cc === "sa" && levelOk(x, lv); });
    var others = {};
    D.forEach(function (x) { if (x.cc === cc && x.u && x.u !== uni && levelOk(x, lv)) (others[x.u] = others[x.u] || []).push(x); });
    var names = (window.Masarok && window.Masarok.uniNames) ? window.Masarok.uniNames() : {};
    var who = hasUni ? (v.short || "") + (AR ? " وجامعات أخرى " : " and other universities ") + inPlace : (AR ? "الجامعات " : "universities ") + inPlace;

    var h = head + '<p class="intro">' + esc(fmt(UI.intro, { who: who })) + "</p>";
    var blocks = [];
    if (hasUni && mine.length) blocks.push(["uni", esc(v.name || v.short || ""), list(mine, sel)]);
    blocks.push(["cc", esc(fmt(UI.gCountry, { "in": inPlace })), list(country, sel)]);
    blocks.push(["sa", esc(T(UI.gScholar)), list(sa, sel)]);
    h += blocks.filter(function (b) { return b[2]; }).map(function (b) {
      return '<div class="dl-group" data-g="' + b[0] + '"><h3>' + b[1] + "</h3>" + b[2] + "</div>";
    }).join("");
    var ok = Object.keys(others).filter(function (u) { return others[u].some(upcoming); });
    if (ok.length) {
      h += '<div class="dl-group dl-others"><h3>' + esc(fmt(hasUni ? UI.gOther : UI.gAll, { "in": inPlace })) + "</h3>" +
        ok.map(function (u) { var n = others[u].filter(function (x) { return x.d && x.k !== "info" && upcoming(x); }).length; return '<details class="dl-uni"><summary>' + esc(names[u] || u) + (n ? ' <span class="dl-count">' + n + "</span>" : "") + "</summary>" + list(others[u], sel) + "</details>"; }).join("") + "</div>";
    }
    h += '<div class="dl-bar"><button type="button" class="btn btn-primary" data-dl-add></button></div>' +
      '<p class="note">' + esc(T(UI.note)) + "</p>";
    sec.innerHTML = h;
    updateBar();
  }
  function updateBar() {
    if (!sec) return;
    var btn = sec.querySelector("[data-dl-add]"); if (!btn) return;
    var sel = getSel().filter(function (id) { var x = byId(id); return x && upcoming(x); });
    btn.textContent = sel.length ? fmt(UI.add, { n: sel.length }) : T(UI.addNone);
    btn.disabled = !sel.length;
  }

  // ---------- reminder when the student opens the site ----------
  var TK = "masarok-reminder-seen";
  function toast() {
    var sel = getSel().map(byId).filter(function (x) { return x && x.d && x.k !== "info"; });
    var soon = sel.map(function (x) {
      var d = x.k === "win" ? (daysTo(x.d) > 0 ? x.d : x.e) : x.d; return { x: x, n: daysTo(d), d: d };
    }).filter(function (o) { return o.n >= 0 && o.n <= 14; }).sort(function (a, b) { return a.n - b.n; });
    if (!soon.length) return;
    var o = soon[0], stamp = o.x.id + ":" + new Date().toDateString();
    try { if (localStorage.getItem(TK) === stamp) return; } catch (e) {}
    var w = o.n === 0 ? T(UI.today) : o.n === 1 ? T(UI.tomorrow) : fmt(UI.inDays, { n: o.n }).toLowerCase();
    var el = document.createElement("div");
    el.className = "dl-toast"; el.setAttribute("role", "status");
    el.innerHTML = '<span aria-hidden="true">⏰</span><p>' + esc(fmt(UI.toast, { when: w, t: T(o.x.t) })) + " <small>(" + esc(nice(o.d)) + ')</small></p><a href="#deadlines">' + esc(T(UI.toastSee)) + '</a><button type="button" aria-label="×">×</button>';
    document.body.appendChild(el);
    function close() { el.remove(); try { localStorage.setItem(TK, stamp); } catch (e) {} }
    el.querySelector("button").addEventListener("click", close);
    el.querySelector("a").addEventListener("click", close);
  }

  // ---------- styles ----------
  var css =
    "#deadlines .dl-group{margin-top:22px}" +
    "#deadlines .dl-group h3{font-size:1.02rem; margin:0 0 8px; color:var(--sand)}" +
    ".dl-list{list-style:none; margin:0; padding:0; display:grid; gap:8px}" +
    ".dl-row{display:grid; grid-template-columns:auto auto 1fr; gap:12px; align-items:start; background:var(--surface); border:1px solid var(--line); border-radius:var(--radius); padding:12px 14px}" +
    ".dl-row.dl-soon{border-color:color-mix(in srgb, var(--sand) 60%, var(--line))}" +
    ".dl-pick{width:22px; padding-top:10px} .dl-pick input{width:20px; height:20px; accent-color:var(--sand); cursor:pointer}" +
    ".sr{position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap}" +
    ".dl-date{width:52px; text-align:center; border:1px solid color-mix(in srgb, var(--sand) 50%, transparent); border-radius:8px; padding:4px 0; line-height:1.1}" +
    ".dl-date b{display:block; font-size:1.25rem; color:var(--ink)} .dl-date span{font-size:.75rem; color:var(--sand); font-family:var(--f-mono); text-transform:uppercase}" +
    ".dl-date.dl-start{border-color:color-mix(in srgb, var(--green) 50%, transparent)} .dl-date.dl-start span{color:var(--green)}" +
    ".dl-date.dl-info{height:36px; display:grid; place-items:center; color:var(--muted); font-family:var(--f-mono); border-style:dashed}" +
    ".dl-body{min-width:0} .dl-body p{margin:0}" +
    ".dl-t{color:var(--ink); font-weight:700; font-size:.97rem}" +
    ".dl-exp{display:inline-block; font-weight:500; font-size:.72rem; font-family:var(--f-mono); color:var(--sand); border:1px dashed var(--sand); border-radius:999px; padding:0 7px; vertical-align:2px}" +
    ".dl-when{color:var(--muted); font-size:.88rem; margin-top:2px !important} .dl-when b{color:var(--ink); font-weight:500}" +
    ".dl-soon .dl-when b{color:var(--sand)}" +
    ".dl-n{color:var(--muted); font-size:.88rem; margin-top:4px !important}" +
    ".dl-links{font-size:.85rem; margin-top:6px !important} .dl-links a{color:var(--green)}" +
    ".dl-uni{background:var(--surface); border:1px solid var(--line); border-radius:var(--radius); margin-top:8px; padding:0 14px}" +
    ".dl-uni summary{cursor:pointer; padding:12px 0; font-weight:700; color:var(--ink); display:flex; justify-content:space-between; align-items:center; gap:8px}" +
    ".dl-uni[open] summary{border-bottom:1px dashed var(--line); margin-bottom:10px}" +
    ".dl-uni .dl-list{padding-bottom:12px} .dl-uni .dl-row{background:transparent}" +
    ".dl-count{font-family:var(--f-mono); font-size:.78rem; color:var(--sand); border:1px solid color-mix(in srgb, var(--sand) 45%, transparent); border-radius:999px; padding:0 8px}" +
    ".dl-bar{position:sticky; bottom:max(12px, env(safe-area-inset-bottom)); z-index:5; margin-top:16px; display:flex; justify-content:center}" +
    ".dl-bar .btn[disabled]{opacity:.6; cursor:default}" +
    ".dl-toast{position:fixed; z-index:70; top:max(12px, env(safe-area-inset-top)); inset-inline:12px; margin-inline:auto; max-width:520px; display:flex; align-items:center; gap:10px; background:#10223C; color:var(--night-ink, #EEF2F7); border:1px solid var(--gold, #E2B66C); border-radius:14px; padding:10px 12px; box-shadow:0 18px 40px -18px rgba(0,0,0,.8)}" +
    ".dl-toast p{margin:0; flex:1; font-size:.92rem} .dl-toast small{color:var(--night-dim, #A9B8CB)}" +
    ".dl-toast a{color:var(--gold, #E2B66C); font-size:.88rem; white-space:nowrap}" +
    ".dl-toast button{background:none; border:0; color:var(--night-dim, #A9B8CB); font-size:1.3rem; cursor:pointer; line-height:1}" +
    "@media (max-width:700px){ .dl-bar{justify-content:flex-start} }" +
    "@media (max-width:560px){ .dl-row{grid-template-columns:auto 1fr; } .dl-row .dl-date{grid-row:span 1} .dl-pick{grid-row:1} .dl-row .dl-body{grid-column:1 / -1} }";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  // ---------- events ----------
  document.addEventListener("change", function (e) {
    var cb = e.target.closest && e.target.closest("input[data-dl]");
    if (!cb) return;
    var sel = getSel(), id = cb.getAttribute("data-dl"), i = sel.indexOf(id);
    if (cb.checked && i < 0) sel.push(id);
    if (!cb.checked && i > -1) sel.splice(i, 1);
    setSel(sel);
    document.querySelectorAll('input[data-dl="' + id + '"]').forEach(function (o) { o.checked = cb.checked; });
    updateBar();
  });
  document.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest("[data-dl-add]")) {
      var items = getSel().map(byId).filter(function (x) { return x && x.d && x.k !== "info" && upcoming(x); });
      if (items.length) download(items);
    }
  });
  document.addEventListener("masarok:change", function () { setTimeout(render, 0); });

  window.MasarokDeadlines = { data: D, ics: ics, render: render };

  function init() { render(); setTimeout(toast, 1200); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();

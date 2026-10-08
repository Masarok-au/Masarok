/* Masarok guided journey: an optional, locked staircase of small steps.
   Shared by the English and Arabic pages. Loaded after unis.js. */
(function () {
  "use strict";

  var lang = (document.documentElement.lang || "en").slice(0, 2) === "ar" ? "ar" : "en";
  var rtl = document.documentElement.dir === "rtl";
  var KEY = "masarok-journey";
  var LEVELS = ["foundation", "bachelor", "master", "phd"];
  function reduced() { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); }

  // ---------- links used by the steps ----------
  var L = {
    options: { href: "#options", en: "Your study options", ar: "خيارات الدراسة" },
    postgrad: { href: "#postgrad", en: "Master's and PhD", ar: "الماجستير والدكتوراه" },
    sacm: { href: "#sacm", en: "The SACM scholarship", ar: "دليل الابتعاث" },
    before: { href: "#before", en: "Before you fly checklist", ar: "قائمة ما قبل السفر" },
    arrival: { href: "#arrival", en: "First two weeks checklist", ar: "قائمة أول أسبوعين" },
    housing: { href: "#housing", en: "Finding a place", ar: "البحث عن سكن" },
    lessons: { href: "#lessons", en: "What I learned on the way", ar: "ما تعلمته في الطريق" },
    myuni: { href: "#myuni", en: "Your university at a glance", ar: "جامعتك باختصار" },
    lists: { href: "https://object.moe.gov.sa/nasaq/cm/files/aldlyl-alastrshady-ltrtyb-qwaaem-aljamaeat-hsb-almjalat-2027-2026.pdf", en: "2026–2027 university lists", ar: "قوائم الجامعات 2026–2027" },
    ruSearch: { href: "https://ru.moe.gov.sa/Search", en: "Recommended universities search", ar: "البحث في الجامعات الموصى بها" },
    qubool: { href: "https://www.uap.sa/#scholarship", en: "Qubool (uap.sa)", ar: "منصة قبول (uap.sa)" },
    safeer: { href: "https://safeer2.moe.gov.sa/Portal", en: "Safeer", ar: "منصة سفير" },
    visa: { href: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500", en: "Student visa (subclass 500)", ar: "تأشيرة الطالب (الفئة 500)" },
    oshc: { href: "https://privatehealth.gov.au/health_insurance/overseas/overseas_student_health_cover.htm", en: "About OSHC", ar: "عن التأمين الصحي OSHC" },
    ielts: { href: "https://ielts.org", en: "IELTS", ar: "اختبار IELTS" },
    sat: { href: "https://satsuite.collegeboard.org/sat", en: "SAT (College Board)", ar: "اختبار SAT (College Board)" },
    rd: { href: "https://sites.moe.gov.sa/scholarship-program/paths/path-albahthwaltatwir/", en: "Research & Development track", ar: "مسار البحث والتطوير" },
    faq: { href: "https://sites.moe.gov.sa/scholarship-program/faqs/", en: "Scholarship FAQ", ar: "الأسئلة الشائعة للابتعاث" },
    // personalised links (filled from the picker)
    uniWeb: { u: "web", en: "{uni} website", ar: "موقع {uni}" },
    college: { u: "college-url", en: "{college}", ar: "{college}" },
    transport: { u: "transport-url", en: "{transport}", ar: "{transport}" },
    bond: { u: "bond-url", en: "{bond}", ar: "{bond}" }
  };

  // ---------- the steps ----------
  // {uni} {college} {city} {transport} {bond} {track} are filled from the student's choices.
  var S = {
    fieldRoute: {
      en: { t: "Choose your field and your route",
        why: "Your field decides which universities and scholarship lists apply to you. Your route decides what you need next: Foundation leads to first year, and a Diploma leads to second year.",
        what: ["Pick the field you want to study, such as engineering or business.", "Compare Foundation (about 1 year) and Diploma (about 1 year) in the study options.", "If you are not sure, Foundation is the softer start."] },
      ar: { t: "اختر تخصصك ومسارك",
        why: "تخصصك يحدد الجامعات وقوائم الابتعاث التي تنطبق عليك، ومسارك يحدد خطوتك التالية: الفاونديشن يؤدي إلى السنة الأولى، والدبلوم يؤدي إلى السنة الثانية.",
        what: ["اختر التخصص الذي تريد دراسته، مثل الهندسة أو إدارة الأعمال.", "قارن بين الفاونديشن (سنة تقريبًا) والدبلوم (سنة تقريبًا) في خيارات الدراسة.", "إذا لم تكن متأكدًا، فالفاونديشن بداية أسهل."] },
      links: ["options", "college"] },

    englishF: {
      en: { t: "Reach your English score",
        why: "The Ministry asks for at least IELTS 5.5 (or equivalent) to sponsor a preparatory year, and SACM does not pay for English courses.",
        what: ["Book IELTS, or another test that {college} accepts.", "Check your program's score on {college}'s website. Diploma entry often needs a higher score than Foundation.", "If you are below the score, retake the test before you apply, so you don't pay for an English course yourself."] },
      ar: { t: "حقق درجة اللغة الإنجليزية المطلوبة",
        why: "تشترط الوزارة IELTS 5.5 على الأقل (أو ما يعادله) للابتعاث على السنة التحضيرية، والملحقية لا تبتعث على دورات اللغة.",
        what: ["احجز اختبار IELTS أو اختبارًا آخر تقبله {college}.", "تحقق من الدرجة المطلوبة لبرنامجك في موقع {college}. القبول في الدبلوم يحتاج غالبًا إلى درجة أعلى من الفاونديشن.", "إذا كانت درجتك أقل، أعد الاختبار قبل التقديم حتى لا تدفع تكلفة دورة لغة بنفسك."] },
      nonAu: {
        en: { t: "Reach your English score",
          why: "The Ministry asks for at least IELTS 5.5 (or equivalent) to sponsor a preparatory year, and SACM does not pay for English courses.",
          what: ["Book IELTS, or another test that {college} accepts.", "Check the score your program needs on {college}'s website.", "If you are below the score, retake the test before you apply, so you don't pay for an English course yourself."] },
        ar: { t: "حقق درجة اللغة الإنجليزية المطلوبة",
          why: "تشترط الوزارة IELTS 5.5 على الأقل (أو ما يعادله) للابتعاث على السنة التحضيرية، والملحقية لا تبتعث على دورات اللغة.",
          what: ["احجز اختبار IELTS أو اختبارًا آخر تقبله {college}.", "تحقق من الدرجة المطلوبة لبرنامجك في موقع {college}.", "إذا كانت درجتك أقل، أعد الاختبار قبل التقديم حتى لا تدفع تكلفة دورة لغة بنفسك."] }
      },
      links: ["ielts", "college"] },

    rulesF: {
      en: { t: "Check the scholarship rules for your route",
        why: "From 2025–26, the Ministry asks for at least 90% in high school and IELTS 5.5 to sponsor a preparatory year. Your university must also be on the list for your field.",
        what: ["Check that your high school average is at least 90%.", "Find {uni} on the 2026–2027 list for your field.", "Get SACM approval for your pathway program and the degree it leads to before you accept an offer."] },
      ar: { t: "تحقق من شروط الابتعاث لمسارك",
        why: "من 2025–26 تشترط الوزارة معدلًا لا يقل عن 90% في الثانوية وIELTS 5.5 للابتعاث على السنة التحضيرية، ويجب أن تكون جامعتك ضمن قائمة تخصصك.",
        what: ["تأكد أن معدلك في الثانوية لا يقل عن 90%.", "ابحث عن {uni} في قوائم 2026–2027 لتخصصك.", "احصل على موافقة الملحقية على برنامج المسار والبكالوريوس الذي يؤدي إليه قبل قبول أي عرض."] },
      links: ["lists", "sacm"] },

    offerF: {
      en: { t: "Apply to {college} and get your offer",
        why: "A package offer links your pathway year to your degree, so you know where you are heading. You will need the offer letter for your scholarship application.",
        what: ["Apply on {college}'s website, or through an agent the college approves.", "Ask for a package offer that includes the degree you want.", "Read the progression conditions and save the offer letter as a PDF."] },
      ar: { t: "قدّم على {college} واحصل على عرض القبول",
        why: "عرض القبول المشترك يربط سنة المسار بالبكالوريوس، فتعرف وجهتك من البداية. وستحتاج خطاب القبول عند التقديم على البعثة.",
        what: ["قدّم عبر موقع {college}، أو عن طريق وكيل معتمد لديها.", "اطلب عرض قبول مشتركًا يشمل البكالوريوس الذي تريده.", "اقرأ شروط الانتقال واحفظ خطاب القبول بصيغة PDF."] },
      links: ["college", "options"] },

    fieldUni: {
      en: { t: "Choose your field and university",
        why: "The scholarship only funds approved majors at universities on the list for your track and field.",
        what: ["Pick your field. Imdad covers fields the Saudi job market needs, and the list changes each year.", "Find {uni} on the 2026–2027 list for your field.", "Check the ranking rule for your track: top 30 for Al-Ruwwad, top 200 for Imdad."] },
      ar: { t: "اختر تخصصك وجامعتك",
        why: "البعثة تشمل التخصصات المعتمدة فقط، في الجامعات المدرجة في قائمة مسارك وتخصصك.",
        what: ["اختر تخصصك. مسار إمداد يشمل التخصصات التي يحتاجها سوق العمل السعودي، وقائمته تتغير كل عام.", "ابحث عن {uni} في قوائم 2026–2027 لتخصصك.", "تحقق من شرط التصنيف لمسارك: أفضل 30 لمسار الرواد، وأفضل 200 لمسار إمداد."] },
      links: ["lists", "ruSearch", "myuni"] },

    englishB: {
      en: { t: "Reach your English score",
        why: "The Ministry needs an unconditional offer, so your English must already meet your degree's level when you apply.",
        what: ["Check the English score for your degree on {uni}'s entry requirements page.", "Book IELTS, or another test {uni} accepts, early enough to retake it if needed.", "SACM does not pay for English courses, so reaching the score yourself saves you money."] },
      ar: { t: "حقق درجة اللغة الإنجليزية المطلوبة",
        why: "تشترط الوزارة قبولًا غير مشروط، لذلك يجب أن تحقق درجة اللغة المطلوبة لتخصصك قبل التقديم.",
        what: ["تحقق من درجة اللغة المطلوبة لتخصصك في صفحة شروط القبول في {uni}.", "احجز اختبار IELTS أو اختبارًا آخر تقبله {uni} مبكرًا، ليبقى لديك وقت لإعادته عند الحاجة.", "الملحقية لا تبتعث على دورات اللغة، فتحقيق الدرجة بنفسك يوفر عليك المال."] },
      links: ["ielts", "uniWeb"] },

    sat: { optional: true,
      en: { t: "SAT, if your university asks for it",
        why: "Some universities do not accept the Saudi high school certificate on its own for direct entry, and may ask for extra results such as the SAT.",
        what: ["Check {uni}'s entry requirements for Saudi students.", "Only sit the SAT if {uni} asks for it. If it doesn't, skip this step.", "If direct entry doesn't work for you, Foundation or a Diploma is a normal way in."] },
      ar: { t: "اختبار SAT، إذا طلبته جامعتك",
        why: "بعض الجامعات لا تقبل شهادة الثانوية السعودية وحدها للقبول المباشر، وقد تطلب نتائج إضافية مثل اختبار SAT.",
        what: ["تحقق من شروط القبول في {uni} للطلاب السعوديين.", "لا تقدّم اختبار SAT إلا إذا طلبته {uni}. وإن لم تطلبه فتخطَّ هذه الخطوة.", "إذا لم يناسبك القبول المباشر، فالفاونديشن أو الدبلوم طريق معتاد للدخول."] },
      byCc: {
        uk: { last: ["If direct entry doesn't work for you, a Foundation year is a normal way in.", "إذا لم يناسبك القبول المباشر، فسنة الفاونديشن طريق معتاد للدخول."] },
        de: { last: ["If your certificate doesn't give you direct entry, you usually need a Studienkolleg first.", "إذا لم تمنحك شهادتك القبول المباشر، فتحتاج عادةً إلى الكلية التحضيرية (Studienkolleg) أولًا."] },
        other: { last: ["If direct entry doesn't work for you, ask {uni} which other routes it accepts.", "إذا لم يناسبك القبول المباشر، فاسأل {uni} عن الطرق الأخرى التي تقبلها."] }
      },
      links: ["sat", "uniWeb", "options"] },

    courseType: {
      en: { t: "Choose coursework or research, and your field",
        why: "A coursework master's is classes and exams. A research master's is a thesis with a supervisor. The scholarship covers a master's for up to 2 years.",
        what: ["Decide which type suits your goals.", "Pick your field. The Ministry's FAQ says it does not have to match your bachelor's.", "Read the master's rules on this page."] },
      ar: { t: "اختر الماجستير بالمقررات أو بالبحث، وتخصصك",
        why: "الماجستير بالمقررات يعتمد على المواد والاختبارات، والماجستير بالبحث يعتمد على رسالة مع مشرف. والبعثة تغطي الماجستير لمدة تصل إلى سنتين.",
        what: ["حدد النوع الذي يناسب أهدافك.", "اختر تخصصك. تذكر الأسئلة الشائعة للوزارة أنه لا يلزم أن يطابق تخصص البكالوريوس.", "اقرأ قواعد الماجستير في هذه الصفحة."] },
      links: ["postgrad", "faq"] },

    uniCheckPg: {
      en: { t: "Check the university is on your track's list",
        why: "Al-Ruwwad needs a top 30 university, and Imdad a top 200 university in a field the job market needs. The list is different for each field.",
        what: ["Open the 2026–2027 list and find your field.", "Check that {uni} is listed for that field.", "We could not find any Australian university on the Al-Ruwwad list in the 2026–2027 guide, so check Imdad too."] },
      ar: { t: "تحقق أن الجامعة ضمن قائمة مسارك",
        why: "مسار الرواد يشترط جامعة من أفضل 30، ومسار إمداد جامعة من أفضل 200 في تخصص يحتاجه سوق العمل. والقائمة تختلف من تخصص لآخر.",
        what: ["افتح قوائم 2026–2027 وابحث عن تخصصك.", "تأكد أن {uni} مدرجة في هذا التخصص.", "لم نجد أي جامعة أسترالية في قائمة مسار الرواد في دليل 2026–2027، لذلك تحقق من مسار إمداد أيضًا."] },
      nonAu: {
        en: { t: "Check the university is on your track's list",
          why: "Al-Ruwwad needs a top 30 university, and Imdad a top 200 university in a field the job market needs. The list is different for each field.",
          what: ["Open the 2026–2027 list and find your field.", "Check that {uni} is listed for that field.", "If it is on the Al-Ruwwad list, check whether you meet that track's rules. If not, check Imdad."] },
        ar: { t: "تحقق أن الجامعة ضمن قائمة مسارك",
          why: "مسار الرواد يشترط جامعة من أفضل 30، ومسار إمداد جامعة من أفضل 200 في تخصص يحتاجه سوق العمل. والقائمة تختلف من تخصص لآخر.",
          what: ["افتح قوائم 2026–2027 وابحث عن تخصصك.", "تأكد أن {uni} مدرجة في هذا التخصص.", "إن كانت ضمن قائمة الرواد فتحقق من شروط هذا المسار، وإلا فتحقق من مسار إمداد."] }
      },
      links: ["lists", "ruSearch"] },

    englishPg: {
      en: { t: "Reach your English score",
        why: "The Ministry needs an unconditional offer, so meet the English requirement before you apply for the scholarship.",
        what: ["Check the English score for your program on {uni}'s website. Postgraduate programs often ask for more than undergraduate ones.", "Book IELTS, or another test {uni} accepts, early enough to retake it.", "SACM does not pay for English courses."] },
      ar: { t: "حقق درجة اللغة الإنجليزية المطلوبة",
        why: "تشترط الوزارة قبولًا غير مشروط، لذلك حقق شرط اللغة قبل التقديم على البعثة.",
        what: ["تحقق من درجة اللغة المطلوبة لبرنامجك في موقع {uni}. برامج الدراسات العليا تطلب غالبًا درجة أعلى من البكالوريوس.", "احجز اختبار IELTS أو اختبارًا آخر تقبله {uni} مبكرًا ليبقى لديك وقت لإعادته.", "الملحقية لا تبتعث على دورات اللغة."] },
      links: ["ielts", "uniWeb"] },

    premaster: { optional: true,
      en: { t: "Pre-master's, if you are close but not there yet",
        why: "A pre-master's can help if you are close to the entry requirements, but it is not on the list of programs SACM sponsors.",
        what: ["Only take it if you need it to reach the master's requirements.", "Expect to pay for it yourself unless SACM confirms otherwise in writing.", "Check that finishing it gives you an unconditional master's offer. If you don't need it, skip this step."] },
      ar: { t: "ما قبل الماجستير، إذا كنت قريبًا من الشروط",
        why: "برنامج ما قبل الماجستير يساعدك إذا كنت قريبًا من شروط القبول، لكنه ليس ضمن البرامج التي تبتعث عليها الملحقية.",
        what: ["لا تلتحق به إلا إذا احتجته لتحقيق شروط الماجستير.", "توقع أن تدفع تكلفته بنفسك ما لم تؤكد الملحقية غير ذلك كتابيًا.", "تأكد أن إكماله يمنحك قبولًا غير مشروط في الماجستير. وإن لم تحتجه فتخطَّ هذه الخطوة."] },
      links: ["postgrad", "college"] },

    docs: {
      en: { t: "Prepare your documents",
        why: "Universities and the Ministry ask for certified documents, and equivalency for qualifications from outside Saudi Arabia can take time.",
        what: ["Get certified copies of your bachelor's certificate and transcripts.", "Start equivalency early if any qualification is from outside Saudi Arabia.", "Check your national ID (chip card), a passport valid for at least a year, and your registered national address."] },
      ar: { t: "جهّز مستنداتك",
        why: "تطلب الجامعات والوزارة مستندات مصدقة، ومعادلة المؤهلات من خارج السعودية قد تستغرق وقتًا.",
        what: ["احصل على نسخ مصدقة من وثيقة البكالوريوس والسجل الأكاديمي.", "ابدأ المعادلة مبكرًا إذا كان لديك مؤهل من خارج السعودية.", "تأكد من الهوية الوطنية (ذات الشريحة)، وجواز سفر ساري لمدة سنة على الأقل، والعنوان الوطني المسجل."] },
      links: ["sacm"] },

    researchArea: {
      en: { t: "Choose your research area",
        why: "PhDs are sponsored through the Research & Development track, which is for national research priority areas.",
        what: ["Read the Research & Development track page.", "Choose a topic that fits one of the priority areas.", "Note a few recent papers you would like to build on."] },
      ar: { t: "اختر مجال بحثك",
        why: "الابتعاث للدكتوراه يكون عبر مسار البحث والتطوير، وهو مخصص لمجالات البحث ذات الأولوية الوطنية.",
        what: ["اقرأ صفحة مسار البحث والتطوير.", "اختر موضوعًا يناسب أحد المجالات ذات الأولوية.", "دوّن بعض الأبحاث الحديثة التي تود البناء عليها."] },
      links: ["rd", "postgrad"] },

    supervisor: {
      en: { t: "Find a supervisor and write a proposal",
        why: "Australian PhDs are research degrees. Most universities expect a supervisor to agree to work with you before you apply.",
        what: ["Look for academics at {uni} who work in your area.", "Write a short research proposal, about 2 pages.", "Email a few of them with your proposal and CV, and ask whether they can supervise you."] },
      ar: { t: "ابحث عن مشرف واكتب مقترحك البحثي",
        why: "الدكتوراه في أستراليا درجة بحثية، وأغلب الجامعات تتوقع موافقة مشرف على العمل معك قبل التقديم.",
        what: ["ابحث عن أكاديميين في {uni} يعملون في مجالك.", "اكتب مقترحًا بحثيًا قصيرًا في صفحتين تقريبًا.", "راسل عددًا منهم بمقترحك وسيرتك الذاتية، واسألهم إن كانوا يستطيعون الإشراف عليك."] },
      nonAu: {
        en: { t: "Find a supervisor and write a proposal",
          why: "PhDs in this country are research degrees. Most universities expect a supervisor to agree to work with you before you apply.",
          what: ["Look for academics at {uni} who work in your area.", "Write a short research proposal, about 2 pages.", "Email a few of them with your proposal and CV, and ask whether they can supervise you."] },
        ar: { t: "ابحث عن مشرف واكتب مقترحك البحثي",
          why: "الدكتوراه في هذه الدولة درجة بحثية، وأغلب الجامعات تتوقع موافقة مشرف على العمل معك قبل التقديم.",
          what: ["ابحث عن أكاديميين في {uni} يعملون في مجالك.", "اكتب مقترحًا بحثيًا قصيرًا في صفحتين تقريبًا.", "راسل عددًا منهم بمقترحك وسيرتك الذاتية، واسألهم إن كانوا يستطيعون الإشراف عليك."] }
      },
      program: {
        en: { t: "Find professors and apply to a PhD program",
          why: "Here you apply to a PhD program, which usually starts with coursework before your research. Contacting professors first still helps your application.",
          what: ["Look for professors at {uni} who work in your area.", "Email a few of them with a short note about your interests and your CV.", "Check the program's deadline. In the USA and Canada it is often in December or January, and in Singapore it depends on the intake."] },
        ar: { t: "ابحث عن أساتذة وقدّم على برنامج الدكتوراه",
          why: "هنا تقدّم على برنامج دكتوراه يبدأ عادةً بمواد دراسية قبل البحث. والتواصل مع الأساتذة مسبقًا يقوّي طلبك.",
          what: ["ابحث عن أساتذة في {uni} يعملون في مجالك.", "راسل عددًا منهم برسالة قصيرة عن اهتماماتك وسيرتك الذاتية.", "تحقق من موعد التقديم على البرنامج. ففي أمريكا وكندا يكون غالبًا في ديسمبر أو يناير، وفي سنغافورة يعتمد على موعد بدء الدراسة."] }
      },
      links: ["uniWeb", "postgrad"] },

    uniCheckPhd: {
      en: { t: "Check the university's ranking in your field",
        why: "The Research & Development track needs admission from a top 200 university on the program's list for your field.",
        what: ["Open the 2026–2027 list and find your field.", "Check that {uni} is listed for that field.", "Confirm with SACM if you are unsure."] },
      ar: { t: "تحقق من تصنيف الجامعة في تخصصك",
        why: "مسار البحث والتطوير يشترط قبولًا من جامعة ضمن أفضل 200 في قائمة البرنامج لتخصصك.",
        what: ["افتح قوائم 2026–2027 وابحث عن تخصصك.", "تأكد أن {uni} مدرجة في هذا التخصص.", "إذا لم تكن متأكدًا فاسأل الملحقية."] },
      links: ["lists", "ruSearch"] },

    offer: {
      en: { t: "Apply to {uni} and get an unconditional offer",
        why: "The Ministry asks for an unconditional offer before it considers your scholarship application.",
        what: ["Apply through {uni}'s international admissions, or an agent the university approves.", "Send your certified transcripts and English result.", "If your offer is conditional, meet the conditions and ask for the unconditional offer. Save it as a PDF."] },
      ar: { t: "قدّم على {uni} واحصل على قبول غير مشروط",
        why: "تشترط الوزارة قبولًا غير مشروط قبل النظر في طلب الابتعاث.",
        what: ["قدّم عبر قسم القبول الدولي في {uni}، أو عن طريق وكيل معتمد لدى الجامعة.", "أرسل السجل الأكاديمي المصدق ونتيجة اختبار اللغة.", "إذا كان القبول مشروطًا، فحقق الشروط واطلب القبول غير المشروط. واحفظه بصيغة PDF."] },
      links: ["uniWeb", "sacm"] },

    qubool: {
      en: { t: "Apply for the scholarship on Qubool",
        why: "Every new applicant, on every track, applies through Qubool. Selection is based on merit and available places.",
        what: ["Sign in to Qubool with Nafath and choose {track}.", "Upload your offer, certified transcripts and English result.", "In 2026, applications ran from 29 January to 7 May. Follow Qubool and the Ministry's accounts for the next window."] },
      ar: { t: "قدّم على البعثة عبر منصة قبول",
        why: "كل المتقدمين الجدد، في كل المسارات، يقدّمون عبر منصة قبول. والمفاضلة حسب الجدارة والمقاعد المتاحة.",
        what: ["سجّل الدخول إلى منصة قبول عبر نفاذ واختر {track}.", "ارفع خطاب القبول والسجل الأكاديمي المصدق ونتيجة اختبار اللغة.", "في 2026 كان التقديم من 29 يناير إلى 7 مايو. تابع منصة قبول وحسابات الوزارة لمعرفة الفترة القادمة."] },
      links: ["qubool", "sacm"] },

    safeer: {
      en: { t: "Get your guarantee letter, accept your offer and receive your CoE",
        why: "Your university needs SACM's financial guarantee letter before it issues your Confirmation of Enrolment (CoE), and you need the CoE for your visa.",
        what: ["After you are nominated, request the financial guarantee letter on Safeer.", "Upload it to {school}'s portal and accept your offer.", "Save your CoE as a PDF. You will use it for the visa."] },
      ar: { t: "احصل على خطاب الضمان واقبل العرض واستلم CoE",
        why: "تحتاج جامعتك إلى خطاب الضمان المالي من الملحقية قبل إصدار خطاب تأكيد التسجيل (CoE)، وتحتاج خطاب CoE لطلب التأشيرة.",
        what: ["بعد ترشيحك، اطلب خطاب الضمان المالي عبر منصة سفير.", "ارفعه على بوابة {school} واقبل العرض.", "احفظ خطاب CoE بصيغة PDF، فستحتاجه للتأشيرة."] },
      links: ["safeer", "before"] },

    visa: {
      en: { t: "Get health cover and your student visa",
        why: "Overseas Student Health Cover (OSHC) is a condition of the student visa, and you apply for the visa online with your CoE.",
        what: ["Arrange OSHC for the length of your visa. Your university can usually help, and SACM usually covers it.", "Apply online for the Student visa (subclass 500) with your CoE.", "Do any health check or biometrics the department asks for, then save your visa grant."] },
      ar: { t: "رتّب التأمين الصحي وتأشيرة الطالب",
        why: "التأمين الصحي للطلاب الدوليين (OSHC) شرط لتأشيرة الطالب، وتقدّم على التأشيرة إلكترونيًا بخطاب CoE.",
        what: ["رتّب التأمين الصحي OSHC لكامل مدة التأشيرة. تساعدك جامعتك عادةً، والملحقية تغطيه عادةً.", "قدّم إلكترونيًا على تأشيرة الطالب (الفئة 500) بخطاب CoE.", "أكمل الفحص الطبي أو البصمات إذا طُلبت منك، ثم احفظ قرار التأشيرة."] },
      extra: {
        master: { en: "Bringing family? Add them to your visa application and tell SACM.", ar: "هل ستُحضر عائلتك؟ أضفهم إلى طلب التأشيرة وأبلغ الملحقية." },
        phd: { en: "Australian PhDs often take 3 to 4 years, but the scholarship covers up to 3. Ask SACM early how extensions work.", ar: "الدكتوراه في أستراليا تستغرق غالبًا 3 إلى 4 سنوات، والبعثة تغطي حتى 3 سنوات. اسأل الملحقية مبكرًا عن التمديد." }
      },
      links: ["visa", "oshc", "before"] },

    housing: {
      en: { t: "Book your first place to stay",
        why: "Finding a long-term room is much easier once you are in {city} and can see places in person.",
        what: ["Book about 2 weeks of short-term housing near campus, such as an Airbnb.", "When you arrive, look for rooms on Flatmates, or leases on Domain and realestate.com.au.", "If you rent with a lease, your bond is lodged with {bond}."] },
      ar: { t: "احجز أول مكان تسكن فيه",
        why: "البحث عن سكن طويل أسهل بكثير بعد وصولك إلى {city} ورؤية الأماكن بنفسك.",
        what: ["احجز سكنًا مؤقتًا لمدة أسبوعين تقريبًا قرب الجامعة، مثل Airbnb.", "بعد وصولك ابحث عن غرفة في Flatmates، أو عن عقد إيجار في Domain وrealestate.com.au.", "إذا استأجرت بعقد، يُودَع مبلغ التأمين لدى {bond}."] },
      extra: {
        master: { en: "Coming with family? You will usually need a whole apartment.", ar: "قادم مع عائلتك؟ ستحتاج غالبًا إلى شقة كاملة." },
        phd: { en: "Coming with family? You will usually need a whole apartment.", ar: "قادم مع عائلتك؟ ستحتاج غالبًا إلى شقة كاملة." }
      },
      links: ["housing", "bond"] },

    arrive: {
      en: { t: "Arrive and settle in",
        why: "Your first two weeks set up everything else: your phone, bank, transport and your SACM details.",
        what: ["Get a SIM card and open a bank account.", "Get your {transport} and update your address with your university.", "Complete your SACM arrival steps on Safeer and go to orientation."] },
      ar: { t: "وصلت، استقر",
        why: "أول أسبوعين يجهزان كل ما بعدهما: الجوال والبنك والمواصلات وبياناتك لدى الملحقية.",
        what: ["احصل على شريحة جوال وافتح حسابًا بنكيًا.", "احصل على {transport} وحدّث عنوانك لدى جامعتك.", "أكمل خطوات الوصول لدى الملحقية عبر منصة سفير واحضر الأسبوع التعريفي."] },
      links: ["arrival", "transport"] },

    progressF: {
      en: { t: "Progress into your degree",
        why: "To move into your degree, you must meet the progression requirements, and SACM needs a new guarantee letter for each change.",
        what: ["Keep your grades above the progression mark and upload your results to Safeer each term.", "Request your new guarantee letter early, so your enrolment isn't delayed.", "Ask about your credit transfer early, so you can plan your first term at university."] },
      ar: { t: "انتقل إلى البكالوريوس",
        why: "للانتقال إلى البكالوريوس يجب أن تحقق شروط الانتقال، والملحقية تحتاج إلى خطاب ضمان جديد عند كل انتقال.",
        what: ["حافظ على درجاتك فوق الحد المطلوب للانتقال، وارفع نتائجك على منصة سفير بعد كل فصل.", "اطلب خطاب الضمان الجديد مبكرًا حتى لا يتأخر تسجيلك.", "اسأل عن معادلة الساعات مبكرًا لتخطط لفصلك الأول في الجامعة."] },
      links: ["sacm", "lessons"] }
  };

  var PATHS = {
    foundation: ["fieldRoute", "englishF", "rulesF", "offerF", "qubool", "safeer", "visa", "housing", "arrive", "progressF"],
    bachelor: ["fieldUni", "englishB", "sat", "offer", "qubool", "safeer", "visa", "housing", "arrive"],
    master: ["courseType", "uniCheckPg", "englishPg", "premaster", "docs", "offer", "qubool", "safeer", "visa", "housing", "arrive"],
    phd: ["researchArea", "supervisor", "englishPg", "uniCheckPhd", "offer", "qubool", "safeer", "visa", "housing", "arrive"]
  };

  var TRACK = {
    foundation: { en: "the track that fits your field", ar: "المسار المناسب لتخصصك" },
    bachelor: { en: "your track (Al-Ruwwad or Imdad)", ar: "مسارك (الرواد أو إمداد)" },
    master: { en: "your track (Al-Ruwwad or Imdad)", ar: "مسارك (الرواد أو إمداد)" },
    phd: { en: "the Research & Development track", ar: "مسار البحث والتطوير" }
  };

  // ---------- interface text ----------
  var T = {
    en: {
      bTitle: "Feeling lost? Start your step-by-step journey.",
      bSub: "Studying abroad can feel like one big leap. Masarok turns it into small steps, so you only focus on the next one.",
      bCta: "Guide me step by step",
      bBackTitle: "Welcome back! You're on step {n} of {total}.",
      bBackSub: "Next: {title}",
      bBackCta: "Continue your journey",
      bDoneTitle: "You've finished your journey.",
      bDoneSub: "Every step on your path is done. Welcome to Australia.",
      bDoneCta: "See your journey",
      fab: "Guide me step by step", fabShort: "Guide me", fabStep: "Step {n} of {total}",
      eyebrow: "Your step-by-step journey", close: "Close",
      q1: "Where are you in your journey?", q1sub: "There's no wrong answer. It only decides where we start.",
      stages: { dream: ["Just dreaming", "I'm thinking about studying abroad"], ready: ["Ready to start", "I've decided and want to begin"], applying: ["Already applying", "I've already done some of the steps"] },
      q2: "What will you study?", q2sub: "Your steps depend on your degree level.",
      levels: { foundation: ["Foundation or diploma", "A pathway year before your bachelor's"], bachelor: ["Bachelor's degree", "Direct entry after high school"], master: ["Master's or pre-master's", "Coursework or research master's"], phd: ["PhD", "A research degree with a supervisor"] },
      q3: "What have you done already?", q3sub: "Tick every step you've finished. Your journey will open at your next step.", q3btn: "Show my next step",
      back: "Back",
      pathTitle: { foundation: "Your path to Foundation or a diploma", bachelor: "Your path to a bachelor's degree", master: "Your path to a master's degree", phd: "Your path to a PhD" },
      meta: "Personalised for {uni} · {city}", metaAll: "For any university", changeUni: "Change university", changeLevel: "Change degree",
      progress: "{d} of {total} done",
      welcome: "Welcome back, you're on step {n}.",
      dreamNote: "No rush. Read step 1 and come back whenever you're ready.",
      nextStep: "Your next step", stepN: "Step {n} of {total}",
      why: "Why it matters", what: "What to do", links: "Helpful links",
      markDone: "Mark as done", skip: "Skip, not for me", undo: "Mark as not done",
      done: "Done", skipped: "Skipped", optional: "Optional", lockedLbl: "Locked",
      locked: "Finish step {n} first to unlock this one.",
      unlocked: "Step {n} is now open.",
      path: "The whole path",
      finishedT: "You reached the top!",
      finishedB: "You've done every step on your path. Welcome to Australia, and good luck with your studies.",
      startOver: "Start over", startOverSure: "Tap again to clear your progress",
      saved: "Your progress is saved on this device only.",
      stepLabel: "Step {n}: {title}. {state}"
    },
    ar: {
      bTitle: "تشعر بالضياع؟ ابدأ رحلتك خطوة بخطوة.",
      bSub: "الدراسة في الخارج قد تبدو قفزة كبيرة واحدة. مسارُك يحولها إلى خطوات صغيرة، فتركز على الخطوة التالية فقط.",
      bCta: "أرشدني خطوة بخطوة",
      bBackTitle: "أهلًا بعودتك! أنت في الخطوة {n} من {total}.",
      bBackSub: "التالي: {title}",
      bBackCta: "أكمل رحلتك",
      bDoneTitle: "أكملت رحلتك.",
      bDoneSub: "أنجزت كل خطوات مسارك. أهلًا بك في أستراليا.",
      bDoneCta: "اعرض رحلتك",
      fab: "أرشدني خطوة بخطوة", fabShort: "أرشدني", fabStep: "الخطوة {n} من {total}",
      eyebrow: "رحلتك خطوة بخطوة", close: "إغلاق",
      q1: "أين أنت في رحلتك؟", q1sub: "لا توجد إجابة خاطئة، فهي تحدد من أين نبدأ فقط.",
      stages: { dream: ["أحلم بالفكرة", "أفكر في الدراسة في الخارج"], ready: ["مستعد للبدء", "قررت وأريد أن أبدأ"], applying: ["بدأت التقديم", "أنجزت بعض الخطوات بالفعل"] },
      q2: "ماذا ستدرس؟", q2sub: "خطواتك تعتمد على مرحلتك الدراسية.",
      levels: { foundation: ["الفاونديشن أو الدبلوم", "سنة مسار قبل البكالوريوس"], bachelor: ["البكالوريوس", "قبول مباشر بعد الثانوية"], master: ["الماجستير أو ما قبله", "ماجستير بالمقررات أو بالبحث"], phd: ["الدكتوراه", "درجة بحثية مع مشرف"] },
      q3: "ما الذي أنجزته؟", q3sub: "اختر كل خطوة أنهيتها، وستُفتح رحلتك عند خطوتك التالية.", q3btn: "اعرض خطوتي التالية",
      back: "رجوع",
      pathTitle: { foundation: "طريقك إلى الفاونديشن أو الدبلوم", bachelor: "طريقك إلى البكالوريوس", master: "طريقك إلى الماجستير", phd: "طريقك إلى الدكتوراه" },
      meta: "مخصص لـ {uni} · {city}", metaAll: "لأي جامعة", changeUni: "غيّر الجامعة", changeLevel: "غيّر المرحلة",
      progress: "أنجزت {d} من {total}",
      welcome: "أهلًا بعودتك، أنت في الخطوة {n}.",
      dreamNote: "لا تستعجل. اقرأ الخطوة الأولى وعد متى ما كنت مستعدًا.",
      nextStep: "خطوتك التالية", stepN: "الخطوة {n} من {total}",
      why: "لماذا هي مهمة", what: "ماذا تفعل", links: "روابط مفيدة",
      markDone: "تم إنجازها", skip: "تخطَّ، لا تنطبق علي", undo: "إلغاء الإنجاز",
      done: "أُنجزت", skipped: "تم تخطيها", optional: "اختيارية", lockedLbl: "مقفلة",
      locked: "أنهِ الخطوة {n} أولًا لفتح هذه الخطوة.",
      unlocked: "فُتحت الخطوة {n}.",
      path: "الطريق كاملًا",
      finishedT: "وصلت إلى القمة!",
      finishedB: "أنجزت كل خطوات مسارك. أهلًا بك في أستراليا، وبالتوفيق في دراستك.",
      startOver: "ابدأ من جديد", startOverSure: "اضغط مرة أخرى لمسح تقدمك",
      saved: "تقدمك محفوظ على هذا الجهاز فقط.",
      stepLabel: "الخطوة {n}: {title}. {state}"
    }
  };
  var t = T[lang];

  // ---------- helpers ----------
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c]; }); }
  function fmt(s, o) { return String(s).replace(/\{(\w+)\}/g, function (m, k) { return o.hasOwnProperty(k) ? o[k] : m; }); }
  function num(n) { return String(n); } // the Arabic page uses Western digits throughout

  function load() {
    var s = null;
    try { s = JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) {}
    if (!s || typeof s !== "object") s = {};
    if (!s.done || typeof s.done !== "object") s.done = {};
    if (LEVELS.indexOf(s.level) < 0) s.level = null;
    return s;
  }
  var st = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} }

  function pick() {
    var M = window.Masarok;
    var v = M && M.values ? M.values() : { v: {}, level: null };
    return v;
  }
  function pickerLevel() { var l = pick().level; return LEVELS.indexOf(l) > -1 ? l : null; }
  function offersF() { var M = window.MasarokCountry, cc = pick().cc; return !M || !M.offersF || M.offersF(cc); }
  function level() { var l = st.level || pickerLevel(); return l === "foundation" && !offersF() ? "bachelor" : l; }

  function vars(lv) {
    var r = pick(), v = r.v || {};
    var uni = v.short || (lang === "ar" ? "جامعتك" : "your university");
    return {
      uni: esc(uni), college: esc(v.college || ""), city: esc(v.city || ""), transport: esc(v.transport || ""), bond: esc(v.bond || ""),
      school: esc(lv === "foundation" ? (v.college || uni) : uni),
      track: TRACK[lv] ? TRACK[lv][lang] : "", _v: v
    };
  }

  function stepsFor(lv) { return PATHS[lv] || []; }
  function doneMap(lv) { if (!st.done[lv]) st.done[lv] = {}; return st.done[lv]; }
  function isDone(lv, id) { var d = doneMap(lv)[id]; return d === "done" || d === "skip"; }
  function currentIndex(lv) {
    var ids = stepsFor(lv);
    for (var i = 0; i < ids.length; i++) if (!isDone(lv, ids[i])) return i;
    return ids.length; // finished
  }
  function countDone(lv) { var n = 0; stepsFor(lv).forEach(function (id) { if (isDone(lv, id)) n++; }); return n; }
  function MCj(id) { var M = window.MasarokCountry, cc = pick().cc; return M && cc && cc !== "au" ? M.journey(cc, id) : null; }
  function content(id) {
    var ov = MCj(id); if (ov) return ov[lang];
    var cc = pick().cc, s = S[id];
    if (cc && cc !== "au") {
      if (s.program && (cc === "us" || cc === "ca" || cc === "sg")) return s.program[lang];
      if (s.nonAu) return s.nonAu[lang];
      if (s.byCc) {
        var b = s.byCc[cc] || s.byCc.other, base = s[lang];
        return { t: base.t, why: base.why, what: base.what.slice(0, -1).concat(b.last[lang === "ar" ? 1 : 0]) };
      }
    }
    return s[lang];
  }
  // "Welcome to Australia" becomes the chosen country
  function welcome(str) {
    var M = window.MasarokCountry, cc = pick().cc, d = M && cc && cc !== "au" && M.data[cc];
    if (!d) return str;
    return lang === "ar" ? str.replace("في أستراليا", d.inPlace[1]) : str.replace("to Australia", "to " + d.name[0]);
  }
  function title(id, V) { return fmt(content(id).t, V); }

  // ---------- the character (flat SVG, drawn in the site's style) ----------
  function figure(cls) {
    var skin = "#C08A5A", thobe = "#F6F3EC", edge = "#D9D2C2";
    function arm(side) {
      var x0 = side === "l" ? 19 : 45, x1 = side === "l" ? 16 : 48;
      return '<g class="jr-arm jr-arm-' + side + '" style="transform-origin:' + x0 + 'px 42px">' +
        '<line x1="' + x0 + '" y1="42" x2="' + x1 + '" y2="70" stroke="' + edge + '" stroke-width="8.6" stroke-linecap="round"/>' +
        '<line x1="' + x0 + '" y1="42" x2="' + x1 + '" y2="70" stroke="' + thobe + '" stroke-width="7" stroke-linecap="round"/>' +
        '<circle cx="' + x1 + '" cy="72.5" r="3.6" fill="' + skin + '"/></g>';
    }
    return '<svg class="jr-fig ' + (cls || "") + '" viewBox="0 0 64 112" aria-hidden="true" focusable="false">' +
      // backpack
      '<rect x="43" y="44" width="11" height="28" rx="4" fill="#173252"/>' +
      '<line x1="51" y1="48" x2="51" y2="60" stroke="#E2B66C" stroke-width="1.6" stroke-linecap="round"/><circle cx="51" cy="61.5" r="1.6" fill="#E2B66C"/>' +
      // feet
      '<g class="jr-feet"><ellipse class="jr-foot-l" cx="25" cy="104" rx="5.5" ry="2.8" fill="#5A3C1E"/><ellipse class="jr-foot-r" cx="39" cy="104" rx="5.5" ry="2.8" fill="#5A3C1E"/></g>' +
      // thobe
      '<path d="M24 35 Q32 33 40 35 L46 40 L50.5 102 L13.5 102 L18 40 Z" fill="' + thobe + '" stroke="' + edge + '" stroke-width=".9"/>' +
      '<line x1="32" y1="37" x2="32" y2="52" stroke="' + edge + '" stroke-width="1"/><circle cx="32" cy="42" r=".9" fill="' + edge + '"/><circle cx="32" cy="47" r=".9" fill="' + edge + '"/>' +
      '<line x1="21" y1="40" x2="23" y2="58" stroke="#173252" stroke-width="2.4" stroke-linecap="round"/><line x1="43" y1="40" x2="41" y2="58" stroke="#173252" stroke-width="2.4" stroke-linecap="round"/>' +
      arm("l") + arm("r") +
      // head: shemagh behind, face, shemagh top, agal
      '<path d="M18.5 16 Q32 2 45.5 16 L48.5 41 Q40.5 34.5 32 34.5 Q23.5 34.5 15.5 41 Z" fill="#C8102E"/>' +
      '<path d="M17.5 24 L16 39 M46.5 24 L48 39 M20 18 L19 30 M44 18 L45 30" stroke="#fff" stroke-width=".9" stroke-dasharray="1.6 1.8" opacity=".85"/>' +
      '<ellipse cx="32" cy="22" rx="8.6" ry="9.6" fill="' + skin + '"/>' +
      '<path d="M21 18.5 Q32 7 43 18.5 Q32 13.5 21 18.5 Z" fill="#C8102E"/>' +
      '<path d="M22 17 Q32 9 42 17" fill="none" stroke="#fff" stroke-width=".9" stroke-dasharray="1.6 1.8" opacity=".85"/>' +
      '<ellipse cx="32" cy="12.6" rx="11.2" ry="2.6" fill="none" stroke="#14140F" stroke-width="2.2"/>' +
      '<circle cx="28.6" cy="22.6" r="1.25" fill="#14140F"/><circle cx="35.4" cy="22.6" r="1.25" fill="#14140F"/>' +
      '<path d="M28.6 26.8 Q32 29.6 35.4 26.8" fill="none" stroke="#14140F" stroke-width="1.25" stroke-linecap="round"/>' +
      '<circle cx="26.4" cy="26" r="1.6" fill="#E08A6E" opacity=".45"/><circle cx="37.6" cy="26" r="1.6" fill="#E08A6E" opacity=".45"/>' +
      '</svg>';
  }
  function headIcon() {
    return '<svg class="jr-head" viewBox="13 3 38 38" aria-hidden="true" focusable="false">' +
      '<path d="M18.5 16 Q32 2 45.5 16 L48.5 41 Q40.5 34.5 32 34.5 Q23.5 34.5 15.5 41 Z" fill="#C8102E"/>' +
      '<ellipse cx="32" cy="22" rx="8.6" ry="9.6" fill="#C08A5A"/>' +
      '<path d="M21 18.5 Q32 7 43 18.5 Q32 13.5 21 18.5 Z" fill="#C8102E"/>' +
      '<ellipse cx="32" cy="12.6" rx="11.2" ry="2.6" fill="none" stroke="#14140F" stroke-width="2.2"/>' +
      '<circle cx="28.6" cy="22.6" r="1.25" fill="#14140F"/><circle cx="35.4" cy="22.6" r="1.25" fill="#14140F"/>' +
      '<path d="M28.6 26.8 Q32 29.6 35.4 26.8" fill="none" stroke="#14140F" stroke-width="1.25" stroke-linecap="round"/></svg>';
  }
  function ladder() {
    var rungs = "";
    for (var y = 16; y < 300; y += 24) rungs += '<line x1="6" y1="' + y + '" x2="44" y2="' + y + '"/>';
    return '<svg class="jr-ladder" viewBox="0 0 50 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">' +
      '<g stroke="#B98A45" stroke-linecap="round"><line x1="6" y1="-10" x2="6" y2="300" stroke-width="4.5"/><line x1="44" y1="-10" x2="44" y2="300" stroke-width="4.5"/>' +
      '<g stroke-width="3.5">' + rungs + '</g></g></svg>';
  }
  var ICON = {
    lock: '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="3" y="7" width="10" height="7" rx="1.5" fill="currentColor"/><path d="M5 7V5a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
    tick: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    skip: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M9 4.5L12.5 8 9 11.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    arrow: '<svg viewBox="0 0 16 16" aria-hidden="true" class="jr-arrow"><path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  // ---------- banner under the hero ----------
  var banner, fab, panel, live;

  function bannerText() {
    var lv = level();
    if (st.started && lv) {
      var ids = stepsFor(lv), i = currentIndex(lv), V = vars(lv);
      if (i >= ids.length) return { h: t.bDoneTitle, p: welcome(t.bDoneSub), c: t.bDoneCta };
      return { h: fmt(t.bBackTitle, { n: num(i + 1), total: num(ids.length) }), p: fmt(t.bBackSub, { title: title(ids[i], V) }), c: t.bBackCta };
    }
    return { h: t.bTitle, p: t.bSub, c: t.bCta };
  }

  function buildBanner() {
    var hero = document.querySelector(".hero");
    if (!hero) return;
    banner = document.createElement("section");
    banner.className = "jr-banner";
    banner.setAttribute("aria-labelledby", "jr-banner-h");
    banner.innerHTML =
      '<div class="jr-banner-in">' +
        '<div class="jr-stage" aria-hidden="true">' + ladder() + '<div class="jr-actor">' + figure() + '</div></div>' +
        '<div class="jr-copy"><h2 id="jr-banner-h"></h2><p></p></div>' +
        '<button type="button" class="btn btn-primary jr-cta" data-journey-open><span></span>' + ICON.arrow + '</button>' +
      '</div>';
    hero.parentNode.insertBefore(banner, hero.nextSibling);
    updateBanner();
  }
  function updateBanner() {
    if (!banner) return;
    var b = bannerText();
    banner.querySelector("h2").textContent = b.h;
    banner.querySelector(".jr-copy p").textContent = b.p;
    banner.querySelector(".jr-cta span").textContent = b.c;
  }

  // climb down the ladder, hop off, wave, then point at the button
  var played = false;
  function playBanner() {
    if (played || !banner) return;
    played = true;
    var actor = banner.querySelector(".jr-actor"), fig = actor.querySelector(".jr-fig");
    var hop = parseFloat(getComputedStyle(actor).getPropertyValue("--jr-hop")) || 64;
    var HOP = "translate(" + hop + "px,0)";
    if (reduced() || !actor.animate) { actor.classList.add("is-landed"); fig.classList.add("is-pointing"); banner.classList.add("is-ready"); return; }
    var stage = banner.querySelector(".jr-stage");
    var drop = Math.max(120, stage.getBoundingClientRect().height + 20);
    var rungs = 6, frames = [];
    for (var i = 0; i <= rungs; i++) frames.push({ transform: "translate(0," + (-drop + drop * i / rungs).toFixed(1) + "px)", offset: i / rungs, easing: "ease-in-out" });
    fig.classList.add("is-climbing");
    var a1 = actor.animate(frames, { duration: 2300, fill: "forwards" });
    a1.onfinish = function () {
      fig.classList.remove("is-climbing");
      var a2 = actor.animate([
        { transform: "translate(0,0)" },
        { transform: "translate(" + hop / 2 + "px,-18px)", offset: .5 },
        { transform: HOP }
      ], { duration: 520, easing: "ease-out", fill: "forwards" });
      a2.onfinish = function () {
        actor.classList.add("is-landed");
        a1.cancel(); a2.cancel();
        fig.classList.add("is-waving");
        banner.classList.add("is-ready");
        setTimeout(function () { fig.classList.remove("is-waving"); fig.classList.add("is-pointing"); }, 2600);
      };
    };
  }

  // ---------- floating corner button ----------
  function buildFab() {
    fab = document.createElement("button");
    fab.type = "button";
    fab.className = "jr-fab";
    fab.setAttribute("data-journey-open", "");
    fab.innerHTML = '<span class="jr-fab-face">' + headIcon() + '</span><span class="jr-fab-txt"><b class="jr-fab-long"></b><b class="jr-fab-short"></b><small></small></span>';
    document.body.appendChild(fab);
    updateFab();
  }
  function updateFab() {
    if (!fab) return;
    var lv = level(), sub = "";
    if (st.started && lv) {
      var ids = stepsFor(lv), i = currentIndex(lv);
      sub = i >= ids.length ? t.done : fmt(t.fabStep, { n: num(i + 1), total: num(ids.length) });
    }
    fab.querySelector(".jr-fab-long").textContent = t.fab;
    fab.querySelector(".jr-fab-short").textContent = t.fabShort;
    var sm = fab.querySelector("small");
    sm.textContent = sub; sm.hidden = !sub;
    fab.setAttribute("aria-label", t.fab + (sub ? " · " + sub : ""));
  }
  function watchFab() {
    if (!fab || !banner) return;
    if (!("IntersectionObserver" in window)) { fab.classList.add("is-shown"); return; }
    var seen = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        seen[e.target === banner ? "b" : "h"] = e.isIntersecting;
        if (e.target === banner && e.isIntersecting) playBanner();
      });
      fab.classList.toggle("is-shown", !seen.b && !seen.h);
    }, { threshold: 0.25 });
    io.observe(banner);
    var hero = document.querySelector(".hero");
    if (hero) io.observe(hero);
  }

  // ---------- the journey panel ----------
  var lastFocus = null, screen = "main", tmp = {}, viewing = null, resetArm = false;

  function buildPanel() {
    panel = document.createElement("div");
    panel.className = "jr-panel";
    panel.hidden = true;
    panel.innerHTML =
      '<div class="jr-backdrop" data-journey-close></div>' +
      '<div class="jr-sheet" role="dialog" aria-modal="true" aria-labelledby="jr-title">' +
        '<div class="sadu" aria-hidden="true"></div>' +
        '<button type="button" class="jr-x" data-journey-close aria-label="' + esc(t.close) + '">×</button>' +
        '<div class="jr-body"></div>' +
        '<p class="jr-live" aria-live="polite"></p>' +
      '</div>';
    document.body.appendChild(panel);
    live = panel.querySelector(".jr-live");
    panel.addEventListener("click", onPanelClick);
    panel.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { e.preventDefault(); close(); }
      if (e.key === "Tab") trap(e);
    });
  }
  function trap(e) {
    var f = panel.querySelectorAll('button:not([disabled]), a[href], input:not([disabled])');
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function open() {
    if (!panel) buildPanel();
    lastFocus = document.activeElement;
    var lv = level();
    if (!st.started || !lv) { screen = st.stage ? "level" : "stage"; tmp = { stage: st.stage }; }
    else screen = "main";
    viewing = null; resetArm = false;
    panel.hidden = false;
    document.documentElement.classList.add("jr-open");
    render(true);
  }
  function close() {
    if (!panel || panel.hidden) return;
    panel.hidden = true;
    document.documentElement.classList.remove("jr-open");
    if (lastFocus && lastFocus.focus && document.contains(lastFocus)) lastFocus.focus();
  }
  function say(msg) { if (live) { live.textContent = ""; setTimeout(function () { live.textContent = msg; }, 30); } }

  function choiceCard(kind, id, pair, pressed) {
    return '<button type="button" class="jr-choice" data-' + kind + '="' + id + '" aria-pressed="' + (!!pressed) + '"><b>' + esc(pair[0]) + '</b><span>' + esc(pair[1]) + '</span></button>';
  }

  function render(focus) {
    var body = panel.querySelector(".jr-body"), h = "";
    var eyebrow = '<p class="eyebrow">' + esc(t.eyebrow) + '</p>';
    if (screen === "stage") {
      h = eyebrow + '<h2 id="jr-title">' + esc(t.q1) + '</h2><p class="jr-sub">' + esc(t.q1sub) + '</p>' +
        '<div class="jr-choices">' + ["dream", "ready", "applying"].map(function (k) { return choiceCard("stage", k, t.stages[k], tmp.stage === k); }).join("") + '</div>';
    } else if (screen === "level") {
      var cur = tmp.level || level();
      h = eyebrow + '<h2 id="jr-title">' + esc(t.q2) + '</h2><p class="jr-sub">' + esc(t.q2sub) + '</p>' +
        '<div class="jr-choices jr-choices-2">' + LEVELS.filter(function (k) { return k !== "foundation" || offersF(); }).map(function (k) { var M = window.MasarokCountry, fl = k === "foundation" && M && M.fLabel && M.fLabel(pick().cc); return choiceCard("level", k, fl || t.levels[k], cur === k); }).join("") + '</div>' +
        '<button type="button" class="jr-textbtn" data-go="' + (st.started ? "main" : "stage") + '">' + esc(t.back) + '</button>';
    } else if (screen === "applied") {
      var lv0 = tmp.level, V0 = vars(lv0);
      h = eyebrow + '<h2 id="jr-title">' + esc(t.q3) + '</h2><p class="jr-sub">' + esc(t.q3sub) + '</p>' +
        '<ul class="jr-ticks">' + stepsFor(lv0).map(function (id, i) {
          return '<li><label><input type="checkbox" value="' + id + '"' + (isDone(lv0, id) ? " checked" : "") + '><span><b>' + num(i + 1) + '</b> ' + title(id, V0) +
            (S[id].optional ? ' <em class="jr-opt">' + esc(t.optional) + '</em>' : "") + '</span></label></li>';
        }).join("") + '</ul>' +
        '<div class="jr-actions"><button type="button" class="btn btn-primary" data-applied-go>' + esc(t.q3btn) + ICON.arrow + '</button>' +
        '<button type="button" class="jr-textbtn" data-go="level">' + esc(t.back) + '</button></div>';
    } else {
      h = renderMain(eyebrow);
    }
    body.innerHTML = h;
    if (focus) panel.querySelector(".jr-sheet").scrollTop = 0;
    if (screen === "main") placeClimber();
    if (focus) {
      var target = body.querySelector("#jr-title");
      if (target) { target.setAttribute("tabindex", "-1"); target.focus({ preventScroll: true }); }
    }
  }

  function renderMain(eyebrow) {
    var lv = level(), ids = stepsFor(lv), V = vars(lv), v = V._v, n = ids.length;
    var cur = currentIndex(lv), show = viewing === null ? Math.min(cur, n - 1) : viewing;
    var finished = cur >= n;
    var cn = window.MasarokCountry && pick().cc ? window.MasarokCountry.name(pick().cc) : "";
    var meta = pick().hasUni ? fmt(t.meta, { uni: esc(v.short), city: esc(v.city) }) : esc(cn ? (lang === "ar" ? "لأي جامعة في " + cn : "For any university in " + cn) : t.metaAll);
    var d = countDone(lv);

    var pf = lv === "foundation" && window.MasarokCountry && pick().cc ? window.MasarokCountry.pathF(pick().cc) : null;
    var h = eyebrow + '<h2 id="jr-title">' + esc(pf || t.pathTitle[lv]) + '</h2>' +
      '<div class="jr-meta"><span>' + meta + '</span>' +
      '<button type="button" class="jr-textbtn" data-go="level">' + esc(t.changeLevel) + '</button>' +
      '<button type="button" class="jr-textbtn" data-change-uni>' + esc(t.changeUni) + '</button></div>';

    if (st.welcome && !finished) h += '<p class="jr-welcome">' + esc(fmt(t.welcome, { n: num(cur + 1) })) + '</p>';
    else if (st.stage === "dream" && cur === 0) h += '<p class="jr-welcome">' + esc(t.dreamNote) + '</p>';

    // the staircase
    h += '<div class="jr-stairs-wrap"><div class="jr-progress"><span>' + esc(fmt(t.progress, { d: num(d), total: num(n) })) + '</span><i><b style="width:' + Math.round(d / n * 100) + '%"></b></i></div>' +
      '<ol class="jr-stairs" style="--n:' + n + '">';
    ids.forEach(function (id, i) {
      var state = isDone(lv, id) ? (doneMap(lv)[id] === "skip" ? "skip" : "done") : (i === cur ? "open" : "locked");
      var stateTxt = { done: t.done, skip: t.skipped, open: t.nextStep, locked: t.lockedLbl }[state];
      var hh = stepH(i, n).toFixed(1);
      h += '<li class="jr-step is-' + state + (i === show && !finished ? " is-viewing" : "") + '" style="--h:' + hh + '%">' +
        '<button type="button" data-step="' + i + '" aria-label="' + esc(fmt(t.stepLabel, { n: num(i + 1), title: title(id, V).replace(/<[^>]+>/g, ""), state: stateTxt })) + '"' +
        (state === "locked" ? ' aria-disabled="true"' : "") + (i === show && !finished ? ' aria-current="step"' : "") + '>' +
        '<span class="jr-num">' + num(i + 1) + '</span>' +
        (state === "locked" ? '<span class="jr-ic">' + ICON.lock + '</span>' : state === "done" ? '<span class="jr-ic">' + ICON.tick + '</span>' : state === "skip" ? '<span class="jr-ic">' + ICON.skip + '</span>' : "") +
        '</button></li>';
    });
    h += '</ol><div class="jr-climber" aria-hidden="true">' + figure(finished ? "is-cheering" : "") + '</div></div>';

    // the next-step card
    if (finished && viewing === null) {
      h += '<article class="jr-card jr-finished"><p class="jr-kicker">' + esc(fmt(t.progress, { d: num(d), total: num(n) })) + '</p>' +
        '<h3>' + esc(t.finishedT) + '</h3><p>' + esc(welcome(t.finishedB)) + '</p>' +
        '<div class="jr-links">' + linkHtml("lessons", V) + '</div></article>';
    } else {
      h += cardHtml(lv, show, V, cur);
    }

    // the whole path
    h += '<details class="jr-path"><summary>' + esc(t.path) + '</summary><ol>' + ids.map(function (id, i) {
      var state = isDone(lv, id) ? (doneMap(lv)[id] === "skip" ? "skip" : "done") : (i === cur ? "open" : "locked");
      return '<li class="is-' + state + '"><button type="button" data-step="' + i + '"' + (state === "locked" ? ' aria-disabled="true"' : "") + '>' +
        '<span class="jr-dot">' + (state === "done" ? ICON.tick : state === "skip" ? ICON.skip : state === "locked" ? ICON.lock : num(i + 1)) + '</span>' +
        '<span>' + title(id, V) + (S[id].optional ? ' <em class="jr-opt">' + esc(t.optional) + '</em>' : "") + '</span></button></li>';
    }).join("") + '</ol></details>';

    h += '<div class="jr-foot"><span>' + esc(t.saved) + '</span><button type="button" class="jr-textbtn" data-reset>' + esc(resetArm ? t.startOverSure : t.startOver) + '</button></div>';
    return h;
  }

  function linkHtml(key, V) {
    var l = L[key], href = l.href, label = fmt(l[lang], V);
    if (l.u) { href = V._v[l.u]; if (!href) return ""; }
    if (!label || /\{|\}/.test(label) || label === "") return "";
    var ext = /^https?:/.test(href);
    return '<a href="' + esc(href) + '"' + (ext ? ' rel="noopener" target="_blank"' : ' data-jr-anchor') + '>' + label + (ext ? '<span class="jr-ext" aria-hidden="true">↗</span>' : "") + '</a>';
  }

  function cardHtml(lv, i, V, cur) {
    var ids = stepsFor(lv), id = ids[i], s = S[id], ov = MCj(id), c = ov ? ov[lang] : s[lang], n = ids.length;
    var state = isDone(lv, id) ? (doneMap(lv)[id] === "skip" ? "skip" : "done") : "open";
    var kicker = (i === cur ? esc(t.nextStep) + ' · ' : "") + esc(fmt(t.stepN, { n: num(i + 1), total: num(n) })) +
      (state === "done" ? ' · <span class="jr-tag is-done">' + esc(t.done) + '</span>' : state === "skip" ? ' · <span class="jr-tag">' + esc(t.skipped) + '</span>' : "") +
      (s.optional ? ' · <span class="jr-tag">' + esc(t.optional) + '</span>' : "");
    var what = c.what.map(function (w) { return '<li>' + fmt(w, V) + '</li>'; }).join("");
    if (!ov && s.extra && s.extra[lv] && (lv !== "phd" || id !== "visa" || !pick().cc || pick().cc === "au")) what += '<li>' + esc(s.extra[lv][lang]) + '</li>';
    var links = ov && ov.links ? ov.links.map(function (l) { return '<a href="' + esc(l[2]) + '" rel="noopener" target="_blank">' + esc(lang === "ar" ? l[1] : l[0]) + '<span class="jr-ext" aria-hidden="true">↗</span></a>'; }).join("") : s.links.map(function (k) { return linkHtml(k, V); }).join("");
    var actions = state === "open"
      ? '<button type="button" class="btn btn-primary" data-done="' + id + '">' + ICON.tick + esc(t.markDone) + '</button>' +
        (s.optional ? '<button type="button" class="btn jr-btn-ghost" data-skip="' + id + '">' + esc(t.skip) + '</button>' : "")
      : '<button type="button" class="jr-textbtn" data-undo="' + id + '">' + esc(t.undo) + '</button>';
    return '<article class="jr-card' + (i === cur ? " is-next" : "") + '" aria-labelledby="jr-card-h">' +
      '<p class="jr-kicker">' + kicker + '</p>' +
      '<h3 id="jr-card-h" tabindex="-1">' + title(id, V) + '</h3>' +
      '<div class="jr-cols"><div><h4>' + esc(t.why) + '</h4><p>' + fmt(c.why, V) + '</p></div>' +
      '<div><h4>' + esc(t.what) + '</h4><ul>' + what + '</ul></div></div>' +
      (links ? '<div class="jr-links-wrap"><h4>' + esc(t.links) + '</h4><div class="jr-links">' + links + '</div></div>' : "") +
      '<div class="jr-actions">' + actions + '</div></article>';
  }

  function stepH(i, n) { return 24 + 44 * (n === 1 ? 1 : i / (n - 1)); } // % of the staircase height

  // put the character on the step being shown, walking from where it was
  var climberAt = null;
  function placeClimber() {
    var wrap = panel.querySelector(".jr-stairs-wrap"); if (!wrap) return;
    var lv = level(), n = stepsFor(lv).length, cur = currentIndex(lv);
    var target = Math.min(cur, n - 1);
    var c = wrap.querySelector(".jr-climber"), fig = c.querySelector(".jr-fig");
    function pos(i) {
      var hh = stepH(i, n);
      c.style.setProperty("--x", ((i + 0.5) / n * 100).toFixed(2) + "%");
      c.style.setProperty("--y", hh.toFixed(2) + "%");
    }
    var from = climberAt && climberAt.lv === lv ? climberAt.i : target;
    pos(from);
    climberAt = { lv: lv, i: target };
    if (from !== target && !reduced()) {
      fig.classList.add("is-walking");
      void c.offsetWidth;
      requestAnimationFrame(function () {
        pos(target);
        setTimeout(function () { fig.classList.remove("is-walking"); if (!fig.classList.contains("is-cheering")) { fig.classList.add("is-waving"); setTimeout(function () { fig.classList.remove("is-waving"); }, 1600); } }, 700);
      });
    } else pos(target);
  }

  function onPanelClick(e) {
    var el;
    if (e.target.closest("[data-journey-close]")) { e.preventDefault(); close(); return; }
    if ((el = e.target.closest("[data-stage]"))) {
      tmp.stage = el.getAttribute("data-stage"); st.stage = tmp.stage; save();
      var pl = st.level || pickerLevel();
      if (pl) { chooseLevel(pl); return; }
      screen = "level"; render(true); return;
    }
    if ((el = e.target.closest("[data-level]")) && el.classList.contains("jr-choice")) {
      chooseLevel(el.getAttribute("data-level")); return;
    }
    if (e.target.closest("[data-applied-go]")) {
      var lv = tmp.level, m = doneMap(lv);
      panel.querySelectorAll(".jr-ticks input").forEach(function (b) { if (b.checked) m[b.value] = S[b.value].optional ? (m[b.value] || "done") : "done"; else delete m[b.value]; });
      st.level = lv; st.started = true; save(); viewing = null; screen = "main"; refresh(); render(true); return;
    }
    if ((el = e.target.closest("[data-go]"))) { screen = el.getAttribute("data-go"); if (screen === "level") tmp.level = level(); render(true); return; }
    if (e.target.closest("[data-change-uni]")) { close(); if (window.Masarok && window.Masarok.openPicker) window.Masarok.openPicker(2); return; }
    if ((el = e.target.closest("[data-step]"))) {
      var i = +el.getAttribute("data-step"), lv2 = level(), cur = currentIndex(lv2);
      if (el.getAttribute("aria-disabled") === "true") {
        say(fmt(t.locked, { n: num(cur + 1) }));
        el.classList.remove("is-nudge"); void el.offsetWidth; el.classList.add("is-nudge");
        return;
      }
      viewing = i === cur ? null : i;
      render(false);
      focusCard();
      return;
    }
    if ((el = e.target.closest("[data-done]")) || (el = e.target.closest("[data-skip]"))) {
      var lv3 = level(), id = el.getAttribute("data-done") || el.getAttribute("data-skip");
      doneMap(lv3)[id] = el.hasAttribute("data-skip") ? "skip" : "done";
      st.welcome = false; save(); viewing = null; refresh();
      render(false);
      var nc = currentIndex(lv3);
      if (nc < stepsFor(lv3).length) say(fmt(t.unlocked, { n: num(nc + 1) }));
      else say(t.finishedT);
      focusCard(true);
      return;
    }
    if ((el = e.target.closest("[data-undo]"))) {
      var lv4 = level(); delete doneMap(lv4)[el.getAttribute("data-undo")];
      save(); viewing = null; refresh(); render(false); focusCard(); return;
    }
    if (e.target.closest("[data-reset]")) {
      if (!resetArm) { resetArm = true; render(false); var rb = panel.querySelector("[data-reset]"); if (rb) rb.focus(); return; }
      st = { done: {} }; save(); resetArm = false; climberAt = null; tmp = {}; screen = "stage"; refresh(); render(true); return;
    }
    if ((el = e.target.closest("a[data-jr-anchor]"))) { close(); return; } // let the page scroll to the section
  }
  function chooseLevel(lv) {
    tmp.level = lv; st.level = lv;
    if (st.stage === "applying" && !st.started) { screen = "applied"; render(true); return; }
    st.started = true; save(); viewing = null; screen = "main"; refresh(); render(true);
  }
  function focusCard(showStairs) {
    var hd = panel.querySelector("#jr-card-h") || panel.querySelector(".jr-finished h3");
    if (!hd) return;
    hd.setAttribute("tabindex", "-1"); hd.focus({ preventScroll: true });
    var to = showStairs ? panel.querySelector(".jr-stairs-wrap") : hd.closest(".jr-card");
    if (to && to.scrollIntoView) to.scrollIntoView({ block: showStairs ? "center" : "nearest", behavior: reduced() ? "auto" : "smooth" });
  }

  function refresh() { updateBanner(); updateFab(); }

  // ---------- start ----------
  function init() {
    // a returning student is greeted once per visit
    if (st.started && level() && countDone(level()) > 0) st.welcome = true;
    buildBanner();
    buildFab();
    watchFab();
    document.addEventListener("click", function (e) {
      var b = e.target.closest("[data-journey-open]");
      if (b) { e.preventDefault(); open(); }
    });
    var lastPicker = pickerLevel();
    document.addEventListener("masarok:change", function () {
      // if the student picks a new degree level in the picker, the journey follows it
      var pl = pickerLevel();
      if (pl && pl !== lastPicker && st.level && st.level !== pl) { st.level = pl; save(); climberAt = null; }
      lastPicker = pl;
      refresh();
      if (panel && !panel.hidden && screen === "main") render(false);
    });
    if (/^#journey$/.test(location.hash)) setTimeout(open, 50);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

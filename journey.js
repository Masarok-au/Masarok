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
    deadlines: { href: "#deadlines", en: "Your deadlines", ar: "مواعيدك" },
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
    // Level 1's real task: get to know the plan (nothing is given for just setting up)
    explore: {
      en: { t: "Get to know your plan",
        why: "Five minutes here saves you hours later: you'll know your university, your first deadline and the road ahead.",
        what: ["Open “Your university at a glance” on this page and read about {uni}.", "In “Your deadlines”, turn on a reminder for one deadline.", "Open your journey map and look at the road from home to campus."] },
      ar: { t: "تعرّف على خطتك",
        why: "خمس دقائق هنا توفر عليك ساعات لاحقًا: ستعرف جامعتك وأول موعد لك والطريق الذي أمامك.",
        what: ["افتح قسم «جامعتك باختصار» في هذه الصفحة واقرأ عن {uni}.", "في قسم «مواعيدك»، فعّل التذكير لموعد واحد.", "افتح خريطة رحلتك وشاهد الطريق من البيت إلى الجامعة."] },
      links: ["myuni", "deadlines"] },

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
    foundation: ["explore", "fieldRoute", "englishF", "rulesF", "offerF", "qubool", "safeer", "visa", "housing", "arrive", "progressF"],
    bachelor: ["explore", "fieldUni", "englishB", "sat", "offer", "qubool", "safeer", "visa", "housing", "arrive"],
    master: ["explore", "courseType", "uniCheckPg", "englishPg", "premaster", "docs", "offer", "qubool", "safeer", "visa", "housing", "arrive"],
    phd: ["explore", "researchArea", "supervisor", "englishPg", "uniCheckPhd", "offer", "qubool", "safeer", "visa", "housing", "arrive"]
  };

  var TRACK = {
    foundation: { en: "the track that fits your field", ar: "المسار المناسب لتخصصك" },
    bachelor: { en: "your track (Al-Ruwwad or Imdad)", ar: "مسارك (الرواد أو إمداد)" },
    master: { en: "your track (Al-Ruwwad or Imdad)", ar: "مسارك (الرواد أو إمداد)" },
    phd: { en: "the Research & Development track", ar: "مسار البحث والتطوير" }
  };

  // rough time each step usually takes
  var EST = {
    explore: ["About 5 minutes", "نحو 5 دقائق"],
    fieldRoute: ["About 1–2 weeks", "نحو أسبوع إلى أسبوعين"],
    englishF: ["1–3 months, results included", "من شهر إلى 3 أشهر مع النتائج"],
    englishB: ["1–3 months, results included", "من شهر إلى 3 أشهر مع النتائج"],
    englishPg: ["1–3 months, results included", "من شهر إلى 3 أشهر مع النتائج"],
    rulesF: ["About 1 day", "نحو يوم واحد"],
    offerF: ["About 2–6 weeks", "نحو أسبوعين إلى 6 أسابيع"],
    fieldUni: ["About 2–4 weeks", "نحو أسبوعين إلى 4 أسابيع"],
    sat: ["About 2–3 months", "نحو شهرين إلى 3 أشهر"],
    offer: ["About 4–8 weeks for a decision", "نحو 4 إلى 8 أسابيع حتى يصدر القرار"],
    courseType: ["About 1 week", "نحو أسبوع"],
    uniCheckPg: ["About 1–2 days", "نحو يوم أو يومين"],
    uniCheckPhd: ["About 1–2 days", "نحو يوم أو يومين"],
    premaster: ["About 1 week to decide", "نحو أسبوع لاتخاذ القرار"],
    docs: ["About 2–4 weeks", "نحو أسبوعين إلى 4 أسابيع"],
    researchArea: ["About 2–4 weeks", "نحو أسبوعين إلى 4 أسابيع"],
    supervisor: ["Often 1–3 months", "غالبًا من شهر إلى 3 أشهر"],
    qubool: ["The window is usually open for about 3 months", "فترة التقديم مفتوحة عادةً نحو 3 أشهر"],
    safeer: ["About 1–3 weeks", "نحو أسبوع إلى 3 أسابيع"],
    visa: ["About 3–8 weeks", "نحو 3 إلى 8 أسابيع"],
    housing: ["About 2–6 weeks", "نحو أسبوعين إلى 6 أسابيع"],
    arrive: ["Your first 2 weeks", "أسبوعاك الأولان"],
    progressF: ["Through your foundation year", "طوال سنة الفاونديشن"]
  };
  // which real date matters for each step (see deadlines.js)
  var DLT = { fieldRoute: "apply", englishF: "apply", rulesF: "apply", offerF: "apply", fieldUni: "apply", englishB: "apply", sat: "apply", offer: "apply",
    courseType: "apply", uniCheckPg: "apply", englishPg: "apply", premaster: "apply", docs: "apply", researchArea: "apply", supervisor: "apply", uniCheckPhd: "apply",
    qubool: "sa", safeer: "start", visa: "start", housing: "start", arrive: "start" };

  // the personal questions, and which steps each answer completes
  var PROF = {
    offer: ["none", "cond", "uncond"], eng: ["none", "booked", "score"], sch: ["none", "applied", "nominated", "self"], start: ["soon", "year", "later", "unsure"]
  };
  var PICK_STEPS = ["fieldRoute", "rulesF", "fieldUni", "courseType", "uniCheckPg", "docs", "researchArea", "supervisor", "uniCheckPhd"];
  var ENG_STEPS = ["englishF", "englishB", "englishPg"];
  var OPT_STEPS = ["sat", "premaster"];
  var OFFER_STEPS = ["offerF", "offer"];

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
      stepLabel: "Step {n}: {title}. {state}",
      pT: "A few quick questions", pSub: "Your answers skip the steps you've already done and tailor your plan. You can change them any time.",
      pQ: { offer: "Do you have an offer from a university?", eng: "Your language test (IELTS, TOEFL…)?", sch: "Your scholarship?", start: "When do you want to start?" },
      pA: { offer: { none: "Not yet", cond: "Conditional offer", uncond: "Unconditional offer" },
        eng: { none: "Not taken yet", booked: "Booked", score: "I have my score" },
        sch: { none: "Haven't applied yet", applied: "Applied on Qubool", nominated: "Nominated, or I have my decision", self: "Self-funded for now" },
        start: { soon: "Within 6 months", year: "In 6–12 months", later: "More than a year away", unsure: "Not sure yet" } },
      pGo: "Build my plan", pSkip: "Skip for now", pEdit: "Edit my answers",
      tasks: "Small tasks", tasksN: "{d} of {n} done", allTasks: "All small tasks done. Step complete, nice work!",
      takes: "Usually takes", nextDl: "Next deadline", startsOn: "Your studies start", remind: "Remind me", reminded: "Reminder on", allDl: "All deadlines", expected: "expected",
      tight: "Starting within 6 months is tight. Focus on the deadlines below, and ask your university early about late applications.",
      selfNote: "You're self-funded for now: once you've studied for a while, you can apply to join the scholarship (windows: 1 Oct–30 Nov and 1 May–30 Jun).",
      plan: "Your plan", planStep: "Step {n} of {total}", planTask: "Next small task:", planCta: "Continue my plan",
      cont: "Continue", lvKicker: "Level {n} of 10 · {name}",
      whereT: "Where do you want to study?", whereSub: "Your plan, deadlines and visa steps follow this choice. You can change it any time.",
      whereNone: "Not decided yet", uniL: "Your university (optional)", uniNone: "Not sure yet",
      avT: "Choose your avatar", avSub: "This is you on the journey. New outfits unlock as you level up.", avM: "Male", avF: "Female", skinL: "Skin tone", avGo: "This is me",
      tourNext: "Next", tourBack: "Back", tourSkip: "Skip the tour", tourGo: "Let's start", tourN: "{n} of {t}", tourAgain: "Take the tour again",
      tour: ["Hi, I'm you! These 10 stairs are your 10 levels, from dreaming about studying abroad to arriving on campus.",
        "This is your level and your points. You start at 0. Every star you earn is 1 point, and every side quest is 1 more.",
        "Every level has 3 stars. The first: Learn. It opens a short free lesson in Masarok Academy.",
        "The second: Check. Answer 3 quick questions and get 2 right.",
        "The third: Do. The real step, with small tasks, deadlines and helpful links.",
        "Learn and Check clear a level and open the next one. Finishing the real step clears it too. New levels unlock new outfits.",
        "Open your journey map any time to see the whole road from home to campus.",
        "That's it. Start with Level 1: open your first lesson."], lvProg: "{d} of 10 levels cleared", stars: "{n} of 3 stars",
      learn: "Learn", learnSub: "{m} min · free in Masarok Academy", doT: "Do", doSub: "The real step", checkT: "Check", checkSub: "3 quick questions",
      lessonGo: "Start the lesson", lessonReview: "Open it again", lessonDone: "Done",
      checkGo: "Check my answers", checkAll: "Answer all three questions first.", checkPass: "{c} of 3 right. Star earned!",
      checkFail: "{c} of 3 right. You need 2 to pass. Read why, then try again.", checkRetry: "Try again", checkDoneT: "Passed · {c} of 3 right",
      right: "Right.", wrongA: "Not quite.",
      lvRule: "To clear this level, finish Learn and Check, or finish the real step.", lvNext: "Next: Level {n} · {name}",
      lvCleared: "Level cleared!", lvGoNext: "Go to Level {n}", lvFinT: "You cleared all 10 levels!",
      pickDo: "Choose your country and degree in the picker. Adding your university makes every step fit you.", pickYours: "Your choices: {c}",
      pickChange: "Change my choices", pickNone: "Not chosen yet",
      lvLabel: "Level {n}: {name}. {state}", lvLocked: "Clear Level {n} first to open this one.", lvOpened: "Level {n} is now open.",
      welcomeLv: "Welcome back. You're on Level {n} · {name}.", fabLv: "Level {n} of 10", planLv: "Level {n} of 10 · {name}",
      nextLearn: "Learn: {t}", nextCheck: "Check: answer 3 quick questions", nextDo: "Do: {t}",
      noDo: "There's no real-world step at this level for your degree. Learn and Check clear it.", lvPath: "All 10 levels"
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
      stepLabel: "الخطوة {n}: {title}. {state}",
      pT: "أسئلة سريعة", pSub: "إجاباتك تتخطى الخطوات التي أنجزتها وتخصص خطتك، ويمكنك تغييرها متى شئت.",
      pQ: { offer: "هل لديك قبول من جامعة؟", eng: "اختبار اللغة (IELTS أو TOEFL…)؟", sch: "وضع البعثة؟", start: "متى تريد أن تبدأ؟" },
      pA: { offer: { none: "ليس بعد", cond: "قبول مشروط", uncond: "قبول غير مشروط" },
        eng: { none: "لم أختبر بعد", booked: "حجزت موعدًا", score: "لدي النتيجة" },
        sch: { none: "لم أقدّم بعد", applied: "قدّمت عبر منصة قبول", nominated: "رُشحت أو صدر قرار ابتعاثي", self: "أدرس على حسابي حاليًا" },
        start: { soon: "خلال 6 أشهر", year: "خلال 6 إلى 12 شهرًا", later: "بعد أكثر من سنة", unsure: "لم أحدد بعد" } },
      pGo: "ابنِ خطتي", pSkip: "تخطَّ الآن", pEdit: "عدّل إجاباتي",
      tasks: "مهام صغيرة", tasksN: "أنجزت {d} من {n}", allTasks: "أنجزت كل المهام الصغيرة. اكتملت الخطوة، أحسنت!",
      takes: "يستغرق عادةً", nextDl: "الموعد القادم", startsOn: "تبدأ دراستك", remind: "ذكّرني", reminded: "التذكير مفعّل", allDl: "كل المواعيد", expected: "متوقع",
      tight: "البدء خلال 6 أشهر وقت ضيق. ركّز على المواعيد أدناه، واسأل جامعتك مبكرًا عن التقديم المتأخر.",
      selfNote: "أنت تدرس على حسابك حاليًا: بعد فترة من الدراسة يمكنك التقديم على الإلحاق بالبعثة (الفترات: 1 أكتوبر–30 نوفمبر و1 مايو–30 يونيو).",
      plan: "خطتك", planStep: "الخطوة {n} من {total}", planTask: "المهمة الصغيرة التالية:", planCta: "أكمل خطتي",
      cont: "متابعة", lvKicker: "المستوى {n} من 10 · {name}",
      whereT: "أين تريد أن تدرس؟", whereSub: "خطتك ومواعيدك وخطوات التأشيرة تتبع هذا الاختيار، ويمكنك تغييره متى شئت.",
      whereNone: "لم أقرر بعد", uniL: "جامعتك (اختياري)", uniNone: "لست متأكدًا بعد",
      avT: "اختر شخصيتك", avSub: "هذا أنت في الرحلة، وتُفتح لك أزياء جديدة كلما ارتفع مستواك.", avM: "شاب", avF: "فتاة", skinL: "لون البشرة", avGo: "هذا أنا",
      tourNext: "التالي", tourBack: "السابق", tourSkip: "تخطَّ الجولة", tourGo: "لنبدأ", tourN: "{n} من {t}", tourAgain: "شاهد الجولة مرة أخرى",
      tour: ["أهلًا، أنا أنت! هذه الدرجات العشر هي مستوياتك العشرة، من حلم الدراسة في الخارج حتى الوصول إلى الجامعة.",
        "هنا مستواك ونقاطك. تبدأ من الصفر، وكل نجمة تكسبها نقطة واحدة، وكل مهمة جانبية نقطة أخرى.",
        "لكل مستوى 3 نجوم. الأولى: تعلّم، وتفتح درسًا قصيرًا مجانيًا في أكاديمية مسارُك.",
        "الثانية: اختبر. أجب عن 3 أسئلة سريعة واحصل على إجابتين صحيحتين.",
        "الثالثة: نفّذ. الخطوة الفعلية بمهامها الصغيرة ومواعيدها وروابطها المفيدة.",
        "«تعلّم» و«اختبر» يكفيان لاجتياز المستوى وفتح الذي بعده، وإنجاز الخطوة الفعلية يجتازه أيضًا. والمستويات الجديدة تفتح أزياء جديدة.",
        "افتح خريطة رحلتك متى شئت لترى الطريق كاملًا من البيت إلى الجامعة.",
        "هذا كل شيء. ابدأ بالمستوى 1: افتح درسك الأول."], lvProg: "اجتزت {d} من 10 مستويات", stars: "{n} من 3 نجوم",
      learn: "تعلّم", learnSub: "{m} د · مجانًا في أكاديمية مسارُك", doT: "نفّذ", doSub: "الخطوة الفعلية", checkT: "اختبر", checkSub: "3 أسئلة سريعة",
      lessonGo: "ابدأ الدرس", lessonReview: "افتحه مرة أخرى", lessonDone: "مكتمل",
      checkGo: "تحقق من إجاباتي", checkAll: "أجب عن الأسئلة الثلاثة أولًا.", checkPass: "{c} من 3 صحيحة. حصلت على نجمة!",
      checkFail: "{c} من 3 صحيحة. تحتاج إجابتين صحيحتين للاجتياز. اقرأ السبب ثم حاول مرة أخرى.", checkRetry: "أعد المحاولة", checkDoneT: "اجتزت · {c} من 3 صحيحة",
      right: "صحيح.", wrongA: "ليس تمامًا.",
      lvRule: "لتجتاز هذا المستوى: أكمل «تعلّم» و«اختبر»، أو أنجز الخطوة الفعلية.", lvNext: "التالي: المستوى {n} · {name}",
      lvCleared: "اجتزت المستوى!", lvGoNext: "انتقل إلى المستوى {n}", lvFinT: "اجتزت المستويات العشرة كلها!",
      pickDo: "اختر دولتك ودرجتك من أداة الاختيار، وإضافة جامعتك تجعل كل خطوة مناسبة لك.", pickYours: "اختياراتك: {c}",
      pickChange: "غيّر اختياراتي", pickNone: "لم تختر بعد",
      lvLabel: "المستوى {n}: {name}. {state}", lvLocked: "اجتز المستوى {n} أولًا لفتح هذا المستوى.", lvOpened: "فُتح المستوى {n}.",
      welcomeLv: "أهلًا بعودتك. أنت في المستوى {n} · {name}.", fabLv: "المستوى {n} من 10", planLv: "المستوى {n} من 10 · {name}",
      nextLearn: "تعلّم: {t}", nextCheck: "اختبر: أجب عن 3 أسئلة سريعة", nextDo: "نفّذ: {t}",
      noDo: "لا توجد خطوة فعلية في هذا المستوى لدرجتك، ويكفي «تعلّم» و«اختبر» لاجتيازه.", lvPath: "المستويات العشرة"
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
  // before levels, the path started at the field step: anyone who already finished a step has done "explore" in practice
  (function () {
    Object.keys(st.done).forEach(function (lv) { var m = st.done[lv]; if (m && !m.explore && Object.keys(m).some(function (k) { return m[k] === "done" || m[k] === "skip"; })) m.explore = "done"; });
  })();
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
  function taskMap(lv, id) { if (!st.tasks) st.tasks = {}; if (!st.tasks[lv]) st.tasks[lv] = {}; if (!st.tasks[lv][id]) st.tasks[lv][id] = []; return st.tasks[lv][id]; }
  function taskList(lv, id, V) {
    var s = S[id], ov = MCj(id), c = content(id);
    var list = c.what.map(function (w) { return fmt(w, V); });
    if (!ov && s.extra && s.extra[lv] && (lv !== "phd" || id !== "visa" || !pick().cc || pick().cc === "au")) list.push(esc(s.extra[lv][lang]));
    return list;
  }
  function applyProfile(lv, p) {
    var m = doneMap(lv), ids = stepsFor(lv);
    function mark(list, val) { list.forEach(function (id) { if (ids.indexOf(id) > -1 && !m[id]) m[id] = val || "done"; }); }
    if (p.eng === "score" || p.offer === "uncond") mark(ENG_STEPS);
    if (p.offer === "cond" || p.offer === "uncond") { mark(PICK_STEPS); mark(OPT_STEPS, "skip"); }
    if (p.offer === "uncond") mark(OFFER_STEPS);
    if (p.sch === "nominated") mark(["qubool"]);
    if (p.sch === "self") mark(["qubool"], "skip");
  }
  function stripTags(h) { var d = document.createElement("div"); d.innerHTML = h; return d.textContent; }
  function nextTask(lv) {
    var ids = stepsFor(lv), i = currentIndex(lv); if (i >= ids.length) return "";
    var V = vars(lv), list = taskList(lv, ids[i], V), tm = taskMap(lv, ids[i]);
    for (var k = 0; k < list.length; k++) if (!tm[k]) return stripTags(list[k]);
    return "";
  }
  function dlFor(id) {
    var M = window.MasarokDeadlines, ty = DLT[id];
    return M && ty && M.next ? M.next(ty) : null;
  }
  // ---------- levels (levels.js): Learn, Do, Check ----------
  var NL = 10;
  function LVM() { return window.MasarokLevels; }
  function LVD(n) { return LVM().list[n - 1]; }
  function levelSteps(lv, n) { return stepsFor(lv).filter(function (id) { return LVM().levelOf(id) === n; }); }
  function pickDone() { return !!(pick().cc && level()); }
  function doDone(lv, n) { var ids = levelSteps(lv, n); return ids.length > 0 && ids.every(function (id) { return isDone(lv, id); }); }
  function lvState(lv, n) {
    var M = LVM(), learn = M.learnDone(n), chk = M.checkDone(n), dd = doDone(lv, n);
    return { n: n, learn: learn, check: chk, "do": dd, cleared: (learn && chk) || dd, stars: (learn ? 1 : 0) + (chk ? 1 : 0) + (dd ? 1 : 0) };
  }
  function curLevel(lv) { for (var n = 1; n <= NL; n++) if (!lvState(lv, n).cleared) return n; return NL + 1; }
  function lvCleared(lv) { var d = 0; for (var n = 1; n <= NL; n++) if (lvState(lv, n).cleared) d++; return d; }
  function lvOpen(lv, n) { return n === 1 || lvState(lv, n - 1).cleared || lvState(lv, n).cleared || n <= curLevel(lv); }
  function lvName(n) { return LVD(n).name[lang === "ar" ? 1 : 0]; }
  function L2(x) { return x[lang === "ar" ? 1 : 0]; }
  function starsHtml(k) { var h = ""; for (var i = 0; i < 3; i++) h += '<i class="' + (i < k ? "is-on" : "") + '"></i>'; return '<span class="jr-stars" aria-hidden="true">' + h + "</span>"; }
  // what to do next on a level, in one line
  function nextThing(lv, n) {
    var s = lvState(lv, n);
    if (!s.learn) return fmt(t.nextLearn, { t: L2(LVM().learn(n).t) });
    if (!s.check) return t.nextCheck;
    var ids = levelSteps(lv, n).filter(function (id) { return !isDone(lv, id); });
    return ids.length ? fmt(t.nextDo, { t: stripTags(title(ids[0], vars(lv))) }) : "";
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

  // ---------- the student's avatar: male or female, and a skin tone ----------
  var AVK = "masarok-avatar";
  function avatar() { try { var a = JSON.parse(localStorage.getItem(AVK) || "null"); if (a && (a.g === "m" || a.g === "f")) return { g: a.g, skin: [0, 1, 2].indexOf(+a.skin) > -1 ? +a.skin : 1 }; } catch (e) {} return null; }
  function applyAvatar() { var a = avatar() || { g: "m", skin: 1 }; document.documentElement.setAttribute("data-av", a.g); document.documentElement.setAttribute("data-skin", String(a.skin)); }
  applyAvatar();
  window.MasarokAvatar = { get: avatar, apply: applyAvatar };
  var FLAGS = { au: "🇦🇺", uk: "🇬🇧", us: "🇺🇸", ca: "🇨🇦", de: "🇩🇪", sg: "🇸🇬" };

  // ---------- the character (flat SVG, drawn in the site's style) ----------
  function figure(cls) {
    var skin = "#C08A5A", thobe = "#F6F3EC", edge = "#D9D2C2";
    function arm(side) {
      var x0 = side === "l" ? 19 : 45, x1 = side === "l" ? 16 : 48;
      return '<g class="jr-arm jr-arm-' + side + '" style="transform-origin:' + x0 + 'px 42px">' +
        '<g class="jr-av-m"><line x1="' + x0 + '" y1="42" x2="' + x1 + '" y2="70" class="jr-c-sleeve-e" stroke="' + edge + '" stroke-width="8.6" stroke-linecap="round"/>' +
        '<line x1="' + x0 + '" y1="42" x2="' + x1 + '" y2="70" class="jr-c-sleeve" stroke="' + thobe + '" stroke-width="7" stroke-linecap="round"/></g>' +
        '<g class="jr-av-f"><line x1="' + x0 + '" y1="42" x2="' + x1 + '" y2="70" class="jr-c-abaya-se" stroke-width="9" stroke-linecap="round"/>' +
        '<line x1="' + x0 + '" y1="42" x2="' + x1 + '" y2="70" class="jr-c-abaya-s" stroke-width="7.4" stroke-linecap="round"/></g>' +
        (side === "l" ? dallah() : "") +
        '<circle class="jr-c-skin" cx="' + x1 + '" cy="72.5" r="3.6" fill="' + skin + '"/>' + (side === "r" ? falcon() : "") + '</g>';
    }
    // accessories from the wardrobe, hidden unless chosen
    function dallah() {
      return '<g class="jr-acc-dallah" transform="translate(-1.5 -4)">' +
        '<path d="M10.6 80.6 Q7 79.4 6 75.2" fill="none" stroke="#C99A5B" stroke-width="1.7" stroke-linecap="round"/>' +
        '<path d="M17.6 80 Q21.2 80.6 20.6 84.4 Q20.2 86.6 18.4 86.8" fill="none" stroke="#9C7440" stroke-width="1.4" stroke-linecap="round"/>' +
        '<path d="M9.6 88 Q8.6 82 11.2 78.4 L16.8 78.4 Q19.4 82 18.4 88 Z" fill="#C99A5B"/>' +
        '<path d="M11.4 78.4 L12.4 75.4 L15.6 75.4 L16.6 78.4 Z" fill="#B0844D"/><circle cx="14" cy="74.3" r="1.1" fill="#E2B66C"/>' +
        '<path d="M10 83 H18" stroke="#9C7440" stroke-width=".8"/><rect x="9.2" y="87.4" width="9.6" height="1.8" rx=".9" fill="#9C7440"/></g>';
    }
    function falcon() {
      return '<g class="jr-acc-falcon" transform="translate(48 72.5) scale(1.55) translate(-48 -72.5)">' +
        '<path d="M46.4 69.6 L43.6 76 L47.8 72.4 Z" fill="#4E351E"/>' +
        '<path d="M45.6 70.6 Q44.4 64 48.6 60.4 Q52.6 58.4 54.2 62 Q55.2 66.6 51.6 70.6 Z" fill="#6B4A2B"/>' +
        '<path d="M48.8 61.6 Q51.6 61 52.5 64 Q52.7 67.6 50.5 70 Q48.8 66 48.8 61.6 Z" fill="#E9DCC2"/>' +
        '<path d="M49.4 64 l1 .6 M49.6 66.4 l1 .6" stroke="#9C7440" stroke-width=".6"/>' +
        '<circle cx="52.6" cy="58.4" r="3" fill="#6B4A2B"/>' +
        '<path d="M49.7 58.8 Q49.9 55 52.6 55.1 Q55.5 55.3 55.7 58.5 Q53 57.5 49.7 58.8 Z" fill="#9C2A22"/><circle cx="52.6" cy="54.7" r=".8" fill="#E2B66C"/>' +
        '<path d="M55.4 58.6 L57.6 59.4 L55.4 60.3 Z" fill="#E2B66C"/>' +
        '<path d="M47.4 70.6 v1.6 M49.4 70.8 v1.6" stroke="#E2B66C" stroke-width=".8" stroke-linecap="round"/></g>';
    }
    return '<svg class="jr-fig ' + (cls || "") + '" viewBox="0 0 64 112" aria-hidden="true" focusable="false">' +
      // backpack
      '<rect x="43" y="44" width="11" height="28" rx="4" fill="#173252"/>' +
      '<line x1="51" y1="48" x2="51" y2="60" stroke="#E2B66C" stroke-width="1.6" stroke-linecap="round"/><circle cx="51" cy="61.5" r="1.6" fill="#E2B66C"/>' +
      '<g class="jr-acc-sadu"><rect x="44.5" y="43" width="14" height="30" rx="4.5" fill="#2A1612" stroke="#C99A5B" stroke-width=".8"/>' +
        '<path d="M45.2 48 L48.5 45 L51.6 48 L54.8 45 L57.8 47.6 V49.6 H45.2 Z M45.2 68.2 L48.5 71.2 L51.6 68.2 L54.8 71.2 L57.8 68.6 V66.4 H45.2 Z" fill="#9C2A22"/>' +
        '<path d="M51.6 52 l2.8 2.8 -2.8 2.8 -2.8 -2.8z M51.6 59.2 l2.8 2.8 -2.8 2.8 -2.8 -2.8z" fill="#F3EBDD"/><path d="M45.4 50.6 H57.6 M45.4 65.4 H57.6" stroke="#C99A5B" stroke-width=".9"/></g>' +
      // feet
      '<g class="jr-feet"><ellipse class="jr-foot-l" cx="25" cy="104" rx="5.5" ry="2.8" fill="#5A3C1E"/><ellipse class="jr-foot-r" cx="39" cy="104" rx="5.5" ry="2.8" fill="#5A3C1E"/></g>' +
      // thobe (male avatar) or abaya (female avatar)
      '<g class="jr-av-m"><path class="jr-c-thobe" d="M24 35 Q32 33 40 35 L46 40 L50.5 102 L13.5 102 L18 40 Z" fill="' + thobe + '" stroke="' + edge + '" stroke-width=".9"/>' +
      '<line x1="32" y1="37" x2="32" y2="52" stroke="' + edge + '" stroke-width="1"/><circle cx="32" cy="42" r=".9" fill="' + edge + '"/><circle cx="32" cy="47" r=".9" fill="' + edge + '"/></g>' +
      '<g class="jr-av-f"><path class="jr-c-abaya" d="M24 35 Q32 33 40 35 L46.5 40 L52.5 103 L11.5 103 L17.5 40 Z" stroke-width=".9"/>' +
      '<path class="jr-c-abaya-se" d="M32 36 V103" stroke-width=".9" fill="none"/>' +
      '<g class="jr-trim"><path d="M30.4 36 L29.4 103 M33.6 36 L34.6 103 M12.2 99.5 H51.8" stroke="#E2B66C" stroke-width="1.3" fill="none"/></g></g>' +
      '<line x1="21" y1="40" x2="23" y2="58" stroke="#173252" stroke-width="2.4" stroke-linecap="round"/><line x1="43" y1="40" x2="41" y2="58" stroke="#173252" stroke-width="2.4" stroke-linecap="round"/>' +
      // bisht (shown by the wardrobe)
      '<g class="jr-av-m"><g class="jr-bisht"><path class="jr-c-bisht" d="M17.6 39.6 L24 35 L28.6 37.2 L27.4 103 L12.4 103 Z"/><path class="jr-c-bisht" d="M46.4 39.6 L40 35 L35.4 37.2 L36.6 103 L51.6 103 Z"/>' +
      '<path d="M28.6 37.2 L27.4 103 M35.4 37.2 L36.6 103" stroke="#E2B66C" stroke-width="1.7"/><path d="M24 35 L28.6 37.2 M40 35 L35.4 37.2" stroke="#E2B66C" stroke-width="1.7" stroke-linecap="round"/></g></g>' +
      arm("l") + arm("r") +
      // head (male): shemagh behind, face, shemagh top, agal
      '<g class="jr-av-m"><path class="jr-c-shem" d="M18.5 16 Q32 2 45.5 16 L48.5 41 Q40.5 34.5 32 34.5 Q23.5 34.5 15.5 41 Z" fill="#C8102E"/>' +
      '<path class="jr-c-dots" d="M17.5 24 L16 39 M46.5 24 L48 39 M20 18 L19 30 M44 18 L45 30" stroke="#fff" stroke-width=".9" stroke-dasharray="1.6 1.8" opacity=".85"/>' +
      '<ellipse class="jr-c-skin" cx="32" cy="22" rx="8.6" ry="9.6" fill="' + skin + '"/>' +
      '<path class="jr-c-shem" d="M21 18.5 Q32 7 43 18.5 Q32 13.5 21 18.5 Z" fill="#C8102E"/>' +
      '<path class="jr-c-dots" d="M22 17 Q32 9 42 17" fill="none" stroke="#fff" stroke-width=".9" stroke-dasharray="1.6 1.8" opacity=".85"/>' +
      '<ellipse cx="32" cy="12.6" rx="11.2" ry="2.6" fill="none" stroke="#14140F" stroke-width="2.2"/></g>' +
      // head (female): hijab around the face
      '<g class="jr-av-f"><path class="jr-c-hijab" d="M19.2 20 Q19.2 6 32 6 Q44.8 6 44.8 20 L47.6 41 Q40 35.4 32 35.4 Q24 35.4 16.4 41 Z"/>' +
      '<path class="jr-c-hijab-e" d="M19.6 22 Q19.4 32 24 36 M44.4 22 Q44.6 32 40 36" fill="none" stroke-width="1.1"/>' +
      '<ellipse class="jr-c-skin" cx="32" cy="22.6" rx="8" ry="9.2" fill="' + skin + '"/>' +
      '<path class="jr-c-hijab" d="M23.4 19 Q24 10.4 32 10.2 Q40 10.4 40.6 19 Q37.4 15.2 32 15 Q26.6 15.2 23.4 19 Z"/>' +
      '<path class="jr-c-hijab-e" d="M23.6 19.4 Q22.6 27.6 26 32.4 M40.4 19.4 Q41.4 27.6 38 32.4" fill="none" stroke-width="1.2"/></g>' +
      '<circle cx="28.6" cy="22.6" r="1.25" fill="#14140F"/><circle cx="35.4" cy="22.6" r="1.25" fill="#14140F"/>' +
      '<path d="M28.6 26.8 Q32 29.6 35.4 26.8" fill="none" stroke="#14140F" stroke-width="1.25" stroke-linecap="round"/>' +
      '<circle cx="26.4" cy="26" r="1.6" fill="#E08A6E" opacity=".45"/><circle cx="37.6" cy="26" r="1.6" fill="#E08A6E" opacity=".45"/>' +
      '</svg>';
  }
  function headIcon() {
    return '<svg class="jr-head" viewBox="13 3 38 38" aria-hidden="true" focusable="false">' +
      '<g class="jr-av-m"><path d="M18.5 16 Q32 2 45.5 16 L48.5 41 Q40.5 34.5 32 34.5 Q23.5 34.5 15.5 41 Z" fill="#C8102E" class="jr-c-shem"/>' +
      '<ellipse class="jr-c-skin" cx="32" cy="22" rx="8.6" ry="9.6" fill="#C08A5A"/>' +
      '<path d="M21 18.5 Q32 7 43 18.5 Q32 13.5 21 18.5 Z" fill="#C8102E" class="jr-c-shem"/>' +
      '<ellipse cx="32" cy="12.6" rx="11.2" ry="2.6" fill="none" stroke="#14140F" stroke-width="2.2"/></g>' +
      '<g class="jr-av-f"><path class="jr-c-hijab" d="M19.2 20 Q19.2 6 32 6 Q44.8 6 44.8 20 L47.6 41 Q40 35.4 32 35.4 Q24 35.4 16.4 41 Z"/>' +
      '<ellipse class="jr-c-skin" cx="32" cy="22.6" rx="8" ry="9.2" fill="#C08A5A"/>' +
      '<path class="jr-c-hijab" d="M23.4 19 Q24 10.4 32 10.2 Q40 10.4 40.6 19 Q37.4 15.2 32 15 Q26.6 15.2 23.4 19 Z"/></g>' +
      '<circle cx="28.6" cy="22.6" r="1.25" fill="#14140F"/><circle cx="35.4" cy="22.6" r="1.25" fill="#14140F"/>' +
      '<path d="M28.6 26.8 Q32 29.6 35.4 26.8" fill="none" stroke="#14140F" stroke-width="1.25" stroke-linecap="round"/></svg>';
  }
  // a little student running along the top of the guide (side view, facing left)
  function runner() {
    var skin = "#C08A5A", thobe = "#F6F3EC", edge = "#D9D2C2";
    function leg(cls) {
      return '<g class="' + cls + '"><line x1="17" y1="30" x2="15.2" y2="44.6" stroke="' + edge + '" stroke-width="3" stroke-linecap="round"/>' +
        '<ellipse cx="13.8" cy="45.6" rx="3" ry="1.4" fill="#5A3C1E"/></g>';
    }
    function arm(cls) {
      return '<g class="' + cls + '"><line x1="17" y1="18.5" x2="13" y2="27" stroke="' + edge + '" stroke-width="3.4" stroke-linecap="round"/>' +
        '<line class="jr-c-sleeve" x1="17" y1="18.5" x2="13" y2="27" stroke="' + thobe + '" stroke-width="2.4" stroke-linecap="round"/>' +
        '<circle cx="12.6" cy="28" r="1.6" fill="' + skin + '"/></g>';
    }
    return '<svg class="jr-run" viewBox="0 0 40 48" focusable="false">' +
      '<g transform="rotate(-9 17 44)"><g class="jr-run-body">' +
        leg("jr-leg-b") + leg("jr-leg-a") + arm("jr-arm-b") +
        // bisht flowing behind (shown by the wardrobe)
        '<g class="jr-bisht"><path class="jr-c-bisht" d="M16.4 15.2 Q20.6 14.6 22.8 16.4 L28.2 41 Q22.4 42.8 16.2 41.8 L17.6 24 Z"/><path d="M16.4 15.2 L17.6 24 L16.2 41.8" fill="none" stroke="#E2B66C" stroke-width="1"/></g>' +
        // backpack on his back
        '<rect x="20.5" y="16.5" width="7.5" height="11" rx="2.4" fill="#173252"/>' +
        '<line x1="22" y1="18" x2="22" y2="25" stroke="#E2B66C" stroke-width="1.1" stroke-linecap="round"/>' +
        // thobe, leaning forward
        '<g class="jr-av-m"><path class="jr-hem jr-c-thobe" d="M13.2 15.5 Q17 14.4 20.8 15.6 L25.4 41.4 Q17.4 43.2 8.8 41.4 Z" fill="' + thobe + '" stroke="' + edge + '" stroke-width=".8"/>' +
        '<line x1="17" y1="16" x2="17" y2="23" stroke="' + edge + '" stroke-width=".7"/></g>' +
        '<g class="jr-av-f"><path class="jr-hem jr-c-abaya" d="M13 15.5 Q17 14.4 21 15.6 L26 42.2 Q17.4 44 8 42.2 Z" stroke-width=".8"/>' +
        '<g class="jr-trim"><path d="M8.6 40.8 Q17.4 42.6 25.4 40.8" stroke="#E2B66C" stroke-width=".9" fill="none"/></g></g>' +
        '<line x1="20.8" y1="16.2" x2="21.6" y2="22" stroke="#173252" stroke-width="1.6" stroke-linecap="round"/>' +
        arm("jr-arm-a") +
        // head: face, shemagh with a tail flying behind, agal
        '<g class="jr-av-m"><path class="jr-tail jr-c-shem" d="M19.5 7.5 Q25 9 27.5 15.5 Q24 13.5 20.5 13.8 Z" fill="#C8102E"/>' +
        '<circle class="jr-c-skin" cx="15" cy="9.4" r="5" fill="' + skin + '"/>' +
        '<path class="jr-c-shem" d="M9.6 9.2 Q10.2 3.2 15.8 3 Q20.9 3.3 21.5 9 L21.6 14.8 Q19.2 12.6 17.6 11.8 Q16.2 8.6 9.6 9.2 Z" fill="#C8102E"/>' +
        '<path class="jr-c-dots" d="M11 8 Q15.5 5.2 20.4 8" fill="none" stroke="#fff" stroke-width=".7" stroke-dasharray="1.2 1.4" opacity=".85"/>' +
        '<ellipse cx="15.6" cy="6.4" rx="5.6" ry="1.35" fill="none" stroke="#14140F" stroke-width="1.6" transform="rotate(-10 15.6 6.4)"/></g>' +
        '<g class="jr-av-f"><path class="jr-tail jr-c-hijab" d="M19.6 8 Q25 10 26.6 16 Q23.4 14 20.4 14.4 Z"/>' +
        '<path class="jr-c-hijab" d="M9.4 10 Q9.4 2.6 15.6 2.6 Q21.8 2.8 21.8 9.4 L22 15.4 Q18.4 13.6 15 14.6 Q11.6 13.8 9.4 10 Z"/>' +
        '<circle class="jr-c-skin" cx="14.6" cy="9.6" r="4.3" fill="' + skin + '"/>' +
        '<path class="jr-c-hijab" d="M10.2 8.8 Q11 4.4 15.6 4.4 Q19.6 4.6 20.4 8.6 Q16.6 6.6 10.2 8.8 Z"/></g>' +
        '<circle cx="12.2" cy="10.4" r=".85" fill="#14140F"/>' +
        '<path d="M10.9 12.6 Q12 13.3 13.1 12.9" fill="none" stroke="#14140F" stroke-width=".75" stroke-linecap="round"/>' +
      '</g></g></svg>';
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
      var c = curLevel(lv);
      if (c > NL) return { h: t.bDoneTitle, p: welcome(t.bDoneSub), c: t.bDoneCta };
      return { h: t.plan + " · " + fmt(t.planLv, { n: num(c), name: lvName(c) }), p: L2(LVD(c).goal), c: t.planCta };
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
        '<div class="jr-copy"><h2 id="jr-banner-h"></h2><p></p><div class="jr-plan" hidden></div></div>' +
        '<button type="button" class="btn btn-primary jr-cta" data-journey-open><span></span>' + ICON.arrow + '</button>' +
      '</div>';
    hero.parentNode.insertBefore(banner, hero.nextSibling);
    updateBanner();
  }
  function updateBanner() {
    if (!banner) return;
    setTimeout(function () { emit("masarok:journey-banner", {}); }, 0);
    var b = bannerText();
    banner.querySelector("h2").textContent = b.h;
    banner.querySelector(".jr-copy p").textContent = b.p;
    banner.querySelector(".jr-cta span").textContent = b.c;
    // the plan card: progress, the next small task, time and the next real date
    var plan = banner.querySelector(".jr-plan"), lv = level();
    var c = lv ? curLevel(lv) : 1, ids = lv ? levelSteps(lv, Math.min(c, NL)).filter(function (id) { return !isDone(lv, id); }) : [], i = 0;
    banner.classList.toggle("is-plan", !!(st.started && lv && c <= NL));
    if (!(st.started && lv && c <= NL)) { plan.hidden = true; plan.innerHTML = ""; return; }
    var d = lvCleared(lv), task = nextThing(lv, c), est = ids[0] && EST[ids[0]] ? EST[ids[0]][lang === "ar" ? 1 : 0] : "", dl = ids[0] ? dlFor(ids[0]) : null;
    plan.hidden = false;
    plan.innerHTML = '<div class="jr-plan-bar"><i style="width:' + Math.round(d / NL * 100) + '%"></i></div>' +
      (task ? '<p class="jr-plan-task">' + starsHtml(lvState(lv, c).stars) + " " + esc(task) + '</p>' : "") +
      '<div class="jr-plan-chips">' + (est ? '<span>⏱ ' + esc(est) + '</span>' : "") +
      (dl ? '<span>⏰ ' + esc((DLT[ids[0]] === "start" ? t.startsOn : t.nextDl) + ": " + dl.title) + ' · ' + esc(dl.date) + '</span>' : "") + '</div>';
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
      var c = curLevel(lv);
      sub = c > NL ? t.done : fmt(t.fabLv, { n: num(c) });
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
        '<div class="jr-track" aria-hidden="true"><div class="jr-lane"><span class="jr-runner">' + runner() + '</span></div><div class="sadu"></div></div>' +
        '<button type="button" class="jr-x" data-journey-close aria-label="' + esc(t.close) + '">×</button>' +
        '<div class="jr-body"></div>' +
        '<p class="jr-live" aria-live="polite"></p>' +
      '</div>';
    document.body.appendChild(panel);
    live = panel.querySelector(".jr-live");
    panel.addEventListener("click", onPanelClick);
    panel.addEventListener("change", onTask);
    panel.addEventListener("submit", onCheck);
    panel.addEventListener("keydown", function (e) {
      if (tourEl) { if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); tourEnd(false); } else if (e.key === "Tab") tourTrap(e); return; }
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
    if (!st.started || !lv) { screen = !st.stage ? "stage" : !st.level ? "level" : "where"; tmp = { stage: st.stage }; }
    else if (!avatar()) { screen = "avatar"; tmp = {}; } // students from before avatars choose theirs once
    else screen = "main";
    viewing = null; resetArm = false;
    panel.hidden = false;
    document.documentElement.classList.add("jr-open");
    render(true);
    if (screen === "main" && !st.tour) setTimeout(tourStart, reduced() ? 50 : 500);
  }
  function close() {
    if (tourEl && !tourEl.hidden) tourEl.hidden = true;
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
    } else if (screen === "profile") {
      var p = tmp.prof || (tmp.prof = Object.assign({}, st.profile || {}));
      h = eyebrow + '<h2 id="jr-title">' + esc(t.pT) + '</h2><p class="jr-sub">' + esc(t.pSub) + '</p>' +
        '<div class="jr-prof">' + ["offer", "eng", "sch", "start"].map(function (q) {
          return '<fieldset><legend>' + esc(t.pQ[q]) + '</legend><div class="jr-chips">' + PROF[q].map(function (a) {
            return '<button type="button" class="jr-chip" data-prof="' + q + ':' + a + '" aria-pressed="' + (p[q] === a) + '">' + esc(t.pA[q][a]) + '</button>';
          }).join("") + '</div></fieldset>';
        }).join("") + '</div>' +
        '<div class="jr-actions"><button type="button" class="btn btn-primary" data-prof-go>' + esc(t.pGo) + ICON.arrow + '</button>' +
        '<button type="button" class="jr-textbtn" data-prof-skip>' + esc(st.started ? t.back : t.pSkip) + '</button></div>';
    } else if (screen === "where") {
      var M = window.Masarok, cs = M && M.countries ? M.countries() : [];
      if (tmp.cc === undefined) { var cur0 = M && M.current ? M.current() : {}; tmp.cc = cur0.cc || null; tmp.uni = cur0.uni || null; }
      var us = tmp.cc && M.unis ? M.unis(tmp.cc) : [];
      h = eyebrow + '<h2 id="jr-title">' + esc(t.whereT) + '</h2><p class="jr-sub">' + esc(t.whereSub) + '</p>' +
        '<div class="jr-chips jr-cc">' + cs.map(function (c) { return '<button type="button" class="jr-chip" data-cc="' + c.cc + '" aria-pressed="' + (tmp.cc === c.cc) + '">' + (FLAGS[c.cc] || "") + " " + esc(c.name) + "</button>"; }).join("") +
        '<button type="button" class="jr-chip" data-cc="" aria-pressed="' + (!tmp.cc) + '">' + esc(t.whereNone) + "</button></div>" +
        (us.length ? '<label class="jr-uni"><span>' + esc(t.uniL) + '</span><select data-uni-sel><option value="">' + esc(t.uniNone) + "</option>" +
          us.map(function (u) { return '<option value="' + u.id + '"' + (tmp.uni === u.id ? " selected" : "") + ">" + esc(u.name) + "</option>"; }).join("") + "</select></label>" : "") +
        '<div class="jr-actions"><button type="button" class="btn btn-primary" data-where-go>' + esc(t.cont) + ICON.arrow + '</button>' +
        '<button type="button" class="jr-textbtn" data-go="level">' + esc(t.back) + '</button></div>';
    } else if (screen === "avatar") {
      var av = tmp.av || (tmp.av = avatar() || { g: "m", skin: 1 });
      h = eyebrow + '<h2 id="jr-title">' + esc(t.avT) + '</h2><p class="jr-sub">' + esc(t.avSub) + '</p>' +
        '<div class="jr-avs">' + ["m", "f"].map(function (g) {
          return '<button type="button" class="jr-av-card" data-av-g="' + g + '" aria-pressed="' + (av.g === g) + '"><span class="jr-av-prev" data-av="' + g + '" data-skin="' + av.skin + '">' + figure("") + "</span><b>" + esc(g === "m" ? t.avM : t.avF) + "</b></button>";
        }).join("") + "</div>" +
        '<fieldset class="jr-skins"><legend>' + esc(t.skinL) + "</legend>" + [0, 1, 2].map(function (k) {
          return '<button type="button" class="jr-skin" data-av-skin="' + k + '" data-skin="' + k + '" aria-pressed="' + (av.skin === k) + '" aria-label="' + esc(t.skinL) + " " + (k + 1) + '"><i></i></button>';
        }).join("") + "</fieldset>" +
        '<div class="jr-actions"><button type="button" class="btn btn-primary" data-av-go>' + esc(t.avGo) + ICON.arrow + "</button></div>";
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
    emit("masarok:journey-render", { screen: screen });
    if (focus) panel.querySelector(".jr-sheet").scrollTop = 0;
    if (screen === "main") placeClimber();
    if (focus) {
      var target = body.querySelector("#jr-title");
      if (target) { target.setAttribute("tabindex", "-1"); target.focus({ preventScroll: true }); }
    }
  }

  function renderMain(eyebrow) {
    var lv = level(), V = vars(lv), v = V._v;
    var cur = curLevel(lv), finished = cur > NL, show = viewing === null ? Math.min(cur, NL) - 1 : viewing;
    var cn = window.MasarokCountry && pick().cc ? window.MasarokCountry.name(pick().cc) : "";
    var meta = pick().hasUni ? fmt(t.meta, { uni: esc(v.short), city: esc(v.city) }) : esc(cn ? (lang === "ar" ? "لأي جامعة في " + cn : "For any university in " + cn) : t.metaAll);
    var d = lvCleared(lv);

    var pf = lv === "foundation" && window.MasarokCountry && pick().cc ? window.MasarokCountry.pathF(pick().cc) : null;
    var h = eyebrow + '<h2 id="jr-title">' + esc(pf || t.pathTitle[lv]) + '</h2>' +
      '<div class="jr-meta"><span>' + meta + '</span>' +
      '<button type="button" class="jr-textbtn" data-go="level">' + esc(t.changeLevel) + '</button>' +
      '<button type="button" class="jr-textbtn" data-change-uni>' + esc(t.changeUni) + '</button>' +
      '<button type="button" class="jr-textbtn" data-go="profile">' + esc(t.pEdit) + '</button></div>';
    if (st.profile && st.profile.start === "soon" && !finished && NL - cur >= 5) h += '<p class="jr-welcome jr-warn">' + esc(t.tight) + '</p>';

    if (st.welcome && !finished) h += '<p class="jr-welcome">' + esc(fmt(t.welcomeLv, { n: num(cur), name: lvName(cur) })) + '</p>';
    else if (st.stage === "dream" && cur === 1) h += '<p class="jr-welcome">' + esc(t.dreamNote) + '</p>';

    // the staircase: one stair per level
    h += '<div class="jr-stairs-wrap"><div class="jr-progress"><span>' + esc(fmt(t.lvProg, { d: num(d) })) + '</span><i><b style="width:' + Math.round(d / NL * 100) + '%"></b></i></div>' +
      '<ol class="jr-stairs jr-levels" style="--n:' + NL + '">';
    for (var i = 0; i < NL; i++) {
      var ls = lvState(lv, i + 1), open = lvOpen(lv, i + 1);
      var state = ls.cleared ? "done" : open ? "open" : "locked";
      var stateTxt = (state === "done" ? t.done : state === "open" ? t.nextStep : t.lockedLbl) + " · " + fmt(t.stars, { n: num(ls.stars) });
      h += '<li class="jr-step is-' + state + (i === show ? " is-viewing" : "") + '" style="--h:' + stepH(i, NL).toFixed(1) + '%">' +
        '<button type="button" data-step="' + i + '" aria-label="' + esc(fmt(t.lvLabel, { n: num(i + 1), name: lvName(i + 1), state: stateTxt })) + '"' +
        (state === "locked" ? ' aria-disabled="true"' : "") + (i === show ? ' aria-current="step"' : "") + '>' +
        '<span class="jr-num">' + num(i + 1) + '</span>' +
        (state === "locked" ? '<span class="jr-ic">' + ICON.lock + '</span>' : starsHtml(ls.stars)) +
        '</button></li>';
    }
    h += '</ol><div class="jr-climber" aria-hidden="true">' + figure(finished ? "is-cheering" : "") + '</div></div>';

    // the level card
    if (finished && viewing === null) {
      h += '<article class="jr-card jr-finished"><p class="jr-kicker">' + esc(fmt(t.lvProg, { d: num(d) })) + '</p>' +
        '<h3>' + esc(t.lvFinT) + '</h3><p>' + esc(welcome(t.finishedB)) + '</p>' +
        '<div class="jr-links">' + linkHtml("lessons", V) + '</div></article>';
    } else {
      h += levelCard(lv, show + 1, V, cur);
    }

    // every level and the real steps inside it
    h += '<details class="jr-path"><summary>' + esc(t.lvPath) + '</summary><ol>';
    for (var k = 1; k <= NL; k++) {
      var s2 = lvState(lv, k), st2 = s2.cleared ? "done" : lvOpen(lv, k) ? "open" : "locked";
      var steps = levelSteps(lv, k).map(function (id) { return '<small class="jr-path-step' + (isDone(lv, id) ? " is-done" : "") + '">' + (isDone(lv, id) ? "✓ " : "· ") + title(id, V) + "</small>"; }).join("");
      h += '<li class="is-' + st2 + '"><button type="button" data-step="' + (k - 1) + '"' + (st2 === "locked" ? ' aria-disabled="true"' : "") + '>' +
        '<span class="jr-dot">' + (st2 === "done" ? ICON.tick : st2 === "locked" ? ICON.lock : num(k)) + '</span>' +
        '<span><b>' + esc(fmt(t.lvKicker, { n: num(k), name: lvName(k) })) + '</b> ' + starsHtml(s2.stars) + '<br>' + esc(L2(LVD(k).goal)) + steps + '</span></button></li>';
    }
    h += '</ol></details>';

    h += '<div class="jr-foot"><span>' + esc(t.saved) + '</span><button type="button" class="jr-textbtn" data-tour-start>' + esc(t.tourAgain) + '</button><button type="button" class="jr-textbtn" data-reset>' + esc(resetArm ? t.startOverSure : t.startOver) + '</button></div>';
    return h;
  }

  // one level: Learn (an Academy lesson), Check (3 questions), Do (the real steps)
  var chkOpen = {};
  function levelCard(lv, n, V, cur) {
    var D = LVD(n), s = lvState(lv, n), M = LVM(), les = M.learn(n);
    var kicker = (n === cur ? esc(t.nextStep) + " · " : "") + esc(fmt(t.lvKicker, { n: num(n), name: lvName(n) })) + " · " + starsHtml(s.stars) +
      (s.cleared ? ' · <span class="jr-tag is-done">' + esc(t.done) + "</span>" : "");
    // Learn
    var learn = '<li class="jr-part' + (s.learn ? " is-on" : "") + '"><div class="jr-part-h"><span class="jr-pstar" aria-hidden="true">★</span><b>' + esc(t.learn) + '</b><small>' + esc(fmt(t.learnSub, { m: num(les.mins) })) + '</small>' +
      (s.learn ? '<span class="jr-tag is-done">' + esc(t.lessonDone) + "</span>" : "") + "</div>" +
      '<a class="jr-lesson" href="' + esc(M.lessonUrl(n)) + '" data-jr-lesson><span class="jr-lesson-ic" aria-hidden="true">' + les.icon + '</span><span class="jr-lesson-tx"><b>' + esc(L2(les.t)) + "</b><small>" + esc(L2(les.d)) + '</small></span><span class="jr-lesson-go">' + esc(s.learn ? t.lessonReview : t.lessonGo) + ICON.arrow + "</span></a></li>";
    // Do
    var ids = levelSteps(lv, n), doBody;
    if (!ids.length) {
      doBody = '<p class="jr-p">' + esc(t.noDo) + "</p>";
    } else {
      var all = stepsFor(lv), cIdx = currentIndex(lv);
      doBody = ids.map(function (id) { return cardHtml(lv, all.indexOf(id), V, cIdx, true); }).join("");
    }
    var doo = '<li class="jr-part' + (s["do"] ? " is-on" : "") + '"><div class="jr-part-h"><span class="jr-pstar" aria-hidden="true">★</span><b>' + esc(t.doT) + "</b><small>" + esc(t.doSub) + "</small>" +
      (s["do"] ? '<span class="jr-tag is-done">' + esc(t.done) + "</span>" : "") + "</div>" + doBody + "</li>";
    // Check
    var sc = M.checkScore(n), chk;
    if (s.check && !chkOpen[n]) {
      chk = '<p class="jr-p">✓ ' + esc(fmt(t.checkDoneT, { c: num(sc[0]) })) + ' <button type="button" class="jr-textbtn" data-chk-retry="' + n + '">' + esc(t.checkRetry) + "</button></p>";
    } else {
      chk = '<form class="jr-chk" data-chk="' + n + '">' + D.check.map(function (q, qi) {
        return '<fieldset><legend><b>' + num(qi + 1) + ".</b> " + esc(L2(q.s)) + "</legend>" + q.o.map(function (o, oi) {
          return '<label class="jr-opt-row"><input type="radio" name="q' + n + "-" + qi + '" value="' + oi + '"><span>' + esc(L2(o)) + "</span></label>";
        }).join("") + '<p class="jr-why" hidden></p></fieldset>';
      }).join("") + '<p class="jr-chk-msg" role="status"></p><div class="jr-actions"><button type="submit" class="btn btn-primary">' + esc(t.checkGo) + "</button></div></form>";
    }
    var check = '<li class="jr-part' + (s.check ? " is-on" : "") + '"><div class="jr-part-h"><span class="jr-pstar" aria-hidden="true">★</span><b>' + esc(t.checkT) + "</b><small>" + esc(t.checkSub) + "</small>" +
      (s.check ? '<span class="jr-tag is-done">' + esc(t.done) + "</span>" : "") + "</div>" + chk + "</li>";
    var foot = s.cleared
      ? (n < NL ? '<p class="jr-lvnext">🎉 ' + esc(t.lvCleared) + ' <button type="button" class="jr-textbtn" data-step="' + n + '">' + esc(fmt(t.lvGoNext, { n: num(n + 1) })) + "</button></p>" : "")
      : '<p class="jr-lvnext">' + esc(t.lvRule) + (n < NL ? " " + esc(fmt(t.lvNext, { n: num(n + 1), name: lvName(n + 1) })) : "") + "</p>";
    return '<article class="jr-card jr-lvcard' + (n === cur ? " is-next" : "") + '" aria-labelledby="jr-card-h">' +
      '<p class="jr-kicker">' + kicker + "</p>" +
      '<h3 id="jr-card-h" tabindex="-1">' + esc(L2(D.goal)) + "</h3>" +
      '<p class="jr-lvsub">' + esc(L2(D.sub)) + "</p>" +
      '<ol class="jr-trio">' + learn + check + doo + "</ol>" + foot + "</article>";
  }

  function linkHtml(key, V) {
    var l = L[key], href = l.href, label = fmt(l[lang], V);
    if (l.u) { href = V._v[l.u]; if (!href) return ""; }
    if (!label || /\{|\}/.test(label) || label === "") return "";
    var ext = /^https?:/.test(href);
    return '<a href="' + esc(href) + '"' + (ext ? ' rel="noopener" target="_blank"' : ' data-jr-anchor') + '>' + label + (ext ? '<span class="jr-ext" aria-hidden="true">↗</span>' : "") + '</a>';
  }

  function cardHtml(lv, i, V, cur, embedded) {
    var ids = stepsFor(lv), id = ids[i], s = S[id], ov = MCj(id), c = ov ? ov[lang] : s[lang], n = ids.length;
    var state = isDone(lv, id) ? (doneMap(lv)[id] === "skip" ? "skip" : "done") : "open";
    var kicker = (i === cur ? esc(t.nextStep) + ' · ' : "") + esc(fmt(t.stepN, { n: num(i + 1), total: num(n) })) +
      (state === "done" ? ' · <span class="jr-tag is-done">' + esc(t.done) + '</span>' : state === "skip" ? ' · <span class="jr-tag">' + esc(t.skipped) + '</span>' : "") +
      (s.optional ? ' · <span class="jr-tag">' + esc(t.optional) + '</span>' : "");
    var list = taskList(lv, id, V), tm = taskMap(lv, id), doneAll = state !== "open";
    var td = 0; list.forEach(function (x, k) { if (doneAll || tm[k]) td++; });
    var what = list.map(function (w, k) {
      var on = doneAll || !!tm[k];
      return '<li class="' + (on ? "is-on" : "") + '"><label><input type="checkbox" data-task="' + id + ':' + k + '"' + (on ? " checked" : "") + (doneAll ? " disabled" : "") + '><span>' + w + '</span></label></li>';
    }).join("");
    var est = EST[id] ? EST[id][lang === "ar" ? 1 : 0] : "";
    var dl = state === "open" ? dlFor(id) : null;
    var facts = (est ? '<div class="jr-fact"><span>' + esc(t.takes) + '</span><b>' + esc(est) + '</b></div>' : "") +
      (dl ? '<div class="jr-fact jr-fact-dl"><span>' + esc(DLT[id] === "start" ? t.startsOn : t.nextDl) + '</span><b>' + esc(dl.title) + '</b>' +
        '<small>' + esc(dl.date) + ' · ' + esc(dl.when) + (dl.expected ? ' · ' + esc(t.expected) : "") + '</small>' +
        (DLT[id] !== "start" ? '<div class="jr-dl-acts"><button type="button" class="jr-textbtn" data-remind="' + dl.id + '" aria-pressed="' + dl.saved + '">' + esc(dl.saved ? "✓ " + t.reminded : t.remind) + '</button><a href="#deadlines" data-jr-anchor>' + esc(t.allDl) + '</a></div>' : "") + '</div>' : "");
    var note = (id === "qubool" && st.profile && st.profile.sch === "self") ? '<p class="jr-welcome">' + esc(t.selfNote) + '</p>' : "";
    var links = ov && ov.links ? ov.links.map(function (l) { return '<a href="' + esc(l[2]) + '" rel="noopener" target="_blank">' + esc(lang === "ar" ? l[1] : l[0]) + '<span class="jr-ext" aria-hidden="true">↗</span></a>'; }).join("") : s.links.map(function (k) { return linkHtml(k, V); }).join("");
    var actions = state === "open"
      ? '<button type="button" class="btn btn-primary" data-done="' + id + '">' + ICON.tick + esc(t.markDone) + '</button>' +
        (s.optional ? '<button type="button" class="btn jr-btn-ghost" data-skip="' + id + '">' + esc(t.skip) + '</button>' : "")
      : '<button type="button" class="jr-textbtn" data-undo="' + id + '">' + esc(t.undo) + '</button>';
    if (embedded) kicker = state === "done" ? '<span class="jr-tag is-done">' + esc(t.done) + '</span>' : state === "skip" ? '<span class="jr-tag">' + esc(t.skipped) + '</span>' : s.optional ? '<span class="jr-tag">' + esc(t.optional) + '</span>' : "";
    return '<' + (embedded ? 'section class="jr-card jr-sub"' : 'article class="jr-card' + (i === cur ? " is-next" : "") + '" aria-labelledby="jr-card-h"') + '>' +
      (kicker ? '<p class="jr-kicker">' + kicker + '</p>' : "") +
      (embedded ? '<h4 class="jr-sub-h">' + title(id, V) + '</h4>' : '<h3 id="jr-card-h" tabindex="-1">' + title(id, V) + '</h3>') +
      '<div class="jr-cols"><div><h4>' + esc(t.why) + '</h4><p>' + fmt(c.why, V) + '</p></div>' +
      '<div><h4>' + esc(t.tasks) + ' <span class="jr-tn">' + esc(fmt(t.tasksN, { d: num(td), n: num(list.length) })) + '</span></h4><ul class="jr-tasks">' + what + '</ul></div></div>' +
      (facts ? '<div class="jr-facts">' + facts + '</div>' : "") + note +
      (links ? '<div class="jr-links-wrap"><h4>' + esc(t.links) + '</h4><div class="jr-links">' + links + '</div></div>' : "") +
      '<div class="jr-actions">' + actions + '</div></' + (embedded ? "section" : "article") + '>';
  }

  function stepH(i, n) { return 24 + 44 * (n === 1 ? 1 : i / (n - 1)); } // % of the staircase height

  // put the character on the step being shown, walking from where it was
  var climberAt = null;
  function placeClimber() {
    var wrap = panel.querySelector(".jr-stairs-wrap"); if (!wrap) return;
    var lv = level(), n = NL, cur = curLevel(lv) - 1;
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
      st.level = lv; save(); startJourney(); return;
    }
    if ((el = e.target.closest("[data-prof]"))) {
      var qa = el.getAttribute("data-prof").split(":"); tmp.prof = tmp.prof || {};
      tmp.prof[qa[0]] = tmp.prof[qa[0]] === qa[1] ? undefined : qa[1];
      el.parentNode.querySelectorAll(".jr-chip").forEach(function (b) { b.setAttribute("aria-pressed", String(b === el && tmp.prof[qa[0]] === qa[1])); });
      return;
    }
    if (e.target.closest("[data-prof-go]") || e.target.closest("[data-prof-skip]")) {
      var go = !!e.target.closest("[data-prof-go]"), lvp = st.level || level();
      if (go) { st.profile = Object.assign({}, tmp.prof || {}); applyProfile(lvp, st.profile); }
      else if (!st.profile) st.profile = {};
      tmp.level = lvp; save();
      if (st.started) { screen = "main"; viewing = null; refresh(); render(true); return; }
      screen = "avatar"; render(true); return;
    }
    if ((el = e.target.closest("[data-remind]"))) {
      var M = window.MasarokDeadlines; if (!M) return;
      var on = M.toggle(el.getAttribute("data-remind"));
      el.setAttribute("aria-pressed", String(on)); el.textContent = on ? "✓ " + t.reminded : t.remind;
      return;
    }
    if ((el = e.target.closest("[data-go]"))) { screen = el.getAttribute("data-go"); if (screen === "level") tmp.level = level(); if (screen === "profile") tmp.prof = Object.assign({}, st.profile || {}); render(true); return; }
    if (e.target.closest("[data-change-uni]")) { close(); if (window.Masarok && window.Masarok.openPicker) window.Masarok.openPicker(2); return; }
    if ((el = e.target.closest("[data-cc]"))) {
      tmp.cc = el.getAttribute("data-cc") || null; tmp.uni = null; render(false);
      var b2 = panel.querySelector('[data-cc="' + (tmp.cc || "") + '"]'); if (b2) b2.focus(); return;
    }
    if (e.target.closest("[data-where-go]")) {
      var M2 = window.Masarok;
      if (M2 && M2.choose) M2.choose(tmp.cc ? { country: tmp.cc, uni: tmp.uni, level: st.level } : { level: st.level });
      if (st.started) { screen = "main"; viewing = null; refresh(); render(true); return; }
      if (st.profile) { screen = "avatar"; render(true); return; }
      tmp.prof = {}; screen = "profile"; render(true); return;
    }
    if ((el = e.target.closest("[data-av-g]"))) { tmp.av = tmp.av || {}; tmp.av.g = el.getAttribute("data-av-g"); render(false); var b3 = panel.querySelector('[data-av-g="' + tmp.av.g + '"]'); if (b3) b3.focus(); return; }
    if ((el = e.target.closest("[data-av-skin]"))) { tmp.av = tmp.av || {}; tmp.av.skin = +el.getAttribute("data-av-skin"); render(false); var b4 = panel.querySelector('[data-av-skin="' + tmp.av.skin + '"]'); if (b4) b4.focus(); return; }
    if (e.target.closest("[data-av-go]")) {
      try { localStorage.setItem(AVK, JSON.stringify({ g: (tmp.av && tmp.av.g) || "m", skin: tmp.av && tmp.av.skin != null ? tmp.av.skin : 1 })); } catch (x) {}
      applyAvatar(); emit("masarok:avatar", {});
      if (st.started) { screen = "main"; viewing = null; refresh(); render(true); if (!st.tour) setTimeout(tourStart, reduced() ? 50 : 500); return; }
      if (st.stage === "applying") { tmp.level = st.level || level(); screen = "applied"; render(true); return; }
      startJourney(); return;
    }
    if (e.target.closest("[data-tour-start]")) { tourStart(); return; }
    if ((el = e.target.closest("[data-chk-retry]"))) { chkOpen[+el.getAttribute("data-chk-retry")] = true; render(false); focusCard(); return; }
    if ((el = e.target.closest("[data-chk-again]"))) {
      var f0 = el.closest("form");
      f0.querySelectorAll("input").forEach(function (x) { x.checked = false; x.disabled = false; });
      f0.querySelectorAll("fieldset").forEach(function (x) { x.classList.remove("is-right", "is-wrong"); x.querySelector(".jr-why").hidden = true; });
      f0.querySelectorAll(".is-answer").forEach(function (x) { x.classList.remove("is-answer"); });
      f0.querySelector(".jr-chk-msg").textContent = "";
      f0.querySelector(".jr-actions").innerHTML = '<button type="submit" class="btn btn-primary">' + esc(t.checkGo) + "</button>";
      f0.querySelector("input").focus(); return;
    }
    if (e.target.closest("[data-chk-done]")) { render(false); focusCard(); return; }
    if ((el = e.target.closest("[data-step]"))) {
      var i = +el.getAttribute("data-step"), lv2 = level(), cur = curLevel(lv2) - 1;
      if (el.getAttribute("aria-disabled") === "true") {
        say(fmt(t.lvLocked, { n: num(Math.min(cur, NL - 1) + 1) }));
        el.classList.remove("is-nudge"); void el.offsetWidth; el.classList.add("is-nudge");
        return;
      }
      viewing = i === cur ? null : i;
      render(false);
      focusCard();
      return;
    }
    if ((el = e.target.closest("[data-done]")) || (el = e.target.closest("[data-skip]"))) {
      var lv3 = level(), id = el.getAttribute("data-done") || el.getAttribute("data-skip"), c3 = curLevel(lv3);
      doneMap(lv3)[id] = el.hasAttribute("data-skip") ? "skip" : "done";
      st.welcome = false; save(); viewing = null; refresh();
      var dl3 = dlFor(id);
      render(false);
      emit("masarok:journey", { type: "step", id: id, lv: lv3, skip: el.hasAttribute("data-skip"), early: !!(dl3 && DLT[id] !== "start" && dl3.days >= 30) });
      var nc = curLevel(lv3);
      if (nc > NL) say(t.lvFinT); else if (nc > c3) say(fmt(t.lvOpened, { n: num(nc) }));
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
  function onTask(e) {
    if (e.target.matches && e.target.matches("[data-uni-sel]")) { tmp.uni = e.target.value || null; return; }
    var cb = e.target.closest && e.target.closest("input[data-task]");
    if (!cb) return;
    var pr = cb.getAttribute("data-task").split(":"), id = pr[0], k = +pr[1], lv = level();
    var tm = taskMap(lv, id); tm[k] = cb.checked ? 1 : 0;
    cb.closest("li").classList.toggle("is-on", cb.checked);
    var V = vars(lv), list = taskList(lv, id, V), d = 0;
    list.forEach(function (x, j) { if (tm[j]) d++; });
    var tn = cb.closest(".jr-card").querySelector(".jr-tn"); if (tn) tn.textContent = fmt(t.tasksN, { d: num(d), n: num(list.length) });
    save(); refresh();
    emit("masarok:journey", { type: "task", id: id, lv: lv, on: cb.checked, el: cb });
    if (d === list.length && !isDone(lv, id)) {
      var dlA = dlFor(id), cA = curLevel(lv);
      doneMap(lv)[id] = "done"; st.welcome = false; save(); viewing = null; refresh();
      setTimeout(function () {
        render(false);
        emit("masarok:journey", { type: "step", id: id, lv: lv, early: !!(dlA && DLT[id] !== "start" && dlA.days >= 30) });
        var nc = curLevel(lv);
        say(t.allTasks + (nc <= NL && nc > cA ? " " + fmt(t.lvOpened, { n: num(nc) }) : ""));
        focusCard(true);
      }, 450);
    }
  }
  function onCheck(e) {
    var f = e.target.closest && e.target.closest("form[data-chk]"); if (!f) return;
    e.preventDefault();
    var n = +f.getAttribute("data-chk"), D = LVD(n), right = 0, picks = [];
    D.check.forEach(function (q, qi) { picks.push(f.querySelector('input[name="q' + n + "-" + qi + '"]:checked')); });
    var msg = f.querySelector(".jr-chk-msg");
    if (picks.some(function (x) { return !x; })) { msg.textContent = t.checkAll; return; }
    D.check.forEach(function (q, qi) {
      var c = picks[qi], ok = +c.value === q.a, fs = c.closest("fieldset");
      if (ok) right++;
      fs.classList.add(ok ? "is-right" : "is-wrong");
      var ans = fs.querySelector('input[value="' + q.a + '"]'); if (ans) ans.closest("label").classList.add("is-answer");
      var w = fs.querySelector(".jr-why"); w.hidden = false; w.textContent = (ok ? t.right : t.wrongA) + " " + L2(q.x);
    });
    f.querySelectorAll("input").forEach(function (x) { x.disabled = true; });
    var lv = level(), was = lvState(lv, n).cleared, pass = right >= 2;
    LVM().saveCheck(n, right);
    msg.textContent = fmt(pass ? t.checkPass : t.checkFail, { c: num(right) });
    var acts = f.querySelector(".jr-actions");
    acts.innerHTML = pass ? '<button type="button" class="btn btn-primary" data-chk-done>' + esc(t.cont || "OK") + ICON.arrow + "</button>" : '<button type="button" class="btn jr-btn-ghost" data-chk-again>' + esc(t.checkRetry) + "</button>";
    if (pass) {
      chkOpen[n] = false;
      if (window.MasarokGame && window.MasarokGame.award) window.MasarokGame.award("check:" + n, 1, acts.firstChild);
      refresh();
      if (!was && lvState(lv, n).cleared) { emit("masarok:journey", { type: "level", n: n }); say(t.lvCleared + (n < NL ? " " + fmt(t.lvOpened, { n: num(n + 1) }) : "")); }
    }
  }
  // the first questions, in order: stage → degree → where → about you → avatar → (what's done) → the journey and its tour
  function chooseLevel(lv) {
    tmp.level = lv; st.level = lv; save();
    if (!st.started) { screen = "where"; render(true); return; }
    var M = window.Masarok; if (M && M.choose) M.choose({ level: lv });
    viewing = null; screen = "main"; refresh(); render(true);
  }
  function startJourney() {
    st.started = true; save(); viewing = null; screen = "main"; refresh(); render(true);
    if (!st.tour) setTimeout(tourStart, reduced() ? 50 : 500);
  }
  function focusCard(showStairs) {
    var hd = panel.querySelector("#jr-card-h") || panel.querySelector(".jr-finished h3");
    if (!hd) return;
    hd.setAttribute("tabindex", "-1"); hd.focus({ preventScroll: true });
    var to = showStairs ? panel.querySelector(".jr-stairs-wrap") : hd.closest(".jr-card");
    if (to && to.scrollIntoView) to.scrollIntoView({ block: showStairs ? "center" : "nearest", behavior: reduced() ? "auto" : "smooth" });
  }

  // ---------- the tour: the avatar points at each part of the journey screen ----------
  var TOUR = [".jr-stairs-wrap", ".gm-bar", ".jr-lvcard .jr-part:nth-child(1)", ".jr-lvcard .jr-part:nth-child(2)", ".jr-lvcard .jr-part:nth-child(3) .jr-part-h", ".jr-lvnext", ".jm-open", ".jr-lvcard .jr-lesson"];
  var tourEl = null, tourI = 0, tourT = null;
  function tourStart() {
    if (!panel || panel.hidden) return;
    if (screen !== "main" || viewing !== null) { screen = "main"; viewing = null; render(false); }
    tourI = 0;
    if (!tourEl) {
      tourEl = document.createElement("div"); tourEl.className = "jr-tour";
      tourEl.innerHTML = '<div class="jr-tour-hole"></div><div class="jr-tour-bub" role="dialog" aria-modal="true" aria-labelledby="jr-tour-txt">' +
        '<div class="jr-tour-face" aria-hidden="true">' + figure("is-waving") + '</div><div class="jr-tour-in"><p id="jr-tour-txt" class="jr-tour-txt"></p>' +
        '<div class="jr-tour-acts"><small class="jr-tour-n"></small><button type="button" class="jr-textbtn" data-tour-skip>' + esc(t.tourSkip) + '</button>' +
        '<button type="button" class="btn jr-btn-ghost" data-tour-back>' + esc(t.tourBack) + '</button><button type="button" class="btn btn-primary" data-tour-next></button></div></div></div>';
      tourEl.addEventListener("click", function (e) {
        e.stopPropagation();
        if (e.target.closest("[data-tour-skip]")) tourEnd(false);
        else if (e.target.closest("[data-tour-back]")) { tourI = Math.max(0, tourI - 1); tourShow(-1); }
        else if (e.target.closest("[data-tour-next]")) { if (tourI >= TOUR.length - 1) tourEnd(true); else { tourI++; tourShow(1); } }
      });
      panel.appendChild(tourEl);
      panel.querySelector(".jr-sheet").addEventListener("scroll", tourPlace, { passive: true });
      window.addEventListener("resize", tourPlace);
    }
    tourEl.hidden = false;
    tourShow(1);
  }
  function tourTarget() { return panel.querySelector(TOUR[tourI]); }
  function tourShow(dir) {
    // skip parts that aren't on the screen (for example the map button before the map loads)
    while (!tourTarget() && tourI > 0 && tourI < TOUR.length - 1) tourI += dir < 0 ? -1 : 1;
    var tg = tourTarget();
    tourEl.querySelector(".jr-tour-txt").textContent = t.tour[tourI];
    tourEl.querySelector(".jr-tour-n").textContent = fmt(t.tourN, { n: num(tourI + 1), total: "", t: num(TOUR.length) });
    tourEl.querySelector("[data-tour-back]").hidden = tourI === 0;
    var nx = tourEl.querySelector("[data-tour-next]"); nx.innerHTML = esc(tourI >= TOUR.length - 1 ? t.tourGo : t.tourNext) + ICON.arrow;
    if (tg && tg.scrollIntoView) tg.scrollIntoView({ block: "center", behavior: reduced() ? "auto" : "smooth" });
    tourEl.classList.add("is-moving");
    clearTimeout(tourT); tourT = setTimeout(function () { tourEl.classList.remove("is-moving"); tourPlace(); nx.focus({ preventScroll: true }); }, reduced() ? 0 : 380);
    say(t.tour[tourI]);
  }
  function tourPlace() {
    if (!tourEl || tourEl.hidden) return;
    var tg = tourTarget(), hole = tourEl.querySelector(".jr-tour-hole"), bub = tourEl.querySelector(".jr-tour-bub");
    var vw = window.innerWidth, vh = window.innerHeight;
    if (!tg) { hole.style.cssText = "left:50%;top:50%;width:0;height:0"; bub.style.top = Math.max(16, vh / 2 - bub.offsetHeight / 2) + "px"; return; }
    var r = tg.getBoundingClientRect(), pad = 8;
    var top = Math.max(8, r.top - pad), bottom = Math.min(vh - 8, r.bottom + pad);
    hole.style.left = Math.max(8, r.left - pad) + "px"; hole.style.width = Math.min(vw - 16, r.width + pad * 2) + "px";
    hole.style.top = top + "px"; hole.style.height = Math.max(0, bottom - top) + "px";
    var bh = bub.offsetHeight, below = vh - bottom, above = top;
    bub.style.top = (below >= bh + 16 ? bottom + 12 : above >= bh + 16 ? top - bh - 12 : Math.max(12, vh - bh - 12)) + "px";
  }
  function tourTrap(e) {
    var f = tourEl.querySelectorAll("button:not([hidden])"), first = f[0], last = f[f.length - 1];
    if (!tourEl.contains(document.activeElement)) { e.preventDefault(); first.focus(); return; }
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  function tourEnd(go) {
    if (!tourEl) return;
    tourEl.hidden = true; st.tour = 1; save();
    var l = panel.querySelector(".jr-lvcard .jr-lesson");
    if (go && l) { l.scrollIntoView({ block: "center", behavior: reduced() ? "auto" : "smooth" }); l.focus({ preventScroll: true }); }
    else { var h = panel.querySelector("#jr-title"); if (h) h.focus({ preventScroll: true }); }
  }

  function refresh() { updateBanner(); updateFab(); }
  function emit(name, detail) { try { document.dispatchEvent(new CustomEvent(name, { detail: detail })); } catch (e) {} }

  // ---------- for game.js (points and badges) ----------
  window.MasarokJourney = {
    state: function () { return st; }, level: level, steps: stepsFor, isDone: isDone, current: currentIndex,
    taskCount: function (lv, id) { return taskList(lv, id, vars(lv)).length; },
    taskDone: function (lv, id) { var tm = taskMap(lv, id), n = 0; tm.forEach(function (x) { if (x) n++; }); return n; },
    title: function (id) { return stripTags(title(id, vars(level()))); },
    open: function () { open(); }, isOpen: function () { return !!(panel && !panel.hidden); },
    figure: figure, onMain: function () { return screen === "main"; },
    levels: function () { var lv = level(), out = []; if (!lv || !window.MasarokLevels) return out; for (var n = 1; n <= NL; n++) { var x = lvState(lv, n); x.open = lvOpen(lv, n); x.name = lvName(n); x.goal = L2(LVD(n).goal); out.push(x); } return out; },
    levelNow: function () { var lv = level(); return lv && window.MasarokLevels ? curLevel(lv) : 1; },
    show: function (n) { viewing = n - 1; if (panel && !panel.hidden) { screen = "main"; render(false); focusCard(); } }
  };

  // ---------- start ----------
  function init() {
    // a returning student is greeted once per visit
    if (st.started && level() && (countDone(level()) > 0 || curLevel(level()) > 1)) st.welcome = true;
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

/* Masarok — flip cards
   Cards marked with data-flip="key" turn over when clicked and show more detail and links on the back.
   Used for "Your university at a glance", "Choose your route" and the scholarship tracks. */
(function () {
  var lang = (document.documentElement.lang || "en").slice(0, 2) === "ar" ? "ar" : "en";
  var AR = lang === "ar";
  function T(x) { return Array.isArray(x) ? x[AR ? 1 : 0] : x; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function reduced() { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); }

  var UI = {
    more: ["More info", "معلومات أكثر"],
    back: ["Back", "رجوع"],
    kicker: ["More about", "المزيد عن"],
    links: ["Useful links", "روابط مفيدة"],
    openHint: ["Show more about {t}", "اعرض المزيد عن {t}"],
    closeHint: ["Back to the card", "العودة إلى البطاقة"]
  };

  // Common links. Keys starting with "u:" come from the student's choices (see unis.js).
  var LK = {
    lists: ["2026–2027 university lists", "قوائم الجامعات 2026–2027", "https://object.moe.gov.sa/nasaq/cm/files/aldlyl-alastrshady-ltrtyb-qwaaem-aljamaeat-hsb-almjalat-2027-2026.pdf"],
    ruSearch: ["Recommended universities search", "البحث في الجامعات الموصى بها", "https://ru.moe.gov.sa/Search"],
    qubool: ["Qubool (uap.sa)", "منصة قبول (uap.sa)", "https://www.uap.sa/#scholarship"],
    program: ["Scholarship program", "برنامج الابتعاث", "https://sites.moe.gov.sa/scholarship-program/"],
    conditions: ["Scholarship conditions", "شروط الابتعاث", "https://sites.moe.gov.sa/scholarship-program/conditions/"],
    faq: ["Scholarship FAQ", "الأسئلة الشائعة للابتعاث", "https://sites.moe.gov.sa/scholarship-program/faqs/"],
    rd: ["Research & Development track", "مسار البحث والتطوير", "https://sites.moe.gov.sa/scholarship-program/paths/path-albahthwaltatwir/"],
    ielts: ["IELTS", "اختبار IELTS", "https://ielts.org"],
    web: ["{uni} website", "موقع {uni}", "u:web"],
    college: ["{college}", "{college}", "u:college-url"],
    union: ["{union}", "{union}", "u:union-url"],
    transport: ["{transport}", "{transport}", "u:transport-url"],
    bond: ["{bond}", "{bond}", "u:bond-url"],
    housing: ["Finding a place", "البحث عن سكن", "#housing"],
    budget: ["Budget planner", "حاسبة الميزانية", "#allowance"],
    arrival: ["Your first weeks", "أسابيعك الأولى", "#arrival"],
    options: ["Your study options", "خيارات الدراسة", "#options"],
    postgrad: ["Master's and PhD", "الماجستير والدكتوراه", "#postgrad"],
    studyAu: ["Study Australia", "Study Australia", "https://www.studyaustralia.gov.au/en"],
    commonApp: ["Common App", "Common App", "https://www.commonapp.org"],
    eduUsa: ["EducationUSA", "EducationUSA", "https://educationusa.state.gov"],
    sits: ["Study in the States", "Study in the States", "https://studyinthestates.dhs.gov"],
    ucas: ["UCAS", "UCAS", "https://www.ucas.com"],
    ukVisa: ["Student visa (GOV.UK)", "تأشيرة الطالب (GOV.UK)", "https://www.gov.uk/student-visa"],
    atas: ["ATAS certificate", "شهادة ATAS", "https://www.gov.uk/guidance/academic-technology-approval-scheme"],
    ukcisa: ["UKCISA", "UKCISA", "https://www.ukcisa.org.uk"],
    eduCa: ["EduCanada", "EduCanada", "https://www.educanada.ca"],
    ouac: ["OUAC (Ontario)", "OUAC (أونتاريو)", "https://www.ouac.on.ca"],
    caPermit: ["Study permit (IRCC)", "تصريح الدراسة (IRCC)", "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html"],
    caPal: ["Provincial attestation letter", "خطاب المقاطعة (PAL)", "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents/provincial-attestation-letter.html"],
    uniAssist: ["uni-assist", "uni-assist", "https://www.uni-assist.de"],
    anabin: ["anabin", "anabin", "https://anabin.kmk.org"],
    sig: ["Study in Germany", "Study in Germany", "https://www.study-in-germany.de"],
    daad: ["DAAD", "DAAD", "https://www.daad.de/en/"],
    testdaf: ["TestDaF", "TestDaF", "https://www.testdaf.de"],
    nus: ["NUS admissions", "القبول في NUS", "https://www.nus.edu.sg/oam"],
    ntu: ["NTU admissions", "القبول في NTU", "https://www.ntu.edu.sg/admissions"],
    smu: ["SMU admissions", "القبول في SMU", "https://admissions.smu.edu.sg"],
    nusgs: ["NUS Graduate Studies", "الدراسات العليا في NUS", "https://nusgs.nus.edu.sg"],
    sgPass: ["Student's Pass (ICA)", "تصريح الطالب (ICA)", "https://www.ica.gov.sg/reside/STP"],
    tg: ["Tuition Grant (MOE)", "منحة الرسوم (وزارة التعليم في سنغافورة)", "https://www.moe.gov.sg/financial-matters/tuition-grant-scheme"]
  };

  // The back of each card: p = short paragraph, pts = points, ln = link keys.
  var B = {
    // ---------- Your university at a glance ----------
    "g:city": {
      p: ["{uni}'s campus is in {where}. Where you live decides your daily travel time and costs, so look at the campus map before you choose housing.",
        "يقع حرم {uni} في {where}. ومكان سكنك يحدد وقت تنقلك اليومي وتكاليفه، فاطّلع على خريطة الحرم قبل اختيار السكن."],
      pts: [["Check which campus your program is taught on. Some universities have more than one.", "تأكد من الحرم الذي يُدرَّس فيه برنامجك، فبعض الجامعات لها أكثر من حرم."],
        ["Aim for housing within about 30 to 40 minutes of campus by public transport.", "ابحث عن سكن يبعد نحو 30 إلى 40 دقيقة عن الحرم بالمواصلات العامة."]],
      ln: ["web", "housing"] },
    "g:college": {
      p: ["{college} runs the preparation programs that lead into {uni}.", "تقدم {college} البرامج التحضيرية التي تؤدي إلى {uni}."],
      pts: [["Check the grades you need to move into your degree.", "تحقق من الدرجات المطلوبة للانتقال إلى البكالوريوس."],
        ["Get SACM approval for the program and the degree it leads to before you accept.", "احصل على موافقة الملحقية على البرنامج والدرجة التي يؤدي إليها قبل قبول العرض."],
        ["English courses are not sponsored, so you pay for them yourself.", "دورات اللغة غير مشمولة بالابتعاث، فتدفع تكلفتها بنفسك."]],
      ln: ["college", "options"] },
    "g:union": {
      p: ["{union} is there to support you outside class.", "{union} موجود لدعمك خارج قاعة الدراسة."],
      pts: [["{legal}", "{legal}"],
        ["Clubs and societies are an easy way to make friends and practise your English.", "الأندية والجمعيات طريقة سهلة لتكوين صداقات وممارسة اللغة."],
        ["Ask about Muslim student groups and prayer rooms on campus.", "اسأل عن جمعيات الطلاب المسلمين ومصليات الحرم."]],
      ln: ["union"] },
    "g:suburbs": {
      p: ["Students at {uni} often live in {suburbs}.", "يسكن طلاب {uni} غالبًا في {suburbs}."],
      pts: [["Inspect a place, or video-call, before you pay anything. Never send money for a place you haven't seen.", "عاين السكن أو تواصل بمكالمة فيديو قبل أن تدفع أي مبلغ، ولا ترسل مالًا مقابل سكن لم تره."],
        ["Compare rent with travel time: a cheaper room further away can cost more in transport.", "قارن الإيجار بوقت التنقل، فالغرفة الأرخص البعيدة قد تكلفك أكثر في المواصلات."],
        ["Book short-term housing for your first weeks, then look in person.", "احجز سكنًا مؤقتًا لأسابيعك الأولى، ثم ابحث بنفسك."]],
      ln: ["housing", "budget"] },
    "g:transport": {
      p: ["{tap}", "{tap}"],
      pts: [["Ask whether students get a discount or a free pass.", "اسأل إن كان للطلاب خصم أو اشتراك مجاني."],
        ["Plan your route from home to campus before you sign a lease.", "خطط لطريقك من السكن إلى الحرم قبل توقيع العقد."]],
      ln: ["transport", "arrival"] },
    "g:bond": {
      p: ["Most landlords ask for a deposit (bond) at the start of a lease. The rules on how much they can ask and how you get it back depend on where you live.",
        "يطلب أغلب المؤجرين مبلغ تأمين في بداية العقد. وتختلف أنظمة قيمته وطريقة استرداده حسب مكان سكنك."],
      pts: [["Take dated photos when you move in and keep a copy of the condition report.", "التقط صورًا مؤرخة عند انتقالك واحتفظ بنسخة من تقرير حالة السكن."],
        ["Get a receipt for every payment.", "احصل على إيصال لكل دفعة."],
        ["If there is a dispute, ask your student association for free advice.", "إذا حدث خلاف فاطلب استشارة مجانية من رابطة الطلاب."]],
      ln: ["bond", "housing"] },

    // ---------- Australia: study options ----------
    "au:bachelor": {
      p: ["Each university publishes its own entry requirements for Saudi students, usually a score for the Saudi secondary certificate plus an English score.",
        "تنشر كل جامعة شروط القبول الخاصة بالطلاب السعوديين، وغالبًا تكون درجة في شهادة الثانوية السعودية ودرجة في اللغة الإنجليزية."],
      pts: [["Find your program on {uni}'s website and check the international entry requirements for Saudi Arabia.", "ابحث عن برنامجك في موقع {uni} وتحقق من شروط القبول الدولية الخاصة بالسعودية."],
        ["Your English test usually needs to be less than 2 years old when your program starts.", "يجب غالبًا ألا يزيد عمر اختبار اللغة على سنتين عند بدء برنامجك."],
        ["Check that {uni} and your field are on the Ministry's list for your track.", "تأكد أن {uni} وتخصصك ضمن قائمة الوزارة لمسارك."]],
      ln: ["web", "studyAu", "lists"] },
    "au:foundation": {
      p: ["Foundation programs usually take about a year, and some offer faster or longer versions with several start dates.",
        "تستغرق برامج الفاونديشن عادةً سنة تقريبًا، وبعضها يقدم نسخًا أسرع أو أطول بعدة مواعيد بدء."],
      pts: [["Choose the stream that matches your degree, such as engineering or business.", "اختر المسار الذي يناسب تخصصك، مثل الهندسة أو إدارة الأعمال."],
        ["Your results decide whether you enter your degree, so check the progression grade.", "نتائجك تحدد انتقالك إلى البكالوريوس، فتحقق من درجة الانتقال المطلوبة."],
        ["Ministry rule for a preparatory year: at least 90% in high school and IELTS 5.5.", "شرط الوزارة للسنة التحضيرية: 90% على الأقل في الثانوية وIELTS 5.5."]],
      ln: ["college", "conditions"] },
    "au:diploma": {
      p: ["A diploma covers the same content as the first year of a linked degree, in smaller classes with more support.",
        "يغطي الدبلوم محتوى السنة الأولى من البكالوريوس المرتبط به، في فصول أصغر ودعم أكبر."],
      pts: [["Check the exact degree each diploma leads to, and the grade you need for second year.", "تحقق من البكالوريوس الذي يؤدي إليه كل دبلوم، والدرجة المطلوبة للانتقال إلى السنة الثانية."],
        ["Ask how much credit transfers, so you know your first courses at university.", "اسأل عن عدد الساعات التي ستُعادل، لتعرف موادك الأولى في الجامعة."],
        ["Keep your results and credit transfer outcome: SACM may ask for them.", "احتفظ بنتائجك ونتيجة معادلة الساعات، فقد تطلبها الملحقية."]],
      ln: ["college", "conditions"] },
    "au:english": {
      p: ["University English programs range from a few weeks to several months, depending on how far you are from your target score.",
        "تتراوح برامج اللغة في الجامعات بين أسابيع قليلة وعدة أشهر، حسب بُعدك عن الدرجة المطلوبة."],
      pts: [["Many universities accept their own English program instead of a new test score.", "تقبل جامعات كثيرة برنامج اللغة الخاص بها بدلًا من اختبار جديد."],
        ["SACM does not sponsor English courses, so compare the cost with retaking the test.", "لا تبتعث الملحقية على دورات اللغة، فقارن تكلفتها بإعادة الاختبار."],
        ["Book IELTS early: test dates fill up before each intake.", "احجز اختبار IELTS مبكرًا، فالمواعيد تمتلئ قبل كل فصل دراسي."]],
      ln: ["ielts", "college"] },
    "au:master": {
      p: ["Coursework master's usually take 1.5 to 2 years. Research master's usually take 2 years and end with a thesis.",
        "يستغرق الماجستير بالمقررات عادةً من سنة ونصف إلى سنتين، والماجستير البحثي عادةً سنتين وينتهي برسالة."],
      pts: [["Check that your bachelor's GPA and field meet the program's entry rules.", "تحقق أن معدلك وتخصصك في البكالوريوس يحققان شروط البرنامج."],
        ["Some programs give credit for a related bachelor's, which shortens your master's.", "تمنح بعض البرامج معادلة لبكالوريوس مرتبط، فتقصر مدة الماجستير."],
        ["Check that {uni} and your field are on the Ministry's list.", "تأكد أن {uni} وتخصصك ضمن قائمة الوزارة."]],
      ln: ["web", "lists", "postgrad"] },
    "au:premaster": {
      p: ["A pre-master's prepares you for postgraduate study, usually over one or two terms.", "يهيئك برنامج ما قبل الماجستير للدراسات العليا، وغالبًا يستغرق فصلًا أو فصلين."],
      pts: [["Check that finishing it guarantees entry to your master's.", "تحقق أن إكماله يضمن قبولك في الماجستير."],
        ["It is not on the list of programs SACM sponsors, so ask SACM before you accept.", "ليس ضمن البرامج التي تبتعث عليها الملحقية، فاسألها قبل قبول العرض."],
        ["A higher GPA or English score can mean you skip it.", "قد يعفيك معدل أعلى أو درجة لغة أعلى منه."]],
      ln: ["college", "postgrad"] },
    "au:phd": {
      p: ["Australian PhDs are research degrees: there is usually little or no coursework, and you work on your thesis from the start.",
        "الدكتوراه في أستراليا درجة بحثية، وغالبًا لا توجد مواد دراسية أو توجد بقدر قليل، وتعمل على رسالتك من البداية."],
      pts: [["Find a supervisor first and agree on your topic.", "ابحث عن مشرف أولًا واتفق معه على موضوعك."],
        ["The Ministry's FAQ says a PhD is covered for up to 3 years, so plan your timeline with your supervisor.", "تذكر الأسئلة الشائعة للوزارة أن البعثة تغطي الدكتوراه حتى 3 سنوات، فخطط لجدولك مع مشرفك."],
        ["Ask about the confirmation milestone, usually in your first year.", "اسأل عن مرحلة تثبيت المقترح (Confirmation)، وتكون غالبًا في السنة الأولى."]],
      ln: ["web", "faq", "rd"] },

    // ---------- USA ----------
    "us:apply-straight-to-a-bachelor-s-degree": {
      p: ["Deadlines are usually between November and January for entry the following autumn.", "مواعيد التقديم غالبًا بين نوفمبر ويناير للقبول في الخريف التالي."],
      pts: [["Check whether {uni} is test-optional or asks for the SAT or ACT.", "تحقق إن كانت {uni} تشترط اختبار SAT أو ACT أو تجعله اختياريًا."],
        ["Prepare your essays, recommendation letters and an official translation of your transcripts.", "جهّز المقالات وخطابات التوصية وترجمة رسمية لسجلك الدراسي."],
        ["After you are admitted, the university issues your I-20 once it receives your financial guarantee.", "بعد قبولك تصدر الجامعة نموذج I-20 عندما يصلها الضمان المالي."]],
      ln: ["commonApp", "eduUsa", "web"] },
    "us:english-language-program": {
      p: ["Intensive English programs are usually full time, with several start dates a year.", "برامج اللغة المكثفة غالبًا بدوام كامل، ولها عدة مواعيد بدء في السنة."],
      pts: [["Ask whether finishing the program meets the university's English requirement without a new test.", "اسأل إن كان إكمال البرنامج يحقق شرط اللغة في الجامعة دون اختبار جديد."],
        ["A conditional admission letter states exactly what level you need to reach.", "يوضح خطاب القبول المشروط المستوى الذي تحتاج إلى تحقيقه بالضبط."],
        ["SACM does not sponsor English courses, so compare the cost with retaking TOEFL or IELTS.", "لا تبتعث الملحقية على دورات اللغة، فقارن تكلفتها بإعادة اختبار TOEFL أو IELTS."]],
      ln: ["eduUsa", "sits"] },
    "us:master-s-degree": {
      p: ["Applications usually open in the autumn, about a year before you start.", "يُفتح التقديم غالبًا في الخريف، قبل بدء الدراسة بسنة تقريبًا."],
      pts: [["Check whether your program needs the GRE or GMAT, or has made it optional.", "تحقق إن كان برنامجك يطلب GRE أو GMAT أو جعله اختياريًا."],
        ["Prepare a statement of purpose and two or three recommendation letters.", "جهّز خطاب الغرض من الدراسة وخطابين أو ثلاثة للتوصية."],
        ["Check that {uni} and your field are on the Ministry's list.", "تأكد أن {uni} وتخصصك ضمن قائمة الوزارة."]],
      ln: ["eduUsa", "lists", "web"] },
    "us:phd": {
      p: ["The first years usually include coursework and qualifying exams, and your research follows.", "تشمل السنوات الأولى عادةً مواد دراسية واختبارات تأهيلية، ثم يأتي البحث."],
      pts: [["Many programs offer funding through teaching or research assistant roles.", "تقدم برامج كثيرة تمويلًا عبر وظائف مساعد تدريس أو مساعد باحث."],
        ["Deadlines are often in December for entry the next autumn.", "مواعيد التقديم غالبًا في ديسمبر للقبول في الخريف التالي."],
        ["Ask SACM early how a PhD longer than 3 years is handled.", "اسأل الملحقية مبكرًا عن التعامل مع دكتوراه تزيد على 3 سنوات."]],
      ln: ["eduUsa", "faq", "rd"] },

    // ---------- UK ----------
    "uk:international-foundation-year": {
      p: ["Foundation years are run by universities or partner colleges and usually start in September, with some January intakes.", "تقدم الجامعات أو الكليات الشريكة سنة الفاونديشن، وتبدأ غالبًا في سبتمبر، وبعضها في يناير."],
      pts: [["Choose the pathway linked to your degree, such as engineering or business.", "اختر المسار المرتبط بتخصصك، مثل الهندسة أو إدارة الأعمال."],
        ["Check the grade you need to progress, and whether progression is guaranteed.", "تحقق من الدرجة المطلوبة للانتقال، وهل الانتقال مضمون."],
        ["Many providers take applications directly, while some integrated foundation years go through UCAS.", "تستقبل جهات كثيرة الطلبات مباشرة، وبعض برامج الفاونديشن المدمجة تكون عبر UCAS."]],
      ln: ["college", "ucas", "ukVisa"] },
    "uk:start-the-bachelor-s-degree": {
      p: ["For most courses, the UCAS deadline is at the end of January for entry that autumn.", "موعد التقديم عبر UCAS لأغلب التخصصات في نهاية يناير للقبول في الخريف نفسه."],
      pts: [["Oxford, Cambridge, medicine, dentistry and veterinary courses have an earlier deadline in mid-October.", "أكسفورد وكامبريدج والطب وطب الأسنان والطب البيطري لها موعد أبكر في منتصف أكتوبر."],
        ["One UCAS application lets you choose up to 5 courses.", "يتيح لك طلب UCAS واحد اختيار حتى 5 تخصصات."],
        ["Your university issues a CAS once your offer is unconditional, and you need it for the visa.", "تصدر جامعتك رقم CAS بعد أن يصبح القبول غير مشروط، وتحتاجه للتأشيرة."]],
      ln: ["ucas", "ukVisa", "web"] },
    "uk:pre-sessional-english": {
      p: ["Pre-sessional courses run in the weeks before your degree starts, often over the summer.", "تُعقد دورات Pre-sessional في الأسابيع التي تسبق بدء الدراسة، وغالبًا في الصيف."],
      pts: [["Passing at the required level usually replaces a new IELTS score.", "اجتيازها بالمستوى المطلوب يغني غالبًا عن اختبار IELTS جديد."],
        ["Ask your university whether the course and your degree can be covered by one visa.", "اسأل جامعتك إن كانت الدورة والدراسة يمكن أن تشملهما تأشيرة واحدة."],
        ["SACM does not sponsor English courses.", "لا تبتعث الملحقية على دورات اللغة."]],
      ln: ["ukVisa", "ukcisa"] },
    "uk:master-s-degree": {
      p: ["Taught master's usually start in September and finish about a year later, dissertation included.", "يبدأ الماجستير بالمقررات غالبًا في سبتمبر وينتهي بعد سنة تقريبًا، بما فيه الرسالة."],
      pts: [["Check whether your subject needs an ATAS certificate, and apply for it before your visa.", "تحقق إن كان تخصصك يحتاج شهادة ATAS، وقدّم عليها قبل التأشيرة."],
        ["Your bachelor's grade is usually compared with a UK classification, such as a 2:1.", "يُقارن معدلك في البكالوريوس عادةً بالتصنيف البريطاني، مثل 2:1."],
        ["Al-Ruwwad and Imdad both include master's study.", "يشمل مسارا الرواد وإمداد دراسة الماجستير."]],
      ln: ["atas", "ukVisa", "lists"] },
    "uk:phd": {
      p: ["UK PhDs focus on research from the start, with a supervisor guiding your thesis.", "تركز الدكتوراه في بريطانيا على البحث من البداية، بإشراف مشرف على رسالتك."],
      pts: [["Write a research proposal and contact supervisors before you apply.", "اكتب مقترحًا بحثيًا وتواصل مع المشرفين قبل التقديم."],
        ["Some science and engineering topics need an ATAS certificate.", "بعض موضوعات العلوم والهندسة تحتاج شهادة ATAS."],
        ["The Ministry's FAQ says a PhD is covered for up to 3 years.", "تذكر الأسئلة الشائعة للوزارة أن البعثة تغطي الدكتوراه حتى 3 سنوات."]],
      ln: ["atas", "faq", "rd"] },

    // ---------- Canada ----------
    "ca:start-the-bachelor-s-degree": {
      p: ["Each province has its own system: Ontario universities use OUAC, and most others take applications directly.", "لكل مقاطعة نظامها: جامعات أونتاريو تستخدم OUAC، وأغلب الجامعات الأخرى تستقبل الطلبات مباشرة."],
      pts: [["Deadlines are often between January and March for September entry.", "مواعيد التقديم غالبًا بين يناير ومارس للقبول في سبتمبر."],
        ["Check {uni}'s requirements for the Saudi certificate and your English score.", "تحقق من شروط {uni} لشهادة الثانوية السعودية ودرجة اللغة."],
        ["For the study permit you need a letter of acceptance and usually a provincial attestation letter.", "تحتاج لتصريح الدراسة إلى خطاب القبول وغالبًا خطاب المقاطعة (PAL)."]],
      ln: ["eduCa", "ouac", "caPal"] },
    "ca:english-language-program": {
      p: ["University English programs run in terms of a few weeks to a few months.", "تُقدَّم برامج اللغة في الجامعات بفترات تتراوح بين أسابيع وأشهر."],
      pts: [["Ask whether finishing the program replaces a new test score.", "اسأل إن كان إكمال البرنامج يغني عن اختبار جديد."],
        ["Check how the English program affects your study permit application.", "تحقق من أثر برنامج اللغة على طلب تصريح الدراسة."],
        ["SACM does not sponsor English courses.", "لا تبتعث الملحقية على دورات اللغة."]],
      ln: ["eduCa", "caPermit"] },
    "ca:master-s-degree": {
      p: ["Thesis-based master's work with a supervisor and are often funded. Course-based master's are shorter.", "الماجستير البحثي يكون مع مشرف وغالبًا بتمويل، والماجستير بالمقررات أقصر."],
      pts: [["For a thesis-based program, contact possible supervisors before you apply.", "في البرامج البحثية تواصل مع المشرفين المحتملين قبل التقديم."],
        ["Deadlines are often from December to February for September entry.", "مواعيد التقديم غالبًا من ديسمبر إلى فبراير للقبول في سبتمبر."],
        ["Check that {uni} and your field are on the Ministry's list.", "تأكد أن {uni} وتخصصك ضمن قائمة الوزارة."]],
      ln: ["eduCa", "lists", "web"] },
    "ca:phd": {
      p: ["Most Canadian PhDs combine some coursework and a comprehensive exam with your thesis research.", "تجمع أغلب برامج الدكتوراه في كندا بين مواد دراسية واختبار شامل وبحث الرسالة."],
      pts: [["Find a supervisor first: many programs won't admit you without one.", "ابحث عن مشرف أولًا، فبرامج كثيرة لا تقبلك بدونه."],
        ["Funding packages are common, so ask the department.", "حزم التمويل شائعة، فاسأل القسم عنها."],
        ["The Ministry's FAQ says a PhD is covered for up to 3 years.", "تذكر الأسئلة الشائعة للوزارة أن البعثة تغطي الدكتوراه حتى 3 سنوات."]],
      ln: ["eduCa", "faq", "rd"] },

    // ---------- Germany ----------
    "de:studienkolleg": {
      p: ["Courses are grouped by your planned subject, for example the T-Kurs for engineering and science, or the W-Kurs for business.", "تُقسم الدورات حسب تخصصك المخطط له، مثل T-Kurs للهندسة والعلوم وW-Kurs لإدارة الأعمال."],
      pts: [["Many Studienkollegs hold an entrance exam in German and maths.", "تعقد كليات تحضيرية كثيرة اختبار قبول في الألمانية والرياضيات."],
        ["Applications often go through uni-assist or the university that runs the Studienkolleg.", "يكون التقديم غالبًا عبر uni-assist أو الجامعة التي تدير الكلية التحضيرية."],
        ["Use anabin to check how your Saudi certificate is rated.", "استخدم anabin لمعرفة تقييم شهادتك السعودية."]],
      ln: ["uniAssist", "anabin", "sig"] },
    "de:bachelor-s-degree": {
      p: ["German universities usually have two intakes: the winter semester (October) and the summer semester (April).", "للجامعات الألمانية عادةً موعدان للقبول: الفصل الشتوي (أكتوبر) والفصل الصيفي (أبريل)."],
      pts: [["Winter semester deadlines are often 15 July, but check each university.", "موعد التقديم للفصل الشتوي غالبًا 15 يوليو، لكن تحقق من كل جامعة."],
        ["Many international applications go through uni-assist.", "تمر طلبات دولية كثيرة عبر uni-assist."],
        ["Some subjects have limited places (numerus clausus).", "بعض التخصصات مقاعدها محدودة (numerus clausus)."]],
      ln: ["uniAssist", "sig", "daad"] },
    "de:german-language-course": {
      p: ["TestDaF and DSH are the usual proofs of German for university study.", "اختبار TestDaF واختبار DSH هما الإثبات المعتاد للغة الألمانية في الجامعات."],
      pts: [["Most universities ask for TestDaF level 4 in all parts, or DSH-2.", "تطلب أغلب الجامعات المستوى 4 في كل أجزاء TestDaF أو DSH-2."],
        ["Reaching university level from the beginning usually takes many months of full-time study.", "الوصول إلى المستوى الجامعي من البداية يحتاج عادةً أشهرًا كثيرة من الدراسة المكثفة."],
        ["Language courses are not sponsored by SACM.", "دورات اللغة غير مشمولة بالابتعاث."]],
      ln: ["testdaf", "sig"] },
    "de:master-s-degree": {
      p: ["The DAAD lists international master's programs with their language, deadlines and fees.", "يعرض DAAD برامج الماجستير الدولية مع لغتها ومواعيدها ورسومها."],
      pts: [["Check that your bachelor's subjects match the program's requirements.", "تحقق أن مواد البكالوريوس تطابق شروط البرنامج."],
        ["English-taught programs usually ask for IELTS or TOEFL.", "البرامج بالإنجليزية تطلب غالبًا IELTS أو TOEFL."],
        ["Imdad covers master's study at universities on the list for your field.", "يشمل مسار إمداد الماجستير في الجامعات المدرجة لتخصصك."]],
      ln: ["daad", "uniAssist", "lists"] },
    "de:phd": {
      p: ["Most doctorates are individual: you agree a project with a professor who supervises you.", "أغلب الدكتوراه فردية: تتفق على مشروع مع أستاذ يشرف عليك."],
      pts: [["Structured PhD programs in graduate schools are an alternative, often in English.", "برامج الدكتوراه المنظمة في كليات الدراسات العليا بديل، وغالبًا بالإنجليزية."],
        ["Your master's must be recognised as equal to a German master's.", "يجب أن يُعترف بماجستيرك معادلًا للماجستير الألماني."],
        ["The Ministry's FAQ says a PhD is covered for up to 3 years.", "تذكر الأسئلة الشائعة للوزارة أن البعثة تغطي الدكتوراه حتى 3 سنوات."]],
      ln: ["daad", "faq", "rd"] },

    // ---------- Singapore ----------
    "sg:apply-to-nus-ntu-or-smu": {
      p: ["Applications for entry in August usually open late in the year before.", "يُفتح التقديم للقبول في أغسطس عادةً في أواخر العام السابق."],
      pts: [["Check each university's requirements for the Saudi certificate. Some ask for SAT or ACT scores.", "تحقق من شروط كل جامعة لشهادة الثانوية السعودية، فبعضها يطلب SAT أو ACT."],
        ["After you accept your offer, you apply for a Student's Pass from ICA.", "بعد قبول العرض تقدّم على تصريح الطالب من ICA."],
        ["NUS is on the Al-Ruwwad top 30 list. Check your field and track.", "جامعة NUS ضمن قائمة الرواد لأفضل 30 جامعة، فتحقق من تخصصك ومسارك."]],
      ln: ["nus", "ntu", "smu", "sgPass"] },
    "sg:the-tuition-grant": {
      p: ["You apply for the Tuition Grant after you receive your offer.", "تقدّم على منحة الرسوم بعد حصولك على عرض القبول."],
      pts: [["International students who take it must serve a 3-year bond after graduating.", "يلتزم الطالب الدولي الذي يقبلها بالعمل 3 سنوات بعد التخرج."],
        ["If you don't take the grant, you pay the full, higher fee.", "إذا لم تقبل المنحة فتدفع الرسوم الكاملة الأعلى."],
        ["Ask your cultural attaché whether the scholarship pays the full fee instead.", "اسأل الملحق الثقافي إن كانت البعثة تدفع الرسوم الكاملة بدلًا منها."]],
      ln: ["tg"] },
    "sg:master-s-degree": {
      p: ["Coursework master's often have intakes in August and January. Research master's are applied for through the graduate school.", "للماجستير بالمقررات غالبًا موعدان في أغسطس ويناير، والماجستير البحثي يُقدَّم عليه عبر كلية الدراسات العليا."],
      pts: [["Check whether your program needs the GRE or GMAT.", "تحقق إن كان برنامجك يطلب GRE أو GMAT."],
        ["Prepare your transcripts, an English score and recommendation letters.", "جهّز سجلك الدراسي ودرجة اللغة وخطابات التوصية."],
        ["Check that the university and your field are on the Ministry's list.", "تأكد أن الجامعة وتخصصك ضمن قائمة الوزارة."]],
      ln: ["nusgs", "ntu", "lists"] },
    "sg:phd": {
      p: ["PhDs at NUS and NTU usually start with coursework and a qualifying exam, followed by research.", "تبدأ الدكتوراه في NUS وNTU عادةً بمواد دراسية واختبار تأهيلي، ثم البحث."],
      pts: [["Contact possible supervisors before you apply.", "تواصل مع المشرفين المحتملين قبل التقديم."],
        ["Many programs have August and January intakes.", "لبرامج كثيرة موعدان للقبول في أغسطس ويناير."],
        ["The Ministry's FAQ says a PhD is covered for up to 3 years.", "تذكر الأسئلة الشائعة للوزارة أن البعثة تغطي الدكتوراه حتى 3 سنوات."]],
      ln: ["nusgs", "faq", "rd"] },

    // ---------- Scholarship tracks ----------
    "t:ruwwad": {
      p: ["For students admitted to one of the 30 universities on the Ministry's Al-Ruwwad list, in any field.", "للطلاب المقبولين في إحدى الجامعات الثلاثين في قائمة الوزارة لمسار الرواد، في أي تخصص."],
      pts: [["Covers bachelor's and master's study.", "يشمل البكالوريوس والماجستير."],
        ["The list is published by the Ministry and can change each year.", "تنشر الوزارة القائمة، وقد تتغير كل عام."],
        ["You need an unconditional offer before you apply on Qubool.", "تحتاج إلى قبول غير مشروط قبل التقديم عبر منصة قبول."]],
      ln: ["lists", "qubool", "program"] },
    "t:imdad": {
      p: ["For universities in the top 200, in fields the Saudi job market needs. The approved fields and universities are set each year.", "للجامعات ضمن أفضل 200، في التخصصات التي يحتاجها سوق العمل السعودي. وتُحدد التخصصات والجامعات المعتمدة كل عام."],
      pts: [["Find your field in the 2026–2027 lists.", "ابحث عن تخصصك في قوائم 2026–2027."],
        ["A university can be on the list for one field but not another.", "قد تكون الجامعة مدرجة في تخصص دون آخر."],
        ["Covers bachelor's and master's study.", "يشمل البكالوريوس والماجستير."]],
      ln: ["lists", "ruSearch", "qubool"] },
    "t:rd": {
      p: ["For PhD study in national research priority areas, at universities in the top 200 for your field.", "لدراسة الدكتوراه في مجالات الأولويات البحثية الوطنية، في جامعات ضمن أفضل 200 في تخصصك."],
      pts: [["You usually need a research proposal and a supervisor's agreement.", "تحتاج غالبًا إلى مقترح بحثي وموافقة مشرف."],
        ["Check that your topic fits a priority area.", "تأكد أن موضوعك ضمن مجالات الأولوية."],
        ["The Ministry's FAQ says a PhD is covered for up to 3 years.", "تذكر الأسئلة الشائعة للوزارة أن البعثة تغطي الدكتوراه حتى 3 سنوات."]],
      ln: ["rd", "faq", "qubool"] },
    "t:waid": {
      p: ["Study tied to a job: you are nominated with a Saudi employer and work for it after you graduate.", "دراسة مرتبطة بوظيفة: تُرشَّح مع جهة توظيف سعودية وتعمل لديها بعد التخرج."],
      pts: [["Each program has its own fields, countries and dates.", "لكل برنامج تخصصاته ودوله ومواعيده."],
        ["Some Wa'id programs ask for aptitude or achievement test scores.", "تطلب بعض برامج واعد درجات القدرات أو التحصيلي."],
        ["Windows are short, so follow Qubool and the Ministry's official accounts.", "فترات التقديم قصيرة، فتابع منصة قبول وحسابات الوزارة الرسمية."]],
      ln: ["qubool", "program"] }
  };

  // ---------- filling the placeholders ----------
  function vals() {
    var M = window.Masarok, v = M && M.values ? (M.values().v || {}) : {};
    return v;
  }
  function fill(s, v) {
    return esc(s).replace(/\{(\w+)\}/g, function (m, k) {
      var map = { uni: v.short, college: v.college, union: v.union, city: v.city, campus: v.campus, suburbs: v.suburbs, transport: v.transport, bond: v.bond, tap: v.tap, legal: v.legal, where: !v.campus ? v.city : (!v.city || String(v.campus).indexOf(v.city) > -1 ? v.campus : v.campus + (AR ? "، " : ", ") + v.city) };
      var val = map[k];
      if (val == null || val === "") val = AR ? (k === "uni" ? "جامعتك" : "") : (k === "uni" ? "your university" : "");
      return esc(val);
    });
  }
  function linkHtml(key, v) {
    var l = LK[key]; if (!l) return "";
    var href = l[2];
    if (href.indexOf("u:") === 0) { href = v[href.slice(2)]; if (!href) return ""; }
    var ext = href.charAt(0) !== "#";
    return '<a href="' + esc(href) + '"' + (ext ? ' rel="noopener" target="_blank"' : "") + ' data-flip-link>' + fill(T(l), v) + (ext ? '<span aria-hidden="true"> ↗</span>' : "") + "</a>";
  }

  function titleOf(card) {
    var h = card.querySelector(".flip-front h3, .flip-front dt, .flip-front .name b") || card.querySelector("h3, dt, .name b");
    return h ? h.textContent.trim() : "";
  }

  function backHtml(card, v) {
    var d = B[card.getAttribute("data-flip")]; if (!d) return null;
    var pts = (d.pts || []).map(function (x) { var t = fill(T(x), v); return t ? "<li>" + t + "</li>" : ""; }).join("");
    var links = (d.ln || []).map(function (k) { return linkHtml(k, v); }).filter(Boolean).join("");
    var p = fill(T(d.p), v);
    return '<div class="fb-top"><span class="fb-kicker">' + esc(T(UI.kicker)) + '</span>' +
      '<button type="button" class="flip-btn flip-close" aria-label="' + esc(T(UI.closeHint)) + '"><span aria-hidden="true">↺</span> ' + esc(T(UI.back)) + "</button></div>" +
      '<h4 class="fb-title">' + esc(titleOf(card)) + "</h4>" +
      (p ? "<p>" + p + "</p>" : "") +
      (pts ? '<ul class="fb-pts">' + pts + "</ul>" : "") +
      (links ? '<div class="fb-links" aria-label="' + esc(T(UI.links)) + '">' + links + "</div>" : "");
  }

  // ---------- turning a card into a flip card ----------
  function setup(card) {
    if (card.classList.contains("flip") || !B[card.getAttribute("data-flip")]) return;
    var front = document.createElement("div");
    front.className = "flip-face flip-front";
    while (card.firstChild) front.appendChild(card.firstChild);
    var back = document.createElement("div");
    back.className = "flip-face flip-back";
    back.setAttribute("aria-hidden", "true");
    back.inert = true;
    card.appendChild(front); card.appendChild(back);
    card.classList.add("flip");
    var btn = document.createElement("button");
    btn.type = "button"; btn.className = "flip-btn flip-open"; btn.setAttribute("aria-expanded", "false");
    front.appendChild(btn);
    fillCard(card);
  }
  function fillCard(card, v) {
    v = v || vals();
    var back = card.querySelector(":scope > .flip-back"), btn = card.querySelector(":scope > .flip-front > .flip-open");
    if (!back) return;
    back.innerHTML = backHtml(card, v) || "";
    var t = titleOf(card);
    if (btn) { btn.innerHTML = esc(T(UI.more)) + ' <span aria-hidden="true">↻</span>'; btn.setAttribute("aria-label", T(UI.openHint).replace("{t}", t)); }
  }

  function size(card) {
    var back = card.querySelector(":scope > .flip-back");
    if (!back) return;
    if (card.classList.contains("is-flipped")) {
      back.style.height = "auto"; var h = back.scrollHeight; back.style.height = "";
      card.style.minHeight = h + "px";
    } else card.style.minHeight = "";
  }

  function toggle(card, on, focus) {
    on = on == null ? !card.classList.contains("is-flipped") : on;
    var front = card.querySelector(":scope > .flip-front"), back = card.querySelector(":scope > .flip-back");
    if (!front || !back) return;
    card.classList.toggle("is-flipped", on);
    back.inert = !on; front.inert = on;
    back.setAttribute("aria-hidden", on ? "false" : "true");
    front.setAttribute("aria-hidden", on ? "true" : "false");
    var ob = front.querySelector(".flip-open"); if (ob) ob.setAttribute("aria-expanded", on ? "true" : "false");
    size(card);
    if (focus) {
      var target = on ? back.querySelector(".flip-close") : ob;
      if (target) setTimeout(function () { try { target.focus({ preventScroll: true }); } catch (e) { target.focus(); } }, reduced() ? 0 : 320);
    }
  }

  function scan() {
    var v = vals();
    document.querySelectorAll("[data-flip]").forEach(function (card) {
      if (!card.classList.contains("flip")) setup(card);
      else { if (card.classList.contains("is-flipped")) toggle(card, false); fillCard(card, v); }
    });
  }

  // ---------- styles ----------
  var css =
    ".flip{position:relative; perspective:1600px; border-radius:var(--flip-r, var(--radius)); background:transparent !important; border-color:transparent !important; padding:0 !important; display:flex !important; flex-direction:column; gap:0 !important; cursor:pointer; transition:min-height .45s ease, translate .25s ease, box-shadow .25s ease}" +
    ".flip > .flip-face{background:var(--surface); border:1px solid var(--line); border-radius:var(--flip-r, var(--radius)); padding:var(--flip-p, 18px); display:grid; gap:var(--flip-g, 10px); align-content:start; min-width:0; backface-visibility:hidden; -webkit-backface-visibility:hidden; transition:transform .6s cubic-bezier(.2,.7,.2,1), border-color .25s ease}" +
    ".flip > .flip-front{flex:1; transform:rotateY(0deg); display:flex; flex-direction:column}" +
    ".flip > .flip-back{position:absolute; inset:0; overflow:auto; transform:rotateY(180deg); background:color-mix(in srgb, var(--surface) 88%, var(--sand) 12%)}" +
    ".flip.is-flipped > .flip-front{transform:rotateY(-180deg)}" +
    ".flip.is-flipped > .flip-back{transform:rotateY(0deg)}" +
    "[dir=rtl] .flip > .flip-back{transform:rotateY(-180deg)} [dir=rtl] .flip.is-flipped > .flip-front{transform:rotateY(180deg)} [dir=rtl] .flip.is-flipped > .flip-back{transform:rotateY(0deg)}" +
    ".flip:hover > .flip-face{border-color:color-mix(in srgb, var(--sand) 45%, var(--line))}" +
    ".option.flip{--flip-p:18px; --flip-g:10px}" +
    ".track.flip{--flip-p:14px 16px; --flip-g:4px; --flip-r:8px}" +
    ".glance > .flip{--flip-p:14px 16px; --flip-g:4px}" +
    ".flip-btn{font:inherit; font-size:.8rem; font-family:var(--f-mono); letter-spacing:.04em; color:var(--sand); background:transparent; border:1px solid color-mix(in srgb, var(--sand) 40%, transparent); border-radius:999px; padding:4px 10px; cursor:pointer; line-height:1.3}" +
    ".flip-btn:hover{background:color-mix(in srgb, var(--sand) 14%, transparent)}" +
    ".flip-btn:focus-visible{outline:2px solid var(--sand); outline-offset:2px}" +
    ".flip-open{align-self:flex-end; margin-top:auto}" +
    ".flip-front > .flip-open{margin-top:auto; padding-top:4px; padding-bottom:4px}" +
    ".fb-top{display:flex; justify-content:space-between; align-items:center; gap:8px}" +
    ".fb-kicker{font-family:var(--f-mono); font-size:.72rem; letter-spacing:.1em; text-transform:uppercase; color:var(--muted)}" +
    ".flip-back .fb-title{margin:0; font-size:1.02rem; color:var(--ink)}" +
    ".flip-back p{margin:0; color:var(--ink); font-size:.93rem}" +
    ".fb-pts{margin:0; padding-inline-start:1.1em; display:grid; gap:5px; color:var(--muted); font-size:.9rem}" +
    ".fb-links{display:flex; flex-wrap:wrap; gap:6px 12px; padding-top:6px; border-top:1px dashed var(--line)}" +
    ".fb-links a{color:var(--green); font-size:.9rem}" +
    "@media (prefers-reduced-motion: reduce){ .flip > .flip-face{transition:opacity .2s ease !important; transform:none !important} .flip > .flip-back{opacity:0} .flip.is-flipped > .flip-back{opacity:1} .flip.is-flipped > .flip-front{opacity:0} .flip{transition:none} }";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  // ---------- events ----------
  document.addEventListener("click", function (e) {
    var card = e.target.closest && e.target.closest(".flip");
    if (!card) return;
    if (e.target.closest(".flip-close")) { e.preventDefault(); toggle(card, false, true); return; }
    if (e.target.closest(".flip-open")) { e.preventDefault(); toggle(card, true, true); return; }
    // let links, form controls and text selection work as normal
    if (e.target.closest("a, input, select, textarea, label, button")) return;
    var sel = window.getSelection && String(window.getSelection());
    if (sel) return;
    toggle(card, !card.classList.contains("is-flipped"), false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    var card = e.target.closest && e.target.closest(".flip.is-flipped");
    if (card) toggle(card, false, true);
  });
  window.addEventListener("resize", function () { document.querySelectorAll(".flip.is-flipped").forEach(size); });
  document.addEventListener("masarok:change", function () { setTimeout(scan, 0); });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", scan); else scan();
})();

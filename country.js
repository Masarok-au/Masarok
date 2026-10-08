/* Masarok: country data and the parts of the page that change with the country.
   Australia keeps the hand-written sections in index.html; other countries are rendered from this data.
   Text is written as [English, Arabic]. Loaded before unis.js. */
(function () {
  "use strict";

  var ORDER = ["au", "us", "uk", "ca", "de", "sg"];

  // links every country shares
  var MOE = [
    { l: ["Scholarship program", "برنامج الابتعاث"], s: ["Ministry of Education (tracks and news)", "وزارة التعليم (المسارات والأخبار)"], u: "https://sites.moe.gov.sa/scholarship-program/" },
    { l: ["Scholarship conditions", "شروط الابتعاث"], s: ["Ministry of Education", "وزارة التعليم"], u: "https://sites.moe.gov.sa/scholarship-program/conditions/" },
    { l: ["Qubool (apply here)", "منصة قبول (للتقديم)"], s: ["National Unified Admission Platform", "المنصة الوطنية للقبول الموحد"], u: "https://www.uap.sa/#scholarship" },
    { l: ["Safeer portal", "منصة سفير"], s: ["Manage your scholarship after nomination", "إدارة بعثتك بعد الترشيح"], u: "https://safeer2.moe.gov.sa/Portal" },
    { l: ["Recommended universities", "الجامعات الموصى بها"], s: ["Ministry of Education search", "بحث وزارة التعليم"], u: "https://ru.moe.gov.sa/Search" },
    { l: ["2026–2027 university lists", "قوائم الجامعات 2026–2027"], s: ["Universities by track and field (PDF)", "الجامعات حسب المسار والتخصص (PDF)"], u: "https://object.moe.gov.sa/nasaq/cm/files/aldlyl-alastrshady-ltrtyb-qwaaem-aljamaeat-hsb-almjalat-2027-2026.pdf" }
  ];

  var C = {
    au: {
      name: ["Australia", "أستراليا"], inPlace: ["in Australia", "في أستراليا"], short: ["Australia", "أستراليا"],
      mission: { name: ["the Saudi Arabian Cultural Mission (SACM) in Canberra", "الملحقية الثقافية السعودية في كانبرا"], url: "https://sites.moe.gov.sa/cm/au/" }
    },

    // ------------------------------------------------------------------ USA
    us: {
      noF: true,
      pathF: ["Your path to a pathway program", "طريقك إلى برنامج المسار"],
      name: ["the USA", "أمريكا"], inPlace: ["in the USA", "في أمريكا"], short: ["USA", "أمريكا"],
      cur: "US$",
      lede: ["A free guide for Saudi students who want to study in the USA. It covers your study options, how the scholarship works, what to sort out before you fly, and your first weeks.",
        "دليل مجاني للطلاب السعوديين الراغبين في الدراسة في أمريكا. يشرح لك خيارات الدراسة، وطريقة عمل الابتعاث، وما تحتاج إلى ترتيبه قبل السفر، وأسابيعك الأولى."],
      mission: { name: ["the Saudi Arabian Cultural Mission (SACM) in the USA", "الملحقية الثقافية السعودية في أمريكا"], where: ["near Washington, D.C.", "قرب العاصمة واشنطن"], url: "https://sites.moe.gov.sa/cm/us/" },
      labels: { college: ["English or pathway program", "برنامج اللغة أو المسار"], union: ["International students office", "مكتب الطلاب الدوليين"], bond: ["Tenant rules", "أنظمة الإيجار"] },
      generic: {
        en: { college: "the university's English or pathway program", union: "the international students office", legal: "Many US universities offer free legal advice to students. Ask your international students office where to go.", transport: "local transit card", bond: "your state's tenant rules", food: "Ask the Muslim Students' Association (MSA) at your university about halal food and prayer spaces.", tap: "Many US transit systems also take contactless bank cards and phones." },
        ar: { college: "برنامج اللغة أو المسار في الجامعة", union: "مكتب الطلاب الدوليين", legal: "تقدم كثير من الجامعات الأمريكية استشارات قانونية مجانية للطلاب. اسأل مكتب الطلاب الدوليين عن الجهة المناسبة.", transport: "بطاقة المواصلات المحلية", bond: "أنظمة الإيجار في ولايتك", food: "اسأل جمعية الطلاب المسلمين (MSA) في جامعتك عن المطاعم الحلال وأماكن الصلاة.", tap: "تقبل كثير من أنظمة المواصلات الأمريكية أيضًا البطاقات البنكية اللاتلامسية والجوال." }
      },
      enrolDoc: ["I-20", "نموذج I-20"],
      health: ["(provided by SACM)", "(توفره الملحقية)"],
      missionShort: ["SACM", "الملحقية"],
      options: {
        intro: ["US universities admit students straight from high school, but entry is competitive and each university sets its own rules. These are the usual routes for Saudi students.",
          "تقبل الجامعات الأمريكية الطلاب مباشرة بعد الثانوية، لكن المنافسة قوية ولكل جامعة شروطها. هذه الطرق المعتادة للطلاب السعوديين."],
        cards: [
          { lv: "bachelor", b: ["Direct entry", "قبول مباشر"], h: ["Apply straight to a bachelor's degree", "قدّم مباشرة على البكالوريوس"],
            p: ["Most US universities accept the Saudi secondary certificate with an English score such as TOEFL or IELTS. Many also look at your essays and activities, and some ask for the SAT or ACT.", "تقبل أغلب الجامعات الأمريكية شهادة الثانوية السعودية مع درجة اختبار لغة مثل TOEFL أو IELTS. وتنظر كثير منها أيضًا إلى المقالات والأنشطة، وبعضها يطلب SAT أو ACT."],
            dl: [[["Length", "المدة"], ["Usually 4 years", "عادةً 4 سنوات"]], [["Apply through", "التقديم عبر"], ["The Common App or the university's own form", "منصة Common App أو نموذج الجامعة"]]],
            n: ["the university must be on the Ministry's list for your track and field (top 30 for Al-Ruwwad, top 200 for Imdad).", "يجب أن تكون الجامعة ضمن قائمة الوزارة لمسارك وتخصصك (أفضل 30 لمسار الرواد، وأفضل 200 لمسار إمداد)."] },
          { lv: "", b: ["Weeks to months", "أسابيع إلى أشهر"], h: ["English language program", "برنامج اللغة الإنجليزية"],
            p: ["Many universities run intensive English programs and offer conditional admission: you start the degree once your English reaches their level.", "تقدم جامعات كثيرة برامج لغة مكثفة وقبولًا مشروطًا، فتبدأ الدراسة بعد أن تصل لغتك إلى مستواها."],
            dl: [[["Suits you if", "يناسبك إذا"], ["Your English score is below the university's level.", "كانت درجة اللغة أقل من مستوى الجامعة."]]],
            n: ["SACM does not sponsor English courses, so you pay for them yourself.", "الملحقية لا تبتعث على دورات اللغة، فتدفع تكلفتها بنفسك."] },
          { lv: "master", b: ["1.5 to 2 years", "سنة ونصف إلى سنتين"], h: ["Master's degree", "الماجستير"],
            p: ["Most US master's degrees take about 2 years full time. Many programs ask for the GRE or GMAT as well as your GPA and English score.", "يستغرق أغلب الماجستير في أمريكا قرابة سنتين بدوام كامل، وتطلب برامج كثيرة اختبار GRE أو GMAT إضافة إلى المعدل ودرجة اللغة."],
            dl: [[["Suits you if", "يناسبك إذا"], ["You meet the program's GPA, test and English requirements.", "حققت شروط المعدل والاختبارات واللغة للبرنامج."]]],
            n: ["Al-Ruwwad and Imdad both include master's study.", "يشمل مسارا الرواد وإمداد دراسة الماجستير."] },
          { lv: "phd", b: ["5 years or more", "5 سنوات أو أكثر"], h: ["PhD", "الدكتوراه"],
            p: ["US PhDs usually take 5 years or more and start with coursework before your research. You apply to a program, and contacting professors first helps.", "تستغرق الدكتوراه في أمريكا عادةً 5 سنوات أو أكثر، وتبدأ بمواد دراسية قبل البحث. تقدّم على برنامج، والتواصل مع الأساتذة مسبقًا يساعدك."],
            dl: [[["Start by", "ابدأ بـ"], ["Shortlisting programs and professors who work in your area.", "اختيار البرامج والأساتذة الذين يعملون في مجالك."]]],
            n: ["the Ministry's FAQ says a PhD is covered for up to 3 years, so ask SACM early how extensions work.", "تذكر الأسئلة الشائعة للوزارة أن البعثة تغطي الدكتوراه حتى 3 سنوات، فاسأل الملحقية مبكرًا عن التمديد."] }
        ]
      },
      costs: {
        text: ["There is no single US government figure. Your university's I-20 shows its own estimate of living costs for a year. Costs vary a lot: New York, Boston and the San Francisco Bay Area cost far more than smaller college towns.",
          "لا يوجد رقم حكومي موحد في أمريكا. يظهر في نموذج I-20 تقدير جامعتك لتكاليف المعيشة لسنة. والتكاليف تختلف كثيرًا: نيويورك وبوسطن ومنطقة سان فرانسيسكو أغلى بكثير من المدن الجامعية الصغيرة."],
        src: { l: ["EducationUSA", "EducationUSA"], u: "https://educationusa.state.gov" },
        allowance: 1736,
        ex: { rent: 1500, food: 450, travel: 80, bills: 120 }
      },
      before: [
        [["Get your I-20 from the university", "احصل على نموذج I-20 من الجامعة"], ["The university issues the I-20 after it receives your SACM financial guarantee. You need it for the visa.", "تصدر الجامعة نموذج I-20 بعد أن يصلها الضمان المالي من الملحقية، وتحتاجه لطلب التأشيرة."]],
        [["Get your SACM financial guarantee", "احصل على الضمان المالي من الملحقية"], ["Request it on Safeer. US universities usually need it before the I-20, and again each semester for billing.", "اطلبه عبر منصة سفير. تحتاجه الجامعات الأمريكية عادةً قبل إصدار I-20، ثم كل فصل دراسي للفواتير."]],
        [["Pay the SEVIS fee (US$350)", "ادفع رسوم SEVIS (350 دولارًا)"], ["Pay the I-901 SEVIS fee online before your visa interview and keep the receipt.", "ادفع رسوم I-901 SEVIS إلكترونيًا قبل مقابلة التأشيرة واحتفظ بالإيصال."]],
        [["Apply for the F-1 student visa", "قدّم على تأشيرة الطالب F-1"], ["Fill in the DS-160 form, pay the US$185 visa fee and book an interview at the US Embassy in Riyadh or the consulates in Jeddah or Dhahran.", "عبّئ نموذج DS-160، وادفع رسوم التأشيرة 185 دولارًا، واحجز مقابلة في السفارة الأمريكية في الرياض أو القنصليتين في جدة والظهران."]],
        [["Check your health insurance", "تأكد من التأمين الصحي"], ["SACM provides health cover for its students in the US, so you can usually waive your university's plan. Check the waiver deadline.", "توفر الملحقية تأمينًا صحيًا لطلابها في أمريكا، فيمكنك عادةً الإعفاء من تأمين الجامعة. انتبه لموعد طلب الإعفاء."]],
        [["Sort out your first place to stay", "رتّب أول مكان تسكن فيه"], ["Apply early for university housing, or book a short stay and look for a place in person. See <a href=\"#housing\">Finding a place</a>.", "قدّم مبكرًا على سكن الجامعة، أو احجز سكنًا مؤقتًا وابحث بنفسك. انظر <a href=\"#housing\">البحث عن سكن</a>."]],
        [["Plan your arrival date", "خطط لموعد وصولك"], ["F-1 students can enter the US up to 30 days before the program start date on the I-20. Carry your I-20 in your hand luggage.", "يمكن لطلاب F-1 دخول أمريكا قبل 30 يومًا كحد أقصى من تاريخ بدء البرنامج في نموذج I-20. احمل نموذج I-20 في حقيبة اليد."]],
        [["Make copies of key documents", "انسخ مستنداتك المهمة"], ["Passport, visa, I-20, admission letter, SACM letters and transcripts. Keep digital copies too.", "الجواز، والتأشيرة، ونموذج I-20، وخطاب القبول، وخطابات الملحقية، والسجل الأكاديمي. واحتفظ بنسخ إلكترونية."]]
      ],
      arrival: [
        [["Get a US phone number", "احصل على رقم جوال أمريكي"], ["Prepaid plans from the main carriers are easy to set up with your passport.", "الباقات المسبقة الدفع من الشركات الكبرى سهلة التفعيل بجوازك."]],
        [["Report to the international students office", "راجع مكتب الطلاب الدوليين"], ["Most universities ask you to check in during your first week so your SEVIS record stays active.", "تطلب أغلب الجامعات أن تسجّل وصولك في أسبوعك الأول ليبقى سجلك في SEVIS نشطًا."]],
        [["Open a bank account", "افتح حسابًا بنكيًا"], ["Bring your passport, I-20 and proof of address. Many banks have branches on or near campus.", "أحضر جوازك ونموذج I-20 وإثبات العنوان. لكثير من البنوك فروع داخل الحرم أو قربه."]],
        [["Sort out transport", "رتّب المواصلات"], ["Get your {transport} for {city}. {tap}", "احصل على {transport} في {city}. {tap}"]],
        [["Complete your SACM arrival steps", "أكمل خطوات الوصول لدى الملحقية"], ["Update your details on Safeer and send SACM any documents it asks for, such as your enrolment confirmation.", "حدّث بياناتك في منصة سفير وأرسل للملحقية ما تطلبه من مستندات، مثل تأكيد التسجيل."]],
        [["Get a Social Security Number only if you work", "استخرج رقم الضمان الاجتماعي فقط إذا عملت"], ["You need an SSN only for a paid job, such as an on-campus job. Your international office explains how.", "تحتاج رقم SSN فقط لوظيفة مدفوعة، مثل العمل داخل الحرم. ويشرح لك مكتب الطلاب الدوليين الطريقة."]],
        [["Find your food and prayer spots", "اعرف أماكن الطعام والصلاة"], ["{food}", "{food}"]]
      ],
      housing: {
        intro: ["Many first-year international students live in university housing. If you rent privately, see the place in person before you pay anything.", "يسكن كثير من الطلاب الدوليين في سنتهم الأولى في سكن الجامعة. وإذا استأجرت سكنًا خاصًا فعاين المكان بنفسك قبل أن تدفع."],
        steps: [[["Before you fly", "قبل السفر"], ["Apply for university housing early, or book about 2 weeks of short-term housing near campus.", "قدّم مبكرًا على سكن الجامعة، أو احجز سكنًا مؤقتًا لمدة أسبوعين تقريبًا قرب الحرم."]],
          [["When you arrive", "عند وصولك"], ["Visit apartments, and check the lease length (often 12 months) and which bills are included.", "عاين الشقق، وتأكد من مدة العقد (غالبًا 12 شهرًا) والفواتير المشمولة."]],
          [["Before you sign", "قبل التوقيع"], ["Read the lease carefully and take dated photos on move-in day.", "اقرأ العقد بعناية والتقط صورًا مؤرخة يوم الانتقال."]]],
        cards: [
          { b: ["Easiest start", "أسهل بداية"], h: ["University housing", "سكن الجامعة"], p: ["Residence halls and university apartments. Apply through the housing office as soon as you are admitted.", "سكن داخلي وشقق جامعية. قدّم عبر مكتب السكن فور قبولك."],
            dl: [[["Best for", "الأنسب لـ"], ["Your first year", "سنتك الأولى"]], [["Watch out for", "انتبه إلى"], ["Contracts often run for the whole academic year, and some halls require a meal plan, which SACM does not pay for.", "العقود غالبًا لعام دراسي كامل، وبعض السكنات تشترط خطة وجبات لا تدفعها الملحقية."]]] },
          { b: ["More choice", "خيارات أكثر"], h: ["Private rentals", "السكن الخاص"], p: ["Apartments and rooms off campus, found through listing sites, the university's off-campus housing board and student groups.", "شقق وغرف خارج الحرم، تجدها في مواقع الإعلانات ولوحة السكن الخارجي في الجامعة ومجموعات الطلاب."],
            dl: [[["Lease", "العقد"], ["Usually 12 months, with a security deposit and sometimes a credit check.", "عادةً 12 شهرًا مع مبلغ تأمين، وأحيانًا فحص ائتماني."]], [["Best for", "الأنسب لـ"], ["Students who want their own space or move with family.", "من يريد مكانًا مستقلًا أو ينتقل مع عائلته."]]],
            sites: [["Apartments.com", "https://www.apartments.com"], ["Zillow Rentals", "https://www.zillow.com/rent/"]] }
        ],
        facts: [
          [["Deposit", "مبلغ التأمين"], ["Protect your deposit", "احمِ مبلغ التأمين"], ["Deposit rules depend on the state. Read <a data-u-link=\"bond-url\">{bond}</a> and keep dated photos of the place.", "أنظمة التأمين تختلف من ولاية لأخرى. اقرأ <a data-u-link=\"bond-url\">{bond}</a> واحتفظ بصور مؤرخة للمكان."]],
          [["Free help", "مساعدة مجانية"], ["Get a second opinion", "اطلب رأيًا آخر"], ["{legal}", "{legal}"]]
        ]
      },
      money: [
        [["Work limits", "حدود العمل"], ["Know your visa rules", "اعرف شروط تأشيرتك"], ["On an F-1 visa you can work on campus up to 20 hours a week during the semester and full time in official breaks. Work off campus needs special permission (CPT or OPT). Sponsored students should also check SACM's rules.", "بتأشيرة F-1 يمكنك العمل داخل الحرم حتى 20 ساعة أسبوعيًا أثناء الفصل، وبدوام كامل في الإجازات الرسمية. والعمل خارج الحرم يحتاج إذنًا خاصًا (CPT أو OPT). وعلى الطالب المبتعث مراجعة أنظمة الملحقية أيضًا."]],
        [["Tax", "الضرائب"], ["File Form 8843 every year", "قدّم نموذج 8843 كل عام"], ["Every F-1 student files Form 8843 each year, even with no income. If you work, you may also need a tax return.", "يقدّم كل طالب F-1 نموذج 8843 سنويًا حتى دون دخل. وإذا عملت فقد تحتاج أيضًا إلى إقرار ضريبي."]],
        [["Budget", "الميزانية"], ["Plan for rent first", "خطط للإيجار أولًا"], ["Rent is usually the biggest cost. Use the <a href=\"#allowance\">budget planner</a> and read <a href=\"#housing\">Finding a place</a>.", "الإيجار غالبًا أكبر التكاليف. استخدم <a href=\"#allowance\">حاسبة الميزانية</a> واقرأ <a href=\"#housing\">البحث عن سكن</a>."]]
      ],
      links: [
        { l: ["Student visa (F-1)", "تأشيرة الطالب (F-1)"], s: ["U.S. Department of State", "وزارة الخارجية الأمريكية"], u: "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html" },
        { l: ["Pay the SEVIS fee", "دفع رسوم SEVIS"], s: ["fmjfee.com (official)", "fmjfee.com (رسمي)"], u: "https://www.fmjfee.com" },
        { l: ["Study in the States", "Study in the States"], s: ["Department of Homeland Security", "وزارة الأمن الداخلي"], u: "https://studyinthestates.dhs.gov" },
        { l: ["EducationUSA", "EducationUSA"], s: ["Free advising on US study", "استشارات مجانية للدراسة في أمريكا"], u: "https://educationusa.state.gov" },
        { l: ["US Embassy in Saudi Arabia", "السفارة الأمريكية في السعودية"], s: ["Visa appointments", "مواعيد التأشيرات"], u: "https://sa.usembassy.gov/visas/" }
      ],
      journey: {
        fieldRoute: { en: { t: "Choose your field and your route", why: "Most US universities don't have a foundation year. Saudi students usually apply directly, or use an English or pathway program first.", what: ["Pick the field you want to study.", "Compare direct entry, a pathway program and an English program in the study options.", "Remember that SACM does not pay for English courses."] },
          ar: { t: "اختر تخصصك وطريقك", why: "أغلب الجامعات الأمريكية ليس لديها سنة تأسيسية. يقدّم الطلاب السعوديون عادةً مباشرة، أو يبدؤون ببرنامج لغة أو مسار.", what: ["اختر التخصص الذي تريد دراسته.", "قارن بين القبول المباشر وبرنامج المسار وبرنامج اللغة في خيارات الدراسة.", "تذكّر أن الملحقية لا تدفع تكلفة دورات اللغة."] } },
        offerF: { en: { t: "Apply and get your offer", why: "Your offer, and any conditions on it, decide when you can start your degree.", what: ["Apply to the university, or its pathway program, through its own website.", "If you get conditional admission, note what you must reach before the degree starts.", "Save the offer letter as a PDF."] },
          ar: { t: "قدّم واحصل على عرض القبول", why: "عرض القبول وشروطه يحددان موعد بدء دراستك.", what: ["قدّم على الجامعة، أو برنامج المسار فيها، عبر موقعها.", "إذا حصلت على قبول مشروط فدوّن ما يجب تحقيقه قبل بدء الدراسة.", "احفظ خطاب القبول بصيغة PDF."] } },
        progressF: { en: { t: "Move into your degree", why: "SACM needs a new guarantee letter when you move from a pathway program into the degree.", what: ["Reach the grades your pathway program requires.", "Request your new guarantee letter on Safeer early.", "Upload your results to Safeer each semester."] },
          ar: { t: "انتقل إلى البكالوريوس", why: "تحتاج الملحقية إلى خطاب ضمان جديد عند انتقالك من برنامج المسار إلى البكالوريوس.", what: ["حقق الدرجات التي يطلبها برنامج المسار.", "اطلب خطاب الضمان الجديد مبكرًا عبر منصة سفير.", "ارفع نتائجك على منصة سفير كل فصل."] } },
        safeer: { en: { t: "Get your guarantee letter and your I-20", why: "Your university issues the I-20 after it receives SACM's financial guarantee, and you need the I-20 for the visa.", what: ["After you are nominated, request the financial guarantee on Safeer.", "Send it to {school} and accept your offer.", "Check every detail on your I-20 when it arrives."] },
          ar: { t: "احصل على خطاب الضمان ونموذج I-20", why: "تصدر جامعتك نموذج I-20 بعد أن يصلها الضمان المالي من الملحقية، وتحتاج النموذج للتأشيرة.", what: ["بعد ترشيحك اطلب الضمان المالي عبر منصة سفير.", "أرسله إلى {school} واقبل العرض.", "راجع كل بيانات نموذج I-20 عند وصوله."] } },
        visa: { en: { t: "Pay the SEVIS fee and get your F-1 visa", why: "You need the F-1 visa to study in the US, and the visa interview needs your I-20 and SEVIS receipt.", what: ["Pay the US$350 SEVIS fee online.", "Fill in the DS-160 and pay the US$185 visa fee.", "Book your interview in Riyadh, Jeddah or Dhahran, and bring your I-20 and SACM letters."] },
          ar: { t: "ادفع رسوم SEVIS واحصل على تأشيرة F-1", why: "تحتاج تأشيرة F-1 للدراسة في أمريكا، وتتطلب المقابلة نموذج I-20 وإيصال SEVIS.", what: ["ادفع رسوم SEVIS البالغة 350 دولارًا إلكترونيًا.", "عبّئ نموذج DS-160 وادفع رسوم التأشيرة 185 دولارًا.", "احجز مقابلتك في الرياض أو جدة أو الظهران، وأحضر نموذج I-20 وخطابات الملحقية."] },
          links: [["Student visa (F-1)", "تأشيرة الطالب F-1", "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html"], ["Pay the SEVIS fee", "دفع رسوم SEVIS", "https://www.fmjfee.com"]] },
        housing: { en: { t: "Sort out your first place to stay", why: "University housing fills up fast, and private leases are usually for 12 months.", what: ["Apply for university housing as soon as you are admitted.", "If you rent privately, book about 2 weeks of short-term housing and look in person.", "Never pay a deposit for a place you haven't seen."] },
          ar: { t: "رتّب أول مكان تسكن فيه", why: "سكن الجامعة يمتلئ بسرعة، وعقود السكن الخاص غالبًا لمدة 12 شهرًا.", what: ["قدّم على سكن الجامعة فور قبولك.", "إذا اخترت السكن الخاص فاحجز سكنًا مؤقتًا لمدة أسبوعين تقريبًا وابحث بنفسك.", "لا تدفع تأمينًا لمكان لم تره."] } }
      }
    },

    // ------------------------------------------------------------------ UK
    uk: {
      pathF: ["Your path to a foundation year", "طريقك إلى سنة الفاونديشن"],
      name: ["the UK", "بريطانيا"], inPlace: ["in the UK", "في بريطانيا"], short: ["UK", "بريطانيا"],
      cur: "£",
      lede: ["A free guide for Saudi students who want to study in the UK. It covers your study options, how the scholarship works, what to sort out before you fly, and your first weeks.",
        "دليل مجاني للطلاب السعوديين الراغبين في الدراسة في بريطانيا. يشرح لك خيارات الدراسة، وطريقة عمل الابتعاث، وما تحتاج إلى ترتيبه قبل السفر، وأسابيعك الأولى."],
      mission: { name: ["the Saudi Cultural Bureau in London", "الملحقية الثقافية السعودية في لندن"], where: ["London (it also covers Ireland)", "لندن (وتشمل أيضًا إيرلندا)"], url: "https://sites.moe.gov.sa/cm/uk/" },
      collegeSub: ["Foundation or English programs", "برامج الفاونديشن أو اللغة"],
      labels: { college: ["Foundation year", "سنة الفاونديشن"], union: ["Students' union", "اتحاد الطلاب"], bond: ["Deposit protection", "حماية مبلغ التأمين"] },
      generic: {
        en: { college: "the university's foundation year", union: "your students' union", legal: "Most students' unions run a free advice centre for housing and money problems. Ask yours.", transport: "local travel card", bond: "a government-approved deposit protection scheme", food: "Ask your university's Islamic Society (ISoc) about halal food and prayer rooms.", tap: "You can also tap in with a contactless bank card or phone on most city transport." },
        ar: { college: "سنة الفاونديشن في الجامعة", union: "اتحاد الطلاب في جامعتك", legal: "تدير أغلب اتحادات الطلاب مركز استشارات مجانيًا لمشكلات السكن والمال. اسأل اتحاد جامعتك.", transport: "بطاقة المواصلات المحلية", bond: "نظام حكومي معتمد لحماية مبلغ التأمين", food: "اسأل الجمعية الإسلامية (ISoc) في جامعتك عن المطاعم الحلال وأماكن الصلاة.", tap: "يمكنك أيضًا الدفع بالبطاقة البنكية اللاتلامسية أو الجوال في أغلب مواصلات المدن." }
      },
      enrolDoc: ["CAS", "رقم CAS"],
      health: ["(NHS access through the immigration health surcharge)", "(خدمات NHS عبر رسوم الصحة للهجرة)"],
      missionShort: ["the Cultural Bureau", "الملحقية"],
      options: {
        intro: ["Most UK universities do not accept the Saudi secondary certificate on its own for direct entry to a bachelor's, so many Saudi students start with a foundation year.",
          "لا تقبل أغلب الجامعات البريطانية شهادة الثانوية السعودية وحدها للقبول المباشر في البكالوريوس، لذلك يبدأ كثير من الطلاب السعوديين بسنة الفاونديشن."],
        cards: [
          { lv: "foundation", b: ["About 1 year", "سنة تقريبًا"], h: ["International Foundation Year", "سنة الفاونديشن الدولية"],
            p: ["A one-year program run by the university or a partner college. It prepares you in your subject and English and leads to first year.", "برنامج لمدة سنة تديره الجامعة أو كلية شريكة، يجهزك في تخصصك وفي اللغة ويؤدي إلى السنة الأولى."],
            dl: [[["Leads to", "يؤدي إلى"], ["Year 1 of a linked degree, if you reach the required grades.", "السنة الأولى في تخصص مرتبط إذا حققت الدرجات المطلوبة."]]],
            n: ["get SACM approval for the foundation year and the degree it leads to before you accept.", "احصل على موافقة الملحقية على سنة الفاونديشن والبكالوريوس الذي تؤدي إليه قبل قبول العرض."] },
          { lv: "bachelor", b: ["Direct entry", "قبول مباشر"], h: ["Start the bachelor's degree", "ابدأ البكالوريوس"],
            p: ["Possible if you hold qualifications the university accepts, such as A levels, the IB or a year of university study. Most bachelor's degrees take 3 years in England and 4 in Scotland.", "ممكن إذا كان لديك مؤهل تقبله الجامعة، مثل A levels أو IB أو سنة دراسة جامعية. ويستغرق البكالوريوس عادةً 3 سنوات في إنجلترا و4 في اسكتلندا."],
            dl: [[["Apply through", "التقديم عبر"], ["UCAS", "منصة UCAS"]]],
            n: ["the university must be on the Ministry's list for your track and field.", "يجب أن تكون الجامعة ضمن قائمة الوزارة لمسارك وتخصصك."] },
          { lv: "", b: ["Weeks to months", "أسابيع إلى أشهر"], h: ["Pre-sessional English", "اللغة قبل بدء الدراسة (Pre-sessional)"],
            p: ["A course before your degree for students who are close to the English score they need.", "دورة قبل بدء الدراسة للطلاب القريبين من درجة اللغة المطلوبة."],
            dl: [[["Suits you if", "يناسبك إذا"], ["Your IELTS is slightly below your offer's condition.", "كانت درجة IELTS أقل قليلًا من شرط القبول."]]],
            n: ["SACM does not sponsor English courses, so you pay for them yourself.", "الملحقية لا تبتعث على دورات اللغة، فتدفع تكلفتها بنفسك."] },
          { lv: "master", b: ["1 year", "سنة واحدة"], h: ["Master's degree", "الماجستير"],
            p: ["Most taught master's degrees in the UK take 1 year full time. Some science and engineering subjects need an ATAS certificate before the visa.", "يستغرق أغلب الماجستير بالمقررات في بريطانيا سنة واحدة بدوام كامل، وبعض تخصصات العلوم والهندسة تحتاج شهادة ATAS قبل التأشيرة."],
            dl: [[["Suits you if", "يناسبك إذا"], ["You meet the program's grade and English requirements.", "حققت شروط المعدل واللغة للبرنامج."]]],
            n: ["Al-Ruwwad and Imdad both include master's study.", "يشمل مسارا الرواد وإمداد دراسة الماجستير."] },
          { lv: "phd", b: ["3 to 4 years", "3 إلى 4 سنوات"], h: ["PhD", "الدكتوراه"],
            p: ["A research degree with a supervisor. Contact possible supervisors and prepare a research proposal before you apply.", "درجة بحثية مع مشرف. تواصل مع المشرفين المحتملين وجهّز مقترحًا بحثيًا قبل التقديم."],
            dl: [[["Start by", "ابدأ بـ"], ["Finding a supervisor in your area.", "البحث عن مشرف في مجالك."]]],
            n: ["PhDs are sponsored through the Research & Development track.", "يكون الابتعاث للدكتوراه عبر مسار البحث والتطوير."] }
        ]
      },
      costs: {
        text: ["For the Student visa, the UK government expects you to have £1,529 a month in London or £1,171 a month elsewhere, for up to 9 months. These are its official figures for a student's living costs.",
          "لتأشيرة الطالب تشترط الحكومة البريطانية توفر 1,529 جنيهًا شهريًا في لندن أو 1,171 جنيهًا في باقي المدن، لمدة تصل إلى 9 أشهر. وهذه أرقامها الرسمية لتكاليف معيشة الطالب."],
        src: { l: ["GOV.UK: Student visa money", "GOV.UK: المبلغ المطلوب لتأشيرة الطالب"], u: "https://www.gov.uk/student-visa/money" },
        ex: { rent: 800, food: 250, travel: 80, bills: 60 }
      },
      before: [
        [["Get your CAS from the university", "احصل على رقم CAS من الجامعة"], ["After you accept an unconditional offer, the university gives you a Confirmation of Acceptance for Studies (CAS) number for the visa.", "بعد قبولك عرضًا غير مشروط تعطيك الجامعة رقم تأكيد القبول للدراسة (CAS) لطلب التأشيرة."]],
        [["Get your financial guarantee", "احصل على الضمان المالي"], ["Request it on Safeer. Your university needs it to confirm that the Cultural Bureau pays your tuition.", "اطلبه عبر منصة سفير، فجامعتك تحتاجه لتتأكد أن الملحقية تدفع رسومك."]],
        [["Check if you need ATAS", "تحقق إن كنت تحتاج شهادة ATAS"], ["Some master's and PhD subjects in science and engineering need an ATAS certificate before you apply for the visa.", "بعض تخصصات الماجستير والدكتوراه في العلوم والهندسة تحتاج شهادة ATAS قبل التقديم على التأشيرة."]],
        [["Apply for the Student visa", "قدّم على تأشيرة الطالب"], ["Apply online up to 6 months before your course starts. The fee is £558 from outside the UK, plus the immigration health surcharge of £776 a year, which lets you use the NHS.", "قدّم إلكترونيًا قبل بدء الدراسة بستة أشهر كحد أقصى. الرسوم 558 جنيهًا من خارج بريطانيا، إضافة إلى رسوم الصحة 776 جنيهًا سنويًا التي تتيح لك خدمات NHS."]],
        [["Set up your UKVI account and eVisa", "أنشئ حساب UKVI والتأشيرة الإلكترونية"], ["The UK now uses eVisas instead of a physical card. Create your UKVI account and keep your login safe.", "تستخدم بريطانيا الآن التأشيرة الإلكترونية بدل البطاقة. أنشئ حسابك في UKVI واحفظ بيانات الدخول."]],
        [["Book your first place to stay", "احجز أول مكان تسكن فيه"], ["Apply early for university halls, or book a short stay and look in person. See <a href=\"#housing\">Finding a place</a>.", "قدّم مبكرًا على سكن الجامعة، أو احجز سكنًا مؤقتًا وابحث بنفسك. انظر <a href=\"#housing\">البحث عن سكن</a>."]],
        [["Make copies of key documents", "انسخ مستنداتك المهمة"], ["Passport, CAS, offer letter, visa decision, sponsor letters and transcripts. Keep digital copies too.", "الجواز، ورقم CAS، وخطاب القبول، وقرار التأشيرة، وخطابات الجهة الراعية، والسجل الأكاديمي. واحتفظ بنسخ إلكترونية."]]
      ],
      arrival: [
        [["Get a UK SIM card", "احصل على شريحة بريطانية"], ["Prepaid SIM plans need only your passport.", "الشرائح المسبقة الدفع تحتاج جوازك فقط."]],
        [["Complete your university enrolment", "أكمل تسجيلك في الجامعة"], ["Finish online enrolment and show your passport and eVisa if asked.", "أكمل التسجيل الإلكتروني وأظهر جوازك وتأشيرتك الإلكترونية عند الطلب."]],
        [["Open a bank account", "افتح حسابًا بنكيًا"], ["Bring your passport and a university letter. Some banks let you apply in their app.", "أحضر جوازك وخطابًا من الجامعة. وبعض البنوك تتيح التقديم عبر تطبيقها."]],
        [["Sort out transport", "رتّب المواصلات"], ["Get your {transport} for {city}. {tap}", "احصل على {transport} في {city}. {tap}"]],
        [["Register with a GP", "سجّل لدى طبيب عام (GP)"], ["You paid the health surcharge, so you can use the NHS. Register with a GP near your home in your first weeks.", "دفعت رسوم الصحة، فيحق لك استخدام NHS. سجّل لدى طبيب عام قرب سكنك في أسابيعك الأولى."]],
        [["Complete your arrival steps with the Cultural Bureau", "أكمل خطوات الوصول لدى الملحقية"], ["Update your details on Safeer and send any documents the Cultural Bureau asks for.", "حدّث بياناتك في منصة سفير وأرسل ما تطلبه الملحقية من مستندات."]],
        [["Find your food and prayer spots", "اعرف أماكن الطعام والصلاة"], ["{food}", "{food}"]]
      ],
      housing: {
        intro: ["Most first-year students live in university halls. After that, many share a house or flat with other students.", "يسكن أغلب طلاب السنة الأولى في سكن الجامعة، وبعدها يتشارك كثيرون منزلًا أو شقة مع طلاب آخرين."],
        steps: [[["Before you fly", "قبل السفر"], ["Apply for halls as soon as you accept your offer, or book a short stay near campus.", "قدّم على سكن الجامعة فور قبول العرض، أو احجز سكنًا مؤقتًا قرب الحرم."]],
          [["When you arrive", "عند وصولك"], ["View rooms in person, and check what bills are included.", "عاين الغرف بنفسك، وتأكد من الفواتير المشمولة."]],
          [["Before you sign", "قبل التوقيع"], ["Read the tenancy agreement and ask which scheme protects your deposit.", "اقرأ عقد الإيجار واسأل عن النظام الذي يحمي مبلغ التأمين."]]],
        cards: [
          { b: ["Easiest start", "أسهل بداية"], h: ["University halls", "سكن الجامعة"], p: ["Rooms in university residences, often with bills included. Many universities guarantee a place for first-year international students who apply on time.", "غرف في سكن الجامعة، غالبًا تشمل الفواتير. وكثير من الجامعات تضمن مكانًا لطلاب السنة الأولى الدوليين إذا قدّموا في الموعد."],
            dl: [[["Best for", "الأنسب لـ"], ["Your first year", "سنتك الأولى"]]] },
          { b: ["After year 1", "بعد السنة الأولى"], h: ["Shared houses and flats", "منازل وشقق مشتركة"], p: ["Rooms in shared homes, or whole flats through letting agents.", "غرف في منازل مشتركة، أو شقق كاملة عبر وكلاء التأجير."],
            dl: [[["Lease", "العقد"], ["Often 12 months. In England, the deposit is capped at 5 weeks' rent for most tenancies.", "غالبًا 12 شهرًا. وفي إنجلترا لا يتجاوز التأمين إيجار 5 أسابيع لأغلب العقود."]]],
            sites: [["SpareRoom", "https://www.spareroom.co.uk"], ["Rightmove", "https://www.rightmove.co.uk"]] }
        ],
        facts: [
          [["Deposit", "مبلغ التأمين"], ["Your deposit must be protected", "يجب حماية مبلغ التأمين"], ["Landlords must put your deposit in <a data-u-link=\"bond-url\">{bond}</a> and tell you which one.", "يجب أن يضع المالك مبلغ التأمين في <a data-u-link=\"bond-url\">{bond}</a> ويخبرك به."]],
          [["Council tax", "ضريبة البلدية"], ["Full-time students don't pay it", "الطلاب بدوام كامل معفون منها"], ["Ask your university for a student certificate to claim the exemption.", "اطلب من جامعتك شهادة طالب للحصول على الإعفاء."]],
          [["Free help", "مساعدة مجانية"], ["Get a second opinion", "اطلب رأيًا آخر"], ["{legal}", "{legal}"]]
        ]
      },
      money: [
        [["Work limits", "حدود العمل"], ["Know your visa rules", "اعرف شروط تأشيرتك"], ["Degree students can usually work up to 20 hours a week in term time and full time in official vacations. Check the exact conditions on your eVisa, and SACM's rules.", "يستطيع طلاب البكالوريوس وما فوقه عادةً العمل حتى 20 ساعة أسبوعيًا أثناء الدراسة وبدوام كامل في الإجازات الرسمية. راجع الشروط في تأشيرتك الإلكترونية وأنظمة الملحقية."]],
        [["Tax", "الضرائب"], ["Get a National Insurance number", "احصل على رقم التأمين الوطني"], ["You need it to work. Apply online.", "تحتاجه للعمل، والتقديم إلكتروني."]],
        [["Budget", "الميزانية"], ["Plan for rent first", "خطط للإيجار أولًا"], ["Rent is the biggest cost, especially in London. Use the <a href=\"#allowance\">budget planner</a>.", "الإيجار أكبر التكاليف، خاصة في لندن. استخدم <a href=\"#allowance\">حاسبة الميزانية</a>."]]
      ],
      links: [
        { l: ["Student visa", "تأشيرة الطالب"], s: ["GOV.UK", "GOV.UK"], u: "https://www.gov.uk/student-visa" },
        { l: ["Immigration health surcharge", "رسوم الصحة للهجرة"], s: ["GOV.UK", "GOV.UK"], u: "https://www.gov.uk/healthcare-immigration-application" },
        { l: ["ATAS certificate", "شهادة ATAS"], s: ["GOV.UK", "GOV.UK"], u: "https://www.gov.uk/guidance/academic-technology-approval-scheme" },
        { l: ["eVisa and UKVI account", "التأشيرة الإلكترونية وحساب UKVI"], s: ["GOV.UK", "GOV.UK"], u: "https://www.gov.uk/evisa" },
        { l: ["UCAS", "UCAS"], s: ["Undergraduate applications", "التقديم على البكالوريوس"], u: "https://www.ucas.com" },
        { l: ["UKCISA", "UKCISA"], s: ["Advice for international students", "استشارات للطلاب الدوليين"], u: "https://www.ukcisa.org.uk" },
        { l: ["Tenancy deposit protection", "حماية مبلغ التأمين"], s: ["GOV.UK", "GOV.UK"], u: "https://www.gov.uk/tenancy-deposit-protection" },
        { l: ["National Insurance number", "رقم التأمين الوطني"], s: ["GOV.UK", "GOV.UK"], u: "https://www.gov.uk/apply-national-insurance-number" }
      ],
      journey: {
        fieldRoute: { en: { t: "Choose your field and your foundation year", why: "Most UK universities need a foundation year before a bachelor's for students with the Saudi secondary certificate.", what: ["Pick the field you want to study.", "Find foundation years linked to the universities you want.", "Check that the foundation year leads to the degree you want."] },
          ar: { t: "اختر تخصصك وسنة الفاونديشن", why: "تشترط أغلب الجامعات البريطانية سنة الفاونديشن قبل البكالوريوس لحملة الثانوية السعودية.", what: ["اختر التخصص الذي تريد دراسته.", "ابحث عن برامج الفاونديشن المرتبطة بالجامعات التي تريدها.", "تأكد أن الفاونديشن يؤدي إلى البكالوريوس الذي تريده."] } },
        offerF: { en: { t: "Apply for your foundation year", why: "A foundation linked to a degree gives you a clear path into first year.", what: ["Apply on the university's or college's website.", "Ask whether the offer includes progression to the degree.", "Save the offer letter as a PDF."] },
          ar: { t: "قدّم على سنة الفاونديشن", why: "الفاونديشن المرتبط بتخصص يمنحك طريقًا واضحًا إلى السنة الأولى.", what: ["قدّم عبر موقع الجامعة أو الكلية.", "اسأل إن كان العرض يشمل الانتقال إلى البكالوريوس.", "احفظ خطاب القبول بصيغة PDF."] } },
        safeer: { en: { t: "Get your guarantee letter and your CAS", why: "Your university issues your CAS once your offer is unconditional and your funding is confirmed. You need the CAS for the visa.", what: ["After you are nominated, request the financial guarantee on Safeer.", "Send it to {school} and accept your offer.", "Check every detail in your CAS statement."] },
          ar: { t: "احصل على خطاب الضمان ورقم CAS", why: "تصدر جامعتك رقم CAS بعد أن يصبح قبولك غير مشروط ويتأكد التمويل، وتحتاجه للتأشيرة.", what: ["بعد ترشيحك اطلب الضمان المالي عبر منصة سفير.", "أرسله إلى {school} واقبل العرض.", "راجع كل بيانات CAS."] } },
        visa: { en: { t: "Apply for the Student visa", why: "You need the Student visa to study in the UK, and the health surcharge gives you access to the NHS.", what: ["Check whether your course needs an ATAS certificate.", "Apply online with your CAS: £558 plus £776 a year for the health surcharge.", "Set up your UKVI account to see your eVisa."] },
          ar: { t: "قدّم على تأشيرة الطالب", why: "تحتاج تأشيرة الطالب للدراسة في بريطانيا، ورسوم الصحة تتيح لك خدمات NHS.", what: ["تحقق إن كان تخصصك يحتاج شهادة ATAS.", "قدّم إلكترونيًا برقم CAS: الرسوم 558 جنيهًا، و776 جنيهًا سنويًا لرسوم الصحة.", "أنشئ حساب UKVI لتظهر لك تأشيرتك الإلكترونية."] },
          links: [["Student visa", "تأشيرة الطالب", "https://www.gov.uk/student-visa"], ["ATAS", "شهادة ATAS", "https://www.gov.uk/guidance/academic-technology-approval-scheme"]] },
        housing: { en: { t: "Book your first place to stay", why: "Halls are the easiest start, and many universities guarantee first-year places if you apply on time.", what: ["Apply for halls as soon as you accept your offer.", "If you rent privately, view rooms in person first.", "Ask which scheme protects your deposit."] },
          ar: { t: "احجز أول مكان تسكن فيه", why: "سكن الجامعة أسهل بداية، وكثير من الجامعات تضمن مكانًا لطلاب السنة الأولى إذا قدّموا في الموعد.", what: ["قدّم على سكن الجامعة فور قبول العرض.", "إذا اخترت السكن الخاص فعاين الغرف بنفسك أولًا.", "اسأل عن النظام الذي يحمي مبلغ التأمين."] } },
        progressF: { en: { t: "Progress into your degree", why: "To move into first year you must reach the foundation's grades, and SACM needs a new guarantee letter.", what: ["Keep your grades above the progression mark.", "Request your new guarantee letter early on Safeer.", "Upload your results to Safeer each term."] },
          ar: { t: "انتقل إلى البكالوريوس", why: "للانتقال إلى السنة الأولى يجب أن تحقق درجات الفاونديشن، وتحتاج الملحقية إلى خطاب ضمان جديد.", what: ["حافظ على درجاتك فوق حد الانتقال.", "اطلب خطاب الضمان الجديد مبكرًا عبر منصة سفير.", "ارفع نتائجك على منصة سفير كل فصل."] } }
      }
    },

    // ------------------------------------------------------------------ Canada
    ca: {
      noF: true,
      pathF: ["Your path to a pathway program", "طريقك إلى برنامج المسار"],
      name: ["Canada", "كندا"], inPlace: ["in Canada", "في كندا"], short: ["Canada", "كندا"],
      cur: "CA$",
      lede: ["A free guide for Saudi students who want to study in Canada. It covers your study options, how the scholarship works, what to sort out before you fly, and your first weeks.",
        "دليل مجاني للطلاب السعوديين الراغبين في الدراسة في كندا. يشرح لك خيارات الدراسة، وطريقة عمل الابتعاث، وما تحتاج إلى ترتيبه قبل السفر، وأسابيعك الأولى."],
      mission: { name: ["the Saudi Arabian Cultural Bureau in Canada", "الملحقية الثقافية السعودية في كندا"], where: ["2101 Thurston Drive, Ottawa", "2101 Thurston Drive، أوتاوا"], url: "https://sites.moe.gov.sa/cm/ca/" },
      labels: { college: ["Pathway or English program", "برنامج المسار أو اللغة"], union: ["International student services", "خدمات الطلاب الدوليين"], bond: ["Tenant rules", "أنظمة الإيجار"] },
      generic: {
        en: { college: "the university's pathway or English program", union: "international student services", legal: "Many Canadian universities and student unions offer free legal clinics for students. Ask yours.", transport: "local transit card", bond: "your province's tenant rules", food: "Ask the Muslim Students' Association (MSA) at your university about halal food and prayer spaces.", tap: "Many Canadian transit systems also take contactless bank cards and phones." },
        ar: { college: "برنامج المسار أو اللغة في الجامعة", union: "خدمات الطلاب الدوليين", legal: "تقدم كثير من الجامعات واتحادات الطلاب في كندا عيادات قانونية مجانية للطلاب. اسأل جامعتك.", transport: "بطاقة المواصلات المحلية", bond: "أنظمة الإيجار في مقاطعتك", food: "اسأل جمعية الطلاب المسلمين (MSA) في جامعتك عن المطاعم الحلال وأماكن الصلاة.", tap: "تقبل كثير من أنظمة المواصلات في كندا أيضًا البطاقات البنكية اللاتلامسية والجوال." }
      },
      enrolDoc: ["letter of acceptance", "خطاب القبول"],
      health: ["(a provincial or university health plan)", "(خطة صحية من المقاطعة أو الجامعة)"],
      missionShort: ["the Cultural Bureau", "الملحقية"],
      options: {
        intro: ["Canadian universities admit students straight from high school, and many accept the Saudi secondary certificate with strong grades and an English score.",
          "تقبل الجامعات الكندية الطلاب مباشرة بعد الثانوية، وكثير منها يقبل شهادة الثانوية السعودية مع معدل مرتفع ودرجة لغة."],
        cards: [
          { lv: "bachelor", b: ["Direct entry", "قبول مباشر"], h: ["Start the bachelor's degree", "ابدأ البكالوريوس"],
            p: ["Most bachelor's degrees take 4 years. Each university lists the grades and English score it needs for the Saudi certificate.", "يستغرق البكالوريوس عادةً 4 سنوات، وتذكر كل جامعة المعدل ودرجة اللغة المطلوبين لشهادة الثانوية السعودية."],
            dl: [[["Apply through", "التقديم عبر"], ["The university, or OUAC for Ontario universities", "الجامعة، أو منصة OUAC لجامعات أونتاريو"]]],
            n: ["the university must be on the Ministry's list for your track and field.", "يجب أن تكون الجامعة ضمن قائمة الوزارة لمسارك وتخصصك."] },
          { lv: "", b: ["Weeks to months", "أسابيع إلى أشهر"], h: ["English language program", "برنامج اللغة الإنجليزية"],
            p: ["University English programs can lead to conditional admission once you reach their level.", "برامج اللغة في الجامعات قد تؤدي إلى قبول مشروط عند بلوغ مستواها."],
            dl: [[["Suits you if", "يناسبك إذا"], ["Your English score is below the university's level.", "كانت درجة اللغة أقل من مستوى الجامعة."]]],
            n: ["SACM does not sponsor English courses, so you pay for them yourself.", "الملحقية لا تبتعث على دورات اللغة، فتدفع تكلفتها بنفسك."] },
          { lv: "master", b: ["1 to 2 years", "سنة إلى سنتين"], h: ["Master's degree", "الماجستير"],
            p: ["Course-based master's take 1 to 2 years, and thesis-based master's usually 2 years.", "يستغرق الماجستير بالمقررات من سنة إلى سنتين، والماجستير البحثي عادةً سنتين."],
            dl: [[["Suits you if", "يناسبك إذا"], ["You meet the program's GPA and English requirements.", "حققت شروط المعدل واللغة للبرنامج."]]],
            n: ["Al-Ruwwad and Imdad both include master's study.", "يشمل مسارا الرواد وإمداد دراسة الماجستير."] },
          { lv: "phd", b: ["4 to 6 years", "4 إلى 6 سنوات"], h: ["PhD", "الدكتوراه"],
            p: ["Usually includes some courses and a thesis with a supervisor. Contacting supervisors early helps.", "تتضمن عادةً بعض المواد ورسالة مع مشرف، والتواصل المبكر مع المشرفين يساعدك."],
            dl: [[["Start by", "ابدأ بـ"], ["Finding a supervisor in your area.", "البحث عن مشرف في مجالك."]]],
            n: ["the Ministry's FAQ says a PhD is covered for up to 3 years, so ask the Cultural Bureau early how extensions work.", "تذكر الأسئلة الشائعة للوزارة أن البعثة تغطي الدكتوراه حتى 3 سنوات، فاسأل الملحقية مبكرًا عن التمديد."] }
        ]
      },
      costs: {
        text: ["For a study permit, Canada's official living-cost figure for a single student is CA$23,448 a year (for applications from 1 September 2026), on top of tuition and travel. Quebec sets its own amount.",
          "لتصريح الدراسة، الرقم الرسمي لتكاليف معيشة الطالب الأعزب في كندا هو 23,448 دولارًا كنديًا سنويًا (للطلبات من 1 سبتمبر 2026)، إضافة إلى الرسوم والسفر. ولمقاطعة كيبيك رقمها الخاص."],
        src: { l: ["IRCC: proof of financial support", "IRCC: إثبات القدرة المالية"], u: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents/financial-support.html" },
        ex: { rent: 1200, food: 400, travel: 110, bills: 90 }
      },
      before: [
        [["Get your letter of acceptance", "احصل على خطاب القبول"], ["Your university's letter of acceptance is the document you need for the study permit.", "خطاب القبول من جامعتك هو المستند الذي تحتاجه لتصريح الدراسة."]],
        [["Get a provincial attestation letter (PAL), if you need one", "احصل على خطاب الإقرار من المقاطعة (PAL) إن احتجته"], ["Most applicants need a PAL from the province. From 1 January 2026, master's and PhD students at public universities are exempt. Quebec uses the CAQ instead.", "يحتاج أغلب المتقدمين خطاب PAL من المقاطعة. ومن 1 يناير 2026 يُعفى طلاب الماجستير والدكتوراه في الجامعات الحكومية. وتستخدم كيبيك شهادة CAQ بدلًا منه."]],
        [["Get your financial guarantee", "احصل على الضمان المالي"], ["Request it on Safeer. Your university and the study permit both need proof that the Cultural Bureau funds you.", "اطلبه عبر منصة سفير، فجامعتك وتصريح الدراسة يحتاجان إثبات تمويل الملحقية لك."]],
        [["Apply for the study permit", "قدّم على تصريح الدراسة"], ["Apply online with IRCC and give your biometrics. The fee is CA$150, plus CA$85 for biometrics.", "قدّم إلكترونيًا لدى IRCC وقدّم البصمات. الرسوم 150 دولارًا كنديًا، و85 للبصمات."]],
        [["Check your health cover", "تأكد من التأمين الصحي"], ["Health cover depends on the province, and many universities enrol international students in a plan automatically. Ask your university and the Cultural Bureau what applies to you.", "التأمين الصحي يختلف حسب المقاطعة، وكثير من الجامعات تسجل الطلاب الدوليين في خطة تلقائيًا. اسأل جامعتك والملحقية عما ينطبق عليك."]],
        [["Book your first place to stay", "احجز أول مكان تسكن فيه"], ["Apply early for residence, or book a short stay and look in person. See <a href=\"#housing\">Finding a place</a>.", "قدّم مبكرًا على سكن الجامعة، أو احجز سكنًا مؤقتًا وابحث بنفسك. انظر <a href=\"#housing\">البحث عن سكن</a>."]],
        [["Carry your letter of introduction", "احمل خطاب التعريف (POE)"], ["You get the study permit itself at the airport in Canada. Bring the letter of introduction from IRCC, your passport and your acceptance letter in your hand luggage.", "تستلم تصريح الدراسة نفسه في المطار عند وصولك إلى كندا. احمل خطاب التعريف من IRCC وجوازك وخطاب القبول في حقيبة اليد."]]
      ],
      arrival: [
        [["Check your study permit at the airport", "راجع تصريح الدراسة في المطار"], ["The border officer prints your study permit when you land. Check your name, school and conditions before you leave.", "يطبع موظف الحدود تصريح الدراسة عند وصولك. راجع اسمك وجامعتك والشروط قبل مغادرة المطار."]],
        [["Get a Canadian phone number", "احصل على رقم جوال كندي"], ["Prepaid plans are easy to set up with your passport.", "الباقات المسبقة الدفع سهلة التفعيل بجوازك."]],
        [["Open a bank account", "افتح حسابًا بنكيًا"], ["Bring your passport and study permit. Many banks have student accounts with no fees.", "أحضر جوازك وتصريح الدراسة. ولدى كثير من البنوك حسابات طلابية دون رسوم."]],
        [["Sort out transport", "رتّب المواصلات"], ["Get your {transport} for {city}. {tap}", "احصل على {transport} في {city}. {tap}"]],
        [["Apply for a Social Insurance Number", "قدّم على رقم التأمين الاجتماعي (SIN)"], ["You need a SIN to work in Canada. Apply online or at a Service Canada office.", "تحتاج رقم SIN للعمل في كندا. قدّم إلكترونيًا أو في مكتب Service Canada."]],
        [["Complete your arrival steps with the Cultural Bureau", "أكمل خطوات الوصول لدى الملحقية"], ["Update your details on Safeer and send any documents the Cultural Bureau asks for.", "حدّث بياناتك في منصة سفير وأرسل ما تطلبه الملحقية من مستندات."]],
        [["Find your food and prayer spots", "اعرف أماكن الطعام والصلاة"], ["{food}", "{food}"]]
      ],
      housing: {
        intro: ["Many first-year students live in university residence. Rent in Toronto and Vancouver is high, so start looking early.", "يسكن كثير من طلاب السنة الأولى في سكن الجامعة. والإيجارات في تورنتو وفانكوفر مرتفعة، فابدأ البحث مبكرًا."],
        steps: [[["Before you fly", "قبل السفر"], ["Apply for residence early, or book about 2 weeks of short-term housing near campus.", "قدّم مبكرًا على سكن الجامعة، أو احجز سكنًا مؤقتًا لمدة أسبوعين تقريبًا قرب الحرم."]],
          [["When you arrive", "عند وصولك"], ["View places in person and check what utilities are included.", "عاين الأماكن بنفسك وتأكد من الخدمات المشمولة."]],
          [["Before you sign", "قبل التوقيع"], ["Use your province's standard lease where there is one, and keep dated photos.", "استخدم عقد الإيجار القياسي في مقاطعتك إن وُجد، واحتفظ بصور مؤرخة."]]],
        cards: [
          { b: ["Easiest start", "أسهل بداية"], h: ["University residence", "سكن الجامعة"], p: ["Rooms on or near campus, often with a meal plan for first-year students.", "غرف داخل الحرم أو قربه، غالبًا مع خطة وجبات لطلاب السنة الأولى."],
            dl: [[["Watch out for", "انتبه إلى"], ["Meal plans can be compulsory in first-year residence, and SACM does not pay for them.", "قد تكون خطة الوجبات إلزامية في سكن السنة الأولى، ولا تدفعها الملحقية."]]] },
          { b: ["More choice", "خيارات أكثر"], h: ["Private rentals", "السكن الخاص"], p: ["Rooms and apartments off campus, through the university's off-campus housing service and listing sites.", "غرف وشقق خارج الحرم، عبر خدمة السكن الخارجي في الجامعة ومواقع الإعلانات."],
            dl: [[["Lease", "العقد"], ["Often 12 months.", "غالبًا 12 شهرًا."]]],
            sites: [["Places4Students", "https://www.places4students.com"], ["Rentals.ca", "https://rentals.ca"]] }
        ],
        facts: [
          [["Deposit", "مبلغ التأمين"], ["Deposit rules differ by province", "أنظمة التأمين تختلف حسب المقاطعة"], ["In Ontario a landlord can ask only for last month's rent, in British Columbia at most half a month's rent, and in Quebec deposits are not allowed. See <a data-u-link=\"bond-url\">{bond}</a>.", "في أونتاريو لا يطلب المالك إلا إيجار الشهر الأخير، وفي بريتش كولومبيا نصف شهر كحد أقصى، وفي كيبيك لا يُسمح بالتأمين. انظر <a data-u-link=\"bond-url\">{bond}</a>."]],
          [["Free help", "مساعدة مجانية"], ["Get a second opinion", "اطلب رأيًا آخر"], ["{legal}", "{legal}"]]
        ]
      },
      money: [
        [["Work limits", "حدود العمل"], ["Know your permit rules", "اعرف شروط تصريحك"], ["If your study permit allows it, you can work off campus up to 24 hours a week during classes and full time in scheduled breaks. Sponsored students should also check SACM's rules.", "إذا سمح تصريح الدراسة بذلك يمكنك العمل خارج الحرم حتى 24 ساعة أسبوعيًا أثناء الدراسة وبدوام كامل في الإجازات المجدولة. وعلى الطالب المبتعث مراجعة أنظمة الملحقية أيضًا."]],
        [["Tax", "الضرائب"], ["File a tax return if you work", "قدّم إقرارًا ضريبيًا إذا عملت"], ["If you work, file a tax return each spring. You may get some tax back.", "إذا عملت فقدّم إقرارًا ضريبيًا كل ربيع، وقد يُعاد لك جزء من الضريبة."]],
        [["Budget", "الميزانية"], ["Plan for rent first", "خطط للإيجار أولًا"], ["Rent is the biggest cost, especially in Toronto and Vancouver. Use the <a href=\"#allowance\">budget planner</a>.", "الإيجار أكبر التكاليف، خاصة في تورنتو وفانكوفر. استخدم <a href=\"#allowance\">حاسبة الميزانية</a>."]]
      ],
      links: [
        { l: ["Study permit", "تصريح الدراسة"], s: ["IRCC", "IRCC"], u: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html" },
        { l: ["Provincial attestation letter", "خطاب الإقرار من المقاطعة"], s: ["IRCC", "IRCC"], u: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents/provincial-attestation-letter.html" },
        { l: ["Proof of financial support", "إثبات القدرة المالية"], s: ["IRCC", "IRCC"], u: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents/financial-support.html" },
        { l: ["Working off campus", "العمل خارج الحرم"], s: ["IRCC", "IRCC"], u: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/work-off-campus.html" },
        { l: ["Social Insurance Number", "رقم التأمين الاجتماعي"], s: ["Service Canada", "Service Canada"], u: "https://www.canada.ca/en/employment-social-development/services/sin.html" },
        { l: ["EduCanada", "EduCanada"], s: ["Official study in Canada site", "الموقع الرسمي للدراسة في كندا"], u: "https://www.educanada.ca" },
        { l: ["Saudi Arabian Cultural Bureau", "الملحقية الثقافية في كندا"], s: ["saudibureau.org", "saudibureau.org"], u: "https://saudibureau.org" }
      ],
      journey: {
        fieldRoute: { en: { t: "Choose your field and your route", why: "Many Canadian universities accept the Saudi certificate directly. A pathway first year helps if your English is not there yet.", what: ["Pick the field you want to study.", "Compare direct entry and pathway programs in the study options.", "Remember that SACM does not pay for English courses."] },
          ar: { t: "اختر تخصصك وطريقك", why: "تقبل كثير من الجامعات الكندية الشهادة السعودية مباشرة، والسنة الأولى بمسار داعم تساعدك إذا لم تكتمل لغتك.", what: ["اختر التخصص الذي تريد دراسته.", "قارن بين القبول المباشر وبرامج المسار في خيارات الدراسة.", "تذكّر أن الملحقية لا تدفع تكلفة دورات اللغة."] } },
        offerF: { en: { t: "Apply and get your offer", why: "Your offer decides where you start and what you must reach to continue.", what: ["Apply to the university or its pathway program.", "Note the grades you need to move into second year.", "Save the offer letter as a PDF."] },
          ar: { t: "قدّم واحصل على عرض القبول", why: "عرض القبول يحدد من أين تبدأ وما يلزمك للاستمرار.", what: ["قدّم على الجامعة أو برنامج المسار فيها.", "دوّن الدرجات المطلوبة للانتقال إلى السنة الثانية.", "احفظ خطاب القبول بصيغة PDF."] } },
        safeer: { en: { t: "Get your guarantee letter and accept your offer", why: "Your university and your study permit both need proof of your funding.", what: ["After you are nominated, request the financial guarantee on Safeer.", "Send it to {school} and accept your offer.", "Keep your letter of acceptance for the study permit."] },
          ar: { t: "احصل على خطاب الضمان واقبل العرض", why: "تحتاج جامعتك وتصريح الدراسة إلى إثبات تمويلك.", what: ["بعد ترشيحك اطلب الضمان المالي عبر منصة سفير.", "أرسله إلى {school} واقبل العرض.", "احتفظ بخطاب القبول لتصريح الدراسة."] } },
        visa: { en: { t: "Get your PAL and study permit", why: "You need a study permit to study in Canada, and most applicants also need a provincial attestation letter.", what: ["Check whether you need a PAL (or a CAQ for Quebec).", "Apply online with IRCC: CA$150 plus CA$85 for biometrics.", "Bring your letter of introduction to the airport: the permit is issued when you land."] },
          ar: { t: "احصل على PAL وتصريح الدراسة", why: "تحتاج تصريح دراسة للدراسة في كندا، ويحتاج أغلب المتقدمين أيضًا خطاب إقرار من المقاطعة.", what: ["تحقق إن كنت تحتاج PAL (أو CAQ في كيبيك).", "قدّم إلكترونيًا لدى IRCC: 150 دولارًا كنديًا و85 للبصمات.", "احمل خطاب التعريف إلى المطار، فالتصريح يُصدر عند وصولك."] },
          links: [["Study permit", "تصريح الدراسة", "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html"], ["PAL", "خطاب PAL", "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents/provincial-attestation-letter.html"]] },
        housing: { en: { t: "Book your first place to stay", why: "Rent is high in big Canadian cities, and residence fills up early.", what: ["Apply for residence as soon as you are admitted.", "If you rent privately, book a short stay and look in person.", "Check your province's deposit rules before you pay."] },
          ar: { t: "احجز أول مكان تسكن فيه", why: "الإيجارات مرتفعة في المدن الكندية الكبرى، وسكن الجامعة يمتلئ مبكرًا.", what: ["قدّم على سكن الجامعة فور قبولك.", "إذا اخترت السكن الخاص فاحجز سكنًا مؤقتًا وابحث بنفسك.", "تحقق من أنظمة التأمين في مقاطعتك قبل الدفع."] } },
        progressF: { en: { t: "Move into second year", why: "SACM needs a new guarantee letter when you move from a pathway year into the degree.", what: ["Reach the grades your pathway requires.", "Request your new guarantee letter on Safeer early.", "Upload your results to Safeer each term."] },
          ar: { t: "انتقل إلى السنة الثانية", why: "تحتاج الملحقية إلى خطاب ضمان جديد عند انتقالك من سنة المسار إلى البكالوريوس.", what: ["حقق الدرجات التي يطلبها المسار.", "اطلب خطاب الضمان الجديد مبكرًا عبر منصة سفير.", "ارفع نتائجك على منصة سفير كل فصل."] } }
      }
    },

    // ------------------------------------------------------------------ Germany
    de: {
      noF: true,
      pathF: ["Your path to a Studienkolleg", "طريقك إلى الكلية التحضيرية (Studienkolleg)"],
      name: ["Germany", "ألمانيا"], inPlace: ["in Germany", "في ألمانيا"], short: ["Germany", "ألمانيا"],
      cur: "€",
      lede: ["A free guide for Saudi students who want to study in Germany. It covers your study options, how the scholarship works, what to sort out before you fly, and your first weeks.",
        "دليل مجاني للطلاب السعوديين الراغبين في الدراسة في ألمانيا. يشرح لك خيارات الدراسة، وطريقة عمل الابتعاث، وما تحتاج إلى ترتيبه قبل السفر، وأسابيعك الأولى."],
      mission: { name: ["the Saudi Cultural Mission in Germany", "الملحقية الثقافية السعودية في ألمانيا"], where: ["Berlin", "برلين"], url: "https://sites.moe.gov.sa/cm/de/" },
      labels: { college: ["Studienkolleg (foundation)", "الكلية التحضيرية (Studienkolleg)"], union: ["International Office", "المكتب الدولي"], bond: ["Tenant advice", "استشارات المستأجرين"] },
      generic: {
        en: { college: "a Studienkolleg", union: "the International Office", legal: "Many universities and student services (Studierendenwerk) offer free legal advice. Tenants' associations (Mietervereine) also help for a small membership fee.", transport: "semester ticket", bond: "a tenants' association (Mieterverein)", food: "Ask your university's Muslim student group about halal food and prayer rooms.", tap: "Your semester contribution usually includes the Deutschlandsemesterticket for local and regional trains and buses across Germany." },
        ar: { college: "كلية تحضيرية (Studienkolleg)", union: "المكتب الدولي", legal: "تقدم كثير من الجامعات وخدمات الطلاب (Studierendenwerk) استشارات قانونية مجانية، وتساعد جمعيات المستأجرين (Mieterverein) مقابل اشتراك بسيط.", transport: "تذكرة الفصل الدراسي", bond: "جمعية المستأجرين (Mieterverein)", food: "اسأل مجموعة الطلاب المسلمين في جامعتك عن المطاعم الحلال وأماكن الصلاة.", tap: "تشمل رسوم الفصل عادةً تذكرة Deutschlandsemesterticket للقطارات والحافلات المحلية والإقليمية في كل ألمانيا." }
      },
      enrolDoc: ["admission letter (Zulassung)", "خطاب القبول (Zulassung)"],
      health: ["(German health insurance)", "(التأمين الصحي الألماني)"],
      missionShort: ["the Cultural Mission", "الملحقية"],
      options: {
        intro: ["The Saudi secondary certificate does not usually give direct entry to a German bachelor's. Most applicants first complete a Studienkolleg. Many master's degrees are taught in English.",
          "شهادة الثانوية السعودية لا تمنح عادةً قبولًا مباشرًا في البكالوريوس بألمانيا، فيبدأ أغلب المتقدمين بكلية تحضيرية (Studienkolleg). وكثير من برامج الماجستير تُدرّس بالإنجليزية."],
        cards: [
          { lv: "bachelor", b: ["Usually needed first", "مطلوبة غالبًا أولًا"], h: ["Studienkolleg", "الكلية التحضيرية (Studienkolleg)"],
            p: ["A one-year preparatory course that ends with the Feststellungsprüfung exam. It is mostly taught in German, so you usually need about B1 to B2 German to get in.", "دورة تحضيرية لمدة سنة تنتهي باختبار Feststellungsprüfung، وأغلبها بالألمانية، فتحتاج عادةً مستوى B1 إلى B2 في الألمانية للقبول."],
            dl: [[["Other route", "طريق آخر"], ["Applicants with one or two years of university study may qualify differently. Check uni-assist and anabin.", "قد يختلف الوضع لمن أكمل سنة أو سنتين في الجامعة. تحقق عبر uni-assist وanabin."]]],
            n: ["confirm with the cultural mission that your Studienkolleg is covered before you enrol.", "تأكد من الملحقية أن الكلية التحضيرية مشمولة قبل التسجيل."] },
          { lv: "bachelor", b: ["Usually 3 years", "عادةً 3 سنوات"], h: ["Bachelor's degree", "البكالوريوس"],
            p: ["Most bachelor's degrees are taught in German, so you need a German certificate such as TestDaF or DSH. A few are taught in English.", "أغلب برامج البكالوريوس بالألمانية، فتحتاج شهادة لغة ألمانية مثل TestDaF أو DSH، وقليل منها بالإنجليزية."],
            dl: [[["Apply through", "التقديم عبر"], ["uni-assist or the university's own portal", "منصة uni-assist أو بوابة الجامعة"]]],
            n: ["the university must be on the Ministry's list for your track and field.", "يجب أن تكون الجامعة ضمن قائمة الوزارة لمسارك وتخصصك."] },
          { lv: "", b: ["Months", "أشهر"], h: ["German language course", "دورة اللغة الألمانية"],
            p: ["To study in German you usually need TestDaF or DSH. For English-taught programs you need IELTS or TOEFL.", "للدراسة بالألمانية تحتاج عادةً TestDaF أو DSH، وللبرامج الإنجليزية تحتاج IELTS أو TOEFL."],
            dl: [[["Suits you if", "يناسبك إذا"], ["You plan a German-taught degree.", "كنت تخطط لبرنامج بالألمانية."]]],
            n: ["language courses are not on the list of programs SACM sponsors, so expect to pay for them yourself.", "دورات اللغة ليست ضمن البرامج التي تبتعث عليها الملحقية، فتوقع أن تدفع تكلفتها بنفسك."] },
          { lv: "master", b: ["About 2 years", "سنتان تقريبًا"], h: ["Master's degree", "الماجستير"],
            p: ["Most master's degrees take 2 years, and many in engineering and science are taught in English.", "يستغرق أغلب الماجستير سنتين، وكثير من برامج الهندسة والعلوم تُدرّس بالإنجليزية."],
            dl: [[["Suits you if", "يناسبك إذا"], ["Your bachelor's matches the program's subject requirements.", "كان البكالوريوس مطابقًا لشروط تخصص البرنامج."]]],
            n: ["Imdad includes master's study at universities on the list for your field.", "يشمل مسار إمداد الماجستير في الجامعات المدرجة لتخصصك."] },
          { lv: "phd", b: ["3 to 5 years", "3 إلى 5 سنوات"], h: ["PhD", "الدكتوراه"],
            p: ["Usually an individual research project with a supervisor, or a place in a structured graduate school.", "غالبًا مشروع بحثي فردي مع مشرف، أو مقعد في برنامج دكتوراه منظم."],
            dl: [[["Start by", "ابدأ بـ"], ["Finding a supervisor who agrees to take you.", "البحث عن مشرف يوافق على الإشراف عليك."]]],
            n: ["PhDs are sponsored through the Research & Development track.", "يكون الابتعاث للدكتوراه عبر مسار البحث والتطوير."] }
        ],
        extra: ["<b>Tuition:</b> most public universities charge no tuition for non-EU students, but universities in Baden-Württemberg (such as KIT) charge €1,500 a semester, and TUM charges non-EU students from €2,000 to €6,000 a semester. Every student also pays a semester contribution, often a few hundred euros including the transport ticket. Check your university's fee page.",
          "<b>الرسوم الدراسية:</b> أغلب الجامعات الحكومية لا تفرض رسومًا على الطلاب من خارج الاتحاد الأوروبي، لكن جامعات ولاية بادن-فورتمبيرغ (مثل KIT) تفرض 1,500 يورو للفصل، وTUM تفرض على الطلاب من خارج الاتحاد من 2,000 إلى 6,000 يورو للفصل. ويدفع كل طالب أيضًا رسوم الفصل، وغالبًا بضع مئات من اليوروهات تشمل تذكرة المواصلات. تحقق من صفحة الرسوم في جامعتك."]
      },
      costs: {
        text: ["For a student visa, Germany's official living-cost figure is €992 a month (€11,904 a year). Scholarship holders can usually show their scholarship letter instead of a blocked account. Ask the embassy which documents your case needs.",
          "لتأشيرة الطالب، الرقم الرسمي لتكاليف المعيشة في ألمانيا هو 992 يورو شهريًا (11,904 يورو سنويًا). ويستطيع المبتعث عادةً تقديم خطاب البعثة بدل الحساب المغلق. اسأل السفارة عن المستندات المطلوبة لحالتك."],
        src: { l: ["German Missions in Saudi Arabia", "البعثات الألمانية في السعودية"], u: "https://riad.diplo.de" },
        ex: { rent: 550, food: 250, travel: 0, bills: 200 },
        exNote: ["In this example, 'Phone and bills' includes health insurance (about €140 a month for students) and the €18.36 broadcasting fee. Transport is often covered by the semester ticket.", "في هذا المثال تشمل «الجوال والفواتير» التأمين الصحي (نحو 140 يورو شهريًا للطلاب) ورسوم البث 18.36 يورو. والمواصلات غالبًا مشمولة في تذكرة الفصل."]
      },
      before: [
        [["Get your admission letter (Zulassung)", "احصل على خطاب القبول (Zulassung)"], ["Apply through uni-assist or the university. You need the admission letter for the visa.", "قدّم عبر uni-assist أو الجامعة، فخطاب القبول مطلوب للتأشيرة."]],
        [["Get your financial guarantee", "احصل على الضمان المالي"], ["Request it on Safeer. It is usually your proof of finance for the visa instead of a blocked account.", "اطلبه عبر منصة سفير، فهو عادةً إثباتك المالي للتأشيرة بدل الحساب المغلق."]],
        [["Apply for the national student visa", "قدّم على التأشيرة الوطنية للدراسة"], ["Book an appointment with the German Embassy in Riyadh or the Consulate General in Jeddah. Appointments can take weeks, so book early.", "احجز موعدًا في السفارة الألمانية في الرياض أو القنصلية العامة في جدة. قد تستغرق المواعيد أسابيع، فاحجز مبكرًا."]],
        [["Arrange health insurance", "رتّب التأمين الصحي"], ["You need it for the visa and to enrol. Students under 30 usually join a public insurer, such as TK or AOK, at the student rate.", "تحتاجه للتأشيرة وللتسجيل. ويشترك الطلاب دون 30 عامًا عادةً في تأمين حكومي مثل TK أو AOK بسعر الطلاب."]],
        [["Find a room early", "ابحث عن غرفة مبكرًا"], ["Apply for a student dorm (Studierendenwerk) as soon as possible, because waiting lists are long. See <a href=\"#housing\">Finding a place</a>.", "قدّم على سكن الطلاب (Studierendenwerk) في أقرب وقت لأن قوائم الانتظار طويلة. انظر <a href=\"#housing\">البحث عن سكن</a>."]],
        [["Make copies of key documents", "انسخ مستنداتك المهمة"], ["Passport, visa, admission letter, scholarship letters, certificates and translations. Keep digital copies too.", "الجواز، والتأشيرة، وخطاب القبول، وخطابات البعثة، والشهادات وترجماتها. واحتفظ بنسخ إلكترونية."]]
      ],
      arrival: [
        [["Register your address (Anmeldung)", "سجّل عنوانك (Anmeldung)"], ["Register at the citizens' office (Bürgeramt) within 14 days of moving in. Bring your landlord's confirmation (Wohnungsgeberbestätigung).", "سجّل في مكتب المواطنين (Bürgeramt) خلال 14 يومًا من السكن، وأحضر تأكيد المالك (Wohnungsgeberbestätigung)."]],
        [["Enrol at your university", "أكمل تسجيلك في الجامعة"], ["Pay your semester contribution and enrol. This usually activates your semester ticket.", "ادفع رسوم الفصل وأكمل التسجيل، وهذا يفعّل تذكرة الفصل عادةً."]],
        [["Get your residence permit", "احصل على تصريح الإقامة"], ["Your visa is usually valid for only a few months. Book an appointment at the foreigners' office (Ausländerbehörde) early.", "صلاحية التأشيرة عادةً بضعة أشهر فقط، فاحجز موعدًا مبكرًا في مكتب الأجانب (Ausländerbehörde)."]],
        [["Open a bank account and get a SIM", "افتح حسابًا بنكيًا واحصل على شريحة"], ["Most banks need your passport and Anmeldung. Prepaid SIMs need your passport.", "تطلب أغلب البنوك الجواز وتسجيل العنوان، والشرائح المسبقة الدفع تحتاج الجواز."]],
        [["Pay the broadcasting fee", "ادفع رسوم البث"], ["Each household pays the Rundfunkbeitrag (€18.36 a month). If you share a flat, only one person pays.", "يدفع كل مسكن رسوم البث (Rundfunkbeitrag) بمقدار 18.36 يورو شهريًا، وفي السكن المشترك يدفعها شخص واحد."]],
        [["Complete your arrival steps with the cultural mission", "أكمل خطوات الوصول لدى الملحقية"], ["Update your details on Safeer and send any documents the mission asks for.", "حدّث بياناتك في منصة سفير وأرسل ما تطلبه الملحقية من مستندات."]],
        [["Find your food and prayer spots", "اعرف أماكن الطعام والصلاة"], ["{food}", "{food}"]]
      ],
      housing: {
        intro: ["Rooms are hard to find in big university cities such as Munich and Berlin. Start early, and never pay before you have a contract.", "الغرف صعبة الإيجاد في المدن الجامعية الكبرى مثل ميونخ وبرلين. ابدأ مبكرًا، ولا تدفع قبل توقيع عقد."],
        steps: [[["Before you fly", "قبل السفر"], ["Apply for a dorm and book a short stay for your first weeks.", "قدّم على سكن الطلاب واحجز سكنًا مؤقتًا لأسابيعك الأولى."]],
          [["When you arrive", "عند وصولك"], ["Visit shared flats (WGs) and ask for a written contract.", "زر الشقق المشتركة (WG) واطلب عقدًا مكتوبًا."]],
          [["After you move in", "بعد السكن"], ["Get the landlord's confirmation and register your address within 14 days.", "احصل على تأكيد المالك وسجّل عنوانك خلال 14 يومًا."]]],
        cards: [
          { b: ["Cheapest", "الأرخص"], h: ["Student dorms", "سكن الطلاب"], p: ["Run by the local Studierendenwerk. Rooms are affordable but waiting lists are long.", "يديره Studierendenwerk المحلي، وغرفه بأسعار مناسبة لكن قوائم الانتظار طويلة."],
            dl: [[["Best for", "الأنسب لـ"], ["Your first year, if you apply early", "سنتك الأولى إذا قدّمت مبكرًا"]]] },
          { b: ["Most common", "الأكثر شيوعًا"], h: ["Shared flats (WG)", "الشقق المشتركة (WG)"], p: ["A room in a flat shared with other students or young workers.", "غرفة في شقة يتشاركها طلاب أو موظفون شباب."],
            dl: [[["Watch out for", "انتبه إلى"], ["Compare the warm rent (Warmmiete), which includes heating and some bills.", "قارن الإيجار الشامل (Warmmiete) الذي يتضمن التدفئة وبعض الفواتير."]]],
            sites: [["WG-Gesucht", "https://www.wg-gesucht.de"], ["ImmobilienScout24", "https://www.immobilienscout24.de"]] }
        ],
        facts: [
          [["Deposit", "مبلغ التأمين"], ["Know the deposit limit", "اعرف حد التأمين"], ["A deposit (Kaution) can be up to three months' rent without bills. If you have a problem, <a data-u-link=\"bond-url\">{bond}</a> can help.", "قد يصل التأمين (Kaution) إلى إيجار ثلاثة أشهر دون الفواتير. وإذا واجهتك مشكلة فيمكن أن تساعدك <a data-u-link=\"bond-url\">{bond}</a>."]],
          [["Free help", "مساعدة مجانية"], ["Get a second opinion", "اطلب رأيًا آخر"], ["{legal}", "{legal}"]]
        ]
      },
      money: [
        [["Work limits", "حدود العمل"], ["Know your permit rules", "اعرف شروط إقامتك"], ["With a student residence permit you can work 140 full days or 280 half days a year. Sponsored students should also check SACM's rules.", "بتصريح إقامة الدراسة يمكنك العمل 140 يومًا كاملًا أو 280 نصف يوم في السنة. وعلى الطالب المبتعث مراجعة أنظمة الملحقية أيضًا."]],
        [["Tax", "الضرائب"], ["You get a tax ID by post", "يصلك رقم ضريبي بالبريد"], ["After your Anmeldung, your tax ID (Steuer-ID) arrives by post. Employers need it.", "بعد تسجيل العنوان يصلك رقمك الضريبي (Steuer-ID) بالبريد، ويطلبه صاحب العمل."]],
        [["Budget", "الميزانية"], ["Health insurance comes first", "التأمين الصحي أولًا"], ["Health insurance is a fixed monthly cost. Use the <a href=\"#allowance\">budget planner</a> to plan the rest.", "التأمين الصحي تكلفة شهرية ثابتة. استخدم <a href=\"#allowance\">حاسبة الميزانية</a> لتخطط للباقي."]]
      ],
      links: [
        { l: ["Study in Germany", "الدراسة في ألمانيا"], s: ["DAAD", "DAAD"], u: "https://www.study-in-germany.de" },
        { l: ["uni-assist", "uni-assist"], s: ["Applications and admission check", "التقديم والتحقق من القبول"], u: "https://www.uni-assist.de" },
        { l: ["anabin", "anabin"], s: ["Recognition of foreign certificates", "الاعتراف بالشهادات الأجنبية"], u: "https://anabin.kmk.org" },
        { l: ["German Missions in Saudi Arabia", "البعثات الألمانية في السعودية"], s: ["Visa appointments", "مواعيد التأشيرات"], u: "https://riad.diplo.de" },
        { l: ["Make it in Germany", "Make it in Germany"], s: ["Official portal for international students", "البوابة الرسمية للطلاب الدوليين"], u: "https://www.make-it-in-germany.com" },
        { l: ["Broadcasting fee", "رسوم البث"], s: ["rundfunkbeitrag.de", "rundfunkbeitrag.de"], u: "https://www.rundfunkbeitrag.de" }
      ],
      journey: {
        fieldRoute: { en: { t: "Choose your field and a Studienkolleg", why: "The Saudi secondary certificate usually leads to a Studienkolleg first, and its course type depends on your field.", what: ["Pick the field you want to study.", "Find a Studienkolleg course that matches it (for example, the T course for engineering).", "Check your own case with uni-assist and anabin."] },
          ar: { t: "اختر تخصصك وكلية تحضيرية", why: "شهادة الثانوية السعودية تقود عادةً إلى الكلية التحضيرية أولًا، ونوع الدورة يعتمد على تخصصك.", what: ["اختر التخصص الذي تريد دراسته.", "ابحث عن دورة Studienkolleg تناسبه (مثل دورة T للهندسة).", "تحقق من حالتك عبر uni-assist وanabin."] } },
        englishF: { en: { t: "Learn German", why: "Most Studienkollegs teach in German and ask for about B1 to B2 before you start.", what: ["Take a German course and a recognised exam.", "Check the level your Studienkolleg asks for.", "Language courses are usually at your own cost."] },
          ar: { t: "تعلّم الألمانية", why: "أغلب الكليات التحضيرية تدرّس بالألمانية وتطلب مستوى B1 إلى B2 قبل البدء.", what: ["التحق بدورة ألمانية واختبار معترف به.", "تحقق من المستوى الذي تطلبه الكلية التحضيرية.", "دورات اللغة عادةً على حسابك."] } },
        offerF: { en: { t: "Apply for a Studienkolleg place", why: "You need an admission to the Studienkolleg and the linked university for your visa.", what: ["Apply through uni-assist or the university.", "Sit the entrance test if the Studienkolleg has one.", "Save your admission letter as a PDF."] },
          ar: { t: "قدّم على مقعد في الكلية التحضيرية", why: "تحتاج قبولًا في الكلية التحضيرية والجامعة المرتبطة بها للتأشيرة.", what: ["قدّم عبر uni-assist أو الجامعة.", "أدِّ اختبار القبول إن وُجد.", "احفظ خطاب القبول بصيغة PDF."] } },
        progressF: { en: { t: "Pass the Feststellungsprüfung", why: "Passing this exam at the end of the Studienkolleg lets you apply for a bachelor's in your field.", what: ["Keep up with your Studienkolleg courses.", "Pass the Feststellungsprüfung.", "Request your new guarantee letter on Safeer for the degree."] },
          ar: { t: "اجتز اختبار Feststellungsprüfung", why: "اجتياز هذا الاختبار في نهاية الكلية التحضيرية يتيح لك التقديم على البكالوريوس في تخصصك.", what: ["التزم بدروس الكلية التحضيرية.", "اجتز اختبار Feststellungsprüfung.", "اطلب خطاب ضمان جديدًا عبر منصة سفير للبكالوريوس."] } },
        safeer: { en: { t: "Get your guarantee letter and admission letter", why: "Your scholarship letter is usually your proof of finance for the visa.", what: ["After you are nominated, request the financial guarantee on Safeer.", "Accept your place at {school}.", "Keep your admission letter (Zulassung) for the visa."] },
          ar: { t: "احصل على خطاب الضمان وخطاب القبول", why: "خطاب البعثة هو عادةً إثباتك المالي للتأشيرة.", what: ["بعد ترشيحك اطلب الضمان المالي عبر منصة سفير.", "اقبل مقعدك في {school}.", "احتفظ بخطاب القبول (Zulassung) للتأشيرة."] } },
        visa: { en: { t: "Get your health insurance and student visa", why: "You need health insurance and a national visa to study in Germany, and a residence permit after you arrive.", what: ["Arrange health insurance (students under 30 usually join a public insurer).", "Book your visa appointment in Riyadh or Jeddah early.", "After arrival, book your residence permit appointment."] },
          ar: { t: "رتّب التأمين الصحي وتأشيرة الدراسة", why: "تحتاج تأمينًا صحيًا وتأشيرة وطنية للدراسة في ألمانيا، ثم تصريح إقامة بعد الوصول.", what: ["رتّب التأمين الصحي (يشترك الطلاب دون 30 عامًا عادةً في تأمين حكومي).", "احجز موعد التأشيرة في الرياض أو جدة مبكرًا.", "بعد الوصول احجز موعد تصريح الإقامة."] },
          links: [["German Missions in Saudi Arabia", "البعثات الألمانية في السعودية", "https://riad.diplo.de"], ["Make it in Germany", "Make it in Germany", "https://www.make-it-in-germany.com"]] },
        housing: { en: { t: "Find a room early", why: "Student rooms are scarce in big cities, and you need an address to register.", what: ["Apply for a Studierendenwerk dorm as soon as possible.", "Book a short stay for your first weeks and visit WGs in person.", "Never pay before you have a written contract."] },
          ar: { t: "ابحث عن غرفة مبكرًا", why: "غرف الطلاب قليلة في المدن الكبرى، وتحتاج عنوانًا لتسجيله.", what: ["قدّم على سكن Studierendenwerk في أقرب وقت.", "احجز سكنًا مؤقتًا لأسابيعك الأولى وزر الشقق المشتركة بنفسك.", "لا تدفع قبل توقيع عقد مكتوب."] } },
        arrive: { en: { t: "Arrive and settle in", why: "In Germany, many things depend on registering your address first.", what: ["Register your address (Anmeldung) within 14 days.", "Enrol, open a bank account and book your residence permit appointment.", "Complete your arrival steps on Safeer."] },
          ar: { t: "وصلت، استقر", why: "في ألمانيا تعتمد أمور كثيرة على تسجيل عنوانك أولًا.", what: ["سجّل عنوانك (Anmeldung) خلال 14 يومًا.", "أكمل التسجيل في الجامعة وافتح حسابًا بنكيًا واحجز موعد تصريح الإقامة.", "أكمل خطوات الوصول عبر منصة سفير."] } }
      }
    },

    // ------------------------------------------------------------------ Singapore
    sg: {
      noF: true,
      pathF: ["Your path to a bachelor's degree", "طريقك إلى البكالوريوس"],
      name: ["Singapore", "سنغافورة"], inPlace: ["in Singapore", "في سنغافورة"], short: ["Singapore", "سنغافورة"],
      cur: "S$",
      lede: ["A free guide for Saudi students who want to study in Singapore. It covers your study options, how the scholarship works, what to sort out before you fly, and your first weeks.",
        "دليل مجاني للطلاب السعوديين الراغبين في الدراسة في سنغافورة. يشرح لك خيارات الدراسة، وطريقة عمل الابتعاث، وما تحتاج إلى ترتيبه قبل السفر، وأسابيعك الأولى."],
      mission: { name: ["the cultural attaché at the Saudi Embassy in Singapore", "الملحق الثقافي في سفارة المملكة في سنغافورة"], where: ["Singapore", "سنغافورة"], url: "https://embassies.mofa.gov.sa/sites/singapore/EN" },
      labels: { college: ["Pathway", "برنامج المسار"], union: ["Student services", "خدمات الطلاب"], bond: ["Rental rules", "أنظمة الإيجار"] },
      generic: {
        en: { college: "no foundation year at NUS, NTU or SMU", union: "student services", legal: "Your university's student services can point you to free legal help, including the community legal clinics.", transport: "EZ-Link or SimplyGo card", bond: "a licensed property agent (CEA)", food: "Halal food is easy to find. Look for the MUIS halal certificate, and visit Kampong Glam or Geylang Serai.", tap: "You can also tap a contactless bank card or phone on MRT trains and buses." },
        ar: { college: "لا توجد سنة فاونديشن في NUS وNTU وSMU", union: "خدمات الطلاب", legal: "توجهك خدمات الطلاب في جامعتك إلى المساعدة القانونية المجانية، ومنها العيادات القانونية المجتمعية.", transport: "بطاقة EZ-Link أو SimplyGo", bond: "وكيل عقارات مرخّص (CEA)", food: "الطعام الحلال متوفر بسهولة. ابحث عن شهادة الحلال من MUIS، وزر Kampong Glam وGeylang Serai.", tap: "يمكنك أيضًا الدفع بالبطاقة البنكية اللاتلامسية أو الجوال في قطارات MRT والحافلات." }
      },
      enrolDoc: ["In-Principle Approval (IPA)", "خطاب الموافقة المبدئية (IPA)"],
      health: ["(the university's group medical insurance)", "(التأمين الصحي الجماعي في الجامعة)"],
      missionShort: ["the cultural attaché", "الملحق الثقافي"],
      options: {
        intro: ["Singapore's main universities, NUS, NTU and SMU, are very competitive and have no foundation year, so you apply directly.",
          "جامعات سنغافورة الرئيسية NUS وNTU وSMU تنافسية جدًا وليس لديها سنة فاونديشن، فتقدّم عليها مباشرة."],
        cards: [
          { lv: "bachelor", b: ["Direct entry", "قبول مباشر"], h: ["Apply to NUS, NTU or SMU", "قدّم على NUS أو NTU أو SMU"],
            p: ["Universities look at your secondary results and may ask for SAT, ACT or other tests, plus an English score. Most bachelor's degrees take 4 years.", "تنظر الجامعات إلى نتائج الثانوية وقد تطلب SAT أو ACT أو اختبارات أخرى، إضافة إلى درجة اللغة. ويستغرق البكالوريوس عادةً 4 سنوات."],
            dl: [[["Apply through", "التقديم عبر"], ["Each university's international admissions portal", "بوابة القبول الدولي في كل جامعة"]]],
            n: ["the university must be on the Ministry's list for your track and field. NUS is on the Al-Ruwwad top 30 list.", "يجب أن تكون الجامعة ضمن قائمة الوزارة لمسارك وتخصصك، وNUS ضمن قائمة الرواد لأفضل 30 جامعة."] },
          { lv: "bachelor", b: ["Before you accept", "قبل القبول"], h: ["The Tuition Grant", "منحة الرسوم (Tuition Grant)"],
            p: ["Singapore offers international students a Tuition Grant that lowers fees, but you must work in Singapore for 3 years after graduating.", "تقدم سنغافورة للطلاب الدوليين منحة تخفض الرسوم، لكنها تشترط العمل في سنغافورة 3 سنوات بعد التخرج."],
            dl: [[["Watch out for", "انتبه إلى"], ["This bond can conflict with your scholarship's obligations.", "قد يتعارض هذا الالتزام مع التزامات بعثتك."]]],
            n: ["ask your cultural attaché before you accept the Tuition Grant.", "اسأل الملحق الثقافي قبل قبول منحة الرسوم."] },
          { lv: "master", b: ["1 to 2 years", "سنة إلى سنتين"], h: ["Master's degree", "الماجستير"],
            p: ["Coursework master's usually take 1 to 1.5 years full time, and research master's about 2 years.", "يستغرق الماجستير بالمقررات عادةً من سنة إلى سنة ونصف بدوام كامل، والماجستير البحثي نحو سنتين."],
            dl: [[["Suits you if", "يناسبك إذا"], ["You meet the program's GPA and English requirements.", "حققت شروط المعدل واللغة للبرنامج."]]],
            n: ["Al-Ruwwad and Imdad both include master's study.", "يشمل مسارا الرواد وإمداد دراسة الماجستير."] },
          { lv: "phd", b: ["4 to 5 years", "4 إلى 5 سنوات"], h: ["PhD", "الدكتوراه"],
            p: ["Research degrees with a supervisor, often with some coursework at the start.", "درجات بحثية مع مشرف، غالبًا مع بعض المواد في البداية."],
            dl: [[["Start by", "ابدأ بـ"], ["Finding a supervisor in your area.", "البحث عن مشرف في مجالك."]]],
            n: ["the Ministry's FAQ says a PhD is covered for up to 3 years, so ask early how extensions work.", "تذكر الأسئلة الشائعة للوزارة أن البعثة تغطي الدكتوراه حتى 3 سنوات، فاسأل مبكرًا عن التمديد."] }
        ]
      },
      costs: {
        text: ["NUS estimates S$1,200 to S$2,100 a month for a student living on campus, and S$1,550 to S$3,400 off campus. This covers housing, food, transport and personal costs.",
          "تقدّر NUS تكاليف الطالب بين 1,200 و2,100 دولار سنغافوري شهريًا داخل الحرم، وبين 1,550 و3,400 خارجه، وتشمل السكن والطعام والمواصلات والمصاريف الشخصية."],
        src: { l: ["NUS: cost of living", "NUS: تكاليف المعيشة"], u: "https://nusgs.nus.edu.sg/cost-of-living" },
        ex: { rent: 800, food: 450, travel: 120, bills: 80 }
      },
      before: [
        [["Accept your offer", "اقبل عرض القبول"], ["After you accept, your university registers you on ICA's Student's Pass system (SOLAR).", "بعد قبولك تسجلك الجامعة في نظام تصريح الطالب لدى ICA (SOLAR)."]],
        [["Get your financial guarantee", "احصل على الضمان المالي"], ["Request it on Safeer and send it to your university.", "اطلبه عبر منصة سفير وأرسله إلى جامعتك."]],
        [["Apply for your Student's Pass", "قدّم على تصريح الطالب"], ["Complete the online application (eForm 16). You receive an In-Principle Approval (IPA) letter, which you use to enter Singapore.", "أكمل الطلب الإلكتروني (eForm 16)، وستصلك رسالة الموافقة المبدئية (IPA) التي تدخل بها سنغافورة."]],
        [["Check your health insurance", "تأكد من التأمين الصحي"], ["NUS, NTU and SMU enrol students in a compulsory group medical insurance plan. Ask your cultural attaché what the scholarship covers.", "تسجل NUS وNTU وSMU الطلاب في تأمين صحي جماعي إلزامي. اسأل الملحق الثقافي عما تغطيه البعثة."]],
        [["Apply for campus housing early", "قدّم مبكرًا على سكن الجامعة"], ["Halls and residences are the easiest start, and places are limited. See <a href=\"#housing\">Finding a place</a>.", "السكن الجامعي أسهل بداية والأماكن محدودة. انظر <a href=\"#housing\">البحث عن سكن</a>."]],
        [["Make copies of key documents", "انسخ مستنداتك المهمة"], ["Passport, IPA letter, offer letter, scholarship letters and transcripts. Keep digital copies too.", "الجواز، ورسالة IPA، وخطاب القبول، وخطابات البعثة، والسجل الأكاديمي. واحتفظ بنسخ إلكترونية."]]
      ],
      arrival: [
        [["Complete your Student's Pass formalities", "أكمل إجراءات تصريح الطالب"], ["Follow ICA's instructions in your IPA letter to complete formalities and get your Student's Pass.", "اتبع تعليمات ICA في رسالة IPA لإكمال الإجراءات واستلام تصريح الطالب."]],
        [["Get a Singapore SIM card", "احصل على شريحة سنغافورية"], ["Prepaid SIMs are sold at the airport and convenience stores. You need your passport.", "تُباع الشرائح المسبقة الدفع في المطار والمتاجر، وتحتاج جوازك."]],
        [["Open a bank account", "افتح حسابًا بنكيًا"], ["Bring your passport, Student's Pass and university letter.", "أحضر جوازك وتصريح الطالب وخطابًا من الجامعة."]],
        [["Sort out transport", "رتّب المواصلات"], ["Get your {transport}. {tap}", "احصل على {transport}. {tap}"]],
        [["Complete your arrival steps with the cultural attaché", "أكمل خطوات الوصول لدى الملحقية"], ["Update your details on Safeer and send any documents the cultural attaché asks for.", "حدّث بياناتك في منصة سفير وأرسل ما يطلبه الملحق الثقافي من مستندات."]],
        [["Find your food and prayer spots", "اعرف أماكن الطعام والصلاة"], ["{food}", "{food}"]]
      ],
      housing: {
        intro: ["Campus housing is the easiest start. Private rooms are often in HDB flats or condominiums, and rents are high.", "سكن الجامعة أسهل بداية. والغرف الخاصة غالبًا في شقق HDB أو المجمعات السكنية، والإيجارات مرتفعة."],
        steps: [[["Before you fly", "قبل السفر"], ["Apply for a hall or residence as soon as you accept your offer.", "قدّم على السكن الجامعي فور قبول العرض."]],
          [["If you rent privately", "إذا استأجرت سكنًا خاصًا"], ["View the room in person and use a licensed agent.", "عاين الغرفة بنفسك واستعن بوكيل مرخّص."]],
          [["Before you sign", "قبل التوقيع"], ["Get a written tenancy agreement and check the minimum stay.", "احصل على عقد إيجار مكتوب وتأكد من الحد الأدنى للمدة."]]],
        cards: [
          { b: ["Easiest start", "أسهل بداية"], h: ["Campus halls and residences", "السكن الجامعي"], p: ["On-campus rooms, close to classes and student life.", "غرف داخل الحرم قريبة من الدراسة والحياة الطلابية."],
            dl: [[["Best for", "الأنسب لـ"], ["Your first year", "سنتك الأولى"]]] },
          { b: ["More choice", "خيارات أكثر"], h: ["Rooms in HDB flats and condos", "غرف في شقق HDB والمجمعات"], p: ["Rooms in public housing (HDB) or private condominiums, usually through agents or listing sites.", "غرف في الإسكان العام (HDB) أو المجمعات الخاصة، عادةً عبر الوكلاء أو مواقع الإعلانات."],
            dl: [[["Watch out for", "انتبه إلى"], ["HDB rentals have a minimum period of 6 months.", "تأجير شقق HDB له حد أدنى 6 أشهر."]]],
            sites: [["PropertyGuru", "https://www.propertyguru.com.sg"], ["99.co", "https://www.99.co/singapore"]] }
        ],
        facts: [
          [["Agents", "الوكلاء"], ["Use a licensed agent", "استعن بوكيل مرخّص"], ["Check that the agent is registered with the <a data-u-link=\"bond-url\">Council for Estate Agencies (CEA)</a>.", "تحقق أن الوكيل مسجل لدى <a data-u-link=\"bond-url\">مجلس الوكالات العقارية (CEA)</a>."]],
          [["Free help", "مساعدة مجانية"], ["Get a second opinion", "اطلب رأيًا آخر"], ["{legal}", "{legal}"]]
        ]
      },
      money: [
        [["Work limits", "حدود العمل"], ["Know the rules", "اعرف الأنظمة"], ["Full-time students at approved institutions can work up to 16 hours a week during term, and full time in vacations, without a work pass. Sponsored students should also check SACM's rules.", "يستطيع طلاب الدوام الكامل في المؤسسات المعتمدة العمل حتى 16 ساعة أسبوعيًا أثناء الدراسة وبدوام كامل في الإجازات دون تصريح عمل. وعلى الطالب المبتعث مراجعة أنظمة الملحقية أيضًا."]],
        [["Paying", "الدفع"], ["Cards and PayNow", "البطاقات وPayNow"], ["Most shops and food courts accept cards, phone payments or PayNow.", "تقبل أغلب المتاجر ومراكز الطعام البطاقات أو الدفع بالجوال أو PayNow."]],
        [["Budget", "الميزانية"], ["Plan for rent first", "خطط للإيجار أولًا"], ["Housing is the biggest cost. Use the <a href=\"#allowance\">budget planner</a>.", "السكن أكبر التكاليف. استخدم <a href=\"#allowance\">حاسبة الميزانية</a>."]]
      ],
      links: [
        { l: ["Student's Pass", "تصريح الطالب"], s: ["Immigration & Checkpoints Authority (ICA)", "هيئة الهجرة ونقاط التفتيش (ICA)"], u: "https://www.ica.gov.sg/reside/STP" },
        { l: ["Working as a student", "عمل الطلاب"], s: ["Ministry of Manpower", "وزارة القوى العاملة"], u: "https://www.mom.gov.sg/passes-and-permits/work-pass-exemption-for-foreign-students" },
        { l: ["Cost of living", "تكاليف المعيشة"], s: ["NUS", "NUS"], u: "https://nusgs.nus.edu.sg/cost-of-living" },
        { l: ["Halal certification", "شهادات الحلال"], s: ["MUIS", "MUIS"], u: "https://www.muis.gov.sg" },
        { l: ["Check an agent", "التحقق من الوكيل"], s: ["Council for Estate Agencies", "مجلس الوكالات العقارية"], u: "https://www.cea.gov.sg" }
      ],
      journey: {
        englishF: { en: { t: "Reach your English score", why: "Singapore's universities teach in English and ask for a strong English result.", what: ["Check the English requirement on your university's admissions page.", "Book IELTS or TOEFL early enough to retake it.", "SACM does not pay for English courses."] },
          ar: { t: "حقق درجة اللغة الإنجليزية المطلوبة", why: "تدرّس جامعات سنغافورة بالإنجليزية وتطلب نتيجة لغة قوية.", what: ["تحقق من شرط اللغة في صفحة القبول بجامعتك.", "احجز IELTS أو TOEFL مبكرًا ليبقى لديك وقت لإعادته.", "الملحقية لا تدفع تكلفة دورات اللغة."] } },
        offerF: { en: { t: "Apply directly to the university", why: "There is no foundation year at NUS, NTU or SMU, so your application goes straight to the degree.", what: ["Apply through the university's international admissions portal.", "Send any tests it asks for, such as the SAT.", "Save your offer letter as a PDF."] },
          ar: { t: "قدّم مباشرة على الجامعة", why: "لا توجد سنة فاونديشن في NUS وNTU وSMU، فيذهب طلبك مباشرة إلى البكالوريوس.", what: ["قدّم عبر بوابة القبول الدولي في الجامعة.", "أرسل الاختبارات المطلوبة مثل SAT.", "احفظ خطاب القبول بصيغة PDF."] } },
        progressF: { en: { t: "Keep your results strong", why: "SACM checks your progress every term.", what: ["Upload your results to Safeer after each term.", "Ask SACM before you change your program.", "Use the university's free study support early."] },
          ar: { t: "حافظ على نتائج قوية", why: "تتابع الملحقية تقدمك كل فصل.", what: ["ارفع نتائجك على منصة سفير بعد كل فصل.", "استشر الملحقية قبل تغيير برنامجك.", "استفد مبكرًا من دعم الدراسة المجاني في الجامعة."] } },
        fieldRoute: { en: { t: "Choose your field and check direct entry", why: "NUS, NTU and SMU have no foundation year, so you apply directly with your secondary results.", what: ["Pick the field you want to study.", "Read each university's requirements for international qualifications.", "If you need a foundation year, look at other countries' options too."] },
          ar: { t: "اختر تخصصك وتحقق من القبول المباشر", why: "ليس لدى NUS وNTU وSMU سنة فاونديشن، فتقدّم مباشرة بنتائج الثانوية.", what: ["اختر التخصص الذي تريد دراسته.", "اقرأ شروط كل جامعة للمؤهلات الدولية.", "إذا احتجت سنة فاونديشن فاطّلع على خيارات الدول الأخرى أيضًا."] } },
        safeer: { en: { t: "Get your guarantee letter and your IPA", why: "After you accept, you apply for the Student's Pass and receive an In-Principle Approval letter to enter Singapore.", what: ["After you are nominated, request the financial guarantee on Safeer.", "Send it to {school} and accept your offer.", "Apply for the Student's Pass on SOLAR."] },
          ar: { t: "احصل على خطاب الضمان ورسالة IPA", why: "بعد القبول تقدّم على تصريح الطالب وتصلك رسالة الموافقة المبدئية لدخول سنغافورة.", what: ["بعد ترشيحك اطلب الضمان المالي عبر منصة سفير.", "أرسله إلى {school} واقبل العرض.", "قدّم على تصريح الطالب عبر SOLAR."] } },
        visa: { en: { t: "Get your Student's Pass", why: "You need a Student's Pass to study in Singapore.", what: ["Complete the online application (eForm 16).", "Enter Singapore with your IPA letter.", "Complete ICA's formalities to collect your pass."] },
          ar: { t: "احصل على تصريح الطالب", why: "تحتاج تصريح الطالب للدراسة في سنغافورة.", what: ["أكمل الطلب الإلكتروني (eForm 16).", "ادخل سنغافورة برسالة IPA.", "أكمل إجراءات ICA لاستلام التصريح."] },
          links: [["Student's Pass", "تصريح الطالب", "https://www.ica.gov.sg/reside/STP"]] },
        housing: { en: { t: "Apply for campus housing", why: "Campus housing is the easiest start, and private rents are high.", what: ["Apply for a hall or residence as soon as you accept.", "If you rent privately, use a licensed agent.", "Remember HDB rentals need at least 6 months."] },
          ar: { t: "قدّم على سكن الجامعة", why: "سكن الجامعة أسهل بداية، والإيجارات الخاصة مرتفعة.", what: ["قدّم على السكن الجامعي فور قبول العرض.", "إذا استأجرت سكنًا خاصًا فاستعن بوكيل مرخّص.", "تذكّر أن تأجير شقق HDB لا يقل عن 6 أشهر."] } }
      }
    }
  };

  // ---------- skylines drawn on the right of the hero (the left is Riyadh) ----------
  var SC = "#2B4166", SC2 = "#3D5A86", LIT = "#E2B66C", PALE = "#E8EEF5";
  function win(xs, ys) { var s = ""; xs.forEach(function (x, i) { s += '<rect x="' + x + '" y="' + ys[i % ys.length] + '" width="1.6" height="1.6" fill="' + LIT + '" opacity=".6"/>'; }); return s; }
  var SCENES = {
    us: '<g class="landmark">' +
      // Manhattan skyline
      '<g fill="' + SC + '"><rect x="760" y="140" width="26" height="48"/><rect x="790" y="118" width="22" height="70"/><rect x="816" y="96" width="18" height="92"/>' +
      '<path d="M840 188 V82 H846 V66 H850 V40 H853 V66 H857 V82 H863 V188 Z"/>' +
      '<rect x="868" y="128" width="24" height="60"/><rect x="896" y="108" width="20" height="80"/>' +
      '<path d="M922 188 L926 70 L936 54 L946 70 L950 188 Z"/><line x1="936" y1="54" x2="936" y2="28" stroke="' + SC + '" stroke-width="1.6"/>' +
      '<rect x="956" y="134" width="26" height="54"/><rect x="986" y="150" width="22" height="38"/></g>' +
      win([771, 798, 822, 849, 876, 903, 933, 965, 994], [150, 128, 112, 100, 140, 124, 96, 146, 160]) +
      // Statue of Liberty on its island
      '<path d="M1110 188 L1118 168 L1182 168 L1190 188 Z" fill="' + SC2 + '"/>' +
      '<path d="M1132 168 L1136 140 L1164 140 L1168 168 Z" fill="' + SC + '"/>' +
      '<path d="M1140 140 C1138 118 1141 100 1146 92 L1156 92 C1160 104 1162 120 1160 140 Z" fill="#5E8C84"/>' +
      '<circle cx="1151" cy="86" r="6" fill="#5E8C84"/>' +
      '<g stroke="#5E8C84" stroke-width="1.6" stroke-linecap="round"><line x1="1151" y1="80" x2="1151" y2="72"/><line x1="1146" y1="81" x2="1141" y2="74"/><line x1="1156" y1="81" x2="1161" y2="74"/></g>' +
      '<path d="M1156 98 L1166 66" stroke="#5E8C84" stroke-width="4" stroke-linecap="round"/>' +
      '<rect x="1163" y="58" width="7" height="8" rx="1" fill="#5E8C84"/>' +
      '<circle cx="1166.5" cy="52" r="10" fill="' + LIT + '" opacity=".18" class="glow"/><path d="M1166.5 45 C1162 51 1164 55 1166.5 57 C1169 55 1171 51 1166.5 45 Z" fill="' + LIT + '"/>' +
      '<rect x="1138" y="104" width="6" height="10" rx="1" fill="#4E7A72" transform="rotate(-12 1141 109)"/>' +
      '</g>',
    uk: '<g class="landmark">' +
      // Palace of Westminster
      '<g fill="' + SC + '"><rect x="900" y="150" width="200" height="38"/>' +
      (function () { var s = ""; for (var x = 904; x < 1100; x += 14) s += '<path d="M' + x + ' 150 L' + (x + 3) + ' 140 L' + (x + 6) + ' 150 Z"/>'; return s; })() +
      '<rect x="880" y="120" width="24" height="68"/><path d="M880 120 L892 104 L904 120 Z"/></g>' +
      win([912, 930, 948, 966, 984, 1002, 1020, 1038, 1056, 1074, 1090], [160, 170]) +
      // Elizabeth Tower (Big Ben)
      '<rect x="1102" y="64" width="26" height="124" fill="' + SC2 + '"/>' +
      '<rect x="1098" y="60" width="34" height="34" fill="' + SC + '"/>' +
      '<circle cx="1115" cy="77" r="11" fill="#F3E7C8"/><circle cx="1115" cy="77" r="11" fill="none" stroke="' + LIT + '" stroke-width="1.5"/>' +
      '<line x1="1115" y1="77" x2="1115" y2="69" stroke="#2B4166" stroke-width="1.4"/><line x1="1115" y1="77" x2="1121" y2="80" stroke="#2B4166" stroke-width="1.4"/>' +
      '<path d="M1098 60 L1101 48 L1129 48 L1132 60 Z" fill="' + SC2 + '"/><path d="M1102 48 L1115 14 L1128 48 Z" fill="' + SC + '"/><line x1="1115" y1="14" x2="1115" y2="4" stroke="' + SC + '" stroke-width="1.4"/>' +
      win([1108, 1120, 1108, 1120], [110, 126, 142, 158]) +
      // London Eye
      '<g fill="none" stroke="#9FB0C4" stroke-width="1.6" opacity=".85"><circle cx="1320" cy="120" r="56"/>' +
      (function () { var s = ""; for (var a = 0; a < 180; a += 22.5) { var r = a * Math.PI / 180; s += '<line x1="' + (1320 + 56 * Math.cos(r)).toFixed(1) + '" y1="' + (120 + 56 * Math.sin(r)).toFixed(1) + '" x2="' + (1320 - 56 * Math.cos(r)).toFixed(1) + '" y2="' + (120 - 56 * Math.sin(r)).toFixed(1) + '" stroke-width=".8"/>'; } return s; })() +
      '<path d="M1290 188 L1320 120 L1350 188" stroke-width="2.2"/></g>' +
      (function () { var s = ""; for (var a = 0; a < 360; a += 30) { var r = a * Math.PI / 180; s += '<circle cx="' + (1320 + 56 * Math.cos(r)).toFixed(1) + '" cy="' + (120 + 56 * Math.sin(r)).toFixed(1) + '" r="2.4" fill="' + PALE + '" opacity=".8"/>'; } return s; })() +
      '</g>',
    ca: '<g class="landmark">' +
      '<g fill="' + SC + '"><rect x="880" y="120" width="26" height="68"/><rect x="910" y="96" width="22" height="92"/><rect x="936" y="132" width="30" height="56"/>' +
      '<rect x="970" y="104" width="24" height="84"/><rect x="998" y="140" width="22" height="48"/><rect x="1024" y="118" width="20" height="70"/>' +
      '<rect x="1240" y="150" width="30" height="38"/></g>' +
      win([888, 917, 945, 978, 1005, 1030], [130, 108, 144, 116, 152, 128]) +
      // Rogers Centre dome
      '<path d="M1270 188 C1272 156 1350 156 1352 188 Z" fill="' + SC2 + '"/><path d="M1280 176 C1300 168 1322 168 1342 176" fill="none" stroke="#9FB0C4" stroke-width="1" opacity=".7"/>' +
      // CN Tower
      '<path d="M1140 188 L1150 100 L1158 100 L1168 188 Z" fill="' + SC2 + '"/>' +
      '<path d="M1146 188 L1154 112 L1162 188 Z" fill="#132238" opacity=".6"/>' +
      '<ellipse cx="1154" cy="96" rx="16" ry="7" fill="' + SC + '"/><rect x="1140" y="92" width="28" height="4" fill="' + LIT + '" opacity=".75"/>' +
      '<rect x="1151" y="58" width="6" height="34" fill="' + SC2 + '"/><ellipse cx="1154" cy="70" rx="6" ry="3" fill="' + SC + '"/>' +
      '<line x1="1154" y1="58" x2="1154" y2="10" stroke="' + SC2 + '" stroke-width="2"/><circle cx="1154" cy="10" r="1.8" fill="#E36D5F"/>' +
      '</g>',
    de: '<g class="landmark">' +
      // Brandenburg Gate
      '<g fill="' + SC2 + '"><rect x="930" y="124" width="200" height="12"/><rect x="936" y="116" width="188" height="9"/>' +
      '<path d="M1010 116 L1030 104 L1050 116 Z"/>' +
      (function () { var s = ""; for (var i = 0; i < 6; i++) s += '<rect x="' + (940 + i * 34) + '" y="136" width="10" height="52"/>'; return s; })() +
      '<rect x="926" y="184" width="208" height="5"/></g>' +
      // quadriga
      '<g fill="' + SC + '"><path d="M1016 104 L1018 92 L1024 90 L1026 98 L1032 92 L1036 96 L1040 104 Z"/><line x1="1030" y1="90" x2="1030" y2="80" stroke="' + SC + '" stroke-width="1.4"/><circle cx="1030" cy="79" r="2.2"/></g>' +
      // TV tower (Fernsehturm)
      '<path d="M1296 188 L1300 76 L1306 76 L1310 188 Z" fill="' + SC2 + '"/>' +
      '<circle cx="1303" cy="64" r="15" fill="' + SC + '"/><path d="M1288 64 A15 15 0 0 0 1318 64" fill="none" stroke="' + LIT + '" stroke-width="1.3" opacity=".8"/>' +
      '<rect x="1301" y="20" width="4" height="30" fill="' + SC2 + '"/><line x1="1303" y1="20" x2="1303" y2="6" stroke="' + SC2 + '" stroke-width="1.6"/><circle cx="1303" cy="6" r="1.8" fill="#E36D5F"/>' +
      '<g fill="' + SC + '"><rect x="1200" y="148" width="40" height="40"/><rect x="1244" y="160" width="36" height="28"/><rect x="1330" y="152" width="44" height="36"/></g>' +
      win([1208, 1222, 1252, 1266, 1340, 1356], [158, 168]) +
      '</g>',
    sg: '<g class="landmark">' +
      // Gardens by the Bay supertrees
      (function () { var s = ""; [[820, 120], [850, 104], [880, 128]].forEach(function (p) { s += '<path d="M' + (p[0] - 3) + ' 188 L' + (p[0] - 1.5) + ' ' + (p[1] + 10) + ' L' + (p[0] + 1.5) + ' ' + (p[1] + 10) + ' L' + (p[0] + 3) + ' 188 Z" fill="' + SC2 + '"/><path d="M' + (p[0] - 16) + ' ' + p[1] + ' L' + (p[0] + 16) + ' ' + p[1] + ' L' + (p[0] + 2) + ' ' + (p[1] + 12) + ' L' + (p[0] - 2) + ' ' + (p[1] + 12) + ' Z" fill="#5E8C84"/>'; }); return s; })() +
      // Marina Bay Sands
      (function () { var s = ""; [990, 1048, 1106].forEach(function (x) { s += '<path d="M' + x + ' 188 L' + (x + 4) + ' 72 L' + (x + 30) + ' 72 L' + (x + 34) + ' 188 Z" fill="' + SC2 + '"/><path d="M' + (x + 17) + ' 188 L' + (x + 17) + ' 76" stroke="#132238" stroke-width="1" opacity=".6"/>'; }); return s; })() +
      '<path d="M972 70 Q1060 58 1160 64 L1158 72 Q1060 66 974 76 Z" fill="' + SC + '"/>' +
      win([998, 1014, 1056, 1072, 1114, 1130], [96, 120, 144, 168]) +
      // Singapore Flyer
      '<g fill="none" stroke="#9FB0C4" stroke-width="1.6" opacity=".85"><circle cx="1320" cy="124" r="48"/><path d="M1296 188 L1320 124 L1344 188" stroke-width="2.2"/></g>' +
      (function () { var s = ""; for (var a = 0; a < 360; a += 30) { var r = a * Math.PI / 180; s += '<circle cx="' + (1320 + 48 * Math.cos(r)).toFixed(1) + '" cy="' + (124 + 48 * Math.sin(r)).toFixed(1) + '" r="2.4" fill="' + PALE + '" opacity=".8"/>'; } return s; })() +
      '</g>',
    all: '<g class="landmark">' +
      // a globe with a flight path
      '<circle cx="1120" cy="104" r="66" fill="' + SC + '" opacity=".9"/>' +
      '<g fill="none" stroke="#9FB0C4" stroke-width="1" opacity=".55"><ellipse cx="1120" cy="104" rx="66" ry="22"/><ellipse cx="1120" cy="104" rx="66" ry="46"/><ellipse cx="1120" cy="104" rx="22" ry="66"/><ellipse cx="1120" cy="104" rx="46" ry="66"/><line x1="1054" y1="104" x2="1186" y2="104"/><line x1="1120" y1="38" x2="1120" y2="170"/></g>' +
      '<path d="M1080 70 C1090 62 1104 66 1100 78 C1096 90 1084 96 1078 88 Z M1124 92 C1136 86 1150 92 1146 106 C1142 120 1128 124 1122 114 Z M1140 60 C1150 56 1162 62 1158 70 C1152 74 1144 70 1140 60 Z" fill="#5E8C84" opacity=".8"/>' +
      '<path d="M900 170 Q1000 20 1230 60" fill="none" stroke="' + LIT + '" stroke-width="1.6" stroke-dasharray="2 6" opacity=".85"/>' +
      '<circle cx="1230" cy="60" r="3" fill="' + LIT + '"/>' +
      '</g>'
  };

  // ---------- section titles ----------
  var H = {
    options: { e: ["Choose your route", "اختر طريقك"], h: ["Your study options {in}", "خيارات الدراسة {in}"] },
    allowance: { e: ["Your monthly money", "مصروفك الشهري"], h: ["Living costs and your allowance", "تكاليف المعيشة والمكافأة"] },
    before: { e: ["Packing list", "قائمة التجهيز"], h: ["Before you fly", "قبل السفر"] },
    arrival: { e: ["Just landed", "وصلت للتو"], h: ["Your first two weeks {cityIn}", "أسبوعاك الأولان {cityIn}"] },
    housing: { e: ["A place to live", "مكان تسكن فيه"], h: ["Finding a place {cityIn}", "البحث عن سكن {cityIn}"] },
    money: { e: ["Practical matters", "أمور عملية"], h: ["Money and work", "المال والعمل"] },
    links: { e: ["Reference desk", "مكتب المراجع"], h: ["Official links", "روابط رسمية"] }
  };
  var UI = {
    option: ["Option", "خيار"], note: ["Scholarship note:", "ملاحظة الابتعاث:"],
    afterHS: ["After high school", "بعد الثانوية"], afterBA: ["After a bachelor's degree", "بعد البكالوريوس"],
    sacmNoteNoF: ["<b>Important:</b> SACM sponsors Bachelor's, Master's and PhD programs. <b>English courses are not sponsored</b>, so you pay for them yourself.", "<b>مهم:</b> تبتعث الملحقية على برامج البكالوريوس والماجستير والدكتوراه. <b>دورات اللغة غير مشمولة</b>، فتدفع تكلفتها بنفسك."],
    sacmNoteUK: ["<b>Important:</b> SACM sponsors Foundation, Bachelor's, Master's and PhD programs. <b>English courses are not sponsored</b>, so you pay for them yourself.", "<b>مهم:</b> تبتعث الملحقية على برامج الفاونديشن والبكالوريوس والماجستير والدكتوراه. <b>دورات اللغة غير مشمولة</b>، فتدفع تكلفتها بنفسك."],
    sacmNote: ["<b>Important:</b> SACM sponsors Foundation, Diploma, Bachelor's, Master's and PhD programs. <b>English courses are not sponsored</b>, so you pay for them yourself.", "<b>مهم:</b> تبتعث الملحقية على برامج الفاونديشن والدبلوم والبكالوريوس والماجستير والدكتوراه. <b>دورات اللغة غير مشمولة</b>، فتدفع تكلفتها بنفسك."],
    checkNote: ["Entry scores, program lengths and progression rules change each year and differ between programs. Always check the current rules on your university's official website before you apply.", "درجات القبول ومدد البرامج وشروط الانتقال تتغير كل عام وتختلف بين البرامج. تحقق دائمًا من الأنظمة الحالية في موقع جامعتك الرسمي قبل التقديم."],
    allowIntro: ["SACM pays scholarship students a monthly allowance on top of tuition and health cover. The amount is set in Saudi riyals in your scholarship decision and paid in local currency, so it changes with the exchange rate.", "تصرف الملحقية للمبتعث مكافأة شهرية إضافة إلى الرسوم والتأمين الصحي. ويُحدد مبلغها بالريال في قرار الابتعاث ويُصرف بالعملة المحلية، فيتغير مع سعر الصرف."],
    official: ["Official living costs", "تكاليف المعيشة الرسمية"],
    monthly: ["Monthly allowance", "المكافأة الشهرية"], single: ["per month for a single student", "شهريًا للطالب الأعزب"],
    knownNote: ["This is the 2026 amount for a single student. Students with family members may receive a different amount, and SACM can change allowances. Check your own scholarship decision or ask your cultural mission.", "هذا مبلغ عام 2026 للطالب الأعزب. وقد يختلف المبلغ لمن معه مرافقون، ويمكن أن تعدّل الملحقية المكافآت. راجع قرار ابتعاثك أو اسأل الملحقية الثقافية."], source: ["Source", "المصدر"],
    plan: ["Plan your month", "خطط لشهرك"],
    planHint: ["Enter your own numbers to see what is left each month. The starting values are only examples.", "أدخل أرقامك لترى ما يتبقى كل شهر. القيم الأولية أمثلة فقط."],
    yourAllowance: ["Your monthly allowance", "مكافأتك الشهرية"], fromDecision: ["from your scholarship decision", "من قرار الابتعاث"],
    rent: ["Rent", "الإيجار"], food: ["Groceries", "البقالة"], travel: ["Transport", "المواصلات"], bills: ["Phone and bills", "الجوال والفواتير"],
    perMonth: ["per month", "شهريًا"],
    spend: ["Spending per month", "المصروف الشهري"], left: ["Left from your allowance", "المتبقي من مكافأتك"], enterAllowance: ["Enter your allowance", "أدخل مكافأتك"],
    allowNote: ["Ask your cultural mission, or check your scholarship decision, for your exact allowance. Students with family members may receive a different amount.", "اسأل الملحقية الثقافية أو راجع قرار الابتعاث لمعرفة مبلغ مكافأتك بالضبط. وقد يختلف المبلغ لمن معه مرافقون."],
    paperwork: ["Paperwork and planning", "الأوراق والتخطيط"], settling: ["Settling in", "الاستقرار"],
    tickIntro: ["Tick items off as you go. Your progress stays saved in this browser.", "ضع علامة على كل بند تنجزه، وسيُحفظ تقدمك في هذا المتصفح."],
    bestFor: ["Best for", "الأنسب لـ"],
    linksIntro: ["Rules change. These official sites have the current information.", "الأنظمة تتغير، وهذه المواقع الرسمية فيها أحدث المعلومات."],
    mission: ["Your cultural mission", "الملحقية الثقافية"], uniSite: ["University website", "موقع الجامعة"],
    pickTitle: ["Choose a country to see the details", "اختر دولة لترى التفاصيل"],
    pickText: ["Visa steps, living costs, housing and work rules depend on the country. Choose one to see them.", "خطوات التأشيرة وتكاليف المعيشة والسكن وأنظمة العمل تختلف من دولة لأخرى. اختر دولة لتراها."],
    location: ["Location", "الموقع"], liveNear: ["Live near transport", "اسكن قرب المواصلات"],
    liveNearText: ["Check how long the trip to campus takes. Popular student areas near {uni}: {suburbs}.", "تأكد من مدة الطريق إلى الجامعة. أحياء يفضلها الطلاب قرب {uni}: {suburbs}."],
    safety: ["Safety", "الأمان"], scams: ["Avoid rental scams", "احذر من الاحتيال في الإيجار"],
    scamsText: ["Never pay a deposit for a room you have not seen, and never send money to someone who says they are overseas.", "لا تدفع تأمينًا لغرفة لم ترها، ولا ترسل مالًا لشخص يقول إنه خارج البلد."]
  };

  // ---------- helpers ----------
  var lang = (document.documentElement.lang || "en").slice(0, 2) === "ar" ? "ar" : "en";
  var L = lang === "ar" ? 1 : 0;
  function T(p) { return p ? p[L] : ""; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c]; }); }
  function fill(s, v) { return String(s).replace(/\{(\w+)\}/g, function (m, k) { return v.hasOwnProperty(k) && v[k] != null ? esc(v[k]) : m; }); }

  function head(key, v, idSuffix) {
    var d = H[key];
    return '<p class="eyebrow">' + esc(T(d.e)) + '</p><h2 id="' + key + '-gh">' + fill(T(d.h), v) + '</h2>';
  }

  function optionCard(c, v) {
    var dl = (c.dl || []).map(function (r) { return '<div><dt>' + esc(T(r[0])) + '</dt><dd>' + fill(T(r[1]), v) + '</dd></div>'; }).join("");
    var sites = c.sites ? '<p class="sacm">' + c.sites.map(function (s) { return '<a href="' + esc(s[1]) + '" rel="noopener">' + esc(s[0]) + '</a>'; }).join(" · ") + '</p>' : "";
    return '<article class="option"' + (c.lv ? ' data-level="' + c.lv + '"' : "") + '><div class="ticket"><span>' + esc(T(UI.option)) + '</span><b>' + esc(T(c.b)) + '</b></div>' +
      '<h3>' + esc(T(c.h)) + '</h3><p>' + fill(T(c.p), v) + '</p>' + (dl ? '<dl>' + dl + '</dl>' : "") +
      (c.n ? '<p class="sacm"><b>' + esc(T(UI.note)) + '</b> ' + fill(T(c.n), v) + '</p>' : "") + sites + '</article>';
  }

  function checklist(listKey, items, cc, title, v) {
    var lis = items.map(function (it, i) {
      return '<li><label><input type="checkbox" id="' + cc + "-" + listKey.charAt(0) + (i + 1) + '"><span><span class="t">' + fill(T(it[0]), v) + '</span><span class="d">' + linkify(T(it[1]), v) + '</span></span></label></li>';
    }).join("");
    return '<div class="checklist" data-gen-list="' + cc + "-" + listKey + '"><div class="cl-head"><h3>' + esc(T(title)) + '</h3><div class="progress"><span class="count">0 / ' + items.length + '</span><span class="bar"><i></i></span></div></div><ul>' + lis + '</ul></div>';
  }

  // text may contain simple safe HTML we wrote ourselves (<a href="#...">, <b>); placeholders are escaped
  function linkify(s, v) {
    return fill(s, v).replace(/<a data-u-link="([\w-]+)">/g, function (m, k) { return v[k] ? '<a href="' + esc(v[k]) + '" rel="noopener">' : "<a>"; });
  }

  function fact(f, v) { return '<div class="fact"><span class="k">' + esc(T(f[0])) + '</span><h3>' + esc(T(f[1])) + '</h3><p>' + linkify(T(f[2]), v) + '</p></div>'; }

  function linkCard(href, label, small) { return '<a href="' + esc(href) + '" rel="noopener"><span>' + esc(label) + '</span><small>' + esc(small) + '</small></a>'; }

  function money(n, cur) { return (n < 0 ? "-" : "") + cur + Math.abs(Math.round(n)).toLocaleString(lang === "ar" ? "en-US" : "en-AU"); }

  // ---------- builders for each country section ----------
  function build(key, cc, v) {
    var d = C[cc], h = "";
    if (key === "options") {
      var cards = d.options.cards;
      var ug = cards.filter(function (c) { return !/master|phd/.test(c.lv); }), pg = cards.filter(function (c) { return /master|phd/.test(c.lv); });
      h = head("options", v) + '<p class="intro">' + esc(T(d.options.intro)) + '</p>' +
        '<p class="level-banner" data-level-banner hidden><span></span> <button type="button" class="linkish" data-level-all>' + (lang === "ar" ? "اعرض كل شيء" : "Show everything") + '</button></p>' +
        '<p class="group-label" data-level="foundation bachelor">' + esc(T(UI.afterHS)) + '</p><div class="options" data-level="foundation bachelor">' + ug.map(function (c) { return optionCard(c, v); }).join("") + '</div>' +
        '<p class="group-label" data-level="master phd">' + esc(T(UI.afterBA)) + '</p><div class="options" data-level="master phd">' + pg.map(function (c) { return optionCard(c, v); }).join("") + '</div>' +
        (d.options.extra ? '<p class="note">' + T(d.options.extra) + '</p>' : "") +
        '<p class="note">' + (d.noF ? T(UI.sacmNoteNoF) : cc === "uk" ? T(UI.sacmNoteUK) : T(UI.sacmNote)) + '</p><p class="note">' + esc(T(UI.checkNote)) + '</p>';
    } else if (key === "allowance") {
      var ex = d.costs.ex, cur = d.cur, known = d.costs.allowance || 0;
      function row(id, label, val) {
        return '<div class="brow"><label for="g-' + id + '">' + esc(T(label)) + ' <small>' + esc(T(UI.perMonth)) + '</small></label><div class="money-in"><span>' + esc(cur) + '</span><input id="g-' + id + '" data-g="' + id + '" type="number" inputmode="decimal" min="0" step="10" value="' + val + '"></div></div>';
      }
      h = head("allowance", v) + '<p class="intro">' + esc(T(UI.allowIntro)) + '</p>' +
        '<div class="allowance"><div class="amount">' +
        (known ? '<span class="k">' + esc(T(UI.monthly)) + '</span><span class="fig">' + esc(money(known, cur)) + '</span><span class="per">' + esc(T(UI.single)) + ' ' + esc(T(d.inPlace)) + '</span><span class="k" style="margin-top:18px">' + esc(T(UI.official)) + '</span>' : '<span class="k">' + esc(T(UI.official)) + '</span>') +
        '<span class="per">' + esc(T(d.costs.text)) + '</span>' +
        (d.costs.src ? '<span class="per"><a href="' + esc(d.costs.src.u) + '" rel="noopener" style="color:var(--gold)">' + esc(T(UI.source)) + ': ' + esc(T(d.costs.src.l)) + '</a></span>' : "") + '</div>' +
        '<div class="budget"><h3>' + esc(T(UI.plan)) + '</h3><p class="hint">' + esc(T(UI.planHint)) + '</p>' +
        '<div class="brow"><label for="g-allow">' + esc(T(UI.yourAllowance)) + ' <small>' + esc(T(UI.fromDecision)) + '</small></label><div class="money-in"><span>' + esc(cur) + '</span><input id="g-allow" data-g="allow" type="number" inputmode="decimal" min="0" step="10" value="' + (known || "") + '"></div></div>' +
        row("rent", UI.rent, ex.rent) + row("food", UI.food, ex.food) + row("travel", UI.travel, ex.travel) + row("bills", UI.bills, ex.bills) +
        '<div class="totals" aria-live="polite"><div><span>' + esc(T(UI.spend)) + '</span><b data-g-out="spend">0</b></div><div class="left" data-g-out="leftrow"><span>' + esc(T(UI.left)) + '</span><b data-g-out="left">–</b></div></div>' +
        (d.costs.exNote ? '<p class="hint">' + esc(T(d.costs.exNote)) + '</p>' : "") +
        '</div></div><p class="note">' + esc(T(known ? UI.knownNote : UI.allowNote)) + '</p>';
    } else if (key === "before") {
      h = head("before", v) + '<p class="intro">' + esc(T(UI.tickIntro)) + '</p>' + checklist("before", d.before, cc, UI.paperwork, v);
    } else if (key === "arrival") {
      h = head("arrival", v) + checklist("arrival", d.arrival, cc, UI.settling, v);
    } else if (key === "housing") {
      var hs = d.housing;
      h = head("housing", v) + '<p class="intro">' + esc(T(hs.intro)) + '</p>' +
        '<ul class="rules">' + hs.steps.map(function (s) { return '<li><span class="r-k">' + esc(T(s[0])) + '</span><span class="r-v">' + esc(T(s[1])) + '</span></li>'; }).join("") + '</ul>' +
        '<div class="options">' + hs.cards.map(function (c) {
          var dl = (c.dl || []).map(function (r) { return '<div><dt>' + esc(T(r[0])) + '</dt><dd>' + esc(T(r[1])) + '</dd></div>'; }).join("");
          var sites = c.sites ? '<p class="sacm">' + c.sites.map(function (s) { return '<a href="' + esc(s[1]) + '" rel="noopener">' + esc(s[0]) + '</a>'; }).join(" · ") + '</p>' : "";
          return '<article class="option"><div class="ticket"><span>' + esc(T(UI.option)) + '</span><b>' + esc(T(c.b)) + '</b></div><h3>' + esc(T(c.h)) + '</h3><p>' + esc(T(c.p)) + '</p>' + (dl ? '<dl>' + dl + '</dl>' : "") + sites + '</article>';
        }).join("") + '</div>' +
        '<div class="facts">' +
          fact([UI.location, UI.liveNear, UI.liveNearText], v) + fact([UI.safety, UI.scams, UI.scamsText], v) +
          hs.facts.map(function (f) { return fact(f, v); }).join("") + '</div>';
    } else if (key === "money") {
      h = head("money", v) + '<div class="facts">' + d.money.map(function (f) { return fact(f, v); }).join("") + '</div>';
    } else if (key === "links") {
      var cards2 = d.links.map(function (k) { return linkCard(k.u, T(k.l), T(k.s)); });
      cards2.push(linkCard(d.mission.url, T(UI.mission), T(d.mission.name).replace(/^the /, "")));
      MOE.forEach(function (k) { cards2.push(linkCard(k.u, T(k.l), T(k.s))); });
      if (v._hasUni) {
        if (v.web) cards2.push(linkCard(v.web, v.name, T(UI.uniSite)));
        if (v["college-url"]) cards2.push(linkCard(v["college-url"], v.college, T(d.labels.college)));
        if (v["union-url"]) cards2.push(linkCard(v["union-url"], v.union, T(d.labels.union)));
        if (v["transport-url"]) cards2.push(linkCard(v["transport-url"], v.transport, v.city));
      }
      h = head("links", v) + '<p class="intro">' + esc(T(UI.linksIntro)) + '</p><div class="links">' + cards2.join("") + '</div>';
    }
    return h;
  }

  var GEN = ["options", "allowance", "before", "arrival", "housing", "money", "links"];
  var lastKey = null;

  function apply(o) {
    var cc = o.cc, v = o.v, root = document.documentElement;
    root.setAttribute("data-country", cc || "all");
    var d = cc && C[cc] ? C[cc] : null;
    var isAu = cc === "au";
    if (d && d.noF) root.setAttribute("data-no-f", ""); else root.removeAttribute("data-no-f");
    v = Object.assign({}, v);
    v["in"] = d ? T(d.inPlace) : (lang === "ar" ? "في الخارج" : "abroad");
    v.cityIn = v._hasCity ? (lang === "ar" ? "في " : "in ") + v.city : v["in"];
    v.uni = v.short;

    // simple text swaps
    var place = d ? T(d.inPlace) : (lang === "ar" ? "في الخارج" : "abroad");
    var c = {
      inPlace: place,
      name: d ? T(d.short) : "",
      lede: d && d.lede ? T(d.lede) : (cc === "au" ? null : (lang === "ar" ? "دليل مجاني للطلاب السعوديين الراغبين في الدراسة في الخارج: أمريكا وبريطانيا وكندا وألمانيا وسنغافورة وأستراليا. اختر دولتك لترى خيارات الدراسة وخطوات التأشيرة وتكاليف المعيشة." : "A free guide for Saudi students who want to study abroad: the USA, the UK, Canada, Germany, Singapore and Australia. Choose your country to see study options, visa steps and living costs.")),
      tagline: d ? (lang === "ar" ? "Your guide to studying " + d.inPlace[0] : "دليلك للدراسة " + d.inPlace[1]) : (lang === "ar" ? "Your guide to studying abroad" : "دليلك للدراسة في الخارج"),
      mission: d ? T(d.mission.name) : (lang === "ar" ? "الملحقية الثقافية السعودية في بلد دراستك" : "the Saudi cultural mission in your country of study"),
      missionUrl: d ? d.mission.url : "https://sites.moe.gov.sa/scholarship-program/",
      where: d && d.mission.where ? T(d.mission.where) : "",
      health: d && d.health ? T(d.health) : "",
      enrolDoc: d && d.enrolDoc ? T(d.enrolDoc) : (lang === "ar" ? "خطاب تأكيد التسجيل" : "enrolment confirmation"),
      missionShort: d && d.missionShort ? T(d.missionShort) : (lang === "ar" ? "الملحقية" : "your cultural mission"),
      collegeSub: d && d.collegeSub ? T(d.collegeSub) : null,
      sponsors: lang === "ar" ? (d && d.noF ? "برامج البكالوريوس والماجستير والدكتوراه." : cc === "uk" ? "برامج الفاونديشن والبكالوريوس والماجستير والدكتوراه." : null)
        : (d && d.noF ? "Bachelor's, Master's and PhD programs." : cc === "uk" ? "Foundation, Bachelor's, Master's and PhD programs." : null),
      moveLine: lang === "ar" ? (cc === "uk" ? "عند انتقالك من الفاونديشن إلى البكالوريوس،" : d ? "عند انتقالك إلى برنامج أو مرحلة جديدة،" : null)
        : (cc === "uk" ? "When you move from Foundation to your degree," : d ? "When you move to a new program or level," : null)
    };
    document.querySelectorAll("[data-c]").forEach(function (el) {
      var k = el.getAttribute("data-c");
      if (!el.hasAttribute("data-c-orig")) el.setAttribute("data-c-orig", el.textContent);
      var val = c[k];
      if (isAu || val == null) el.textContent = el.getAttribute("data-c-orig");
      else el.textContent = val;
    });
    document.querySelectorAll("[data-c-href]").forEach(function (el) {
      if (!el.hasAttribute("data-c-href-orig")) el.setAttribute("data-c-href-orig", el.getAttribute("href"));
      el.setAttribute("href", isAu ? el.getAttribute("data-c-href-orig") : c[el.getAttribute("data-c-href")]);
    });
    document.querySelectorAll("[data-c-label]").forEach(function (el) {
      if (!el.hasAttribute("data-c-orig")) el.setAttribute("data-c-orig", el.textContent);
      var k = el.getAttribute("data-c-label");
      el.textContent = d && d.labels && d.labels[k] ? T(d.labels[k]) : el.getAttribute("data-c-orig");
    });

    // Australia's hand-written blocks vs generated ones
    document.querySelectorAll("[data-cc]").forEach(function (el) { el.hidden = !isAu; });
    document.querySelectorAll("[data-cc-not]").forEach(function (el) { el.hidden = isAu; });
    document.querySelectorAll("[data-cc-country]").forEach(function (el) { el.hidden = !cc; });

    var key = (cc || "all") + "|" + [v.city, v.short, v.transport, v.bond, v.college, v.union, v.food, v.legal].join("|");
    GEN.forEach(function (k) {
      var slot = document.querySelector('[data-cc-gen="' + k + '"]');
      if (!slot) return;
      var sec = slot.closest("section");
      if (isAu) { slot.hidden = true; slot.innerHTML = ""; if (sec) { sec.hidden = false; sec.setAttribute("aria-labelledby", k + "-h"); } return; }
      if (!cc) {
        // no country chosen: one prompt in study options, hide the rest
        if (sec) sec.hidden = k !== "options";
        slot.hidden = k !== "options";
        if (k === "options") {
          slot.innerHTML = '<p class="eyebrow">' + esc(T(H.options.e)) + '</p><h2 id="options-gh">' + esc(T(UI.pickTitle)) + '</h2><p class="intro">' + esc(T(UI.pickText)) + '</p>' +
            '<div class="pk-grid cc-pick">' + ORDER.map(function (k2) { return '<button type="button" class="btn btn-outline" data-pick-country="' + k2 + '">' + esc(T(C[k2].short)) + '</button>'; }).join("") + '</div>';
          if (sec) sec.setAttribute("aria-labelledby", "options-gh");
        }
        return;
      }
      if (sec) { sec.hidden = false; sec.setAttribute("aria-labelledby", k + "-gh"); }
      slot.hidden = false;
      if (lastKey !== key || !slot.innerHTML) slot.innerHTML = build(k, cc, v);
    });
    document.querySelectorAll("[data-nav-cc]").forEach(function (a) { a.hidden = !cc && a.getAttribute("data-nav-cc") === "country"; });
    if (lastKey !== key && cc && !isAu) { bindChecklists(); bindBudget(cc); }
    lastKey = key;

    // the Southern Cross is only in the southern sky
    var cross = document.querySelector(".hero .cross");
    if (cross) cross.style.display = cc && ["us", "uk", "ca", "de"].indexOf(cc) > -1 ? "none" : "";

    // skyline
    var auScene = document.querySelector('[data-scene="au"]'), slotS = document.querySelector("[data-scene-slot]");
    if (auScene && slotS) {
      auScene.style.display = isAu ? "" : "none";
      var want = isAu ? "" : (cc || "all");
      if (slotS.getAttribute("data-now") !== want) { slotS.innerHTML = want ? SCENES[want] : ""; slotS.setAttribute("data-now", want); }
    }
  }

  // ---------- generated checklists share the same saved state as Australia's ----------
  var CK = "masar-checklist-v1";
  function bindChecklists() {
    var saved = {};
    try { saved = JSON.parse(localStorage.getItem(CK) || "{}") || {}; } catch (e) {}
    document.querySelectorAll("[data-gen-list]").forEach(function (list) {
      var boxes = list.querySelectorAll('input[type="checkbox"]'), count = list.querySelector(".count"), bar = list.querySelector(".bar i");
      function upd() { var n = 0; boxes.forEach(function (b) { if (b.checked) n++; }); count.textContent = n + " / " + boxes.length; bar.style.width = Math.round(n / boxes.length * 100) + "%"; }
      boxes.forEach(function (b) {
        b.checked = !!saved[b.id];
        b.addEventListener("change", function () {
          try { saved = JSON.parse(localStorage.getItem(CK) || "{}") || {}; } catch (e) { saved = {}; }
          saved[b.id] = b.checked;
          try { localStorage.setItem(CK, JSON.stringify(saved)); } catch (e) {}
          upd();
        });
      });
      upd();
    });
  }

  function bindBudget(cc) {
    var d = C[cc], cur = d.cur, wrap = document.querySelector('[data-cc-gen="allowance"]');
    if (!wrap) return;
    var AK = "masarok-allow-" + cc, allowIn = wrap.querySelector("#g-allow");
    try { var a = localStorage.getItem(AK); if (a) allowIn.value = a; } catch (e) {}
    function num(id) { var el = wrap.querySelector('[data-g="' + id + '"]'); var x = parseFloat(el && el.value); return isFinite(x) && x > 0 ? x : 0; }
    function calc() {
      var spend = num("rent") + num("food") + num("travel") + num("bills");
      wrap.querySelector('[data-g-out="spend"]').textContent = money(spend, cur);
      var allow = num("allow"), row = wrap.querySelector('[data-g-out="leftrow"]'), out = wrap.querySelector('[data-g-out="left"]');
      if (allow > 0) { out.textContent = money(allow - spend, cur); row.className = "left " + (allow - spend >= 0 ? "ok" : "low"); }
      else { out.textContent = T(UI.enterAllowance); row.className = "left"; }
      try { if (allowIn.value) localStorage.setItem(AK, allowIn.value); } catch (e) {}
    }
    wrap.querySelectorAll("[data-g]").forEach(function (el) { el.addEventListener("input", calc); });
    calc();
  }

  window.MasarokCountry = {
    order: ORDER, data: C, lang: lang, T: T,
    apply: apply,
    name: function (cc) { return C[cc] ? T(C[cc].short) : ""; },
    // only Australia and the UK have a foundation year; only Australia has the diploma pathway
    offersF: function (cc) { return !(cc && C[cc] && C[cc].noF); },
    fLabel: function (cc) { return cc === "uk" ? (lang === "ar" ? ["الفاونديشن", "سنة فاونديشن قبل البكالوريوس"] : ["Foundation", "A foundation year before your bachelor's degree"]) : null; },
    pathF: function (cc) { var d = C[cc]; return d && d.pathF ? T(d.pathF) : null; },
    journey: function (cc, id) { var d = C[cc]; return d && d.journey && d.journey[id] ? d.journey[id] : null; },
    generic: function (cc) { var d = C[cc]; return d && d.generic ? d.generic[lang] : null; },
    enrolDoc: function (cc) { var d = C[cc]; return d && d.enrolDoc ? T(d.enrolDoc) : null; }
  };
})();

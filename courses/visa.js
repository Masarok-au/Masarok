/* Masarok Academy · Visa practice.
   Original Masarok practice. Fees and rules match the guide, which links to the official pages.
   Teaching text is [English, Arabic]; interview questions are English, as they are in real life. */
(function () {
  "use strict";

  function sort(bins, list) { return list.map(function (x) { return { s: x[0], o: bins, a: x[1], x: x[2], row: true }; }); }
  var SACM = ["Sponsored students should also check SACM's rules before taking any job.", "وعلى الطالب المبتعث أن يراجع أنظمة الملحقية قبل أي عمل."];

  // ---------------- 10 · your visa, step by step (one per country) ----------------
  function visaLesson(cc, flag, name, steps) {
    return { id: "visa-" + cc, order: 10, group: "base", cc: [cc], icon: flag, mins: 10,
      t: [name[0] + ": your visa step by step", name[1] + ": تأشيرتك خطوة بخطوة"],
      d: ["The documents, fees and order of steps for your student visa.", "المستندات والرسوم وترتيب خطوات تأشيرة الطالب."], steps: steps };
  }
  var V_AU = visaLesson("au", "🇦🇺", ["Australia", "أستراليا"], [
    { t: "text", h: ["The Student visa (subclass 500)", "تأشيرة الطالب (الفئة 500)"], p: [
      ["You apply online with your Confirmation of Enrolment (CoE). Overseas Student Health Cover (OSHC) for the whole length of your visa is a condition of the visa, and SACM usually covers it.", "تقدّم إلكترونيًا بخطاب تأكيد التسجيل (CoE). والتأمين الصحي للطلاب الدوليين (OSHC) لكامل مدة التأشيرة شرط من شروطها، وتغطيه الملحقية عادةً."],
      ["The application charge is A$2,500 from 1 July 2026, paid when you apply. The form includes the Genuine Student questions, with a limit of 150 words per answer.", "رسوم الطلب 2,500 دولار أسترالي منذ 1 يوليو 2026 وتُدفع عند التقديم، ويتضمن النموذج أسئلة الطالب الحقيقي بحد 150 كلمة لكل إجابة."]],
      list: [["Bring: passport, CoE, your OSHC policy and SACM's guarantee letter.", "جهّز: الجواز، وCoE، ووثيقة OSHC، وخطاب الضمان من الملحقية."],
        ["Common mistakes: booking flights before the visa is granted, and OSHC that ends before the visa does.", "أخطاء شائعة: حجز الطيران قبل صدور التأشيرة، وتأمين صحي ينتهي قبل التأشيرة."]] },
    { t: "order", h: ["Put the steps in order", "رتّب الخطوات"], items: [
      ["Receive your CoE and check every detail", "استلم CoE وتحقق من كل تفاصيله"],
      ["Arrange OSHC for the length of your visa", "رتّب تأمين OSHC لكامل مدة التأشيرة"],
      ["Apply online for the subclass 500 visa and answer the Genuine Student questions", "قدّم إلكترونيًا على تأشيرة الفئة 500 وأجب عن أسئلة الطالب الحقيقي"],
      ["Do any health check or biometrics you're asked for", "أكمل أي فحص طبي أو بصمات تُطلب منك"],
      ["Save your visa grant, then book your flight", "احفظ قرار التأشيرة ثم احجز رحلتك"]] },
    { t: "quiz", h: ["Check yourself", "اختبر نفسك"], pass: 2, items: [
      { s: ["Your OSHC ends three months before your visa. Is that a problem?", "ينتهي تأمين OSHC قبل التأشيرة بثلاثة أشهر. هل هذه مشكلة؟"], o: [["No", "لا"], ["Yes: it must cover the whole visa", "نعم، يجب أن يغطي كامل مدة التأشيرة"]], a: 1, x: ["Health cover for the length of your visa is a visa condition.", "التأمين لكامل مدة التأشيرة شرط من شروطها."] },
      { s: ["When should you book your flight?", "متى تحجز رحلتك؟"], o: [["As soon as you apply", "فور التقديم"], ["After the visa is granted", "بعد صدور التأشيرة"]], a: 1, x: ["Processing times change every month. Book once you have the grant.", "مدد المعالجة تتغير كل شهر، فاحجز بعد صدور القرار."] },
      { s: ["How long can each Genuine Student answer be?", "ما طول كل إجابة في أسئلة الطالب الحقيقي؟"], o: [["50 words", "50 كلمة"], ["150 words", "150 كلمة"], ["1,000 words", "1,000 كلمة"]], a: 1, x: ["150 words each, written by you.", "150 كلمة لكل إجابة، تكتبها بنفسك."] }
    ] }
  ]);
  var V_US = visaLesson("us", "🇺🇸", ["The USA", "أمريكا"], [
    { t: "text", h: ["The F-1 student visa", "تأشيرة الطالب F-1"], p: [
      ["Your university issues your I-20 after it receives SACM's financial guarantee. Check every detail on it, then pay the US$350 SEVIS fee online.", "تُصدر جامعتك نموذج I-20 بعد استلام ضمان الملحقية. تحقق من كل تفاصيله ثم ادفع رسوم SEVIS البالغة 350 دولارًا إلكترونيًا."],
      ["Next, fill in the DS-160 and pay the US$185 visa application fee, then book your interview in Riyadh, Jeddah or Dhahran. A new US$250 visa integrity fee is now charged by some embassies when the visa is issued.", "بعد ذلك عبّئ نموذج DS-160 وادفع رسوم طلب التأشيرة البالغة 185 دولارًا، ثم احجز مقابلتك في الرياض أو جدة أو الظهران. وتحصّل بعض السفارات الآن رسوم نزاهة تأشيرة جديدة قدرها 250 دولارًا عند إصدارها."]],
      list: [["Bring: passport, I-20, SEVIS receipt, DS-160 confirmation, fee receipt, SACM letters, your offer and transcripts.", "جهّز: الجواز، وI-20، وإيصال SEVIS، وتأكيد DS-160، وإيصال الرسوم، وخطابات الملحقية، وخطاب القبول، وكشوف الدرجات."],
        ["You can enter the US up to 30 days before the program start date on your I-20.", "يمكنك دخول أمريكا قبل تاريخ بدء البرنامج في I-20 بـ30 يومًا كحد أقصى."]] },
    { t: "order", h: ["Put the steps in order", "رتّب الخطوات"], items: [
      ["Receive your I-20 and check every detail", "استلم I-20 وتحقق من كل تفاصيله"],
      ["Pay the US$350 SEVIS fee", "ادفع رسوم SEVIS البالغة 350 دولارًا"],
      ["Fill in the DS-160 and pay the US$185 visa fee", "عبّئ DS-160 وادفع رسوم التأشيرة 185 دولارًا"],
      ["Book and attend your interview", "احجز موعد المقابلة واحضرها"],
      ["Enter the US no more than 30 days before your start date", "ادخل أمريكا قبل تاريخ البدء بـ30 يومًا على الأكثر"]] },
    { t: "quiz", h: ["Check yourself", "اختبر نفسك"], pass: 2, items: [
      { s: ["What should you pay before booking the interview?", "ماذا تدفع قبل حجز المقابلة؟"], o: [["The SEVIS fee and the visa application fee", "رسوم SEVIS ورسوم طلب التأشيرة"], ["A year of rent", "إيجار سنة"], ["Nothing", "لا شيء"]], a: 0, x: ["US$350 for SEVIS and US$185 for the visa application.", "350 دولارًا لـSEVIS و185 دولارًا لطلب التأشيرة."] },
      { s: ["Your I-20 start date is 23 August. When is the earliest you can enter?", "تاريخ البدء في I-20 هو 23 أغسطس. ما أبكر موعد يمكنك الدخول فيه؟"], o: [["24 July", "24 يوليو"], ["1 June", "1 يونيو"], ["Any time", "أي وقت"]], a: 0, x: ["Up to 30 days before the program start date.", "قبل تاريخ بدء البرنامج بـ30 يومًا كحد أقصى."] },
      { s: ["Which document does your university issue for the F-1?", "ما المستند الذي تصدره الجامعة لتأشيرة F-1؟"], o: ["CoE", "I-20", "CAS"], a: 1, x: ["The I-20.", "نموذج I-20."] }
    ] }
  ]);
  var V_UK = visaLesson("uk", "🇬🇧", ["The UK", "بريطانيا"], [
    { t: "text", h: ["The Student visa", "تأشيرة الطالب"], p: [
      ["Your university gives you a CAS once your offer is unconditional and your funding is confirmed. Check whether your course needs an ATAS certificate: some science and engineering courses do.", "تمنحك جامعتك رقم CAS بعد أن يصبح قبولك غير مشروط ويُؤكَّد تمويلك. وتحقق إن كان تخصصك يحتاج شهادة ATAS، فبعض تخصصات العلوم والهندسة تحتاجها."],
      ["You apply online, no more than 6 months before your course starts. The visa is £558 from outside the UK, plus the immigration health surcharge of £776 a year, which gives you NHS access. A decision usually comes within 3 weeks.", "تقدّم إلكترونيًا قبل بدء دراستك بـ6 أشهر على الأكثر. رسوم التأشيرة 558 جنيهًا من خارج بريطانيا، إضافة إلى رسوم الخدمات الصحية 776 جنيهًا سنويًا التي تتيح لك خدمات NHS، ويصدر القرار عادةً خلال 3 أسابيع."]],
      list: [["Your visa is an eVisa. Set up your UKVI account and keep access to it.", "تأشيرتك إلكترونية (eVisa)، فأنشئ حسابك في UKVI وحافظ على إمكانية الدخول إليه."]] },
    { t: "order", h: ["Put the steps in order", "رتّب الخطوات"], items: [
      ["Get an unconditional offer and send SACM's guarantee", "احصل على قبول غير مشروط وأرسل ضمان الملحقية"],
      ["Receive your CAS and check every detail", "استلم CAS وتحقق من كل تفاصيله"],
      ["Get an ATAS certificate, if your course needs one", "احصل على شهادة ATAS إذا كان تخصصك يحتاجها"],
      ["Apply online and pay the visa fee and health surcharge", "قدّم إلكترونيًا وادفع رسوم التأشيرة والخدمات الصحية"],
      ["Set up your UKVI account to see your eVisa", "أنشئ حساب UKVI لترى تأشيرتك الإلكترونية"]] },
    { t: "quiz", h: ["Check yourself", "اختبر نفسك"], pass: 2, items: [
      { s: ["Your course starts on 21 September. Can you apply in January?", "تبدأ دراستك في 21 سبتمبر. هل يمكنك التقديم في يناير؟"], o: [["Yes", "نعم"], ["No: at most 6 months before", "لا، قبلها بـ6 أشهر على الأكثر"]], a: 1, x: ["You can apply no earlier than 6 months before the course starts.", "لا يمكنك التقديم قبل بدء الدراسة بأكثر من 6 أشهر."] },
      { s: ["What does the £776 a year pay for?", "ماذا تغطي رسوم 776 جنيهًا سنويًا؟"], o: [["Tuition", "الرسوم الدراسية"], ["NHS healthcare", "الرعاية الصحية NHS"], ["Housing", "السكن"]], a: 1, x: ["The immigration health surcharge gives you NHS access.", "رسوم الخدمات الصحية تتيح لك خدمات NHS."] },
      { s: ["Where do you see your UK visa?", "أين ترى تأشيرتك البريطانية؟"], o: [["A sticker in your passport", "ملصق في جوازك"], ["Your UKVI account", "حسابك في UKVI"]], a: 1, x: ["It's an eVisa in your UKVI account.", "إنها تأشيرة إلكترونية في حسابك على UKVI."] }
    ] }
  ]);
  var V_CA = visaLesson("ca", "🇨🇦", ["Canada", "كندا"], [
    { t: "text", h: ["The study permit", "تصريح الدراسة"], p: [
      ["You apply online with IRCC using your letter of acceptance. Most applicants also need a provincial attestation letter (PAL), or a CAQ for Quebec.", "تقدّم إلكترونيًا لدى IRCC بخطاب القبول، ويحتاج أغلب المتقدمين أيضًا خطاب تصديق من المقاطعة (PAL)، أو شهادة CAQ لمقاطعة كيبيك."],
      ["The study permit is CA$150, plus CA$85 for biometrics. If you're approved, you get a letter of introduction: bring it to the airport, because your permit is issued when you land.", "رسوم تصريح الدراسة 150 دولارًا كنديًا، و85 دولارًا للبصمات. وإذا قُبل طلبك تحصل على خطاب تعريف، فاحمله معك إلى المطار لأن التصريح يُصدر عند وصولك."]],
      list: [["Bring: passport, letter of acceptance, your PAL or CAQ, and SACM's guarantee letter as proof of funds.", "جهّز: الجواز، وخطاب القبول، وPAL أو CAQ، وخطاب ضمان الملحقية إثباتًا للقدرة المالية."]] },
    { t: "order", h: ["Put the steps in order", "رتّب الخطوات"], items: [
      ["Get your letter of acceptance", "احصل على خطاب القبول"],
      ["Get your PAL (or CAQ for Quebec), if you need one", "احصل على PAL (أو CAQ لكيبيك) إذا احتجته"],
      ["Apply online and pay CA$150 plus CA$85 for biometrics", "قدّم إلكترونيًا وادفع 150 دولارًا و85 للبصمات"],
      ["Give your biometrics", "قدّم بصماتك"],
      ["Land in Canada with your letter of introduction: the permit is issued there", "اصل إلى كندا ومعك خطاب التعريف، وهناك يُصدر التصريح"]] },
    { t: "quiz", h: ["Check yourself", "اختبر نفسك"], pass: 2, items: [
      { s: ["When is your study permit actually issued?", "متى يُصدر تصريح الدراسة فعليًا؟"], o: [["When you land in Canada", "عند وصولك إلى كندا"], ["When you apply", "عند التقديم"]], a: 0, x: ["At the airport, when you show your letter of introduction.", "في المطار عند إبراز خطاب التعريف."] },
      { s: ["You're going to a university in Montreal. What do you need from the province?", "ستدرس في جامعة في مونتريال. ماذا تحتاج من المقاطعة؟"], o: ["CAQ", "CAS", "IPA"], a: 0, x: ["Quebec uses the CAQ.", "مقاطعة كيبيك تستخدم شهادة CAQ."] },
      { s: ["What can you show as proof of funds?", "ماذا تقدم إثباتًا للقدرة المالية؟"], o: [["SACM's guarantee letter", "خطاب ضمان الملحقية"], ["A screenshot of your bank app", "لقطة شاشة من تطبيق البنك"]], a: 0, x: ["The guarantee letter shows your scholarship pays.", "خطاب الضمان يثبت أن البعثة تدفع."] }
    ] }
  ]);
  var V_DE = visaLesson("de", "🇩🇪", ["Germany", "ألمانيا"], [
    { t: "text", h: ["The national student visa", "التأشيرة الوطنية للدراسة"], p: [
      ["You need health insurance and a national visa from the German embassy or consulate in Riyadh or Jeddah. Appointments can be weeks away, so book early. The visa is €75.", "تحتاج تأمينًا صحيًا وتأشيرة وطنية من السفارة أو القنصلية الألمانية في الرياض أو جدة. وقد تكون المواعيد بعد أسابيع، فاحجز مبكرًا. رسوم التأشيرة 75 يورو."],
      ["Scholarship holders can usually show SACM's scholarship letter instead of a blocked account. After you arrive, register your address (Anmeldung) within 14 days, then book your residence permit appointment.", "يستطيع المبتعث عادةً تقديم خطاب البعثة بدل الحساب المغلق. وبعد وصولك سجّل عنوانك (Anmeldung) خلال 14 يومًا، ثم احجز موعد تصريح الإقامة."]],
      list: [["Bring: passport, admission letter (Zulassung), SACM's scholarship letter and proof of health insurance.", "جهّز: الجواز، وخطاب القبول (Zulassung)، وخطاب البعثة، وإثبات التأمين الصحي."]] },
    { t: "order", h: ["Put the steps in order", "رتّب الخطوات"], items: [
      ["Get your admission letter (Zulassung)", "احصل على خطاب القبول (Zulassung)"],
      ["Arrange health insurance", "رتّب التأمين الصحي"],
      ["Book the embassy appointment early", "احجز موعد السفارة مبكرًا"],
      ["Attend with your documents and pay €75", "احضر بمستنداتك وادفع 75 يورو"],
      ["Arrive and register your address within 14 days", "اصل وسجّل عنوانك خلال 14 يومًا"],
      ["Book your residence permit appointment", "احجز موعد تصريح الإقامة"]] },
    { t: "quiz", h: ["Check yourself", "اختبر نفسك"], pass: 2, items: [
      { s: ["What can you usually show instead of a blocked account?", "ماذا تقدم عادةً بدل الحساب المغلق؟"], o: [["SACM's scholarship letter", "خطاب البعثة من الملحقية"], ["A rental contract", "عقد إيجار"]], a: 0, x: ["The scholarship letter is usually your proof of finance.", "خطاب البعثة عادةً هو إثبات قدرتك المالية."] },
      { s: ["Within how many days must you register your address?", "خلال كم يومًا يجب أن تسجل عنوانك؟"], o: ["7", "14", "60"], a: 1, x: ["Within 14 days of moving in.", "خلال 14 يومًا من السكن."] },
      { s: ["What do you need after you arrive, besides the visa?", "ماذا تحتاج بعد الوصول إلى جانب التأشيرة؟"], o: [["A residence permit", "تصريح إقامة"], ["Nothing", "لا شيء"]], a: 0, x: ["Book the residence permit appointment soon after you arrive.", "احجز موعد تصريح الإقامة بعد وصولك بفترة قصيرة."] }
    ] }
  ]);
  var V_SG = visaLesson("sg", "🇸🇬", ["Singapore", "سنغافورة"], [
    { t: "text", h: ["The Student's Pass", "تصريح الطالب"], p: [
      ["After you accept, your university registers you on SOLAR. You then complete eForm 16 and pay the S$45 processing fee within 7 days.", "بعد قبولك العرض تسجلك جامعتك في نظام SOLAR، ثم تعبّئ نموذج eForm 16 وتدفع رسوم المعالجة 45 دولارًا سنغافوريًا خلال 7 أيام."],
      ["If approved, you get an In-Principle Approval (IPA) letter. You enter Singapore with it, then complete ICA's formalities and pay the S$60 issuance fee to collect your pass. A S$30 multiple-journey visa fee may also apply.", "إذا قُبل طلبك تحصل على خطاب الموافقة المبدئية (IPA)، فتدخل به سنغافورة، ثم تكمل إجراءات ICA وتدفع رسوم الإصدار 60 دولارًا لتستلم التصريح، وقد تُضاف رسوم تأشيرة متعددة الدخول 30 دولارًا."]] },
    { t: "order", h: ["Put the steps in order", "رتّب الخطوات"], items: [
      ["Accept your offer; the university registers you on SOLAR", "اقبل العرض وتسجلك الجامعة في SOLAR"],
      ["Complete eForm 16", "عبّئ نموذج eForm 16"],
      ["Pay the S$45 processing fee within 7 days", "ادفع رسوم المعالجة 45 دولارًا خلال 7 أيام"],
      ["Receive your IPA letter", "استلم خطاب IPA"],
      ["Enter Singapore with your IPA, then collect your pass from ICA", "ادخل سنغافورة بخطاب IPA ثم استلم تصريحك من ICA"]] },
    { t: "quiz", h: ["Check yourself", "اختبر نفسك"], pass: 2, items: [
      { s: ["How long do you have to pay the processing fee?", "كم لديك من الوقت لدفع رسوم المعالجة؟"], o: [["7 days", "7 أيام"], ["30 days", "30 يومًا"]], a: 0, x: ["Within 7 days of eForm 16, or the application can lapse.", "خلال 7 أيام من تعبئة eForm 16، وإلا قد يسقط الطلب."] },
      { s: ["Which letter do you travel with?", "بأي خطاب تسافر؟"], o: ["IPA", "CAS", "I-20"], a: 0, x: ["The In-Principle Approval letter.", "خطاب الموافقة المبدئية."] },
      { s: ["Which form is the Student's Pass application?", "ما نموذج طلب تصريح الطالب؟"], o: ["DS-160", "eForm 16"], a: 1, x: ["eForm 16.", "نموذج eForm 16."] }
    ] }
  ]);

  // ---------------- 20 · F-1 interview simulator ----------------
  var F1 = {
    id: "visa-f1", order: 20, group: "practice", cc: ["us"], icon: "🎙️", mins: 15,
    t: ["F-1 interview simulator", "محاكي مقابلة F-1"],
    d: ["Random questions like a real consular interview, with a recorder and a self-check.", "أسئلة عشوائية مثل المقابلة الحقيقية في السفارة، مع مسجل وتقييم ذاتي."],
    steps: [
      { t: "text", h: ["What the officer wants to know", "ما يريد الموظف معرفته"], p: [
        ["The interview is usually short: a few minutes at a window. The officer wants to see three things: you are a real student with a clear plan, you can pay for your studies, and you have a plan for after you graduate.", "المقابلة عادةً قصيرة: دقائق معدودة عند النافذة. ويريد الموظف أن يتأكد من ثلاثة أمور: أنك طالب حقيقي بخطة واضحة، وأنك قادر على تمويل دراستك، وأن لديك خطة بعد التخرج."],
        ["Answer in one to three clear sentences, in your own words. Memorised speeches sound false, and a wrong guess is worse than \"I'm not sure\".", "أجب في جملة إلى ثلاث جمل واضحة بكلماتك أنت، فالكلام المحفوظ يبدو مصطنعًا، والتخمين الخاطئ أسوأ من قول «لست متأكدًا»."]],
        list: [["Know your program, university, city and start date.", "اعرف برنامجك وجامعتك ومدينتك وتاريخ البدء."], ["Explain your funding simply: the Saudi Government scholarship, through SACM.", "اشرح تمويلك ببساطة: بعثة الحكومة السعودية عبر الملحقية."], ["Have your documents ready, but only hand over what you're asked for.", "جهّز مستنداتك، لكن لا تقدّم إلا ما يُطلب منك."]] },
      { t: "quiz", h: ["Which answer is better?", "أي إجابة أفضل؟"], pass: 3, items: [
        { s: "Why did you choose this university?", o: [["\"Because it's a good university and America is the best country.\"", "«لأنها جامعة جيدة وأمريكا أفضل دولة.»"], ["\"Its civil engineering program has a water-resources lab, and that's what I want to work on back home.\"", "«برنامج الهندسة المدنية فيها لديه مختبر للموارد المائية، وهذا ما أريد العمل عليه في بلدي.»"]], a: 1, x: ["Specific and linked to your plans. The first could be said by anyone.", "إجابة محددة ومرتبطة بخططك، أما الأولى فيمكن أن يقولها أي شخص."] },
        { s: "How will you pay for your studies?", o: [["\"My scholarship from the Saudi Government covers my tuition and living costs. I have the guarantee letter here.\"", "«بعثتي من الحكومة السعودية تغطي رسومي وتكاليف معيشتي، ومعي خطاب الضمان.»"], ["\"My family is rich, don't worry.\"", "«عائلتي غنية، لا تقلق.»"]], a: 0, x: ["Clear, true and backed by a document.", "إجابة واضحة وصادقة ومدعومة بمستند."] },
        { s: "What will you do after you graduate?", o: [["\"I'm not sure yet, maybe stay and see.\"", "«لست متأكدًا، ربما أبقى وأرى.»"], ["\"I plan to return and work in the water sector in Saudi Arabia.\"", "«أخطط للعودة والعمل في قطاع المياه في السعودية.»"]], a: 1, x: ["Give your real plan, clearly. If it's to return and work at home, say so.", "اذكر خطتك الحقيقية بوضوح، فإن كانت العودة والعمل في بلدك فقلها."] },
        { s: "You don't understand a question. What do you do?", o: [["Guess and answer something", "خمّن وأجب بأي شيء"], ["Politely ask: \"Sorry, could you repeat the question?\"", "اطلب بأدب: «عفوًا، هل يمكنك إعادة السؤال؟»"]], a: 1, x: ["Asking is normal. A wrong answer to a misheard question can confuse things.", "طلب الإعادة أمر طبيعي، والإجابة الخاطئة عن سؤال لم تفهمه قد تربك الموقف."] }
      ] },
      { t: "interview", h: ["Your mock interview", "مقابلتك التجريبية"], icon: "🇺🇸", officer: "🧑‍💼", accent: "en-US", n: 6, secs: 45,
        intro: [["Answer as if you were at the window. Use your real program and university.", "أجب كأنك عند النافذة، واستخدم برنامجك وجامعتك الحقيقيين."]],
        bank: [
          { q: "Why do you want to study in the United States?", tip: ["Give one or two specific reasons tied to your field, not general praise.", "اذكر سببًا أو سببين محددين مرتبطين بتخصصك، لا مديحًا عامًا."] },
          { q: "Why did you choose this university?", tip: ["Name something real: the program, a lab, a course or a professor.", "اذكر شيئًا حقيقيًا: البرنامج أو مختبرًا أو مادة أو أستاذًا."] },
          { q: "What will you study?", tip: ["Name your degree and major exactly as on your I-20.", "اذكر درجتك وتخصصك تمامًا كما في I-20."] },
          { q: "Why this major?", tip: ["One short story or reason from your own experience.", "قصة أو سبب قصير من تجربتك."] },
          { q: "Who is paying for your studies?", tip: ["The Saudi Government scholarship, through the Saudi Arabian Cultural Mission.", "بعثة الحكومة السعودية عبر الملحقية الثقافية السعودية."] },
          { q: "How much will your first year cost?", tip: ["Know the figure on your I-20, and that your scholarship covers it.", "اعرف المبلغ المذكور في I-20، وأن بعثتك تغطيه."] },
          { q: "What are your plans after graduation?", tip: ["Your real plan, clearly: the job or sector you're aiming for.", "خطتك الحقيقية بوضوح: الوظيفة أو القطاع الذي تستهدفه."] },
          { q: "Do you have any relatives in the United States?", tip: ["Answer honestly. Having relatives there is not a problem in itself.", "أجب بصدق، فوجود أقارب هناك ليس مشكلة بحد ذاته."] },
          { q: "What was your English test score?", tip: ["Know your exact score and test date.", "اعرف درجتك وتاريخ اختبارك بالضبط."] },
          { q: "Where did you finish high school, and what was your GPA?", tip: ["Short and exact.", "إجابة قصيرة ودقيقة."] },
          { q: "How many universities did you apply to?", tip: ["Say how many, and which ones accepted you.", "اذكر العدد والجامعات التي قبلتك."] },
          { q: "Why don't you study this in Saudi Arabia?", tip: ["Be positive about home: explain what this program adds for your goals.", "تحدث عن بلدك بإيجابية، واشرح ما يضيفه هذا البرنامج لأهدافك."] },
          { q: "Where will you live in the US?", tip: ["University housing or your plan for the first weeks.", "سكن الجامعة أو خطتك للأسابيع الأولى."] },
          { q: "Have you travelled abroad before?", tip: ["Honest and brief.", "بصدق واختصار."] },
          { q: "Do you plan to work while you study?", tip: ["Focus on study. F-1 students can work on campus up to 20 hours a week in the semester, and you'd follow SACM's rules.", "ركّز على الدراسة. يمكن لطلاب F-1 العمل داخل الحرم حتى 20 ساعة أسبوعيًا خلال الفصل، وستتبع أنظمة الملحقية."] },
          { q: "How long is your program?", tip: ["Match the dates on your I-20.", "طابق التواريخ في I-20."] },
          { q: "What do your parents do?", tip: ["A simple, honest answer.", "إجابة بسيطة وصادقة."] },
          { q: "What do you know about the city where your university is?", tip: ["One or two facts show you've done your research.", "معلومة أو اثنتان تُظهران أنك بحثت."] }],
        checks: [
          ["I answered in 1–3 clear sentences, not a memorised speech.", "أجبت في جملة إلى ثلاث جمل واضحة، لا في كلام محفوظ."],
          ["I named my program and university correctly.", "ذكرت برنامجي وجامعتي بشكل صحيح."],
          ["I explained my funding: the Saudi Government scholarship.", "شرحت تمويلي: بعثة الحكومة السعودية."],
          ["I gave a clear plan for after I graduate.", "قدمت خطة واضحة لما بعد التخرج."],
          ["I was honest and didn't guess.", "كنت صادقًا ولم أخمّن."],
          ["I sounded calm and spoke at a steady pace.", "بدوت هادئًا وتحدثت بسرعة مناسبة."]] }
    ]
  };

  // ---------------- 21 · Genuine Student (Australia) ----------------
  var GS = {
    id: "visa-gs", order: 21, group: "practice", cc: ["au"], icon: "📝", mins: 12,
    t: ["Genuine Student practice", "تدريب الطالب الحقيقي"],
    d: ["What the Genuine Student questions look for, and practice explaining your plan out loud.", "ما تبحث عنه أسئلة الطالب الحقيقي، وتدريب على شرح خطتك بصوت عالٍ."],
    steps: [
      { t: "text", h: ["What the questions look for", "ما تبحث عنه الأسئلة"], p: [
        ["In the Student visa form, you answer short questions in English, with a limit of 150 words each. They ask about your situation at home, why you chose this course, this university and Australia, and how the course will help your future.", "في نموذج تأشيرة الطالب تجيب عن أسئلة قصيرة بالإنجليزية بحد 150 كلمة لكل سؤال، عن وضعك في بلدك، ولماذا اخترت هذا التخصص وهذه الجامعة وأستراليا، وكيف ستفيد الدراسة مستقبلك."],
        ["The case officer wants specific, honest answers that fit your documents. Copied text is easy to spot. Practising out loud helps your written answers sound like you."
          , "يريد موظف التأشيرة إجابات محددة وصادقة تتوافق مع مستنداتك، والنص المنسوخ سهل الاكتشاف. والتدرب بصوت عالٍ يجعل إجاباتك المكتوبة تشبهك."]],
        cta: { t: ["Write your answers in the writing course", "اكتب إجاباتك في دورة الكتابة"], href: "academy/writing/#/l/gs" } },
      { t: "quiz", h: ["Strong or weak?", "قوية أم ضعيفة؟"], pass: 3, items: sort([["Strong", "قوية"], ["Weak", "ضعيفة"]], [
        [["\"Australia is a beautiful country with a high quality of life.\"", "«أستراليا بلد جميل وجودة الحياة فيها عالية.»"], 1, ["True for anyone. It says nothing about your study plan.", "تصدق على أي شخص، ولا تقول شيئًا عن خطتك الدراسية."]],
        [["\"The course's mine-ventilation unit matches the work I want to do for Ma'aden after I graduate.\"", "«وحدة تهوية المناجم في البرنامج تناسب العمل الذي أريده في معادن بعد تخرجي.»"], 0, ["Specific to the course and linked to a real plan.", "محددة بالبرنامج ومرتبطة بخطة حقيقية."]],
        [["\"My scholarship covers tuition, health cover and a monthly allowance, and my family supports my plan.\"", "«بعثتي تغطي الرسوم والتأمين الصحي ومكافأة شهرية، وعائلتي تدعم خطتي.»"], 0, ["Clear facts about your situation.", "حقائق واضحة عن وضعك."]],
        [["A paragraph copied from a website template", "فقرة منسوخة من قالب على الإنترنت"], 1, ["Templates are easy to spot and can hurt your application. Write your own.", "القوالب سهلة الاكتشاف وقد تضر طلبك، فاكتب إجاباتك بنفسك."]]
      ]) },
      { t: "interview", h: ["Explain it out loud", "اشرحها بصوت عالٍ"], icon: "🇦🇺", officer: "🧑‍💼", accent: "en-AU", n: 4, secs: 60,
        intro: [["Say each answer in about a minute. If you can explain it clearly out loud, you can write it clearly.", "قل كل إجابة في دقيقة تقريبًا، فإذا استطعت شرحها بوضوح بصوت عالٍ، فستكتبها بوضوح."]],
        bank: [
          { q: "Tell me about your current situation at home: your studies, family and work.", tip: ["Short facts: what you've studied, any work, and your family's support.", "حقائق قصيرة: ما درسته، وأي عمل، ودعم عائلتك."] },
          { q: "Why did you choose this course?", tip: ["Link it to something you've done and what you want to do next.", "اربطه بشيء فعلته وبما تريد فعله بعد ذلك."] },
          { q: "Why this university, and not another one?", tip: ["One or two specific reasons.", "سبب أو سببان محددان."] },
          { q: "Why study in Australia rather than at home or in another country?", tip: ["Be positive about home, and specific about what this course adds.", "تحدث عن بلدك بإيجابية، وكن محددًا فيما يضيفه هذا البرنامج."] },
          { q: "How will this course help your future?", tip: ["A realistic job or sector, ideally back home.", "وظيفة أو قطاع واقعي، ويفضّل أن يكون في بلدك."] },
          { q: "How will you support yourself in Australia?", tip: ["Your scholarship: tuition, OSHC and the monthly allowance.", "بعثتك: الرسوم والتأمين الصحي OSHC والمكافأة الشهرية."] }],
        checks: [
          ["Every answer was specific to me, not true for anyone.", "كل إجاباتي خاصة بي، لا تنطبق على أي شخص."],
          ["My answers match my CoE and documents.", "إجاباتي تتوافق مع CoE ومستنداتي."],
          ["I explained how the course fits my future.", "شرحت كيف يناسب البرنامج مستقبلي."],
          ["Each answer would fit in about 150 words.", "كل إجابة تتسع في نحو 150 كلمة."]] }
    ]
  };

  // ---------------- 22 · UK credibility interview ----------------
  var UKI = {
    id: "visa-ukint", order: 22, group: "practice", cc: ["uk"], icon: "🎙️", mins: 15,
    t: ["UK credibility interview practice", "تدريب على مقابلة المصداقية البريطانية"],
    d: ["Practise the questions UKVI or your university may ask to check you're a genuine student.", "تدرّب على الأسئلة التي قد تطرحها UKVI أو جامعتك للتأكد أنك طالب حقيقي."],
    steps: [
      { t: "text", h: ["What a credibility interview is", "ما مقابلة المصداقية"], p: [
        ["As part of a Student visa application, you may be asked to a short interview, often by video. Some universities also run their own check before issuing a CAS. The questions test whether you really intend to study, and whether you know your course.", "ضمن طلب تأشيرة الطالب قد تُدعى إلى مقابلة قصيرة، غالبًا عبر الفيديو، وتجري بعض الجامعات تحققًا خاصًا بها قبل إصدار CAS. وتختبر الأسئلة جديتك في الدراسة ومعرفتك ببرنامجك."],
        ["Know your course modules, your university, how you'll pay, where you'll live and what you plan to do after.", "اعرف مواد برنامجك وجامعتك وطريقة تمويلك ومكان سكنك وخطتك بعد الدراسة."]] },
      { t: "interview", h: ["Your mock interview", "مقابلتك التجريبية"], icon: "🇬🇧", officer: "🧑‍💼", accent: "en-GB", n: 6, secs: 60,
        bank: [
          { q: "Why have you chosen this course?", tip: ["Connect it to your past studies and your goal.", "اربطه بدراستك السابقة وهدفك."] },
          { q: "Why did you choose this university?", tip: ["Specific reasons: the course content, facilities or staff.", "أسباب محددة: محتوى البرنامج أو المرافق أو الأساتذة."] },
          { q: "Why the UK, and not another country?", tip: ["Course length, structure or something specific, not just 'good education'.", "مدة البرنامج أو هيكله أو شيء محدد، لا مجرد «تعليم جيد»."] },
          { q: "Can you name some of the modules you will study?", tip: ["Name two or three from your course page.", "اذكر مادتين أو ثلاثًا من صفحة برنامجك."] },
          { q: "How does this course relate to what you studied before?", tip: ["Show a logical next step.", "أظهر أنها خطوة منطقية تالية."] },
          { q: "Who is funding your studies?", tip: ["The Saudi Government, through the Saudi Arabian Cultural Mission.", "الحكومة السعودية عبر الملحقية الثقافية السعودية."] },
          { q: "Where will you live while you study?", tip: ["Halls or your housing plan.", "السكن الجامعي أو خطتك للسكن."] },
          { q: "When does your course start, and how long is it?", tip: ["Match your CAS exactly.", "طابق CAS تمامًا."] },
          { q: "What do you plan to do after you finish?", tip: ["A realistic, specific plan.", "خطة واقعية ومحددة."] },
          { q: "How did you hear about this university?", tip: ["Honest and short.", "بصدق واختصار."] },
          { q: "What will you do if you find the course difficult?", tip: ["Mention support: tutors, office hours, study skills services.", "اذكر الدعم: المرشدين والساعات المكتبية وخدمات المهارات الدراسية."] },
          { q: "Have you visited the UK before?", tip: ["Honest and brief.", "بصدق واختصار."] }],
        checks: [
          ["I named real modules from my course.", "ذكرت مواد حقيقية من برنامجي."],
          ["My dates and details matched my CAS.", "طابقت التواريخ والتفاصيل ما في CAS."],
          ["I explained my funding clearly.", "شرحت تمويلي بوضوح."],
          ["I gave a specific plan for after my course.", "قدمت خطة محددة لما بعد الدراسة."],
          ["I spoke in my own words, calmly.", "تحدثت بكلماتي بهدوء."]] }
    ]
  };

  // ---------------- 30 · pack your bags ----------------
  var PACK = {
    id: "visa-pack", order: 30, group: "fly", icon: "🧳", mins: 8,
    t: ["Pack your bags", "جهّز حقائبك"],
    d: ["What goes in your hand luggage, what goes in the hold, and what stays at home.", "ما الذي تضعه في حقيبة اليد، وما الذي تشحنه، وما الذي تتركه في البيت."],
    steps: [
      { t: "quiz", h: ["Where does it go?", "أين تضعه؟"], pass: 7, intro: [["Airline rules vary a little, so check yours. These are the safe choices.", "تختلف أنظمة شركات الطيران قليلًا، فراجع شركتك. هذه هي الخيارات الآمنة."]], items: sort([["Hand luggage", "حقيبة اليد"], ["Checked bag", "الحقيبة المشحونة"], ["Leave at home", "اتركه في البيت"]], [
        [["Passport, visa and your enrolment document", "الجواز والتأشيرة ووثيقة التسجيل"], 0, ["Keep them with you: officers can ask for them on arrival.", "احتفظ بها معك، فقد يطلبها الموظفون عند الوصول."]],
        [["Power bank", "بطارية متنقلة (باور بانك)"], 0, ["Spare lithium batteries must go in the cabin, never in a checked bag.", "يجب حمل بطاريات الليثيوم الاحتياطية في المقصورة، لا في الحقيبة المشحونة أبدًا."]],
        [["Prescription medicine, with a doctor's letter in English", "دواء موصوف مع تقرير طبي بالإنجليزية"], 0, ["Keep it with you in its original packaging, in case your bag is delayed.", "احتفظ به معك في عبوته الأصلية تحسبًا لتأخر حقيبتك."]],
        [["Original certificates and transcripts", "الشهادات وكشوف الدرجات الأصلية"], 0, ["Irreplaceable: never put them in the hold.", "لا يمكن تعويضها، فلا تضعها في الحقيبة المشحونة أبدًا."]],
        [["A 200 ml bottle of perfume", "عطر بعبوة 200 مل"], 1, ["Liquids over 100 ml can't go in the cabin.", "السوائل التي تزيد على 100 مل لا تُحمل في المقصورة."]],
        [["Kitchen knife", "سكين مطبخ"], 1, ["Sharp objects go in the checked bag, or buy one when you arrive.", "الأدوات الحادة تُشحن، أو اشترِ واحدة بعد وصولك."]],
        [["Fresh fruit, meat or cheese from home", "فواكه أو لحوم أو أجبان طازجة من البيت"], 2, ["Most countries restrict fresh food, and some fine you heavily. Buy food when you arrive.", "تمنع أغلب الدول الأطعمة الطازجة، وبعضها يفرض غرامات كبيرة، فاشترِ طعامك بعد الوصول."]],
        [["Winter coat (if you're arriving in winter)", "معطف شتوي (إذا كنت ستصل في الشتاء)"], 1, ["Pack it, or wear it on the plane if you land in the cold.", "اشحنه، أو ارتده في الطائرة إذا كنت ستصل في البرد."]]
      ]) },
      { t: "quiz", cc: ["au"], h: ["Australia: declare it", "أستراليا: أفصح عنه"], pass: 2, items: [
        { s: ["You packed sealed dates and Arabic coffee. On the Incoming Passenger Card, you…", "حملت تمرًا مغلفًا وقهوة عربية. في بطاقة الركاب القادمين…"], o: [["Tick yes and declare them", "تضع علامة «نعم» وتفصح عنها"], ["Tick no, it's only a little", "تضع «لا» لأنها كمية قليلة"]], a: 0, x: ["Declare all food. Many packaged foods are allowed after inspection, and declaring is never a problem; not declaring can mean a fine.", "أفصح عن كل الأطعمة، فكثير من الأطعمة المغلفة مسموحة بعد الفحص، والإفصاح لا يسبب مشكلة أبدًا، أما عدم الإفصاح فقد يعني غرامة."] },
        { s: ["You're not sure whether something counts. What do you do?", "لست متأكدًا إن كان شيء ما يدخل في ذلك. ماذا تفعل؟"], o: [["Declare it", "أفصح عنه"], ["Hide it", "أخفه"]], a: 0, x: ["When in doubt, declare.", "إذا شككت فأفصح."] }
      ] }
    ]
  };

  // ---------------- 40 · rules after you arrive ----------------
  function rulesQ(cc, items) { return { t: "quiz", cc: [cc], h: ["The rules for you", "الأنظمة الخاصة بك"], pass: items.length - 1, items: items }; }
  var RULES = {
    id: "visa-rules", order: 40, group: "fly", icon: "⚖️", mins: 8,
    t: ["Visa rules after you arrive", "أنظمة التأشيرة بعد الوصول"],
    d: ["Arrival dates, work limits and the things you must keep up to date.", "مواعيد الوصول وحدود العمل والأمور التي يجب أن تبقيها محدثة."],
    steps: [
      { t: "text", h: ["Your visa has conditions", "لتأشيرتك شروط"], p: [
        ["A student visa lets you study, with conditions: when you can arrive, how much you can work, and what you must keep up to date. Breaking them can cost you your visa.", "تسمح لك تأشيرة الطالب بالدراسة وفق شروط: متى تصل، وكم تعمل، وما الذي يجب أن تحدّثه. ومخالفتها قد تكلفك تأشيرتك."],
        SACM] },
      rulesQ("au", [
        { s: ["How much can you work while your course is in session?", "كم ساعة يمكنك العمل أثناء الدراسة؟"], o: [["20 hours a week", "20 ساعة أسبوعيًا"], ["48 hours a fortnight", "48 ساعة كل أسبوعين"], ["Unlimited", "دون حد"]], a: 1, x: ["48 hours per fortnight in session, and unlimited in official breaks.", "48 ساعة كل أسبوعين أثناء الدراسة، ودون حد في الإجازات الرسمية."] },
        { s: ["How early can you usually arrive?", "كم مبكرًا يمكنك الوصول عادةً؟"], o: [["Up to 90 days before your course", "قبل بدء الدراسة بـ90 يومًا كحد أقصى"], ["Any time", "أي وقت"]], a: 0, x: ["Usually up to 90 days before your course starts.", "عادةً قبل بدء دراستك بـ90 يومًا كحد أقصى."] },
        { s: ["You move to a new flat. What must you do?", "انتقلت إلى شقة جديدة. ماذا يجب عليك؟"], o: [["Update your address with your university", "تحديث عنوانك لدى جامعتك"], ["Nothing", "لا شيء"]], a: 0, x: ["Visa holders must keep their address up to date with their university.", "يجب على حاملي التأشيرة تحديث عناوينهم لدى الجامعة."] }]),
      rulesQ("us", [
        { s: ["Where can F-1 students work in their first year without special permission?", "أين يمكن لطلاب F-1 العمل في سنتهم الأولى دون تصريح خاص؟"], o: [["On campus", "داخل الحرم الجامعي"], ["Anywhere", "في أي مكان"]], a: 0, x: ["On campus, up to 20 hours a week in the semester. Off-campus work needs CPT or OPT.", "داخل الحرم حتى 20 ساعة أسبوعيًا خلال الفصل، والعمل خارجه يحتاج تصريح CPT أو OPT."] },
        { s: ["How many hours a week on campus during the semester?", "كم ساعة أسبوعيًا داخل الحرم خلال الفصل؟"], o: ["10", "20", "40"], a: 1, x: ["Up to 20, and full time in official breaks.", "حتى 20 ساعة، وبدوام كامل في الإجازات الرسمية."] },
        { s: ["Where should your I-20 be when you fly?", "أين يجب أن يكون I-20 عند السفر؟"], o: [["In your hand luggage", "في حقيبة اليد"], ["In your checked bag", "في الحقيبة المشحونة"]], a: 0, x: ["Officers check it on arrival.", "يتحقق منه الموظفون عند الوصول."] }]),
      rulesQ("uk", [
        { s: ["How much can degree students usually work in term time?", "كم يمكن لطلاب البكالوريوس العمل عادةً خلال الفصل الدراسي؟"], o: [["10 hours a week", "10 ساعات أسبوعيًا"], ["20 hours a week", "20 ساعة أسبوعيًا"], ["Unlimited", "دون حد"]], a: 1, x: ["Usually 20 hours a week in term time, and full time in official vacations. Check your eVisa conditions.", "عادةً 20 ساعة أسبوعيًا خلال الفصل، وبدوام كامل في الإجازات الرسمية، وراجع شروط تأشيرتك الإلكترونية."] },
        { s: ["Where do you check your exact conditions?", "أين تراجع شروطك بالتحديد؟"], o: [["Your eVisa in your UKVI account", "تأشيرتك الإلكترونية في حساب UKVI"], ["A friend's visa", "تأشيرة صديقك"]], a: 0, x: ["Your own eVisa shows your conditions.", "تأشيرتك الإلكترونية تُظهر شروطك."] }]),
      rulesQ("ca", [
        { s: ["If your permit allows it, how much can you work off campus during classes?", "إذا سمح تصريحك، كم يمكنك العمل خارج الحرم أثناء الدراسة؟"], o: [["24 hours a week", "24 ساعة أسبوعيًا"], ["40 hours a week", "40 ساعة أسبوعيًا"]], a: 0, x: ["Up to 24 hours a week during classes, and full time in scheduled breaks.", "حتى 24 ساعة أسبوعيًا أثناء الدراسة، وبدوام كامل في الإجازات المجدولة."] },
        { s: ["What do you show at the airport to get your permit?", "ماذا تُبرز في المطار لتحصل على تصريحك؟"], o: [["Your letter of introduction", "خطاب التعريف"], ["Your flight ticket", "تذكرة الطيران"]], a: 0, x: ["The permit is issued when you land.", "يُصدر التصريح عند وصولك."] }]),
      rulesQ("de", [
        { s: ["How much can you work with a student residence permit?", "كم يمكنك العمل بتصريح إقامة الدراسة؟"], o: [["140 full days or 280 half days a year", "140 يومًا كاملًا أو 280 نصف يوم في السنة"], ["Unlimited", "دون حد"]], a: 0, x: ["140 full days or 280 half days a year.", "140 يومًا كاملًا أو 280 نصف يوم في السنة."] },
        { s: ["What must you do within 14 days of moving in?", "ماذا يجب أن تفعل خلال 14 يومًا من السكن؟"], o: [["Register your address (Anmeldung)", "تسجيل عنوانك (Anmeldung)"], ["Open a blocked account", "فتح حساب مغلق"]], a: 0, x: ["Many other steps, such as the bank and residence permit, need it.", "كثير من الخطوات الأخرى، كالبنك وتصريح الإقامة، تحتاجه."] }]),
      rulesQ("sg", [
        { s: ["How much can full-time students at approved institutions work during term?", "كم يمكن لطلاب الدوام الكامل في المؤسسات المعتمدة العمل خلال الفصل؟"], o: [["16 hours a week", "16 ساعة أسبوعيًا"], ["30 hours a week", "30 ساعة أسبوعيًا"]], a: 0, x: ["Up to 16 hours a week in term, and full time in vacations, without a work pass.", "حتى 16 ساعة أسبوعيًا خلال الفصل، وبدوام كامل في الإجازات، دون تصريح عمل."] },
        { s: ["What do you need to enter Singapore before you have your pass?", "ماذا تحتاج لدخول سنغافورة قبل استلام تصريحك؟"], o: [["Your IPA letter", "خطاب IPA"], ["Nothing", "لا شيء"]], a: 0, x: ["Travel with your IPA letter.", "سافر ومعك خطاب IPA."] }])
    ]
  };

  // ---------------- 50 · at the border (story) ----------------
  var BORDER = {
    id: "visa-border", order: 50, group: "fly", icon: "🛬", mins: 8,
    t: ["At the border", "عند المنفذ"],
    d: ["A short story: from landing to leaving the airport. Your choices decide how it goes.", "قصة قصيرة من الهبوط حتى مغادرة المطار، واختياراتك تحدد مجراها."],
    steps: [
      { t: "story", h: ["Landing day", "يوم الوصول"], start: "a", nodes: {
        a: { i: "🛬", p: ["You land after a long flight. In the queue for passport control, you check where your enrolment document is.", "تهبط بعد رحلة طويلة، وفي طابور الجوازات تتحقق من مكان وثيقة تسجيلك."], ch: [
          { t: ["In the folder in my hand luggage", "في الملف داخل حقيبة يدي"], go: "b", ok: true, fb: ["Exactly right. Officers can ask to see it.", "تصرف صحيح تمامًا، فقد يطلب الموظف رؤيتها."] },
          { t: ["In my checked bag", "في حقيبتي المشحونة"], go: "b", ok: false, fb: ["If the officer asks for it, you can't reach it. Next time, keep documents with you.", "إذا طلبها الموظف فلن تصل إليها، وفي المرة القادمة احتفظ بمستنداتك معك."] }] },
        b: { i: "🛂", p: ["The officer asks: \"What's the purpose of your visit?\"", "يسألك الموظف: «ما سبب زيارتك؟»"], ch: [
          { t: ["\"I'm here to study civil engineering at Northbridge University.\"", "«جئت لدراسة الهندسة المدنية في جامعة نورثبريدج.»"], go: "c", ok: true, fb: ["Short, true and matches your visa.", "إجابة قصيرة وصادقة وتطابق تأشيرتك."] },
          { t: ["\"Tourism, mostly.\"", "«سياحة في الغالب.»"], go: "c", ok: false, fb: ["You're on a student visa, so say you're here to study. Always tell the truth.", "أنت تحمل تأشيرة طالب، فقل إنك جئت للدراسة، وقل الحقيقة دائمًا."] },
          { t: ["A long, nervous story about your whole family", "قصة طويلة متوترة عن عائلتك كلها"], go: "c", fb: ["Honest, but keep answers short and clear.", "صادقة، لكن اجعل إجاباتك قصيرة وواضحة."] }] },
        c: { i: "🧺", p: ["At customs, you're asked whether you're carrying any food. You packed sealed dates and Arabic coffee.", "عند الجمارك تُسأل إن كنت تحمل طعامًا، وقد حملت تمرًا مغلفًا وقهوة عربية."], ch: [
          { t: ["Declare them", "أفصح عنها"], go: "d", ok: true, fb: ["Declaring is always the safe choice. Packaged food is often allowed after inspection.", "الإفصاح هو الخيار الآمن دائمًا، والأطعمة المغلفة غالبًا مسموحة بعد الفحص."] },
          { t: ["Say no: it's only a little", "قل لا، فهي كمية قليلة"], go: "d", ok: false, fb: ["Undeclared food can mean a fine, or worse. When in doubt, declare.", "عدم الإفصاح عن الطعام قد يعني غرامة أو أكثر، وإذا شككت فأفصح."] }] },
        d: { i: "🚕", p: ["You're through. Your phone has no local SIM yet, and a man in the arrivals hall offers you a cheap ride.", "عبرت الإجراءات، وجوالك بلا شريحة محلية بعد، ورجل في صالة الوصول يعرض عليك توصيلة رخيصة."], ch: [
          { t: ["Use the airport Wi-Fi to tell your family, then take the official taxi rank, a ride-share or public transport", "استخدم شبكة المطار لتطمئن عائلتك، ثم خذ سيارة من موقف الأجرة الرسمي أو تطبيق نقل أو المواصلات العامة"], go: "e", ok: true, fb: ["Safe and smart. Buy a SIM or eSIM at the airport or in town.", "تصرف آمن وذكي، واشترِ شريحة أو eSIM من المطار أو المدينة."] },
          { t: ["Accept the ride", "اقبل التوصيلة"], go: "e", ok: false, fb: ["Unofficial drivers can overcharge or worse. Use official options only.", "السائقون غير الرسميين قد يبالغون في الأجرة أو أسوأ، فاستخدم الخيارات الرسمية فقط."] }] },
        e: { i: "🏠", end: true, p: ["You reach your accommodation. Next: complete your arrival steps on Safeer and go to orientation.", "وصلت إلى سكنك. الخطوة التالية: أكمل خطوات الوصول عبر منصة سفير واحضر الأسبوع التعريفي."] }
      } }
    ]
  };

  // ---------------- 90 · checkpoint ----------------
  var CHECK = {
    id: "visa-check", order: 90, group: "end", icon: "🏁", mins: 6,
    t: ["Checkpoint: visa ready", "نقطة تحقق: جاهز للتأشيرة"],
    d: ["Five questions. Pass with 4.", "خمسة أسئلة، والنجاح بأربع إجابات صحيحة."],
    steps: [
      { t: "quiz", h: ["Checkpoint", "نقطة التحقق"], pass: 4, items: [
        { s: ["When should you book your flight?", "متى تحجز رحلتك؟"], o: [["Before applying for the visa", "قبل التقديم على التأشيرة"], ["After your visa is granted", "بعد صدور التأشيرة"]], a: 1, x: ["Processing times change. Book once you have the visa.", "مدد المعالجة تتغير، فاحجز بعد صدور التأشيرة."] },
        { s: ["An officer asks a question you didn't catch. You…", "سألك الموظف سؤالًا لم تفهمه. أنت…"], o: [["Guess", "تخمّن"], ["Ask them to repeat it", "تطلب إعادته"]], a: 1, x: ["Asking is normal and polite.", "طلب الإعادة أمر طبيعي ومهذب."] },
        { s: ["Where does a power bank go?", "أين تضع البطارية المتنقلة؟"], o: [["Hand luggage", "حقيبة اليد"], ["Checked bag", "الحقيبة المشحونة"]], a: 0, x: ["Spare lithium batteries go in the cabin.", "بطاريات الليثيوم الاحتياطية تُحمل في المقصورة."] },
        { s: ["Before taking a part-time job, you should check…", "قبل قبول عمل جزئي، يجب أن تراجع…"], o: [["Your visa's work limit and SACM's rules", "حد العمل في تأشيرتك وأنظمة الملحقية"], ["Only the pay", "الأجر فقط"]], a: 0, x: ["Both your visa conditions and your sponsor's rules apply.", "شروط تأشيرتك وأنظمة جهة الابتعاث تنطبق كلاهما."] },
        { s: ["Your enrolment document has a mistake. Who corrects it?", "في وثيقة تسجيلك خطأ. من يصححه؟"], o: [["You, in a PDF editor", "أنت ببرنامج تعديل PDF"], ["The university that issued it", "الجامعة التي أصدرتها"]], a: 1, x: ["Only the issuer can correct an official document.", "الجهة المصدرة وحدها تصحح الوثيقة الرسمية."] }
      ] }
    ]
  };

  window.MasarokCourse = {
    id: "visa",
    t: ["Visa practice", "التدريب على التأشيرة"],
    sub: ["Rehearse until you're calm: the steps, the interview, the bags and the rules for your country.", "تدرّب حتى تطمئن: الخطوات والمقابلة والحقائب والأنظمة الخاصة بدولتك."],
    note: ["Fees and rules change. Always confirm on the official visa website for your country, and check SACM's rules. Interview practice is for confidence, not a guarantee of a visa.", "الرسوم والأنظمة تتغير، فتأكد دائمًا من موقع التأشيرة الرسمي لدولتك وراجع أنظمة الملحقية. والتدريب على المقابلة لبناء الثقة، وليس ضمانًا للحصول على التأشيرة."],
    groups: [["base", ["Your visa", "تأشيرتك"]], ["practice", ["Interview practice", "التدريب على المقابلة"]], ["fly", ["Flying and arriving", "السفر والوصول"]], ["end", ["Checkpoint", "نقطة التحقق"]]],
    lessons: [V_AU, V_US, V_UK, V_CA, V_DE, V_SG, F1, GS, UKI, PACK, RULES, BORDER, CHECK]
  };
})();

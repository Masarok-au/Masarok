/* Masarok Academy · Life and university skills.
   Original Masarok practice. Every person, listing, lease and payslip here is fictional.
   Teaching text is [English, Arabic]. */
(function () {
  "use strict";

  function sort(bins, list) { return list.map(function (x) { return { s: x[0], o: bins, a: x[1], x: x[2], row: true }; }); }

  // ---------------- 10 · spot the scam ----------------
  var SCAM = {
    id: "life-scam", order: 10, group: "home", icon: "🏚️", mins: 10,
    t: ["Spot the scam listing", "اكتشف إعلان السكن الاحتيالي"],
    d: ["Rental scams target new international students. Learn the warning signs.", "احتيالات السكن تستهدف الطلاب الدوليين الجدد. تعرّف على علامات التحذير."],
    steps: [
      { t: "text", h: ["The warning signs", "علامات التحذير"], p: [
        ["Scammers know you're far away, in a hurry and unsure of local prices. They post a great room, then ask for money before you can see it.", "يعرف المحتالون أنك بعيد ومستعجل ولا تعرف الأسعار المحلية، فينشرون غرفة رائعة ثم يطلبون المال قبل أن تراها."]],
        list: [
          ["The price is far below similar places nearby.", "السعر أقل بكثير من الأماكن المشابهة في المنطقة."],
          ["The owner is \"overseas\" and can't show you the place.", "المالك «مسافر» ولا يستطيع أن يريك المكان."],
          ["They want money before you've seen it or signed anything.", "يطلب المال قبل أن ترى المكان أو توقّع أي شيء."],
          ["They ask for gift cards, crypto or a money transfer service.", "يطلب الدفع ببطاقات هدايا أو عملات رقمية أو خدمات تحويل الأموال."],
          ["They refuse phone or video calls and push you to decide today.", "يرفض المكالمات الهاتفية أو المرئية ويضغط عليك لتقرر اليوم."]] },
      { t: "spot", h: ["Listing 1", "الإعلان 1"],
        doc: { title: "Bright room in a 3-bedroom flat, 5 minutes to campus", from: "Posted in a student housing group", rows: [
          ["Price", "About half the price of similar rooms nearby, bills included", true, ["Too good to be true is the first red flag.", "العرض الأفضل من أن يكون حقيقيًا هو أول علامة تحذير."]],
          ["Photos", "Six photos of a furnished room", false],
          ["Owner", "\"I'm working overseas, so I can't show you the room.\"", true, ["Scammers avoid viewings. Never rent a place that you, or someone you trust, hasn't seen.", "المحتالون يتجنبون المعاينة، فلا تستأجر مكانًا لم تره أنت أو شخص تثق به."]],
          ["Available", "From 1 February", false],
          ["Payment", "Send 4 weeks' rent by gift cards today to hold the room", true, ["Gift cards and untraceable transfers are classic scam payments. Pay only after signing, by bank transfer, with a receipt.", "بطاقات الهدايا والتحويلات التي لا يمكن تتبعها من أشهر طرق الاحتيال، فلا تدفع إلا بعد التوقيع، بتحويل بنكي، مع إيصال."]],
          ["Contact", "Messages only. No calls.", true, ["Refusing calls or a video viewing is a warning sign.", "رفض المكالمات أو المعاينة بالفيديو علامة تحذير."]]] } },
      { t: "spot", h: ["Listing 2", "الإعلان 2"],
        doc: { title: "Room in a shared house, 15 minutes by bus", from: "Listed by a local agency", rows: [
          ["Price", "In line with similar rooms in the area", false],
          ["Viewing", "Open inspection: Saturday, 10 to 11 am", false],
          ["Agreement", "6 months, with a written agreement", false],
          ["Viewing fee", "Pay 200 today to book a place at the viewing", true, ["You should never pay just to see a place.", "لا يجب أن تدفع لمجرد رؤية المكان."]],
          ["Deposit", "Paid after signing, with a receipt", false],
          ["Contact", "Agent's name, office address and phone number", false]] } },
      { t: "quiz", h: ["What would you do?", "ماذا تفعل؟"], pass: 3, items: [
        { s: ["A listing looks perfect, but the owner wants the deposit before a viewing. You…", "إعلان يبدو مثاليًا، لكن المالك يريد التأمين قبل المعاينة. أنت…"], o: [["Pay quickly before someone else does", "تدفع بسرعة قبل غيرك"], ["Refuse to pay and keep looking", "ترفض الدفع وتواصل البحث"]], a: 1, x: ["No viewing, no money. Pressure to pay fast is part of the scam.", "لا مال دون معاينة، والضغط للدفع السريع جزء من الاحتيال."] },
        { s: ["You're still overseas. How can you check a place?", "ما زلت خارج البلد. كيف تتحقق من مكان؟"], o: [["Ask for a live video tour, or ask a friend or your university's housing service to look", "اطلب جولة مرئية مباشرة، أو اطلب من صديق أو من خدمة السكن في جامعتك أن يعاينه"], ["Trust the photos", "ثق بالصور"]], a: 0, x: ["Photos can be copied from anywhere. A live video or a trusted person can't be faked as easily.", "يمكن نسخ الصور من أي مكان، أما الفيديو المباشر أو الشخص الموثوق فيصعب تزييفهما."] },
        { s: ["What's the safest first booking before you arrive?", "ما أكثر حجز آمن قبل وصولك؟"], o: [["A 12-month lease you haven't seen", "عقد 12 شهرًا لمكان لم تره"], ["About 2 weeks of short-term housing, then look in person", "سكن مؤقت لأسبوعين تقريبًا، ثم البحث بنفسك"]], a: 1, x: ["That's the plan the guide recommends: short stay first, then view places in person.", "هذه الخطة التي يوصي بها الدليل: سكن مؤقت أولًا، ثم معاينة الأماكن بنفسك."] },
        { s: ["You think you've seen a scam. What now?", "تظن أنك رأيت إعلانًا احتياليًا. ماذا الآن؟"], o: [["Report it to the website or group, and warn your friends", "أبلغ الموقع أو المجموعة، وحذّر أصدقاءك"], ["Ignore it", "تجاهله"]], a: 0, x: ["Reporting protects the next student.", "الإبلاغ يحمي الطالب التالي."] }
      ] }
    ]
  };

  // ---------------- 20 · read the lease ----------------
  function depText(cc, p) { return { t: "text", cc: [cc], h: ["Deposits where you're going", "التأمين في دولتك"], p: p }; }
  var LEASE = {
    id: "life-lease", order: 20, group: "home", icon: "📄", mins: 12,
    t: ["Read before you sign", "اقرأ قبل أن توقّع"],
    d: ["Deposits, lease clauses to question, and protecting yourself on move-in day.", "التأمين، وبنود العقد التي يجب أن تسأل عنها، وحماية نفسك يوم الاستلام."],
    steps: [
      depText("au", [["Your bond is usually up to 4 weeks' rent. It's lodged with your state's bond authority, not kept by the landlord, and returned when you leave, minus any damage. Rent in advance is often 2 weeks, paid when you sign.", "التأمين (البوند) عادةً حتى إيجار 4 أسابيع، ويُودع لدى الجهة المختصة في الولاية لا لدى المالك، ويُعاد إليك عند المغادرة بعد خصم أي أضرار. والإيجار المقدم غالبًا أسبوعان يُدفع عند التوقيع."]]),
      depText("uk", [["In England, the deposit for most tenancies is capped at 5 weeks' rent, and it must be protected in a government-approved scheme. A holding deposit to reserve a place can be no more than 1 week's rent. Halls are the easiest start.", "في إنجلترا، التأمين لأغلب عقود الإيجار بحد أقصى إيجار 5 أسابيع، ويجب حمايته في نظام حكومي معتمد، ولا يزيد عربون الحجز على إيجار أسبوع واحد. والسكن الجامعي أسهل بداية."]]),
      depText("us", [["Deposit rules depend on the state. University housing often asks for a deposit when you apply, so ask whether it's refundable. Private leases are usually for 12 months.", "تختلف أنظمة التأمين حسب الولاية. وكثيرًا ما يطلب السكن الجامعي تأمينًا عند التقديم، فاسأل إن كان قابلًا للاسترداد. وعقود الإيجار الخاصة غالبًا لمدة 12 شهرًا."]]),
      depText("ca", [["Deposit rules differ by province. In Ontario, a landlord can ask only for last month's rent; in British Columbia, at most half a month's rent; in Quebec, deposits are not allowed.", "تختلف أنظمة التأمين حسب المقاطعة: في أونتاريو لا يطلب المالك إلا إيجار الشهر الأخير، وفي بريتش كولومبيا نصف شهر كحد أقصى، وفي كيبيك لا يُسمح بالتأمين."]]),
      depText("de", [["A deposit (Kaution) can be up to 3 months' rent without bills. Never pay before you have a written contract. You'll also need your landlord's confirmation (Wohnungsgeberbestätigung) to register your address.", "التأمين (Kaution) قد يصل إلى إيجار 3 أشهر دون الفواتير، ولا تدفع قبل توقيع عقد مكتوب. وستحتاج أيضًا تأكيد المالك (Wohnungsgeberbestätigung) لتسجيل عنوانك."]]),
      depText("sg", [["HDB flats can only be rented for at least 6 months. Use a licensed agent, read the tenancy agreement carefully, and see the place before you pay.", "شقق HDB لا تُستأجر لأقل من 6 أشهر. استعن بوسيط مرخص، واقرأ عقد الإيجار بعناية، وعاين المكان قبل الدفع."]]),
      { t: "spot", h: ["Read this lease", "اقرأ هذا العقد"], intro: [["A practice lease for a room. Tap the clauses you would question before signing.", "عقد تدريبي لغرفة. اضغط على البنود التي ستسأل عنها قبل التوقيع."]],
        doc: { title: "Residential tenancy agreement (practice version)", from: "Room 2, 14 Palm Street (fictional)", rows: [
          ["Rent", "350 per week, paid every 2 weeks", false],
          ["Term", "12 months from 1 March", false],
          ["Deposit", "4 weeks' rent, paid in cash. No receipt will be given.", true, ["Always get a receipt, and where the law requires it, the deposit must be lodged or protected officially.", "احصل دائمًا على إيصال، وحيث يشترط النظام يجب إيداع التأمين أو حمايته رسميًا."]],
          ["Entry", "The landlord may enter the room at any time, without notice.", true, ["Landlords usually have to give notice before entering, except in emergencies. Ask for this to be changed.", "على المالك عادةً أن يُشعرك قبل الدخول إلا في الطوارئ، فاطلب تعديل هذا البند."]],
          ["Bills", "Water included. Electricity and internet shared equally.", false],
          ["Leaving early", "The tenant pays the rent for the rest of the 12 months.", true, ["Breaking a lease can cost a lot. Ask what happens if you leave early, and what your local rules allow.", "فسخ العقد قد يكلف كثيرًا، فاسأل عما يحدث إن غادرت مبكرًا وما تسمح به الأنظمة المحلية."]],
          ["Condition report", "Attached, to be signed by both parties", false]] } },
      { t: "quiz", h: ["Move-in day", "يوم الاستلام"], pass: 2, items: [
        { s: ["You get the keys. What do you do first?", "استلمت المفاتيح. ماذا تفعل أولًا؟"], o: [["Unpack and relax", "تفرغ حقائبك وترتاح"], ["Take dated photos and videos of every room and any damage, and note it in the condition report", "تلتقط صورًا ومقاطع مؤرخة لكل غرفة وأي ضرر، وتدوّنها في تقرير الحالة"]], a: 1, x: ["This is your proof when you ask for your deposit back.", "هذا دليلك عندما تطلب استرداد التأمين."] },
        { s: ["A clause in the lease confuses you. You…", "بند في العقد غير واضح لك. أنت…"], o: [["Sign it anyway", "توقّع على أي حال"], ["Ask the landlord, and your university's housing or student support service, before you sign", "تسأل المالك وخدمة السكن أو دعم الطلاب في جامعتك قبل التوقيع"]], a: 1, x: ["Universities often have free advice services for exactly this.", "كثيرًا ما توفر الجامعات خدمات استشارة مجانية لهذا الغرض بالضبط."] },
        { s: ["Should you sign a 12-month lease in your first week?", "هل توقّع عقدًا لمدة 12 شهرًا في أسبوعك الأول؟"], o: [["Yes, to be safe", "نعم، للاحتياط"], ["Better to take your time and view a few places first", "الأفضل أن تتمهل وتعاين عدة أماكن أولًا"]], a: 1, x: ["Short-term housing gives you time to choose well.", "السكن المؤقت يمنحك الوقت لتختار جيدًا."] }
      ] }
    ]
  };

  // ---------------- 30 · bank and payslip ----------------
  var MONEY = {
    id: "life-money", order: 30, group: "money", icon: "💳", mins: 10,
    t: ["Your bank account and first payslip", "حسابك البنكي وأول قسيمة راتب"],
    d: ["Open an account, avoid bank scams, and check that you were paid right.", "افتح حسابًا، وتجنب احتيالات البنوك، وتأكد أنك حصلت على أجرك الصحيح."],
    steps: [
      { t: "text", h: ["Opening an account", "فتح حساب"], p: [
        ["Banks usually ask for your passport and visa, proof of enrolment and your local address. Some let you start the application online before you arrive.", "تطلب البنوك عادةً جوازك وتأشيرتك وإثبات التسجيل وعنوانك المحلي، وبعضها يتيح بدء الطلب إلكترونيًا قبل وصولك."],
        ["Your bank will never ask for your PIN, password or a code by text or phone. If a message says your account is locked and gives you a link, don't click it: call the number on the back of your card.", "لن يطلب منك البنك رقمك السري أو كلمة المرور أو رمز التحقق برسالة أو مكالمة. وإذا وصلتك رسالة تقول إن حسابك مقفل ومعها رابط، فلا تضغط عليه، واتصل بالرقم المكتوب خلف بطاقتك."]] },
      { t: "spot", h: ["Check your payslip", "راجع قسيمة راتبك"],
        ref: { title: "Your notes", rows: [["Hours worked", "14"], ["Your hourly rate", "26.00"]] },
        doc: { title: "Payslip (practice version)", from: "Campus Café (fictional)", rows: [
          ["Employee", "Faisal Alharbi", false],
          ["Pay period", "3 to 16 March", false],
          ["Hours worked", "12", true, ["You worked 14 hours. Check your hours every pay period, and ask your manager to fix any mistake.", "عملت 14 ساعة، فراجع ساعاتك في كل فترة دفع واطلب من مديرك تصحيح أي خطأ."]],
          ["Hourly rate", "26.00", false],
          ["Gross pay", "312.00", true, ["It should be 14 × 26.00 = 364.00.", "يجب أن يكون 14 × 26.00 = 364.00."]],
          ["Tax withheld", "31.00", false]] } },
      { t: "quiz", h: ["Money basics", "أساسيات المال"], pass: 3, items: [
        { s: ["What is \"gross pay\"?", "ما «الأجر الإجمالي»؟"], o: [["Your pay before tax and deductions", "أجرك قبل الضرائب والاستقطاعات"], ["What reaches your bank account", "ما يصل إلى حسابك البنكي"]], a: 0, x: ["Net pay is what's left after tax and deductions.", "الأجر الصافي هو ما يتبقى بعد الضرائب والاستقطاعات."] },
        { s: ["A text says: \"Your account is locked. Log in here to unlock it.\" You…", "رسالة تقول: «حسابك مقفل، سجّل الدخول هنا لفتحه.» أنت…"], o: [["Click and log in", "تضغط وتسجل الدخول"], ["Ignore the link and call the number on your card", "تتجاهل الرابط وتتصل بالرقم المكتوب على بطاقتك"]], a: 1, x: ["Links in unexpected messages are a common scam.", "الروابط في الرسائل غير المتوقعة من أشهر طرق الاحتيال."] },
        { s: ["Before taking a part-time job, what do you check?", "قبل قبول عمل جزئي، ماذا تراجع؟"], o: [["Your visa's work limit and SACM's rules", "حد العمل في تأشيرتك وأنظمة الملحقية"], ["Nothing, a job is a job", "لا شيء"]], a: 0, x: ["Both apply to you as a sponsored student.", "كلاهما ينطبق عليك بصفتك طالبًا مبتعثًا."] },
        { s: ["Someone online offers to \"pay you to receive money and send it on\". You…", "عرض عليك شخص عبر الإنترنت «أجرًا مقابل استقبال أموال وتحويلها». أنت…"], o: [["Say no", "ترفض"], ["Accept, it's easy money", "تقبل، فهو مال سهل"]], a: 0, x: ["This is money laundering, and the account holder can face serious trouble.", "هذا غسل أموال، وقد يتعرض صاحب الحساب لعواقب خطيرة."] }
      ] }
    ]
  };

  // ---------------- 40 · email a lecturer ----------------
  var EMAIL = {
    id: "life-email", order: 40, group: "uni", icon: "✉️", mins: 15,
    t: ["Email your lecturer", "راسل محاضرك"],
    d: ["A clear, polite email gets a faster yes. Practise asking for an extension.", "الرسالة الواضحة المهذبة تحصل على موافقة أسرع. تدرّب على طلب تمديد."],
    steps: [
      { t: "text", h: ["A good email in six parts", "رسالة جيدة في ستة أجزاء"], p: [
        ["Lecturers get many emails. Make yours easy to answer: one clear request, the details they need, and your student ID.", "يتلقى المحاضرون رسائل كثيرة، فاجعل رسالتك سهلة الرد: طلب واحد واضح، والتفاصيل التي يحتاجونها، ورقمك الجامعي."]],
        list: [
          ["Subject: the course code and topic, e.g. \"CVEN1300: extension request for Essay 1\".", "العنوان: رمز المادة والموضوع، مثل «CVEN1300: extension request for Essay 1»."],
          ["Greeting: \"Dear Dr Lee\". Use their title, not \"Hey\" or \"Teacher\".", "التحية: «Dear Dr Lee»، واستخدم لقبه لا «Hey» أو «Teacher»."],
          ["Who you are: your name and course, in one line.", "من أنت: اسمك ومادتك في سطر واحد."],
          ["Your request, early and clearly.", "طلبك، مبكرًا وبوضوح."],
          ["A short reason, and any evidence.", "سبب مختصر، وأي دليل."],
          ["Thanks, then your full name and student ID.", "الشكر، ثم اسمك الكامل ورقمك الجامعي."]] },
      { t: "quiz", h: ["Pick the best", "اختر الأفضل"], pass: 3, items: [
        { s: ["Which subject line is best?", "أي عنوان أفضل؟"], o: ["Help!!!", "CVEN1300: question about the Essay 1 due date", "(no subject)"], a: 1, x: ["The lecturer knows the course and the topic before opening it.", "يعرف المحاضر المادة والموضوع قبل فتح الرسالة."] },
        { s: ["Which greeting is best?", "أي تحية أفضل؟"], o: ["Hey teacher", "Dear Dr Lee", "Yo"], a: 1, x: ["Use their title and family name, unless they've asked you to use their first name.", "استخدم لقبه واسم عائلته، إلا إذا طلب منك استخدام اسمه الأول."] },
        { s: ["When should you ask for an extension?", "متى تطلب التمديد؟"], o: [["After the deadline", "بعد الموعد النهائي"], ["As soon as you know you need one, before the deadline", "فور علمك بحاجتك إليه، قبل الموعد"]], a: 1, x: ["Early requests are much more likely to be approved. If you're sick, many universities also have a formal process that needs evidence.", "الطلبات المبكرة أكثر قبولًا بكثير، وإذا كنت مريضًا فلدى كثير من الجامعات إجراء رسمي يتطلب دليلًا."] },
        { s: ["What do you include so they can find you in their system?", "ماذا تضيف ليجدوك في نظامهم؟"], o: [["Your student ID", "رقمك الجامعي"], ["Your phone model", "نوع جوالك"]], a: 0, x: ["Your full name and student ID.", "اسمك الكامل ورقمك الجامعي."] }
      ] },
      { t: "order", h: ["Put the email in order", "رتّب الرسالة"], items: [
        ["Subject: CVEN1300: extension request for Essay 1", "العنوان: CVEN1300: extension request for Essay 1"],
        ["Dear Dr Lee,", "التحية: Dear Dr Lee,"],
        ["I'm Faisal Alharbi, a student in your CVEN1300 class.", "التعريف: I'm Faisal Alharbi, a student in your CVEN1300 class."],
        ["Could I please have a 3-day extension for Essay 1, which is due this Friday?", "الطلب: Could I please have a 3-day extension for Essay 1…"],
        ["I've had the flu since Monday, and I've attached my medical certificate.", "السبب: I've had the flu since Monday…"],
        ["Thank you for considering my request. Faisal Alharbi, z1234567", "الشكر والتوقيع: Thank you… Faisal Alharbi, z1234567"]] },
      { t: "pad", key: "email-ext", h: ["Your turn: write the email", "دورك: اكتب الرسالة"], min: 60, max: 200, unit: "words", rows: 10,
        prompt: "You have a group report due next Wednesday for CVEN1300. Your flight home for a family emergency leaves on Monday, and you'll be back the following Monday. Write an email to Dr Lee asking for an extension.",
        checks: [
          ["My subject line has the course code and the topic.", "عنوان رسالتي فيه رمز المادة والموضوع."],
          ["I greeted Dr Lee by title.", "حيّيت الدكتور لي بلقبه."],
          ["My request is clear, with a new date.", "طلبي واضح ومعه موعد جديد."],
          ["I gave a short reason and offered evidence.", "ذكرت سببًا مختصرًا وعرضت تقديم دليل."],
          ["I thanked them and signed with my name and student ID.", "شكرته ووقّعت باسمي ورقمي الجامعي."]] }
    ]
  };

  // ---------------- 50 · lectures, tutorials and exams ----------------
  var STUDY = {
    id: "life-study", order: 50, group: "uni", icon: "🎓", mins: 10,
    t: ["Lectures, tutorials and exams", "المحاضرات والحصص التطبيقية والاختبارات"],
    d: ["How university teaching works, and how to prepare for exams.", "كيف يسير التدريس الجامعي، وكيف تستعد للاختبارات."],
    steps: [
      { t: "text", h: ["How a course works", "كيف تسير المادة"], list: [
        ["Lectures: big classes where new topics are explained. They're often recorded.", "المحاضرات: حصص كبيرة تُشرح فيها الموضوعات الجديدة، وكثيرًا ما تُسجَّل."],
        ["Tutorials and labs: small classes where you practise. Attendance is often marked, and you're expected to take part.", "الحصص التطبيقية والمختبرات: حصص صغيرة للتطبيق، وكثيرًا ما يُسجَّل الحضور ويُتوقع منك المشاركة."],
        ["Office hours (or consultations): one-to-one time with your lecturer or tutor. Use them.", "الساعات المكتبية: وقت فردي مع المحاضر أو المرشد، فاستفد منه."],
        ["The course outline: deadlines, how marks are weighted and the rules. Read it in week 1.", "وصف المادة: المواعيد وتوزيع الدرجات والأنظمة، فاقرأه في الأسبوع الأول."]] },
      { t: "quiz", h: ["Which one is it?", "أيها هو؟"], pass: 5, items: sort([["Lecture", "محاضرة"], ["Tutorial", "حصة تطبيقية"], ["Office hours", "ساعات مكتبية"]], [
        [["200 students listen to a new topic being explained", "200 طالب يستمعون إلى شرح موضوع جديد"], 0, ["Lectures introduce the topic to everyone.", "المحاضرات تقدم الموضوع للجميع."]],
        [["20 students work through problems with a tutor", "20 طالبًا يحلون مسائل مع مرشد"], 1, ["Small and practical: a tutorial.", "حصة صغيرة وتطبيقية: حصة تطبيقية."]],
        [["You book 15 minutes to ask about your assignment", "تحجز 15 دقيقة لتسأل عن واجبك"], 2, ["One-to-one help.", "مساعدة فردية."]],
        [["Often recorded, so you can watch it again", "كثيرًا ما تُسجَّل لتعيد مشاهدتها"], 0, ["Many universities record lectures.", "كثير من الجامعات تسجل المحاضرات."]],
        [["Attendance may count, and you're expected to speak", "قد يُحتسب الحضور ويُتوقع منك التحدث"], 1, ["Tutorials reward taking part.", "الحصص التطبيقية تكافئ المشاركة."]],
        [["You ask the lecturer privately why you lost marks", "تسأل المحاضر على انفراد عن سبب خسارتك للدرجات"], 2, ["Perfect use of office hours.", "استخدام مثالي للساعات المكتبية."]]
      ]) },
      { t: "quiz", h: ["Studying smart", "ذاكر بذكاء"], pass: 2, items: [
        { s: ["Where do you find how much each assignment is worth?", "أين تجد وزن كل واجب من الدرجة؟"], o: [["The course outline", "وصف المادة"], ["A friend in another course", "صديق في مادة أخرى"]], a: 0, x: ["The outline has deadlines, weights and rules.", "وصف المادة فيه المواعيد والأوزان والأنظمة."] },
        { s: ["Which exam preparation works best?", "أي استعداد للاختبار أفضل؟"], o: [["Rereading your notes the night before", "إعادة قراءة ملاحظاتك في الليلة السابقة"], ["Practising past questions, spread over several weeks", "حل أسئلة سابقة، موزعة على عدة أسابيع"]], a: 1, x: ["Testing yourself, spaced out over time, beats rereading.", "اختبار نفسك على فترات متباعدة أفضل من إعادة القراءة."] },
        { s: ["You're falling behind in week 5. You…", "تأخرت في الأسبوع الخامس. أنت…"], o: [["Wait for the holidays to catch up", "تنتظر الإجازة لتعوض"], ["Go to office hours and the university's study support now", "تذهب إلى الساعات المكتبية وخدمات دعم الدراسة الآن"]], a: 1, x: ["Help early is easier than catching up late.", "طلب المساعدة مبكرًا أسهل من التعويض المتأخر."] }
      ] }
    ]
  };

  // ---------------- 60 · referencing ----------------
  var REFS = {
    id: "life-refs", order: 60, group: "uni", icon: "📚", mins: 12,
    t: ["Referencing and plagiarism", "التوثيق والسرقة العلمية"],
    d: ["Cite your sources in APA and Harvard, and stay clear of plagiarism.", "وثّق مصادرك بأسلوبي APA وHarvard، وابتعد عن السرقة العلمية."],
    steps: [
      { t: "text", h: ["Why referencing matters", "لماذا التوثيق مهم"], p: [
        ["Plagiarism means presenting someone else's words or ideas as your own. Universities take it seriously: penalties range from a zero mark to failing the course or worse.", "السرقة العلمية تعني تقديم كلمات غيرك أو أفكاره على أنها لك، والجامعات تتعامل معها بجدية، فالعقوبات تتراوح بين صفر في الواجب ورسوب المادة أو أكثر."],
        ["Referencing protects you. Every time you use a source, you cite it in the text and list it at the end.", "التوثيق يحميك: كلما استخدمت مصدرًا تذكره داخل النص وتدرجه في قائمة المراجع في النهاية."],
        ["Rules on AI tools differ between universities and even between courses. Read each course's rules, and ask if you're unsure.", "تختلف أنظمة أدوات الذكاء الاصطناعي بين الجامعات بل بين المواد، فاقرأ أنظمة كل مادة واسأل إذا لم تكن متأكدًا."]] },
      { t: "text", h: ["Two common styles", "أسلوبان شائعان"], p: [
        ["APA 7. In the text: (Nasser, 2021). In the reference list: Nasser, R. (2021). Water in dry cities. Desert Press. The book title is in italics.", "أسلوب APA 7. داخل النص: (Nasser, 2021). وفي قائمة المراجع: Nasser, R. (2021). Water in dry cities. Desert Press. ويُكتب عنوان الكتاب بخط مائل."],
        ["Harvard. In the text: (Nasser, 2021). In the reference list: Nasser, R. (2021) Water in dry cities. Riyadh: Desert Press. Harvard has many versions, so follow your university's guide.", "أسلوب Harvard. داخل النص: (Nasser, 2021). وفي قائمة المراجع: Nasser, R. (2021) Water in dry cities. Riyadh: Desert Press. ولأسلوب Harvard نسخ كثيرة، فاتبع دليل جامعتك."],
        ["The book here is made up, for practice.", "الكتاب هنا من نسج الخيال للتدريب."]] },
      { t: "quiz", h: ["Get it right", "وثّق بشكل صحيح"], pass: 3, items: [
        { s: ["Which is a correct APA 7 in-text citation?", "أي توثيق داخل النص صحيح بأسلوب APA 7؟"], o: ["(Nasser, 2021)", "(Rana Nasser 2021 book)", "[Nasser]"], a: 0, x: ["Family name and year.", "اسم العائلة والسنة."] },
        { s: ["Which is a correct APA 7 reference for a book?", "أي مرجع صحيح لكتاب بأسلوب APA 7؟"], o: ["Nasser, R. (2021). Water in dry cities. Desert Press.", "Rana Nasser, Water In Dry Cities, 2021.", "Desert Press (2021) Nasser: Water in dry cities"], a: 0, x: ["Author, year, title, publisher, in that order.", "المؤلف ثم السنة ثم العنوان ثم الناشر، بهذا الترتيب."] },
        { s: ["You copy one sentence word for word. What do you add?", "نسخت جملة واحدة حرفيًا. ماذا تضيف؟"], o: [["Nothing, it's only one sentence", "لا شيء، إنها جملة واحدة فقط"], ["Quotation marks and a citation", "علامات اقتباس وتوثيقًا"]], a: 1, x: ["Exact words need quotation marks and a citation, every time.", "الكلمات الحرفية تحتاج علامات اقتباس وتوثيقًا في كل مرة."] },
        { s: ["You explain an idea from a book in your own words. Do you cite it?", "شرحت فكرة من كتاب بكلماتك. هل توثقها؟"], o: [["Yes", "نعم"], ["No, they're my words now", "لا، صارت كلماتي"]], a: 0, x: ["The idea is still theirs, so you cite it.", "الفكرة ما زالت لصاحبها، فتوثقها."] }
      ] },
      { t: "quiz", h: ["Fine, or plagiarism?", "سليم أم سرقة علمية؟"], pass: 5, items: sort([["Fine", "سليم"], ["Plagiarism", "سرقة علمية"]], [
        [["A quote in quotation marks, with a citation", "اقتباس بين علامات اقتباس مع توثيق"], 0, ["That's how quoting works.", "هكذا يكون الاقتباس."]],
        [["Changing a few words in a paragraph and not citing it", "تغيير بضع كلمات في فقرة دون توثيقها"], 1, ["Patchwriting is still plagiarism.", "الترقيع بتغيير الكلمات يبقى سرقة علمية."]],
        [["Submitting a friend's old assignment with your name on it", "تسليم واجب قديم لصديقك باسمك"], 1, ["Both of you can be penalised.", "قد يُعاقب كلاكما."]],
        [["Your own summary of an article, with a citation", "تلخيصك لمقال بكلماتك مع توثيق"], 0, ["Your words, their idea, cited: correct.", "كلماتك وفكرتهم مع التوثيق: صحيح."]],
        [["Paying someone online to write your essay", "الدفع لشخص عبر الإنترنت ليكتب مقالك"], 1, ["Contract cheating is one of the most serious offences.", "الغش التعاقدي من أخطر المخالفات."]],
        [["Common knowledge, like \"Riyadh is the capital of Saudi Arabia\", without a citation", "المعلومات العامة مثل «الرياض عاصمة السعودية» دون توثيق"], 0, ["Widely known facts don't need a citation.", "الحقائق المعروفة على نطاق واسع لا تحتاج توثيقًا."]]
      ]) }
    ]
  };

  // ---------------- 70 · group work (story) ----------------
  var GROUP = {
    id: "life-group", order: 70, group: "uni", icon: "👥", mins: 8,
    t: ["Group work", "العمل الجماعي"],
    d: ["A group project from week 3 to the presentation. How will you handle it?", "مشروع جماعي من الأسبوع الثالث حتى العرض. كيف ستتعامل معه؟"],
    steps: [
      { t: "story", h: ["The group project", "المشروع الجماعي"], start: "a", nodes: {
        a: { i: "🗓️", p: ["Week 3. Your group of four has a presentation in week 8. Nobody has started.", "الأسبوع 3. لدى مجموعتك المكونة من أربعة عرض في الأسبوع 8، ولم يبدأ أحد بعد."], ch: [
          { t: ["Start a group chat and suggest a 20-minute call to split the work", "أنشئ محادثة جماعية واقترح مكالمة لمدة 20 دقيقة لتقسيم العمل"], go: "b", ok: true, fb: ["Someone has to start. A short call with clear tasks saves weeks.", "لا بد أن يبدأ أحد، ومكالمة قصيرة بمهام واضحة توفر أسابيع."] },
          { t: ["Wait for someone else to start", "انتظر أن يبدأ غيرك"], go: "b", ok: false, fb: ["Everyone is waiting for everyone. Two weeks pass.", "الجميع ينتظر الجميع، ويمر أسبوعان."] },
          { t: ["Do the whole project yourself", "أنجز المشروع كله وحدك"], go: "b", fb: ["It gets done, but you're exhausted and the others don't learn. Share the work.", "سينجز، لكنك ستُرهق ولن يتعلم الآخرون، فوزّع العمل."] }] },
        b: { i: "📵", p: ["You split the work. One member, Sam, hasn't replied for a week.", "قسّمتم العمل، لكن أحد الأعضاء، سام، لم يرد منذ أسبوع."], ch: [
          { t: ["Message Sam privately and kindly: ask if they're okay, and which part they'll do", "راسل سام على انفراد بلطف: اسأله عن حاله وأي جزء سيتولاه"], go: "c", ok: true, fb: ["Sam had been ill and is relieved someone asked. They take the data section.", "كان سام مريضًا وارتاح لأن أحدًا سأل عنه، فتولى قسم البيانات."] },
          { t: ["Complain about Sam in the group chat", "اشتكِ من سام في المحادثة الجماعية"], go: "c", ok: false, fb: ["Sam feels attacked and goes even quieter.", "شعر سام بالهجوم فازداد صمتًا."] },
          { t: ["Quietly do Sam's part", "أنجز جزء سام بصمت"], go: "c", fb: ["Kind, but it hides the problem. Talk first.", "تصرف لطيف، لكنه يخفي المشكلة، فتحدث أولًا."] }] },
        c: { i: "⏳", p: ["Week 6. Another member still hasn't done their part, and the deadline is close.", "الأسبوع 6. عضو آخر لم ينجز جزءه بعد، والموعد يقترب."], ch: [
          { t: ["Email your tutor early and factually, with what the group has tried", "راسل المرشد مبكرًا بوقائع واضحة وما جربته المجموعة"], go: "d", ok: true, fb: ["Tutors can help when they hear early. Keep it factual, not angry.", "المرشدون يستطيعون المساعدة إذا علموا مبكرًا، فاكتب بالوقائع لا بالغضب."] },
          { t: ["Say nothing and hope", "اصمت وتمنَّ الأفضل"], go: "d", ok: false, fb: ["On the day, a whole section is missing.", "في يوم العرض يكون قسم كامل مفقودًا."] }] },
        d: { i: "🎤", p: ["Week 8: presentation day.", "الأسبوع 8: يوم العرض."], ch: [
          { t: ["Rehearse together the day before, and agree who says what", "تدربوا معًا في اليوم السابق واتفقوا على من يقول ماذا"], go: "e", ok: true, fb: ["Smooth handovers and confident timing. The tutor notices.", "انتقالات سلسة وتوقيت واثق، ويلاحظ المرشد ذلك."] },
          { t: ["Each person reads their slides", "كل شخص يقرأ شرائحه"], go: "e", ok: false, fb: ["Reading slides loses marks. Talk to the audience instead.", "قراءة الشرائح تُفقد الدرجات، فتحدث إلى الحضور بدلًا من ذلك."] }] },
        e: { i: "✅", end: true, p: ["Done. Many courses let you rate your teammates' contribution. Use it honestly.", "انتهيتم. كثير من المواد تتيح تقييم مساهمة زملائك، فاستخدمه بصدق."] }
      } }
    ]
  };

  // ---------------- 80 · your first week (story) ----------------
  var WEEK = {
    id: "life-week", order: 80, group: "life", icon: "🗓️", mins: 8,
    t: ["Your first week", "أسبوعك الأول"],
    d: ["From landing to your first lecture: choose your path.", "من الوصول حتى أول محاضرة: اختر طريقك."],
    steps: [
      { t: "story", h: ["Seven days", "سبعة أيام"], start: "a", nodes: {
        a: { i: "📱", p: ["Day 1. You've arrived, and jet lag hits hard. What comes first?", "اليوم 1. وصلت والإرهاق يشتد عليك. ما أول شيء؟"], ch: [
          { t: ["Get a SIM or eSIM and tell your family you've arrived", "احصل على شريحة أو eSIM وطمئن عائلتك"], go: "b", ok: true, fb: ["A working phone comes first: you need it for maps, banking and codes.", "الجوال العامل أولًا، فتحتاجه للخرائط والبنك ورموز التحقق."] },
          { t: ["Sleep all day and sort everything out later", "نم طوال اليوم ورتّب كل شيء لاحقًا"], go: "b", fb: ["Rest matters, but message home first, even on Wi-Fi.", "الراحة مهمة، لكن طمئن أهلك أولًا ولو عبر شبكة Wi-Fi."] }] },
        b: { i: "🏦", p: ["Day 2. You need a bank account for your allowance.", "اليوم 2. تحتاج حسابًا بنكيًا لمكافأتك."], ch: [
          { t: ["Apply with your passport, visa and enrolment letter", "قدّم بجوازك وتأشيرتك وخطاب التسجيل"], go: "c", ok: true, fb: ["Done in an hour, and your allowance has somewhere to go.", "أُنجز في ساعة، وصار لمكافأتك مكان تصل إليه."] },
          { t: ["Keep all your money in cash for now", "احتفظ بكل أموالك نقدًا الآن"], go: "c", ok: false, fb: ["Cash can be lost or stolen, and many places don't take it.", "النقد قد يضيع أو يُسرق، وأماكن كثيرة لا تقبله."] }] },
        c: { i: "🚆", p: ["Day 3. Getting around.", "اليوم 3. التنقل."], ch: [
          { t: ["Get your city's transport card, and ask about student discounts", "احصل على بطاقة مواصلات مدينتك واسأل عن خصومات الطلاب"], go: "d", ok: true, fb: ["Cheaper every single day.", "أرخص كل يوم."] },
          { t: ["Take taxis everywhere", "استخدم سيارات الأجرة في كل مكان"], go: "d", ok: false, fb: ["Easy, but it eats your allowance fast.", "سهل، لكنه يستنزف مكافأتك بسرعة."] }] },
        d: { i: "🎪", p: ["Day 4. Orientation. The Saudi students club and a coding society have stalls side by side.", "اليوم 4. الأسبوع التعريفي، ونادي الطلاب السعوديين وجمعية البرمجة متجاوران."], ch: [
          { t: ["Visit both and sign up", "زر الاثنين وسجّل فيهما"], go: "e", ok: true, fb: ["Your home community and new friends from everywhere: you'll want both.", "مجتمعك من بلدك وأصدقاء جدد من كل مكان: ستحتاج الاثنين."] },
          { t: ["Skip orientation, it's optional", "تجاهل الأسبوع التعريفي، فهو اختياري"], go: "e", ok: false, fb: ["Orientation is where you learn the systems and meet people.", "الأسبوع التعريفي هو المكان الذي تتعلم فيه الأنظمة وتتعرف على الناس."] }] },
        e: { i: "🏛️", p: ["Day 5. Your SACM arrival steps are waiting on Safeer.", "اليوم 5. خطوات الوصول للملحقية تنتظرك في منصة سفير."], ch: [
          { t: ["Complete them now", "أكملها الآن"], go: "f", ok: true, fb: ["Your file is up to date, and nothing holds up your allowance.", "ملفك محدث، ولا شيء يؤخر مكافأتك."] },
          { t: ["Leave them for next month", "أجّلها للشهر القادم"], go: "f", ok: false, fb: ["Leaving them for later is one of the most common mistakes. Do them now.", "تأجيلها من أكثر الأخطاء شيوعًا، فأنجزها الآن."] }] },
        f: { i: "🏠", p: ["Day 6. You've moved from your short stay into your new room.", "اليوم 6. انتقلت من السكن المؤقت إلى غرفتك الجديدة."], ch: [
          { t: ["Update your address with your university", "حدّث عنوانك لدى جامعتك"], go: "g", ok: true, fb: ["Visa holders often must keep it up to date, and important letters will find you.", "كثيرًا ما يجب على حاملي التأشيرة تحديثه، وستصلك المراسلات المهمة."] },
          { t: ["No need, they'll email you anyway", "لا داعي، سيراسلونك بالبريد على أي حال"], go: "g", ok: false, fb: ["Your address can be a visa condition. Update it.", "قد يكون عنوانك شرطًا من شروط التأشيرة، فحدّثه."] }] },
        g: { i: "🎓", end: true, p: ["Day 7: your first lecture. Sit near the front, and say hello to the person next to you.", "اليوم 7: أول محاضرة. اجلس قريبًا من المقدمة، وسلّم على من بجانبك."] }
      } }
    ]
  };

  // ---------------- 85 · local words (one deck per country) ----------------
  function words(cc, flag, name, list) {
    return { id: "life-words-" + cc, order: 85, group: "life", cc: [cc], icon: flag, mins: 8,
      t: ["Local words: " + name[0], "كلمات محلية: " + name[1]], d: ["The everyday words people will use with you from day one.", "الكلمات اليومية التي سيستخدمها الناس معك من أول يوم."],
      steps: [{ t: "cards" }], words: list };
  }
  var W_AU = words("au", "🇦🇺", ["Australia", "أستراليا"], [
    ["arvo", "noun", "afternoon", "العصر، بعد الظهر", "See you this arvo at the library."],
    ["servo", "noun", "petrol station", "محطة الوقود", "We stopped at the servo for snacks."],
    ["heaps", "adverb", "a lot; very", "كثيرًا، جدًا", "Thanks heaps for your help!"],
    ["reckon", "verb", "to think or believe", "يظن، يعتقد", "I reckon the exam will be hard."],
    ["no worries", "phrase", "it's fine; you're welcome", "لا مشكلة، العفو", "\"Thanks, mate.\" \"No worries.\""],
    ["uni", "noun", "university", "الجامعة", "What are you studying at uni?"],
    ["brekkie", "noun", "breakfast", "الفطور", "Let's grab brekkie before class."],
    ["Maccas", "noun", "McDonald's", "ماكدونالدز", "There's a Maccas near the station."],
    ["thongs", "noun", "flip-flops", "النعال، الشبشب", "Don't wear thongs to the lab."],
    ["how ya going?", "phrase", "how are you?", "كيف حالك؟", "Hey Faisal, how ya going?"],
    ["ta", "interjection", "thanks", "شكرًا", "Ta, that's really kind."]]);
  var W_UK = words("uk", "🇬🇧", ["the UK", "بريطانيا"], [
    ["cheers", "interjection", "thanks; also goodbye", "شكرًا، ومع السلامة أيضًا", "Cheers for the notes!"],
    ["quid", "noun", "a pound (£1)", "جنيه واحد", "The sandwich was five quid."],
    ["loo", "noun", "toilet", "دورة المياه", "Where's the loo, please?"],
    ["knackered", "adjective", "very tired", "متعب جدًا", "I'm knackered after that exam."],
    ["fresher", "noun", "a first-year student", "طالب السنة الأولى", "Freshers' week starts on Monday."],
    ["flat", "noun", "apartment", "شقة", "I share a flat with three students."],
    ["queue", "noun / verb", "a line of people; to wait in line", "طابور؛ يقف في الطابور", "Please queue here for the bus."],
    ["fortnight", "noun", "two weeks", "أسبوعان", "The essay is due in a fortnight."],
    ["mate", "noun", "friend; a friendly way to address someone", "صديق؛ طريقة ودية للمخاطبة", "Thanks, mate!"],
    ["halls", "noun", "university student residence", "السكن الجامعي", "I'm living in halls this year."],
    ["revise", "verb", "to study for an exam", "يراجع للاختبار", "I need to revise for my maths exam."]]);
  var W_US = words("us", "🇺🇸", ["the USA", "أمريكا"], [
    ["dorm", "noun", "student residence", "السكن الجامعي", "My dorm is next to the library."],
    ["freshman", "noun", "a first-year student", "طالب السنة الأولى", "Most freshmen live on campus."],
    ["sophomore", "noun", "a second-year student", "طالب السنة الثانية", "She's a sophomore in engineering."],
    ["GPA", "noun", "grade point average", "المعدل التراكمي", "You need a 3.0 GPA for this program."],
    ["midterm", "noun", "an exam in the middle of the semester", "اختبار منتصف الفصل", "Our midterm is next Tuesday."],
    ["syllabus", "noun", "the course plan with deadlines and grading", "خطة المادة ومواعيدها وتوزيع درجاتها", "The due dates are in the syllabus."],
    ["TA", "noun", "teaching assistant", "المعيد، مساعد التدريس", "Ask the TA during office hours."],
    ["restroom", "noun", "toilet", "دورة المياه", "The restrooms are on the second floor."],
    ["check", "noun", "the bill at a restaurant", "فاتورة المطعم", "Can we get the check, please?"],
    ["line", "noun", "a queue of people", "طابور", "The line for coffee is long."],
    ["How's it going?", "phrase", "how are you?", "كيف حالك؟", "Hey, how's it going?"]]);
  var W_CA = words("ca", "🇨🇦", ["Canada", "كندا"], [
    ["loonie", "noun", "one-dollar coin", "عملة الدولار الواحد", "The machine only takes loonies."],
    ["toonie", "noun", "two-dollar coin", "عملة الدولارين", "Coffee is a toonie on campus."],
    ["toque", "noun", "a winter hat", "قبعة الشتاء", "Wear a toque, it's minus ten outside."],
    ["double-double", "noun", "coffee with two creams and two sugars", "قهوة بحليبين وسكرين", "A double-double, please."],
    ["washroom", "noun", "toilet", "دورة المياه", "Where's the washroom?"],
    ["eh", "interjection", "added to check that someone agrees", "تُضاف لطلب الموافقة", "Cold today, eh?"],
    ["rez", "noun", "university residence", "السكن الجامعي", "I'm living in rez this year."],
    ["Timmies", "noun", "Tim Hortons, a coffee chain", "تيم هورتنز، سلسلة مقاهٍ", "Let's meet at Timmies."],
    ["pop", "noun", "soft drink", "مشروب غازي", "Do you want a pop?"],
    ["parkade", "noun", "a parking garage", "موقف سيارات متعدد الطوابق", "The parkade is behind the library."]]);
  var W_DE = words("de", "🇩🇪", ["Germany", "ألمانيا"], [
    ["Tschüss", "interjection", "bye", "مع السلامة", "Tschüss, bis morgen!"],
    ["Mensa", "noun", "university canteen", "مطعم الجامعة", "Let's eat at the Mensa."],
    ["WG", "noun", "a shared flat", "شقة مشتركة", "I live in a WG with three students."],
    ["Termin", "noun", "an appointment", "موعد", "I have a Termin at the Bürgeramt."],
    ["Feierabend", "noun", "the end of the working day", "نهاية الدوام", "Shops are busy after Feierabend."],
    ["Anmeldung", "noun", "registering your address", "تسجيل العنوان", "Do your Anmeldung within 14 days."],
    ["Kaution", "noun", "rental deposit", "تأمين الإيجار", "The Kaution is two months' rent."],
    ["Pfand", "noun", "a deposit on bottles, paid back when you return them", "مبلغ مسترد على العبوات عند إعادتها", "Return your bottles to get the Pfand back."],
    ["Hausarbeit", "noun", "a term paper", "بحث الفصل", "My Hausarbeit is due in March."],
    ["Hörsaal", "noun", "lecture hall", "قاعة المحاضرات", "The lecture is in Hörsaal 3."]]);
  var W_SG = words("sg", "🇸🇬", ["Singapore", "سنغافورة"], [
    ["lah", "particle", "added for emphasis", "تُضاف للتأكيد", "Don't worry lah, it's easy."],
    ["makan", "verb / noun", "to eat; food", "يأكل؛ طعام", "Let's go makan after class."],
    ["chope", "verb", "to reserve a seat, often with a tissue packet", "يحجز مقعدًا، غالبًا بعلبة مناديل", "I'll chope a table for us."],
    ["kopi", "noun", "coffee", "قهوة", "One kopi, please."],
    ["hawker centre", "noun", "a food court with cheap stalls", "ساحة طعام بأكشاك رخيصة", "The hawker centre has great food."],
    ["shiok", "adjective", "great; delicious", "رائع؛ لذيذ", "This chicken rice is shiok!"],
    ["tapau", "verb", "to take food away", "يأخذ الطعام سفريًا", "Can I tapau this?"],
    ["can or not?", "phrase", "is that possible?", "هل هذا ممكن؟", "Change seats with me, can or not?"],
    ["aircon", "noun", "air conditioning", "المكيف", "The aircon in the library is cold."],
    ["MRT", "noun", "the train system", "شبكة القطارات", "Take the MRT to campus."],
    ["uncle / auntie", "noun", "a polite way to address an older person", "طريقة مهذبة لمخاطبة كبار السن", "Thank you, uncle!"]]);

  // ---------------- 90 · checkpoint ----------------
  var CHECK = {
    id: "life-check", order: 90, group: "end", icon: "🏁", mins: 8,
    t: ["Checkpoint: ready for daily life", "نقطة تحقق: جاهز للحياة اليومية"],
    d: ["Six questions on everything in this course. Pass with 5.", "ستة أسئلة عن كل ما في هذه الدورة، والنجاح بخمس إجابات صحيحة."],
    steps: [
      { t: "quiz", h: ["Checkpoint", "نقطة التحقق"], pass: 5, items: [
        { s: ["An owner asks for the deposit by gift cards before a viewing. This is…", "مالك يطلب التأمين ببطاقات هدايا قبل المعاينة. هذا…"], o: [["Normal", "طبيعي"], ["A scam", "احتيال"]], a: 1, x: ["No viewing, no money, and never gift cards.", "لا مال دون معاينة، ولا بطاقات هدايا أبدًا."] },
        { s: ["On move-in day you…", "يوم الاستلام أنت…"], o: [["Photograph every room and note any damage", "تصوّر كل غرفة وتدوّن أي ضرر"], ["Throw away the condition report", "ترمي تقرير الحالة"]], a: 0, x: ["It protects your deposit.", "هذا يحمي التأمين الخاص بك."] },
        { s: ["Your payslip shows fewer hours than you worked. You…", "قسيمة راتبك فيها ساعات أقل مما عملت. أنت…"], o: [["Ask your manager to correct it", "تطلب من مديرك تصحيحها"], ["Let it go", "تتركها"]], a: 0, x: ["Check every payslip, and keep your own record of hours.", "راجع كل قسيمة واحتفظ بسجل لساعاتك."] },
        { s: ["The best time to ask for an extension is…", "أفضل وقت لطلب التمديد…"], o: [["Before the deadline", "قبل الموعد النهائي"], ["The day after", "في اليوم التالي له"]], a: 0, x: ["Early requests are far more likely to be approved.", "الطلبات المبكرة أكثر قبولًا بكثير."] },
        { s: ["You use an idea from an article in your own words. You…", "استخدمت فكرة من مقال بكلماتك. أنت…"], o: [["Cite the article", "توثّق المقال"], ["Don't cite it", "لا توثّقه"]], a: 0, x: ["The idea is still the author's.", "الفكرة ما زالت للمؤلف."] },
        { s: ["A teammate goes quiet for a week. First, you…", "زميل في المجموعة صامت منذ أسبوع. أولًا أنت…"], o: [["Message them privately and kindly", "تراسله على انفراد بلطف"], ["Complain in the group chat", "تشتكي في المحادثة الجماعية"]], a: 0, x: ["Most problems get easier with a kind, direct message.", "أغلب المشكلات تسهل برسالة لطيفة ومباشرة."] }
      ] }
    ]
  };

  window.MasarokCourse = {
    id: "life",
    t: ["Life and university skills", "مهارات الحياة والجامعة"],
    sub: ["The things nobody teaches you before you land, practised as real situations.", "الأمور التي لا يعلمك إياها أحد قبل وصولك، تتدرب عليها كمواقف حقيقية."],
    note: ["Every listing, lease, payslip and person here is fictional. Renting, work and study rules differ by country, state and university, so check your university's pages and official sites.", "كل الإعلانات والعقود وقسائم الرواتب والأشخاص هنا من نسج الخيال. وتختلف أنظمة الإيجار والعمل والدراسة حسب الدولة والولاية والجامعة، فراجع صفحات جامعتك والمواقع الرسمية."],
    groups: [["home", ["Housing", "السكن"]], ["money", ["Money", "المال"]], ["uni", ["University skills", "مهارات الجامعة"]], ["life", ["Daily life", "الحياة اليومية"]], ["end", ["Checkpoint", "نقطة التحقق"]]],
    lessons: [SCAM, LEASE, MONEY, EMAIL, STUDY, REFS, GROUP, WEEK, W_AU, W_UK, W_US, W_CA, W_DE, W_SG, CHECK]
  };
})();

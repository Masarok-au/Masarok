/* Masarok journey levels: the guide's 10 levels, from dreaming about studying abroad to arriving on campus.
   Every level has three parts, and each earns a star:
     Learn · a short free lesson in Masarok Academy (the student's first taste of the Academy)
     Check · three quick questions
     Do    · the real-world step(s) from the guide (journey.js)
   A level is cleared when Learn and Check are done, or when its real step is done. Clearing a level opens the next one.
   Loaded before journey.js. Check answers are saved in masarok-levels; Learn comes from the Academy's own progress. */
(function () {
  "use strict";

  // which level each guide step belongs to (the steps differ by degree, the levels don't)
  var STEP_LEVEL = {
    explore: 1,
    fieldRoute: 2, fieldUni: 2, courseType: 2, uniCheckPg: 2, researchArea: 2, uniCheckPhd: 2,
    englishF: 3, englishB: 3, englishPg: 3,
    rulesF: 4, sat: 4, premaster: 4, docs: 4, supervisor: 4,
    offerF: 5, offer: 5,
    qubool: 6, safeer: 7, visa: 8, housing: 9, arrive: 10, progressF: 10
  };

  // a lesson: [course, lesson id, icon, minutes, title, description]
  function lesson(c, id, icon, mins, t, d) { return { c: c, id: id, icon: icon, mins: mins, t: t, d: d }; }
  var VISA = {
    au: lesson("visa", "visa-au", "🇦🇺", 10, ["Australia: your visa step by step", "أستراليا: تأشيرتك خطوة بخطوة"], ["The documents, fees and order of steps for your student visa.", "المستندات والرسوم وترتيب خطوات تأشيرة الطالب."]),
    uk: lesson("visa", "visa-uk", "🇬🇧", 10, ["The UK: your visa step by step", "بريطانيا: تأشيرتك خطوة بخطوة"], ["The documents, fees and order of steps for your student visa.", "المستندات والرسوم وترتيب خطوات تأشيرة الطالب."]),
    us: lesson("visa", "visa-us", "🇺🇸", 10, ["The USA: your visa step by step", "أمريكا: تأشيرتك خطوة بخطوة"], ["The documents, fees and order of steps for your student visa.", "المستندات والرسوم وترتيب خطوات تأشيرة الطالب."]),
    ca: lesson("visa", "visa-ca", "🇨🇦", 10, ["Canada: your visa step by step", "كندا: تأشيرتك خطوة بخطوة"], ["The documents, fees and order of steps for your student visa.", "المستندات والرسوم وترتيب خطوات تأشيرة الطالب."]),
    de: lesson("visa", "visa-de", "🇩🇪", 10, ["Germany: your visa step by step", "ألمانيا: تأشيرتك خطوة بخطوة"], ["The documents, fees and order of steps for your student visa.", "المستندات والرسوم وترتيب خطوات تأشيرة الطالب."]),
    sg: lesson("visa", "visa-sg", "🇸🇬", 10, ["Singapore: your visa step by step", "سنغافورة: تأشيرتك خطوة بخطوة"], ["The documents, fees and order of steps for your student visa.", "المستندات والرسوم وترتيب خطوات تأشيرة الطالب."]),
    none: lesson("visa", "visa-pack", "🧳", 8, ["Pack your bags", "جهّز حقائبك"], ["What goes in your hand luggage, what goes in the hold, and what stays at home.", "ما الذي تضعه في حقيبة اليد، وما الذي تشحنه، وما الذي تتركه في البيت."])
  };

  // a question: [question, [options…], index of the right one, why]
  function q(s, o, a, x) { return { s: s, o: o, a: a, x: x }; }

  var LEVELS = [
    { n: 1, name: ["Dreamer", "الحالم"], icon: "star", part: 0,
      goal: ["Start your journey", "ابدأ رحلتك"],
      sub: ["Learn how the scholarship works, and get to know your plan.", "تعرّف على طريقة عمل الابتعاث، وعلى خطتك."],
      learn: lesson("scholarship", "sch-how", "🧭", 10, ["How the scholarship works", "كيف يعمل الابتعاث"], ["The tracks, the path from offer to departure, and what the scholarship pays.", "المسارات، والطريق من القبول حتى السفر، وما تغطيه البعثة."]),
      check: [
        q(["Where does every new applicant apply for the scholarship?", "أين يقدّم كل متقدم جديد على البعثة؟"], [["Qubool", "منصة قبول"], ["Safeer", "سفير"], ["Absher", "أبشر"]], 0,
          ["Every new applicant, on every track, applies through Qubool. Safeer comes later, after you are nominated.", "كل متقدم جديد، في كل المسارات، يقدّم عبر منصة قبول. أما سفير فيأتي لاحقًا بعد الترشيح."]),
        q(["What do you need before the Ministry considers your scholarship application?", "ماذا تحتاج قبل أن تنظر الوزارة في طلب ابتعاثك؟"], [["A visa", "التأشيرة"], ["An unconditional university offer", "قبول جامعي غير مشروط"], ["A flight ticket", "تذكرة الطيران"]], 1,
          ["The Ministry asks for an unconditional offer first. The visa comes much later.", "تطلب الوزارة قبولًا غير مشروط أولًا، أما التأشيرة فتأتي لاحقًا بكثير."]),
        q(["Does SACM pay for English courses?", "هل تدفع الملحقية تكاليف دورات اللغة الإنجليزية؟"], [["Yes, always", "نعم، دائمًا"], ["Only in the UK", "في بريطانيا فقط"], ["No", "لا"]], 2,
          ["SACM does not pay for English courses, so reaching your score yourself saves you money.", "لا تدفع الملحقية تكاليف دورات اللغة، لذا فإن تحقيق درجتك بنفسك يوفر عليك المال."])
      ] },
    { n: 2, name: ["Explorer", "المستكشف"], icon: "compass", part: 0,
      goal: ["Choose your field and university", "اختر تخصصك وجامعتك"],
      sub: ["Make sure your field and university are on the scholarship list, and find the story behind your choice.", "تأكد أن تخصصك وجامعتك ضمن قائمة الابتعاث، واعثر على القصة خلف اختيارك."],
      learn: lesson("writing", "find-story", "💡", 15, ["Find your story", "اعثر على قصتك"], ["What admissions readers look for, and how to find real experiences worth writing about.", "ما الذي يبحث عنه قرّاء طلبات القبول، وكيف تجد تجارب حقيقية تستحق الكتابة عنها."]),
      check: [
        q(["What does the scholarship fund?", "ماذا تموّل البعثة؟"], [["Any university you choose", "أي جامعة تختارها"], ["Approved majors at universities on the list for your track and field", "التخصصات المعتمدة في الجامعات المدرجة في قائمة مسارك وتخصصك"], ["Only universities in Saudi Arabia", "الجامعات السعودية فقط"]], 1,
          ["The scholarship only funds approved majors at universities on the list for your track and field.", "تموّل البعثة التخصصات المعتمدة فقط في الجامعات المدرجة في قائمة مسارك وتخصصك."]),
        q(["Which ranking does the Imdad track ask for?", "ما التصنيف الذي يطلبه مسار إمداد؟"], [["Top 30", "أفضل 30"], ["Top 200", "أفضل 200"], ["Any ranking", "أي تصنيف"]], 1,
          ["Imdad asks for a top 200 university. Al-Ruwwad asks for the top 30.", "يطلب مسار إمداد جامعة ضمن أفضل 200، ويطلب مسار الرواد أفضل 30."]),
        q(["The list of approved universities…", "قائمة الجامعات المعتمدة…"], [["is the same for every field", "واحدة لكل التخصصات"], ["never changes", "لا تتغير أبدًا"], ["is different for each field and is updated each year", "تختلف حسب التخصص وتُحدَّث كل عام"]], 2,
          ["Check this year's list for your own field: a university can be listed for one field and not another.", "راجع قائمة هذا العام لتخصصك، فقد تكون الجامعة مدرجة لتخصص دون آخر."])
      ] },
    { n: 3, name: ["Speaker", "المتحدّث"], icon: "talk", part: 0,
      goal: ["Reach your English score", "حقق درجة اللغة"],
      sub: ["Find your starting band with the free placement test, then book your test with time to spare.", "اعرف مستواك المبدئي باختبار تحديد المستوى المجاني، ثم احجز اختبارك بوقت كافٍ."],
      learn: lesson("ielts", "placement", "🧭", 15, ["IELTS placement test", "اختبار تحديد مستوى IELTS"], ["Find your starting band in 15 minutes and get a study plan.", "اعرف مستواك المبدئي في 15 دقيقة واحصل على خطة دراسة."]),
      check: [
        q(["When should you book your English test?", "متى تحجز اختبار اللغة؟"], [["Early enough to retake it if needed", "مبكرًا بما يكفي لإعادته عند الحاجة"], ["In the week applications close", "في أسبوع إغلاق التقديم"], ["After you arrive", "بعد وصولك"]], 0,
          ["Needing a second try is normal, so leave time for one retake.", "المحاولة الثانية أمر طبيعي، فاترك وقتًا لإعادة الاختبار مرة."]),
        q(["Where do you find the English score your degree needs?", "أين تجد درجة اللغة التي تطلبها درجتك؟"], [["On the university's entry requirements page", "في صفحة شروط القبول في الجامعة"], ["On any IELTS website", "في أي موقع عن IELTS"], ["From your high school", "من مدرستك الثانوية"]], 0,
          ["Each program sets its own score. Postgraduate programs often ask for more.", "لكل برنامج درجته الخاصة، والدراسات العليا تطلب غالبًا درجة أعلى."]),
        q(["Why reach your English score before you apply for the scholarship?", "لماذا تحقق درجة اللغة قبل التقديم على البعثة؟"], [["It's only needed for the visa", "لأنها مطلوبة للتأشيرة فقط"], ["The Ministry needs an unconditional offer", "لأن الوزارة تطلب قبولًا غير مشروط"], ["It isn't needed", "لأنها غير مطلوبة"]], 1,
          ["A missing English score usually makes an offer conditional, and the Ministry asks for an unconditional one.", "غياب درجة اللغة يجعل القبول مشروطًا غالبًا، والوزارة تطلب قبولًا غير مشروط."])
      ] },
    { n: 4, name: ["Prepared", "المستعد"], icon: "book", part: 0,
      goal: ["Get your tests and documents ready", "جهّز اختباراتك ومستنداتك"],
      sub: ["Sit only the tests your university asks for, and make every document match your passport.", "لا تقدّم إلا الاختبارات التي تطلبها جامعتك، واجعل كل مستنداتك مطابقة لجوازك."],
      learn: lesson("scholarship", "sch-names", "🔤", 8, ["One name everywhere", "اسم واحد في كل مكان"], ["Arabic names can be written in English in many ways. Learn why your passport decides.", "يمكن كتابة الأسماء العربية بالإنجليزية بطرق كثيرة. تعرّف لماذا يكون جوازك هو المرجع."]),
      check: [
        q(["Should you sit the SAT?", "هل تقدّم اختبار SAT؟"], [["Always, to be safe", "دائمًا، احتياطًا"], ["Only if your university asks for it", "فقط إذا طلبته جامعتك"], ["Never, it isn't accepted", "أبدًا، فهو غير مقبول"]], 1,
          ["Only sit the tests your university asks for. Extra scores rarely add anything.", "لا تقدّم إلا الاختبارات التي تطلبها جامعتك، فالدرجات الإضافية نادرًا ما تضيف شيئًا."]),
        q(["How should your name be spelled in English on your documents?", "كيف يُكتب اسمك بالإنجليزية في مستنداتك؟"], [["Exactly as in your passport, everywhere", "كما في جوازك تمامًا، في كل مكان"], ["However each form likes it", "كما يناسب كل نموذج"], ["In Arabic only", "بالعربية فقط"]], 0,
          ["One spelling everywhere, matching your passport, avoids delays with your offer, scholarship and visa.", "كتابة واحدة في كل مكان، مطابقة لجوازك، تجنبك التأخير في القبول والبعثة والتأشيرة."]),
        q(["How long should your passport be valid for?", "كم يجب أن تكون مدة صلاحية جوازك؟"], [["One month", "شهرًا واحدًا"], ["It doesn't matter", "لا يهم"], ["At least a year", "سنة على الأقل"]], 2,
          ["Check you have a passport valid for at least a year before you start applying.", "تأكد أن جوازك صالح لسنة على الأقل قبل أن تبدأ التقديم."])
      ] },
    { n: 5, name: ["Applicant", "المتقدّم"], icon: "letter", part: 1,
      goal: ["Apply and get your offer", "قدّم واحصل على قبولك"],
      sub: ["Write an application that sounds like you, and turn your offer into an unconditional one.", "اكتب طلبًا يشبهك، وحوّل قبولك إلى قبول غير مشروط."],
      learn: lesson("writing", "show-tell", "🎬", 15, ["Show, don't tell", "اعرض ولا تكتفِ بالقول"], ["Turn claims about yourself into moments a reader can picture.", "حوّل ادعاءاتك عن نفسك إلى مواقف يتخيلها القارئ."]),
      check: [
        q(["Which offer does the Ministry ask for?", "أي قبول تطلبه الوزارة؟"], [["Any offer", "أي قبول"], ["A conditional offer", "قبول مشروط"], ["An unconditional offer", "قبول غير مشروط"]], 2,
          ["The Ministry asks for an unconditional offer before it considers your application.", "تطلب الوزارة قبولًا غير مشروط قبل أن تنظر في طلبك."]),
        q(["Your offer is conditional. What do you do?", "قبولك مشروط. ماذا تفعل؟"], [["Meet the conditions and ask for the unconditional offer", "استوفِ الشروط واطلب القبول غير المشروط"], ["Apply for the scholarship anyway", "قدّم على البعثة على أي حال"], ["Ignore the conditions", "تجاهل الشروط"]], 0,
          ["Put every condition in your calendar. Missing a small one can delay everything.", "ضع كل شرط في تقويمك، فنسيان شرط صغير قد يؤخر كل شيء."]),
        q(["What makes an application statement strong?", "ما الذي يجعل خطاب التقديم قويًا؟"], [["Big general claims", "عبارات عامة كبيرة"], ["Real examples and details from your life", "أمثلة وتفاصيل حقيقية من حياتك"], ["A sample copied from the internet", "نموذج منسوخ من الإنترنت"]], 1,
          ["Readers believe what they can picture. Real moments beat claims like \"I am passionate\".", "القارئ يصدّق ما يتخيله، والمواقف الحقيقية أقوى من عبارات مثل «أنا شغوف»."])
      ] },
    { n: 6, name: ["Nominee", "المرشّح"], icon: "palm", part: 2,
      goal: ["Apply for the scholarship on Qubool", "قدّم على البعثة في منصة قبول"],
      sub: ["Get your Qubool file right the first time, then apply in the window.", "جهّز ملفك في قبول صحيحًا من المرة الأولى، ثم قدّم في موعده."],
      learn: lesson("scholarship", "sch-qubool", "📂", 10, ["Get your Qubool file ready", "جهّز ملفك لمنصة قبول"], ["What Qubool asks for, and how to spot a file that will cause trouble.", "ما تطلبه منصة قبول، وكيف تكتشف الملف الذي سيسبب لك مشكلة."]),
      check: [
        q(["How do you sign in to Qubool?", "كيف تسجّل الدخول إلى منصة قبول؟"], [["With Nafath", "عبر نفاذ"], ["With your passport number", "برقم جوازك"], ["With your university email", "ببريد جامعتك"]], 0,
          ["You sign in to Qubool with Nafath, then choose your track.", "تدخل إلى منصة قبول عبر نفاذ، ثم تختار مسارك."]),
        q(["What do you upload to Qubool?", "ماذا ترفع في منصة قبول؟"], [["Your visa", "تأشيرتك"], ["Your offer, certified transcripts and English result", "قبولك وسجلاتك الأكاديمية المصدقة ونتيجة اللغة"], ["Your flight ticket", "تذكرة الطيران"]], 1,
          ["Your offer, certified transcripts and English result make up your file.", "يتكون ملفك من القبول والسجلات الأكاديمية المصدقة ونتيجة اللغة."]),
        q(["How are students selected?", "كيف يُختار الطلاب؟"], [["First come, first served", "الأسبق فالأسبق"], ["By lottery", "بالقرعة"], ["On merit and available places", "بحسب الجدارة والمقاعد المتاحة"]], 2,
          ["Selection is based on merit and the places available, so a complete, strong file matters.", "يكون الاختيار بحسب الجدارة والمقاعد المتاحة، لذا يهم أن يكون ملفك كاملًا وقويًا."])
      ] },
    { n: 7, name: ["Backed", "المضمون"], icon: "shield", part: 2,
      goal: ["Get your guarantee and plan your money", "احصل على الضمان وخطط لمالك"],
      sub: ["Request your financial guarantee on Safeer, and learn to live on your allowance.", "اطلب الضمان المالي من سفير، وتعلّم العيش بمكافأتك."],
      learn: lesson("scholarship", "sch-budget", "💰", 12, ["A month on your allowance", "شهر على مكافأتك"], ["Plan your month, then live through four weeks of surprises.", "خطط لشهرك، ثم عِش أربعة أسابيع من المفاجآت."]),
      check: [
        q(["Where do you request the financial guarantee letter?", "أين تطلب خطاب الضمان المالي؟"], [["On Safeer, after you are nominated", "في سفير، بعد ترشيحك"], ["On Qubool, before you apply", "في قبول، قبل التقديم"], ["At the airport", "في المطار"]], 0,
          ["Once you are nominated, you request the guarantee letter on Safeer.", "بعد ترشيحك تطلب خطاب الضمان من منصة سفير."]),
        q(["Why does your university need the guarantee letter?", "لماذا تحتاج جامعتك خطاب الضمان؟"], [["To book your housing", "لحجز سكنك"], ["To issue the enrolment document you need for your visa", "لتصدر مستند التسجيل الذي تحتاجه للتأشيرة"], ["To print your student card", "لطباعة بطاقتك الجامعية"]], 1,
          ["With the guarantee, your university issues your enrolment document (such as a CoE, CAS or I-20), and the visa needs it.", "بالضمان تصدر جامعتك مستند التسجيل (مثل CoE أو CAS أو I-20)، والتأشيرة تحتاجه."]),
        q(["Your monthly allowance is…", "مكافأتك الشهرية…"], [["the same amount in every country", "بالمبلغ نفسه في كل دولة"], ["set in riyals and paid in local currency, so it moves with the exchange rate", "محددة بالريال وتُصرف بالعملة المحلية، فتتغير مع سعر الصرف"], ["paid once a year", "تُصرف مرة في السنة"]], 1,
          ["Plan your budget with a little room, because the exchange rate changes what you receive.", "اترك هامشًا في ميزانيتك، فسعر الصرف يغيّر ما تستلمه."])
      ] },
    { n: 8, name: ["Visa holder", "حامل التأشيرة"], icon: "passport", part: 3,
      goal: ["Get your student visa", "احصل على تأشيرة الطالب"],
      sub: ["Learn the exact visa steps for your country, then apply with your enrolment document.", "تعرّف على خطوات التأشيرة لدولتك بالتحديد، ثم قدّم بمستند التسجيل."],
      learn: null, // the visa lesson for the student's country (see learnFor)
      check: [
        q(["What do you need to apply for your student visa?", "ماذا تحتاج للتقديم على تأشيرة الطالب؟"], [["Your university's enrolment document (such as a CoE, CAS or I-20)", "مستند التسجيل من جامعتك (مثل CoE أو CAS أو I-20)"], ["Only your high school certificate", "شهادة الثانوية فقط"], ["Nothing, it's automatic", "لا شيء، فهي تلقائية"]], 0,
          ["The visa application is built on the enrolment document your university issues.", "يُبنى طلب التأشيرة على مستند التسجيل الذي تصدره جامعتك."]),
        q(["Where do you keep copies of your visa, passport and offer when you fly?", "أين تحتفظ بنسخ التأشيرة والجواز والقبول عند السفر؟"], [["In your checked suitcase", "في الحقيبة المشحونة"], ["You don't need copies", "لا تحتاج نسخًا"], ["In your carry-on bag, on paper and on your phone", "في حقيبة اليد، ورقيًا وعلى جوالك"]], 2,
          ["You may be asked for them at the border, and checked bags can go missing.", "قد تُطلب منك عند الحدود، والحقائب المشحونة قد تضيع."]),
        q(["After you arrive, your visa…", "بعد وصولك، تأشيرتك…"], [["has no rules", "بلا شروط"], ["has conditions you must keep, such as staying enrolled", "لها شروط يجب الالتزام بها، مثل الاستمرار في الدراسة"], ["lets you stop studying", "تسمح لك بترك الدراسة"]], 1,
          ["Student visas come with conditions. Breaking them can put your visa and scholarship at risk.", "لتأشيرات الطلاب شروط، ومخالفتها قد تعرّض تأشيرتك وبعثتك للخطر."])
      ] },
    { n: 9, name: ["Packed", "المتأهّب"], icon: "home", part: 3,
      goal: ["Find your first place to stay", "رتّب سكنك الأول"],
      sub: ["Book a short first stay, and learn to spot rental scams before you pay anything.", "احجز إقامة قصيرة أولًا، وتعلّم كشف احتيالات السكن قبل أن تدفع شيئًا."],
      learn: lesson("life", "life-scam", "🏚️", 10, ["Spot the scam listing", "اكتشف إعلان السكن الاحتيالي"], ["Rental scams target new international students. Learn the warning signs.", "احتيالات السكن تستهدف الطلاب الدوليين الجدد. تعرّف على علامات التحذير."]),
      check: [
        q(["When is it easiest to find a long-term room?", "متى يكون إيجاد سكن طويل الأمد أسهل؟"], [["Once you've arrived and can see places in person", "بعد وصولك حين ترى الأماكن بنفسك"], ["Months before you leave", "قبل سفرك بأشهر"], ["Only through social media", "عبر وسائل التواصل فقط"]], 0,
          ["Book a short first stay, then choose a long-term place once you can see it.", "احجز إقامة قصيرة أولًا، ثم اختر سكنًا طويل الأمد حين تستطيع رؤيته."]),
        q(["Should you pay a deposit for a place you haven't seen?", "هل تدفع تأمينًا لسكن لم تره؟"], [["Yes, to secure it quickly", "نعم، لتحجزه بسرعة"], ["No, not until you've seen it in person or on a live video call", "لا، حتى تراه بنفسك أو في مكالمة فيديو مباشرة"], ["Yes, if they ask for a gift card", "نعم، إذا طلبوا بطاقة هدايا"]], 1,
          ["Pressure to pay fast, and unusual payment methods, are classic scam signs.", "الضغط للدفع بسرعة وطرق الدفع الغريبة من علامات الاحتيال المعروفة."]),
        q(["What should you book for your first weeks?", "ماذا تحجز لأسابيعك الأولى؟"], [["A year-long lease before arriving", "عقد سنة كاملة قبل الوصول"], ["Nothing, you'll find something on the day", "لا شيء، ستجد مكانًا يوم وصولك"], ["About 2 weeks of short-term housing near campus", "سكنًا مؤقتًا لنحو أسبوعين قرب الجامعة"]], 2,
          ["A short first stay gives you a safe base while you look in person.", "الإقامة القصيرة تمنحك مكانًا آمنًا بينما تبحث بنفسك."])
      ] },
    { n: 10, name: ["Arrived", "الواصل"], icon: "plane", part: 4,
      goal: ["Arrive and settle in", "صِل واستقر"],
      sub: ["Your first two weeks set up everything else: phone, bank, transport and SACM.", "أسبوعاك الأولان يجهّزان كل شيء: الجوال والبنك والمواصلات والملحقية."],
      learn: lesson("life", "life-week", "🗓️", 8, ["Your first week", "أسبوعك الأول"], ["From landing to your first lecture: choose your path.", "من الوصول حتى أول محاضرة: اختر طريقك."]),
      check: [
        q(["Which of these do you do in your first days?", "أيٌّ من هذه تفعله في أيامك الأولى؟"], [["Get a SIM card and open a bank account", "تشتري شريحة جوال وتفتح حسابًا بنكيًا"], ["Change your degree", "تغيّر تخصصك"], ["Book your graduation", "تحجز حفل تخرجك"]], 0,
          ["A local number and bank account are the base for everything else.", "الرقم المحلي والحساب البنكي هما أساس كل شيء آخر."]),
        q(["Where do you complete your SACM arrival steps?", "أين تكمل خطوات الوصول الخاصة بالملحقية؟"], [["Qubool", "منصة قبول"], ["Safeer", "سفير"], ["Your university library", "مكتبة الجامعة"]], 1,
          ["Arrival steps and your updated details go on Safeer.", "خطوات الوصول وتحديث بياناتك تكون في سفير."]),
        q(["Why go to orientation week?", "لماذا تحضر الأسبوع التعريفي؟"], [["It's only for postgraduates", "لأنه لطلاب الدراسات العليا فقط"], ["It's the easiest time to learn the campus and make friends", "لأنه أسهل وقت للتعرف على الجامعة وتكوين الصداقات"], ["It replaces your first exams", "لأنه يغني عن أول اختبارات"]], 1,
          ["Say yes to orientation events. Everyone is new, so it's the easiest time to meet people.", "احضر فعاليات الأسبوع التعريفي، فالجميع جدد وهو أسهل وقت للتعارف."])
      ] }
  ];

  // the parts of the road on the map
  var PARTS = [["Get ready", "الاستعداد"], ["Your offer", "القبول"], ["The scholarship", "البعثة"], ["Pack your bags", "تجهّز للسفر"], ["Arrive", "الوصول"]];

  // ---------- saved answers ----------
  var KEY = "masarok-levels";
  function load() { var s = null; try { s = JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) {} s = s || {}; s.check = s.check || {}; return s; }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }

  function cc() { var M = window.Masarok, v = M && M.values ? M.values() : {}; return v.cc || null; }
  function learnFor(n) { var L = LEVELS[n - 1]; return L.learn || VISA[cc()] || VISA.none; }
  function academy() { try { return JSON.parse(localStorage.getItem("masarok-academy") || "null") || {}; } catch (e) { return {}; } }
  function learnDone(n) { var l = learnFor(n), a = academy(); return !!(a.lessons && a.lessons[l.id] && a.lessons[l.id].done); }
  function lessonUrl(n) {
    var l = learnFor(n), ar = (document.documentElement.lang || "en").slice(0, 2) === "ar";
    return (ar ? "/ar" : "") + "/academy/" + l.c + "/?from=journey#/l/" + l.id;
  }
  function checkScore(n) { var s = load().check[n]; return s ? s : null; }
  function checkDone(n) { var s = checkScore(n); return !!(s && s[0] >= 2); }
  function saveCheck(n, right) {
    var s = load(), old = s.check[n];
    if (!old || right >= old[0]) s.check[n] = [right, 3];
    save(s);
    return checkDone(n);
  }

  window.MasarokLevels = {
    list: LEVELS, parts: PARTS, count: LEVELS.length,
    levelOf: function (stepId) { return STEP_LEVEL[stepId] || null; },
    learn: learnFor, learnDone: learnDone, lessonUrl: lessonUrl,
    checkDone: checkDone, checkScore: checkScore, saveCheck: saveCheck
  };
})();

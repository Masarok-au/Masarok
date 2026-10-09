/* Masarok guide: more about each step (documents, common mistakes, cost and time)
   and a quick-check question with bonus points. Country-aware where it matters.
   Loaded after journey.js and game.js. Fees checked October 2026. */
(function () {
  "use strict";

  var A = (document.documentElement.lang || "en").slice(0, 2) === "ar" ? 1 : 0;
  function T(x) { return Array.isArray(x) ? x[A] : x; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c]; }); }
  function fmt(s, o) { if (o && o.n != null && o.w == null) o.w = (+o.n >= 3 && +o.n <= 10) ? "نقاط" : "نقطة"; return T(s).replace(/\{(\w+)\}/g, function (m, k) { return o[k] != null ? o[k] : m; }); }

  // ---------- official fee pages ----------
  var SRC = {
    ielts: "https://ielts.org/take-a-test/book-a-test",
    sat: "https://satsuite.collegeboard.org/sat/registration/fees",
    ucas: "https://www.ucas.com/faqs/what-is-the-application-fee-for-the-2027-cycle",
    uniassist: "https://www.uni-assist.de/en/",
    auVisa: "https://www.studyaustralia.gov.au/en/Agent-Hub/agent-news-index/student-visa-application-charge-increase",
    auTimes: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-processing-times/global-visa-processing-times",
    oshc: "https://privatehealth.gov.au/health_insurance/overseas/overseas_student_health_cover.htm",
    usFees: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/fees/fees-visa-services.html",
    sevis: "https://www.fmjfee.com/",
    usWait: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/global-visa-wait-times.html",
    ukVisa: "https://www.gov.uk/student-visa",
    caPermit: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html",
    caTimes: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-processing-times.html",
    deVisa: "https://riad.diplo.de/",
    sgPass: "https://www.ica.gov.sg/reside/STP"
  };

  // ---------- shared pieces ----------
  var ENG = {
    d: [["Your passport. The test centre checks it, and your name must match it exactly.", "جواز سفرك. يتحقق منه مركز الاختبار، ويجب أن يطابق اسمك فيه تمامًا."],
      ["Your booking confirmation and test centre address.", "تأكيد الحجز وعنوان مركز الاختبار."],
      ["Your Test Report Form (TRF) number. Universities use it to check your result.", "رقم تقرير النتيجة (TRF)، فالجامعات تستخدمه للتحقق من درجتك."]],
    m: [["Booking too late to retake before the application deadline. Leave room for a second try.", "الحجز متأخرًا بحيث لا يبقى وقت لإعادة الاختبار قبل موعد التقديم. اترك مجالًا لمحاولة ثانية."],
      ["Checking only the overall score. Many programs also ask for a minimum in each band, such as writing.", "الاكتفاء بالدرجة الكلية، مع أن كثيرًا من البرامج تشترط حدًا أدنى لكل مهارة، مثل الكتابة."],
      ["Paying for an English course yourself after you apply. SACM does not pay for English courses.", "دفع تكاليف دورة لغة بنفسك بعد التقديم، فالملحقية لا تبتعث على دورات اللغة."]],
    c: [[["IELTS in Saudi Arabia", "اختبار IELTS في السعودية"], ["About SAR 1,150 to 1,750", "من 1,150 إلى 1,750 ريالًا تقريبًا"], ["You pay. The price depends on the centre, and UKVI versions cost more. Check the price when you book.", "على حسابك. يختلف السعر حسب المركز، ونسخة UKVI أغلى، فتحقق من السعر عند الحجز."], SRC.ielts],
      [["Each retake", "كل إعادة"], ["The full fee again", "الرسوم كاملة مرة أخرى"], ["So aim to be ready on your first attempt.", "لذلك استعد جيدًا من المحاولة الأولى."]]]
  };
  var FREE = [[["Application", "التقديم"], ["Free", "مجاني"], ["There is no fee to apply.", "لا توجد رسوم للتقديم."]]];
  var APPFEE = [[["University application fee", "رسوم التقديم للجامعة"], ["Varies", "تختلف"], ["Each university sets its own fee, and some charge nothing. Check its apply page.", "تحدد كل جامعة رسومها، وبعضها لا يأخذ رسومًا. راجع صفحة التقديم فيها."]]];

  // ---------- each step (Australia is the default; other countries override below) ----------
  var I = {
    fieldRoute: {
      d: [["Your high school certificate and transcript.", "شهادة الثانوية وكشف الدرجات."], ["Your passport, or an appointment to get one.", "جواز السفر، أو موعد لإصداره."], ["A short list of 3 to 5 programs with their entry requirements.", "قائمة قصيرة من 3 إلى 5 برامج مع شروط القبول لكل منها."]],
      m: [["Choosing a field that is not on the scholarship list for your university.", "اختيار تخصص غير مدرج في قائمة الابتعاث لجامعتك."], ["Picking a route without checking which degree it leads to.", "اختيار مسار دون التأكد من الشهادة التي يؤدي إليها."], ["Deciding from social media posts instead of the official lists.", "الاعتماد على منشورات التواصل الاجتماعي بدل القوائم الرسمية."]],
      c: [[["This step", "هذه الخطوة"], ["Free", "مجانية"], ["It is research and decisions, so it costs nothing.", "هي بحث واتخاذ قرار، فلا تكلف شيئًا."]]]
    },
    englishF: ENG, englishB: ENG, englishPg: ENG,
    rulesF: {
      d: [["Your high school transcript showing your average.", "كشف درجات الثانوية الذي يبين معدلك."], ["The 2026–2027 university list page for your field.", "صفحة تخصصك في قوائم الجامعات 2026–2027."], ["SACM's written approval of your pathway program and degree.", "موافقة الملحقية المكتوبة على برنامج المسار والشهادة."]],
      m: [["Accepting a pathway offer before SACM approves it.", "قبول عرض المسار قبل أن توافق عليه الملحقية."], ["Assuming every university in a country is on the list.", "افتراض أن كل جامعات الدولة مدرجة في القائمة."], ["Using last year's list. It changes each year.", "الاعتماد على قائمة العام الماضي، فهي تتغير كل عام."]],
      c: [[["This step", "هذه الخطوة"], ["Free", "مجانية"], ["Checking the rules costs nothing.", "التحقق من الشروط لا يكلف شيئًا."]]]
    },
    offerF: {
      d: [["Passport copy.", "صورة جواز السفر."], ["High school certificate and transcript, certified and translated if asked.", "شهادة الثانوية وكشف الدرجات، مصدقة ومترجمة إذا طُلب ذلك."], ["Your English test result.", "نتيجة اختبار اللغة."], ["Your offer letter saved as a PDF.", "خطاب القبول محفوظًا بصيغة PDF."]],
      m: [["Accepting an offer that doesn't name the degree you will move into.", "قبول عرض لا يذكر الشهادة التي ستنتقل إليها."], ["Missing the progression conditions hidden in the offer letter.", "تجاهل شروط الانتقال المذكورة في خطاب القبول."], ["Paying a tuition deposit before your scholarship is confirmed.", "دفع عربون الرسوم الدراسية قبل تأكيد ابتعاثك."]],
      c: APPFEE.concat([[["Tuition deposit", "عربون الرسوم الدراسية"], ["Ask first", "اسأل أولًا"], ["Sponsored students usually send SACM's guarantee letter instead. Ask before you pay.", "يرسل المبتعثون عادةً خطاب الضمان من الملحقية بدلًا منه، فاسأل قبل أن تدفع."]]])
    },
    fieldUni: {
      d: [["The 2026–2027 list for your field.", "قائمة 2026–2027 لتخصصك."], ["The university's ranking in your field.", "تصنيف الجامعة في تخصصك."], ["Each program's entry requirements page.", "صفحة شروط القبول لكل برنامج."]],
      m: [["Checking the overall ranking instead of the ranking in your field.", "النظر إلى التصنيف العام بدل التصنيف في تخصصك."], ["Applying to only one university. Keep a backup on the list.", "التقديم على جامعة واحدة فقط. احتفظ بخيار احتياطي من القائمة."], ["Mixing up the Al-Ruwwad and Imdad lists.", "الخلط بين قائمة الرواد وقائمة إمداد."]],
      c: [[["This step", "هذه الخطوة"], ["Free", "مجانية"], ["Reading the lists costs nothing.", "قراءة القوائم لا تكلف شيئًا."]]]
    },
    sat: {
      d: [["Your passport. It is the ID test centres outside the US accept.", "جواز سفرك، فهو الهوية التي تقبلها مراكز الاختبار خارج أمريكا."], ["Your College Board account and admission ticket.", "حسابك في College Board وبطاقة الدخول."], ["A list of universities to send your scores to.", "قائمة بالجامعات التي سترسل إليها درجاتك."]],
      m: [["Sitting the SAT when your university doesn't ask for it.", "تقديم اختبار SAT مع أن جامعتك لا تطلبه."], ["Registering late, when nearby centres are full.", "التسجيل متأخرًا حين تمتلئ المراكز القريبة."], ["Bringing an ID that doesn't match your registration name.", "إحضار هوية لا يطابق اسمها اسم التسجيل."]],
      c: [[["SAT outside the US", "اختبار SAT خارج أمريكا"], ["US$111", "111 دولارًا"], ["US$68 plus a US$43 international fee. Some centres add a small fee. You pay.", "68 دولارًا ورسوم دولية قدرها 43 دولارًا، وتضيف بعض المراكز رسومًا صغيرة، وعلى حسابك."], SRC.sat]]
    },
    offer: {
      d: [["Passport copy.", "صورة جواز السفر."], ["Certified transcripts, and translations if asked.", "كشوف الدرجات مصدقة، ومترجمة إذا طُلب ذلك."], ["Your English test result.", "نتيجة اختبار اللغة."], ["Your unconditional offer saved as a PDF.", "خطاب القبول غير المشروط محفوظًا بصيغة PDF."]],
      m: [["Applying for the scholarship with a conditional offer.", "التقديم على البعثة بقبول مشروط."], ["Missing the university's own application deadline.", "تفويت موعد التقديم في الجامعة نفسها."], ["Paying a tuition deposit before your scholarship is confirmed.", "دفع عربون الرسوم الدراسية قبل تأكيد ابتعاثك."]],
      c: APPFEE.slice()
    },
    courseType: {
      d: [["Your bachelor's transcript.", "كشف درجات البكالوريوس."], ["Your CV.", "سيرتك الذاتية."], ["A shortlist of programs and their pages.", "قائمة قصيرة بالبرامج وروابط صفحاتها."]],
      m: [["Choosing research without a topic you care about.", "اختيار البحث دون موضوع يهمك."], ["Missing that some programs are longer than the 2 years the scholarship covers.", "عدم الانتباه إلى أن بعض البرامج أطول من السنتين اللتين تغطيهما البعثة."]],
      c: [[["This step", "هذه الخطوة"], ["Free", "مجانية"], ["It is research and decisions.", "هي بحث واتخاذ قرار."]]]
    },
    uniCheckPg: {
      d: [["The 2026–2027 list for your field.", "قائمة 2026–2027 لتخصصك."], ["The program page link.", "رابط صفحة البرنامج."]],
      m: [["Checking a different field's list.", "النظر في قائمة تخصص آخر."], ["Assuming a university on one track's list is on the other.", "افتراض أن الجامعة المدرجة في قائمة مسار ما مدرجة في المسار الآخر."]],
      c: [[["This step", "هذه الخطوة"], ["Free", "مجانية"], ["Checking the list costs nothing.", "التحقق من القائمة لا يكلف شيئًا."]]]
    },
    premaster: {
      d: [["Your current transcript.", "كشف درجاتك الحالي."], ["The pre-master's offer and the master's offer it leads to.", "عرض ما قبل الماجستير وعرض الماجستير الذي يؤدي إليه."], ["Anything SACM confirms in writing.", "أي تأكيد مكتوب من الملحقية."]],
      m: [["Assuming SACM pays for it. It is not on the sponsored list.", "افتراض أن الملحقية تدفع تكاليفه، وهو غير مدرج في البرامج المبتعث عليها."], ["Taking it when you already meet the master's requirements.", "الالتحاق به وأنت تستوفي شروط الماجستير أصلًا."]],
      c: [[["Pre-master's tuition", "رسوم ما قبل الماجستير"], ["Usually your own cost", "على حسابك عادةً"], ["Unless SACM confirms otherwise in writing.", "ما لم تؤكد الملحقية غير ذلك كتابيًا."]]]
    },
    docs: {
      d: [["Your bachelor's certificate and transcripts, certified.", "شهادة البكالوريوس وكشوف الدرجات مصدقة."], ["Equivalency for any qualification from outside Saudi Arabia.", "معادلة أي مؤهل من خارج السعودية."], ["National ID (chip card), a passport valid for at least a year, and your national address.", "الهوية الوطنية (بالشريحة)، وجواز سفر صالح سنة على الأقل، وعنوانك الوطني."]],
      m: [["Leaving equivalency to the last month.", "ترك المعادلة إلى الشهر الأخير."], ["A passport that expires during your first year abroad.", "جواز ينتهي خلال سنتك الأولى في الخارج."], ["Names spelled differently on different documents.", "اختلاف كتابة الاسم بين المستندات."]],
      c: [[["Certified copies and translations", "النسخ المصدقة والترجمة"], ["Varies", "تختلف"], ["Ask your university what it accepts before you pay for translations.", "اسأل جامعتك عما تقبله قبل أن تدفع رسوم الترجمة."]]]
    },
    researchArea: {
      d: [["A one-page summary of your topic.", "ملخص موضوعك في صفحة واحدة."], ["A list of 5 to 10 key papers.", "قائمة من 5 إلى 10 أوراق بحثية أساسية."], ["Your CV.", "سيرتك الذاتية."]],
      m: [["Choosing a topic outside the national priority areas.", "اختيار موضوع خارج مجالات الأولوية الوطنية."], ["A topic so broad that no supervisor can take it on.", "موضوع واسع جدًا لا يستطيع مشرف تبنيه."]],
      c: [[["This step", "هذه الخطوة"], ["Free", "مجانية"], ["Reading and planning cost nothing.", "القراءة والتخطيط لا يكلفان شيئًا."]]]
    },
    supervisor: {
      d: [["A research proposal, about 2 pages.", "مقترح بحثي في صفحتين تقريبًا."], ["Your CV and transcripts.", "سيرتك الذاتية وكشوف الدرجات."], ["A short, personal email for each academic.", "رسالة قصيرة وشخصية لكل أكاديمي."]],
      m: [["Sending the same email to many academics at once.", "إرسال الرسالة نفسها إلى أكاديميين كثيرين دفعة واحدة."], ["Not reading their recent papers before you write.", "عدم قراءة أبحاثهم الحديثة قبل مراسلتهم."], ["Giving up after one unanswered email. Follow up politely after 1 to 2 weeks.", "الاستسلام بعد رسالة واحدة دون رد. تابع بلطف بعد أسبوع أو أسبوعين."]],
      c: [[["This step", "هذه الخطوة"], ["Free", "مجانية"], ["Writing to supervisors costs nothing.", "مراسلة المشرفين لا تكلف شيئًا."]]]
    },
    uniCheckPhd: {
      d: [["The 2026–2027 list for your field.", "قائمة 2026–2027 لتخصصك."], ["The program page link.", "رابط صفحة البرنامج."]],
      m: [["Checking the overall ranking instead of your field's.", "النظر إلى التصنيف العام بدل تصنيف تخصصك."], ["Not asking SACM when you are unsure.", "عدم سؤال الملحقية عند الشك."]],
      c: [[["This step", "هذه الخطوة"], ["Free", "مجانية"], ["Checking the list costs nothing.", "التحقق من القائمة لا يكلف شيئًا."]]]
    },
    qubool: {
      d: [["Your unconditional offer.", "قبولك غير المشروط."], ["Certified transcripts and your English result.", "كشوف الدرجات المصدقة ونتيجة اختبار اللغة."], ["Your national ID and passport.", "هويتك الوطنية وجواز سفرك."], ["The Nafath app on your phone to sign in.", "تطبيق نفاذ على جوالك لتسجيل الدخول."]],
      m: [["Waiting until the last days of the window, when the platform is busiest.", "الانتظار إلى آخر أيام فترة التقديم، حين تكون المنصة في أشد ضغطها."], ["Choosing a track whose rules you don't meet.", "اختيار مسار لا تنطبق عليك شروطه."], ["Uploading blurry scans. Use clear PDFs.", "رفع صور غير واضحة. استخدم ملفات PDF واضحة."]],
      c: FREE
    },
    safeer: {
      d: [["Your nomination in the scholarship.", "ترشيحك في البعثة."], ["The financial guarantee letter from Safeer.", "خطاب الضمان المالي من سفير."], ["Your Confirmation of Enrolment (CoE) as a PDF.", "إثبات التسجيل (CoE) بصيغة PDF."]],
      m: [["Accepting the offer without uploading the guarantee letter, which can trigger a tuition invoice.", "قبول العرض دون رفع خطاب الضمان، مما قد يصدر فاتورة رسوم دراسية."], ["Not checking the dates and course code on your CoE.", "عدم التحقق من التواريخ ورمز البرنامج في إثبات التسجيل."]],
      c: [[["Guarantee letter", "خطاب الضمان"], ["Free", "مجاني"], ["You request it on Safeer.", "تطلبه عبر منصة سفير."]]]
    },
    visa: {
      d: [["Passport and your CoE.", "جواز السفر وإثبات التسجيل (CoE)."], ["Your OSHC policy for the length of your visa.", "وثيقة التأمين الصحي OSHC لكامل مدة التأشيرة."], ["SACM's guarantee letter as proof you can pay.", "خطاب الضمان من الملحقية إثباتًا لقدرتك المالية."], ["Any health check or biometrics the department asks for.", "أي فحص طبي أو بصمات تطلبها الوزارة."]],
      m: [["Booking flights before the visa is granted.", "حجز الطيران قبل صدور التأشيرة."], ["OSHC that ends before your visa does.", "تأمين صحي ينتهي قبل التأشيرة."], ["Answering the Genuine Student questions with copied text. Write your own answers.", "الإجابة عن أسئلة الطالب الحقيقي بنص منسوخ. اكتب إجاباتك بنفسك."]],
      c: [[["Student visa (subclass 500)", "تأشيرة الطالب (الفئة 500)"], ["A$2,500", "2,500 دولار أسترالي"], ["From 1 July 2026. Paid when you apply.", "منذ 1 يوليو 2026، وتُدفع عند التقديم."], SRC.auVisa],
        [["OSHC health cover", "التأمين الصحي OSHC"], ["Varies by insurer", "يختلف حسب شركة التأمين"], ["Compare quotes for the length of your visa. SACM usually covers it.", "قارن العروض لكامل مدة التأشيرة، وتغطيه الملحقية عادةً."], SRC.oshc],
        [["Processing time", "مدة المعالجة"], ["Changes every month", "تتغير كل شهر"], ["Check the live times before you book flights.", "راجع المدد الحالية قبل حجز الطيران."], SRC.auTimes]]
    },
    housing: {
      d: [["Passport and visa.", "جواز السفر والتأشيرة."], ["Proof of enrolment.", "إثبات التسجيل."], ["SACM's letter or a bank statement to show you can pay rent.", "خطاب الملحقية أو كشف حساب يثبت قدرتك على دفع الإيجار."]],
      m: [["Paying a bond for a room you haven't seen.", "دفع تأمين لغرفة لم ترها."], ["Signing a 12-month lease in your first week.", "توقيع عقد لمدة 12 شهرًا في أسبوعك الأول."], ["Not taking photos of the room on move-in day.", "عدم تصوير الغرفة يوم استلامها."]],
      c: [[["Short stay for 2 weeks", "سكن مؤقت لأسبوعين"], ["Varies", "يختلف"], ["Book near campus or a train line.", "احجز قريبًا من الجامعة أو من خط قطار."]],
        [["Rental bond", "تأمين الإيجار"], ["Usually 4 weeks' rent", "عادةً إيجار 4 أسابيع"], ["It is lodged with the state bond authority and returned when you leave, minus any damage.", "يودع لدى الجهة المختصة في الولاية ويعاد إليك عند المغادرة بعد خصم أي أضرار."]],
        [["Rent in advance", "إيجار مقدم"], ["Often 2 weeks", "غالبًا أسبوعان"], ["Paid when you sign.", "يُدفع عند التوقيع."]]]
    },
    arrive: {
      d: [["Passport and visa.", "جواز السفر والتأشيرة."], ["Your enrolment document.", "مستند التسجيل."], ["Your local address.", "عنوانك المحلي."], ["SACM letters.", "خطابات الملحقية."]],
      m: [["Missing orientation. It is where you meet people and learn the systems.", "تفويت أسبوع التعريف، ففيه تتعرف على الناس وعلى أنظمة الجامعة."], ["Not updating your address with your university, which visa holders must do.", "عدم تحديث عنوانك لدى الجامعة، وهو واجب على حاملي التأشيرة."], ["Leaving your SACM arrival steps for later.", "تأجيل خطوات الوصول في سفير."]],
      c: [[["Phone, bank and transport", "الجوال والبنك والمواصلات"], ["Small", "قليلة"], ["Opening a student bank account is usually free. Budget for a SIM plan and transport.", "فتح حساب بنكي للطلاب مجاني عادةً، فخصص مبلغًا لباقة الجوال والمواصلات."]]]
    },
    progressF: {
      d: [["Your results each term.", "نتائجك كل فصل."], ["A new guarantee letter for your degree.", "خطاب ضمان جديد للشهادة."], ["Credit transfer documents, if any.", "مستندات معادلة المواد إن وجدت."]],
      m: [["Requesting the new guarantee letter late.", "طلب خطاب الضمان الجديد متأخرًا."], ["Falling below the progression mark in one subject.", "الانخفاض عن درجة الانتقال في مادة واحدة."]],
      c: [[["Guarantee letter", "خطاب الضمان"], ["Free", "مجاني"], ["You request it on Safeer.", "تطلبه عبر منصة سفير."]]]
    }
  };

  // ---------- country changes ----------
  var CC = {
    us: {
      offer: { c: [[["Each university's application fee", "رسوم التقديم في كل جامعة"], ["Varies", "تختلف"], ["Universities set their own fees, and some waive them. The Common App itself is free.", "تحدد كل جامعة رسومها، وبعضها يعفي منها. منصة Common App نفسها مجانية."]]] },
      offerF: { c: [[["Each university's application fee", "رسوم التقديم في كل جامعة"], ["Varies", "تختلف"], ["Universities set their own fees, and some waive them.", "تحدد كل جامعة رسومها، وبعضها يعفي منها."]]] },
      safeer: { d: [["Your nomination in the scholarship.", "ترشيحك في البعثة."], ["The financial guarantee letter from Safeer.", "خطاب الضمان المالي من سفير."], ["Your I-20 from the university.", "نموذج I-20 من الجامعة."]], m: [["Not checking your name, dates and program on the I-20.", "عدم التحقق من اسمك والتواريخ والبرنامج في نموذج I-20."], ["Accepting the offer without sending the guarantee letter.", "قبول العرض دون إرسال خطاب الضمان."]] },
      visa: {
        d: [["A valid passport.", "جواز سفر ساري المفعول."], ["Your I-20 and SEVIS fee receipt.", "نموذج I-20 وإيصال رسوم SEVIS."], ["DS-160 confirmation page and visa fee receipt.", "صفحة تأكيد DS-160 وإيصال رسوم التأشيرة."], ["SACM letters, your offer and transcripts for the interview.", "خطابات الملحقية وخطاب القبول وكشوف الدرجات للمقابلة."]],
        m: [["Booking the interview before paying the SEVIS fee.", "حجز المقابلة قبل دفع رسوم SEVIS."], ["Memorised answers. Explain your study plan and your plans after graduation in your own words.", "إجابات محفوظة. اشرح خطتك الدراسية وخططك بعد التخرج بكلماتك."], ["Entering the US more than 30 days before your I-20 start date.", "دخول أمريكا قبل تاريخ البدء في I-20 بأكثر من 30 يومًا."]],
        c: [[["SEVIS I-901 fee", "رسوم SEVIS I-901"], ["US$350", "350 دولارًا"], ["Paid online before the interview.", "تُدفع إلكترونيًا قبل المقابلة."], SRC.sevis],
          [["Visa application fee", "رسوم طلب التأشيرة"], ["US$185", "185 دولارًا"], ["Paid before you book the interview.", "تُدفع قبل حجز المقابلة."], SRC.usFees],
          [["Visa integrity fee", "رسوم نزاهة التأشيرة"], ["US$250", "250 دولارًا"], ["New. Some embassies now charge it when the visa is issued, and it may be refunded later if you follow the visa rules.", "رسوم جديدة تحصّلها بعض السفارات عند إصدار التأشيرة، وقد تُسترد لاحقًا إذا التزمت بشروطها."]],
          [["Interview wait", "انتظار المقابلة"], ["Varies by city", "يختلف حسب المدينة"], ["Check Riyadh, Jeddah and Dhahran.", "راجع الرياض وجدة والظهران."], SRC.usWait]]
      },
      housing: { c: [[["Housing deposit", "تأمين السكن"], ["Varies by state", "يختلف حسب الولاية"], ["University housing often asks for a deposit when you apply. Ask whether it is refundable.", "يطلب سكن الجامعة غالبًا تأمينًا عند التقديم، فاسأل هل هو مسترد."]]] }
    },
    uk: {
      offer: { c: [[["UCAS application", "التقديم عبر UCAS"], ["£34.50", "34.50 جنيهًا"], ["For 2027 entry. It covers up to 5 choices.", "للدراسة في 2027، ويشمل حتى 5 خيارات."], SRC.ucas]] },
      offerF: { c: [[["Foundation application", "التقديم على السنة التأسيسية"], ["Varies", "تختلف"], ["Many foundation years take direct applications. Check whether yours uses UCAS.", "كثير من السنوات التأسيسية تقبل التقديم المباشر. تحقق هل تستخدم سنتك UCAS."]]] },
      safeer: { d: [["Your nomination in the scholarship.", "ترشيحك في البعثة."], ["The financial guarantee letter from Safeer.", "خطاب الضمان المالي من سفير."], ["Your CAS number and statement.", "رقم CAS وبيانه."]], m: [["Not checking every detail in the CAS before you apply for the visa.", "عدم التحقق من كل تفاصيل CAS قبل التقديم على التأشيرة."], ["Accepting without sending the guarantee letter.", "القبول دون إرسال خطاب الضمان."]] },
      visa: {
        d: [["Passport.", "جواز السفر."], ["Your CAS number.", "رقم CAS."], ["An ATAS certificate, if your course needs one.", "شهادة ATAS إذا كان برنامجك يحتاجها."], ["SACM's sponsor letter.", "خطاب الجهة الراعية من الملحقية."]],
        m: [["Applying more than 6 months before your course starts. You can't apply that early.", "محاولة التقديم قبل بدء الدراسة بأكثر من 6 أشهر، فلا يُسمح بذلك."], ["Forgetting ATAS for some science and engineering courses.", "نسيان شهادة ATAS لبعض برامج العلوم والهندسة."], ["Losing access to your UKVI account, where your eVisa lives.", "فقدان الدخول إلى حساب UKVI الذي توجد فيه تأشيرتك الإلكترونية."]],
        c: [[["Student visa", "تأشيرة الطالب"], ["£558", "558 جنيهًا"], ["Applying from outside the UK.", "عند التقديم من خارج بريطانيا."], SRC.ukVisa],
          [["Immigration health surcharge", "رسوم الخدمات الصحية"], ["£776 a year", "776 جنيهًا في السنة"], ["Paid with the visa for your whole course. It gives you NHS access.", "تُدفع مع التأشيرة لكامل مدة الدراسة، وتتيح لك خدمات NHS."], SRC.ukVisa],
          [["Decision", "القرار"], ["Usually within 3 weeks", "عادةً خلال 3 أسابيع"], ["After you apply online and prove your identity.", "بعد التقديم الإلكتروني وإثبات هويتك."], SRC.ukVisa]]
      },
      housing: { c: [[["Deposit", "التأمين"], ["Up to 5 weeks' rent", "حتى إيجار 5 أسابيع"], ["In England, for most tenancies. It must be protected in a government scheme.", "في إنجلترا لمعظم العقود، ويجب حفظه في نظام حكومي."]]] }
    },
    ca: {
      safeer: { d: [["Your nomination in the scholarship.", "ترشيحك في البعثة."], ["The financial guarantee letter from Safeer.", "خطاب الضمان المالي من سفير."], ["Your letter of acceptance.", "خطاب القبول."]] },
      visa: {
        d: [["Passport.", "جواز السفر."], ["Letter of acceptance.", "خطاب القبول."], ["Your PAL (or CAQ for Quebec), if you need one.", "خطاب PAL (أو CAQ في كيبيك) إذا احتجته."], ["SACM's guarantee letter as proof of funds.", "خطاب الضمان من الملحقية إثباتًا للقدرة المالية."]],
        m: [["Applying without a PAL when your program needs one.", "التقديم دون PAL مع أن برنامجك يحتاجه."], ["Forgetting the letter of introduction at the airport. Your permit is issued when you land.", "نسيان خطاب التعريف في المطار، فالتصريح يصدر عند وصولك."]],
        c: [[["Study permit", "تصريح الدراسة"], ["CA$150", "150 دولارًا كنديًا"], ["Paid when you apply.", "يُدفع عند التقديم."], SRC.caPermit],
          [["Biometrics", "البصمات"], ["CA$85", "85 دولارًا كنديًا"], ["Paid with the application.", "تُدفع مع الطلب."], SRC.caPermit],
          [["Processing time", "مدة المعالجة"], ["Changes often", "تتغير كثيرًا"], ["Check the official tool for Saudi Arabia.", "راجع الأداة الرسمية للسعودية."], SRC.caTimes]]
      },
      housing: { c: [[["Deposit", "التأمين"], ["Depends on the province", "يختلف حسب المقاطعة"], ["Ontario allows only last month's rent, British Columbia up to half a month, and Quebec none.", "أونتاريو تسمح بإيجار الشهر الأخير فقط، وكولومبيا البريطانية بنصف شهر كحد أقصى، وكيبيك لا تسمح بالتأمين."]]] }
    },
    de: {
      offerF: { c: [[["uni-assist", "uni-assist"], ["€75, then €30", "75 يورو ثم 30 يورو"], ["€75 for your first choice and €30 for each extra choice in the same semester.", "75 يورو للخيار الأول و30 يورو لكل خيار إضافي في الفصل نفسه."], SRC.uniassist]] },
      offer: { c: [[["uni-assist", "uni-assist"], ["€75, then €30", "75 يورو ثم 30 يورو"], ["If your university uses it: €75 for the first choice, €30 for each extra one.", "إن كانت جامعتك تستخدمه: 75 يورو للخيار الأول و30 يورو لكل خيار إضافي."], SRC.uniassist]] },
      englishF: { m: [["Starting German too late. Most Studienkollegs ask for about B1 to B2.", "البدء بتعلم الألمانية متأخرًا، فمعظم الكليات التحضيرية تطلب مستوى B1 إلى B2 تقريبًا."], ["Expecting SACM to pay for language courses.", "توقع أن تدفع الملحقية تكاليف دورات اللغة."]], c: [[["German courses and exam", "دورات الألمانية والاختبار"], ["Your own cost", "على حسابك"], ["Prices depend on the school and the exam.", "تختلف الأسعار حسب المعهد والاختبار."]]] },
      safeer: { d: [["Your nomination in the scholarship.", "ترشيحك في البعثة."], ["The financial guarantee letter from Safeer.", "خطاب الضمان المالي من سفير."], ["Your admission letter (Zulassung).", "خطاب القبول (Zulassung)."]] },
      visa: {
        d: [["Passport.", "جواز السفر."], ["Admission letter (Zulassung).", "خطاب القبول (Zulassung)."], ["SACM's scholarship letter instead of a blocked account.", "خطاب البعثة من الملحقية بدل الحساب المغلق."], ["Proof of health insurance.", "إثبات التأمين الصحي."]],
        m: [["Booking the embassy appointment late. Slots can be weeks away.", "حجز موعد السفارة متأخرًا، فقد تكون المواعيد بعد أسابيع."], ["Forgetting the residence permit appointment after you arrive.", "نسيان موعد تصريح الإقامة بعد وصولك."]],
        c: [[["National visa", "التأشيرة الوطنية"], ["€75", "75 يورو"], ["Paid at the embassy or consulate.", "تُدفع في السفارة أو القنصلية."], SRC.deVisa],
          [["Public health insurance", "التأمين الصحي العام"], ["About €140 a month", "نحو 140 يورو شهريًا"], ["For students. Ask SACM what it covers.", "للطلاب، واسأل الملحقية عما تغطيه."]]]
      },
      housing: { c: [[["Deposit (Kaution)", "التأمين (Kaution)"], ["Up to 3 months' rent", "حتى إيجار 3 أشهر"], ["Without bills. Never pay before you have a written contract.", "دون الفواتير. لا تدفع قبل أن يكون لديك عقد مكتوب."]]] },
      arrive: { d: [["Passport and visa.", "جواز السفر والتأشيرة."], ["Your rental contract and the landlord's confirmation (Wohnungsgeberbestätigung).", "عقد الإيجار وتأكيد المؤجر (Wohnungsgeberbestätigung)."], ["Admission letter.", "خطاب القبول."]], m: [["Missing the 14-day deadline to register your address (Anmeldung).", "تفويت مهلة الـ14 يومًا لتسجيل العنوان (Anmeldung)."], ["Leaving the residence permit appointment too late.", "تأخير موعد تصريح الإقامة."]] }
    },
    sg: {
      safeer: { d: [["Your nomination in the scholarship.", "ترشيحك في البعثة."], ["The financial guarantee letter from Safeer.", "خطاب الضمان المالي من سفير."], ["Your SOLAR registration from the university.", "تسجيلك في نظام SOLAR من الجامعة."]] },
      visa: {
        d: [["Passport.", "جواز السفر."], ["Your SOLAR application number from the university.", "رقم طلبك في SOLAR من الجامعة."], ["Passport photo and eForm 16.", "صورة شخصية ونموذج eForm 16."], ["Your IPA letter to enter Singapore.", "خطاب الموافقة المبدئية (IPA) لدخول سنغافورة."]],
        m: [["Missing the 7-day window to pay the processing fee.", "تفويت مهلة الأيام السبعة لدفع رسوم المعالجة."], ["Travelling without your IPA letter.", "السفر دون خطاب IPA."]],
        c: [[["Processing fee", "رسوم المعالجة"], ["S$45", "45 دولارًا سنغافوريًا"], ["Non-refundable, paid within 7 days of eForm 16.", "غير مستردة، وتُدفع خلال 7 أيام من تقديم eForm 16."], SRC.sgPass],
          [["Issuance fee", "رسوم الإصدار"], ["S$60", "60 دولارًا سنغافوريًا"], ["Paid when ICA issues your pass. A S$30 multiple-journey visa fee may also apply.", "تُدفع عند إصدار البطاقة، وقد تُضاف 30 دولارًا لتأشيرة الدخول المتعدد."], SRC.sgPass]]
      },
      housing: { c: [[["Private rentals", "الإيجار الخاص"], ["Minimum 6 months for HDB", "6 أشهر على الأقل لشقق HDB"], ["Use a licensed agent, and see the place before you pay.", "استخدم وسيطًا مرخصًا، وعاين المكان قبل أن تدفع."]]] }
    }
  };

  // ---------- quick checks ----------
  var Q = {
    fieldRoute: { q: ["Which route usually leads straight into the second year of a bachelor's?", "أي مسار يؤدي عادةً إلى السنة الثانية من البكالوريوس مباشرة؟"], o: [["Foundation", "الفاونديشن"], ["Diploma", "الدبلوم"], ["An English course", "دورة لغة"]], a: 1, x: ["A Diploma usually leads into second year. Foundation leads into first year.", "الدبلوم يؤدي عادةً إلى السنة الثانية، والفاونديشن إلى السنة الأولى."] },
    englishF: { q: ["What IELTS score does the Ministry ask for to sponsor a preparatory year?", "ما درجة IELTS التي تشترطها الوزارة للابتعاث على السنة التحضيرية؟"], o: [["5.0", "5.0"], ["5.5", "5.5"], ["6.5", "6.5"]], a: 1, x: ["At least IELTS 5.5, or an equivalent score.", "IELTS 5.5 على الأقل، أو ما يعادلها."] },
    rulesF: { q: ["From 2025–26, what high school average does the Ministry ask for to sponsor a preparatory year?", "منذ 2025–26، ما معدل الثانوية الذي تشترطه الوزارة للابتعاث على السنة التحضيرية؟"], o: [["80%", "80%"], ["85%", "85%"], ["90%", "90%"]], a: 2, x: ["At least 90%, together with IELTS 5.5.", "90% على الأقل، مع IELTS 5.5."] },
    offerF: { q: ["What is a package offer?", "ما المقصود بالعرض المشترك (Package offer)؟"], o: [["A discount on tuition", "خصم على الرسوم"], ["An offer that links your pathway year to your degree", "عرض يربط سنة المسار بالشهادة"], ["A housing deal", "عرض للسكن"]], a: 1, x: ["It joins your pathway year and your degree, so you know where you are heading.", "يربط سنة المسار بالشهادة، فتعرف إلى أين تتجه."] },
    fieldUni: { q: ["What ranking does the Imdad track ask for?", "ما التصنيف الذي يشترطه مسار إمداد؟"], o: [["Top 30", "ضمن أفضل 30"], ["Top 200", "ضمن أفضل 200"], ["Any university", "أي جامعة"]], a: 1, x: ["Imdad asks for a top 200 university, and Al-Ruwwad for a top 30.", "إمداد يشترط جامعة ضمن أفضل 200، والرواد ضمن أفضل 30."] },
    englishB: { q: ["Why reach your English score before you apply for the scholarship?", "لماذا تحقق درجة اللغة قبل التقديم على البعثة؟"], o: [["The Ministry needs an unconditional offer", "لأن الوزارة تشترط قبولًا غير مشروط"], ["English scores expire in a month", "لأن نتائج اللغة تنتهي خلال شهر"], ["SACM pays for English courses", "لأن الملحقية تدفع تكاليف دورات اللغة"]], a: 0, x: ["The Ministry asks for an unconditional offer, and SACM doesn't pay for English courses.", "الوزارة تشترط قبولًا غير مشروط، والملحقية لا تبتعث على دورات اللغة."] },
    englishPg: { q: ["Does SACM pay for English language courses?", "هل تدفع الملحقية تكاليف دورات اللغة الإنجليزية؟"], o: [["Yes, always", "نعم، دائمًا"], ["No", "لا"], ["Only for PhD students", "لطلاب الدكتوراه فقط"]], a: 1, x: ["SACM does not pay for English courses, so reach the score yourself before you apply.", "الملحقية لا تبتعث على دورات اللغة، فحقق الدرجة بنفسك قبل التقديم."] },
    sat: { q: ["When should you sit the SAT?", "متى تقدّم اختبار SAT؟"], o: [["Always, before any application", "دائمًا قبل أي تقديم"], ["Only if your university asks for it", "فقط إذا طلبته جامعتك"], ["After you arrive", "بعد وصولك"]], a: 1, x: ["Only sit it if your university asks. If it doesn't, skip the step.", "لا تقدّمه إلا إذا طلبته جامعتك، وإن لم تطلبه فتخطَّ هذه الخطوة."] },
    courseType: { q: ["For how long does the scholarship cover a master's?", "ما المدة التي تغطيها البعثة للماجستير؟"], o: [["Up to 1 year", "حتى سنة"], ["Up to 2 years", "حتى سنتين"], ["Up to 4 years", "حتى 4 سنوات"]], a: 1, x: ["Up to 2 years, so check your program's length.", "حتى سنتين، فتحقق من مدة برنامجك."] },
    uniCheckPg: { q: ["Al-Ruwwad needs a university ranked in the top…", "يشترط مسار الرواد جامعة ضمن أفضل…"], o: [["30", "30"], ["100", "100"], ["500", "500"]], a: 0, x: ["Top 30 for Al-Ruwwad, and top 200 for Imdad.", "أفضل 30 للرواد، وأفضل 200 لإمداد."] },
    premaster: { q: ["Does SACM usually sponsor a pre-master's?", "هل تبتعث الملحقية عادةً على برنامج ما قبل الماجستير؟"], o: [["Yes", "نعم"], ["No, it is not on the sponsored list", "لا، فهو غير مدرج في البرامج المبتعث عليها"], ["Only in Australia", "في أستراليا فقط"]], a: 1, x: ["Expect to pay yourself unless SACM confirms otherwise in writing.", "توقّع أن تدفع بنفسك ما لم تؤكد الملحقية غير ذلك كتابيًا."] },
    docs: { q: ["How long should your passport be valid when you prepare your documents?", "ما مدة صلاحية الجواز المطلوبة عند تجهيز المستندات؟"], o: [["3 months", "3 أشهر"], ["At least 1 year", "سنة على الأقل"], ["It doesn't matter", "لا يهم"]], a: 1, x: ["At least a year, so it doesn't run out early in your studies.", "سنة على الأقل، حتى لا ينتهي في بداية دراستك."] },
    researchArea: { q: ["Which track sponsors PhDs?", "أي مسار يبتعث على الدكتوراه؟"], o: [["Al-Ruwwad", "الرواد"], ["Imdad", "إمداد"], ["Research & Development", "البحث والتطوير"]], a: 2, x: ["The Research & Development track, for national research priority areas.", "مسار البحث والتطوير، لمجالات الأولوية البحثية الوطنية."] },
    supervisor: { q: ["What should you send when you first email a possible supervisor?", "ماذا ترسل في رسالتك الأولى إلى مشرف محتمل؟"], o: [["Only your passport", "جواز سفرك فقط"], ["Your proposal and CV", "مقترحك البحثي وسيرتك الذاتية"], ["Your visa", "تأشيرتك"]], a: 1, x: ["A short proposal and CV show them your idea and your background.", "المقترح القصير والسيرة الذاتية يعرّفانه بفكرتك وخلفيتك."] },
    uniCheckPhd: { q: ["The Research & Development track needs a university ranked in the top…", "يشترط مسار البحث والتطوير جامعة ضمن أفضل…"], o: [["30", "30"], ["200", "200"], ["1,000", "1,000"]], a: 1, x: ["Top 200 in your field, on the program's list.", "ضمن أفضل 200 في تخصصك، ومن قائمة البرنامج."] },
    offer: { q: ["What kind of offer does the Ministry ask for?", "ما نوع القبول الذي تشترطه الوزارة؟"], o: [["Conditional", "مشروط"], ["Unconditional", "غير مشروط"], ["Any offer", "أي قبول"]], a: 1, x: ["An unconditional offer. If yours is conditional, meet the conditions first.", "قبول غير مشروط. إن كان قبولك مشروطًا فاستوفِ الشروط أولًا."] },
    qubool: { q: ["How do you sign in to Qubool?", "كيف تسجّل الدخول إلى منصة قبول؟"], o: [["With Nafath", "عبر نفاذ"], ["With your passport number", "برقم الجواز"], ["Through your university", "عن طريق الجامعة"]], a: 0, x: ["You sign in with Nafath, then choose your track.", "تسجّل الدخول عبر نفاذ ثم تختار مسارك."] },
    safeer: { q: ["What does your university need before it issues your CoE?", "ماذا تحتاج جامعتك قبل أن تصدر إثبات التسجيل (CoE)؟"], o: [["Your visa", "التأشيرة"], ["SACM's financial guarantee letter", "خطاب الضمان المالي من الملحقية"], ["A new IELTS test", "اختبار IELTS جديد"]], a: 1, x: ["The guarantee letter comes first, then the CoE, then the visa.", "خطاب الضمان أولًا، ثم إثبات التسجيل، ثم التأشيرة."] },
    visa: { q: ["What is a condition of the Australian student visa?", "ما الشرط المرتبط بتأشيرة الطالب الأسترالية؟"], o: [["Overseas Student Health Cover (OSHC)", "التأمين الصحي للطلاب الدوليين (OSHC)"], ["A local bank loan", "قرض من بنك محلي"], ["A driving licence", "رخصة قيادة"]], a: 0, x: ["You need OSHC for the length of your visa.", "تحتاج إلى OSHC لكامل مدة التأشيرة."] },
    housing: { q: ["What should you do before you pay a bond or deposit?", "ماذا تفعل قبل أن تدفع تأمين السكن؟"], o: [["See the place, in person or by live video", "معاينة المكان شخصيًا أو بمكالمة فيديو مباشرة"], ["Send money to hold it", "إرسال مبلغ لحجزه"], ["Nothing, just pay", "لا شيء، ادفع فقط"]], a: 0, x: ["Never pay for a room you haven't seen. It is the most common scam.", "لا تدفع أبدًا لغرفة لم ترها، فهذه أشهر طرق الاحتيال."] },
    arrive: { q: ["Where do you complete your SACM arrival steps?", "أين تُكمل خطوات الوصول الخاصة بالملحقية؟"], o: [["On Safeer", "في منصة سفير"], ["At the airport", "في المطار"], ["On Qubool", "في منصة قبول"]], a: 0, x: ["On Safeer, as soon as you arrive.", "في منصة سفير فور وصولك."] },
    progressF: { q: ["What does SACM need each time you move to a new stage, such as from foundation to degree?", "ماذا تحتاج الملحقية كلما انتقلت إلى مرحلة جديدة، مثل الانتقال من الفاونديشن إلى الشهادة؟"], o: [["A new guarantee letter", "خطاب ضمان جديد"], ["A new passport", "جواز جديد"], ["A new IELTS", "اختبار IELTS جديد"]], a: 0, x: ["Request it early on Safeer so your enrolment isn't delayed.", "اطلبه مبكرًا عبر سفير حتى لا يتأخر تسجيلك."] }
  };
  var QC = {
    us: {
      fieldRoute: { q: ["Does SACM pay for English language courses?", "هل تدفع الملحقية تكاليف دورات اللغة؟"], o: [["Yes", "نعم"], ["No", "لا"], ["Only in the US", "في أمريكا فقط"]], a: 1, x: ["SACM does not pay for English courses, so reach your score before you apply.", "الملحقية لا تبتعث على دورات اللغة، فحقق درجتك قبل التقديم."] },
      safeer: { q: ["Which document does a US university issue for your F-1 visa?", "ما المستند الذي تصدره الجامعة الأمريكية لتأشيرة F-1؟"], o: [["CoE", "CoE"], ["I-20", "I-20"], ["CAS", "CAS"]], a: 1, x: ["The I-20. Check every detail on it when it arrives.", "نموذج I-20، فتحقق من كل تفاصيله عند وصوله."] },
      visa: { q: ["What do you pay before your F-1 visa interview?", "ماذا تدفع قبل مقابلة تأشيرة F-1؟"], o: [["Nothing", "لا شيء"], ["The SEVIS fee and the visa application fee", "رسوم SEVIS ورسوم طلب التأشيرة"], ["A year of tuition", "رسوم سنة دراسية"]], a: 1, x: ["US$350 for SEVIS and US$185 for the visa application.", "350 دولارًا لـ SEVIS و185 دولارًا لطلب التأشيرة."] }
    },
    uk: {
      fieldRoute: { q: ["What do many Saudi students take before a UK bachelor's?", "ماذا يدرس كثير من الطلاب السعوديين قبل البكالوريوس في بريطانيا؟"], o: [["A foundation year", "سنة تأسيسية"], ["A master's", "الماجستير"], ["Nothing", "لا شيء"]], a: 0, x: ["Most UK universities need a foundation year for the Saudi secondary certificate.", "معظم الجامعات البريطانية تشترط سنة تأسيسية لحملة الثانوية السعودية."] },
      safeer: { q: ["Which number does your UK university give you for the visa?", "ما الرقم الذي تعطيك إياه الجامعة البريطانية للتأشيرة؟"], o: [["CAS", "CAS"], ["I-20", "I-20"], ["IPA", "IPA"]], a: 0, x: ["The Confirmation of Acceptance for Studies (CAS).", "رقم تأكيد القبول للدراسة (CAS)."] },
      visa: { q: ["Besides the visa fee, what do you pay for each year of your course?", "بالإضافة إلى رسوم التأشيرة، ماذا تدفع عن كل سنة دراسية؟"], o: [["The immigration health surcharge", "رسوم الخدمات الصحية"], ["A council tax deposit", "تأمين ضريبة البلدية"], ["Nothing else", "لا شيء آخر"]], a: 0, x: ["£776 a year, which gives you NHS access.", "776 جنيهًا في السنة، وتتيح لك خدمات NHS."] },
      housing: { q: ["In England, a deposit for most tenancies is capped at…", "في إنجلترا، الحد الأعلى للتأمين في معظم العقود هو…"], o: [["2 weeks' rent", "إيجار أسبوعين"], ["5 weeks' rent", "إيجار 5 أسابيع"], ["3 months' rent", "إيجار 3 أشهر"]], a: 1, x: ["5 weeks' rent, and it must be protected in a government scheme.", "إيجار 5 أسابيع، ويجب حفظه في نظام حكومي."] }
    },
    ca: {
      fieldRoute: { q: ["Does SACM pay for English language courses?", "هل تدفع الملحقية تكاليف دورات اللغة؟"], o: [["Yes", "نعم"], ["No", "لا"], ["Only in Canada", "في كندا فقط"]], a: 1, x: ["SACM does not pay for English courses.", "الملحقية لا تبتعث على دورات اللغة."] },
      safeer: { q: ["Which document do you keep for your study permit?", "ما المستند الذي تحتفظ به لتصريح الدراسة؟"], o: [["Letter of acceptance", "خطاب القبول"], ["CAS", "CAS"], ["I-20", "I-20"]], a: 0, x: ["Your letter of acceptance from the university.", "خطاب القبول من الجامعة."] },
      visa: { q: ["When is your Canadian study permit actually issued?", "متى يصدر تصريح الدراسة الكندي فعليًا؟"], o: [["When you land in Canada", "عند وصولك إلى كندا"], ["Before you apply", "قبل التقديم"], ["After your first term", "بعد الفصل الأول"]], a: 0, x: ["You show your letter of introduction at the airport, and the permit is issued there.", "تقدّم خطاب التعريف في المطار، ويصدر التصريح هناك."] },
      housing: { q: ["Which province does not allow rental deposits?", "أي مقاطعة لا تسمح بتأمين الإيجار؟"], o: [["Ontario", "أونتاريو"], ["Quebec", "كيبيك"], ["British Columbia", "كولومبيا البريطانية"]], a: 1, x: ["Quebec doesn't allow deposits. Ontario allows only last month's rent.", "كيبيك لا تسمح بالتأمين، وأونتاريو تسمح بإيجار الشهر الأخير فقط."] }
    },
    de: {
      fieldRoute: { q: ["What do most Saudi students complete before a German bachelor's?", "ماذا يُكمل معظم الطلاب السعوديين قبل البكالوريوس في ألمانيا؟"], o: [["A Studienkolleg", "الكلية التحضيرية (Studienkolleg)"], ["A master's", "الماجستير"], ["The SAT", "اختبار SAT"]], a: 0, x: ["A Studienkolleg, then the Feststellungsprüfung exam.", "الكلية التحضيرية، ثم اختبار Feststellungsprüfung."] },
      englishF: { q: ["What German level do most Studienkollegs ask for?", "ما مستوى الألمانية الذي تطلبه معظم الكليات التحضيرية؟"], o: [["A1", "A1"], ["About B1 to B2", "B1 إلى B2 تقريبًا"], ["C2", "C2"]], a: 1, x: ["About B1 to B2 before you start.", "B1 إلى B2 تقريبًا قبل البدء."] },
      visa: { q: ["What can scholarship holders usually show instead of a blocked account?", "ماذا يقدّم المبتعث عادةً بدل الحساب المغلق؟"], o: [["The scholarship letter", "خطاب البعثة"], ["A rental contract", "عقد الإيجار"], ["Nothing", "لا شيء"]], a: 0, x: ["SACM's scholarship letter is usually your proof of finance.", "خطاب البعثة من الملحقية هو عادةً إثباتك المالي."] },
      arrive: { q: ["Within how many days must you register your address (Anmeldung)?", "خلال كم يومًا يجب تسجيل عنوانك (Anmeldung)؟"], o: [["7", "7"], ["14", "14"], ["60", "60"]], a: 1, x: ["Within 14 days of moving in.", "خلال 14 يومًا من سكنك."] },
      housing: { q: ["A German deposit (Kaution) can be up to…", "تأمين السكن في ألمانيا (Kaution) يصل إلى…"], o: [["1 week's rent", "إيجار أسبوع"], ["3 months' rent", "إيجار 3 أشهر"], ["1 year's rent", "إيجار سنة"]], a: 1, x: ["Up to 3 months' rent without bills.", "حتى إيجار 3 أشهر دون الفواتير."] }
    },
    sg: {
      fieldRoute: { q: ["Do NUS, NTU and SMU have a foundation year?", "هل لدى NUS وNTU وSMU سنة تأسيسية؟"], o: [["Yes", "نعم"], ["No", "لا"], ["Only for engineering", "للهندسة فقط"]], a: 1, x: ["No. You apply directly to the degree.", "لا، فالتقديم يكون مباشرة على الشهادة."] },
      safeer: { q: ["Which letter lets you enter Singapore before you collect your Student's Pass?", "ما الخطاب الذي تدخل به سنغافورة قبل استلام بطاقة الطالب؟"], o: [["IPA", "IPA"], ["CAS", "CAS"], ["I-20", "I-20"]], a: 0, x: ["The In-Principle Approval (IPA) letter.", "خطاب الموافقة المبدئية (IPA)."] },
      visa: { q: ["Which form do you complete for the Student's Pass?", "ما النموذج الذي تُكمله لبطاقة الطالب؟"], o: [["DS-160", "DS-160"], ["eForm 16", "eForm 16"], ["I-901", "I-901"]], a: 1, x: ["eForm 16, after your university registers you on SOLAR.", "نموذج eForm 16، بعد أن تسجلك جامعتك في SOLAR."] },
      housing: { q: ["What is the minimum lease for an HDB flat?", "ما أقل مدة لعقد إيجار شقة HDB؟"], o: [["1 month", "شهر"], ["6 months", "6 أشهر"], ["3 years", "3 سنوات"]], a: 1, x: ["At least 6 months.", "6 أشهر على الأقل."] }
    }
  };

  // ---------- picking the right content ----------
  function cc() { var M = window.Masarok; var v = M && M.values ? M.values() : {}; return v.cc || "au"; }
  function infoFor(id) {
    var base = I[id]; if (!base) return null;
    var o = CC[cc()] && CC[cc()][id] || {}, r = {};
    ["d", "m", "c"].forEach(function (k) { r[k] = o[k] || base[k]; });
    // generic country notes where Australia-only details don't fit
    if (cc() !== "au" && !o.d && id === "visa") r.d = [["Passport.", "جواز السفر."], ["Your enrolment document from the university.", "مستند التسجيل من الجامعة."], ["SACM's guarantee letter as proof you can pay.", "خطاب الضمان من الملحقية إثباتًا لقدرتك المالية."]];
    if (cc() !== "au" && !o.d && id === "safeer") r.d = [["Your nomination in the scholarship.", "ترشيحك في البعثة."], ["The financial guarantee letter from Safeer.", "خطاب الضمان المالي من سفير."], ["Your enrolment document from the university.", "مستند التسجيل من الجامعة."]];
    if (cc() !== "au" && !o.c && id === "housing") r.c = [[["Short stay for 2 weeks", "سكن مؤقت لأسبوعين"], ["Varies", "يختلف"], ["Book near campus.", "احجز قريبًا من الجامعة."]]];
    if (cc() !== "au" && !o.m && id === "visa") r.m = [["Booking flights before the visa is granted.", "حجز الطيران قبل صدور التأشيرة."], ["Health cover that ends before your visa does.", "تأمين صحي ينتهي قبل التأشيرة."]];
    return r;
  }
  var OFFER_ANY = { q: ["Why save your offer letter as a PDF?", "لماذا تحفظ خطاب القبول بصيغة PDF؟"], o: [["You need it for your scholarship application", "لأنك تحتاجه للتقديم على البعثة"], ["Universities delete offers after a week", "لأن الجامعات تحذف العروض بعد أسبوع"], ["It's only for your records", "للاحتفاظ به فقط"]], a: 0, x: ["You upload it to Qubool when you apply for the scholarship.", "ترفعه في منصة قبول عند التقديم على البعثة."] };
  function quizFor(id) { if (id === "offerF" && cc() !== "au" && !(QC[cc()] && QC[cc()].offerF)) return OFFER_ANY; return (QC[cc()] && QC[cc()][id]) || Q[id] || null; }

  // ---------- UI ----------
  var UI = {
    more: ["More about this step", "المزيد عن هذه الخطوة"],
    tabs: [["📄 Documents", "📄 المستندات"], ["⚠️ Common mistakes", "⚠️ أخطاء شائعة"], ["💰 Cost & time", "💰 التكلفة والوقت"]],
    src: ["Official page", "الصفحة الرسمية"],
    check: ["Quick check", "سؤال سريع"], pts: ["+{n} pts", "+{n} {w}"],
    right: ["Correct!", "إجابة صحيحة!"], wrong: ["Not quite.", "ليست هذه."], again: ["Try once more for {n} pts", "حاول مرة أخرى مقابل {n} {w}"],
    earnedQ: ["You earned {n} points.", "حصلت على {n} {w}."], noPts: ["No points this time, but now you know.", "لا نقاط هذه المرة، لكنك عرفت الإجابة."],
    feesNote: ["Fees were checked in October 2026 and can change. Always confirm on the official page.", "تم التحقق من الرسوم في أكتوبر 2026 وقد تتغير، فتأكد دائمًا من الصفحة الرسمية."]
  };
  var tab = 0;
  var QK = "masarok-quiz";
  function qload() { try { return JSON.parse(localStorage.getItem(QK) || "{}") || {}; } catch (e) { return {}; } }
  function qsave(o) { try { localStorage.setItem(QK, JSON.stringify(o)); } catch (e) {} }

  function infoHtml(id) {
    var r = infoFor(id); if (!r) return "";
    var tabs = UI.tabs.map(function (t, i) {
      return '<button type="button" role="tab" class="si-tab" id="si-t' + i + '" aria-controls="si-p" aria-selected="' + (i === tab) + '" tabindex="' + (i === tab ? 0 : -1) + '" data-si-tab="' + i + '">' + esc(T(t)) + "</button>";
    }).join("");
    return '<section class="si" aria-label="' + esc(T(UI.more)) + '"><h4>' + esc(T(UI.more)) + '</h4><div class="si-tabs" role="tablist">' + tabs + '</div>' +
      '<div class="si-p" id="si-p" role="tabpanel" aria-labelledby="si-t' + tab + '">' + panel(r) + "</div></section>";
  }
  function panel(r) {
    if (tab === 0) return '<ul class="si-list si-docs">' + r.d.map(function (x) { return "<li>" + esc(T(x)) + "</li>"; }).join("") + "</ul>";
    if (tab === 1) return '<ul class="si-list si-oops">' + r.m.map(function (x) { return "<li>" + esc(T(x)) + "</li>"; }).join("") + "</ul>";
    var anyFee = false;
    var rows = r.c.map(function (x) {
      if (/\d/.test(x[1][0])) anyFee = true;
      return '<div class="si-cost"><div><b>' + esc(T(x[0])) + "</b><small>" + esc(T(x[2])) + (x[3] ? ' <a href="' + esc(x[3]) + '" target="_blank" rel="noopener">' + esc(T(UI.src)) + '<span aria-hidden="true"> ↗</span></a>' : "") + "</small></div><span>" + esc(T(x[1])) + "</span></div>";
    }).join("");
    return '<div class="si-costs">' + rows + "</div>" + (anyFee ? '<p class="si-note">' + esc(T(UI.feesNote)) + "</p>" : "");
  }

  function quizHtml(id) {
    var q = quizFor(id); if (!q) return "";
    var rec = qload()[cc() + ":" + id] || {}, G = window.MasarokGame;
    var doneQ = rec.ok || rec.t >= 2, pts = rec.t ? 10 : 20;
    var opts = q.o.map(function (o, i) {
      var cls = "";
      if (doneQ || rec.pick != null) { if (i === q.a && doneQ) cls = " is-right"; if (rec.pick === i && i !== q.a) cls = " is-wrong"; }
      return '<button type="button" class="qz-o' + cls + '" data-qz="' + i + '"' + (doneQ ? " disabled" : "") + ">" + esc(T(o)) + "</button>";
    }).join("");
    var res = "";
    if (rec.ok) res = '<p class="qz-res is-ok"><b>' + esc(T(UI.right)) + "</b> " + esc(T(q.x)) + (rec.pts ? " " + esc(fmt(UI.earnedQ, { n: rec.pts })) : "") + "</p>";
    else if (rec.t >= 2) res = '<p class="qz-res"><b>' + esc(T(UI.wrong)) + "</b> " + esc(T(q.x)) + " " + esc(T(UI.noPts)) + "</p>";
    else if (rec.t === 1) res = '<p class="qz-res"><b>' + esc(T(UI.wrong)) + "</b> " + esc(fmt(UI.again, { n: 10 })) + "</p>";
    return '<section class="qz" data-qz-id="' + id + '" aria-label="' + esc(T(UI.check)) + '"><div class="qz-h"><span>💡 ' + esc(T(UI.check)) + "</span>" +
      (!doneQ ? '<em>' + esc(fmt(UI.pts, { n: pts })) + "</em>" : rec.ok ? '<em class="is-ok">✓ ' + esc(fmt(UI.pts, { n: rec.pts || 0 })) + "</em>" : "") + "</div>" +
      '<p class="qz-q">' + esc(T(q.q)) + '</p><div class="qz-os" role="group">' + opts + "</div>" + res + "</section>";
  }

  function answer(id, i, el) {
    var q = quizFor(id); if (!q) return;
    var all = qload(), k = cc() + ":" + id, rec = all[k] || { t: 0 };
    if (rec.ok || rec.t >= 2) return;
    rec.t++; rec.pick = i;
    if (i === q.a) {
      rec.ok = true; rec.pts = rec.t === 1 ? 20 : 10;
      var G = window.MasarokGame;
      if (G && G.award && !G.award("quiz:" + k, rec.pts, el)) rec.pts = 0;
    }
    all[k] = rec; qsave(all);
    render(true);
  }

  // put the extra blocks into the step card each time the guide draws it
  function render(keepFocus) {
    var card = document.querySelector(".jr-panel:not([hidden]) .jr-card:not(.jr-finished)");
    if (!card) return;
    var cb = card.querySelector("[data-task]"); if (!cb) return;
    var id = cb.getAttribute("data-task").split(":")[0];
    var old = card.querySelectorAll(".si, .qz"); old.forEach(function (n) { n.remove(); });
    var at = card.querySelector(".jr-links-wrap") || card.querySelector(".jr-actions");
    var wrap = document.createElement("div");
    wrap.innerHTML = infoHtml(id) + quizHtml(id);
    while (wrap.firstChild) card.insertBefore(wrap.firstChild, at);
    if (keepFocus) { var f = card.querySelector(".qz-res") ; if (f) { f.setAttribute("tabindex", "-1"); f.focus({ preventScroll: true }); } }
  }

  document.addEventListener("masarok:journey-render", function () { setTimeout(function () { render(false); }, 0); });
  document.addEventListener("masarok:journey", function (e) { if (e.detail && e.detail.type === "task") return; setTimeout(function () { render(false); }, 0); });
  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest("[data-si-tab]");
    if (t) {
      tab = +t.getAttribute("data-si-tab");
      var sec = t.closest(".si"), id = sec && sec.closest(".jr-card").querySelector("[data-task]").getAttribute("data-task").split(":")[0];
      sec.querySelectorAll(".si-tab").forEach(function (b, i) { b.setAttribute("aria-selected", String(i === tab)); b.tabIndex = i === tab ? 0 : -1; });
      var p = sec.querySelector(".si-p"); p.setAttribute("aria-labelledby", "si-t" + tab); p.innerHTML = panel(infoFor(id));
      return;
    }
    var o = e.target.closest && e.target.closest("[data-qz]");
    if (o && !o.disabled) { var s = o.closest("[data-qz-id]"); answer(s.getAttribute("data-qz-id"), +o.getAttribute("data-qz"), o); }
  });
  // arrow keys move between the tabs
  document.addEventListener("keydown", function (e) {
    var t = e.target.closest && e.target.closest(".si-tab"); if (!t) return;
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    var tabs = Array.prototype.slice.call(t.parentNode.querySelectorAll(".si-tab")), i = tabs.indexOf(t);
    var dir = (e.key === "ArrowRight") !== (document.documentElement.dir === "rtl") ? 1 : -1;
    var n = tabs[(i + dir + tabs.length) % tabs.length]; n.click(); n.focus(); e.preventDefault();
  });

  window.MasarokStepInfo = { info: infoFor, quiz: quizFor, steps: Object.keys(I), quizSteps: Object.keys(Q) };
})();

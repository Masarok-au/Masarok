/* Masarok guide: extra supporting info for each step.
   FAQ (F, with country changes in FC), two more quick-check questions per step (QX, QXC)
   and the tap-to-explain glossary (GL). Read by stepinfo.js. Checked October 2026. */
(function () {
  "use strict";

  // ---------- FAQ: [question, answer], each [en, ar] ----------
  var ENG_F = [
    [["Which English tests are accepted?", "ما اختبارات اللغة المقبولة؟"],
      ["IELTS Academic is accepted almost everywhere. Many universities also take TOEFL iBT, PTE Academic and others. Check your university's entry page, and make sure the test also counts for the scholarship.", "اختبار IELTS الأكاديمي مقبول في كل مكان تقريبًا، وكثير من الجامعات تقبل أيضًا TOEFL iBT وPTE Academic وغيرها. راجع صفحة شروط القبول في جامعتك، وتأكد أن الاختبار معتمد للبعثة أيضًا."]],
    [["How long is my result valid?", "كم مدة صلاحية النتيجة؟"],
      ["Most universities accept results up to 2 years old. Plan your test so it is still valid when you apply.", "تقبل معظم الجامعات النتائج خلال سنتين من تاريخ الاختبار، فخطط لموعد اختبارك بحيث تبقى النتيجة صالحة عند التقديم."]],
    [["I'm short in one band. Do I retake the whole test?", "درجتي ناقصة في مهارة واحدة. هل أعيد الاختبار كاملًا؟"],
      ["IELTS offers a One Skill Retake for the computer test, but not every university accepts it. Ask your university before you book.", "يتيح IELTS إعادة مهارة واحدة (One Skill Retake) في الاختبار المحوسب، لكن ليست كل الجامعات تقبلها، فاسأل جامعتك قبل الحجز."]]
  ];
  var LIST_F = [
    [["Where is the official list?", "أين القائمة الرسمية؟"],
      ["In the Ministry of Education's 2026–2027 university lists (a PDF by field), and in the recommended universities search. Both are linked in this step.", "في قوائم الجامعات 2026–2027 من وزارة التعليم (ملف PDF حسب التخصص)، وفي خدمة البحث عن الجامعات الموصى بها، وكلاهما مرتبط في هذه الخطوة."]],
    [["Does the list change?", "هل تتغير القائمة؟"],
      ["Yes, every year. Always use the latest list, and keep a dated screenshot of your university and field.", "نعم، كل عام. استخدم دائمًا أحدث قائمة، واحتفظ بصورة مؤرخة تظهر فيها جامعتك وتخصصك."]]
  ];
  var F = {
    fieldRoute: [
      [["Can I change my field later?", "هل أستطيع تغيير تخصصي لاحقًا؟"],
        ["It's hard. The scholarship approves a specific major, and any change needs SACM's approval. Choose carefully now.", "صعب، فالبعثة تعتمد تخصصًا محددًا، وأي تغيير يحتاج موافقة الملحقية. اختر بعناية من الآن."]],
      [["Foundation or Diploma: which is better?", "الفاونديشن أم الدبلوم: أيهما أفضل؟"],
        ["Foundation is gentler and leads into first year. A Diploma is faster, leading into second year, but the workload is heavier. Choose by your English and your grades.", "الفاونديشن أسهل ويؤدي إلى السنة الأولى، والدبلوم أسرع ويؤدي إلى السنة الثانية لكن ضغطه أعلى. اختر حسب لغتك ودرجاتك."]]
    ],
    englishF: ENG_F, englishB: ENG_F, englishPg: ENG_F,
    rulesF: [
      [["What if my average is below 90%?", "ماذا لو كان معدلي أقل من 90%؟"],
        ["The Ministry won't sponsor the preparatory year. You can enter directly if you meet the degree's requirements, or study at your own cost and later apply to join the scholarship if you meet its rules.", "لن تبتعثك الوزارة على السنة التحضيرية. يمكنك الالتحاق المباشر إن استوفيت شروط الشهادة، أو الدراسة على حسابك ثم التقديم على الإلحاق بالبعثة إن انطبقت عليك شروطه."]],
      [["When do I need SACM's approval?", "متى أحتاج موافقة الملحقية؟"],
        ["Before you accept an offer. Get written approval for both the pathway program and the degree it leads to.", "قبل أن تقبل أي عرض. احصل على موافقة مكتوبة على برنامج المسار والشهادة التي يؤدي إليها."]]
    ],
    offerF: [
      [["What are progression conditions?", "ما شروط الانتقال؟"],
        ["The grades, and sometimes the English score, you must reach in your pathway year to move into the degree. They are written in your offer letter.", "الدرجات، وأحيانًا درجة اللغة، التي يجب أن تحققها في سنة المسار لتنتقل إلى الشهادة، وهي مكتوبة في خطاب القبول."]],
      [["Should I use an agent?", "هل أستعين بوكيل؟"],
        ["Only one the college approves. Applying directly on the college's website works too, and is often free.", "فقط وكيل معتمد لدى الكلية. والتقديم المباشر من موقع الكلية ممكن أيضًا، وغالبًا مجاني."]]
    ],
    fieldUni: [
      [["Which ranking counts: overall or my field?", "أي تصنيف يُعتمد: العام أم تخصصي؟"],
        ["Your field. The Ministry's lists are by field, so a university can be on the list for one major and not another.", "تصنيف تخصصك، فقوائم الوزارة حسب التخصص، وقد تكون الجامعة مدرجة لتخصص وغير مدرجة لآخر."]],
      LIST_F[0]
    ],
    sat: [
      [["Is the SAT on paper?", "هل اختبار SAT ورقي؟"],
        ["No. The SAT is digital. You take it at a test centre on a laptop or tablet using the Bluebook app.", "لا، فاختبار SAT رقمي، وتقدّمه في مركز اختبار على جهاز محمول أو لوحي عبر تطبيق Bluebook."]],
      [["How do universities get my scores?", "كيف تصل درجاتي إلى الجامعات؟"],
        ["You send them from your College Board account. A few score sends are free when you register, and extra ones cost a fee.", "ترسلها من حسابك في College Board، وبعض الإرسالات مجانية عند التسجيل، والإضافية برسوم."]]
    ],
    courseType: [
      [["Does my master's have to match my bachelor's?", "هل يجب أن يطابق الماجستير تخصص البكالوريوس؟"],
        ["No. The Ministry's FAQ says it does not have to match, but the university may still ask for related study.", "لا، فالأسئلة الشائعة للوزارة تذكر أنه لا يشترط التطابق، لكن قد تطلب الجامعة دراسة سابقة ذات صلة."]],
      [["What if the program is longer than 2 years?", "ماذا لو كان البرنامج أطول من سنتين؟"],
        ["Ask SACM before you apply. The scholarship covers a master's for up to 2 years.", "اسأل الملحقية قبل التقديم، فالبعثة تغطي الماجستير حتى سنتين."]]
    ],
    uniCheckPg: [
      [["My university isn't on the Al-Ruwwad list. Now what?", "جامعتي ليست في قائمة الرواد. ماذا أفعل؟"],
        ["Check the Imdad list for your field. Imdad accepts top 200 universities in fields the job market needs.", "راجع قائمة إمداد لتخصصك، فإمداد يقبل الجامعات ضمن أفضل 200 في التخصصات التي يحتاجها سوق العمل."]],
      LIST_F[1]
    ],
    premaster: [
      [["Does finishing it guarantee my master's place?", "هل إكماله يضمن مقعدي في الماجستير؟"],
        ["Only if your offer says so. Look for a package offer that names the master's and the grade you need.", "فقط إن نص عرضك على ذلك. ابحث عن عرض مشترك يذكر الماجستير والدرجة المطلوبة."]],
      [["Who pays for it?", "من يدفع تكاليفه؟"],
        ["Usually you do. It is not on the list of programs SACM sponsors, unless SACM confirms otherwise in writing.", "أنت عادةً، فهو غير مدرج في البرامج التي تبتعث عليها الملحقية، ما لم تؤكد غير ذلك كتابيًا."]]
    ],
    docs: [
      [["What is equivalency?", "ما المعادلة؟"],
        ["The Ministry of Education's official recognition of a qualification from outside Saudi Arabia. You need it if any of your degrees are from abroad, and it can take weeks.", "اعتراف وزارة التعليم الرسمي بمؤهل من خارج السعودية، وتحتاجها إن كان أي مؤهل لك من الخارج، وقد تستغرق أسابيع."]],
      [["Do I need translations?", "هل أحتاج ترجمة؟"],
        ["If a document is in Arabic, most universities ask for a certified English translation. Ask what they accept before you pay.", "إن كان المستند بالعربية فمعظم الجامعات تطلب ترجمة إنجليزية معتمدة، فاسأل عما تقبله قبل أن تدفع."]]
    ],
    researchArea: [
      [["Where are the priority areas listed?", "أين أجد مجالات الأولوية؟"],
        ["On the Research & Development track page, linked in this step.", "في صفحة مسار البحث والتطوير المرتبطة في هذه الخطوة."]],
      [["Can my topic change later?", "هل يمكن أن يتغير موضوعي لاحقًا؟"],
        ["Topics grow as you read. Keep within your approved area, and tell your supervisor and SACM about big changes.", "المواضيع تتطور مع القراءة، لكن ابقَ ضمن المجال المعتمد، وأخبر مشرفك والملحقية بأي تغيير كبير."]]
    ],
    supervisor: [
      [["How many academics should I email?", "كم أكاديميًا أراسل؟"],
        ["Start with 3 to 5 whose recent work matches yours, each with a personal email.", "ابدأ بثلاثة إلى خمسة تتوافق أبحاثهم الحديثة مع موضوعك، برسالة شخصية لكل منهم."]],
      [["What if nobody replies?", "ماذا لو لم يرد أحد؟"],
        ["Follow up politely after 1 to 2 weeks. You can also ask the university's graduate research office who works in your area.", "تابع بلطف بعد أسبوع أو أسبوعين، ويمكنك أيضًا سؤال مكتب الدراسات العليا في الجامعة عمن يعمل في مجالك."]]
    ],
    uniCheckPhd: LIST_F,
    offer: [
      [["Conditional or unconditional: what's the difference?", "ما الفرق بين القبول المشروط وغير المشروط؟"],
        ["A conditional offer still has things to meet, such as an English score or a document. An unconditional offer has none, and it's the one the Ministry asks for.", "القبول المشروط ما زالت عليه شروط، مثل درجة لغة أو مستند، أما غير المشروط فلا شروط عليه، وهو ما تطلبه الوزارة."]],
      [["Can I apply to more than one university?", "هل أستطيع التقديم على أكثر من جامعة؟"],
        ["Yes, and it's wise. Make sure each one is on the list for your field.", "نعم، وهذا أفضل، بشرط أن تكون كل جامعة مدرجة في قائمة تخصصك."]]
    ],
    qubool: [
      [["When does Qubool open?", "متى تفتح منصة قبول؟"],
        ["In 2026, applications ran from 29 January to 7 May. Follow Qubool and the Ministry's official accounts for the next window.", "في 2026 كان التقديم من 29 يناير إلى 7 مايو. تابع منصة قبول وحسابات الوزارة الرسمية لمعرفة الفترة القادمة."]],
      [["What happens after I apply?", "ماذا يحدث بعد التقديم؟"],
        ["The Ministry reviews applications on merit and available places. If you are nominated, you continue on Safeer for your financial guarantee.", "تراجع الوزارة الطلبات حسب الجدارة والمقاعد المتاحة، وإن رُشحت تكمل عبر منصة سفير لطلب الضمان المالي."]],
      [["I'm already studying at my own cost. Can I join?", "أدرس على حسابي حاليًا. هل أستطيع الانضمام؟"],
        ["Look at the Ministry's \"Join the scholarship\" service for self-funded students, linked in the useful links section.", "اطلع على خدمة الإلحاق بالبعثة للدارسين على حسابهم الخاص، وهي مرتبطة في قسم الروابط المفيدة."]]
    ],
    safeer: [
      [["What is the financial guarantee?", "ما الضمان المالي؟"],
        ["A letter from SACM to your university confirming the scholarship pays your tuition. The university uses it instead of asking you to pay.", "خطاب من الملحقية إلى جامعتك يؤكد أن البعثة تدفع رسومك الدراسية، فتعتمده الجامعة بدل مطالبتك بالدفع."]],
      [["How long does it take?", "كم يستغرق؟"],
        ["It varies. Request it as soon as you're nominated, and send it to your university the day it arrives.", "تختلف المدة، فاطلبه فور ترشيحك، وأرسله لجامعتك يوم وصوله."]]
    ],
    visa: [
      [["When can I arrive in Australia?", "متى أستطيع الوصول إلى أستراليا؟"],
        ["Usually up to 90 days before your course starts.", "عادةً قبل بدء دراستك بـ90 يومًا كحد أقصى."]],
      [["Can I work on a student visa?", "هل أستطيع العمل بتأشيرة الطالب؟"],
        ["Up to 48 hours a fortnight while your course is in session, and unlimited hours in official breaks.", "حتى 48 ساعة كل أسبوعين أثناء الدراسة، ودون حد في الإجازات الرسمية."]],
      [["What is the Genuine Student requirement?", "ما شرط الطالب الحقيقي؟"],
        ["Questions in the visa form about your study plans and circumstances. Answer honestly, in your own words.", "أسئلة في طلب التأشيرة عن خطتك الدراسية وظروفك، فأجب بصدق وبكلماتك."]]
    ],
    housing: [
      [["What is a bond?", "ما تأمين الإيجار (Bond)؟"],
        ["A deposit, usually 4 weeks' rent, held by the state bond authority. You get it back when you leave, minus any damage.", "مبلغ تأمين يساوي عادةً إيجار 4 أسابيع، تحفظه الجهة المختصة في الولاية، ويُعاد إليك عند المغادرة بعد خصم أي أضرار."]],
      [["Room in a share house or my own lease?", "غرفة في سكن مشترك أم عقد باسمي؟"],
        ["A room is quicker and cheaper to start with. Your own lease gives you more control but needs references and more money upfront.", "الغرفة أسرع وأرخص في البداية، والعقد باسمك يمنحك تحكمًا أكبر لكنه يحتاج مراجع ومبلغًا أكبر مقدمًا."]],
      [["How do I avoid scams?", "كيف أتجنب الاحتيال؟"],
        ["Never pay before you have seen the place, in person or on a live video call, and never pay by gift card or crypto.", "لا تدفع أبدًا قبل أن ترى المكان شخصيًا أو بمكالمة فيديو مباشرة، ولا تدفع ببطاقات الهدايا أو العملات الرقمية."]]
    ],
    arrive: [
      [["What should I do in my first week?", "ماذا أفعل في أسبوعي الأول؟"],
        ["Get a SIM, open a bank account, sort out transport, update your address with your university, finish your SACM arrival steps on Safeer, and go to orientation.", "احصل على شريحة جوال، وافتح حسابًا بنكيًا، ورتب المواصلات، وحدّث عنوانك لدى الجامعة، وأكمل خطوات الوصول في سفير، واحضر الأسبوع التعريفي."]],
      [["Do I need a tax file number?", "هل أحتاج رقمًا ضريبيًا (TFN)؟"],
        ["Only if you work. You apply online for free with the Australian Taxation Office.", "فقط إن عملت، وتقدّم عليه إلكترونيًا مجانًا لدى مكتب الضرائب الأسترالي."]]
    ],
    progressF: [
      [["What if I fail a subject?", "ماذا لو رسبت في مادة؟"],
        ["Talk to your college straight away. It can delay your move into the degree, so tell SACM early as well.", "تحدث مع كليتك فورًا، فقد يؤخر ذلك انتقالك إلى الشهادة، وأخبر الملحقية مبكرًا أيضًا."]],
      [["What is credit transfer?", "ما معادلة المواد؟"],
        ["When subjects you passed count towards your degree, so you don't repeat them. Ask about it before your degree starts.", "احتساب المواد التي نجحت فيها ضمن شهادتك حتى لا تعيدها، فاسأل عنها قبل بدء الشهادة."]]
    ]
  };

  // ---------- FAQ country changes ----------
  var PATH = {
    us: ["Usually not. Most Saudi students apply directly. An English or pathway program is possible, but SACM does not pay for English courses.", "عادةً لا، فمعظم الطلاب السعوديين يقدّمون مباشرة. برامج اللغة أو المسارات ممكنة، لكن الملحقية لا تبتعث على دورات اللغة."],
    uk: ["Usually yes. Most UK universities ask Saudi students to do a foundation year first.", "عادةً نعم، فمعظم الجامعات البريطانية تطلب من الطلاب السعوديين سنة تأسيسية أولًا."],
    ca: ["Often not. Many Canadian universities accept the Saudi certificate directly.", "غالبًا لا، فكثير من الجامعات الكندية تقبل الشهادة السعودية مباشرة."],
    de: ["Usually yes: a Studienkolleg, then the Feststellungsprüfung exam.", "عادةً نعم: الكلية التحضيرية (Studienkolleg) ثم اختبار Feststellungsprüfung."],
    sg: ["No. NUS, NTU and SMU have no foundation year, so you apply directly.", "لا، فلا توجد سنة تأسيسية في NUS وNTU وSMU، والتقديم مباشر."]
  };
  function pathQ(cc) { return [["Do I need a pathway year?", "هل أحتاج سنة تحضيرية؟"], PATH[cc]]; }
  var FC = {
    us: {
      fieldRoute: [F.fieldRoute[0], pathQ("us")],
      safeer: [F.safeer[0], [["What is the I-20?", "ما نموذج I-20؟"], ["The form your university issues once it has your guarantee. You need it for the SEVIS fee, the visa and entry to the US. Check every detail on it.", "نموذج تصدره جامعتك بعد استلام الضمان، وتحتاجه لرسوم SEVIS والتأشيرة ودخول أمريكا، فتحقق من كل تفاصيله."]]],
      visa: [
        [["When can I enter the US?", "متى أستطيع دخول أمريكا؟"], ["Up to 30 days before the start date on your I-20.", "قبل تاريخ البدء في نموذج I-20 بـ30 يومًا كحد أقصى."]],
        [["Can I work on an F-1 visa?", "هل أستطيع العمل بتأشيرة F-1؟"], ["On campus, up to 20 hours a week during the semester and full time in official breaks.", "داخل الحرم الجامعي، حتى 20 ساعة أسبوعيًا أثناء الفصل، ودوامًا كاملًا في الإجازات الرسمية."]],
        [["What is the visa integrity fee?", "ما رسوم نزاهة التأشيرة؟"], ["A new US$250 fee that some US embassies now collect when the visa is issued. Follow your embassy's instructions and keep the receipt.", "رسوم جديدة قدرها 250 دولارًا تحصّلها بعض السفارات الأمريكية عند إصدار التأشيرة، فاتبع تعليمات السفارة واحتفظ بالإيصال."]]
      ],
      housing: [
        [["On campus or off campus?", "داخل الحرم أم خارجه؟"], ["Many universities expect first-year students to live on campus. Apply for university housing as soon as you accept your offer.", "كثير من الجامعات تتوقع سكن طلاب السنة الأولى داخل الحرم، فقدّم على سكن الجامعة فور قبولك العرض."]],
        F.housing[2]
      ],
      arrive: [
        [["What do I do first at the university?", "ماذا أفعل أولًا في الجامعة؟"], ["Check in with the international student office. It confirms your arrival in SEVIS.", "سجّل حضورك في مكتب الطلاب الدوليين، فهو يؤكد وصولك في نظام SEVIS."]],
        [["Do I need a Social Security number?", "هل أحتاج رقم الضمان الاجتماعي (SSN)؟"], ["Only if you get a job. Your international office explains how to apply.", "فقط إن حصلت على عمل، ويشرح لك مكتب الطلاب الدوليين طريقة التقديم."]]
      ]
    },
    uk: {
      fieldRoute: [F.fieldRoute[0], pathQ("uk")],
      safeer: [F.safeer[0], [["When do I get my CAS?", "متى أحصل على رقم CAS؟"], ["After your offer is unconditional and your funding is confirmed. Check every detail, because you can only use it once for the visa.", "بعد أن يصبح قبولك غير مشروط ويتأكد تمويلك. تحقق من كل تفاصيله، فلا يُستخدم إلا مرة واحدة للتأشيرة."]]],
      visa: [
        [["When can I apply?", "متى أستطيع التقديم؟"], ["Up to 6 months before your course starts, from outside the UK.", "قبل بدء دراستك بـ6 أشهر كحد أقصى، من خارج بريطانيا."]],
        [["Can I work on a Student visa?", "هل أستطيع العمل بتأشيرة الطالب؟"], ["Degree students can usually work up to 20 hours a week in term time and full time in official vacations.", "طلاب الشهادات يمكنهم عادةً العمل حتى 20 ساعة أسبوعيًا أثناء الدراسة، ودوامًا كاملًا في الإجازات الرسمية."]],
        [["Where is my visa?", "أين تأشيرتي؟"], ["It's an eVisa in your UKVI account. Keep your login safe and update it with any new passport.", "تأشيرتك إلكترونية (eVisa) في حسابك على UKVI، فاحفظ بيانات الدخول وحدّث الحساب بأي جواز جديد."]]
      ],
      housing: [
        [["How is my deposit protected?", "كيف يُحمى التأمين؟"], ["In England, your landlord must put it in a government-approved deposit scheme within 30 days.", "في إنجلترا يجب أن يودعه المؤجر في نظام حماية معتمد حكوميًا خلال 30 يومًا."]],
        [["Do students pay council tax?", "هل يدفع الطلاب ضريبة البلدية (Council tax)؟"], ["Not if everyone in the home is a full-time student. Ask your university for a student exemption certificate.", "لا، إن كان كل من في المسكن طلابًا بدوام كامل، فاطلب من جامعتك شهادة الإعفاء الطلابي."]],
        F.housing[2]
      ],
      arrive: [
        F.arrive[0],
        [["How do I see a doctor?", "كيف أراجع طبيبًا؟"], ["Register with a GP near where you live. The health surcharge you paid gives you NHS access.", "سجّل لدى طبيب عام (GP) قريب من سكنك، فرسوم الخدمات الصحية التي دفعتها تتيح لك خدمات NHS."]]
      ]
    },
    ca: {
      fieldRoute: [F.fieldRoute[0], pathQ("ca")],
      visa: [
        [["What is a PAL?", "ما خطاب PAL؟"], ["A provincial attestation letter. Most students need one for the study permit, and your university helps you get it.", "خطاب تصديق من المقاطعة، يحتاجه معظم الطلاب لتصريح الدراسة، وتساعدك جامعتك في الحصول عليه."]],
        [["Can I work while I study?", "هل أستطيع العمل أثناء الدراسة؟"], ["Usually up to 24 hours a week off campus during classes, and full time in scheduled breaks.", "عادةً حتى 24 ساعة أسبوعيًا خارج الحرم أثناء الدراسة، ودوامًا كاملًا في الإجازات المجدولة."]],
        [["When do I get the permit itself?", "متى أحصل على التصريح نفسه؟"], ["When you land. You show your letter of introduction at the airport, and the officer issues the permit.", "عند وصولك، إذ تقدّم خطاب التعريف في المطار ويصدر الضابط التصريح."]]
      ],
      housing: [F.housing[1], F.housing[2]],
      arrive: [F.arrive[0], [["Do I need a SIN?", "هل أحتاج رقم التأمين الاجتماعي (SIN)؟"], ["Only if you work. You apply for free with Service Canada.", "فقط إن عملت، وتقدّم عليه مجانًا لدى Service Canada."]]]
    },
    de: {
      fieldRoute: [F.fieldRoute[0], pathQ("de")],
      visa: [
        [["Do I need a blocked account?", "هل أحتاج حسابًا مغلقًا؟"], ["Scholarship holders can usually show SACM's scholarship letter instead. Ask the embassy what it accepts.", "يستطيع المبتعث عادةً تقديم خطاب البعثة من الملحقية بدلًا منه، فاسأل السفارة عما تقبله."]],
        [["What happens after I arrive?", "ماذا بعد الوصول؟"], ["Register your address (Anmeldung) within 14 days, then apply for your residence permit before your visa ends.", "سجّل عنوانك (Anmeldung) خلال 14 يومًا، ثم قدّم على تصريح الإقامة قبل انتهاء التأشيرة."]],
        [["Can I work as a student?", "هل أستطيع العمل كطالب؟"], ["Up to 140 full days or 280 half days a year.", "حتى 140 يومًا كاملًا أو 280 نصف يوم في السنة."]]
      ],
      housing: [
        [["What is a WG?", "ما الـWG؟"], ["A shared flat (Wohngemeinschaft). It's the most common and cheapest way students live.", "شقة مشتركة (Wohngemeinschaft)، وهي الطريقة الأشهر والأرخص لسكن الطلاب."]],
        [["What about student halls?", "وماذا عن السكن الطلابي؟"], ["The Studierendenwerk runs low-cost halls. Waiting lists are long, so apply as soon as you have your admission.", "تدير مؤسسة Studierendenwerk سكنًا طلابيًا منخفض التكلفة، وقوائم الانتظار طويلة، فقدّم فور حصولك على القبول."]],
        F.housing[2]
      ],
      arrive: [
        [["What is the Anmeldung?", "ما الـAnmeldung؟"], ["Registering your address at the citizens' office (Bürgeramt) within 14 days of moving in. You need your landlord's confirmation.", "تسجيل عنوانك في مكتب المواطنين (Bürgeramt) خلال 14 يومًا من سكنك، وتحتاج تأكيد المؤجر."]],
        F.arrive[0]
      ]
    },
    sg: {
      fieldRoute: [F.fieldRoute[0], pathQ("sg")],
      visa: [
        [["How do I apply for the Student's Pass?", "كيف أقدّم على بطاقة الطالب؟"], ["Your university registers you on SOLAR. Then you complete eForm 16 and pay the processing fee within 7 days.", "تسجلك جامعتك في نظام SOLAR، ثم تُكمل نموذج eForm 16 وتدفع رسوم المعالجة خلال 7 أيام."]],
        [["When do I collect the pass?", "متى أستلم البطاقة؟"], ["After you arrive, at an appointment with ICA to complete the formalities in person.", "بعد وصولك، في موعد لدى هيئة الهجرة (ICA) لإكمال الإجراءات حضوريًا."]],
        [["Can I work while I study?", "هل أستطيع العمل أثناء الدراسة؟"], ["Full-time students at approved universities can usually work up to 16 hours a week in term time.", "طلاب الدوام الكامل في الجامعات المعتمدة يمكنهم عادةً العمل حتى 16 ساعة أسبوعيًا أثناء الدراسة."]]
      ],
      housing: [
        [["Can I live on campus?", "هل أستطيع السكن في الحرم الجامعي؟"], ["NUS, NTU and SMU have halls and residences. Apply through your university as early as possible.", "لدى NUS وNTU وSMU سكن طلابي، فقدّم عن طريق جامعتك في أقرب وقت."]],
        F.housing[2]
      ],
      arrive: [F.arrive[0]]
    }
  };
  // countries outside the six get neutral answers for the Australia-only ones
  var FG = {
    visa: [[["When should I apply?", "متى أقدّم؟"], ["As soon as you have your enrolment document from the university. Check the embassy's processing times first.", "فور حصولك على مستند التسجيل من الجامعة، وراجع مدد المعالجة في السفارة أولًا."]],
      [["Can I work on a student visa?", "هل أستطيع العمل بتأشيرة الطالب؟"], ["It depends on the country. Read your visa conditions before you take any job.", "يختلف حسب الدولة، فاقرأ شروط تأشيرتك قبل قبول أي عمل."]]],
    housing: [F.housing[1], F.housing[2]],
    arrive: [F.arrive[0]],
    fieldRoute: [F.fieldRoute[0]]
  };
  // Germany: the language step is about German
  FC.de.englishF = [
    [["Which German level do I need?", "ما مستوى الألمانية المطلوب؟"], ["Most Studienkollegs ask for about B1 to B2. Check the exact level and the certificates your Studienkolleg accepts.", "معظم الكليات التحضيرية تطلب B1 إلى B2 تقريبًا، فتحقق من المستوى والشهادات التي تقبلها كليتك."]],
    [["Does SACM pay for German courses?", "هل تدفع الملحقية تكاليف دورات الألمانية؟"], ["No. SACM does not sponsor language courses, so plan to reach the level at your own cost.", "لا، فالملحقية لا تبتعث على دورات اللغة، فخطط للوصول إلى المستوى على حسابك."]]
  ];

  // ---------- two more quick checks per step ----------
  function q(qq, o, a, x) { return { q: qq, o: o, a: a, x: x }; }
  var NO_ENG = q(["Does SACM pay for English courses?", "هل تبتعث الملحقية على دورات اللغة؟"], [["Yes", "نعم"], ["No", "لا"], ["Only for one term", "لفصل واحد فقط"]], 1, ["No, so reaching your score before you apply saves you money.", "لا، لذلك فإن تحقيق درجتك قبل التقديم يوفر عليك المال."]);
  var VALID = q(["For how long do most universities accept an IELTS result?", "ما المدة التي تقبل فيها معظم الجامعات نتيجة IELTS؟"], [["6 months", "6 أشهر"], ["2 years", "سنتان"], ["Forever", "دائمًا"]], 1, ["Up to 2 years from the test date.", "حتى سنتين من تاريخ الاختبار."]);
  var BANDS = q(["What else should you check besides the overall score?", "ماذا تتحقق منه غير الدرجة الكلية؟"], [["The minimum for each band", "الحد الأدنى لكل مهارة"], ["The test centre's rating", "تقييم مركز الاختبار"], ["Nothing else", "لا شيء آخر"]], 0, ["Many programs set a minimum for each band, such as writing.", "كثير من البرامج تضع حدًا أدنى لكل مهارة، مثل الكتابة."]);
  var LATEST = q(["Which university list should you use?", "أي قائمة جامعات تعتمد؟"], [["The latest year's list", "قائمة العام الأحدث"], ["Any list from the last 5 years", "أي قائمة من آخر 5 سنوات"], ["A friend's list", "قائمة صديق"]], 0, ["The lists change every year, so use the newest one.", "القوائم تتغير كل عام، فاعتمد أحدثها."]);
  var BYFIELD = q(["The Ministry's university lists are organised by…", "قوائم الوزارة للجامعات مرتبة حسب…"], [["City", "المدينة"], ["Field of study", "التخصص"], ["Tuition fee", "الرسوم الدراسية"]], 1, ["By field, so a university can be listed for one major and not another.", "حسب التخصص، فقد تكون الجامعة مدرجة لتخصص وغير مدرجة لآخر."]);
  var SCAM = q(["How should you never pay for a rental?", "بأي طريقة لا تدفع أبدًا للإيجار؟"], [["Gift cards or crypto", "بطاقات الهدايا أو العملات الرقمية"], ["A bank transfer after signing a contract", "تحويل بنكي بعد توقيع العقد"], ["Through the official bond service", "عبر خدمة التأمين الرسمية"]], 0, ["Gift cards and crypto are what scammers ask for.", "بطاقات الهدايا والعملات الرقمية هي ما يطلبه المحتالون."]);
  var ADDR = q(["Why update your address with your university?", "لماذا تحدّث عنوانك لدى الجامعة؟"], [["Student visa holders must keep it up to date", "لأن حاملي تأشيرة الطالب ملزمون بتحديثه"], ["To get a discount", "للحصول على خصم"], ["It's optional", "أمر اختياري"]], 0, ["It's a visa condition, and the university uses it to reach you.", "هو من شروط التأشيرة، والجامعة تتواصل معك عبره."]);
  var GUAR = q(["What does SACM's financial guarantee tell your university?", "ماذا يقول الضمان المالي من الملحقية لجامعتك؟"], [["That the scholarship pays your tuition", "أن البعثة تدفع رسومك الدراسية"], ["That you passed IELTS", "أنك اجتزت IELTS"], ["That you have a visa", "أن لديك تأشيرة"]], 0, ["So the university doesn't ask you to pay the tuition yourself.", "حتى لا تطالبك الجامعة بدفع الرسوم بنفسك."]);
  var GUAR_WHEN = q(["When should you request your guarantee letter?", "متى تطلب خطاب الضمان؟"], [["As soon as you are nominated", "فور ترشيحك"], ["After you arrive", "بعد وصولك"], ["A week before classes", "قبل الدراسة بأسبوع"]], 0, ["Early, then send it to your university the day it arrives.", "مبكرًا، ثم أرسله لجامعتك يوم وصوله."]);
  var NOFLY = q(["When should you book your flights?", "متى تحجز الطيران؟"], [["After your visa is granted", "بعد صدور التأشيرة"], ["Before you apply for the visa", "قبل التقديم على التأشيرة"], ["Any time", "في أي وقت"]], 0, ["Visa times change, so wait for the grant.", "مدد التأشيرات تتغير، فانتظر صدورها."]);
  var SAFEER_ARR = q(["In your first week, which platform do you update with your arrival?", "في أسبوعك الأول، أي منصة تحدّثها بوصولك؟"], [["Safeer", "سفير"], ["Qubool", "قبول"], ["Nafath", "نفاذ"]], 0, ["Safeer handles your scholarship once you are abroad.", "منصة سفير تتابع ابتعاثك بعد سفرك."]);
  var ORIENT = q(["Why go to orientation week?", "لماذا تحضر الأسبوع التعريفي؟"], [["To meet people and learn the university's systems", "للتعرف على الناس وأنظمة الجامعة"], ["It replaces your first exam", "لأنه يعوض اختبارك الأول"], ["To collect your visa", "لاستلام تأشيرتك"]], 0, ["It's the easiest week to make friends and get set up.", "أسهل أسبوع لتكوين الصداقات وترتيب أمورك."]);

  var QX = {
    fieldRoute: [
      q(["Where should you check that your field is approved?", "أين تتحقق من أن تخصصك معتمد؟"], [["The Ministry's university lists", "قوائم الجامعات من الوزارة"], ["Social media posts", "منشورات التواصل الاجتماعي"], ["A university brochure", "كتيّب الجامعة"]], 0, ["Only the Ministry's lists decide what the scholarship funds.", "قوائم الوزارة وحدها تحدد ما تموله البعثة."]),
      q(["Who must approve a change of major after you're sponsored?", "من يجب أن يوافق على تغيير التخصص بعد الابتعاث؟"], [["SACM", "الملحقية"], ["Nobody", "لا أحد"], ["Only your university", "الجامعة فقط"]], 0, ["SACM approves a specific major, so any change needs its approval.", "الملحقية تعتمد تخصصًا محددًا، فأي تغيير يحتاج موافقتها."])
    ],
    englishF: [VALID, BANDS], englishB: [VALID, BANDS], englishPg: [VALID, BANDS],
    rulesF: [
      q(["When do you need SACM's approval of your pathway?", "متى تحتاج موافقة الملحقية على المسار؟"], [["Before you accept the offer", "قبل قبول العرض"], ["After your first term", "بعد الفصل الأول"], ["Never", "لا تحتاجها"]], 0, ["Get written approval of the pathway and the degree before you accept.", "احصل على موافقة مكتوبة على المسار والشهادة قبل القبول."]),
      LATEST
    ],
    offerF: [
      q(["What are progression conditions?", "ما شروط الانتقال؟"], [["Grades you must reach to move into the degree", "درجات يجب تحقيقها للانتقال إلى الشهادة"], ["Rules for your flat", "قواعد السكن"], ["Visa fees", "رسوم التأشيرة"]], 0, ["They're written in your offer letter, so read them closely.", "هي مكتوبة في خطاب القبول، فاقرأها بعناية."]),
      q(["Should you pay a tuition deposit before your scholarship is confirmed?", "هل تدفع عربون الرسوم قبل تأكيد ابتعاثك؟"], [["Yes, straight away", "نعم، فورًا"], ["No, ask first", "لا، اسأل أولًا"], ["Only in cash", "نقدًا فقط"]], 1, ["Sponsored students usually send SACM's guarantee letter instead.", "يرسل المبتعثون عادةً خطاب الضمان من الملحقية بدلًا منه."])
    ],
    fieldUni: [BYFIELD, LATEST],
    sat: [
      q(["How is the SAT taken today?", "كيف يُقدَّم اختبار SAT اليوم؟"], [["On paper", "ورقيًا"], ["Digitally, at a test centre", "رقميًا في مركز اختبار"], ["At home online", "من المنزل عبر الإنترنت"]], 1, ["It's digital, on the Bluebook app at a test centre.", "رقمي، عبر تطبيق Bluebook في مركز اختبار."]),
      q(["Which ID do test centres outside the US accept?", "ما الهوية التي تقبلها مراكز الاختبار خارج أمريكا؟"], [["Your passport", "جواز السفر"], ["A student card", "بطاقة الطالب"], ["A photo on your phone", "صورة في جوالك"]], 0, ["Your passport, and the name must match your registration.", "جواز السفر، ويجب أن يطابق الاسم اسم التسجيل."])
    ],
    courseType: [
      q(["Does your master's have to match your bachelor's field?", "هل يجب أن يطابق الماجستير تخصص البكالوريوس؟"], [["Yes, always", "نعم، دائمًا"], ["No, according to the Ministry's FAQ", "لا، حسب الأسئلة الشائعة للوزارة"], ["Only for PhDs", "للدكتوراه فقط"]], 1, ["It doesn't have to match, but the university may ask for related study.", "لا يُشترط التطابق، لكن قد تطلب الجامعة دراسة ذات صلة."]),
      q(["What is a research master's mostly made of?", "مما يتكون ماجستير البحث في الغالب؟"], [["A thesis with a supervisor", "رسالة مع مشرف"], ["Only exams", "اختبارات فقط"], ["An internship", "تدريب عملي"]], 0, ["A coursework master's is classes and exams instead.", "أما ماجستير المقررات فهو محاضرات واختبارات."])
    ],
    uniCheckPg: [
      q(["If your university isn't on the Al-Ruwwad list, what do you check next?", "إن لم تكن جامعتك في قائمة الرواد، ماذا تراجع بعدها؟"], [["The Imdad list for your field", "قائمة إمداد لتخصصك"], ["Nothing, give up", "لا شيء، استسلم"], ["Last year's list", "قائمة العام الماضي"]], 0, ["Imdad covers top 200 universities in fields the job market needs.", "إمداد يشمل الجامعات ضمن أفضل 200 في التخصصات التي يحتاجها سوق العمل."]),
      BYFIELD
    ],
    premaster: [
      q(["What should your pre-master's offer ideally include?", "ماذا يُفضَّل أن يتضمن عرض ما قبل الماجستير؟"], [["The master's it leads to and the grade you need", "الماجستير الذي يؤدي إليه والدرجة المطلوبة"], ["A housing discount", "خصم على السكن"], ["Nothing more", "لا شيء آخر"]], 0, ["A package offer makes your path into the master's clear.", "العرض المشترك يوضح طريقك إلى الماجستير."]),
      NO_ENG
    ],
    docs: [
      q(["What is equivalency?", "ما المعادلة؟"], [["Official recognition of a qualification from abroad", "اعتراف رسمي بمؤهل من الخارج"], ["A type of visa", "نوع من التأشيرات"], ["An English test", "اختبار لغة"]], 0, ["The Ministry of Education issues it, and it can take weeks.", "تصدرها وزارة التعليم، وقد تستغرق أسابيع."]),
      q(["Your documents should spell your name…", "يجب أن يُكتب اسمك في المستندات…"], [["The same way on every document", "بالطريقة نفسها في كل المستندات"], ["Any way you like", "بأي طريقة"], ["Only in Arabic", "بالعربية فقط"]], 0, ["Different spellings cause delays with universities and visas.", "اختلاف الكتابة يسبب تأخيرًا مع الجامعات والتأشيرات."])
    ],
    researchArea: [
      q(["Your PhD topic should fit…", "يجب أن يتوافق موضوع الدكتوراه مع…"], [["A national research priority area", "مجال من مجالات الأولوية البحثية الوطنية"], ["Any topic you like", "أي موضوع تريده"], ["Your bachelor's thesis only", "رسالة البكالوريوس فقط"]], 0, ["The Research & Development track is for national priority areas.", "مسار البحث والتطوير مخصص لمجالات الأولوية الوطنية."]),
      q(["How long should a first research proposal be?", "كم طول المقترح البحثي الأول؟"], [["About 2 pages", "صفحتان تقريبًا"], ["50 pages", "50 صفحة"], ["One line", "سطر واحد"]], 0, ["Short and clear is best for a first contact.", "القصير الواضح أفضل في التواصل الأول."])
    ],
    supervisor: [
      q(["If a possible supervisor doesn't reply, you should…", "إن لم يرد المشرف المحتمل، عليك…"], [["Follow up politely after 1 to 2 weeks", "المتابعة بلطف بعد أسبوع أو أسبوعين"], ["Email them every day", "مراسلته كل يوم"], ["Give up on the university", "التخلي عن الجامعة"]], 0, ["Academics are busy, and a polite follow-up is normal.", "الأكاديميون مشغولون، والمتابعة اللطيفة أمر طبيعي."]),
      q(["Before writing to an academic, you should…", "قبل مراسلة أكاديمي، عليك…"], [["Read their recent papers", "قراءة أبحاثه الحديثة"], ["Send your passport", "إرسال جوازك"], ["Ask about the salary", "السؤال عن الراتب"]], 0, ["It shows your idea really fits their work.", "يُظهر أن فكرتك تتوافق فعلًا مع أبحاثه."])
    ],
    uniCheckPhd: [BYFIELD, LATEST],
    offer: [
      q(["What is a conditional offer?", "ما القبول المشروط؟"], [["An offer with things you still need to meet", "قبول ما زالت عليه شروط"], ["A full scholarship", "منحة كاملة"], ["A rejection", "رفض"]], 0, ["Meet the conditions, then ask for the unconditional offer.", "استوفِ الشروط ثم اطلب القبول غير المشروط."]),
      q(["Can you apply to more than one university?", "هل تستطيع التقديم على أكثر من جامعة؟"], [["Yes, if each is on the list for your field", "نعم، إن كانت كل جامعة مدرجة لتخصصك"], ["No, only one", "لا، جامعة واحدة فقط"], ["Only after you arrive", "فقط بعد الوصول"]], 0, ["A backup on the list is a smart move.", "الخيار الاحتياطي من القائمة خطوة ذكية."])
    ],
    qubool: [
      q(["In 2026, when did Qubool applications close?", "في 2026، متى أغلق التقديم في منصة قبول؟"], [["7 May", "7 مايو"], ["1 January", "1 يناير"], ["31 December", "31 ديسمبر"]], 0, ["The 2026 window ran from 29 January to 7 May.", "كانت فترة 2026 من 29 يناير إلى 7 مايو."]),
      q(["After you're nominated, where do you go next?", "بعد ترشيحك، إلى أين تتجه؟"], [["Safeer, for your financial guarantee", "منصة سفير لطلب الضمان المالي"], ["The airport", "المطار"], ["Qubool again", "منصة قبول مرة أخرى"]], 0, ["Safeer is where you request the guarantee letter.", "في منصة سفير تطلب خطاب الضمان."])
    ],
    safeer: [GUAR, GUAR_WHEN],
    visa: [
      q(["What do you need from your university before you apply for a student visa?", "ماذا تحتاج من جامعتك قبل التقديم على تأشيرة الطالب؟"], [["Your enrolment document", "مستند التسجيل"], ["A library card", "بطاقة المكتبة"], ["Your timetable", "جدولك الدراسي"]], 0, ["Each country has its own: CoE, CAS, I-20 and so on.", "لكل دولة مستندها: CoE وCAS وI-20 وغيرها."]),
      NOFLY
    ],
    housing: [
      q(["What should you do on move-in day?", "ماذا تفعل يوم استلام السكن؟"], [["Take photos of the room", "تصوير الغرفة"], ["Pay extra rent", "دفع إيجار إضافي"], ["Nothing", "لا شيء"]], 0, ["Photos protect your deposit when you leave.", "الصور تحمي مبلغ التأمين عند المغادرة."]),
      SCAM
    ],
    arrive: [SAFEER_ARR, ORIENT],
    progressF: [
      q(["What is credit transfer?", "ما معادلة المواد؟"], [["Counting passed subjects towards your degree", "احتساب المواد المنجزة ضمن شهادتك"], ["Moving money to a new bank", "تحويل المال إلى بنك جديد"], ["Changing universities", "تغيير الجامعة"]], 0, ["Ask about it before your degree starts.", "اسأل عنها قبل بدء الشهادة."]),
      q(["If you fail a subject in your pathway year, you should…", "إن رسبت في مادة في سنة المسار، عليك…"], [["Talk to your college and tell SACM early", "التحدث مع الكلية وإخبار الملحقية مبكرًا"], ["Hide it", "إخفاء الأمر"], ["Wait until the end of the year", "الانتظار حتى نهاية العام"]], 0, ["Early action can stop a delay to your degree.", "التصرف المبكر قد يمنع تأخر انتقالك."])
    ]
  };

  // country versions of the visa, housing and arrival questions
  var QXC = {
    au: {
      visa: [
        q(["How much is the Australian student visa (subclass 500) from 1 July 2026?", "كم رسوم تأشيرة الطالب الأسترالية (الفئة 500) منذ 1 يوليو 2026؟"], [["A$710", "710 دولارات أسترالية"], ["A$1,600", "1,600 دولار أسترالي"], ["A$2,500", "2,500 دولار أسترالي"]], 2, ["It went up from A$2,000 to A$2,500 on 1 July 2026.", "ارتفعت من 2,000 إلى 2,500 دولار أسترالي في 1 يوليو 2026."]),
        q(["How many hours can you work while your course is in session?", "كم ساعة تستطيع العمل أثناء الدراسة؟"], [["48 hours a fortnight", "48 ساعة كل أسبوعين"], ["None", "لا يُسمح"], ["Unlimited", "دون حد"]], 0, ["And unlimited hours in official breaks.", "ودون حد في الإجازات الرسمية."])
      ],
      housing: [
        q(["In Australia, a bond is usually…", "في أستراليا، تأمين الإيجار عادةً…"], [["4 weeks' rent", "إيجار 4 أسابيع"], ["1 year's rent", "إيجار سنة"], ["Nothing", "لا شيء"]], 0, ["It's held by the state bond authority, not the landlord.", "تحفظه الجهة المختصة في الولاية وليس المؤجر."]),
        SCAM
      ],
      arrive: [
        q(["When do you need a tax file number (TFN)?", "متى تحتاج رقمًا ضريبيًا (TFN)؟"], [["If you work", "إن عملت"], ["To enter Australia", "لدخول أستراليا"], ["To open Safeer", "لفتح سفير"]], 0, ["You apply for free online with the ATO.", "تقدّم عليه مجانًا إلكترونيًا لدى مكتب الضرائب."]),
        ADDR
      ]
    },
    us: {
      visa: [
        q(["How early can you enter the US before your I-20 start date?", "كم يومًا قبل تاريخ البدء في I-20 تستطيع دخول أمريكا؟"], [["Up to 30 days", "حتى 30 يومًا"], ["Up to 6 months", "حتى 6 أشهر"], ["Any time", "في أي وقت"]], 0, ["Arriving earlier than 30 days can cause problems at the border.", "الوصول قبل ذلك قد يسبب مشكلات في المنفذ."]),
        q(["Which form do you fill in online for the F-1 visa?", "ما النموذج الذي تعبئه إلكترونيًا لتأشيرة F-1؟"], [["DS-160", "DS-160"], ["eForm 16", "eForm 16"], ["I-901", "I-901"]], 0, ["The DS-160. I-901 is the SEVIS fee form.", "نموذج DS-160، أما I-901 فهو نموذج رسوم SEVIS."])
      ],
      housing: [
        q(["Many US universities expect first-year students to…", "كثير من الجامعات الأمريكية تتوقع من طلاب السنة الأولى…"], [["Live on campus", "السكن داخل الحرم"], ["Buy a house", "شراء منزل"], ["Live with a host family", "السكن مع عائلة"]], 0, ["Apply for university housing as soon as you accept.", "قدّم على سكن الجامعة فور قبول العرض."]),
        SCAM
      ],
      arrive: [
        q(["Who confirms your arrival in SEVIS?", "من يؤكد وصولك في نظام SEVIS؟"], [["Your university's international office", "مكتب الطلاب الدوليين في جامعتك"], ["The airline", "شركة الطيران"], ["Your landlord", "المؤجر"]], 0, ["So check in with them in your first days.", "لذلك سجّل حضورك لديهم في أيامك الأولى."]),
        SAFEER_ARR
      ]
    },
    uk: {
      visa: [
        q(["How early can you apply for a UK Student visa from outside the UK?", "كم مبكرًا تستطيع التقديم على تأشيرة الطالب البريطانية من خارج بريطانيا؟"], [["Up to 6 months before your course", "قبل الدراسة بـ6 أشهر كحد أقصى"], ["Up to 2 years before", "قبلها بسنتين"], ["Only after you arrive", "بعد الوصول فقط"]], 0, ["Decisions usually take about 3 weeks.", "يصدر القرار عادةً خلال 3 أسابيع تقريبًا."]),
        q(["Where is your UK visa kept?", "أين تُحفظ تأشيرتك البريطانية؟"], [["As an eVisa in your UKVI account", "تأشيرة إلكترونية في حساب UKVI"], ["As a sticker only", "ملصق في الجواز فقط"], ["At the university", "في الجامعة"]], 0, ["Keep your UKVI login safe.", "احفظ بيانات الدخول إلى حساب UKVI."])
      ],
      housing: [
        q(["Do full-time students pay council tax?", "هل يدفع طلاب الدوام الكامل ضريبة البلدية؟"], [["Not if everyone in the home is a full-time student", "لا، إن كان كل السكان طلابًا بدوام كامل"], ["Yes, always double", "نعم، ومضاعفة"], ["Only in London", "في لندن فقط"]], 0, ["Ask your university for an exemption certificate.", "اطلب شهادة الإعفاء من جامعتك."]),
        SCAM
      ],
      arrive: [
        q(["Who should you register with to see a doctor?", "لدى من تسجّل لمراجعة الطبيب؟"], [["A GP near where you live", "طبيب عام (GP) قريب من سكنك"], ["Your landlord", "المؤجر"], ["The embassy", "السفارة"]], 0, ["The health surcharge gives you NHS access.", "رسوم الخدمات الصحية تتيح لك خدمات NHS."]),
        SAFEER_ARR
      ]
    },
    ca: {
      visa: [
        q(["What does PAL stand for?", "ماذا يعني PAL؟"], [["Provincial attestation letter", "خطاب تصديق من المقاطعة"], ["Passport arrival letter", "خطاب وصول الجواز"], ["Personal allowance letter", "خطاب المخصص الشخصي"]], 0, ["Most students need one for the study permit.", "يحتاجه معظم الطلاب لتصريح الدراسة."]),
        q(["How many hours can most students work off campus during classes?", "كم ساعة يستطيع معظم الطلاب العمل خارج الحرم أثناء الدراسة؟"], [["Up to 24 a week", "حتى 24 ساعة أسبوعيًا"], ["None", "لا يُسمح"], ["Up to 60 a week", "حتى 60 ساعة أسبوعيًا"]], 0, ["And full time in scheduled breaks.", "ودوامًا كاملًا في الإجازات المجدولة."])
      ],
      housing: [SCAM, q(["Which province doesn't allow rental deposits?", "أي مقاطعة لا تسمح بتأمين الإيجار؟"], [["Quebec", "كيبيك"], ["Ontario", "أونتاريو"], ["Alberta", "ألبرتا"]], 0, ["Ontario allows only last month's rent.", "أونتاريو تسمح بإيجار الشهر الأخير فقط."])],
      arrive: [
        q(["When do you need a SIN?", "متى تحتاج رقم SIN؟"], [["If you work", "إن عملت"], ["To board the plane", "لركوب الطائرة"], ["To open Safeer", "لفتح سفير"]], 0, ["Service Canada issues it for free.", "تصدره Service Canada مجانًا."]),
        SAFEER_ARR
      ]
    },
    de: {
      visa: [
        q(["After arriving, what must you do within 14 days?", "بعد الوصول، ماذا يجب أن تفعل خلال 14 يومًا؟"], [["Register your address (Anmeldung)", "تسجيل عنوانك (Anmeldung)"], ["Sit an exam", "تقديم اختبار"], ["Buy a car", "شراء سيارة"]], 0, ["Then apply for your residence permit.", "ثم قدّم على تصريح الإقامة."]),
        q(["How much is the German national visa fee?", "كم رسوم التأشيرة الوطنية الألمانية؟"], [["€75", "75 يورو"], ["€500", "500 يورو"], ["Free", "مجانية"]], 0, ["Paid in riyals at the embassy or consulate.", "تُدفع بالريال في السفارة أو القنصلية."])
      ],
      housing: [
        q(["What is a WG?", "ما الـWG؟"], [["A shared flat", "شقة مشتركة"], ["A train ticket", "تذكرة قطار"], ["A university exam", "اختبار جامعي"]], 0, ["Short for Wohngemeinschaft, the most common student home.", "اختصار Wohngemeinschaft، وهو أشهر سكن للطلاب."]),
        SCAM
      ],
      arrive: [
        q(["Where do you do your Anmeldung?", "أين تسجّل عنوانك (Anmeldung)؟"], [["At the citizens' office (Bürgeramt)", "في مكتب المواطنين (Bürgeramt)"], ["At the airport", "في المطار"], ["At the university library", "في مكتبة الجامعة"]], 0, ["Bring your landlord's confirmation.", "أحضر تأكيد المؤجر."]),
        SAFEER_ARR
      ]
    },
    sg: {
      visa: [
        q(["Within how many days must you pay the Student's Pass processing fee?", "خلال كم يومًا يجب دفع رسوم معالجة بطاقة الطالب؟"], [["7 days", "7 أيام"], ["30 days", "30 يومًا"], ["6 months", "6 أشهر"]], 0, ["After you submit eForm 16.", "بعد تقديم نموذج eForm 16."]),
        q(["Where do you complete your Student's Pass formalities?", "أين تُكمل إجراءات بطاقة الطالب؟"], [["In person at ICA after you arrive", "حضوريًا في هيئة الهجرة (ICA) بعد الوصول"], ["At the Saudi airport", "في المطار السعودي"], ["By post", "بالبريد"]], 0, ["Book the appointment before you fly.", "احجز الموعد قبل السفر."])
      ],
      housing: [SCAM, q(["Where do you apply for a campus hall at NUS, NTU or SMU?", "أين تقدّم على السكن الجامعي في NUS أو NTU أو SMU؟"], [["Through your university", "عن طريق جامعتك"], ["At ICA", "في هيئة الهجرة"], ["At the embassy", "في السفارة"]], 0, ["Apply as early as possible.", "قدّم في أقرب وقت."])],
      arrive: [SAFEER_ARR, ORIENT]
    }
  };
  QXC.de.englishF = [
    q(["Does SACM pay for German language courses?", "هل تدفع الملحقية تكاليف دورات الألمانية؟"], [["Yes", "نعم"], ["No", "لا"], ["Only the first month", "الشهر الأول فقط"]], 1, ["SACM does not sponsor language courses.", "الملحقية لا تبتعث على دورات اللغة."]),
    q(["Which exam ends the Studienkolleg?", "ما الاختبار الذي تنتهي به الكلية التحضيرية؟"], [["Feststellungsprüfung", "Feststellungsprüfung"], ["SAT", "SAT"], ["IELTS", "IELTS"]], 0, ["Passing it lets you start your bachelor's.", "اجتيازه يتيح لك بدء البكالوريوس."])
  ];
  // non-Australian pathway questions for the first step
  ["us", "uk", "ca", "de", "sg"].forEach(function (cc) {
    QXC[cc].fieldRoute = [QX.fieldRoute[0], QX.fieldRoute[1]];
  });

  // ---------- glossary: tap a term to see what it means ----------
  // m: [English pattern, Arabic pattern], t: name, d: meaning
  var GL = {
    coe: { m: [/\bCoE\b/, /\bCoE\b/], t: ["CoE", "CoE"], d: ["Confirmation of Enrolment. Australia's proof that you are enrolled. You need it for the student visa.", "إثبات التسجيل في أستراليا، وتحتاجه لتأشيرة الطالب."] },
    cas: { m: [/\bCAS\b/, /\bCAS\b/], t: ["CAS", "CAS"], d: ["Confirmation of Acceptance for Studies. The UK university's reference number for your Student visa. It can be used only once.", "رقم تأكيد القبول للدراسة من الجامعة البريطانية لتأشيرة الطالب، ولا يُستخدم إلا مرة واحدة."] },
    i20: { m: [/\bI-20\b/, /\bI-20\b/], t: ["I-20", "I-20"], d: ["The US form your university issues after it has your financial guarantee. You need it for the SEVIS fee, the F-1 visa and entry.", "النموذج الأمريكي الذي تصدره جامعتك بعد استلام الضمان المالي، وتحتاجه لرسوم SEVIS وتأشيرة F-1 والدخول."] },
    sevis: { m: [/\bSEVIS\b/, /\bSEVIS\b/], t: ["SEVIS", "SEVIS"], d: ["The US system that tracks international students. You pay the I-901 SEVIS fee (US$350) before your visa interview.", "النظام الأمريكي لمتابعة الطلاب الدوليين، وتدفع رسوم I-901 SEVIS (350 دولارًا) قبل مقابلة التأشيرة."] },
    ds160: { m: [/\bDS-160\b/, /\bDS-160\b/], t: ["DS-160", "DS-160"], d: ["The online application form for a US visa.", "نموذج طلب التأشيرة الأمريكية الإلكتروني."] },
    f1: { m: [/\bF-1\b/, /\bF-1\b/], t: ["F-1", "F-1"], d: ["The US student visa for full-time study.", "تأشيرة الطالب الأمريكية للدراسة بدوام كامل."] },
    oshc: { m: [/\bOSHC\b/, /\bOSHC\b/], t: ["OSHC", "OSHC"], d: ["Overseas Student Health Cover. Health insurance you must hold for your whole Australian student visa.", "التأمين الصحي للطلاب الدوليين في أستراليا، ويجب أن يغطي كامل مدة التأشيرة."] },
    ihs: { m: [/health surcharge/i, /رسوم الخدمات الصحية|رسوم الصحة للهجرة/], t: ["Immigration health surcharge", "رسوم الخدمات الصحية"], d: ["A yearly fee (£776 for students) paid with a UK visa. It gives you NHS healthcare.", "رسوم سنوية (776 جنيهًا للطلاب) تُدفع مع التأشيرة البريطانية، وتتيح لك خدمات NHS الصحية."] },
    atas: { m: [/\bATAS\b/, /\bATAS\b/], t: ["ATAS", "ATAS"], d: ["Academic Technology Approval Scheme. A UK certificate some science and engineering master's and PhD students need before the visa.", "شهادة بريطانية يحتاجها بعض طلاب الماجستير والدكتوراه في العلوم والهندسة قبل التأشيرة."] },
    pal: { m: [/\bPAL\b/, /\bPAL\b/], t: ["PAL", "PAL"], d: ["Provincial attestation letter. Most students need one for a Canadian study permit.", "خطاب تصديق من المقاطعة، يحتاجه معظم الطلاب لتصريح الدراسة الكندي."] },
    caq: { m: [/\bCAQ\b/, /\bCAQ\b/], t: ["CAQ", "CAQ"], d: ["Quebec Acceptance Certificate. Needed to study in Quebec, in place of a PAL.", "شهادة قبول كيبيك، تُطلب للدراسة في كيبيك بدل خطاب PAL."] },
    ipa: { m: [/\bIPA\b/, /\bIPA\b/], t: ["IPA", "IPA"], d: ["In-Principle Approval. Singapore's letter that lets you enter before you collect your Student's Pass.", "خطاب الموافقة المبدئية في سنغافورة، تدخل به قبل استلام بطاقة الطالب."] },
    solar: { m: [/\bSOLAR\b/, /\bSOLAR\b/], t: ["SOLAR", "SOLAR"], d: ["Singapore's online system where your university registers you for the Student's Pass.", "النظام الإلكتروني في سنغافورة الذي تسجلك فيه جامعتك لبطاقة الطالب."] },
    eform16: { m: [/eForm 16/, /eForm 16/], t: ["eForm 16", "eForm 16"], d: ["The Student's Pass application form you complete after SOLAR registration.", "نموذج طلب بطاقة الطالب الذي تُكمله بعد التسجيل في SOLAR."] },
    zul: { m: [/Zulassung/, /Zulassung/], t: ["Zulassung", "Zulassung"], d: ["Your admission letter from a German university.", "خطاب القبول من الجامعة الألمانية."] },
    stk: { m: [/Studienkolleg/, /Studienkolleg/], t: ["Studienkolleg", "Studienkolleg"], d: ["A one-year preparatory college in Germany, ending in the Feststellungsprüfung exam.", "كلية تحضيرية مدتها سنة في ألمانيا، تنتهي باختبار Feststellungsprüfung."] },
    anm: { m: [/Anmeldung/, /Anmeldung/], t: ["Anmeldung", "Anmeldung"], d: ["Registering your address in Germany, within 14 days of moving in.", "تسجيل عنوانك في ألمانيا خلال 14 يومًا من سكنك."] },
    ua: { m: [/uni-assist/, /uni-assist/], t: ["uni-assist", "uni-assist"], d: ["A service many German universities use to check international applications.", "خدمة تستخدمها كثير من الجامعات الألمانية لفحص طلبات الطلاب الدوليين."] },
    kau: { m: [/Kaution/, /Kaution/], t: ["Kaution", "Kaution"], d: ["A rental deposit in Germany, up to 3 months' rent without bills.", "تأمين الإيجار في ألمانيا، حتى إيجار 3 أشهر دون الفواتير."] },
    wg: { m: [/\bWG\b/, /\bWG\b/], t: ["WG", "WG"], d: ["Wohngemeinschaft: a shared flat, the most common student home in Germany.", "شقة مشتركة (Wohngemeinschaft)، وهي أشهر سكن للطلاب في ألمانيا."] },
    hdb: { m: [/\bHDB\b/, /\bHDB\b/], t: ["HDB", "HDB"], d: ["Singapore's public housing flats. Rentals need at least 6 months.", "الشقق السكنية العامة في سنغافورة، ولا يقل الإيجار فيها عن 6 أشهر."] },
    evisa: { m: [/\beVisa\b/, /\beVisa\b/], t: ["eVisa", "eVisa"], d: ["A digital visa. In the UK, it lives in your UKVI account instead of a card.", "تأشيرة رقمية، وفي بريطانيا تكون في حسابك على UKVI بدل البطاقة."] },
    ukvi: { m: [/\bUKVI\b/, /\bUKVI\b/], t: ["UKVI", "UKVI"], d: ["UK Visas and Immigration, the government office that handles visas. Some UK courses ask for an IELTS for UKVI test.", "إدارة التأشيرات والهجرة البريطانية، وبعض البرامج تطلب اختبار IELTS for UKVI."] },
    trf: { m: [/\bTRF\b/, /\bTRF\b/], t: ["TRF", "TRF"], d: ["Test Report Form: your IELTS result, with a number universities use to check it.", "تقرير نتيجة IELTS، وفيه رقم تستخدمه الجامعات للتحقق منها."] },
    ielts: { m: [/\bIELTS\b/, /\bIELTS\b/], t: ["IELTS", "IELTS"], d: ["The English test most universities and the Ministry accept. Students take IELTS Academic.", "اختبار اللغة الإنجليزية الذي تقبله معظم الجامعات والوزارة، ويقدّم الطلاب نسخة IELTS الأكاديمية."] },
    safeer: { m: [/\bSafeer\b/, /منصة سفير|سفير/], t: ["Safeer", "منصة سفير"], d: ["SACM's online platform. You use it for your financial guarantee, arrival steps, results and requests while abroad.", "منصة الملحقية الإلكترونية، وتستخدمها لطلب الضمان المالي وخطوات الوصول ورفع النتائج والطلبات أثناء ابتعاثك."] },
    qubool: { m: [/\bQubool\b/, /منصة قبول/], t: ["Qubool", "منصة قبول"], d: ["The Ministry's platform where every new applicant applies for the scholarship.", "منصة الوزارة التي يقدّم عبرها كل متقدم جديد على البعثة."] },
    nafath: { m: [/\bNafath\b/, /نفاذ/], t: ["Nafath", "نفاذ"], d: ["Saudi Arabia's national single sign-on app. You use it to log in to Qubool.", "تطبيق الدخول الموحد الوطني، وتستخدمه للدخول إلى منصة قبول."] },
    sacm: { m: [/\bSACM\b/, /الملحقية/], t: ["SACM", "الملحقية الثقافية"], d: ["The Saudi Arabian Cultural Mission. It manages your scholarship in your study country.", "الملحقية الثقافية السعودية، وتدير ابتعاثك في دولة الدراسة."] },
    ruwwad: { m: [/Al-Ruwwad/, /الرواد/], t: ["Al-Ruwwad", "مسار الرواد"], d: ["A scholarship track for top 30 universities in each field.", "مسار ابتعاث للجامعات ضمن أفضل 30 في كل تخصص."] },
    imdad: { m: [/\bImdad\b/, /إمداد/], t: ["Imdad", "مسار إمداد"], d: ["A scholarship track for top 200 universities in fields the Saudi job market needs.", "مسار ابتعاث للجامعات ضمن أفضل 200 في التخصصات التي يحتاجها سوق العمل السعودي."] },
    rd: { m: [/Research & Development track/, /مسار البحث والتطوير/], t: ["Research & Development track", "مسار البحث والتطوير"], d: ["The scholarship track for PhDs in national research priority areas.", "مسار الابتعاث للدكتوراه في مجالات الأولوية البحثية الوطنية."] },
    uncond: { m: [/unconditional offer/i, /قبول(?:ًا|ك)? غير (?:ال)?مشروط|القبول غير المشروط/], t: ["Unconditional offer", "القبول غير المشروط"], d: ["An offer with no conditions left to meet. The Ministry asks for one before it considers your scholarship.", "قبول لم يتبقَّ عليه أي شرط، وتطلبه الوزارة قبل النظر في طلب ابتعاثك."] },
    guarantee: { m: [/guarantee letter/i, /خطاب الضمان/], t: ["Financial guarantee letter", "خطاب الضمان المالي"], d: ["SACM's letter telling your university that the scholarship pays your tuition.", "خطاب من الملحقية يخبر جامعتك أن البعثة تدفع رسومك الدراسية."] },
    package: { m: [/package offer/i, /العرض المشترك|عرض مشترك/], t: ["Package offer", "العرض المشترك"], d: ["One offer that covers both your pathway year and the degree it leads to.", "عرض واحد يشمل سنة المسار والشهادة التي تؤدي إليها."] },
    equiv: { m: [/equivalency/i, /المعادلة|معادلة أي مؤهل/], t: ["Equivalency", "المعادلة"], d: ["The Ministry of Education's official recognition of a qualification from outside Saudi Arabia.", "اعتراف وزارة التعليم الرسمي بمؤهل من خارج السعودية."] },
    genuine: { m: [/Genuine Student/, /الطالب الحقيقي/], t: ["Genuine Student requirement", "شرط الطالب الحقيقي"], d: ["Questions in Australia's student visa form about your study plans and circumstances.", "أسئلة في طلب تأشيرة الطالب الأسترالية عن خطتك الدراسية وظروفك."] },
    bio: { m: [/biometrics/i, /البصمات/], t: ["Biometrics", "البصمات"], d: ["Your fingerprints and photo, taken at a visa centre for some visas.", "بصمات أصابعك وصورتك، تؤخذ في مركز التأشيرات لبعض التأشيرات."] }
  };

  window.MasarokStepMore = { F: F, FC: FC, FG: FG, QX: QX, QXC: QXC, GL: GL };
})();

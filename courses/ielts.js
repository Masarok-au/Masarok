/* Masarok Academy · IELTS Academic pilot course.
   All passages, questions and model answers are original Masarok practice material,
   written in the official IELTS formats. Teaching text is [English, Arabic]; test material is English. */
(function () {
  "use strict";

  // ---------------- placement test ----------------
  var PLACEMENT = {
    id: "placement", icon: "🧭", mins: 15, skill: "all",
    t: ["Placement test", "اختبار تحديد المستوى"],
    d: ["Find your starting band in 15 minutes and get a study plan.", "اعرف مستواك المبدئي في 15 دقيقة واحصل على خطة دراسة."],
    steps: [
      { t: "text", h: ["Before you start", "قبل أن تبدأ"], p: [
        ["This short test has four parts: reading, listening, grammar and vocabulary, and a quick self-check for writing and speaking.", "يتكون هذا الاختبار القصير من أربعة أجزاء: القراءة، والاستماع، والقواعد والمفردات، وتقييم ذاتي سريع للكتابة والمحادثة."],
        ["It gives you a rough starting band, not an official score. Answer on your own, without a dictionary, so the plan fits you.", "يعطيك مستوى مبدئيًا تقريبيًا وليس درجة رسمية. أجب وحدك ودون قاموس لتناسبك الخطة."],
        ["For the listening part, turn your sound on.", "في جزء الاستماع، شغّل الصوت."]] },

      { t: "passage", h: ["Part 1 · Reading", "الجزء 1 · القراءة"], title: "Learning in a second language", part: "r", paras: [
        "For many international students, the first months at university are the hardest. Lectures move quickly, and students who studied mainly in their first language often need extra time to follow new subject vocabulary. This gap usually narrows during the first year, especially for students who read widely outside their course.",
        "Universities have responded in different ways. Some offer free academic writing workshops, while others pair new students with second-year mentors who studied the same subject. A smaller number provide recorded lectures, which allow students to pause and replay difficult sections. Surveys of international students show that recorded lectures are the support they value most, although mentors are often rated more highly for helping students settle in socially.",
        "Not every form of support is popular, however. Compulsory language classes, which some institutions introduced in the past, were often seen by students as a sign that they were not trusted to manage their own learning. As a result, most universities now make such classes optional and focus instead on support that students can choose for themselves."],
        items: [
          { k: "tfng", s: "Students who read outside their course tend to close the language gap faster.", a: "T", x: ["The text says the gap narrows “especially for students who read widely outside their course”.", "يقول النص إن الفجوة تضيق «خاصة للطلاب الذين يقرؤون كثيرًا خارج مقرراتهم»."] },
          { k: "tfng", s: "Most universities offer recorded lectures.", a: "F", x: ["The text says “a smaller number” provide them, the opposite of most.", "يقول النص إن «عددًا أقل» يوفرها، وهذا عكس «معظم»."] },
          { k: "tfng", s: "Mentors are usually second-year students from a different subject.", a: "F", x: ["Mentors “studied the same subject”.", "المرشدون «درسوا التخصص نفسه»."] },
          { k: "tfng", s: "Writing workshops are the most expensive form of support.", a: "NG", x: ["The text never compares costs.", "لا يقارن النص بين التكاليف أبدًا."] },
          { k: "mcq", s: "According to surveys, which support do international students value most?", o: ["Writing workshops", "Mentors", "Recorded lectures", "Compulsory language classes"], a: 2, x: ["“Recorded lectures are the support they value most.”", "«المحاضرات المسجلة هي الدعم الأعلى تقديرًا لديهم»."] },
          { k: "mcq", s: "Why did many universities make language classes optional?", o: ["They were too expensive", "Students felt they were not trusted", "Teachers preferred workshops", "The classes were too short"], a: 1, x: ["Students saw compulsory classes as a sign they were not trusted.", "رأى الطلاب في الدروس الإلزامية علامة على عدم الثقة بهم."] }
        ] },

      { t: "listen", h: ["Part 2 · Listening", "الجزء 2 · الاستماع"], part: "l", plays: 2,
        intro: ["A student is calling the university housing office. Complete the form. Write ONE WORD AND/OR A NUMBER for each answer. You can play the recording twice.", "طالب يتصل بمكتب السكن الجامعي. أكمل النموذج بكلمة واحدة و/أو رقم لكل إجابة. يمكنك تشغيل التسجيل مرتين."],
        lines: [
          ["a", "Good morning, Student Housing. How can I help?"],
          ["b", "Hi. I'd like to apply for a room in the university residence for next semester."],
          ["a", "Of course. Can I take your family name, please?"],
          ["b", "It's Alharbi. That's A, L, H, A, R, B, I."],
          ["a", "Thank you. And your student number?"],
          ["b", "It's five, zero, three, seven, two, eight, one."],
          ["a", "Great. Would you prefer a single room or a shared room?"],
          ["b", "A single room, please. With a private bathroom, if possible."],
          ["a", "Single rooms with a private bathroom cost two hundred and ninety dollars a week."],
          ["b", "That's fine."],
          ["a", "And when would you like to move in?"],
          ["b", "On the fourteenth of February, if that's possible."],
          ["a", "No problem. We'll email you a confirmation within three working days."]
        ],
        form: "Housing application",
        items: [
          { l: "Family name", a: ["alharbi"], x: ["The student spells it: A-L-H-A-R-B-I.", "يتهجاه الطالب: A-L-H-A-R-B-I."] },
          { l: "Student number", a: ["5037281"], x: ["Five, zero, three, seven, two, eight, one.", "خمسة، صفر، ثلاثة، سبعة، اثنان، ثمانية، واحد."] },
          { l: "Room: single, with a private …", a: ["bathroom"], x: ["“With a private bathroom.”", "«مع حمام خاص»."] },
          { l: "Weekly cost: $ …", a: ["290"], x: ["Two hundred and ninety dollars a week.", "مئتان وتسعون دولارًا في الأسبوع."] },
          { l: "Move-in date: … February", a: ["14", "14th", "fourteenth"], x: ["“The fourteenth of February.”", "«الرابع عشر من فبراير»."] },
          { l: "Confirmation within … working days", a: ["3", "three"], x: ["“Within three working days.”", "«خلال ثلاثة أيام عمل»."] }
        ] },

      { t: "quiz", h: ["Part 3 · Grammar and vocabulary", "الجزء 3 · القواعد والمفردات"], part: "g", items: [
        { s: "If I ___ more time, I would join the club.", o: ["have", "had", "will have", "having"], a: 1, x: ["Second conditional: if + past simple, would + verb.", "الشرطية الثانية: if مع الماضي البسيط، ثم would مع الفعل."] },
        { s: "She has lived in Sydney ___ 2023.", o: ["for", "since", "from", "during"], a: 1, x: ["Use “since” with a starting point in time.", "نستخدم since مع نقطة بداية زمنية."] },
        { s: "The results were ___ than we expected.", o: ["more good", "better", "best", "gooder"], a: 1, x: ["“Good” becomes “better” in comparisons.", "صيغة المقارنة من good هي better."] },
        { s: "By the time the lecture started, we ___ our notes.", o: ["finish", "have finished", "had finished", "were finish"], a: 2, x: ["Past perfect for the earlier of two past actions.", "الماضي التام للحدث الأسبق بين حدثين في الماضي."] },
        { s: "A short summary at the start of a research paper is called an ___.", o: ["abstract", "extract", "contract", "distract"], a: 0, x: ["An abstract summarises a paper.", "الـabstract ملخص البحث."] },
        { s: "The university will ___ the new policy next year.", o: ["implement", "implicate", "imply", "impress"], a: 0, x: ["To implement = to put into action.", "implement تعني: يطبّق."] },
        { s: "Prices rose ___ between 2020 and 2024.", o: ["significant", "significantly", "significance", "signify"], a: 1, x: ["An adverb describes the verb “rose”.", "نحتاج ظرفًا يصف الفعل rose."] },
        { s: "Which is the most formal? “We need to ___ the problem.”", o: ["sort out", "deal with", "address", "fix up"], a: 2, x: ["“Address” is the most formal and suits academic writing.", "address هي الأكثر رسمية وتناسب الكتابة الأكاديمية."] }
      ] },

      { t: "self", h: ["Part 4 · Writing and speaking", "الجزء 4 · الكتابة والمحادثة"], items: [
        { key: "w", q: ["In English, I can write…", "بالإنجليزية، أستطيع أن أكتب…"], o: [
          ["short, simple sentences", "جملًا قصيرة وبسيطة"],
          ["a clear paragraph on a familiar topic", "فقرة واضحة عن موضوع مألوف"],
          ["a 250-word essay with an opinion and examples", "مقالًا من 250 كلمة فيه رأي وأمثلة"],
          ["a well-organised essay with a wide range of words and few mistakes", "مقالًا منظمًا بمفردات متنوعة وأخطاء قليلة"]] },
        { key: "s", q: ["When I speak English…", "عندما أتحدث الإنجليزية…"], o: [
          ["I can answer simple questions slowly", "أجيب عن الأسئلة البسيطة ببطء"],
          ["I can talk about familiar topics, but I pause a lot", "أتحدث عن مواضيع مألوفة لكني أتوقف كثيرًا"],
          ["I can speak for 2 minutes on most topics, with some mistakes", "أتحدث دقيقتين عن معظم المواضيع مع بعض الأخطاء"],
          ["I speak fluently and can discuss abstract ideas", "أتحدث بطلاقة وأناقش الأفكار المجردة"]] }
      ] },

      { t: "result" }
    ]
  };

  // ---------------- lesson: know the test ----------------
  var KNOW = {
    id: "know", icon: "📋", mins: 8, skill: "all",
    t: ["Know the test", "اعرف الاختبار"],
    d: ["The format, timing and how your band score is worked out.", "شكل الاختبار وتوقيته وكيف تُحسب درجتك."],
    steps: [
      { t: "table", h: ["Four parts", "أربعة أجزاء"], cols: [["Part", "الجزء"], ["Time", "الوقت"], ["What you do", "ماذا تفعل"]], rows: [
        ["Listening", "about 30 min", "4 recordings, 40 questions"],
        ["Reading", "60 min", "3 long passages, 40 questions"],
        ["Writing", "60 min", "Task 1: describe a chart (150+ words). Task 2: an essay (250+ words)"],
        ["Speaking", "11–14 min", "A conversation with an examiner in 3 parts, sometimes on a different day"]],
        p: [["Listening, Reading and Writing are taken together, with no break between them.", "يُقدَّم الاستماع والقراءة والكتابة معًا دون استراحة بينها."]] },
      { t: "text", h: ["How your score works", "كيف تُحسب درجتك"], p: [
        ["Each part gets a band from 0 to 9, in half bands such as 6.5. Your overall band is the average of the four, rounded to the nearest half band.", "يحصل كل جزء على درجة من 0 إلى 9 بأنصاف الدرجات مثل 6.5، والدرجة الكلية هي متوسط الأربعة مقرّبًا لأقرب نصف درجة."],
        ["Universities usually ask for an overall band and a minimum in each part, for example “6.5 overall with no band below 6.0”. Check both.", "تطلب الجامعات عادةً درجة كلية وحدًا أدنى لكل جزء، مثل «6.5 كلية دون أن تقل أي مهارة عن 6.0»، فتحقق من الاثنين."],
        ["The Ministry asks for at least IELTS 5.5 to sponsor a preparatory year. Most universities accept results up to 2 years old.", "تشترط الوزارة 5.5 على الأقل للابتعاث على السنة التحضيرية، وتقبل معظم الجامعات النتائج خلال سنتين."]] },
      { t: "text", h: ["Computer or paper?", "محوسب أم ورقي؟"], p: [
        ["Both are offered in Saudi Arabia. Computer-delivered results usually come within a few days; paper results take about two weeks.", "كلاهما متاح في السعودية. نتائج الاختبار المحوسب تصل عادةً خلال أيام قليلة، والورقي خلال أسبوعين تقريبًا."],
        ["Some UK courses ask for “IELTS for UKVI”. It's the same test, booked as a different version, so check before you book.", "بعض البرامج البريطانية تطلب «IELTS for UKVI»، وهو الاختبار نفسه لكنه يُحجز كنسخة مختلفة، فتحقق قبل الحجز."]] },
      { t: "quiz", h: ["Check yourself", "اختبر نفسك"], items: [
        { s: ["How many questions are in the Reading test?", "كم سؤالًا في اختبار القراءة؟"], o: ["20", "30", "40", "60"], a: 2, x: ["40 questions across 3 passages.", "40 سؤالًا في 3 نصوص."] },
        { s: ["What is the minimum length for Writing Task 2?", "ما الحد الأدنى لطول المهمة الثانية في الكتابة؟"], o: ["150 words", "200 words", "250 words", "400 words"], a: 2, x: ["At least 250 words. Task 1 needs at least 150.", "250 كلمة على الأقل، والمهمة الأولى 150 كلمة على الأقل."] },
        { s: ["Your bands are Listening 6.5, Reading 6.0, Writing 5.5 and Speaking 6.0. What is your overall band?", "درجاتك: استماع 6.5، قراءة 6.0، كتابة 5.5، محادثة 6.0. ما درجتك الكلية؟"], o: ["5.5", "6.0", "6.5", "7.0"], a: 1, x: ["(6.5 + 6.0 + 5.5 + 6.0) ÷ 4 = 6.0.", "(6.5 + 6.0 + 5.5 + 6.0) ÷ 4 = 6.0."] },
        { s: ["Your university asks for 6.5 overall with no band below 6.0. You got 6.5 overall, but 5.5 in Writing. Do you meet it?", "تطلب جامعتك 6.5 كلية دون أن تقل أي مهارة عن 6.0. حصلت على 6.5 كلية و5.5 في الكتابة. هل استوفيت الشرط؟"], o: [["Yes", "نعم"], ["No", "لا"]], a: 1, x: ["Writing is below 6.0, so you would need to improve it.", "الكتابة أقل من 6.0، فستحتاج إلى تحسينها."] },
        { s: ["How long does the Speaking test last?", "كم مدة اختبار المحادثة؟"], o: ["3–5 minutes", "11–14 minutes", "30 minutes", "60 minutes"], a: 1, x: ["11–14 minutes, in 3 parts.", "من 11 إلى 14 دقيقة في 3 أجزاء."] }
      ], pass: 4 }
    ]
  };

  // ---------------- lesson: true / false / not given ----------------
  var TFNG = {
    id: "tfng", icon: "🔎", mins: 15, skill: "r",
    t: ["Reading: True, False or Not Given", "القراءة: صحيح أم خطأ أم غير مذكور"],
    d: ["The question type students miss most, and how to get it right.", "أكثر نوع أسئلة يخطئ فيه الطلاب، وكيف تجيب عنه بثقة."],
    steps: [
      { t: "text", h: ["What each answer means", "معنى كل إجابة"], list: [
        ["TRUE: the passage says the same thing, often in different words.", "صحيح (TRUE): النص يقول الشيء نفسه، غالبًا بكلمات مختلفة."],
        ["FALSE: the passage says the opposite.", "خطأ (FALSE): النص يقول العكس."],
        ["NOT GIVEN: the passage doesn't say. You can't know from the text.", "غير مذكور (NOT GIVEN): النص لا يذكر ذلك، ولا يمكنك معرفته منه."]],
        p: [["Answer from the passage only, never from what you know about the world.", "أجب من النص فقط، وليس مما تعرفه عن العالم."]] },
      { t: "passage", h: ["A worked example", "مثال محلول"], title: "The library", teach: true, paras: [
        "The library opens at 8 am on weekdays and closes earlier on Fridays."],
        items: [
          { k: "tfng", s: "The library opens at 8 am from Monday to Friday.", a: "T", x: ["“Weekdays” means Monday to Friday, so it's the same meaning.", "«أيام الأسبوع» تعني من الاثنين إلى الجمعة، فالمعنى نفسه."] },
          { k: "tfng", s: "The library stays open later on Fridays.", a: "F", x: ["It closes earlier on Fridays, which is the opposite.", "يغلق مبكرًا يوم الجمعة، وهذا عكس العبارة."] },
          { k: "tfng", s: "The library is busiest on Mondays.", a: "NG", x: ["The sentence says nothing about how busy it is.", "الجملة لا تذكر شيئًا عن الازدحام."] }
        ] },
      { t: "text", h: ["A four-step method", "طريقة من أربع خطوات"], list: [
        ["Read the statement and underline the key words (names, numbers, places).", "اقرأ العبارة وضع خطًا تحت الكلمات المهمة (الأسماء والأرقام والأماكن)."],
        ["Find that part of the passage. The questions follow the order of the text.", "ابحث عن الجزء المقصود في النص، فالأسئلة تسير بترتيب النص."],
        ["Compare the meaning carefully. Watch small words such as all, some, only, most, always and never.", "قارن المعنى بدقة، وانتبه للكلمات الصغيرة مثل all وsome وonly وmost وalways وnever."],
        ["If you can't find it, choose Not Given. Don't fill the gap with a guess.", "إن لم تجده فاختر Not Given، ولا تملأ الفراغ بالتخمين."]] },
      { t: "passage", h: ["Practice passage", "نص للتدريب"], title: "How desert plants survive", pass: 6, paras: [
        "Plants that grow in hot deserts have developed several ways to survive long periods without rain. The best-known example is the cactus, which stores water in its thick stem. However, almost all cacti grow naturally in the Americas, and many desert plants in Africa and Arabia rely on quite different strategies.",
        "One common strategy is to grow very long roots. The roots of some acacia trees reach groundwater more than thirty metres below the surface, allowing the trees to stay green in the driest months. Other plants take the opposite approach, spreading shallow roots over a wide area so that they can collect water quickly after even a light shower.",
        "Leaves are another important factor. Large, thin leaves lose water rapidly, so many desert plants have small leaves, or leaves covered with a waxy layer that reduces evaporation. Some species drop their leaves completely during the hottest season and grow new ones when conditions improve.",
        "Finally, a number of desert plants avoid dry periods altogether. Their seeds can remain in the soil for years and only germinate after heavy rain. These plants grow, flower and produce new seeds within a few weeks, before the ground dries out again. For visitors, the result can be surprising: after a rare storm, a landscape that looked empty may be covered with flowers."],
        items: [
          { k: "tfng", s: "The cactus stores water in its stem.", a: "T", x: ["“Stores water in its thick stem.”", "«يخزن الماء في ساقه السميكة»."] },
          { k: "tfng", s: "Desert plants in Africa all use the same method as the cactus.", a: "F", x: ["They “rely on quite different strategies”.", "«تعتمد على طرق مختلفة تمامًا»."] },
          { k: "tfng", s: "Some acacia roots go deeper than thirty metres.", a: "T", x: ["“More than thirty metres below the surface.”", "«أكثر من ثلاثين مترًا تحت السطح»."] },
          { k: "tfng", s: "Acacias are the most common trees in Arabia.", a: "NG", x: ["The passage never says which trees are most common.", "لا يذكر النص أي الأشجار أكثر انتشارًا."] },
          { k: "tfng", s: "Small leaves lose water more quickly than large leaves.", a: "F", x: ["Large, thin leaves lose water rapidly, so small leaves lose less.", "الأوراق الكبيرة الرقيقة تفقد الماء بسرعة، فالصغيرة تفقد أقل."] },
          { k: "tfng", s: "Some plants lose all their leaves in the hottest season.", a: "T", x: ["“Drop their leaves completely during the hottest season.”", "«تُسقط أوراقها كليًا في أشد المواسم حرارة»."] },
          { k: "tfng", s: "These desert flowers usually last for several months.", a: "F", x: ["They grow, flower and make seeds “within a few weeks”.", "تنمو وتزهر وتنتج البذور «خلال أسابيع قليلة»."] },
          { k: "tfng", s: "Tourists often travel to deserts to see the flowers after rain.", a: "NG", x: ["It says visitors may be surprised, not that tourists travel to see the flowers.", "يقول إن الزوار قد يُفاجَؤون، لا أن السياح يسافرون لرؤية الأزهار."] }
        ] }
    ]
  };

  // ---------------- lesson: matching headings ----------------
  var HEAD = {
    id: "headings", icon: "🧩", mins: 15, skill: "r",
    t: ["Reading: Matching headings", "القراءة: مطابقة العناوين"],
    d: ["Find the main idea of each paragraph, and avoid the word-matching trap.", "اعثر على الفكرة الرئيسية لكل فقرة، وتجنّب فخ الكلمات المتشابهة."],
    steps: [
      { t: "text", h: ["What you do", "ماذا تفعل"], p: [
        ["You choose a heading for each paragraph from a list. There are always more headings than paragraphs, so some are not used.", "تختار عنوانًا لكل فقرة من قائمة، وعدد العناوين دائمًا أكبر من عدد الفقرات، فبعضها لن يُستخدم."],
        ["The heading must match the main idea of the whole paragraph, not one detail in it.", "يجب أن يطابق العنوان الفكرة الرئيسية للفقرة كلها، لا تفصيلًا واحدًا فيها."]] },
      { t: "text", h: ["A method that works", "طريقة مجرّبة"], list: [
        ["Read all the headings first, and notice how they differ.", "اقرأ كل العناوين أولًا، ولاحظ الفروق بينها."],
        ["Skim each paragraph. The first and last sentences often carry the main idea.", "اقرأ كل فقرة قراءة سريعة، فالجملتان الأولى والأخيرة تحملان الفكرة الرئيسية غالبًا."],
        ["Say the main idea to yourself in a few words, then find the closest heading.", "لخّص الفكرة الرئيسية لنفسك ببضع كلمات، ثم ابحث عن أقرب عنوان."],
        ["Beware the trap: a heading that repeats a word from the paragraph but describes only a detail.", "احذر الفخ: عنوان يكرر كلمة من الفقرة لكنه يصف تفصيلًا فقط."],
        ["Do the easy paragraphs first and cross those headings off.", "ابدأ بالفقرات السهلة واشطب عناوينها."]] },
      { t: "headings", h: ["Practice passage", "نص للتدريب"], title: "The return of the bicycle", pass: 4,
        paras: [
          { k: "A", s: "In the early twentieth century, bicycles were one of the main ways people travelled in European cities. As cars became cheaper after the 1950s, however, many cities redesigned their streets around motor traffic, and cycling fell sharply. In some places, bicycle use dropped by more than half within a generation." },
          { k: "B", s: "Since the 1990s, the trend has begun to reverse. City governments concerned about traffic jams and air quality have started to see cycling as a cheap way to move large numbers of people. Copenhagen and Amsterdam are often given as examples, but cities as different as Paris, Bogotá and Seville have also invested heavily in cycle lanes." },
          { k: "C", s: "Infrastructure appears to be the key. Surveys repeatedly show that the main reason people give for not cycling is fear of traffic. When cities build lanes that are physically separated from cars, the number of cyclists usually increases quickly, including groups that rarely cycled before, such as older people and parents with children." },
          { k: "D", s: "Bike-sharing schemes have added another option. Users can unlock a bicycle with a phone app, ride it across the city and leave it at another station. The schemes are popular with commuters and tourists, but they are expensive to run, and several private companies have closed after bicycles were damaged or stolen." },
          { k: "E", s: "Not everyone welcomes the change. Some shop owners worry that removing parking spaces to make room for cycle lanes will reduce the number of customers. Studies in several cities suggest the opposite, as people who walk or cycle tend to visit local shops more often, but the debate remains heated in many places." }],
        heads: [
          { k: "i", s: "Fears that businesses will lose customers" },
          { k: "ii", s: "Why safe lanes change who cycles" },
          { k: "iii", s: "How cars pushed bicycles aside" },
          { k: "iv", s: "The high cost of building cycle lanes" },
          { k: "v", s: "A new way to borrow a bike" },
          { k: "vi", s: "Cities turn back to cycling" },
          { k: "vii", s: "Cycling as a competitive sport" }],
        ans: { A: "iii", B: "vi", C: "ii", D: "v", E: "i" },
        x: {
          A: ["The paragraph is about cars replacing bicycles after the 1950s.", "الفقرة عن حلول السيارات محل الدراجات بعد الخمسينيات."],
          B: ["“The trend has begun to reverse”: cities are choosing cycling again.", "«بدأ الاتجاه ينعكس»: المدن تعود إلى الدراجات."],
          C: ["Separated lanes bring new groups of cyclists, such as older people.", "المسارات المنفصلة تجذب فئات جديدة مثل كبار السن."],
          D: ["The main idea is borrowing bikes with an app. “Expensive” here is about running the schemes, not building lanes, so heading iv is the trap.", "الفكرة الرئيسية استعارة الدراجات بتطبيق. كلمة expensive هنا عن تشغيل الخدمة لا بناء المسارات، فالعنوان iv هو الفخ."],
          E: ["Shop owners worry about losing customers.", "أصحاب المحلات يخشون فقدان الزبائن."] } }
    ]
  };

  // ---------------- lesson: writing task 2 ----------------
  var PROMPT = "Some people believe that university students should study abroad for at least one year, while others think this is unnecessary. Discuss both views and give your own opinion.";
  var WRITE = {
    id: "writing", icon: "✍️", mins: 50, skill: "w",
    t: ["Writing Task 2: the essay", "الكتابة، المهمة 2: المقال"],
    d: ["Plan, compare model answers at band 6, 7 and 8, then write your own essay.", "خطط، وقارن نماذج إجابات بدرجات 6 و7 و8، ثم اكتب مقالك."],
    steps: [
      { t: "text", h: ["The task", "المهمة"], p: [
        ["You have 40 minutes to write at least 250 words giving your view on a topic, with reasons and examples. Task 2 counts for more of your Writing band than Task 1.", "لديك 40 دقيقة لكتابة 250 كلمة على الأقل تعرض فيها رأيك في موضوع مع أسباب وأمثلة، والمهمة الثانية تؤثر في درجة الكتابة أكثر من الأولى."]],
        list: [
          ["Task response: answer every part of the question and keep a clear position.", "الاستجابة للمهمة: أجب عن كل أجزاء السؤال وحافظ على رأي واضح."],
          ["Coherence and cohesion: logical paragraphs, linked naturally.", "الترابط والتماسك: فقرات منطقية مترابطة بشكل طبيعي."],
          ["Vocabulary: a good range of words, used accurately.", "المفردات: تنوع في الكلمات مع دقة في الاستخدام."],
          ["Grammar: a mix of simple and complex sentences, with few mistakes.", "القواعد: مزيج من الجمل البسيطة والمركبة مع أخطاء قليلة."]] },
      { t: "quiz", h: ["Spot the question type", "حدد نوع السؤال"], items: [
        { s: "“Some people think exams are the best way to assess students. To what extent do you agree or disagree?”", o: [["Opinion", "رأي"], ["Discuss both views", "مناقشة الرأيين"], ["Problem and solution", "مشكلة وحل"]], a: 0, x: ["“To what extent do you agree” asks for your opinion.", "«إلى أي مدى توافق» تطلب رأيك."] },
        { s: "“Many young people move to big cities. What problems does this cause, and what can be done?”", o: [["Opinion", "رأي"], ["Discuss both views", "مناقشة الرأيين"], ["Problem and solution", "مشكلة وحل"]], a: 2, x: ["It asks for problems and solutions.", "يطلب المشكلات والحلول."] },
        { s: "“" + PROMPT + "”", o: [["Opinion", "رأي"], ["Discuss both views", "مناقشة الرأيين"], ["Problem and solution", "مشكلة وحل"]], a: 1, x: ["Discuss both views, then give your own opinion. Missing either part lowers your Task response.", "ناقش الرأيين ثم أعطِ رأيك، وإغفال أي جزء يخفض درجة الاستجابة للمهمة."] }
      ] },
      { t: "text", h: ["A four-paragraph plan", "خطة من أربع فقرات"], list: [
        ["Introduction: say what the question is about in your own words, then give your position.", "المقدمة: أعد صياغة الموضوع بكلماتك ثم اذكر رأيك."],
        ["Body 1: one main idea, explained, with an example.", "الفقرة الأولى: فكرة رئيسية واحدة مشروحة مع مثال."],
        ["Body 2: the other view or a second reason, explained, with an example.", "الفقرة الثانية: الرأي الآخر أو سبب ثانٍ مشروح مع مثال."],
        ["Conclusion: restate your position and sum up why.", "الخاتمة: أعد تأكيد رأيك ولخّص السبب."]],
        p: [["Spend about 5 minutes planning. A clear plan makes the 40 minutes much calmer.", "خصص نحو 5 دقائق للتخطيط، فالخطة الواضحة تجعل الأربعين دقيقة أهدأ بكثير."]] },
      { t: "outline", prompt: PROMPT },
      { t: "models", prompt: PROMPT },
      { t: "quiz", h: ["Linking words", "أدوات الربط"], items: [
        { s: "Studying abroad is expensive. ___, scholarships make it possible for many students.", o: ["Therefore", "However", "For example"], a: 1, x: ["“However” shows contrast.", "However تدل على التضاد."] },
        { s: "Students use English every day. ___, their fluency improves quickly.", o: ["As a result", "In contrast", "Although"], a: 0, x: ["“As a result” shows a consequence.", "As a result تدل على النتيجة."] },
        { s: "Many skills are hard to learn at home, ___ managing money alone.", o: ["such as", "whereas", "in conclusion"], a: 0, x: ["“Such as” introduces an example.", "such as تقدم مثالًا."] },
        { s: "___ studying abroad has costs, I believe its benefits are greater.", o: ["Although", "Moreover", "Therefore"], a: 0, x: ["“Although” joins a contrast inside one sentence.", "Although تربط تضادًا داخل جملة واحدة."] }
      ] },
      { t: "essay", prompt: PROMPT }
    ],
    models: [
      { band: "6", text: [
        "Nowadays many students want to study in other country for one year or more. Some people think it is very important for university students, but other people think it is not necessary. In this essay I will discuss both views and give my opinion.",
        "On the one hand, studying abroad have many benefits. Students can improve their English because they speak it every day. Also they learn about new culture and meet people from different countries. For example, my cousin studied in Australia and now he is more confident and he can talk with foreigners easily. This experience can help students to find a good job in the future.",
        "On the other hand, some people believe that studying abroad is not needed. It is very expensive and many families cannot pay for it. Moreover, students can feel lonely when they are far from their family, and this can affect on their studies. Also, there are good universities in our country, so students can get good education without travelling.",
        "In my opinion, I think studying abroad is a good idea if the student is ready for it. It gives many skills that students cannot learn at home. However, it should not be compulsory, because not every student has the money or the personality for living alone.",
        "In conclusion, studying abroad has advantages and disadvantages. I believe it is useful, but students should decide by themselves."],
        notes: [
          ["Covers both views and gives an opinion, but the position only appears near the end.", "يغطي الرأيين ويعطي رأيًا، لكن الموقف لا يظهر إلا قرب النهاية."],
          ["Ideas are relevant but developed simply; the example is personal and brief.", "الأفكار مناسبة لكنها مطوّرة ببساطة، والمثال شخصي وقصير."],
          ["Linking is clear but repetitive (Also, On the one hand…). “In my opinion, I think” repeats itself.", "الربط واضح لكنه متكرر، وعبارة In my opinion, I think فيها تكرار."],
          ["Basic vocabulary (good, many, very) and errors such as “in other country”, “studying abroad have” and “affect on”.", "مفردات بسيطة وأخطاء مثل in other country وstudying abroad have وaffect on."]] },
      { band: "7", text: [
        "Spending a year or more at a foreign university has become increasingly common, and some argue that it should be part of every student's education. Others, however, feel that it adds little that cannot be gained at home. While both views have merit, I believe a period abroad offers benefits that are difficult to replace, although it should remain a choice rather than a requirement.",
        "Those who question the value of studying abroad usually point to its cost. Tuition, travel and living expenses can be far higher than at a local university, and not every family can afford them. In addition, many countries now have highly ranked universities, so students can receive an excellent education without leaving home. For students who are close to their families, the stress of living alone may also harm their academic performance.",
        "Nevertheless, the advantages of studying abroad are considerable. Students who live in another country must use a second language every day, which improves their fluency far more quickly than classroom study. They also learn to manage money, solve problems and work with people from different backgrounds, skills that employers increasingly value. Government scholarship programmes show that these benefits are widely recognised, and they make study abroad possible for students from a range of backgrounds.",
        "In conclusion, although studying abroad is expensive and can be challenging, I believe its benefits for language, independence and career prospects make it worthwhile. Universities and governments should encourage it, but students must be free to decide whether it suits their circumstances."],
        notes: [
          ["A clear position from the introduction, kept through the essay.", "رأي واضح من المقدمة ومستمر في المقال كله."],
          ["Both views are discussed fairly, each in its own paragraph.", "يناقش الرأيين بإنصاف، كلٌّ في فقرة مستقلة."],
          ["Natural linking (Nevertheless, In addition) and a good range of words (considerable, circumstances).", "ربط طبيعي (Nevertheless, In addition) ومفردات متنوعة (considerable, circumstances)."],
          ["Mostly accurate complex sentences. To reach 8, examples could be more specific.", "جمل مركبة دقيقة في الغالب، وللوصول إلى 8 يمكن أن تكون الأمثلة أكثر تحديدًا."]] },
      { band: "8", text: [
        "Whether university students should spend at least a year studying overseas is a question that divides opinion. Critics see it as an expensive luxury, whereas supporters regard it as an essential part of a modern education. In my view, the experience is valuable enough to be strongly encouraged, but making it compulsory would be both unfair and impractical.",
        "The case against study abroad rests largely on cost and fairness. A year in a city such as London or Sydney can cost a family more than a whole degree at home, and a compulsory scheme would therefore place the heaviest burden on those least able to bear it. Opponents also argue, with some justification, that the gap in quality between domestic and foreign universities has narrowed, so the academic gain may be marginal. Finally, not every eighteen-year-old is ready to live thousands of kilometres from home, and a difficult year abroad can damage both confidence and grades.",
        "Yet these concerns, while real, overlook what is distinctive about living in another country. Unlike a classroom, daily life abroad forces students to negotiate everything from a rental agreement to a group project in a second language, and this sustained immersion produces a level of fluency and cultural awareness that is hard to achieve any other way. Moreover, graduates who have adapted to an unfamiliar system tend to be more independent and resilient, qualities that are increasingly prized in a global job market.",
        "On balance, the personal and professional rewards of studying abroad outweigh its costs for most students who undertake it. The sensible approach, therefore, is not to require it, but to remove the financial barriers through scholarships and exchange agreements, so that every capable student has a genuine choice."],
        notes: [
          ["Fully answers both parts with a precise, nuanced position (encourage, but don't require).", "يجيب عن الجزأين بالكامل برأي دقيق ومتوازن (تشجيع دون إلزام)."],
          ["Each paragraph builds an argument; cohesion is smooth and varied (Yet, Unlike, therefore).", "كل فقرة تبني حجة، والترابط سلس ومتنوع (Yet, Unlike, therefore)."],
          ["Wide, precise vocabulary (marginal, sustained immersion, resilient).", "مفردات واسعة ودقيقة (marginal, sustained immersion, resilient)."],
          ["A wide range of structures with very few errors.", "تنوع واسع في التراكيب مع أخطاء نادرة جدًا."]] }
    ]
  };

  // ---------------- lesson: speaking part 2 ----------------
  var SPEAK = {
    id: "speaking", icon: "🎙️", mins: 15, skill: "s",
    t: ["Speaking Part 2: the cue card", "المحادثة، الجزء 2: بطاقة الموضوع"],
    d: ["Prepare for 1 minute, speak for 2, then listen back and check yourself.", "حضّر دقيقة وتحدث دقيقتين، ثم استمع لنفسك وقيّم أداءك."],
    steps: [
      { t: "text", h: ["The three parts", "الأجزاء الثلاثة"], list: [
        ["Part 1 (4–5 minutes): questions about you, such as your studies, home town and hobbies.", "الجزء 1 (4–5 دقائق): أسئلة عنك، مثل دراستك ومدينتك وهواياتك."],
        ["Part 2 (3–4 minutes): you get a cue card, 1 minute to prepare, then speak for up to 2 minutes.", "الجزء 2 (3–4 دقائق): تحصل على بطاقة موضوع، ودقيقة للتحضير، ثم تتحدث حتى دقيقتين."],
        ["Part 3 (4–5 minutes): a deeper discussion of ideas linked to your Part 2 topic.", "الجزء 3 (4–5 دقائق): نقاش أعمق لأفكار مرتبطة بموضوع الجزء الثاني."]],
        p: [["You are marked on fluency and coherence, vocabulary, grammar and pronunciation.", "تُقيَّم على الطلاقة والترابط، والمفردات، والقواعد، والنطق."]] },
      { t: "text", h: ["How to fill 2 minutes", "كيف تملأ الدقيقتين"], list: [
        ["Use the bullet points on the card as your plan, in order.", "استخدم النقاط في البطاقة خطةً لك وبالترتيب."],
        ["In the minute to prepare, write single words, not sentences.", "في دقيقة التحضير، اكتب كلمات مفردة لا جملًا."],
        ["Extend each point: what, when, why, and how you felt.", "وسّع كل نقطة: ماذا، ومتى، ولماذا، وكيف شعرت."],
        ["Use the right tense: past for past events, future for plans.", "استخدم الزمن المناسب: الماضي للأحداث الماضية، والمستقبل للخطط."],
        ["Keep going until the examiner stops you. Phrases like “Let me think…” or “What I mean is…” buy you time.", "استمر حتى يوقفك الممتحن، وعبارات مثل Let me think… أو What I mean is… تمنحك وقتًا."],
        ["Don't memorise answers. Examiners notice, and it lowers your score.", "لا تحفظ إجابات جاهزة، فالممتحن يلاحظ ذلك وتنخفض درجتك."]] },
      { t: "speak" }
    ],
    cards: [
      { title: "Describe a place in your city that you like to visit.", points: ["where it is", "how often you go there", "what you do there"], explain: "and explain why you like it.",
        p3: ["Why do people like spending time in public places?", "How have the places where young people meet changed?", "Should cities spend more money on parks or on shopping centres?"] },
      { title: "Describe a skill you would like to learn.", points: ["what the skill is", "why you want to learn it", "how you would learn it"], explain: "and explain how it would help you in the future.",
        p3: ["Which skills are most useful for young people today?", "Is it better to learn skills at school or from experience?", "Will technology make some skills unnecessary?"] },
      { title: "Describe a time you helped someone.", points: ["who you helped", "what the situation was", "how you helped"], explain: "and explain how you felt about it.",
        p3: ["Why do some people enjoy helping others?", "Should schools teach children to volunteer?", "Do people help their neighbours less than in the past?"] }
    ]
  };

  // ---------------- vocabulary deck 1 ----------------
  var VOCAB = {
    id: "vocab1", icon: "🃏", mins: 10, skill: "v",
    t: ["Vocabulary 1: study and university", "المفردات 1: الدراسة والجامعة"],
    d: ["24 academic words you'll read, hear and use from day one.", "24 كلمة أكاديمية ستقرؤها وتسمعها وتستخدمها من أول يوم."],
    steps: [{ t: "cards" }],
    words: [
      ["academic", "adj", "related to study at school or university", "أكاديمي، دراسي", "Her academic results improved in her second year."],
      ["analyse", "verb", "to examine something carefully to understand it", "يحلّل", "We need to analyse the data before writing the report."],
      ["approach", "noun", "a way of dealing with something", "نهج، طريقة", "This approach to learning works well for many students."],
      ["assess", "verb", "to judge the quality or level of something", "يقيّم", "Essays are assessed on structure and argument."],
      ["assignment", "noun", "a piece of work given to students", "مهمة دراسية، واجب", "The assignment is due on Friday."],
      ["benefit", "noun", "an advantage or good result", "فائدة", "One benefit of group work is sharing ideas."],
      ["concept", "noun", "an idea or principle", "مفهوم", "The lecture explained the concept of supply and demand."],
      ["consequence", "noun", "a result of an action", "عاقبة، نتيجة", "Plagiarism can have serious consequences."],
      ["contribute", "verb", "to give or add something to a shared result", "يساهم", "Everyone should contribute to the group project."],
      ["criteria", "noun", "the standards used to judge something", "معايير", "The marking criteria are in the course outline."],
      ["define", "verb", "to explain the exact meaning of something", "يعرّف", "Start your essay by defining the key terms."],
      ["evidence", "noun", "facts that show something is true", "دليل، أدلة", "Support your argument with evidence."],
      ["factor", "noun", "one of the things that cause a result", "عامل", "Cost is an important factor in choosing a university."],
      ["feedback", "noun", "comments on how well you have done", "ملاحظات، تغذية راجعة", "The tutor gave useful feedback on my draft."],
      ["significant", "adj", "large or important enough to notice", "كبير، ملحوظ", "There was a significant rise in applications."],
      ["issue", "noun", "an important topic or problem", "قضية، مسألة", "Housing is a major issue for new students."],
      ["method", "noun", "a particular way of doing something", "طريقة، منهج", "Which research method did you use?"],
      ["obtain", "verb", "to get something, often with effort", "يحصل على", "You must obtain a visa before you travel."],
      ["require", "verb", "to need or demand", "يتطلّب", "The course requires IELTS 6.5."],
      ["research", "noun", "careful study to find new facts", "بحث", "Her research focuses on renewable energy."],
      ["source", "noun", "where information comes from", "مصدر", "Always reference your sources."],
      ["summary", "noun", "a short version of the main points", "ملخص", "Write a summary of the article in 100 words."],
      ["theory", "noun", "an idea that explains something", "نظرية", "The theory was tested in several experiments."],
      ["lecture", "noun", "a talk given to students on a subject", "محاضرة", "The first lecture starts at 9 am."]
    ]
  };

  window.MasarokCourse = {
    id: "ielts",
    t: ["IELTS Academic", "اختبار IELTS الأكاديمي"],
    sub: ["Pilot course · more lessons are coming", "النسخة التجريبية · دروس أخرى قادمة"],
    lessons: [PLACEMENT, KNOW, TFNG, HEAD, WRITE, SPEAK, VOCAB]
  };
})();

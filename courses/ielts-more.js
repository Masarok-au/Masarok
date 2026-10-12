/* Masarok Academy · IELTS Academic · Writing Task 1, Speaking Parts 1 and 3, Vocabulary 2–4.
   Original Masarok practice material in official formats. Teaching text is [English, Arabic]; test material is English. */
(function () {
  "use strict";

  // ---------------- writing task 1 ----------------
  var T1_CHART = {
    type: "line",
    title: "How students at one university travelled to campus, 2010–2025",
    unit: "%",
    labels: ["2010", "2013", "2016", "2019", "2022", "2025"],
    series: [
      { name: "Car", values: [45, 42, 38, 30, 24, 20] },
      { name: "Bus", values: [25, 27, 30, 33, 36, 37] },
      { name: "Bicycle", values: [10, 11, 12, 18, 24, 23] },
      { name: "Walking", values: [20, 20, 20, 19, 16, 20] }
    ]
  };
  var T1_PROMPT = "The line graph below shows the percentage of students at one university who used four different ways of travelling to campus between 2010 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.";

  var PAD_CHART = {
    type: "bar",
    title: "Average weekly study hours of first-year students at one university, 2015 and 2025",
    unit: "hours",
    labels: ["Lectures", "Library study", "Online learning", "Group work"],
    series: [
      { name: "2015", values: [12, 8, 2, 4] },
      { name: "2025", values: [9, 4, 7, 5] }
    ]
  };
  var PAD_PROMPT = "The bar chart below shows the average number of hours per week that first-year students at one university spent on four types of study in 2015 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.";

  var WRITE1 = {
    id: "write-task1", order: 60, icon: "📊", mins: 40, skill: "w",
    t: ["Writing Task 1: describing a chart", "الكتابة، المهمة 1: وصف رسم بياني"],
    d: ["Find the main trends, write a clear overview, compare band 6 and 7.5 answers, then write your own.", "حدّد الاتجاهات الرئيسية واكتب نظرة عامة واضحة، وقارن إجابتين بدرجة 6 و7.5، ثم اكتب إجابتك."],
    steps: [
      { t: "text", h: ["The task", "المهمة"], p: [
        ["You get a chart, graph, table, map or diagram. You have about 20 minutes to write at least 150 words describing it.", "تحصل على رسم بياني أو جدول أو خريطة أو مخطط، ولديك نحو 20 دقيقة لكتابة 150 كلمة على الأقل في وصفه."],
        ["Your job is to report the main features and compare them. You don't explain why things happened, and you never give your opinion.", "مهمتك أن تعرض أبرز الملامح وتقارن بينها، دون أن تشرح أسباب ما حدث، ودون أن تبدي رأيك أبدًا."],
        ["Spend about 20 minutes on Task 1 and 40 on Task 2. Task 2 is worth more, so don't let Task 1 run over.", "خصص نحو 20 دقيقة للمهمة الأولى و40 للثانية، فالثانية أعلى وزنًا، فلا تدع الأولى تأخذ من وقتها."]],
        list: [
          ["Task achievement: a clear overview, key features selected, accurate figures.", "إنجاز المهمة: نظرة عامة واضحة، واختيار الملامح الأهم، وأرقام دقيقة."],
          ["Coherence and cohesion: data grouped logically into paragraphs, linked smoothly.", "الترابط والتماسك: تجميع البيانات في فقرات منطقية مترابطة بسلاسة."],
          ["Vocabulary: varied words for change and comparison, used accurately.", "المفردات: كلمات متنوعة للتعبير عن التغير والمقارنة، مستخدمة بدقة."],
          ["Grammar: correct tenses and a mix of simple and complex sentences.", "القواعد: أزمنة صحيحة ومزيج من الجمل البسيطة والمركبة."]] },

      { t: "chart", h: ["Read the chart first", "اقرأ الرسم أولًا"], chart: T1_CHART, p: [
        ["Before you write, spend 2–3 minutes looking. Read the title, the years and the unit (here, percentages of students).", "قبل أن تكتب، خصص 2–3 دقائق للتأمل. اقرأ العنوان والسنوات ووحدة القياس (هنا: نسب مئوية من الطلاب)."],
        ["Ask: what is biggest and smallest? What goes up, what goes down, what stays the same? Where do lines cross?", "اسأل نفسك: ما الأكبر وما الأصغر؟ ما الذي يرتفع، وما الذي ينخفض، وما الذي يبقى ثابتًا؟ وأين تتقاطع الخطوط؟"],
        ["Here: car use falls, bus use rises and overtakes it, cycling jumps after 2016, and walking hardly changes.", "هنا: استخدام السيارة ينخفض، والحافلة ترتفع وتتجاوزها، والدراجة تقفز بعد 2016، والمشي لا يكاد يتغير."]] },

      { t: "text", h: ["A four-paragraph plan", "خطة من أربع فقرات"], list: [
        ["Introduction: one sentence saying what the chart shows, in your own words. Don't copy the task.", "المقدمة: جملة واحدة تقول ما يعرضه الرسم بكلماتك، دون نسخ نص المهمة."],
        ["Overview: two or three main trends, usually without numbers. This is the most important paragraph.", "النظرة العامة: اتجاهان أو ثلاثة اتجاهات رئيسية، عادةً دون أرقام، وهي أهم فقرة."],
        ["Body 1: details for one group, with figures and years (for example, car and bus).", "الفقرة الأولى: تفاصيل مجموعة واحدة بالأرقام والسنوات (مثل السيارة والحافلة)."],
        ["Body 2: details for the other group, with comparisons (for example, bicycle and walking).", "الفقرة الثانية: تفاصيل المجموعة الأخرى مع المقارنة (مثل الدراجة والمشي)."]],
        p: [["You don't need a conclusion if your overview is clear. Without an overview, Task achievement is unlikely to go above band 5.", "لا تحتاج إلى خاتمة إذا كانت النظرة العامة واضحة، أما بدونها فيصعب أن تتجاوز درجة إنجاز المهمة 5."],
          ["Don't describe every number. Choose the figures that show the main changes: start, end, highest, lowest, and where lines cross.", "لا تصف كل رقم، بل اختر الأرقام التي تُظهر التغيرات الرئيسية: البداية والنهاية والأعلى والأدنى ونقاط التقاطع."]] },

      { t: "quiz", h: ["Choose the best overview", "اختر أفضل نظرة عامة"], pass: 2, items: [
        { s: "Which sentence is the best overview of the travel chart?", o: [
          "In 2010, 45% of students travelled by car, and by 2025 this figure was 20%.",
          "Overall, the car became far less popular, while the bus became the main way to travel and cycling grew strongly.",
          "Overall, students stopped driving because parking at the university became too expensive.",
          "The graph shows how students at one university travelled to campus between 2010 and 2025."], a: 1,
          x: ["It sums up the main trends for the whole period. The first option is a detail, the third gives a reason the chart doesn't show, and the fourth is an introduction.", "تلخص الاتجاهات الرئيسية للفترة كلها؛ فالخيار الأول تفصيل، والثالث يذكر سببًا لا يُظهره الرسم، والرابع مقدمة."] },
        { s: ["Where should the overview go?", "أين تضع النظرة العامة؟"], o: [
          ["In every body paragraph", "في كل فقرة من فقرات العرض"],
          ["Straight after the introduction, or as a short final paragraph", "بعد المقدمة مباشرة، أو في فقرة قصيرة في النهاية"],
          ["Nowhere: the numbers speak for themselves", "لا مكان لها، فالأرقام تتحدث عن نفسها"]], a: 1,
          x: ["Both places are fine, but putting it after the introduction makes sure you don't run out of time before writing it.", "المكانان مقبولان، لكن وضعها بعد المقدمة يضمن ألا ينفد وقتك قبل كتابتها."] },
        { s: "Which sentence does NOT belong in a Task 1 answer?", o: [
          "Walking remained broadly stable throughout the period.",
          "In my opinion, the university should build more cycle lanes.",
          "By 2019, bus use had overtaken car use.",
          "Cycling peaked at 24% in 2022."], a: 1,
          x: ["Task 1 is a report, so there are no opinions or suggestions.", "المهمة الأولى تقرير، فلا مكان فيها للآراء أو الاقتراحات."] }
      ] },

      { t: "table", h: ["The language of change", "لغة التغيّر"], cols: [["Meaning", "المعنى"], ["Verb + adverb", "فعل + ظرف"], ["Adjective + noun", "صفة + اسم"]], rows: [
        ["Up", "rose / increased / grew (steadily, sharply)", "a steady rise / a sharp increase in…"],
        ["Down", "fell / declined / dropped (slightly, considerably)", "a slight fall / a considerable decline in…"],
        ["No change", "remained stable / stayed at about…", "little change in…"],
        ["Stopped changing", "levelled off at… / stabilised at…", "a period of stability"],
        ["Highest / lowest", "peaked at… / reached a low of…", "a peak of… / a low point of…"],
        ["Up and down", "fluctuated between… and…", "fluctuations in…"],
        ["Proportions", "a quarter (25%), a third (about 33%), almost half (45–49%), a fifth (20%)", "the majority / a small minority of…"]],
        p: [["Use the past simple for past years. Use “by 2025, … had …” for a change completed by a point in time.", "استخدم الماضي البسيط للسنوات الماضية، واستخدم by 2025, … had … لتغيّر اكتمل قبل نقطة زمنية."],
          ["Comparisons: higher than, the most popular, twice as high as, while…, compared with…", "للمقارنة: higher than، وthe most popular، وtwice as high as، وwhile…، وcompared with…"]] },

      { t: "quiz", h: ["Change and comparison", "التغيّر والمقارنة"], pass: 6, items: [
        { s: "Car use ___ from 45% in 2010 to 20% in 2025.", o: ["rose steadily", "fell steadily", "levelled off", "fluctuated"], a: 1, x: ["The line goes down a little every period, so “fell steadily”.", "الخط ينخفض قليلًا في كل فترة، فالأنسب fell steadily."] },
        { s: "Cycling ___ 24% in 2022, then dipped slightly.", o: ["peaked at", "reached a low of", "remained at", "fluctuated at"], a: 0, x: ["24% is its highest point, so it “peaked at” 24%.", "24% أعلى نقطة لها، فنقول peaked at."] },
        { s: "Bus use rose to 36% in 2022 and then ___ at around 37%.", o: ["plunged", "peaked", "levelled off", "declined"], a: 2, x: ["It almost stopped changing, so it “levelled off”.", "توقف تقريبًا عن التغيّر، فنقول levelled off."] },
        { s: "In 2025, 20% of students drove to campus, which is ___ of all students.", o: ["a third", "a quarter", "a fifth", "half"], a: 2, x: ["20% = one in five = a fifth.", "20% تعني واحدًا من كل خمسة، أي a fifth."] },
        { s: "In 2010, ___ students drove to the university (45%).", o: ["more than half of", "almost half of", "a third of", "the majority of"], a: 1, x: ["45% is just under 50%, so “almost half”.", "45% أقل بقليل من 50%، فنقول almost half."] },
        { s: "There was a ___ fall in the number of students walking in 2022.", o: ["slightly", "slight", "slighter", "slightness"], a: 1, x: ["An adjective comes before a noun: “a slight fall”. With a verb, use the adverb: “fell slightly”.", "الصفة تأتي قبل الاسم: a slight fall، ومع الفعل نستخدم الظرف: fell slightly."] },
        { s: "In 2010, car use was almost twice ___ bus use.", o: ["as high as", "higher as", "as higher than", "high than"], a: 0, x: ["The pattern is “twice as + adjective + as”.", "التركيب هو twice as + صفة + as."] },
        { s: "___ car use declined, the proportion of students taking the bus grew.", o: ["However", "Despite", "While", "Because of"], a: 2, x: ["“While” joins two contrasting clauses in one sentence. “However” starts a new sentence.", "While تربط جملتين متضادتين في جملة واحدة، أما However فتبدأ جملة جديدة."] }
      ] },

      { t: "models", h: ["Model answers", "نماذج إجابات"], prompt: T1_PROMPT, chart: T1_CHART, models: [
        { band: "6", text: [
          "The graph shows the percentage of students in a university and how they travel to the campus from 2010 to 2025. There are four types which are car, bus, bicycle and walking.",
          "In 2010 the car was the most popular with 45% and it decreased to 42% in 2013 and 38% in 2016. Then it decreased more to 30% in 2019, 24% in 2022 and 20% in 2025. The bus was 25% in 2010 and it increased every year until it reach 37% in 2025, so in the end the bus is more popular than the car.",
          "The bicycle started at 10% and it was nearly same until 2016. After this it increase quickly to 24% in 2022 and then it was 23% in 2025. Walking was 20% in most years but in 2022 it went down to 16% and after that it go up again to 20%.",
          "In conclusion, the car decreased and the bus and bicycle increased, and walking was stable."],
          notes: [
            ["The main trends are only summed up in the last sentence, and very simply. A clear overview near the start would lift Task achievement.", "الاتجاهات الرئيسية لا تُلخَّص إلا في الجملة الأخيرة وبشكل بسيط جدًا، ونظرة عامة واضحة في البداية سترفع درجة إنجاز المهمة."],
            ["Lists almost every figure instead of selecting key ones. “Increased every year” is inaccurate: the chart only shows every three years.", "يسرد كل الأرقام تقريبًا بدل اختيار أهمها، وعبارة increased every year غير دقيقة لأن الرسم يعرض كل ثلاث سنوات فقط."],
            ["Paragraphs are logical, but linking is repetitive (and… and then… after this).", "الفقرات منطقية، لكن الربط متكرر (and… and then… after this)."],
            ["Limited vocabulary (decreased, increased, went down) and errors such as “until it reach”, “nearly same” and “it go up”. “The car decreased” should be “car use decreased”.", "مفردات محدودة (decreased وincreased وwent down)، وأخطاء مثل until it reach وnearly same وit go up، والصواب car use decreased لا the car decreased."]] },
        { band: "7.5", text: [
          "The line graph illustrates how the proportions of students at one university who travelled to campus by car, by bus, by bicycle and on foot changed between 2010 and 2025.",
          "Overall, the car lost its position as the most common way of getting to campus, with its share falling by more than half, while the bus became the most popular option. Cycling grew considerably, whereas walking remained broadly stable throughout the period.",
          "In 2010, almost half of all students (45%) drove to the university, compared with a quarter who took the bus. Over the following fifteen years, car use declined steadily, reaching just 20% in 2025. Bus use moved in the opposite direction, rising gradually to 33% in 2019, by which point it had overtaken the car, and then levelling off at around 37%.",
          "Cycling was the least popular choice at the start of the period, at only 10%, and it changed little until 2016. After that, however, it rose sharply, peaking at 24% in 2022 before dipping slightly to 23%. The proportion of students who walked stayed at about one in five for most of the period, apart from a brief fall to 16% in 2022, and it returned to 20% in the final year."],
          notes: [
            ["A clear overview straight after the introduction, with the three main trends and no unnecessary numbers.", "نظرة عامة واضحة بعد المقدمة مباشرة، فيها الاتجاهات الثلاثة الرئيسية دون أرقام غير ضرورية."],
            ["Key figures are selected (start, end, peak, the point where bus overtakes car) and all are accurate.", "يختار الأرقام المهمة (البداية والنهاية والذروة ونقطة تجاوز الحافلة للسيارة)، وكلها دقيقة."],
            ["Logical grouping: car and bus together, then bicycle and walking. Linking is varied (whereas, however, by which point).", "تجميع منطقي: السيارة والحافلة معًا ثم الدراجة والمشي، والربط متنوع (whereas وhowever وby which point)."],
            ["Precise language of change and proportion (declined steadily, levelled off, one in five) with accurate complex sentences. To reach 8+, a few comparisons could be sharper, such as “cycling more than doubled”.", "لغة دقيقة للتغير والنسب (declined steadily وlevelled off وone in five) مع جمل مركبة صحيحة، وللوصول إلى 8 فأكثر يمكن جعل بعض المقارنات أدق، مثل cycling more than doubled."]] }
      ] },

      { t: "pad", key: "task1", h: ["Your turn: a new chart", "دورك: رسم بياني جديد"], prompt: PAD_PROMPT, chart: PAD_CHART, min: 150, unit: "words", mins: 20, checks: [
        ["My first sentence says what the chart shows in my own words, not copied from the task.", "جملتي الأولى تقول ما يعرضه الرسم بكلماتي، لا منسوخة من نص المهمة."],
        ["I wrote a clear overview with the two or three main trends.", "كتبت نظرة عامة واضحة فيها اتجاهان أو ثلاثة اتجاهات رئيسية."],
        ["I grouped the data into two body paragraphs instead of describing each bar in turn.", "جمّعت البيانات في فقرتين بدل وصف كل عمود على حدة."],
        ["Every figure I used is accurate, with the right year and unit (hours).", "كل رقم استخدمته دقيق، مع السنة الصحيحة ووحدة القياس (الساعات)."],
        ["I made comparisons (more than, while, compared with, the largest).", "قارنت بين البيانات (more than وwhile وcompared with وthe largest)."],
        ["I gave no opinions or reasons, used the past tense correctly and wrote at least 150 words.", "لم أذكر آراء أو أسبابًا، واستخدمت الماضي بشكل صحيح، وكتبت 150 كلمة على الأقل."]] }
    ]
  };

  // ---------------- speaking part 1 ----------------
  var SPEAK1 = {
    id: "speak-p1", order: 71, icon: "💬", mins: 15, skill: "s",
    t: ["Speaking Part 1: everyday questions", "المحادثة، الجزء 1: أسئلة يومية"],
    d: ["Turn short answers into natural 2–3 sentence replies, then practise with a timer.", "حوّل الإجابات القصيرة إلى ردود طبيعية من جملتين أو ثلاث، ثم تدرّب مع مؤقت."],
    steps: [
      { t: "text", h: ["What happens in Part 1", "ماذا يحدث في الجزء 1"], p: [
        ["Part 1 lasts 4–5 minutes. The examiner asks about 10–12 short questions on two or three familiar topics, such as your studies, your home town or your free time.", "يستغرق الجزء الأول 4–5 دقائق، ويطرح فيه الممتحن نحو 10–12 سؤالًا قصيرًا عن موضوعين أو ثلاثة مألوفة، مثل دراستك أو مدينتك أو وقت فراغك."],
        ["These are easy questions on purpose. The examiner wants to hear how naturally you speak, not how much you know.", "هذه الأسئلة سهلة عن قصد، فالممتحن يريد أن يسمع مدى طبيعية حديثك، لا مقدار معرفتك."]],
        list: [
          ["Your studies or work", "دراستك أو عملك"],
          ["Your home town and where you live", "مدينتك ومكان سكنك"],
          ["Free time, sport and hobbies", "وقت الفراغ والرياضة والهوايات"],
          ["Food, weather, travel, technology, friends and family", "الطعام والطقس والسفر والتقنية والأصدقاء والعائلة"]] },
      { t: "text", h: ["Answer + reason + example", "إجابة + سبب + مثال"], p: [
        ["Aim for 2–3 sentences: give a direct answer, say why, then add a short example or detail. That is usually 15–25 seconds.", "اجعل إجابتك من جملتين أو ثلاث: أجب مباشرة، ثم اذكر السبب، ثم أضف مثالًا أو تفصيلًا قصيرًا، وهذا يستغرق عادةً 15–25 ثانية."]],
        list: [
          ["Don't stop at “yes” or “no”. One-word answers give the examiner nothing to mark.", "لا تكتفِ بـ«نعم» أو «لا»، فالإجابة بكلمة واحدة لا تعطي الممتحن ما يقيّمه."],
          ["Don't give a speech either. Part 1 is a conversation, so keep it short and move on.", "ولا تُلقِ خطبة أيضًا، فالجزء الأول محادثة، فاجعل ردك قصيرًا وانتقل."],
          ["Don't memorise answers. Examiners recognise learned scripts and may change the question to test you.", "لا تحفظ إجابات جاهزة، فالممتحن يميّز النصوص المحفوظة وقد يغيّر السؤال ليختبرك."],
          ["Listen for the tense: “Did you…?” needs the past, “Do you…?” the present, “Would you like to…?” the future.", "انتبه للزمن: Did you…? تحتاج الماضي، وDo you…? المضارع، وWould you like to…? المستقبل."],
          ["If you don't catch a question, say “Sorry, could you repeat that, please?” It costs you nothing.", "إن لم تفهم السؤال فقل: Sorry, could you repeat that, please? فهذا لا يُنقص درجتك."]] },
      { t: "quiz", h: ["Which answer is better?", "أي إجابة أفضل؟"], pass: 3, items: [
        { s: "Examiner: “Do you enjoy cooking?”", o: [
          "Yes.",
          "Yes, I do, especially on weekends when I have more time. I've recently learned to make kabsa from my mother, and my flatmates love it."], a: 1,
          x: ["The second answer gives a reason (more time at weekends) and a real example. The first gives the examiner nothing to assess.", "الإجابة الثانية تذكر سببًا (وقت أكثر في العطلة) ومثالًا حقيقيًا، أما الأولى فلا تعطي الممتحن شيئًا يقيّمه."] },
        { s: "Examiner: “Is your home town a good place for young people?”", o: [
          "I'd say it is, actually. There are lots of new cafés and sports centres, so there's always somewhere to meet friends, although public transport could be better.",
          "Yes, good."], a: 0,
          x: ["The first answer gives an opinion, a reason and even a small contrast (although…). “Yes, good” is too short and not a full sentence.", "الإجابة الأولى تعطي رأيًا وسببًا بل وتضادًا صغيرًا (although…)، أما Yes, good فقصيرة جدًا وليست جملة كاملة."] },
        { s: "Examiner: “Did you like reading when you were a child?”", o: [
          "No.",
          "Not really, to be honest. I preferred playing football outside, and I only started reading for fun when I was about fifteen."], a: 1,
          x: ["The second answer uses the past tense correctly, explains why, and adds a detail. It's also natural: “Not really, to be honest” sounds like real speech.", "الإجابة الثانية تستخدم الماضي بشكل صحيح وتشرح السبب وتضيف تفصيلًا، وهي طبيعية أيضًا، فعبارة Not really, to be honest تشبه الكلام الحقيقي."] }
      ] },
      { t: "qa", part: 1, secs: 30, h: ["Practise Part 1", "تدرّب على الجزء 1"], sets: [
        { topic: "Your studies", qs: [
          "What are you studying at the moment?",
          "Why did you choose this subject?",
          "Do you prefer studying in the morning or in the evening?",
          "What would you like to do after you finish your studies?"] },
        { topic: "Free time", qs: [
          "What do you usually do in your free time?",
          "Do you prefer spending your free time alone or with other people?",
          "Has the way you spend your free time changed since you were a child?",
          "Is there a new hobby you would like to try?"] },
        { topic: "Technology", qs: [
          "How much time do you spend on your phone each day?",
          "Which app do you find most useful?",
          "Did you use computers much when you were at school?",
          "Do you think you spend too much time online?"] }
      ] }
    ]
  };

  // ---------------- speaking part 3 ----------------
  var SPEAK3 = {
    id: "speak-p3", order: 72, icon: "🗣️", mins: 18, skill: "s",
    t: ["Speaking Part 3: discussing ideas", "المحادثة، الجزء 3: مناقشة الأفكار"],
    d: ["Give longer answers on bigger questions: explain, compare past and present, and speculate.", "قدّم إجابات أطول عن أسئلة أعمق: اشرح، وقارن الماضي بالحاضر، وتوقّع المستقبل."],
    steps: [
      { t: "text", h: ["What changes in Part 3", "ما الذي يتغير في الجزء 3"], p: [
        ["Part 3 lasts 4–5 minutes. The questions are linked to your Part 2 topic, but they are about people and society in general, not just about you.", "يستغرق الجزء الثالث 4–5 دقائق، وأسئلته مرتبطة بموضوع الجزء الثاني، لكنها عن الناس والمجتمع عمومًا، لا عنك وحدك."],
        ["Answers should be longer than in Part 1: usually 3–5 sentences, or about 30–60 seconds.", "يجب أن تكون الإجابات أطول من الجزء الأول: عادةً من 3 إلى 5 جمل، أو نحو 30–60 ثانية."],
        ["There is no right answer. You are marked on how well you express and support ideas, not on the ideas themselves.", "لا توجد إجابة صحيحة، فأنت تُقيَّم على قدرتك على التعبير عن الأفكار ودعمها، لا على الأفكار نفسها."]] },
      { t: "table", h: ["Extend your answer: point, explain, example, contrast", "وسّع إجابتك: فكرة، شرح، مثال، تضاد"], cols: [["Step", "الخطوة"], ["Example: “Do young people read less than in the past?”", "مثال: «هل يقرأ الشباب أقل من الماضي؟»"]], rows: [
        ["Point", "I'd say they read just as much, but in a different way."],
        ["Explain", "Most of their reading now happens on screens, through articles, messages and online forums, rather than in printed books."],
        ["Example", "My younger brother rarely opens a novel, but he reads long posts about science and football every day."],
        ["Contrast", "That said, reading on a phone is often quick and shallow, so I think people may be losing the habit of reading deeply."]],
        p: [["You don't need all four every time, but two or three steps turn a short reply into a strong Part 3 answer.", "لا تحتاج إلى الخطوات الأربع في كل مرة، لكن خطوتين أو ثلاثًا تحوّل الرد القصير إلى إجابة قوية."]] },
      { t: "table", h: ["Useful language", "عبارات مفيدة"], cols: [["Purpose", "الغرض"], ["Phrases", "العبارات"]], rows: [
        ["Giving an opinion", "In my view… / I'd say that… / I tend to think… / It depends on…"],
        ["Being careful", "I'm not entirely sure, but… / To some extent… / Generally speaking…"],
        ["Past and present", "People used to…, whereas nowadays… / Compared with twenty years ago… / These days, more and more…"],
        ["Speculating about the future", "I imagine that… / It's quite likely that… / In the next twenty years, we might… / I doubt that…"],
        ["Buying thinking time", "That's an interesting question. / I've never really thought about that, but… / Let me think for a moment."]],
        p: [["Use a thinking-time phrase once or twice, not before every answer. Then start your point quickly.", "استخدم عبارة كسب الوقت مرة أو مرتين لا قبل كل إجابة، ثم ابدأ بفكرتك بسرعة."],
          ["The examiner may disagree with you or ask “Why?”. That's normal, and it's a chance to show more language.", "قد يخالفك الممتحن أو يسألك «لماذا؟»، وهذا طبيعي، وهو فرصة لتُظهر مزيدًا من لغتك."]] },
      { t: "quiz", h: ["Check yourself", "اختبر نفسك"], pass: 3, items: [
        { s: "Which phrase is best for speculating about the future?", o: ["People used to…", "I imagine that in twenty years…", "Compared with the past…", "In my free time…"], a: 1, x: ["“I imagine that…” introduces a guess about the future. The others are for the past or for personal habits.", "I imagine that… تقدّم توقعًا للمستقبل، أما البقية فللماضي أو للعادات الشخصية."] },
        { s: "Which is the best way to buy a little thinking time?", o: ["Stay silent for ten seconds.", "Say: “That's a difficult question. Let me think…”", "Say: “I don't know.”", "Ask to change the question."], a: 1, x: ["A natural phrase keeps you speaking while you think. Long silence hurts fluency, and “I don't know” ends the answer.", "العبارة الطبيعية تُبقيك متحدثًا وأنت تفكر، أما الصمت الطويل فيضر بالطلاقة، وعبارة I don't know تنهي الإجابة."] },
        { s: "Examiner: “Do people spend less time outdoors than in the past?” Which answer is strongest?", o: [
          "Yes, they do. Less time outdoors.",
          "I love being outdoors. Every weekend I go to the desert with my friends and we have a barbecue.",
          "I think so, yes. People used to walk to shops and visit neighbours, whereas now many things are done online. That said, parks in many cities are busier than ever in the evenings."], a: 2,
          x: ["The third answer gives a point, explains it by comparing past and present, and adds a contrast. The second is only about the speaker, not people in general.", "الإجابة الثالثة تطرح فكرة وتشرحها بمقارنة الماضي بالحاضر وتضيف تضادًا، أما الثانية فعن المتحدث وحده لا عن الناس عمومًا."] },
        { s: "Which sentence correctly compares the past and the present?", o: [
          "In the past people use to walk more, nowadays they drive.",
          "People used to walk much more, whereas nowadays most of them drive.",
          "People are used to walk more in the past."], a: 1,
          x: ["“Used to + verb” describes past habits, and “whereas” links the contrast. “Use to” and “are used to walk” are errors.", "used to + فعل تصف عادات الماضي، وwhereas تربط التضاد، أما use to وare used to walk فخطأ."] }
      ] },
      { t: "qa", part: 3, secs: 60, h: ["Practise Part 3", "تدرّب على الجزء 3"], sets: [
        { topic: "Education and technology", qs: [
          "How has technology changed the way students learn?",
          "Do you think online courses will ever replace traditional universities?",
          "What are the disadvantages of using computers in the classroom?",
          "Should young children be allowed to use tablets at school?"] },
        { topic: "Cities and the environment", qs: [
          "What are the main environmental problems in large cities?",
          "Whose responsibility is it to keep cities clean: the government's or individuals'?",
          "How have cities in your country changed in the last twenty years?",
          "What could cities do to encourage people to use their cars less?"] }
      ] }
    ]
  };

  // ---------------- vocabulary deck 2 ----------------
  var VOCAB2 = {
    id: "vocab2", order: 81, icon: "🌿", mins: 10, skill: "v",
    t: ["Vocabulary 2: environment and energy", "المفردات 2: البيئة والطاقة"],
    d: ["24 words for essays, charts and discussions about the planet and its resources.", "24 كلمة للمقالات والرسوم البيانية والنقاشات عن الكوكب وموارده."],
    steps: [{ t: "cards" }],
    words: [
      ["emission", "noun", "gas or other substance sent out into the air", "انبعاث", "Many countries have set targets to cut carbon emissions by 2050."],
      ["renewable", "adj", "coming from a source that is not used up, such as the sun or wind", "متجدد", "Renewable energy now supplies a growing share of the country's electricity."],
      ["fossil fuel", "noun", "coal, oil or gas formed from the remains of ancient plants and animals", "وقود أحفوري", "Burning fossil fuels is the main cause of rising carbon dioxide levels."],
      ["sustainable", "adj", "able to continue for a long time without harming the environment", "مستدام", "The city aims to make its water use more sustainable."],
      ["conservation", "noun", "the protection of nature, wildlife or resources", "الحفاظ على البيئة، الصون", "Conservation projects have helped some endangered species to recover."],
      ["pollution", "noun", "harmful substances in the air, water or soil", "تلوث", "Traffic is a major source of air pollution in large cities."],
      ["biodiversity", "noun", "the variety of plant and animal life in an area", "التنوع الحيوي", "Coral reefs have some of the highest levels of biodiversity on Earth."],
      ["deforestation", "noun", "the cutting down of large areas of forest", "إزالة الغابات", "Deforestation reduces the number of trees that absorb carbon dioxide."],
      ["drought", "noun", "a long period with little or no rain", "جفاف", "The drought forced farmers to reduce the amount of land they planted."],
      ["habitat", "noun", "the natural home of a plant or animal", "موطن طبيعي", "New roads can divide an animal's habitat into smaller areas."],
      ["consumption", "noun", "the amount of something that is used", "استهلاك", "Energy consumption rises sharply in summer because of air conditioning."],
      ["efficient", "adj", "working well without wasting energy, time or money", "كفء، موفّر", "LED lights are far more efficient than traditional bulbs."],
      ["depletion", "noun", "a reduction in the amount of something until little is left", "استنزاف", "The depletion of groundwater is a serious concern in dry regions."],
      ["mitigate", "verb", "to make something harmful less serious", "يخفّف من", "Planting trees in cities can help to mitigate the effects of extreme heat."],
      ["recycle", "verb", "to treat used materials so they can be used again", "يعيد التدوير", "The university now recycles most of its paper and plastic waste."],
      ["desalination", "noun", "the process of removing salt from seawater", "تحلية المياه", "Desalination provides much of the drinking water in the Gulf region."],
      ["solar", "adj", "using or relating to energy from the sun", "شمسي", "Solar panels on the roof provide power for the whole building."],
      ["carbon footprint", "noun", "the amount of carbon dioxide caused by a person's or group's activities", "البصمة الكربونية", "Taking the train instead of flying can reduce your carbon footprint."],
      ["contaminate", "verb", "to make something dirty or harmful by adding a dangerous substance", "يلوّث", "Chemicals from the factory contaminated the local river."],
      ["ecosystem", "noun", "all the living things in an area and how they affect each other", "نظام بيئي", "Removing one species can upset the balance of an entire ecosystem."],
      ["scarcity", "noun", "a situation in which there is not enough of something", "ندرة، شُح", "Water scarcity is expected to affect more regions in the coming decades."],
      ["generate", "verb", "to produce energy or power", "يولّد", "Wind turbines generate electricity without burning fuel."],
      ["degrade", "verb", "to damage something so that its quality becomes worse", "يُتلف، يُدهور", "Overgrazing can degrade farmland until nothing will grow."],
      ["landfill", "noun", "a place where waste is buried under the ground", "مكبّ النفايات", "Most household rubbish still ends up in landfill."]
    ]
  };

  // ---------------- vocabulary deck 3 ----------------
  var VOCAB3 = {
    id: "vocab3", order: 82, icon: "💡", mins: 10, skill: "v",
    t: ["Vocabulary 3: technology and society", "المفردات 3: التقنية والمجتمع"],
    d: ["24 words for talking and writing about how technology shapes our lives.", "24 كلمة للحديث والكتابة عن تأثير التقنية في حياتنا."],
    steps: [{ t: "cards" }],
    words: [
      ["innovation", "noun", "a new idea, method or product", "ابتكار", "Innovation in battery design has made electric cars more practical."],
      ["automation", "noun", "the use of machines or computers to do work instead of people", "الأتمتة", "Automation has reduced the number of workers needed in many factories."],
      ["digital", "adj", "using or relating to computers and electronic data", "رقمي", "Most banks now offer digital services through an app."],
      ["device", "noun", "a piece of equipment made for a particular purpose", "جهاز", "Students are allowed to bring one electronic device into the library."],
      ["access", "noun", "the ability or right to use or reach something", "إمكانية الوصول", "Rural areas often have limited access to fast internet."],
      ["privacy", "noun", "the right to keep personal information to yourself", "الخصوصية", "Many users are worried about the privacy of their online data."],
      ["surveillance", "noun", "the careful watching of people, often by cameras or authorities", "المراقبة", "Video surveillance has been installed at all the station entrances."],
      ["algorithm", "noun", "a set of rules a computer follows to solve a problem", "خوارزمية", "The app uses an algorithm to suggest videos you might like."],
      ["artificial intelligence", "noun", "computer systems that can perform tasks that normally need human thinking", "الذكاء الاصطناعي", "Artificial intelligence is increasingly used to help doctors read medical scans."],
      ["obsolete", "adj", "no longer used because something newer has replaced it", "متقادم، عفا عليه الزمن", "Many of the skills taught twenty years ago are now obsolete."],
      ["transform", "verb", "to change something completely, usually for the better", "يُحدث تحوّلًا في", "Smartphones have transformed the way people shop."],
      ["dependence", "noun", "the state of needing something in order to function", "الاعتماد", "Some experts warn about young people's dependence on social media."],
      ["interact", "verb", "to communicate or work together with someone or something", "يتفاعل", "Online courses allow students to interact with classmates in other countries."],
      ["isolation", "noun", "the state of being alone or separated from others", "العزلة", "Spending too long online can lead to feelings of isolation."],
      ["misinformation", "noun", "false or misleading information", "معلومات مضللة", "Misinformation can spread quickly through messaging apps."],
      ["breakthrough", "noun", "an important new discovery or development", "إنجاز علمي، اختراق", "The research team announced a breakthrough in solar battery storage."],
      ["cybersecurity", "noun", "the protection of computers and networks from attack", "الأمن السيبراني", "Demand for cybersecurity specialists is growing rapidly."],
      ["remote", "adj", "done from a distance, not in the same place", "عن بُعد", "Remote learning became common for many universities in the early 2020s."],
      ["virtual", "adj", "created by computers to seem real", "افتراضي", "Engineering students can now practise in a virtual laboratory."],
      ["adopt", "verb", "to start using a new method, idea or technology", "يتبنّى", "Several hospitals have adopted electronic patient records."],
      ["widespread", "adj", "happening or existing in many places or among many people", "واسع الانتشار", "The use of contactless payment is now widespread."],
      ["infrastructure", "noun", "the basic systems a society needs, such as roads, power and networks", "البنية التحتية", "The government is investing in digital infrastructure in smaller towns."],
      ["regulate", "verb", "to control something by rules or laws", "ينظّم بالقوانين", "Many countries are discussing how to regulate the use of personal data."],
      ["disrupt", "verb", "to change an industry or activity in a sudden, major way", "يُحدث اضطرابًا في، يُخلخل", "Online streaming has disrupted the traditional television industry."]
    ]
  };

  // ---------------- vocabulary deck 4 ----------------
  var VOCAB4 = {
    id: "vocab4", order: 83, icon: "🩺", mins: 10, skill: "v",
    t: ["Vocabulary 4: health and lifestyle", "المفردات 4: الصحة ونمط الحياة"],
    d: ["24 words for common IELTS topics on diet, exercise, sleep and well-being.", "24 كلمة لمواضيع IELTS الشائعة عن الغذاء والرياضة والنوم والعافية."],
    steps: [{ t: "cards" }],
    words: [
      ["sedentary", "adj", "involving a lot of sitting and little physical activity", "قليل الحركة، خامل", "Office workers often have a sedentary lifestyle."],
      ["obesity", "noun", "the condition of being very overweight", "السمنة", "Rates of childhood obesity have risen in many countries."],
      ["nutrition", "noun", "the food your body needs to be healthy, and the study of it", "التغذية", "Good nutrition is essential for children's growth."],
      ["balanced diet", "noun", "a diet with the right amounts of different types of food", "نظام غذائي متوازن", "A balanced diet includes plenty of fruit, vegetables and whole grains."],
      ["chronic", "adj", "lasting a long time or coming back often (of an illness)", "مزمن", "Diabetes is a chronic condition that needs careful management."],
      ["prevention", "noun", "action taken to stop something bad from happening", "الوقاية", "Many doctors argue that prevention is cheaper than treatment."],
      ["well-being", "noun", "the state of being healthy, happy and comfortable", "العافية، الرفاه", "Regular exercise improves both physical and mental well-being."],
      ["anxiety", "noun", "a feeling of worry or nervousness", "القلق", "Exam anxiety affects many students in their first year."],
      ["symptom", "noun", "a sign of an illness", "عَرَض", "A high temperature is a common symptom of flu."],
      ["diagnose", "verb", "to identify an illness after examining someone", "يشخّص", "The condition is often diagnosed during a routine blood test."],
      ["treatment", "noun", "medical care given to a patient", "علاج", "The new treatment has shortened recovery times."],
      ["life expectancy", "noun", "the average number of years a person is expected to live", "متوسط العمر المتوقع", "Life expectancy has increased thanks to better healthcare."],
      ["hygiene", "noun", "keeping yourself and your surroundings clean to prevent illness", "النظافة الصحية", "Washing hands regularly is a simple rule of good hygiene."],
      ["vaccinate", "verb", "to give someone a substance that protects them from a disease", "يطعّم، يلقّح", "Most children are vaccinated against measles before they start school."],
      ["moderate", "adj", "neither too much nor too little", "معتدل", "Thirty minutes of moderate exercise a day can lower the risk of heart disease."],
      ["deprivation", "noun", "the lack of something you need", "الحرمان", "Sleep deprivation can make it harder to concentrate in lectures."],
      ["addictive", "adj", "making people unable to stop using or doing it", "مسبّب للإدمان", "Some researchers believe that certain mobile games are designed to be addictive."],
      ["fatigue", "noun", "extreme tiredness", "إرهاق", "Long working hours can lead to fatigue and mistakes."],
      ["immune system", "noun", "the parts of the body that fight infection", "جهاز المناعة", "Enough sleep helps to keep the immune system strong."],
      ["posture", "noun", "the way you hold your body when sitting or standing", "وضعية الجسم", "Poor posture at a desk can cause back pain."],
      ["recover", "verb", "to become healthy again after an illness or injury", "يتعافى", "It took him six weeks to recover fully from the knee operation."],
      ["consult", "verb", "to go to a doctor or expert for advice", "يستشير", "You should consult a doctor before starting a strict diet."],
      ["intake", "noun", "the amount of food, drink or a substance that you take in", "الكمية المتناولة", "Reducing your sugar intake is one of the easiest ways to improve your diet."],
      ["mental health", "noun", "the condition of a person's mind and emotions", "الصحة النفسية", "Universities are offering more support for students' mental health."]
    ]
  };

  (window.MasarokParts = window.MasarokParts || []).push({ course: "ielts", lessons: [WRITE1, SPEAK1, SPEAK3, VOCAB2, VOCAB3, VOCAB4] });
})();

/* Masarok Academy · Application writing coach.
   Original Masarok guidance for the writing each country asks for, from first ideas to a final draft.
   Teaching text is [English, Arabic]; example sentences and writing tasks are English. */
(function () {
  "use strict";

  // ---------------- 10 · find your story (all) ----------------
  var STORY = {
    id: "find-story", order: 10, icon: "💡", mins: 15, skill: "app",
    t: ["Find your story", "اعثر على قصتك"],
    d: ["What admissions readers look for, and how to find real experiences worth writing about.", "ما الذي يبحث عنه قرّاء طلبات القبول، وكيف تجد تجارب حقيقية تستحق الكتابة عنها."],
    steps: [
      { t: "text", h: ["Who reads your writing?", "من يقرأ ما تكتبه؟"], p: [
        ["Your statement or essay is read by real people: admissions staff, lecturers or, for a visa, a case officer. They read many applications, often quickly.", "يقرأ بيانك أو مقالك أشخاص حقيقيون: موظفو القبول أو الأساتذة، أو موظف الحالة في طلب التأشيرة. وهم يقرؤون طلبات كثيرة، وغالبًا بسرعة."],
        ["They are not looking for perfect English or a dramatic life. They want to understand who you are, why you chose this path, and whether you are ready for it.", "لا يبحثون عن إنجليزية مثالية أو حياة مليئة بالأحداث المثيرة، بل يريدون أن يفهموا من أنت، ولماذا اخترت هذا الطريق، وهل أنت مستعد له."]],
        list: [
          ["Real interest, backed by evidence: something you did, read, built or asked.", "اهتمام حقيقي تدعمه أدلة: شيء فعلته أو قرأته أو صنعته أو تساءلت عنه."],
          ["Reflection: what you learned, not only what happened.", "التأمل: ما الذي تعلمته، لا ما حدث فقط."],
          ["Specific details that only you could write.", "تفاصيل محددة لا يستطيع أحد غيرك أن يكتبها."],
          ["A clear link between your experiences and what you want to study.", "رابط واضح بين تجاربك وما تريد دراسته."],
          ["Clear, honest writing in your own voice.", "كتابة واضحة وصادقة بأسلوبك أنت."]] },
      { t: "text", h: ["Ordinary experiences count", "التجارب العادية لها قيمة"], p: [
        ["Many students think they have nothing to write about. That is rarely true. Helping in a family shop, fixing a problem at home, a school project, an online course or a book that changed how you think can all become strong material.", "يظن كثير من الطلاب أنه لا شيء لديهم يكتبون عنه، وهذا نادرًا ما يكون صحيحًا. فمساعدتك في متجر العائلة، أو حلّك لمشكلة في البيت، أو مشروع مدرسي، أو دورة عبر الإنترنت، أو كتاب غيّر طريقة تفكيرك، كلها مواد قوية."],
        ["What makes an experience useful is not how impressive it sounds, but what you noticed, what you did and what it taught you.", "قيمة التجربة لا تأتي من مدى إبهارها، بل مما لاحظته وما فعلته وما تعلمته منها."],
        ["Write short notes now. Do not worry about grammar or style yet. You will use these notes in later lessons.", "اكتب ملاحظات قصيرة الآن، ولا تقلق بشأن القواعد أو الأسلوب بعد، فستستخدم هذه الملاحظات في الدروس القادمة."]] },
      { t: "notes", key: "stories", h: ["Brainstorm: your raw material", "عصف ذهني: مادتك الخام"], prompts: [
        ["Describe a problem you solved, at school, at home or at work. What did you actually do?", "صِف مشكلة حللتها في المدرسة أو البيت أو العمل. ماذا فعلت بالضبط؟"],
        ["A project you worked on (school, personal or online). What was hard about it?", "مشروع عملت عليه (مدرسي أو شخصي أو عبر الإنترنت). ما الصعب فيه؟"],
        ["A book, video, course or topic you explored on your own. What question did it leave you with?", "كتاب أو مقطع أو دورة أو موضوع استكشفته بنفسك. ما السؤال الذي تركه في ذهنك؟"],
        ["A responsibility you carry at home or at work. What has it taught you?", "مسؤولية تتحملها في البيت أو العمل. ماذا علّمتك؟"],
        ["A challenge or setback you faced. What did you change afterwards?", "تحدٍّ أو تعثر واجهته. ما الذي غيّرته بعده؟"],
        ["The moment you first became interested in your subject. Where were you, and what happened?", "اللحظة التي بدأ فيها اهتمامك بتخصصك. أين كنت؟ وماذا حدث؟"],
        ["Something you do in your free time that connects to your subject, even loosely.", "شيء تفعله في وقت فراغك يرتبط بتخصصك ولو بشكل بسيط."],
        ["What you want to do after you graduate, and why it matters to you.", "ماذا تريد أن تفعل بعد التخرج، ولماذا يهمك ذلك؟"]] },
      { t: "text", h: ["Choose your best material", "اختر أفضل ما لديك"], p: [
        ["Look back at your notes. Circle the two or three that have the most specific details and the clearest link to your subject.", "راجع ملاحظاتك، واختر اثنتين أو ثلاثًا فيها أكثر التفاصيل تحديدًا وأوضح صلة بتخصصك."],
        ["For each one, check that you can answer four questions:", "وتأكد أنك تستطيع أن تجيب عن أربعة أسئلة لكل واحدة منها:"]],
        list: [
          ["What happened? (one or two sentences)", "ماذا حدث؟ (جملة أو جملتان)"],
          ["What did I do? (your actions, not the group's)", "ماذا فعلتُ أنا؟ (أفعالك أنت، لا أفعال المجموعة)"],
          ["What did I learn or notice?", "ماذا تعلمتُ أو لاحظت؟"],
          ["How does it connect to what I want to study?", "كيف يرتبط ذلك بما أريد دراسته؟"]] }
    ]
  };

  // ---------------- 20 · show, don't tell (all) ----------------
  var SHOW = {
    id: "show-tell", order: 20, icon: "🎬", mins: 15, skill: "app",
    t: ["Show, don't tell", "اعرض ولا تكتفِ بالقول"],
    d: ["Turn claims about yourself into moments a reader can picture.", "حوّل ادعاءاتك عن نفسك إلى مواقف يتخيلها القارئ."],
    steps: [
      { t: "text", h: ["Telling vs showing", "القول مقابل العرض"], p: [
        ["Telling means stating a quality: “I am curious”, “I am a leader”, “I love chemistry”. Anyone can write these sentences, so they prove very little.", "القول هو أن تذكر صفة مباشرة مثل: “I am curious” أو “I am a leader” أو “I love chemistry”. يستطيع أي شخص أن يكتب هذه الجمل، لذلك فهي لا تثبت الكثير."],
        ["Showing means describing what you did, so the reader reaches the conclusion alone. “I stayed after class three weeks in a row to test why our filter clogged” shows curiosity without using the word.", "أما العرض فهو أن تصف ما فعلته، فيصل القارئ إلى الاستنتاج بنفسه. فجملة “I stayed after class three weeks in a row to test why our filter clogged” تُظهر فضولك دون أن تذكر الكلمة."],
        ["You do not need to remove every telling sentence. Use one short statement, then prove it with a detail.", "لا يلزمك حذف كل جملة من هذا النوع، بل استخدم جملة قصيرة واحدة ثم أثبتها بتفصيل."]] },
      { t: "text", h: ["A simple pattern", "نمط بسيط"], p: [
        ["When you want to show a quality, try these four parts. Keep each one short.", "عندما تريد أن تُظهر صفة ما، جرّب هذه الأجزاء الأربعة، واجعل كل جزء قصيرًا."]],
        list: [
          ["Moment: a specific time and place.", "اللحظة: وقت ومكان محددان."],
          ["Action: what you did, in concrete verbs.", "الفعل: ما فعلته، بأفعال ملموسة."],
          ["Result: what changed, with a number or detail if you have one.", "النتيجة: ما الذي تغيّر، مع رقم أو تفصيل إن وُجد."],
          ["Reflection: what it taught you, and why it matters for your subject.", "التأمل: ما الذي تعلمته، ولماذا يهم ذلك في تخصصك."]] },
      { t: "quiz", h: ["Which is stronger?", "أيهما أقوى؟"], pass: 3, items: [
        { s: ["Which sentence is stronger?", "أي الجملتين أقوى؟"], o: ["I am a very curious person who always wants to know how things work.", "When our washing machine started leaking, I took the back panel off and found a cracked hose that cost 20 riyals to replace."], a: 1, x: ["The second shows curiosity through an action and a result. The first only claims it.", "الجملة الثانية تُظهر الفضول من خلال فعل ونتيجة، أما الأولى فتدّعيه فقط."] },
        { s: ["Which sentence is stronger?", "أي الجملتين أقوى؟"], o: ["I am a natural leader and I work well in teams.", "When our group project fell two weeks behind, I split the work into weekly tasks and checked in with each person every Sunday. We submitted on time."], a: 1, x: ["The second gives a problem, specific actions and an outcome, so the reader can judge your leadership.", "الجملة الثانية تذكر مشكلة وأفعالًا محددة ونتيجة، فيستطيع القارئ أن يحكم على قدرتك القيادية بنفسه."] },
        { s: ["Which sentence is stronger?", "أي الجملتين أقوى؟"], o: ["Translating my grandfather's hospital reports from English showed me how much a clear explanation can calm a worried family.", "I want to study medicine because I like helping people."], a: 0, x: ["The first is a real moment with a specific insight. The second could be written by almost any applicant.", "الأولى موقف حقيقي فيه فكرة محددة، أما الثانية فيمكن أن يكتبها أي متقدم تقريبًا."] },
        { s: ["Which sentence is stronger?", "أي الجملتين أقوى؟"], o: ["Working weekends at my uncle's electronics shop taught me to explain a warranty in plain words to customers who were already frustrated.", "I learned a lot of useful skills from my part-time job."], a: 0, x: ["The first names the place, the task and the skill. “A lot of useful skills” tells the reader nothing.", "الأولى تحدد المكان والمهمة والمهارة، أما عبارة “a lot of useful skills” فلا تخبر القارئ بشيء."] }
      ] },
      { t: "pad", key: "showtell", h: ["Your turn: rewrite it", "دورك: أعد الكتابة"],
        prompt: "Rewrite this telling sentence as a showing paragraph about your own experience: “I have always been interested in my subject.” Describe one real moment, what you did, what happened, and what you learned. Use your notes from lesson 1.",
        min: 60, max: 150, unit: "words", checks: [
          ["I describe one specific moment, not my whole life.", "أصف لحظة واحدة محددة، لا حياتي كلها."],
          ["I use concrete actions (I built, I asked, I tested), not only feelings.", "أستخدم أفعالًا ملموسة (بنيتُ، سألتُ، جرّبتُ)، لا مشاعر فقط."],
          ["There is at least one detail only I could write.", "يوجد تفصيل واحد على الأقل لا يستطيع غيري كتابته."],
          ["The last sentence links the moment to my subject.", "الجملة الأخيرة تربط الموقف بتخصصي."],
          ["Everything I wrote is true.", "كل ما كتبته صحيح."]] }
    ]
  };

  // ---------------- 30 · cut the clichés (all) ----------------
  var CLICHE = {
    id: "cliches", order: 30, icon: "✂️", mins: 10, skill: "app",
    t: ["Cut the clichés", "تخلّص من العبارات المستهلكة"],
    d: ["Spot the phrases every reader has seen a thousand times, and replace them with you.", "اكتشف العبارات التي رآها كل قارئ ألف مرة، واستبدلها بما يعبّر عنك."],
    steps: [
      { t: "text", h: ["What is a cliché?", "ما العبارة المستهلكة؟"], p: [
        ["A cliché is a phrase used so often that it has lost its meaning. Readers skip over it, and it makes your writing sound like everyone else's.", "العبارة المستهلكة هي عبارة تكررت كثيرًا حتى فقدت معناها، فيتجاوزها القارئ، وتجعل كتابتك تشبه كتابة الجميع."],
        ["These are some of the most common in applications:", "وهذه بعض أكثرها شيوعًا في طلبات القبول:"]],
        list: [
          ["“Ever since I was a child…”", "“Ever since I was a child…” (منذ أن كنت طفلًا…)"],
          ["“I have always been passionate about…”", "“I have always been passionate about…” (لطالما كنت شغوفًا بـ…)"],
          ["“I want to make a difference in the world.”", "“I want to make a difference in the world.” (أريد أن أُحدث فرقًا في العالم)"],
          ["“In today's fast-paced world…”", "“In today's fast-paced world…” (في عالمنا المتسارع اليوم…)"],
          ["“The dictionary defines… as…”", "“The dictionary defines… as…” (يعرّف القاموس… بأنه…)"],
          ["“This was a life-changing experience.”", "“This was a life-changing experience.” (كانت تجربة غيّرت حياتي)"],
          ["“I am hardworking, dedicated and a team player.”", "“I am hardworking, dedicated and a team player.” (أنا مجتهد ومتفانٍ وأحب العمل الجماعي)"]] },
      { t: "text", h: ["How to fix one", "كيف تعالجها"], p: [
        ["Ask yourself: could hundreds of other applicants write this exact sentence? If yes, replace it with a detail from your own life.", "اسأل نفسك: هل يستطيع مئات المتقدمين غيري كتابة هذه الجملة نفسها؟ إن كانت الإجابة نعم، فاستبدلها بتفصيل من حياتك."],
        ["Instead of “I have always been passionate about engineering”, write what you did: the first thing you built, the question you could not stop asking, the problem you tried to solve.", "بدلًا من “I have always been passionate about engineering”، اكتب ما فعلته: أول شيء صنعته، أو السؤال الذي لم تتوقف عن طرحه، أو المشكلة التي حاولت حلّها."],
        ["The writing tools in this course flag common clichés as you type. Treat the flag as a question, not a rule.", "تنبّهك أدوات الكتابة في هذه الدورة إلى العبارات المستهلكة الشائعة أثناء الكتابة. تعامل مع التنبيه على أنه سؤال، لا قاعدة."]] },
      { t: "quiz", h: ["Spot and fix", "اكتشف وصحّح"], pass: 3, items: [
        { s: ["Which opening is stronger?", "أي افتتاحية أقوى؟"], o: ["Ever since I was a child, I have dreamed of becoming an engineer.", "The first bridge I designed was made of spaghetti, and it collapsed under 300 grams."], a: 1, x: ["The second starts with a specific, memorable moment. The first is one of the most common openings readers see.", "الثانية تبدأ بموقف محدد يبقى في الذاكرة، أما الأولى فمن أكثر الافتتاحيات التي يراها القرّاء تكرارًا."] },
        { s: ["Which sentence is a cliché?", "أي جملة تُعد عبارة مستهلكة؟"], o: ["I want to make a difference in the world.", "I want to design safer ventilation systems for underground mines.", "I want to work on water treatment for small towns."], a: 0, x: ["“Make a difference” is vague. The other two name a real goal.", "عبارة “make a difference” مبهمة، أما الجملتان الأخريان فتحددان هدفًا حقيقيًا."] },
        { s: ["What is the best replacement for “I am hardworking and dedicated”?", "ما أفضل بديل لجملة “I am hardworking and dedicated”؟"], o: ["I am extremely hardworking and very dedicated.", "For six weeks I revised chemistry every evening after my weekend job, and raised my mark from 68 to 85.", "My teachers always say I work hard."], a: 1, x: ["The second proves the quality with time, effort and a result. Adding “extremely” does not help, and quoting others is still telling.", "البديل الثاني يثبت الصفة بالوقت والجهد والنتيجة. أما إضافة “extremely” فلا تفيد، ونقل كلام الآخرين يبقى قولًا لا عرضًا."] },
        { s: ["What is the most useful test for a cliché?", "ما أفضل اختبار لاكتشاف العبارة المستهلكة؟"], o: [["Could many other applicants write this exact sentence?", "هل يستطيع كثير من المتقدمين كتابة هذه الجملة نفسها؟"], ["Does it sound formal?", "هل تبدو رسمية؟"], ["Is it grammatically correct?", "هل هي صحيحة نحويًا؟"]], a: 0, x: ["A cliché can be formal and correct. The problem is that it says nothing about you.", "قد تكون العبارة المستهلكة رسمية وصحيحة، لكن مشكلتها أنها لا تقول شيئًا عنك."] }
      ] },
      { t: "pad", key: "cliches", h: ["Write a fresh opening", "اكتب افتتاحية جديدة"],
        prompt: "Write the first two or three sentences of your statement or essay without any cliché. Start with a real moment, a question you asked, or a specific detail.",
        min: 30, max: 90, unit: "words", checks: [
          ["My first sentence is not “Ever since…”, “I have always…” or a dictionary definition.", "جملتي الأولى ليست “Ever since…” أو “I have always…” أو تعريفًا من القاموس."],
          ["It contains a detail only I could write.", "تحتوي على تفصيل لا يستطيع غيري كتابته."],
          ["A reader would want to read the next sentence.", "سيرغب القارئ في قراءة الجملة التالية."]] }
    ]
  };

  // ---------------- 40 · UCAS (uk; foundation, bachelor) ----------------
  var UCAS_Q1 = "Why do you want to study this course or subject?";
  var UCAS_Q2 = "How have your qualifications and studies helped you to prepare for this course or subject?";
  var UCAS_Q3 = "What else have you done to prepare outside of education, and why are these experiences useful?";
  var UCAS = {
    id: "ucas", order: 40, icon: "🇬🇧", mins: 30, skill: "app", cc: ["uk"], lv: ["foundation", "bachelor"],
    t: ["UCAS personal statement", "البيان الشخصي في UCAS"],
    d: ["The three-question format used from 2026 entry, one question at a time.", "صيغة الأسئلة الثلاثة المعتمدة منذ القبول لعام 2026، سؤالًا تلو الآخر."],
    steps: [
      { t: "text", h: ["How it works now", "كيف يعمل الآن"], p: [
        ["From 2026 entry, the UCAS personal statement is three questions, answered separately. You write one statement, and it goes to all the universities you apply to through UCAS.", "منذ القبول لعام 2026، أصبح البيان الشخصي في UCAS ثلاثة أسئلة تُجاب كل منها على حدة. وتكتب بيانًا واحدًا يُرسل إلى جميع الجامعات التي تتقدم إليها عبر UCAS."],
        ["The total limit is 4,000 characters, including spaces, across all three answers. Each answer must be at least 350 characters.", "الحد الأقصى الإجمالي 4,000 حرف شاملة المسافات للإجابات الثلاث معًا، ويجب ألا تقل كل إجابة عن 350 حرفًا."],
        ["Because the same statement goes to every choice, write about the subject, not one particular university. Do not name universities.", "ولأن البيان نفسه يصل إلى جميع اختياراتك، فاكتب عن التخصص لا عن جامعة بعينها، ولا تذكر أسماء الجامعات."],
        ["Characters are not words. 4,000 characters is often around 600 words, so every sentence must earn its place.", "الأحرف ليست كلمات؛ فـ4,000 حرف تعادل غالبًا نحو 600 كلمة، لذا يجب أن تكون لكل جملة قيمة."]] },
      { t: "text", h: ["Question 1 · " + UCAS_Q1, "السؤال 1 · لماذا تريد دراسة هذا البرنامج أو التخصص؟"], p: [
        ["This is about your motivation. Show where your interest came from and what keeps it going now.", "هذا السؤال عن دافعك. بيّن من أين جاء اهتمامك وما الذي يغذيه الآن."]],
        list: [
          ["Include: a specific moment, question or problem that drew you in.", "أدرج: لحظة أو سؤالًا أو مشكلة محددة جذبتك إلى التخصص."],
          ["Include: what you have explored since, such as a topic, book or idea, and what you think about it.", "أدرج: ما استكشفته بعد ذلك، كموضوع أو كتاب أو فكرة، ورأيك فيه."],
          ["Include: what you hope to do with the subject, briefly.", "أدرج: ما تأمل أن تفعله بهذا التخصص، باختصار."],
          ["Avoid: “I have always been passionate about…” and other clichés.", "تجنّب: “I have always been passionate about…” وغيرها من العبارات المستهلكة."],
          ["Avoid: salary, prestige or family pressure as your main reason.", "تجنّب: أن يكون الراتب أو المكانة أو ضغط العائلة سببك الرئيسي."]] },
      { t: "text", h: ["Question 2 · " + UCAS_Q2, "السؤال 2 · كيف ساعدتك مؤهلاتك ودراستك على الاستعداد؟"], p: [
        ["This is about your education: school subjects, a foundation or preparatory year, projects, coursework and anything you learned in class.", "هذا السؤال عن تعليمك: المواد الدراسية، والسنة التأسيسية أو التحضيرية، والمشاريع، والواجبات، وكل ما تعلمته في الصف."]],
        list: [
          ["Include: two or three subjects or tasks, and the skill each one gave you.", "أدرج: مادتين أو ثلاثًا أو مهامّ معينة، والمهارة التي اكتسبتها من كل منها."],
          ["Include: an example of going beyond the syllabus, such as a project or extra reading.", "أدرج: مثالًا على تجاوزك للمنهج، كمشروع أو قراءة إضافية."],
          ["Include: if you studied in Arabic, how you prepared to study in English.", "أدرج: إن كنت درست بالعربية، كيف استعددت للدراسة بالإنجليزية."],
          ["Avoid: listing grades. They are already in your application.", "تجنّب: سرد الدرجات، فهي موجودة أصلًا في طلبك."],
          ["Avoid: naming subjects without saying what you learned from them.", "تجنّب: ذكر المواد دون أن تقول ماذا تعلمت منها."]] },
      { t: "text", h: ["Question 3 · " + UCAS_Q3, "السؤال 3 · ماذا فعلت أيضًا للاستعداد خارج إطار التعليم؟"], p: [
        ["This is about life outside school: work, volunteering, responsibilities, hobbies, online courses, competitions or independent projects.", "هذا السؤال عن حياتك خارج المدرسة: العمل، والتطوع، والمسؤوليات، والهوايات، والدورات عبر الإنترنت، والمسابقات، والمشاريع المستقلة."],
        ["The second half of the question matters most: explain why each experience is useful for your course.", "والنصف الثاني من السؤال هو الأهم: اشرح لماذا تفيدك كل تجربة في دراستك."]],
        list: [
          ["Include: one or two experiences in depth, rather than many in one line each.", "أدرج: تجربة أو تجربتين بعمق، بدلًا من تجارب كثيرة بسطر لكل منها."],
          ["Include: responsibilities at home or in a family business. They count.", "أدرج: مسؤولياتك في البيت أو في عمل العائلة، فهي تُحتسب."],
          ["Include: the skill you gained and how you will use it in your course.", "أدرج: المهارة التي اكتسبتها وكيف ستستخدمها في دراستك."],
          ["Avoid: a list of activities with no explanation.", "تجنّب: قائمة أنشطة دون أي شرح."],
          ["Avoid: anything you did not really do, or made sound bigger than it was.", "تجنّب: أي شيء لم تفعله فعلًا، أو بالغت في حجمه."]] },
      { t: "text", h: ["Balance and honesty", "التوازن والصدق"], p: [
        ["There is no required split between the three answers. Give more space where you have more to say, as long as each answer has at least 350 characters.", "لا يوجد تقسيم إلزامي بين الإجابات الثلاث. امنح مساحة أكبر حيث لديك ما تقوله أكثر، بشرط ألا تقل أي إجابة عن 350 حرفًا."],
        ["Do not repeat the same example in two answers. Each one should add something new.", "لا تكرر المثال نفسه في إجابتين، بل يجب أن تضيف كل إجابة شيئًا جديدًا."],
        ["Write it yourself. Statements can be checked for copied text, and a statement in someone else's words does not show who you are. Check the latest guidance on the UCAS website.", "اكتبه بنفسك. فالبيانات قد تُفحص بحثًا عن النصوص المنقولة، والبيان المكتوب بكلمات غيرك لا يُظهر من أنت. راجع أحدث الإرشادات على موقع UCAS."]] },
      { t: "quiz", h: ["Check yourself", "اختبر نفسك"], pass: 4, items: [
        { s: ["What is the total limit for the three answers?", "ما الحد الأقصى الإجمالي للإجابات الثلاث؟"], o: [["4,000 words", "4,000 كلمة"], ["4,000 characters, including spaces", "4,000 حرف شاملة المسافات"], ["4,000 characters, not counting spaces", "4,000 حرف دون احتساب المسافات"], ["650 words", "650 كلمة"]], a: 1, x: ["4,000 characters in total, and spaces count.", "4,000 حرف إجمالًا، والمسافات تُحتسب."] },
        { s: ["What is the minimum length for each answer?", "ما الحد الأدنى لطول كل إجابة؟"], o: [["100 characters", "100 حرف"], ["350 characters", "350 حرفًا"], ["350 words", "350 كلمة"], ["There is no minimum", "لا يوجد حد أدنى"]], a: 1, x: ["Each answer needs at least 350 characters.", "تحتاج كل إجابة إلى 350 حرفًا على الأقل."] },
        { s: ["You worked in your family's shop for two summers. Which question does it fit best?", "عملت في متجر عائلتك صيفين. لأي سؤال تناسب هذه التجربة أكثر؟"], o: [["Question 1: why this subject", "السؤال 1: لماذا هذا التخصص"], ["Question 2: qualifications and studies", "السؤال 2: المؤهلات والدراسة"], ["Question 3: outside education", "السؤال 3: خارج إطار التعليم"]], a: 2, x: ["Work happens outside education, so it belongs in question 3. Explain why it is useful for your course.", "العمل يكون خارج إطار التعليم، لذا مكانه السؤال 3. واشرح لماذا يفيدك في دراستك."] },
        { s: ["You apply to five universities. How many personal statements do you write?", "تتقدم إلى خمس جامعات. كم بيانًا شخصيًا تكتب؟"], o: [["One, for all your choices", "بيانًا واحدًا لجميع اختياراتك"], ["Five, one for each university", "خمسة، بيانًا لكل جامعة"]], a: 0, x: ["One statement goes to all your UCAS choices, so do not name a university.", "يصل بيان واحد إلى جميع اختياراتك في UCAS، لذا لا تذكر اسم جامعة."] },
        { s: ["Which is the stronger answer to question 1?", "أي إجابة أقوى عن السؤال 1؟"], o: ["I want to study economics because it is a very important subject in today's world and has good career prospects.", "When the price of rice in our local market rose twice in one month, I wanted to understand why. Reading about supply chains led me to economics."], a: 1, x: ["The second starts from a real question and shows how the interest grew. The first is generic.", "الثانية تنطلق من سؤال حقيقي وتُظهر كيف نما الاهتمام، أما الأولى فعامة."] }
      ] },
      { t: "builder", key: "ucas", h: ["Write your statement", "اكتب بيانك"],
        intro: [
          ["Write each answer in its own box. The counter shows characters, including spaces.", "اكتب كل إجابة في مربعها الخاص. يعرض العدّاد عدد الأحرف شاملة المسافات."],
          ["Start with your notes from lesson 1. A rough first draft that is too long is fine: you will cut it in the final lesson.", "ابدأ بملاحظاتك من الدرس الأول. لا بأس أن تكون المسودة الأولى طويلة وغير مصقولة، فستختصرها في الدرس الأخير."]],
        fields: [
          { id: "q1", label: [UCAS_Q1, "لماذا تريد دراسة هذا البرنامج أو التخصص؟"], hint: ["A specific moment or question, what you explored next, and where you want it to lead.", "لحظة أو سؤال محدد، وما استكشفته بعد ذلك، وإلى أين تريد أن يقودك."], min: 350, max: null, unit: "chars", rows: 7 },
          { id: "q2", label: [UCAS_Q2, "كيف ساعدتك مؤهلاتك ودراستك على الاستعداد لهذا البرنامج أو التخصص؟"], hint: ["Two or three subjects, projects or tasks, and the skill each one gave you.", "مادتان أو ثلاث أو مشاريع أو مهام، والمهارة التي منحتك إياها كل منها."], min: 350, max: null, unit: "chars", rows: 7 },
          { id: "q3", label: [UCAS_Q3, "ماذا فعلت أيضًا للاستعداد خارج إطار التعليم، ولماذا تُعد هذه التجارب مفيدة؟"], hint: ["One or two experiences in depth, and why each one is useful for your course.", "تجربة أو تجربتان بعمق، ولماذا تفيدك كل منها في دراستك."], min: 350, max: null, unit: "chars", rows: 7 }],
        total: { max: 4000, unit: "chars" }, export: "UCAS personal statement" }
    ]
  };

  // ---------------- 41 · Common App (us; bachelor) ----------------
  var COMMON = {
    id: "common-app", order: 41, icon: "🇺🇸", mins: 30, skill: "app", cc: ["us"], lv: ["bachelor"],
    t: ["Common App essay", "مقال Common App"],
    d: ["Choose a prompt, plan a personal story and write a 250–650 word essay.", "اختر موضوعًا، وخطط لقصة شخصية، واكتب مقالًا من 250 إلى 650 كلمة."],
    steps: [
      { t: "text", h: ["The basics", "الأساسيات"], p: [
        ["Many US universities use the Common App. You write one main essay, which goes to every university you apply to through it.", "تستخدم جامعات أمريكية كثيرة منصة Common App، وتكتب فيها مقالًا رئيسيًا واحدًا يصل إلى كل جامعة تتقدم إليها من خلالها."],
        ["The essay is 250–650 words. For 2026–27, the seven prompts are the same as last year. You answer one of them.", "طول المقال من 250 إلى 650 كلمة. وفي عام 2026–27 بقيت الموضوعات السبعة كما كانت في العام السابق، وتجيب عن واحد منها."],
        ["Below, each prompt is described in our own words. Always read the exact wording on commonapp.org before you write.", "نصف كل موضوع أدناه بكلماتنا الخاصة، لذا اقرأ دائمًا الصياغة الدقيقة على موقع commonapp.org قبل أن تكتب."]] },
      { t: "text", h: ["The seven prompt themes", "محاور الموضوعات السبعة"], list: [
        ["1 · Background, identity, interest or talent: something so central to you that your application would feel incomplete without it.", "1 · الخلفية أو الهوية أو الاهتمام أو الموهبة: شيء محوري فيك إلى درجة أن طلبك سيبدو ناقصًا من دونه."],
        ["2 · A challenge, setback or failure: what happened, how it affected you and what you learned from it.", "2 · تحدٍّ أو تعثر أو إخفاق: ماذا حدث، وكيف أثّر فيك، وماذا تعلمت منه."],
        ["3 · Questioning a belief or idea: a time you challenged a view, and what led you to think differently.", "3 · مساءلة فكرة أو قناعة: موقف ناقشت فيه رأيًا ما، وما الذي دفعك إلى التفكير بطريقة مختلفة."],
        ["4 · Gratitude: something someone did for you that made you thankful in an unexpected way, and how it affected you.", "4 · الامتنان: شيء فعله أحدهم لك جعلك ممتنًا بطريقة غير متوقعة، وكيف أثّر فيك."],
        ["5 · Personal growth: an event or achievement that led to a new understanding of yourself or others.", "5 · النضج الشخصي: حدث أو إنجاز قادك إلى فهم جديد لنفسك أو للآخرين."],
        ["6 · Losing track of time: a topic, idea or concept so engaging that you forget the clock, and how you learn more about it.", "6 · حين تنسى الوقت: موضوع أو فكرة يأسرك إلى حد أن تنسى الوقت، وكيف تتعلم عنه المزيد."],
        ["7 · Your choice: any topic you like, including an essay you have already written.", "7 · موضوع من اختيارك: أي موضوع تريده، بما في ذلك مقال كتبته من قبل."]] },
      { t: "text", h: ["Choose the story first", "اختر القصة أولًا"], p: [
        ["Do not start by picking the prompt that sounds most impressive. Start with your best story from lesson 1, then find the prompt it fits. Most good stories fit more than one.", "لا تبدأ باختيار الموضوع الذي يبدو أكثر إبهارًا، بل ابدأ بأفضل قصة لديك من الدرس الأول، ثم ابحث عن الموضوع الذي يناسبها. فمعظم القصص الجيدة تناسب أكثر من موضوع."],
        ["The essay is about you, not the event. Readers want to see how you think, what you value and how you have changed.", "المقال عنك أنت لا عن الحدث، فالقرّاء يريدون أن يروا كيف تفكر، وما الذي تقدّره، وكيف تغيّرت."],
        ["Your activities and awards already appear elsewhere in the application. Do not turn the essay into a list of them.", "أنشطتك وجوائزك تظهر أصلًا في مكان آخر من الطلب، فلا تحوّل المقال إلى قائمة بها."]] },
      { t: "text", h: ["A simple structure", "بنية بسيطة"], list: [
        ["Opening (about 50–80 words): drop the reader into a specific moment.", "الافتتاحية (نحو 50–80 كلمة): ضع القارئ مباشرة في لحظة محددة."],
        ["Context (about 100 words): just enough background to understand the moment.", "السياق (نحو 100 كلمة): خلفية تكفي فقط لفهم اللحظة."],
        ["Turning point (about 150–200 words): what you did, thought or decided.", "نقطة التحول (نحو 150–200 كلمة): ما فعلته أو فكرت فيه أو قررته."],
        ["Reflection (about 150–200 words): what changed in you, with examples from after the event.", "التأمل (نحو 150–200 كلمة): ما الذي تغيّر فيك، مع أمثلة مما بعد الحدث."],
        ["Ending (about 50 words): connect back to the opening, or look ahead. No summary of the whole essay.", "الخاتمة (نحو 50 كلمة): عُد إلى الافتتاحية أو انظر إلى المستقبل، دون تلخيص المقال كله."]],
        p: [["These numbers are a guide, not a rule.", "هذه الأرقام للإرشاد فقط، وليست قاعدة."]] },
      { t: "quiz", h: ["Check yourself", "اختبر نفسك"], pass: 3, items: [
        { s: ["How long is the Common App essay?", "ما طول مقال Common App؟"], o: [["150–300 words", "150–300 كلمة"], ["250–650 words", "250–650 كلمة"], ["4,000 characters", "4,000 حرف"], ["Exactly 500 words", "500 كلمة بالضبط"]], a: 1, x: ["250 to 650 words.", "من 250 إلى 650 كلمة."] },
        { s: ["Where should you read the exact wording of the prompts?", "أين تقرأ الصياغة الدقيقة للموضوعات؟"], o: [["On commonapp.org", "على موقع commonapp.org"], ["In a friend's essay", "في مقال صديق"], ["Any website that lists them", "أي موقع يذكرها"]], a: 0, x: ["The official site always has the current wording.", "الموقع الرسمي يحتوي دائمًا على الصياغة الحالية."] },
        { s: ["Which plan is stronger?", "أي خطة أقوى؟"], o: ["One evening teaching my younger brother to read, and what it showed me about patience and how people learn.", "My top five achievements in school, sports and volunteering, one paragraph each."], a: 0, x: ["One focused story with reflection shows who you are. A list of achievements repeats the rest of your application.", "قصة واحدة مركّزة مع تأمل تُظهر من أنت، أما قائمة الإنجازات فتكرر بقية طلبك."] },
        { s: ["What should you choose first?", "ماذا تختار أولًا؟"], o: [["Your story, then a prompt that fits it", "قصتك، ثم الموضوع الذي يناسبها"], ["The prompt that sounds most impressive", "الموضوع الذي يبدو أكثر إبهارًا"]], a: 0, x: ["A strong true story matters more than which prompt you pick.", "القصة الحقيقية القوية أهم من الموضوع الذي تختاره."] }
      ] },
      { t: "pad", key: "commonapp", h: ["Write your essay", "اكتب مقالك"],
        prompt: "Choose one of the seven Common App prompts (read the exact wording on commonapp.org) and write your essay. Note the prompt number at the top. Tell one true story and show what it reveals about you.",
        min: 250, max: 650, unit: "words", checks: [
          ["I have read the exact prompt wording on commonapp.org and my essay answers it.", "قرأت الصياغة الدقيقة للموضوع على commonapp.org ومقالي يجيب عنه."],
          ["My opening drops the reader into a specific moment.", "افتتاحيتي تضع القارئ في لحظة محددة."],
          ["At least half the essay is about what I thought, learned or changed.", "نصف المقال على الأقل عمّا فكرت فيه أو تعلمته أو تغيّر فيّ."],
          ["It is not a list of my achievements.", "المقال ليس قائمة بإنجازاتي."],
          ["It sounds like me, and every detail is true.", "المقال يشبهني، وكل تفاصيله صحيحة."]] }
    ]
  };

  // ---------------- 42 · why this university (us; bachelor, master) ----------------
  var WHYUS = {
    id: "why-us", order: 42, icon: "🎯", mins: 20, skill: "app", cc: ["us"], lv: ["bachelor", "master"],
    t: ["“Why this university?” answers", "إجابات «لماذا هذه الجامعة؟»"],
    d: ["Research real details and connect them to your own goals.", "ابحث عن تفاصيل حقيقية واربطها بأهدافك."],
    steps: [
      { t: "text", h: ["What this question is testing", "ما الذي يختبره هذا السؤال"], p: [
        ["Many universities add short supplement essays to the main application. A common one asks why you want to study at that university. The length varies, so check each university's page.", "تضيف جامعات كثيرة مقالات قصيرة تكميلية إلى الطلب الرئيسي، ومن أشهرها سؤال: لماذا تريد الدراسة في هذه الجامعة؟ ويختلف الطول من جامعة لأخرى، فراجع صفحة كل جامعة."],
        ["The reader wants to know two things: have you done your research, and would you make good use of what they offer?", "يريد القارئ أن يعرف أمرين: هل بحثت جيدًا؟ وهل ستستفيد فعلًا مما تقدمه الجامعة؟"]] },
      { t: "text", h: ["Research specifics", "ابحث عن التفاصيل"], list: [
        ["Specific courses, majors or study tracks that match your interests.", "مقررات أو تخصصات أو مسارات دراسية محددة تناسب اهتماماتك."],
        ["Research groups, labs or lecturers whose work connects to yours.", "مجموعات بحثية أو مختبرات أو أساتذة يرتبط عملهم بما تريد."],
        ["Programmes such as internships, study projects or student clubs you would join.", "برامج مثل التدريب العملي أو المشاريع الدراسية أو الأندية الطلابية التي ستنضم إليها."],
        ["Opportunities linked to the location, such as industry nearby, only if they matter to your goals.", "فرص مرتبطة بالموقع، كوجود صناعات قريبة، بشرط أن تهم أهدافك."]],
        p: [
          ["Avoid rankings, weather, “prestige” and general praise. These do not show research and could be said about many places.", "تجنّب التصنيفات والطقس و«السمعة» والمديح العام، فهذه لا تُظهر أنك بحثت ويمكن قولها عن أماكن كثيرة."],
          ["Do not copy sentences from the university's website. Name the detail, then explain in your own words why it matters to you.", "لا تنسخ جملًا من موقع الجامعة. اذكر التفصيل، ثم اشرح بكلماتك لماذا يهمك."]] },
      { t: "text", h: ["A simple structure", "بنية بسيطة"], list: [
        ["Your goal: what you want to learn or do, in one or two sentences.", "هدفك: ما تريد أن تتعلمه أو تفعله، في جملة أو جملتين."],
        ["Two or three specific features of the university, each linked to that goal.", "ميزتان أو ثلاث محددة في الجامعة، تربط كلًا منها بهدفك."],
        ["What you would contribute: a skill, a perspective or an activity you would bring.", "ما الذي ستضيفه: مهارة أو منظور أو نشاط ستقدمه."]],
        p: [["Test it: if you could swap in another university's name and the answer still worked, it is not specific enough.", "اختبره: إن استطعت وضع اسم جامعة أخرى وبقيت الإجابة صالحة، فهي ليست محددة بما يكفي."]] },
      { t: "quiz", h: ["Which is stronger?", "أيهما أقوى؟"], pass: 2, items: [
        { s: ["Which sentence is stronger?", "أي الجملتين أقوى؟"], o: ["Your university is highly ranked and has a beautiful campus in a great city.", "The second-year design studio, where students build a working prototype for a local client, is the kind of hands-on project I want after building my own solar phone charger."], a: 1, x: ["The second names a real feature and connects it to something the student has done.", "الثانية تذكر ميزة حقيقية وتربطها بشيء فعله الطالب."] },
        { s: ["You wrote one answer and want to reuse it for another university by changing the name. Is that a good idea?", "كتبت إجابة واحدة وتريد إعادة استخدامها لجامعة أخرى بتغيير الاسم فقط. هل هذه فكرة جيدة؟"], o: [["Yes, it saves time", "نعم، فهذا يوفر الوقت"], ["No, each answer needs details about that university", "لا، فكل إجابة تحتاج إلى تفاصيل عن تلك الجامعة"]], a: 1, x: ["If the name can be swapped, the answer is too general. You can reuse your goals, but the specific details must change.", "إن أمكن تبديل الاسم فالإجابة عامة جدًا. يمكنك إعادة استخدام أهدافك، لكن التفاصيل المحددة يجب أن تتغير."] },
        { s: ["Which detail is the most useful to research?", "أي تفصيل هو الأكثر فائدة للبحث عنه؟"], o: [["Courses, research or programmes linked to your goals", "المقررات أو الأبحاث أو البرامج المرتبطة بأهدافك"], ["The university's ranking", "تصنيف الجامعة"], ["The weather in the city", "الطقس في المدينة"]], a: 0, x: ["Features connected to your goals show research and fit.", "الميزات المرتبطة بأهدافك تُظهر أنك بحثت وأنك مناسب للجامعة."] }
      ] },
      { t: "pad", key: "whyus", h: ["Write your answer", "اكتب إجابتك"],
        prompt: "Choose one university you are applying to and write a practice answer to “Why do you want to study at this university?” Check that university's page for its real question and word limit, and adjust your final answer to fit.",
        min: 150, max: 250, unit: "words", checks: [
          ["I name at least two specific features of this university.", "أذكر ميزتين محددتين على الأقل في هذه الجامعة."],
          ["Each feature is linked to my own goals or experience.", "كل ميزة مرتبطة بأهدافي أو تجربتي."],
          ["If I swapped in another university's name, the answer would no longer work.", "لو وضعت اسم جامعة أخرى، لما بقيت الإجابة صالحة."],
          ["I have not copied sentences from the website.", "لم أنسخ جملًا من موقع الجامعة."],
          ["I have checked the real question and length on the university's page.", "تحققت من السؤال الحقيقي وطوله في صفحة الجامعة."]] }
    ]
  };

  // ---------------- 43 · Genuine Student (au) ----------------
  var GS = {
    id: "gs", order: 43, icon: "🇦🇺", mins: 25, skill: "app", cc: ["au"],
    t: ["Genuine Student answers", "إجابات متطلب الطالب الحقيقي (Genuine Student)"],
    d: ["Prepare honest, specific answers for the Australian Student visa form.", "جهّز إجابات صادقة ومحددة لنموذج تأشيرة الطالب الأسترالية."],
    steps: [
      { t: "text", h: ["What it is", "ما هو"], p: [
        ["Most undergraduate applications to Australian universities do not need an essay. The writing you will need is for the Student visa.", "معظم طلبات القبول للبكالوريوس في الجامعات الأسترالية لا تحتاج إلى مقال؛ فالكتابة التي ستحتاجها هي لتأشيرة الطالب."],
        ["The Student visa has a Genuine Student requirement. You answer short questions in the visa application form, in English, with a limit of 150 words per answer.", "تتضمن تأشيرة الطالب متطلبًا يُسمى «الطالب الحقيقي» (Genuine Student)، تجيب فيه عن أسئلة قصيرة في نموذج طلب التأشيرة، بالإنجليزية، بحد أقصى 150 كلمة لكل إجابة."],
        ["The questions cover four areas. There is one more question only for people who have held a student visa before.", "تغطي الأسئلة أربعة محاور، وهناك سؤال إضافي لمن سبق أن حصلوا على تأشيرة طالب فقط."]],
        list: [
          ["Your current circumstances: ties to family and community, employment and your economic situation.", "ظروفك الحالية: روابطك بالعائلة والمجتمع، وعملك، ووضعك الاقتصادي."],
          ["Why you want to study this course in Australia with this provider, showing you understand the course and what living in Australia involves.", "لماذا تريد دراسة هذا البرنامج في أستراليا لدى هذه المؤسسة التعليمية، مع إظهار فهمك للبرنامج ولطبيعة الحياة في أستراليا."],
          ["How completing the course will benefit you.", "كيف سيفيدك إكمال هذا البرنامج."],
          ["Any other relevant information you want to add.", "أي معلومات أخرى ذات صلة تريد إضافتها."]] },
      { t: "text", h: ["What each answer is for", "الغرض من كل إجابة"], list: [
        ["Circumstances: explain your real situation. If you are sponsored by a scholarship, say so clearly and make sure it matches your documents.", "الظروف: اشرح وضعك الحقيقي. وإن كنت مبتعثًا على منحة، فاذكر ذلك بوضوح وتأكد من أنه يطابق مستنداتك."],
        ["Why this course and provider: name the course and the provider, mention specific parts of the course, and show you know practical things about life in Australia, such as costs and where you will live.", "لماذا هذا البرنامج وهذه المؤسسة: اذكر اسم البرنامج والمؤسسة، وأشر إلى أجزاء محددة من البرنامج، وأظهر أنك تعرف أمورًا عملية عن الحياة في أستراليا، كالتكاليف ومكان سكنك."],
        ["Benefit: connect the course to a realistic next step, such as a type of job, further study or a skill your field needs.", "الفائدة: اربط البرنامج بخطوة تالية واقعية، كنوع من الوظائف أو دراسة لاحقة أو مهارة يحتاجها مجالك."],
        ["Other information: use it only if something important is not covered, such as a gap in your studies or a change of field. It is fine to keep it short.", "معلومات أخرى: استخدمها فقط إذا كان هناك أمر مهم لم يُذكر، كانقطاع في دراستك أو تغيير في التخصص. ولا بأس أن تكون قصيرة."]] },
      { t: "text", h: ["Honest, specific, your own words", "صادقة ومحددة وبكلماتك"], p: [
        ["Your answers must be honest and in your own words. Do not copy a template or a sample answer, and do not let anyone write them for you. Generic answers say nothing about your real situation.", "يجب أن تكون إجاباتك صادقة وبكلماتك أنت. لا تنسخ قالبًا أو إجابة نموذجية، ولا تدع أحدًا يكتبها عنك، فالإجابات العامة لا تقول شيئًا عن وضعك الحقيقي."],
        ["Everything you write should match your documents: your offer letter, sponsorship letter and study history.", "يجب أن يتطابق كل ما تكتبه مع مستنداتك: خطاب القبول، وخطاب الابتعاث، وسجلك الدراسي."],
        ["Specific details are more convincing than big claims. “I will live in a shared apartment 20 minutes by train from campus” is better than “Australia is a great country to live in”.", "التفاصيل المحددة أقنع من الادعاءات الكبيرة؛ فجملة “I will live in a shared apartment 20 minutes by train from campus” أفضل من “Australia is a great country to live in”."],
        ["150 words is short. Use simple, clear English and get to the point in the first sentence.", "150 كلمة مساحة قصيرة، فاستخدم إنجليزية بسيطة وواضحة وادخل في صلب الموضوع من الجملة الأولى."]] },
      { t: "quiz", h: ["Check yourself", "اختبر نفسك"], pass: 3, items: [
        { s: ["What is the limit for each Genuine Student answer?", "ما الحد الأقصى لكل إجابة في متطلب الطالب الحقيقي؟"], o: [["100 words", "100 كلمة"], ["150 words", "150 كلمة"], ["250 words", "250 كلمة"], ["500 words", "500 كلمة"]], a: 1, x: ["150 words per answer.", "150 كلمة لكل إجابة."] },
        { s: ["In which language do you write the answers?", "بأي لغة تكتب الإجابات؟"], o: [["English", "الإنجليزية"], ["Arabic", "العربية"], ["Either", "أي منهما"]], a: 0, x: ["The answers are written in English.", "تُكتب الإجابات بالإنجليزية."] },
        { s: ["Someone offers you a ready-made answer that “always works”. What should you do?", "عرض عليك أحدهم إجابة جاهزة «تنجح دائمًا». ماذا تفعل؟"], o: [["Use it, but change a few words", "أستخدمها مع تغيير بعض الكلمات"], ["Write your own answers about your real situation", "أكتب إجاباتي بنفسي عن وضعي الحقيقي"], ["Use it exactly as it is", "أستخدمها كما هي"]], a: 1, x: ["Answers must be honest and in your own words. A template does not describe your situation.", "يجب أن تكون الإجابات صادقة وبكلماتك، والقالب الجاهز لا يصف وضعك."] },
        { s: ["Which answer about the course is stronger?", "أي إجابة عن البرنامج أقوى؟"], o: ["Australia has excellent universities and a high quality of life, so it is the best place for me to study.", "The course includes a unit on mine ventilation and a site visit in the second year. These connect directly to the safety work I want to do after I return."], a: 1, x: ["The second shows the student understands the course and links it to a real plan.", "الثانية تُظهر أن الطالب يفهم البرنامج ويربطه بخطة حقيقية."] }
      ] },
      { t: "builder", key: "gs", h: ["Draft your answers", "اكتب مسودة إجاباتك"],
        intro: [
          ["This is a private draft space. Write each answer in English, in your own words, up to 150 words.", "هذه مساحة خاصة للمسودة. اكتب كل إجابة بالإنجليزية وبكلماتك، بحد أقصى 150 كلمة."],
          ["If you have held a student visa before, the form has one more question. Draft it separately.", "إن سبق أن حصلت على تأشيرة طالب، فالنموذج يتضمن سؤالًا إضافيًا، فاكتب مسودته على حدة."]],
        fields: [
          { id: "circ", label: ["Your current circumstances: family and community ties, work, and your economic situation", "ظروفك الحالية: روابطك بالعائلة والمجتمع، وعملك، ووضعك الاقتصادي"], hint: ["Facts, not feelings. Mention sponsorship if you have it, and make sure it matches your documents.", "حقائق لا مشاعر. اذكر الابتعاث إن وُجد، وتأكد من مطابقته لمستنداتك."], min: null, max: 150, unit: "words", rows: 6 },
          { id: "why", label: ["Why this course, with this provider, in Australia: show you understand the course and life in Australia", "لماذا هذا البرنامج، لدى هذه المؤسسة، في أستراليا: أظهر فهمك للبرنامج وللحياة في أستراليا"], hint: ["Name the course and provider, two specific parts of the course, and practical plans for living there.", "اذكر اسم البرنامج والمؤسسة، وجزأين محددين من البرنامج، وخططك العملية للعيش هناك."], min: null, max: 150, unit: "words", rows: 6 },
          { id: "benefit", label: ["How completing the course will benefit you", "كيف سيفيدك إكمال البرنامج"], hint: ["A realistic next step: a kind of job, further study or a skill your field needs.", "خطوة تالية واقعية: نوع من الوظائف أو دراسة لاحقة أو مهارة يحتاجها مجالك."], min: null, max: 150, unit: "words", rows: 6 },
          { id: "other", label: ["Any other relevant information", "أي معلومات أخرى ذات صلة"], hint: ["Only what matters and is not covered above, such as a study gap or change of field.", "فقط ما يهم ولم يُذكر أعلاه، كانقطاع في الدراسة أو تغيير في التخصص."], min: null, max: 150, unit: "words", rows: 5 }],
        total: { max: 600, unit: "words" }, export: "Genuine Student answers (draft)" },
      { t: "text", h: ["Where your final answers go", "أين تضع إجاباتك النهائية"], p: [
        ["Your final answers go into the Student visa application form itself. This page only helps you prepare them.", "تُكتب إجاباتك النهائية في نموذج طلب تأشيرة الطالب نفسه، وهذه الصفحة تساعدك على تجهيزها فقط."],
        ["Before you submit, read the current instructions on the Department of Home Affairs website, check every answer against your documents and count the words again.", "قبل الإرسال، اقرأ التعليمات الحالية على موقع وزارة الشؤون الداخلية الأسترالية (Department of Home Affairs)، وطابق كل إجابة مع مستنداتك، وأعد عدّ الكلمات."]] }
    ]
  };

  // ---------------- 44 · Motivation letter (de) ----------------
  var MOTIV = {
    id: "motivation", order: 44, icon: "🇩🇪", mins: 25, skill: "app", cc: ["de"],
    t: ["Motivation letter (Motivationsschreiben)", "خطاب الدافع (Motivationsschreiben)"],
    d: ["A clear, one-page letter that explains why this programme and why you.", "خطاب واضح من صفحة واحدة يشرح لماذا هذا البرنامج ولماذا أنت."],
    steps: [
      { t: "text", h: ["What it is", "ما هو"], p: [
        ["Many programmes in Germany ask for a motivation letter (Motivationsschreiben). It is usually about one page.", "تطلب برامج كثيرة في ألمانيا خطاب دافع (Motivationsschreiben)، ويكون عادةً في حدود صفحة واحدة."],
        ["Requirements differ between programmes: some set a length, some ask for specific questions to be answered, and the language can be German or English. Check each programme's page and follow it exactly.", "تختلف المتطلبات من برنامج لآخر؛ فبعضها يحدد الطول، وبعضها يطلب الإجابة عن أسئلة معينة، وقد تكون اللغة الألمانية أو الإنجليزية. راجع صفحة كل برنامج والتزم بما فيها بدقة."],
        ["It is a formal letter. Be clear, factual and well organised. Short paragraphs and concrete reasons work better than emotional language.", "إنه خطاب رسمي، فكن واضحًا وموضوعيًا ومنظمًا. الفقرات القصيرة والأسباب الملموسة أفضل من اللغة العاطفية."]] },
      { t: "text", h: ["Structure", "البنية"], list: [
        ["Opening: the programme you are applying for and one sentence on why it interests you.", "الافتتاحية: البرنامج الذي تتقدم إليه، وجملة واحدة عن سبب اهتمامك به."],
        ["Why this subject: where your interest comes from, with one real example.", "لماذا هذا التخصص: من أين جاء اهتمامك، مع مثال حقيقي واحد."],
        ["Why this university: specific modules, research areas or features of the programme.", "لماذا هذه الجامعة: مقررات أو مجالات بحث أو مزايا محددة في البرنامج."],
        ["Your preparation: studies, projects, work or language skills that show you are ready.", "استعدادك: الدراسة أو المشاريع أو العمل أو المهارات اللغوية التي تُظهر جاهزيتك."],
        ["Your goals: what you plan to do with the degree.", "أهدافك: ما تخطط لفعله بالشهادة."],
        ["Closing: a short, polite final paragraph.", "الختام: فقرة أخيرة قصيرة ومهذبة."]] },
      { t: "quiz", h: ["Check yourself", "اختبر نفسك"], pass: 2, items: [
        { s: ["How long is a motivation letter usually?", "ما الطول المعتاد لخطاب الدافع؟"], o: [["About one page", "نحو صفحة واحدة"], ["Three to four pages", "ثلاث إلى أربع صفحات"], ["One paragraph", "فقرة واحدة"]], a: 0, x: ["Usually about one page, but always check the programme's own instructions.", "عادةً نحو صفحة واحدة، لكن راجع دائمًا تعليمات البرنامج نفسه."] },
        { s: ["Which opening is stronger?", "أي افتتاحية أقوى؟"], o: ["I am writing to apply for the bachelor's programme in Mechanical Engineering. Building a small water pump for my school's garden showed me how much I enjoy turning a design into something that works.", "Germany is famous for engineering and I have always dreamed of studying there."], a: 0, x: ["The first names the programme and gives a real reason. The second is general and could fit anyone.", "الأولى تذكر البرنامج وتقدم سببًا حقيقيًا، أما الثانية فعامة وتناسب أي شخص."] },
        { s: ["The programme asks for the letter in German, but you are more comfortable in English. What should you do?", "يطلب البرنامج الخطاب بالألمانية، لكنك ترتاح أكثر للإنجليزية. ماذا تفعل؟"], o: [["Follow the programme's instructions", "ألتزم بتعليمات البرنامج"], ["Write it in English anyway", "أكتبه بالإنجليزية على أي حال"]], a: 0, x: ["Always follow what the programme asks for. If you are unsure, contact the admissions office.", "التزم دائمًا بما يطلبه البرنامج، وإن لم تكن متأكدًا فتواصل مع مكتب القبول."] }
      ] },
      { t: "builder", key: "motiv", h: ["Build your letter", "ابنِ خطابك"],
        intro: [
          ["Write each part in its own box. Together they should fit on about one page, unless your programme says otherwise.", "اكتب كل جزء في مربعه الخاص، ويجب أن تتسع الأجزاء معًا لصفحة واحدة تقريبًا، ما لم يحدد برنامجك غير ذلك."],
          ["The download joins the parts into one letter. Add the date, your contact details and a greeting before you send it.", "يجمع ملف التنزيل الأجزاء في خطاب واحد، فأضف التاريخ وبيانات التواصل والتحية قبل الإرسال."]],
        fields: [
          { id: "opening", label: ["Opening", "الافتتاحية"], hint: ["The programme's exact name and one sentence on why it interests you.", "الاسم الدقيق للبرنامج، وجملة واحدة عن سبب اهتمامك به."], min: null, max: null, unit: "words", rows: 3 },
          { id: "subject", label: ["Why this subject", "لماذا هذا التخصص"], hint: ["Where your interest started, with one real example.", "من أين بدأ اهتمامك، مع مثال حقيقي واحد."], min: null, max: null, unit: "words", rows: 5 },
          { id: "uni", label: ["Why this university", "لماذا هذه الجامعة"], hint: ["Two specific modules, research areas or features from the programme page.", "مقرران أو مجالان بحثيان أو ميزتان محددتان من صفحة البرنامج."], min: null, max: null, unit: "words", rows: 5 },
          { id: "prep", label: ["Your preparation", "استعدادك"], hint: ["Studies, projects, work and language skills that show you are ready.", "الدراسة والمشاريع والعمل والمهارات اللغوية التي تُظهر جاهزيتك."], min: null, max: null, unit: "words", rows: 5 },
          { id: "goals", label: ["Your goals", "أهدافك"], hint: ["What you plan to do with the degree, realistically.", "ما تخطط لفعله بالشهادة، بواقعية."], min: null, max: null, unit: "words", rows: 4 },
          { id: "closing", label: ["Closing", "الختام"], hint: ["One or two polite sentences. No need to repeat everything.", "جملة أو جملتان مهذبتان، دون تكرار كل ما سبق."], min: null, max: null, unit: "words", rows: 2 }],
        total: { max: 450, unit: "words" }, export: "Motivation letter" }
    ]
  };

  // ---------------- 45 · Canada and Singapore short answers (ca, sg) ----------------
  var SHORT = {
    id: "ca-sg-short", order: 45, icon: "📝", mins: 15, skill: "app", cc: ["ca", "sg"],
    t: ["Short answers and personal profiles", "الإجابات القصيرة والملفات الشخصية"],
    d: ["How to answer short written questions when every programme asks something different.", "كيف تجيب عن الأسئلة الكتابية القصيرة عندما يطلب كل برنامج شيئًا مختلفًا."],
    steps: [
      { t: "text", h: ["Every programme is different", "كل برنامج مختلف"], p: [
        ["In Canada and Singapore, written requirements vary by university and by programme. Some ask for a personal profile, some for short answers to set questions, some for an essay, and some for nothing at all.", "في كندا وسنغافورة تختلف متطلبات الكتابة باختلاف الجامعة والبرنامج؛ فبعضها يطلب ملفًا شخصيًا، وبعضها إجابات قصيرة عن أسئلة محددة، وبعضها مقالًا، وبعضها لا يطلب شيئًا."],
        ["Start by checking your programme page. Write down the exact questions, the word or character limits and the deadline.", "ابدأ بمراجعة صفحة برنامجك، ودوّن الأسئلة بصياغتها الدقيقة، وحدود الكلمات أو الأحرف، والموعد النهائي."],
        ["Some questions are answered online in a fixed time. Prepare your examples in advance so you are not starting from nothing.", "بعض الأسئلة يُجاب عنها عبر الإنترنت في وقت محدد، فجهّز أمثلتك مسبقًا حتى لا تبدأ من الصفر."]] },
      { t: "text", h: ["How to answer a short question", "كيف تجيب عن سؤال قصير"], list: [
        ["Answer the question directly in your first sentence.", "أجب عن السؤال مباشرة في جملتك الأولى."],
        ["Give one specific example, not three vague ones.", "قدّم مثالًا واحدًا محددًا، لا ثلاثة أمثلة مبهمة."],
        ["Say what you learned or what it shows about you.", "قل ما الذي تعلمته أو ما الذي يُظهره عنك."],
        ["Link it back to the programme or field.", "اربطه بالبرنامج أو بالمجال."],
        ["Stay within the limit. A short, clear answer is better than a long, crowded one.", "التزم بالحد المسموح؛ فالإجابة القصيرة الواضحة أفضل من الطويلة المزدحمة."]],
        p: [["Reuse your best stories from lesson 1, but rewrite them for each question. Do not paste the same paragraph everywhere.", "أعد استخدام أفضل قصصك من الدرس الأول، لكن أعد كتابتها لكل سؤال، ولا تلصق الفقرة نفسها في كل مكان."]] },
      { t: "pad", key: "short", h: ["Practise one answer", "تدرّب على إجابة واحدة"],
        prompt: "Use a real question from your programme page if it has one. If not, answer this practice question: “Describe an experience that shows how you would contribute to your chosen field of study.”",
        min: 150, max: 250, unit: "words", checks: [
          ["My first sentence answers the question directly.", "جملتي الأولى تجيب عن السؤال مباشرة."],
          ["I use one specific, true example.", "أستخدم مثالًا واحدًا محددًا وصحيحًا."],
          ["I explain what it shows about me.", "أشرح ما الذي يُظهره عني."],
          ["I have checked the real question and limit on my programme page.", "تحققت من السؤال الحقيقي والحد المسموح في صفحة برنامجي."]] }
    ]
  };

  // ---------------- 50 · Statement of purpose (master, phd) ----------------
  var SOP = {
    id: "sop", order: 50, icon: "🎓", mins: 30, skill: "app", lv: ["master", "phd"],
    t: ["Statement of purpose", "بيان الغرض (Statement of purpose)"],
    d: ["Explain your academic path, your goals and why this programme fits.", "اشرح مسارك الأكاديمي وأهدافك ولماذا يناسبك هذا البرنامج."],
    steps: [
      { t: "text", h: ["What it is", "ما هو"], p: [
        ["Many postgraduate programmes ask for a statement of purpose. Some call it a personal statement. It is more academic and forward-looking than an undergraduate essay.", "تطلب برامج دراسات عليا كثيرة بيان الغرض، وبعضها يسميه البيان الشخصي، وهو أكثر أكاديمية وتطلعًا إلى المستقبل من مقال البكالوريوس."],
        ["The reader is often a lecturer in your field. They want to see that you understand the subject, know what you want to study and have the background to succeed.", "غالبًا ما يكون القارئ أستاذًا في مجالك، يريد أن يرى أنك تفهم التخصص، وتعرف ما تريد دراسته، ولديك الخلفية التي تؤهلك للنجاح."],
        ["Length and questions vary a lot. Some programmes give a word limit, some a page limit, some specific questions. Check your programme page and follow it.", "يختلف الطول والأسئلة كثيرًا؛ فبعض البرامج تحدد عدد الكلمات، وبعضها عدد الصفحات، وبعضها أسئلة محددة. راجع صفحة برنامجك والتزم بها."]] },
      { t: "text", h: ["Structure", "البنية"], list: [
        ["Motivation: the academic question or problem that drives you. Keep childhood stories out.", "الدافع: السؤال أو المشكلة الأكاديمية التي تحركك، دون قصص الطفولة."],
        ["Academic background: key courses, your final project or thesis, and what you learned from them.", "الخلفية الأكاديمية: أهم المقررات، ومشروع التخرج أو الأطروحة، وما تعلمته منها."],
        ["Relevant experience: work, internships, research or projects, and the skills they gave you.", "الخبرة ذات الصلة: العمل أو التدريب أو البحث أو المشاريع، والمهارات التي اكتسبتها منها."],
        ["Why this programme: specific modules, research groups or staff whose work fits your interests.", "لماذا هذا البرنامج: مقررات أو مجموعات بحثية أو أساتذة محددون يتوافق عملهم مع اهتماماتك."],
        ["Career goals: a realistic plan for after the degree, in Saudi Arabia or elsewhere.", "الأهداف المهنية: خطة واقعية لما بعد الشهادة، في السعودية أو غيرها."]] },
      { t: "quiz", h: ["Check yourself", "اختبر نفسك"], pass: 2, items: [
        { s: ["Which opening suits a statement of purpose better?", "أي افتتاحية تناسب بيان الغرض أكثر؟"], o: ["Ever since I was a little boy, I loved looking at the stars.", "My final-year project on dust levels near quarries left me with a question I could not answer: how far do fine particles travel in desert wind?"], a: 1, x: ["A statement of purpose starts from an academic question, not a childhood memory.", "يبدأ بيان الغرض من سؤال أكاديمي، لا من ذكرى طفولة."] },
        { s: ["Which sentence about the programme is stronger?", "أي جملة عن البرنامج أقوى؟"], o: ["Your programme is world-class and has an excellent reputation.", "The optional module in geotechnical modelling would give me the numerical skills my project lacked."], a: 1, x: ["The second names a real part of the programme and explains why it matters to you.", "الثانية تذكر جزءًا حقيقيًا من البرنامج وتشرح لماذا يهمك."] },
        { s: ["Your grades dropped in one semester for a real reason. What is the best approach?", "انخفضت درجاتك في فصل دراسي واحد لسبب حقيقي. ما أفضل طريقة للتعامل مع ذلك؟"], o: [["Explain it briefly and honestly, then show how you improved", "أشرحه باختصار وصدق، ثم أبيّن كيف تحسّنت"], ["Write a long paragraph about it", "أكتب فقرة طويلة عنه"], ["Invent a different reason", "أخترع سببًا آخر"]], a: 0, x: ["One or two honest sentences, then evidence of improvement. Never invent reasons.", "جملة أو جملتان صادقتان، ثم دليل على التحسن، ولا تخترع أسبابًا أبدًا."] }
      ] },
      { t: "builder", key: "sop", h: ["Build your statement", "ابنِ بيانك"],
        intro: [
          ["Write each section in its own box. The total limit here is a guide: if your programme gives a different limit, follow the programme.", "اكتب كل قسم في مربعه الخاص. الحد الإجمالي هنا للإرشاد فقط، فإن حدد برنامجك حدًا مختلفًا فالتزم به."]],
        fields: [
          { id: "motivation", label: ["Motivation", "الدافع"], hint: ["The academic question or problem that drives you.", "السؤال أو المشكلة الأكاديمية التي تحركك."], min: null, max: null, unit: "words", rows: 5 },
          { id: "academic", label: ["Academic background", "الخلفية الأكاديمية"], hint: ["Key courses and your final project, and what each one taught you.", "أهم المقررات ومشروع التخرج، وما تعلمته من كل منها."], min: null, max: null, unit: "words", rows: 6 },
          { id: "experience", label: ["Relevant experience", "الخبرة ذات الصلة"], hint: ["Work, internships, research or projects, and the skills they gave you.", "العمل أو التدريب أو البحث أو المشاريع، والمهارات التي منحتك إياها."], min: null, max: null, unit: "words", rows: 6 },
          { id: "programme", label: ["Why this programme", "لماذا هذا البرنامج"], hint: ["Specific modules, research groups or staff, linked to your interests.", "مقررات أو مجموعات بحثية أو أساتذة محددون، مرتبطون باهتماماتك."], min: null, max: null, unit: "words", rows: 5 },
          { id: "career", label: ["Career goals", "الأهداف المهنية"], hint: ["A realistic plan for after the degree.", "خطة واقعية لما بعد الشهادة."], min: null, max: null, unit: "words", rows: 4 }],
        total: { max: 1000, unit: "words" }, export: "Statement of purpose" }
    ]
  };

  // ---------------- 51 · Research proposal (phd) ----------------
  var PROPOSAL = {
    id: "proposal", order: 51, icon: "🔬", mins: 40, skill: "app", lv: ["phd"],
    t: ["Research proposal", "مقترح البحث"],
    d: ["Plan a clear, focused proposal for a research degree.", "خطط لمقترح بحث واضح ومركّز للدراسات البحثية."],
    steps: [
      { t: "text", h: ["What it is for", "الغرض منه"], p: [
        ["Many research degrees ask for a research proposal. It shows that you can identify a real question, place it in the existing research and plan how to answer it.", "تطلب برامج بحثية كثيرة مقترح بحث، وهو يُظهر قدرتك على تحديد سؤال حقيقي، ووضعه في سياق الأبحاث الموجودة، والتخطيط للإجابة عنه."],
        ["It is a starting point, not a contract. Your project will probably change once you begin. Readers want to see clear thinking, not a finished study.", "المقترح نقطة بداية لا عقد ملزم، وغالبًا سيتغير مشروعك بعد أن تبدأ. يريد القرّاء أن يروا تفكيرًا واضحًا، لا دراسة مكتملة."],
        ["Length and required sections vary widely. Check your programme page, and if possible discuss your idea with a possible supervisor before you finalise it.", "يختلف الطول والأقسام المطلوبة كثيرًا، فراجع صفحة برنامجك، وإن أمكن ناقش فكرتك مع مشرف محتمل قبل أن تعتمدها."]] },
      { t: "text", h: ["The sections", "الأقسام"], list: [
        ["Title: short and specific. It should tell the reader what you are studying.", "العنوان: قصير ومحدد، يخبر القارئ بما تدرسه."],
        ["Background: what is already known, the key studies, and the gap your project addresses.", "الخلفية: ما هو معروف، وأهم الدراسات، والفجوة التي يعالجها مشروعك."],
        ["Research question(s): one main question, with two or three sub-questions at most.", "سؤال أو أسئلة البحث: سؤال رئيسي واحد، مع سؤالين أو ثلاثة أسئلة فرعية على الأكثر."],
        ["Aims: what the project will achieve.", "الأهداف: ما الذي سيحققه المشروع."],
        ["Method: how you will collect and analyse data, and why this method fits the question.", "المنهجية: كيف ستجمع البيانات وتحللها، ولماذا تناسب هذه المنهجية سؤالك."],
        ["Significance: who benefits and what changes if you answer the question.", "الأهمية: من يستفيد، وما الذي سيتغير إن أجبت عن السؤال."],
        ["Timeline: the main stages of the project, year by year.", "الجدول الزمني: المراحل الرئيسية للمشروع، سنة بسنة."]],
        p: [["Use your own ideas and cite the sources you rely on. A proposal built on someone else's work without credit is plagiarism.", "استخدم أفكارك الخاصة واذكر المصادر التي تعتمد عليها؛ فالمقترح المبني على عمل غيرك دون نسبته إليه يُعد سرقة علمية."]] },
      { t: "quiz", h: ["Check yourself", "اختبر نفسك"], pass: 2, items: [
        { s: ["Which research question is stronger?", "أي سؤال بحثي أقوى؟"], o: ["How does water affect mining?", "How does groundwater inflow affect slope stability in open-pit mines in arid regions, and can low-cost sensors give early warning of failure?"], a: 1, x: ["The second is focused: it names the process, the setting and something you can test.", "الثاني مركّز؛ إذ يحدد العملية والبيئة وشيئًا يمكن اختباره."] },
        { s: ["What does the background section need to show?", "ماذا يجب أن يُظهر قسم الخلفية؟"], o: [["What is known and the gap your project fills", "ما هو معروف والفجوة التي يسدها مشروعك"], ["Your life story", "قصة حياتك"], ["Every paper ever written on the topic", "كل بحث كُتب عن الموضوع"]], a: 0, x: ["Background sets up the gap. Be selective: key studies only.", "الخلفية تمهّد للفجوة البحثية، فكن انتقائيًا واكتفِ بأهم الدراسات."] }
      ] },
      { t: "builder", key: "proposal", h: ["Build your proposal", "ابنِ مقترحك"],
        intro: [
          ["Write each section in its own box. If your programme gives a different length or sections, follow the programme.", "اكتب كل قسم في مربعه الخاص، وإن حدد برنامجك طولًا أو أقسامًا مختلفة فالتزم بها."]],
        fields: [
          { id: "title", label: ["Title", "العنوان"], hint: ["Short and specific.", "قصير ومحدد."], min: null, max: null, unit: "words", rows: 1 },
          { id: "background", label: ["Background", "الخلفية"], hint: ["What is known, key studies, and the gap.", "ما هو معروف، وأهم الدراسات، والفجوة."], min: null, max: null, unit: "words", rows: 8 },
          { id: "questions", label: ["Research question(s)", "سؤال أو أسئلة البحث"], hint: ["One main question and up to three sub-questions.", "سؤال رئيسي واحد وحتى ثلاثة أسئلة فرعية."], min: null, max: null, unit: "words", rows: 3 },
          { id: "aims", label: ["Aims", "الأهداف"], hint: ["What the project will achieve.", "ما الذي سيحققه المشروع."], min: null, max: null, unit: "words", rows: 3 },
          { id: "method", label: ["Method", "المنهجية"], hint: ["Data, analysis, and why this method fits.", "البيانات، والتحليل، ولماذا تناسب هذه المنهجية."], min: null, max: null, unit: "words", rows: 7 },
          { id: "significance", label: ["Significance", "الأهمية"], hint: ["Who benefits and what changes.", "من يستفيد وما الذي يتغير."], min: null, max: null, unit: "words", rows: 4 },
          { id: "timeline", label: ["Timeline", "الجدول الزمني"], hint: ["Main stages, year by year.", "المراحل الرئيسية، سنة بسنة."], min: null, max: null, unit: "words", rows: 4 }],
        total: { max: 1200, unit: "words" }, export: "Research proposal" }
    ]
  };

  // ---------------- 52 · Email to a possible supervisor (master, phd) ----------------
  var EMAIL_A = "Dear Sir/Madam, I am a hardworking student and I am very interested in your university. I would like to do a PhD with you. Please find my CV attached. I am waiting for your reply. Thank you.";
  var EMAIL_B = "Dear Dr Chen, I am a final-year mining engineering student and will be fully funded by a government scholarship. I read your recent paper on sensor networks for slope monitoring, and I would like to test a low-cost version in open-pit mines in arid regions. My final-year project used similar sensors to track ground movement. Would you be open to supervising a PhD on this topic, starting next year? I have attached my CV and a one-page outline. Thank you for your time.";
  var EMAIL = {
    id: "supervisor-email", order: 52, icon: "✉️", mins: 20, skill: "app", lv: ["master", "phd"],
    t: ["Email to a possible supervisor", "رسالة إلى مشرف محتمل"],
    d: ["Write a short, specific first email that a busy academic will read.", "اكتب رسالة أولى قصيرة ومحددة يقرؤها الأكاديمي المشغول."],
    steps: [
      { t: "text", h: ["What to include", "ماذا تتضمن"], p: [
        ["For research degrees, contacting a possible supervisor before you apply is common, and some programmes expect it. Check your programme page. Academics receive many emails, so yours must be short and clearly about their work.", "في الدراسات البحثية، من الشائع التواصل مع مشرف محتمل قبل التقديم، وبعض البرامج تتوقع ذلك، فراجع صفحة برنامجك. يتلقى الأكاديميون رسائل كثيرة، لذا يجب أن تكون رسالتك قصيرة وواضحة الصلة بعملهم."]],
        list: [
          ["A clear subject line, such as “Prospective PhD student: groundwater and slope stability”.", "عنوان واضح للرسالة، مثل “Prospective PhD student: groundwater and slope stability”."],
          ["Their name and correct title, spelled correctly.", "اسمه ولقبه الصحيحان، مكتوبين دون أخطاء."],
          ["Who you are in one sentence: your degree, your stage and your funding, if you have it.", "من أنت في جملة واحدة: شهادتك، ومرحلتك، وتمويلك إن وُجد."],
          ["A specific link to their work: a recent paper or project you have actually read.", "صلة محددة بعملهم: بحث أو مشروع حديث قرأته فعلًا."],
          ["Your research idea in two or three sentences.", "فكرتك البحثية في جملتين أو ثلاث."],
          ["A clear, polite question, and your CV attached.", "سؤال واضح ومهذب، مع إرفاق سيرتك الذاتية."]] },
      { t: "text", h: ["What to avoid", "ما الذي تتجنبه"], list: [
        ["“Dear Sir/Madam” or the wrong name. It shows you are sending the same email to many people.", "عبارة “Dear Sir/Madam” أو اسم خاطئ؛ فهذا يُظهر أنك ترسل الرسالة نفسها لكثيرين."],
        ["Long emails. Aim for under about 200 words.", "الرسائل الطويلة؛ اجعلها في حدود 200 كلمة تقريبًا أو أقل."],
        ["Flattery without detail, such as “I admire your great work”.", "المديح دون تفاصيل، مثل “I admire your great work”."],
        ["Pretending to have read work you have not read.", "التظاهر بقراءة أعمال لم تقرأها."],
        ["Sending several reminder emails. If there is no reply after about two weeks, one polite follow-up is enough.", "إرسال رسائل تذكير متعددة؛ فإن لم يأتِ رد بعد أسبوعين تقريبًا، فتكفي رسالة متابعة مهذبة واحدة."]] },
      { t: "quiz", h: ["Compare the emails", "قارن بين الرسالتين"], pass: 2, items: [
        { s: ["Which email is stronger? Email A: “" + EMAIL_A + "” Email B: “" + EMAIL_B + "”", "أي الرسالتين أقوى؟ الرسالة A: “" + EMAIL_A + "” الرسالة B: “" + EMAIL_B + "”"], o: [["Email A", "الرسالة A"], ["Email B", "الرسالة B"]], a: 1, x: ["Email B names the academic, links to a specific paper, states funding, gives a clear idea and asks a clear question. Email A could be sent to anyone.", "الرسالة B تذكر اسم الأكاديمي، وتربط فكرتها ببحث محدد، وتذكر التمويل، وتطرح فكرة واضحة وسؤالًا واضحًا، أما الرسالة A فيمكن إرسالها إلى أي شخص."] },
        { s: ["Which subject line is better?", "أي عنوان أفضل للرسالة؟"], o: ["PhD", "Prospective PhD student: groundwater and slope stability (funded)", "URGENT – please read"], a: 1, x: ["It says who you are, your topic and that you are funded, before the email is even opened.", "يوضح من أنت وموضوعك وأنك ممول، قبل أن تُفتح الرسالة."] },
        { s: ["You have had no reply after two weeks. What should you do?", "لم يصلك رد بعد أسبوعين. ماذا تفعل؟"], o: [["Send one short, polite follow-up", "أرسل رسالة متابعة واحدة قصيرة ومهذبة"], ["Send a reminder every day", "أرسل تذكيرًا كل يوم"], ["Complain to the department", "أشتكي إلى القسم"]], a: 0, x: ["Academics are busy. One polite follow-up is fine; after that, contact other possible supervisors.", "الأكاديميون مشغولون؛ ولا بأس برسالة متابعة مهذبة واحدة، وبعدها تواصل مع مشرفين محتملين آخرين."] }
      ] },
      { t: "pad", key: "email", h: ["Write your email", "اكتب رسالتك"],
        prompt: "Write a first email to a real academic whose work you have read. Include a subject line at the top. Introduce yourself, link to one specific piece of their work, describe your idea briefly and ask a clear question.",
        min: 120, max: 220, unit: "words", checks: [
          ["My subject line names my topic.", "عنوان رسالتي يذكر موضوعي."],
          ["I use their correct name and title.", "أستخدم اسمه ولقبه الصحيحين."],
          ["I mention a specific paper or project I have actually read.", "أذكر بحثًا أو مشروعًا محددًا قرأته فعلًا."],
          ["My research idea is two or three sentences.", "فكرتي البحثية في جملتين أو ثلاث."],
          ["I end with one clear, polite question.", "أختم بسؤال واحد واضح ومهذب."]] }
    ]
  };

  // ---------------- 60 · Final edit (all) ----------------
  var FINAL = {
    id: "final-edit", order: 60, icon: "✅", mins: 15, skill: "app",
    t: ["Final edit", "التحرير النهائي"],
    d: ["A simple method to turn a draft into something you are ready to submit.", "طريقة بسيطة لتحويل مسودتك إلى نص جاهز للتقديم."],
    steps: [
      { t: "text", h: ["An editing method", "طريقة للتحرير"], p: [
        ["Leave your draft for at least a day before you edit. You will see problems you could not see while writing.", "اترك مسودتك يومًا على الأقل قبل أن تحررها، فسترى مشكلات لم تكن تراها أثناء الكتابة."]],
        list: [
          ["Read it aloud. Wherever you stumble or run out of breath, the sentence needs fixing.", "اقرأها بصوت عالٍ؛ فكل موضع تتعثر فيه أو ينقطع فيه نَفَسك يحتاج إلى تصحيح."],
          ["Cut about 20%. Remove repeated points, filler words (“very”, “really”, “in order to”) and sentences that only summarise.", "احذف نحو 20%: النقاط المكررة، والكلمات الحشوية (“very” و“really” و“in order to”)، والجمل التي تلخص فقط."],
          ["Check every name: universities, programmes, courses and people, spelled exactly as they spell them.", "تحقق من كل اسم: الجامعات والبرامج والمقررات والأشخاص، مكتوبة تمامًا كما يكتبونها هم."],
          ["Check every limit: words or characters, for each answer and in total, in the official system.", "تحقق من كل حد: الكلمات أو الأحرف لكل إجابة وللمجموع، في النظام الرسمي."],
          ["Ask someone you trust to read it and tell you what is unclear. Then make the changes yourself.", "اطلب من شخص تثق به أن يقرأها ويخبرك بما هو غير واضح، ثم أجرِ التعديلات بنفسك."]] },
      { t: "text", h: ["Last checks", "الفحوص الأخيرة"], list: [
        ["Every fact matches your documents: dates, grades, sponsorship and work history.", "كل معلومة تطابق مستنداتك: التواريخ والدرجات والابتعاث وسجل العمل."],
        ["You use one spelling style throughout, British or American.", "تستخدم أسلوب تهجئة واحدًا في النص كله، بريطانيًا أو أمريكيًا."],
        ["The first sentence of each answer makes the reader want to continue.", "الجملة الأولى في كل إجابة تجعل القارئ يرغب في المتابعة."],
        ["No clichés are left. Run the cliché detector one last time.", "لم تبقَ أي عبارة مستهلكة، فشغّل كاشف العبارات المستهلكة مرة أخيرة."],
        ["You have pasted the final text into the official form and checked how it looks there. Some systems remove formatting.", "لصقت النص النهائي في النموذج الرسمي وتحققت من شكله هناك، فبعض الأنظمة تحذف التنسيق."]] },
      { t: "quiz", h: ["Check yourself", "اختبر نفسك"], pass: 2, items: [
        { s: ["You are 300 characters over the limit. What should you cut first?", "تجاوزت الحد بـ300 حرف. ماذا تحذف أولًا؟"], o: [["Repeated points and filler words", "النقاط المكررة والكلمات الحشوية"], ["Your best specific example", "أفضل مثال محدد لديك"], ["All the reflection", "كل جزء التأمل"]], a: 0, x: ["Specific examples and reflection are your strongest material. Repetition and filler go first.", "الأمثلة المحددة والتأمل هما أقوى ما لديك؛ فالتكرار والحشو هما أول ما يُحذف."] },
        { s: ["What is the main benefit of reading your draft aloud?", "ما الفائدة الأساسية من قراءة مسودتك بصوت عالٍ؟"], o: [["You hear awkward sentences and missing words", "تسمع الجمل الركيكة والكلمات الناقصة"], ["It makes the text longer", "يجعل النص أطول"], ["It checks the word count", "يتحقق من عدد الكلمات"]], a: 0, x: ["Your ear catches problems your eyes skip over.", "أذنك تلتقط مشكلات تتجاوزها عيناك."] },
        { s: ["A friend offers to rewrite your statement “to make it sound better”. What is the right kind of help?", "عرض عليك صديق أن يعيد كتابة بيانك «ليبدو أفضل». ما نوع المساعدة الصحيح؟"], o: [["Let them rewrite it", "أتركه يعيد كتابته"], ["Ask for feedback and questions, then make the changes yourself", "أطلب ملاحظاته وأسئلته، ثم أجري التعديلات بنفسي"]], a: 1, x: ["Feedback is good. The words must still be yours, because the statement has to show who you are.", "الملاحظات مفيدة، لكن الكلمات يجب أن تبقى كلماتك، لأن البيان يجب أن يُظهر من أنت."] }
      ] },
      { t: "text", h: ["You're ready", "أنت جاهز"], p: [
        ["You started with a list of experiences and ended with a draft that sounds like you. That is the hardest part done.", "بدأت بقائمة من التجارب وانتهيت بمسودة تشبهك، وهذا هو الجزء الأصعب وقد أنجزته."],
        ["Download your drafts, paste the final versions into each official system, and check every limit and deadline there.", "نزّل مسوداتك، والصق النسخ النهائية في كل نظام رسمي، وتحقق هناك من كل حد وموعد نهائي."],
        ["Requirements change from year to year. Before you submit, check your university's page and the official application or visa website one more time.", "المتطلبات تتغير من عام لآخر، فقبل التقديم راجع صفحة جامعتك وموقع التقديم أو التأشيرة الرسمي مرة أخرى."],
        ["Good luck. Your story is worth telling.", "بالتوفيق، فقصتك تستحق أن تُروى."]] }
    ]
  };

  window.MasarokCourse = {
    id: "writing",
    t: ["Application writing coach", "مدرب كتابة طلبات القبول"],
    sub: ["Write what your country actually asks for, from first ideas to a final draft.", "اكتب ما تطلبه دولتك فعلًا، من الأفكار الأولى حتى المسودة النهائية."],
    lessons: [STORY, SHOW, CLICHE, UCAS, COMMON, WHYUS, GS, MOTIV, SHORT, SOP, PROPOSAL, EMAIL, FINAL]
  };
})();

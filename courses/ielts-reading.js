/* Masarok Academy · IELTS Academic · Reading skills (skimming and scanning, completion, multiple choice and views, a full timed passage).
   Original Masarok practice material in official formats. Teaching text is [English, Arabic]; test material is English. */
(function () {
  "use strict";

  // ---------------- lesson: skimming and scanning ----------------
  var SKIM = {
    id: "read-skim", order: 42, icon: "⚡", mins: 15, skill: "r",
    t: ["Reading: skimming and scanning", "القراءة: القراءة السريعة والقراءة المسحية"],
    d: ["Read faster, find details in seconds and manage your 60 minutes.", "اقرأ أسرع، واعثر على التفاصيل في ثوانٍ، وأدِر دقائقك الستين."],
    steps: [
      { t: "text", h: ["Two ways to read fast", "طريقتان للقراءة السريعة"], p: [
        ["You can't read three long passages word by word in 60 minutes, and you don't need to. Strong readers switch between two fast reading styles.", "لا يمكنك قراءة ثلاثة نصوص طويلة كلمةً كلمة في 60 دقيقة، ولا تحتاج إلى ذلك. القارئ المتمكن ينتقل بين أسلوبين سريعين للقراءة."]],
        list: [
          ["Skimming: read quickly for the gist, the main idea. Look at the title, the first sentence of each paragraph and the last paragraph.", "القراءة السريعة (Skimming): اقرأ بسرعة لتلتقط الفكرة العامة. انظر إلى العنوان، والجملة الأولى من كل فقرة، والفقرة الأخيرة."],
          ["Scanning: search for one specific detail, such as a name, number, date or place. Move your eyes down the text looking for it, and ignore everything else.", "القراءة المسحية (Scanning): ابحث عن معلومة محددة واحدة، مثل اسم أو رقم أو تاريخ أو مكان. مرّر عينيك على النص بحثًا عنها وتجاهل كل ما سواها."],
          ["Then read closely: once you find the right place, slow down and read those one or two sentences carefully before you answer.", "ثم اقرأ بتمعّن: عندما تجد الموضع الصحيح، أبطئ واقرأ الجملة أو الجملتين بعناية قبل أن تجيب."]] },

      { t: "table", h: ["Which style, and when?", "أي أسلوب، ومتى؟"], cols: [["The question asks for…", "السؤال يطلب…"], ["Use", "استخدم"], ["Look for", "ابحث عن"]], rows: [
        ["The main idea of the passage or a paragraph", "Skimming", "Titles, first sentences, ideas that repeat"],
        ["A heading for a paragraph", "Skimming", "What the whole paragraph is about"],
        ["A year, number or amount", "Scanning", "Digits and number words (twelfth, a quarter)"],
        ["A person, place or organisation", "Scanning", "Capital letters"],
        ["A word to complete a sentence", "Scanning, then close reading", "Key words and their synonyms"]],
        p: [["Scanning is easiest with names and numbers, because they look different from the words around them.", "المسح أسهل مع الأسماء والأرقام، لأن شكلها يختلف عن الكلمات المحيطة بها."]] },

      { t: "text", h: ["Your 60 minutes", "دقائقك الستون"], list: [
        ["There are 3 passages and 40 questions, and the passages get harder. Aim for about 20 minutes per passage: a little less on Passage 1, a little more on Passage 3.", "هناك 3 نصوص و40 سؤالًا، وتزداد النصوص صعوبة. خصص نحو 20 دقيقة لكل نص: أقل قليلًا للنص الأول، وأكثر قليلًا للثالث."],
        ["In the paper test there is no extra time to copy your answers onto the answer sheet, so write them there as you go.", "في الاختبار الورقي لا يوجد وقت إضافي لنقل إجاباتك إلى ورقة الإجابة، فاكتبها فيها أولًا بأول."],
        ["Read the questions before the passage. Then you know what you are looking for, and you can underline the key words.", "اقرأ الأسئلة قبل النص، فتعرف ما الذي تبحث عنه، وتستطيع وضع خط تحت الكلمات المهمة."],
        ["Most question types follow the order of the passage. If question 3 is in paragraph B, question 4 is probably in B or C.", "معظم أنواع الأسئلة تسير بترتيب النص، فإن كان السؤال 3 في الفقرة B، فالسؤال 4 غالبًا في B أو C."],
        ["If one question takes more than 2 minutes, guess, mark it and move on. A wrong answer doesn't lose you a mark.", "إذا استغرق سؤال واحد أكثر من دقيقتين، فخمّن وضع عليه علامة وانتقل، فالإجابة الخاطئة لا تُنقص من درجتك."]] },

      { t: "quiz", h: ["Skim or scan?", "قراءة سريعة أم مسحية؟"], pass: 3, items: [
        { s: ["You need the year a dam was built.", "تحتاج إلى السنة التي بُني فيها سدّ."], o: [["Skim", "قراءة سريعة"], ["Scan", "قراءة مسحية"]], a: 1, x: ["A year is a specific detail, so scan for digits.", "السنة معلومة محددة، فامسح النص بحثًا عن الأرقام."] },
        { s: ["You want to know what the whole passage is about.", "تريد أن تعرف موضوع النص كله."], o: [["Skim", "قراءة سريعة"], ["Scan", "قراءة مسحية"]], a: 0, x: ["The main idea comes from skimming the title and first sentences.", "الفكرة الرئيسية تأتي من القراءة السريعة للعنوان والجمل الأولى."] },
        { s: ["A question asks for the name of a scientist.", "سؤال يطلب اسم عالِم."], o: [["Skim", "قراءة سريعة"], ["Scan", "قراءة مسحية"]], a: 1, x: ["Names start with capital letters, which are easy to scan for.", "الأسماء تبدأ بحروف كبيرة يسهل البحث عنها بالمسح."] },
        { s: ["You must choose the best heading for paragraph C.", "عليك اختيار أنسب عنوان للفقرة C."], o: [["Skim", "قراءة سريعة"], ["Scan", "قراءة مسحية"]], a: 0, x: ["A heading matches the main idea of the whole paragraph, so skim it.", "العنوان يطابق الفكرة الرئيسية للفقرة كلها، فاقرأها قراءة سريعة."] }
      ] },

      { t: "text", h: ["Practice: race the clock", "تدريب: سابِق الوقت"], p: [
        ["The next two passages are short and timed. Read the questions first, skim the passage for the gist, then scan for the details. Try to finish before the timer ends.", "النصان التاليان قصيران ومحددان بوقت. اقرأ الأسئلة أولًا، ثم اقرأ النص بسرعة لتلتقط الفكرة العامة، ثم امسحه بحثًا عن التفاصيل. حاول أن تنتهي قبل انتهاء الوقت."]] },

      { t: "passage", h: ["Timed passage 1 · 4 minutes", "النص المؤقت 1 · 4 دقائق"], title: "The long journey of paper", time: 4, pass: 4,
        instr: ["Questions 1–2: choose the correct answer. Questions 3–5: write NO MORE THAN TWO WORDS AND/OR A NUMBER from the passage.", "السؤالان 1–2: اختر الإجابة الصحيحة. الأسئلة 3–5: اكتب كلمتين على الأكثر و/أو رقمًا من النص."],
        paras: [
          "Paper is so common today that it is easy to forget how long it took to reach most of the world. The earliest known paper was made in China more than two thousand years ago, and in the second century CE an official named Cai Lun improved the process, using tree bark, old cloth and fishing nets. For the next five hundred years, the method was hardly known outside East Asia.",
          "That changed in the eighth century, when papermaking reached Samarkand, a trading city in Central Asia. From there it spread quickly across the Islamic world. A paper mill was operating in Baghdad by about 795, and within a century paper was being produced in Damascus and Cairo. Papermakers in these cities did not have the mulberry trees used in China, so they made paper from linen rags instead, beating the cloth into a pulp with heavy hammers driven by water.",
          "The effect on learning was enormous. Paper was far cheaper than parchment, which was made from animal skin, and much lighter to carry. Government offices began to keep written records on a scale that had not been possible before, and the booksellers of Baghdad were said to number in the hundreds. Scholars could copy and exchange texts on mathematics, medicine and astronomy more easily than ever.",
          "Europe was slow to follow. The first European paper mills appeared in Spain in the twelfth century, more than a thousand years after paper was invented. Even then, many European writers distrusted the new material and continued to use parchment for important documents until printing made paper the obvious choice."],
        items: [
          { k: "mcq", s: "What is the passage mainly about?", o: ["How paper is made today", "How paper spread from China and why it mattered", "Why Europe preferred parchment", "The life of Cai Lun"], a: 1, x: ["Skim the first sentence of each paragraph: China, then Samarkand and the Islamic world, then “the effect on learning”, then Europe. A, C and D are details or not covered.", "اقرأ الجملة الأولى من كل فقرة بسرعة: الصين، ثم سمرقند والعالم الإسلامي، ثم «الأثر في التعلّم»، ثم أوروبا. أما A وC وD فتفاصيل أو غير مذكورة."] },
          { k: "mcq", s: "What is the main idea of the third paragraph?", o: ["Paper was expensive to produce", "Baghdad had more bookshops than any other city", "Paper made learning and record-keeping much easier", "Scholars preferred parchment for science"], a: 2, x: ["“The effect on learning was enormous”: cheaper paper meant more records and more texts. B is a trap: the text says booksellers numbered “in the hundreds” but never compares Baghdad with other cities.", "«كان الأثر في التعلّم هائلًا»: الورق الأرخص يعني سجلات ونصوصًا أكثر. والخيار B فخ: النص يقول إن الوراقين بلغوا «المئات» لكنه لا يقارن بغداد بغيرها."] },
          { k: "gap", s: "In the eighth century, papermaking reached the city of ___.", a: ["samarkand"], x: ["Scan for “eighth century”: “papermaking reached Samarkand, a trading city in Central Asia”.", "امسح النص بحثًا عن «eighth century»: «وصلت صناعة الورق إلى سمرقند، وهي مدينة تجارية في آسيا الوسطى»."] },
          { k: "gap", s: "There was a paper mill in Baghdad by about ___.", a: ["795"], x: ["Scan for the name Baghdad: “operating in Baghdad by about 795”.", "امسح النص بحثًا عن اسم بغداد: «تعمل في بغداد بحلول عام 795 تقريبًا»."] },
          { k: "gap", s: "Instead of mulberry trees, these papermakers used ___.", a: ["linen rags"], x: ["“They made paper from linen rags instead.” Two words, within the limit.", "«صنعوا الورق من خِرَق الكتّان بدلًا من ذلك». كلمتان، ضمن الحد المسموح."] }
        ] },

      { t: "passage", h: ["Timed passage 2 · 3 minutes", "النص المؤقت 2 · 3 دقائق"], title: "Why cities stay warm at night", time: 3, pass: 4,
        instr: ["Questions 1–2: choose the correct answer. Questions 3–5: write NO MORE THAN TWO WORDS AND/OR A NUMBER from the passage.", "السؤالان 1–2: اختر الإجابة الصحيحة. الأسئلة 3–5: اكتب كلمتين على الأكثر و/أو رقمًا من النص."],
        paras: [
          "On a still summer evening, the centre of a large city can be several degrees warmer than the countryside around it. Scientists call this an urban heat island, and it is caused mainly by the materials that cities are built from. Dark roads and roofs absorb sunlight during the day and release the heat slowly at night, so the city never fully cools down.",
          "The difference is often greatest after sunset. In one study of a desert city, researchers found that the centre was up to 6 degrees Celsius warmer than nearby farmland at midnight, although the gap at midday was less than 2 degrees. Tall buildings make the problem worse by trapping warm air in narrow streets and blocking the wind. Heat from air conditioners, cars and factories adds to the effect.",
          "The consequences go beyond discomfort. Hotter nights make it harder for people to sleep, and they increase the demand for electricity, because air conditioners run for longer. Older people and young children are most at risk during heatwaves.",
          "Cities are now testing several solutions. The simplest is to paint roofs white or in light colours, which reflect sunlight instead of absorbing it. In one trial, a light-coloured coating reduced the surface temperature of a road by around 10 degrees. Planting trees is another popular choice, as their shade cools the ground and the water they release cools the air. Some planners are also designing new districts with wider streets that follow the direction of the wind, an idea that traditional builders in hot regions used for centuries."],
        items: [
          { k: "mcq", s: "What is the writer's main purpose?", o: ["To argue that cities should ban air conditioners", "To compare desert cities with cold cities", "To describe a single scientific study", "To explain the causes, effects and possible solutions of urban heat islands"], a: 3, x: ["The first sentences of the paragraphs move from cause (“caused mainly by the materials”) to effects (“the consequences”) to “several solutions”.", "الجمل الأولى في الفقرات تنتقل من السبب («ينتج أساسًا عن المواد») إلى الآثار («العواقب») ثم إلى «عدة حلول»."] },
          { k: "mcq", s: "According to the passage, what is the main cause of an urban heat island?", o: ["Heat from air conditioners", "The materials cities are built from", "Tall buildings", "Traffic"], a: 1, x: ["“It is caused mainly by the materials that cities are built from.” The others only “make the problem worse” or “add to the effect”.", "«ينتج أساسًا عن المواد التي تُبنى منها المدن». أما البقية فهي فقط «تزيد المشكلة سوءًا» أو «تضيف إلى الأثر»."] },
          { k: "gap", s: "In the desert city study, the centre was up to ___ degrees warmer at midnight.", a: ["6", "six"], x: ["Scan for “midnight”: “up to 6 degrees Celsius warmer than nearby farmland at midnight”. Don't choose 2, which is the midday figure.", "امسح بحثًا عن «midnight»: «أدفأ بما يصل إلى 6 درجات مئوية من المزارع القريبة عند منتصف الليل». لا تختر 2، فهو رقم منتصف النهار."] },
          { k: "gap", s: "___ and young children face the greatest risk during heatwaves.", a: ["older people"], x: ["“Older people and young children are most at risk during heatwaves.” “Greatest risk” paraphrases “most at risk”.", "«كبار السن والأطفال الصغار هم الأكثر عرضة للخطر خلال موجات الحر». وعبارة greatest risk إعادة صياغة لـ most at risk."] },
          { k: "gap", s: "A light-coloured coating lowered a road's surface temperature by about ___ degrees.", a: ["10", "ten"], x: ["“Reduced the surface temperature of a road by around 10 degrees.” “Lowered” = “reduced”, “about” = “around”.", "«خفّض درجة حرارة سطح الطريق بنحو 10 درجات». lowered تعني reduced، وabout تعني around."] }
        ] }
    ]
  };

  // ---------------- lesson: sentence and summary completion ----------------
  var COMPLETE = {
    id: "read-complete", order: 43, icon: "🧾", mins: 15, skill: "r",
    t: ["Reading: sentence and summary completion", "القراءة: إكمال الجمل والملخص"],
    d: ["Respect the word limit, fit the grammar and copy the exact words.", "التزم بحد الكلمات، وراعِ القواعد، وانقل الكلمات كما هي تمامًا."],
    steps: [
      { t: "text", h: ["What the task looks like", "شكل المهمة"], p: [
        ["You complete sentences, a summary, notes or a table with words from the passage. The instructions tell you the maximum number of words.", "تكمل جملًا أو ملخصًا أو ملاحظات أو جدولًا بكلمات من النص، وتحدد التعليمات الحد الأقصى لعدد الكلمات."],
        ["Sentence completion questions follow the order of the passage. A summary usually covers one part of the passage, and its gaps are usually in order too.", "أسئلة إكمال الجمل تسير بترتيب النص. والملخص يغطي عادةً جزءًا واحدًا من النص، وفراغاته غالبًا بالترتيب أيضًا."],
        ["Some summaries give you a box of words to choose from. In this lesson you take the words from the passage itself.", "بعض الملخصات تعطيك قائمة كلمات لتختار منها، أما في هذا الدرس فتأخذ الكلمات من النص نفسه."]] },

      { t: "table", h: ["Reading the word limit", "فهم حد الكلمات"], cols: [["Answer", "الإجابة"], ["NO MORE THAN TWO WORDS AND/OR A NUMBER?", "كلمتان على الأكثر و/أو رقم؟"]], rows: [
        ["canals", "✓ one word"],
        ["underground canals", "✓ two words"],
        ["120", "✓ a number"],
        ["120 metres", "✓ a number and a word"],
        ["the underground canals", "✗ three words, so it is marked wrong"],
        ["well-known", "✓ a hyphenated word counts as one"]],
        p: [["Going over the limit makes the answer wrong, even if the idea is right. “ONE WORD ONLY” means exactly one word.", "تجاوز الحد يجعل الإجابة خاطئة حتى لو كانت الفكرة صحيحة، و«ONE WORD ONLY» تعني كلمة واحدة بالضبط."]] },

      { t: "text", h: ["A five-step method", "طريقة من خمس خطوات"], list: [
        ["Read the sentence and predict the answer. Do you need a noun, a verb, an adjective or a number? Singular or plural?", "اقرأ الجملة وتوقّع الإجابة: هل تحتاج اسمًا أم فعلًا أم صفة أم رقمًا؟ مفردًا أم جمعًا؟"],
        ["Underline the key words and think of synonyms. The passage usually says the same thing in different words.", "ضع خطًا تحت الكلمات المهمة وفكّر في مرادفاتها، فالنص غالبًا يقول المعنى نفسه بكلمات مختلفة."],
        ["Scan for the key words or their synonyms to find the right sentence in the passage.", "امسح النص بحثًا عن الكلمات المهمة أو مرادفاتها لتجد الجملة الصحيحة."],
        ["Copy the missing words exactly, with the same spelling and form. Don't change “roofs” to “roof”.", "انقل الكلمات الناقصة كما هي تمامًا بالتهجئة والصيغة نفسيهما، فلا تغيّر roofs إلى roof."],
        ["Read the finished sentence again. It must be grammatical, match the passage and stay within the limit.", "اقرأ الجملة بعد إكمالها مرة أخرى، فيجب أن تكون سليمة نحويًا ومطابقة للنص وضمن الحد المسموح."]] },

      { t: "passage", h: ["A worked example", "مثال محلول"], title: "The date palm", teach: true,
        instr: ["Complete the sentences. Write NO MORE THAN TWO WORDS AND/OR A NUMBER from the passage.", "أكمل الجمل بكلمتين على الأكثر و/أو رقم من النص."],
        paras: [
          "The date palm has been grown in Arabia for at least six thousand years. A single tree can produce more than 100 kilograms of fruit in a good year, and almost every part of it has a use. The trunks were once used as beams for roofs, while the leaves were woven into baskets and mats. Farmers usually plant palms in groups, because the trees protect one another, and the crops beneath them, from strong winds and the midday sun."],
        items: [
          { k: "gap", s: "In a good year, one date palm may give over ___ of fruit.", a: ["100 kilograms"], x: ["“Over ___ of fruit” needs an amount. “Over” paraphrases “more than”: “more than 100 kilograms of fruit”. A number and one word is within the limit.", "عبارة «over ___ of fruit» تحتاج إلى كمية، وover إعادة صياغة لـ more than: «أكثر من 100 كيلوغرام من الثمار». رقم وكلمة واحدة ضمن الحد."] },
          { k: "gap", s: "Palm leaves were made into ___ and mats.", a: ["baskets"], x: ["“Made into” paraphrases “woven into”. The answer must be plural, like “mats”: “woven into baskets and mats”.", "«made into» إعادة صياغة لـ «woven into»، والإجابة يجب أن تكون جمعًا مثل mats: «نُسجت سلالًا وحُصرًا»."] },
          { k: "gap", s: "Planting palms together protects them from the wind and the ___.", a: ["midday sun"], x: ["“The ___” needs a noun. The passage says “from strong winds and the midday sun”. “Sun” alone is close, but “midday sun” is the exact phrase.", "«the ___» تحتاج إلى اسم، والنص يقول «من الرياح القوية وشمس الظهيرة». كلمة sun وحدها قريبة، لكن midday sun هي العبارة الدقيقة."] }
        ] },

      { t: "quiz", h: ["Check the limit", "تحقّق من الحد"], pass: 2, items: [
        { s: ["Limit: NO MORE THAN TWO WORDS. The passage says “the trunks were once used as beams for roofs”. Sentence: “Palm trunks were used to hold up ___.” Which answer is correct?", "الحد: كلمتان على الأكثر. يقول النص: «the trunks were once used as beams for roofs». الجملة: «Palm trunks were used to hold up ___». أي إجابة صحيحة؟"], o: ["roofs", "beams for roofs", "roof"], a: 0, x: ["“Beams for roofs” is three words, so it breaks the limit. “Roof” changes the form of the word in the passage.", "«beams for roofs» ثلاث كلمات فتتجاوز الحد، وroof تغيّر صيغة الكلمة الواردة في النص."] },
        { s: ["Which answer fits the grammar? “Farmers often plant palms in ___.”", "أي إجابة تناسب القواعد؟ «Farmers often plant palms in ___.»"], o: ["group", "groups", "grouping"], a: 1, x: ["The passage says “in groups”. “In group” is not grammatical, and “grouping” is not the word in the text.", "النص يقول «in groups». وعبارة in group غير سليمة نحويًا، وgrouping ليست الكلمة الواردة في النص."] },
        { s: ["The instruction says ONE WORD AND/OR A NUMBER. Which answer breaks the rule?", "التعليمات تقول: كلمة واحدة و/أو رقم. أي إجابة تخالف القاعدة؟"], o: ["6,000", "six thousand years", "Arabia"], a: 1, x: ["“Six thousand years” is three words. “6,000” is a number and “Arabia” is one word.", "«six thousand years» ثلاث كلمات، أما 6,000 فرقم وArabia كلمة واحدة."] }
      ] },

      { t: "text", h: ["Now the practice passage", "والآن نص التدريب"], p: [
        ["The questions come in two sets with different word limits. Read each instruction carefully before you answer.", "تأتي الأسئلة في مجموعتين بحدود كلمات مختلفة، فاقرأ تعليمات كل مجموعة بعناية قبل أن تجيب."]] },

      { t: "passage", h: ["Practice passage", "نص للتدريب"], title: "Hidden rivers: the qanats of the desert", pass: 7,
        paras: [
          "Long before pumps and pipes, people living in the deserts of the Middle East and Central Asia found a way to bring water to their fields from many kilometres away. The system, known as a qanat in Persian and a falaj in parts of Arabia, is a gently sloping tunnel that carries groundwater from the foot of the hills to the surface, using nothing but gravity. The oldest qanats are thought to be around three thousand years old, and thousands are still in use today.",
          "Building a qanat began with the search for water. Skilled diggers, who often learnt the craft from their fathers, would first sink a test well at the base of a hill, where rainwater collected underground. If they found a reliable supply, this became the mother well, which could be more than fifty metres deep. The diggers then worked backwards from the village, cutting a tunnel towards the mother well. Every twenty to fifty metres along its route, they dug a vertical shaft. These shafts allowed workers to remove the soil and brought fresh air into the tunnel. From above, they look like a long line of small craters across the desert.",
          "The slope of the tunnel was the most difficult part to get right. If it was too steep, the fast-moving water would wear away the floor and the tunnel could collapse; if it was too shallow, the water would hardly flow at all. Diggers used oil lamps to keep the tunnel straight and simple water levels to check the slope, sometimes over distances of more than ten kilometres.",
          "Because the water travels underground, very little is lost to evaporation, which is a serious advantage in a climate where summer temperatures can exceed 45 degrees. The flow is also steady throughout the year, unlike rivers that flood in one season and run dry in another. A qanat cannot be switched off, however, so communities had to agree on how to share the water fairly.",
          "In many villages, each farming family received the whole flow for a fixed period of time. In the past, these periods were measured during the day by the movement of shadows and at night by the position of the stars. An official known as the water master kept a record of each family's share, which could be bought, sold or passed on to children like land.",
          "Today, many qanats have been abandoned. Modern electric pumps can extract far more water, but in some regions they have also lowered the water table, leaving the old tunnels dry. Engineers are now studying qanats as an example of sustainable water use, because they take only what the ground naturally supplies."],
        groups: [
          { instr: ["Questions 1–5: complete the summary. Choose NO MORE THAN TWO WORDS from the passage for each answer.", "الأسئلة 1–5: أكمل الملخص. اختر كلمتين على الأكثر من النص لكل إجابة."], items: [
            { k: "gap", s: "Building a qanat: diggers started by making a ___ at the bottom of a hill.", a: ["test well"], x: ["“Would first sink a test well at the base of a hill.” “Bottom” = “base”, “started by” = “first”.", "«كانوا يحفرون أولًا بئرًا تجريبية عند سفح التل». bottom تعني base، وstarted by تعني first."] },
            { k: "gap", s: "If the water supply was dependable, this became the ___.", a: ["mother well"], x: ["“If they found a reliable supply, this became the mother well.” “Dependable” = “reliable”.", "«إن وجدوا مصدرًا موثوقًا، صارت هذه البئر هي البئر الأم». dependable تعني reliable."] },
            { k: "gap", s: "Vertical shafts were used to take out soil and to let in ___.", a: ["fresh air"], x: ["The shafts “allowed workers to remove the soil and brought fresh air into the tunnel”.", "الآبار العمودية «سمحت للعمال بإخراج التراب وأدخلت الهواء النقي إلى النفق»."] },
            { k: "gap", s: "If the slope was too steep, fast water could damage the floor and make the tunnel ___.", a: ["collapse"], x: ["“If it was too steep… the tunnel could collapse.” After “make the tunnel” you need a verb.", "«إذا كان شديد الانحدار… قد ينهار النفق». بعد make the tunnel تحتاج إلى فعل."] },
            { k: "gap", s: "Oil lamps helped the diggers to keep the tunnel ___.", a: ["straight"], x: ["“Diggers used oil lamps to keep the tunnel straight.” Don't answer “steady”: in the passage that word describes the flow of water, not the purpose of the lamps.", "«استخدم الحفّارون مصابيح الزيت لإبقاء النفق مستقيمًا». لا تكتب steady، فهي تصف الجريان لا الغرض من المصابيح."] }
          ] },
          { instr: ["Questions 6–10: complete the sentences. Write NO MORE THAN TWO WORDS AND/OR A NUMBER from the passage.", "الأسئلة 6–10: أكمل الجمل. اكتب كلمتين على الأكثر و/أو رقمًا من النص."], items: [
            { k: "gap", s: "Because the water flows underground, qanats lose little of it to ___.", a: ["evaporation"], x: ["“Because the water travels underground, very little is lost to evaporation.”", "«لأن الماء يجري تحت الأرض، لا يُفقد منه إلا القليل بالتبخر»."] },
            { k: "gap", s: "In summer, desert temperatures may rise above ___ degrees.", a: ["45", "forty-five"], x: ["“Summer temperatures can exceed 45 degrees.” “Rise above” = “exceed”.", "«قد تتجاوز درجات الحرارة صيفًا 45 درجة». rise above تعني exceed."] },
            { k: "gap", s: "At night, each family's time with the water was measured by the ___ of the stars.", a: ["position"], x: ["“At night by the position of the stars.” In the day it was “the movement of shadows”, so “movement” is the trap.", "«وفي الليل بموقع النجوم». أما في النهار فكان «بحركة الظلال»، فكلمة movement هي الفخ."] },
            { k: "gap", s: "A record of every family's share was kept by the ___.", a: ["water master"], x: ["“An official known as the water master kept a record of each family's share.”", "«مسؤول يُعرف بوكيل الماء كان يسجّل حصة كل أسرة»."] },
            { k: "gap", s: "In some regions, electric pumps have lowered the ___.", a: ["water table"], x: ["“In some regions they have also lowered the water table.”", "«وفي بعض المناطق خفّضت أيضًا منسوب المياه الجوفية»."] }
          ] }
        ] }
    ]
  };

  // ---------------- lesson: multiple choice and the writer's views ----------------
  var MCQ = {
    id: "read-mcq", order: 44, icon: "🧠", mins: 18, skill: "r",
    t: ["Reading: multiple choice and the writer's views", "القراءة: الاختيار من متعدد وآراء الكاتب"],
    d: ["Avoid the three classic traps and tell Yes/No/Not Given from True/False.", "تجنّب الفخاخ الثلاثة الشائعة، وفرّق بين Yes/No/Not Given وTrue/False."],
    steps: [
      { t: "text", h: ["Multiple choice in Reading", "الاختيار من متعدد في القراءة"], p: [
        ["You choose one answer from A–D, or sometimes two or three from a longer list. The questions follow the order of the passage.", "تختار إجابة واحدة من A إلى D، وأحيانًا إجابتين أو ثلاثًا من قائمة أطول، والأسئلة تسير بترتيب النص."],
        ["Read the question stem first and find that part of the passage before you look at the options. Then decide which option says the same thing in different words.", "اقرأ رأس السؤال أولًا وحدد موضعه في النص قبل أن تنظر إلى الخيارات، ثم قرر أي خيار يقول المعنى نفسه بكلمات مختلفة."]] },

      { t: "text", h: ["Three classic traps", "ثلاثة فخاخ شائعة"], list: [
        ["True, but not the answer: the option is correct according to the passage, but it doesn't answer this question.", "صحيح لكنه ليس الإجابة: الخيار صحيح بحسب النص، لكنه لا يجيب عن هذا السؤال."],
        ["Too general or too strong: the option goes further than the passage, for example “always” when the text says “often”.", "عام جدًا أو مبالغ فيه: الخيار يتجاوز ما يقوله النص، مثل always بينما يقول النص often."],
        ["The opposite: the option uses words from the passage but reverses the meaning, often by missing a small word such as “not” or “less”.", "العكس: الخيار يستخدم كلمات من النص لكنه يقلب المعنى، غالبًا بإغفال كلمة صغيرة مثل not أو less."]],
        p: [["An option that repeats the exact words of the passage is not automatically right. The right answer usually paraphrases.", "الخيار الذي يكرر كلمات النص حرفيًا ليس صحيحًا بالضرورة، فالإجابة الصحيحة عادةً إعادة صياغة."]] },

      { t: "passage", h: ["A worked example", "مثال محلول"], title: "Electric scooters", teach: true, paras: [
        "Electric scooters have spread rapidly in many cities. They are cheap to hire and produce no exhaust fumes, so they are often described as a green form of transport. However, a recent study found that most scooter trips replaced walking or bus journeys rather than car journeys. In my view, therefore, their environmental benefits have been exaggerated."],
        items: [
          { k: "mcq", s: "What did the study find?", o: ["Scooters produce no exhaust fumes", "Scooters are good for the environment", "Most scooter trips replaced walking or bus journeys", "Most scooter trips replaced car journeys"], a: 2, x: ["C matches “most scooter trips replaced walking or bus journeys”. A is true but is not what the study found. B is too general. D is the opposite: the text says “rather than car journeys”.", "الخيار C يطابق «معظم رحلات السكوتر حلّت محل المشي أو الحافلة». A صحيح لكنه ليس نتيجة الدراسة، وB عام جدًا، وD عكس النص الذي يقول «بدلًا من رحلات السيارة»."] },
          { k: "ynng", s: "The writer thinks the green benefits of scooters have been overstated.", a: "Y", x: ["“In my view… their environmental benefits have been exaggerated.” “Overstated” = “exaggerated”.", "«في رأيي… بُولغ في فوائدها البيئية». overstated تعني exaggerated."] },
          { k: "ynng", s: "The writer believes cities should ban electric scooters.", a: "NG", x: ["The writer criticises the green claims but says nothing about banning scooters.", "ينتقد الكاتب الادعاءات البيئية لكنه لا يقول شيئًا عن حظر السكوتر."] }
        ] },

      { t: "table", h: ["TRUE/FALSE or YES/NO?", "صحيح/خطأ أم نعم/لا؟"], cols: [["Question type", "نوع السؤال"], ["It asks about", "يسأل عن"], ["You usually see it with", "تجده عادةً مع"]], rows: [
        ["TRUE / FALSE / NOT GIVEN", "Facts and information in the passage", "Factual texts: science, history, how things work"],
        ["YES / NO / NOT GIVEN", "The writer's views and claims", "Opinion texts: arguments, reviews, discussions"]],
        p: [["The logic is the same. YES: the writer agrees with the statement. NO: the writer says the opposite. NOT GIVEN: the writer doesn't say what they think about it.", "المنطق واحد. YES: الكاتب يوافق على العبارة. NO: الكاتب يقول العكس. NOT GIVEN: الكاتب لا يذكر رأيه في ذلك."]] },

      { t: "text", h: ["Finding the writer's voice", "كيف تعرف رأي الكاتب"], list: [
        ["Look for opinion phrases: I believe, in my view, it seems to me, this is mistaken.", "ابحث عن عبارات الرأي: I believe وin my view وit seems to me وthis is mistaken."],
        ["Notice judging words: unfortunately, surprisingly, fair, an exaggeration.", "انتبه لكلمات الحكم والتقييم: unfortunately وsurprisingly وfair وan exaggeration."],
        ["Separate the writer from other people. “Some critics argue…” is not the writer's view unless the writer agrees with it.", "افصل بين الكاتب وغيره، فعبارة «Some critics argue…» ليست رأي الكاتب إلا إذا وافق عليها."],
        ["Watch “however”, “but” and “yet”. The writer's real position often comes after them.", "راقب however وbut وyet، فموقف الكاتب الحقيقي يأتي بعدها غالبًا."],
        ["Check how strong the claim is. “May”, “often” and “some” are weaker than “will”, “always” and “all”.", "تحقّق من قوة الادعاء، فـmay وoften وsome أضعف من will وalways وall."]] },

      { t: "passage", h: ["Practice passage", "نص للتدريب"], title: "Why memory still matters", pass: 8, paras: [
        "Every few years, someone announces that memorising facts is a waste of time. Why learn dates, formulas or vocabulary, the argument goes, when any fact can be found on a phone in seconds? It is an attractive idea, and it contains a grain of truth: nobody needs to memorise a bus timetable. But as a general principle for education, I believe it is mistaken, and the science of memory helps to explain why.",
        "The first problem is that thinking depends on knowledge already stored in the mind. Psychologists have long known that working memory, the part of the mind we use to solve problems, can hold only a handful of items at once. Experts do not have larger working memories than beginners. Instead, they have stored so much in long-term memory that they can see patterns a beginner would miss. A doctor who had to search online for the meaning of every symptom would be slow at best and dangerous at worst.",
        "The second problem is more surprising. Several studies suggest that when people expect to be able to look something up later, they make less effort to remember it. In one experiment, students who were told that the facts they typed would be saved on a computer recalled fewer of them than students who were told the facts would be deleted. Some commentators have described this as technology making us stupid. That seems to me an exaggeration. The students had not lost the ability to remember; they had simply decided, quite sensibly, that remembering was unnecessary. The danger is that this sensible decision becomes a habit.",
        "None of this means that schools should return to endless repetition. In fact, research on memory points to methods that are both more effective and less boring. The most powerful is retrieval practice: instead of rereading their notes, learners test themselves, forcing the brain to pull information out. A related finding, the spacing effect, shows that material reviewed several times over a few weeks is remembered far better than material crammed the night before an exam. Many students still prefer rereading and highlighting, probably because these methods feel easier. Unfortunately, a feeling of ease is a poor guide to how much is being learnt. In many experiments, students who tested themselves felt less sure of their progress than those who reread, yet they remembered considerably more a week later.",
        "Critics sometimes reply that memorisation produces students who can repeat facts without understanding them. This is a fair concern, but it confuses two different things. Learning a fact by heart does not prevent understanding; often it is the first step towards it. A student who knows the main events of a historical period in order is far better placed to ask why they happened than one who must keep checking. Understanding grows from knowledge; it cannot replace it.",
        "The real question, then, is not whether students should memorise, but what they should memorise and how. Information that is used constantly, such as the core vocabulary of a new language, deserves a permanent place in memory. Details that are rarely needed can safely be left to the phone. Teachers who help students to make this distinction, and who show them how to test and space their learning, will be giving them something no search engine can provide."],
        groups: [
          { instr: ["Questions 1–5: choose the correct answer, A, B, C or D.", "الأسئلة 1–5: اختر الإجابة الصحيحة: A أو B أو C أو D."], items: [
            { k: "mcq", s: "In the first paragraph, the writer says the idea that memorising is a waste of time is", o: ["wrong in every situation.", "partly true but wrong as a general rule.", "supported by the science of memory.", "popular mainly with teachers."], a: 1, x: ["“It contains a grain of truth” (partly true), “but as a general principle for education, I believe it is mistaken”. A ignores the grain of truth; C is the opposite.", "«فيها شيء من الصحة» (صحيحة جزئيًا)، «لكنها خاطئة بوصفها مبدأً عامًا في التعليم». الخيار A يتجاهل الجزء الصحيح، وC عكس النص."] },
            { k: "mcq", s: "According to the writer, experts differ from beginners because they", o: ["have larger working memories.", "think more slowly and carefully.", "search for information more quickly.", "have more knowledge stored in long-term memory."], a: 3, x: ["“Experts do not have larger working memories… they have stored so much in long-term memory.” A is the opposite trap: it uses the passage's words with “not” removed.", "«الخبراء لا يملكون ذاكرة عاملة أكبر… بل خزّنوا الكثير في الذاكرة طويلة المدى». الخيار A فخ العكس: يستخدم كلمات النص بعد حذف not."] },
            { k: "mcq", s: "In the experiment in paragraph 3, students recalled fewer facts when they", o: ["believed the facts would be saved.", "typed the facts too quickly.", "were told the facts would be deleted.", "were tested a week later."], a: 0, x: ["Students “told that the facts they typed would be saved on a computer recalled fewer of them”. C is the opposite group.", "الطلاب «الذين قيل لهم إن الحقائق التي كتبوها ستُحفظ على الحاسوب تذكّروا عددًا أقل منها». والخيار C هو المجموعة المقابلة."] },
            { k: "mcq", s: "What does the writer think of the claim that technology is making us stupid?", o: ["It is fully supported by the experiment.", "It applies mainly to young people.", "It is the main point of the article.", "It goes further than the evidence shows."], a: 3, x: ["“That seems to me an exaggeration. The students had not lost the ability to remember.”", "«يبدو لي ذلك مبالغة، فالطلاب لم يفقدوا القدرة على التذكر»."] },
            { k: "mcq", s: "Why, according to the writer, do many students prefer rereading and highlighting?", o: ["Teachers recommend these methods.", "Research shows they work well.", "They seem less difficult.", "They save time before exams."], a: 2, x: ["“Probably because these methods feel easier.” B is the opposite: the writer says ease is “a poor guide”.", "«على الأرجح لأن هذه الطرق تبدو أسهل». والخيار B عكس النص، فالكاتب يقول إن الشعور بالسهولة «دليل ضعيف»."] }
          ] },
          { instr: ["Questions 6–11: do the statements agree with the views of the writer? Choose YES, NO or NOT GIVEN.", "الأسئلة 6–11: هل تتفق العبارات مع آراء الكاتب؟ اختر YES أو NO أو NOT GIVEN."], items: [
            { k: "ynng", s: "Some kinds of information are not worth learning by heart.", a: "Y", x: ["“Nobody needs to memorise a bus timetable.” Later: “Details that are rarely needed can safely be left to the phone.”", "«لا أحد يحتاج إلى حفظ جدول مواعيد الحافلات». وبعدها: «التفاصيل التي نادرًا ما نحتاجها يمكن تركها للهاتف بأمان»."] },
            { k: "ynng", s: "The students in the experiment had partly lost their ability to remember.", a: "N", x: ["“The students had not lost the ability to remember; they had simply decided… that remembering was unnecessary.”", "«الطلاب لم يفقدوا القدرة على التذكر، بل قرروا ببساطة… أن التذكر غير ضروري»."] },
            { k: "ynng", s: "Retrieval practice works better for science subjects than for languages.", a: "NG", x: ["The writer calls retrieval practice “the most powerful” method but never compares subjects.", "يصف الكاتب التدريب على الاسترجاع بأنه «الأقوى» لكنه لا يقارن بين المواد الدراسية أبدًا."] },
            { k: "ynng", s: "The worry that memorisation can lead to repetition without understanding is reasonable.", a: "Y", x: ["“This is a fair concern.” “Reasonable” = “fair”. The writer accepts the concern even while disagreeing with the conclusion.", "«هذا قلق مشروع». reasonable تعني fair، فالكاتب يقبل القلق مع أنه يخالف النتيجة."] },
            { k: "ynng", s: "Learning facts by heart usually stops students from understanding them.", a: "N", x: ["“Learning a fact by heart does not prevent understanding; often it is the first step towards it.”", "«حفظ الحقيقة عن ظهر قلب لا يمنع الفهم، بل كثيرًا ما يكون الخطوة الأولى نحوه»."] },
            { k: "ynng", s: "Most teachers are already familiar with research on retrieval practice.", a: "NG", x: ["The last paragraph praises teachers who use these methods but never says how many teachers know the research.", "تثني الفقرة الأخيرة على المعلمين الذين يستخدمون هذه الطرق، لكنها لا تذكر عدد المعلمين الذين يعرفون هذه الأبحاث."] }
          ] }
        ] },

      { t: "quiz", h: ["Strategy check", "اختبر استراتيجيتك"], pass: 3, items: [
        { s: ["In YES / NO / NOT GIVEN questions, what are you checking?", "في أسئلة YES / NO / NOT GIVEN، ما الذي تتحقق منه؟"], o: [["Facts in the passage", "الحقائق في النص"], ["The writer's opinions and claims", "آراء الكاتب وادعاءاته"], ["Your own opinion", "رأيك الشخصي"]], a: 1, x: ["Yes/No/Not Given tests the writer's views. Your own opinion never counts.", "أسئلة Yes/No/Not Given تختبر آراء الكاتب، ورأيك الشخصي لا يُحتسب أبدًا."] },
        { s: ["The passage says: “Some parents claim that screens harm children's sleep.” Statement: “The writer believes screens harm children's sleep.”", "يقول النص: «يدّعي بعض الآباء أن الشاشات تضر بنوم الأطفال». العبارة: «يعتقد الكاتب أن الشاشات تضر بنوم الأطفال»."], o: ["YES", "NO", "NOT GIVEN"], a: 2, x: ["The writer only reports what some parents claim and gives no view of their own.", "الكاتب ينقل فقط ما يدّعيه بعض الآباء ولا يذكر رأيه."] },
        { s: ["An option uses exactly the same words as the passage. What should you do?", "خيار يستخدم كلمات النص نفسها حرفيًا. ماذا تفعل؟"], o: [["Choose it, because matching words prove it is right", "اختره، فتطابق الكلمات دليل على صحته"], ["Check that it answers the question and keeps the same meaning", "تحقق من أنه يجيب عن السؤال ويحافظ على المعنى نفسه"], ["Reject it, because matching words are always traps", "ارفضه، فالكلمات المتطابقة فخ دائمًا"]], a: 1, x: ["Matching words can be right or a trap. Meaning decides, not the words.", "الكلمات المتطابقة قد تكون صحيحة وقد تكون فخًا، والمعنى هو الحَكَم لا الألفاظ."] },
        { s: ["The passage says: “Online courses can be useful, but they rarely replace a good teacher.” Which matches the writer's view?", "يقول النص: «قد تكون الدورات الإلكترونية مفيدة، لكنها نادرًا ما تغني عن معلم جيد». أي عبارة تطابق رأي الكاتب؟"], o: ["Online courses are useless.", "Online courses are better than teachers.", "Online courses have value but are not usually a full substitute for a teacher."], a: 2, x: ["“Can be useful” rules out A, and “rarely replace a good teacher” rules out B, which is the opposite.", "عبارة «قد تكون مفيدة» تستبعد A، وعبارة «نادرًا ما تغني عن معلم جيد» تستبعد B لأنها عكسها."] }
      ] }
    ]
  };

  // ---------------- lesson: a full passage in 20 minutes ----------------
  var FULL = {
    id: "read-full", order: 45, icon: "📖", mins: 22, skill: "r",
    t: ["Reading practice: a full passage in 20 minutes", "تدريب القراءة: نص كامل في 20 دقيقة"],
    d: ["A real-length Passage 2 with 13 questions and a 20-minute timer.", "نص بطول النص الثاني الحقيقي، فيه 13 سؤالًا ومؤقت لمدة 20 دقيقة."],
    steps: [
      { t: "text", h: ["Twenty minutes, thirteen questions", "عشرون دقيقة، ثلاثة عشر سؤالًا"], p: [
        ["This passage is the length of a real Passage 2, with three question types. You have 20 minutes, which is about 90 seconds per question, including reading time.", "هذا النص بطول النص الثاني الحقيقي، وفيه ثلاثة أنواع من الأسئلة. لديك 20 دقيقة، أي نحو 90 ثانية لكل سؤال بما فيها وقت القراءة."],
        ["Don't read every word slowly before you start answering. Use what you practised: questions first, skim for the structure, scan for the details.", "لا تقرأ كل كلمة ببطء قبل أن تبدأ الإجابة، بل استخدم ما تدربت عليه: الأسئلة أولًا، ثم القراءة السريعة لفهم البنية، ثم المسح بحثًا عن التفاصيل."]] },

      { t: "table", h: ["A time plan", "خطة للوقت"], cols: [["Minutes", "الدقائق"], ["What to do", "ماذا تفعل"]], rows: [
        ["0–2", "Read all the questions and underline key words"],
        ["2–4", "Skim the passage: note the main idea of each paragraph"],
        ["4–10", "Matching headings (questions 1–5)"],
        ["10–17", "True / False / Not Given, then sentence completion, in passage order"],
        ["17–20", "Check spelling and word limits, and return to any answers you marked"]],
        p: [["Doing the headings first works well, because skimming for them gives you a map of the passage for the other questions.", "البدء بالعناوين مفيد، لأن القراءة السريعة لاختيارها تعطيك خريطة للنص تساعدك في بقية الأسئلة."]] },

      { t: "text", h: ["Test conditions", "ظروف الاختبار"], list: [
        ["No dictionary and no pausing the timer. Treat it like the real test.", "دون قاموس ودون إيقاف المؤقت، وتعامل معه كأنه الاختبار الحقيقي."],
        ["If you are stuck on one question for more than 2 minutes, guess and move on.", "إذا علقت في سؤال واحد أكثر من دقيقتين، فخمّن وانتقل."],
        ["Answer every question. A blank always scores zero; a guess might not.", "أجب عن كل الأسئلة، فالفراغ درجته صفر دائمًا، أما التخمين فقد يصيب."]] },

      { t: "passage", h: ["Passage 2 · 20 minutes", "النص الثاني · 20 دقيقة"], title: "Solar power and the desert dust problem", time: 20, pass: 9, labels: true,
        heads: [
          { k: "i", s: "Why desert dust is so hard to remove" },
          { k: "ii", s: "The rising cost of building solar farms" },
          { k: "iii", s: "New ways of cleaning without water" },
          { k: "iv", s: "The health risks of working in extreme heat" },
          { k: "v", s: "How dust reduces what a panel produces" },
          { k: "vi", s: "Reducing dust through planning and design" },
          { k: "vii", s: "Why sandstorms are becoming more common" },
          { k: "viii", s: "The drawbacks of cleaning with water" }],
        paras: [
          "Deserts seem to be the perfect place for solar power. They receive more sunshine than almost anywhere else on Earth, cloud cover is rare, and large areas of flat land are available at low cost. Over the past two decades, solar farms covering several square kilometres have been built in desert regions on every inhabited continent, and electricity from sunlight has become one of the cheapest forms of power ever produced. Several countries in the Middle East and North Africa now plan to generate a large share of their electricity in this way, and some hope to export clean energy to their neighbours. Yet engineers working in these environments face a problem that is easy to overlook from a distance: dust.",
          "Even a thin layer of dust can reduce the output of a solar panel significantly. Sunlight must pass through the glass surface of a panel to reach the cells beneath, and fine particles scatter and block part of that light. The effect is not always visible to the eye: a panel that looks only slightly dusty may already be losing a noticeable share of its power. In regions where the air carries a great deal of sand and dust, panels that are not cleaned for a month may produce a quarter less electricity than clean ones, and a single sandstorm can cut output by more than half in a few hours. Because large solar farms often operate on very narrow profit margins, losses on this scale can decide whether a project makes money or not.",
          "The nature of desert dust adds to the difficulty. The particles are often extremely small, some less than a hundredth of a millimetre across, and they do not simply sit on the glass. In the early morning, when temperatures fall and humidity rises, a thin film of dew forms on the panels. The moisture causes the dust to stick, and as the sun rises and the water evaporates, it leaves behind a hard crust that is far more difficult to remove than loose sand. One researcher has described the process as a kind of natural cement-making, repeated every night. The crust also tends to build up unevenly, so some cells in a panel receive less light than others, which can reduce the output of the whole panel.",
          "For many years, the standard solution was to wash panels by hand or with trucks carrying water. This works well, but it creates a new problem. A large solar farm may need millions of litres of water a year for cleaning, in places where fresh water is extremely scarce and often has to be produced by removing the salt from seawater, which itself uses a great deal of energy. Manual cleaning is also slow and requires large teams, who must work in some of the hottest conditions on the planet, often at night to avoid the midday heat. Frequent scrubbing can also scratch the glass over time, permanently reducing the amount of light that passes through it.",
          "Engineers have therefore turned to dry cleaning methods. The most widespread are robots that travel along each row of panels, usually once a night, sweeping the surface with soft rotating brushes or blowing it with air. Because they need no water and run on electricity from small panels of their own, they can operate without human help for months at a time, and their makers claim that a robot can pay for itself within a few years through higher output. Other researchers are developing coatings that make the glass so smooth that dust slides off, or that repel water so that the morning dew cannot form a film. A third approach sends a weak electric charge through transparent wires in the glass, pushing particles off the surface without any moving parts. These newer methods remain expensive, however, and none has yet been tested at full scale for more than a few years.",
          "Some scientists argue that the problem should be tackled earlier, at the design stage. Panels mounted at a steeper angle collect less dust, although they also capture slightly less sunlight in the middle of the day. Other designs allow the panels to turn face-down during sandstorms and at night, protecting the glass. Placing solar farms away from roads and building sites, where dust is constantly disturbed, can also reduce the amount that settles, and some projects are testing panels raised higher above the ground, where the air carries less dust. Each of these choices involves a trade-off between cost, energy output and maintenance, and the best balance differs from one site to another. What is clear is that in the world's sunniest places, keeping panels clean is no longer a minor technical detail but a central part of the economics of solar power."],
        groups: [
          { instr: ["Questions 1–5: the passage has six paragraphs, A–F. Choose the correct heading for paragraphs B–F from the list. Paragraph A is the introduction and is not tested. There are more headings than paragraphs.", "الأسئلة 1–5: في النص ست فقرات من A إلى F. اختر العنوان الصحيح للفقرات من B إلى F من القائمة. الفقرة A مقدمة وليست ضمن الأسئلة، وعدد العناوين أكبر من عدد الفقرات."], items: [
            { k: "head", p: "B", a: "v", x: ["The paragraph opens with “even a thin layer of dust can reduce the output of a solar panel significantly” and then gives the size of the losses. Heading vii is a trap: sandstorms are mentioned, but not that they are becoming more common.", "تبدأ الفقرة بعبارة «حتى طبقة رقيقة من الغبار قد تخفض إنتاج اللوح الشمسي بشكل كبير» ثم تذكر حجم الخسائر. والعنوان vii فخ: العواصف الرملية مذكورة، لكن لا يقال إنها تزداد."] },
            { k: "head", p: "C", a: "i", x: ["“The nature of desert dust adds to the difficulty”: dew makes the dust stick and leaves “a hard crust that is far more difficult to remove”.", "«طبيعة الغبار الصحراوي تزيد الصعوبة»: الندى يجعل الغبار يلتصق ويترك «قشرة صلبة أصعب بكثير في إزالتها»."] },
            { k: "head", p: "D", a: "viii", x: ["Washing “works well, but it creates a new problem”: huge amounts of scarce water, and slow work by large teams. Heading iv is a trap: the heat is one detail, not the main idea.", "الغسل «فعّال، لكنه يخلق مشكلة جديدة»: كميات هائلة من الماء النادر، وعمل بطيء يحتاج فرقًا كبيرة. والعنوان iv فخ، فالحرارة تفصيل واحد لا الفكرة الرئيسية."] },
            { k: "head", p: "E", a: "iii", x: ["“Engineers have therefore turned to dry cleaning methods”: robots, special coatings and an electric charge, none of which use water.", "«لذلك اتجه المهندسون إلى طرق التنظيف الجاف»: الروبوتات، والطلاءات الخاصة، والشحنة الكهربائية، ولا يستخدم أي منها الماء."] },
            { k: "head", p: "F", a: "vi", x: ["“The problem should be tackled earlier, at the design stage”: panel angle, panels that turn face-down and choosing where to build.", "«ينبغي معالجة المشكلة مبكرًا في مرحلة التصميم»: زاوية الألواح، والألواح التي تنقلب على وجهها، واختيار موقع البناء."] }
          ] },
          { instr: ["Questions 6–9: do the statements agree with the information in the passage? Choose TRUE, FALSE or NOT GIVEN.", "الأسئلة 6–9: هل تتفق العبارات مع المعلومات الواردة في النص؟ اختر TRUE أو FALSE أو NOT GIVEN."], items: [
            { k: "tfng", s: "Land in desert regions is generally expensive to buy.", a: "F", x: ["Paragraph A: “large areas of flat land are available at low cost”, the opposite.", "الفقرة A: «تتوفر مساحات واسعة من الأراضي المستوية بتكلفة منخفضة»، وهذا عكس العبارة."] },
            { k: "tfng", s: "In very dusty areas, a month without cleaning can lower a panel's output by around 25 per cent.", a: "T", x: ["Paragraph B: panels not cleaned for a month “may produce a quarter less electricity”. A quarter = 25 per cent.", "الفقرة B: الألواح التي لا تُنظَّف شهرًا «قد تنتج كهرباء أقل بمقدار الربع»، والربع يساوي 25 في المئة."] },
            { k: "tfng", s: "Dew forms on solar panels more often in winter than in summer.", a: "NG", x: ["Paragraph C says dew forms “in the early morning”, but it never mentions seasons.", "تقول الفقرة C إن الندى يتكوّن «في الصباح الباكر»، لكنها لا تذكر الفصول أبدًا."] },
            { k: "tfng", s: "Workers usually clean panels by hand in the middle of the day.", a: "F", x: ["Paragraph D: they work “often at night to avoid the midday heat”, so they avoid the middle of the day.", "الفقرة D: يعملون «غالبًا في الليل لتجنّب حرارة الظهيرة»، أي أنهم يتجنبون منتصف النهار."] }
          ] },
          { instr: ["Questions 10–13: complete the sentences. Choose NO MORE THAN TWO WORDS from the passage for each answer.", "الأسئلة 10–13: أكمل الجمل. اختر كلمتين على الأكثر من النص لكل إجابة."], items: [
            { k: "gap", s: "Most cleaning robots clean the panels with air or with soft ___.", a: ["rotating brushes"], x: ["Paragraph E: “sweeping the surface with soft rotating brushes or blowing it with air”.", "الفقرة E: «تكنس السطح بفُرش دوّارة ناعمة أو تنفخ عليه الهواء»."] },
            { k: "gap", s: "Some coatings repel water, which stops the morning ___ from forming a film on the glass.", a: ["dew"], x: ["Paragraph E: coatings “that repel water so that the morning dew cannot form a film”.", "الفقرة E: طلاءات «تطرد الماء فلا يستطيع ندى الصباح أن يكوّن طبقة رقيقة»."] },
            { k: "gap", s: "One method removes dust by passing a weak electric charge through ___ in the glass.", a: ["transparent wires"], x: ["Paragraph E: “sends a weak electric charge through transparent wires in the glass”.", "الفقرة E: «ترسل شحنة كهربائية ضعيفة عبر أسلاك شفافة في الزجاج»."] },
            { k: "gap", s: "Panels set at a ___ gather less dust but capture a little less sunlight at midday.", a: ["steeper angle"], x: ["Paragraph F: “Panels mounted at a steeper angle collect less dust, although they also capture slightly less sunlight in the middle of the day.”", "الفقرة F: «الألواح المثبتة بزاوية أكثر انحدارًا تجمع غبارًا أقل، مع أنها تلتقط ضوءًا أقل قليلًا في منتصف النهار»."] }
          ] }
        ] },

      { t: "text", h: ["After the timer", "بعد انتهاء الوقت"], list: [
        ["For every wrong answer, find the exact words in the passage that prove the right one. This is how you learn the test's logic.", "لكل إجابة خاطئة، ابحث في النص عن الكلمات الدقيقة التي تثبت الإجابة الصحيحة، فهكذا تتعلم منطق الاختبار."],
        ["Notice which question type cost you most marks, and go back to that lesson.", "لاحظ أي نوع من الأسئلة أفقدك أكثر الدرجات، وارجع إلى درسه."],
        ["If you ran out of time, practise skimming: one minute per passage, first sentences only, then say the main idea aloud.", "إن نفد وقتك، فتدرّب على القراءة السريعة: دقيقة واحدة لكل نص، والجمل الأولى فقط، ثم قل الفكرة الرئيسية بصوت مسموع."],
        ["Aim for 9 or more out of 13 before you try a full three-passage test.", "اجعل هدفك 9 من 13 أو أكثر قبل أن تجرّب اختبارًا كاملًا من ثلاثة نصوص."]] }
    ]
  };

  (window.MasarokParts = window.MasarokParts || []).push({ course: "ielts", lessons: [SKIM, COMPLETE, MCQ, FULL] });
})();

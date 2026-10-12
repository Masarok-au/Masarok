/* Masarok Academy · IELTS Academic · Listening skills. Original Masarok practice material in official formats.
   Teaching text is [English, Arabic]; scripts and questions are English, as in the real test. */
(function () {
  "use strict";

  // ---------------- lesson: forms, numbers and spelling ----------------
  var BASICS = {
    id: "listen-basics", order: 50, icon: "🎧", mins: 15, skill: "l",
    t: ["Listening: forms, numbers and spelling", "الاستماع: النماذج والأرقام والتهجئة"],
    d: ["How the test works, how to read ahead, and how to catch names, numbers and dates.", "كيف يسير الاختبار، وكيف تقرأ الأسئلة مسبقًا، وكيف تلتقط الأسماء والأرقام والتواريخ."],
    steps: [
      { t: "table", h: ["Four parts, 40 questions", "أربعة أجزاء و40 سؤالًا"], cols: [["Part", "الجزء"], ["What you hear", "ماذا تسمع"], ["Example", "مثال"]], rows: [
        ["Part 1", "A conversation between two people in an everyday situation", "Booking a trip, renting a room, joining a gym"],
        ["Part 2", "One speaker on an everyday topic", "A guide on a tour, a welcome talk, a radio report"],
        ["Part 3", "Two to four people in an academic situation", "Two students and a tutor discussing a project"],
        ["Part 4", "One speaker on an academic topic", "A university lecture"]],
        p: [["Each part has 10 questions, and the parts get harder as you go. In the real test you hear each recording only once, so the skills in this lesson matter from the first question.", "في كل جزء 10 أسئلة، وتزداد الأجزاء صعوبة تدريجيًا. وفي الاختبار الحقيقي تسمع كل تسجيل مرة واحدة فقط، لذلك تهمّك مهارات هذا الدرس من السؤال الأول."],
          ["In this course you can play most recordings twice while you learn.", "في هذه الدورة يمكنك تشغيل معظم التسجيلات مرتين أثناء التعلّم."]] },

      { t: "text", h: ["Read ahead and predict", "اقرأ مسبقًا وتوقّع"], p: [
        ["Before each part you get a short time to read the questions. Don't waste it. Use it to guess what kind of answer each gap needs.", "قبل كل جزء تحصل على وقت قصير لقراءة الأسئلة، فلا تضيّعه. استخدمه لتتوقع نوع الإجابة التي تحتاجها كل فراغ."]],
        list: [
          ["Underline the words around each gap, such as “Date of arrival” or “Cost per night”.", "ضع خطًا تحت الكلمات المحيطة بكل فراغ، مثل «تاريخ الوصول» أو «التكلفة لكل ليلة»."],
          ["Predict the type: a number, a name, a date, a place, a time or a thing.", "توقّع النوع: رقم، أو اسم، أو تاريخ، أو مكان، أو وقت، أو شيء."],
          ["Use the grammar: “a ___” needs a singular noun; “two ___” needs a plural.", "استعن بالقواعد: «a ___» تحتاج اسمًا مفردًا، و«two ___» تحتاج اسمًا بصيغة الجمع."],
          ["The questions follow the order of the recording. If you miss one, move on to the next.", "الأسئلة تسير بترتيب التسجيل، فإن فاتك سؤال فانتقل إلى التالي."]] },

      { t: "table", h: ["What goes in the gap?", "ماذا يوضع في الفراغ؟"], cols: [["On the form", "في النموذج"], ["Expect", "توقّع"]], rows: [
        ["Family name: ___", "A name, probably spelled letter by letter"],
        ["Postcode: ___", "Letters and numbers, e.g. LS6 2QT"],
        ["Price: £ ___", "A number. The £ sign is already there"],
        ["Date: ___ March", "A day, e.g. 14 or 14th"],
        ["Please bring a ___", "A singular noun, e.g. towel"],
        ["Number of guests: ___", "A number, e.g. 3"]],
        p: [["Predicting doesn't mean guessing the exact word. It means knowing what to listen for.", "التوقّع لا يعني تخمين الكلمة بعينها، بل يعني أن تعرف ما الذي تنصت إليه."]] },

      { t: "text", h: ["Spelling, numbers and word limits", "التهجئة والأرقام وحدود الكلمات"], list: [
        ["Letters: practise the English alphabet aloud. Pairs like A/E/I, G/J and B/V/P are easy to confuse. “Double L” means LL.", "الحروف: تدرّب على نطق الأبجدية الإنجليزية بصوت عالٍ، فمن السهل الخلط بين A/E/I وG/J وB/V/P. وعبارة «double L» تعني LL."],
        ["Numbers: in phone numbers, “oh” means zero and “double five” means 55. Listen to the stress in thirteen and thirty.", "الأرقام: في أرقام الهاتف تعني «oh» صفرًا، و«double five» تعني 55. وانتبه للنبر في thirteen وthirty."],
        ["Dates: “the third of May” can be written 3 May, 3rd May or May 3. All are accepted.", "التواريخ: «the third of May» تُكتب 3 May أو 3rd May أو May 3، وكلها مقبولة."],
        ["Plurals: if the speaker says “tickets”, write “tickets”. A missing -s makes the answer wrong.", "الجمع: إذا قال المتحدث «tickets» فاكتب «tickets»، فنسيان حرف s يجعل الإجابة خاطئة."],
        ["Word limits: “ONE WORD AND/OR A NUMBER” means exactly that. Extra words make the answer wrong, even if the meaning is right. A hyphenated word counts as one word.", "حدود الكلمات: «ONE WORD AND/OR A NUMBER» تعني ذلك بالضبط، والكلمات الزائدة تجعل الإجابة خاطئة حتى لو كان المعنى صحيحًا. والكلمة الموصولة بشرطة تُعدّ كلمة واحدة."],
        ["Spelling counts. British and American spellings are both accepted.", "التهجئة تُحتسب، وتُقبل التهجئة البريطانية والأمريكية كلتاهما."],
        ["Transferring: on paper you get 10 minutes at the end to copy answers to the answer sheet. On computer you type as you listen and get 2 minutes at the end to check.", "نقل الإجابات: في الاختبار الورقي تحصل على 10 دقائق في النهاية لنقل إجاباتك إلى ورقة الإجابة، وفي الاختبار المحوسب تكتب أثناء الاستماع وتحصل على دقيقتين في النهاية للمراجعة."]] },

      { t: "listen", h: ["A worked example", "مثال محلول"], plays: 2,
        intro: ["A parent calls a leisure centre. Read the form first and predict each answer. Write ONE WORD AND/OR A NUMBER for each answer. Then read the explanations.", "أحد الوالدين يتصل بمركز ترفيهي. اقرأ النموذج أولًا وتوقّع كل إجابة، واكتب كلمة واحدة و/أو رقمًا لكل إجابة، ثم اقرأ الشروح."],
        names: { a: "Receptionist", b: "Caller" },
        lines: [
          ["a", "Riverside Leisure Centre, good afternoon. How can I help?"],
          ["b", "Hi. I'd like to book my son onto the beginners' swimming class, please."],
          ["a", "Of course. What's his first name?"],
          ["b", "Faisal. That's F, A, I, S, A, L."],
          ["a", "Thanks. And how old is he?"],
          ["b", "He's nine. Well, he'll be ten next month, actually, but he's nine now."],
          ["a", "OK, nine. The beginners' class is on Saturday mornings, and it costs forty-two pounds for the term."],
          ["b", "Forty-two, fine. Does he need to bring anything?"],
          ["a", "Just a towel and some goggles. Oh, and a padlock for the locker."]
        ],
        form: "Swimming class booking",
        items: [
          { k: "form", l: "Child's first name", a: ["faisal"], x: ["You predicted a name, and it was spelled: F-A-I-S-A-L.", "توقعت اسمًا، وقد جاء مُتهجّى: F-A-I-S-A-L."] },
          { k: "form", l: "Age", a: ["9", "nine"], x: ["“He'll be ten next month” is a distractor. Right now he is nine.", "عبارة «سيبلغ العاشرة الشهر القادم» مشتّت، فعمره الآن تسع سنوات."] },
          { k: "form", l: "Cost per term: £ …", a: ["42", "forty-two"], x: ["“Forty-two pounds for the term.” Write the digits; the £ sign is already there.", "«اثنان وأربعون جنيهًا للفصل». اكتب الأرقام فقط، فرمز الجنيه موجود مسبقًا."] },
          { k: "form", l: "Bring: towel, goggles and a …", a: ["padlock"], x: ["“A padlock for the locker.” The “a” on the form told you to expect one singular noun.", "«قفل للخزانة». كلمة «a» في النموذج دلّتك على اسم مفرد واحد."] }
        ] },

      { t: "listen", h: ["Practice: Part 1", "تدريب: الجزء الأول"], plays: 2, pass: 7,
        intro: ["A man is calling a coach company to book a day trip. Complete the form. Write ONE WORD AND/OR A NUMBER for each answer.", "رجل يتصل بشركة حافلات سياحية ليحجز رحلة يوم واحد. أكمل النموذج، واكتب كلمة واحدة و/أو رقمًا لكل إجابة."],
        names: { a: "Agent", b: "Customer" },
        lines: [
          ["a", "Good morning, Lakeside Coach Tours, Emma speaking. How can I help?"],
          ["b", "Oh, hello. I'm calling about the day trip to the lakes. I saw it advertised, and I'd like to book some places, if there are any left."],
          ["a", "Let me just check… yes, we've got space on most dates. Can I start with your name, please?"],
          ["b", "Sure. It's Omar Mansour."],
          ["a", "Could you spell the family name for me?"],
          ["b", "Of course. M, A, N, S, O, U, R. Mansour."],
          ["a", "Thank you. And your address?"],
          ["b", "It's twenty-four Hollins Road, in Leeds."],
          ["a", "Is that H, O, L, I, N, S?"],
          ["b", "Not quite. It's double L. So, H, O, double L, I, N, S."],
          ["a", "Got it, Hollins. And a contact number, in case the coach is delayed?"],
          ["b", "Yes, my mobile is oh seven nine four six, three one eight, two oh five."],
          ["a", "Let me read that back. Oh seven nine four six, three one eight, two oh five."],
          ["b", "That's right."],
          ["a", "Lovely. And how many people will be travelling?"],
          ["b", "Erm, there were going to be four of us, but my cousin has to work that weekend. So, three. Three adults."],
          ["a", "Three adults. And which date were you thinking of?"],
          ["b", "Saturday the twelfth of July, if possible."],
          ["a", "Ah, I'm sorry, the twelfth is fully booked. The next Saturday with space is the nineteenth."],
          ["b", "The nineteenth is fine. Let's do that."],
          ["a", "Great. Now, we have two pick-up points. One is at the bus station, and the other is outside the museum on Park Lane."],
          ["b", "Which one would you recommend?"],
          ["a", "Well, the bus station gets very busy on Saturday mornings, so most people find the museum easier."],
          ["b", "Then the museum, please. What time does the coach leave?"],
          ["a", "From the museum, it's seven forty-five. So please be there ten minutes early."],
          ["b", "Quite early, but fine. And how much is it?"],
          ["a", "The normal price is forty-five pounds, but we've got a summer offer at the moment, so it's thirty-eight pounds per person."],
          ["b", "Thirty-eight. That's good. Does that include lunch?"],
          ["a", "It does. There's a choice of a chicken meal or a vegetarian one."],
          ["b", "Two chicken, please, and one vegetarian for my sister."],
          ["a", "No problem. Last question: how did you hear about us? Was it online?"],
          ["b", "No, actually. I picked up a leaflet at the library."],
          ["a", "A leaflet, thanks. I'll send you a confirmation by text this afternoon."]
        ],
        form: "Day trip booking form",
        items: [
          { k: "form", l: "Name: Omar …", a: ["mansour"], x: ["He spells it: M-A-N-S-O-U-R.", "يتهجّاه هكذا: M-A-N-S-O-U-R."] },
          { k: "form", l: "Address: 24 … Road, Leeds", a: ["hollins"], x: ["The agent spells it wrongly first. The correction is “double L”: H-O-L-L-I-N-S.", "تتهجاه الموظفة خطأً أولًا، والتصحيح هو «double L»، أي H-O-L-L-I-N-S."] },
          { k: "form", l: "Mobile number", a: ["07946318205", "07946 318 205"], x: ["“Oh seven nine four six, three one eight, two oh five.” Each “oh” is a zero.", "«oh seven nine four six, three one eight, two oh five». كل «oh» تعني صفرًا."] },
          { k: "form", l: "Number of adults", a: ["3", "three"], x: ["“There were going to be four of us… So, three.” Four is the distractor.", "«كنا سنكون أربعة… إذن ثلاثة». الرقم أربعة هو المشتّت."] },
          { k: "form", l: "Date of trip: Saturday … July", a: ["19", "19th", "nineteenth"], x: ["The twelfth is fully booked, so they choose “the nineteenth”.", "الثاني عشر محجوز بالكامل، فاختارا «التاسع عشر»."] },
          { k: "form", l: "Pick-up point: outside the …", a: ["museum"], x: ["The bus station is mentioned first, but he chooses “the museum”.", "ذُكرت محطة الحافلات أولًا، لكنه اختار «المتحف»."] },
          { k: "form", l: "Pick-up time: … am", a: ["7.45", "7:45"], x: ["“From the museum, it's seven forty-five.” Write it as 7.45.", "«من المتحف عند السابعة وخمس وأربعين دقيقة». اكتبها 7.45."] },
          { k: "form", l: "Price per person: £ …", a: ["38", "thirty-eight"], x: ["£45 is the normal price. With the summer offer it is “thirty-eight pounds per person”.", "45 جنيهًا هو السعر العادي، ومع عرض الصيف يصبح «ثمانية وثلاثين جنيهًا للشخص»."] },
          { k: "form", l: "Lunch: two chicken, one …", a: ["vegetarian"], x: ["“One vegetarian for my sister.” Check the spelling: v-e-g-e-t-a-r-i-a-n.", "«وجبة نباتية واحدة لأختي». انتبه للتهجئة: v-e-g-e-t-a-r-i-a-n."] },
          { k: "form", l: "Heard about the tour from: a …", a: ["leaflet"], x: ["The agent suggests “online”, but he says “I picked up a leaflet at the library”.", "اقترحت الموظفة «الإنترنت»، لكنه قال «أخذت نشرة من المكتبة»."] }
        ] },

      { t: "quiz", h: ["Check your strategy", "اختبر طريقتك"], pass: 3, items: [
        { s: ["The form says “Please bring two ___”. What kind of answer do you expect?", "في النموذج: «Please bring two ___». ما نوع الإجابة المتوقعة؟"], o: [["A singular noun", "اسم مفرد"], ["A plural noun", "اسم بصيغة الجمع"], ["A date", "تاريخ"]], a: 1, x: ["“Two” is followed by a plural noun, such as “photos”.", "يأتي بعد «two» اسم بصيغة الجمع، مثل «photos»."] },
        { s: ["The instructions say NO MORE THAN TWO WORDS. Which answer breaks the rule?", "التعليمات تقول: لا تزد على كلمتين. أي إجابة تخالف القاعدة؟"], o: ["city centre", "the city centre", "centre"], a: 1, x: ["“The city centre” is three words, so it would be marked wrong.", "«the city centre» ثلاث كلمات، فتُحتسب خاطئة."] },
        { s: ["The speaker says: “Five o'clock. No, sorry, half past five.” What do you write?", "يقول المتحدث: «الساعة الخامسة. لا، آسف، الخامسة والنصف». ماذا تكتب؟"], o: ["5.00", "5.30", "5.00 or 5.30"], a: 1, x: ["The speaker corrects himself. The second answer is the one that counts.", "صحّح المتحدث نفسه، والإجابة الثانية هي المعتمدة."] },
        { s: ["In a phone number, what does “double four” mean?", "في رقم الهاتف، ماذا تعني «double four»؟"], o: ["4", "44", "8"], a: 1, x: ["“Double” means the number is said twice: 44.", "«double» تعني أن الرقم يتكرر مرتين: 44."] }
      ] }
    ]
  };

  // ---------------- lesson: multiple choice ----------------
  var MCQ = {
    id: "listen-mcq", order: 51, icon: "🗳️", mins: 15, skill: "l",
    t: ["Listening: multiple choice", "الاستماع: الاختيار من متعدد"],
    d: ["Why all three options sound right, and how to find the one that is.", "لماذا تبدو الخيارات الثلاثة صحيحة، وكيف تجد الصحيح منها فعلًا."],
    steps: [
      { t: "text", h: ["How the distractors work", "كيف تعمل المشتّتات"], p: [
        ["In multiple choice you usually hear something about every option. Only one option answers the question exactly. The others are distractors.", "في أسئلة الاختيار من متعدد تسمع عادةً شيئًا عن كل خيار، لكن خيارًا واحدًا فقط يجيب عن السؤال بدقة، والبقية مشتّتات."]],
        list: [
          ["Mentioned, then rejected: “We thought about a boat trip, but it was too expensive.”", "يُذكر ثم يُرفض: «فكرنا في رحلة بالقارب، لكنها كانت مكلفة جدًا»."],
          ["Changed or corrected: “It used to be on Mondays. Now it's on Thursdays.”", "يتغير أو يُصحَّح: «كان يوم الاثنين، والآن صار يوم الخميس»."],
          ["True, but not the answer to this question: the question asks what is unique, and the speaker also says what is popular.", "صحيح، لكنه ليس جواب هذا السؤال: السؤال عن الشيء الفريد، والمتحدث يذكر أيضًا الشيء الأكثر شعبية."],
          ["Same words, different meaning: the option that repeats the speaker's exact words is often a trap. The right answer is usually a paraphrase.", "الكلمات نفسها بمعنى مختلف: الخيار الذي يكرر كلمات المتحدث حرفيًا كثيرًا ما يكون فخًا، والإجابة الصحيحة غالبًا إعادة صياغة."]] },

      { t: "text", h: ["Before you listen", "قبل أن تستمع"], list: [
        ["Underline the key words in the question, especially small ones like main, first, not, most and now.", "ضع خطًا تحت الكلمات المهمة في السؤال، خاصة الصغيرة مثل main وfirst وnot وmost وnow."],
        ["Read the three options and notice how they differ. That difference is what you listen for.", "اقرأ الخيارات الثلاثة ولاحظ الفرق بينها، فهذا الفرق هو ما تنصت إليه."],
        ["Think of other ways to say each option. “Free” might be “you won't have to pay”.", "فكّر في طرق أخرى للتعبير عن كل خيار، فكلمة «free» قد تأتي بصيغة «لن تضطر إلى الدفع»."],
        ["Don't choose the moment you hear a word from an option. Wait until the speaker finishes the point.", "لا تختر فور سماعك كلمة من أحد الخيارات، بل انتظر حتى ينهي المتحدث فكرته."]] },

      { t: "table", h: ["Spot the paraphrase", "اكتشف إعادة الصياغة"], cols: [["The option says", "الخيار يقول"], ["The speaker might say", "قد يقول المتحدث"]], rows: [
        ["It is free", "You won't have to pay anything"],
        ["It is not suitable for young children", "I wouldn't bring anyone under eight"],
        ["Book in advance", "Make sure you reserve a place before you come"],
        ["The most popular", "The one visitors ask for most often"],
        ["It has been renovated", "It's just had a complete makeover"],
        ["Cheaper imports", "Goods from abroad at half the price"]] },

      { t: "quiz", h: ["Two quick examples", "مثالان سريعان"], items: [
        { s: "You hear: “We were going to meet in the library, but it's closed on Sundays. The park's too cold, so let's use the café instead.” Where will they meet?", o: ["In the library", "In the café", "In the park"], a: 1, x: ["All three places are mentioned. The library is closed and the park is too cold, so they choose the café.", "ذُكرت الأماكن الثلاثة، لكن المكتبة مغلقة والحديقة باردة، فاختاروا المقهى."] },
        { s: "You hear: “Most people come for the gardens, but what makes this house unique is its clock collection.” What is unique about the house?", o: ["Its gardens", "Its clock collection", "Its popularity"], a: 1, x: ["The gardens are popular, but the question asks what is unique: “its clock collection”.", "الحدائق تجذب الناس، لكن السؤال عن الشيء الفريد: «مجموعة الساعات»."] }
      ] },

      { t: "listen", h: ["Practice: Part 2", "تدريب: الجزء الثاني"], plays: 2, pass: 6,
        intro: ["A guide is talking to visitors at an old mill that is now a museum. Choose the correct letter, A, B or C.", "مرشد يتحدث إلى زوار مصنع قديم أصبح متحفًا. اختر الحرف الصحيح: A أو B أو C."],
        names: { a: "Guide" },
        lines: [
          ["a", "Good morning, everyone, and welcome to Harlow Mill. My name's Sami, and I'll be your guide for the next hour or so. Before we go inside, let me tell you a little about the building."],
          ["a", "A lot of visitors assume this was a paper mill, because it's right next to the river. And for a few years during the war, it was used to store grain."],
          ["a", "But it was actually built to make woollen cloth, and that's what it did for well over a century."],
          ["a", "So why did it close? Well, there was a serious fire in nineteen oh two, but the owners repaired the damage within a year."],
          ["a", "What really ended things, in nineteen sixty-four, was cloth arriving from abroad at half the price. And no, the river never flooded it. People often ask me that."],
          ["a", "When you go inside, you'll see the machines on the ground floor. They aren't the mill's own. The originals were sold when it closed, and these were brought here from a factory in the north in the nineteen nineties."],
          ["a", "People often ask whether they still work. I'm afraid they don't. The motors are too old to run safely, so they're switched off permanently."],
          ["a", "You're welcome to take photos anywhere in the building, and you can keep your bags with you. The one thing I do ask is that you keep your hands off the machines. Some of the parts are very fragile."],
          ["a", "Up on the top floor, you'll find the café. Oh, sorry, I always say that! The café moved last spring to the old office building by the gate."],
          ["a", "The top floor is now our learning room, where school groups come for weaving workshops. Our temporary exhibitions, if you're interested, are down in the basement."],
          ["a", "Speaking of the café, it gets very busy from about half past twelve, so if you want a table, I'd go before twelve. You can't book, I'm afraid, and the terrace is closed until the summer."],
          ["a", "Next to the café is the shop. It sells scarves and blankets, but not everything there is wool. There's cotton and linen as well. You can also order online, though the prices are just the same."],
          ["a", "What makes the shop special is that everything in it is made by craftspeople who live within twenty miles of the mill."],
          ["a", "Right. Normally the tour ends on the river path, but that's closed this week while it's being resurfaced. So today we'll walk back through the yard and finish at the main gate."],
          ["a", "You'll pass the engine house on the way, but it's closed for repairs, so we won't be stopping there. OK, let's go in. Mind the step."]
        ],
        form: "Harlow Mill",
        items: [
          { k: "mcq", s: "What was the mill originally built for?", o: ["Making paper", "Producing woollen fabric", "Storing grain"], a: 1, x: ["Paper is only what visitors “assume”, and grain was stored there “for a few years”. It was “built to make woollen cloth”.", "الورق مجرد «افتراض» من الزوار، والحبوب خُزّنت فيه «لبضع سنوات» فقط، أما سبب بنائه فهو «صنع القماش الصوفي»."] },
          { k: "mcq", s: "Why did the mill close?", o: ["Competition from cheaper imports", "A serious fire", "Flooding from the river"], a: 0, x: ["The fire was repaired and the river “never flooded it”. It closed because of “cloth arriving from abroad at half the price”.", "أُصلحت أضرار الحريق، والنهر «لم يُغرقه قط». أُغلق بسبب «القماش القادم من الخارج بنصف السعر»."] },
          { k: "mcq", s: "What does the guide say about the machines on the ground floor?", o: ["They are the mill's original machines", "They are switched on every day", "They came from another factory"], a: 2, x: ["“They aren't the mill's own… these were brought here from a factory in the north.” They are also “switched off permanently”.", "«ليست آلات المصنع نفسه… جُلبت من مصنع في الشمال»، وهي أيضًا «متوقفة نهائيًا»."] },
          { k: "mcq", s: "Visitors are asked not to", o: ["take photographs", "touch the machines", "carry bags around the building"], a: 1, x: ["Photos and bags are allowed. “Keep your hands off the machines” means don't touch them.", "التصوير والحقائب مسموح بهما، و«أبعدوا أيديكم عن الآلات» تعني لا تلمسوها."] },
          { k: "mcq", s: "What is the top floor used for now?", o: ["A café", "Temporary exhibitions", "Workshops for school groups"], a: 2, x: ["The guide corrects himself: the café has moved. The top floor is “our learning room, where school groups come for weaving workshops”. Exhibitions are in the basement.", "صحّح المرشد نفسه، فالمقهى انتقل. والطابق العلوي هو «غرفة التعلّم التي تأتيها مجموعات المدارس لورش النسيج»، أما المعارض ففي القبو."] },
          { k: "mcq", s: "What does the guide advise about the café?", o: ["Arrive before midday", "Book a table in advance", "Sit outside on the terrace"], a: 0, x: ["“I'd go before twelve.” You “can't book”, and the terrace “is closed”.", "«أنصح بالذهاب قبل الثانية عشرة». ولا يمكن الحجز، والشرفة «مغلقة»."] },
          { k: "mcq", s: "What is special about the items in the shop?", o: ["They are all made of wool", "They are cheaper online", "They are made by people from the local area"], a: 2, x: ["“Not everything there is wool” and online prices are “the same”. They are made by craftspeople “within twenty miles of the mill”.", "«ليس كل ما فيه من الصوف»، والأسعار على الإنترنت «نفسها». أما المنتجات فيصنعها حرفيون «على بُعد عشرين ميلًا من المصنع»."] },
          { k: "mcq", s: "Where will today's tour finish?", o: ["On the river path", "At the main gate", "At the engine house"], a: 1, x: ["The river path is closed and they only “pass” the engine house. “Today we'll… finish at the main gate.”", "مسار النهر مغلق، وسيمرّون فقط بغرفة المحرك. «سننهي جولتنا اليوم عند البوابة الرئيسية»."] }
        ] },

      { t: "quiz", h: ["Check yourself", "اختبر نفسك"], pass: 3, items: [
        { s: ["In multiple choice, the option that uses the speaker's exact words is…", "في الاختيار من متعدد، الخيار الذي يستخدم كلمات المتحدث حرفيًا…"], o: [["always right", "صحيح دائمًا"], ["often a trap, so check the meaning", "كثيرًا ما يكون فخًا، فتحقق من المعنى"], ["always wrong", "خاطئ دائمًا"]], a: 1, x: ["Matching words is not enough. Check that the meaning answers the question.", "تطابق الكلمات لا يكفي، فتحقق من أن المعنى يجيب عن السؤال."] },
        { s: "You hear: “We used to meet on Tuesdays, but from next month it'll be Wednesdays.” When will they meet next month?", o: ["On Tuesdays", "On Wednesdays", "On both days"], a: 1, x: ["“Used to” is the past. “From next month” gives the new day: Wednesdays.", "«used to» للماضي، و«from next month» تعطي اليوم الجديد: الأربعاء."] },
        { s: "Which phrase means the same as “free of charge”?", o: ["at no cost", "freely available", "charged at the door"], a: 0, x: ["“At no cost” means you don't pay. “Freely available” means easy to get, not free.", "«at no cost» تعني أنك لا تدفع، أما «freely available» فتعني سهل الحصول عليه، لا مجانيًا."] },
        { s: ["What should you do with the options before the recording starts?", "ماذا تفعل بالخيارات قبل بدء التسجيل؟"], o: [["Read only the first one", "اقرأ الأول فقط"], ["Notice how they differ", "لاحظ الفرق بينها"], ["Translate them all into Arabic", "ترجمها كلها إلى العربية"]], a: 1, x: ["The difference between the options tells you exactly what to listen for.", "الفرق بين الخيارات يخبرك بالضبط بما يجب أن تنصت إليه."] }
      ] }
    ]
  };

  // ---------------- lesson: maps and plans ----------------
  var MAPS = {
    id: "listen-maps", order: 52, icon: "🗺️", mins: 15, skill: "l",
    t: ["Listening: maps and plans", "الاستماع: الخرائط والمخططات"],
    d: ["Follow a speaker around a map and put each place in the right spot.", "تابع المتحدث على الخريطة وضع كل مكان في موضعه الصحيح."],
    steps: [
      { t: "text", h: ["What you do", "ماذا تفعل"], p: [
        ["Map and plan questions usually come in Part 2. You see a map with some places labelled and others marked with letters. You hear a speaker describe where things are, and you choose the letter for each place.", "تأتي أسئلة الخرائط والمخططات عادةً في الجزء الثاني. ترى خريطة عليها بعض الأماكن مسمّاة وأخرى مُعلَّمة بحروف، وتسمع متحدثًا يصف مواقع الأشياء، فتختار الحرف المناسب لكل مكان."],
        ["The labelled places, such as the entrance or a lake, are your anchors. Almost every direction is given in relation to them.", "الأماكن المسمّاة، كالمدخل أو البحيرة، هي نقاط ارتكازك، فكل الاتجاهات تقريبًا تُعطى بالنسبة إليها."]] },

      { t: "table", h: ["Direction language", "عبارات الاتجاهات"], cols: [["Phrase", "العبارة"], ["What it means", "معناها"]], rows: [
        ["opposite", "facing it, on the other side of a path, road or room"],
        ["next to / beside", "directly at the side of it"],
        ["between A and B", "with A on one side and B on the other"],
        ["to the left of / to the right of", "at that side of it, as you face the way the speaker is looking"],
        ["at the far end", "at the end furthest from where you are"],
        ["behind", "at the back of it, further away from you"],
        ["in the corner", "where two sides of the map or room meet"],
        ["just past / beyond", "a little further on after it"],
        ["clockwise / anticlockwise", "the way a clock's hands move / the opposite way"]],
        p: [["Learn these as pairs: next to and opposite, in front of and behind, clockwise and anticlockwise. The test often uses the one you don't expect.", "احفظ هذه العبارات أزواجًا: next to وopposite، وin front of وbehind، وclockwise وanticlockwise، فالاختبار كثيرًا ما يستخدم العبارة التي لا تتوقعها."]] },

      { t: "text", h: ["A method that works", "طريقة مجرّبة"], list: [
        ["Before you listen, find the starting point, usually the entrance or “You are here”.", "قبل الاستماع، حدد نقطة البداية، وهي عادةً المدخل أو «أنت هنا»."],
        ["Name the landmarks to yourself, and notice which letters are near each one.", "سمِّ المعالم لنفسك، ولاحظ أي الحروف قريبة من كل معلم."],
        ["Imagine you are standing where the speaker is, facing the same way. That decides what left and right mean.", "تخيّل أنك تقف حيث يقف المتحدث وتنظر في الاتجاه نفسه، فهذا ما يحدد معنى اليمين واليسار."],
        ["Follow with your finger as the speaker moves. The questions are in the order of the talk.", "تابع بإصبعك كلما تحرك المتحدث، فالأسئلة تسير بترتيب الحديث."],
        ["Watch for corrections and changes: “It used to be by the gate, but it's moved.”", "انتبه للتصحيحات والتغييرات: «كان قرب البوابة، لكنه انتقل»."]] },

      { t: "listen", h: ["Practice: a park map", "تدريب: خريطة حديقة"], plays: 2, pass: 5,
        intro: ["A park ranger is talking to new volunteers at the main gate. Label the map. Choose the correct letter, A–H, for each place. Two letters are not used.", "حارس حديقة يتحدث إلى متطوعين جدد عند البوابة الرئيسية. ضع الأسماء على الخريطة باختيار الحرف الصحيح من A إلى H لكل مكان، علمًا بأن حرفين لن يُستخدما."],
        names: { a: "Ranger" },
        lines: [
          ["a", "Good morning, everyone, and welcome to Greenfield Park. Thanks for volunteering with us this summer. Before we start, I'll explain where everything is, so please look at the map in your pack."],
          ["a", "Right now, we're standing at the main gate, at the bottom of the map, looking towards the lake. When I say left or right, I mean as you face the lake from here."],
          ["a", "So, the first thing you'll see, just inside the gate on your left, is the bike hire. Visitors ask about it all the time, so do remember where it is."],
          ["a", "The small building on your right, by the way, isn't open to the public. That's just where we keep the gardening tools."],
          ["a", "Now, if you walk up towards the lake and turn left, you'll come to the picnic area. It's between the visitor centre and the lake, so it's easy to find."],
          ["a", "Some visitors look for the rose garden near the gate, but it's actually behind the visitor centre, right up in the top left-hand corner of the park. It's lovely in June."],
          ["a", "Then there's the boat hire. That's at the far end of the lake, directly opposite the main gate. On a clear day you can see it from here."],
          ["a", "Erm, what else? Oh yes, the café. It used to be inside the visitor centre, but it moved last year. It's now at the top of the park, immediately to the left of the car park."],
          ["a", "And finally, the toilets. They're on the right-hand side of the lake, directly opposite the picnic area. Another block is planned on the far right of the park, but that won't open until next year."],
          ["a", "OK, any questions before we get started?"]
        ],
        form: "Greenfield Park",
        map: { w: 320, h: 220,
          fixed: [ { t: "Main gate", x: 160, y: 208 }, { t: "Lake", x: 160, y: 105 }, { t: "Visitor centre", x: 40, y: 105 }, { t: "Car park", x: 280, y: 25 } ],
          spots: [ { k: "A", x: 105, y: 180 }, { k: "B", x: 215, y: 180 }, { k: "C", x: 112, y: 105 }, { k: "D", x: 220, y: 105 },
                   { k: "E", x: 160, y: 45 }, { k: "F", x: 40, y: 30 }, { k: "G", x: 285, y: 150 }, { k: "H", x: 215, y: 30 } ] },
        items: [
          { k: "map", s: "Bike hire", a: "A", x: ["“Just inside the gate on your left.” Facing the lake, left is A. B is the tool store.", "«داخل البوابة مباشرة على يسارك». وأنت تنظر إلى البحيرة يكون اليسار عند A، أما B فهو مخزن الأدوات."] },
          { k: "map", s: "Picnic area", a: "C", x: ["“Between the visitor centre and the lake.” Only C sits between them.", "«بين مركز الزوار والبحيرة»، وC وحده يقع بينهما."] },
          { k: "map", s: "Rose garden", a: "F", x: ["Not near the gate: “behind the visitor centre… in the top left-hand corner”.", "ليست قرب البوابة، بل «خلف مركز الزوار… في الزاوية العلوية اليسرى»."] },
          { k: "map", s: "Boat hire", a: "E", x: ["“At the far end of the lake, directly opposite the main gate.”", "«في الطرف البعيد من البحيرة، مقابل البوابة الرئيسية مباشرة»."] },
          { k: "map", s: "Café", a: "H", x: ["It is no longer in the visitor centre. It is “immediately to the left of the car park”.", "لم يعد في مركز الزوار، بل صار «على يسار موقف السيارات مباشرة»."] },
          { k: "map", s: "Toilets", a: "D", x: ["“On the right-hand side of the lake, directly opposite the picnic area” (C). G is only planned for next year.", "«على الجانب الأيمن من البحيرة، مقابل منطقة النزهة (C) مباشرة». أما G فمخطط له في العام القادم فقط."] }
        ] },

      { t: "quiz", h: ["Direction phrases", "عبارات الاتجاهات"], pass: 3, items: [
        { s: "You are at the entrance. “The shop is at the far end of the hall.” Where is it?", o: ["Near the entrance", "At the end furthest from the entrance", "In the middle of the hall"], a: 1, x: ["“The far end” is the end furthest from you.", "«the far end» هو الطرف الأبعد عنك."] },
        { s: "“The library is opposite the bank.” This means the library is…", o: ["next to the bank", "facing the bank, on the other side", "behind the bank"], a: 1, x: ["“Opposite” means facing it, across a road or path.", "«opposite» تعني مقابله، على الجانب الآخر من الطريق أو الممر."] },
        { s: "You walk clockwise around a lake, starting at the bottom (the six o'clock position). Which side do you go up first?", o: ["The left side", "The right side", "Straight across the middle"], a: 0, x: ["Clock hands go from 6 to 9, and 9 o'clock is on the left.", "عقارب الساعة تتحرك من 6 إلى 9، والساعة 9 تقع على اليسار."] },
        { s: "“Go past the lifts, and it's the second door on your right.” You go past the lifts and reach the first door on your right. Is this it?", o: ["Yes", "No, it's the next one"], a: 1, x: ["The speaker said the second door, so keep going to the next one.", "قال المتحدث الباب الثاني، فتابع السير إلى الباب التالي."] }
      ] }
    ]
  };

  // ---------------- lesson: lectures and note completion ----------------
  var LECTURE = {
    id: "listen-lecture", order: 53, icon: "🎓", mins: 18, skill: "l",
    t: ["Listening: lectures and note completion", "الاستماع: المحاضرات وإكمال الملاحظات"],
    d: ["Follow an academic talk using signposts, and complete notes as you listen.", "تابع المحاضرة الأكاديمية مستعينًا بعبارات الانتقال، وأكمل الملاحظات أثناء الاستماع."],
    steps: [
      { t: "text", h: ["Part 4: the lecture", "الجزء الرابع: المحاضرة"], p: [
        ["Part 4 is one speaker giving a talk on an academic subject, like a short university lecture. There is no break in the middle, so you need to keep your place for all 10 questions.", "الجزء الرابع متحدث واحد يلقي حديثًا في موضوع أكاديمي، أشبه بمحاضرة جامعية قصيرة، ولا توقّف في منتصفه، فعليك أن تحافظ على موضعك طوال الأسئلة العشرة."],
        ["The questions are often notes with gaps. The notes follow the structure of the talk, and their headings match the speaker's main sections.", "تأتي الأسئلة غالبًا على شكل ملاحظات فيها فراغات، وهي تتبع بنية الحديث، وعناوينها تطابق الأقسام الرئيسية في كلام المتحدث."]] },

      { t: "table", h: ["Signposting language", "عبارات الانتقال والتوجيه"], cols: [["The speaker says", "يقول المتحدث"], ["What it tells you", "ماذا يخبرك"]], rows: [
        ["Firstly… / To begin with…", "The first main point is starting"],
        ["Turning to… / Moving on to…", "A new section. Find the next heading in your notes"],
        ["The key point is… / What's crucial here is…", "An important idea, very often an answer"],
        ["In contrast… / On the other hand…", "A difference is coming"],
        ["For instance… / Take…", "An example"],
        ["As a result… / This meant that…", "A cause or an effect"],
        ["So, to sum up…", "The final section"]],
        p: [["Signposts are your map of the talk. When you hear one, move your eyes to the matching part of the notes.", "عبارات الانتقال هي خريطتك للمحاضرة، فإذا سمعت إحداها فانقل عينيك إلى الجزء المقابل لها في الملاحظات."]] },

      { t: "text", h: ["Completing notes", "إكمال الملاحظات"], list: [
        ["Read the headings first. They tell you the order of the talk.", "اقرأ العناوين أولًا، فهي تخبرك بترتيب المحاضرة."],
        ["The words around the gap are often paraphrased, but the answer itself is a word you actually hear.", "الكلمات المحيطة بالفراغ تأتي غالبًا بصياغة مختلفة، لكن الإجابة نفسها كلمة تسمعها فعلًا."],
        ["ONE WORD ONLY means one word. Don't add “the”, “a” or an extra adjective.", "ONE WORD ONLY تعني كلمة واحدة، فلا تُضف «the» أو «a» أو صفة زائدة."],
        ["Check the grammar: does the gap need a noun, an adjective or a verb? Singular or plural?", "تحقق من القواعد: هل يحتاج الفراغ اسمًا أم صفة أم فعلًا؟ مفردًا أم جمعًا؟"],
        ["If you miss a gap, let it go and listen for the next one. Come back and guess at the end.", "إن فاتك فراغ فدعه واستمع للفراغ التالي، ثم عُد إليه وخمّن في النهاية."]] },

      { t: "listen", h: ["Practice: Part 4", "تدريب: الجزء الرابع"], plays: 2, pass: 7,
        intro: ["You will hear part of a lecture about sound in buildings. Complete the notes. Write ONE WORD ONLY for each answer.", "ستسمع جزءًا من محاضرة عن الصوت في المباني. أكمل الملاحظات، واكتب كلمة واحدة فقط لكل إجابة."],
        names: { a: "Lecturer" },
        lines: [
          ["a", "Good afternoon. Today I want to look at something we rarely notice until it goes wrong: the way buildings shape sound. Architects call this acoustics, and it affects how we learn, work and even eat."],
          ["a", "Firstly, some basics. When sound hits a surface, some of it is absorbed and some of it bounces back. That reflected sound is called reverberation, and the time it takes to fade away is a key measure for any room."],
          ["a", "Hard materials, such as glass, concrete and stone, reflect most of the sound that reaches them. Soft materials, like curtains and carpets, absorb it. So, in fact, does people's clothing."],
          ["a", "That's why a full audience can change the sound of a hall quite dramatically. To deal with this, some concert halls cover their seats in thick fabric, so that an empty hall during rehearsals sounds much like a full one."],
          ["a", "Turning now to history. Long before anyone could measure sound, builders learnt by experience. Ancient open-air theatres, for instance, were often built into the side of a hill, with rows of stone seats rising steeply."],
          ["a", "Visitors are still amazed that a whisper on the stage can be heard in the back row. Some researchers believe the stone steps may filter out low background noise, such as wind, which makes voices clearer."],
          ["a", "Now, in contrast to concert halls, where a little reverberation makes music sound rich, classrooms need very little. The key point is that in a room with too much echo, students miss many of the words their teacher says."],
          ["a", "One study of primary schools found that children in noisy rooms also became tired more quickly. Interestingly, the effect was strongest for children learning in a second language."],
          ["a", "Moving on to restaurants. Many modern restaurants choose bare walls, wooden floors and high ceilings because they look stylish. Unfortunately, these surfaces reflect sound, so diners raise their voices, and the room gets louder and louder."],
          ["a", "Owners have found that customers who can't hear each other tend to leave earlier, and some don't come back. So acoustic panels are now often hidden behind pictures, or built into the ceiling."],
          ["a", "Finally, offices. Open-plan offices were meant to help people communicate, but many workers say noise is their biggest complaint. As a result, some companies now create quiet zones, where phone calls are not allowed."],
          ["a", "So, to sum up: good acoustics are not a luxury. Whether we're listening to music or to a teacher, the shape and materials of a room matter. Next week, we'll look at how sound travels outdoors."]
        ],
        form: "Sound in architecture",
        items: [
          { k: "gap", s: "Basics: sound that bounces back off a surface is called ___.", a: ["reverberation"], x: ["“That reflected sound is called reverberation.” Check the spelling carefully.", "«ذلك الصوت المنعكس يُسمّى reverberation». انتبه لتهجئتها جيدًا."] },
          { k: "gap", s: "Soft materials, e.g. carpets and ___, absorb sound.", a: ["curtains"], x: ["“Soft materials, like curtains and carpets, absorb it.” The notes change the order, but the word is the same.", "«المواد اللينة كالستائر والسجاد تمتصه». غيّرت الملاحظات الترتيب، لكن الكلمة نفسها."] },
          { k: "gap", s: "Some concert halls use seats covered in thick ___.", a: ["fabric"], x: ["“Cover their seats in thick fabric.” “Thick” is already in the notes, so write only “fabric”.", "«تغطي مقاعدها بقماش سميك». كلمة thick موجودة في الملاحظات، فاكتب fabric فقط."] },
          { k: "gap", s: "History: ancient theatres were often built into the side of a ___.", a: ["hill"], x: ["“Built into the side of a hill.”", "«بُنيت على سفح تلّ»."] },
          { k: "gap", s: "Stone steps may filter out low noise, e.g. ___.", a: ["wind"], x: ["“Low background noise, such as wind.” “Such as” becomes “e.g.” in the notes.", "«الضوضاء الخلفية المنخفضة مثل الرياح». عبارة such as تصبح e.g. في الملاحظات."] },
          { k: "gap", s: "Classrooms: with too much echo, students miss many ___.", a: ["words"], x: ["“Students miss many of the words their teacher says.” Plural: words.", "«يفوت الطلابَ كثيرٌ من الكلمات التي يقولها المعلم». بصيغة الجمع: words."] },
          { k: "gap", s: "Children in noisy rooms became ___ more quickly.", a: ["tired"], x: ["“Children in noisy rooms also became tired more quickly.”", "«الأطفال في الغرف الصاخبة تعبوا أسرع أيضًا»."] },
          { k: "gap", s: "Restaurants: bare walls, ___ floors and high ceilings reflect sound.", a: ["wooden"], x: ["“Bare walls, wooden floors and high ceilings.” The gap needs an adjective before “floors”.", "«جدران عارية وأرضيات خشبية وأسقف عالية». الفراغ يحتاج صفة قبل floors."] },
          { k: "gap", s: "Acoustic panels are often hidden behind ___.", a: ["pictures"], x: ["“Hidden behind pictures, or built into the ceiling.” Only “pictures” fits “hidden behind”.", "«مخفية خلف اللوحات أو مدمجة في السقف». وكلمة pictures وحدها تناسب hidden behind."] },
          { k: "gap", s: "Offices: some companies create quiet ___ with no phone calls.", a: ["zones"], x: ["“Some companies now create quiet zones, where phone calls are not allowed.”", "«تنشئ بعض الشركات الآن مناطق هادئة لا يُسمح فيها بالمكالمات الهاتفية»."] }
        ] },

      { t: "quiz", h: ["Check yourself", "اختبر نفسك"], pass: 3, items: [
        { s: ["The lecturer says “Turning now to…”. What does this tell you?", "يقول المحاضر «Turning now to…». ماذا يخبرك ذلك؟"], o: [["An example is coming", "مثال قادم"], ["A new section is starting", "قسم جديد يبدأ"], ["The talk is ending", "المحاضرة توشك على الانتهاء"]], a: 1, x: ["“Turning to” moves to a new section, like “Turning now to history” in the lecture.", "«Turning to» تنقل إلى قسم جديد، مثل «Turning now to history» في المحاضرة."] },
        { s: ["You hear “thick fabric”. The notes say “seats covered in thick ___” and the limit is ONE WORD ONLY. What do you write?", "تسمع «thick fabric»، والملاحظات تقول «seats covered in thick ___»، والحد كلمة واحدة فقط. ماذا تكتب؟"], o: ["thick fabric", "fabric", "fabrics"], a: 1, x: ["“Thick” is already in the notes, and “fabrics” is not what you heard.", "كلمة thick موجودة في الملاحظات، وfabrics ليست ما سمعته."] },
        { s: ["You missed gap 4 and the lecturer has moved on. What should you do?", "فاتك الفراغ 4 وانتقل المحاضر إلى نقطة أخرى. ماذا تفعل؟"], o: [["Stop and try to remember it", "توقف وحاول أن تتذكره"], ["Listen for gap 5, then guess gap 4 at the end", "استمع للفراغ 5، ثم خمّن الفراغ 4 في النهاية"], ["Leave both gaps empty", "اترك الفراغين فارغين"]], a: 1, x: ["Stopping makes you miss more. Keep up with the talk and guess later, as wrong answers lose no marks.", "التوقف يُفوّت عليك المزيد، فتابع المحاضرة وخمّن لاحقًا، إذ لا تُخصم درجات على الإجابات الخاطئة."] },
        { s: "Which signpost introduces a result?", o: ["In contrast", "For instance", "As a result"], a: 2, x: ["“As a result” introduces an effect, as in “As a result, some companies now create quiet zones”.", "«As a result» تقدّم نتيجة، كما في «As a result, some companies now create quiet zones»."] }
      ] }
    ]
  };

  // ---------------- lesson: two full sections ----------------
  var FULL = {
    id: "listen-full", order: 54, icon: "⏱️", mins: 20, skill: "l",
    t: ["Listening practice: two full sections", "تدريب الاستماع: قسمان كاملان"],
    d: ["A Part 3 discussion and a Part 2 talk, 20 questions in exam style.", "نقاش من الجزء الثالث وحديث من الجزء الثاني، 20 سؤالًا بأسلوب الاختبار."],
    steps: [
      { t: "text", h: ["Exam-day timing", "التوقيت يوم الاختبار"], list: [
        ["The recordings last about 30 minutes, and you hear each one only once.", "تستغرق التسجيلات نحو 30 دقيقة، وتسمع كل تسجيل مرة واحدة فقط."],
        ["Before each part, and sometimes halfway through, you get a short pause to read the next questions. Spend it reading ahead, not checking old answers.", "قبل كل جزء، وأحيانًا في منتصفه، تحصل على وقفة قصيرة لقراءة الأسئلة التالية، فاقضها في القراءة المسبقة لا في مراجعة الإجابات السابقة."],
        ["On paper, you write on the question paper and get 10 minutes at the end to transfer your answers. On computer, you type as you go and get 2 minutes to check.", "في الاختبار الورقي تكتب على ورقة الأسئلة وتحصل على 10 دقائق في النهاية لنقل إجاباتك، وفي المحوسب تكتب أثناء الاستماع وتحصل على دقيقتين للمراجعة."],
        ["Wrong answers lose no marks, so never leave a gap empty.", "لا تُخصم درجات على الإجابات الخاطئة، فلا تترك أي فراغ دون إجابة."],
        ["At the end, check spelling, plurals and word limits.", "في النهاية، راجع التهجئة وصيغ الجمع وحدود الكلمات."]],
        p: [["For real exam practice, play each recording only once and answer every question before you check.", "لتتدرب كما في الاختبار الحقيقي، شغّل كل تسجيل مرة واحدة فقط وأجب عن كل الأسئلة قبل أن تتحقق من إجاباتك."]] },

      { t: "listen", h: ["Section 1 · Part 3", "القسم 1 · الجزء الثالث"], plays: 2, pass: 7,
        intro: ["Two students are discussing their project with their tutor. Questions 1–5: choose the correct letter, A, B or C. Questions 6–10: complete the notes. Write ONE WORD AND/OR A NUMBER for each answer.", "طالبان يناقشان مشروعهما مع أستاذهما. الأسئلة 1–5: اختر الحرف الصحيح A أو B أو C. الأسئلة 6–10: أكمل الملاحظات، واكتب كلمة واحدة و/أو رقمًا لكل إجابة."],
        names: { a: "Dr Lewis", b: "Noura", c: "Jack" },
        lines: [
          ["a", "Come in, both of you. So, you wanted to talk about your project on food waste in the dining hall. How's it going?"],
          ["b", "Quite well, I think. We've finished collecting the data, but we're not sure how to present some of it."],
          ["a", "Good. Remind me first, though, why did you choose this topic? I know I suggested water use, and you were considering transport at one stage."],
          ["c", "We were, yes. But lots of groups did transport last year. Then Noura noticed how much food was being thrown away at lunch, and that seemed a more original question."],
          ["a", "Fair enough. And how did you actually measure the waste?"],
          ["b", "At first we planned to weigh every plate, but that would have taken hours. So in the end, the kitchen staff let us weigh the bins after each lunch."],
          ["c", "We also took photos of some trays, but we didn't use them in the end. They weren't consistent enough."],
          ["a", "That's sensible. And what surprised you in the results?"],
          ["c", "Well, I'd assumed the main meals would be wasted most, you know, rice and pasta. But they weren't."],
          ["b", "No, it was actually bread. People take two or three rolls because they're free, and then leave most of them. Salad was much lower than we expected."],
          ["a", "Interesting. So how are you planning to present the daily figures?"],
          ["b", "We'd done a pie chart for each day, but there are fifteen of them, which is a lot."],
          ["a", "It is. A table would be accurate, but readers find it hard to spot a pattern in fifteen rows. I'd put everything on a single line graph. Then the trend across the three weeks is obvious."],
          ["c", "Actually, Noura and I don't agree on one thing. I think we should interview the kitchen staff, to get their point of view."],
          ["b", "And I think it's too late for that. We've only got two weeks left, and the ethics form alone takes ten days."],
          ["a", "Noura has a point there. You could mention interviews as an idea for further research."],
          ["a", "Right. Now, your recommendations. What have you got?"],
          ["b", "Our first idea is to offer smaller portions at a lower price. A lot of students told us the plates are simply too full."],
          ["c", "Second, we'd move the bread to the end of the counter, so students pick it up last, when their trays are already full."],
          ["a", "Good, that's a cheap change. Anything about communication?"],
          ["b", "Yes. We'd like to put up a poster showing how much food is wasted each week. Jack wanted a video on the screens, but that would cost too much."],
          ["a", "And the food that isn't eaten, where does it go now?"],
          ["c", "Into the general rubbish, mostly. So we'd suggest it's collected for compost. There's a community garden near the campus that would take it."],
          ["a", "Excellent. One last thing: when's your draft due?"],
          ["b", "The twenty-first of May, I think. No, wait, that's the final version. The draft is due on the fourteenth."],
          ["a", "Then I'll look forward to reading it."]
        ],
        form: "Food waste project",
        items: [
          { k: "mcq", s: "Why did the students choose food waste as their topic?", o: ["Their tutor suggested it", "Transport had been studied by many other groups", "They had both worked in the dining hall"], a: 1, x: ["The tutor suggested water use, not food waste. Jack says “lots of groups did transport last year”.", "اقترح الأستاذ استهلاك المياه لا هدر الطعام، ويقول جاك: «كثير من المجموعات درست النقل العام الماضي»."] },
          { k: "mcq", s: "How did the students measure the waste?", o: ["By photographing trays", "By weighing individual plates", "By weighing the bins after lunch"], a: 2, x: ["Weighing plates was only the first plan, and the photos weren't used. “The kitchen staff let us weigh the bins after each lunch.”", "وزن الأطباق كان الخطة الأولى فقط، والصور لم تُستخدم. «سمح لنا موظفو المطبخ بوزن الحاويات بعد كل غداء»."] },
          { k: "mcq", s: "Which food was wasted most?", o: ["Bread", "Rice and pasta", "Salad"], a: 0, x: ["Jack expected rice and pasta, “but they weren't”. Noura: “it was actually bread”.", "توقّع جاك الأرز والمعكرونة «لكن لم يكن الأمر كذلك»، وتقول نورة: «في الحقيقة كان الخبز»."] },
          { k: "mcq", s: "How does the tutor suggest presenting the daily figures?", o: ["In a table", "In a line graph", "In a pie chart for each day"], a: 1, x: ["Fifteen pie charts are too many and a table hides the pattern. “I'd put everything on a single line graph.”", "خمسة عشر مخططًا دائريًا عدد كبير، والجدول يُخفي النمط. «أنصح بوضع كل شيء في رسم بياني خطي واحد»."] },
          { k: "mcq", s: "What do the students disagree about?", o: ["Whether to interview the kitchen staff", "How long the report should be", "Whether to include the photos"], a: 0, x: ["Jack wants to “interview the kitchen staff”, and Noura thinks “it's too late for that”.", "يريد جاك «مقابلة موظفي المطبخ»، وترى نورة أن «الوقت متأخر على ذلك»."] },
          { k: "gap", s: "Recommendation 1: offer smaller ___ at a lower price.", a: ["portions"], x: ["“Offer smaller portions at a lower price.” Plural: portions.", "«تقديم حصص أصغر بسعر أقل». بصيغة الجمع: portions."] },
          { k: "gap", s: "Recommendation 2: put the bread at the ___ of the counter.", a: ["end"], x: ["“Move the bread to the end of the counter.”", "«نقل الخبز إلى نهاية طاولة التقديم»."] },
          { k: "gap", s: "Recommendation 3: put up a weekly ___ about waste.", a: ["poster"], x: ["A video “would cost too much”, so they choose “a poster”.", "الفيديو «سيكلف كثيرًا»، فاختارا «ملصقًا»."] },
          { k: "gap", s: "Recommendation 4: collect uneaten food for ___.", a: ["compost"], x: ["“We'd suggest it's collected for compost.”", "«نقترح جمعه لصنع السماد العضوي»."] },
          { k: "gap", s: "Draft due on ___ May.", a: ["14", "14th", "fourteenth"], x: ["The 21st is the final version. “The draft is due on the fourteenth.”", "يوم 21 هو موعد النسخة النهائية، أما «المسودة فموعدها الرابع عشر»."] }
        ] },

      { t: "listen", h: ["Section 2 · Part 2", "القسم 2 · الجزء الثاني"], plays: 2, pass: 7,
        intro: ["A member of staff is talking to new international students. Questions 1–6: complete the notes. Write ONE WORD AND/OR A NUMBER for each answer. Questions 7–10: choose the correct letter, A, B or C.", "موظف يتحدث إلى طلاب دوليين جدد. الأسئلة 1–6: أكمل الملاحظات، واكتب كلمة واحدة و/أو رقمًا لكل إجابة. الأسئلة 7–10: اختر الحرف الصحيح A أو B أو C."],
        names: { a: "Speaker" },
        lines: [
          ["a", "Hello, everyone, and welcome to Northgate University. My name's Daniel, and I work in Student Services. I'll quickly go through what's happening this week, so you don't miss anything important."],
          ["a", "First of all, your student cards. Your email said to collect them from the main reception, but we've moved them to the library, because reception was getting far too crowded. So, the library, ground floor."],
          ["a", "You'll need to bring your offer letter and your passport. Without your passport, I'm afraid we can't give you a card at all."],
          ["a", "On Tuesday afternoon there's a campus tour. Tours leave every thirty minutes from two o'clock, and each one lasts about an hour and a quarter. Wear comfortable shoes, because the campus is bigger than it looks."],
          ["a", "Wednesday is the clubs fair, in the sports hall. There are over a hundred and sixty clubs and societies, from photography to robotics. Most are free to join, though sports clubs usually charge a small fee."],
          ["a", "Now, many of you have asked about prayer facilities. There's a prayer room on the second floor of the Student Union building, with washing facilities next door. It's open from seven in the morning until ten at night."],
          ["a", "Opening a bank account can be slow, but you don't need to go into town. On Thursday, staff from two local banks will be here on campus, in the main foyer, all day."],
          ["a", "You'll need a letter confirming that you're a student, but there's no need to ask your department for one. You can print it yourself from the student portal."],
          ["a", "On Friday evening there's the welcome dinner. In previous years it's been in the dining hall, but this year, if the weather's kind, it'll be outside on the main lawn."],
          ["a", "As always, it's free, and as always, you'll need to book a ticket."],
          ["a", "A bit of advice. Don't rush to buy textbooks. Lecturers will tell you which ones you really need. And joining ten clubs sounds fun, but most students end up going to two or three."],
          ["a", "What I'd really urge you to do this week is register with the campus health centre. It takes ten minutes now, but it's much harder when you're actually ill."],
          ["a", "Finally, it's completely normal to feel homesick in the first few weeks. Your personal tutor is there mainly for academic questions, so for this kind of thing, talk to one of our student mentors."],
          ["a", "They're second-year students who remember exactly how it feels. There's some advice online too, but nothing beats a real conversation. Right, enjoy your first week!"]
        ],
        form: "Welcome week",
        items: [
          { k: "form", l: "Collect student card from: the … (ground floor)", a: ["library"], x: ["The email said main reception, but “we've moved them to the library”.", "ذكرت الرسالة الاستقبال الرئيسي، لكن «نقلناها إلى المكتبة»."] },
          { k: "form", l: "Bring: offer letter and …", a: ["passport"], x: ["“Bring your offer letter and your passport.”", "«أحضروا خطاب القبول وجواز السفر»."] },
          { k: "form", l: "Campus tours leave every … minutes", a: ["30", "thirty"], x: ["“Every thirty minutes.” “An hour and a quarter” is how long each tour lasts.", "«كل ثلاثين دقيقة». أما «ساعة وربع» فهي مدة كل جولة."] },
          { k: "form", l: "Clubs fair (Wednesday): in the sports …", a: ["hall"], x: ["“The clubs fair, in the sports hall.”", "«معرض الأندية في الصالة الرياضية»."] },
          { k: "form", l: "Number of clubs and societies: over …", a: ["160"], x: ["“Over a hundred and sixty.” Write 160.", "«أكثر من مئة وستين». اكتب 160."] },
          { k: "form", l: "Prayer room: Student Union, … floor", a: ["second", "2nd"], x: ["“On the second floor of the Student Union building.”", "«في الطابق الثاني من مبنى اتحاد الطلاب»."] },
          { k: "mcq", s: "What does the speaker say about opening a bank account?", o: ["Students must go into town to do it", "Bank staff will be on campus on Thursday", "Students need a letter from their department"], a: 1, x: ["“You don't need to go into town”, and you print the letter yourself. “On Thursday, staff from two local banks will be here on campus.”", "«لا داعي للذهاب إلى وسط المدينة»، والخطاب تطبعه بنفسك. «يوم الخميس سيكون موظفو مصرفين محليين هنا في الحرم الجامعي»."] },
          { k: "mcq", s: "What is new about the welcome dinner this year?", o: ["It is held outdoors", "It is free", "Students must book a ticket"], a: 0, x: ["Free and booking are “as always”. The change is that it will be “outside on the main lawn”.", "المجانية والحجز «كما هو الحال دائمًا»، والجديد أنه سيُقام «في الخارج على المرج الرئيسي»."] },
          { k: "mcq", s: "What does the speaker most strongly advise students to do this week?", o: ["Buy their textbooks early", "Join as many clubs as possible", "Register with a doctor on campus"], a: 2, x: ["“Don't rush to buy textbooks”, and most students join only two or three clubs. “What I'd really urge you to do… is register with the campus health centre.”", "«لا تستعجلوا شراء الكتب»، ومعظم الطلاب يكتفون بناديين أو ثلاثة. «ما أحثّكم عليه حقًا… هو التسجيل في المركز الصحي بالحرم الجامعي»."] },
          { k: "mcq", s: "Who does the speaker recommend for students who feel homesick?", o: ["Their personal tutor", "Student mentors", "An online advice service"], a: 1, x: ["The tutor is “mainly for academic questions”, and online advice is not as good as “a real conversation”. “Talk to one of our student mentors.”", "الأستاذ المرشد «للأسئلة الأكاديمية أساسًا»، والنصائح على الإنترنت لا تعادل «محادثة حقيقية». «تحدّثوا إلى أحد مرشدينا من الطلاب»."] }
        ] }
    ]
  };

  (window.MasarokParts = window.MasarokParts || []).push({ course: "ielts", lessons: [BASICS, MCQ, MAPS, LECTURE, FULL] });
})();

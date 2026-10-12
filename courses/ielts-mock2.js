/* Masarok Academy · IELTS Academic · Mock test 2.
   All scripts, passages, questions and tasks are original Masarok practice material, written in the official IELTS formats. */
(function () {
  "use strict";

  // ---------------- Listening ----------------
  var L1 = {
    intro: ["Part 1. A student is phoning a language centre about an evening course. Questions 1–10: complete the form. Write ONE WORD AND/OR A NUMBER for each answer.", "الجزء 1. طالبة تتصل بمركز لغات للاستفسار عن دورة مسائية. الأسئلة 1–10: أكمل النموذج بكلمة واحدة و/أو رقم لكل إجابة."],
    names: { a: "Receptionist", b: "Nouf" },
    lines: [
      ["a", "Good evening, Westbrook Language Centre. How can I help?"],
      ["b", "Oh, hi. I saw that you run evening conversation classes, and I wanted to find out a bit more. And maybe enrol, if there's still space."],
      ["a", "Of course. There's space in most groups. Let me take a few details first, and then I'll explain how it all works. Could I have your name?"],
      ["b", "Sure. It's Nouf, that's N, O, U, F. And my family name is Alqahtani."],
      ["a", "Could you spell the family name for me?"],
      ["b", "Yes. A, L, Q, A, H, T, A, N, I."],
      ["a", "A, L, Q, A, H, T, A, N, I. Lovely. And what's your address, Nouf?"],
      ["b", "I'm at twenty-seven Pelham Street. That's P, E, L, H, A, M."],
      ["a", "Pelham Street. Is that the one near the hospital?"],
      ["b", "Yes, just behind it."],
      ["a", "Great. And a phone number?"],
      ["b", "It's oh seven nine four six, three eight one, two oh five."],
      ["a", "Oh seven nine four six, three eight one…"],
      ["b", "Oh, sorry, no. I always do that. It's three one eight, not three eight one. So, oh seven nine four six, three one eight, two oh five."],
      ["a", "Got it. Now, we put people into groups by level. Do you know roughly what your level is?"],
      ["b", "Well, I'd have said pre-intermediate, because I still make lots of mistakes. But I did the test on your website last week, and it said intermediate."],
      ["a", "Then we'll go with intermediate. The online test is usually quite accurate, and the teacher can always move you if it doesn't feel right."],
      ["a", "The intermediate group meets twice a week. You can choose Mondays and Wednesdays, or Mondays and Thursdays."],
      ["b", "Wednesdays would be best for me, actually."],
      ["a", "Ah, I'm sorry, I've just checked, and the Wednesday group is full now. Would the other option work?"],
      ["b", "Yes, I can do Thursdays. I'll just have to swap a shift at work."],
      ["a", "Classes run from half past six until eight o'clock."],
      ["b", "That's fine. And how much does it cost?"],
      ["a", "The full fee for the ten-week course is two hundred and ten pounds. But are you a student at the moment?"],
      ["b", "Yes, I'm doing a foundation course at the college."],
      ["a", "Then you can have the student rate, which is one hundred and eighty-five pounds. You'll just need to show your student card."],
      ["a", "The next course starts on Monday the thirteenth of January."],
      ["b", "Not the sixth? I'm sure I saw the sixth on the website."],
      ["a", "That was the original date, but we moved it back a week because of the holidays. So it's definitely the thirteenth."],
      ["b", "Okay. Is there anything I need to bring on the first evening?"],
      ["a", "Just your student card, so we can check the discount, and a photograph for your centre ID card. A small one is fine, passport size."],
      ["a", "Can I ask what you're hoping to get from the course? It helps the teacher plan."],
      ["b", "Mostly confidence. I'm fine writing emails, but I freeze when I have to speak. And I've got job interviews coming up next summer, so I'd really like to practise for those."],
      ["a", "That's very common. The teachers do a lot of role-play, so that should help. Last question: how did you hear about us?"],
      ["b", "I think it was a poster in the library… no, actually, my friend Lina gave me a leaflet about your classes. That's right. Then I looked at the website."],
      ["a", "Perfect. I'll email you a confirmation tonight, Nouf. See you in January."]
    ],
    form: "Evening Conversation Course: enrolment form",
    items: [
      { k: "form", l: "First name: Nouf. Family name: …", a: ["alqahtani"], x: ["She spells it: A-L-Q-A-H-T-A-N-I.", "تتهجاه: A-L-Q-A-H-T-A-N-I."] },
      { k: "form", l: "Address: 27 … Street", a: ["pelham"], x: ["“Twenty-seven Pelham Street. That's P, E, L, H, A, M.”", "«27 شارع Pelham» وتتهجاه P-E-L-H-A-M."] },
      { k: "form", l: "Phone number: …", a: ["07946318205", "07946 318205", "07946 318 205"], x: ["She corrects herself: “three one eight, not three eight one”, so 07946 318 205.", "تصحح نفسها: «318 وليس 381»، فالرقم 07946 318 205."] },
      { k: "form", l: "Level: …", a: ["intermediate"], x: ["She thought pre-intermediate, but the online test said intermediate, and the receptionist says “we'll go with intermediate”.", "ظنت أن مستواها pre-intermediate، لكن الاختبار الإلكتروني قال intermediate، وتقول الموظفة «سنعتمد intermediate»."] },
      { k: "form", l: "Days: Mondays and …", a: ["thursdays", "thursday"], x: ["Wednesday is full, so she says “I can do Thursdays”.", "مجموعة الأربعاء ممتلئة، فتقول «أستطيع يوم الخميس»."] },
      { k: "form", l: "Fee (student rate): £ …", a: ["185", "£185"], x: ["The full fee is £210, but the student rate is “one hundred and eighty-five pounds”.", "الرسوم الكاملة 210 جنيهات، لكن سعر الطلاب «185 جنيهًا»."] },
      { k: "form", l: "Start date: Monday … January", a: ["13", "13th", "thirteenth"], x: ["The sixth was the original date; it was moved: “it's definitely the thirteenth”.", "السادس كان الموعد الأصلي ثم تغيّر: «إنه الثالث عشر بالتأكيد»."] },
      { k: "form", l: "Bring on the first evening: student card and a …", a: ["photograph", "photo"], x: ["“Your student card… and a photograph for your centre ID card.”", "«بطاقتك الطلابية… وصورة شخصية لبطاقة المركز»."] },
      { k: "form", l: "Main goal: to practise for job …", a: ["interviews"], x: ["“I've got job interviews coming up… I'd really like to practise for those.”", "«لديّ مقابلات عمل قادمة… أود أن أتدرب عليها»."] },
      { k: "form", l: "Heard about the course from a …", a: ["leaflet"], x: ["She first says a poster, then corrects herself: “my friend Lina gave me a leaflet about your classes”.", "تقول أولًا ملصقًا ثم تصحح: «أعطتني صديقتي لينا إحدى نشراتكم»."] }
    ]
  };

  var L2 = {
    intro: ["Part 2. You will hear a radio presenter talking about a community food festival. Questions 11–15: choose the correct letter. Questions 16–20: label the map. Write the correct letter, A–H.", "الجزء 2. ستسمع مقدّمًا إذاعيًا يتحدث عن مهرجان طعام مجتمعي. الأسئلة 11–15: اختر الحرف الصحيح. الأسئلة 16–20: حدد الأماكن على الخريطة بكتابة الحرف الصحيح من A إلى H."],
    names: { a: "Presenter" },
    lines: [
      ["a", "And now, some news for food lovers. This weekend, the Riverside Food Festival returns to Ashgrove Park, and I've been finding out what's on."],
      ["a", "The festival has been going for eight years now, and it's in the same park as always. But there's one big change. For the first time, it's running over two days, Saturday and Sunday, instead of just the Saturday."],
      ["a", "There are about sixty stalls, which is roughly the same as last year, with food from more than twenty countries."],
      ["a", "Now, tickets. Children under twelve still get in free. Adults paid five pounds last year, but the organisers have managed to bring that down to three pounds, which is great news."],
      ["a", "You don't need to book in advance. Just pay at the gate. But I would say this: the car park at Ashgrove is very small, and it's usually full by ten o'clock."],
      ["a", "So the organisers are asking everyone to come by bus if they possibly can. The number fourteen stops right outside the main gate, every ten minutes."],
      ["a", "As always, the festival is raising money for a good cause. Last year's profits paid for new benches and lighting in the park itself."],
      ["a", "This year, every penny will go towards a kitchen garden at Elmfield Primary School, where the children will learn to grow vegetables and then cook with them."],
      ["a", "The stallholders come from all over the region this year, not just from the town. And to cut down on waste, they've all agreed to serve food on plates and bowls that can be composted."],
      ["a", "A few listeners have asked whether every stall will have vegetarian dishes. Most will, but not all of them, so do check the programme."],
      ["a", "Right, let me tell you where things are. On the festival map, you'll see the main gate at the bottom, the fountain in the middle, the car park on the left, and the river path along the top."],
      ["a", "As you come in through the main gate, the information tent is the first thing on your right. That's where you can pick up a programme and ask about anything you need."],
      ["a", "First aid used to be down by the river path, but this year it's much easier to find. It's just inside the main gate, on your left, opposite the information tent."],
      ["a", "Families will want the children's area, with face painting and a mini cooking class. That's to the left of the fountain, halfway between the fountain and the car park."],
      ["a", "The cooking stage, where local chefs give demonstrations every hour, is directly behind the fountain as you look at it from the main gate. So it's between the fountain and the river path."],
      ["a", "And something new this year: a prayer room. It's in a quiet tent in the top right-hand corner of the park, right beside the river path."],
      ["a", "The festival opens at ten each morning. Bring your appetite, and I hope to see you there."]
    ],
    form: "Riverside Food Festival",
    map: {
      w: 320, h: 220,
      fixed: [
        { t: "Main gate", x: 160, y: 208 },
        { t: "Fountain", x: 160, y: 110 },
        { t: "Car park", x: 30, y: 110 },
        { t: "River path", x: 160, y: 12 }
      ],
      spots: [
        { k: "A", x: 100, y: 180 },
        { k: "B", x: 220, y: 180 },
        { k: "C", x: 95, y: 110 },
        { k: "D", x: 230, y: 110 },
        { k: "E", x: 290, y: 150 },
        { k: "F", x: 40, y: 40 },
        { k: "G", x: 160, y: 52 },
        { k: "H", x: 285, y: 40 }
      ]
    },
    items: [
      { k: "mcq", s: "What is new about the festival this year?", o: ["It lasts for two days.", "It is in a different park.", "It has more stalls than before."], a: 0, x: ["“For the first time, it's running over two days.” It is in the same park, with roughly the same number of stalls.", "«لأول مرة يقام على مدى يومين». أما المكان فهو نفسه وعدد الأكشاك تقريبًا كما في العام الماضي."] },
      { k: "mcq", s: "How much is an adult ticket this year?", o: ["Free", "£3", "£5"], a: 1, x: ["Adults paid £5 last year; it has come “down to three pounds”. Only children under twelve are free.", "دفع البالغون 5 جنيهات العام الماضي، وانخفض السعر «إلى ثلاثة جنيهات». الدخول مجاني للأطفال دون الثانية عشرة فقط."] },
      { k: "mcq", s: "What are visitors asked to do?", o: ["Book tickets online", "Arrive before ten o'clock", "Travel by bus"], a: 2, x: ["“The organisers are asking everyone to come by bus.” There is no need to book, and ten o'clock is when the car park fills.", "«يطلب المنظمون من الجميع الحضور بالحافلة». لا حاجة للحجز، والساعة العاشرة هي وقت امتلاء الموقف."] },
      { k: "mcq", s: "This year's profits will pay for", o: ["improvements to the park.", "a school kitchen garden.", "a local food bank."], a: 1, x: ["Park benches were last year. “This year, every penny will go towards a kitchen garden at Elmfield Primary School.”", "المقاعد في الحديقة كانت العام الماضي. «هذا العام سيذهب كل قرش إلى حديقة مطبخ في مدرسة Elmfield الابتدائية»."] },
      { k: "mcq", s: "What does the presenter say about the food stalls?", o: ["All the stallholders are from the town.", "Food will be served on plates that can be composted.", "Every stall will offer vegetarian dishes."], a: 1, x: ["“They've all agreed to serve food on plates and bowls that can be composted.” Stallholders come from all over the region, and not all stalls have vegetarian food.", "«اتفقوا جميعًا على تقديم الطعام في أطباق وأوعية قابلة للتحويل إلى سماد». البائعون من أنحاء المنطقة، وليست كل الأكشاك تقدم أطباقًا نباتية."] },
      { k: "map", s: "Information tent", a: "B", x: ["“The first thing on your right” as you come in through the main gate.", "«أول ما تراه على يمينك» عند الدخول من البوابة الرئيسية."] },
      { k: "map", s: "First aid", a: "A", x: ["It used to be by the river path, but now it is “just inside the main gate, on your left, opposite the information tent”.", "كان قرب ممر النهر، لكنه الآن «بعد البوابة الرئيسية مباشرة على يسارك، مقابل خيمة المعلومات»."] },
      { k: "map", s: "Children's area", a: "C", x: ["“To the left of the fountain, halfway between the fountain and the car park.”", "«يسار النافورة، في منتصف المسافة بين النافورة وموقف السيارات»."] },
      { k: "map", s: "Cooking stage", a: "G", x: ["“Directly behind the fountain… between the fountain and the river path.”", "«خلف النافورة مباشرة… بين النافورة وممر النهر»."] },
      { k: "map", s: "Prayer room", a: "H", x: ["“In the top right-hand corner of the park, right beside the river path.”", "«في الزاوية العليا اليمنى من الحديقة، بجانب ممر النهر»."] }
    ]
  };

  var L3 = {
    intro: ["Part 3. Two students, Huda and Tom, are talking to their tutor about a presentation. Questions 21–30. For the multiple-choice questions, choose the correct letter. For the other questions, write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.", "الجزء 3. طالبان، هدى وتوم، يتحدثان مع مشرفهما عن عرض تقديمي. الأسئلة 21–30. في أسئلة الاختيار من متعدد اختر الحرف الصحيح، وفي الأسئلة الأخرى اكتب كلمتين على الأكثر و/أو رقمًا لكل إجابة."],
    names: { a: "Huda", b: "Tom", c: "Dr Clarke" },
    lines: [
      ["c", "Come in, both of you. So, how's the presentation going? Remind me what you've decided to focus on."],
      ["a", "Solar energy in hot countries. Specifically, the problems that people don't usually talk about."],
      ["c", "Interesting. I thought you were planning to do wind power?"],
      ["b", "We were, at first. And it wasn't a lack of material; there's loads written about wind. But the Tuesday group had already chosen it, so we thought we'd better find something else."],
      ["c", "Fair enough. Solar's a good choice anyway. So, what have you found?"],
      ["a", "Well, what surprised me most was the heat. I'd always assumed that more sunshine just meant more electricity. But panels actually become less efficient when they get very hot."],
      ["b", "I knew that already, to be honest, from our physics module. For me it was the dust that was the real eye-opener."],
      ["c", "Yes, I imagine dust is a big issue in deserts."],
      ["b", "Huge. One study we read measured a drop in output of about twenty-five per cent in just one month when the panels weren't cleaned."],
      ["a", "We originally wrote fifteen per cent in our notes, but that was a figure for a whole year in a much cooler climate. Twenty-five is the desert figure."],
      ["c", "So the answer is simply to wash them?"],
      ["a", "That's the obvious solution, but water is scarce in most desert areas, so using thousands of litres to clean panels isn't really sustainable."],
      ["b", "So some of the large solar farms now use robots instead. They travel along the rows of panels at night and brush the dust off without using any water."],
      ["c", "Excellent, that would make a nice example. Now, I've had a look at the draft slides you sent me."],
      ["c", "The amount of text is about right, and the photos are great. My main worry is the charts. The labels are so small that nobody at the back of the room will be able to read them."],
      ["b", "Right. We'll make them bigger."],
      ["c", "And how are you dividing the presentation between you?"],
      ["a", "We first thought about doing it country by country, but that got quite repetitive. So now Tom's going to explain the problems, and I'll present the solutions."],
      ["c", "That sounds sensible. And remember the time limit. It used to be twenty minutes, but it's been reduced to fifteen this year, with questions afterwards."],
      ["b", "Fifteen. Okay, we'll need to cut a few slides."],
      ["c", "One more suggestion. Rather than ending with a summary slide, why not finish with a question for the audience? It's a good way to start a discussion."],
      ["a", "I like that. Maybe something about whether solar could ever completely replace oil and gas."],
      ["c", "Perfect. Why don't you do a practice run with me before the real thing? I'm free on Wednesday afternoon."],
      ["b", "Ah, I've got a lab on Wednesday afternoon."],
      ["c", "Thursday morning, then?"],
      ["a", "Thursday morning's fine for both of us. Thank you."]
    ],
    items: [
      { k: "mcq", s: "Why did the students decide not to present on wind power?", o: ["There was too little information about it.", "Their tutor advised against it.", "Another group had already chosen it."], a: 2, x: ["“It wasn't a lack of material… But the Tuesday group had already chosen it.”", "«لم يكن السبب قلة المصادر… بل إن مجموعة الثلاثاء اختارته بالفعل»."] },
      { k: "mcq", s: "What surprised Huda most?", o: ["How much dust affects the panels", "That panels work less well when very hot", "How cheap solar panels have become"], a: 1, x: ["Huda: “What surprised me most was the heat… panels actually become less efficient when they get very hot.” The dust surprised Tom.", "تقول هدى: «أكثر ما فاجأني الحرارة… تقل كفاءة الألواح عندما تسخن كثيرًا». الغبار هو ما فاجأ توم."] },
      { k: "gap", s: "Without cleaning, desert panels can lose about ___ per cent of their output in one month.", a: ["25", "twenty-five"], x: ["“About twenty-five per cent in just one month.” Fifteen was a yearly figure for a cooler climate.", "«نحو خمسة وعشرين بالمئة في شهر واحد». أما الخمسة عشر فكانت رقمًا سنويًا لمناخ أبرد."] },
      { k: "gap", s: "Washing panels is a problem because water is ___ in most deserts.", a: ["scarce"], x: ["“Water is scarce in most desert areas.”", "«الماء شحيح في معظم المناطق الصحراوية»."] },
      { k: "gap", s: "Some large solar farms use ___ to remove dust at night.", a: ["robots"], x: ["“Some of the large solar farms now use robots… at night.”", "«بعض مزارع الطاقة الشمسية الكبيرة تستخدم الآن روبوتات… ليلًا»."] },
      { k: "mcq", s: "What problem does the tutor find with the slides?", o: ["There is too much text.", "The charts are difficult to read.", "There are not enough photos."], a: 1, x: ["The text is “about right” and the photos are great, but the chart labels are “so small that nobody at the back… will be able to read them”.", "النص «مناسب» والصور ممتازة، لكن التسميات على الرسوم البيانية «صغيرة جدًا فلن يستطيع أحد في الخلف قراءتها»."] },
      { k: "mcq", s: "How will the students divide the presentation?", o: ["By country", "Huda will present the problems and Tom the solutions.", "Tom will present the problems and Huda the solutions."], a: 2, x: ["They rejected country by country: “Tom's going to explain the problems, and I'll present the solutions.”", "رفضا التقسيم حسب الدول: «سيشرح توم المشكلات وسأعرض أنا الحلول»."] },
      { k: "gap", s: "The presentation must last no more than ___ minutes, not including questions.", a: ["15", "fifteen"], x: ["“It used to be twenty minutes, but it's been reduced to fifteen.”", "«كان عشرين دقيقة، لكنه خُفّض إلى خمس عشرة»."] },
      { k: "gap", s: "The tutor suggests ending with a ___ for the audience.", a: ["question"], x: ["“Why not finish with a question for the audience?”", "«لماذا لا تختمان بسؤال للجمهور؟»"] },
      { k: "gap", s: "The practice run will be on ___ morning.", a: ["thursday"], x: ["Tom has a lab on Wednesday afternoon, so: “Thursday morning's fine for both of us.”", "لدى توم حصة في المختبر يوم الأربعاء بعد الظهر، لذلك: «صباح الخميس مناسب لنا»."] }
    ]
  };

  var L4 = {
    intro: ["Part 4. You will hear a lecture on the science of sleep. Questions 31–40: complete the notes. Write ONE WORD ONLY for each answer.", "الجزء 4. ستسمع محاضرة عن علم النوم. الأسئلة 31–40: أكمل الملاحظات بكلمة واحدة فقط لكل إجابة."],
    names: { a: "Lecturer" },
    lines: [
      ["a", "Good morning, everyone. Today we're looking at something we all do, and spend about a third of our lives doing, but which scientists still don't fully understand: sleep."],
      ["a", "For a long time, sleep was thought of as a kind of switching off, a period when the brain simply rested. We now know that's far from true. The sleeping brain is extremely busy."],
      ["a", "A night's sleep is made up of several cycles, each lasting roughly ninety minutes. Within each cycle, we move through lighter stages of sleep, then deep sleep, and finally what's known as REM sleep."],
      ["a", "Let's start with deep sleep. This is when the body does most of its repair work. It rebuilds tissue and muscle, and it releases growth hormone, which is one reason children and teenagers need so much of it."],
      ["a", "REM stands for rapid eye movement, because the eyes move quickly beneath the eyelids. This is when most vivid dreams happen. But REM sleep seems to have a practical job too: it helps the brain process emotions."],
      ["a", "People who are deprived of REM sleep, for example, tend to react more strongly to upsetting images the next day."],
      ["a", "Sleep is also essential for memory. During the day, new information is held in a kind of temporary store. During sleep, the brain seems to replay it and move it into long-term memory."],
      ["a", "In one common type of experiment, students learn a list of words in the evening. Those who then sleep remember far more the next morning than those who stay awake all night, even if that second group rests quietly."],
      ["a", "So, what controls when we feel sleepy? The answer is our body clock, a small group of cells in the brain that runs on a cycle of roughly twenty-four hours."],
      ["a", "Now, this clock isn't perfectly accurate on its own, so it has to be reset every day. Food and exercise play a small part, but the main signal is light, especially bright morning light."],
      ["a", "As it gets dark in the evening, the brain releases a hormone called melatonin, which prepares the body for sleep. And this is where modern life causes problems."],
      ["a", "Phones, tablets and laptops give off blue light, which the brain mistakes for daylight. Using them late at night delays the release of melatonin, so we fall asleep later."],
      ["a", "Teenagers are a particularly interesting case. During adolescence, the body clock shifts later by up to two hours. So when teenagers say they're not sleepy at ten o'clock, they're usually telling the truth."],
      ["a", "Some schools have experimented with starting the day later, at around nine or half past nine. The results have been encouraging, although perhaps not in the way people expected."],
      ["a", "Exam results improved only slightly in most cases. The clearest change was in attendance: far fewer students missed school, and fewer arrived late."],
      ["a", "What happens when we don't get enough sleep? In the short term, concentration and reaction times suffer, which is why tiredness is a serious risk for drivers."],
      ["a", "Over longer periods, the effects are more worrying. A regular lack of sleep weakens the immune system, so people catch colds and other infections more easily."],
      ["a", "It also affects appetite. People who are short of sleep tend to feel hungrier, and they especially crave sugary foods, which may help explain the link between poor sleep and weight gain."],
      ["a", "So, what can we do? People often suggest a warm drink before bed, or a long nap in the afternoon. A warm drink may help a little, but long naps usually make night-time sleep worse."],
      ["a", "In fact, the research points to one habit above all: keeping a regular schedule. That means going to bed and getting up at roughly the same time every day, even at weekends."],
      ["a", "A cool, dark and quiet bedroom helps too. But nothing works as well as consistency. Next week, we'll look at sleep disorders and how they're treated."]
    ],
    form: "The science of sleep",
    items: [
      { k: "gap", s: "Deep sleep: the body repairs ___ and muscle, and releases growth hormone.", a: ["tissue"], x: ["“It rebuilds tissue and muscle.”", "«يعيد بناء الأنسجة والعضلات»."] },
      { k: "gap", s: "REM sleep: helps the brain to process ___.", a: ["emotions"], x: ["“It helps the brain process emotions.” Dreams happen in REM sleep, but they are not its “practical job”.", "«يساعد الدماغ على معالجة المشاعر». الأحلام تحدث في هذه المرحلة لكنها ليست «وظيفتها العملية»."] },
      { k: "gap", s: "Memory: students who slept after learning words remembered more than those who stayed ___.", a: ["awake"], x: ["“Those who then sleep remember far more… than those who stay awake all night.”", "«من ينامون بعد ذلك يتذكرون أكثر بكثير… ممن يبقون مستيقظين طوال الليل»."] },
      { k: "gap", s: "Body clock: reset each day mainly by ___.", a: ["light"], x: ["“Food and exercise play a small part, but the main signal is light.”", "«للطعام والرياضة دور صغير، لكن الإشارة الرئيسية هي الضوء»."] },
      { k: "gap", s: "Screens give off ___ light, which delays melatonin.", a: ["blue"], x: ["“Phones, tablets and laptops give off blue light.”", "«الهواتف والأجهزة اللوحية والحواسيب تصدر ضوءًا أزرق»."] },
      { k: "gap", s: "Teenagers: body clock shifts later, so they may not feel ___ at ten o'clock.", a: ["sleepy"], x: ["“When teenagers say they're not sleepy at ten o'clock, they're usually telling the truth.”", "«عندما يقول المراهقون إنهم لا يشعرون بالنعاس في العاشرة فهم صادقون غالبًا»."] },
      { k: "gap", s: "Later school start: clearest improvement was in ___.", a: ["attendance"], x: ["Exam results improved “only slightly”; “the clearest change was in attendance”.", "تحسنت نتائج الاختبارات «قليلًا فقط»، و«أوضح تغيير كان في الحضور»."] },
      { k: "gap", s: "Long-term lack of sleep weakens the ___ system.", a: ["immune"], x: ["“A regular lack of sleep weakens the immune system.”", "«قلة النوم المستمرة تُضعف جهاز المناعة»."] },
      { k: "gap", s: "People short of sleep crave ___ foods.", a: ["sugary"], x: ["“They especially crave sugary foods.”", "«يشتهون الأطعمة السكرية خاصة»."] },
      { k: "gap", s: "Most useful habit: keep a regular ___, even at weekends.", a: ["schedule"], x: ["Warm drinks and long naps are distractors: “the research points to one habit above all: keeping a regular schedule”.", "المشروبات الدافئة والقيلولة الطويلة مشتتات: «تشير الأبحاث إلى عادة واحدة قبل كل شيء: الالتزام بجدول منتظم»."] }
    ]
  };

  // ---------------- Reading ----------------
  var R1 = {
    title: "The camel: built for the desert",
    paras: [
      "For thousands of years, people living in the deserts of Arabia and North Africa have depended on one animal more than any other. The camel has carried their goods across vast distances, provided milk, meat and wool, and served as a measure of a family's wealth. It is often called the “ship of the desert”, and the comparison is a fair one: few other animals can travel so far, in such heat, with so little water. Scientists who study the camel have found that this ability does not depend on a single trick, but on a remarkable combination of features, from its blood to its eyelashes.",
      "There are two main species. The dromedary, which has one hump, is found mainly in the Middle East, North Africa and parts of South Asia, and makes up the great majority of the world's camels. The Bactrian camel, which has two humps, lives in the cold, rocky deserts of Central Asia, where winter temperatures can fall far below freezing. A small population of wild Bactrian camels still survives, but almost all dromedaries today are domestic animals. Historians believe the dromedary was first domesticated in southern Arabia around three thousand years ago, and its arrival transformed trade across the region, allowing caravans to cross areas that had previously been impossible to reach.",
      "The best-known feature of the camel is also the most misunderstood. Many people still believe that the hump is a kind of water tank. In fact, it is a store of fat, which can weigh as much as 35 kilograms in a well-fed animal. When food is short, the camel breaks down this fat for energy, and the hump gradually shrinks and may even lean to one side. Storing fat in one place, rather than spreading it under the skin, has a second advantage: it allows heat to escape more easily from the rest of the body, helping the animal to stay cool.",
      "Water, rather than food, is the desert's greatest challenge, and here the camel is truly exceptional. Most mammals become seriously ill if they lose more than about 15 per cent of their body weight in water, but a camel can survive losing 30 per cent or more. Part of the secret lies in its blood. A camel's red blood cells are oval rather than round, which allows them to keep flowing even when the blood thickens through dehydration. When water does become available, a thirsty camel can drink over 100 litres in about ten minutes, an amount that would be dangerous for most other animals.",
      "Camels are also careful about how they lose water. On a hot day, a person cools down by sweating, but this uses up large amounts of water. A camel instead allows its body temperature to rise by as much as six degrees during the day, from around 34°C in the early morning to over 40°C in the afternoon. Only when it passes this upper limit does the animal begin to sweat. At night, it releases the stored heat into the cool desert air. Its kidneys and intestines are also highly efficient, removing so much water from waste that its droppings are dry enough to be used as fuel for fires.",
      "Other features protect the camel from sand and sun. Two rows of long eyelashes keep sand out of its eyes, and a thin third eyelid can move across each eye like a windscreen wiper. Its nostrils can close almost completely during sandstorms. Thick fur on its back, which might seem a strange choice for a desert animal, actually acts as insulation, blocking the sun's heat before it reaches the skin. Underneath, wide, leathery pads on its feet spread its weight across soft sand, so it sinks less than a horse or a donkey would. Even its mouth is adapted: a tough lining allows it to eat thorny desert plants that other animals avoid.",
      "In recent decades, the camel's role has changed. Lorries and roads have largely replaced the great caravans, and in many countries camels are now kept mainly for milk, racing and tourism. Yet interest in the animal is growing in unexpected places. Camel milk, which contains more vitamin C than cow's milk, is now sold in shops far from any desert, and some researchers believe that camels may become more important as the world's climate grows hotter and drier. The animal that once carried the trade of the ancient world may yet have a part to play in its future."
    ],
    groups: [
      { instr: ["Questions 1–7. Do the following statements agree with the information given in the passage? Choose TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, or NOT GIVEN if there is no information on this.", "الأسئلة 1–7. هل تتفق العبارات التالية مع المعلومات في النص؟ اختر TRUE إذا اتفقت، وFALSE إذا تعارضت، وNOT GIVEN إذا لم يذكر النص معلومات عنها."],
        items: [
          { k: "tfng", s: "The dromedary makes up most of the world's camel population.", a: "T", x: ["Paragraph 2: the dromedary “makes up the great majority of the world's camels”.", "الفقرة 2: الجمل العربي «يشكّل الغالبية العظمى من جمال العالم»."] },
          { k: "tfng", s: "Bactrian camels live in deserts that are hot throughout the year.", a: "F", x: ["Paragraph 2: they live in “cold, rocky deserts… where winter temperatures can fall far below freezing”.", "الفقرة 2: تعيش في «صحارى باردة صخرية… قد تنخفض حرارتها شتاءً كثيرًا تحت الصفر»."] },
          { k: "tfng", s: "The domestication of the dromedary allowed traders to reach new areas.", a: "T", x: ["Paragraph 2: it allowed “caravans to cross areas that had previously been impossible to reach”.", "الفقرة 2: سمح «للقوافل بعبور مناطق كان الوصول إليها مستحيلًا من قبل»."] },
          { k: "tfng", s: "Camels with large humps can travel faster than camels with small humps.", a: "NG", x: ["Paragraph 3 explains what the hump stores, but never links hump size to speed.", "تشرح الفقرة 3 ما يخزنه السنام، لكنها لا تربط حجمه بالسرعة أبدًا."] },
          { k: "tfng", s: "A camel starts to sweat as soon as its body temperature begins to rise.", a: "F", x: ["Paragraph 5: “Only when it passes this upper limit does the animal begin to sweat.”", "الفقرة 5: «لا يبدأ الحيوان بالتعرق إلا بعد أن يتجاوز هذا الحد الأعلى»."] },
          { k: "tfng", s: "Camel droppings can be burned.", a: "T", x: ["Paragraph 5: they are “dry enough to be used as fuel for fires”.", "الفقرة 5: «جافة بما يكفي لاستخدامها وقودًا للنار»."] },
          { k: "tfng", s: "Camel racing is now more popular than camel tourism.", a: "NG", x: ["Paragraph 7 lists racing and tourism together but never compares how popular they are.", "تذكر الفقرة 7 السباقات والسياحة معًا لكنها لا تقارن بين شعبيتهما."] }
        ] },
      { instr: ["Questions 8–13. Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.", "الأسئلة 8–13. أكمل الجمل التالية. اختر كلمتين على الأكثر من النص لكل إجابة."],
        items: [
          { k: "gap", s: "When food is short, the camel uses the fat in its hump for ___.", a: ["energy"], x: ["Paragraph 3: “the camel breaks down this fat for energy”.", "الفقرة 3: «يحلّل الجمل هذه الدهون للحصول على الطاقة»."] },
          { k: "gap", s: "Because a camel's red blood cells are ___, they keep flowing when the animal is dehydrated.", a: ["oval"], x: ["Paragraph 4: they are “oval rather than round, which allows them to keep flowing”.", "الفقرة 4: هي «بيضاوية لا دائرية، مما يسمح لها بمواصلة التدفق»."] },
          { k: "gap", s: "A thin ___ moves across the camel's eye like a windscreen wiper.", a: ["third eyelid"], x: ["Paragraph 6: “a thin third eyelid can move across each eye like a windscreen wiper”.", "الفقرة 6: «جفن ثالث رقيق يتحرك على كل عين مثل ماسحة الزجاج»."] },
          { k: "gap", s: "The thick fur on a camel's back works as ___ against the sun's heat.", a: ["insulation"], x: ["Paragraph 6: the fur “actually acts as insulation”.", "الفقرة 6: الفرو «يعمل في الواقع عازلًا»."] },
          { k: "gap", s: "The camel can eat thorny plants because its mouth has a ___.", a: ["tough lining"], x: ["Paragraph 6: “a tough lining allows it to eat thorny desert plants”.", "الفقرة 6: «بطانة قوية تسمح له بأكل النباتات الشوكية»."] },
          { k: "gap", s: "Camel milk has more ___ than cow's milk.", a: ["vitamin c"], x: ["Paragraph 7: camel milk “contains more vitamin C than cow's milk”.", "الفقرة 7: حليب الإبل «يحتوي على فيتامين C أكثر من حليب البقر»."] }
        ] }
    ]
  };

  var R2 = {
    title: "The rise of online learning",
    labels: true,
    heads: [
      { k: "i", s: "An old idea in a new form" },
      { k: "ii", s: "The high cost of building online platforms" },
      { k: "iii", s: "A crisis that revealed unequal access" },
      { k: "iv", s: "Lower fees for online students" },
      { k: "v", s: "The learners who benefit most" },
      { k: "vi", s: "Why so many learners give up" },
      { k: "vii", s: "How employers view online degrees" },
      { k: "viii", s: "A middle way between two models" }
    ],
    paras: [
      "The idea of learning without being in the same room as a teacher is much older than the internet. In the nineteenth century, students in several European countries could already enrol in correspondence courses, receiving lessons by post and sending back written work to be marked. During the twentieth century, radio and then television brought lectures into people's homes, and a number of countries set up “open” universities for adults who had missed the chance to study when they were younger. Such courses were especially valued in remote areas, where travelling to a college every week was simply not possible. What the internet changed was not the basic idea but its scale and speed. By the early 2000s, a student with a reliable connection could watch a lecture, submit an essay and receive feedback within days, from almost anywhere in the world.",
      "For many years, online study remained a minority choice, often seen as second best to attending a campus. That perception changed almost overnight in 2020, when the closure of schools and universities during the global pandemic forced hundreds of millions of learners to study from home. The shift was rarely smooth. Teachers who had never recorded a lecture had to learn new software in a matter of days, and many students discovered that a laptop and a kitchen table did not make a classroom. Families with several children often had to share a single computer, and many parents found themselves acting as part-time teachers. Above all, the sudden move exposed deep inequalities. Learners who lacked a reliable internet connection, a device of their own or a quiet place to work fell behind quickly, and in some regions a significant proportion of students could not take part at all.",
      "Yet the same period also showed what online learning does well. Its greatest strength is flexibility. Because many courses can be followed at any time of day, they suit people who must fit study around jobs or family responsibilities, and surveys consistently find that adults in full-time work are among the most satisfied online students. Distance is another factor: a student in a small town can now take a course taught by a specialist on another continent without the expense of moving. Recorded lectures bring a less obvious benefit as well. Students who are studying in a second language often say that the ability to pause and replay difficult explanations is what allows them to keep up. Lower fees are sometimes mentioned too, although the price of online and campus programmes at the same institution is often similar.",
      "The most persistent problem is completion. When free online courses, open to anyone, became popular in the early 2010s, some commentators predicted that they would make traditional universities unnecessary. Enrolment figures were certainly impressive, with single courses attracting tens of thousands of learners. However, the proportion who reached the end was often below ten per cent. Researchers who have studied these courses point to several causes. Without fixed deadlines, it is easy for learners to fall behind and then give up, and without classmates nearby, many feel isolated. Some learners, it should be said, never intended to finish: they enrolled to watch a few lectures on a topic that interested them and left once they had what they wanted. Interestingly, completion rates are far higher on courses that students have paid for, which suggests that motivation, rather than the technology itself, is a key issue.",
      "Today, few educators frame the question as a contest between online and face-to-face teaching. Instead, many institutions are moving towards what is often called blended learning, in which students watch short recorded explanations in their own time and then use class sessions for discussion, problem-solving and practical work. Supporters argue that this makes better use of the time teachers and students spend together, since a lecture that can be watched at home need not take up an hour of the timetable. Teachers can also see more clearly where individual students are struggling, because they spend class time working with them rather than talking at them. Critics warn that blended courses only work if students actually prepare before class, and that those who do not may fall even further behind. Even so, the direction of change seems clear. The debate is no longer about whether learning will happen online, but about how to combine the screen and the classroom in ways that help every student succeed."
    ],
    groups: [
      { instr: ["Questions 14–18. The passage has five paragraphs, A–E. Choose the correct heading for each paragraph from the list of headings. There are more headings than paragraphs, so you will not use them all.", "الأسئلة 14–18. يتكون النص من خمس فقرات من A إلى E. اختر العنوان المناسب لكل فقرة من القائمة. عدد العناوين أكثر من الفقرات، فلن تستخدمها كلها."],
        items: [
          { k: "head", p: "A", a: "i", x: ["Distance learning existed long before the internet; the internet changed “not the basic idea but its scale and speed”.", "التعلم عن بُعد موجود قبل الإنترنت بكثير، والإنترنت غيّر «حجمه وسرعته لا فكرته الأساسية»."] },
          { k: "head", p: "B", a: "iii", x: ["The 2020 closures forced learning online and “exposed deep inequalities”.", "الإغلاق في 2020 نقل التعليم إلى الإنترنت و«كشف عن تفاوت عميق»."] },
          { k: "head", p: "C", a: "v", x: ["The paragraph is about who gains: working adults, students far away and second-language learners. Lower fees (iv) is only a detail, and the writer says prices are “often similar”.", "الفقرة عن المستفيدين: العاملون، والبعيدون، ومتعلمو اللغة الثانية. الرسوم الأقل (iv) تفصيل فقط، والكاتب يقول إن الأسعار «متقاربة غالبًا»."] },
          { k: "head", p: "D", a: "vi", x: ["Completion is the problem: fewer than ten per cent often finish, because of missing deadlines, isolation and motivation.", "المشكلة هي إكمال الدورات: أقل من عشرة بالمئة يُكملون غالبًا بسبب غياب المواعيد النهائية والعزلة وضعف الدافع."] },
          { k: "head", p: "E", a: "viii", x: ["Blended learning combines online explanations with class time, a middle way between online and face-to-face teaching.", "التعلم المدمج يجمع الشرح المسجل والحصص الصفية، وهو طريق وسط بين التعليم الإلكتروني والحضوري."] }
        ] },
      { instr: ["Questions 19–22. Choose the correct letter, A, B, C or D.", "الأسئلة 19–22. اختر الحرف الصحيح: A أو B أو C أو D."],
        items: [
          { k: "mcq", s: "According to paragraph A, what did the internet change about distance learning?", o: ["It made it cheaper for students.", "It made it faster and much larger in scale.", "It replaced the open universities.", "It made it more popular with younger students."], a: 1, x: ["“What the internet changed was not the basic idea but its scale and speed.”", "«ما غيّره الإنترنت لم يكن الفكرة الأساسية بل حجمها وسرعتها»."] },
          { k: "mcq", s: "What does the writer say about the move online in 2020?", o: ["Most teachers were already well prepared.", "It made online study more popular than campus study.", "Some students were unable to participate at all.", "It went smoothly in most regions."], a: 2, x: ["“In some regions a significant proportion of students could not take part at all.” The shift “was rarely smooth”.", "«في بعض المناطق لم تتمكن نسبة كبيرة من الطلاب من المشاركة إطلاقًا»، ونادرًا ما كان التحول «سلسًا»."] },
          { k: "mcq", s: "According to surveys, which group is especially satisfied with online study?", o: ["Students living in small towns", "Students studying in a second language", "Students who have just left school", "Adults with full-time jobs"], a: 3, x: ["“Adults in full-time work are among the most satisfied online students.” The other groups are mentioned, but not in the surveys.", "«البالغون العاملون بدوام كامل من أكثر الطلاب رضًا». الفئات الأخرى مذكورة لكن ليس في الاستطلاعات."] },
          { k: "mcq", s: "What does the writer conclude from the higher completion rates on paid courses?", o: ["Motivation is an important factor.", "Free courses use poorer technology.", "Paid courses have easier content.", "Learners prefer fixed deadlines."], a: 0, x: ["It “suggests that motivation, rather than the technology itself, is a key issue”.", "هذا «يشير إلى أن الدافع، لا التقنية نفسها، عامل أساسي»."] }
        ] },
      { instr: ["Questions 23–26. Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.", "الأسئلة 23–26. أكمل الجمل التالية. اختر كلمتين على الأكثر من النص لكل إجابة."],
        items: [
          { k: "gap", s: "In nineteenth-century correspondence courses, students received their lessons by ___.", a: ["post"], x: ["Paragraph A: “receiving lessons by post”.", "الفقرة A: «يتلقون الدروس بالبريد»."] },
          { k: "gap", s: "Some commentators thought free online courses would make traditional universities ___.", a: ["unnecessary"], x: ["Paragraph D: they “predicted that they would make traditional universities unnecessary”.", "الفقرة D: «توقعوا أنها ستجعل الجامعات التقليدية غير ضرورية»."] },
          { k: "gap", s: "In blended learning, class sessions are used for discussion, problem-solving and ___.", a: ["practical work"], x: ["Paragraph E: “class sessions for discussion, problem-solving and practical work”.", "الفقرة E: «الحصص للنقاش وحل المشكلات والعمل التطبيقي»."] },
          { k: "gap", s: "Critics say blended courses only succeed if students ___ before class.", a: ["prepare", "actually prepare"], x: ["Paragraph E: “blended courses only work if students actually prepare before class”.", "الفقرة E: «لا ينجح التعلم المدمج إلا إذا استعد الطلاب فعلًا قبل الحصة»."] }
        ] }
    ]
  };

  var R3 = {
    title: "Can creativity be taught?",
    paras: [
      "Few qualities are praised as often as creativity. Employers list it among the skills they most want, governments call for more of it in schools, and parents worry that their children are not getting enough. Yet there is surprisingly little agreement about what creativity is, and even less about whether it can be taught. Each group seems to mean something slightly different by the word, from artistic talent to the ability to solve practical problems in new ways. In my view, much of the confusion comes from a stubborn myth: the idea that creativity is a rare gift, possessed by a few remarkable individuals and largely absent in everyone else.",
      "This myth has a long history. The image of the lonely genius, struck by inspiration in a sudden flash, appears in countless biographies of artists and scientists. It is an attractive story, but it is a misleading one. When researchers examine how important ideas actually develop, they rarely find a single moment of insight. Instead, they find long periods of preparation, many failed attempts and a great deal of conversation with other people. The “flash” that biographers celebrate is usually the final step in a process that took years.",
      "If creativity is a process rather than a gift, then at least parts of it should be learnable, and there is reasonable evidence that this is so. Studies of training programmes, in which participants practise techniques such as producing many possible solutions before judging any of them, generally report measurable improvements on tests of creative thinking. Critics are right to point out that many of these tests are narrow; asking someone to list unusual uses for a brick is hardly the same as composing a symphony. Nevertheless, the consistency of the results is difficult to dismiss, and I find it persuasive. Similar techniques are also used every day by designers and engineers, who would hardly rely on them if they made no difference.",
      "What, then, should teachers do? The most common answer is to give students more freedom, on the assumption that creativity flourishes when rules are removed. I believe this is only half right. Complete freedom can be paralysing: a student told to “write about anything” often produces less than one given a clear limit, such as a story of exactly fifty words. Constraints force people to search beyond their first, most obvious ideas. The role of the teacher is not simply to step back, but to design problems that are open enough to allow many answers and narrow enough to make a start possible.",
      "Knowledge matters too, although it is often treated as the enemy of creativity. It is sometimes claimed that schools destroy imagination by filling children's heads with facts. This argument seems to me deeply mistaken. New ideas are, almost always, new combinations of existing ones, and a person who knows little has little to combine. An engineer who designs an original bridge draws on years of knowledge about materials and forces; a poet who breaks the rules of a form must first know what the rules are. What damages creativity is not knowledge itself, but teaching that presents knowledge as a set of fixed answers to be memorised rather than as tools to be used.",
      "Perhaps the most neglected ingredient is the willingness to fail. Creative work involves producing many ideas, most of which will turn out to be poor. Students who are afraid of making mistakes, because every piece of work they produce is graded, quickly learn to play safe. They repeat what has worked before, choose the topics they know best and avoid the risky idea that might have been brilliant. Some schools have experimented with ungraded “draft” stages, in which pupils are rewarded for the number and variety of their attempts rather than their quality. It is too early to judge such schemes, and they may be difficult to introduce in education systems that rely heavily on examinations. But the principle behind them is sound.",
      "None of this means that everyone can become a great artist or inventor. Differences in ability, interest and opportunity are real, and no course will turn every student into a world-class composer. But the same is true of mathematics or music, and we do not conclude from this that those subjects cannot be taught. We accept that a good teacher can turn a weak mathematician into a competent one, and there is no obvious reason why creativity should be different. The question is not whether teaching can create genius, but whether it can help ordinary people become more creative than they would otherwise be. On the evidence available, the answer is yes, provided we stop waiting for inspiration and start treating creativity as a skill to be practised."
    ],
    groups: [
      { instr: ["Questions 27–31. Do the following statements agree with the claims of the writer? Choose YES if the statement agrees with the claims of the writer, NO if the statement contradicts the claims of the writer, or NOT GIVEN if it is impossible to say what the writer thinks about this.", "الأسئلة 27–31. هل تتفق العبارات التالية مع آراء الكاتب؟ اختر YES إذا اتفقت، وNO إذا تعارضت، وNOT GIVEN إذا كان من المستحيل معرفة رأي الكاتب في ذلك."],
        items: [
          { k: "ynng", s: "Most employers are satisfied with the creativity of the graduates they employ.", a: "NG", x: ["Paragraph 1 says employers “list it among the skills they most want”, but says nothing about whether they are satisfied.", "تقول الفقرة 1 إن أصحاب العمل «يضعونه ضمن أكثر المهارات التي يريدونها»، لكنها لا تذكر شيئًا عن رضاهم."] },
          { k: "ynng", s: "Creativity is a quality that only a small number of people possess.", a: "N", x: ["The writer calls this idea “a stubborn myth” (paragraph 1).", "يصف الكاتب هذه الفكرة بأنها «خرافة عنيدة» (الفقرة 1)."] },
          { k: "ynng", s: "Stories of sudden inspiration give a false picture of how ideas usually develop.", a: "Y", x: ["Paragraph 2: “It is an attractive story, but it is a misleading one.”", "الفقرة 2: «إنها قصة جذابة، لكنها مضللة»."] },
          { k: "ynng", s: "Creativity training is more effective for children than for adults.", a: "NG", x: ["Paragraph 3 discusses training programmes in general and never compares children with adults.", "تتحدث الفقرة 3 عن برامج التدريب عمومًا ولا تقارن بين الأطفال والكبار أبدًا."] },
          { k: "ynng", s: "Teachers should set tasks that include clear limits.", a: "Y", x: ["Paragraph 4: a student “given a clear limit” often produces more, and teachers should design problems “narrow enough to make a start possible”.", "الفقرة 4: الطالب الذي «يُعطى حدًا واضحًا» ينتج أكثر غالبًا، وعلى المعلم أن يصمم مسائل «محددة بما يكفي لتسهيل البداية»."] }
        ] },
      { instr: ["Questions 32–35. Choose the correct letter, A, B, C or D.", "الأسئلة 32–35. اختر الحرف الصحيح: A أو B أو C أو D."],
        items: [
          { k: "mcq", s: "What is the writer's view of studies on creativity training?", o: ["The results are too inconsistent to be trusted.", "The tests are narrow, but the results are still convincing.", "They prove that anyone can become a genius.", "Critics have found serious errors in them."], a: 1, x: ["Critics are right that the tests are narrow, “Nevertheless, the consistency of the results is difficult to dismiss, and I find it persuasive.”", "النقاد محقون في أن الاختبارات ضيقة، «ومع ذلك يصعب تجاهل اتساق النتائج، وأجدها مقنعة»."] },
          { k: "mcq", s: "Why does the writer mention “a story of exactly fifty words”?", o: ["To show that short pieces of writing are easier", "To criticise teachers who set strict rules", "To suggest that students should write more often", "To illustrate how a constraint can help students"], a: 3, x: ["It is an example of “a clear limit”, and “Constraints force people to search beyond their first, most obvious ideas.”", "إنه مثال على «حد واضح»، و«القيود تدفع الناس إلى البحث أبعد من أفكارهم الأولى الواضحة»."] },
          { k: "mcq", s: "According to the writer, what harms creativity?", o: ["Teaching knowledge as fixed answers to memorise", "Teaching children too many facts", "Studying subjects such as engineering", "Learning the rules of poetry"], a: 0, x: ["Paragraph 5: “What damages creativity is not knowledge itself, but teaching that presents knowledge as a set of fixed answers to be memorised.”", "الفقرة 5: «ما يضر الإبداع ليس المعرفة نفسها، بل تعليم يقدمها إجابات ثابتة للحفظ»."] },
          { k: "mcq", s: "What does the writer say about ungraded “draft” stages?", o: ["They have already raised exam results.", "They reward the quality of pupils' work.", "It is too soon to judge them, but the idea is right.", "They are easy to introduce in exam-based systems."], a: 2, x: ["Paragraph 6: “It is too early to judge such schemes… But the principle behind them is sound.”", "الفقرة 6: «من المبكر الحكم على هذه التجارب… لكن المبدأ الذي تقوم عليه سليم»."] }
        ] },
      { instr: ["Questions 36–40. Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.", "الأسئلة 36–40. أكمل الملخص التالي. اختر كلمة واحدة فقط من النص لكل إجابة."],
        items: [
          { k: "gap", s: "The writer argues that creativity is a ___ rather than a gift.", a: ["process"], x: ["Paragraph 3: “If creativity is a process rather than a gift…”", "الفقرة 3: «إذا كان الإبداع عملية لا موهبة…»"] },
          { k: "gap", s: "Important ideas usually come after long periods of ___, many failed attempts and much conversation.", a: ["preparation"], x: ["Paragraph 2: “long periods of preparation, many failed attempts”.", "الفقرة 2: «فترات طويلة من التحضير ومحاولات فاشلة كثيرة»."] },
          { k: "gap", s: "Knowledge is necessary, because new ideas are nearly always new ___ of existing ones.", a: ["combinations"], x: ["Paragraph 5: “New ideas are, almost always, new combinations of existing ones.”", "الفقرة 5: «الأفكار الجديدة تكون في الغالب تركيبات جديدة من أفكار موجودة»."] },
          { k: "gap", s: "Students also need to be willing to ___, since most ideas will be poor.", a: ["fail"], x: ["Paragraph 6: “the most neglected ingredient is the willingness to fail”.", "الفقرة 6: «أكثر العناصر إهمالًا هو الاستعداد للفشل»."] },
          { k: "gap", s: "Teaching cannot create genius, but creativity can improve if it is treated as a ___ to be practised.", a: ["skill"], x: ["Paragraph 7: “start treating creativity as a skill to be practised”.", "الفقرة 7: «أن نبدأ بالتعامل مع الإبداع كمهارة تُمارَس»."] }
        ] }
    ]
  };

  // ---------------- lesson ----------------
  var MOCK2 = {
    id: "mock2", order: 91, icon: "🏆", mins: 165, skill: "mock",
    t: ["Mock test 2", "الاختبار التجريبي 2"],
    d: ["A second full IELTS Academic test with all four sections and an estimated band.", "اختبار IELTS أكاديمي كامل ثانٍ بأقسامه الأربعة مع تقدير لدرجتك."],
    steps: [
      { t: "text", h: ["How this mock test works", "كيف يعمل هذا الاختبار التجريبي"], p: [
        ["The test has four sections, in the same order as the real exam: Listening (about 30 minutes, 4 parts, 40 questions), Reading (60 minutes, 3 passages, 40 questions), Writing (60 minutes, 2 tasks) and Speaking (11–14 minutes, 3 parts).", "يتكون الاختبار من أربعة أقسام بترتيب الاختبار الحقيقي نفسه: الاستماع (نحو 30 دقيقة، 4 أجزاء، 40 سؤالًا)، والقراءة (60 دقيقة، 3 نصوص، 40 سؤالًا)، والكتابة (60 دقيقة، مهمتان)، والمحادثة (11–14 دقيقة، 3 أجزاء)."],
        ["Listening and Reading are marked automatically. Your score out of 40 is converted to an approximate band.", "يُصحَّح الاستماع والقراءة تلقائيًا، وتُحوَّل درجتك من 40 إلى درجة IELTS تقريبية."],
        ["You mark Writing and Speaking yourself, using the band criteria: task response, coherence and cohesion, vocabulary and grammar for Writing; fluency, vocabulary, grammar and pronunciation for Speaking. Be honest, or the estimate won't help you.", "تقيّم الكتابة والمحادثة بنفسك وفق معايير الدرجات: الاستجابة للمهمة، والترابط والتماسك، والمفردات، والقواعد في الكتابة؛ والطلاقة، والمفردات، والقواعد، والنطق في المحادثة. كن صادقًا مع نفسك، وإلا فلن يفيدك التقدير."],
        ["Take it in one quiet sitting, as on test day: phone away, no dictionary, and headphones for Listening. In the real test, you hear each recording only once.", "أدّ الاختبار في جلسة واحدة هادئة كما في يوم الاختبار: أبعد هاتفك، ولا تستخدم قاموسًا، واستخدم سماعات للاستماع. في الاختبار الحقيقي تسمع كل تسجيل مرة واحدة فقط."],
        ["Your result is an estimate to guide your study, not an official IELTS score.", "نتيجتك تقدير يوجّه دراستك، وليست درجة IELTS رسمية."]] },
      { t: "mock" }
    ],
    mock: {
      listening: [L1, L2, L3, L4],
      reading: [R1, R2, R3],
      writing: {
        task1: {
          prompt: "The graph below shows the average amount of water used per person each day in three cities between 2000 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
          chart: { type: "line", title: "Average daily water use per person (litres), 2000–2025", unit: "L",
            labels: ["2000", "2005", "2010", "2015", "2020", "2025"],
            series: [
              { name: "City A", values: [310, 295, 270, 240, 215, 190] },
              { name: "City B", values: [150, 165, 185, 200, 205, 210] },
              { name: "City C", values: [220, 230, 225, 180, 170, 165] }
            ] } },
        task2: {
          prompt: "Some people believe that young people should take a year off between finishing school and starting university, for example to work or travel. Others think they should begin their university studies straight away. Discuss both these views and give your own opinion. Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words." }
      },
      speaking: {
        p1: [
          { topic: "Food", qs: ["What kind of food do you enjoy most?", "Do you prefer eating at home or eating out? Why?", "Is there any food you disliked as a child but enjoy now?", "Has the way people in your country eat changed in recent years?"] },
          { topic: "Weather", qs: ["What is the weather usually like where you live?", "Do you prefer hot weather or cool weather? Why?", "Does the weather ever change your plans?", "Is there a time of year you particularly look forward to?"] }
        ],
        card: {
          title: "Describe a person who taught you something important.",
          points: ["who this person is", "what they taught you", "how they taught it to you"],
          explain: "and explain why it was important to you.",
          p3: ["What makes someone a good teacher?", "Do people learn more from teachers or from their own experience?", "How has technology changed the role of teachers?", "Is it important for older people to keep learning new things? Why?"]
        }
      }
    }
  };

  (window.MasarokParts = window.MasarokParts || []).push({ course: "ielts", lessons: [MOCK2] });
})();

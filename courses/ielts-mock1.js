/* Masarok Academy · IELTS Academic · Mock test 1. Original Masarok practice material in official formats. */
(function () {
  "use strict";

  // ---------------- Listening ----------------
  var L_PART1 = {
    h: ["Listening · Part 1", "الاستماع · الجزء 1"],
    intro: ["Questions 1–10. A student is phoning a university sports centre. Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer. You will hear the recording once.", "الأسئلة 1–10. طالب يتصل بمركز رياضي جامعي. أكمل النموذج أدناه. اكتب كلمة واحدة و/أو رقمًا لكل إجابة. ستسمع التسجيل مرة واحدة."],
    plays: 1,
    names: { a: "Receptionist", b: "Caller" },
    lines: [
      ["a", "Good afternoon, Eastfield University Sports Centre. Hannah speaking. How can I help?"],
      ["b", "Oh, hello. I'm a student at the university, and I'd like to join the sports centre. Can I do that over the phone?"],
      ["a", "Yes, of course. I'll just take a few details, and then you can pay online. Could I start with your name?"],
      ["b", "Sure. My first name's Faisal, and my family name is Alotaibi."],
      ["a", "Could you spell the family name for me, please?"],
      ["b", "Yes, it's A, L, O, T, A, I, B, I."],
      ["a", "Thank you. And what's your student number?"],
      ["b", "It's four, one, nine, six, zero, two, three. Oh, sorry, no, I've mixed up the end. It's four, one, nine, six, zero, three, two."],
      ["a", "Four, one, nine, six, zero, three, two. Got it. Now, we have three types of membership: full membership, off-peak and weekends only."],
      ["b", "What's the difference between full and off-peak?"],
      ["a", "Full membership lets you use everything whenever we're open. Off-peak is the same, except that on weekdays you can only come in before four in the afternoon. At weekends there are no restrictions."],
      ["b", "Hmm. I was going to go for full membership, but most of my lectures are in the evenings this term, so I'm free in the mornings. Off-peak sounds better."],
      ["a", "Good choice. Off-peak is normally ninety-five pounds a term, but this month there's ten pounds off for new members, so you'd pay eighty-five."],
      ["b", "Great. And when could I start? I was hoping for the first of October."],
      ["a", "Ah, I'm afraid the whole centre is closed for floor repairs until the seventh. So the earliest you could start is the eighth of October."],
      ["b", "That's fine. The eighth, then."],
      ["a", "All new members need to do an induction session with one of our trainers, so you know how to use the equipment safely. We run them on Friday and Saturday mornings."],
      ["b", "Friday would be best for me."],
      ["a", "Let me check. Oh, I'm sorry, Friday's already fully booked. Saturday at ten still has places."],
      ["b", "OK, Saturday's fine."],
      ["a", "When you come for the induction, please bring a photo with you, passport size, so we can print your membership card."],
      ["b", "No problem. Do you need anything else?"],
      ["a", "Just the name of an emergency contact, someone we can call if you have an accident."],
      ["b", "That would be my cousin. His name's Yousef. That's Y, O, U, S, E, F."],
      ["a", "Lovely. And one last question, just for our records. How did you hear about the centre?"],
      ["b", "Well, a friend mentioned it once, but what actually made me call was a poster I saw in the library."],
      ["a", "That's good to know. Thanks, Faisal. I'll email you a link to pay, and we'll see you on Saturday."]
    ],
    form: "Sports centre membership form",
    items: [
      { k: "form", l: "Family name", a: ["alotaibi"], x: ["The caller spells it: A-L-O-T-A-I-B-I.", "يتهجّاه المتصل: A-L-O-T-A-I-B-I."] },
      { k: "form", l: "Student number", a: ["4196032"], x: ["He first says “…zero, two, three”, then corrects himself: “four, one, nine, six, zero, three, two”.", "يقول أولًا «…zero, two, three» ثم يصحّح نفسه: «four, one, nine, six, zero, three, two»."] },
      { k: "form", l: "Type of membership", a: ["off-peak", "off peak", "offpeak"], x: ["He was going to choose full membership, then changes his mind: “Off-peak sounds better.”", "كان ينوي اختيار العضوية الكاملة ثم غيّر رأيه: «Off-peak sounds better»."] },
      { k: "form", l: "Off-peak access: weekdays before … pm", a: ["4", "four"], x: ["“On weekdays you can only come in before four in the afternoon.”", "«في أيام الأسبوع يمكنك الدخول قبل الرابعة عصرًا فقط»."] },
      { k: "form", l: "Cost per term with new-member offer: £ …", a: ["85", "eighty-five"], x: ["Ninety-five pounds is the normal price. With ten pounds off, “you'd pay eighty-five”.", "خمسة وتسعون جنيهًا هو السعر المعتاد، ومع خصم عشرة جنيهات «ستدفع خمسة وثمانين»."] },
      { k: "form", l: "Start date: … October", a: ["8", "8th", "eighth"], x: ["He wanted the first, but the centre is closed until the seventh, so he starts on “the eighth of October”.", "أراد أن يبدأ في الأول، لكن المركز مغلق حتى السابع، فيبدأ في «الثامن من أكتوبر»."] },
      { k: "form", l: "Induction session: … at 10 am", a: ["saturday"], x: ["Friday is “fully booked”, but “Saturday at ten still has places”.", "يوم الجمعة «محجوز بالكامل»، أما «السبت الساعة العاشرة» ففيه أماكن."] },
      { k: "form", l: "Bring a passport-size …", a: ["photo", "photograph"], x: ["“Please bring a photo with you, passport size.”", "«أحضر معك صورة بمقاس صورة الجواز»."] },
      { k: "form", l: "Emergency contact (first name)", a: ["yousef"], x: ["“His name's Yousef. That's Y, O, U, S, E, F.”", "«اسمه يوسف، ويُكتب Y, O, U, S, E, F»."] },
      { k: "form", l: "Heard about the centre from: a … in the library", a: ["poster"], x: ["A friend mentioned it, but the form asks what he saw in the library: “a poster I saw in the library”.", "ذكره له صديق، لكن النموذج يسأل عمّا رآه في المكتبة: «a poster I saw in the library»."] }
    ]
  };

  var L_PART2 = {
    h: ["Listening · Part 2", "الاستماع · الجزء 2"],
    intro: ["Questions 11–20. You will hear a guide welcoming visitors to a science museum. Questions 11–15: choose the correct letter, A, B or C. Questions 16–20: label the plan of the ground floor. Choose the correct letter, A–G. You will hear the recording once.", "الأسئلة 11–20. ستسمع مرشدًا يرحّب بزوار متحف علوم. الأسئلة 11–15: اختر الحرف الصحيح A أو B أو C. الأسئلة 16–20: حدّد الأماكن على مخطط الطابق الأرضي باختيار الحرف الصحيح من A إلى G. ستسمع التسجيل مرة واحدة."],
    plays: 1,
    names: { a: "Guide" },
    lines: [
      ["a", "Good morning, everyone, and welcome to the Westbrook Museum of Science. My name's Daniel, and I'm one of the volunteer guides here. Before you start exploring, I'll give you a bit of background and explain where everything is."],
      ["a", "Many visitors assume this building was once a railway station, because of the big clock above the entrance. In fact, it was built as a textile factory in the eighteen-sixties, and the clock told the workers when their shifts began."],
      ["a", "The factory closed about seventy years ago, and the building stood empty for a long time before it was turned into a museum."],
      ["a", "Now, there's something new this year. We'd planned to open a rooftop café, but I'm afraid that's been delayed until next spring."],
      ["a", "What we have opened is a weather gallery, where you can stand in a wind tunnel and even make a small cloud."],
      ["a", "Our opening hours haven't changed, by the way. We're open from ten till five every day."],
      ["a", "You're welcome to take photos anywhere in the museum. The only thing I'd ask is that you please switch off your flash in the Space Gallery, because some of the old instruments there are sensitive to light."],
      ["a", "We also run free guided tours. They used to start every hour, but we've had fewer volunteers recently, so now there are just two a day, at eleven and at two. They leave from the information desk."],
      ["a", "If you have children with you, I'd strongly recommend the hands-on workshop in the Discovery Room. It's free, but places are limited, so book a time at the information desk as soon as possible, ideally before you go anywhere else."],
      ["a", "There are activity booklets for children too, but you can collect those any time from the gift shop, so there's no rush."],
      ["a", "Right, let's look at the plan of the ground floor. We're standing at the main entrance, at the bottom of the plan, and just in front of us is the information desk."],
      ["a", "First, the gift shop. As you come in through the main entrance, it's immediately on your right, so you can't miss it on your way out."],
      ["a", "Next, the cloakroom. If you've been here before, you may remember it on the left, just inside the entrance. That area is now the ticket office. The cloakroom has moved halfway along the left-hand wall, level with the lifts."],
      ["a", "The first-aid room is between the lifts and the main staircase, which is on the right-hand side of the building."],
      ["a", "For the café, walk past the lifts all the way to the back wall. You'll find it right there in the middle, directly behind the lifts."],
      ["a", "And finally, the Space Gallery, our most popular area, is in the far left-hand corner at the back. Please don't confuse it with the room in the far right-hand corner, which is for staff only."],
      ["a", "OK, that's everything. Enjoy your visit, and do ask any of the staff if you get lost."]
    ],
    map: {
      w: 320, h: 220,
      fixed: [
        { t: "Main entrance", x: 160, y: 212 },
        { t: "Information desk", x: 160, y: 176 },
        { t: "Lifts", x: 160, y: 108 },
        { t: "Stairs", x: 295, y: 108 }
      ],
      spots: [
        { k: "A", x: 55, y: 185 },
        { k: "B", x: 265, y: 185 },
        { k: "C", x: 55, y: 108 },
        { k: "D", x: 228, y: 108 },
        { k: "E", x: 55, y: 32 },
        { k: "F", x: 160, y: 32 },
        { k: "G", x: 265, y: 32 }
      ]
    },
    items: [
      { k: "mcq", s: "The museum building was originally", o: ["a railway station.", "a textile factory.", "a clock-making workshop."], a: 1, x: ["Visitors “assume” it was a railway station, but “it was built as a textile factory”.", "يظن الزوار أنه كان محطة قطار، لكنه «بُني مصنعًا للنسيج»."] },
      { k: "mcq", s: "What has opened at the museum this year?", o: ["a rooftop café", "a weather gallery", "longer opening hours"], a: 1, x: ["The rooftop café “has been delayed” and the hours “haven't changed”. “What we have opened is a weather gallery.”", "المقهى على السطح «تأجّل» والمواعيد «لم تتغير»، أما ما افتُتح فهو «معرض الطقس»."] },
      { k: "mcq", s: "What does the guide say about photography?", o: ["It is not allowed in the Space Gallery.", "Flash must not be used in one gallery.", "Visitors must ask staff for permission."], a: 1, x: ["Photos are allowed “anywhere”, but “please switch off your flash in the Space Gallery”.", "التصوير مسموح «في أي مكان»، لكن «أطفئ الفلاش في معرض الفضاء»."] },
      { k: "mcq", s: "Free guided tours now take place", o: ["every hour.", "twice a day.", "only at weekends."], a: 1, x: ["Tours “used to start every hour”, but “now there are just two a day”.", "كانت الجولات «تبدأ كل ساعة»، أما الآن «فهناك جولتان فقط يوميًا»."] },
      { k: "mcq", s: "What does the guide advise visitors with children to do first?", o: ["book a place on a workshop", "collect an activity booklet", "visit the Space Gallery"], a: 0, x: ["“Book a time at the information desk as soon as possible, ideally before you go anywhere else.” Booklets can be collected “any time”.", "«احجز موعدًا من مكتب الاستعلامات في أسرع وقت، ويُفضَّل قبل أن تذهب إلى أي مكان آخر». أما الكتيبات فيمكن أخذها «في أي وقت»."] },
      { k: "map", s: "Gift shop", a: "B", x: ["“As you come in through the main entrance, it's immediately on your right.”", "«عندما تدخل من المدخل الرئيسي تجده مباشرة على يمينك»."] },
      { k: "map", s: "Cloakroom", a: "C", x: ["It used to be on the left just inside the entrance (A, now the ticket office). Now it is “halfway along the left-hand wall, level with the lifts”.", "كانت سابقًا على اليسار بعد المدخل مباشرة (A، وهو الآن مكتب التذاكر)، وهي الآن «في منتصف الجدار الأيسر بمحاذاة المصاعد»."] },
      { k: "map", s: "First-aid room", a: "D", x: ["“Between the lifts and the main staircase.”", "«بين المصاعد والدرج الرئيسي»."] },
      { k: "map", s: "Café", a: "F", x: ["“Walk past the lifts all the way to the back wall… directly behind the lifts.”", "«امشِ متجاوزًا المصاعد حتى الجدار الخلفي… خلف المصاعد مباشرة»."] },
      { k: "map", s: "Space Gallery", a: "E", x: ["“In the far left-hand corner at the back.” The far right-hand corner (G) is for staff only.", "«في الزاوية البعيدة على اليسار في الخلف»، أما الزاوية البعيدة على اليمين (G) فللموظفين فقط."] }
    ]
  };

  var L_PART3 = {
    h: ["Listening · Part 3", "الاستماع · الجزء 3"],
    intro: ["Questions 21–30. Two students, Sara and Omar, are discussing their group project on rooftop gardens with their tutor. Questions 21–25: choose the correct letter, A, B or C. Questions 26–30: complete the notes. Write ONE WORD AND/OR A NUMBER for each answer. You will hear the recording once.", "الأسئلة 21–30. طالبان، سارة وعمر، يناقشان مع مشرفهما مشروعهما الجماعي عن حدائق الأسطح. الأسئلة 21–25: اختر الحرف الصحيح A أو B أو C. الأسئلة 26–30: أكمل الملاحظات بكلمة واحدة و/أو رقم لكل إجابة. ستسمع التسجيل مرة واحدة."],
    plays: 1,
    names: { a: "Sara", b: "Omar", c: "Dr Hughes" },
    lines: [
      ["c", "Come in, both of you. So, you wanted to talk about your group project on rooftop gardens. How's it going?"],
      ["a", "Quite well, I think. We've done most of the background reading, and we've started planning our survey."],
      ["c", "Good. Remind me, why did you choose this topic? It wasn't on my list of suggestions, was it?"],
      ["b", "No, it wasn't. We nearly chose one of yours, the one on solar panels, but then we noticed the garden on the roof of the new library and got curious."],
      ["a", "We see it every day from the café, and we wondered whether it really makes any difference to the building."],
      ["c", "Fair enough. Now, your survey. I've looked at the draft. Thirty students is a reasonable number for a project like this, and the questions are short and clear."],
      ["c", "But you're only asking students. I think you should also talk to the people who actually look after the buildings."],
      ["b", "You mean the building managers?"],
      ["c", "Exactly. They'll know about costs and practical problems that students won't."],
      ["a", "That makes sense. Practical problems came up a lot in our reading, actually. Most people assume the main issue is water, because the plants need so much of it."],
      ["b", "But the articles we read said that's usually manageable, with rainwater tanks. And we expected wind to be a problem, but apparently low walls around the edge solve that."],
      ["a", "The real difficulty is weight. Wet soil is incredibly heavy, and a lot of older roofs simply can't support it."],
      ["c", "Yes, that's why so many rooftop gardens are on new buildings. What about your case study? You mentioned a city in northern Europe."],
      ["b", "Yes. It requires green roofs on all new flat-roofed buildings. I think it's a great model."],
      ["a", "It is, but it rains there most of the year. In a hot, dry climate like ours, the plants would need far more care. So we should be careful about saying other cities should simply copy it."],
      ["c", "That's a good point, and exactly the kind of critical thinking I want to see. Speaking of the presentation, please don't try to cover every type of green roof."],
      ["c", "Pick one building and look at it in depth. Your survey results can support that, but they shouldn't be the whole presentation."],
      ["b", "So should we use the library roof?"],
      ["c", "Yes. Before you go up there, though, you'll need permission. Speak to the maintenance team. They hold the keys to the roof."],
      ["a", "We'd like to compare the temperature under the garden with an ordinary roof. Is there any equipment we could borrow?"],
      ["c", "The physics department has some small temperature sensors. Ask the lab technician, and he'll show you how they work."],
      ["b", "I also want to find out which plants are best. I read that grasses are common, but they need quite deep soil."],
      ["a", "Herbs might be better. Lots of them grow well in shallow soil, and the café could even use them."],
      ["c", "Lovely idea. Now, timing. Last year groups had twenty minutes, but there are more groups this year, so it's fifteen, plus five minutes for questions."],
      ["a", "And when do you need our slides?"],
      ["c", "Let's say Wednesday. Actually, no, I'm away on Wednesday. Thursday is fine, as long as it's before midday."],
      ["b", "Thursday before midday. Great, thanks very much."]
    ],
    form: "Next steps",
    items: [
      { k: "mcq", s: "Why did the students choose rooftop gardens as their topic?", o: ["It was on the tutor's list of suggestions.", "They had noticed one on a campus building.", "Omar had worked on a garden before."], a: 1, x: ["They nearly chose solar panels from the tutor's list, “but then we noticed the garden on the roof of the new library”.", "كادا يختاران موضوع الألواح الشمسية من قائمة المشرف، «لكننا لاحظنا الحديقة على سطح المكتبة الجديدة»."] },
      { k: "mcq", s: "What does the tutor say about the survey?", o: ["The number of students is too small.", "Some questions are too long.", "It should include building managers."], a: 2, x: ["Thirty is “a reasonable number” and the questions are “short and clear”, but “you should also talk to the people who actually look after the buildings”.", "العدد ثلاثون «مناسب» والأسئلة «قصيرة وواضحة»، لكن «عليكما أن تتحدثا أيضًا مع من يعتنون بالمباني فعلًا»."] },
      { k: "mcq", s: "According to the students' reading, the biggest problem with rooftop gardens is", o: ["the amount of water they need.", "the weight of the soil.", "damage from strong winds."], a: 1, x: ["Water is “usually manageable” and low walls solve the wind problem. “The real difficulty is weight.”", "مشكلة الماء «يمكن التعامل معها عادةً» والجدران المنخفضة تحل مشكلة الرياح، أما «الصعوبة الحقيقية فهي الوزن»."] },
      { k: "mcq", s: "What is Sara's opinion of the case study city?", o: ["Other cities could easily copy its rules.", "Its climate makes it a special case.", "Its gardens are poorly looked after."], a: 1, x: ["Omar calls it “a great model”, but Sara says “it rains there most of the year”, so other cities should not “simply copy it”.", "يراه عمر «نموذجًا رائعًا»، لكن سارة تقول إن «المطر يهطل هناك معظم العام»، فلا ينبغي للمدن الأخرى أن «تنسخه ببساطة»."] },
      { k: "mcq", s: "The tutor advises the students to", o: ["compare several types of green roof.", "focus on one building in detail.", "base the presentation on their survey results."], a: 1, x: ["“Pick one building and look at it in depth.” The survey “shouldn't be the whole presentation”.", "«اختارا مبنى واحدًا وادرساه بعمق»، والاستبيان «لا ينبغي أن يكون العرض كله»."] },
      { k: "gap", s: "Ask the ___ team for permission to go on the library roof.", a: ["maintenance"], x: ["“Speak to the maintenance team. They hold the keys to the roof.”", "«تحدّثا مع فريق الصيانة، فمفاتيح السطح لديهم»."] },
      { k: "gap", s: "Borrow temperature ___ from the physics department.", a: ["sensors"], x: ["“The physics department has some small temperature sensors.”", "«لدى قسم الفيزياء أجهزة استشعار صغيرة لقياس الحرارة»."] },
      { k: "gap", s: "Find out which ___ grow well in shallow soil.", a: ["herbs"], x: ["Grasses “need quite deep soil”, but “herbs might be better. Lots of them grow well in shallow soil.”", "الأعشاب النجيلية «تحتاج تربة عميقة»، أما «الأعشاب العطرية فقد تكون أفضل، وكثير منها ينمو جيدًا في التربة الضحلة»."] },
      { k: "gap", s: "Presentation length: ___ minutes, plus 5 minutes for questions.", a: ["15", "fifteen"], x: ["Last year it was twenty minutes. This year “it's fifteen, plus five minutes for questions”.", "كانت المدة العام الماضي عشرين دقيقة، وهذا العام «خمس عشرة دقيقة، إضافة إلى خمس دقائق للأسئلة»."] },
      { k: "gap", s: "Send the slides to the tutor by ___, before midday.", a: ["thursday"], x: ["He first says Wednesday, then changes it: “Thursday is fine, as long as it's before midday.”", "يقول أولًا الأربعاء ثم يغيّر رأيه: «الخميس مناسب، بشرط أن يكون قبل الظهر»."] }
    ]
  };

  var L_PART4 = {
    h: ["Listening · Part 4", "الاستماع · الجزء 4"],
    intro: ["Questions 31–40. You will hear part of a lecture on how honeybees communicate. Complete the notes. Write ONE WORD ONLY for each answer. You will hear the recording once.", "الأسئلة 31–40. ستسمع جزءًا من محاضرة عن طرق التواصل لدى نحل العسل. أكمل الملاحظات بكلمة واحدة فقط لكل إجابة. ستسمع التسجيل مرة واحدة."],
    plays: 1,
    names: { a: "Lecturer" },
    lines: [
      ["a", "Good morning. In today's lecture on animal behaviour, I'm going to look at one of the most remarkable communication systems in nature: the way honeybees tell each other where to find food."],
      ["a", "A honeybee colony depends on a small group of older workers called scouts. Their job is to fly out, find flowers rich in nectar or pollen, then come back and recruit other bees to collect it."],
      ["a", "Recruitment happens through a kind of dance. The scout performs it on the vertical surface of the honeycomb, usually quite close to the entrance of the hive."],
      ["a", "Now, you might imagine the other bees watching the dance. But the inside of a hive is almost completely dark, so the followers get the information mainly through touch, keeping their antennae in contact with the dancer."],
      ["a", "There are two main types of dance. When food is very close to the hive, the scout performs what's called the round dance, simply circling first one way and then the other."],
      ["a", "The round dance gives no direction; it just says there's food nearby. It was once thought that recruits used the colour of the pollen the scout carried, but in fact they rely on the scent that clings to her body."],
      ["a", "For food that's further away, the scout uses the waggle dance. She runs in a straight line while shaking her body from side to side, then loops back and repeats the run."],
      ["a", "The direction of that straight run is the clever part. Its angle compared with straight up on the comb matches the angle between the food and the sun. So a run straight upwards means: fly towards the sun."],
      ["a", "Early researchers believed that the speed of the dance showed how far away the food was. We now know it's the length of the waggle run that matters. The longer it lasts, the greater the distance."],
      ["a", "The dance also tells recruits how good a source is. A scout that has found plenty of high-quality nectar repeats her dance many more times, and with more energy, than one that has found a few poor flowers."],
      ["a", "What's puzzling is that the sun moves across the sky during the day. Yet scouts that have been in the hive for hours still dance at the right angle. This suggests that bees have an internal clock that lets them adjust."],
      ["a", "Bees don't only share good news. A forager that has been attacked at a feeding site, by a spider, say, may give what's known as a stop signal."],
      ["a", "She pushes her head against a dancing bee and produces a short vibration. After receiving several of these, the dancer usually stops, and fewer bees are sent to the dangerous site."],
      ["a", "Bees also communicate with chemicals called pheromones. When a guard bee stings, for example, it releases an alarm pheromone. To humans it smells rather like bananas, and it quickly makes other bees more aggressive."],
      ["a", "So how do we know all this? For decades, researchers watched bees through glass-walled hives. More recently, scientists have built small robotic bees that can perform a dance, to test exactly which signals real bees respond to."],
      ["a", "Next week, we'll look at how ants use chemical trails, and compare the two systems."]
    ],
    form: "How honeybees communicate",
    items: [
      { k: "gap", s: "Scouts dance on the vertical surface of the ___ near the hive entrance.", a: ["honeycomb"], x: ["“The scout performs it on the vertical surface of the honeycomb.”", "«تؤديها الكشّافة على السطح العمودي لقرص العسل»."] },
      { k: "gap", s: "Because the hive is dark, followers receive the information mainly through ___.", a: ["touch"], x: ["Not by watching: “the followers get the information mainly through touch”.", "ليس بالمشاهدة، بل «تتلقى المتابِعات المعلومات أساسًا عن طريق اللمس»."] },
      { k: "gap", s: "Round dance: recruits identify the flower from the ___ on the dancer's body.", a: ["scent"], x: ["Colour of the pollen was the old idea; “they rely on the scent that clings to her body”.", "لون حبوب اللقاح كان اعتقادًا قديمًا، أما الحقيقة فهي أنها «تعتمد على الرائحة العالقة بجسمها»."] },
      { k: "gap", s: "Waggle dance: the angle of the run shows the direction of the food in relation to the ___.", a: ["sun"], x: ["The angle “matches the angle between the food and the sun”.", "الزاوية «تطابق الزاوية بين الطعام والشمس»."] },
      { k: "gap", s: "The length of the waggle run shows the ___ to the food.", a: ["distance"], x: ["Not the speed: “The longer it lasts, the greater the distance.”", "ليست السرعة، بل «كلما طال، زادت المسافة»."] },
      { k: "gap", s: "More repetitions and energy mean a source of higher ___.", a: ["quality"], x: ["A scout with “high-quality nectar repeats her dance many more times, and with more energy”.", "الكشّافة التي وجدت «رحيقًا عالي الجودة تكرر رقصتها مرات أكثر وبنشاط أكبر»."] },
      { k: "gap", s: "Bees adjust for the sun's movement, which suggests they have an internal ___.", a: ["clock"], x: ["“This suggests that bees have an internal clock that lets them adjust.”", "«هذا يشير إلى أن لدى النحل ساعة داخلية تتيح له التكيّف»."] },
      { k: "gap", s: "Stop signal: a bee pushes its head against a dancer and makes a short ___.", a: ["vibration"], x: ["“She pushes her head against a dancing bee and produces a short vibration.”", "«تدفع رأسها نحو نحلة راقصة وتُصدر اهتزازًا قصيرًا»."] },
      { k: "gap", s: "The alarm pheromone smells similar to ___ to humans.", a: ["bananas"], x: ["“To humans it smells rather like bananas.”", "«رائحتها بالنسبة للبشر تشبه رائحة الموز»."] },
      { k: "gap", s: "Today, scientists use small ___ bees to test which signals real bees respond to.", a: ["robotic"], x: ["Glass-walled hives were used “for decades”; “more recently, scientists have built small robotic bees”.", "استُخدمت الخلايا ذات الجدران الزجاجية «لعقود»، و«مؤخرًا صنع العلماء نحلًا آليًا صغيرًا»."] }
    ]
  };

  // ---------------- Reading ----------------
  var R_PASS1 = {
    title: "The long history of salt",
    paras: [
      "Today salt is so cheap that most people hardly notice it. In many countries a kilogram costs less than a cup of coffee, and a container of it sits in almost every kitchen. For most of human history, however, salt was a precious substance. Cities grew wealthy by producing it, roads were built to carry it, and rulers depended on the money it raised. To understand why, we need to look at what salt did for people before the modern age.",
      "The human body cannot function without salt. It helps to control the balance of water in our cells and allows nerves and muscles to work properly. Early hunters obtained all the salt they needed from the meat they ate, so they had little reason to look for it. This changed when people began to farm. A diet based on grain contains far less salt than one based on meat, and the cattle, sheep and goats that farmers kept needed salt too. Settled communities therefore had to find a reliable supply, and the search for salt influenced where many early villages were built.",
      "Even more important than diet was the role salt played in preserving food. Before refrigeration, meat and fish began to spoil within days. Salt draws water out of food, and the bacteria that cause decay cannot survive without water. Fish packed in salt could last for many months, which allowed sailors to make long voyages and armies to travel far from home. Vegetables, cheese and olives were preserved in the same way. Along the coasts of northern Europe, entire towns depended on catching herring and salting them in barrels for sale inland.",
      "People developed three main ways of producing salt, depending on where they lived. In hot, dry coastal regions, seawater was let into shallow ponds, where the sun and wind slowly evaporated it. The crystals left behind were then raked by hand into heaps to dry. The process was cheap but slow, and a single pond could take several weeks to produce a harvest. In cooler and wetter places, workers boiled salty water from natural springs in clay pots or large iron pans. This method was faster, but it required enormous amounts of fuel, and in some regions the demand for firewood led to the loss of whole forests. The third method was mining. In many parts of the world, layers of rock salt lie underground, left behind when ancient seas dried up millions of years ago. Miners cut into these layers by hand, and some mines eventually extended for many kilometres.",
      "Because salt could be produced only in certain places, it had to be moved over long distances, and trade routes developed to carry it. In West Africa, camel caravans crossed the Sahara carrying large slabs of salt from desert mines to markets in the south, where it was exchanged for gold, cloth and other goods. In ancient Rome, salt was so valued that soldiers were sometimes given an allowance to buy it. It is often claimed that the English word ‘salary’ comes from this practice, but language historians have found little firm evidence to support the idea.",
      "Rulers soon realised that salt was ideal for taxation. Everyone needed it, and because it came from a limited number of sites, its production was easy to control. In ancient China, the state took control of salt production for long periods, and the income helped to pay for armies and canals. In other countries, salt taxes were raised so high that ordinary families struggled to afford enough to preserve their food. Not surprisingly, smuggling was widespread, and governments employed large numbers of officials to stop it.",
      "The importance of salt began to decline in the nineteenth century. Geologists discovered vast underground deposits, and new techniques, such as pumping water down into salt beds and bringing the salty liquid back to the surface, made production far cheaper. At the same time, canning and later refrigeration meant that salt was no longer essential for keeping food. Today, only a small proportion of the salt produced worldwide is eaten. Much more is used by the chemical industry to make products such as glass, paper and soap, while large quantities are spread on roads in winter to melt ice. Perhaps the greatest irony is that a substance people once struggled to obtain is now one that doctors warn us to eat less of."
    ],
    groups: [
      { instr: ["Questions 1–7. Do the following statements agree with the information in the passage? Choose TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, or NOT GIVEN if there is no information on this.", "الأسئلة 1–7. هل تتفق العبارات التالية مع المعلومات في النص؟ اختر TRUE إذا اتفقت العبارة مع المعلومات، وFALSE إذا ناقضتها، وNOT GIVEN إذا لم تتوفر معلومات عنها."],
        items: [
          { k: "tfng", s: "Early hunters had to add salt to the food they ate.", a: "F", x: ["Hunters “obtained all the salt they needed from the meat they ate, so they had little reason to look for it”.", "حصل الصيادون على «كل الملح الذي احتاجوه من اللحم الذي أكلوه، فلم يكن لديهم سبب يُذكر للبحث عنه»."] },
          { k: "tfng", s: "Farm animals as well as people needed a supply of salt.", a: "T", x: ["“The cattle, sheep and goats that farmers kept needed salt too.”", "«الأبقار والأغنام والماعز التي ربّاها المزارعون احتاجت الملح أيضًا»."] },
          { k: "tfng", s: "Salt prevents decay by removing the water that bacteria need.", a: "T", x: ["“Salt draws water out of food, and the bacteria that cause decay cannot survive without water.”", "«يسحب الملح الماء من الطعام، والبكتيريا المسببة للتلف لا تعيش دون ماء»."] },
          { k: "tfng", s: "Salted fish was sold at a higher price than fresh fish.", a: "NG", x: ["The passage says salted fish lasted for months, but it never compares prices.", "يذكر النص أن السمك المملّح كان يدوم شهورًا، لكنه لا يقارن الأسعار أبدًا."] },
          { k: "tfng", s: "In some areas, boiling salt water caused forests to disappear.", a: "T", x: ["“In some regions the demand for firewood led to the loss of whole forests.”", "«في بعض المناطق أدى الطلب على الحطب إلى زوال غابات كاملة»."] },
          { k: "tfng", s: "There is strong evidence that the word ‘salary’ comes from Roman soldiers' salt allowance.", a: "F", x: ["“Language historians have found little firm evidence to support the idea.”", "«لم يجد مؤرخو اللغة إلا القليل من الأدلة الثابتة على هذه الفكرة»."] },
          { k: "tfng", s: "People caught smuggling salt were given severe punishments.", a: "NG", x: ["Smuggling was “widespread” and officials tried “to stop it”, but punishments are not mentioned.", "كان التهريب «منتشرًا» وحاول المسؤولون «إيقافه»، لكن النص لا يذكر العقوبات."] }
        ] },
      { instr: ["Questions 8–13. Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.", "الأسئلة 8–13. أكمل الجمل أدناه. اختر من النص كلمتين على الأكثر لكل إجابة."],
        items: [
          { k: "gap", s: "In hot, dry coastal areas, seawater was evaporated in shallow ___.", a: ["ponds"], x: ["“Seawater was let into shallow ponds, where the sun and wind slowly evaporated it.”", "«كانت مياه البحر تُدخَل إلى أحواض ضحلة حيث تبخّرها الشمس والرياح ببطء»."] },
          { k: "gap", s: "The crystals were raked into heaps by ___ before they dried.", a: ["hand"], x: ["“The crystals left behind were then raked by hand into heaps to dry.”", "«ثم كانت البلورات المتبقية تُجمع يدويًا في أكوام لتجف»."] },
          { k: "gap", s: "Rock salt was formed when ancient ___ dried up.", a: ["seas"], x: ["Rock salt was “left behind when ancient seas dried up millions of years ago”.", "الملح الصخري «تخلّف عندما جفّت بحار قديمة قبل ملايين السنين»."] },
          { k: "gap", s: "In West Africa, salt was carried across the Sahara by ___.", a: ["camel caravans", "caravans"], x: ["“Camel caravans crossed the Sahara carrying large slabs of salt.”", "«عبرت قوافل الجمال الصحراء الكبرى حاملة ألواحًا كبيرة من الملح»."] },
          { k: "gap", s: "In ancient China, income from salt helped to pay for armies and ___.", a: ["canals"], x: ["“The income helped to pay for armies and canals.”", "«ساعد الدخل على تمويل الجيوش والقنوات»."] },
          { k: "gap", s: "Today, more salt is used by the ___ than is eaten.", a: ["chemical industry"], x: ["Only “a small proportion” is eaten; “much more is used by the chemical industry”.", "لا يؤكل إلا «جزء صغير»، و«تستخدم الصناعة الكيميائية كمية أكبر بكثير»."] }
        ] }
    ]
  };

  var R_PASS2 = {
    title: "Why cities are planting trees",
    labels: true,
    heads: [
      { k: "i", s: "Paying for flood damage after storms" },
      { k: "ii", s: "Lowering the temperature of city streets" },
      { k: "iii", s: "Helping cities cope with heavy rain" },
      { k: "iv", s: "A widely made claim that needs qualifying" },
      { k: "v", s: "The danger of depending on one kind of tree" },
      { k: "vi", s: "Planting is only the first step" },
      { k: "vii", s: "Growing fruit and vegetables in city parks" },
      { k: "viii", s: "Watching urban heat from space" }
    ],
    paras: [
      "Across the world, city governments have announced ambitious tree-planting programmes, some promising to plant a million trees within a decade. Not long ago, urban trees were regarded mainly as decoration: pleasant to look at, but among the first things to be cut when budgets were tight. Today, planners increasingly describe them as infrastructure, as essential to a working city as roads, pipes and power lines. Residents, too, value green streets, and studies have linked views of trees to lower levels of stress. Behind this change in attitude lies a growing body of research into what trees actually do for the people who live among them.",
      "The most immediate benefit is cooling. Concrete, asphalt and brick absorb heat during the day and release it slowly at night, so city centres can be several degrees warmer than the surrounding countryside, an effect known as the urban heat island. Trees reduce this in two ways. Their leaves block sunlight before it reaches the ground, and they release water vapour through tiny openings in their leaves, a process that cools the surrounding air in much the same way that sweat cools the skin. Satellite images taken on summer afternoons show the difference clearly, with tree-lined neighbourhoods appearing as cool patches among car parks and shopping centres. At street level, the surface of a shaded pavement can be more than fifteen degrees cooler than one in full sun. As heatwaves become more frequent, this shade is increasingly seen as a matter of public health, particularly for elderly people, who are most at risk during extreme heat.",
      "Trees also help cities deal with heavy rain. In a city, most rain falls on hard surfaces and runs straight into drains, which can quickly become overwhelmed during a storm. A large tree, by contrast, catches a significant amount of rain on its leaves and branches, and some of this evaporates before it ever reaches the ground. Its roots also open up channels that allow water to soak into the soil rather than flowing across it. Engineers in one coastal city calculated that planting trees along its main streets would reduce flooding almost as effectively as replacing the drains with larger ones, at a fraction of the cost. For councils facing more intense storms, such comparisons are difficult to ignore.",
      "Many tree-planting campaigns also promise cleaner air, but here the evidence is more complicated than the advertisements suggest. Leaves do capture small particles of pollution, and some species are better at this than others. However, the overall effect on air quality across a whole city is usually modest. In narrow streets lined with tall buildings, a thick canopy of leaves can even make matters worse, because it acts like a roof, trapping vehicle fumes close to the ground, where people breathe them. Researchers therefore argue that trees should be planted with care on busy roads, and that they are no substitute for reducing traffic itself. Low hedges between the road and the pavement, for example, may protect pedestrians more effectively than a row of large trees.",
      "Choosing which trees to plant is another challenge. In the twentieth century, many cities lined their streets with a single fashionable species, only to see thousands of trees killed when a disease arrived that affected that species alone. In some places, whole avenues of elm trees disappeared within a few years. The lesson has been learnt, and many urban foresters now follow a rule that no single species should make up more than a tenth of a city's trees. Planners must also think about the future climate. A tree planted today may live for a hundred years, so it needs to survive the hotter summers and longer periods of drought that scientists expect, not just the conditions of the present.",
      "Finally, there is the question of what happens after the trees are in the ground. Planting a young tree attracts attention and makes a good photograph for local politicians, but the tree is at its most vulnerable during the next three years. Without regular watering through its first summers, it is likely to die, and in some cities a third or more of newly planted trees fail to survive. The problem is often financial: money is set aside for planting, but not for maintenance. Some councils have responded by asking residents to adopt a tree outside their home and water it during dry spells, while others have reduced the number of trees they plant each year so that they can look after them properly. Either way, the success of a programme is better measured by how many trees are still alive a decade later than by how many were planted."
    ],
    groups: [
      { instr: ["Questions 14–18. The passage has six paragraphs, A–F. Choose the correct heading for paragraphs B–F from the list of headings. There are more headings than paragraphs, so you will not use them all.", "الأسئلة 14–18. يتكون النص من ست فقرات من A إلى F. اختر العنوان الصحيح للفقرات من B إلى F من قائمة العناوين. عدد العناوين أكبر من عدد الفقرات، فلن تستخدمها كلها."],
        items: [
          { k: "head", p: "B", a: "ii", x: ["The paragraph explains how trees cool streets, through shade and water vapour. The satellite images are only one detail, so viii is the trap.", "تشرح الفقرة كيف تبرّد الأشجار الشوارع بالظل وبخار الماء. صور الأقمار الصناعية مجرد تفصيل، فالعنوان viii هو الفخ."] },
          { k: "head", p: "C", a: "iii", x: ["Trees catch rain and help it “soak into the soil”, reducing flooding. Cost is mentioned only for drains, not for flood damage, so i is the trap.", "تلتقط الأشجار المطر وتساعده على «التسرّب إلى التربة» فتقلل الفيضانات. التكلفة مذكورة للمصارف فقط لا لأضرار الفيضانات، فالعنوان i هو الفخ."] },
          { k: "head", p: "D", a: "iv", x: ["The claim of “cleaner air” is “more complicated than the advertisements suggest”: the effect is modest and can even be negative.", "ادعاء «الهواء الأنظف» «أعقد مما توحي به الإعلانات»، فالأثر محدود وقد يكون سلبيًا أحيانًا."] },
          { k: "head", p: "E", a: "v", x: ["Cities planted “a single fashionable species” and lost thousands of trees to one disease, so now no species should be more than a tenth.", "زرعت المدن «نوعًا واحدًا رائجًا» فخسرت آلاف الأشجار بمرض واحد، ولذلك لا ينبغي اليوم أن يتجاوز أي نوع العُشر."] },
          { k: "head", p: "F", a: "vi", x: ["The paragraph is about “what happens after the trees are in the ground”: watering, maintenance and survival.", "الفقرة عمّا «يحدث بعد غرس الأشجار»: الري والصيانة وبقاؤها حية."] }
        ] },
      { instr: ["Questions 19–22. Choose the correct letter, A, B, C or D.", "الأسئلة 19–22. اختر الحرف الصحيح A أو B أو C أو D."],
        items: [
          { k: "mcq", s: "According to paragraph A, how do many planners now regard urban trees?", o: ["as decoration that can be cut when money is short", "as a basic part of a city's infrastructure", "as a way of attracting tourists", "as less important than roads and pipes"], a: 1, x: ["“Planners increasingly describe them as infrastructure, as essential to a working city as roads, pipes and power lines.”", "«يصفها المخططون بشكل متزايد بأنها بنية تحتية، ضرورية للمدينة كالطرق والأنابيب وخطوط الكهرباء»."] },
          { k: "mcq", s: "Trees cool the air around them partly by", o: ["reflecting sunlight back into the sky.", "releasing water vapour from their leaves.", "storing heat and releasing it at night.", "reducing the number of cars on the road."], a: 1, x: ["They “release water vapour through tiny openings in their leaves, a process that cools the surrounding air”. Storing heat is what concrete does.", "إنها «تطلق بخار الماء من فتحات دقيقة في أوراقها، وهي عملية تبرّد الهواء المحيط». أما تخزين الحرارة فهو ما تفعله الخرسانة."] },
          { k: "mcq", s: "What does the writer say about large trees in narrow streets with tall buildings?", o: ["They capture most of the pollution from vehicles.", "They should be replaced with tall hedges.", "They can trap traffic fumes at ground level.", "They grow more slowly than trees in open areas."], a: 2, x: ["A thick canopy “acts like a roof, trapping vehicle fumes close to the ground”. The hedges mentioned are low, not tall.", "الغطاء الكثيف «يعمل كالسقف فيحبس عوادم السيارات قرب الأرض». والسياج المذكور منخفض لا مرتفع."] },
          { k: "mcq", s: "What does the writer suggest is the best way to judge a tree-planting programme?", o: ["the number of trees planted each year", "the amount of money spent on planting", "the number of residents who take part", "how many trees are still alive after ten years"], a: 3, x: ["Success “is better measured by how many trees are still alive a decade later than by how many were planted”.", "النجاح «يُقاس بعدد الأشجار التي بقيت حية بعد عشر سنوات أكثر من عدد ما زُرع»."] }
        ] },
      { instr: ["Questions 23–26. Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.", "الأسئلة 23–26. أكمل الجمل أدناه. اختر من النص كلمتين على الأكثر لكل إجابة."],
        items: [
          { k: "gap", s: "Tree roots create channels that let rainwater soak into the ___.", a: ["soil"], x: ["Roots “open up channels that allow water to soak into the soil”.", "الجذور «تفتح قنوات تسمح للماء بالتسرّب إلى التربة»."] },
          { k: "gap", s: "Many urban foresters say one species should make up no more than ___ of a city's trees.", a: ["a tenth", "tenth"], x: ["“No single species should make up more than a tenth of a city's trees.”", "«لا ينبغي أن يشكّل أي نوع واحد أكثر من عُشر أشجار المدينة»."] },
          { k: "gap", s: "Trees planted now must survive hotter summers and longer periods of ___.", a: ["drought"], x: ["They must survive “the hotter summers and longer periods of drought that scientists expect”.", "عليها أن تتحمّل «الصيف الأشد حرارة وفترات الجفاف الأطول التي يتوقعها العلماء»."] },
          { k: "gap", s: "Many young trees die because money is set aside for planting but not for ___.", a: ["maintenance"], x: ["“Money is set aside for planting, but not for maintenance.”", "«تُخصَّص الأموال للزراعة، لكن لا تُخصَّص للصيانة»."] }
        ] }
    ]
  };

  var R_PASS3 = {
    title: "Is multitasking a myth?",
    paras: [
      "Few claims about the modern mind are repeated as confidently as the idea that multitasking is a myth. Popular books and online articles assure us that the brain can do only one thing at a time, and that anyone who believes otherwise is deceiving themselves. Like many slogans drawn from science, this one contains an important truth. But in its simplest form it is, I would argue, misleading, and the way it is used often says more about our anxieties over technology than about the workings of attention.",
      "The important truth concerns what psychologists call task switching. When we appear to be doing two demanding things at once, such as writing an email while following a meeting, we are usually moving our attention rapidly between them. Each switch carries a cost. Laboratory experiments consistently show that people who alternate between two tasks respond more slowly and make more errors than people who complete one task before starting the other. The delay on any single switch is tiny, often a fraction of a second, but across a working day the losses add up. On this point the evidence is solid, and anyone who claims to answer messages during a lecture without missing anything is almost certainly overestimating their abilities.",
      "Yet the slogan goes further than the evidence. Human beings combine activities all the time, and many of these combinations cause no difficulty whatsoever. We walk while holding a conversation, listen to the radio while cooking, and drive familiar routes while planning the day ahead. The key distinction is between tasks that demand conscious control and those that have become automatic through practice. An experienced typist can copy a document while following a news broadcast; a beginner cannot. To say that multitasking is impossible is therefore to ignore the remarkable capacity of practice to free up attention. A more accurate statement would be that we cannot perform two unfamiliar, demanding tasks simultaneously without paying a price.",
      "There is also the intriguing question of individual differences. A few studies have identified a small group of people, sometimes labelled ‘supertaskers’, who show almost no decline in performance when asked to combine demanding tasks, such as solving problems while operating a driving simulator. These individuals appear to make up only a tiny percentage of the population, and the findings need to be repeated on a larger scale before firm conclusions can be drawn. Even so, they suggest that the limits of attention are not identical for everyone. Unfortunately, research also indicates that people who believe they are good at multitasking are often among the worst at it, so few readers should assume that they belong to this fortunate minority.",
      "Where I part company with many commentators is over the frequent claim that heavy use of digital media is permanently damaging young people's ability to concentrate. It is true that some studies have found that people who regularly juggle several media at once perform worse on tests of focus. But these studies typically show a correlation, not a cause. It is just as plausible that people who are easily distracted are drawn to constant switching as that switching makes them distracted. Similar fears greeted the arrival of radio and television, and earlier generations of young people did not lose the capacity for sustained thought. Panic, in my view, is not a sound basis for policy.",
      "None of this means that workplaces can safely ignore the costs of interruption. Many modern offices seem almost designed to fragment attention, with open-plan layouts, a constant stream of notifications and an expectation that messages will be answered within minutes. Employees in such environments may feel busy and productive while achieving less than they would in a quieter setting. Some organisations have experimented with ‘focus hours’, periods in which meetings and messages are discouraged, and report that staff produce better work. Such schemes seem to me far more useful than lecturing individuals about their supposed weaknesses, because the problem lies largely in the environment rather than in the person.",
      "So is multitasking a myth? It depends on what we mean by the word. If it means performing two demanding, unfamiliar tasks at once without any loss, then for nearly all of us the answer is yes. If it means combining activities, at least one of which has become automatic, then it is an ordinary and valuable human skill. The danger of the popular slogan is that its simplicity discourages us from asking the more useful question: not whether we can do several things at once, but which combinations work, for whom, and under what conditions."
    ],
    groups: [
      { instr: ["Questions 27–31. Do the following statements agree with the claims of the writer? Choose YES if the statement agrees with the claims of the writer, NO if the statement contradicts the claims of the writer, or NOT GIVEN if it is impossible to say what the writer thinks about this.", "الأسئلة 27–31. هل تتفق العبارات التالية مع آراء الكاتب؟ اختر YES إذا اتفقت مع آراء الكاتب، وNO إذا ناقضتها، وNOT GIVEN إذا كان من المستحيل معرفة رأي الكاتب في ذلك."],
        items: [
          { k: "ynng", s: "The popular idea that multitasking is a myth has no scientific basis at all.", a: "N", x: ["The writer says the slogan “contains an important truth”, even though its simplest form is misleading.", "يقول الكاتب إن الشعار «يحمل حقيقة مهمة»، وإن كانت صيغته المبسطة مضللة."] },
          { k: "ynng", s: "People who say they can answer messages in a lecture without missing anything are probably wrong.", a: "Y", x: ["Such a person “is almost certainly overestimating their abilities”.", "هذا الشخص «يبالغ على الأرجح في تقدير قدراته»."] },
          { k: "ynng", s: "With enough practice, a task can stop competing for a person's attention.", a: "Y", x: ["The writer stresses “the remarkable capacity of practice to free up attention”, as with the experienced typist.", "يؤكد الكاتب «القدرة المذهلة للتدريب على تحرير الانتباه»، كما في مثال الطابع المتمرّس."] },
          { k: "ynng", s: "Supertaskers are more likely than other people to choose demanding careers.", a: "NG", x: ["The writer discusses how rare supertaskers are and how the research needs repeating, but says nothing about their careers.", "يناقش الكاتب ندرة هؤلاء الأشخاص وحاجة الأبحاث إلى التكرار، لكنه لا يذكر شيئًا عن مهنهم."] },
          { k: "ynng", s: "Research has proved that heavy use of digital media damages young people's concentration.", a: "N", x: ["The studies “typically show a correlation, not a cause”, and the writer rejects the “panic”.", "الدراسات «تُظهر عادةً ارتباطًا لا سببية»، والكاتب يرفض «الذعر» من هذه المسألة."] }
        ] },
      { instr: ["Questions 32–35. Choose the correct letter, A, B, C or D.", "الأسئلة 32–35. اختر الحرف الصحيح A أو B أو C أو D."],
        items: [
          { k: "mcq", s: "What does the writer say about the delay caused by a single switch between tasks?", o: ["It is large enough for most people to notice.", "It is very small, but it becomes significant over a day.", "It is longer for people with more experience.", "It is too short to be measured in a laboratory."], a: 1, x: ["“The delay on any single switch is tiny… but across a working day the losses add up.”", "«التأخير في كل انتقال واحد ضئيل… لكن الخسائر تتراكم على مدار يوم العمل»."] },
          { k: "mcq", s: "Why does the writer mention an experienced typist?", o: ["to show that some tasks become automatic with practice", "to show that typing is a particularly demanding task", "to suggest that news broadcasts reduce concentration", "to compare older and newer technology"], a: 0, x: ["It illustrates tasks “that have become automatic through practice”: the typist can, but “a beginner cannot”.", "المثال يوضح المهام «التي أصبحت تلقائية بالتدريب»، فالمتمرّس يستطيع و«المبتدئ لا يستطيع»."] },
          { k: "mcq", s: "What does the writer say about the research into ‘supertaskers’?", o: ["It shows that anyone can learn to multitask.", "It needs to be repeated with more people.", "It has only studied professional drivers.", "It has been rejected by most psychologists."], a: 1, x: ["“The findings need to be repeated on a larger scale before firm conclusions can be drawn.”", "«يجب تكرار النتائج على نطاق أوسع قبل استخلاص استنتاجات قاطعة»."] },
          { k: "mcq", s: "According to the writer, the main cause of poor concentration at work is", o: ["employees' lack of self-discipline.", "the way many workplaces are organised.", "the length of most meetings.", "the use of personal phones."], a: 1, x: ["Offices “seem almost designed to fragment attention”, and “the problem lies largely in the environment rather than in the person”.", "المكاتب «تبدو وكأنها مصممة لتشتيت الانتباه»، و«المشكلة تكمن غالبًا في البيئة لا في الشخص»."] }
        ] },
      { instr: ["Questions 36–40. Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.", "الأسئلة 36–40. أكمل الملخص أدناه. اختر كلمة واحدة فقط من النص لكل إجابة."],
        items: [
          { k: "gap", s: "Experiments show that every switch between tasks carries a ___, making people slower and less accurate.", a: ["cost"], x: ["“Each switch carries a cost”: people “respond more slowly and make more errors”.", "«لكل انتقال ثمن»، إذ «يستجيب الناس ببطء أكبر ويرتكبون أخطاء أكثر»."] },
          { k: "gap", s: "However, activities that have become ___ can be combined without difficulty.", a: ["automatic"], x: ["The distinction is with tasks “that have become automatic through practice”.", "الفرق مع المهام «التي أصبحت تلقائية بالتدريب»."] },
          { k: "gap", s: "Studies linking media use with poor focus show only a ___, not a cause.", a: ["correlation"], x: ["“These studies typically show a correlation, not a cause.”", "«هذه الدراسات تُظهر عادةً ارتباطًا لا سببية»."] },
          { k: "gap", s: "Some organisations offer ‘focus hours’, when meetings and ___ are discouraged.", a: ["messages"], x: ["“Periods in which meetings and messages are discouraged.”", "«فترات لا يُشجَّع فيها على الاجتماعات والرسائل»."] },
          { k: "gap", s: "The writer thinks we should ask which ___ of activities work, for whom and when.", a: ["combinations"], x: ["The useful question is “which combinations work, for whom, and under what conditions”.", "السؤال المفيد هو «أي تركيبات من الأنشطة تنجح، ولمن، وفي أي ظروف»."] }
        ] }
    ]
  };

  // ---------------- Lesson ----------------
  var MOCK1 = {
    id: "mock1", order: 90, icon: "🏁", mins: 165, skill: "mock",
    t: ["Mock test 1", "الاختبار التجريبي 1"],
    d: ["A full test in the official format, all four sections, with an estimated band.", "اختبار كامل بالشكل الرسمي في الأقسام الأربعة، مع تقدير تقريبي لدرجتك."],
    steps: [
      { t: "text", h: ["Before you start", "قبل أن تبدأ"], p: [
        ["This is a full IELTS Academic test in the official format. It has four sections: Listening (about 30 minutes, 4 parts, 40 questions), Reading (60 minutes, 3 passages, 40 questions), Writing (60 minutes, 2 tasks) and Speaking (11–14 minutes, 3 parts).", "هذا اختبار IELTS أكاديمي كامل بالشكل الرسمي، وفيه أربعة أقسام: الاستماع (نحو 30 دقيقة، 4 أجزاء، 40 سؤالًا)، والقراءة (60 دقيقة، 3 نصوص، 40 سؤالًا)، والكتابة (60 دقيقة، مهمتان)، والمحادثة (من 11 إلى 14 دقيقة، 3 أجزاء)."],
        ["Listening and Reading are marked automatically. Your score out of 40 is then converted to an approximate band.", "يُصحَّح الاستماع والقراءة تلقائيًا، ثم تُحوَّل درجتك من 40 إلى مستوى (band) تقريبي."],
        ["You mark Writing and Speaking yourself, using the band criteria: task response, coherence and cohesion, vocabulary and grammar for Writing; fluency and coherence, vocabulary, grammar and pronunciation for Speaking. Be honest, because the band is only useful if it is realistic.", "أما الكتابة والمحادثة فتقيّمهما بنفسك وفق معايير الدرجات: الاستجابة للمهمة، والترابط والتماسك، والمفردات، والقواعد في الكتابة؛ والطلاقة والترابط، والمفردات، والقواعد، والنطق في المحادثة. كن صادقًا مع نفسك، فالدرجة لا تفيدك إلا إذا كانت واقعية."],
        ["Take the test in one quiet sitting, as you would on test day. Do Listening, Reading and Writing without a break, use headphones, and don't pause the timers or use a dictionary. Each recording plays once, as in the real test.", "أدِّ الاختبار في جلسة واحدة هادئة كما في يوم الاختبار الحقيقي: الاستماع والقراءة والكتابة دون استراحة، مع سماعات الأذن، ودون إيقاف المؤقت أو استخدام القاموس. يُشغَّل كل تسجيل مرة واحدة كما في الاختبار الحقيقي."],
        ["Your result is an estimate to guide your study, not an official IELTS score.", "نتيجتك تقدير يوجّه دراستك، وليست درجة IELTS رسمية."]] },
      { t: "mock" }
    ],
    mock: {
      listening: [L_PART1, L_PART2, L_PART3, L_PART4],
      reading: [R_PASS1, R_PASS2, R_PASS3],
      writing: {
        task1: {
          prompt: "The chart below shows the percentage of university students in one country who used four different study methods in 2015 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
          chart: { type: "bar", title: "University students using each study method (%)", unit: "%",
            labels: ["Printed books", "E-books", "Video lectures", "AI tutors"],
            series: [
              { name: "2015", values: [78, 41, 35, 2] },
              { name: "2025", values: [46, 58, 72, 49] }
            ] } },
        task2: {
          prompt: "Some people believe that governments should spend more money on public transport, such as buses and trains, than on building new roads. To what extent do you agree or disagree? Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words." }
      },
      speaking: {
        p1: [
          { topic: "Your home town", qs: [
            "Where is your home town?",
            "What do you like most about living there?",
            "Has your home town changed much in recent years?",
            "Would you like to live there in the future? Why or why not?"] },
          { topic: "Your studies", qs: [
            "What are you studying at the moment?",
            "Why did you choose this subject?",
            "Which part of your studies do you find most difficult?",
            "Do you prefer to study alone or with other people? Why?"] }
        ],
        card: {
          title: "Describe a journey you remember.",
          points: ["where you went", "how you travelled", "who you were with"],
          explain: "and explain why you remember this journey.",
          p3: [
            "Why do some people enjoy long journeys while others dislike them?",
            "How has the way people travel in your country changed in recent decades?",
            "What are the advantages and disadvantages of travelling by train rather than by plane?",
            "Do you think people will travel less in the future because of technology such as video calls?"]
        }
      }
    }
  };

  (window.MasarokParts = window.MasarokParts || []).push({ course: "ielts", lessons: [MOCK1] });
})();

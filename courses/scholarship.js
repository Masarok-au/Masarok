/* Masarok Academy · Scholarship and paperwork.
   Original Masarok practice. Facts match the guide pages, which link to the official sources.
   Every person, university and document here is fictional. Teaching text is [English, Arabic]. */
(function () {
  "use strict";

  function sort(bins, list) { return list.map(function (x) { return { s: x[0], o: bins, a: x[1], x: x[2], row: true }; }); }

  // ---------------- 10 · how it works ----------------
  var HOW = {
    id: "sch-how", order: 10, group: "base", icon: "🧭", mins: 10,
    t: ["How the scholarship works", "كيف يعمل الابتعاث"],
    d: ["The tracks, the path from offer to departure, and what the scholarship pays.", "المسارات، والطريق من القبول حتى السفر، وما تغطيه البعثة."],
    steps: [
      { t: "text", h: ["Three tracks", "ثلاثة مسارات"], p: [
        ["Every new applicant applies through Qubool and chooses a track. Your university must be on the Ministry's list for your track and your field.", "يقدّم كل متقدم جديد عبر منصة قبول ويختار مسارًا، ويجب أن تكون جامعتك ضمن قائمة الوزارة لمسارك وتخصصك."]],
        list: [
          ["Al-Ruwwad: universities in the top 30 on the list for your field.", "مسار الرواد: جامعات ضمن أفضل 30 في قائمة تخصصك."],
          ["Imdad: universities in the top 200 on the list for your field.", "مسار إمداد: جامعات ضمن أفضل 200 في قائمة تخصصك."],
          ["Research & Development: PhDs in national research priority areas, at a top 200 university on the list for your field.", "مسار البحث والتطوير: الدكتوراه في مجالات البحث ذات الأولوية الوطنية، في جامعة ضمن أفضل 200 في قائمة تخصصك."],
          ["Al-Ruwwad and Imdad both include master's study.", "يشمل مسارا الرواد وإمداد دراسة الماجستير."]] },
      { t: "text", h: ["What the scholarship pays, and what you must do", "ما تغطيه البعثة وما عليك فعله"], p: [
        ["SACM pays your tuition and health cover, plus a monthly allowance for living costs. The allowance is set in Saudi riyals in your scholarship decision and paid in local currency, so it changes with the exchange rate.", "تدفع الملحقية رسومك الدراسية وتأمينك الصحي، إضافة إلى مكافأة شهرية لتكاليف المعيشة. ويُحدد مبلغ المكافأة بالريال في قرار الابتعاث ويُصرف بالعملة المحلية، فيتغير مع سعر الصرف."],
        ["Your side of the deal: keep your grades up, upload your results to Safeer after every term, and request a new guarantee letter whenever your study changes, for example from foundation to your degree.", "ودورك أنت: أن تحافظ على درجاتك، وترفع نتائجك على منصة سفير بعد كل فصل، وتطلب خطاب ضمان جديدًا كلما تغيرت دراستك، كالانتقال من الفاونديشن إلى البكالوريوس."],
        ["The Ministry's FAQ says a PhD is covered for up to 3 years, so PhD students should ask SACM early how extensions work.", "تذكر الأسئلة الشائعة للوزارة أن البعثة تغطي الدكتوراه حتى 3 سنوات، فعلى طلاب الدكتوراه أن يسألوا الملحقية مبكرًا عن التمديد."]] },
      { t: "order", h: ["Put the journey in order", "رتّب الرحلة"], items: [
        ["Get an offer from a university on the list for your track and field", "احصل على قبول من جامعة ضمن قائمة مسارك وتخصصك"],
        ["Apply on Qubool, signing in with Nafath", "قدّم عبر منصة قبول بالدخول عن طريق نفاذ"],
        ["Get nominated for the scholarship", "احصل على الترشيح للبعثة"],
        ["Request the financial guarantee letter on Safeer", "اطلب خطاب الضمان المالي عبر منصة سفير"],
        ["Receive your enrolment document (CoE, I-20, CAS…) from the university", "استلم وثيقة التسجيل من الجامعة (CoE أو I-20 أو CAS…)"],
        ["Apply for your student visa", "قدّم على تأشيرة الطالب"],
        ["Arrive and complete your arrival steps on Safeer", "اصل وأكمل خطوات الوصول عبر منصة سفير"]],
        x: ["Your university issues the enrolment document only after it receives SACM's guarantee, and the visa needs that document. That is why the guarantee comes before the visa.", "لا تُصدر الجامعة وثيقة التسجيل إلا بعد استلام ضمان الملحقية، والتأشيرة تحتاج هذه الوثيقة، لذلك يأتي الضمان قبل التأشيرة."] },
      { t: "quiz", h: ["Check yourself", "اختبر نفسك"], pass: 3, items: [
        { s: ["Which track sponsors PhDs?", "أي مسار يبتعث لدرجة الدكتوراه؟"], o: [["Al-Ruwwad", "الرواد"], ["Imdad", "إمداد"], ["Research & Development", "البحث والتطوير"]], a: 2, x: ["PhDs are sponsored through the Research & Development track.", "يكون الابتعاث للدكتوراه عبر مسار البحث والتطوير."] },
        { s: ["Your university is ranked 120th on the list for your field. Which track can you apply for?", "ترتيب جامعتك 120 في قائمة تخصصك. على أي مسار يمكنك التقديم؟"], o: [["Al-Ruwwad", "الرواد"], ["Imdad", "إمداد"], ["Neither", "لا هذا ولا ذاك"]], a: 1, x: ["Imdad covers the top 200 on the list for your field. Al-Ruwwad is only the top 30.", "يشمل مسار إمداد أفضل 200 في قائمة تخصصك، أما الرواد فأفضل 30 فقط."] },
        { s: ["What does your university need before it issues your enrolment document?", "ماذا تحتاج جامعتك قبل أن تُصدر وثيقة تسجيلك؟"], o: [["Your visa", "تأشيرتك"], ["SACM's financial guarantee letter", "خطاب الضمان المالي من الملحقية"], ["Your flight ticket", "تذكرة الطيران"]], a: 1, x: ["The guarantee shows the university who pays your fees. The visa comes after the enrolment document.", "الضمان يثبت للجامعة الجهة التي تدفع رسومك، والتأشيرة تأتي بعد وثيقة التسجيل."] },
        { s: ["Your first term has ended. What should you do on Safeer?", "انتهى فصلك الأول. ماذا تفعل على منصة سفير؟"], o: [["Nothing until you graduate", "لا شيء حتى التخرج"], ["Upload your results", "ارفع نتائجك"], ["Apply on Qubool again", "قدّم على منصة قبول مجددًا"]], a: 1, x: ["Upload your results after every term so your file stays up to date.", "ارفع نتائجك بعد كل فصل ليبقى ملفك محدثًا."] }
      ] }
    ]
  };

  // ---------------- 20 · Qubool file ----------------
  var QUBOOL = {
    id: "sch-qubool", order: 20, group: "base", icon: "📂", mins: 10,
    t: ["Get your Qubool file ready", "جهّز ملفك لمنصة قبول"],
    d: ["What Qubool asks for, and how to spot a file that will cause trouble.", "ما تطلبه منصة قبول، وكيف تكتشف الملف الذي سيسبب لك مشكلة."],
    steps: [
      { t: "text", h: ["What Qubool asks for", "ما تطلبه منصة قبول"], p: [
        ["You sign in to Qubool with Nafath, choose your track and upload your documents. The core three are your offer, your certified transcripts and your English result.", "تسجّل الدخول إلى منصة قبول عبر نفاذ، وتختار مسارك وترفع مستنداتك. وأهمها ثلاثة: خطاب القبول، والسجل الأكاديمي المصدق، ونتيجة اختبار اللغة."],
        ["In 2026, applications ran from 29 January to 7 May. Windows change each year, so follow Qubool and the Ministry's accounts, and have your file ready before the window opens.", "في 2026 كان التقديم من 29 يناير إلى 7 مايو. والمواعيد تتغير كل عام، فتابع منصة قبول وحسابات الوزارة، وجهّز ملفك قبل فتح التقديم."]],
        list: [
          ["Scan documents flat, in colour, with every edge visible.", "امسح المستندات وهي مسطحة وبالألوان، مع ظهور كل الحواف."],
          ["Save each document as one clear PDF with a clear name, such as Offer-Letter.pdf.", "احفظ كل مستند في ملف PDF واحد واضح باسم واضح، مثل Offer-Letter.pdf."],
          ["Check that your name is spelt the same way on every document as on your passport.", "تأكد أن اسمك مكتوب بالطريقة نفسها في كل المستندات كما في جوازك."]] },
      { t: "quiz", h: ["Ready to upload, or fix it first?", "جاهز للرفع، أم يحتاج إصلاحًا أولًا؟"], pass: 5, items: sort([["Ready", "جاهز"], ["Fix it first", "أصلحه أولًا"]], [
        [["A clear PDF of your offer from a university on the list for your track and field", "ملف PDF واضح لخطاب القبول من جامعة ضمن قائمة مسارك وتخصصك"], 0, ["This is exactly what Qubool needs.", "هذا بالضبط ما تحتاجه منصة قبول."]],
        [["A phone photo of your transcript, taken at an angle with a shadow over the grades", "صورة بالجوال لسجلك الأكاديمي، ملتقطة بزاوية وعليها ظل فوق الدرجات"], 1, ["Rescan it flat and clear. A reviewer must be able to read every grade.", "أعد مسحه مسطحًا وواضحًا، فيجب أن يقرأ المراجع كل درجة."]],
        [["Your certified transcripts, saved as one PDF", "سجلك الأكاديمي المصدق محفوظًا في ملف PDF واحد"], 0, ["Certified and in one file: ready.", "مصدق وفي ملف واحد: جاهز."]],
        [["An offer from a university that is not on the Ministry's list for your field", "قبول من جامعة غير مدرجة في قائمة الوزارة لتخصصك"], 1, ["The university must be on the list for your track and field. Check the Ministry's lists before you accept any offer.", "يجب أن تكون الجامعة ضمن قائمة مسارك وتخصصك، فراجع قوائم الوزارة قبل قبول أي عرض."]],
        [["An English result where your name is spelt differently from your passport", "نتيجة اختبار لغة فيها اسمك مكتوب بشكل مختلف عن جوازك"], 1, ["Ask the test centre to correct it. Small spelling differences cause delays later, especially for the visa.", "اطلب من مركز الاختبار تصحيحه، فاختلاف الحروف البسيط يسبب تأخيرًا لاحقًا، خاصة في التأشيرة."]],
        [["A file called IMG_4471.jpg that contains your offer", "ملف باسم IMG_4471.jpg يحتوي على خطاب القبول"], 1, ["Convert it to PDF and give it a clear name, so nothing is uploaded in the wrong place.", "حوّله إلى PDF وسمّه باسم واضح حتى لا يُرفع في مكان خاطئ."]]
      ]) },
      { t: "quiz", h: ["Timing", "التوقيت"], pass: 2, items: [
        { s: ["When is the best time to prepare your Qubool file?", "متى أفضل وقت لتجهيز ملفك لمنصة قبول؟"], o: [["The last week of the window", "آخر أسبوع في فترة التقديم"], ["Before the window opens", "قبل فتح التقديم"], ["After the window closes", "بعد إغلاق التقديم"]], a: 1, x: ["Selection is based on merit and available places, and late fixes are stressful. Have everything ready before it opens.", "المفاضلة حسب الجدارة والمقاعد المتاحة، والتعديلات المتأخرة مرهقة، فجهّز كل شيء قبل فتح التقديم."] },
        { s: ["Where do you find next year's application window?", "أين تجد موعد التقديم للعام القادم؟"], o: [["A friend's message from last year", "رسالة صديق من العام الماضي"], ["Qubool and the Ministry's official accounts", "منصة قبول وحسابات الوزارة الرسمية"], ["Any study agent", "أي وكيل دراسة"]], a: 1, x: ["Dates change each year. Only trust the official sources.", "المواعيد تتغير كل عام، فلا تعتمد إلا على المصادر الرسمية."] }
      ] }
    ]
  };

  // ---------------- 30 · one name everywhere ----------------
  var NAMES = {
    id: "sch-names", order: 30, group: "docs", icon: "🔤", mins: 8,
    t: ["One name everywhere", "اسم واحد في كل مكان"],
    d: ["Arabic names can be written in English in many ways. Learn why your passport decides.", "يمكن كتابة الأسماء العربية بالإنجليزية بطرق كثيرة. تعرّف لماذا يكون جوازك هو المرجع."],
    steps: [
      { t: "text", h: ["Your passport is the reference", "جوازك هو المرجع"], p: [
        ["Mohammed or Muhammad? Al-Harbi or Alharbi? Both are fine in daily life, but your documents must all use the exact spelling in your passport.", "محمد تُكتب Mohammed أو Muhammad؟ والحربي Al-Harbi أو Alharbi؟ كلاهما مقبول في الحياة اليومية، لكن يجب أن تستخدم كل مستنداتك التهجئة نفسها الموجودة في جوازك."],
        ["Visa systems compare your offer, enrolment document, test result and passport. A missing middle name, a swapped letter or a different date of birth can delay your visa or your enrolment.", "تقارن أنظمة التأشيرة بين خطاب القبول ووثيقة التسجيل ونتيجة الاختبار والجواز. وقد يؤخر اسم أوسط ناقص أو حرف مبدَّل أو تاريخ ميلاد مختلف تأشيرتك أو تسجيلك."],
        ["If a document is wrong, ask whoever issued it (the university or the test centre) to correct it before you apply for the visa.", "إذا كان في مستند خطأ، فاطلب من الجهة التي أصدرته (الجامعة أو مركز الاختبار) تصحيحه قبل التقديم على التأشيرة."]] },
      { t: "quiz", h: ["Does it match the passport?", "هل يطابق الجواز؟"], intro: [["Passport: surname ALQAHTANI · given names SARA ABDULLAH M · born 03 APR 2005", "الجواز: اسم العائلة ALQAHTANI · الاسم SARA ABDULLAH M · تاريخ الميلاد 03 APR 2005"]], pass: 5, items: sort([["Matches", "مطابق"], ["Needs fixing", "يحتاج تصحيحًا"]], [
        ["Sara Abdullah M Alqahtani", 0, ["Same names in the same spelling. Capital letters don't matter.", "الأسماء نفسها بالتهجئة نفسها، ولا يهم اختلاف الحروف الكبيرة والصغيرة."]],
        ["Sarah Abdullah M Alqahtani", 1, ["Sarah has an extra h. Ask for it to be corrected to Sara.", "في Sarah حرف h زائد، فاطلب تصحيحه إلى Sara."]],
        ["Sara Alqahtani", 1, ["The given names Abdullah M are missing. Official documents should list your full given names.", "الاسمان Abdullah M ناقصان، ويجب أن تذكر المستندات الرسمية اسمك كاملًا."]],
        ["Sara Abdullah M Al-Qahtani", 1, ["The hyphen is not in your passport. It looks small, but ask for the exact spelling.", "الشرطة غير موجودة في جوازك. قد تبدو بسيطة، لكن اطلب التهجئة نفسها تمامًا."]],
        [["ALQAHTANI, SARA ABDULLAH M (surname first, in a labelled field)", "ALQAHTANI, SARA ABDULLAH M (اسم العائلة أولًا في خانة مسماة)"], 0, ["Many forms put the surname first. That's fine when each part is in the right field.", "تضع نماذج كثيرة اسم العائلة أولًا، وهذا صحيح ما دام كل جزء في خانته."]],
        [["Date of birth 04 MAR 2005", "تاريخ الميلاد 04 MAR 2005"], 1, ["Day and month are swapped. Your passport says 3 April.", "اليوم والشهر مقلوبان، فجوازك يقول 3 أبريل."]]
      ]) },
      { t: "quiz", h: ["Dates around the world", "التواريخ حول العالم"], pass: 2, items: [
        { s: ["A US form writes dates as MM/DD/YYYY. How do you write 3 April 2005?", "النماذج الأمريكية تكتب التاريخ بصيغة شهر/يوم/سنة. كيف تكتب 3 أبريل 2005؟"], o: ["03/04/2005", "04/03/2005", "2005/03/04"], a: 1, x: ["Month first in the US: 04/03/2005. In Australia, the UK and Singapore it would be 03/04/2005.", "الشهر أولًا في أمريكا: 04/03/2005. أما في أستراليا وبريطانيا وسنغافورة فيكون 03/04/2005."] },
        { s: ["Which date format can never be misread?", "أي صيغة تاريخ لا يمكن أن تُفهم خطأ؟"], o: ["03/04/2005", "3 Apr 2005", "3-4-05"], a: 1, x: ["Writing the month as a word removes the confusion. Use it in emails and forms that allow it.", "كتابة الشهر بالحروف تزيل اللبس، فاستخدمها في الرسائل والنماذج التي تسمح بذلك."] }
      ] }
    ]
  };

  // ---------------- 40 · document detective ----------------
  var REF = { title: "Your details (from your passport and offer)", rows: [["Surname", "ALHARBI"], ["Given names", "FAISAL SAAD M"], ["Date of birth", "14 March 2006"], ["Passport no.", "P1234567 (fictional)"]] };
  var DETECT = {
    id: "sch-detective", order: 40, group: "docs", icon: "🕵️", mins: 12,
    t: ["Document detective", "محقق المستندات"],
    d: ["Find the mistakes in sample letters before they find you.", "اكتشف الأخطاء في نماذج الخطابات قبل أن تكتشفك."],
    steps: [
      { t: "text", h: ["Read every line", "اقرأ كل سطر"], p: [
        ["Universities issue thousands of letters, and mistakes happen. The student who checks every line catches them early, when they are quick to fix.", "تُصدر الجامعات آلاف الخطابات وتحدث الأخطاء، والطالب الذي يراجع كل سطر يكتشفها مبكرًا حين يكون إصلاحها سريعًا."],
        ["In each sample, tap the lines that are wrong or need your action. Compare them with your details at the top. Every name and university here is made up.", "في كل نموذج، اضغط على الأسطر الخاطئة أو التي تحتاج منك إجراء، وقارنها ببياناتك في الأعلى. كل الأسماء والجامعات هنا من نسج الخيال."]] },
      { t: "spot", h: ["Sample 1: the offer letter", "النموذج 1: خطاب القبول"], ref: REF,
        doc: { title: "Offer of admission", from: "Northbridge University (fictional)", rows: [
          ["Student", "Faisal Saad M Alharbi", false],
          ["Date of birth", "14 March 2006", false],
          ["Program", "Bachelor of Engineering (Civil), 4 years", false],
          ["Offer type", "Conditional: IELTS Academic 6.5 overall, no band below 6.0, by 15 January 2027", true, ["Not an error, but it needs action: meet the condition before the date, then ask for your unconditional offer.", "ليس خطأ، لكنه يحتاج إجراء: حقق الشرط قبل الموعد، ثم اطلب القبول غير المشروط."]],
          ["Start date", "22 February 2027", false],
          ["Accept by", "30 November 2026", true, ["A deadline: accept in time, or the place may go to someone else.", "هذا موعد نهائي: اقبل العرض في وقته وإلا قد يذهب المقعد لغيرك."]],
          ["Tuition", "Paid by sponsor on receipt of a financial guarantee", false]] } },
      { t: "spot", cc: ["au"], h: ["Sample 2: Confirmation of Enrolment (CoE)", "النموذج 2: خطاب تأكيد التسجيل (CoE)"], ref: REF,
        doc: { title: "Confirmation of Enrolment (practice version)", from: "Northbridge University (fictional)", rows: [
          ["Student name", "Faisal Saad Alharbi", true, ["The given name M is missing. It must match your passport.", "الاسم M ناقص، ويجب أن يطابق جوازك."]],
          ["Date of birth", "14/03/2006", false],
          ["Course", "Bachelor of Engineering (Civil)", false],
          ["Course start", "22/02/2027", false],
          ["Course end", "30/11/2027", true, ["A 4-year degree can't end in the same year it starts. A wrong end date shortens your visa.", "لا يمكن أن تنتهي درجة مدتها 4 سنوات في سنة بدايتها نفسها، والتاريخ الخاطئ يقصّر مدة تأشيرتك."]],
          ["Health cover (OSHC)", "Arranged by sponsor", false]] } },
      { t: "spot", cc: ["us"], h: ["Sample 2: the I-20", "النموذج 2: نموذج I-20"], ref: REF,
        doc: { title: "Certificate of eligibility (practice version, based on the I-20)", from: "Northbridge University (fictional)", rows: [
          ["Name", "ALHARBI, FAISAL SAD M", true, ["SAD is missing an A: your passport says SAAD.", "في SAD حرف A ناقص، فجوازك يقول SAAD."]],
          ["Date of birth", "14/03/2006", true, ["US forms write the month first. 14/03 would mean month 14, so it should be 03/14/2006.", "النماذج الأمريكية تكتب الشهر أولًا، و14/03 تعني الشهر 14، فالصحيح 03/14/2006."]],
          ["Country of citizenship", "Saudi Arabia", false],
          ["Program", "Civil Engineering, Bachelor's", false],
          ["Program start", "08/23/2027", false],
          ["Program end", "05/15/2026", true, ["The end date is before the start date. Ask the international office for a corrected form.", "تاريخ الانتهاء قبل تاريخ البداية، فاطلب من مكتب الطلاب الدوليين نموذجًا مصححًا."]],
          ["Funding", "Government sponsor: Saudi Arabian Cultural Mission", false]] } },
      { t: "spot", cc: ["uk"], h: ["Sample 2: the CAS statement", "النموذج 2: إفادة CAS"], ref: { title: REF.title, rows: REF.rows.concat([["IELTS result", "6.5 overall"]]) },
        doc: { title: "CAS statement (practice version)", from: "Northbridge University (fictional)", rows: [
          ["Name", "Faisal Saad M Alharbi", false],
          ["Passport number", "P1234576", true, ["The last two digits are swapped. It must match your passport exactly.", "آخر رقمين مقلوبان، ويجب أن يطابق جوازك تمامًا."]],
          ["Course", "BEng Civil Engineering", false],
          ["Course dates", "20 Sep 2027 to 30 Jun 2030", false],
          ["English assessed by", "IELTS Academic, 5.5 overall", true, ["Your result is 6.5. A wrong score in the CAS can lead to a refusal.", "نتيجتك 6.5، والدرجة الخاطئة في CAS قد تؤدي إلى رفض التأشيرة."]],
          ["Fees", "Paid by sponsor: Saudi Government", false]] } },
      { t: "spot", cc: ["ca"], h: ["Sample 2: the letter of acceptance", "النموذج 2: خطاب القبول الكندي"], ref: REF,
        doc: { title: "Letter of acceptance (practice version)", from: "Northbridge University (fictional)", rows: [
          ["Student", "Faisal Alharbi Saad", true, ["The names are in the wrong order and M is missing.", "ترتيب الأسماء خاطئ والاسم M ناقص."]],
          ["Date of birth", "2006-03-14", false],
          ["Program", "Bachelor of Applied Science, Civil Engineering", false],
          ["Start", "September 2027", false],
          ["DLI number", "—", true, ["The letter should show the school's designated learning institution (DLI) number. Ask for it to be added.", "يجب أن يتضمن الخطاب رقم المؤسسة التعليمية المعتمدة (DLI)، فاطلب إضافته."]],
          ["Conditions", "None", false]] } },
      { t: "spot", cc: ["de"], h: ["Sample 2: the admission letter (Zulassung)", "النموذج 2: خطاب القبول الألماني (Zulassung)"], ref: REF,
        doc: { title: "Zulassungsbescheid · admission letter (practice version)", from: "Hochschule Nordbrück (fictional)", rows: [
          ["Name", "Faisal Saad M Alharby", true, ["Alharby instead of Alharbi: one letter can stop your visa or enrolment.", "Alharby بدل Alharbi: حرف واحد قد يوقف تأشيرتك أو تسجيلك."]],
          ["Geburtsdatum (date of birth)", "14.03.2007", true, ["The year is wrong: you were born in 2006.", "السنة خاطئة، فأنت من مواليد 2006."]],
          ["Studiengang (program)", "Bauingenieurwesen, B.Sc.", false],
          ["Semester start", "Wintersemester 2027/28", false],
          ["Enrol by", "15.10.2027", true, ["A deadline: enrol in person or online by this date.", "موعد نهائي: سجّل حضوريًا أو إلكترونيًا قبل هذا التاريخ."]]] } },
      { t: "spot", cc: ["sg"], h: ["Sample 2: the IPA letter", "النموذج 2: خطاب الموافقة المبدئية (IPA)"], ref: { title: REF.title, rows: REF.rows.concat([["Your flight", "Arriving 2 August 2027"]]) },
        doc: { title: "In-Principle Approval (practice version)", from: "Student's Pass application (fictional)", rows: [
          ["Name", "Faisal Saad M Alharbi", false],
          ["Date of birth", "03/14/2006", true, ["Singapore writes the day first. It should be 14/03/2006.", "سنغافورة تكتب اليوم أولًا، فالصحيح 14/03/2006."]],
          ["Institution", "Northbridge University (fictional)", false],
          ["Course", "Bachelor of Engineering (Civil)", false],
          ["IPA valid until", "1 June 2027", true, ["You arrive in August, after the IPA expires. Ask your university what to do before you book.", "ستصل في أغسطس بعد انتهاء صلاحية الموافقة، فاسأل جامعتك عن الإجراء قبل حجز الرحلة."]]] } },
      { t: "quiz", h: ["You found a mistake. Now what?", "وجدت خطأ، والآن؟"], pass: 2, items: [
        { s: ["Your enrolment document has a wrong date of birth. What do you do?", "في وثيقة تسجيلك تاريخ ميلاد خاطئ. ماذا تفعل؟"], o: [["Apply for the visa anyway and explain later", "قدّم على التأشيرة على أي حال واشرح لاحقًا"], ["Ask the university's international office for a corrected document before the visa", "اطلب من مكتب الطلاب الدوليين في الجامعة وثيقة مصححة قبل التأشيرة"], ["Fix it yourself in a PDF editor", "صحّحه بنفسك في برنامج تعديل PDF"]], a: 1, x: ["Only the issuer can correct it. Never edit an official document yourself: that can be treated as fraud.", "الجهة المصدرة وحدها تصحح الوثيقة، ولا تعدّل وثيقة رسمية بنفسك أبدًا، فقد يُعدّ ذلك تزويرًا."] },
        { s: ["Your offer is conditional on an IELTS score. What should you plan for?", "قبولك مشروط بدرجة IELTS. لماذا تخطط؟"], o: [["Nothing, it's the same as unconditional", "لا شيء، فهو مثل غير المشروط"], ["Meeting the condition before the deadline, then getting the unconditional offer", "تحقيق الشرط قبل الموعد ثم الحصول على القبول غير المشروط"]], a: 1, x: ["Plan your test date with time for a retake, so the condition doesn't hold up your enrolment.", "خطط لموعد اختبارك مع وقت كافٍ لإعادته، حتى لا يؤخر الشرط تسجيلك."] }
      ] }
    ]
  };

  // ---------------- 50 · a month on your allowance ----------------
  var BUDGET = {
    id: "sch-budget", order: 50, group: "money", icon: "💰", mins: 12,
    t: ["A month on your allowance", "شهر على مكافأتك"],
    d: ["Plan your month, then live through four weeks of surprises.", "خطط لشهرك، ثم عِش أربعة أسابيع من المفاجآت."],
    steps: [
      { t: "text", h: ["Rent first, then everything else", "الإيجار أولًا، ثم كل شيء آخر"], p: [
        ["Rent is usually the biggest cost. Plan it first, then food, transport and bills, and keep some money aside for surprises.", "الإيجار غالبًا أكبر التكاليف، فخطط له أولًا، ثم الطعام والمواصلات والفواتير، واترك مبلغًا جانبًا للمفاجآت."],
        ["In this simulator you start with the monthly allowance. Adjust the costs to match your city, then see how your choices play out over four weeks.", "في هذه المحاكاة تبدأ بالمكافأة الشهرية. عدّل التكاليف لتناسب مدينتك، ثم شاهد نتيجة اختياراتك خلال أربعة أسابيع."]] },
      { t: "budget", h: ["Your month", "شهرك"],
        cats: [
          { id: "rent", l: ["Rent", "الإيجار"] },
          { id: "food", l: ["Groceries", "البقالة"] },
          { id: "travel", l: ["Transport", "المواصلات"] },
          { id: "bills", l: ["Phone and bills", "الجوال والفواتير"] },
          { id: "other", l: ["Eating out and other spending", "المطاعم والمصاريف الأخرى"] }],
        costs: {
          au: { rent: [400, "w"], food: [100, "w"], travel: [40, "w"], bills: [80, "m"], other: [30, "w"] },
          us: { rent: [1000, "m"], food: [450, "m"], travel: [80, "m"], bills: [120, "m"], other: [80, "m"] },
          uk: { rent: [800, "m"], food: [250, "m"], travel: [80, "m"], bills: [60, "m"], other: [80, "m"] },
          ca: { rent: [1200, "m"], food: [400, "m"], travel: [110, "m"], bills: [90, "m"], other: [100, "m"] },
          de: { rent: [550, "m"], food: [250, "m"], travel: [0, "m"], bills: [200, "m"], other: [80, "m"] },
          sg: { rent: [800, "m"], food: [450, "m"], travel: [120, "m"], bills: [80, "m"], other: [100, "m"] } },
        events: [
          { i: "📱", p: ["Week 1. Your phone slips and the screen cracks.", "الأسبوع 1. سقط جوالك وانكسرت شاشته."], ch: [
            { t: ["Repair it at a shop", "أصلحه في محل"], cost: 150, ok: true, fb: ["A fair choice. Next time, a case and a screen protector are much cheaper than a repair.", "اختيار معقول، وفي المرة القادمة تكون الحافظة وواقي الشاشة أرخص بكثير من الإصلاح."] },
            { t: ["Sign up for a new phone on a 24-month plan", "اشترك في جوال جديد بخطة 24 شهرًا"], cost: 0, ok: false, fb: ["Nothing to pay today, but you've added a monthly bill for two years. Read the full contract cost before signing anything.", "لا شيء تدفعه اليوم، لكنك أضفت فاتورة شهرية لمدة سنتين، فاقرأ التكلفة الكاملة للعقد قبل توقيع أي شيء."] },
            { t: ["Keep using it cracked for now", "استمر في استخدامه مكسورًا الآن"], cost: 0, fb: ["You saved money this month. Just make sure it still works for calls and your bank app.", "وفّرت المال هذا الشهر، لكن تأكد أنه ما زال يعمل للمكالمات وتطبيق البنك."] }] },
          { i: "🍽️", p: ["Week 2. New friends invite you to dinner at a restaurant on Thursday.", "الأسبوع 2. دعاك أصدقاء جدد إلى العشاء في مطعم يوم الخميس."], ch: [
            { t: ["Go and share the bill", "اذهب وتقاسم الفاتورة"], cost: 45, fb: ["Friendships matter in your first months. Just keep an eye on how often you eat out.", "الصداقات مهمة في أشهرك الأولى، لكن راقب عدد مرات الأكل في المطاعم."] },
            { t: ["Suggest cooking kabsa together at your place", "اقترح طبخ كبسة معًا في منزلك"], cost: 15, ok: true, fb: ["Cheaper, and a great way to share something from home.", "أرخص، وطريقة رائعة لمشاركة شيء من بلدك."] },
            { t: ["Say no and stay home", "اعتذر وابقَ في المنزل"], cost: 0, ok: false, fb: ["You saved money, but saying no to everything can leave you lonely. Free and cheap plans are worth saying yes to.", "وفّرت المال، لكن رفض كل شيء قد يتركك وحيدًا، والخطط المجانية والرخيصة تستحق الموافقة."] }] },
          { i: "📚", p: ["Week 3. Your course needs a textbook.", "الأسبوع 3. مادتك تحتاج كتابًا دراسيًا."], ch: [
            { t: ["Buy it new from the campus shop", "اشترِه جديدًا من متجر الجامعة"], cost: 160, ok: false, fb: ["Check the library, the e-book and second-hand groups first. Many students never need to buy new.", "راجع المكتبة والنسخة الإلكترونية ومجموعات الكتب المستعملة أولًا، فكثير من الطلاب لا يحتاجون شراء كتب جديدة."] },
            { t: ["Borrow it or use the library's e-book", "استعِره أو استخدم النسخة الإلكترونية من المكتبة"], cost: 0, ok: true, fb: ["Smart. University libraries usually hold the required books, often online.", "تصرف ذكي، فمكتبات الجامعات تحتفظ عادةً بالكتب المطلوبة، وكثيرًا ما تكون متاحة إلكترونيًا."] },
            { t: ["Buy a used copy from a student", "اشترِ نسخة مستعملة من طالب"], cost: 50, ok: true, fb: ["Good value. Check it's the right edition first.", "قيمة جيدة، لكن تأكد أولًا أنها الطبعة المطلوبة."] }] },
          { i: "💡", p: ["Week 4. A bill arrives: your share of the electricity is due.", "الأسبوع 4. وصلت فاتورة: حان موعد حصتك من الكهرباء."], ch: [
            { t: ["Pay it now", "ادفعها الآن"], cost: 90, ok: true, fb: ["Right. Bills come every month or quarter, so keep a small buffer for them each month.", "صحيح. الفواتير تأتي كل شهر أو كل ثلاثة أشهر، فاحتفظ بهامش صغير لها كل شهر."] },
            { t: ["Leave it until next month", "أجّلها للشهر القادم"], cost: 110, ok: false, fb: ["The bill doesn't go away, and a late fee is added. If money is tight, call the company and ask for a payment plan.", "الفاتورة لا تختفي وتُضاف إليها غرامة تأخير. إذا ضاق المال، فاتصل بالشركة واطلب خطة سداد."] }] }
        ],
        tips: [
          ["Pay rent and bills first, on the day your allowance arrives.", "ادفع الإيجار والفواتير أولًا في يوم وصول المكافأة."],
          ["Keep about 10% of your allowance as a buffer for surprises.", "احتفظ بنحو 10% من مكافأتك هامشًا للمفاجآت."],
          ["Track one month of spending in your bank app to see where the money really goes.", "تابع مصروفك لشهر واحد في تطبيق البنك لتعرف أين يذهب المال فعلًا."],
          ["Ask your cultural mission about anything in your allowance you don't understand.", "اسأل الملحقية الثقافية عن أي شيء لا تفهمه في مكافأتك."]] }
    ]
  };

  // ---------------- 90 · checkpoint ----------------
  var CHECK = {
    id: "sch-check", order: 90, group: "end", icon: "🏁", mins: 8,
    t: ["Checkpoint: scholarship and paperwork", "نقطة تحقق: البعثة والمستندات"],
    d: ["Six questions on everything in this course. Pass with 5.", "ستة أسئلة عن كل ما في هذه الدورة، والنجاح بخمس إجابات صحيحة."],
    steps: [
      { t: "quiz", h: ["Checkpoint", "نقطة التحقق"], pass: 5, items: [
        { s: ["Which platform do new applicants use to apply for the scholarship?", "ما المنصة التي يقدّم عليها المتقدمون الجدد للبعثة؟"], o: [["Safeer", "سفير"], ["Qubool", "قبول"], ["The university's portal", "بوابة الجامعة"]], a: 1, x: ["New applicants apply on Qubool. Safeer is where you manage your scholarship after nomination.", "يقدّم المتقدمون الجدد عبر منصة قبول، أما سفير فلإدارة البعثة بعد الترشيح."] },
        { s: ["Al-Ruwwad covers universities in the top…", "يشمل مسار الرواد الجامعات ضمن أفضل…"], o: ["30", "100", "200"], a: 0, x: ["Top 30 on the list for your field. Imdad covers the top 200.", "أفضل 30 في قائمة تخصصك، وإمداد يشمل أفضل 200."] },
        { s: ["Where do you request the financial guarantee letter?", "أين تطلب خطاب الضمان المالي؟"], o: [["Safeer", "سفير"], ["Qubool", "قبول"], ["Nafath", "نفاذ"]], a: 0, x: ["After nomination, request it on Safeer and send it to your university.", "بعد الترشيح اطلبه عبر منصة سفير وأرسله إلى جامعتك."] },
        { s: ["Your CAS shows a passport number with two digits swapped. What now?", "في إفادة CAS رقم جواز فيه رقمان مقلوبان. ماذا تفعل؟"], o: [["Ignore it, it's close enough", "تجاهله، فهو قريب بما يكفي"], ["Ask the university to correct it before applying for the visa", "اطلب من الجامعة تصحيحه قبل التقديم على التأشيرة"]], a: 1, x: ["Every detail must match your passport. Only the university can correct it.", "يجب أن تطابق كل التفاصيل جوازك، والجامعة وحدها تستطيع التصحيح."] },
        { s: ["Your allowance arrives. What do you pay first?", "وصلت مكافأتك. ماذا تدفع أولًا؟"], o: [["Eating out with friends", "العشاء مع الأصدقاء"], ["Rent and bills", "الإيجار والفواتير"], ["New clothes", "ملابس جديدة"]], a: 1, x: ["Fixed costs first, then the rest, with a small buffer for surprises.", "التكاليف الثابتة أولًا ثم الباقي، مع هامش صغير للمفاجآت."] },
        { s: ["Why might your allowance in local currency change from month to month?", "لماذا قد تتغير مكافأتك بالعملة المحلية من شهر لآخر؟"], o: [["It's set in riyals and converted, so it follows the exchange rate", "لأنها محددة بالريال وتُحوَّل، فتتبع سعر الصرف"], ["It's random", "لأنها عشوائية"], ["It depends on your grades each month", "لأنها تعتمد على درجاتك كل شهر"]], a: 0, x: ["The amount is set in Saudi riyals in your decision and paid in local currency.", "المبلغ محدد بالريال في قرار الابتعاث ويُصرف بالعملة المحلية."] }
      ] }
    ]
  };

  window.MasarokCourse = {
    id: "scholarship",
    t: ["Scholarship and paperwork", "البعثة والمستندات"],
    sub: ["Understand the tracks, get your file right and spot the mistakes that delay students.", "افهم المسارات، وجهّز ملفك بشكل صحيح، واكتشف الأخطاء التي تؤخر الطلاب."],
    note: ["Every person, university and document in this course is fictional. Rules change, so always confirm on the Ministry's pages, Qubool, Safeer and with your cultural mission.", "كل الأشخاص والجامعات والمستندات في هذه الدورة من نسج الخيال. والأنظمة تتغير، فتأكد دائمًا من صفحات الوزارة ومنصتي قبول وسفير والملحقية الثقافية."],
    groups: [["base", ["How it works", "كيف يعمل الابتعاث"]], ["docs", ["Your documents", "مستنداتك"]], ["money", ["Your money", "مالك"]], ["end", ["Checkpoint", "نقطة التحقق"]]],
    lessons: [HOW, QUBOOL, NAMES, DETECT, BUDGET, CHECK]
  };
})();

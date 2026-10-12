/* Masarok Academy page: the sample question in the hero, and the writing track
   tailored to the country the student picked in the guide. The lesson player comes in phase 1. */
(function () {
  "use strict";
  var AR = (document.documentElement.lang || "en").slice(0, 2) === "ar";
  function ls(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  // ---------- sample True / False / Not Given question ----------
  var demo = document.querySelector("[data-demo]");
  if (demo) {
    var res = demo.querySelector(".demo-res"), answer = demo.getAttribute("data-answer");
    var EXPL = AR
      ? { ok: "إجابة صحيحة!", no: "ليست هذه.", why: "النص يقول إن الأسبوع التعريفي يكون قبل بدء المحاضرات، فالعبارة تناقض النص: خطأ." }
      : { ok: "Correct!", no: "Not quite.", why: "The text says orientation week is before classes begin, so the statement contradicts it: False." };
    demo.addEventListener("click", function (e) {
      var b = e.target.closest(".demo-o"); if (!b) return;
      demo.querySelectorAll(".demo-o").forEach(function (o) {
        o.classList.remove("is-right", "is-wrong");
        if (o.getAttribute("data-v") === answer) o.classList.add("is-right");
      });
      var ok = b.getAttribute("data-v") === answer;
      if (!ok) b.classList.add("is-wrong");
      res.classList.toggle("is-no", !ok);
      res.innerHTML = "<b>" + (ok ? EXPL.ok : EXPL.no) + "</b> " + EXPL.why;
    });
  }

  // ---------- the writing track, for the student's country ----------
  var W = {
    uk: ["In the UK you'll practise the UCAS personal statement: three questions, 4,000 characters in total.", "في بريطانيا ستتدرب على البيان الشخصي في UCAS: ثلاثة أسئلة بمجموع 4,000 حرف."],
    us: ["In the US you'll practise the Common App essay (up to 650 words) and \"Why this university?\" answers.", "في أمريكا ستتدرب على مقال Common App (حتى 650 كلمة) وإجابات «لماذا هذه الجامعة؟»."],
    au: ["In Australia undergraduates usually write no essay, so you'll practise the Genuine Student answers for the visa.", "في أستراليا لا يُطلب عادةً مقال للبكالوريوس، لذلك ستتدرب على إجابات «الطالب الحقيقي» للتأشيرة."],
    ca: ["In Canada you'll practise the short answers and supplementary applications some universities ask for.", "في كندا ستتدرب على الإجابات القصيرة والطلبات الإضافية التي تطلبها بعض الجامعات."],
    de: ["In Germany you'll practise the motivation letter (Motivationsschreiben) and a German-style CV.", "في ألمانيا ستتدرب على خطاب الدافع (Motivationsschreiben) والسيرة الذاتية بالأسلوب الألماني."],
    sg: ["In Singapore you'll practise the essays and short answers some programmes at NUS, NTU and SMU ask for.", "في سنغافورة ستتدرب على المقالات والإجابات القصيرة التي تطلبها بعض البرامج في NUS وNTU وSMU."]
  };
  var PG = ["For a master's or PhD you'll practise the statement of purpose, a research proposal and the email to a supervisor.", "للماجستير أو الدكتوراه ستتدرب على بيان الغرض والمقترح البحثي ورسالة المشرف."];
  var cc = ls("masarok-country"), lv = ls("masarok-level");
  var box = document.querySelector("[data-for-you]");
  if (box && (W[cc] || lv === "master" || lv === "phd")) {
    var t = (lv === "master" || lv === "phd") ? PG : W[cc];
    box.textContent = "📍 " + t[AR ? 1 : 0];
    box.hidden = false;
  }
})();

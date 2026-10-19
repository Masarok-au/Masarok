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
    box.textContent = t[AR ? 1 : 0];
    box.hidden = false;
  }
  // ---------- the climb: as you scroll, your avatar climbs the 10 levels (read scroll, damped; never scroll-jacking) ----------
  var climb = document.querySelector("[data-climb]");
  if (climb) {
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var stage = climb.querySelector(".climb-stage"), me = climb.querySelector(".climb-me");
    var steps = [].slice.call(climb.querySelectorAll(".climb-steps li")), names = [].slice.call(climb.querySelectorAll(".climb-names li"));
    var N = steps.length, cur = -1, target = 0, smooth = 0, running = false, geo = null;
    function measure() {
      var W = stage.clientWidth, H = stage.clientHeight, mw = me.offsetWidth, inner = W - 36, top = 24;
      geo = { x: [], y: [] };
      steps.forEach(function (li, i) {
        var cx = 18 + inner * (i + .5) / N - mw / 2;
        geo.x.push(AR ? W - cx - mw : cx);
        geo.y.push((H - top) * parseFloat(li.style.getPropertyValue("--h")) / 100);
      });
    }
    function mark(n) {
      if (n === cur) return; cur = n;
      steps.forEach(function (li, i) { li.classList.toggle("is-done", i < n); li.classList.toggle("is-on", i === n); });
      names.forEach(function (li, i) { li.classList.toggle("is-done", i < n); li.classList.toggle("is-on", i === n); });
    }
    function place(p) {
      var f = Math.max(0, Math.min(1, p)) * (N - 1), i0 = Math.floor(f), i1 = Math.min(N - 1, i0 + 1), k = f - i0;
      var x = geo.x[i0] + (geo.x[i1] - geo.x[i0]) * k, y = geo.y[i0] + (geo.y[i1] - geo.y[i0]) * k + Math.sin(k * Math.PI) * 16;
      me.style.transform = "translate3d(" + x.toFixed(1) + "px," + (-y).toFixed(1) + "px,0)";
      mark(Math.round(f));
    }
    function read() {
      var r = climb.getBoundingClientRect(), span = r.height - window.innerHeight;
      target = span > 0 ? Math.max(0, Math.min(1, -r.top / span)) : 1;
    }
    function tick() {
      read(); smooth += (target - smooth) * 0.1;
      if (Math.abs(target - smooth) < 0.0005) smooth = target;
      place(smooth);
      if (running) requestAnimationFrame(tick);
    }
    measure();
    if (reduce || !("IntersectionObserver" in window)) { climb.classList.add("is-static"); place(1); }
    else {
      read(); smooth = target; place(smooth);
      new IntersectionObserver(function (es) {
        var on = es[0].isIntersecting;
        if (on && !running) { running = true; requestAnimationFrame(tick); } else if (!on) running = false;
      }).observe(climb);
      window.addEventListener("resize", function () { measure(); place(smooth); }, { passive: true });
    }
  }
})();

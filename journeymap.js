/* Masarok journey map: the student's steps drawn as stops on a night road,
   from home in Saudi Arabia to their campus. Opens inside the guide panel.
   Loaded after journey.js and game.js. */
(function () {
  "use strict";

  var lang = (document.documentElement.lang || "en").slice(0, 2) === "ar" ? "ar" : "en";
  var rtl = document.documentElement.dir === "rtl";
  var A = lang === "ar" ? 1 : 0;
  var KEY = "masarok-map-at";
  var W = 360;
  function reduced() { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c]; }); }
  function fmt(s, o) { return String(s).replace(/\{(\w+)\}/g, function (m, k) { return o.hasOwnProperty(k) ? o[k] : m; }); }
  function J() { return window.MasarokJourney; }

  var T = {
    open: ["Journey map", "خريطة الرحلة"],
    eyebrow: ["Your journey map", "خريطة رحلتك"],
    h: ["From home to {uni}", "من البيت إلى {uni}"],
    hAny: ["From home to campus", "من البيت إلى الجامعة"],
    sub: ["{d} of {n} stops done", "المحطات المنجزة: {d} من {n}"],
    back: ["Back to my step", "العودة إلى خطوتي"],
    home: ["Home", "البيت"], homeSub: ["Saudi Arabia", "المملكة العربية السعودية"],
    campus: ["Your campus", "جامعتك"],
    stop: ["Stop {n}", "المحطة {n}"],
    here: ["You are here", "أنت هنا"], done: ["Done", "تمت"], skip: ["Skipped", "تخطّيتها"], locked: ["Locked", "مقفلة"],
    earned: ["Badge earned: {b}", "حصلت على وسام: {b}"], unlocks: ["Unlocks: {b}", "تفتح وسام: {b}"],
    arrived: ["You made it. Welcome to campus!", "وصلت! أهلًا بك في جامعتك"],
    part: ["Part {n}", "المرحلة {n}"],
    hint: ["Tap a stop to open it. Locked stops open one by one as you finish the stop before.", "اضغط على أي محطة لفتحها. المحطات المقفلة تُفتح واحدة تلو الأخرى كلما أنهيت المحطة التي قبلها."],
    label: ["{stop}: {title}. {state}", "{stop}: {title}. {state}"]
  };
  function tx(k) { return T[k][A]; }

  // the five parts of the road
  var CH = [
    { n: ["Get ready", "الاستعداد"], ids: null },
    { n: ["Your offer", "القبول"], ids: ["offerF", "offer"] },
    { n: ["The scholarship", "البعثة"], ids: ["qubool", "safeer"] },
    { n: ["Pack your bags", "تجهّز للسفر"], ids: ["visa", "housing"] },
    { n: ["Arrive", "الوصول"], ids: ["arrive", "progressF"] }
  ];
  function chapterOf(id) { for (var c = CH.length - 1; c > 0; c--) if (CH[c].ids.indexOf(id) > -1) return c; return 0; }

  // the badge each stop unlocks (see game.js)
  var BADGE_AT = { englishF: "english", englishB: "english", englishPg: "english", offerF: "offer", offer: "offer", qubool: "nominated", safeer: "guarantee", visa: "visa", housing: "home", arrive: "landed" };
  function badge(id) {
    var G = window.MasarokGame, b = BADGE_AT[id];
    if (!G || !b) return null;
    for (var i = 0; i < G.badges.length; i++) if (G.badges[i].id === b) return G.badges[i];
    return null;
  }
  function summitName() { var G = window.MasarokGame; if (G) for (var i = 0; i < G.badges.length; i++) if (G.badges[i].id === "summit") return G.badges[i].n[A]; return ""; }
  function medal(icon, locked) { var G = window.MasarokGame; return G && G.medal ? G.medal(icon, { locked: locked }) : ""; }

  var ICON = {
    lock: '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="3" y="7" width="10" height="7" rx="1.5" fill="currentColor"/><path d="M5 7V5a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
    tick: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    skip: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M9 4.5L12.5 8 9 11.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    map: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M1.5 3.5l4-1.5 5 1.5 4-1.5v10.5l-4 1.5-5-1.5-4 1.5z M5.5 2v10.5 M10.5 3.5V14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
    back: '<svg viewBox="0 0 16 16" aria-hidden="true" class="jm-back-ic"><path d="M13 8H4M7.5 4.5L4 8l3.5 3.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  // ---------- where things go ----------
  var DOOR = { x: 96, y: 152 };
  // f stretches the gaps on narrow screens so the labels never touch
  function layout(ids, f) {
    var y = 196, pts = [], chapters = [], plane = null, last = -1;
    ids.forEach(function (id, i) {
      var c = chapterOf(id);
      if (c !== last) {
        if (c === 4) { plane = y + 10 * f; y += 34 * f; }
        chapters.push({ c: c, y: y + 22 * f });
        y += 46 * f; last = c;
      }
      var sy = Math.round(y + 44 * f);
      pts.push({ x: i % 2 === 0 ? 138 : 62, y: sy, id: id });
      y = sy + 48 * f;
    });
    var end = { x: 100, y: Math.round(y + 118) };
    return { pts: pts, chapters: chapters, plane: plane, end: end, H: end.y + 40 };
  }
  function seg(a, b) {
    var dy = b.y - a.y;
    return "M" + a.x + " " + a.y + " C" + a.x + " " + (a.y + dy * 0.55).toFixed(1) + " " + b.x + " " + (b.y - dy * 0.55).toFixed(1) + " " + b.x + " " + b.y;
  }
  function L(x) { return ((rtl ? W - x : x) / W * 100).toFixed(3) + "%"; }

  // ---------- scenery ----------
  function rand(s) { return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }
  function stars(H) {
    var r = rand(7), h = "", n = Math.round(H / 14);
    for (var i = 0; i < n; i++) {
      var x = r() * W, y = r() * (H - 60), s = (0.5 + r() * 1.1).toFixed(2);
      if (y > 100 && x > 168) continue; // keep the label side clear
      x = x.toFixed(1); y = y.toFixed(1);
      h += '<circle class="' + (i % 4 === 0 ? "jm-tw" : "") + '" style="animation-delay:-' + (r() * 4).toFixed(2) + 's" cx="' + x + '" cy="' + y + '" r="' + s + '"/>';
    }
    return '<g fill="#F3EBDD" opacity=".7">' + h + "</g>";
  }
  function palm(x, y, s) {
    return '<g transform="translate(' + x + " " + y + ") scale(" + s + ')">' +
      '<path d="M0 0 Q-3 -26 3 -52" fill="none" stroke="#6B4A2B" stroke-width="5" stroke-linecap="round"/>' +
      '<path d="M0 -6 l5 -2 M-1 -16 l5 -2 M0 -26 l5 -2 M1 -36 l5 -2 M2 -45 l5 -2" stroke="#4E351E" stroke-width="1.4"/>' +
      '<g fill="#2F6B4F" transform="translate(3 -52)">' +
        '<path d="M0 0 Q-14 -10 -30 -2 Q-14 -5 0 4 Z"/><path d="M0 0 Q14 -10 30 -2 Q14 -5 0 4 Z"/>' +
        '<path d="M0 0 Q-6 -16 -20 -20 Q-10 -10 -2 2 Z"/><path d="M0 0 Q6 -16 20 -20 Q10 -10 2 2 Z"/>' +
        '<path d="M0 0 Q-18 2 -26 14 Q-14 4 0 3 Z" fill="#285C44"/><path d="M0 0 Q18 2 26 14 Q14 4 0 3 Z" fill="#285C44"/>' +
        '<circle cx="-2" cy="4" r="2.4" fill="#B5652A"/><circle cx="2.6" cy="5" r="2.4" fill="#C9772F"/>' +
      "</g></g>";
  }
  function crenels(x0, x1, y, size, fill) {
    var h = "";
    for (var x = x0; x + size <= x1 + 0.01; x += size * 1.6) h += "M" + x + " " + y + " l" + size / 2 + " -" + size + " l" + size / 2 + " " + size + " Z ";
    return '<path d="' + h + '" fill="' + fill + '"/>';
  }
  function tri(x, y, s) { return "M" + x + " " + (y + s) + " l" + s / 2 + " -" + s + " l" + s / 2 + " " + s + " Z "; }
  function home() {
    // a Najdi mud house with triangle vents, a palm on each side, dunes, a moon
    var mud = "#B07D4F", mudD = "#8E6038";
    return '<g class="jm-home">' +
      '<g transform="translate(316 46)"><circle r="17" fill="#F3E3B8"/><circle cx="7" cy="-5" r="15" fill="#0B1626"/></g>' +
      '<path d="M-10 168 Q60 126 140 150 T300 140 T380 158 L380 190 L-10 190 Z" fill="#2B2216" opacity=".85"/>' +
      '<path d="M-10 176 Q90 150 190 168 T380 164 L380 196 L-10 196 Z" fill="#3A2C1B"/>' +
      palm(28, 160, 1) + palm(342, 170, 0.72) +
      // tower and house
      '<rect x="120" y="70" width="34" height="86" fill="' + mudD + '"/>' + crenels(120, 154, 70, 6, mudD) +
      '<rect x="44" y="94" width="94" height="62" fill="' + mud + '"/>' + crenels(44, 138, 94, 7, mud) +
      '<path d="' + tri(54, 106, 7) + tri(66, 106, 7) + tri(112, 106, 7) + tri(124, 106, 7) + tri(130, 82, 6) + tri(140, 82, 6) + '" fill="#3A2412"/>' +
      '<rect x="56" y="124" width="12" height="12" rx="1" fill="#F2C66D"/><rect x="118" y="124" width="12" height="12" rx="1" fill="#F2C66D"/>' +
      '<rect x="131" y="102" width="12" height="14" rx="1" fill="#F2C66D" opacity=".9"/>' +
      '<path d="M86 156 V132 Q96 122 106 132 V156 Z" fill="#6B3F1E"/><path d="M96 128 V156" stroke="#4A2A12" stroke-width="1.2"/>' +
      '<circle cx="92" cy="144" r="1.2" fill="#E2B66C"/><circle cx="100" cy="144" r="1.2" fill="#E2B66C"/>' +
      '<path d="M44 156 H154" stroke="#6E4A2A" stroke-width="2"/>' +
      "</g>";
  }
  function campus(e, finished) {
    // a campus hall with columns, a clock tower, trees and a gold pennant
    var x = e.x, y = e.y, stone = "#24476F", stoneL = "#2E5785";
    var cols = "";
    for (var i = 0; i < 6; i++) cols += '<rect x="' + (x - 47 + i * 18) + '" y="' + (y - 50) + '" width="7" height="44" fill="' + stoneL + '"/>';
    var win = "";
    for (var j = 0; j < 5; j++) win += '<rect x="' + (x - 42 + j * 18) + '" y="' + (y - 44) + '" width="8" height="14" rx="4" fill="#F2C66D" opacity="' + (finished ? 1 : 0.55) + '"/>';
    return '<g class="jm-campus">' +
      '<path d="M-10 ' + (y + 6) + ' Q120 ' + (y - 12) + " 380 " + (y + 4) + " L380 " + (y + 100) + " L-10 " + (y + 100) + ' Z" fill="#142C22"/>' +
      '<g fill="#1F4A36"><circle cx="' + (x - 78) + '" cy="' + (y - 22) + '" r="20"/><circle cx="' + (x - 62) + '" cy="' + (y - 36) + '" r="16"/><circle cx="' + (x + 76) + '" cy="' + (y - 24) + '" r="19"/><circle cx="' + (x + 90) + '" cy="' + (y - 12) + '" r="14"/></g>' +
      '<rect x="' + (x - 71) + '" y="' + (y - 18) + '" width="4" height="20" fill="#3B2A1A"/><rect x="' + (x + 74) + '" y="' + (y - 16) + '" width="4" height="18" fill="#3B2A1A"/>' +
      // clock tower
      '<rect x="' + (x - 11) + '" y="' + (y - 118) + '" width="22" height="50" fill="' + stone + '"/>' +
      '<path d="M' + (x - 14) + " " + (y - 118) + " L" + x + " " + (y - 140) + " L" + (x + 14) + " " + (y - 118) + ' Z" fill="#1A3556"/>' +
      '<circle cx="' + x + '" cy="' + (y - 102) + '" r="7" fill="#F3EBDD"/><path d="M' + x + " " + (y - 102) + " V" + (y - 107) + " M" + x + " " + (y - 102) + " H" + (x + 4) + '" stroke="#0B1626" stroke-width="1.4" stroke-linecap="round"/>' +
      // pennant
      '<path d="M' + x + " " + (y - 140) + " V" + (y - 162) + '" stroke="#C99A5B" stroke-width="1.6"/>' +
      '<path class="jm-flag" d="M' + x + " " + (y - 162) + " L" + (x + 18) + " " + (y - 157) + " L" + x + " " + (y - 151) + ' Z" fill="#E2B66C"/>' +
      // hall
      '<path d="M' + (x - 60) + " " + (y - 68) + " L" + x + " " + (y - 92) + " L" + (x + 60) + " " + (y - 68) + ' Z" fill="' + stone + '"/>' +
      '<path d="M' + (x - 44) + " " + (y - 72) + " L" + x + " " + (y - 86) + " L" + (x + 44) + " " + (y - 72) + ' Z" fill="none" stroke="#C99A5B" stroke-width="1"/>' +
      '<rect x="' + (x - 58) + '" y="' + (y - 68) + '" width="116" height="10" fill="' + stoneL + '"/>' +
      '<rect x="' + (x - 54) + '" y="' + (y - 58) + '" width="108" height="52" fill="' + stone + '"/>' + win + cols +
      '<rect x="' + (x - 62) + '" y="' + (y - 6) + '" width="124" height="5" fill="' + stoneL + '"/><rect x="' + (x - 66) + '" y="' + (y - 1) + '" width="132" height="5" fill="#1A3556"/>' +
      "</g>";
  }
  function planeArt(y) {
    // a plane flying over, on the label side of the road
    return '<g class="jm-plane-g"><path d="M196 ' + (y + 22) + " Q270 " + (y - 8) + " 330 " + (y + 4) + '" fill="none" stroke="#F3EBDD" stroke-width="1.4" stroke-dasharray="2 5" opacity=".5"/>' +
      '<g class="jm-plane" transform="translate(334 ' + (y + 3) + ') rotate(8)"><path d="M-14 0 L12 -1.6 Q16 0 12 1.6 Z M-2 -1 L-8 -10 L-4 -10 L5 -1 Z M-2 1 L-8 10 L-4 10 L5 1 Z M-13 -0.6 L-16 -5 L-13.5 -5 L-10 -0.6 Z" fill="#F3EBDD"/></g></g>';
  }

  // ---------- the view ----------
  var view = null, lastBtn = null;
  function ensure() {
    var panel = document.querySelector(".jr-panel"); if (!panel) return null;
    view = panel.querySelector(".jm");
    if (!view) {
      view = document.createElement("section");
      view.className = "jm"; view.hidden = true;
      view.setAttribute("aria-labelledby", "jm-h");
      panel.querySelector(".jr-body").insertAdjacentElement("afterend", view);
      view.addEventListener("click", function (e) {
        if (e.target.closest("[data-jm-back]")) { e.preventDefault(); close(true); return; }
        var st = e.target.closest("[data-step]");
        if (st && st.getAttribute("aria-disabled") !== "true") close(false); // journey.js then shows the step
      });
    }
    return view;
  }

  function info() {
    var M = window.Masarok, v = M && M.values ? M.values() : { v: {} }, C = window.MasarokCountry;
    var cn = C && v.cc && C.name ? C.name(v.cc) : "";
    return { uni: v.hasUni && v.v ? v.v.short : "", city: v.hasUni && v.v ? v.v.city : "", country: cn };
  }
  function stateOf(st, lv, id, i, cur) {
    var d = st.done && st.done[lv] ? st.done[lv][id] : null;
    return d === "done" ? "done" : d === "skip" ? "skip" : i === cur ? "here" : "locked";
  }

  function build() {
    var j = J(), lv = j.level(), ids = j.steps(lv), n = ids.length, st = j.state(), cur = j.current(lv);
    var fin = cur >= n, d = 0;
    ids.forEach(function (id) { if (j.isDone(lv, id)) d++; });
    var sheet = view.closest(".jr-sheet"), mw = Math.min(480, (sheet ? sheet.clientWidth : window.innerWidth) - 28);
    var g = layout(ids, Math.max(1, Math.min(1.6, 1.3 / (mw / W)))), H = g.H, me = info();
    var all = [DOOR].concat(g.pts, [g.end]);

    // road: one piece per stop; piece k leads to point k (k = 0 is the first stop, n is the campus)
    var segs = "", base = "";
    for (var k = 0; k <= n; k++) {
      var dd = seg(all[k], all[k + 1]);
      base += dd + " ";
      segs += '<path class="jm-gone" data-seg="' + k + '" d="' + dd + '"/>';
    }
    var svg = '<svg class="jm-svg" viewBox="0 0 ' + W + " " + H + '" aria-hidden="true" focusable="false">' +
      '<g' + (rtl ? ' transform="translate(' + W + ' 0) scale(-1 1)"' : "") + ">" +
      stars(H) + home() + (g.plane != null ? planeArt(g.plane) : "") +
      '<path class="jm-edge" d="' + base + '"/><path class="jm-road" d="' + base + '"/><path class="jm-mid" d="' + base + '"/>' +
      '<g class="jm-segs">' + segs + "</g>" + campus(g.end, fin) +
      "</g></svg>";

    var h = "";
    // chapters
    g.chapters.forEach(function (c) {
      h += '<div class="jm-ch" style="top:' + (c.y / H * 100).toFixed(3) + '%"><span>' + esc(fmt(tx("part"), { n: c.c + 1 })) + "</span><b>" + esc(CH[c.c].n[A]) + '</b><i class="sadu"></i></div>';
    });
    // home
    h += '<div class="jm-lbl jm-place" style="top:' + (118 / H * 100).toFixed(3) + '%"><b>' + esc(tx("home")) + "</b><small>" + esc(tx("homeSub")) + "</small></div>";
    // stops
    g.pts.forEach(function (p, i) {
      var s = stateOf(st, lv, p.id, i, cur), title = j.title(p.id), b = badge(p.id);
      var stTxt = { done: tx("done"), skip: tx("skip"), here: tx("here"), locked: tx("locked") }[s];
      var lock = s === "locked" ? ' aria-disabled="true"' : "";
      var top = (p.y / H * 100).toFixed(3) + "%";
      h += '<button type="button" class="jm-stop is-' + s + '" data-step="' + i + '" data-i="' + i + '" tabindex="-1" aria-hidden="true"' + lock + ' style="left:' + L(p.x) + "; top:" + top + '">' +
        (s === "done" ? ICON.tick : s === "skip" ? ICON.skip : s === "locked" ? ICON.lock : "<span>" + (i + 1) + "</span>") + "</button>";
      var bl = "";
      if (b) {
        var got = s === "done" || s === "skip";
        bl = '<span class="jm-badge' + (got ? " is-got" : "") + '">' + medal(b.i, !got) + "<em>" + esc(fmt(got ? tx("earned") : tx("unlocks"), { b: b.n[A] })) + "</em></span>";
      }
      h += '<button type="button" class="jm-lbl is-' + s + '" data-step="' + i + '"' + lock + ' style="top:' + top + '"' +
        ' aria-label="' + esc(fmt(tx("label"), { stop: fmt(tx("stop"), { n: i + 1 }), title: title, state: stTxt })) + '"' + (s === "here" ? ' aria-current="step"' : "") + ">" +
        '<span class="jm-k">' + esc(fmt(tx("stop"), { n: i + 1 })) + " · " + esc(stTxt) + "</span>" +
        "<b>" + esc(title) + "</b>" + bl + "</button>";
    });
    // campus
    var summit = window.MasarokGame ? medal("summit", !fin) : "";
    h += '<div class="jm-lbl jm-place jm-end' + (fin ? " is-got" : "") + '" style="top:' + ((g.end.y - 58) / H * 100).toFixed(3) + '%">' +
      "<b>" + esc(me.uni || tx("campus")) + "</b><small>" + esc([me.city, me.country].filter(Boolean).join(" · ")) + "</small>" +
      (fin ? '<span class="jm-badge is-got">' + summit + "<em>" + esc(tx("arrived")) + "</em></span>" : summit ? '<span class="jm-badge">' + summit + "<em>" + esc(fmt(tx("unlocks"), { b: summitName() })) + "</em></span>" : "") + "</div>";
    // the traveller
    h += '<div class="jm-me" aria-hidden="true">' + (j.figure ? j.figure(fin ? "is-cheering" : "") : "") + "</div>";

    var head = '<div class="jm-head">' +
      '<button type="button" class="jr-textbtn jm-back" data-jm-back>' + ICON.back + esc(tx("back")) + "</button>" +
      '<p class="eyebrow">' + esc(tx("eyebrow")) + "</p>" +
      '<h2 id="jm-h" tabindex="-1">' + esc(me.uni ? fmt(tx("h"), { uni: me.uni }) : tx("hAny")) + "</h2>" +
      '<div class="jm-sub"><span>' + esc(fmt(tx("sub"), { d: d, n: n })) + '</span><i><b style="width:' + Math.round(d / n * 100) + '%"></b></i></div>' +
      '<p class="jm-hint">' + esc(tx("hint")) + "</p></div>";

    view.innerHTML = head + '<div class="jm-map" style="aspect-ratio:' + W + " / " + H + '">' + svg + h + "</div>";
    return { lv: lv, n: n, cur: Math.min(cur, n), all: all, H: H };
  }

  // put the traveller at point k (0..n-1 a stop, n the campus) or at an exact spot
  function placeAt(me, x, y, H) {
    me.style.left = L(x); me.style.top = (y / H * 100).toFixed(3) + "%";
  }
  function paintSegs(upto) {
    view.querySelectorAll("[data-seg]").forEach(function (p) {
      var k = +p.getAttribute("data-seg");
      p.setAttribute("class", k <= upto ? "jm-gone is-on" : "jm-gone");
      p.style.strokeDasharray = ""; p.style.strokeDashoffset = "";
    });
  }
  function saved() { try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { return null; } }
  function remember(lv, i) { try { localStorage.setItem(KEY, JSON.stringify({ lv: lv, i: i })); } catch (e) {} }

  var anim = 0;
  function travel(r) {
    var me = view.querySelector(".jm-me"), fig = me.querySelector(".jr-fig");
    var s = saved(), from = s && s.lv === r.lv && s.i < r.cur && s.i >= 0 ? s.i : r.cur;
    var to = r.cur;
    remember(r.lv, to);
    var P = r.all[to + 1];
    paintSegs(from);
    if (from === to || reduced() || !me.animate) { paintSegs(to); placeAt(me, P.x, P.y, r.H); return arrive(to, r, false); }
    var A0 = r.all[from + 1]; placeAt(me, A0.x, A0.y, r.H);
    var paths = [], total = 0;
    for (var k = from + 1; k <= to; k++) {
      var p = view.querySelector('[data-seg="' + k + '"]'), len = p.getTotalLength();
      p.setAttribute("class", "jm-gone is-on"); p.style.strokeDasharray = len; p.style.strokeDashoffset = len;
      paths.push({ p: p, len: len, at: total }); total += len;
    }
    var dur = Math.min(1100 * paths.length, 2600), t0 = null, my = ++anim;
    if (fig) fig.classList.add("is-walking");
    me.classList.add("is-walking");
    function frame(ts) {
      if (my !== anim || !view || view.hidden) return;
      if (t0 === null) t0 = ts;
      var f = Math.min(1, (ts - t0) / dur), e = f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2, dist = e * total;
      paths.forEach(function (q) {
        var local = Math.max(0, Math.min(q.len, dist - q.at));
        q.p.style.strokeDashoffset = q.len - local;
        if (dist >= q.at && dist <= q.at + q.len) { var pt = q.p.getPointAtLength(local); placeAt(me, pt.x, pt.y, r.H); }
      });
      if (f < 1) requestAnimationFrame(frame);
      else { paintSegs(to); placeAt(me, P.x, P.y, r.H); if (fig) fig.classList.remove("is-walking"); me.classList.remove("is-walking"); arrive(to, r, true); }
    }
    // scroll so the road ahead is in view, then walk
    setTimeout(function () { requestAnimationFrame(frame); }, 450);
  }
  function arrive(k, r, moved) {
    var me = view.querySelector(".jm-me"), fig = me.querySelector(".jr-fig");
    var stop = view.querySelector('.jm-stop[data-i="' + k + '"]');
    if (stop && moved) { stop.classList.remove("is-pop"); void stop.offsetWidth; stop.classList.add("is-pop"); }
    if (fig && k < r.n && !reduced()) { fig.classList.add("is-waving"); setTimeout(function () { fig.classList.remove("is-waving"); }, 1800); }
  }

  function scrollToMe(r, smooth) {
    var sheet = view.closest(".jr-sheet"), map = view.querySelector(".jm-map");
    if (!sheet || !map) return;
    var P = r.all[r.cur + 1], y = map.offsetTop + map.offsetHeight * (P.y / r.H);
    var top = Math.max(0, y - sheet.clientHeight * 0.55);
    if (sheet.scrollTo) sheet.scrollTo({ top: top, behavior: smooth && !reduced() ? "smooth" : "auto" });
    else sheet.scrollTop = top;
  }

  function open(from) {
    var j = J(); if (!j || !j.level() || !ensure()) return;
    lastBtn = from || null;
    var body = view.parentNode.querySelector(".jr-body");
    var r = build();
    body.hidden = true; view.hidden = false;
    var sheet = view.closest(".jr-sheet"); if (sheet) sheet.scrollTop = 0;
    var hd = view.querySelector("#jm-h"); if (hd) hd.focus({ preventScroll: true });
    requestAnimationFrame(function () { scrollToMe(r, true); travel(r); });
  }
  function close(focusBack) {
    if (!view || view.hidden) return;
    anim++;
    view.hidden = true;
    var body = view.parentNode.querySelector(".jr-body"); body.hidden = false;
    if (focusBack) {
      var b = view.parentNode.querySelector(".jm-open");
      if (b) { b.focus({ preventScroll: true }); var w = b.closest(".jr-stairs-wrap"); if (w && w.scrollIntoView) w.scrollIntoView({ block: "center" }); }
    }
  }
  function isOpen() { return !!(view && !view.hidden); }

  // ---------- the buttons that open it ----------
  function addButtons() {
    var wrap = document.querySelector(".jr-panel .jr-stairs-wrap");
    if (wrap && !wrap.querySelector(".jm-open")) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "jm-open"; b.setAttribute("data-jm-open", "");
      b.innerHTML = ICON.map + "<span>" + esc(tx("open")) + "</span>";
      wrap.appendChild(b);
    }
  }
  function addPlanChip() {
    var chips = document.querySelector(".jr-banner .jr-plan:not([hidden]) .jr-plan-chips");
    if (chips && !chips.querySelector(".jm-chip")) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "jm-chip"; b.setAttribute("data-jm-open", "");
      b.innerHTML = ICON.map + esc(tx("open"));
      chips.appendChild(b);
    }
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-jm-open]");
    if (b) {
      e.preventDefault();
      var j = J(); if (!j) return;
      if (!j.isOpen()) { j.open(); setTimeout(function () { if (j.onMain()) open(null); }, 60); }
      else open(b);
      return;
    }
    if (e.target.closest && e.target.closest("[data-journey-close]") && isOpen()) close(false);
  }, true);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isOpen()) { e.preventDefault(); e.stopPropagation(); close(true); }
  }, true);
  document.addEventListener("masarok:journey-render", function (e) {
    addButtons();
    // any other screen (level, questions) closes the map
    if (isOpen() && e.detail && e.detail.screen !== "main") close(false);
  });
  document.addEventListener("masarok:journey-banner", addPlanChip);
  document.addEventListener("masarok:journey", function (e) {
    // a step done while the map is open (e.g. from the celebration card) redraws it
    if (isOpen() && e.detail && e.detail.type === "step") setTimeout(function () { if (isOpen()) { var r = build(); scrollToMe(r, true); travel(r); } }, 50);
  });

  var rz = 0, lastW = window.innerWidth;
  window.addEventListener("resize", function () {
    clearTimeout(rz);
    rz = setTimeout(function () { if (isOpen() && window.innerWidth !== lastW) { lastW = window.innerWidth; travel(build()); } }, 200);
  });

  window.MasarokMap = { open: function () { open(null); }, close: function () { close(false); }, isOpen: isOpen };
  function init() { addButtons(); addPlanChip(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();

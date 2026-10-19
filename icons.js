/* Masarok icons: one set of line icons (24×24, 1.8 stroke, currentColor) used everywhere instead of emoji,
   so icons look the same on every phone and match the weight of the text next to them.
   MasarokIcon.svg(name) → markup · MasarokIcon.from(emojiOrName) → markup (country flags stay as they are). */
(function () {
  "use strict";
  var P = {
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    clipboard: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6v3H9zM8.5 11h7M8.5 15h5"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
    puzzle: '<path d="M5 8h3.2a2 2 0 1 1 3.6 0H15v3.2a2 2 0 1 1 0 3.6V19H5z"/>',
    pen: '<path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19z"/><path d="M14.5 6.5l3 3"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7"/>',
    cards: '<rect x="3.5" y="6" width="12" height="15" rx="2"/><path d="M8.5 6V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3"/>',
    bolt: '<path d="M13 3L5 13.5h6L10 21l8-10.5h-6z"/>',
    form: '<rect x="4.5" y="3.5" width="15" height="17" rx="2"/><path d="M8 8h8M8 12h8M8 16h4"/>',
    brain: '<path d="M9 4.5a3 3 0 0 0-3 3 3 3 0 0 0-1.5 5.3A3 3 0 0 0 7 17.5a2.5 2.5 0 0 0 5 .5V5.5A2.5 2.5 0 0 0 9 4.5zM15 4.5a3 3 0 0 1 3 3 3 3 0 0 1 1.5 5.3 3 3 0 0 1-2.5 4.7 2.5 2.5 0 0 1-5 .5"/>',
    book: '<path d="M4 5.5C6.5 4.5 9.5 4.5 12 6c2.5-1.5 5.5-1.5 8-.5v13c-2.5-1-5.5-1-8 .5-2.5-1.5-5.5-1.5-8-.5z"/><path d="M12 6v13.5"/>',
    headphones: '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3.5" y="14" width="4" height="6" rx="1.5"/><rect x="16.5" y="14" width="4" height="6" rx="1.5"/>',
    choices: '<circle cx="6" cy="7" r="1.6"/><circle cx="6" cy="12" r="1.6"/><circle cx="6" cy="17" r="1.6"/><path d="M10 7h9M10 12h9M10 17h9"/>',
    map: '<path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14M15 6v14"/>',
    cap: '<path d="M2.5 9.5L12 5l9.5 4.5L12 14z"/><path d="M6.5 11.5V16c3.3 2.3 7.7 2.3 11 0v-4.5M21.5 9.5V15"/>',
    timer: '<circle cx="12" cy="13.5" r="7.5"/><path d="M12 9.5v4l2.5 2M9.5 3h5"/>',
    chart: '<path d="M4 20h16M7 16v-5M12 16V7M17 16v-8"/>',
    chat: '<path d="M4 5h16v11H10l-5 4v-4H4z"/>',
    speech: '<path d="M4 5h11v8H9l-4 3v-3H4z"/><path d="M15 9h5v8h-1v3l-4-3h-4v-3"/>',
    leaf: '<path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15"/><path d="M5 19L13 11"/>',
    bulb: '<path d="M9 18h6M10 21h4"/><path d="M8.5 14.5A6 6 0 1 1 15.5 14.5c-.9.8-1.5 1.7-1.5 3h-4c0-1.3-.6-2.2-1.5-3z"/>',
    health: '<path d="M12 20s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 7.5 4.2 4.2 0 0 1 19.5 10C19.5 15.4 12 20 12 20z"/><path d="M9 12h2l1-2 1.5 4 1-2H16"/>',
    flag: '<path d="M5 21V4"/><path d="M5 4h12l-2.5 4L17 12H5"/>',
    trophy: '<path d="M8 4h8v6a4 4 0 0 1-8 0z"/><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 14v4M8.5 21h7"/>',
    film: '<rect x="3.5" y="5" width="17" height="14" rx="2"/><path d="M3.5 9.5h17M8 5l2.5 4.5M13.5 5L16 9.5"/>',
    scissors: '<circle cx="6.5" cy="17" r="2.5"/><circle cx="17.5" cy="17" r="2.5"/><path d="M8.5 15.5L19 4M15.5 15.5L5 4"/>',
    target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".8" fill="currentColor"/>',
    note: '<path d="M5 4h10l4 4v12H5z"/><path d="M15 4v4h4M8.5 12h7M8.5 16h5"/>',
    flask: '<path d="M10 3v6L5 18a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3L14 9V3M8.5 3h7M7.5 15h9"/>',
    mail: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3.5 7l8.5 6 8.5-6"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.8 2.8L16.5 9"/>',
    folder: '<path d="M3.5 7a2 2 0 0 1 2-2h4l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"/>',
    letters: '<path d="M3.5 18L8 6l4.5 12M5.2 14h5.6"/><path d="M15 11.5a3 3 0 1 1 0 6.5h-.5M19.5 11v7"/>',
    detective: '<circle cx="10.5" cy="10.5" r="5.5"/><path d="M14.5 14.5L20 20M8 10.5a2.5 2.5 0 0 1 2.5-2.5"/>',
    coins: '<ellipse cx="9" cy="7" rx="5" ry="2.5"/><path d="M4 7v4c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V7"/><path d="M10 15.5c.9 1.2 2.9 2 5 2 2.8 0 5-1.1 5-2.5v-4c0-1.2-1.6-2.2-3.8-2.4"/>',
    suitcase: '<rect x="4" y="7" width="16" height="12" rx="2"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M9 11v4M15 11v4"/>',
    scale: '<path d="M12 4v16M7 20h10M5 7h14"/><path d="M5 7l-2.5 6a2.5 2.5 0 0 0 5 0zM19 7l-2.5 6a2.5 2.5 0 0 0 5 0z"/>',
    landing: '<path d="M3 20h18"/><path d="M4 9.5l2-.5 2.5 3 4-1-3.5-6 2-.5 6 5.5 3.5-1a1.5 1.5 0 0 1 .8 2.9L6.5 15.5 4 13z"/>',
    house: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',
    doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/>',
    card: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3 9.5h18M7 15h4"/>',
    books: '<path d="M5 4h4v16H5zM10 4h4v16h-4z"/><path d="M15.2 5.2l3.8-1 3 15.5-3.8 1z"/>',
    people: '<circle cx="9" cy="8.5" r="3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><circle cx="16.5" cy="9.5" r="2.5"/><path d="M15.5 14a4.5 4.5 0 0 1 5 5"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M18.5 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>',
    passport: '<rect x="5.5" y="3" width="13" height="18" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M9 16.5h6"/>',
    city: '<path d="M3 21h18M5 21V10h5v11M10 21V5h6v16M16 21v-8h3v8"/><path d="M12.5 8h1M12.5 11h1M12.5 14h1M7 13h1M7 16h1"/>',
    lock: '<rect x="5.5" y="11" width="13" height="9" rx="2"/><path d="M8.5 11V8a3.5 3.5 0 0 1 7 0v3"/>',
    medal: '<circle cx="12" cy="15" r="5"/><path d="M8.5 11L6 3h4l2 5 2-5h4l-2.5 8"/>',
    hanger: '<path d="M12 7.5a2 2 0 1 1 2-2c0 1-1 1.5-2 2.5v1.5L3.5 16a1 1 0 0 0 .5 1.8h16a1 1 0 0 0 .5-1.8L12 9.5"/>',
    share: '<path d="M12 15V3.5M8 7.5l4-4 4 4"/><path d="M5 12v7a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 19v-7"/>',
    translate: '<path d="M3.5 5.5h9M8 3.5v2M5.5 5.5c.5 3 2.5 5.5 6 7M10.5 5.5C10 9 7.5 11.5 4 13"/><path d="M12.5 20.5l3.5-9 3.5 9M13.6 17.5h4.8"/>',
    phone: '<rect x="7" y="2.5" width="10" height="19" rx="2.2"/><path d="M11 18.5h2"/>',
    bank: '<path d="M3 9.5L12 4l9 5.5M4.5 20h15M6 10v7M10 10v7M14 10v7M18 10v7"/>',
    megaphone: '<path d="M4 10v4h3l9 5V5L7 10z"/><path d="M7 14l1.5 5h2.5L10 15M19 9.5a3 3 0 0 1 0 5"/>',
    signal: '<path d="M5 19v-2M9.5 19v-5M14 19v-8M18.5 19V6"/>',
    mosque: '<path d="M6 20v-7a6 6 0 0 1 12 0v7M3 20h18M12 7V4M10 20v-4a2 2 0 0 1 4 0v4M20.5 20V9M20.5 9l-1-2h2z"/>',
    train: '<rect x="6" y="3" width="12" height="14" rx="3"/><path d="M6 10.5h12M9 14h.01M15 14h.01M8.5 17L6.5 21M15.5 17l2 4"/>',
    car: '<path d="M4 16.5V12l2-5h12l2 5v4.5z"/><path d="M4 12h16M7 16.5v2M17 16.5v2"/><circle cx="8" cy="14.2" r=".7" fill="currentColor"/><circle cx="16" cy="14.2" r=".7" fill="currentColor"/>',
    alert: '<path d="M12 4L2.8 19.5h18.4z"/><path d="M12 10v4.5M12 17.2h.01"/>',
    handshake: '<path d="M3 12l4-4 4 2 3-2 3 1 4 3"/><path d="M7 8l-4 4 6 6 2-1 1.5 1.5 2-1 1.5 1 4.5-5.5M10 13l2 2M12.5 11.5l2.5 2.5"/>',
    calculator: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h.01"/>',
    basket: '<path d="M3.5 10h17l-1.8 9.5a1.5 1.5 0 0 1-1.5 1.2H6.8a1.5 1.5 0 0 1-1.5-1.2zM8 10l3-6M16 10l-3-6M9 14v3M15 14v3"/>',
    speaker: '<path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>',
    pin: '<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
    unlock: '<rect x="5.5" y="11" width="13" height="9" rx="2"/><path d="M8.5 11V8a3.5 3.5 0 0 1 6.8-1.2"/>',
    cloud: '<path d="M7 18.5a4.5 4.5 0 0 1-.6-9 6 6 0 0 1 11.5 1.5A3.8 3.8 0 0 1 17.5 18.5z"/>',
    box: '<path d="M3.5 7.5L12 3.5l8.5 4v9L12 20.5l-8.5-4z"/><path d="M3.5 7.5L12 11.5l8.5-4M12 11.5v9"/>',
    question: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.6 2.6 0 0 1 5 1c0 1.7-2.5 2.2-2.5 3.8M12 17.2h.01"/>',
    user: '<circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/>',
    key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l8.5-8.5M16.5 6.5l2.5 2.5M14 9l2 2"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.7 5.5 3.7 9s-1.2 6.5-3.7 9c-2.5-2.5-3.7-5.5-3.7-9S9.5 5.5 12 3z"/>',
    record: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4" fill="currentColor" stroke="none"/>',
    stop: '<rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" stroke="none"/>',
    pause: '<path d="M9 6v12M15 6v12"/>',
    star: '<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9l-5.2 2.8 1-5.9-4.3-4.1 5.9-.8z"/>'
  };
  var E = {
    "🧭": "compass", "📋": "clipboard", "🔎": "search", "🔍": "search", "🧩": "puzzle", "✍️": "pen", "🎙️": "mic", "🃏": "cards", "⚡": "bolt",
    "🧾": "form", "🧠": "brain", "📖": "book", "🎧": "headphones", "🗳️": "choices", "🗺️": "map", "🎓": "cap", "⏱️": "timer", "📊": "chart",
    "💬": "chat", "🗣️": "speech", "🌿": "leaf", "💡": "bulb", "🩺": "health", "🏁": "flag", "🏆": "trophy", "🎬": "film", "✂️": "scissors",
    "🎯": "target", "📝": "note", "🔬": "flask", "✉️": "mail", "✅": "check", "📂": "folder", "🔤": "letters", "🕵️": "detective", "💰": "coins",
    "🧳": "suitcase", "⚖️": "scale", "🛬": "landing", "🏚️": "house", "🏠": "house", "📄": "doc", "💳": "card", "📚": "books", "👥": "people",
    "🗓️": "calendar", "✨": "sparkle", "🛂": "passport", "🏙️": "city", "🔒": "lock", "🏅": "medal", "🧥": "hanger", "🌙": "translate", "⏰": "timer", "⏳": "timer", "🎤": "mic", "🎪": "people", "🏦": "bank", "📣": "megaphone", "📱": "phone", "📲": "phone", "📵": "phone", "📶": "signal", "🕌": "mosque", "🚆": "train", "🚕": "car", "🚨": "alert", "🤝": "handshake", "🧮": "calculator", "🧺": "basket", "🔥": "bolt", "🎉": "sparkle", "⭐": "star", "🔊": "speaker", "📍": "pin", "🔓": "unlock", "☁️": "cloud", "☁": "cloud", "📦": "box", "⚠️": "alert", "⚠": "alert", "❓": "question", "👤": "user", "🔑": "key", "🌐": "globe", "👮": "passport", "🚩": "flag", "📅": "calendar", "⏺": "record", "⏹": "stop", "⏸": "pause", "⏱": "timer", "🗣": "speech", "✍": "pen", "🏙": "city", "🗺": "map", "🎙": "mic", "🗳": "choices", "✂": "scissors", "✉": "mail", "🕵": "detective", "⚖": "scale", "🏚": "house", "🗓": "calendar"
  };
  function svg(name, cls) {
    var d = P[name]; if (!d) return "";
    return '<svg class="mi' + (cls ? " " + cls : "") + '" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + d + "</svg>";
  }
  function from(x, cls) {
    if (!x) return "";
    if (P[x]) return svg(x, cls);
    var k = String(x).replace(/️/g, ""), name = E[x] || E[k] || E[k + "️"];
    return name ? svg(name, cls) : '<span class="mi-flag">' + x + "</span>"; // flags and anything unmapped stay as text
  }

  // Swap any mapped emoji left in page text (dynamic labels like "🔊 Playing") for the line icon, as the page changes.
  var keys = Object.keys(E).sort(function (a, b) { return b.length - a.length; });
  var RX = new RegExp("(" + keys.map(function (k) { return k.replace(/️/g, "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }).join("|") + ")️?", "g");
  var SKIP = /^(SCRIPT|STYLE|TEXTAREA|INPUT|CODE|PRE|OPTION|TITLE|svg)$/i;
  function swapNode(t) {
    var s = t.nodeValue; RX.lastIndex = 0; if (!s || !RX.test(s)) return;
    var p = t.parentNode; if (!p || SKIP.test(p.nodeName) || p.closest && p.closest("[contenteditable],[data-no-icon],svg")) return;
    RX.lastIndex = 0; var frag = document.createDocumentFragment(), last = 0, m;
    while ((m = RX.exec(s))) {
      if (m.index > last) frag.appendChild(document.createTextNode(s.slice(last, m.index)));
      var w = document.createElement("span"); w.className = "mi-w"; w.innerHTML = from(m[1]); frag.appendChild(w); last = RX.lastIndex;
    }
    if (last < s.length) frag.appendChild(document.createTextNode(s.slice(last)));
    p.replaceChild(frag, t);
  }
  function swap(root) {
    if (!root) return;
    if (root.nodeType === 3) return swapNode(root);
    if (root.nodeType !== 1 || SKIP.test(root.nodeName)) return;
    var w = document.createTreeWalker(root, 4, null), list = [], n;
    while ((n = w.nextNode())) list.push(n);
    list.forEach(swapNode);
  }
  function start() {
    swap(document.body);
    new MutationObserver(function (ms) {
      ms.forEach(function (m) { if (m.type === "characterData") swapNode(m.target); else for (var i = 0; i < m.addedNodes.length; i++) swap(m.addedNodes[i]); });
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
  }
  window.MasarokIcon = { svg: svg, from: from, swap: swap, names: Object.keys(P) };
  if (document.body) start(); else document.addEventListener("DOMContentLoaded", start);
})();

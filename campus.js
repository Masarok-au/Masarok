/* Masarok — campus photos
   The "City and campus" card shows a photo of the chosen university's campus.
   Photos are from Unsplash (free to use under the Unsplash License) and are credited on the card.
   Each entry: [type, photo id, photographer, photo page slug]. type "c" = campus, "y" = city (no verified campus photo). */
(function () {
  var AR = (document.documentElement.lang || "en").slice(0, 2) === "ar";
  var P = {
    unsw: ["c", "1774600787713-bc405e935202", "Jeremy Huang", "modern-glass-building-with-yellow-unsw-signage-lz8zylE_U4Y"],
    usyd: ["c", "1567852701065-b2991a38e34c", "Eriksson Luo", "brown-concrete-building-during-daytime-mX06fUx22SA"],
    uts: ["c", "1663256846038-974f252591e4", "Ryan Cuerden", "a-group-of-tall-buildings-2F9_Ry6lBI4"],
    unimelb: ["c", "1774955107522-4981cf504eb3", "Maria Dumin", "stone-clock-tower-with-trees-and-blue-sky--WeKuZr0Xh0"],
    monash: ["c", "1724125782349-c9870f3940c3", "Devesh Thapa", "a-large-black-building-with-a-street-light-in-front-of-it-OUIDmRkSt0A"],
    rmit: ["c", "1754573061107-7c8d00c9e662", "Kenula Abeywickrama", "an-eccentric-building-with-unique-checkered-design-LQd-xcvmRuo"],
    deakin: ["y", "1596527199903-6cdaacee1208", "Paul Macallan", "brown-bridge-over-river-near-city-buildings-during-daytime-COfEtykhwco"],
    anu: ["c", "1721441906254-b5d28d9114f4", "Green Liu", "a-sign-that-is-in-front-of-some-trees-X7K1KxlpC5Q"],
    adelaide: ["c", "1652974731232-efc86a9bd985", "Vlad Kutepov", "a-tall-building-with-a-flag-on-top-of-it-Ko7JY-Vgr2I"],
    uwa: ["c", "1702185497762-b8a278be563c", "Ahmed Elsayed", "a-black-and-white-photo-of-a-large-building-nECl2OdXqWo"],
    curtin: ["c", "1709433833205-e948c00eba87", "Ahmed Elsayed", "a-black-and-white-photo-of-a-large-building-ijMaBa0SYEE"],
    uq: ["c", "1730173777675-7cb481bb5a0f", "Stacie Ong", "a-tall-building-with-a-clock-on-the-front-of-it-Y5DaNKCKmZA"],
    mit: ["c", "1537888692311-8a7fb3e9f374", "Muzammil Soorma", "gray-concrete-dome-building-at-daytime-9MByoiBNN1c"],
    harvard: ["c", "1659388346953-1824e45d363d", "Jeremy Huang", "a-large-brick-building-with-a-tower-tvGQycwnKVI"],
    bu: ["c", "1693608109217-60c706434ff3", "Anand Sahu", "a-brick-building-with-a-clock-tower-on-top-of-it-psD0Moq02TU"],
    columbia: ["c", "1739372074913-ed2e3660477b", "Joshua Tsu", "a-large-building-with-columns-and-a-dome-on-top-of-it-wKdVxe63sc8"],
    ucla: ["c", "1729536233990-5dd65ab81e42", "Tyler Zhang", "a-large-building-with-two-towers-on-top-of-a-hill-bf_XCHUwtpI"],
    usc: ["c", "1612822798436-369a2448ad45", "Yansi Keim", "brown-concrete-building-near-green-trees-under-blue-sky-during-daytime-PvZ1GfQEciY"],
    stanford: ["c", "1681782421891-5088f13466ec", "Robert Gareth", "a-large-building-with-a-clock-tower-in-the-background-_ge2fkbfR6U"],
    berkeley: ["c", "1778268406028-84bbdaf02e65", "Eric Vo", "a-tall-stone-clock-tower-against-a-cloudy-sky-bGOgyiqIVHo"],
    cmu: ["c", "1672613374094-a4b86dd44693", "Yash Banka", "a-building-with-a-clock-on-the-front-of-it-8hfvyiYakuQ"],
    uw: ["c", "1741622197924-5dae6fbd8bef", "Zoshua Colah", "beautiful-collegiate-gothic-building-stands-on-a-campus-qxaZIH7f3Q0"],
    utaustin: ["c", "1641159955665-e6c0ff710205", "Alexander Williams", "a-large-building-with-a-clock-tower-on-top-of-it-sv75P8iq5cY"],
    uwmadison: ["c", "1661548217055-74543b6dac30", "Preston Bousley", "a-building-with-a-blue-sky-dP25HMglRRg"],
    upenn: ["c", "1701472415255-17482ef30acf", "Shengnan Gao", "a-tall-red-building-with-a-clock-on-the-top-of-it-E0ljQ2wyqpM"],
    pennstate: ["c", "1719235157583-b7d913d7be95", "Dylan Klingler", "a-large-building-with-a-clock-tower-on-top-of-it-PQxDMpomE6Y"],
    imperial: ["c", "1518344345598-c30ca7fc1d09", "Naveed Janmohamed", "gray-concrete-building-cFOeh09-7Cc"],
    ucl: ["c", "1627131715233-480b34985c00", "Luke Wang", "brown-concrete-building-during-daytime--b57E2FSvnI"],
    kcl: ["c", "1684868314024-f063f6534c57", "Frederic Köberl", "a-tall-brick-building-with-lots-of-windows-uXmX8F58-b0"],
    manchester: ["c", "1759734353125-6913ba6c6804", "Michael D Beckwith", "large-stone-building-with-a-tall-tower-and-red-roof-8RKvvS0dUIM"],
    edinburgh: ["c", "1762729883350-0f3f9f29459d", "Mafalda Moura", "historic-stone-building-with-a-dome-and-courtyard-Cy5j6ta_xrg"],
    birmingham: ["c", "1637622576219-ddc73b22a431", "Ben Harper", "a-tall-clock-tower-towering-over-a-lush-green-park-icFST8Qiq5I"],
    leeds: ["c", "1681642048507-eda6aa987b6a", "Paul Rigel", "an-aerial-view-of-a-city-with-a-clock-tower-RNkPUD4G4rI"],
    uoft: ["c", "1618255630366-f402c45736f6", "Dora Dalberto", "brown-and-gray-concrete-building-near-green-trees-under-blue-sky-during-daytime-ORzZtY2i50k"],
    ubc: ["c", "1748904735366-c4a781506e52", "Aditya Chinchure", "a-large-stone-building-in-the-landscape-GpX3TJJUYEM"],
    mcgill: ["c", "1685499107584-1c03d9109cc7", "Ehalo Travel", "a-large-building-with-a-flag-on-top-of-it-RDT6ISjMuGs"],
    waterloo: ["c", "1745776437738-2b9e4c679b3f", "Allen Y", "modern-building-with-glass-and-clear-blue-sky-Y7y4-OkdAZ0"],
    tum: ["c", "1519722829314-b1fa7e660e3f", "Saskia van Manen", "gray-steel-bench-under-stairs-Rs1AKKWLHI4"],
    lmu: ["c", "1622678078898-ac7219328e91", "Hisashi Oshite", "white-and-blue-hallway-with-white-floor-tiles-NqFi2W9PXVw"],
    tuberlin: ["y", "1552035496-08efc7baf40e", "Yannic Kreß", "reichstag-building-germany-during-daytime-dFeOdGPk2hc"],
    rwth: ["y", "1630509707234-718d3c501736", "Carolina Nichitin", "brown-and-gray-concrete-building-under-gray-clouds-during-daytime-xo8pEDmCAyA"],
    kit: ["y", "1635699263945-68f0244ca3de", "Lāsma Artmane", "a-large-building-with-a-flag-on-top-of-it-6TaaUvJrYII"],
    nus: ["c", "1707109462231-ad2b9dd1597b", "Chunjiang", "a-tall-building-with-a-sign-on-top-of-it-NlQPVsJG2Nk"],
    ntu: ["c", "1705636254195-60f1e917e05c", "Chunjiang", "a-large-building-with-a-bunch-of-plants-on-top-of-it-ZL-NcA965js"],
    smu: ["y", "1527623629755-17eaa73534e2", "Jacob Peters-Lehm", "17IW7yH4U2o"]
  };

  var css =
    ".glance > [data-flip=\"g:city\"].has-photo{min-height:220px}" +
    ".glance > [data-flip=\"g:city\"].has-photo:not(.flip), .glance > [data-flip=\"g:city\"].has-photo > .flip-front{" +
      "background:linear-gradient(180deg, rgba(8,17,30,.78) 0%, rgba(8,17,30,.12) 50%, rgba(8,17,30,.8) 100%), var(--campus-img) center/cover no-repeat, var(--surface) !important}" +
    ".glance > [data-flip=\"g:city\"].has-photo dt, .glance > [data-flip=\"g:city\"].has-photo dd{text-shadow:0 1px 3px rgba(0,0,0,.65)}" +
    ".glance > [data-flip=\"g:city\"].has-photo dd{color:#fff; font-weight:700}" +
    ".campus-credit{font-size:.72rem; color:rgba(238,242,247,.82); text-decoration:none; text-shadow:0 1px 2px rgba(0,0,0,.7); margin-top:auto; align-self:flex-start}" +
    ".campus-credit:hover{text-decoration:underline}" +
    ".flip-front > .campus-credit{order:5}" +
    ".flip-front > .flip-open{order:6}" +
    ".has-photo > .flip-front > .flip-open{margin-top:6px}";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  function apply() {
    var card = document.querySelector('.glance > [data-flip="g:city"]');
    if (!card) return;
    var M = window.Masarok, v = M && M.values ? M.values().v || {} : {};
    var id = document.documentElement.getAttribute("data-uni");
    var p = id && P[id];
    var old = card.querySelector(".campus-credit"); if (old) old.remove();
    if (!p) { card.classList.remove("has-photo"); card.style.removeProperty("--campus-img"); return; }
    var url = "https://images.unsplash.com/photo-" + p[1] + "?auto=format&fit=crop&w=900&q=70";
    card.style.setProperty("--campus-img", 'url("' + url + '")');
    card.classList.add("has-photo");
    var a = document.createElement("a");
    a.className = "campus-credit";
    a.href = "https://unsplash.com/photos/" + p[3] + "?utm_source=masarok&utm_medium=referral";
    a.target = "_blank"; a.rel = "noopener";
    var city = v.city || "";
    a.textContent = p[0] === "y"
      ? (AR ? "صورة من " + city + ": " + p[2] + " · Unsplash" : "Photo of " + city + ": " + p[2] + " · Unsplash")
      : (AR ? "تصوير: " + p[2] + " · Unsplash" : "Photo: " + p[2] + " · Unsplash");
    var host = card.querySelector(":scope > .flip-front") || card;
    host.appendChild(a);
  }

  document.addEventListener("masarok:change", function () { setTimeout(apply, 0); });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { setTimeout(apply, 0); }); else setTimeout(apply, 0);
})();

/* Masarok service worker: makes the guide work offline and installable.
   Pages: network first (so updates show straight away), falling back to the saved copy.
   Scripts, styles and icons: network first too, so a new page never runs old scripts. Fonts: saved copy first. */
var VERSION = "masarok-v8";
var CORE = [
  "/", "/index.html", "/ar/", "/ar/index.html",
  "/country.js", "/unis.js", "/journey.js", "/journey.css", "/feedback.js", "/flip.js", "/campus.js", "/deadlines.js", "/sections.js", "/game.js", "/app.js",
  "/manifest.webmanifest", "/ar/manifest.webmanifest", "/favicon.svg",
  "/icons/icon-192.png", "/icons/icon-512.png", "/icons/apple-touch-icon.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) {
    return Promise.all(CORE.map(function (u) { return c.add(new Request(u, { cache: "reload" })).catch(function () {}); }));
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

function fromNetwork(req) {
  return fetch(req).then(function (res) {
    if (res && ((res.ok && (res.type === "basic" || res.type === "cors")) || res.type === "opaque")) {
      var copy = res.clone();
      caches.open(VERSION).then(function (c) { c.put(req, copy); });
    }
    return res;
  });
}

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  var fonts = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if (url.origin !== self.location.origin && !fonts) return; // forms, maps and other sites go straight to the network

  // pages: network first, then the saved page (ignoring ?source=app and other query strings)
  if (req.mode === "navigate") {
    e.respondWith(fromNetwork(req).catch(function () {
      return caches.match(req, { ignoreSearch: true }).then(function (hit) {
        if (hit) return hit;
        return caches.match(url.pathname.indexOf("/ar") === 0 ? "/ar/" : "/");
      });
    }));
    return;
  }

  // fonts rarely change: saved copy first
  if (fonts) {
    e.respondWith(caches.match(req).then(function (hit) { return hit || fromNetwork(req); }));
    return;
  }

  // our scripts, styles and icons: network first so pages and scripts always match, saved copy when offline
  e.respondWith(fromNetwork(req).catch(function () { return caches.match(req, { ignoreSearch: true }); }));
});

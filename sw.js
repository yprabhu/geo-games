// Offline support: precache everything, then serve from cache and refresh in the background.
// When you ADD a file, add it to ASSETS. Bump CACHE only if you rename or delete files.
const CACHE = "geo-games-v1";
const ASSETS = [
  "./", "index.html", "manifest.webmanifest", "css/style.css",
  "js/main.js", "js/core.js",
  "js/games/index.js", "js/games/flags.js", "js/games/shapes.js",
  "data/flags.js", "data/shapes.js",
  "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(req, { ignoreSearch: true }).then(hit => {
        const fresh = fetch(req).then(res => {
          if (res.ok) cache.put(req, res.clone());
          return res;
        }).catch(() => hit);
        return hit || fresh;
      })
    )
  );
});

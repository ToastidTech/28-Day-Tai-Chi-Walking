const CACHE = 'taichi-v2';
const ASSETS = [
  '/28-Day-Tai-Chi-Walking/',
  '/28-Day-Tai-Chi-Walking/index.html',
  '/28-Day-Tai-Chi-Walking/manifest.json',
  '/28-Day-Tai-Chi-Walking/Logo.png',
  '/28-Day-Tai-Chi-Walking/icon-192.png',
  '/28-Day-Tai-Chi-Walking/icon-512.png',
];

// Install: cache all assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting(); // activate immediately
});

// Activate: delete old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim(); // take control of all open tabs
});

// Fetch: serve from cache, fall back to network
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});

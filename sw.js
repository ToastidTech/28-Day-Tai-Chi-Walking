const CACHE = 'taichi-v1';
const ASSETS = [
  '/28-Day-Tai-Chi-Walking/',
  '/28-Day-Tai-Chi-Walking/index.html',
  '/28-Day-Tai-Chi-Walking/Logo.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});

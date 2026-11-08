// 28-Day Walking Tai Chi — RETIRED 2026-11-08.
// This service worker replaces the retired app's worker: it clears all old
// caches, takes control of open tabs, and unregisters itself so returning
// visitors always land on the retired notice page.
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
      .then(() => self.registration.unregister())
  );
});

// Network passthrough — never serve the retired app from cache.
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request));
});

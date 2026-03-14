const CACHE = 'lafenice-v2';

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(cache => 
      cache.addAll([
        '/associazionetslafenice/',
        '/associazionetslafenice/index.html'
      ]).catch(() => {})
    )
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => 
      caches.match(e.request).then(r => 
        r || caches.match('/associazionetslafenice/index.html')
      )
    )
  );
});

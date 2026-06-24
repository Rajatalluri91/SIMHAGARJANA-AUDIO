const CACHE_NAME = 'jayashali-simhagarjana-v1';

// App offline lo kuda functional ga run avvadaniki kavalsina core assets list
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// 1. INSTALL EVENT: Core files anni mobile browser cache memory loki save avuthay
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('App Core Cache Framework Initialized.');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// 2. ACTIVATE EVENT: App update ayinappudu patha cache memory ni clear chesthundhi
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('Old App Cache Matrix Purged:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// 3. FETCH EVENT: Audio files streaming and asset serving
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('.mp3')) {
    return; 
  }
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});

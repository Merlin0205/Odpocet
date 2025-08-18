// Simple offline cache
const CACHE = 'vypyceny7-v1';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './pwa.js',
  './manifest.json',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/pivo_rum.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});

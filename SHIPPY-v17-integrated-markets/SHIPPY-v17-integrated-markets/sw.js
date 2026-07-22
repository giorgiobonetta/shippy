const CACHE_NAME = 'shippy-v17-static';
const CORE = [
  './',
  './index.html',
  './styles.css',
  './app.bundle.js',
  './manifest.webmanifest',
  './assets/shippy-icon.svg',
  './assets/earth_atmos_2048.jpg',
  './assets/earth_lights_2048.png',
  './assets/earth_clouds_1024.png',
  './assets/earth_normal_2048.jpg',
  './assets/earth_specular_2048.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CORE.filter(Boolean)))
      .catch(() => undefined)
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key.startsWith('shippy-') && key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  const isDocument = event.request.mode === 'navigate';
  if (isDocument) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put('./index.html', copy));
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      }
      return response;
    }))
  );
});

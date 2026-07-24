const CACHE_NAME = 'world-of-trade-v22-static';
const CORE = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './vendor/three.module.min.js',
  './manifest.webmanifest',
  './assets/world-of-trade-icon.svg',
  './assets/earth/earth_atmos_2048.jpg',
  './assets/earth/earth_normal_2048.jpg',
  './assets/earth/earth_specular_2048.jpg',
  './assets/earth/earth_clouds_1024.png',
  './assets/earth/earth_lights_2048.png',
  './assets/data/countries-lowres.geojson'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => Promise.all(CORE.map(url => cache.add(url).catch(() => undefined))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => (key.startsWith('shippy-') || key.startsWith('world-of-trade-')) && key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  if (event.request.mode === 'navigate') {
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
      if (response.ok) caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
      return response;
    }))
  );
});

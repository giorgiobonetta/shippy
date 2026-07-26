const CACHE_NAME = 'world-of-trade-v33-global-risks';
const CORE = [
  './', './index.html', './styles.css?v=33.0.0', './app.js?v=33.0.0',
  './three.module.min.js', './earth_atmos_2048.jpg', './earth_normal_2048.jpg',
  './earth_specular_2048.jpg', './earth_clouds_1024.png', './earth_lights_2048.png',
  './countries-lowres.geojson', './manifest.webmanifest', './world-of-trade-icon.svg'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => Promise.all(CORE.map(url => cache.add(url).catch(() => undefined)))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => (key.startsWith('shippy-') || key.startsWith('world-of-trade-')) && key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  const requestUrl = new URL(event.request.url);
  const critical = event.request.mode === 'navigate' || ['/app.js','/styles.css','/index.html','/manifest.webmanifest'].some(path => requestUrl.pathname.endsWith(path));
  if (critical) {
    event.respondWith(fetch(event.request).then(response => {
      if (response.ok) caches.open(CACHE_NAME).then(cache => cache.put(event.request.mode === 'navigate' ? './index.html' : event.request, response.clone()));
      return response;
    }).catch(() => event.request.mode === 'navigate' ? caches.match('./index.html') : caches.match(event.request)));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (response.ok) caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
    return response;
  })));
});

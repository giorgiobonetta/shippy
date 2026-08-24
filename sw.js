const CACHE_NAME = 'world-of-trade-v60';
const ASSET_VERSION = '60.0.0';
// v45 — le stringhe di versione qui erano ferme a 36.0.0 mentre index.html chiedeva
// 44.0.0: le voci precaricate non venivano mai riutilizzate e mancavano quattro
// texture della Terra, quindi offline il globo restava incompleto.
const CORE = [
  './',
  './index.html',
  './landing.html',
  './privacy.html',
  `./styles.css?v=${ASSET_VERSION}`,
  `./native-shell.css?v=${ASSET_VERSION}`,
  `./native-bridge.js?v=${ASSET_VERSION}`,
  `./app.js?v=${ASSET_VERSION}`,
  './three.module.min.js',
  './earth_day_realistic_2048.webp',
  './earth_day_realistic_4096.webp',
  './earth_normal_2048.jpg',
  './earth_specular_2048.jpg',
  './earth_atmos_2048.jpg',
  './earth_clouds_realistic_2048.webp',
  './earth_clouds_1024.png',
  './earth_night_realistic_2048.webp',
  './earth_lights_2048.png',
  './countries-lowres.geojson',
  './manifest.webmanifest',
  './world-of-trade-icon.svg',
  './world-of-trade-logo.svg',
  './world-of-trade-logo.png',
  './world-of-trade-icon.png',
  './world-of-trade-premium-logo.webp',
  './world-of-trade-premium-logo.png',
  './world-of-trade-premium-icon-192.png',
  './world-of-trade-premium-icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => Promise.all(CORE.map(url => cache.add(url).catch(error => {
        console.warn('[WoT SW] precache skipped', url, error);
        return undefined;
      }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys
        .filter(key => (key.startsWith('shippy-') || key.startsWith('world-of-trade-')) && key !== CACHE_NAME)
        .map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

// v45 — messaggio dalla pagina per forzare l'attivazione di una nuova versione
self.addEventListener('message', event => {
  if (event.data === 'skip-waiting') self.skipWaiting();
});

const CRITICAL_PATHS = ['/app.js', '/styles.css', '/index.html', '/landing.html', '/privacy.html', '/manifest.webmanifest', '/native-bridge.js', '/native-shell.css'];

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  let requestUrl;
  try { requestUrl = new URL(event.request.url); } catch (error) { return; }
  if (requestUrl.origin !== self.location.origin) return;

  const isNavigation = event.request.mode === 'navigate';
  const isCritical = isNavigation || CRITICAL_PATHS.some(path => requestUrl.pathname.endsWith(path));

  if (isCritical) {
    // network-first: la versione piu' recente vince, la cache e' la rete di sicurezza
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, copy))
              .catch(() => undefined);
          }
          return response;
        })
        .catch(() => caches.match(event.request)
          .then(cached => cached
            // offline su un indirizzo mai visitato: si ripiega sul gioco
            || (isNavigation ? caches.match('./index.html') : null))
          .then(cached => cached || Response.error()))
    );
    return;
  }

  // cache-first per tutto il resto (texture, geojson, icone)
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      if (response && response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy)).catch(() => undefined);
      }
      return response;
    }).catch(() => cached || Response.error()))
  );
});

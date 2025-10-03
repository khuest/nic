// Service Worker Version
// TODO: Update CACHE_NAME when releasing a new version
// Recommended: Use semantic versioning (MAJOR.MINOR.PATCH) for clarity
// Example: 'jekyll-site-v1.2.0' => MAJOR.MINOR.PATCH

const CACHE_NAME = 'jekyll-site-v1';
const STATIC_CACHE = 'static-v1';

// Files to cache immediately when service worker installs
const BASE = '/eekhue-core';
const PRECACHE_URLS = [
  `${BASE}/`,
  `${BASE}/quiz/`,
  `${BASE}/persona/`,
  `${BASE}/self/`,
  `${BASE}/shadow/`,
  `${BASE}/growth/`,
  `${BASE}/relationship/`,
  `${BASE}/about/`,
  `${BASE}/contact/`,
  `${BASE}/disclaimer/`,
  `${BASE}/assets/css/base.css`,
  `${BASE}/assets/css/header.css`,
  `${BASE}/assets/css/starfield.css`,
  `${BASE}/assets/css/quiz.css`,
  `${BASE}/assets/css/footer.css`,
  `${BASE}/assets/js/header.js`,
  `${BASE}/assets/js/starfield.js`,
  `${BASE}/assets/js/xp.js`,
  `${BASE}/offline.html`
];

// Install event - cache essential files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Handle navigation requests (page loads)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, responseClone));
          return response;
        })
        .catch(() => {
          return caches.match(event.request)
            .then(cachedResponse => {
              return cachedResponse || caches.match(`${BASE}/offline.html`);
            });
        })
    );
    return;
  }

  // Handle asset requests (CSS, JS, images)
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) return cachedResponse;

        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseClone = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, responseClone));
            
            return response;
          });
      })
  );
});

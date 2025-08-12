// Define a cache name with a version to force updates
const CACHE_NAME = 'my-pwa-cache-v1'; // Change to 'v2', 'v3', etc., when updating

// Files to cache (update with your actual file paths)
const urlsToCache = [
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png', // Replace with your icon paths
  '/icons/icon-512.png'
];

// Install event: Cache the specified files
self.addEventListener('install', event => {
  console.log('Service Worker installing.');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching app shell');
      return cache.addAll(urlsToCache);
    })
  );
  // Force the new service worker to activate immediately
  self.skipWaiting();
});

// Activate event: Clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker activating.');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Take control of the page immediately
  self.clients.claim();
});

// Fetch event: Serve cached files or fetch from network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Return cached response if found, else fetch from network
      return response || fetch(event.request).catch(() => {
        // Fallback to index.html for offline (optional)
        return caches.match('/index.html');
      });
    })
  );
});

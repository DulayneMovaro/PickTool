self.addEventListener('install', event => {
  console.log('Service Worker installing.');
});

self.addEventListener('fetch', event => {
  // Basic offline caching strategy here (optional)
});
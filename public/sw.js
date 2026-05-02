const CACHE_NAME = 'obob-offline-cache-v1';
const OFFLINE_URLS = [
  '/',
  '/manifest.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(OFFLINE_URLS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only cache GET requests
  if (event.request.method !== 'GET') return;

  // Network first, fallback to cache strategy for API and HTML
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

// Background Sync for offline mutations
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-scores') {
    event.waitUntil(syncScores());
  }
});

async function syncScores() {
  // In a real implementation, this would read from IndexedDB
  // and push the queued mutations to the Supabase REST API.
  console.log('Background sync triggered: syncing scores to server...');
  
  // Example of how it would work:
  // const db = await openDB('obob-scoresheet', 1);
  // const pendingMutations = await db.getAll('mutations');
  // for (const mutation of pendingMutations) {
  //   await fetch('/api/battles/sync', { method: 'POST', body: JSON.stringify(mutation) });
  //   await db.delete('mutations', mutation.id);
  // }
}

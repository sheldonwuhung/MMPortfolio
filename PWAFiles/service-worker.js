const cacheName = 'hello-pwa-v1';
const staticAssets = [
    'index.html',
    'style.css',
    'manifest.json',
    'app.js',
    'imgs/icon-192x192.png',
    'imgs/icon-512x512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(cacheName);
            await cache.addAll(staticAssets);
            self.skipWaiting();
        })()
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(cacheFirst(event.request));
});

async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || fetch(request);
}
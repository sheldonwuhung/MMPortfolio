const cacheName = 'hello-pwa-v5';
const staticAssets = [
    'index.html',
    'style.css',
    'manifest.json',
    'app.js',
    'service-worker.js',
    'imgs/icon-192x192.png',
    'imgs/icon-512x512.png',
    'imgs/introimg.png',
    'imgs/fh1.jpg',
    'imgs/fh2.jpg',
    'imgs/bh.jpg',
    'imgs/rulesofplay.png',
    'vids/fhv1.mp4',
    'vids/fhv2.mp4',
    'vids/fhv3.mp4',
    'vids/fhv4.mp4',
    'vids/bhv1.mp4',
    'vids/bhv2.mp4',
    'vids/bhv3.mp4',
    'assets/node_modules/bootstrap/dist/css/bootstrap.min.css',
    'assets/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
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

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
            cacheNames.map(name => {
                if (name !== cacheName) { // Delete caches that are not the current one
                    return caches.delete(name);
                }
            })
        );
    }))
})


self.addEventListener('fetch', event => {
    event.respondWith(cacheFirst(event.request));
});

async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || fetch(request);
}

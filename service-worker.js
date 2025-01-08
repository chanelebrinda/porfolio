const CACHE_NAME = 'chanele-cv-cache-v1';
const urlsToCache = [
    '/porfolio/',
    '/porfolio/index.html',
    '/porfolio/projects.html',
    '/porfolio/style.css',
    '/porfolio/script.js',
    '/porfolio/manifest.json',
    '/porfolio/photo.jpg',
    '/porfolio/assets/img30.jpg',
    '/porfolio/assets/img34.jpg',
    '/porfolio/assets/img49.jpg',
    '/porfolio/assets/img56.jpg',
    '/porfolio/assets/img103.jpg',
    '/porfolio/assets/img107.jpg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

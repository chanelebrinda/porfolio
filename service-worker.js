const CACHE_NAME = 'chanele-cv-cache-v1';
const urlsToCache = [
    '/portfolio/',
    '/portfolio/index.html',
    '/portfolio/projects.html',
    '/portfolio/style.css',
    '/portfolio/script.js',
    '/portfolio/manifest.json',
    '/portfolio/photo.jpg',
    '/portfolio/assets/img30.jpg',
    '/portfolio/assets/img34.jpg',
    '/portfolio/assets/img49.jpg',
    '/portfolio/assets/img56.jpg',
    '/portfolio/assets/img103.jpg',
    '/portfolio/assets/img107.jpg'
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

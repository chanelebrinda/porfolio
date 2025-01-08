const CACHE_NAME = 'chanele-cv-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/projects.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    '/photo.jpg',
    '/assets/img30.jpg',
    '/assets/img34.jpg',
    '/assets/img49.jpg',
    '/assets/img56.jpg',
    '/assets/img103.jpg',
    '/assets/img107.jpg'
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

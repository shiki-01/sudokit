import { build, files, version } from '$service-worker';

const CACHE = `cache-${version}`;

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE).then((cache) => cache.addAll(build))
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then(async (keys) => {
			for (const key of keys) {
				if (key !== CACHE) await caches.delete(key);
			}
		})
	);
});

self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return;

	event.respondWith(
		caches.match(event.request).then((response) => {
			return response || fetch(event.request).then((response) => {
				const clonedResponse = response.clone();
				caches.open(CACHE).then((cache) => {
					cache.put(event.request, clonedResponse).then(r => r);
				});
				return response;
			});
		})
	);
});

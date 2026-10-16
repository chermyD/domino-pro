const CACHE_NAME='domino-pro-v2';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(ASSETS)));self.skipWaiting()});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('domino-pro-')&&k!==CACHE_NAME).map(k=>caches.delete(k)));await self.clients.claim()})())});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;event.respondWith((async()=>{try{const r=await fetch(event.request);if(r.ok&&new URL(event.request.url).origin===self.location.origin){const c=await caches.open(CACHE_NAME);c.put(event.request,r.clone())}return r}catch(e){return await caches.match(event.request)||await caches.match('./index.html')}})())});

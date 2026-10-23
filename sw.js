const C='lovenote-v16';
const ASSETS=['./','index.html','yuzu-inbox.js','manifest.webmanifest','icon-180.png','icon-192.png','icon-512.png','yuzu-send.js','grok-yuzu.js?v=gy3','yuka.js?v=yk1','nav.js?v=nv2','backup.js?v=bk3','bgm.mp3','orgel.mp3','yuzu-music.js'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(/grok-yuzu\.json|yuka\.json/.test(e.request.url))return;if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
 e.respondWith(fetch(e.request,{cache:'no-cache'}).then(r=>{if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}return r}).catch(()=>caches.match(e.request,{ignoreSearch:true})))});

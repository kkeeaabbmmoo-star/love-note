const C='lovenote-v25';
const ASSETS=['./','index.html','yuzu-inbox.js','manifest.webmanifest','icon-180.png','icon-192.png','icon-512.png','yuzu-send.js','grok-yuzu.js?v=gy4','yuka.js?v=yk2','nav.js?v=nv4','sent-status.js?v=ss1','backup.js?v=bk6','restore.js?v=rs2','bgm.mp3','orgel.mp3','yuzu-music.js'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(/grok-yuzu\.json|yuzu_records\.json|yuka\.json|restore\/latest\.json/.test(e.request.url))return;if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
 e.respondWith(fetch(e.request,{cache:'no-cache'}).then(r=>{if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}return r}).catch(()=>caches.match(e.request,{ignoreSearch:true})))});

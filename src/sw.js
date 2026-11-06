const V='posewear-v10';const IMGO=['https://ai-pose-gallery.pages.dev','https://ai-costume-gallery.pages.dev','https://ai-portrait-gallery.pages.dev'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(V).then(c=>c.addAll(['./','index.html','style.css','app.js','studio.js','extras.js','zip.js','favicon.svg'])))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!=V&&k!=V+'-img').map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!='GET')return;
 // 原站图片：仅缓存 <img> 发起的 no-cors 请求；fetch/canvas 用的 CORS 请求直连，避免拿到 opaque 响应
 if(IMGO.includes(u.origin)){if(e.request.mode!='no-cors')return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{if(res.ok||res.type=='opaque'){const cl=res.clone();caches.open(V+'-img').then(c=>c.put(e.request,cl))}return res})));return}
 if(u.origin!=location.origin||u.pathname.startsWith('/api/'))return;
 e.respondWith(fetch(e.request).then(res=>{const cl=res.clone();caches.open(V).then(c=>c.put(e.request,cl));return res}).catch(()=>caches.match(e.request)))});

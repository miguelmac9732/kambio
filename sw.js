// Kambio: funciona sin internet (guarda la app en el teléfono) y muestra notificaciones
const V='kambio-v1';
const SHELL=['./','index.html','config.js','firebase.js','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','icons/icon-maskable-512.png','icons/apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
const keep=(r,res)=>{if(res&&res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res};
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
  if(u.origin===location.origin){
    // la página y la configuración: primero internet (para recibir actualizaciones), si no hay señal, la copia guardada
    if(r.mode==='navigate'||u.pathname.endsWith('/')||u.pathname.endsWith('.html')||u.pathname.endsWith('config.js')){
      e.respondWith(fetch(r).then(res=>keep(r,res)).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))));return}
    e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>keep(r,res))));return}
  if(u.host==='fonts.googleapis.com'||u.host==='fonts.gstatic.com'){
    e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>keep(r,res))))}
});
self.addEventListener('notificationclick',e=>{e.notification.close();
  e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>cs.length?cs[0].focus():clients.openWindow('./')))});

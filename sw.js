const V='ffw-v2', TILES='ffw-tiles-v1', MAX_TILES=1500;
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'])).catch(()=>{}).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==V&&n!==TILES).map(n=>caches.delete(n)))).then(()=>self.clients.claim()));});
async function trim(c,max){const k=await c.keys();if(k.length>max)await Promise.all(k.slice(0,k.length-max).map(x=>c.delete(x)));}
async function swr(req,name,max){
  const c=await caches.open(name), hit=await c.match(req);
  const net=fetch(req).then(r=>{if(r&&(r.ok||r.type==='opaque')){c.put(req,r.clone()).then(()=>max&&trim(c,max));}return r;}).catch(()=>hit);
  return hit||net;
}
async function networkFirst(req){
  const c=await caches.open(V);
  try{const r=await fetch(req);if(r&&r.ok)c.put(req,r.clone());return r;}catch(e){return (await c.match(req))||Response.error();}
}
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||/overpass|api\.openstreetmap\.org|web3forms/.test(u.host))return;
  if(u.origin===location.origin&&u.pathname.endsWith('points.json'))return e.respondWith(networkFirst(e.request));
  const tile=/tile\.openstreetmap\.org|geobasis-bb\.de/.test(u.host);
  e.respondWith(swr(e.request,tile?TILES:V,tile?MAX_TILES:0));
});

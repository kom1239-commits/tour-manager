// 투어 관리 시스템 — 오프라인 지원 (Cache-first 전략)
// 캐시 버전 변경 시 모든 사용자가 새 버전을 받음
const CACHE = 'tour-manager-v11';
const ASSETS = [
  './',
  './index.html',
  './tour_manager.html',
  './manifest.json',
  './icon.svg'
];

self.addEventListener('install', e=>{
  e.waitUntil(
    caches.open(CACHE).then(c=>c.addAll(ASSETS).catch(()=>{
      // 일부 파일이 없어도 계속 설치
    }))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(
      keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))
    )).then(()=>self.clients.claim())
  );
});

// 페이지에서 SKIP_WAITING 메시지 오면 새 버전 즉시 활성화
self.addEventListener('message', e=>{
  if(e.data && e.data.type==='SKIP_WAITING'){
    self.skipWaiting();
  }
});

self.addEventListener('fetch', e=>{
  // 외부 CDN(라이브러리)는 캐시 무시 (mammoth, pdf.js, tesseract)
  const url = e.request.url;
  if(url.includes('cdnjs.cloudflare.com') || url.includes('jsdelivr.net') || url.includes('tessdata')){
    return; // 브라우저 기본 동작에 맡김 (캐시 패스스루)
  }
  // 같은 origin 의 파일은 cache-first
  e.respondWith(
    caches.match(e.request).then(r=>{
      if(r)return r;
      return fetch(e.request).then(resp=>{
        // 성공한 GET 요청은 동적으로 캐시
        if(resp && resp.status===200 && e.request.method==='GET'){
          const clone = resp.clone();
          caches.open(CACHE).then(c=>c.put(e.request, clone));
        }
        return resp;
      }).catch(()=>{
        // 오프라인 fallba
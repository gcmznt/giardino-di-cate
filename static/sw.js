self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open("giardino-di-cate").then(function(cache) {
      return cache.addAll(["/", "/swing-ori.svg"]);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});

const cacheName = "giardino-di-cate";

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(["/", "/swing-ori.svg"]);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    fetch(event.request)
      .then(function(response) {
        caches.open(cacheName).then(function(cache) {
          cache.put(event.request, response.clone());
        });

        return response;
      })
      .catch(function() {
        return caches.match(event.request);
      })
  );
});

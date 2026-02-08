self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("barrock-cache").then(cache => {
      return cache.addAll([
        "index.html",
        "style.css",
        "script.js",
        "logo.png",
        "textura.png"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});




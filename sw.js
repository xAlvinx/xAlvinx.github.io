self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('first-app')
        .then(function(cache) {
          cache.addAll([
            '/',
            'index.html',
            'blog.html',
            'about.html',
            'contact.html',
            'portfolio-example01.html',
            'styles.css',
            'app.js'
          ])
        })
    );
    return self.clients.claim();
  });
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            return response;
          } else {
            return fetch(event.request)
              .then(function(res) {
                return caches.open('first-app')
                  .then(function(cache) {
                    return fetch(event.request)
                    .then(function(res){

                    cache.put(event.request.url, res.clone());
                    return res;
                  })
              })
            })
              .catch(function(err) {
                return caches.open('first-app')
                  .then(function(cache) {
                    return fetch(event.request)
                    .then(function(res){

                    cache.put(event.request.url, res.clone());
                    return res;
                  })
                  });
              });
          }
        })
    );
  });

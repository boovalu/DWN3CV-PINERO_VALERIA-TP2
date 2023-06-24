// Nombre a la version que estoy
const LOCAL_N = 'versionado';

importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

// Esto es para que el Service Worker no se quede "esperando" 
self.addEventListener('message', event => {
    if (event.data && event.data.type == "SKIP_WAITING") {
        self.skipWaiting();
    }
})

// Guardamos el caché de los recursos a medida que navegamos
workbox.routing.registerRoute(
    new RegExp('/*'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: LOCAL_N
    })
);
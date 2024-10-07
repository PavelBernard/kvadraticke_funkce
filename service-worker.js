// Registrace service workeru
if ('serviceWorker' in navigator) {
   window.addEventListener('load', () => {
   navigator.serviceWorker.register('/sw.js').then(registration => {
   console.log('Service Worker registrovan s nasledujicim scope:', registration.scope);
   }, err => {
   console.log('Service Worker registrace selhala:', err);
   });
   });
   }
   // Instalace service workeru
   self.addEventListener('install', event => {
   console.log('Service Worker se instaluje...');
   event.waitUntil(
   caches.open('my-cache').then(cache => {
   return cache.addAll([
   '/',
   '/index.html',
   '/style.css',
   '/script.js'
   ]);
   })
   );
   });
   // Aktivace service workeru
   self.addEventListener('activate', event => {
   console.log('Service Worker byl aktivovan');
   });
   // Zachyt´av´an´ı poˇzadavk˚u
   self.addEventListener('fetch', event => {
   event.respondWith(
   caches.match(event.request).then(response => {
   return response || fetch(event.request);
   })
   );
   });
   
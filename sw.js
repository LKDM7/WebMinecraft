/* DonjonMC — Service Worker (PWA offline) */
const CACHE = "donjonmc-v11";

// Ressources du shell de l'app — mises en cache à l'installation.
const ASSETS = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/app.js",
  "./img/logo.jpg",
  "./icon.png",
  "./favicon.ico",
  "./site.webmanifest",
  "./404.html",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE)
      // addAll échoue si une seule ressource manque — on tolère les absences.
      .then((c) => Promise.allSettled(ASSETS.map((u) => c.add(u))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;

  // On ne gère que le GET same-origin. Les API externes (heure, mcsrvstat)
  // passent directement au réseau et ne sont jamais mises en cache.
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;

  // Navigation : réseau d'abord, repli sur le cache hors-ligne.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match("./index.html")))
    );
    return;
  }

  // Autres ressources : cache d'abord, sinon réseau (et on met en cache).
  e.respondWith(
    caches.match(req).then((cached) =>
      cached ||
      fetch(req).then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      })
    )
  );
});

/* ---- Push notifications (prêt pour backend futur) ---- */
self.addEventListener("push", (e) => {
  let data = { title: "DonjonMC", body: "Nouvelle mise à jour disponible !" };
  try { data = { ...data, ...e.data.json() }; } catch (_) {}
  e.waitUntil(
    self.registration.showNotification(data.title, {
      body:  data.body,
      icon:  "./icon.png",
      badge: "./icon.png",
      tag:   "donjonmc-update",
      renotify: true,
    })
  );
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      const win = list.find((w) => w.url.includes(self.location.origin));
      return win ? win.focus() : clients.openWindow("./");
    })
  );
});

/* DonjonMC — applique le thème choisi AVANT le premier rendu (anti-flash).
   Chargé sans defer dans <head>. Le toggle vit dans js/app.js. */
(function () {
  try {
    if (localStorage.getItem("dm-theme") === "pixel") {
      document.documentElement.setAttribute("data-theme", "pixel");
    }
  } catch (_) { /* localStorage indisponible : thème néon par défaut */ }
})();

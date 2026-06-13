/* DonjonMC — applique le thème choisi AVANT le premier rendu (anti-flash).
   Chargé sans defer dans <head>. Le toggle vit dans js/app.js. */
(function () {
  try {
    if (localStorage.getItem("dm-theme") === "pixel") {
      document.documentElement.setAttribute("data-theme", "pixel");
    }
  } catch (_) { /* localStorage indisponible : thème néon par défaut */ }

  // Marqueur anti-flash pour les entrées GSAP : le CSS masque les éléments
  // d'entrée du hero AVANT le premier rendu. js/animations.js retire cette
  // classe si GSAP ne tourne pas, donc rien ne peut rester invisible.
  document.documentElement.classList.add("gsap-anim");
})();

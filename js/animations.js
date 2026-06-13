/* DonjonMC — animations.js — GSAP (entrées au scroll, thème « blocs Minecraft »)
   ────────────────────────────────────────────────────────────────────────────
   Parti pris : sur un serveur Minecraft, tout se *construit*. Les éléments ne
   font pas que « fondre » à l'écran — ils se posent comme des blocs qu'on
   empile (léger rebond `back.out` = clic du bloc qui se cale), montent du sol
   (y positif → 0), et se révèlent étage par étage (stagger). Le fond du hero
   bouge en parallaxe, comme un décor de jeu vu en profondeur.

   · Anti-flash : js/theme.js pose la classe `gsap-anim` sur <html> AVANT le
     premier rendu ; le CSS masque alors les éléments d'entrée du hero. Si GSAP
     ne se charge pas (ou refuse de tourner), on retire la classe → tout
     redevient visible. Aucun élément ne peut rester bloqué invisible.
   · Accessibilité : tout est encapsulé dans gsap.matchMedia() avec la requête
     `prefers-reduced-motion: no-preference`. Si l'utilisateur préfère moins de
     mouvement, RIEN ne tourne et le contenu garde son état naturel (visible).
   ──────────────────────────────────────────────────────────────────────────── */
(function () {
  "use strict";

  var root = document.documentElement;

  // Filet de sécurité : pas de GSAP → on révèle ce que le CSS avait pré-masqué.
  if (!window.gsap || !window.ScrollTrigger) {
    root.classList.remove("gsap-anim");
    return;
  }

  try {
    var gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);

    var mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", function () {

      /* ───── 1. HERO — « écran titre » : le menu de jeu se monte de bas en haut.
         Le sous-titre, la carte IP puis les boutons apparaissent dans l'ordre
         où le joueur les lit. ───── */
      gsap.timeline({ defaults: { ease: "power3.out", duration: 0.7 } })
        .from(".hero .lvl-tag",      { autoAlpha: 0, y: 18 })
        .from(".hero-title",         { autoAlpha: 0, y: 28 }, "-=0.45")
        .from(".hero-subtitle",      { autoAlpha: 0, y: 22 }, "-=0.45")
        .from("#server-reveal",      { autoAlpha: 0, y: 22 }, "-=0.40")
        .from(".hero-cta-row .btn",  { autoAlpha: 0, y: 18, stagger: 0.12 }, "-=0.35")
        .from(".hero-meta",          { autoAlpha: 0, y: 14 }, "-=0.30")
        .from(".hero-press",         { autoAlpha: 0, y: 10 }, "-=0.20");

      /* ───── 2. Parallaxe du décor : l'aurore du fond descend plus lentement
         que le reste pendant qu'on quitte le hero → sensation de profondeur,
         comme un arrière-plan de niveau. ───── */
      gsap.to(".hero-aurora", {
        yPercent: 28,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
      });

      /* ───── 3. Bandeau de features : chaque tuile « se pose » comme un bloc
         qu'on place (rebond back.out), de gauche à droite. ───── */
      gsap.from(".features-strip .feature-item", {
        scrollTrigger: { trigger: ".features-strip", start: "top 85%" },
        autoAlpha: 0, y: 32, scale: 0.92, stagger: 0.1,
        duration: 0.55, ease: "back.out(1.6)"
      });

      /* ───── 4. Titres de section (lvl-tag + titre) : la balise « NIVEAU » glisse
         depuis la gauche, le titre monte juste derrière. ───── */
      gsap.utils.toArray(".steps-section, .info-section").forEach(function (sec) {
        var tag   = sec.querySelector(".lvl-tag");
        var title = sec.querySelector(".section-title");
        if (!tag && !title) return;
        var tl = gsap.timeline({
          scrollTrigger: { trigger: sec, start: "top 80%" },
          defaults: { ease: "power3.out", duration: 0.6 }
        });
        if (tag)   tl.from(tag,   { autoAlpha: 0, x: -24 });
        if (title) tl.from(title, { autoAlpha: 0, y: 22 }, "-=0.35");
      });

      /* ───── 5. « Comment rejoindre » : les 3 cartes se construisent étage par
         étage (1 → 2 → 3), chacune monte et se cale avec un petit rebond. ───── */
      gsap.from(".steps-grid .step-card", {
        scrollTrigger: { trigger: ".steps-grid", start: "top 82%" },
        autoAlpha: 0, y: 42, stagger: 0.16,
        duration: 0.6, ease: "back.out(1.4)"
      });

      /* ───── 6. Pied de page : transmission qui se termine, lignes qui montent
         doucement les unes après les autres. ───── */
      gsap.from(".site-footer .container > *", {
        scrollTrigger: { trigger: ".site-footer", start: "top 90%" },
        autoAlpha: 0, y: 18, stagger: 0.08,
        duration: 0.5, ease: "power2.out"
      });

      /* ───── 7. Changement d'onglet : le panneau « charge » son contenu comme
         des chunks qui apparaissent (haut → bas, fondu + montée), et l'onglet
         cliqué fait un petit *pop*. Déclenché par l'événement `dm-tab` émis
         depuis activateTab() dans app.js. ───── */
      function animateTabPanel(id) {
        var panel = document.getElementById("tab-" + id);
        if (!panel) return;
        var kids = panel.children;
        if (!kids.length) return;
        gsap.killTweensOf(kids);
        gsap.fromTo(kids,
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out",
            stagger: 0.06, overwrite: true,
            // On nettoie le transform en fin d'anim pour que les :hover reprennent la main.
            onComplete: function () { gsap.set(kids, { clearProps: "transform" }); }
          }
        );
        // Pop de l'onglet actif (bouton dans la barre principale).
        var btn = document.getElementById("tabbtn-" + id);
        if (btn) gsap.fromTo(btn, { scale: 0.9 }, { scale: 1, duration: 0.35, ease: "back.out(2)", clearProps: "transform" });
      }

      window.addEventListener("dm-tab", function (e) {
        animateTabPanel(e.detail && e.detail.tab);
      });

    });

    /* L'appli reconstruit des sections au clic (onglets, listes de mods, actus).
       Quand le DOM bouge, on recalcule les déclencheurs pour que les positions
       de scroll restent justes. */
    window.addEventListener("dm-theme", function () { window.ScrollTrigger.refresh(); });

  } catch (err) {
    // En cas de pépin, on ne laisse jamais le contenu masqué.
    root.classList.remove("gsap-anim");
    if (window.console) console.warn("[animations] GSAP désactivé :", err);
  }
})();

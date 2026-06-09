# Progress Log

<!-- Auto-updated by cwp-claude-progress hook at session end when code changes are made -->

## 2026-06-06
Refonte visuelle complète (dark + glassmorphism), suppression du compte à rebours/portail/notifs, hero modernisé avec révélation IP directe. Onglets DonjonMC/Dashboard repensés (accordéons, tables, cartes de classe) + cartes d'installation des 2 mods en étapes numérotées.
Next: vérifier responsive fin, repasser `window.SITE_MAINTENANCE` selon besoin avant push, envisager regrouper les commandes Dashboard en cartes.

## 2026-06-06 (suite)
Ajout ajustements mobile (fondu barre d'onglets + titres réduits). Installé la skill globale `humanizer` (~/.claude/skills) et nettoyé les textes du site : suppression des tirets cadratins `—` en prose (24 textes index.html + 1 titre actu app.js), conservés les placeholders données et plages numériques.
Next: revue ortho/ton globale optionnelle, commit quand prêt.

## 2026-06-06 (session 3)
Articles Actualités : ancien "SANS CURSEFORGE" marqué obsolète (opacité + badge), nouvel article V2 ajouté. Lien CurseForge mis à jour (V37Or6S1, 5 occurrences). Meta OG/Twitter corrigés (serveur ouvert, 385 mods). Mémoire d'onglet via localStorage. Titre live `DonjonMC (n/max)` depuis l'API statut. Onglet FAQ (8 questions accordion). PWA manifest corrigé. Audit sécurité : `'unsafe-inline'` script-src, Cloudflare inutile en connect-src, referrer-policy absents — à corriger.
Next: appliquer les 3 correctifs CSP (déplacer SITE_MAINTENANCE en data-attr, supprimer Cloudflare, ajouter referrer-policy).

## 2026-06-06 (session 4)
Correctifs sécurité appliqués : suppression script inline SITE_MAINTENANCE (→ data-maintenance attr CSS-only), `'unsafe-inline'` retiré de script-src, Cloudflare supprimé de connect-src, referrer-policy ajouté. Audit multi-agents lancé (PII, injection, architecture, code quality) — findings en cours de consolidation.
Next: corriger NEWS innerHTML sans escapeHTML (n.tag/title/body/url), valider protocole https: sur dls[].url, envisager DOMPurify pour n.body.

## 2026-06-07
Audit UI/UX complet + améliorations : barre de scroll progress (CSS scroll-driven), bouton back-to-top (visible après 450px), trait décoratif gradient sous les titres de section, shimmer au hover sur btn-primary, animations d'entrée scroll-driven pour feature cards et step cards, footer enrichi (liens CurseForge + GitHub, auteur cliquable, copyright 2026).
Tête Ender Dragon 3D (Three.js, voxel BoxGeometry) ajoutée en décoration de fond dans le hero : flottement Y, rotation lente, parallaxe souris, yeux emissifs roses, wireframe violet. Correction bug WebGL (canvas créé par Three.js, HMR safe, preserveDrawingBuffer). Bundlé dans app.js (CommonJS require), CSP 'self' respectée.
Next: committer l'ensemble des changements CSS/HTML/JS.

## 2026-06-07 (suite)
Suppression complète de la scène 3D Ender Dragon : dragon3d.js supprimé, enderdragon.glb supprimé, require retiré de app.js. Three.js n'est plus bundlé.
Next: committer les améliorations UI/UX (scroll progress, back-to-top, footer, animations).

## 2026-06-07 (session 2)
Changelog GitHub auto (fetch releases DonjonMC + DashboardAdmin, injection dans NEWS), notifications PWA (cloche + Notification API + SW push handler), carte Bluemap intégrée en onglet iframe lazy-load avec bouton plein écran. Nouvel article mods perso à jour.
Next: surveiller les releases GitHub pour valider l'affichage auto, envisager backend pour push notifications réelles.

## 2026-06-08
Mise à jour liens DonjonMC v2.0.0 → v2.0.2 + Dashboard Admin URL corrigée. Nouvel article Actualités, ancien obsolète. Bouton 🔗 copier lien sur chaque article (deep-link ?tab=changelog#cl-N). Audit humanizer (tiret cadratin FAQ, actu ouverture). Bannière auto-refresh : HEAD polling toutes les 5 min + détection SW updatefound.
Next: tester la bannière après le prochain push, vérifier que le SW détecte bien les mises à jour.

## 2026-06-08 (2)
Liens wiki/source par mod : table MOD_LINKS (slug) avec wiki/source/issues pour 339/384 mods (287 via API Modrinth, 52 via scraping CurseForge). Rendu : petites icones inline 📖/source/🐞 a cote de chaque mod, sinon lien seul (inchange). Fonctions modSlug/modExtraIcons + CSS.
Next: verifier le rendu visuel des icones en mobile, completer les 45 mods restants si besoin.

## 2026-06-08 (3)
Corrections + features UX : content-visibility/overscroll/touch-action, fix compteur 385->384, bouton reset recherche. Puis tri des mods (categorie/A-Z/Z-A via ?sort=), deep-link FAQ (#faq-N + bouton copier), et alignement du badge categorie (desormais dernier element, colle a droite). Commits 19ad901 + fc37239.
Next: tri par popularite (besoin de recuperer les download counts Modrinth/CF) ; apostrophes typographiques FR.

## 2026-06-09
Liens mods MAJ : DonjonMC -> donjonmc-latest.jar, Dashboard -> dashboardadmin-1.0.5.jar (donnees MODS, articles, boutons index ; 16 occurrences). Nouvel article "supprimez les anciens d'abord", ancien passe obsolete. Fix changelog : releases GitHub marquees obsolete + tri par date (le 09 reste en tete), id d'article = slug stable (resout deep-link casse apres re-rendu). Bump SW cache v7->v8 (les assets cache-first ne se propageaient pas sans bump). Commits 3960f4d, 0bb94a2, a6a7dc1.
Next: pousser donjonmc-latest.jar + dashboardadmin-1.0.5.jar dans les releases/ des repos (sinon 404) ; envisager stale-while-revalidate dans sw.js pour eviter les bumps manuels.

## 2026-06-09 (UI — ameliorations 21st.dev)
Ameliorations UI inspirees de composants communautaires 21st.dev, en blocs amovibles : spotlight souris + border beam + texte degrade anime + glow CTA (vague 1), Number Ticker + Retro Grid + Meteors + 3D tilt (vague 2), remplacement des accordeons DonjonMC/Dashboard par une nav docs sidebar+panneau (icones SVG, tablist ARIA, construit au runtime depuis les <details> ; index.html intact), et fond du hero en shader gradient WebGL vanilla (FBM + domain warp, rendu 0.55x, pause hors-ecran, fallback). Liens dashboard repointes vers dashboardadmin-latest.jar. Cache SW bumpe jusqu'a v11.
Next: ajuster intensite shader / densite hero selon retours ; envisager parallaxe souris du shader.

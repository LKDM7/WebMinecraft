# PRODUCT.md — DonjonMC (site vitrine)

## Register

**brand** — site vitrine / landing page. Le design EST le produit : il doit donner envie de rejoindre le serveur avant même de lancer le jeu.

## Purpose

Site officiel du serveur Minecraft moddé **DonjonMC** (NeoForge 1.21.1, 385 mods). Une seule page qui doit :
1. Convertir un visiteur en joueur (télécharger le modpack, copier l'IP, rejoindre).
2. Servir de référence aux joueurs existants (guide du mod DonjonMC, commandes, actualités, carte du monde).

## Target users

- **Joueurs Minecraft francophones**, 12–30 ans, à l'aise avec CurseForge et les modpacks.
- Deux profils : le **nouveau** (a besoin du tutoriel d'installation et d'être convaincu) et l'**habitué** (revient pour les actus, les commandes, le guide de progression).
- Consultation fréquente sur mobile (pendant que Minecraft tourne sur le PC).

## Brand personality

- **RPG sombre inspiré de Solo Leveling** : donjons, rangs E→National, « Le Système », punitions. Ton direct, tutoiement, vocabulaire de jeu (« Forge ta légende », « NIVEAU 00 — ÉCRAN TITRE »).
- Deux thèmes commutables : **néon** (défaut : violet/cyan, aurora, shader WebGL) et **RPG pixel rétro** (monochrome, Pixelify Sans/VT323, façon shakanksh.com).
- La direction artistique *souhaitée* à long terme penche vers le **pixel rétro monochrome** ; le néon est l'héritage.

## Anti-references

- Landing pages SaaS génériques (hero + 3 cards + metrics).
- Glassmorphism et dégradés violets « IA par défaut » — tolérés dans le thème néon existant, à ne pas étendre.
- Sites de serveurs Minecraft surchargés de boutiques/votes/popups.

## Strategic design principles

1. **L'IP et le bouton modpack avant tout** — le chemin « rejoindre » ne doit jamais être à plus d'un scroll.
2. **Le contenu de jeu est canonique** : les tables (sorts, donjons, classes) viennent de `data/donjonmc.json`, partagé avec le mod.
3. **Performance statique** : GitHub Pages, zéro framework, CSP stricte, PWA offline.
4. **Bilingue thème, pas bilingue langue** : tout est en français.

## Tech constraints

HTML/CSS/JS vanilla, pas de build pour le site (webpack présent mais non utilisé pour la prod). CSP `script-src 'self'` (pas de libs CDN). Déployé sur GitHub Pages (`/WebMinecraft/`).

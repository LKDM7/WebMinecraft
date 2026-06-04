/* DonjonMC — app.js — NeoForge 1.21.1 */

/* =====================================================================
   CONFIGURATION
===================================================================== */
const CONFIG = {
  // Instant absolu d'ouverture (heure de Paris = +02:00 en été)
  launchDate: "2026-06-05T21:00:00+02:00",

  // IP du serveur CHIFFRÉE (AES-256-GCM). Impossible à lire en clair dans le code.
  // La clé est dérivée de la date d'ouverture — déchiffrée seulement après vérification
  // de l'heure RÉELLE sur internet (changer l'horloge du PC ne révèle rien).
  // Pour régénérer après changement d'IP : voir scripts/encrypt-ip.js
  ipCipher: {
    iv:   "+kJO0RtGAnmKRDHD",
    data: "munRnw1JDiQmXRAFvPNVR2fX5AmP9vz48J3JdU41ko1hSPo=",
    salt: "hunter-gate-v1",
  },
};

// IP déchiffrée à l'ouverture (jamais en clair dans le code source)
let revealedIP = null;

/* =====================================================================
   DONNÉES MODS  [Nom, Catégorie, URL]
   Sources : CurseForge (CF) et Modrinth (MR)
===================================================================== */
const CF = "https://www.curseforge.com/minecraft/mc-mods/";
const MR = "https://modrinth.com/mod/";

const MODS = [
// --- Monde & Biomes ---
["The Aether","Monde",CF+"the-aether"],
["Biomes O' Plenty","Monde",CF+"biomes-o-plenty"],
["Oh The Biomes We've Gone","Monde",CF+"oh-the-biomes-weve-gone"],
["Regions Unexplored","Monde",CF+"regions-unexplored"],
["Geophilic","Monde",MR+"geophilic"],
["Geofisica","Monde",CF+"geofisica"],
["Geolosy","Monde",CF+"geolosy"],
["Additions to Modded Biomes","Monde",CF+"additions-to-modded-biomes"],
["Aeroblender","Monde",CF+"aeroblender"],
["Dynamic Trees","Monde",CF+"dynamictrees"],
["DT-BiomesOPlenty","Monde",CF+"dtbop"],
["Climate Rules","Monde",CF+"climaterules"],
["YUNG's Cave Biomes","Monde",CF+"yungs-cave-biomes"],
["Distant Horizons","Monde",MR+"distanthorizons"],
// --- Structures ---
["Dungeons and Taverns","Structures",CF+"dungeons-and-taverns"],
["Repurposed Structures","Structures",CF+"repurposed-structures-forge"],
["Towns and Towers","Structures",CF+"towns-and-towers"],
["Additional Structures","Structures",CF+"additional-structures"],
["Oh The Structures You'll Go","Structures",CF+"oh-the-structures-youll-go"],
["Moog's Structures","Structures",CF+"moog-structures"],
["Moog's End Structures","Structures",CF+"moogis-end-structures"],
["Moog's Nether Structures","Structures",CF+"moogis-nether-structures"],
["Moog's Ocean Structures","Structures",CF+"moogis-ocean-structures"],
["Moog's Villages","Structures",CF+"moogis-villages"],
["Watchtowers","Structures",CF+"watchtowers"],
["Abandoned Watchtowers","Structures",CF+"abandoned-watchtowers"],
["Ancient Ruins","Structures",CF+"ancient-ruins"],
["Medieval Buildings","Structures",CF+"medieval-buildings"],
["Medieval Buildings Edition 1","Structures",CF+"medieval-buildings-edition-1"],
["Sky Villages","Structures",CF+"sky-villages"],
["Old Villages","Structures",CF+"old-villages"],
["Villages Plus","Structures",CF+"villages-plus"],
["Village More","Structures",CF+"village-more"],
["Villager Gardens","Structures",CF+"villager-gardens"],
["Ruined Buildings","Structures",CF+"ruined-buildings"],
["Simply Houses","Structures",CF+"simply-houses"],
["Structure Essential","Structures",CF+"structure-essential"],
["Structures Towers","Structures",CF+"structures-towers"],
["Create: Structures","Structures",CF+"create-structures"],
["Hope Better Underwater Ruins","Structures",CF+"hope-better-underwater-ruins"],
["Living Space","Structures",CF+"livingspace"],
["Kurtis' Interiors","Structures",CF+"kurtis-interiors"],
["Universal Bonus Chest","Structures",CF+"universal-bonus-chest"],
["YUNG's Better Caves","Structures",CF+"yungs-better-caves"],
["YUNG's Better Desert Temples","Structures",CF+"yungs-better-desert-temples"],
["YUNG's Better Dungeons","Structures",CF+"yungs-better-dungeons"],
["YUNG's Better Jungle Temples","Structures",CF+"yungs-better-jungle-temples"],
["YUNG's Better Mineshafts","Structures",CF+"yungs-better-mineshafts"],
["YUNG's Better Nether Fortresses","Structures",CF+"yungs-better-nether-fortresses"],
["YUNG's Better Ocean Monuments","Structures",CF+"yungs-better-ocean-monuments"],
["YUNG's Better Strongholds","Structures",CF+"yungs-better-strongholds"],
["YUNG's Better Witch Huts","Structures",CF+"yungs-better-witch-huts"],
["YUNG's Extras","Structures",CF+"yungs-extras"],
["T&T","Structures",CF+"towns-and-towers"],
// --- Mobs ---
["Alex's Mobs","Mobs",CF+"alexs-mobs"],
["Mowzie's Mobs","Mobs",CF+"mowzies-mobs"],
["Naturalist","Mobs",CF+"naturalist"],
["Friends and Foes","Mobs",CF+"friends-and-foes"],
["Mutant Monsters","Mobs",CF+"mutant-monsters"],
["More Golems","Mobs",CF+"more-golems"],
["Creeper Overhaul","Mobs",CF+"creeper-overhaul"],
["More Sniffers","Mobs",CF+"more-sniffers"],
["More Villagers","Mobs",CF+"more-villagers"],
["Guard Villagers","Mobs",CF+"guard-villagers"],
["Little Blue Demon","Mobs",CF+"little-blue-demon"],
["Horror Element Mod","Mobs",CF+"horror-element-mod"],
["Aquamirae","Mobs",CF+"aquamirae"],
["Darker Depths","Mobs",CF+"darker-depths"],
["Dragon Flight","Mobs",CF+"dragonflight"],
["More Drago","Mobs",CF+"moredrago"],
["Toy Soldiers","Mobs",CF+"toy-soldiers"],
["Companion","Mobs",CF+"companion"],
["Illagers Wear","Mobs",CF+"illagers-wear"],
// --- Nourriture ---
["Farmer's Delight","Nourriture",CF+"farmers-delight"],
["Farmer's Knives","Nourriture",CF+"farmers-knives"],
["Farmer's Resplendent","Nourriture",CF+"farmers-resplendent"],
["Barbeque's Delight","Nourriture",CF+"barbeques-delight"],
["Brewin' And Chewin'","Nourriture",CF+"brewin-and-chewin"],
["Allocave Delight","Nourriture",CF+"allocave-delight"],
["Crabber's Delight","Nourriture",CF+"crabbers-delight"],
["Delightful","Nourriture",CF+"delightful"],
["End's Delight","Nourriture",CF+"enders-delight"],
["Engineer's Delight","Nourriture",CF+"engineers-delight"],
["Fruits Delight","Nourriture",CF+"fruitsdelight"],
["Miner's Delight","Nourriture",CF+"miners-delight"],
["My Nether Delight","Nourriture",CF+"my-nether-delight"],
["Oceanic Delight","Nourriture",CF+"oceanic-delight"],
["Twilight Delight","Nourriture",CF+"twilight-delight"],
["Twilight Forest - Dungeons & Villages","Structures",CF+"twilightforest-dungeons-and-villages"],
["When Dungeons Arise","Structures",CF+"when-dungeons-arise"],
["Dungeons Delight","Nourriture",CF+"dungeons-delight"],
["Loot Integrations: WDA & Co","API",CF+"loot-integrations-when-dungeons-arise"],
["RunicLib","API",CF+"runiclib"],
["Connoisseur's Delight","Nourriture",CF+"connoisseurs-delight"],
["Iron's Spells Delight","Nourriture",CF+"irons-spells-delight"],
["Cuisines","Nourriture",CF+"cuisines"],
["Aquaculture","Nourriture",CF+"aquaculture-2"],
["Stardew Fishing","Nourriture",CF+"stardew-fishing"],
["Farms and Furnitures","Nourriture",CF+"farms-and-furnitures"],
["DoN Brewery","Nourriture",CF+"don-brewery"],
// --- Create ---
["Create","Create",CF+"create"],
["Create Addition","Create",CF+"createaddition"],
["Create: Aquatic Ambition","Create",CF+"create-aquatic-ambition"],
["Create: Connected","Create",CF+"create-connected"],
["Create: Recycling","Create",CF+"create-recycling"],
["Create: Things and Misc","Create",CF+"create-things-and-misc"],
["Create Aeronautics","Create",CF+"create-aeronautics"],
["Create Better","Create",CF+"createbetter"],
["Create: Big Cannons","Create",CF+"create-big-cannons"],
["Create: Confectionery","Create",CF+"create-confectionery"],
["Create Deco","Create",CF+"create-deco"],
["Create Generators","Create",CF+"create-generators"],
["Create: Cavation","Create",CF+"create-cavation"],
// --- Combat & Magie ---
["Iron's Spellbooks","Combat",CF+"irons-spells-n-spellbooks"],
["Better Combat","Combat",MR+"better-combat"],
["Simply Swords","Combat",CF+"simply-swords"],
["Artifacts","Combat",CF+"artifacts"],
["Epic Knights","Combat",CF+"epic-knights-shields-and-armor"],
["Immersive Armors","Combat",MR+"immersive-armors"],
["Fantasy Armor","Combat",CF+"fantasy-armor"],
["Cataclysm","Combat",CF+"cataclysm-mod"],
["L_Ender's Cataclysm","Combat",CF+"l-enders-cataclysm"],
["Hellish Tridents","Combat",CF+"hellish-tridents"],
["Ranged Weapons","Combat",CF+"ranged-weapons"],
["Armored Redstone","Combat",CF+"armored-redstone"],
["Dawn of it","Combat",CF+"dawnofit"],
["Accessories","Combat",MR+"accessories"],
["Backpacked","Combat",CF+"backpacked"],
["Cosmetic Armor Reworked","Combat",CF+"cosmetic-armor-reworked"],
["Spell Engine","Combat",MR+"spell-engine"],
["Spell Power","Combat",MR+"spell-power"],
["Immersive Engineering","Combat",CF+"immersive-engineering"],
["Paxii","Combat",CF+"paxii"],
["Royal Variants","Combat",CF+"royal-variants"],
// --- Décoration ---
["Macaw's Bridges","Déco",CF+"macaws-bridges"],
["Macaw's Doors","Déco",CF+"macaws-doors"],
["Macaw's Furniture","Déco",CF+"macaws-furniture"],
["Macaw's Lights & Lamps","Déco",CF+"macaws-lights-and-lamps"],
["Macaw's Paintings","Déco",CF+"macaws-paintings"],
["Macaw's Paths & Pavings","Déco",CF+"macaws-paths-and-pavings"],
["Macaw's Roofs","Déco",CF+"macaws-roofs"],
["Macaw's Fences & Walls","Déco",CF+"macaws-fences-and-walls"],
["Macaw's Windows","Déco",CF+"macaws-windows"],
["Macaw's BYG compat","Déco",CF+"mcw-byg"],
["Macaw's Biomes compat","Déco",CF+"mcwbiomesushi"],
["Another Furniture","Déco",MR+"anotherfurniture"],
["MrCrayfish's Furniture","Déco",CF+"mrcrayfishs-furniture-mod"],
["Supplementaries","Déco",CF+"supplementaries"],
["Refurbished Furniture","Déco",CF+"refurbished-furniture"],
["Design and Decor","Déco",CF+"design-n-decor"],
["Rustic","Déco",CF+"rustic"],
["Display Case","Déco",CF+"display-case"],
["Variant Chests","Déco",CF+"variant-chests"],
["Copycats+","Déco",MR+"copycats"],
["Paintings","Déco",MR+"paintings"],
["Quark","Déco",CF+"quark"],
["Prickle","Déco",CF+"prickle"],
["Chimes","Déco",CF+"chimes"],
["DoN Lanterns","Déco",CF+"don-lanterns"],
["Subtle Effects","Déco",CF+"subtle-effects"],
["Ecologics","Déco",CF+"ecologics"],
["Fusion (textures)","Déco",CF+"fusion-connected-textures"],
// --- Performance ---
["Sodium","Performance",MR+"sodium"],
["FerriteCore","Performance",MR+"ferrite-core"],
["ModernFix","Performance",CF+"modernfix"],
["Chunky","Performance",MR+"chunky"],
["Entity Culling","Performance",MR+"entityculling"],
["Saturn","Performance",MR+"saturn"],
["Krypton","Performance",MR+"krypton"],
["Oculus","Performance",CF+"oculus"],
["Spark","Performance",MR+"spark"],
["AI Improvements","Performance",CF+"ai-improvements"],
["Let Me Despawn","Performance",MR+"let-me-despawn"],
// --- Interface & Utilitaires ---
["Jade","Interface",CF+"jade"],
["JEI (Just Enough Items)","Interface",CF+"jei"],
["AppleSkin","Interface",CF+"appleskin"],
["Xaero's Minimap","Interface",CF+"xaeros-minimap"],
["Xaero's World Map","Interface",CF+"xaeros-world-map"],
["Mouse Tweaks","Interface",CF+"mouse-tweaks"],
["InvMove","Interface",CF+"invmove"],
["Clumps","Interface",CF+"clumps"],
["Enchantment Descriptions","Interface",CF+"enchantment-descriptions"],
["Camera Overhaul","Interface",MR+"cameraoverhaul"],
["Camera Utils","Interface",CF+"camera-utils"],
["Better Third Person","Interface",CF+"better-third-person"],
["Enhanced Boss Bars","Interface",CF+"enhanced-boss-bars"],
["Resourcify","Interface",CF+"resourcify"],
["Entity Model Features","Interface",MR+"entity-model-features"],
["Entity Texture Features","Interface",MR+"entitytexturefeatures"],
["Forgematica","Interface",CF+"forgematica"],
["CMDCam","Interface",CF+"cmdcam"],
["Simple Voice Chat","Interface",CF+"simple-voice-chat"],
["WorldEdit","Interface",CF+"worldedit"],
["Transparent","Interface",CF+"transparent"],
["More Leash","Interface",MR+"moreleash"],
["Better Archeology","Interface",CF+"better-archeology"],
["Sound Physics Remastered","Interface",CF+"sound-physics-remastered"],
["Diagonal Fences","Interface",MR+"diagonal-fences"],
["Block Faster Bypasser","Interface",CF+"block-faster-bypasser"],
["Packet Fixer","Interface",CF+"packet-fixer"],
["LambDynamicLights","Interface",MR+"lambdynamiclights"],
["Nether Portal Fix","Interface",CF+"netherportalfix"],
["More Mob Griefing Options","Interface",CF+"more-mob-griefing-options"],
["Tombstone","Interface",CF+"tombstone"],
["Easy NPC","Interface",CF+"easy-npc"],
// --- API & Bibliothèques ---
["Architectury API","API",MR+"architectury-api"],
["GeckoLib","API",CF+"geckolib"],
["Bookshelf","API",CF+"bookshelf"],
["Balm","API",CF+"balm"],
["Citadel","API",CF+"citadel"],
["Cloth Config","API",CF+"cloth-config"],
["Collective","API",CF+"collective"],
["Puzzles Lib","API",CF+"puzzles-lib"],
["Iceberg","API",CF+"iceberg"],
["Moonlight Lib","API",CF+"moonlight-lib"],
["Zeta","API",CF+"zeta"],
["GlitchCore","API",CF+"glitchcore"],
["Cristellib","API",CF+"cristellib"],
["Lodestone","API",CF+"lodestone"],
["Structure Gel API","API",CF+"structure-gel-api"],
["YUNG's API","API",CF+"yungs-api"],
["Cupboard","API",CF+"cupboard"],
["Forgified Fabric API","API",CF+"forgified-fabric-api"],
["Konkrete","API",CF+"konkrete"],
["Framework","API",CF+"framework"],
["oωo lib","API",MR+"owo-lib"],
["Ash API","API",CF+"ash-api"],
["AttributeFix","API",CF+"attributefix"],
["Integrated API","API",CF+"integrated-api"],
["Cyclops Core","API",CF+"cyclopscore"],
["AzureLib Armor","API",CF+"azurelib-armor"],
["Player Animation Library","API",MR+"player-animation-lib"],
["Mysterious Mountain Lib","API",CF+"mysterious-mountain-lib"],
["More RPG Library","API",CF+"more-rpg-library"],
["YACL","API",MR+"yacl"],
["Excavated Variants","API",MR+"excavated-variants"],
["Loot Integrations","API",CF+"lootinteg"],
["MAFGLI","API",CF+"mafgli"],
["Fuzzy Crafting","API",MR+"fuzzy-crafting"],
["Just Hammers","API",CF+"just-hammers"],
["Just Ores","API",CF+"just-ores"],
["Lettuce Mod","API",CF+"lettuce-mod"],
["TermBand","API",CF+"termband"],
["JLine","API",CF+"jline"],
];

/* =====================================================================
   COMPTE À REBOURS
===================================================================== */
const daysEl    = document.getElementById("days");
const hoursEl   = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const countdownSection = document.getElementById("countdown-section");
const serverReveal     = document.getElementById("server-reveal");
const serverIpEl       = document.getElementById("server-ip");

function pad(n) { return String(n).padStart(2, "0"); }

let countdownTimer = null;
let revealing = false;

function tick() {
  const diff = new Date(CONFIG.launchDate).getTime() - Date.now();
  if (diff <= 0) {
    // Le compte à rebours visuel est terminé — on demande l'IP au serveur (autorité réelle).
    // Tant que le Worker ne confirme pas l'ouverture, RIEN n'est révélé.
    daysEl.textContent = hoursEl.textContent = minutesEl.textContent = secondsEl.textContent = "00";
    tryReveal();
    return;
  }
  daysEl.textContent    = pad(Math.floor(diff / 86400000));
  hoursEl.textContent   = pad(Math.floor((diff % 86400000) / 3600000));
  minutesEl.textContent = pad(Math.floor((diff % 3600000) / 60000));
  secondsEl.textContent = pad(Math.floor((diff % 60000) / 1000));
}

/* Récupère l'heure RÉELLE depuis internet (anti triche d'horloge).
   Essaie 2 services ; en cas d'échec total, retombe sur l'horloge locale. */
async function getRealNow() {
  const sources = [
    ["https://worldtimeapi.org/api/timezone/Etc/UTC", d => d.unixtime * 1000],
    ["https://timeapi.io/api/Time/current/zone?timeZone=UTC", d => new Date(d.dateTime + "Z").getTime()],
  ];
  for (const [url, parse] of sources) {
    try {
      const r = await fetch(url, { cache: "no-store" });
      if (!r.ok) continue;
      const t = parse(await r.json());
      if (t && !isNaN(t)) return t;
    } catch (_) { /* source suivante */ }
  }
  return Date.now(); // dernier recours : horloge locale
}

/* Déchiffre l'IP via Web Crypto (AES-256-GCM), clé dérivée de la date + sel. */
async function decryptIP() {
  const b64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
  const passphrase = "DonjonMC|" + CONFIG.launchDate + "|" + CONFIG.ipCipher.salt;
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(passphrase));
  const key  = await crypto.subtle.importKey("raw", hash, { name: "AES-GCM" }, false, ["decrypt"]);
  const pt   = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: b64(CONFIG.ipCipher.iv) }, key, b64(CONFIG.ipCipher.data)
  );
  return new TextDecoder().decode(pt);
}

/* Vérifie l'heure réelle, et si l'ouverture est passée → déchiffre + révèle l'IP.
   Sinon → ne révèle RIEN et réessaie (résiste au changement d'horloge). */
async function tryReveal() {
  if (revealedIP || revealing) return;
  revealing = true;
  try {
    const realNow = await getRealNow();
    const launch  = new Date(CONFIG.launchDate).getTime();
    if (realNow >= launch) {
      revealedIP = await decryptIP();
      if (countdownTimer) clearInterval(countdownTimer);
      launchConfetti();
      countdownSection.classList.add("hidden");
      serverIpEl.textContent = revealedIP;
      serverReveal.classList.remove("hidden");
    } else {
      // Pas encore l'heure réelle → on retente, sans rien révéler
      const wait = Math.min(Math.max((launch - realNow) / 1000, 5), 30) * 1000;
      setTimeout(() => { revealing = false; tryReveal(); }, wait);
    }
  } catch (_) {
    setTimeout(() => { revealing = false; }, 5000);
  }
}

function launchConfetti() {
  const colors = ["#a78bfa","#22d3ee","#c4b5fd","#ffffff","#7c3aed","#06b6d4"];
  const wrap = document.createElement("div");
  Object.assign(wrap.style, { position:"fixed", inset:"0", pointerEvents:"none", zIndex:"999", overflow:"hidden" });
  document.body.appendChild(wrap);
  for (let i = 0; i < 90; i++) {
    const el = document.createElement("div");
    const sz = Math.random() * 9 + 4;
    Object.assign(el.style, {
      position:"absolute", top:"-20px",
      left: Math.random() * 100 + "%",
      width: sz + "px", height: sz + "px",
      background: colors[Math.floor(Math.random() * colors.length)],
      borderRadius: Math.random() > 0.5 ? "50%" : "3px",
      animation: `confetti-fall ${Math.random()*2+2}s ${Math.random()*1.5}s ease-in forwards`,
      transform: `rotate(${Math.random()*360}deg)`,
    });
    wrap.appendChild(el);
  }
  setTimeout(() => wrap.remove(), 5000);
}

tick();
countdownTimer = setInterval(tick, 1000);

/* =====================================================================
   COPIER L'IP  (utilise l'IP récupérée du Worker, jamais une valeur en dur)
===================================================================== */
document.getElementById("copy-btn").addEventListener("click", function () {
  if (!revealedIP) return;
  const btn = this;
  function done() {
    btn.textContent = "✓ Copié !";
    btn.classList.add("copied");
    setTimeout(() => { btn.textContent = "Copier l'IP"; btn.classList.remove("copied"); }, 2000);
  }
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(revealedIP).then(done).catch(() => fallback(done));
  } else { fallback(done); }
});

function fallback(cb) {
  const el = Object.assign(document.createElement("textarea"), { value: revealedIP });
  Object.assign(el.style, { position: "fixed", opacity: "0" });
  document.body.appendChild(el);
  el.select();
  try { document.execCommand("copy"); cb(); } catch (_) {}
  document.body.removeChild(el);
}

/* =====================================================================
   ONGLETS
===================================================================== */
function activateTab(id) {
  document.querySelectorAll(".tab-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.tab === id);
    b.setAttribute("aria-selected", b.dataset.tab === id);
  });
  document.querySelectorAll(".tab-content").forEach(c => {
    c.classList.toggle("active", c.id === "tab-" + id);
  });
}
document.querySelectorAll(".tab-btn").forEach(b => b.addEventListener("click", () => activateTab(b.dataset.tab)));
document.querySelectorAll(".nav-pill a[data-tab]").forEach(a => {
  a.addEventListener("click", e => {
    e.preventDefault();
    activateTab(a.dataset.tab);
    document.getElementById("info").scrollIntoView({ behavior: "smooth" });
  });
});

/* =====================================================================
   LISTE DES MODS — rendu + recherche + filtres
===================================================================== */
let currentFilter = "all";
let currentSearch = "";

// Échappe les caractères HTML pour éviter toute injection (XSS) via la recherche
function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[c]);
}

function renderMods() {
  const q = currentSearch.toLowerCase();
  const filtered = MODS.filter(([name, cat]) =>
    (currentFilter === "all" || cat === currentFilter) &&
    name.toLowerCase().includes(q)
  );

  const count = document.getElementById("mods-count");
  count.textContent = `${filtered.length} mod${filtered.length !== 1 ? "s" : ""} affiché${filtered.length !== 1 ? "s" : ""}`;

  document.getElementById("mods-list-container").innerHTML = filtered.length
    ? filtered.map(([name, cat, url]) =>
        `<a href="${url}" target="_blank" rel="noopener noreferrer" class="mod-item">
          <span class="mod-item-name">${name}</span>
          <span class="mod-item-badge badge-${cat}">${cat}</span>
          <span class="mod-item-link">↗</span>
        </a>`).join("")
    : `<p style="color:var(--muted);padding:2rem 0;text-align:center;">Aucun mod trouvé pour « ${escapeHTML(currentSearch)} »</p>`;
}

document.getElementById("mods-search").addEventListener("input", e => {
  currentSearch = e.target.value;
  renderMods();
});

document.getElementById("filter-pills").addEventListener("click", e => {
  const pill = e.target.closest(".filter-pill");
  if (!pill) return;
  currentFilter = pill.dataset.filter;
  document.querySelectorAll(".filter-pill").forEach(p => p.classList.toggle("active", p === pill));
  renderMods();
});

/* Skeleton loader — affiché pendant 280ms avant le rendu réel */
const skeletonHTML = Array(12).fill('<div class="skeleton-item"></div>').join("");
document.getElementById("mods-list-container").innerHTML = skeletonHTML;
setTimeout(renderMods, 280);

/* =====================================================================
   BURGER MENU MOBILE
===================================================================== */
const burgerBtn  = document.getElementById("burger-btn");
const mobileNav  = document.getElementById("mobile-nav");

burgerBtn.addEventListener("click", () => {
  const open = burgerBtn.classList.toggle("open");
  mobileNav.classList.toggle("open", open);
  mobileNav.setAttribute("aria-hidden", !open);
});

mobileNav.querySelectorAll(".mnav-link").forEach(link => {
  link.addEventListener("click", () => {
    burgerBtn.classList.remove("open");
    mobileNav.classList.remove("open");
    mobileNav.setAttribute("aria-hidden", "true");
    const tab = link.dataset.tab;
    if (tab) { activateTab(tab); document.getElementById("info").scrollIntoView({ behavior: "smooth" }); }
  });
});

/* =====================================================================
   PARTICULES — hero section
===================================================================== */
(function () {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const COLORS = ["167,139,250", "34,211,238", "196,149,255"];
  let pts = [];

  const hero = canvas.closest(".hero") || canvas.parentElement;

  function resize() {
    canvas.width  = hero.offsetWidth  || window.innerWidth;
    canvas.height = hero.offsetHeight || window.innerHeight;
  }

  function make() {
    return {
      x: Math.random() * canvas.width,
      y: canvas.height + 5,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -(Math.random() * 0.7 + 0.3),
      r: Math.random() * 2 + 0.5,
      o: Math.random() * 0.5 + 0.15,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  }

  resize();
  for (let i = 0; i < 55; i++) { const p = make(); p.y = Math.random() * canvas.height; pts.push(p); }
  window.addEventListener("resize", () => { resize(); pts = []; for (let i = 0; i < 55; i++) { const p = make(); p.y = Math.random() * canvas.height; pts.push(p); } });

  (function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pts.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy; p.o -= 0.0008;
      if (p.y < -5 || p.o <= 0) pts[i] = make();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.c},${p.o})`;
      ctx.fill();
    });
    requestAnimationFrame(loop);
  })();
})();

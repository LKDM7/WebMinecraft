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
const MODS = [
// --- Monde & Biomes ---
["AeroBlender","Monde","https://www.curseforge.com/minecraft/mc-mods/aeroblender"],
["Aether Addon: Enhanced Extinguishing","Monde","https://www.curseforge.com/minecraft/mc-mods/aether-enhanced-extinguishing"],
["Aether Addon: Protect Your Moa","Monde","https://www.curseforge.com/minecraft/mc-mods/aether-protect-your-moa"],
["Aether Addon: Treasure Reforging","Monde","https://www.curseforge.com/minecraft/mc-mods/aether-treasure-reforging"],
["Aether Villages","Monde","https://www.curseforge.com/minecraft/mc-mods/aether-villages"],
["Bedrockoid","Monde","https://www.curseforge.com/minecraft/mc-mods/bedrockoid"],
["Better Biome Reblend","Monde","https://www.curseforge.com/minecraft/mc-mods/bbrb"],
["Biome Music","Monde","https://www.curseforge.com/minecraft/mc-mods/biome-music"],
["Climate Rivers","Monde","https://www.curseforge.com/minecraft/mc-mods/climate-rivers"],
["Deep Aether","Monde","https://www.curseforge.com/minecraft/mc-mods/deep-aether"],
["Deeper and Darker","Monde","https://www.curseforge.com/minecraft/mc-mods/deeperdarker"],
["Eternal Nether","Monde","https://www.curseforge.com/minecraft/mc-mods/eternal-nether"],
["FallingTree","Monde","https://www.curseforge.com/minecraft/mc-mods/falling-tree"],
["Gardens of the Dead","Monde","https://www.curseforge.com/minecraft/mc-mods/gardens-of-the-dead"],
["Geophilic – Vanilla Biome Overhauls","Monde","https://www.curseforge.com/minecraft/mc-mods/geophilic"],
["Hearths","Monde","https://www.curseforge.com/minecraft/mc-mods/hearths"],
["Leaves Be Gone","Monde","https://www.curseforge.com/minecraft/mc-mods/leaves-be-gone"],
["Nature's Compass","Monde","https://www.curseforge.com/minecraft/mc-mods/natures-compass"],
["Oh The Biomes We've Gone","Monde","https://www.curseforge.com/minecraft/mc-mods/oh-the-biomes-weve-gone"],
["Oh The Trees You'll Grow","Monde","https://www.curseforge.com/minecraft/mc-mods/oh-the-trees-youll-grow"],
["Pufferfish's Biome Dither","Monde","https://www.curseforge.com/minecraft/mc-mods/puffish-biome-dither"],
["Seasonal Integration","Monde","https://www.curseforge.com/minecraft/mc-mods/seasonal-integration"],
["Serene Seasons","Monde","https://www.curseforge.com/minecraft/mc-mods/serene-seasons"],
["Simple Snowy Fix","Monde","https://www.curseforge.com/minecraft/mc-mods/simple-snowy-fix-forge-fabric"],
["Snow Under Trees","Monde","https://www.curseforge.com/minecraft/mc-mods/snow-under-trees"],
["Snow! Real Magic!","Monde","https://www.curseforge.com/minecraft/mc-mods/snow-real-magic"],
["Stoneworks","Monde","https://www.curseforge.com/minecraft/mc-mods/stoneworks"],
["Stony Cliffs Are Cool","Monde","https://www.curseforge.com/minecraft/mc-mods/stony-cliffs-are-cool"],
["The Aether","Monde","https://www.curseforge.com/minecraft/mc-mods/aether"],
["The Twilight Forest","Monde","https://www.curseforge.com/minecraft/mc-mods/the-twilight-forest"],
["TwilightForest Thread Safety Addon","Monde","https://www.curseforge.com/minecraft/mc-mods/tfthreadsafetyaddon"],
["Wetland Whimsy","Monde","https://www.curseforge.com/minecraft/mc-mods/wetland-whimsy"],
// --- Structures ---
["AdoraBuild: Structures","Structures","https://www.curseforge.com/minecraft/mc-mods/adorabuild-structures"],
["Adventure Dungeons","Structures","https://www.curseforge.com/minecraft/mc-mods/adventure-dungeons-mod-edition"],
["Cataclysm x YUNG's Better Nether Fortresses Compat","Structures","https://www.curseforge.com/minecraft/mc-mods/cataclysm-x-yungs"],
["DnT Ancient City Overhaul","Structures","https://www.curseforge.com/minecraft/mc-mods/dnt-ancient-city-overhaul"],
["DnT Swamp Hut Overhaul","Structures","https://www.curseforge.com/minecraft/mc-mods/dnt-swamp-hut-overhaul"],
["DnT Woodland Mansion Overhaul","Structures","https://www.curseforge.com/minecraft/mc-mods/dnt-woodland-mansion-overhaul"],
["Explorations","Structures","https://www.curseforge.com/minecraft/mc-mods/explorations"],
["Explorify – Dungeons & Structures","Structures","https://www.curseforge.com/minecraft/mc-mods/explorify"],
["Farmers Structures","Structures","https://www.curseforge.com/minecraft/mc-mods/farmers-structures"],
["Formations Nether","Structures","https://www.curseforge.com/minecraft/mc-mods/formations-nether"],
["Formations Overworld","Structures","https://www.curseforge.com/minecraft/mc-mods/formations-overworld"],
["Improved Village Placement","Structures","https://www.curseforge.com/minecraft/mc-mods/improved-village-placement"],
["Integrated Dungeons and Structures","Structures","https://www.curseforge.com/minecraft/mc-mods/idas"],
["It Takes a Pillage Continuation","Structures","https://www.curseforge.com/minecraft/mc-mods/it-takes-a-pillage-continuation"],
["Lootr","Structures","https://www.curseforge.com/minecraft/mc-mods/lootr"],
["Luki's Crazy Chambers","Structures","https://www.curseforge.com/minecraft/mc-mods/lukis-crazy-chambers"],
["MES - Moog's End Structures","Structures","https://www.curseforge.com/minecraft/mc-mods/moogs-end-structures"],
["MMV - Moog's Missing Villages","Structures","https://www.curseforge.com/minecraft/mc-mods/mmv-moogs-missing-villages"],
["MNS - Moog's Nether Structures","Structures","https://www.curseforge.com/minecraft/mc-mods/mns-moogs-nether-structures"],
["Moog's Glow Up","Structures","https://www.curseforge.com/minecraft/mc-mods/moogs-glow-up"],
["MVS - Moog's Voyager Structures","Structures","https://www.curseforge.com/minecraft/mc-mods/moogs-voyager-structures"],
["Nether Trials & Chambers","Structures","https://www.curseforge.com/minecraft/mc-mods/hellish-trials"],
["Raided","Structures","https://www.curseforge.com/minecraft/mc-mods/raided"],
["Repurposed Structures","Structures","https://www.curseforge.com/minecraft/mc-mods/repurposed-structures"],
["Sparse Structures","Structures","https://www.curseforge.com/minecraft/mc-mods/sparse-structures"],
["Structory","Structures","https://www.curseforge.com/minecraft/mc-mods/structory"],
["Structory: Towers","Structures","https://www.curseforge.com/minecraft/mc-mods/structory-towers"],
["Structure Essentials","Structures","https://www.curseforge.com/minecraft/mc-mods/structure-essentials-forge-fabric"],
["Villages&Pillages","Structures","https://www.curseforge.com/minecraft/mc-mods/villages-and-pillages"],
["When Dungeons Arise - Forge!","Structures","https://www.curseforge.com/minecraft/mc-mods/when-dungeons-arise"],
["YUNG's Better Dungeons","Structures","https://www.curseforge.com/minecraft/mc-mods/yungs-better-dungeons-neoforge"],
["YUNG's Better End Island","Structures","https://www.curseforge.com/minecraft/mc-mods/yungs-better-end-island-neoforge"],
["YUNG's Better Jungle Temples","Structures","https://www.curseforge.com/minecraft/mc-mods/yungs-better-jungle-temples-neoforge"],
["YUNG's Better Mineshafts","Structures","https://www.curseforge.com/minecraft/mc-mods/yungs-better-mineshafts-neoforge"],
["YUNG's Better Nether Fortresses","Structures","https://www.curseforge.com/minecraft/mc-mods/yungs-better-nether-fortresses-neoforge"],
["YUNG's Better Ocean Monuments","Structures","https://www.curseforge.com/minecraft/mc-mods/yungs-better-ocean-monuments-neoforge"],
["YUNG's Better Strongholds","Structures","https://www.curseforge.com/minecraft/mc-mods/yungs-better-strongholds-neoforge"],
["YUNG's Better Witch Huts","Structures","https://www.curseforge.com/minecraft/mc-mods/yungs-better-witch-huts-neoforge"],
// --- Mobs ---
["Alex's Mobs","Mobs","https://www.curseforge.com/minecraft/mc-mods/alexs-mobs-1-21-1-port"],
["Dragon Mounts Remastered","Mobs","https://www.curseforge.com/minecraft/mc-mods/dmr"],
["Friends&Foes","Mobs","https://www.curseforge.com/minecraft/mc-mods/friends-and-foes-forge"],
["Goblin Traders","Mobs","https://www.curseforge.com/minecraft/mc-mods/goblin-traders"],
["Hybrid Aquatic","Mobs","https://www.curseforge.com/minecraft/mc-mods/hybrid-aquatic"],
["Illager Invasion","Mobs","https://www.curseforge.com/minecraft/mc-mods/illager-invasion"],
["Just Enough Breeding (JEBr)","Mobs","https://www.curseforge.com/minecraft/mc-mods/justenoughbreeding"],
["More Mobs","Mobs","https://www.curseforge.com/minecraft/data-packs/more-mobs"],
["More Villagers : Re-employed","Mobs","https://www.curseforge.com/minecraft/mc-mods/more-villagers-re-employed"],
["Mowzie's Mobs","Mobs","https://www.curseforge.com/minecraft/mc-mods/mowzies-mobs"],
["Piglin Proliferation","Mobs","https://www.curseforge.com/minecraft/mc-mods/piglin-proliferation"],
["RevampedWolf","Mobs","https://www.curseforge.com/minecraft/mc-mods/revampedwolf"],
["Rewithered","Mobs","https://www.curseforge.com/minecraft/mc-mods/rewithered"],
["Smarter Farmers (farmers replant)","Mobs","https://www.curseforge.com/minecraft/mc-mods/smarter-farmers-farmers-replant"],
["Variants&Ventures","Mobs","https://www.curseforge.com/minecraft/mc-mods/variants-and-ventures"],
["Villager Names","Mobs","https://www.curseforge.com/minecraft/mc-mods/villager-names"],
["Zombie Improvements","Mobs","https://www.curseforge.com/minecraft/mc-mods/zombie-improvements"],
// --- Nourriture ---
["Autochef's Delight","Nourriture","https://www.curseforge.com/minecraft/mc-mods/autochefs-delight"],
["Ender's Delight","Nourriture","https://www.curseforge.com/minecraft/mc-mods/enders-delight"],
["Farmer's Cutting: Oh The Biomes We've Gone","Nourriture","https://www.curseforge.com/minecraft/mc-mods/farmers-cutting-oh-the-biomes-weve-gone"],
["Farmer's Delight","Nourriture","https://www.curseforge.com/minecraft/mc-mods/farmers-delight"],
["My Nether's Delight","Nourriture","https://www.curseforge.com/minecraft/mc-mods/my-nethers-delight"],
["Ocean's Delight","Nourriture","https://www.curseforge.com/minecraft/mc-mods/oceans-delight"],
["Repurposed Structures - Farmer's Delight Compat Mod","Nourriture","https://www.curseforge.com/minecraft/mc-mods/repurposed-structures-farmers-delight-compat-mod"],
["RightClickHarvest","Nourriture","https://www.curseforge.com/minecraft/mc-mods/rightclickharvest"],
["Twilight's Flavors & Delight","Nourriture","https://www.curseforge.com/minecraft/mc-mods/twilights-flavors-delight"],
// --- Create ---
["Colorwheel","Create","https://www.curseforge.com/minecraft/mc-mods/colorwheel"],
["Create","Create","https://www.curseforge.com/minecraft/mc-mods/create"],
["Create Big Cannons","Create","https://www.curseforge.com/minecraft/mc-mods/create-big-cannons"],
["Create Crafts & Additions","Create","https://www.curseforge.com/minecraft/mc-mods/createaddition"],
["Create Deco","Create","https://www.curseforge.com/minecraft/mc-mods/create-deco"],
["Create Ore Excavation","Create","https://www.curseforge.com/minecraft/mc-mods/create-ore-excavation"],
["Create Slice & Dice","Create","https://www.curseforge.com/minecraft/mc-mods/slice-and-dice"],
["Create Stuff 'N Additions","Create","https://www.curseforge.com/minecraft/mc-mods/create-stuff-additions"],
["Create: Central Kitchen","Create","https://www.curseforge.com/minecraft/mc-mods/create-central-kitchen"],
["Create: Copycats+","Create","https://www.curseforge.com/minecraft/mc-mods/copycats"],
["Create: Design n' Decor","Create","https://www.curseforge.com/minecraft/mc-mods/create-design-n-decor"],
["Create: Dragons Plus","Create","https://www.curseforge.com/minecraft/mc-mods/create-dragons-plus"],
["Create: Enchantment Industry","Create","https://www.curseforge.com/minecraft/mc-mods/create-enchantment-industry"],
["Create: Interiors","Create","https://www.curseforge.com/minecraft/mc-mods/interiors"],
["Create: New Age","Create","https://www.curseforge.com/minecraft/mc-mods/create-new-age"],
["Create: Radars","Create","https://www.curseforge.com/minecraft/mc-mods/create-radars"],
["Vanillin","Create","https://www.curseforge.com/minecraft/mc-mods/vanillin"],
// --- Combat & Magie ---
["Advanced Netherite","Combat","https://www.curseforge.com/minecraft/mc-mods/advanced-netherite"],
["DonjonMC","Combat","https://github.com/LKDM7/DonjonMC/raw/refs/heads/master/releases/donjonmc-2.0.0.jar"],
["Easy Magic","Combat","https://www.curseforge.com/minecraft/mc-mods/easy-magic"],
["Enderdragon Loot","Combat","https://www.curseforge.com/minecraft/mc-mods/enderdragon-loot"],
["Iron's Spells 'n Spellbooks","Combat","https://www.curseforge.com/minecraft/mc-mods/irons-spells-n-spellbooks"],
["L_Ender 's Cataclysm","Combat","https://www.curseforge.com/minecraft/mc-mods/lendercataclysm"],
["MmmMmmMmmMmm (Target Dummy)","Combat","https://www.curseforge.com/minecraft/mc-mods/mmmmmmmmmmmm"],
["Netherite Tweaks & Fixes","Combat","https://www.curseforge.com/minecraft/mc-mods/netherite-tweaks"],
["Simply Swords","Combat","https://www.curseforge.com/minecraft/mc-mods/simply-swords"],
// --- Décoration ---
["Amendments","Déco","https://www.curseforge.com/minecraft/mc-mods/amendments"],
["Another Furniture","Déco","https://www.curseforge.com/minecraft/mc-mods/another-furniture"],
["Aurelj's Paintings","Déco","https://www.curseforge.com/minecraft/mc-mods/aureljs-paintings"],
["Chipped","Déco","https://www.curseforge.com/minecraft/mc-mods/chipped"],
["Cut Through","Déco","https://www.curseforge.com/minecraft/mc-mods/cut-through"],
["Diagonal Fences","Déco","https://www.curseforge.com/minecraft/mc-mods/diagonal-fences"],
["Diagonal Walls","Déco","https://www.curseforge.com/minecraft/mc-mods/diagonal-walls"],
["Dyed Flames","Déco","https://www.curseforge.com/minecraft/mc-mods/dyed-flames"],
["Handcrafted","Déco","https://www.curseforge.com/minecraft/mc-mods/handcrafted"],
["KleeSlabs","Déco","https://www.curseforge.com/minecraft/mc-mods/kleeslabs"],
["Particle Effects","Déco","https://www.curseforge.com/minecraft/mc-mods/particle-effects"],
["Quark","Déco","https://www.curseforge.com/minecraft/mc-mods/quark"],
["Sawmill","Déco","https://www.curseforge.com/minecraft/mc-mods/sawmill"],
["Subtle Effects","Déco","https://www.curseforge.com/minecraft/mc-mods/subtle-effects"],
["Supplementaries","Déco","https://www.curseforge.com/minecraft/mc-mods/supplementaries"],
["Toni's Immersive Lanterns","Déco","https://www.curseforge.com/minecraft/mc-mods/immersive-lanterns"],
["Underlay","Déco","https://www.curseforge.com/minecraft/mc-mods/underlay"],
["Wakes Reforged","Déco","https://www.curseforge.com/minecraft/mc-mods/wakes-reforged"],
// --- Performance ---
["AllTheLeaks (Memory Leak Fix)","Performance","https://www.curseforge.com/minecraft/mc-mods/alltheleaks"],
["Alternate Current","Performance","https://www.curseforge.com/minecraft/mc-mods/alternate-current"],
["BadOptimizations","Performance","https://www.curseforge.com/minecraft/mc-mods/badoptimizations"],
["Better World Loading","Performance","https://www.curseforge.com/minecraft/mc-mods/better-world-loading-forge"],
["BMC \"Datafixer\"","Performance","https://www.curseforge.com/minecraft/mc-mods/bmc-patcher"],
["Chunk Activity Tracker","Performance","https://www.curseforge.com/minecraft/mc-mods/chunk-activity-tracker"],
["Chunk Sending","Performance","https://www.curseforge.com/minecraft/mc-mods/chunk-sending-forge-fabric"],
["Chunky","Performance","https://www.curseforge.com/minecraft/mc-mods/chunky-pregenerator-forge"],
["Concurrent Chunk Management Engine","Performance","https://www.curseforge.com/minecraft/mc-mods/c2me"],
["Connectivity","Performance","https://www.curseforge.com/minecraft/mc-mods/connectivity"],
["Crash Assistant","Performance","https://www.curseforge.com/minecraft/mc-mods/crash-assistant"],
["Disconnect Packet Fix","Performance","https://www.curseforge.com/minecraft/mc-mods/disconnect-packet-fix"],
["Does It Tick?","Performance","https://www.curseforge.com/minecraft/mc-mods/does-it-tick"],
["Dolphin Fix","Performance","https://www.curseforge.com/minecraft/mc-mods/dolphin-fix"],
["Entity Culling Fabric/Forge","Performance","https://www.curseforge.com/minecraft/mc-mods/entityculling"],
["Farsight","Performance","https://www.curseforge.com/minecraft/mc-mods/farsight"],
["Fast Async World Save","Performance","https://www.curseforge.com/minecraft/mc-mods/fast-async-world-save-forge-fabric"],
["Fast IP Ping","Performance","https://www.curseforge.com/minecraft/mc-mods/fast-ip-ping"],
["Fast Item Frames","Performance","https://www.curseforge.com/minecraft/mc-mods/fast-item-frames"],
["Fast Paintings","Performance","https://www.curseforge.com/minecraft/mc-mods/fast-paintings"],
["FerriteCore","Performance","https://www.curseforge.com/minecraft/mc-mods/ferritecore"],
["fix GPU memory leak","Performance","https://www.curseforge.com/minecraft/mc-mods/fix-gpu-memory-leak"],
["Golem Spawn Fix","Performance","https://www.curseforge.com/minecraft/mc-mods/golem-spawn-fix"],
["Horse Breeding Fix","Performance","https://www.curseforge.com/minecraft/mc-mods/horse-breeding-fix"],
["HRTF Fix","Performance","https://www.curseforge.com/minecraft/mc-mods/hrtffix"],
["ImmediatelyFast","Performance","https://www.curseforge.com/minecraft/mc-mods/immediatelyfast"],
["Krypton Reno","Performance","https://www.curseforge.com/minecraft/mc-mods/krypton-fnp"],
["Lithium","Performance","https://www.curseforge.com/minecraft/mc-mods/lithium"],
["Loading Protection","Performance","https://www.curseforge.com/minecraft/mc-mods/loading-protection"],
["Log Begone","Performance","https://www.curseforge.com/minecraft/mc-mods/log-begone"],
["Long NBT Killer","Performance","https://www.curseforge.com/minecraft/mc-mods/long-nbt-killer"],
["Memory Settings","Performance","https://www.curseforge.com/minecraft/mc-mods/memory-settings"],
["Missing Mods Checker","Performance","https://www.curseforge.com/minecraft/mc-mods/missing-mods-checker"],
["MixinTrace Resmithed","Performance","https://www.curseforge.com/minecraft/mc-mods/mixintrace-resmithed"],
["ModernFix","Performance","https://www.curseforge.com/minecraft/mc-mods/modernfix"],
["Modpack Update Checker","Performance","https://www.curseforge.com/minecraft/mc-mods/modpack-update-checker"],
["NaNny (Fix NaN Health / Absorption)","Performance","https://www.curseforge.com/minecraft/mc-mods/nanny"],
["Neo Bee Fix","Performance","https://www.curseforge.com/minecraft/mc-mods/neo-bee-fix"],
["Neruina - Ticking Entity Fixer","Performance","https://www.curseforge.com/minecraft/mc-mods/neruina"],
["Pack Analytics","Performance","https://www.curseforge.com/minecraft/mc-mods/pack-analytics"],
["Packet Fixer","Performance","https://www.curseforge.com/minecraft/mc-mods/packet-fixer"],
["Random Enchant Fix","Performance","https://www.curseforge.com/minecraft/mc-mods/random-enchant-fix"],
["Recipe Essentials","Performance","https://www.curseforge.com/minecraft/mc-mods/recipe-essentials-forge-fabric"],
["Redirected","Performance","https://www.curseforge.com/minecraft/mc-mods/redirected"],
["Reese's Sodium Options","Performance","https://www.curseforge.com/minecraft/mc-mods/reeses-sodium-options"],
["ScalableLux","Performance","https://www.curseforge.com/minecraft/mc-mods/scalablelux"],
["Server Performance - Smooth Chunk Save","Performance","https://www.curseforge.com/minecraft/mc-mods/smooth-chunk-save"],
["Skeleton AI Fix","Performance","https://www.curseforge.com/minecraft/mc-mods/skeleton-ai-fix"],
["Smooth Movement","Performance","https://www.curseforge.com/minecraft/mc-mods/smooth-movement"],
["Sodium","Performance","https://www.curseforge.com/minecraft/mc-mods/sodium"],
["Sodium Leaf Culling","Performance","https://www.curseforge.com/minecraft/mc-mods/sodium-leaf-culling"],
["Sodium/Embeddium Extras","Performance","https://www.curseforge.com/minecraft/mc-mods/magnesium-extras"],
["Sodium/Embeddium Options API","Performance","https://www.curseforge.com/minecraft/mc-mods/sodium-options-api"],
["Sodium/Embeddium Options Mod Compat","Performance","https://www.curseforge.com/minecraft/mc-mods/sodium-embeddium-options-mod-compat"],
["spark","Performance","https://www.curseforge.com/minecraft/mc-mods/spark"],
["Structure Layout Optimizer","Performance","https://www.curseforge.com/minecraft/mc-mods/structure-layout-optimizer"],
// --- Interface & Utilitaires ---
["Accessorify","Interface","https://www.curseforge.com/minecraft/mc-mods/accessorify"],
["Advanced Loot Info","Interface","https://www.curseforge.com/minecraft/mc-mods/advanced-loot-info"],
["Audio Improvements","Interface","https://www.curseforge.com/minecraft/mc-mods/audio-improvements"],
["Backpacked","Interface","https://www.curseforge.com/minecraft/mc-mods/backpacked"],
["Bartering Station","Interface","https://www.curseforge.com/minecraft/mc-mods/bartering-station"],
["Better Advancements","Interface","https://www.curseforge.com/minecraft/mc-mods/better-advancements"],
["Better Client","Interface","https://www.curseforge.com/minecraft/mc-mods/better-client"],
["Better Mods Button","Interface","https://www.curseforge.com/minecraft/mc-mods/better-mods-button"],
["BisectHosting Server Integration Menu","Interface","https://www.curseforge.com/minecraft/mc-mods/bisecthosting-server-integration-menu-neoforge"],
["Boat Item View","Interface","https://www.curseforge.com/minecraft/mc-mods/boat-item-view-forge"],
["Carry On","Interface","https://www.curseforge.com/minecraft/mc-mods/carry-on"],
["Certain Questing Additions","Interface","https://www.curseforge.com/minecraft/mc-mods/certain-questing-additions"],
["Chat Heads","Interface","https://www.curseforge.com/minecraft/mc-mods/chat-heads"],
["Cherished Worlds","Interface","https://www.curseforge.com/minecraft/mc-mods/cherished-worlds"],
["Client Crafting","Interface","https://www.curseforge.com/minecraft/mc-mods/client-crafting"],
["Client Sort","Interface","https://www.curseforge.com/minecraft/mc-mods/clientsort"],
["Clumps","Interface","https://www.curseforge.com/minecraft/mc-mods/clumps"],
["Comforts","Interface","https://www.curseforge.com/minecraft/mc-mods/comforts"],
["Controlling","Interface","https://www.curseforge.com/minecraft/mc-mods/controlling"],
["Convenient Effects","Interface","https://www.curseforge.com/minecraft/mc-mods/convenient-effects"],
["Dashboard Admin","Interface","https://github.com/LKDM7/DashBoardAdmin/raw/refs/heads/master/releases/dashboardadmin-1.0.4.jar"],
["Delete Worlds To Trash","Interface","https://www.curseforge.com/minecraft/mc-mods/delete-worlds-to-trash"],
["Despawn Tweaks","Interface","https://www.curseforge.com/minecraft/mc-mods/despawn-tweaks"],
["Distraction Free Recipes (EMI / REI / JEI)","Interface","https://www.curseforge.com/minecraft/mc-mods/distraction-free-recipes"],
["Double Doors","Interface","https://www.curseforge.com/minecraft/mc-mods/double-doors"],
["Drippy Loading Screen","Interface","https://www.curseforge.com/minecraft/mc-mods/drippy-loading-screen"],
["Early Bedtime","Interface","https://www.curseforge.com/minecraft/mc-mods/early-bedtime"],
["Easy Anvils","Interface","https://www.curseforge.com/minecraft/mc-mods/easy-anvils"],
["Easy Disenchanting","Interface","https://www.curseforge.com/minecraft/mc-mods/easy-disenchanting"],
["Enchantment Descriptions","Interface","https://www.curseforge.com/minecraft/mc-mods/enchantment-descriptions"],
["FancyMenu","Interface","https://www.curseforge.com/minecraft/mc-mods/fancymenu"],
["Foolproof","Interface","https://www.curseforge.com/minecraft/mc-mods/foolproof"],
["Fortune Works On Ancient Debris","Interface","https://www.curseforge.com/minecraft/data-packs/fortuneworksonancientdebris"],
["FTB Filter System","Interface","https://www.curseforge.com/minecraft/mc-mods/ftb-filter-system"],
["FTB Quests","Interface","https://www.curseforge.com/minecraft/mc-mods/ftb-quests-forge"],
["FTB Teams","Interface","https://www.curseforge.com/minecraft/mc-mods/ftb-teams-forge"],
["Immersive Armor HUD","Interface","https://www.curseforge.com/minecraft/mc-mods/immersive-armor-hud"],
["Immersive Tips","Interface","https://www.curseforge.com/minecraft/mc-mods/immersive-tips"],
["Inmis","Interface","https://www.curseforge.com/minecraft/mc-mods/inmis-forge-port"],
["Item Highlighter","Interface","https://www.curseforge.com/minecraft/mc-mods/item-highlighter"],
["Jade","Interface","https://www.curseforge.com/minecraft/mc-mods/jade"],
["Jade Addons","Interface","https://www.curseforge.com/minecraft/mc-mods/jade-addons"],
["Just Enough Items (JEI)","Interface","https://www.curseforge.com/minecraft/mc-mods/jei"],
["Just Enough Professions (JEP)","Interface","https://www.curseforge.com/minecraft/mc-mods/just-enough-professions-jep"],
["Just Zoom","Interface","https://www.curseforge.com/minecraft/mc-mods/just-zoom"],
["Leaderboards","Interface","https://www.curseforge.com/minecraft/mc-mods/leaderboards"],
["Leave My Bars Alone","Interface","https://www.curseforge.com/minecraft/mc-mods/leave-my-bars-alone"],
["Luna","Interface","https://www.curseforge.com/minecraft/mc-mods/luna"],
["Magnum Torch","Interface","https://www.curseforge.com/minecraft/mc-mods/magnum-torch"],
["Melody","Interface","https://www.curseforge.com/minecraft/mc-mods/melody"],
["Mining Speed Tooltips","Interface","https://www.curseforge.com/minecraft/mc-mods/mining-speed-tooltips"],
["Misc Tweaks","Interface","https://www.curseforge.com/minecraft/mc-mods/misc-tweaks"],
["Mouse Tweaks","Interface","https://www.curseforge.com/minecraft/mc-mods/mouse-tweaks"],
["MouseTweaks x Accessories Fix","Interface","https://www.curseforge.com/minecraft/mc-mods/mousetweaks-x-accessories-fix"],
["Nether Chested","Interface","https://www.curseforge.com/minecraft/mc-mods/nether-chested"],
["NetherPortalFix","Interface","https://www.curseforge.com/minecraft/mc-mods/netherportalfix"],
["No Chat Reports","Interface","https://www.curseforge.com/minecraft/mc-mods/no-chat-reports"],
["No Report Button","Interface","https://www.curseforge.com/minecraft/mc-mods/no-report-button"],
["Non-Directional Damage Tilt Fix","Interface","https://www.curseforge.com/minecraft/mc-mods/nondirectionaldamagetiltfix"],
["Not Enough Animations","Interface","https://www.curseforge.com/minecraft/mc-mods/not-enough-animations"],
["Open Parties and Claims","Interface","https://www.curseforge.com/minecraft/mc-mods/open-parties-and-claims"],
["Overflowing Bars","Interface","https://www.curseforge.com/minecraft/mc-mods/overflowing-bars"],
["Pick Up Notifier","Interface","https://www.curseforge.com/minecraft/mc-mods/pick-up-notifier"],
["Ping Wheel","Interface","https://www.curseforge.com/minecraft/mc-mods/ping-wheel"],
["Polymorph","Interface","https://www.curseforge.com/minecraft/mc-mods/polymorph"],
["Quests Kill Task Tweaks","Interface","https://www.curseforge.com/minecraft/mc-mods/quests-kill-task-tweaks"],
["Reset Controls Confirmation","Interface","https://www.curseforge.com/minecraft/mc-mods/reset-controls-confirmation"],
["Resource Pack Overrides","Interface","https://www.curseforge.com/minecraft/mc-mods/resource-pack-overrides"],
["Server Browser - In Game Server Listings","Interface","https://www.curseforge.com/minecraft/mc-mods/server-browser"],
["Simple Discord Rich Presence","Interface","https://www.curseforge.com/minecraft/mc-mods/simple-discord-rich-presence"],
["Simple Voice Chat","Interface","https://www.curseforge.com/minecraft/mc-mods/simple-voice-chat"],
["Simply Tooltips","Interface","https://www.curseforge.com/minecraft/mc-mods/simply-tooltips"],
["Skin Layers 3D","Interface","https://www.curseforge.com/minecraft/mc-mods/skin-layers-3d"],
["Sodium/Embeddium Dynamic Lights","Interface","https://www.curseforge.com/minecraft/mc-mods/dynamiclights-reforged"],
["Sound Physics Remastered","Interface","https://www.curseforge.com/minecraft/mc-mods/sound-physics-remastered"],
["Tom's Simple Storage Mod","Interface","https://www.curseforge.com/minecraft/mc-mods/toms-storage"],
["Too Fast","Interface","https://www.curseforge.com/minecraft/mc-mods/too-fast"],
["Trading Post","Interface","https://www.curseforge.com/minecraft/mc-mods/trading-post"],
["Vein Mining","Interface","https://www.curseforge.com/minecraft/mc-mods/vein-mining"],
["Visual Workbench","Interface","https://www.curseforge.com/minecraft/mc-mods/visual-workbench"],
["What Are They Up To (Watut)","Interface","https://www.curseforge.com/minecraft/mc-mods/what-are-they-up-to"],
["World Play Time","Interface","https://www.curseforge.com/minecraft/mc-mods/world-play-time"],
["Xaero's Minimap","Interface","https://www.curseforge.com/minecraft/mc-mods/xaeros-minimap"],
["Xaero's World Map","Interface","https://www.curseforge.com/minecraft/mc-mods/xaeros-world-map"],
["XaeroPlus","Interface","https://www.curseforge.com/minecraft/mc-mods/xaeroplus"],
["XP Tome","Interface","https://www.curseforge.com/minecraft/mc-mods/xp-tome"],
["YUNG's Menu Tweaks","Interface","https://www.curseforge.com/minecraft/mc-mods/yungs-menu-tweaks-neoforge"],
// --- API & Bibliothèques ---
["Abridged","API","https://www.curseforge.com/minecraft/mc-mods/abridged"],
["Accessories","API","https://www.curseforge.com/minecraft/mc-mods/accessories"],
["Accessories Compatibility Layer","API","https://www.curseforge.com/minecraft/mc-mods/accessories-compat-layer"],
["Almanac Lib","API","https://www.curseforge.com/minecraft/mc-mods/almanac-lib"],
["Architectury API","API","https://www.curseforge.com/minecraft/mc-mods/architectury-api"],
["Athena","API","https://www.curseforge.com/minecraft/mc-mods/athena"],
["AzureLib","API","https://www.curseforge.com/minecraft/mc-mods/azurelib"],
["Balm","API","https://www.curseforge.com/minecraft/mc-mods/balm"],
["Better Compatibility Checker","API","https://www.curseforge.com/minecraft/mc-mods/better-compatibility-checker"],
["Blended Compat","API","https://www.curseforge.com/minecraft/mc-mods/blended-compat"],
["Bookshelf","API","https://www.curseforge.com/minecraft/mc-mods/bookshelf"],
["Caelus API","API","https://www.curseforge.com/minecraft/mc-mods/caelus"],
["Cerulean","API","https://www.curseforge.com/minecraft/mc-mods/cerulean"],
["Citadel","API","https://www.curseforge.com/minecraft/mc-mods/citadel-1-21-1-port"],
["Cloth Config API","API","https://www.curseforge.com/minecraft/mc-mods/cloth-config"],
["Collective","API","https://www.curseforge.com/minecraft/mc-mods/collective"],
["Configurable","API","https://www.curseforge.com/minecraft/mc-mods/configurable"],
["Configured","API","https://www.curseforge.com/minecraft/mc-mods/configured"],
["Configured Defaults","API","https://www.curseforge.com/minecraft/mc-mods/configured-defaults"],
["Connector Extras","API","https://www.curseforge.com/minecraft/mc-mods/connector-extras"],
["CorgiLib","API","https://www.curseforge.com/minecraft/mc-mods/corgilib"],
["CoroUtil","API","https://www.curseforge.com/minecraft/mc-mods/coroutil"],
["Cristel Lib","API","https://www.curseforge.com/minecraft/mc-mods/cristel-lib"],
["Cupboard","API","https://www.curseforge.com/minecraft/mc-mods/cupboard"],
["Curios API","API","https://www.curseforge.com/minecraft/mc-mods/curios"],
["EpheroLib","API","https://www.curseforge.com/minecraft/mc-mods/epherolib"],
["Forge Config API Port","API","https://www.curseforge.com/minecraft/mc-mods/forge-config-api-port"],
["Forgified Fabric API","API","https://www.curseforge.com/minecraft/mc-mods/forgified-fabric-api"],
["Formations (Structure Library)","API","https://www.curseforge.com/minecraft/mc-mods/formations"],
["Framework","API","https://www.curseforge.com/minecraft/mc-mods/framework"],
["FTB Library","API","https://www.curseforge.com/minecraft/mc-mods/ftb-library-forge"],
["FTB XMod Compat","API","https://www.curseforge.com/minecraft/mc-mods/ftb-xmod-compat"],
["Fzzy Config","API","https://www.curseforge.com/minecraft/mc-mods/fzzy-config"],
["GeckoLib","API","https://www.curseforge.com/minecraft/mc-mods/geckolib"],
["Geophilic Backport - Vanilla Backport Compact","API","https://www.curseforge.com/minecraft/mc-mods/geophilic-backport-vanilla-backport-compact"],
["GlitchCore","API","https://www.curseforge.com/minecraft/mc-mods/glitchcore"],
["Iceberg","API","https://www.curseforge.com/minecraft/mc-mods/iceberg"],
["Immersive Messages API","API","https://www.curseforge.com/minecraft/mc-mods/immersive-messages-api"],
["Integrated API","API","https://www.curseforge.com/minecraft/mc-mods/integrated-api"],
["Iron's Lib","API","https://www.curseforge.com/minecraft/mc-mods/irons-lib"],
["JamLib","API","https://www.curseforge.com/minecraft/mc-mods/jamlib"],
["Kiwi","API","https://www.curseforge.com/minecraft/mc-mods/kiwi"],
["Konkrete","API","https://www.curseforge.com/minecraft/mc-mods/konkrete"],
["Kotlin for Forge","API","https://www.curseforge.com/minecraft/mc-mods/kotlin-for-forge"],
["Lionfish API","API","https://www.curseforge.com/minecraft/mc-mods/lionfish-api"],
["Lithostitched","API","https://www.curseforge.com/minecraft/mc-mods/lithostitched"],
["Load My F***ing Tags","API","https://www.curseforge.com/minecraft/mc-mods/lmft"],
["Loot Integrations","API","https://www.curseforge.com/minecraft/mc-mods/loot-integrations"],
["Loot Integrations: Bygone Nether & Eternal Nether & It Takes a Pillage","API","https://www.curseforge.com/minecraft/mc-mods/loot-integrations-bygone-nether-it-takes-a-pillage"],
["Loot Integrations: Formations Overworld & Nether","API","https://www.curseforge.com/minecraft/mc-mods/loot-integrations-formations-overworld-nether"],
["Loot Integrations: Moog's Voyager, Soaring, End & Nether Structures","API","https://www.curseforge.com/minecraft/mc-mods/loot-integrations-moogs-voyager-soaring-end-nether"],
["Loot Integrations: When Dungeons Arise & Co","API","https://www.curseforge.com/minecraft/mc-mods/loot-integrations-when-dungeons-arise"],
["MidnightLib","API","https://www.curseforge.com/minecraft/mc-mods/midnightlib"],
["Moog's Structure Lib (moogs_structures)","API","https://www.curseforge.com/minecraft/mc-mods/moogs-structure-lib"],
["Moonlight Lib","API","https://www.curseforge.com/minecraft/mc-mods/selene"],
["oωo (owo-lib)","API","https://www.curseforge.com/minecraft/mc-mods/owo-lib"],
["Particle Core","API","https://www.curseforge.com/minecraft/mc-mods/particle-core"],
["Patchouli","API","https://www.curseforge.com/minecraft/mc-mods/patchouli"],
["Paxi","API","https://www.curseforge.com/minecraft/mc-mods/paxi-neoforge"],
["Platform","API","https://www.curseforge.com/minecraft/mc-mods/platform"],
["playerAnimator","API","https://www.curseforge.com/minecraft/mc-mods/playeranimator"],
["Prickle","API","https://www.curseforge.com/minecraft/mc-mods/prickle"],
["Puzzles Lib","API","https://www.curseforge.com/minecraft/mc-mods/puzzles-lib"],
["Resourceful Config","API","https://www.curseforge.com/minecraft/mc-mods/resourceful-config"],
["Resourceful Lib","API","https://www.curseforge.com/minecraft/mc-mods/resourceful-lib"],
["Ritchie's Projectile Library","API","https://www.curseforge.com/minecraft/mc-mods/ritchies-projectile-library"],
["Searchables","API","https://www.curseforge.com/minecraft/mc-mods/searchables"],
["Sinytra Connector","API","https://www.curseforge.com/minecraft/mc-mods/sinytra-connector"],
["Supplementaries Compat","API","https://www.curseforge.com/minecraft/data-packs/supplementaries-compat"],
["TerraBlender","API","https://www.curseforge.com/minecraft/mc-mods/terrablender-neoforge"],
["TxniLib","API","https://www.curseforge.com/minecraft/mc-mods/txnilib"],
["Van Backport Compat","API","https://www.curseforge.com/minecraft/mc-mods/vb-compat"],
["Vanilla Backport","API","https://www.curseforge.com/minecraft/mc-mods/vanillabackport"],
["Villager API","API","https://www.curseforge.com/minecraft/mc-mods/villagerapi"],
["YetAnotherConfigLib","API","https://www.curseforge.com/minecraft/mc-mods/yacl"],
["Yung Structures Addon for Loot Integrations","API","https://www.curseforge.com/minecraft/mc-mods/yung-structures-addon-for-loot-integrations"],
["YUNG's API","API","https://www.curseforge.com/minecraft/mc-mods/yungs-api-neoforge"],
["Zeta","API","https://www.curseforge.com/minecraft/mc-mods/zeta"],
// --- Shaders ---
["BSL Shaders","Shaders","https://www.curseforge.com/minecraft/shaders/bsl-shaders"],
["Complementary Shaders - Reimagined","Shaders","https://www.curseforge.com/minecraft/shaders/complementary-reimagined"],
["Complementary Shaders - Unbound","Shaders","https://www.curseforge.com/minecraft/shaders/complementary-unbound"],
["Euphoria Patches","Shaders","https://www.curseforge.com/minecraft/mc-mods/euphoria-patches"],
["Iris Shaders","Shaders","https://www.curseforge.com/minecraft/mc-mods/irisshaders"],
["Iris/Oculus Shader Folder","Shaders","https://www.curseforge.com/minecraft/mc-mods/iris-shader-folder"],
["MakeUp - Ultra Fast | Shaders","Shaders","https://www.curseforge.com/minecraft/shaders/makeup-ultra-fast-shader"],
["Sildur's Vibrant shaders","Shaders","https://www.curseforge.com/minecraft/shaders/sildurs-vibrant-shaders"],
// --- Textures & Ressources ---
["BetterGrassify","Textures","https://www.curseforge.com/minecraft/mc-mods/bettergrassify"],
["Boss Refreshed","Textures","https://www.curseforge.com/minecraft/texture-packs/boss-refreshed"],
["Continuity","Textures","https://www.curseforge.com/minecraft/mc-mods/continuity"],
["Enhanced Boss Bars","Textures","https://www.curseforge.com/minecraft/texture-packs/enhanced-boss-bars"],
["Entity Model Features","Textures","https://www.curseforge.com/minecraft/mc-mods/entity-model-features"],
["Entity Texture Features","Textures","https://www.curseforge.com/minecraft/mc-mods/entity-texture-features-fabric"],
["Faithful 64x","Textures","https://www.curseforge.com/minecraft/texture-packs/faithful-64x"],
["Forge CIT","Textures","https://www.curseforge.com/minecraft/mc-mods/forge-cit"],
["Fresh Animations","Textures","https://www.curseforge.com/minecraft/texture-packs/fresh-animations"],
["Fresh Animations: Extensions","Textures","https://www.curseforge.com/minecraft/texture-packs/fresh-animations-extensions"],
["Fresh Moves","Textures","https://www.curseforge.com/minecraft/texture-packs/fresh-moves"],
["Icon Xaero's","Textures","https://www.curseforge.com/minecraft/texture-packs/icon-xaeros"],
["Icon Xaero's X FreshAnimations","Textures","https://www.curseforge.com/minecraft/texture-packs/icon-xaeros-x-freshanimations"],
["Low On Fire","Textures","https://www.curseforge.com/minecraft/texture-packs/low-on-fire"],
["Mandala's GUI - Dark mode","Textures","https://www.curseforge.com/minecraft/texture-packs/mandalas-gui-dark-mode"],
["New Glowing Ores","Textures","https://www.curseforge.com/minecraft/texture-packs/new-glowing-ores"],
];

/* =====================================================================
   COMPTEUR DE MODS — synchronise tous les "X mods" sur la taille réelle
   du tableau MODS (plus jamais d'incohérence codée en dur).
===================================================================== */
document.querySelectorAll(".js-mod-count").forEach(el => { el.textContent = MODS.length; });

/* =====================================================================
   ACTUALITÉS  (onglet "Actualités" — timeline)

   Pour AJOUTER une actu : copiez un bloc { … } en haut du tableau.
     day   : jour sur 2 chiffres        (ex. "05")
     my    : mois + année               (ex. "JUIN 2026")
     tag   : couleur — "new" | "event" | "fix" | "requis"
     label : texte du badge (optionnel — sinon libellé par défaut du tag)
     title : titre de l'actu
     body  : texte (HTML autorisé : <strong>, <code class="inline-path">…)
     dls   : boutons de téléchargement (optionnel) — [{ label, url }]
   La plus récente se met en HAUT du tableau (elle est mise en avant).
===================================================================== */
const NEWS = [
  {
    day: "06", my: "JUIN 2026", tag: "new", label: "MODPACK V2",
    title: "On repart sur une V2",
    body: `Soyons honnêtes : la première version a été un fiasco. Trop de crashs et d'incompatibilités, bref ça ne tenait pas la route. On a donc tout remis à plat et on revient avec une <strong>V2</strong> entièrement retravaillée, ${MODS.length} mods en NeoForge 1.21.1. On croise les doigts pour que cette fois soit la bonne. Téléchargez le nouveau modpack et remontez-nous le moindre bug.`,
    dls: [
      { label: "⬇ Télécharger le Modpack V2", url: "https://www.curseforge.com/minecraft/share/V37Or6S1" },
    ],
  },
  {
    day: "06", my: "JUIN 2026", tag: "new", label: "SANS CURSEFORGE",
    title: "Modpack V2 sans CurseForge",
    body: `Pas de CurseForge ? Le dossier <code class="inline-path">mods</code> complet est disponible directement sur GitHub. Téléchargez l'archive, décompressez-la, puis placez son contenu dans le dossier <code class="inline-path">mods</code> de votre instance NeoForge 1.21.1.`,
    dls: [
      { label: "⬇ Télécharger le dossier mods (V2)", url: "https://github.com/LKDM7/DonjonMC-modpacks/archive/refs/heads/main.zip" },
    ],
  },
  {
    day: "05", my: "JUIN 2026", tag: "new", label: "SANS CURSEFORGE",
    title: "Télécharger le dossier mods directement",
    body: `Vous ne souhaitez pas ou ne pouvez pas utiliser CurseForge ? Téléchargez l'intégralité du dossier <code class="inline-path">mods</code> directement depuis GitHub en un clic. Placez ensuite son contenu dans le dossier <code class="inline-path">mods</code> de votre instance NeoForge 1.21.1.`,
    obsolete: true,
  },
  {
    day: "05", my: "JUIN 2026", tag: "requis", label: "REQUIS",
    title: "2 mods à télécharger avant de rejoindre le serveur",
    body: `DonjonMC utilise 2 mods personnalisés qui ne sont <strong>pas inclus</strong> dans le modpack CurseForge. Télécharge-les et place-les dans le dossier <strong>mods</strong> du modpack : ouvre CurseForge, repère le modpack DonjonMC, clique sur les <strong>3 points ⋮</strong> à côté du bouton Play → <strong>Open Folder</strong> → dépose les 2 mods dans le dossier <code class="inline-path">mods</code>.`,
    dls: [
      { label: "⬇ DonjonMC v2.0.0", url: "https://github.com/LKDM7/DonjonMC/raw/refs/heads/master/releases/donjonmc-2.0.0.jar" },
      { label: "⬇ Dashboard Admin v1.0.4", url: "https://github.com/LKDM7/DashBoardAdmin/raw/refs/heads/master/releases/dashboardadmin-1.0.4.jar" },
    ],
  },
  {
    day: "05", my: "JUIN 2026", tag: "new", label: "NOUVEAU",
    title: "Ouverture officielle de DonjonMC !",
    body: `Le serveur ouvre ses portes ce soir à 21h. Rejoignez-nous pour découvrir un monde entièrement forgé pour l'aventure, avec ${MODS.length} mods soigneusement sélectionnés.`,
  },
  {
    day: "03", my: "JUIN 2026", tag: "event", label: "ÉVÉNEMENT",
    title: "Lancement du site officiel",
    body: `Le site de pré-lancement est en ligne ! Consultez la liste des mods, les commandes disponibles et préparez-vous pour l'ouverture.`,
  },
  {
    day: "01", my: "JUIN 2026", tag: "fix", label: "MISE À JOUR",
    title: "Finalisation du modpack : v1.0",
    body: `Le modpack est stabilisé. ${MODS.length} mods NeoForge 1.21.1, optimisé et testé. Téléchargement disponible via CurseForge.`,
  },
];

const NEWS_LABELS = { new: "NOUVEAU", event: "ÉVÉNEMENT", fix: "MISE À JOUR", requis: "REQUIS" };

function renderNews() {
  const container = document.getElementById("changelog-list");
  if (!container) return;
  container.innerHTML = NEWS.map((n, i) => {
    const label = n.label || NEWS_LABELS[n.tag] || "";
    const dls = (!n.obsolete && n.dls && n.dls.length)
      ? `<div class="cl-dl-row">${n.dls.map(d =>
          `<a href="${d.url}" class="btn btn-primary cl-dl-btn" download>${d.label}</a>`
        ).join("")}</div>`
      : "";
    const cls = ["cl-item", i === 0 ? "is-latest" : "", n.obsolete ? "is-obsolete" : ""].filter(Boolean).join(" ");
    return `<article class="${cls}">
      <div class="cl-date"><span class="cl-day">${n.day}</span><span class="cl-my">${n.my}</span></div>
      <div class="cl-content">
        <span class="cl-tag tag-${n.tag}">${label}</span>
        <h3>${n.title}</h3>
        <p>${n.body}</p>
        ${dls}
      </div>
    </article>`;
  }).join("");
}
renderNews();

/* =====================================================================
   RÉVÉLATION DU SERVEUR  (le compte à rebours a été retiré)
===================================================================== */
const serverReveal = document.getElementById("server-reveal");
const serverIpEl   = document.getElementById("server-ip");

let revealing = false;

/* Récupère l'heure RÉELLE depuis internet (anti triche d'horloge).
   1) Services d'heure publics (précision ms).
   2) En-tête HTTP "Date" d'une requête réseau — c'est l'horloge du SERVEUR,
      impossible à falsifier en changeant l'horloge du PC. Le same-origin
      (GitHub Pages) est toujours lisible et fiable, même si les API tombent.
   3) Dernier recours : horloge locale. */
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
      const MIN_TS = 1700000000000, MAX_TS = 1900000000000; // 2023–2030
      if (t && !isNaN(t) && t > MIN_TS && t < MAX_TS) return t;
    } catch (_) { /* source suivante */ }
  }

  // Repli robuste : en-tête "Date" (HEAD = jamais mis en cache par le SW car non-GET).
  const headerSources = [
    location.origin + "/?t=" + Date.now(),          // same-origin : toujours lisible
    "https://www.cloudflare.com/cdn-cgi/trace",      // bonus externe (best-effort)
  ];
  for (const url of headerSources) {
    try {
      const r = await fetch(url, { method: "HEAD", cache: "no-store" });
      const d = r.headers.get("date");
      if (d) { const t = new Date(d).getTime(); if (!isNaN(t)) return t; }
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
      serverIpEl.textContent = revealedIP;
      serverReveal.classList.remove("hidden");
      startServerStatus(revealedIP);
    } else {
      // Pas encore l'heure réelle → on retente, sans rien révéler
      const wait = Math.min(Math.max((launch - realNow) / 1000, 5), 30) * 1000;
      setTimeout(() => { revealing = false; tryReveal(); }, wait);
    }
  } catch (_) {
    setTimeout(() => { revealing = false; }, 5000);
  }
}

// Respecte le réglage système "réduire les animations".
function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* =====================================================================
   STATUT LIVE DU SERVEUR  (api.mcsrvstat.us — public, sans clé)
   Affiche En ligne / Hors ligne + joueurs connectés + noms.
   Démarre une fois l'IP révélée, puis rafraîchit toutes les 60 sec.
===================================================================== */
let statusTimer = null;

async function fetchServerStatus(ip) {
  const dot     = document.getElementById("status-dot");
  const text    = document.getElementById("status-text");
  const players = document.getElementById("status-players");
  const list    = document.getElementById("status-playerlist");
  if (!dot || !text) return;

  try {
    const r = await fetch("https://api.mcsrvstat.us/3/" + encodeURIComponent(ip), { cache: "no-store" });
    const d = await r.json();

    if (d && d.online) {
      dot.className = "status-dot online";
      text.textContent = "En ligne";
      const on  = d.players ? (parseInt(d.players.online, 10) || 0) : 0;
      const max = d.players ? (parseInt(d.players.max, 10) || 0) : 0;
      players.innerHTML = `· <strong>${on}</strong>/${max} joueur${on !== 1 ? "s" : ""}`;
      document.title = `DonjonMC (${on}/${max})`;

      const names = (d.players && Array.isArray(d.players.list)) ? d.players.list : [];
      list.innerHTML = names
        .map(p => `<span class="player-chip">${escapeHTML(typeof p === "string" ? p : (p.name || ""))}</span>`)
        .join("");
    } else {
      dot.className = "status-dot offline";
      text.textContent = "Hors ligne";
      players.textContent = "";
      list.innerHTML = "";
      document.title = "DonjonMC — Serveur Minecraft Moddé";
    }
  } catch (_) {
    dot.className = "status-dot offline";
    text.textContent = "Statut indisponible";
    players.textContent = "";
    list.innerHTML = "";
    document.title = "DonjonMC — Serveur Minecraft Moddé";
  }
}

function startServerStatus(ip) {
  if (statusTimer) return;
  fetchServerStatus(ip);
  statusTimer = setInterval(() => fetchServerStatus(ip), 30000);
}

/* =====================================================================
   MODAL MODS REQUIS — affiché à la révélation de l'IP
===================================================================== */
function showModsRequiredModal() {
  const overlay = document.getElementById("mods-required-overlay");
  if (!overlay) return;

  const prevFocus = document.activeElement;
  overlay.removeAttribute("hidden");

  const getFocusable = () => [...overlay.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')];
  const first = getFocusable()[0];
  if (first) first.focus();

  function trapFocus(e) {
    if (e.key !== "Tab") return;
    const els = getFocusable();
    if (!els.length) return;
    const firstEl = els[0], lastEl = els[els.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === firstEl) { e.preventDefault(); lastEl.focus(); }
    } else {
      if (document.activeElement === lastEl) { e.preventDefault(); firstEl.focus(); }
    }
  }

  overlay.addEventListener("keydown", trapFocus);

  document.getElementById("mods-modal-confirm")?.addEventListener("click", () => {
    overlay.removeEventListener("keydown", trapFocus);
    overlay.setAttribute("hidden", "");
    prevFocus?.focus();
  }, { once: true });
}

/* Mode aperçu : ?preview=open affiche le rendu "serveur ouvert" sans rien
   déchiffrer (IP factice), pour tester la mise en page avant l'ouverture. */
function isPreviewOpen() {
  try { return new URLSearchParams(location.search).get("preview") === "open"; }
  catch (_) { return false; }
}

function revealPreview() {
  serverIpEl.textContent = "apercu.donjonmc.fr";
  serverReveal.classList.remove("hidden");
  const dot  = document.getElementById("status-dot");
  const text = document.getElementById("status-text");
  if (dot)  dot.className = "status-dot online";
  if (text) text.textContent = "Aperçu (données factices)";
}

// Le serveur est ouvert : on tente la révélation de l'IP dès le chargement
// (toujours protégée par la vérification de l'heure réelle dans tryReveal).
if (isPreviewOpen()) {
  revealPreview();
} else {
  tryReveal();
}

/* =====================================================================
   COPIER L'IP  (utilise l'IP récupérée du Worker, jamais une valeur en dur)
===================================================================== */
let modsModalShown = false;
document.getElementById("copy-btn").addEventListener("click", function () {
  if (!revealedIP) return;
  const btn = this;
  function done() {
    btn.textContent = "✓ Copié !";
    btn.classList.add("copied");
    if (!modsModalShown) { modsModalShown = true; showModsRequiredModal(); }
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
   ONGLETS — état reflété dans l'URL (?tab=) + navigation clavier ARIA
===================================================================== */
const TAB_IDS = ["mods", "commands", "changelog", "donjonmc", "dashboard", "faq"];

// Met à jour (ou retire) un paramètre d'URL sans recharger la page.
function setQueryParam(key, value) {
  const url = new URL(location.href);
  if (value == null || value === "") url.searchParams.delete(key);
  else url.searchParams.set(key, value);
  history.replaceState(null, "", url);
}

function activateTab(id, syncUrl = true) {
  if (!TAB_IDS.includes(id)) id = "mods";
  document.querySelectorAll(".tab-btn").forEach(b => {
    const on = b.dataset.tab === id;
    b.classList.toggle("active", on);
    b.setAttribute("aria-selected", on ? "true" : "false");
    b.setAttribute("tabindex", on ? "0" : "-1"); // roving tabindex
  });
  document.querySelectorAll(".tab-content").forEach(c => {
    c.classList.toggle("active", c.id === "tab-" + id);
  });
  if (syncUrl) setQueryParam("tab", id === "mods" ? null : id); // mods = défaut → URL propre
  try { localStorage.setItem("donjonmc-tab", id); } catch (_) {}
}

function currentTab() {
  const b = document.querySelector(".tab-btn.active");
  return b ? b.dataset.tab : "mods";
}

document.querySelectorAll(".tab-btn").forEach(b => b.addEventListener("click", () => activateTab(b.dataset.tab)));

// Flèches ← →, Home, End pour naviguer entre onglets (motif ARIA tabs).
const tablist = document.querySelector(".tabs[role='tablist']");
if (tablist) {
  tablist.addEventListener("keydown", e => {
    const moves = { ArrowRight: 1, ArrowLeft: -1, Home: "home", End: "end" };
    if (!(e.key in moves)) return;
    e.preventDefault();
    const btns = [...tablist.querySelectorAll(".tab-btn")];
    const cur = btns.findIndex(b => b.dataset.tab === currentTab());
    let next;
    if (moves[e.key] === "home") next = 0;
    else if (moves[e.key] === "end") next = btns.length - 1;
    else next = (cur + moves[e.key] + btns.length) % btns.length;
    activateTab(btns[next].dataset.tab);
    btns[next].focus();
  });
}

document.querySelectorAll(".nav-pill a[data-tab]").forEach(a => {
  a.addEventListener("click", e => {
    e.preventDefault();
    activateTab(a.dataset.tab);
    document.getElementById("info").scrollIntoView({ behavior: "smooth" });
  });
});

/* =====================================================================
   COMMANDES  (onglet "Commandes")

   Pour AJOUTER une commande : ajoutez { cmd, desc } dans la bonne catégorie.
   Pour AJOUTER une catégorie : copiez un bloc { cat, icon, cmds: [...] }.
     cmd  : la commande (placeholders <...> et [...] autorisés tels quels)
     desc : description courte
   Le clic sur une carte copie la commande dans le presse-papiers.
===================================================================== */
const COMMANDS = [
  { cat: "Général", icon: "⚙", cmds: [
    { cmd: "/menu",            desc: "Ouvrir le menu paramètres & commandes" },
    { cmd: "/stats",           desc: "Voir vos statistiques de jeu" },
    { cmd: "/report [message]",desc: "Envoyer un signalement aux admins" },
    { cmd: "/chest",           desc: "Ouvrir son coffre virtuel personnel (9 slots)" },
    { cmd: "/afk",             desc: "Activer/désactiver le mode AFK manuellement" },
  ]},
  { cat: "Construction", icon: "🏗", cmds: [
    { cmd: "/lock",            desc: "Verrouiller/déverrouiller un bloc regardé" },
    { cmd: "/trust <joueur>",  desc: "Donner accès à ses blocs verrouillés" },
    { cmd: "/build",           desc: "Activer/désactiver le mode construction" },
    { cmd: "/untrust <joueur>",desc: "Retirer l'accès à ses blocs verrouillés" },
    { cmd: "/lockinfo",        desc: "Afficher propriétaire et joueurs de confiance d'un bloc" },
  ]},
  { cat: "Navigation", icon: "🗺", cmds: [
    { cmd: "/tpa <joueur>",    desc: "Demander une téléportation vers un joueur" },
    { cmd: "/tpaccept",        desc: "Accepter une demande de téléportation" },
    { cmd: "/tpdeny",          desc: "Refuser une demande de téléportation" },
    { cmd: "/sethome <nom>",   desc: "Enregistrer un home (Overworld uniquement)" },
    { cmd: "/home [nom]",      desc: "Se téléporter à un home enregistré" },
    { cmd: "/back",            desc: "Retourner à la position précédente" },
    { cmd: "/warp [nom]",      desc: "Se téléporter vers un warp" },
  ]},
  { cat: "Social & Échanges", icon: "💬", cmds: [
    { cmd: "/mail <joueur> <msg>", desc: "Envoyer un message privé" },
    { cmd: "/r <message>",     desc: "Répondre au dernier message reçu" },
    { cmd: "/seen <joueur>",   desc: "Voir la dernière connexion d'un joueur" },
    { cmd: "/ignore <joueur>", desc: "Ignorer les messages d'un joueur" },
    { cmd: "/unignore <joueur>",desc: "Arrêter d'ignorer un joueur" },
    { cmd: "/deal <joueur>",   desc: "Proposer un échange d'items" },
    { cmd: "/dealaccept",      desc: "Accepter une demande d'échange" },
    { cmd: "/dealdeny",        desc: "Refuser une demande d'échange" },
    { cmd: "/groupaccept",     desc: "Accepter une invitation de groupe" },
    { cmd: "/groupdeny",       desc: "Refuser une invitation de groupe" },
    { cmd: "@g <message>",     desc: "Chat de groupe (préfixe, pas une commande)" },
  ]},
  { cat: "DonjonMC", icon: "⚔", cmds: [
    { cmd: "/donjonmc trial",       desc: "Lancer l'épreuve de classe (niv. 50+, sans classe)" },
    { cmd: "/donjonmc punishment",  desc: "Déclencher votre propre punition" },
    { cmd: "/donjonmc dungeon exit",desc: "Sortir du donjon (téléportation)" },
    { cmd: "/donjonmc dungeon join",desc: "Rejoindre un donjon de groupe" },
    { cmd: "/donjonmc top",         desc: "Top 10 des hunters en ligne par niveau" },
    { cmd: "/donjonmc speed",       desc: "Activer/désactiver le bonus de vitesse (Agilité)" },
  ]},
];

function renderCommands() {
  const grid = document.getElementById("commands-grid");
  if (!grid) return;
  const input = document.getElementById("cmds-search");
  const q = (input ? input.value : "").toLowerCase().trim();

  let shown = 0, total = 0;
  const html = COMMANDS.map(group => {
    const cmds = group.cmds.filter(c => {
      total++;
      const match = q === "" || (c.cmd + " " + c.desc).toLowerCase().includes(q);
      if (match) shown++;
      return match;
    });
    if (!cmds.length) return "";
    return `<section class="cmd-cat">
      <h3 class="cmd-cat-title"><span class="cmd-cat-icon">${group.icon}</span>${escapeHTML(group.cat)}</h3>
      <div class="cmd-cards">
        ${cmds.map(c => `<button type="button" class="cmd-card" data-copy="${escapeHTML(c.cmd)}" title="Cliquer pour copier la commande">
            <span class="cmd-card-top">
              <code class="cmd">${escapeHTML(c.cmd)}</code>
              <span class="cmd-copy" aria-hidden="true">📋</span>
            </span>
            <span class="cmd-desc">${escapeHTML(c.desc)}</span>
          </button>`).join("")}
      </div>
    </section>`;
  }).join("");

  grid.innerHTML = html || `<p style="color:var(--muted);padding:2rem 0;text-align:center;">Aucune commande trouvée pour « ${escapeHTML(q)} »</p>`;

  const countEl = document.getElementById("cmds-count");
  if (countEl) countEl.textContent = (q && shown < total)
    ? `${shown} commande${shown !== 1 ? "s" : ""} trouvée${shown !== 1 ? "s" : ""}`
    : "";
}

/* Clic sur une carte → copie la commande + retour visuel */
document.getElementById("commands-grid").addEventListener("click", e => {
  const card = e.target.closest(".cmd-card");
  if (!card || !navigator.clipboard) return;
  navigator.clipboard.writeText(card.dataset.copy).then(() => {
    const tip = card.querySelector(".cmd-copy");
    if (!tip || card.classList.contains("copied")) return;
    const prev = tip.textContent;
    card.classList.add("copied");
    tip.textContent = "✓";
    setTimeout(() => { card.classList.remove("copied"); tip.textContent = prev; }, 1200);
  }).catch(() => {});
});

(function () {
  const input = document.getElementById("cmds-search");
  if (input) {
    input.addEventListener("input", renderCommands);
    input.addEventListener("keydown", e => { if (e.key === "Escape") { input.value = ""; renderCommands(); } });
  }
  renderCommands();
})();

/* =====================================================================
   LISTE DES MODS — stats + pills à compteurs + sections par catégorie

   CAT_META = ordre d'affichage + icône de chaque catégorie. Pour ajouter
   une catégorie : ajoutez-la ici ET utilisez son nom dans le tableau MODS.
   Les compteurs, la barre de répartition et les sections se calculent seuls.
===================================================================== */
const CAT_META = [
  ["Monde", "🌿"], ["Structures", "🏛"], ["Mobs", "🐾"], ["Nourriture", "🍖"],
  ["Create", "⚙"], ["Combat", "⚔"], ["Déco", "🎨"], ["Performance", "⚡"],
  ["Interface", "🖥"], ["API", "📚"],
  ["Shaders", "🌈"], ["Textures", "🖼"],
];

let currentFilter = "all";
let currentSearch = "";
let hideDead = false;

// Échappe les caractères HTML pour éviter toute injection (XSS).
function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[c]);
}

function modIcon(cat) { const m = CAT_META.find(x => x[0] === cat); return m ? m[1] : ""; }

// Effectifs par catégorie + nombre de mods sans lien.
function modCounts() {
  const c = {}; let dead = 0;
  MODS.forEach(([, cat, url]) => { c[cat] = (c[cat] || 0) + 1; if (!url) dead++; });
  return { c, dead };
}

/* ① + ③ — bandeau de stats + barre de répartition */
function renderModStats() {
  const el = document.getElementById("mods-stats");
  if (!el) return;
  const { c, dead } = modCounts();
  const total = MODS.length, withLink = total - dead;
  const bar = CAT_META.map(([cat]) => {
    const n = c[cat] || 0;
    if (!n) return "";
    const pct = (n / total * 100).toFixed(3);
    return `<span class="mods-bar-seg badge-${cat}" style="width:${pct}%" title="${escapeHTML(cat)} · ${n}"></span>`;
  }).join("");
  el.innerHTML =
    `<div class="mods-stats-figures">
      <span><strong>${total}</strong> mods</span>
      <span class="dot">·</span>
      <span><strong>${CAT_META.length}</strong> catégories</span>
      <span class="dot">·</span>
      <span><strong>${withLink}</strong> avec lien</span>
    </div>
    <div class="mods-bar" role="img" aria-label="Répartition des mods par catégorie">${bar}</div>`;
}

/* ① — pills de filtre avec compteurs */
function renderPills() {
  const { c } = modCounts();
  const pill = (filter, label, n, active) =>
    `<button type="button" class="filter-pill${active ? " active" : ""}" data-filter="${escapeHTML(filter)}">${label} <span class="pill-count">${n}</span></button>`;
  const html = [pill("all", "Tous", MODS.length, currentFilter === "all")]
    .concat(CAT_META.map(([cat, icon]) => pill(cat, `${icon} ${escapeHTML(cat)}`, c[cat] || 0, currentFilter === cat)))
    .join("");
  document.getElementById("filter-pills").innerHTML = html;
}

/* ② + ④ — sections par catégorie, mods sans lien gérés */
function renderMods() {
  const q = currentSearch.toLowerCase().trim();
  const cats = currentFilter === "all" ? CAT_META.map(m => m[0]) : [currentFilter];

  let shown = 0;
  const html = cats.map(cat => {
    const items = MODS.filter(([name, c, url]) =>
      c === cat && name.toLowerCase().includes(q) && (!hideDead || url)
    );
    if (!items.length) return "";
    shown += items.length;
    return `<section class="mod-cat">
      <h3 class="mod-cat-title"><span class="mod-cat-icon">${modIcon(cat)}</span>${escapeHTML(cat)} <span class="mod-cat-count">${items.length}</span></h3>
      <div class="mod-list">
        ${items.map(([name, c, url]) =>
          url
            ? `<a href="${url}" target="_blank" rel="noopener noreferrer" class="mod-item">
                <span class="mod-item-name">${escapeHTML(name)}</span>
                <span class="mod-item-badge badge-${c}">${escapeHTML(c)}</span>
                <span class="mod-item-link" aria-hidden="true">↗</span>
              </a>`
            : `<div class="mod-item mod-item-dead" title="Pas de page publique">
                <span class="mod-item-name">${escapeHTML(name)}</span>
                <span class="mod-item-badge badge-${c}">${escapeHTML(c)}</span>
                <span class="mod-item-link mod-item-nolink" aria-hidden="true">∅</span>
              </div>`
        ).join("")}
      </div>
    </section>`;
  }).join("");

  document.getElementById("mods-list-container").innerHTML =
    html || `<p class="mods-empty">Aucun mod trouvé pour « ${escapeHTML(currentSearch)} »</p>`;

  const count = document.getElementById("mods-count");
  if (count) count.textContent = `${shown} mod${shown !== 1 ? "s" : ""} affiché${shown !== 1 ? "s" : ""}`;
}

document.getElementById("mods-search").addEventListener("input", e => {
  currentSearch = e.target.value;
  renderMods();
});

document.getElementById("filter-pills").addEventListener("click", e => {
  const pill = e.target.closest(".filter-pill");
  if (!pill) return;
  currentFilter = pill.dataset.filter;
  setQueryParam("cat", currentFilter === "all" ? null : currentFilter); // "all" = défaut → URL propre
  renderPills();
  renderMods();
});

const hideDeadToggle = document.getElementById("mods-hide-dead");
if (hideDeadToggle) hideDeadToggle.addEventListener("change", e => {
  hideDead = e.target.checked;
  renderMods();
});

document.addEventListener("keydown", e => {
  const tag = document.activeElement.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA") return;
  if (e.key === "/" || (e.key === "f" && (e.ctrlKey || e.metaKey))) {
    e.preventDefault();
    activateTab("mods");
    document.getElementById("info").scrollIntoView({ behavior: "smooth" });
    document.getElementById("mods-search").focus();
  }
});

/* Init : stats + pills tout de suite, liste après un court skeleton */
renderModStats();
renderPills();
const skeletonHTML = Array(12).fill('<div class="skeleton-item"></div>').join("");
document.getElementById("mods-list-container").innerHTML = skeletonHTML;
setTimeout(renderMods, 280);

/* Restaure l'état depuis l'URL au chargement : ?tab=commands&cat=Monde */
(function initFromUrl() {
  const params = new URLSearchParams(location.search);
  const tab = params.get("tab") || (function(){ try { return localStorage.getItem("donjonmc-tab"); } catch(_){ return null; } })();
  if (tab && TAB_IDS.includes(tab)) activateTab(tab, false);
  const cat = params.get("cat");
  if (cat && CAT_META.some(m => m[0] === cat)) {
    currentFilter = cat;
    renderPills();
    renderMods();
  }
})();

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
  if (prefersReducedMotion()) return; // pas de particules animées si l'utilisateur l'a désactivé
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

/* =====================================================================
   ANCRES DOUCES — boutons hero "Comment rejoindre ?"
===================================================================== */
document.querySelectorAll('a[data-scroll]').forEach(a => {
  a.addEventListener("click", e => {
    const target = document.querySelector(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  });
});

/* =====================================================================
   PWA — enregistrement du service worker (offline + installable)
===================================================================== */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => { /* silencieux */ });
  });
}

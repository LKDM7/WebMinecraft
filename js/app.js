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
["DonjonMC","Combat","https://github.com/LKDM7/DonjonMC/raw/master/releases/donjonmc-latest.jar"],
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
["Dashboard Admin","Interface","https://github.com/LKDM7/DashBoardAdmin/raw/master/releases/dashboardadmin-latest.jar"],
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
   LIENS ADDITIONNELS  (wiki / source / issues)
   Indexé par le slug CurseForge/Modrinth (dernier segment de l'URL du mod).
   Rempli automatiquement à partir de la section « Links » de chaque page.
   Un mod absent d'ici n'affiche que le lien vers sa page (comportement normal).
   Format : "slug": { wiki, source, issues }   (clés optionnelles)
===================================================================== */
const MOD_LINKS = {
  "abridged": { source:"https://github.com/CelestiumMC/abridged", issues:"https://github.com/CelestiumMC/abridged/issues" },
  "accessories": { wiki:"https://docs.wispforest.io/accessories/home", source:"https://github.com/wisp-forest/accessories/", issues:"https://github.com/wisp-forest/accessories/issues" },
  "accessories-compat-layer": { wiki:"https://docs.wispforest.io/accessories/home", source:"https://github.com/wisp-forest/accessories-compat-layer", issues:"https://github.com/wisp-forest/accessories-compat-layer/issues" },
  "accessorify": { source:"https://github.com/pajicadvance/accessorify", issues:"https://github.com/pajicadvance/accessorify/issues" },
  "advanced-loot-info": { wiki:"https://github.com/yanny7/AdvancedLootInfo/wiki", source:"https://github.com/yanny7/AdvancedLootInfo", issues:"https://github.com/yanny7/AdvancedLootInfo/issues" },
  "advanced-netherite": { wiki:"https://github.com/Autovw/AdvancedNetherite/wiki", source:"https://github.com/Autovw/AdvancedNetherite", issues:"https://github.com/Autovw/AdvancedNetherite/issues" },
  "aeroblender": { source:"https://github.com/darksonic300/AeroBlender" },
  "aether": { wiki:"https://aether.wiki.gg/", source:"https://github.com/The-Aether-Team/The-Aether", issues:"https://github.com/The-Aether-Team/The-Aether/issues" },
  "aether-enhanced-extinguishing": { wiki:"https://aether.wiki.gg/", source:"https://github.com/The-Aether-Team/Enhanced-Extinguishing", issues:"https://github.com/The-Aether-Team/Enhanced-Extinguishing/issues" },
  "aether-protect-your-moa": { wiki:"https://aether.wiki.gg/", source:"https://github.com/The-Aether-Team/Protect-Your-Moa", issues:"https://github.com/The-Aether-Team/Protect-Your-Moa/issues" },
  "aether-treasure-reforging": { wiki:"https://aether.wiki.gg/", source:"https://github.com/The-Aether-Team/Treasure-Reforging", issues:"https://github.com/The-Aether-Team/Treasure-Reforging/issues" },
  "alexs-mobs-1-21-1-port": { source:"https://github.com/AlexModGuy/AlexsMobs", issues:"https://github.com/AlexModGuy/AlexsMobs/issues" },
  "alltheleaks": { source:"https://github.com/pietro-lopes/AllTheLeaks", issues:"https://github.com/pietro-lopes/AllTheLeaks/issues" },
  "alternate-current": { source:"https://github.com/SpaceWalkerRS/alternate-current", issues:"https://github.com/SpaceWalkerRS/alternate-current/issues" },
  "amendments": { wiki:"https://github.com/MehVahdJukaar/Supplementaries/wiki/Amendments", issues:"https://github.com/MehVahdJukaar/amendments/issues" },
  "another-furniture": { wiki:"https://starfish-studios.com/mods/another-furniture", source:"https://github.com/starfish-studios/AnotherFurniture", issues:"https://github.com/starfish-studios/AnotherFurniture/issues" },
  "architectury-api": { source:"https://github.com/architectury/architectury", issues:"https://github.com/architectury/architectury/issues" },
  "athena": { source:"https://github.com/Errored-Innovations/ATHENA", issues:"https://github.com/Errored-Innovations/ATHENA/issues" },
  "audio-improvements": { source:"https://github.com/NamelessJu/MC-Audio-Improvements-Mod" },
  "autochefs-delight": { source:"https://github.com/Snownee/AutochefsDelight", issues:"https://github.com/Snownee/AutochefsDelight/issues" },
  "azurelib": { wiki:"https://wiki.azuredoom.com/", source:"https://github.com/AzureDoom/AzureLib", issues:"https://github.com/AzureDoom/AzureLib/issues" },
  "backpacked": { wiki:"https://mrcrayfish.github.io/Backpacked/", source:"https://github.com/MrCrayfish/Backpacked", issues:"https://github.com/MrCrayfish/Backpacked/issues" },
  "badoptimizations": { source:"https://github.com/ItsThosea/BadOpitmizations", issues:"https://github.com/ItsThosea/BadOpitmizations/issues" },
  "balm": { wiki:"https://balm.twelveiterations.com/", source:"https://github.com/TwelveIterations/Balm", issues:"https://github.com/TwelveIterations/Balm/issues" },
  "bartering-station": { source:"https://github.com/Fuzss/barteringstation", issues:"https://github.com/Fuzss/barteringstation/issues" },
  "bbrb": { source:"https://github.com/UntitledModGroup/better-biome-blend-reblend", issues:"https://github.com/UntitledModGroup/better-biome-blend-reblend/issues" },
  "bedrockoid": { source:"https://github.com/SashaKYotoz/Bedrockoid", issues:"https://github.com/SashaKYotoz/Bedrockoid/issues" },
  "better-advancements": { source:"https://github.com/way2muchnoise/BetterAdvancements", issues:"https://github.com/way2muchnoise/BetterAdvancements/issues" },
  "better-client": { wiki:"https://enc.is-a.dev/better-client-wiki/", source:"https://github.com/pynickle/Better-Client" },
  "better-compatibility-checker": { source:"https://github.com/nanite/BetterCompatibilityChecker", issues:"https://github.com/nanite/BetterCompatibilityChecker/issues" },
  "better-mods-button": { source:"https://github.com/Fuzss/bettermodsbutton", issues:"https://github.com/Fuzss/bettermodsbutton/issues" },
  "bettergrassify": { source:"https://github.com/UltimatChamp/BetterGrassify", issues:"https://github.com/UltimatChamp/BetterGrassify/issues/new/choose" },
  "biome-music": { source:"https://github.com/someaddons/biomemusic", issues:"https://github.com/someaddons/biomemusic/issues" },
  "bisecthosting-server-integration-menu-neoforge": { issues:"https://github.com/BisectLabs/BisectHostingServerIntegrationMenu/issues" },
  "boat-item-view-forge": { source:"https://github.com/50ap5ud5/BoatItemView", issues:"https://github.com/50ap5ud5/BoatItemView/issues" },
  "bookshelf": { source:"https://github.com/LOOHP/Bookshelf" },
  "c2me": { source:"https://github.com/RelativityMC/C2ME-fabric", issues:"https://github.com/RelativityMC/C2ME-fabric/issues" },
  "caelus": { source:"https://github.com/TheIllusiveC4/Caelus", issues:"https://github.com/TheIllusiveC4/Caelus/issues" },
  "carry-on": { source:"https://github.com/Tschipp/CarryOn", issues:"https://github.com/Tschipp/CarryOn/issues" },
  "certain-questing-additions": { wiki:"https://github.com/HollowHorizon/CertainQuestingAdditions/wiki/", source:"https://github.com/HollowHorizon/CertainQuestingAdditions/" },
  "cerulean": { source:"https://github.com/jaskarth/cerulean", issues:"https://github.com/jaskarth/cerulean/issues" },
  "chat-heads": { source:"https://github.com/dzwdz/chat_heads", issues:"https://github.com/dzwdz/chat_heads/issues" },
  "cherished-worlds": { source:"https://github.com/illusivesoulworks/cherishedworlds/", issues:"https://github.com/illusivesoulworks/cherishedworlds/issues" },
  "chipped": { source:"https://github.com/terrarium-earth/Chipped", issues:"https://github.com/terrarium-earth/Chipped/issues" },
  "chunk-activity-tracker": { source:"https://github.com/txnimc/ChunkActivityTracker", issues:"https://github.com/txnimc/ChunkActivityTracker/issues" },
  "chunk-sending-forge-fabric": { source:"https://github.com/someaddons/chunksending", issues:"https://github.com/someaddons/chunksending/issues" },
  "chunky-pregenerator-forge": { wiki:"https://github.com/pop4959/Chunky/wiki", source:"https://github.com/pop4959/Chunky", issues:"https://github.com/pop4959/Chunky/issues" },
  "citadel-1-21-1-port": { source:"https://github.com/Alex-the-666/Citadel", issues:"https://github.com/Alex-the-666/Citadel/issues" },
  "client-crafting": { source:"https://github.com/someaddons/clientcrafting", issues:"https://github.com/someaddons/clientcrafting/issues" },
  "clientsort": { source:"https://github.com/TerminalMC/ClientSort", issues:"https://github.com/TerminalMC/ClientSort/issues" },
  "climate-rivers": { source:"https://github.com/Fuzss/climaterivers", issues:"https://github.com/Fuzss/climaterivers/issues" },
  "cloth-config": { wiki:"https://shedaniel.gitbook.io/cloth-config/", source:"https://github.com/shedaniel/ClothConfig/", issues:"https://github.com/shedaniel/ClothConfig/issues" },
  "clumps": { source:"https://github.com/jaredlll08/Clumps", issues:"https://github.com/jaredlll08/Clumps/issues" },
  "collective": { source:"https://github.com/Serilum/Collective", issues:"https://github.com/Serilum/.issue-tracker/labels/Library: Collective" },
  "colorwheel": { wiki:"https://djefrey.github.io/colorwheel/", source:"https://github.com/djefrey/Colorwheel", issues:"https://github.com/djefrey/Colorwheel/issues" },
  "comforts": { wiki:"https://github.com/illusivesoulworks/comforts/wiki", source:"https://github.com/illusivesoulworks/comforts", issues:"https://github.com/illusivesoulworks/comforts/issues" },
  "complementary-reimagined": { source:"https://github.com/ComplementaryDevelopment/ComplementaryReimagined" },
  "complementary-unbound": { source:"https://github.com/ComplementaryDevelopment/ComplementaryReimagined" },
  "configurable": { wiki:"https://github.com/Bawnorton/Configurable/wiki", source:"https://github.com/Bawnorton/Configurable", issues:"https://github.com/Bawnorton/Configurable/issues" },
  "configured": { wiki:"https://github.com/fooeyround/Configured/wiki", source:"https://github.com/fooeyround/Configured", issues:"https://github.com/fooeyround/Configured/issues" },
  "configured-defaults": { source:"https://github.com/Fuzss/configureddefaults", issues:"https://github.com/Fuzss/configureddefaults/issues" },
  "connectivity": { source:"https://github.com/someaddons/connectivity", issues:"https://github.com/someaddons/connectivity/issues" },
  "connector-extras": { wiki:"https://sinytra.org/", source:"https://github.com/Sinytra/ConnectorExtras", issues:"https://github.com/Sinytra/ConnectorExtras/issues" },
  "continuity": { wiki:"https://github.com/PepperCode1/Continuity/wiki", source:"https://github.com/PepperCode1/Continuity", issues:"https://github.com/PepperCode1/Continuity/issues" },
  "controlling": { source:"https://github.com/jaredlll08/Controlling", issues:"https://github.com/jaredlll08/Controlling/issues" },
  "convenient-effects": { source:"https://github.com/Fuzss/convenienteffects", issues:"https://github.com/Fuzss/convenienteffects/issues" },
  "copycats": { wiki:"https://github.com/copycats-plus/copycats/wiki", source:"https://github.com/copycats-plus/copycats", issues:"https://github.com/copycats-plus/copycats/issues" },
  "corgilib": { source:"https://github.com/CorgiTaco/CorgiLib", issues:"https://github.com/CorgiTaco/CorgiLib/issues" },
  "coroutil": { source:"https://github.com/Corosauce/CoroUtil", issues:"https://github.com/Corosauce/CoroUtil/issues" },
  "crash-assistant": { source:"https://github.com/KostromDan/Crash-Assistant", issues:"https://github.com/KostromDan/Crash-Assistant/issues" },
  "create": { wiki:"https://wiki.createmod.net", source:"https://github.com/Creators-of-Create/Create", issues:"https://github.com/Creators-of-Create/Create/issues" },
  "create-big-cannons": { source:"https://github.com/Cannoneers-of-Create/CreateBigCannons", issues:"https://github.com/Cannoneers-of-Create/CreateBigCannons/issues" },
  "create-central-kitchen": { source:"https://github.com/DragonsPlusMinecraft/CreateCentralKitchen", issues:"https://github.com/DragonsPlusMinecraft/CreateCentralKitchen/issues" },
  "create-deco": { source:"https://github.com/talrey/CreateDeco", issues:"https://github.com/talrey/CreateDeco" },
  "create-design-n-decor": { source:"https://github.com/DrMango14/Create-Design-n-Decor", issues:"https://github.com/DrMango14/Create-Design-n-Decor/issues" },
  "create-dragons-plus": { source:"https://github.com/DragonsPlusMinecraft/CreateDragonsPlus", issues:"https://github.com/DragonsPlusMinecraft/CreateDragonsPlus/issues" },
  "create-enchantment-industry": { source:"https://github.com/DragonsPlusMinecraft/CreateEnchantmentIndustry", issues:"https://github.com/DragonsPlusMinecraft/CreateEnchantmentIndustry/issues" },
  "create-new-age": { source:"https://gitlab.com/antarcticgardens/create-new-age", issues:"https://gitlab.com/antarcticgardens/create-new-age/-/issues" },
  "create-ore-excavation": { source:"https://github.com/tom5454/Create-Ore-Excavation", issues:"https://github.com/tom5454/Create-Ore-Excavation/issues" },
  "create-radars": { source:"https://github.com/Arsenalists-of-Create/Create-Radar" },
  "createaddition": { source:"https://github.com/mrh0/createaddition", issues:"https://github.com/mrh0/createaddition/issues" },
  "cristel-lib": { source:"https://github.com/Cristelknight999/Cristel-Lib", issues:"https://github.com/Cristelknight999/Cristel-Lib/issues" },
  "cupboard": { source:"https://github.com/someaddons/cupboard", issues:"https://github.com/someaddons/cupboard/issues" },
  "curios": { wiki:"https://docs.illusivesoulworks.com/category/curios", source:"https://github.com/TheIllusiveC4/Curios", issues:"https://github.com/TheIllusiveC4/Curios/issues" },
  "cut-through": { source:"https://github.com/Fuzss/cutthrough", issues:"https://github.com/Fuzss/cutthrough/issues" },
  "deep-aether": { wiki:"https://github.com/RazorDevs/Deep-Aether/wiki", source:"https://github.com/RazorDevs/Deep-Aether", issues:"https://github.com/RazorDevs/Deep-Aether/issues" },
  "deeperdarker": { source:"https://github.com/KyaniteMods/DeeperAndDarker", issues:"https://github.com/KyaniteMods/DeeperAndDarker/issues" },
  "delete-worlds-to-trash": { source:"https://github.com/Fuzss/deleteworldstotrash", issues:"https://github.com/Fuzss/deleteworldstotrash/issues" },
  "despawn-tweaks": { source:"https://github.com/txnimc/DespawnTweaks", issues:"https://github.com/txnimc/DespawnTweaks/issues" },
  "diagonal-fences": { source:"https://github.com/Fuzss/diagonalfences", issues:"https://github.com/Fuzss/diagonalfences/issues" },
  "diagonal-walls": { source:"https://github.com/Fuzss/diagonalwalls", issues:"https://github.com/Fuzss/diagonalwalls/issues" },
  "disconnect-packet-fix": { source:"https://github.com/ascpixi/disconnect-packet-fix", issues:"https://github.com/ascpixi/disconnect-packet-fix/issues" },
  "distraction-free-recipes": { source:"https://github.com/txnimc/DistractionFreeRecipes", issues:"https://github.com/txnimc/DistractionFreeRecipes/issues" },
  "dmr": { wiki:"https://github.com/Wyrmheart-Team/Dragon_Mounts_Remastered/wiki", source:"https://github.com/Wyrmheart-Team/Dragon_Mounts_Remastered", issues:"https://github.com/Wyrmheart-Team/Dragon_Mounts_Remastered/issues" },
  "does-it-tick": { source:"https://github.com/txnimc/DoesItTickSC", issues:"https://github.com/txnimc/DoesItTickSC/issues" },
  "dolphin-fix": { source:"https://github.com/TazgirI/dolphin-fix", issues:"https://github.com/TazgirI/dolphin-fix/issues" },
  "double-doors": { source:"https://github.com/Serilum/Double-Doors", issues:"https://github.com/Serilum/.issue-tracker/labels/Mod: Double Doors" },
  "drippy-loading-screen": { wiki:"https://github.com/Keksuccino/Drippy-Loading-Screen/wiki", source:"https://github.com/Keksuccino/Drippy-Loading-Screen", issues:"https://github.com/Keksuccino/Drippy-Loading-Screen/issues" },
  "dyed-flames": { source:"https://github.com/Fuzss/dyedflames", issues:"https://github.com/Fuzss/dyedflames/issues" },
  "dynamiclights-reforged": { source:"https://github.com/txnimc/SodiumDynamicLights", issues:"https://github.com/txnimc/SodiumDynamicLights/issues" },
  "early-bedtime": { source:"https://github.com/txnimc/EarlyBedtime", issues:"https://github.com/txnimc/EarlyBedtime/issues" },
  "easy-anvils": { source:"https://github.com/Fuzss/easyanvils", issues:"https://github.com/Fuzss/easyanvils/issues" },
  "easy-disenchanting": { source:"https://github.com/txnimc/EasyDisenchanting", issues:"https://github.com/txnimc/EasyDisenchanting/issues" },
  "easy-magic": { source:"https://github.com/Fuzss/easymagic", issues:"https://github.com/Fuzss/easymagic/issues" },
  "enchantment-descriptions": { source:"https://github.com/Darkhax-Minecraft/Enchantment-Descriptions", issues:"https://github.com/Darkhax-Minecraft/Enchantment-Descriptions/issues" },
  "enderdragon-loot": { wiki:"https://globox1997.github.io/wiki/mods/DragLoot/", source:"https://github.com/nullifyac/dragonloot-forge-neoforge" },
  "enders-delight": { wiki:"https://good-scorpion-8b5.notion.site/Ender-s-Delight-a9555424b84d42878cd781bfffed19dc", source:"https://github.com/Ax3dGaming/EndersDelight/tree/master", issues:"https://github.com/Ax3dGaming/EndersDelight/issues" },
  "entity-model-features": { wiki:"https://github.com/Traben-0/Entity_Model_Features/blob/master/FEATURES.md", source:"https://github.com/Traben-0/Entity_Model_Features", issues:"https://github.com/Traben-0/Entity_Model_Features/issues" },
  "entity-texture-features-fabric": { wiki:"https://github.com/Traben-0/Entity_Texture_Features/blob/master/.github/README.md", source:"https://github.com/Traben-0/EmissiveMod", issues:"https://github.com/Traben-0/EmissiveMod/issues" },
  "entityculling": { source:"https://github.com/tr7zw/EntityCulling", issues:"https://github.com/tr7zw/EntityCulling/issues" },
  "epherolib": { source:"https://github.com/ExcessiveAmountsOfZombies/EpheroLib" },
  "eternal-nether": { source:"https://github.com/Fuzss/eternalnether", issues:"https://github.com/Fuzss/eternalnether/issues" },
  "euphoria-patches": { wiki:"https://euphoriapatches.com", source:"https://github.com/EuphoriaPatches/EuphoriaPatcher", issues:"https://euphoriapatches.com/discord" },
  "explorations": { wiki:"https://github.com/tristankechlo/Explorations/wiki", source:"https://github.com/tristankechlo/Explorations", issues:"https://github.com/tristankechlo/Explorations/issues" },
  "explorify": { issues:"https://github.com/everloste/my-mc-projects/issues" },
  "faithful-64x": { wiki:"https://faithfulpack.net", source:"https://github.com/Faithful-Resource-Pack/Faithful-Java-64x", issues:"https://github.com/Faithful-Resource-Pack/Faithful-Java-64x/issues" },
  "falling-tree": { wiki:"https://github.com/RakambdaOrg/FallingTree/wiki", source:"https://github.com/RakambdaOrg/FallingTree", issues:"https://github.com/RakambdaOrg/FallingTree/issues" },
  "fancymenu": { wiki:"https://docs.fancymenu.net", source:"https://github.com/Keksuccino/FancyMenu", issues:"https://github.com/Keksuccino/FancyMenu/issues" },
  "farmers-cutting-oh-the-biomes-weve-gone": { source:"https://github.com/Joshcraft2002/farmers-cutting/tree/main/biomeswevegone", issues:"https://github.com/Joshcraft2002/farmers-cutting/issues" },
  "farmers-delight": { wiki:"https://github.com/vectorwing/FarmersDelight/wiki", source:"https://github.com/vectorwing/FarmersDelight", issues:"https://github.com/vectorwing/FarmersDelight/issues" },
  "farsight": { source:"https://github.com/someaddons/farsight", issues:"https://github.com/someaddons/farsight/issues" },
  "fast-async-world-save-forge-fabric": { source:"https://github.com/someaddons/FastAsyncWorldSave", issues:"https://github.com/someaddons/FastAsyncWorldSave/issues" },
  "fast-ip-ping": { source:"https://github.com/Fallen-Breath/fast-ip-ping", issues:"https://github.com/Fallen-Breath/fast-ip-ping/issues" },
  "fast-item-frames": { source:"https://github.com/Fuzss/fastitemframes", issues:"https://github.com/Fuzss/fastitemframes/issues" },
  "fast-paintings": { source:"https://github.com/MehVahdJukaar/FastPaintings", issues:"https://github.com/MehVahdJukaar/FastPaintings/issues" },
  "ferritecore": { source:"https://github.com/malte0811/FerriteCore", issues:"https://github.com/malte0811/FerriteCore/issues" },
  "fix-gpu-memory-leak": { source:"https://github.com/someaddons/gpumemleakfix", issues:"https://github.com/someaddons/gpumemleakfix/issues" },
  "foolproof": { source:"https://github.com/txnimc/Foolproof", issues:"https://github.com/txnimc/Foolproof/issues" },
  "forge-cit": { source:"https://github.com/Tfarcenim/CIT-Reforged", issues:"https://github.com/Tfarcenim/CIT-Reforged/issues" },
  "forge-config-api-port": { wiki:"https://github.com/Fuzss/forgeconfigapiport/wiki", source:"https://github.com/Fuzss/forgeconfigapiport", issues:"https://github.com/Fuzss/forgeconfigapiport/issues" },
  "forgified-fabric-api": { wiki:"https://github.com/Sinytra/ForgifiedFabricAPI/discussions", source:"https://github.com/Sinytra/ForgifiedFabricAPI", issues:"https://github.com/Sinytra/ForgifiedFabricAPI/issues" },
  "formations": { source:"https://github.com/SuperMartijn642/Formations", issues:"https://github.com/SuperMartijn642/Formations/issues" },
  "formations-nether": { source:"https://github.com/SuperMartijn642/FormationsNether", issues:"https://github.com/SuperMartijn642/FormationsNether/issues" },
  "formations-overworld": { source:"https://github.com/SuperMartijn642/FormationsOverworld", issues:"https://github.com/SuperMartijn642/FormationsOverworld/issues" },
  "fresh-moves": { source:"https://github.com/IthanMendoza/Fresh-Moves", issues:"https://github.com/IthanMendoza/Fresh-Moves/issues" },
  "friends-and-foes-forge": { wiki:"https://github.com/Faboslav/friends-and-foes/wiki", source:"https://github.com/Faboslav/friends-and-foes", issues:"https://github.com/Faboslav/friends-and-foes/issues" },
  "ftb-filter-system": { source:"https://github.com/FTBTeam/FTB-Filter-System", issues:"https://go.ftb.team/support-mod-issues" },
  "ftb-library-forge": { wiki:"https://go.ftb.team/docs-library", source:"https://github.com/FTBTeam/FTB-GUI-Library" },
  "ftb-quests-forge": { wiki:"https://docs.feed-the-beast.com", source:"https://github.com/FTBTeam/FTB-Quests", issues:"https://go.ftb.team/support-mod-issues" },
  "ftb-teams-forge": { wiki:"https://go.ftb.team/docs-teams", source:"https://github.com/FTBTeam/FTB-Teams", issues:"https://go.ftb.team/support-mod-issues" },
  "ftb-xmod-compat": { wiki:"https://go.ftb.team/docs-xmod", source:"https://github.com/FTBTeam/FTB-XMod-Compat" },
  "fzzy-config": { wiki:"https://github.com/fzzyhmstrs/fconfig/wiki", source:"https://github.com/fzzyhmstrs/fconfig", issues:"https://github.com/fzzyhmstrs/fconfig/issues" },
  "gardens-of-the-dead": { source:"https://github.com/ochotonida/gardens-of-the-dead", issues:"https://github.com/ochotonida/gardens-of-the-dead/issues" },
  "geckolib": { wiki:"https://github.com/bernie-g/geckolib/wiki", source:"https://github.com/bernie-g/geckolib", issues:"https://github.com/bernie-g/geckolib/issues" },
  "geophilic": { source:"https://github.com/everloste/Geophilic", issues:"https://github.com/everloste/Geophilic/issues" },
  "glitchcore": { source:"https://github.com/Glitchfiend/GlitchCore", issues:"https://github.com/Glitchfiend/GlitchCore/issues" },
  "goblin-traders": { source:"https://github.com/MrCrayfish/GoblinTraders", issues:"https://github.com/MrCrayfish/GoblinTraders/issues" },
  "golem-spawn-fix": { issues:"https://legacy.curseforge.com/minecraft/mc-mods/golem-spawn-fix/issues" },
  "handcrafted": { source:"https://github.com/terrarium-earth/Handcrafted", issues:"https://github.com/terrarium-earth/Handcrafted/issues" },
  "hearths": { issues:"https://github.com/everloste/my-mc-projects/issues" },
  "hrtffix": { source:"https://github.com/teamsunset/hrtffix", issues:"https://github.com/teamsunset/hrtffix/issues" },
  "hybrid-aquatic": { wiki:"https://hybrid-aquatic.fandom.com/wiki/Hybrid_Aquatic_Wiki", source:"https://github.com/hybridlabs/hybrid-aquatic", issues:"https://github.com/hybridlabs/hybrid-aquatic/issues" },
  "iceberg": { wiki:"https://github.com/AHilyard/Iceberg/wiki/Item-Selectors-Documentation", source:"https://github.com/AHilyard/Iceberg/", issues:"https://discord.gg/UCKjnamDaW" },
  "idas": { source:"https://github.com/craisinlord/IDAS" },
  "illager-invasion": { source:"https://github.com/Fuzss/illagerinvasion", issues:"https://github.com/Fuzss/illagerinvasion/issues" },
  "immediatelyfast": { source:"https://github.com/RaphiMC/ImmediatelyFast", issues:"https://github.com/RaphiMC/ImmediatelyFast/issues" },
  "immersive-armor-hud": { source:"https://github.com/txnimc/ImmersiveArmorHUD", issues:"https://github.com/txnimc/ImmersiveArmorHUD/issues" },
  "immersive-lanterns": { source:"https://github.com/txnimc/ImmersiveLanterns", issues:"https://github.com/txnimc/ImmersiveLanterns/issues" },
  "immersive-messages-api": { wiki:"https://immersive.txni.dev/", source:"https://github.com/txnimc/ImmersiveMessages", issues:"https://github.com/txnimc/ImmersiveMessages/issues" },
  "immersive-tips": { source:"https://github.com/txnimc/ImmersiveTips", issues:"https://github.com/txnimc/ImmersiveTips/issues" },
  "improved-village-placement": { wiki:"https://github.com/Apollounknowndev/improved-village-placement/wiki", source:"https://github.com/Apollounknowndev/improved-village-placement", issues:"https://github.com/Apollounknowndev/improved-village-placement/issues" },
  "inmis-forge-port": { source:"https://github.com/Draylar/inmis", issues:"https://github.com/Draylar/inmis/issues" },
  "interiors": { source:"https://github.com/sudolev/CreateInteriorsMod/", issues:"https://github.com/sudoLev/CreateInteriorsMod/issues" },
  "iris-shader-folder": { source:"https://github.com/SpacEagle17/IrisShaderFolder", issues:"https://github.com/SpacEagle17/IrisShaderFolder/issues" },
  "irisshaders": { source:"https://github.com/IrisShaders/Iris", issues:"https://github.com/IrisShaders/Iris/issues" },
  "irons-spells-n-spellbooks": { wiki:"https://www.iron.wiki", source:"https://github.com/iron431/Irons-Spells-n-Spellbooks", issues:"https://github.com/iron431/Irons-Spells-n-Spellbooks/issues" },
  "it-takes-a-pillage-continuation": { source:"https://github.com/Faboslav/it-takes-a-pillage", issues:"https://github.com/Faboslav/it-takes-a-pillage/issues" },
  "item-highlighter": { source:"https://github.com/AHilyard/Highlighter/", issues:"https://discord.gg/UCKjnamDaW" },
  "jade": { source:"https://github.com/Snownee/Jade", issues:"https://github.com/Snownee/Jade/issues?q=is%3Aissue" },
  "jade-addons": { source:"https://github.com/Snownee/JadeAddons", issues:"https://github.com/Snownee/JadeAddons/issues" },
  "jamlib": { source:"https://github.com/JamCoreModding/jam-lib", issues:"https://github.com/JamCoreModding/jam-lib/issues" },
  "jei": { wiki:"https://github.com/mezz/JustEnoughItems/wiki", source:"https://github.com/mezz/JustEnoughItems", issues:"https://github.com/mezz/JustEnoughItems/issues?q=is%3Aissue" },
  "just-enough-professions-jep": { source:"https://github.com/Mrbysco/JustEnoughProfessions", issues:"https://github.com/Mrbysco/JustEnoughProfessions/issues" },
  "just-zoom": { source:"https://github.com/Keksuccino/JustZoom", issues:"https://github.com/Keksuccino/JustZoom/issues" },
  "justenoughbreeding": { source:"https://github.com/Christofmeg/JustEnoughBreeding", issues:"https://github.com/Christofmeg/JustEnoughBreeding/issues" },
  "kiwi": { source:"https://github.com/Snownee/Kiwi", issues:"https://github.com/Snownee/Kiwi/issues" },
  "kleeslabs": { wiki:"https://mods.twelveiterations.com/mc/kleeslabs", source:"https://github.com/TwelveIterations/KleeSlabs", issues:"https://github.com/TwelveIterations/KleeSlabs/issues" },
  "konkrete": { source:"https://github.com/Keksuccino/Konkrete", issues:"https://github.com/Keksuccino/Konkrete/issues" },
  "kotlin-for-forge": { wiki:"https://github.com/thedarkcolour/KotlinForForge/blob/3.x/README.md", source:"https://github.com/thedarkcolour/KotlinForForge", issues:"https://github.com/thedarkcolour/KotlinForForge/issues" },
  "krypton-fnp": { source:"https://github.com/404Setup/KryptonReno", issues:"https://github.com/404Setup/KryptonReno/issues" },
  "leaderboards": { source:"https://github.com/Leclowndu93150/Leaderboards", issues:"https://github.com/Leclowndu93150/Leaderboards/issues" },
  "leave-my-bars-alone": { source:"https://github.com/Fuzss/leavemybarsalone", issues:"https://github.com/Fuzss/leavemybarsalone/issues" },
  "leaves-be-gone": { source:"https://github.com/Fuzss/leavesbegone", issues:"https://github.com/Fuzss/leavesbegone/issues" },
  "lendercataclysm": { source:"https://github.com/lender544/new1.20.1" },
  "lionfish-api": { source:"https://github.com/lender544/Lionfish-API" },
  "lithium": { source:"https://github.com/caffeinemc/lithium-fabric", issues:"https://github.com/caffeinemc/lithium-fabric/issues" },
  "lithostitched": { wiki:"https://github.com/Apollounknowndev/lithostitched/wiki", source:"https://github.com/Apollounknowndev/lithostitched/", issues:"https://github.com/Apollounknowndev/lithostitched/issues" },
  "lmft": { source:"https://github.com/Dragon-Seeker/LoadMyFuckingTags", issues:"https://github.com/Dragon-Seeker/LoadMyFuckingTags/issues" },
  "loading-protection": { source:"https://github.com/pynickle/loading-protection" },
  "log-begone": { source:"https://github.com/AzureDoom/Log-Begone", issues:"https://github.com/AzureDoom/Log-Begone/issues" },
  "long-nbt-killer": { source:"https://github.com/Nova-Committee/LongNbtKiller", issues:"https://github.com/Nova-Committee/LongNbtKiller/issues" },
  "loot-integrations": { source:"https://github.com/someaddons/LootIntegrations", issues:"https://github.com/someaddons/LootIntegrations/issues" },
  "lootr": { wiki:"https://github.com/noobanidus/Lootr/wiki", source:"https://github.com/noobanidus/lootr", issues:"https://github.com/noobanidus/lootr/issues" },
  "magnesium-extras": { source:"https://github.com/txnimc/SodiumExtras", issues:"https://github.com/txnimc/SodiumExtras/issues" },
  "magnum-torch": { source:"https://github.com/Fuzss/magnumtorch", issues:"https://github.com/Fuzss/magnumtorch/issues" },
  "makeup-ultra-fast-shader": { source:"https://github.com/javiergcim/MakeUpUltraFast" },
  "melody": { source:"https://github.com/Keksuccino/Melody", issues:"https://github.com/Keksuccino/Melody/issues" },
  "memory-settings": { source:"https://github.com/someaddons/MemorySettings", issues:"https://github.com/someaddons/MemorySettings/issues" },
  "midnightlib": { wiki:"https://midnightdust.eu/wiki/midnightlib/", source:"https://github.com/TeamMidnightDust/MidnightLib", issues:"https://github.com/TeamMidnightDust/MidnightLib/issues/" },
  "mining-speed-tooltips": { source:"https://github.com/txnitxnichopper/MiningSpeedTooltips", issues:"https://github.com/txnitxnichopper/MiningSpeedTooltips/issues/" },
  "misc-tweaks": { source:"https://github.com/pajicadvance/misctweaks", issues:"https://github.com/pajicadvance/misctweaks/issues" },
  "missing-mods-checker": { source:"https://github.com/txnimc/MissingModsChecker/" },
  "mixintrace-resmithed": { source:"https://github.com/txnimc/MixinTraceReforged", issues:"https://github.com/txnimc/MixinTraceReforged/issues" },
  "mmmmmmmmmmmm": { source:"https://github.com/MehVahdJukaar/DuMmmMmmy", issues:"https://github.com/MehVahdJukaar/DuMmmMmmy/issues" },
  "mmv-moogs-missing-villages": { wiki:"https://github.com/FinnSetchell/MoogsMissingVillages/wiki", source:"https://github.com/FinnSetchell/MoogsMissingVillages", issues:"https://github.com/FinnSetchell/MoogsMissingVillages/issues" },
  "mns-moogs-nether-structures": { wiki:"https://github.com/FinnSetchell/MoogsNetherStructures2/wiki", source:"https://github.com/FinnSetchell/MoogsNetherStructures2", issues:"https://github.com/FinnSetchell/MoogsNetherStructures2/issues" },
  "modernfix": { wiki:"https://github.com/embeddedt/ModernFix/wiki", source:"https://github.com/embeddedt/ModernFix", issues:"https://github.com/embeddedt/ModernFix/issues" },
  "modpack-update-checker": { wiki:"https://modpack-update-checker.github.io/wiki", issues:"https://discord.gg/s2AtrCEKCn" },
  "moogs-end-structures": { wiki:"https://moogs-mods.fandom.com/wiki/Moog%27s_End_Structures", source:"https://github.com/FinnSetchell/MoogsEndStructures", issues:"https://github.com/FinnSetchell/MoogsEndStructures/issues" },
  "moogs-structure-lib": { source:"https://github.com/FinnSetchell/MoogsStructureLib/", issues:"https://github.com/FinnSetchell/MoogsStructureLib/issues" },
  "moogs-voyager-structures": { wiki:"https://moogs-mods.fandom.com/wiki/Moog%27s_Voyager_Structures", source:"https://github.com/Moog-s-Mods/MoogsVoyagerStructures", issues:"https://github.com/Moog-s-Mods/MoogsVoyagerStructures/issues" },
  "more-mobs": { wiki:"https://github.com/Tschipcraft/more_mobs/wiki", source:"https://github.com/Tschipcraft/more_mobs", issues:"https://github.com/Tschipcraft/more_mobs/issues" },
  "more-villagers-re-employed": { source:"https://github.com/frikinjay/morevillagers", issues:"https://github.com/frikinjay/morevillagers/issues" },
  "mouse-tweaks": { source:"https://github.com/YaLTeR/MouseTweaks", issues:"https://github.com/YaLTeR/MouseTweaks/issues" },
  "mousetweaks-x-accessories-fix": { source:"https://github.com/Stalemated/mousetweaks-x-accessories-fix/", issues:"https://github.com/Stalemated/mousetweaks-x-accessories-fix/issues" },
  "mowzies-mobs": { source:"https://github.com/BobMowzie/MowziesMobs", issues:"https://github.com/BobMowzie/MowziesMobs/issues" },
  "my-nethers-delight": { source:"https://github.com/SoyTutta/MyNethersDelight", issues:"https://github.com/SoyTutta/MyNethersDelight/issues" },
  "nanny": { source:"https://github.com/Vonr/NaNny", issues:"https://github.com/Vonr/NaNny/issues" },
  "natures-compass": { source:"https://github.com/MattCzyr/NaturesCompass", issues:"https://github.com/MattCzyr/NaturesCompass/issues" },
  "neo-bee-fix": { source:"https://github.com/WFPhantom/NeoBeeFix", issues:"https://github.com/WFPhantom/NeoBeeFix/issues" },
  "neruina": { source:"https://github.com/Benjamin-Norton/Neruina", issues:"https://github.com/Benjamin-Norton/Neruina/issues" },
  "nether-chested": { source:"https://github.com/Fuzss/netherchested", issues:"https://github.com/Fuzss/netherchested/issues" },
  "netherportalfix": { wiki:"https://mods.twelveiterations.com/mc/netherportalfix", source:"https://github.com/TwelveIterations/NetherPortalFix", issues:"https://github.com/TwelveIterations/NetherPortalFix/issues" },
  "no-chat-reports": { wiki:"https://github.com/Aizistral-Studios/No-Chat-Reports/wiki", source:"https://github.com/Aizistral-Studios/No-Chat-Reports", issues:"https://github.com/Aizistral-Studios/No-Chat-Reports/issues" },
  "no-report-button": { wiki:"https://github.com/Lucaslah/no-report-button/wiki", source:"https://github.com/Lucaslah/no-report-button", issues:"https://github.com/Lucaslah/no-report-button/issues" },
  "nondirectionaldamagetiltfix": { source:"https://github.com/cintlep/Damage-Tilt-Fixes", issues:"https://github.com/cintlep/Damage-Tilt-Fixes/issues" },
  "not-enough-animations": { source:"https://github.com/tr7zw/NotEnoughAnimations", issues:"https://github.com/tr7zw/NotEnoughAnimations/issues" },
  "oceans-delight": { source:"https://github.com/Scouter456/Oceans_Delight" },
  "oh-the-biomes-weve-gone": { wiki:"https://github.com/Potion-Studios/Oh-The-Biomes-Weve-Gone/wiki", source:"https://github.com/Potion-Studios/Oh-The-Biomes-Weve-Gone", issues:"https://github.com/Potion-Studios/Oh-The-Biomes-Weve-Gone/issues" },
  "oh-the-trees-youll-grow": { source:"https://github.com/CorgiTaco/Oh-The-Trees-Youll-Grow", issues:"https://github.com/CorgiTaco/Oh-The-Trees-Youll-Grow/issues" },
  "open-parties-and-claims": { source:"https://github.com/thexaero/open-parties-and-claims", issues:"https://github.com/thexaero/open-parties-and-claims/issues" },
  "overflowing-bars": { source:"https://github.com/Fuzss/overflowingbars", issues:"https://github.com/Fuzss/overflowingbars/issues" },
  "owo-lib": { wiki:"https://docs.wispforest.io/owo/setup", source:"https://github.com/glisco03/owo-lib", issues:"https://github.com/glisco03/owo-lib/issues" },
  "pack-analytics": { source:"https://github.com/txnimc/PackAnalytics", issues:"https://github.com/txnimc/PackAnalytics/issues" },
  "packet-fixer": { source:"https://github.com/TonimatasDEV/PacketSizeDoublerForge", issues:"https://github.com/TonimatasDEV/PacketSizeDoublerForge/issues" },
  "particle-core": { source:"https://github.com/fzzyhmstrs/pc", issues:"https://github.com/fzzyhmstrs/pc/issues" },
  "particle-effects": { wiki:"https://github.com/LopyMine/Particle-Effects", source:"https://github.com/LopyMine/Particle-Effects", issues:"https://github.com/LopyMine/Particle-Effects/issues" },
  "patchouli": { wiki:"https://vazkiimods.github.io/Patchouli/", source:"https://github.com/VazkiiMods/Patchouli/", issues:"https://github.com/VazkiiMods/Patchouli/issues" },
  "paxi-neoforge": { source:"https://github.com/YUNG-GANG/Paxi", issues:"https://github.com/YUNG-GANG/Paxi/issues" },
  "pick-up-notifier": { source:"https://github.com/Fuzss/pickupnotifier", issues:"https://github.com/Fuzss/pickupnotifier/issues" },
  "piglin-proliferation": { source:"https://github.com/seymourimadeit/Piglin-Proliferation/", issues:"https://github.com/seymourimadeit/Piglin-Proliferation/issues" },
  "ping-wheel": { source:"https://github.com/LukenSkyne/Minecraft-Ping-Wheel", issues:"https://github.com/LukenSkyne/Minecraft-Ping-Wheel/issues" },
  "platform": { source:"https://github.com/ItsBlackGear/Platform", issues:"https://github.com/ItsBlackGear/Platform/issues" },
  "playeranimator": { source:"https://github.com/KosmX/fabricPlayerAnimation", issues:"https://github.com/KosmX/fabricPlayerAnimation/issues" },
  "polymorph": { source:"https://github.com/illusivesoulworks/polymorph", issues:"https://github.com/illusivesoulworks/polymorph/issues" },
  "prickle": { source:"https://github.com/Darkhax-Minecraft/PrickleMC", issues:"https://github.com/Darkhax-Minecraft/PrickleMC/issues" },
  "puzzles-lib": { source:"https://github.com/Fuzss/puzzleslib", issues:"https://github.com/Fuzss/puzzleslib/issues" },
  "quark": { wiki:"https://quarkmod.net/", source:"https://github.com/VazkiiMods/Quark", issues:"https://github.com/VazkiiMods/Quark/issues" },
  "quests-kill-task-tweaks": { source:"https://github.com/muon-rw/Quest-Kill-Task" },
  "raided": { source:"https://github.com/Mrbysco/Raided", issues:"https://github.com/Mrbysco/Raided/issues" },
  "random-enchant-fix": { source:"https://github.com/txnimc/RandomEnchantFix", issues:"https://github.com/txnimc/RandomEnchantFix/issues" },
  "recipe-essentials-forge-fabric": { source:"https://github.com/someaddons/recipeessentials", issues:"https://github.com/someaddons/recipeessentials/issues" },
  "redirected": { source:"https://github.com/txnimc/Redirected", issues:"https://github.com/txnimc/Redirected/issues" },
  "reeses-sodium-options": { source:"https://github.com/FlashyReese/reeses-sodium-options", issues:"https://github.com/FlashyReese/reeses-sodium-options/issues" },
  "repurposed-structures": { wiki:"https://github.com/TelepathicGrunt/RepurposedStructures/wiki", source:"https://github.com/TelepathicGrunt/RepurposedStructures", issues:"https://github.com/TelepathicGrunt/RepurposedStructures/issues" },
  "repurposed-structures-farmers-delight-compat-mod": { source:"https://github.com/TelepathicGrunt/RepurposedStructuresCompatDatapacks", issues:"https://github.com/TelepathicGrunt/RepurposedStructures/issues" },
  "reset-controls-confirmation": { source:"https://github.com/joshieman06/ResetControlsConfirmation" },
  "resource-pack-overrides": { source:"https://github.com/Fuzss/resourcepackoverrides", issues:"https://github.com/Fuzss/resourcepackoverrides/issues" },
  "resourceful-config": { source:"https://github.com/Team-Resourceful/Resourceful-Config", issues:"https://github.com/Team-Resourceful/Resourceful-Config/issues" },
  "resourceful-lib": { wiki:"https://team-resourceful.gitbook.io/resourceful-lib/highlights", source:"https://github.com/Team-Resourceful/ResourcefulLib", issues:"https://github.com/Team-Resourceful/ResourcefulLib/issues" },
  "revampedwolf": { source:"https://github.com/baguchan/RevampedWolf", issues:"https://github.com/baguchan/RevampedWolf/issues" },
  "rewithered": { source:"https://github.com/pajicadvance/rewithered", issues:"https://github.com/pajicadvance/rewithered/issues" },
  "rightclickharvest": { source:"https://github.com/JamCoreModding/RightClickHarvest", issues:"https://github.com/Jamalam360/RightClickHarvestFabric/issues" },
  "ritchies-projectile-library": { source:"https://github.com/Wagers-of-Industrial-Warfare/RitchiesProjectileLib", issues:"https://github.com/Wagers-of-Industrial-Warfare/RitchiesProjectileLib/issues" },
  "sawmill": { source:"https://github.com/MehVahdJukaar/sawmill", issues:"https://github.com/MehVahdJukaar/sawmill/issues" },
  "scalablelux": { source:"https://github.com/RelativityMC/ScalableLux", issues:"https://github.com/RelativityMC/ScalableLux/issues" },
  "searchables": { source:"https://github.com/jaredlll08/searchables", issues:"https://github.com/jaredlll08/searchables/issues" },
  "seasonal-integration": { source:"https://github.com/The-Bernician-Lamb/Seasonal-Integration", issues:"https://github.com/The-Bernician-Lamb/Seasonal-Integration/issues" },
  "selene": { source:"https://github.com/Boundarybreaker/Selene", issues:"https://github.com/Boundarybreaker/Selene/issues" },
  "serene-seasons": { wiki:"https://github.com/Glitchfiend/SereneSeasons/wiki", source:"https://github.com/Glitchfiend/SereneSeasons", issues:"https://github.com/Glitchfiend/SereneSeasons/issues" },
  "server-browser": { source:"https://github.com/ExcessiveAmountsOfZombies/ServerBrowser", issues:"https://github.com/ExcessiveAmountsOfZombies/ServerBrowser/issues" },
  "sildurs-vibrant-shaders": { issues:"https://github.com/Sildurs-shaders/sildurs-shaders.github.io/issues" },
  "simple-discord-rich-presence": { source:"https://github.com/Sunekaer/Simple-Discord-Rich-Presence", issues:"https://github.com/Sunekaer/Simple-Discord-Rich-Presence/issues" },
  "simple-snowy-fix-forge-fabric": { source:"https://github.com/Apollounknowndev/simple-snowy-fix", issues:"https://github.com/Apollounknowndev/simple-snowy-fix/issues" },
  "simple-voice-chat": { wiki:"https://modrepo.de/minecraft/voicechat/wiki", source:"https://github.com/henkelmax/simple-voice-chat", issues:"https://github.com/henkelmax/simple-voice-chat/issues" },
  "simply-swords": { source:"https://github.com/Sweenus/SimplySwords", issues:"https://github.com/Sweenus/SimplySwords/issues" },
  "simply-tooltips": { source:"https://github.com/Sweenus/simplytooltips", issues:"https://github.com/Sweenus/simplytooltips/issues" },
  "sinytra-connector": { wiki:"https://connector.sinytra.org", source:"https://github.com/Sinytra/Connector", issues:"https://github.com/Sinytra/Connector/issues" },
  "skeleton-ai-fix": { source:"https://github.com/Fuzss/skeletonaifix", issues:"https://github.com/Fuzss/skeletonaifix/issues" },
  "skin-layers-3d": { source:"https://github.com/tr7zw/3d-Skin-Layers" },
  "slice-and-dice": { source:"https://github.com/PssbleTrngle/SliceAndDice", issues:"https://github.com/PssbleTrngle/SliceAndDice/issues" },
  "smarter-farmers-farmers-replant": { source:"https://github.com/MehVahdJukaar/SmarterFarmers", issues:"https://github.com/MehVahdJukaar/SmarterFarmers/issues" },
  "smooth-chunk-save": { source:"https://github.com/someaddons/smoothchunksave", issues:"https://github.com/someaddons/smoothchunksave/issues" },
  "smooth-movement": { source:"https://github.com/someaddons/Smoooth-Movement", issues:"https://github.com/someaddons/Smoooth-Movement/issues" },
  "snow-real-magic": { source:"https://github.com/Snownee/SnowRealMagic", issues:"https://github.com/Snownee/SnowRealMagic/issues" },
  "snow-under-trees": { source:"https://github.com/bl4ckscor3/SnowUnderTrees", issues:"https://github.com/bl4ckscor3/SnowUnderTrees/issues" },
  "sodium": { wiki:"https://github.com/CaffeineMC/sodium/wiki", source:"https://github.com/CaffeineMC/sodium", issues:"https://github.com/CaffeineMC/sodium/issues" },
  "sodium-embeddium-options-mod-compat": { source:"https://github.com/txnimc/SodiumOptionsModCompat", issues:"https://github.com/txnimc/SodiumOptionsModCompat/issues" },
  "sodium-leaf-culling": { source:"https://github.com/txnimc/SodiumLeafCulling", issues:"https://github.com/txnimc/SodiumLeafCulling/issues" },
  "sodium-options-api": { source:"https://github.com/txnimc/SodiumOptionsAPI", issues:"https://github.com/txnimc/SodiumOptionsAPI/issues" },
  "sound-physics-remastered": { source:"https://github.com/henkelmax/sound-physics-remastered", issues:"https://github.com/henkelmax/sound-physics-remastered/issues" },
  "spark": { wiki:"https://spark.lucko.me/docs", source:"https://github.com/lucko/spark", issues:"https://github.com/lucko/spark/issues" },
  "sparse-structures": { source:"https://github.com/MaxenceDC/sparsestructures", issues:"https://github.com/MaxenceDC/sparsestructures/issues" },
  "stoneworks": { source:"https://github.com/Fuzss/stoneworks", issues:"https://github.com/Fuzss/stoneworks/issues" },
  "stony-cliffs-are-cool": { issues:"https://github.com/everloste/my-mc-projects/issues" },
  "structory": { wiki:"https://stardustlabs.miraheze.org/wiki/Structory", source:"https://github.com/Stardust-Labs-MC/Structory", issues:"https://github.com/Stardust-Labs-MC/Structory/issues" },
  "structory-towers": { wiki:"https://stardustlabs.miraheze.org/wiki/Structory:_Towers", source:"https://github.com/Stardust-Labs-MC/Structory-Towers", issues:"https://github.com/Stardust-Labs-MC/Structory-Towers/issues" },
  "structure-essentials-forge-fabric": { source:"https://github.com/someaddons/structureessentials", issues:"https://github.com/someaddons/structureessentials/issues" },
  "structure-layout-optimizer": { source:"https://github.com/TelepathicGrunt/StructureLayoutOptimizer", issues:"https://github.com/TelepathicGrunt/StructureLayoutOptimizer/issues" },
  "subtle-effects": { wiki:"https://github.com/MincraftEinstein/SubtleEffects/wiki", source:"https://github.com/MincraftEinstein/SubtleEffects", issues:"https://github.com/MincraftEinstein/SubtleEffects/issues" },
  "supplementaries": { wiki:"https://github.com/MehVahdJukaar/Supplementaries/wiki", source:"https://github.com/MehVahdJukaar/Supplementaries" },
  "terrablender-neoforge": { wiki:"https://github.com/Glitchfiend/TerraBlender/wiki", source:"https://github.com/Glitchfiend/TerraBlender/", issues:"https://github.com/Glitchfiend/TerraBlender/" },
  "tfthreadsafetyaddon": { source:"https://github.com/ishland/TFThreadSafetyAddon", issues:"https://github.com/ishland/TFThreadSafetyAddon/issues" },
  "the-twilight-forest": { source:"https://github.com/TeamTwilight/twilightforest", issues:"https://github.com/TeamTwilight/twilightforest/issues" },
  "toms-storage": { source:"https://github.com/tom5454/Toms-Storage", issues:"https://github.com/tom5454/Toms-Storage/issues" },
  "too-fast": { source:"https://github.com/noobanidus/toofast", issues:"https://github.com/noobanidus/toofast/issues" },
  "trading-post": { source:"https://github.com/Fuzss/tradingpost", issues:"https://github.com/Fuzss/tradingpost/issues" },
  "twilights-flavors-delight": { source:"https://github.com/Minecraft-LightLand/Twilight-Delight", issues:"https://github.com/Minecraft-LightLand/Twilight-Delight/issues" },
  "txnilib": { source:"https://github.com/txnimc/TxniLib", issues:"https://github.com/txnimc/TxniLib/issues" },
  "underlay": { source:"https://github.com/dooji2/underlay/", issues:"https://github.com/dooji2/underlay/issues" },
  "vanillabackport": { wiki:"https://github.com/ItsBlackGear/VanillaBackport/wiki", source:"https://github.com/ItsBlackGear/VanillaBackport", issues:"https://github.com/ItsBlackGear/VanillaBackport/issues" },
  "variants-and-ventures": { wiki:"https://github.com/Faboslav/variants-and-ventures/wiki", source:"https://github.com/Faboslav/variants-and-ventures", issues:"https://github.com/Faboslav/variants-and-ventures/issues" },
  "vein-mining": { source:"https://github.com/illusivesoulworks/veinmining", issues:"https://github.com/illusivesoulworks/veinmining/issues" },
  "villager-names": { source:"https://github.com/OverlordsIII/VillagerNames", issues:"https://github.com/OverlordsIII/VillagerNames/issues" },
  "villagerapi": { wiki:"https://morevillagers.neoterra.online/villager-pack-gen", source:"https://github.com/frikinjay/villagerapi", issues:"https://github.com/frikinjay/villagerapi/issues" },
  "villages-and-pillages": { source:"https://github.com/Faboslav/villages-and-pillages", issues:"https://github.com/Faboslav/villages-and-pillages/issues" },
  "visual-workbench": { source:"https://github.com/Fuzss/visualworkbench", issues:"https://github.com/Fuzss/visualworkbench/issues" },
  "wakes-reforged": { source:"https://github.com/Leclowndu93150/Wakes", issues:"https://github.com/Leclowndu93150/Wakes/issues" },
  "wetland-whimsy": { wiki:"https://moddedmc.wiki/en/project/wetland-whimsy/docs", source:"https://codeberg.org/junideergirl/WetlandWhimsy", issues:"https://codeberg.org/junideergirl/WetlandWhimsy/issues" },
  "what-are-they-up-to": { source:"https://github.com/Corosauce/WATUT", issues:"https://github.com/Corosauce/WATUT/issues" },
  "when-dungeons-arise": { source:"https://github.com/Aureljz/WhenDungeonsArise-Forge-main" },
  "world-play-time": { source:"https://github.com/Khajiitos/WorldPlayTime", issues:"https://github.com/Khajiitos/WorldPlayTime/issues" },
  "xaeroplus": { source:"https://github.com/rfresh2/XaeroPlus/", issues:"https://github.com/rfresh2/XaeroPlus/issues" },
  "xaeros-minimap": { issues:"https://curseforge.com/minecraft/mc-mods/xaeros-minimap/issues" },
  "xaeros-world-map": { issues:"https://curseforge.com/minecraft/mc-mods/xaeros-world-map/issues" },
  "xp-tome": { source:"https://github.com/bl4ckscor3/XP-Tome", issues:"https://github.com/bl4ckscor3/XP-Tome/issues" },
  "yacl": { wiki:"https://docs.isxander.dev/yet-another-config-lib", source:"https://github.com/isXander/YetAnotherConfigLib", issues:"https://github.com/isXander/YetAnotherConfigLib/issues" },
  "yungs-api-neoforge": { source:"https://github.com/YUNG-GANG/YUNGs-API", issues:"https://github.com/YUNG-GANG/YUNGs-API/issues" },
  "yungs-better-dungeons-neoforge": { source:"https://github.com/YUNG-GANG/YUNGs-Better-Dungeons", issues:"https://github.com/YUNG-GANG/YUNGs-Better-Dungeons/issues" },
  "yungs-better-end-island-neoforge": { source:"https://github.com/yungnickyoung/YUNGs-Better-End-Island", issues:"https://github.com/yungnickyoung/YUNGs-Better-End-Island/issues" },
  "yungs-better-jungle-temples-neoforge": { source:"https://github.com/YUNG-GANG/YUNGs-Better-Jungle-Temples", issues:"https://github.com/YUNG-GANG/YUNGs-Better-Jungle-Temples/issues" },
  "yungs-better-mineshafts-neoforge": { source:"https://github.com/YUNG-GANG/YUNGs-Better-Mineshafts", issues:"https://github.com/YUNG-GANG/YUNGs-Better-Mineshafts/issues" },
  "yungs-better-nether-fortresses-neoforge": { source:"https://github.com/YUNG-GANG/YUNGs-Better-Fortresses", issues:"https://github.com/YUNG-GANG/YUNGs-Better-Fortresses/issues" },
  "yungs-better-ocean-monuments-neoforge": { source:"https://github.com/YUNG-GANG/YUNGs-Better-Ocean-Monuments", issues:"https://github.com/YUNG-GANG/YUNGs-Better-Ocean-Monuments/issues" },
  "yungs-better-strongholds-neoforge": { source:"https://github.com/YUNG-GANG/YUNGs-Better-Strongholds", issues:"https://github.com/YUNG-GANG/YUNGs-Better-Strongholds/issues" },
  "yungs-better-witch-huts-neoforge": { source:"https://github.com/YUNG-GANG/YUNGs-Better-Witch-Huts", issues:"https://github.com/YUNG-GANG/YUNGs-Better-Witch-Huts/issues" },
  "yungs-menu-tweaks-neoforge": { source:"https://github.com/yungnickyoung/YUNGs-Menu-Tweaks", issues:"https://github.com/yungnickyoung/YUNGs-Menu-Tweaks/issues" },
  "zeta": { source:"https://github.com/VazkiiMods/Zeta", issues:"https://github.com/VazkiiMods/Zeta/issues" },
  "zombie-improvements": { source:"https://github.com/pajicadvance/zombie-improvements", issues:"https://github.com/pajicadvance/zombie-improvements/issues" },
};

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
    day: "09", my: "JUIN 2026", tag: "fix", label: "MISE À JOUR",
    title: "Nouvelle MAJ des mods : supprimez les anciens d'abord",
    body: `Les deux mods maison viennent d'être mis à jour : <strong>DonjonMC</strong> et <strong>Dashboard Admin</strong> (dernières versions). Avant d'installer les nouveaux, <strong>supprimez les anciennes versions</strong> de ces deux mods dans votre dossier <code class="inline-path">mods</code>. Téléchargez ensuite les fichiers ci-dessous et mettez-les à la place. Ne gardez jamais deux versions du même mod en même temps, le jeu planterait au démarrage.`,
    dls: [
      { label: "⬇ DonjonMC (dernière version)", url: "https://github.com/LKDM7/DonjonMC/raw/master/releases/donjonmc-latest.jar" },
      { label: "⬇ Dashboard Admin (dernière version)", url: "https://github.com/LKDM7/DashBoardAdmin/raw/master/releases/dashboardadmin-latest.jar" },
    ],
  },
  {
    day: "07", my: "JUIN 2026", tag: "fix", label: "MISE À JOUR",
    obsolete: true,
    title: "DonjonMC v2.0.2 — mettez à jour vos mods",
    body: `<strong>DonjonMC v2.0.2</strong> est disponible. Remplacez les anciennes versions dans votre dossier <code class="inline-path">mods</code> par les nouveaux fichiers ci-dessous.`,
    dls: [
      { label: "⬇ DonjonMC (dernière version)", url: "https://github.com/LKDM7/DonjonMC/raw/master/releases/donjonmc-latest.jar" },
      { label: "⬇ Dashboard Admin (dernière version)", url: "https://github.com/LKDM7/DashBoardAdmin/raw/master/releases/dashboardadmin-latest.jar" },
    ],
  },
  {
    day: "07", my: "JUIN 2026", tag: "fix", label: "MISE À JOUR",
    obsolete: true,
    title: "Mods personnalisés mis à jour — re-téléchargez-les",
    body: `Les mods maison <strong>DonjonMC</strong> et <strong>Dashboard Admin</strong> viennent d'être mis à jour avec les dernières modifications. Si vous jouez déjà sur le serveur, remplacez les anciennes versions dans votre dossier <code class="inline-path">mods</code> par les nouvelles ci-dessous.`,
    dls: [
      { label: "⬇ DonjonMC (dernière version)", url: "https://github.com/LKDM7/DonjonMC/raw/master/releases/donjonmc-latest.jar" },
      { label: "⬇ Dashboard Admin (dernière version)", url: "https://github.com/LKDM7/DashBoardAdmin/raw/master/releases/dashboardadmin-latest.jar" },
    ],
  },
  {
    day: "07", my: "JUIN 2026", tag: "fix", label: "MISE À JOUR",
    obsolete: true,
    title: "Mettez à jour vos 2 mods personnalisés",
    body: `Les deux mods maison ont reçu des correctifs importants. <strong>DonjonMC</strong> corrige un bug où les portails pouvaient spawner sous terre (Y &lt; 1). <strong>Dashboard Admin</strong> ajoute la compatibilité avec le mod Accessories pour conserver les items équipés à la mort. Re-téléchargez les deux mods et remplacez les anciennes versions dans votre dossier <code class="inline-path">mods</code>.`,
    dls: [
      { label: "⬇ DonjonMC (dernière version)", url: "https://github.com/LKDM7/DonjonMC/raw/master/releases/donjonmc-latest.jar" },
      { label: "⬇ Dashboard Admin (dernière version)", url: "https://github.com/LKDM7/DashBoardAdmin/raw/master/releases/dashboardadmin-latest.jar" },
    ],
  },
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
    obsolete: true,
    title: "2 mods à télécharger avant de rejoindre le serveur",
    body: `DonjonMC utilise 2 mods personnalisés qui ne sont <strong>pas inclus</strong> dans le modpack CurseForge. Télécharge-les et place-les dans le dossier <strong>mods</strong> du modpack : ouvre CurseForge, repère le modpack DonjonMC, clique sur les <strong>3 points ⋮</strong> à côté du bouton Play → <strong>Open Folder</strong> → dépose les 2 mods dans le dossier <code class="inline-path">mods</code>.`,
    dls: [
      { label: "⬇ DonjonMC (dernière version)", url: "https://github.com/LKDM7/DonjonMC/raw/master/releases/donjonmc-latest.jar" },
      { label: "⬇ Dashboard Admin (dernière version)", url: "https://github.com/LKDM7/DashBoardAdmin/raw/master/releases/dashboardadmin-latest.jar" },
    ],
  },
  {
    day: "05", my: "JUIN 2026", tag: "new", label: "NOUVEAU",
    title: "Ouverture officielle de DonjonMC !",
    body: `Le serveur ouvre ses portes ce soir à 21h. ${MODS.length} mods NeoForge 1.21.1 vous attendent.`,
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

const NEWS_LABELS = { new: "NOUVEAU", event: "ÉVÉNEMENT", fix: "MISE À JOUR", requis: "REQUIS", github: "GITHUB" };

const safeUrl = url => /^https:\/\//i.test(url) ? url : "#";

/* ---- GitHub Releases → NEWS ----------------------------------------- */
const MONTHS_FR = ["JANV","FÉVR","MARS","AVR","MAI","JUIN","JUIL","AOÛT","SEPT","OCT","NOV","DÉC"];

/* Horodatage d'un article (statique ou GitHub) pour trier du plus récent au plus ancien */
function newsTs(n) {
  if (n._ts) return n._ts;
  const [mois, annee] = (n.my || "").split(" ");
  const mo = MONTHS_FR.indexOf(mois);
  return Date.UTC(parseInt(annee, 10) || 2026, mo < 0 ? 0 : mo, parseInt(n.day, 10) || 1);
}

/* Identifiant stable d'un article, dérivé du titre (résiste au tri et au re-rendu) */
function newsSlug(n) {
  const base = (n.title || "")
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return "cl-" + (base || "article");
}

/* Scrolle vers l'article ciblé par le hash de l'URL (#cl-<slug>) s'il existe */
function scrollToHashArticle() {
  const hash = location.hash;
  if (!hash || !/^#cl-[a-z0-9-]+$/i.test(hash)) return;
  const el = document.getElementById(hash.slice(1));
  if (el) el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "center" });
}

function mdToHtml(md) {
  return md
    .replace(/#{1,6}\s+(.+)/g, "<strong>$1</strong>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, `<code class="inline-path">$1</code>`)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, u) => /^https:\/\//.test(u) ? `<a href="${escapeHTML(u)}" target="_blank" rel="noopener">${escapeHTML(t)}</a>` : escapeHTML(t))
    .replace(/\r?\n{2,}/g, " · ")
    .replace(/\r?\n/g, " ")
    .trim();
}

async function fetchGitHubReleases() {
  const cached = sessionStorage.getItem("gh_releases");
  if (cached) { try { return JSON.parse(cached); } catch (_) {} }

  const repos = [
    { repo: "LKDM7/DonjonMC",       name: "DonjonMC"       },
    { repo: "LKDM7/DashBoardAdmin",  name: "Dashboard Admin" },
  ];
  const all = [];

  for (const r of repos) {
    try {
      const ctrl = new AbortController();
      const tid = setTimeout(() => ctrl.abort(), 6000);
      const res = await fetch(`https://api.github.com/repos/${r.repo}/releases?per_page=5`, {
        signal: ctrl.signal,
        headers: { Accept: "application/vnd.github.v3+json" },
      });
      clearTimeout(tid);
      if (!res.ok) continue;
      const releases = await res.json();
      for (const rel of releases) {
        const d = new Date(rel.published_at);
        all.push({
          day:  String(d.getUTCDate()).padStart(2, "0"),
          my:   `${MONTHS_FR[d.getUTCMonth()]} ${d.getUTCFullYear()}`,
          tag:  /fix|patch|hotfix|bug/i.test(rel.tag_name + (rel.name || "")) ? "fix" : "new",
          label: `${r.name} ${escapeHTML(rel.tag_name)}`,
          title: escapeHTML(rel.name || `${r.name} ${rel.tag_name}`),
          body:  rel.body ? mdToHtml(rel.body) : `Nouvelle version <strong>${escapeHTML(rel.tag_name)}</strong> de ${escapeHTML(r.name)}.`,
          dls:   (rel.assets || []).slice(0, 3).map(a => ({ label: `⬇ ${escapeHTML(a.name)}`, url: safeUrl(a.browser_download_url) })),
          githubUrl: safeUrl(rel.html_url),
          _ts:   d.getTime(),
          _fromGithub: true,
        });
      }
    } catch (_) {}
  }

  all.sort((a, b) => b._ts - a._ts);
  try { sessionStorage.setItem("gh_releases", JSON.stringify(all)); } catch (_) {}
  return all;
}

async function loadGitHubReleases() {
  const releases = await fetchGitHubReleases();
  if (!releases.length) return;

  /* Évite les doublons : exclut les releases déjà couvertes par les DL statiques */
  const existingTitles = new Set(NEWS.map(n => n.title));
  const toAdd = releases.filter(r => !existingTitles.has(r.title));
  if (!toAdd.length) return;

  /* Les releases GitHub sont des miroirs auto-générés : l'article curé reste la version active */
  toAdd.forEach(r => { r.obsolete = true; });
  NEWS.push(...toAdd);
  NEWS.sort((a, b) => newsTs(b) - newsTs(a));
  renderNews();
  /* Le re-rendu a recréé les articles : on re-scrolle si l'URL ciblait un article */
  scrollToHashArticle();
}

/* ---- Notifications ------------------------------------------------------ */
function initNotifications() {
  if (!("Notification" in window)) return;

  const bell = document.getElementById("notif-bell");
  if (!bell) return;

  const BELL_KEY  = "donjon_notif";
  const LAST_KEY  = "donjon_last_gh";

  const isEnabled = () => localStorage.getItem(BELL_KEY) === "1" && Notification.permission === "granted";

  function syncBell() {
    bell.classList.toggle("active", isEnabled());
    bell.title = isEnabled() ? "Désactiver les alertes" : "Activer les alertes de mise à jour";
  }
  syncBell();

  bell.addEventListener("click", async () => {
    if (isEnabled()) {
      localStorage.removeItem(BELL_KEY);
      syncBell();
      return;
    }
    const perm = await Notification.requestPermission();
    if (perm === "granted") {
      localStorage.setItem(BELL_KEY, "1");
      syncBell();
      new Notification("DonjonMC 🔔", { body: "Alertes activées — vous serez prévenu des nouvelles versions.", icon: "./icon.png" });
    }
  });

  /* Vérifie s'il y a une nouvelle release à signaler */
  if (!isEnabled()) return;
  fetchGitHubReleases().then(releases => {
    if (!releases.length) return;
    const latest = releases[0];
    const lastId = localStorage.getItem(LAST_KEY);
    const latestId = String(latest._ts);
    if (lastId && lastId !== latestId) {
      new Notification(`DonjonMC — ${latest.label}`, { body: latest.title, icon: "./icon.png" });
    }
    localStorage.setItem(LAST_KEY, latestId);
  }).catch(() => {});
}

function renderNews() {
  const container = document.getElementById("changelog-list");
  if (!container) return;
  container.innerHTML = NEWS.map((n, i) => {
    const label = escapeHTML(n.label || NEWS_LABELS[n.tag] || "");
    const dls = (!n.obsolete && n.dls && n.dls.length)
      ? `<div class="cl-dl-row">${n.dls.map(d =>
          `<a href="${safeUrl(d.url)}" class="btn btn-primary cl-dl-btn" download>${escapeHTML(d.label)}</a>`
        ).join("")}</div>`
      : "";
    const cls = ["cl-item", i === 0 ? "is-latest" : "", n.obsolete ? "is-obsolete" : ""].filter(Boolean).join(" ");
    const aid = newsSlug(n);
    const articleUrl = escapeHTML(location.origin + location.pathname + "?tab=changelog#" + aid);
    const linkBtn = !n.obsolete
      ? `<button class="cl-link-btn" data-url="${articleUrl}" title="Copier le lien vers cet article" aria-label="Copier le lien">🔗</button>`
      : "";
    return `<article class="${cls}" id="${aid}">
      <div class="cl-date"><span class="cl-day">${escapeHTML(n.day)}</span><span class="cl-my">${escapeHTML(n.my)}</span></div>
      <div class="cl-content">
        ${linkBtn}
        <span class="cl-tag tag-${escapeHTML(n.tag)}">${label}</span>
        <h3>${escapeHTML(n.title)}</h3>
        <p>${n.body}</p>
        ${dls}
      </div>
    </article>`;
  }).join("");
}

document.getElementById("changelog-list").addEventListener("click", e => {
  const btn = e.target.closest(".cl-link-btn");
  if (!btn) return;
  const url = btn.dataset.url;
  if (!url || !navigator.clipboard) return;
  navigator.clipboard.writeText(url).then(() => {
    btn.textContent = "✓";
    btn.classList.add("cl-copied");
    setTimeout(() => { btn.textContent = "🔗"; btn.classList.remove("cl-copied"); }, 1800);
  }).catch(() => {});
});
renderNews();

(function initNewsToast() {
  const latest = NEWS.find(n => !n.obsolete);
  if (!latest) return;
  const key = `toast_${latest.day}_${latest.my.replace(/\s+/g, "_")}`;
  if (localStorage.getItem(key)) return;
  const toast = document.getElementById("news-toast");
  const titleEl = document.getElementById("news-toast-title");
  if (!toast || !titleEl) return;
  titleEl.textContent = latest.title;
  setTimeout(() => toast.classList.add("toast-visible"), 900);
  function dismiss() {
    localStorage.setItem(key, "1");
    toast.classList.remove("toast-visible");
    setTimeout(() => toast.remove(), 400);
  }
  document.getElementById("news-toast-close").addEventListener("click", e => {
    e.stopPropagation();
    dismiss();
  });
  toast.addEventListener("click", () => {
    dismiss();
    const btn = document.querySelector('[data-tab="changelog"]');
    if (btn) btn.click();
  });
})();

loadGitHubReleases();
initNotifications();

/* ---- Bluemap lazy-load (charge l'iframe seulement au premier clic) --- */
(function initMap() {
  const btn = document.getElementById("tabbtn-map");
  if (!btn) return;
  btn.addEventListener("click", function onMapClick() {
    const frame = document.getElementById("bluemap-frame");
    if (frame && !frame.src.startsWith("https")) {
      frame.src = frame.dataset.src;
    }
    btn.removeEventListener("click", onMapClick);
  }, { once: false });
})();

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
  const fetchWithTimeout = (url, opts = {}, ms = 6000) => {
    const ctrl = new AbortController();
    const id = setTimeout(() => ctrl.abort(), ms);
    return fetch(url, { ...opts, signal: ctrl.signal }).finally(() => clearTimeout(id));
  };

  const sources = [
    ["https://worldtimeapi.org/api/timezone/Etc/UTC", d => d.unixtime * 1000],
    ["https://timeapi.io/api/Time/current/zone?timeZone=UTC", d => new Date(d.dateTime + "Z").getTime()],
  ];
  for (const [url, parse] of sources) {
    try {
      const r = await fetchWithTimeout(url, { cache: "no-store" });
      if (!r.ok) continue;
      const t = parse(await r.json());
      const MIN_TS = 1700000000000, MAX_TS = 1900000000000; // 2023–2030
      if (t && !isNaN(t) && t > MIN_TS && t < MAX_TS) return t;
    } catch (_) { /* source suivante */ }
  }

  // Repli robuste : en-tête "Date" same-origin (jamais mis en cache par le SW, HEAD non-GET).
  try {
    const r = await fetchWithTimeout(location.origin + "/?t=" + Date.now(), { method: "HEAD", cache: "no-store" });
    const d = r.headers.get("date");
    if (d) { const t = new Date(d).getTime(); if (!isNaN(t)) return t; }
  } catch (_) { /* source suivante */ }

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
      const copyBtn = document.getElementById("copy-btn");
      if (copyBtn) { copyBtn.removeAttribute("disabled"); copyBtn.removeAttribute("aria-disabled"); }
      startServerStatus(revealedIP);
    } else {
      // Pas encore l'heure réelle → on retente, sans rien révéler
      const wait = Math.min(Math.max((launch - realNow) / 1000, 5), 30) * 1000;
      setTimeout(() => { revealing = false; tryReveal(); }, wait);
    }
  } catch (_) {
    revealedIP = null;
    revealing = false;
    setTimeout(tryReveal, 5000);
  }
}

// Respecte le réglage système "réduire les animations".
function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* =====================================================================
   STATUT LIVE DU SERVEUR  (api.mcsrvstat.us — public, sans clé)
   Affiche En ligne / Hors ligne + joueurs connectés + noms.
   Démarre une fois l'IP révélée, puis rafraîchit toutes les 30 sec.
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

    const onlineBadge = document.getElementById("online-badge");
    if (d && d.online) {
      dot.className = "status-dot online";
      text.textContent = "En ligne";
      if (onlineBadge) onlineBadge.classList.remove("hidden");
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
      if (onlineBadge) onlineBadge.classList.add("hidden");
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

  function closeModal() {
    overlay.removeEventListener("keydown", trapFocus);
    document.removeEventListener("keydown", handleEsc);
    overlay.setAttribute("hidden", "");
    prevFocus?.focus();
  }
  function handleEsc(e) { if (e.key === "Escape") closeModal(); }
  document.addEventListener("keydown", handleEsc);

  document.getElementById("mods-modal-confirm")?.addEventListener("click", closeModal, { once: true });
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
  const copyBtn = document.getElementById("copy-btn");
  if (copyBtn) { copyBtn.removeAttribute("disabled"); copyBtn.removeAttribute("aria-disabled"); }
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
const TAB_IDS = ["mods", "commands", "changelog", "donjonmc", "dashboard", "faq", "map"];

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
    const active = c.id === "tab-" + id;
    c.classList.toggle("active", active);
    if (active) c.removeAttribute("hidden");
    else c.setAttribute("hidden", "");
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
    document.getElementById("info").scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
    const panel = document.getElementById("tab-" + a.dataset.tab);
    if (panel) panel.focus();
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
    input.addEventListener("input", debounce(renderCommands, 150));
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
let currentSort = "cat"; // "cat" (par catégorie) | "az" | "za"
let hideDead = false;

function debounce(fn, ms) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

// Échappe les caractères HTML pour éviter toute injection (XSS).
function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[c]);
}

function modIcon(cat) { const m = CAT_META.find(x => x[0] === cat); return m ? m[1] : ""; }

// Slug = dernier segment de l'URL du mod (clé de MOD_LINKS).
function modSlug(url) {
  const m = /\/([^/?#]+)(?:[?#].*)?$/.exec(url || "");
  return m ? m[1].toLowerCase() : "";
}

// Petites icônes wiki/source d'un mod (vide si rien d'additionnel).
function modExtraIcons(name, url) {
  const x = MOD_LINKS[modSlug(url)];
  if (!x) return "";
  const icons = [];
  if (x.wiki)   icons.push(`<a href="${safeUrl(x.wiki)}" target="_blank" rel="noopener noreferrer" class="mod-link-icon" title="Wiki" aria-label="Wiki de ${escapeHTML(name)}">📖</a>`);
  if (x.source) icons.push(`<a href="${safeUrl(x.source)}" target="_blank" rel="noopener noreferrer" class="mod-link-icon" title="Code source" aria-label="Code source de ${escapeHTML(name)}">&lt;/&gt;</a>`);
  if (x.issues) icons.push(`<a href="${safeUrl(x.issues)}" target="_blank" rel="noopener noreferrer" class="mod-link-icon" title="Signaler un bug (issues)" aria-label="Issues de ${escapeHTML(name)}">🐞</a>`);
  return icons.length ? `<span class="mod-item-actions">${icons.join("")}</span>` : "";
}

// HTML d'une carte de mod. Le badge catégorie est TOUJOURS le dernier élément
// (collé au bord droit) → il s'aligne verticalement d'une carte à l'autre,
// quel que soit le nombre d'icônes wiki/source/issues.
function modItemHTML([name, c, url]) {
  if (!url) return `<div class="mod-item mod-item-dead" title="Pas de page publique">
        <span class="mod-item-main">
          <span class="mod-item-name">${escapeHTML(name)}</span>
          <span class="mod-item-link mod-item-nolink" aria-hidden="true">∅</span>
        </span>
        <span class="mod-item-badge badge-${c}">${escapeHTML(c)}</span>
      </div>`;
  const extra = modExtraIcons(name, url);
  return `<div class="mod-item${extra ? " has-extra" : ""}">
        <a href="${url}" target="_blank" rel="noopener noreferrer" class="mod-item-main" title="Page du mod">
          <span class="mod-item-name">${escapeHTML(name)}</span>
          <span class="mod-item-link" aria-hidden="true">↗</span>
        </a>
        ${extra}
        <span class="mod-item-badge badge-${c}">${escapeHTML(c)}</span>
      </div>`;
}

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

/* ② + ④ — liste des mods : groupée par catégorie (défaut) ou triée A→Z / Z→A */
function renderMods() {
  const q = currentSearch.toLowerCase().trim();
  const cats = currentFilter === "all" ? CAT_META.map(m => m[0]) : [currentFilter];
  const match = ([name, c, url]) => cats.includes(c) && name.toLowerCase().includes(q) && (!hideDead || url);

  let shown = 0;
  let html;

  if (currentSort === "az" || currentSort === "za") {
    // Tri alphabétique : liste plate, sans sections de catégorie (le badge reste visible).
    const items = MODS.filter(match)
      .slice()
      .sort((a, b) => a[0].localeCompare(b[0], "fr", { sensitivity: "base" }));
    if (currentSort === "za") items.reverse();
    shown = items.length;
    html = items.length ? `<div class="mod-list">${items.map(modItemHTML).join("")}</div>` : "";
  } else {
    // Défaut : sections par catégorie.
    html = cats.map(cat => {
      const items = MODS.filter(([name, c, url]) =>
        c === cat && name.toLowerCase().includes(q) && (!hideDead || url)
      );
      if (!items.length) return "";
      shown += items.length;
      return `<section class="mod-cat">
        <h3 class="mod-cat-title"><span class="mod-cat-icon">${modIcon(cat)}</span>${escapeHTML(cat)} <span class="mod-cat-count">${items.length}</span></h3>
        <div class="mod-list">${items.map(modItemHTML).join("")}</div>
      </section>`;
    }).join("");
  }

  document.getElementById("mods-list-container").innerHTML =
    html || `<div class="mods-empty">
      <p>Aucun mod trouvé${currentSearch ? ` pour « ${escapeHTML(currentSearch)} »` : ""}.</p>
      <button type="button" class="btn btn-ghost mods-reset" id="mods-reset">↺ Réinitialiser la recherche</button>
    </div>`;

  const count = document.getElementById("mods-count");
  if (count) count.textContent = `${shown} mod${shown !== 1 ? "s" : ""} affiché${shown !== 1 ? "s" : ""}`;
}

document.getElementById("mods-search").addEventListener("input", debounce(e => {
  currentSearch = e.target.value;
  renderMods();
}, 150));

// Sélecteur de tri (par catégorie / A→Z / Z→A), reflété dans l'URL ?sort=
const sortSelect = document.getElementById("mods-sort");
if (sortSelect) sortSelect.addEventListener("change", e => {
  currentSort = e.target.value;
  setQueryParam("sort", currentSort === "cat" ? null : currentSort);
  renderMods();
});

// Bouton « Réinitialiser » de l'état vide : efface recherche + filtre.
document.getElementById("mods-list-container").addEventListener("click", e => {
  if (!e.target.closest("#mods-reset")) return;
  currentSearch = "";
  currentFilter = "all";
  const search = document.getElementById("mods-search");
  if (search) search.value = "";
  setQueryParam("cat", null);
  renderPills();
  renderMods();
  if (search) search.focus();
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
    document.getElementById("info").scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
    document.getElementById("mods-search").focus();
  }
});

/* Init : stats + pills tout de suite, liste après un court skeleton */
renderModStats();
renderPills();
const skeletonHTML = Array(12).fill('<div class="skeleton-item"></div>').join("");
document.getElementById("mods-list-container").innerHTML = skeletonHTML;
renderMods();

/* =====================================================================
   FAQ — deep-links (#faq-N) : id sur chaque question + bouton 🔗 pour copier
   le lien, et reflet du hash quand on ouvre/ferme une question.
===================================================================== */
(function initFaqDeepLinks() {
  const faq = document.getElementById("tab-faq");
  if (!faq) return;
  const items = [...faq.querySelectorAll("details")];

  items.forEach((d, i) => {
    d.id = "faq-" + i;
    const summary = d.querySelector("summary");
    if (summary && !summary.querySelector(".faq-link-btn")) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "faq-link-btn";
      btn.textContent = "🔗";
      btn.title = "Copier le lien vers cette question";
      btn.setAttribute("aria-label", "Copier le lien vers cette question");
      summary.appendChild(btn);
    }
    // Reflète l'ouverture dans l'URL (sans empiler l'historique).
    d.addEventListener("toggle", () => {
      if (d.open && currentTab() === "faq") {
        history.replaceState(null, "", location.pathname + location.search + "#" + d.id);
      }
    });
  });

  // Clic sur 🔗 : copie le lien profond sans ouvrir/fermer la question.
  faq.addEventListener("click", e => {
    const btn = e.target.closest(".faq-link-btn");
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    const d = btn.closest("details");
    if (!d || !navigator.clipboard) return;
    const url = location.origin + location.pathname + "?tab=faq#" + d.id;
    navigator.clipboard.writeText(url).then(() => {
      btn.textContent = "✓";
      btn.classList.add("faq-copied");
      setTimeout(() => { btn.textContent = "🔗"; btn.classList.remove("faq-copied"); }, 1800);
    }).catch(() => {});
  });
})();

/* Restaure l'état depuis l'URL au chargement : ?tab=commands&cat=Monde&sort=az&#cl-N|#faq-N */
(function initFromUrl() {
  const params = new URLSearchParams(location.search);
  const tab = params.get("tab") || (function(){ try { return localStorage.getItem("donjonmc-tab"); } catch(_){ return null; } })();
  if (tab && TAB_IDS.includes(tab)) activateTab(tab, false);
  const cat = params.get("cat");
  if (cat && CAT_META.some(m => m[0] === cat)) {
    currentFilter = cat;
    renderPills();
  }
  const sort = params.get("sort");
  if (sort === "az" || sort === "za") {
    currentSort = sort;
    if (sortSelect) sortSelect.value = sort;
  }
  if ((cat && CAT_META.some(m => m[0] === cat)) || currentSort !== "cat") renderMods();

  const hash = location.hash;
  if (hash && /^#cl-[a-z0-9-]+$/i.test(hash)) {
    activateTab("changelog", false);
    setTimeout(scrollToHashArticle, 150);
  }
  if (hash && /^#faq-\d+$/.test(hash)) {
    activateTab("faq", false);
    setTimeout(() => {
      const el = document.getElementById(hash.slice(1));
      if (el) { el.open = true; el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "center" }); }
    }, 150);
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
  mobileNav.setAttribute("aria-hidden", String(!open));
  burgerBtn.setAttribute("aria-expanded", String(open));
});

mobileNav.querySelectorAll(".mnav-link").forEach(link => {
  link.addEventListener("click", () => {
    burgerBtn.classList.remove("open");
    mobileNav.classList.remove("open");
    mobileNav.setAttribute("aria-hidden", "true");
    const tab = link.dataset.tab;
    if (tab) {
      activateTab(tab);
      document.getElementById("info").scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
      const panel = document.getElementById("tab-" + tab);
      if (panel) panel.focus();
    }
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

  let running = false;
  let rafId = null;
  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pts.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy; p.o -= 0.0008;
      if (p.y < -5 || p.o <= 0) pts[i] = make();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.c},${p.o})`;
      ctx.fill();
    });
    if (running) rafId = requestAnimationFrame(loop);
  }
  const obs = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !running) {
      running = true;
      rafId = requestAnimationFrame(loop);
    } else if (!entry.isIntersecting && running) {
      running = false;
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    }
  }, { threshold: 0 });
  obs.observe(hero);
  running = true;
  rafId = requestAnimationFrame(loop);
})();

/* =====================================================================
   ANCRES DOUCES — boutons hero "Comment rejoindre ?"
===================================================================== */
document.querySelectorAll('a[data-scroll]').forEach(a => {
  a.addEventListener("click", e => {
    const target = document.querySelector(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
  });
});

/* =====================================================================
   PWA — enregistrement du service worker (offline + installable)
   + détection de mise à jour via SW updatefound
===================================================================== */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").then(reg => {
      reg.addEventListener("updatefound", () => {
        const sw = reg.installing;
        if (!sw) return;
        sw.addEventListener("statechange", () => {
          if (sw.state === "installed" && navigator.serviceWorker.controller) {
            showUpdateBanner();
          }
        });
      });
    }).catch(() => {});
  });
}

/* =====================================================================
   AUTO-REFRESH — détection de changement via HEAD polling (toutes les 5 min)
   Comparaison ETag / Last-Modified de la page courante.
   Fallback au SW updatefound ci-dessus pour les cas où le CDN cache trop.
===================================================================== */
function showUpdateBanner() {
  if (document.getElementById("update-banner")) return;
  const div = document.createElement("div");
  div.id = "update-banner";
  div.setAttribute("role", "status");

  const msg = document.createElement("p");
  msg.textContent = "🔄 Le site a été mis à jour";

  const reloadBtn = document.createElement("button");
  reloadBtn.textContent = "Recharger";
  reloadBtn.className = "update-reload";
  reloadBtn.addEventListener("click", () => location.reload());

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "✕";
  closeBtn.className = "update-close";
  closeBtn.setAttribute("aria-label", "Fermer");
  closeBtn.addEventListener("click", () => div.remove());

  div.append(msg, reloadBtn, closeBtn);
  document.body.appendChild(div);
}

(function initAutoRefresh() {
  let knownTag = null;

  async function check() {
    try {
      const r = await fetch(location.pathname, { method: "HEAD", cache: "no-store" });
      const tag = r.headers.get("etag") || r.headers.get("last-modified");
      if (!tag) return;
      if (knownTag === null) { knownTag = tag; return; }
      if (knownTag !== tag) { knownTag = tag; showUpdateBanner(); }
    } catch (_) {}
  }

  setTimeout(check, 20000);
  setInterval(check, 5 * 60 * 1000);
})();

/* =====================================================================
   Spotlight souris sur cartes — inspiré de 21st.dev (2026-06-09)
   BLOC AMOVIBLE : supprimer cet IIFE, ou `git restore js/app.js`.
   Pose --mx/--my (position curseur) sur la carte survolée. rAF-throttle,
   delegation unique, ignoré au clavier/tactile et si reduced-motion.
   ===================================================================== */
(function initCardSpotlight() {
  const mm = window.matchMedia;
  if (mm && (mm("(prefers-reduced-motion: reduce)").matches || mm("(hover: none)").matches)) return;

  const SEL = ".step-card, .feature-item, .cmd-card, .download-banner";
  let queued = false, el = null, x = 0, y = 0;

  document.addEventListener("pointermove", (e) => {
    if (e.pointerType === "touch") return;
    const card = e.target.closest(SEL);
    if (!card) return;
    el = card; x = e.clientX; y = e.clientY;
    if (!queued) {
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", (x - r.left) + "px");
        el.style.setProperty("--my", (y - r.top) + "px");
      });
    }
  }, { passive: true });
})();

/* =====================================================================
   ENHANCEMENTS — Vague 2 · composants communautaires 21st.dev · AMOVIBLE
   Number Ticker, Retro Grid + Meteors (injectés dans le héros), 3D Tilt.
   Retrait : supprimer cet IIFE, ou `git restore js/app.js`.
   ===================================================================== */
(function initWave2FX() {
  const mm = window.matchMedia;
  const reduce = mm && mm("(prefers-reduced-motion: reduce)").matches;
  const touch  = mm && mm("(hover: none)").matches;

  /* 1 — Number Ticker : compte de 0 → valeur quand le chiffre entre à l'écran */
  (function numberTicker() {
    const els = document.querySelectorAll(".js-mod-count");
    if (!els.length || !("IntersectionObserver" in window)) return;
    const easeOut = t => 1 - Math.pow(1 - t, 3);
    const run = (el) => {
      const target = parseInt((el.textContent || "").replace(/\D/g, ""), 10);
      if (!target) return;
      if (reduce) { el.textContent = String(target); return; }
      const dur = 1100, t0 = performance.now();
      const step = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        el.textContent = String(Math.round(easeOut(p) * target));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.6 });
    els.forEach(el => io.observe(el));
  })();

  /* 2 — Retro Grid + Meteors : décor injecté dans le héros (index.html intact) */
  (function heroDecor() {
    const hero = document.querySelector(".hero");
    if (!hero) return;

    const grid = document.createElement("div");
    grid.className = "dm-retro-grid";
    grid.setAttribute("aria-hidden", "true");
    grid.innerHTML = '<div class="dm-retro-grid__plane"></div>';
    hero.appendChild(grid);

    if (reduce) return;
    const layer = document.createElement("div");
    layer.className = "dm-meteor-layer";
    layer.setAttribute("aria-hidden", "true");
    for (let i = 0; i < 9; i++) {
      const m = document.createElement("span");
      m.className = "dm-meteor";
      m.style.left = (5 + Math.random() * 90) + "%";
      m.style.top  = (Math.random() * 45) + "%";
      m.style.animationDuration = (3.5 + Math.random() * 4) + "s";
      m.style.animationDelay = (Math.random() * 9) + "s";
      layer.appendChild(m);
    }
    hero.appendChild(layer);
  })();

  /* 3 — 3D Tilt : les cartes s'inclinent vers le curseur (--rx/--ry) */
  (function tiltCards() {
    if (reduce || touch) return;
    document.querySelectorAll(".step-card, .feature-item").forEach(card => {
      let raf = false, ev = null;
      card.addEventListener("pointermove", (e) => {
        if (e.pointerType === "touch") return;
        ev = e;
        if (raf) return;
        raf = true;
        requestAnimationFrame(() => {
          raf = false;
          const r = card.getBoundingClientRect();
          const px = (ev.clientX - r.left) / r.width  - 0.5;
          const py = (ev.clientY - r.top)  / r.height - 0.5;
          card.style.setProperty("--rx", (px * 7).toFixed(2) + "deg");
          card.style.setProperty("--ry", (-py * 7).toFixed(2) + "deg");
        });
      }, { passive: true });
      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      }, { passive: true });
    });
  })();
})();

/* =====================================================================
   DOCS LAYOUT — transforme les accordéons DonjonMC/Dashboard en
   navigation latérale + panneau (icônes SVG, tablist vertical ARIA).
   Les <details> d'index.html sont reconstruits au runtime ; la FAQ n'est
   pas touchée. Retrait : `git restore js/app.js css/style.css`.
   ===================================================================== */
(function initDocsLayout() {
  const svg = (inner) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;

  const ICONS = {
    progression: svg('<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>'),
    stats:       svg('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'),
    spells:      svg('<path d="M12 3l1.9 4.6L18.5 9l-4.6 1.9L12 15l-1.9-4.1L5.5 9l4.6-1.4z"/><path d="M19 14v4"/><path d="M21 16h-4"/><path d="M5 5v3"/><path d="M6.5 6.5h-3"/>'),
    quests:      svg('<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 12h6"/><path d="M9 16h6"/>'),
    punishment:  svg('<path d="m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>'),
    dungeons:    svg('<line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/>'),
    classes:     svg('<polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/><line x1="5" x2="9" y1="14" y2="18"/><line x1="7" x2="4" y1="17" y2="20"/>'),
    raid:        svg('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'),
    path:        svg('<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>'),
    navigation:  svg('<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>'),
    protection:  svg('<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'),
    comms:       svg('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'),
    deal:        svg('<path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/>'),
    chest:       svg('<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'),
    menu:        svg('<line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="1" x2="7" y1="14" y2="14"/><line x1="9" x2="15" y1="8" y2="8"/><line x1="17" x2="23" y1="16" y2="16"/>'),
    build:       svg('<path d="m15 12-8.4 8.4a1.4 1.4 0 1 1-3-3L12 9"/><path d="m18 15 3-3"/><path d="m21.5 11.5-1.9-1.9A2 2 0 0 1 19 8.2V7l-2.3-2.3a6 6 0 0 0-4.2-1.7L9 3l.9.8A6 6 0 0 1 12 8.4V10l2 2h1.2a2 2 0 0 1 1.4.6L18.5 14.5"/>'),
    passive:     svg('<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/>'),
    info:        svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>'),
  };

  /* Détection de l'icône via l'emoji du <summary> (plus fiable que le texte) */
  const EMOJI_TO_ICON = [
    ["📈", "progression"], ["⚡", "stats"], ["✨", "spells"], ["📋", "quests"],
    ["⚠", "punishment"], ["🏛", "dungeons"], ["⚔", "classes"], ["🗺", "navigation"],
    ["🔒", "protection"], ["💬", "comms"], ["🔄", "deal"], ["📦", "chest"],
    ["⚙", "menu"], ["🏗", "build"], ["🌿", "passive"], ["ℹ", "info"], ["👥", "raid"],
  ];
  const iconFor = (raw, tabId) => {
    for (const [emo, key] of EMOJI_TO_ICON) if (raw.indexOf(emo) !== -1) {
      if (key === "raid" && tabId === "tab-dashboard") return ICONS.raid; // Groupes
      if (key === "navigation" && tabId === "tab-donjonmc") return ICONS.path; // Parcours
      return ICONS[key];
    }
    return ICONS.info;
  };

  function build(tabId, label) {
    const tab = document.getElementById(tabId);
    if (!tab) return;
    const items = Array.prototype.slice.call(tab.querySelectorAll(":scope > details"));
    if (!items.length) return;

    const layout = document.createElement("div");
    layout.className = "docs-layout";
    const nav = document.createElement("div");
    nav.className = "docs-nav";
    nav.setAttribute("role", "tablist");
    nav.setAttribute("aria-orientation", "vertical");
    nav.setAttribute("aria-label", label);
    const panels = document.createElement("div");
    panels.className = "docs-panels";

    const buttons = [];

    items.forEach((d, i) => {
      const summary = d.querySelector("summary");
      const raw = summary ? summary.textContent.trim() : ("Section " + (i + 1));
      const title = raw.replace(/^[^0-9A-Za-zÀ-ÿ]+/, "").trim() || raw;
      const icon = iconFor(raw, tabId);
      const body = d.querySelector(".detail-body");
      const tId = tabId + "-dt" + i, pId = tabId + "-dp" + i;
      const first = i === 0;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "docs-nav-item" + (first ? " active" : "");
      btn.id = tId;
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-controls", pId);
      btn.setAttribute("aria-selected", first ? "true" : "false");
      btn.tabIndex = first ? 0 : -1;
      btn.innerHTML = icon + "<span>" + escapeHTML(title) + "</span>";
      nav.appendChild(btn);
      buttons.push(btn);

      const panel = document.createElement("section");
      panel.className = "docs-panel";
      panel.id = pId;
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", tId);
      panel.setAttribute("tabindex", "0");
      if (!first) panel.hidden = true;
      const h = document.createElement("h3");
      h.className = "docs-panel-title";
      h.innerHTML = icon + "<span>" + escapeHTML(title) + "</span>";
      panel.appendChild(h);
      if (body) panel.appendChild(body); else while (d.firstChild) { if (d.firstChild.tagName === "SUMMARY") d.removeChild(d.firstChild); else panel.appendChild(d.firstChild); }
      panels.appendChild(panel);
    });

    const select = (idx, focus) => {
      buttons.forEach((b, j) => {
        const on = j === idx;
        b.classList.toggle("active", on);
        b.setAttribute("aria-selected", on ? "true" : "false");
        b.tabIndex = on ? 0 : -1;
        panels.children[j].hidden = !on;
      });
      if (focus) buttons[idx].focus();
    };

    nav.addEventListener("click", (e) => {
      const b = e.target.closest(".docs-nav-item");
      if (b) select(buttons.indexOf(b), false);
    });
    nav.addEventListener("keydown", (e) => {
      const cur = buttons.findIndex(b => b.tabIndex === 0);
      let next = -1;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (cur + 1) % buttons.length;
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (cur - 1 + buttons.length) % buttons.length;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = buttons.length - 1;
      if (next !== -1) { e.preventDefault(); select(next, true); }
    });

    layout.appendChild(nav);
    layout.appendChild(panels);
    items[0].before(layout);
    items.forEach(d => d.remove());
  }

  build("tab-donjonmc", "Sections du guide DonjonMC");
  build("tab-dashboard", "Sections du guide Dashboard");
})();

/* =====================================================================
   SHADER GRADIENT WebGL — fond plasma/aurora animé du héros (vanilla).
   Sans lib externe (CSP script-src 'self'). Rendu basse résolution,
   pause hors-écran / onglet caché, statique si reduced-motion, fallback
   sur le fond existant si WebGL indisponible.
   Retrait : `git restore js/app.js css/style.css`.
   ===================================================================== */
(function initHeroShader() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const canvas = document.createElement("canvas");
  canvas.className = "dm-hero-shader";
  canvas.setAttribute("aria-hidden", "true");

  let gl;
  try {
    gl = canvas.getContext("webgl", { antialias: false, alpha: true, depth: false, premultipliedAlpha: false })
      || canvas.getContext("experimental-webgl");
  } catch (_) { gl = null; }
  if (!gl) return; // fallback : on garde aurore + particules + grille

  const VERT = "attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }";
  const FRAG = [
    "precision mediump float;",
    "uniform vec2 u_res; uniform float u_time;",
    "float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453123); }",
    "float noise(vec2 p){",
    "  vec2 i=floor(p), f=fract(p);",
    "  vec2 u=f*f*(3.0-2.0*f);",
    "  return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),u.x), mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0,1.0)),u.x), u.y);",
    "}",
    "float fbm(vec2 p){ float v=0.0,a=0.5; for(int i=0;i<4;i++){ v+=a*noise(p); p*=2.0; a*=0.5; } return v; }",
    "void main(){",
    "  vec2 uv = gl_FragCoord.xy / u_res.xy;",
    "  vec2 p = uv; p.x *= u_res.x / u_res.y;",
    "  float t = u_time * 0.06;",
    "  vec2 q = vec2(fbm(p*1.6 + t), fbm(p*1.6 + vec2(5.2,1.3) - t));",
    "  vec2 r = vec2(fbm(p*1.6 + 1.6*q + vec2(1.7,9.2) + t*1.2), fbm(p*1.6 + 1.6*q + vec2(8.3,2.8) - t*1.1));",
    "  float f = fbm(p*1.6 + 1.8*r);",
    "  vec3 cBg     = vec3(0.027,0.024,0.051);",
    "  vec3 cViolet = vec3(0.655,0.545,0.980);",
    "  vec3 cCyan   = vec3(0.133,0.827,0.933);",
    "  vec3 cPink   = vec3(0.941,0.671,0.988);",
    "  vec3 col = mix(cBg, cViolet, clamp(f*1.5, 0.0, 1.0));",
    "  col = mix(col, cCyan, clamp(r.x*0.85, 0.0, 1.0));",
    "  col = mix(col, cPink, clamp(q.y*0.6, 0.0, 1.0));",
    "  col = mix(col, cBg, clamp(length(r)*0.35, 0.0, 0.6));",
    "  float vig = smoothstep(1.15, 0.25, length(uv-0.5));",
    "  col = mix(cBg, col, vig);",
    "  gl_FragColor = vec4(col, 1.0);",
    "}",
  ].join("\n");

  function compile(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { gl.deleteShader(s); return null; }
    return s;
  }
  const vs = compile(gl.VERTEX_SHADER, VERT);
  const fs = compile(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return;
  const prog = gl.createProgram();
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const locP = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(locP);
  gl.vertexAttribPointer(locP, 2, gl.FLOAT, false, 0, 0);
  const uRes = gl.getUniformLocation(prog, "u_res");
  const uTime = gl.getUniformLocation(prog, "u_time");

  hero.insertBefore(canvas, hero.firstChild); // derrière aurore/particules/contenu

  const SCALE = 0.55; // rendu interne basse résolution (gradient flou : invisible)
  function resize() {
    const w = Math.max(1, Math.round(hero.clientWidth * SCALE));
    const h = Math.max(1, Math.round(hero.clientHeight * SCALE));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w; canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
    gl.uniform2f(uRes, w, h);
  }
  resize();
  if ("ResizeObserver" in window) new ResizeObserver(resize).observe(hero);
  else window.addEventListener("resize", resize, { passive: true });

  const mm = window.matchMedia;
  const reduce = mm && mm("(prefers-reduced-motion: reduce)").matches;
  let visible = true, raf = 0;
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((e) => { visible = e[0].isIntersecting; if (visible && !reduce) loop(); })
      .observe(hero);
  }
  document.addEventListener("visibilitychange", () => { if (!document.hidden && visible && !reduce) loop(); });

  const t0 = performance.now();
  function frame() {
    raf = 0;
    resize();
    gl.uniform1f(uTime, (performance.now() - t0) / 1000);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (visible && !document.hidden && !reduce) loop();
  }
  function loop() { if (!raf) raf = requestAnimationFrame(frame); }

  // Première image (et unique si reduced-motion)
  gl.uniform1f(uTime, 0);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  if (!reduce) loop();
})();

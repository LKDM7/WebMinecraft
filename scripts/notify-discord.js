#!/usr/bin/env node
/* DonjonMC — poste le dernier article de data/news.json sur Discord (webhook).
   Appelé par .github/workflows/discord-news.yml à chaque push modifiant news.json.

   Usage :
     DISCORD_WEBHOOK_URL=... node scripts/notify-discord.js --prev <ancien-news.json>
     DISCORD_WEBHOOK_URL=... node scripts/notify-discord.js --force   (test : poste sans comparer)

   Anti-doublon : ne poste que si le PREMIER article non obsolète a un titre
   différent de celui de la version précédente (--prev). Corriger un vieil
   article ne renvoie donc aucune notification. */

"use strict";
const fs = require("fs");
const path = require("path");

const SITE = "https://lkdm7.github.io/WebMinecraft/";
const ROOT = path.join(__dirname, "..");
const WEBHOOK = process.env.DISCORD_WEBHOOK_URL;

if (!WEBHOOK) { console.error("DISCORD_WEBHOOK_URL manquant"); process.exit(1); }

const args = process.argv.slice(2);
const force = args.includes("--force");
const prevPath = args.includes("--prev") ? args[args.indexOf("--prev") + 1] : null;

// Miroir de newsSlug() dans js/app.js (mêmes ancres #cl-… que le site)
function newsSlug(n) {
  const base = (n.title || "")
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return "cl-" + (base || "article");
}

const MONTHS_FR = ["JANV", "FÉVR", "MARS", "AVR", "MAI", "JUIN", "JUIL", "AOÛT", "SEPT", "OCT", "NOV", "DÉC"];
function newsDate(n) {
  const [mois, annee] = (n.my || "").split(" ");
  const mo = MONTHS_FR.indexOf(mois);
  return new Date(Date.UTC(parseInt(annee, 10) || 2026, mo < 0 ? 0 : mo, parseInt(n.day, 10) || 1, 12));
}

// HTML simplifié du body → markdown Discord
function htmlToMarkdown(html) {
  return String(html)
    .replace(/<strong>(.*?)<\/strong>/gi, "**$1**")
    .replace(/<code[^>]*>(.*?)<\/code>/gi, "`$1`")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<a [^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)")
    .replace(/<[^>]+>/g, "")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&#39;/g, "'").replace(/&amp;/g, "&")
    .trim();
}

function firstArticle(file) {
  try {
    const arr = JSON.parse(fs.readFileSync(file, "utf8"));
    return Array.isArray(arr) ? arr.find(n => !n.obsolete) || null : null;
  } catch (_) { return null; }
}

const latest = firstArticle(path.join(ROOT, "data", "news.json"));
if (!latest) { console.error("Aucun article non obsolète dans data/news.json"); process.exit(1); }

if (!force) {
  const prev = prevPath ? firstArticle(prevPath) : null;
  if (!prev) {
    // Pas de version précédente (premier déploiement de news.json) : on ne
    // poste pas, sinon le dernier article serait annoncé à chaque init.
    console.log("Pas de référence précédente — rien à poster (premier déploiement).");
    process.exit(0);
  }
  if (prev.title === latest.title) {
    console.log("Pas de nouvel article (titre inchangé) — rien à poster.");
    process.exit(0);
  }
}

const TAG_COLORS = { new: 0x22d3ee, event: 0xf0abfc, fix: 0xa78bfa, requis: 0xf87171 };
const url = `${SITE}?tab=changelog#${newsSlug(latest)}`;

let description = htmlToMarkdown(latest.body || "");
if (description.length > 3500) description = description.slice(0, 3500) + "…";

const embed = {
  title: latest.title.slice(0, 256),
  url,
  description,
  color: TAG_COLORS[latest.tag] || 0xa78bfa,
  timestamp: newsDate(latest).toISOString(),
  thumbnail: { url: SITE + "img/icon-192.jpg" },
  footer: { text: `DonjonMC · ${latest.label || latest.tag || "ACTU"}` },
};

if (latest.dls && latest.dls.length) {
  embed.fields = [{
    name: "📥 Téléchargements",
    value: latest.dls.map(d => `[${d.label.replace(/^⬇\s*/, "")}](${d.url})`).join("\n").slice(0, 1024),
  }];
}

const payload = {
  username: "DonjonMC — Actualités",
  avatar_url: SITE + "img/icon-192.jpg",
  embeds: [embed],
};

fetch(WEBHOOK, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
}).then(async r => {
  if (r.ok) { console.log(`Posté sur Discord : « ${latest.title} »`); }
  else { console.error(`Échec Discord ${r.status} : ${await r.text()}`); process.exit(1); }
}).catch(e => { console.error("Erreur réseau :", e.message); process.exit(1); });

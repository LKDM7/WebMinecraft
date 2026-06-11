#!/usr/bin/env node
/* DonjonMC — génère feed.xml (Atom) depuis data/news.json.
   Usage : npm run feed  (puis commit feed.xml avec news.json).
   Les articles marqués "obsolete" sont exclus du flux. */

"use strict";
const fs = require("fs");
const path = require("path");

const SITE = "https://lkdm7.github.io/WebMinecraft/";
const ROOT = path.join(__dirname, "..");

const MONTHS_FR = ["JANV", "FÉVR", "MARS", "AVR", "MAI", "JUIN", "JUIL", "AOÛT", "SEPT", "OCT", "NOV", "DÉC"];

// Miroir de newsSlug() dans js/app.js — les liens du flux pointent vers les
// mêmes ancres #cl-<slug> que les boutons 🔗 du site.
function newsSlug(n) {
  const base = (n.title || "")
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return "cl-" + (base || "article");
}

function newsDate(n) {
  const [mois, annee] = (n.my || "").split(" ");
  const mo = MONTHS_FR.indexOf(mois);
  return new Date(Date.UTC(parseInt(annee, 10) || 2026, mo < 0 ? 0 : mo, parseInt(n.day, 10) || 1, 12));
}

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const news = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "news.json"), "utf8"));
const entries = news
  .filter(n => !n.obsolete)
  .sort((a, b) => newsDate(b) - newsDate(a));

if (!entries.length) { console.error("Aucun article non obsolète dans data/news.json"); process.exit(1); }

const updated = newsDate(entries[0]).toISOString();

const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="fr">
  <title>Actualités DonjonMC</title>
  <subtitle>Mises à jour du serveur Minecraft moddé DonjonMC (NeoForge 1.21.1)</subtitle>
  <link href="${SITE}" />
  <link href="${SITE}feed.xml" rel="self" type="application/atom+xml" />
  <id>${SITE}</id>
  <updated>${updated}</updated>
  <icon>${SITE}img/icon-192.jpg</icon>
${entries.map(n => {
  const url = `${SITE}?tab=changelog#${newsSlug(n)}`;
  const dls = (n.dls || []).map(d => `<p><a href="${esc(d.url)}">${esc(d.label)}</a></p>`).join("");
  return `  <entry>
    <title>${esc(n.title)}</title>
    <link href="${esc(url)}" />
    <id>${esc(url)}</id>
    <updated>${newsDate(n).toISOString()}</updated>
    <category term="${esc(n.label || n.tag || "")}" />
    <content type="html">${esc(`<p>${n.body || ""}</p>${dls}`)}</content>
  </entry>`;
}).join("\n")}
</feed>
`;

fs.writeFileSync(path.join(ROOT, "feed.xml"), xml);
console.log(`feed.xml généré — ${entries.length} articles, dernière MAJ ${updated}`);

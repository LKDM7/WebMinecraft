/* =====================================================================
   DonjonMC — Générateur d'IP chiffrée
   =====================================================================
   Utilité : si tu changes l'IP du serveur ou la date d'ouverture,
   relance ce script pour régénérer le bloc "ipCipher" de js/app.js.

   Usage (dans un terminal, depuis le dossier du projet) :
     node scripts/encrypt-ip.js "NOUVELLE.IP:PORT" "2026-06-05T21:00:00+02:00"

   Puis copie les valeurs iv / data affichées dans js/app.js → CONFIG.ipCipher
   (garde le même "salt"). Ne commit JAMAIS l'IP en clair.
   ===================================================================== */

const crypto = require("crypto");

const IP     = process.argv[2];
const LAUNCH = process.argv[3] || "2026-06-05T21:00:00+02:00";

if (!IP) {
  console.error('Usage : node scripts/encrypt-ip.js "IP:PORT" ["DATE_ISO"]');
  process.exit(1);
}
const SALT   = "hunter-gate-v1"; // doit rester identique à CONFIG.ipCipher.salt

const passphrase = "DonjonMC|" + LAUNCH + "|" + SALT;
const key = crypto.createHash("sha256").update(passphrase).digest();
const iv  = crypto.randomBytes(12);
const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
const payload = Buffer.concat([cipher.update(IP, "utf8"), cipher.final(), cipher.getAuthTag()]);

console.log("\n  ipCipher: {");
console.log('    iv:   "' + iv.toString("base64") + '",');
console.log('    data: "' + payload.toString("base64") + '",');
console.log('    salt: "' + SALT + '",');
console.log("  },\n");

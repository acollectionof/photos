// Run with: node build.js
const fs = require("fs");
const path = require("path");

const photosDir = path.join(__dirname, "photos");
const outFile = path.join(__dirname, "photos.json");

const exts = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

const files = fs.readdirSync(photosDir)
  .filter(f => exts.has(path.extname(f).toLowerCase()))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

const urls = files.map(f => `photos/${encodeURIComponent(f)}`);

fs.writeFileSync(outFile, JSON.stringify(urls, null, 2));
console.log(`Generated photos.json with ${urls.length} images`);

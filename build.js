// build.js
// Run with: node build.js
const fs = require("fs");
const path = require("path");

const photosDir = path.join(__dirname, "photos");
const outFile = path.join(__dirname, "photos.json");

// Allowed image extensions
const exts = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

if (!fs.existsSync(photosDir)) {
  console.error("No ./photos folder found. Create it and add images.");
  process.exit(1);
}

const files = fs.readdirSync(photosDir, { withFileTypes: true })
  .filter(d => d.isFile())
  .map(d => d.name)
  // ignore hidden files like .DS_Store
  .filter(name => !name.startsWith("."))
  // keep only images
  .filter(name => exts.has(path.extname(name).toLowerCase()))
  // stable sort (case-insensitive + numeric-friendly)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));

const urls = files.map(name => `photos/${encodeURIComponent(name)}`);

fs.writeFileSync(outFile, JSON.stringify(urls, null, 2));
console.log(`Generated photos.json with ${urls.length} images`);

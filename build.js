// Run with: node build.js
const fs = require("fs");
const path = require("path");

const imagesDir = path.join(__dirname, "images");
const outFile = path.join(__dirname, "photos.json");

const exts = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

if (!fs.existsSync(imagesDir)) {
  console.error("No ./images folder found.");
  process.exit(1);
}

const files = fs.readdirSync(imagesDir, { withFileTypes: true })
  .filter(d => d.isFile())
  .map(d => d.name)
  .filter(name => !name.startsWith("."))
  .filter(name => exts.has(path.extname(name).toLowerCase()))
  .sort((a, b) => a.localeCompare(b, undefined, {
    numeric: true,
    sensitivity: "base"
  }));

const urls = files.map(name => `images/${encodeURIComponent(name)}`);

fs.writeFileSync(outFile, JSON.stringify(urls, null, 2));
console.log(`Generated photos.json with ${urls.length} images`);

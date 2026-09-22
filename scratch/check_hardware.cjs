const fs = require('fs');

const warshipContent = fs.readFileSync('src/codex/articles/warshipArticles.ts', 'utf8');
console.log('=== warshipArticles.ts sample ===');
const warshipSlugs = [...warshipContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
console.log('Warship slugs (' + warshipSlugs.length + '):', warshipSlugs);

const aircraftContent = fs.readFileSync('src/codex/articles/aircraftArticles.ts', 'utf8');
const aircraftSlugs = [...aircraftContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
console.log('Aircraft slugs (' + aircraftSlugs.length + '):', aircraftSlugs.slice(0, 20));

const starshipContent = fs.readFileSync('src/codex/articles/starshipArticles.ts', 'utf8');
const starshipSlugs = [...starshipContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
console.log('Starship slugs (' + starshipSlugs.length + '):', starshipSlugs);

const vehicleContent = fs.readFileSync('src/codex/articles/vehicleArticles.ts', 'utf8');
const vehicleSlugs = [...vehicleContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
console.log('Vehicle slugs (' + vehicleSlugs.length + '):', vehicleSlugs);

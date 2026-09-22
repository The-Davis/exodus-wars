const fs = require('fs');
const path = require('path');

const dir = 'src/codex/articles';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

const articlesByCategory = {};
const allArticles = [];

for (const file of files) {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    const articleBlocks = content.split(/\{\s*['"]?id['"]?\s*:\s*\d+/);
    for (const block of articleBlocks) {
        const slugMatch = block.match(/['"]?slug['"]?\s*:\s*['"]([^'"]+)['"]/);
        const titleMatch = block.match(/['"]?title['"]?\s*:\s*['"]([^'"]+)['"]/);
        const catsMatch = block.match(/['"]?categories['"]?\s*:\s*\[([^\]]*)\]/);
        if (slugMatch && titleMatch) {
            const slug = slugMatch[1];
            const title = titleMatch[1];
            const cats = catsMatch ? catsMatch[1].split(',').map(c => c.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean) : [];
            allArticles.push({ slug, title, cats, file });
            for (const cat of cats) {
                if (!articlesByCategory[cat]) articlesByCategory[cat] = [];
                articlesByCategory[cat].push({ slug, title, file });
            }
        }
    }
}

console.log('Total articles found:', allArticles.length);

const targets = [
    'Destroyers', 'Battleships', 'Cruisers', 'Frigates', 'Corvettes', 'Carriers', 'Warships',
    'Starships', 'Bombers', 'VTOLs', 'Transport_Aircraft', 'Transport Aircraft', 'Recon_Aircraft', 'Recon Aircraft',
    'Aircraft', 'Atmospheric_Craft', 'Atmospheric Craft',
    'Freighters', 'Starliners', 'Exploration_Vessels', 'Exploration Vessels', 'Colony_Ships', 'Colony Ships',
    'Vehicles', 'Tanks', 'Rigs', 'Civilian_Vehicles', 'Civilian Vehicles', 'Satellites', 'Imperial_Military_M-Series', 'Imperial Military M-Series',
    'Infantry_Equipment_Profiles', 'Infantry Equipment Profiles', 'Imperial_Military_Specification', 'Imperial Military Specification'
];

for (const t of targets) {
    const list = articlesByCategory[t] || [];
    if (list.length > 0) {
        console.log(`${t}: ${list.length} articles`);
        console.log('   ->', list.map(a => a.title).join(', '));
    } else {
        console.log(`${t}: 0 articles`);
    }
}

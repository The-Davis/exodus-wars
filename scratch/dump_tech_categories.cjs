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
        const summaryMatch = block.match(/['"]?summary['"]?\s*:\s*['"]([^'"]+)['"]/);
        const catsMatch = block.match(/['"]?categories['"]?\s*:\s*\[([^\]]*)\]/);
        if (slugMatch && titleMatch) {
            const slug = slugMatch[1];
            const title = titleMatch[1];
            const summary = summaryMatch ? summaryMatch[1] : '';
            const cats = catsMatch ? catsMatch[1].split(',').map(c => c.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean) : [];
            const item = { slug, title, summary, cats, file };
            allArticles.push(item);
            for (const cat of cats) {
                if (!articlesByCategory[cat]) articlesByCategory[cat] = [];
                articlesByCategory[cat].push(item);
            }
        }
    }
}

const targets = [
    'Battleships', 'Cruisers', 'Destroyers', 'Frigates', 'Corvettes', 'Carriers', 'Warships',
    'Bombers', 'VTOLs', 'Transport Aircraft', 'Transport_Aircraft', 'Recon Aircraft', 'Recon_Aircraft',
    'Atmospheric Craft', 'Atmospheric_Craft',
    'Freighters', 'Starliners', 'Exploration Vessels', 'Exploration_Vessels', 'Colony Ships', 'Colony_Ships',
    'Tanks', 'Rigs', 'Civilian Vehicles', 'Civilian_Vehicles', 'Imperial Military M-Series', 'Imperial_Military_M-Series',
    'Infantry Equipment Profiles', 'Imperial Military Specification', 'Satellites'
];

for (const t of targets) {
    const list = articlesByCategory[t] || [];
    console.log(`=== ${t} (${list.length}) ===`);
    list.forEach(a => console.log(`  - [[${a.slug}|${a.title}]]`));
}

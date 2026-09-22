const fs = require('fs');
const path = require('path');

const dir = 'src/codex/articles';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

const articlesByCategory = {};

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
            for (const cat of cats) {
                if (!articlesByCategory[cat]) articlesByCategory[cat] = [];
                articlesByCategory[cat].push({ slug, title });
            }
        }
    }
}

const targets = ['Battleships', 'Cruisers', 'Destroyers', 'Frigates', 'Corvettes', 'Carriers', 'Warships', 'Bombers', 'VTOLs'];
for (const t of targets) {
    const list = articlesByCategory[t] || [];
    console.log(`=== ${t} (${list.length}) ===`);
    list.forEach(a => console.log(`  - [[${a.slug}|${a.title}]]`));
}

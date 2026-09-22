const fs = require('fs');

const content = fs.readFileSync('src/codex/articles/techStarshipsArticles.ts', 'utf8');
const items = [...content.matchAll(/slug:\s*['"]([^'"]+)['"][\s\S]*?title:\s*['"]([^'"]+)['"][\s\S]*?rawContent:\s*[`'"]([\s\S]*?)[`'"]/g)];
console.log('Items in techStarshipsArticles.ts: ' + items.length);
for (const item of items) {
    const slug = item[1];
    const title = item[2];
    const raw = item[3].trim();
    console.log(`- ${title} (${slug}) -> rawContent length: ${raw.length}`);
}

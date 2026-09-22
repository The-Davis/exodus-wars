const fs = require('fs');

function checkFile(file) {
    if (!fs.existsSync(file)) return [];
    const content = fs.readFileSync(file, 'utf8');
    return [...content.matchAll(/['"]?slug['"]?\s*:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
}

console.log('placesSubcategoryArticles:', checkFile('src/codex/articles/placesSubcategoryArticles.ts'));
console.log('nationsSubcategoryArticles:', checkFile('src/codex/articles/nationsSubcategoryArticles.ts'));
console.log('techSubcategoryArticles:', checkFile('src/codex/articles/techSubcategoryArticles.ts'));
console.log('peopleSubcategoryArticles:', checkFile('src/codex/articles/peopleSubcategoryArticles.ts'));

const fs = require('fs');

function checkEmpty(file) {
    const content = fs.readFileSync(file, 'utf8');
    const items = [...content.matchAll(/slug:\s*['"]([^'"]+)['"][\s\S]*?rawContent:\s*['"`]([\s\S]*?)['"`]/g)];
    for (const it of items) {
        if (!it[2].trim()) {
            console.log('Empty in ' + file + ': ' + it[1]);
        }
    }
}

checkEmpty('src/codex/articles/techStarshipsArticles.ts');
checkEmpty('src/codex/articles/techSubcategoryArticles.ts');

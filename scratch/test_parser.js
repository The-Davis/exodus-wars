const fs = require('fs');
const path = require('path');

function parseMarkdownArticle(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let title = path.basename(filePath, '.md');
  let pageId = 0;
  let author = 'JDavis';
  let lastUpdated = '';
  let categories = [];
  let rawContent = content;

  if (content.startsWith('---')) {
    const endFm = content.indexOf('\n---', 3);
    if (endFm !== -1) {
      const fm = content.substring(3, endFm);
      rawContent = content.substring(endFm + 4).trim();

      const titleM = fm.match(/title:\s*["']?(.*?)["']?$/m);
      if (titleM) title = titleM[1].trim();

      const idM = fm.match(/page_id:\s*(\d+)/m);
      if (idM) pageId = parseInt(idM[1], 10);

      const authorM = fm.match(/author:\s*["']?(.*?)["']?$/m);
      if (authorM) author = authorM[1].trim();

      const dateM = fm.match(/last_updated:\s*["']?(.*?)["']?$/m);
      if (dateM) lastUpdated = dateM[1].trim();

      const catBlockM = fm.match(/categories:\s*\n((?:\s*-\s*["']?.*?["']?\n?)*)/);
      if (catBlockM && catBlockM[1]) {
        const lines = catBlockM[1].split('\n');
        for (const line of lines) {
          const itemM = line.match(/^\s*-\s*["']?(.*?)["']?$/);
          if (itemM && itemM[1].trim()) {
            categories.push(itemM[1].trim().replace(/_/g, ' '));
          }
        }
      }
    }
  }

  // Also extract [[Category:...]] tags from rawContent
  const catRegex = /\[\[Category:([^\]|]+)(?:\|[^\]]*)?\]\]/g;
  let match;
  while ((match = catRegex.exec(rawContent)) !== null) {
    const cat = match[1].trim().replace(/_/g, ' ');
    if (!categories.includes(cat)) {
      categories.push(cat);
    }
  }

  // Generate clean summary
  let cleanText = rawContent
    .replace(/\{\{[\s\S]*?\}\}/g, '')
    .replace(/\[\[(?:[^\]|]+\|)?([^\]]+)\]\]/g, '$1')
    .replace(/'''?/g, '')
    .replace(/==+[^=]+==+/g, '')
    .replace(/\[\[Category:[^\]]+\]\]/gi, '')
    .replace(/\|[^\n]*/g, '')
    .trim();
  let summary = cleanText.substring(0, 160).replace(/\r?\n+/g, ' ').trim();
  if (cleanText.length > 160) summary += '...';

  const slug = path.basename(filePath, '.md');

  return {
    id: pageId,
    slug,
    title: title.replace(/_/g, ' '),
    author,
    lastUpdated,
    summary,
    categories,
    rawContent
  };
}

const test1 = parseMarkdownArticle('c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/articles/2001.md');
console.log('Test 2001.md:', { id: test1.id, slug: test1.slug, title: test1.title, categories: test1.categories });

const test2 = parseMarkdownArticle('c:/Users/jdavi/Documents/GitHub/exodus-wars/wiki/categories/Star_Systems.md');
console.log('Test Star_Systems.md:', { id: test2.id, slug: test2.slug, title: test2.title, categories: test2.categories });

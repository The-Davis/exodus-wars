const fs = require('fs');
const path = require('path');

const repoRoot = 'c:/Users/jdavi/Documents/GitHub/exodus-wars';
const articlesDir = path.join(repoRoot, 'wiki/articles');
const categoriesDir = path.join(repoRoot, 'wiki/categories');
const imagesDir = path.join(repoRoot, 'images');
const publicCodexDir = path.join(repoRoot, 'public/assets/codex');
const imagesManifestPath = path.join(repoRoot, 'wiki/manifests/images_manifest.json');
const pagesIndexPath = path.join(repoRoot, 'wiki/manifests/pages_index.json');

const articleFiles = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));
const categoryFiles = fs.readdirSync(categoriesDir).filter(f => f.endsWith('.md'));

console.log(`Starting mass migration.`);
console.log(`Remaining articles: ${articleFiles.length}, Remaining categories: ${categoryFiles.length}`);

// Category group definitions
const placesCats = new Set([
  'Star Systems', 'Sectors', 'Spiral Arms', 'Galaxies', 'Planets', 'Moons',
  'Star_Systems', 'Sectors', 'Spiral_Arms', 'Galaxies', 'Planets', 'Moons'
]);
const placesCatFiles = new Set([
  'Star_Systems.md', 'Sectors.md', 'Spiral_Arms.md', 'Galaxies.md', 'Planets.md', 'Moons.md'
]);

const techCats = new Set([
  'Starships', 'Starship', 'Vehicles', 'Aircraft', 'Imperial Military M-Series', 'Antimatter',
  'Imperial_Military_M-Series', 'Technology'
]);
const techCatFiles = new Set([
  'Starships.md', 'Starship.md', 'Vehicles.md', 'Aircraft.md', 'Imperial_Military_M-Series.md', 'Antimatter.md',
  'Technology.md'
]);

const seriesCats = new Set([
  'Tempest War Series', 'Second Exodus War Series', 'Machinations of the Conclave Series',
  'Mesarthrim Civil War Series', 'Volucris War Series', 'Books', 'Carriers Series',
  'Old Stories', 'Malice of the Meroniri Series', 'Second Exodus Wars Series',
  'Tempest_War_Series', 'Second_Exodus_War_Series', 'Machinations_of_the_Conclave_Series',
  'Mesarthrim_Civil_War_Series', 'Volucris_War_Series', 'Carriers_Series',
  'Old_Stories', 'Malice_of_the_Meroniri_Series', 'Books'
]);
const seriesCatFiles = new Set([
  'Tempest_War_Series.md', 'Second_Exodus_War_Series.md', 'Machinations_of_the_Conclave_Series.md',
  'Mesarthrim_Civil_War_Series.md', 'Volucris_War_Series.md', 'Carriers_Series.md',
  'Old_Stories.md', 'Malice_of_the_Meroniri_Series.md', 'Books.md'
]);

const langCats = new Set([
  'Languages', 'Terminology', 'Uniforms',
  'Archadians', 'Anderung', 'Gorhamut', 'Mtomigru', 'Sirunaki', 'Sirunaki_Reshkeren', 'Thezerops', 'Race'
]);
const langCatFiles = new Set([
  'Languages.md', 'Terminology.md', 'Uniforms.md',
  'Archadians.md', 'Anderung.md', 'Gorhamut.md', 'Mtomigru.md', 'Sirunaki.md', 'Sirunaki_Reshkeren.md', 'Thezerops.md', 'Race.md'
]);

const nationsCats = new Set([
  'Federated Districts of the Prefecture', 'Federated_Districts_of_the_Prefecture',
  'Onyx Empire', 'Onyx_Empire', 'Onyx Empire Military', 'Onyx_Empire_Military',
  'United Earth Alliance', 'United_Earth_Alliance',
  'Colonial Commonwealth', 'Colonial_Commonwealth',
  'Meroniri Terinasi', 'Meroniri_Terinasi',
  'Rikaz o Fii Huern iv Lorithan', 'Rikaz_o_Fii_Huern_iv_Lorithan',
  'Rikaz o Fii Cai iv Huerna', 'Rikaz_o_Fii_Cai_iv_Huerna',
  'Ikronin Jurekön', 'Ikronin_Jurekön', 'Icronian Consortium', 'Icronian_Consortium',
  'Auellal League', 'Auellal_League', 'Auellal City-States', 'Auellal_City-States',
  'United Mesarthrim Clans', 'United_Mesarthrim_Clans', 'Mesarthrim Federation', 'Mesarthrim_Federation',
  'United Centusi States', 'United_Centusi_States',
  'Reigess Suverände', 'Reigess_Suverände', 'Reigess Sovereignty', 'Reigess_Sovereignty',
  'Taviridis Somarchada', 'Taviridis_Somarchada',
  'Sirius Families', 'Sirius_Families', 'Berlusconi Family Territory', 'Berlusconi_Family_Territory',
  'Nakamura Family Territory', 'Nakamura_Family_Territory', 'Asanova Family Territory',
  'Sol System Authority', 'Sol_System_Authority',
  'Kalidasa Planetary Authority', 'Kalidasa_Planetary_Authority',
  'Militaries', 'The Remnant', 'The_Remnant',
  'Alliance of Planets', 'Alliance_of_Planets', 'Alliance',
  'Kabila Kimburu', 'Kabila_Kimburu', "Kabila iku Gol'nde", "Kabila_iku_Gol'nde",
  "Kabila Jitu'nge", "Kabila_Jitu'nge", 'Krlbila Grlnudr', 'Krlbila_Grlnudr',
  "Krlbila Jitu'nge", "Krlbila_Jitu'nge", 'Ologrian Kabila Duka', 'Ologrian_Kabila_Duka',
  "Oronus Worker's Coalition", "Oronus_Worker's_Coalition",
  'Overseer Administration', 'Overseer_Administration',
  'Volucris Swarm', 'Volucris_Swarm', 'Volucris Swarms', 'Volucris_Swarms',
  'Ixoarchada Iridi', 'Ixoarchada_Iridi', 'Jurazoar Maropsene', 'Jurazoar_Maropsene',
  'Yurtosh hora ven Serthra', 'Yurtosh_hora_ven_Serthra', 'Sirunaki Reshkeren'
]);
const nationsCatFiles = new Set([
  'Federated_Districts_of_the_Prefecture.md', 'Onyx_Empire.md', 'Onyx_Empire_Military.md',
  'United_Earth_Alliance.md', 'Colonial_Commonwealth.md', 'Meroniri_Terinasi.md',
  'Rikaz_o_Fii_Huern_iv_Lorithan.md', 'Rikaz_o_Fii_Cai_iv_Huerna.md',
  'Ikronin_Jurekön.md', 'Icronian_Consortium.md', 'Auellal_League.md', 'Auellal_City-States.md',
  'United_Mesarthrim_Clans.md', 'Mesarthrim_Federation.md', 'United_Centusi_States.md',
  'Reigess_Suverände.md', 'Reigess_Sovereignty.md', 'Taviridis_Somarchada.md',
  'Sirius_Families.md', 'Berlusconi_Family_Territory.md', 'Nakamura_Family_Territory.md',
  'Sol_System_Authority.md', 'Kalidasa_Planetary_Authority.md', 'Militaries.md',
  'The_Remnant.md', 'Alliance_of_Planets.md', 'Alliance.md',
  'Kabila_Kimburu.md', "Kabila_iku_Gol'nde.md", "Kabila_Jitu'nge.md",
  'Krlbila_Grlnudr.md', "Krlbila_Jitu'nge.md", 'Ologrian_Kabila_Duka.md',
  "Oronus_Worker's_Coalition.md", 'Overseer_Administration.md',
  'Volucris_Swarm.md', 'Volucris_Swarms.md',
  'Ixoarchada_Iridi.md', 'Jurazoar_Maropsene.md', 'Yurtosh_hora_ven_Serthra.md'
]);

function parseArticle(filePath, isCategoryHub = false, defaultCat = null) {
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

  if (isCategoryHub && !categories.includes('Categories')) {
    categories.unshift('Categories');
  }

  if (defaultCat && !categories.includes(defaultCat)) {
    categories.push(defaultCat);
  }

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
  if (!summary) summary = title.replace(/_/g, ' ');

  const slug = path.basename(filePath, '.md');

  return {
    id: pageId,
    slug,
    title: title.replace(/_/g, ' '),
    author,
    lastUpdated,
    summary,
    categories,
    rawContent,
    filePath
  };
}

const placesList = [];
const techList = [];
const seriesList = [];
const yearsList = [];
const langList = [];
const nationsList = [];

// 1. Process category hubs
for (const f of categoryFiles) {
  const fullPath = path.join(categoriesDir, f);
  if (placesCatFiles.has(f)) {
    placesList.push(parseArticle(fullPath, true));
  } else if (techCatFiles.has(f)) {
    techList.push(parseArticle(fullPath, true));
  } else if (seriesCatFiles.has(f)) {
    seriesList.push(parseArticle(fullPath, true));
  } else if (langCatFiles.has(f)) {
    langList.push(parseArticle(fullPath, true));
  } else if (nationsCatFiles.has(f)) {
    nationsList.push(parseArticle(fullPath, true));
  }
}

// 2. Process articles
for (const f of articleFiles) {
  const fullPath = path.join(articlesDir, f);
  const content = fs.readFileSync(fullPath, 'utf8');
  const catRegex = /\[\[Category:([^\]|]+)(?:\|[^\]]*)?\]\]/g;
  let cats = [];
  let m;
  while ((m = catRegex.exec(content)) !== null) {
    cats.push(m[1].trim());
  }

  const titleNoExt = f.replace('.md', '');
  if (/^\d+(?:BC|AD)?$/.test(titleNoExt) || /Events of \d+/.test(content)) {
    yearsList.push(parseArticle(fullPath, false, 'Years'));
    continue;
  }

  if (cats.some(c => placesCats.has(c)) || /_System\.md$/i.test(f) || /\{\{Star[_ ]Information/i.test(content) || /\{\{Stellar[_ ]Navigation/i.test(content)) {
    placesList.push(parseArticle(fullPath, false));
  } else if (cats.some(c => techCats.has(c)) || /\{\{Starship[_ ]Information/i.test(content) || /_Class_(?:Battleship|Cruiser|Destroyer|Frigate|Corvette|Carrier|Monitor)/i.test(f)) {
    techList.push(parseArticle(fullPath, false));
  } else if (cats.some(c => seriesCats.has(c))) {
    seriesList.push(parseArticle(fullPath, false));
  } else if (cats.some(c => langCats.has(c))) {
    langList.push(parseArticle(fullPath, false));
  } else if (cats.some(c => nationsCats.has(c))) {
    nationsList.push(parseArticle(fullPath, false));
  }
}

console.log(`Places: ${placesList.length}`);
console.log(`Tech/Vehicles: ${techList.length}`);
console.log(`Series: ${seriesList.length}`);
console.log(`Years: ${yearsList.length}`);
console.log(`Languages/Culture: ${langList.length}`);
console.log(`Nations Archives: ${nationsList.length}`);
const allMigrated = [...placesList, ...techList, ...seriesList, ...yearsList, ...langList, ...nationsList];
console.log(`Total items to migrate: ${allMigrated.length}`);

// 3. Image relocation
const imagesInDir = fs.readdirSync(imagesDir);
const manifest = JSON.parse(fs.readFileSync(imagesManifestPath, 'utf8'));
const manifestMap = new Map();
for (const entry of manifest) {
  if (entry.image_name) manifestMap.set(entry.image_name.toLowerCase(), entry);
  if (entry.disk_filename) manifestMap.set(entry.disk_filename.toLowerCase(), entry);
}

const referencedImages = new Set();
for (const art of allMigrated) {
  const imgRegex1 = /\[\[Image:([^\]|]+)/gi;
  let match;
  while ((match = imgRegex1.exec(art.rawContent)) !== null) {
    referencedImages.add(match[1].trim());
  }
  const imgRegex2 = /image\s*=\s*([^|\r\n]+)/gi;
  while ((match = imgRegex2.exec(art.rawContent)) !== null) {
    let val = match[1].trim().replace(/\[\[Image:/i, '').replace(/\]\]/i, '').trim();
    if (val) referencedImages.add(val);
  }
}

console.log(`Referenced images across migrated articles: ${referencedImages.size}`);
let relocatedImagesCount = 0;

for (const imgName of referencedImages) {
  const cleanName = imgName.replace(/ /g, '_');
  const found = imagesInDir.find(f => f.toLowerCase() === imgName.toLowerCase() || f.toLowerCase() === cleanName.toLowerCase());
  if (found) {
    const srcPath = path.join(imagesDir, found);
    const destPath = path.join(publicCodexDir, found);
    if (!fs.existsSync(destPath)) {
      fs.copyFileSync(srcPath, destPath);
    }
    fs.unlinkSync(srcPath);
    relocatedImagesCount++;

    // Update manifest
    const entry = manifestMap.get(found.toLowerCase());
    if (entry) {
      entry.migrated_to_public = true;
      entry.public_path = `assets/codex/${found}`;
    }
  }
}

console.log(`Successfully relocated and purged ${relocatedImagesCount} images from images/.`);
fs.writeFileSync(imagesManifestPath, JSON.stringify(manifest, null, 2), 'utf8');

// 4. Helper to serialize article to TS
function serializeDataset(varName, list) {
  const items = list.map(art => {
    const safeContent = art.rawContent
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\$\{/g, '\\${');
    return `    {
        id: ${art.id},
        slug: ${JSON.stringify(art.slug)},
        title: ${JSON.stringify(art.title)},
        author: ${JSON.stringify(art.author)},
        lastUpdated: ${JSON.stringify(art.lastUpdated)},
        summary: ${JSON.stringify(art.summary)},
        categories: ${JSON.stringify(art.categories)},
        rawContent: \`${safeContent}\`
    }`;
  });

  return `import { CodexArticle } from '../types';

export const ${varName}: CodexArticle[] = [
${items.join(',\n')}
];
`;
}

// 5. Write TypeScript files
fs.writeFileSync(path.join(repoRoot, 'src/codex/articles/placesAdditionalArticles.ts'), serializeDataset('PLACES_ADDITIONAL_ARTICLES', placesList), 'utf8');
fs.writeFileSync(path.join(repoRoot, 'src/codex/articles/techStarshipsArticles.ts'), serializeDataset('TECH_STARSHIPS_ARTICLES', techList), 'utf8');
fs.writeFileSync(path.join(repoRoot, 'src/codex/articles/historySeriesArticles.ts'), serializeDataset('HISTORY_SERIES_ARTICLES', seriesList), 'utf8');
fs.writeFileSync(path.join(repoRoot, 'src/codex/articles/historyYearsArticles.ts'), serializeDataset('HISTORY_YEARS_ARTICLES', yearsList), 'utf8');
fs.writeFileSync(path.join(repoRoot, 'src/codex/articles/languagesCultureArticles.ts'), serializeDataset('LANGUAGES_CULTURE_ARTICLES', langList), 'utf8');
fs.writeFileSync(path.join(repoRoot, 'src/codex/articles/nationsArchivesArticles.ts'), serializeDataset('NATIONS_ARCHIVES_ARTICLES', nationsList), 'utf8');

console.log('Successfully wrote 6 TypeScript articles datasets.');

// 6. Delete migrated markdown files
let deletedFilesCount = 0;
for (const art of allMigrated) {
  if (fs.existsSync(art.filePath)) {
    fs.unlinkSync(art.filePath);
    deletedFilesCount++;
  }
}
console.log(`Successfully deleted ${deletedFilesCount} markdown files from wiki/.`);

// 7. Update pages_index.json
const pagesIndex = JSON.parse(fs.readFileSync(pagesIndexPath, 'utf8'));
const migratedIdMap = new Set(allMigrated.map(a => a.id));

let markedPagesCount = 0;
for (const entry of pagesIndex) {
  if (migratedIdMap.has(entry.page_id)) {
    if (!entry.migrated_to_codex) {
      entry.migrated_to_codex = true;
      markedPagesCount++;
    }
  }
}

console.log(`Marked ${markedPagesCount} pages in pages_index.json as migrated_to_codex.`);
fs.writeFileSync(pagesIndexPath, JSON.stringify(pagesIndex, null, 2), 'utf8');
console.log('Mass migration execution completed successfully!');

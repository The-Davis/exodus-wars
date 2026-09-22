const fs = require('fs');
const path = require('path');

const repoRoot = 'c:/Users/jdavi/Documents/GitHub/exodus-wars';
const articlesDir = path.join(repoRoot, 'wiki/articles');
const categoriesDir = path.join(repoRoot, 'wiki/categories');

const articleFiles = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));
const categoryFiles = fs.readdirSync(categoriesDir).filter(f => f.endsWith('.md'));

console.log('Total remaining article files:', articleFiles.length);
console.log('Total remaining category files:', categoryFiles.length);

// Define category groups
const placesCats = new Set([
  'Star Systems', 'Sectors', 'Spiral Arms', 'Galaxies', 'Planets', 'Moons',
  'Star_Systems', 'Sectors', 'Spiral_Arms', 'Galaxies', 'Planets', 'Moons'
]);

const techCats = new Set([
  'Starships', 'Starship', 'Vehicles', 'Aircraft', 'Imperial Military M-Series', 'Antimatter',
  'Imperial_Military_M-Series', 'Technology'
]);

const seriesCats = new Set([
  'Tempest War Series', 'Second Exodus War Series', 'Machinations of the Conclave Series',
  'Mesarthrim Civil War Series', 'Volucris War Series', 'Books', 'Carriers Series',
  'Old Stories', 'Malice of the Meroniri Series', 'Second Exodus Wars Series',
  'Tempest_War_Series', 'Second_Exodus_War_Series', 'Machinations_of_the_Conclave_Series',
  'Mesarthrim_Civil_War_Series', 'Volucris_War_Series', 'Carriers_Series',
  'Old_Stories', 'Malice_of_the_Meroniri_Series'
]);

const langCats = new Set([
  'Languages', 'Terminology', 'Uniforms'
]);

const raceCats = new Set([
  'Archadians', 'Anderung', 'Gorhamut', 'Mtomigru', 'Sirunaki', 'Sirunaki_Reshkeren', 'Thezerops', 'Race'
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

let placesArticles = [];
let techArticles = [];
let seriesArticles = [];
let yearArticles = [];
let langArticles = [];
let nationsArticles = [];
let unclassified = [];

for (const f of articleFiles) {
  const content = fs.readFileSync(path.join(articlesDir, f), 'utf8');
  const catRegex = /\[\[Category:([^\]|]+)(?:\|[^\]]*)?\]\]/g;
  let cats = [];
  let m;
  while ((m = catRegex.exec(content)) !== null) {
    cats.push(m[1].trim());
  }

  // Check if year
  const titleNoExt = f.replace('.md', '');
  if (/^\d+(?:BC|AD)?$/.test(titleNoExt) || /Events of \d+/.test(content)) {
    yearArticles.push({ file: f, title: titleNoExt, cats });
    continue;
  }

  // Check categories
  let matched = false;
  if (cats.some(c => placesCats.has(c)) || /_System\.md$/i.test(f) || /\{\{Star[_ ]Information/i.test(content) || /\{\{Stellar[_ ]Navigation/i.test(content)) {
    placesArticles.push({ file: f, title: titleNoExt, cats });
    matched = true;
  } else if (cats.some(c => techCats.has(c)) || /\{\{Starship[_ ]Information/i.test(content) || /_Class_(?:Battleship|Cruiser|Destroyer|Frigate|Corvette|Carrier|Monitor)/i.test(f)) {
    techArticles.push({ file: f, title: titleNoExt, cats });
    matched = true;
  } else if (cats.some(c => seriesCats.has(c))) {
    seriesArticles.push({ file: f, title: titleNoExt, cats });
    matched = true;
  } else if (cats.some(c => langCats.has(c))) {
    langArticles.push({ file: f, title: titleNoExt, cats });
    matched = true;
  } else if (cats.some(c => nationsCats.has(c))) {
    nationsArticles.push({ file: f, title: titleNoExt, cats });
    matched = true;
  }

  if (!matched) {
    unclassified.push({ file: f, title: titleNoExt, cats });
  }
}

console.log('--- Articles Classified ---');
console.log('Places Articles:', placesArticles.length);
console.log('Tech / Starships / Vehicles Articles:', techArticles.length);
console.log('Historical Series Articles:', seriesArticles.length);
console.log('Year Articles:', yearArticles.length);
console.log('Languages Articles:', langArticles.length);
console.log('Nations Archives Articles:', nationsArticles.length);
console.log('Total classified articles:', placesArticles.length + techArticles.length + seriesArticles.length + yearArticles.length + langArticles.length + nationsArticles.length);
console.log('Unclassified articles remaining:', unclassified.length);
console.log('Sample unclassified:', unclassified.slice(0, 20).map(u => u.file));

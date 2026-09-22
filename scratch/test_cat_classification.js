const fs = require('fs');
const path = require('path');

const repoRoot = 'c:/Users/jdavi/Documents/GitHub/exodus-wars';
const categoriesDir = path.join(repoRoot, 'wiki/categories');
const catFiles = fs.readdirSync(categoriesDir).filter(f => f.endsWith('.md'));

// Using the same sets
const placesCats = new Set([
  'Star_Systems.md', 'Sectors.md', 'Spiral_Arms.md', 'Galaxies.md', 'Planets.md', 'Moons.md'
]);

const techCats = new Set([
  'Starships.md', 'Starship.md', 'Vehicles.md', 'Aircraft.md', 'Imperial_Military_M-Series.md', 'Antimatter.md',
  'Technology.md'
]);

const seriesCats = new Set([
  'Tempest_War_Series.md', 'Second_Exodus_War_Series.md', 'Machinations_of_the_Conclave_Series.md',
  'Mesarthrim_Civil_War_Series.md', 'Volucris_War_Series.md', 'Carriers_Series.md',
  'Old_Stories.md', 'Malice_of_the_Meroniri_Series.md', 'Books.md'
]);

const langCats = new Set([
  'Languages.md', 'Terminology.md', 'Uniforms.md'
]);

const raceCats = new Set([
  'Archadians.md', 'Anderung.md', 'Gorhamut.md', 'Mtomigru.md', 'Sirunaki.md', 'Sirunaki_Reshkeren.md', 'Thezerops.md', 'Race.md'
]);

const nationsCats = new Set([
  'Federated_Districts_of_the_Prefecture.md', 'Onyx_Empire.md', 'Onyx_Empire_Military.md',
  'United_Earth_Alliance.md', 'Colonial_Commonwealth.md', 'Meroniri_Terinasi.md',
  'Rikaz_o_Fii_Huern_iv_Lorithan.md', 'Rikaz_o_Fii_Cai_iv_Huerna.md',
  'Ikronin_Jurekön.md', 'Icronian_Consortium.md', 'Auellal_League.md', 'Auellal_City-States.md',
  'United_Mesarthrim_Clans.md', 'Mesarthrim_Federation.md', 'United_Centusi States.md', 'United_Centusi_States.md',
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

let matchedCatCount = 0;
let unmatchedCats = [];

for (const f of catFiles) {
  if (placesCats.has(f) || techCats.has(f) || seriesCats.has(f) || langCats.has(f) || raceCats.has(f) || nationsCats.has(f)) {
    matchedCatCount++;
  } else {
    unmatchedCats.push(f);
  }
}

console.log('Matched categories to migrate:', matchedCatCount);
console.log('Unmatched categories:', unmatchedCats);

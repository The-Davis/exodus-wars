import { describe, it, expect } from 'vitest';
import { CodexRenderer } from './CodexRenderer';
import { getCodexArticle } from './articleRegistry';

describe('Migrated Subcategory Articles & Tactical Infobox Templates', () => {
    describe('City Information Template Rendering', () => {
        it('renders city information infobox with geographic header and municipal parameters', () => {
            const wikitext = `{{City Information|
|name =Novar City
|planet =[[Novar]]
|system =[[Centus System]]
|sector =[[De Mairan Sector]]
|sovereign =[[United Centusi States]]
|population =45,000,000
|type =Planetary Capital
|coordinates =Equatorial Basin
|mayor =First Magistrate
}}
Novar City is the capital of Novar.`;

            const html = CodexRenderer.render(wikitext);

            expect(html).toContain('class="codex-infobox city-information"');
            expect(html).toContain('GEOGRAPHIC DIRECTORY // CITY REGISTRY');
            expect(html).toContain('Novar City');
            expect(html).toContain('<th>Planet</th>');
            expect(html).toContain('href="#/codex/Novar"');
            expect(html).toContain('<th>System</th>');
            expect(html).toContain('href="#/codex/Centus%20System"');
            expect(html).toContain('<th>Sector</th>');
            expect(html).toContain('href="#/codex/De%20Mairan%20Sector"');
            expect(html).toContain('<th>Sovereignty</th>');
            expect(html).toContain('href="#/codex/United%20Centusi%20States"');
            expect(html).toContain('45,000,000');
            expect(html).toContain('Planetary Capital');
            expect(html).toContain('Novar City is the capital of Novar.');
        });
    });

    describe('Region Information Template Rendering', () => {
        it('renders regional survey infobox with territorial designation header', () => {
            const wikitext = `{{Region Information|
|name =Dzarning Mountain Range
|population =Approximately 1 million [[Lorithos]]
|capital =None
|major_cities =None
|location =[[Jehz Modar]], [[Lorithan]], [[Mirdek System]]
|sovereign =[[Rikaz o fii Huern iv Lorithan]]
}}
The Dzarning Mountain Range dominates the northern continent.`;

            const html = CodexRenderer.render(wikitext);

            expect(html).toContain('class="codex-infobox region-information"');
            expect(html).toContain('TERRITORIAL SURVEY // REGIONAL DESIGNATION');
            expect(html).toContain('Dzarning Mountain Range');
            expect(html).toContain('<th>Location</th>');
            expect(html).toContain('href="#/codex/Lorithan"');
            expect(html).toContain('<th>Sovereignty</th>');
            expect(html).toContain('href="#/codex/Rikaz%20o%20fii%20Huern%20iv%20Lorithan"');
            expect(html).toContain('Approximately 1 million');
            expect(html).toContain('The Dzarning Mountain Range dominates the northern continent.');
        });
    });

    describe('Military Branch Information Template Rendering', () => {
        it('renders military branch infobox with defense archive header and operational data', () => {
            const wikitext = `{{Military Branch Information|
|image = [[Image:Ailen Suvak Tashir Fahr Badge.png|right|300px]]
|caption =Badge of the Ailen Suvak Tashir Fahr
|name =Ailen Suvak Tashir Fahr
|active =[[Burning Wars]]-Onwards
|nation = [[Rikaz o Fii Huern iv Lorithan]]
|branch = Space Navy and Air Force
|size = 3 Teska Noks
|headquarters = [[Lorithan]], [[Mirdek System]]
|motto = "Mirdek silam nu Fer, Ailen borash nu Fer."
|colors = Blue and Tan
|chief_of_operations = Hishai [[Sanor Cai]]
}}
The primary naval branch of the Rikaz.`;

            const html = CodexRenderer.render(wikitext, {
                'Ailen Suvak Tashir Fahr Badge.png': {
                    legacy: 'assets/codex/Ailen Suvak Tashir Fahr Badge.png',
                    alt: 'Badge'
                }
            });

            expect(html).toContain('class="codex-infobox military-branch-information"');
            expect(html).toContain('DEFENSE ARCHIVE // MILITARY SERVICE BRANCH');
            expect(html).toContain('Ailen Suvak Tashir Fahr');
            expect(html).toContain('<th>Allegiance</th>');
            expect(html).toContain('href="#/codex/Rikaz%20o%20Fii%20Huern%20iv%20Lorithan"');
            expect(html).toContain('<th>Branch Role</th>');
            expect(html).toContain('Space Navy and Air Force');
            expect(html).toContain('<th>Force Strength</th>');
            expect(html).toContain('3 Teska Noks');
            expect(html).toContain('<th>Headquarters</th>');
            expect(html).toContain('href="#/codex/Lorithan"');
            expect(html).toContain('<th>Motto</th>');
            expect(html).toContain('"Mirdek silam nu Fer, Ailen borash nu Fer."');
            expect(html).toContain('<th>Chief of Operations</th>');
            expect(html).toContain('href="#/codex/Sanor%20Cai"');
            expect(html).toContain('assets/codex/Ailen Suvak Tashir Fahr Badge.png');
        });
    });

    describe('Military Force Information Template Rendering', () => {
        it('renders military force formation infobox with order of battle header', () => {
            const wikitext = `{{Military Force Information|
|image = [[Image:RIN---Black-Armada-Badge.png|300px]]
|caption = Badge of the Black Armada
|name =Black Armada
|active =[[2301]]-[[2322]]
|nation = [[Onyx Empire]]
|branch = [[Royal Imperial Navy]]
|size = 2 Fleets
|headquarters = [[Ah Kin]], [[Alpha Centauri System]]
|commander = Admiral [[Robert Marshall]]
}}
The Black Armada served as the heavy battlefleet.`;

            const html = CodexRenderer.render(wikitext, {
                'RIN---Black-Armada-Badge.png': {
                    legacy: 'assets/codex/RIN---Black-Armada-Badge.png',
                    alt: 'Black Armada Badge'
                }
            });

            expect(html).toContain('class="codex-infobox military-force-information"');
            expect(html).toContain('ORDER OF BATTLE // MILITARY FORMATION');
            expect(html).toContain('Black Armada');
            expect(html).toContain('<th>Allegiance</th>');
            expect(html).toContain('href="#/codex/Onyx%20Empire"');
            expect(html).toContain('<th>Branch</th>');
            expect(html).toContain('href="#/codex/Royal%20Imperial%20Navy"');
            expect(html).toContain('<th>Station / Base</th>');
            expect(html).toContain('href="#/codex/Ah%20Kin"');
            expect(html).toContain('<th>Commander</th>');
            expect(html).toContain('href="#/codex/Robert%20Marshall"');
            expect(html).toContain('assets/codex/RIN---Black-Armada-Badge.png');
        });
    });

    describe('Infantry Information Template Rendering', () => {
        it('renders infantry equipment profile with tactical equipment header', () => {
            const wikitext = `{{Infantry Information|
|name= Reigen Finnis Infantry
|image=[[Image:Finnis_Infantry_Face.png]]
|mission= Multi-Role Infantry Armor
|military= [[Reigess Mark Vaktida]]
|type= Powered Exoskeleton
|manufacturer= [[Strauss Energie]]
|armor= Composite Carapace
|fixed_weapons= Integrated Plasma Emitter
}}
Standard infantry armor of the Reigess Suverände.`;

            const html = CodexRenderer.render(wikitext, {
                'Finnis_Infantry_Face.png': {
                    legacy: 'assets/codex/Finnis_Infantry_Face.png',
                    alt: 'Finnis Armor'
                }
            });

            expect(html).toContain('class="codex-infobox infantry-information"');
            expect(html).toContain('INFANTRY EQUIPMENT // COMBAT PROFILE');
            expect(html).toContain('Reigen Finnis Infantry');
            expect(html).toContain('<th>Mission Role</th>');
            expect(html).toContain('Multi-Role Infantry Armor');
            expect(html).toContain('<th>Service User</th>');
            expect(html).toContain('href="#/codex/Reigess%20Mark%20Vaktida"');
            expect(html).toContain('<th>Equipment Type</th>');
            expect(html).toContain('Powered Exoskeleton');
            expect(html).toContain('<th>Manufacturer</th>');
            expect(html).toContain('href="#/codex/Strauss%20Energie"');
            expect(html).toContain('<th>Armor / Materials</th>');
            expect(html).toContain('Composite Carapace');
            expect(html).toContain('<th>Armament</th>');
            expect(html).toContain('Integrated Plasma Emitter');
            expect(html).toContain('assets/codex/Finnis_Infantry_Face.png');
        });
    });

    describe('Live Migrated Articles Resolution', () => {
        it('resolves live articles from each migrated category division', () => {
            // 1. Places: City
            const city = getCodexArticle('Ailqot');
            expect(city).toBeDefined();
            expect(city?.categories).toContain('Cities');

            // 2. Places: Region
            const region = getCodexArticle('Dzarning_Mountain_Range');
            expect(region).toBeDefined();
            expect(region?.categories).toContain('Regions');

            // 3. Tech: Infantry Equipment
            const infantry = getCodexArticle('Finnis');
            expect(infantry).toBeDefined();
            expect(infantry?.categories).toContain('Infantry Equipment Profiles');

            // 4. History: Years
            const year = getCodexArticle('100');
            expect(year).toBeDefined();
            expect(year?.categories).toContain('Years');

            // 5. History: Tempest War battle
            const battle = getCodexArticle('First_Battle_of_Centus');
            expect(battle).toBeDefined();
            expect(battle?.categories).toContain('Tempest War');

            // 6. Nations: Terran Nation
            const terranNation = getCodexArticle('United_States_(Terra)');
            expect(terranNation).toBeDefined();
            expect(terranNation?.categories).toContain('Terran Nations');

            // 7. Nations: Military formation
            const armada = getCodexArticle('Black_Armada_of_the_Royal_Imperial_Navy');
            expect(armada).toBeDefined();
            expect(armada?.categories).toContain('Royal Imperial Navy');

            // 8. People: Historical Leader
            const hitler = getCodexArticle('Adolf_Hitler');
            expect(hitler).toBeDefined();
            expect(hitler?.categories).toContain('Historical Leaders');

            // 9. Category Hubs resolve to their category pages
            const citiesCategory = getCodexArticle('Category:Cities');
            expect(citiesCategory).toBeDefined();
            expect(citiesCategory?.slug).toBe('Cities');

            const terranNationsCategory = getCodexArticle('Category:Terran Nations');
            expect(terranNationsCategory).toBeDefined();
            expect(terranNationsCategory?.slug).toBe('Terran_Nations');

            // 10. Star Systems
            const alphaCentauri = getCodexArticle('Alpha_Centauri_System');
            expect(alphaCentauri).toBeDefined();
            expect(alphaCentauri?.categories).toContain('Star Systems');

            // 11. Sectors
            const solSector = getCodexArticle('Sol_Sector');
            expect(solSector).toBeDefined();
            expect(solSector?.categories).toContain('Sectors');

            // 12. Spiral Arms
            const orionArm = getCodexArticle('Orion_Arm');
            expect(orionArm).toBeDefined();
            expect(orionArm?.categories).toContain('Spiral Arms');

            // 13. Starships
            const arnoste = getCodexArticle('Arnoste_Class_Destroyer');
            expect(arnoste).toBeDefined();
            expect(arnoste?.title).toBe('Arnoste Class Destroyer');

            // 14. History Series
            const tempestSeries = getCodexArticle('Claws_of_the_Fathach');
            expect(tempestSeries).toBeDefined();
            expect(tempestSeries?.categories).toContain('Tempest War Series');

            // 15. Uncategorized Year converted to Years category
            const year2001 = getCodexArticle('2001');
            expect(year2001).toBeDefined();
            expect(year2001?.categories).toContain('Years');

            // 16. Languages
            const huorak = getCodexArticle('Huorak');
            expect(huorak).toBeDefined();
            expect(huorak?.categories).toContain('Languages');

            // 17. Nations Archives
            const onyxGov = getCodexArticle('Government_of_the_Onyx_Empire');
            expect(onyxGov).toBeDefined();
            expect(onyxGov?.categories).toContain('Onyx Empire');

            // 18. New Category Hubs
            expect(getCodexArticle('Category:Star Systems')).toBeDefined();
            expect(getCodexArticle('Category:Starships')).toBeDefined();
            expect(getCodexArticle('Category:Onyx Empire')).toBeDefined();
            expect(getCodexArticle('Category:Languages')).toBeDefined();
        });
    });

    describe('Squadron & Intelligence Branch Template Rendering', () => {
        it('renders squadron information infobox with aerospace wing header and roster parameters', () => {
            const wikitext = `{{Squadron Information|
|name = No.1416 Squadron ADF
|nickname = Saint Michael's Sword
|active = [[2295]]-[[2319]]
|nation = [[United Earth Alliance]]
|military_branch = [[Alliance Defense Force]]
|aircraft_type = [[ADF Starfire]]
|role = Space Superiority
|garrison = Originally Saturn, [[Sol System]]
|battles = Invasion of Earth
}}

Briefing for 1416th Squadron.`;

            const html = CodexRenderer.render(wikitext);
            expect(html).toContain('codex-infobox squadron-information');
            expect(html).toContain('AEROSPACE WING // SQUADRON ROSTER');
            expect(html).toContain('No.1416 Squadron ADF');
            expect(html).toContain('Saint Michael\'s Sword');
            expect(html).toContain('Space Superiority');
            expect(html).toContain('Briefing for 1416th Squadron.');
        });

        it('renders intelligence branch infobox with clandestine service header and operational data', () => {
            const wikitext = `{{Intelligence Branch Information|
|name = хоньч нохой, AKA "Omegas"
|nation = [[Onyx Empire]]
|designation = Secret Police
|size = Approximately 23,000 operatives
|headquarters = [[Earth]], [[Sol System]]
|command1 = Chief Operative [[Lavik Nighthawk]]
}}

Dossier on the Omegas.`;

            const html = CodexRenderer.render(wikitext);
            expect(html).toContain('codex-infobox intelligence-branch-information');
            expect(html).toContain('INTELLIGENCE ARCHIVE // CLANDESTINE SERVICE');
            expect(html).toContain('хоньч нохой, AKA "Omegas"');
            expect(html).toContain('Secret Police');
            expect(html).toContain('Approximately 23,000 operatives');
            expect(html).toContain('Dossier on the Omegas.');
        });
    });
});

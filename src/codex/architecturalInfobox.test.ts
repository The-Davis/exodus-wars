import { describe, it, expect } from 'vitest';
import { getCodexArticle } from './articleRegistry';
import { CodexRenderer } from './CodexRenderer';
import { architecturalAchievementsIndexArticle } from './articles/Architectural_Achievements_Index';

describe('Architectural Achievements Codex & Structural Infobox Templates', () => {
    it('registers the Architectural Achievements directory under aliases', () => {
        expect(getCodexArticle('Architectural_Achievements')).toBeDefined();
        expect(getCodexArticle('Architectural Achievements')).toBeDefined();
        expect(getCodexArticle('architectural_achievements')).toBeDefined();
        expect(getCodexArticle('architectural achievements')).toBeDefined();
        expect(getCodexArticle('Category:Architectural_Achievements')).toBeDefined();
        expect(getCodexArticle('Category:Architectural Achievements')).toBeDefined();
        expect(getCodexArticle('Architecture')).toBeDefined();
        expect(getCodexArticle('architecture')).toBeDefined();
        expect(getCodexArticle('Category:Architecture')).toBeDefined();
        expect(getCodexArticle('category:architecture')).toBeDefined();
        expect(getCodexArticle(':Category:Architectural_Achievements')).toBeDefined();

        expect(getCodexArticle('Architectural_Achievements')).toBe(architecturalAchievementsIndexArticle);
        expect(getCodexArticle('Architectural_Achievements')?.slug).toBe('Architectural_Achievements');
        expect(getCodexArticle('Architectural_Achievements')?.title).toBe('Architectural Achievements');
    });

    it('registers key planetary buildings, space stations, and space elevator articles', () => {
        const testArticles = [
            'Spire of Truth',
            'Berkeley Class Reactor Complex',
            'Standardized Factory Complex',
            'Standardized Hangar',
            'Prefabricated Barracks',
            'Omega Listening Post',
            'Standardized Base Hospital',
            'Standard Automatic Defense Turret',
            'Haven Class Station',
            'Starship Construction Stardock',
            'Evander Point Stardock',
            'Prometheus Stardock',
            'PL-110 Manned Defensive Platform - "Epsilon"',
            'Rahn Industries Headquarters',
            'Capricorn Haven',
            'Martim Haven',
            'Noronha Haven',
            'Argent Haven',
            'Ayar Station',
            'International Space Station',
            'Kihtor',
            'Kihtor Modar',
            'Kihtor Terok',
            'Kihtor Ihjar',
            'Kihtor Enwir',
            'Buildings',
            'Space Stations',
            'Space Elevators'
        ];

        for (const title of testArticles) {
            const article = getCodexArticle(title);
            expect(article, `Article "${title}" should be registered in Codex`).toBeDefined();
            expect(article?.rawContent.length).toBeGreaterThan(10);
        }
    });

    it('correctly parses and renders Space Station Information templates with blueprint HUD styling', () => {
        const rawTemplate = `{{Space Station Information|
|name = Haven Class Station
|image = 
|caption = Haven Drydock Platform
|designation = Starship Drydock/Harborage
|builder = [[Haven Shipyards]]
|operator = [[Royal Imperial Navy]]
|crew = 2,500
|length = 500
|beam = 600
|height = 400
|powerplant = 1 x Tolwin T1S 1.7gW Fission Reactor
|weapons = Unarmed
|armor = Series-1 Composite Armor Plating
|shields = PDS-1 Plasma Field
|status = Active Fleet Service
}}
The Haven Class Station was a drydock and harborage platform for starship construction.`;

        const html = CodexRenderer.render(rawTemplate);

        expect(html).toContain('structure-header');
        expect(html).toContain('ARCHITECTURAL ARCHIVE // STRUCTURAL SPECIFICATION');
        expect(html).toContain('Haven Class Station');
        expect(html).toContain('Starship Drydock/Harborage');
        expect(html).toContain('Haven Shipyards');
        expect(html).toContain('Royal Imperial Navy');
        expect(html).toContain('2,500');
        expect(html).toContain('L: 500 m &times; W: 600 m &times; H: 400 m');
        expect(html).toContain('1 x Tolwin T1S 1.7gW Fission Reactor');
        expect(html).toContain('Unarmed');
        expect(html).toContain('Series-1 Composite Armor Plating');
        expect(html).toContain('PDS-1 Plasma Field');
        expect(html).toContain('The Haven Class Station was a drydock and harborage platform');
    });

    it('renders Structure Information templates properly with blueprint image and dimensions', () => {
        const rawTemplate = `{{Structure Information|
|name = Spire of Truth
|image = SpireofTruth.jpg
|caption = Sanctuary and Inquisitorial Citadel
|designation = Planetary Citadel / Intelligence Center
|builder = Prefecture Department of Inquisition
|location = [[Thur]]
|status = Operational
}}
The beautiful Spire of Truth was built at the direction of the Inquisition.`;

        const html = CodexRenderer.render(rawTemplate, {
            'SpireofTruth.jpg': {
                legacy: 'assets/codex/SpireofTruth.jpg',
                alt: 'Spire of Truth'
            }
        });

        expect(html).toContain('structure-header');
        expect(html).toContain('ARCHITECTURAL ARCHIVE // STRUCTURAL SPECIFICATION');
        expect(html).toContain('Spire of Truth');
        expect(html).toContain('Planetary Citadel / Intelligence Center');
        expect(html).toContain('Prefecture Department of Inquisition');
        expect(html).toContain('Thur');
        expect(html).toContain('assets/codex/SpireofTruth.jpg');
        expect(html).toContain('Sanctuary and Inquisitorial Citadel');
    });

    it('renders live article content for Haven Class Station with tactical infobox', () => {
        const article = getCodexArticle('Haven Class Station');
        expect(article).toBeDefined();

        const html = CodexRenderer.render(article!.rawContent, article!.images);
        expect(html).not.toContain('{{Space Station Information');
        expect(html).toContain('structure-header');
        expect(html).toContain('Haven Class Station');
        expect(html).toContain('Haven Shipyards');
        expect(html).toContain('Atlas Class Carrier');
    });

    it('renders live articles with relocated facility and station imagery', () => {
        const spire = getCodexArticle('Spire of Truth');
        expect(spire).toBeDefined();
        const spireHtml = CodexRenderer.render(spire!.rawContent, spire!.images);
        expect(spireHtml).toContain('assets/codex/SpireofTruth.jpg');

        const stardock = getCodexArticle('Starship Construction Stardock');
        expect(stardock).toBeDefined();
        const dockHtml = CodexRenderer.render(stardock!.rawContent, stardock!.images);
        expect(dockHtml).toContain('assets/codex/StarshipConstructionStardock.jpg');

        const epsilon = getCodexArticle('PL-110 Manned Defensive Platform - "Epsilon"');
        expect(epsilon).toBeDefined();
        const epHtml = CodexRenderer.render(epsilon!.rawContent, epsilon!.images);
        expect(epHtml).toContain('assets/codex/PL110Epsilon.jpg');
    });
});

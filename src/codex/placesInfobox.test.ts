import { describe, it, expect } from 'vitest';
import { getCodexArticle } from './articleRegistry';
import { CodexRenderer } from './CodexRenderer';
import { placesIndexArticle } from './articles/Places_Index';

describe('Places Codex & Planet Information Infobox', () => {
    it('registers the Places directory article under various slug and category aliases', () => {
        expect(getCodexArticle('Places')).toBeDefined();
        expect(getCodexArticle('places')).toBeDefined();
        expect(getCodexArticle('Category:Places')).toBeDefined();
        expect(getCodexArticle('category:places')).toBeDefined();
        expect(getCodexArticle(':Category:Places')).toBeDefined();
        expect(getCodexArticle('Places')?.slug).toBe('Places');
        expect(getCodexArticle('Places')?.title).toBe('Places');
    });

    it('registers key places, planets, and celestial landmarks', () => {
        const testPlaces = [
            'Earth',
            'Torimur',
            'Mesar',
            'Eciluge',
            'Mars',
            'Venus',
            'Ceres',
            'Ceres Belt',
            "De Mairan's Nebula",
            'Mount McKinley',
            "Njiorin's Well",
            'Obsidian Palace',
            'Milky Way',
            'Luna',
            'Sindh',
            'Aquitaine',
            'Adelson'
        ];

        for (const place of testPlaces) {
            const byName = getCodexArticle(place);
            const bySlug = getCodexArticle(place.replace(/ /g, '_'));
            expect(byName, `Expected lookup for "${place}" to succeed`).toBeDefined();
            expect(bySlug, `Expected lookup for "${place.replace(/ /g, '_')}" to succeed`).toBeDefined();
        }
    });

    it('renders the Planet Information infobox with astronomical survey details and image', () => {
        const sampleWikitext = `{{Planet Information|
|name =Earth
|image =[[Image:Earth seen from Orbit.png]]
|caption =Earth, seen from Orbit.
|star_system =[[Sol System]]
|population =6,800,000,000
|sovereign =[[United Earth Alliance]]
|capital =[[Geneva]]
|orbit =365.25 Days
|rotation =24.0 Hours
|satellite =[[Luna]]
|satellite_orbit =28 Days
}}

'''Earth''' is the third planet from the Sun.

[[Category:Planets]]
[[Category:Sol System]]`;

        const html = CodexRenderer.render(sampleWikitext, {
            'Earth_seen_from_Orbit.png': {
                legacy: 'assets/codex/Earth_seen_from_Orbit.png',
                alt: 'Earth seen from Orbit'
            }
        });

        // Infobox structural checks
        expect(html).toContain('class="codex-infobox planet-information"');
        expect(html).toContain('ASTRONOMICAL SURVEY // PLANET');
        expect(html).toContain('Earth');
        expect(html).toContain('<th>Star System</th>');
        expect(html).toContain('Sol System');
        expect(html).toContain('<th>Population</th>');
        expect(html).toContain('6,800,000,000');
        expect(html).toContain('<th>Sovereign</th>');
        expect(html).toContain('United Earth Alliance');
        expect(html).toContain('<th>Capital</th>');
        expect(html).toContain('Geneva');
        expect(html).toContain('<th>Orbit</th>');
        expect(html).toContain('365.25 Days');
        expect(html).toContain('<th>Rotation</th>');
        expect(html).toContain('24.0 Hours');
        expect(html).toContain('<th>Satellite(s)</th>');
        expect(html).toContain('Luna');

        // Wikilink checks
        expect(html).toContain('href="#/codex/Sol%20System"');
        expect(html).toContain('href="#/codex/United%20Earth%20Alliance"');
        expect(html).toContain('href="#/codex/Luna"');

        // Image checks
        expect(html).toContain('codex-infobox-image');
        expect(html).toContain('Earth, seen from Orbit.');
        expect(html).not.toContain('codex-image-badge');

        // Category section
        expect(html).toContain('class="codex-categories-section"');
        expect(html).toContain('href="#/codex/Category:Planets"');
        expect(html).toContain('href="#/codex/Category:Sol%20System"');
    });

    it('renders the Stellar Navigation Information infobox', () => {
        const sampleWikitext = `{{Stellar Navigation Information|
|name =De Mairan's Nebula
|type =Nebula
|part_of =the [[De Mairan Sector]]
}}

'''De Mairan's Nebula''' is a vast antimatter reservoir.`;

        const html = CodexRenderer.render(sampleWikitext);

        expect(html).toContain('class="codex-infobox stellar-navigation"');
        expect(html).toContain('STELLAR CARTOGRAPHY // NAVIGATION POINT');
        expect(html).toContain("De Mairan's Nebula");
        expect(html).toContain('<th>Navigation Type</th>');
        expect(html).toContain('Nebula');
        expect(html).toContain('<th>Part Of</th>');
        expect(html).toContain('href="#/codex/De%20Mairan%20Sector"');
    });

    it('renders the Star Information infobox', () => {
        const sampleWikitext = `{{Star Information|
|name =Centus System
|sector =[[De Mairan Sector]]
|stellar_class =F5V
|planets =[[Mesar]], [[Crius]]
}}

The Centus System contains key industrial colonies.`;

        const html = CodexRenderer.render(sampleWikitext);

        expect(html).toContain('class="codex-infobox star-information"');
        expect(html).toContain('STELLAR CARTOGRAPHY // STAR SYSTEM');
        expect(html).toContain('Centus System');
        expect(html).toContain('<th>Sector</th>');
        expect(html).toContain('href="#/codex/De%20Mairan%20Sector"');
        expect(html).toContain('<th>Stellar Class</th>');
        expect(html).toContain('F5V');
        expect(html).toContain('<th>Planets</th>');
        expect(html).toContain('href="#/codex/Mesar"');
    });

    it('renders structured bullet lists on the Places directory page', () => {
        const html = CodexRenderer.render(placesIndexArticle.rawContent);

        expect(html).toContain('<ul class="codex-list">');
        expect(html).toContain('<li class="codex-list-item">');
        expect(html).toContain('href="#/codex/Earth"');
        expect(html).toContain('href="#/codex/Torimur"');
        expect(html).toContain('href="#/codex/Mesar"');
        expect(html).toContain('href="#/codex/Category%3APlanets"');
    });

    it('supports modern and legacy image toggle in planet infobox without badges', () => {
        const sampleWithToggle = `{{Planet Information|
|name =Mars
|image =Mars from orbit.png
|caption =Red Planet
}}`;

        const html = CodexRenderer.render(sampleWithToggle, {
            'Mars_from_orbit.png': {
                modern: 'assets/codex/Mars_from_orbit_modern.png',
                legacy: 'assets/codex/Mars_from_orbit.png',
                alt: 'Mars'
            }
        });

        expect(html).toContain('data-can-toggle="true"');
        expect(html).toContain('data-current-mode="modern"');
        expect(html).toContain('Mars_from_orbit_modern.png');
        expect(html).toContain('data-legacy-src=');
        expect(html).toContain('toggleable-cursor');
        expect(html).not.toContain('codex-image-badge');
    });
});

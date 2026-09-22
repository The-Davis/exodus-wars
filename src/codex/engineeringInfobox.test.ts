import { describe, it, expect } from 'vitest';
import { getCodexArticle } from './articleRegistry';
import { CodexRenderer } from './CodexRenderer';
import { engineeringSystemsIndexArticle } from './articles/Engineering_Systems_Index';

describe('Engineering Systems Codex & Tactical Weapon Templates', () => {
    it('registers the Engineering Systems directory under aliases', () => {
        expect(getCodexArticle('Engineering_Systems')).toBeDefined();
        expect(getCodexArticle('Engineering Systems')).toBeDefined();
        expect(getCodexArticle('engineering_systems')).toBeDefined();
        expect(getCodexArticle('Category:Engineering_Systems')).toBeDefined();
        expect(getCodexArticle('Category:Engineering Systems')).toBeDefined();
        expect(getCodexArticle('Engineering')).toBeDefined();
        expect(getCodexArticle('engineering')).toBeDefined();
        expect(getCodexArticle('Category:Engineering')).toBeDefined();
        expect(getCodexArticle('category:engineering')).toBeDefined();
        expect(getCodexArticle(':Category:Engineering_Systems')).toBeDefined();

        expect(getCodexArticle('Engineering_Systems')).toBe(engineeringSystemsIndexArticle);
        expect(getCodexArticle('Engineering_Systems')?.slug).toBe('Engineering_Systems');
        expect(getCodexArticle('Engineering_Systems')?.title).toBe('Engineering Systems');
    });

    it('registers key tactical weapons, defenses, and electronics articles', () => {
        const testArticles = [
            'M-33 Heavy Anti-Armor Weapon',
            'M-11 Squad Automatic Weapon',
            'M-14 Sniper Rifle',
            'Terran Mass Drivers',
            'Terran Gauss Cannon',
            'Terran Autocannon',
            'Terran Conventional Missile Warheads',
            'Terran Active Probe',
            'Pasara',
            'Artificial Intelligence',
            'Omega Bomb',
            'Repulsor Shield Field Generator',
            'Terran Composite Armor',
            'Terran Plasma Barrier',
            'Chaff Launcher - Ikronin',
            'Anti-Missile System',
            'Weapons',
            'Defenses',
            'Electronics',
            'Sensors',
            'Communications',
            'Computers',
            'Armor',
            'Shields',
            'Missiles',
            'Countermeasures',
            'Explosive Weapons',
            'Melee Weapons',
            'Superweapons'
        ];

        for (const title of testArticles) {
            const article = getCodexArticle(title);
            expect(article, `Article "${title}" should be registered in Codex`).toBeDefined();
            expect(article?.rawContent.length).toBeGreaterThan(10);
        }
    });

    it('correctly parses and renders Weapon Information templates with tactical HUD styling', () => {
        const rawTemplate = `{{Weapon Information
| name = M-33 Heavy Anti-Armor Weapon
| image =
| caption = M-33 Anti-Armor System
| type = Anti-Armor Heavy Weapon
| origin = [[Terran Federation]]
| range = 1,500 meters
| operator = Terran Ground Forces
| caliber = 84mm
| rate_of_fire = Single Shot
| muzzle_velocity = 850 m/s
| feed_system = Breach-loaded canister
| status = In Service
}}
The M-33 is a man-portable anti-armor weapon.`;

        const html = CodexRenderer.render(rawTemplate);

        expect(html).toContain('weapon-header');
        expect(html).toContain('TACTICAL SYSTEM // ENGINEERING SPECIFICATION');
        expect(html).toContain('M-33 Heavy Anti-Armor Weapon');
        expect(html).toContain('Caliber / Output');
        expect(html).toContain('84mm');
        expect(html).toContain('Muzzle Velocity');
        expect(html).toContain('850 m/s');
        expect(html).toContain('Rate of Fire');
        expect(html).toContain('Single Shot');
        expect(html).toContain('Effective Range');
        expect(html).toContain('1,500 meters');
        expect(html).toContain('Feed System');
        expect(html).toContain('Breach-loaded canister');
        expect(html).toContain('The M-33 is a man-portable anti-armor weapon.');
    });

    it('renders Engineering System Information templates properly with image support', () => {
        const rawTemplate = `{{Engineering System Information
| name = Terran Active Probe
| image = TerranActiveProbe.jpg
| caption = High-gain sensor array
| type = Electronic Sensor System
| origin = [[Terran Federation]]
| range = 250,000 km
| operator = Federation Fleet
| status = Active Fleet Service
}}
The probe penetrates ECM cloaking.`;

        const html = CodexRenderer.render(rawTemplate, {
            'TerranActiveProbe.jpg': {
                legacy: 'assets/codex/TerranActiveProbe.jpg',
                alt: 'Terran Active Probe'
            }
        });

        expect(html).toContain('weapon-header');
        expect(html).toContain('TACTICAL SYSTEM // ENGINEERING SPECIFICATION');
        expect(html).toContain('Terran Active Probe');
        expect(html).toContain('Electronic Sensor System');
        expect(html).toContain('250,000 km');
        expect(html).toContain('assets/codex/TerranActiveProbe.jpg');
        expect(html).toContain('High-gain sensor array');
    });

    it('renders live article content for M-33 Heavy Anti-Armor Weapon with tactical infobox', () => {
        const article = getCodexArticle('M-33 Heavy Anti-Armor Weapon');
        expect(article).toBeDefined();

        const html = CodexRenderer.render(article!.rawContent, article!.images);
        expect(html).not.toContain('{{Weapon Information');
        expect(html).toContain('weapon-header');
        expect(html).toContain('M-33 Heavy Anti-Armor Weapon');
        expect(html).toContain('Direct-Fire Kinetic-Driven Anti-Armor Explosive');
        expect(html).toContain('25 kilometers');
        expect(html).toContain('Onyx Empire');
        expect(html).toContain('Federated Districts of the Prefecture');
    });

    it('renders live articles with relocated tactical imagery', () => {
        const autocannon = getCodexArticle('Terran Autocannon');
        expect(autocannon).toBeDefined();
        const acHtml = CodexRenderer.render(autocannon!.rawContent, autocannon!.images);
        expect(acHtml).toContain('assets/codex/TerranRotaryAutocannon.jpg');

        const activeProbe = getCodexArticle('Terran Active Probe');
        expect(activeProbe).toBeDefined();
        const apHtml = CodexRenderer.render(activeProbe!.rawContent, activeProbe!.images);
        expect(apHtml).toContain('assets/codex/TerranActiveProbe.jpg');

        const missiles = getCodexArticle('Terran Conventional Missile Warheads');
        expect(missiles).toBeDefined();
        const missileHtml = CodexRenderer.render(missiles!.rawContent, missiles!.images);
        expect(missileHtml).toContain('assets/codex/TerranStreakSRM.jpg');
        expect(missileHtml).toContain('assets/codex/TerranOrcaArtilleryMissile.jpg');
    });
});

import { describe, it, expect } from 'vitest';
import { getCodexArticle } from './articleRegistry';
import { CodexRenderer } from './CodexRenderer';
import { scientificPrinciplesIndexArticle } from './articles/Scientific_Principles_Index';

describe('Scientific Principles Codex & Science Templates', () => {
    it('registers the Scientific Principles and Science directory under aliases', () => {
        expect(getCodexArticle('Scientific_Principles')).toBeDefined();
        expect(getCodexArticle('Scientific Principles')).toBeDefined();
        expect(getCodexArticle('scientific_principles')).toBeDefined();
        expect(getCodexArticle('Category:Scientific_Principles')).toBeDefined();
        expect(getCodexArticle('Category:Scientific Principles')).toBeDefined();
        expect(getCodexArticle('Science')).toBeDefined();
        expect(getCodexArticle('science')).toBeDefined();
        expect(getCodexArticle('Category:Science')).toBeDefined();
        expect(getCodexArticle('category:science')).toBeDefined();
        expect(getCodexArticle(':Category:Science')).toBeDefined();

        expect(getCodexArticle('Scientific_Principles')).toBe(scientificPrinciplesIndexArticle);
        expect(getCodexArticle('Scientific_Principles')?.slug).toBe('Scientific_Principles');
        expect(getCodexArticle('Scientific_Principles')?.title).toBe('Scientific Principles');
    });

    it('registers key scientific principle, propulsion, biology, and physics articles', () => {
        const testArticles = [
            'Hyperspace',
            'Subspace',
            'Wormholes',
            'Tesseract',
            'Baihros Estin Fohrvik',
            'Nuclear Thermal Rocket',
            'Induction Engine - Ikronin',
            'Particle Impulse Engine - Ikronin',
            'Entropy Drive',
            'Terran Gravity Cavitation Drive',
            'Volstamik-Krenschov Drive',
            'Ramjet',
            'Ion Propulsion',
            'ULESKO Power-Assist Actuators',
            'Gravitics',
            'Muon Catalyzed Fusion Reactor',
            'Antimatter',
            'Cloning',
            'Cold Sleep',
            'Apöt Virus',
            "Zander's Strain",
            'Fenrulf',
            'Kujata (Volucris Flyer)',
            'Blister (Volucris Ground Breed)',
            'Ralek',
            'Physics',
            'Propulsion',
            'Medicine',
            'Biology',
            'Chemistry',
            'Astronomy'
        ];

        for (const title of testArticles) {
            const article = getCodexArticle(title);
            expect(article, `Expected lookup for "${title}" to succeed`).toBeDefined();
        }
    });

    it('renders the Scientific Principle Information infobox with theoretical metadata and styling', () => {
        const sampleWikitext = `{{Scientific Principle Information|
|name = Gravitics
|field = Physics
|subfield = Fundamental Forces
|classification = Gravitational Field Dynamics
|principles = Graviton manipulation and artificial gravity waves
|applications = Gravity plating, Repulsor lifts, Tractor beams
|status = Operational
}}
Gravitics is the science of manipulating gravitational fields.`;

        const html = CodexRenderer.render(sampleWikitext);

        expect(html).toContain('class="codex-infobox science-information"');
        expect(html).toContain('SCIENTIFIC ARCHIVE // THEORETICAL PRINCIPLE');
        expect(html).toContain('Gravitics');
        expect(html).toContain('Physics');
        expect(html).toContain('Fundamental Forces');
        expect(html).toContain('Gravitational Field Dynamics');
        expect(html).toContain('Graviton manipulation');
        expect(html).toContain('Gravity plating');
        expect(html).toContain('Operational');
        expect(html).toContain('Gravitics is the science of manipulating gravitational fields.');
    });

    it('renders live science articles with diagrams and proper infobox fields', () => {
        const hyperspace = getCodexArticle('Hyperspace');
        expect(hyperspace).toBeDefined();
        if (hyperspace) {
            const html = CodexRenderer.render(hyperspace.rawContent, hyperspace.images);
            expect(html).toContain('Hyperspace');
            expect(html).toContain('science-information');
            expect(html).toContain('Faster-Than-Light Continuum');
            expect(html).toContain('Volstamik-Krenschov Jump Drive');
        }

        const ramjet = getCodexArticle('Ramjet');
        expect(ramjet).toBeDefined();
        if (ramjet) {
            const html = CodexRenderer.render(ramjet.rawContent, ramjet.images);
            expect(html).toContain('Ramjet');
            expect(html).toContain('science-information');
            expect(html).toContain('assets/codex/Ramjet.png');
            expect(html).toContain('Bussard & Atmospheric Ramjet');
        }

        const antimatter = getCodexArticle('Antimatter');
        expect(antimatter).toBeDefined();
        if (antimatter) {
            const html = CodexRenderer.render(antimatter.rawContent, antimatter.images);
            expect(html).toContain('Antimatter');
            expect(html).toContain('science-information');
            expect(html).toContain('Total mass-energy conversion');
        }

        const apot = getCodexArticle('Apöt_Virus');
        expect(apot).toBeDefined();
        if (apot) {
            const html = CodexRenderer.render(apot.rawContent, apot.images);
            expect(html).toContain('Apöt Virus');
            expect(html).toContain('science-information');
            expect(html).toContain('Active Biohazard');
        }

        const kujata = getCodexArticle('Kujata_(Volucris_Flyer)');
        expect(kujata).toBeDefined();
        if (kujata) {
            const html = CodexRenderer.render(kujata.rawContent, kujata.images);
            expect(html).toContain('Kujata');
            expect(html).toContain('science-information');
            expect(html).toContain('assets/codex/Kujata_A.jpg');
            expect(html).toContain('Volucris Swarm');
        }
    });
});

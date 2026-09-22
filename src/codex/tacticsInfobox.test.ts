import { describe, it, expect } from 'vitest';
import { getCodexArticle } from './articleRegistry';
import { CodexRenderer } from './CodexRenderer';
import { tacticsAndTreatisesIndexArticle } from './articles/Tactics_and_Treatises_Index';

describe('Tactics and Treatises Codex & Doctrine Infobox Templates', () => {
    it('registers the Tactics and Treatises directory under aliases', () => {
        expect(getCodexArticle('Tactics_and_Treatises')).toBeDefined();
        expect(getCodexArticle('Tactics and Treatises')).toBeDefined();
        expect(getCodexArticle('tactics_and_treatises')).toBeDefined();
        expect(getCodexArticle('tactics and treatises')).toBeDefined();
        expect(getCodexArticle('Category:Tactics_and_Treatises')).toBeDefined();
        expect(getCodexArticle('Category:Tactics and Treatises')).toBeDefined();
        expect(getCodexArticle('Tactics')).toBeDefined();
        expect(getCodexArticle('tactics')).toBeDefined();
        expect(getCodexArticle('Category:Tactics')).toBeDefined();
        expect(getCodexArticle('category:tactics')).toBeDefined();
        expect(getCodexArticle('Treatises')).toBeDefined();
        expect(getCodexArticle('treatises')).toBeDefined();
        expect(getCodexArticle('Category:Treatises')).toBeDefined();
        expect(getCodexArticle('category:treatises')).toBeDefined();
        expect(getCodexArticle('Doctrine')).toBeDefined();
        expect(getCodexArticle('doctrine')).toBeDefined();

        expect(getCodexArticle('Tactics_and_Treatises')).toBe(tacticsAndTreatisesIndexArticle);
        expect(getCodexArticle('Tactics_and_Treatises')?.slug).toBe('Tactics_and_Treatises');
        expect(getCodexArticle('Tactics_and_Treatises')?.title).toBe('Tactics and Treatises');
    });

    it('registers key tactical combat doctrines and treatises', () => {
        const testArticles = [
            'Tactics: Engaging the Volucris',
            'Tactics:_Engaging_the_Volucris',
            'Treatise on Interstellar Travel',
            'Treatise_on_Interstellar_Travel',
            'Wild Weasel',
            'Wild_Weasel',
            'Tactics',
            'Treatises'
        ];

        for (const title of testArticles) {
            const article = getCodexArticle(title);
            expect(article, `Article "${title}" should be registered in Codex`).toBeDefined();
            expect(article?.rawContent.length).toBeGreaterThan(10);
        }
    });

    it('correctly parses and renders Tactical Doctrine Information templates with strategic HUD styling', () => {
        const rawTemplate = `{{Tactical Doctrine Information|
|name = Anti-Swarm Defense Protocol
|image = 
|caption = Defense in Depth Schema
|type = Combined Arms Doctrine
|author = [[Travis Carpenter]]
|date = Volucris War Era
|subject = Frontline Perimeter Fortifications
|theater = Planetary Ground Warfare
|key_principles = Layered minefields; Fallback killzones; Coordinated Rig and armor counter-charges
|status = Active Standard
}}
The protocol details frontline tactical defense.`;

        const html = CodexRenderer.render(rawTemplate);

        expect(html).toContain('doctrine-header');
        expect(html).toContain('STRATEGIC COMMAND // TACTICAL DOCTRINE');
        expect(html).toContain('Anti-Swarm Defense Protocol');
        expect(html).toContain('Combined Arms Doctrine');
        expect(html).toContain('Travis Carpenter');
        expect(html).toContain('Volucris War Era');
        expect(html).toContain('Planetary Ground Warfare');
        expect(html).toContain('Layered minefields');
        expect(html).toContain('Active Standard');
        expect(html).toContain('The protocol details frontline tactical defense.');
    });

    it('renders Treatise Information templates properly', () => {
        const rawTemplate = `{{Treatise Information|
|name = Treatise on Interstellar Travel
|author = Joan Andrek, Galactic Herald Correspondent
|date = 24th Century
|type = Scientific & Commercial Transit Treatise
|subject = Faster-Than-Light (FTL) Transit Technologies
|theater = Interstellar Commerce & Navigation
|key_principles = Ikronin Wormhole Gates, Military Hyperspace, Subspace Stealth, Meroniri Tesseract Singularity
|status = Published Survey
}}
An overview of transit across the star systems.`;

        const html = CodexRenderer.render(rawTemplate);

        expect(html).toContain('doctrine-header');
        expect(html).toContain('STRATEGIC COMMAND // TACTICAL DOCTRINE');
        expect(html).toContain('Treatise on Interstellar Travel');
        expect(html).toContain('Joan Andrek, Galactic Herald Correspondent');
        expect(html).toContain('24th Century');
        expect(html).toContain('Scientific & Commercial Transit Treatise');
        expect(html).toContain('Ikronin Wormhole Gates');
        expect(html).toContain('Published Survey');
    });

    it('renders live article content for Tactics: Engaging the Volucris with tactical infobox and relocated imagery', () => {
        const article = getCodexArticle('Tactics: Engaging the Volucris');
        expect(article).toBeDefined();

        const html = CodexRenderer.render(article!.rawContent, article!.images);
        expect(html).not.toContain('{{Tactical Doctrine Information');
        expect(html).toContain('doctrine-header');
        expect(html).toContain('Tactics: Engaging the Volucris');
        expect(html).toContain('Travis Carpenter');
        expect(html).toContain('assets/codex/VolucrisNymph.jpg');
        expect(html).toContain('Volucris Nymph - agile frontline swarm strain');
        expect(html).toContain('Killing Volucris is not like killing people.');
    });

    it('renders live article content for Treatise on Interstellar Travel with complete sections', () => {
        const article = getCodexArticle('Treatise on Interstellar Travel');
        expect(article).toBeDefined();

        const html = CodexRenderer.render(article!.rawContent, article!.images);
        expect(html).not.toContain('{{Treatise Information');
        expect(html).toContain('doctrine-header');
        expect(html).toContain('Treatise on Interstellar Travel');
        expect(html).toContain('Wormholes');
        expect(html).toContain('Hyperspace');
        expect(html).toContain('Subspace');
        expect(html).toContain('Tesseract');
    });

    it('renders live article content for Wild Weasel with SEAD doctrine metadata', () => {
        const article = getCodexArticle('Wild Weasel');
        expect(article).toBeDefined();

        const html = CodexRenderer.render(article!.rawContent, article!.images);
        expect(html).not.toContain('{{Tactical Doctrine Information');
        expect(html).toContain('doctrine-header');
        expect(html).toContain('Wild Weasel');
        expect(html).toContain('Suppression of Enemy Air Defenses (SEAD) Doctrine');
        expect(html).toContain('Project Wild Weasel');
    });

    it('renders Tactics and Treatises index with separate list items rather than a single paragraph', () => {
        const article = getCodexArticle('Tactics and Treatises');
        expect(article).toBeDefined();

        const html = CodexRenderer.render(article!.rawContent, article!.images);

        // Must contain unordered list tags and list items
        expect(html).toContain('<ul class="codex-list">');
        expect(html).toContain('<li class="codex-list-item">');

        // Verify key doctrine and treatise topics are wrapped as individual list items
        expect(html).toMatch(/<li class="codex-list-item">[\s\S]*?Tactics: Engaging the Volucris[\s\S]*?<\/li>/);
        expect(html).toMatch(/<li class="codex-list-item">[\s\S]*?Wild Weasel[\s\S]*?<\/li>/);
        expect(html).toMatch(/<li class="codex-list-item">[\s\S]*?Treatise on Interstellar Travel[\s\S]*?<\/li>/);

        // Verify introductory sentence is rendered as its own paragraph, not merged into the list
        expect(html).toMatch(/<p class="codex-p">[\s\S]*?The <a [^>]+>Tactics<\/a> classification collects frontline operational doctrines/);
    });

    it('renders mixed blocks without blank lines as separate paragraph and list elements', () => {
        const wikitext = `Introductory explanation without blank line:
* First bullet item
* Second bullet item
Trailing closing remark.`;

        const html = CodexRenderer.render(wikitext);
        expect(html).toContain('<p class="codex-p">Introductory explanation without blank line:</p>');
        expect(html).toContain('<ul class="codex-list">');
        expect(html).toContain('<li class="codex-list-item">First bullet item</li>');
        expect(html).toContain('<li class="codex-list-item">Second bullet item</li>');
        expect(html).toContain('<p class="codex-p">Trailing closing remark.</p>');
    });
});

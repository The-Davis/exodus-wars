import { describe, it, expect } from 'vitest';
import { getCodexArticle } from './articleRegistry';
import { CodexRenderer } from './CodexRenderer';
import { racesIndexArticle } from './articles/Races_Index';

describe('Races Codex & Race/Species Information Infobox', () => {
    it('registers the Races directory article under various slug and category aliases', () => {
        expect(getCodexArticle('Races')).toBeDefined();
        expect(getCodexArticle('races')).toBeDefined();
        expect(getCodexArticle('Category:Races')).toBeDefined();
        expect(getCodexArticle('category:races')).toBeDefined();
        expect(getCodexArticle(':Category:Races')).toBeDefined();
        expect(getCodexArticle('Race')).toBeDefined();
        expect(getCodexArticle('race')).toBeDefined();
        expect(getCodexArticle('Category:Humans')).toBeDefined();
        expect(getCodexArticle('Races')).toBe(racesIndexArticle);
        expect(getCodexArticle('Races')?.slug).toBe('Races');
        expect(getCodexArticle('Races')?.title).toBe('Races');
    });

    it('registers all 19 sapient human lineages and alien species articles', () => {
        const testRaces = [
            'Terrans',
            'Meroniri',
            'Mesarthrim',
            'Ixoarchada',
            'Lorithos',
            'Anderung',
            'Gorhamut',
            'Volucris',
            'Ngrligru',
            'Sirunaki',
            'Ikronin',
            'Volucris_Worker',
            'Volucris Worker',
            'Reigens',
            'Mesarnak',
            'Mtomigru',
            'Anthronoris',
            'Torimin',
            'Humans',
            'Juns'
        ];

        for (const race of testRaces) {
            const article = getCodexArticle(race);
            expect(article, `Expected lookup for "${race}" to succeed`).toBeDefined();
        }
    });

    it('renders the Race Information infobox with xenological taxonomy and characteristics', () => {
        const sampleWikitext = `{{Race Information|
|name=Mesarthrim
|image=[[Image:Mesarthrim Warrior.png]]
|caption=Mesarthrim Clan Warrior
|classification=Homo Mesarthes
|homeworld=[[Mesar]]
|average_height=1.85 meters
|average_lifespan=85 years
|language=[[Halrecht]], [[English]]
|government=[[United Mesarthrim Clans]], [[United Centusi States]]
|metabolism=Standard human omnivorous metabolism
|status=Extant
}}
The Mesarthrim are hardened clan warriors.`;

        const html = CodexRenderer.render(sampleWikitext);

        expect(html).toContain('class="codex-infobox race-information"');
        expect(html).toContain('XENOLOGICAL ARCHIVE // SAPIENT SPECIES');
        expect(html).toContain('Mesarthrim');
        expect(html).toContain('Homo Mesarthes');
        expect(html).toContain('Mesar');
        expect(html).toContain('1.85 meters');
        expect(html).toContain('85 years');
        expect(html).toContain('Halrecht');
        expect(html).toContain('United Mesarthrim Clans');
        expect(html).toContain('Standard human omnivorous metabolism');
        expect(html).toContain('Extant');
        expect(html).toContain('The Mesarthrim are hardened clan warriors.');
    });

    it('renders the Species Information template alias interchangeably', () => {
        const sampleWikitext = `{{Species Information|
|species=Gorhamut
|classification=Saurian Geneticist
|homeworld=[[Gorhamut Homeworld]]
|status=Ancient Extragalactic
}}
The Gorhamut are master genetic engineers.`;

        const html = CodexRenderer.render(sampleWikitext);

        expect(html).toContain('class="codex-infobox race-information"');
        expect(html).toContain('Gorhamut');
        expect(html).toContain('Saurian Geneticist');
        expect(html).toContain('Gorhamut Homeworld');
        expect(html).toContain('Ancient Extragalactic');
        expect(html).toContain('The Gorhamut are master genetic engineers.');
    });

    it('renders Volucris Worker with toggleable image resolution', () => {
        const workerArticle = getCodexArticle('Volucris_Worker');
        expect(workerArticle).toBeDefined();

        if (workerArticle) {
            const html = CodexRenderer.render(workerArticle.rawContent, workerArticle.images);
            expect(html).toContain('Volucris Worker');
            expect(html).toContain('assets/codex/VolucrisWorker.png');
            expect(html).toContain('The Worker Gestalt');
        }
    });

    it('renders major race articles with properly formatted sections and wikilinks', () => {
        const terrans = getCodexArticle('Terrans');
        expect(terrans).toBeDefined();
        if (terrans) {
            const html = CodexRenderer.render(terrans.rawContent, terrans.images);
            expect(html).toContain('Overview');
            expect(html).toContain('Social Structure');
            expect(html).toContain('Ikronin');
            expect(html).toContain('Meroniri');
        }

        const meroniri = getCodexArticle('Meroniri');
        expect(meroniri).toBeDefined();
        if (meroniri) {
            const html = CodexRenderer.render(meroniri.rawContent, meroniri.images);
            expect(html).toContain('Meroniri Terinasi');
            expect(html).toContain('Alliance of Planets');
        }

        const gorhamut = getCodexArticle('Gorhamut');
        expect(gorhamut).toBeDefined();
        if (gorhamut) {
            const html = CodexRenderer.render(gorhamut.rawContent, gorhamut.images);
            expect(html).toContain('Appearance');
            expect(html).toContain('Skeletal System');
        }
    });
});

import { describe, it, expect } from 'vitest';
import { getCodexArticle } from './articleRegistry';
import { CodexRenderer } from './CodexRenderer';
import { economicsIndexArticle } from './articles/Economics_Index';

describe('Economics Codex & Financial/Monetary Templates', () => {
    it('registers the Economics and Currency directory articles under various aliases', () => {
        expect(getCodexArticle('Economics')).toBeDefined();
        expect(getCodexArticle('economics')).toBeDefined();
        expect(getCodexArticle('Category:Economics')).toBeDefined();
        expect(getCodexArticle('category:economics')).toBeDefined();
        expect(getCodexArticle(':Category:Economics')).toBeDefined();
        expect(getCodexArticle('Economy')).toBeDefined();
        expect(getCodexArticle('Currency')).toBeDefined();
        expect(getCodexArticle('Category:Currency')).toBeDefined();
        expect(getCodexArticle('Economics')).toBe(economicsIndexArticle);
        expect(getCodexArticle('Economics')?.slug).toBe('Economics');
        expect(getCodexArticle('Economics')?.title).toBe('Economics');
    });

    it('registers all 23 economic systems and currency articles', () => {
        const testArticles = [
            'Economy of the Federated Districts of the Prefecture',
            'Economy_of_the_United_Earth_Alliance',
            'Economy of the Colonial Commonwealth',
            'Economy of the Ikronin Jurekön',
            'Economy of the Taviridis Somarchada',
            'Economy of the Auellal League',
            'Economy of the Kalidasa Planetary Authority',
            'Economy of Rikaz o Fii Huern iv Lorithan',
            'Economy of the Meroniri Terinasi',
            'Economy of the Icronian Consortium',
            'Gold standard',
            'Fiat currency',
            'Recession',
            'Gross Domestic Product',
            'Peculium',
            'Shero',
            'Likvada',
            'Mesarthrim Mark',
            'Imperial Credit',
            'Dollar',
            'Sirio',
            'Reál',
            'Hira'
        ];

        for (const title of testArticles) {
            const article = getCodexArticle(title);
            expect(article, `Expected lookup for "${title}" to succeed`).toBeDefined();
        }
    });

    it('renders the Currency Information infobox with monetary standards and issuing authorities', () => {
        const sampleWikitext = `{{Currency Information|
|currency=Peculium
|symbol=P
|issuer=[[Federated Districts of the Prefecture]]
|standard=[[Gold standard]] (1g gold / 100P)
|subunit=1/25P, 1/2P
|introduced=June 1st, [[2323]]
|replaced=[[Imperial Credit]]
|denominations=Quarter, Half, 1P, 5P, 10P, 20P, 100P
|status=Official Currency
}}
The Peculium is the Prefecture's national currency.`;

        const html = CodexRenderer.render(sampleWikitext);

        expect(html).toContain('class="codex-infobox currency-information"');
        expect(html).toContain('FINANCIAL ARCHIVE // MONETARY SYSTEM');
        expect(html).toContain('Peculium');
        expect(html).toContain('Federated Districts of the Prefecture');
        expect(html).toContain('Gold standard');
        expect(html).toContain('1/25P, 1/2P');
        expect(html).toContain('June 1st');
        expect(html).toContain('Imperial Credit');
        expect(html).toContain('Quarter, Half, 1P, 5P, 10P, 20P, 100P');
        expect(html).toContain('Official Currency');
        expect(html).toContain('The Peculium is the Prefecture\'s national currency.');
    });

    it('renders the Economy Information infobox with macroeconomic indicators', () => {
        const sampleWikitext = `{{Economy Information|
|nation=Federated Districts of the Prefecture
|currency=[[Peculium]]
|gdp=1.2 quadrillion Peculiums
|industries=Aerospace manufacturing, heavy mining, fusion power
|trade_partners=[[Alliance of Planets]], [[Ikronin Jurekön]]
|status=Post-war industrial expansion
}}
The Prefecture economy is rapidly expanding.`;

        const html = CodexRenderer.render(sampleWikitext);

        expect(html).toContain('class="codex-infobox economy-information"');
        expect(html).toContain('ECONOMIC SURVEY // MACROECONOMICS');
        expect(html).toContain('Federated Districts of the Prefecture');
        expect(html).toContain('Peculium');
        expect(html).toContain('1.2 quadrillion Peculiums');
        expect(html).toContain('Aerospace manufacturing');
        expect(html).toContain('Alliance of Planets');
        expect(html).toContain('The Prefecture economy is rapidly expanding.');
    });

    it('renders live currency and economic articles cleanly', () => {
        const peculium = getCodexArticle('Peculium');
        expect(peculium).toBeDefined();
        if (peculium) {
            const html = CodexRenderer.render(peculium.rawContent);
            expect(html).toContain('Peculium');
            expect(html).toContain('Imperial Credit');
            expect(html).toContain('gold standard');
            expect(html).toContain('Quarter Peculium');
            expect(html).toContain('Hundred Peculium');
        }

        const prefEcon = getCodexArticle('Economy_of_the_Federated_Districts_of_the_Prefecture');
        expect(prefEcon).toBeDefined();
        if (prefEcon) {
            const html = CodexRenderer.render(prefEcon.rawContent);
            expect(html).toContain('Prefecture');
        }

        const gdp = getCodexArticle('Gross_Domestic_Product');
        expect(gdp).toBeDefined();
        if (gdp) {
            const html = CodexRenderer.render(gdp.rawContent);
            expect(html).toContain('Gross Domestic Product');
        }
    });
});

import { describe, it, expect } from 'vitest';
import { getCodexArticle } from './articleRegistry';
import { CodexRenderer } from './CodexRenderer';
import { nationsIndexArticle } from './articles/Nations_Index';

describe('Nations Codex & Political/Alliance Templates', () => {
    it('registers the Nations and Alliance directory articles under various aliases', () => {
        expect(getCodexArticle('Nations')).toBeDefined();
        expect(getCodexArticle('nations')).toBeDefined();
        expect(getCodexArticle('Category:Nations')).toBeDefined();
        expect(getCodexArticle('category:nations')).toBeDefined();
        expect(getCodexArticle(':Category:Nations')).toBeDefined();
        expect(getCodexArticle('Nation')).toBeDefined();
        expect(getCodexArticle('Alliance')).toBeDefined();
        expect(getCodexArticle('Category:Alliance')).toBeDefined();
        expect(getCodexArticle('Nations')).toBe(nationsIndexArticle);
        expect(getCodexArticle('Nations')?.slug).toBe('Nations');
        expect(getCodexArticle('Nations')?.title).toBe('Nations');
    });

    it('registers all 38 sovereign nations, empires, and interstellar alliances', () => {
        const testNations = [
            'Federated Districts of the Prefecture',
            'United Centusi States',
            'United Earth Alliance',
            'United Mesarthrim Clans',
            'Mesarthrim Federation',
            'Meroniri Terinasi',
            'Onyx Empire',
            'Ikronin Jurekön',
            'Taviridis Somarchada',
            'Auellal League',
            'Colonial Commonwealth',
            'Sol System Authority',
            'Reigess Suverände',
            'Rikaz o Fii Huern iv Lorithan',
            'Rikaz o Fii Cai iv Huerna',
            'Kalidasa Planetary Authority',
            "Oronus Worker's Coalition",
            'Volucris Swarm',
            'The Remnant',
            'Comur Resistance',
            'The Liberator Sons',
            'Overseer Administration of the Mesarthrim Clans',
            'Sirius Families',
            'Berlusconi Family Territory',
            'Asanova Family Territory',
            'Nakamura Family Territory',
            'Blasius Family Territory',
            'Pax Anthronoris',
            'Yurtosh hora ven Serthra',
            "Kabila iku Gol'nde",
            'Kabila Kimburu',
            'Sirunaki Reshkeren',
            'Jurazoar Maropsene',
            'Alliance of Planets',
            'Council of Independent Nations',
            'Tripartite Alliance',
            'Prometheus Protocols',
            'Cinaed Accords'
        ];

        for (const title of testNations) {
            const article = getCodexArticle(title);
            expect(article, `Expected lookup for "${title}" to succeed`).toBeDefined();
        }
    });

    it('renders the Nation Information infobox with sovereignty metadata and flag', () => {
        const sampleWikitext = `{{Nation Information|
|image=[[Image:PrefectureFlag.png|200px]]
|caption=Flag of the Prefecture.
|name=Federated Districts of the Prefecture
|motto=Freedom before Security, Death before Tyranny.
|anthem=The Grand Procession
|national_symbol=Raven
|capital=[[Ueda]]
|language=[[English]], [[German]]
|government=Democratic Military Federation
|head_of_state=[[Prefect]] [[Anthony Hadrian]]
|formation=September 9, [[2322]]
|status=Active
|area=22 star systems
|population=48,000,000,000
|gdp=1.2 quadrillion [[Peculium|Peculiums]]
|currency=[[Peculium]]
}}
The Federated Districts of the Prefecture is a major power.`;

        const html = CodexRenderer.render(sampleWikitext, {
            'PrefectureFlag.png': {
                legacy: 'assets/codex/PrefectureFlag.png',
                alt: 'Flag of the Prefecture'
            }
        });

        expect(html).toContain('class="codex-infobox nation-information"');
        expect(html).toContain('POLITICAL ARCHIVE // SOVEREIGN NATION');
        expect(html).toContain('Federated Districts of the Prefecture');
        expect(html).toContain('Freedom before Security, Death before Tyranny.');
        expect(html).toContain('The Grand Procession');
        expect(html).toContain('Raven');
        expect(html).toContain('Ueda');
        expect(html).toContain('English');
        expect(html).toContain('Democratic Military Federation');
        expect(html).toContain('Anthony Hadrian');
        expect(html).toContain('September 9');
        expect(html).toContain('22 star systems');
        expect(html).toContain('48,000,000,000');
        expect(html).toContain('Peculium');
        expect(html).toContain('assets/codex/PrefectureFlag.png');
        expect(html).toContain('The Federated Districts of the Prefecture is a major power.');
    });

    it('renders the Alliance Information infobox with headquarters and member nations', () => {
        const sampleWikitext = `{{Alliance Information|
|name=Alliance of Planets
|flag=[[Image:AllianceOfPlanetsFlag.png|150px]]
|badge=
|building=[[Consulis Sanctum]]
|headquarters=[[Sepulare]]
|title=Lothenar
|leader=[[Naimen Ladosen]]
|event=[[Sepulare Accord]]
|date=[[2150]]
|number=6 Nations
|members=[[Meroniri Terinasi]], [[Ikronin Jurekön]], [[Lorithos]], [[United Earth Alliance]], [[Prefecture]]
}}
The Alliance of Planets is the preeminent galactic federation.`;

        const html = CodexRenderer.render(sampleWikitext, {
            'AllianceOfPlanetsFlag.png': {
                legacy: 'assets/codex/AllianceOfPlanetsFlag.png',
                alt: 'Alliance of Planets Flag'
            }
        });

        expect(html).toContain('class="codex-infobox alliance-information"');
        expect(html).toContain('INTERSTELLAR TREATY // ALLIANCE ACCORD');
        expect(html).toContain('Alliance of Planets');
        expect(html).toContain('Consulis Sanctum');
        expect(html).toContain('Sepulare');
        expect(html).toContain('Lothenar');
        expect(html).toContain('Naimen Ladosen');
        expect(html).toContain('Sepulare Accord');
        expect(html).toContain('2150');
        expect(html).toContain('6 Nations');
        expect(html).toContain('Meroniri Terinasi');
        expect(html).toContain('assets/codex/AllianceOfPlanetsFlag.png');
        expect(html).toContain('The Alliance of Planets is the preeminent galactic federation.');
    });

    it('renders live nation and alliance articles with full markup', () => {
        const pref = getCodexArticle('Federated_Districts_of_the_Prefecture');
        expect(pref).toBeDefined();
        if (pref) {
            const html = CodexRenderer.render(pref.rawContent, pref.images);
            expect(html).toContain('Federated Districts of the Prefecture');
            expect(html).toContain('nation-information');
            expect(html).toContain('assets/codex/PrefectureFlag.png');
            expect(html).toContain('Anthony Hadrian');
        }

        const ucs = getCodexArticle('United_Centusi_States');
        expect(ucs).toBeDefined();
        if (ucs) {
            const html = CodexRenderer.render(ucs.rawContent, ucs.images);
            expect(html).toContain('United Centusi States');
            expect(html).toContain('Chancellor');
            expect(html).toContain('Stone Bridge');
            expect(html).toContain('assets/codex/UnitedCentusiStatesFlag.png');
        }

        const aop = getCodexArticle('Alliance_of_Planets');
        expect(aop).toBeDefined();
        if (aop) {
            const html = CodexRenderer.render(aop.rawContent, aop.images);
            expect(html).toContain('Alliance of Planets');
            expect(html).toContain('alliance-information');
            expect(html).toContain('assets/codex/AllianceOfPlanetsFlag.png');
        }
    });
});

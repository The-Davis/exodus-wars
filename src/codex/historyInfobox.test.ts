import { describe, it, expect } from 'vitest';
import { getCodexArticle } from './articleRegistry';
import { CodexRenderer } from './CodexRenderer';
import { historyIndexArticle } from './articles/History_Index';

describe('History Codex & Infobox Templates', () => {
    it('registers the History directory article under various slug and category aliases', () => {
        expect(getCodexArticle('History')).toBeDefined();
        expect(getCodexArticle('history')).toBeDefined();
        expect(getCodexArticle('Category:History')).toBeDefined();
        expect(getCodexArticle('category:history')).toBeDefined();
        expect(getCodexArticle(':Category:History')).toBeDefined();
        expect(getCodexArticle('History')).toBe(historyIndexArticle);
        expect(getCodexArticle('History')?.slug).toBe('History');
        expect(getCodexArticle('History')?.title).toBe('History');
    });

    it('registers all key historical conflicts, eras, and treaties', () => {
        const testArticles = [
            'Battle of Novar',
            'Battle_of_Novar',
            'First Exodus',
            'First_Exodus_War',
            'Second Exodus War',
            'Sundering',
            'Tempest War',
            'The Millennium War',
            'Mesarthrim Civil War',
            'Volucris War',
            'Treaty of Volyn',
            'Treaty of Tavou',
            'Prometheus Summit',
            'Lorithos Bronze Age',
            'Resistance against the Empire',
            'Siege of Stone Bridge'
        ];

        for (const title of testArticles) {
            const article = getCodexArticle(title);
            expect(article, `Expected lookup for "${title}" to succeed`).toBeDefined();
        }
    });

    it('renders the Military Conflict infobox with dual-column belligerents and commanders', () => {
        const sampleWikitext = `{{Military Conflict|
|conflict=Battle of Novar
|partof=Tempest War
|date=January 31st, [[2335]]
|place=[[Honis System]]
|territory=[[United Centusi States|Centusi States]] Territory
|status=[[Mesarthrim Federation]] Victory
|result=Blockade of Centusi stronghold of [[New Hanover]]
|combatant1=[[Image:UnitedCentusiStatesFlag.png|20px]] [[United Centusi States]]
|combatant2=[[Image:MesarthrimFederationFlag.png|20px]] [[Mesarthrim Federation]]
|commander1=[[Image:UnitedCentusiStatesFlag.png|20px]] Admiral [[Friedrich Ahrens]]
|commander2=[[Image:MesarthrimFederationFlag.png|20px]] Kapitan Wilfred Kasher von Stadt
|strength1=Krieg Flotte Survivors
|strength2=Ziegler Convoy
}}
The Battle of Novar was the last major naval battle of the [[Tempest War]].`;

        const html = CodexRenderer.render(sampleWikitext);

        expect(html).toContain('class="codex-infobox conflict-information"');
        expect(html).toContain('TACTICAL RECORD // MILITARY CONFLICT');
        expect(html).toContain('Battle of Novar');
        expect(html).toContain('Tempest War');
        expect(html).toContain('Honis System');
        expect(html).toContain('Mesarthrim Federation');
        expect(html).toContain('Victory');
        expect(html).toContain('Belligerents');
        expect(html).toContain('Commanders');
        expect(html).toContain('Strength');
        expect(html).toContain('Friedrich Ahrens');
        expect(html).toContain('Wilfred Kasher von Stadt');
        expect(html).toContain('infobox-dual-col');
        expect(html).toContain('The Battle of Novar was the last major naval battle');
    });

    it('renders Historical Period Information with began and ended fields', () => {
        const sampleWikitext = `{{Historical Period Information|
|period=Lorithos Bronze Age
|image=
|caption=Bronze Age on Lorithos
|began=[[17000BC]]
|ended=[[12000BC]]
}}
The Bronze Age was a pivotal epoch.`;

        const html = CodexRenderer.render(sampleWikitext);

        expect(html).toContain('class="codex-infobox period-information"');
        expect(html).toContain('CHRONOLOGY // HISTORICAL PERIOD');
        expect(html).toContain('Lorithos Bronze Age');
        expect(html).toContain('17000BC');
        expect(html).toContain('12000BC');
        expect(html).toContain('The Bronze Age was a pivotal epoch.');
    });

    it('renders Treaty Information with signatories and results', () => {
        const sampleWikitext = `{{Treaty Information|
|name=Treaty of Volyn
|image=
|caption=
|date=October 12, [[2205]]
|place=[[Volyn]], [[Torimur]]
|signatories1=[[United Earth Alliance]]
|signatories2=[[Onyx Empire]]
|result=Armistice and demilitarized border zone established
}}
The Treaty of Volyn concluded the First Exodus War.`;

        const html = CodexRenderer.render(sampleWikitext);

        expect(html).toContain('class="codex-infobox treaty-information"');
        expect(html).toContain('DIPLOMATIC ACCORD // TREATY');
        expect(html).toContain('Treaty of Volyn');
        expect(html).toContain('Volyn');
        expect(html).toContain('Signatories');
        expect(html).toContain('United Earth Alliance');
        expect(html).toContain('Onyx Empire');
        expect(html).toContain('Armistice and demilitarized border zone established');
    });

    it('strips unhandled Navboxes cleanly from article content', () => {
        const sampleWikitext = `Some historical prelude text.
{{Tempest War Navbox}}
{{Second Exodus War Navbox}}
More historical aftermath text.`;

        const html = CodexRenderer.render(sampleWikitext);

        expect(html).not.toContain('Tempest War Navbox');
        expect(html).not.toContain('Second Exodus War Navbox');
        expect(html).toContain('Some historical prelude text.');
        expect(html).toContain('More historical aftermath text.');
    });

    it('renders live history articles with properly formatted markup', () => {
        const novar = getCodexArticle('Battle_of_Novar');
        expect(novar).toBeDefined();
        if (novar) {
            const html = CodexRenderer.render(novar.rawContent, novar.images);
            expect(html).toContain('Battle of Novar');
            expect(html).toContain('conflict-information');
            expect(html).toContain('United Centusi States');
            expect(html).toContain('Mesarthrim Federation');
        }

        const volyn = getCodexArticle('Treaty_of_Volyn');
        expect(volyn).toBeDefined();
        if (volyn) {
            const html = CodexRenderer.render(volyn.rawContent, volyn.images);
            expect(html).toContain('Treaty of Volyn');
            expect(html).toContain('treaty-information');
        }
    });

    it('renders History Index with dedicated sub-categories and miscellaneous history sections', () => {
        const historyArticle = getCodexArticle('History');
        expect(historyArticle).toBeDefined();
        const html = CodexRenderer.render(historyArticle!.rawContent);

        // Sub-categories section
        expect(html).toContain('History Sub-Categories');
        expect(html).toContain('Years');
        expect(html).toContain('Centuries');
        expect(html).toContain('Historical Terms');
        expect(html).toContain('Terran History');
        expect(html).toContain('Mesarthrim History');
        expect(html).toContain('Lorithos History');
        expect(html).toContain('Second Exodus War');
        expect(html).toContain('Tempest War');
        expect(html).toContain('Volucris War');
        expect(html).toContain('Volucris Incursion');
        expect(html).toContain('Voices from Lorithan');
        expect(html).toContain('Pelagrim Crisis');
        expect(getCodexArticle('Category:Years')).toBeDefined();
        expect(getCodexArticle('Category:Tempest War')).toBeDefined();

        // Miscellaneous History section
        expect(html).toContain('Miscellaneous History Articles');
        expect(html).toContain('Lorithos Bronze Age');
        expect(html).toContain('Master Plan');
        expect(html).toContain('Njaa');
        expect(html).toContain('Resistance against the Empire');
        expect(html).toContain('Talithe Cume');
        expect(html).toContain('The Technology Race');
    });

    it('resolves history subcategory hubs and newly imported articles', () => {
        // Subcategory Hubs
        expect(getCodexArticle('Centuries')).toBeDefined();
        expect(getCodexArticle('Category:Centuries')).toBeDefined();
        expect(getCodexArticle('Historical_Terms')).toBeDefined();
        expect(getCodexArticle('Category:Historical_Terms')).toBeDefined();
        expect(getCodexArticle('Terran_History')).toBeDefined();
        expect(getCodexArticle('Category:Terran_History')).toBeDefined();
        expect(getCodexArticle('Voices_from_Lorithan')).toBeDefined();
        expect(getCodexArticle('Category:Voices_from_Lorithan')).toBeDefined();

        // Century Articles
        expect(getCodexArticle('20th_Century')).toBeDefined();
        expect(getCodexArticle('21st_Century')).toBeDefined();
        expect(getCodexArticle('24th_Century')).toBeDefined();

        // Terran History Articles
        expect(getCodexArticle('World_War_I')).toBeDefined();
        expect(getCodexArticle('World_War_II')).toBeDefined();
        expect(getCodexArticle('World_War_III')).toBeDefined();

        // Second Exodus War Articles
        expect(getCodexArticle('Battle_of_Terra:_Mesarthrim_Offensive')).toBeDefined();
        expect(getCodexArticle('Storming_of_San_Francisco')).toBeDefined();
        expect(getCodexArticle('Third_Battle_of_Cronus')).toBeDefined();

        // Historical Terms
        expect(getCodexArticle('First_Contact')).toBeDefined();
        expect(getCodexArticle('Diaspora')).toBeDefined();
    });

    it('renders Military Operation Information template properly', () => {
        const sampleWikitext = `{{Military Operation Information|
|name = Operation Lawless
|operation_theater = Sol System
|executor = Prefecture First Fleet
|planner = Admiral Robert Marshall
|timeframe = 2324
|result = Complete victory
}}
Operation Lawless was launched to secure the outer system.`;

        const html = CodexRenderer.render(sampleWikitext);

        expect(html).toContain('conflict-information');
        expect(html).toContain('Operation Lawless');
        expect(html).toContain('Operation Theater');
        expect(html).toContain('Sol System');
        expect(html).toContain('Executor(s)');
        expect(html).toContain('Prefecture First Fleet');
        expect(html).toContain('Planner(s)');
        expect(html).toContain('Admiral Robert Marshall');
        expect(html).toContain('Timeframe');
        expect(html).toContain('2324');
        expect(html).toContain('Complete victory');
    });
});

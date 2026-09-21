import { describe, it, expect } from 'vitest';
import { getCodexArticle } from './articleRegistry';
import { CodexRenderer } from './CodexRenderer';
import { peopleIndexArticle } from './articles/People_Index';

describe('People Codex & Person Information Infobox', () => {
    it('registers the People directory article under various slug and category aliases', () => {
        expect(getCodexArticle('People')).toBeDefined();
        expect(getCodexArticle('people')).toBeDefined();
        expect(getCodexArticle('Category:People')).toBeDefined();
        expect(getCodexArticle('category:people')).toBeDefined();
        expect(getCodexArticle(':Category:People')).toBeDefined();
        expect(getCodexArticle('People')?.slug).toBe('People');
    });

    it('registers all 31 major character articles and allows flexible lookup', () => {
        const characters = [
            'Anthony Hadrian',
            'Lucius Black',
            'Robert Marshall',
            'Andreas Tischler',
            'William Camp',
            'Emil Torsc',
            'Scott Sanburn',
            'Talaris Roi',
            'Arnold Stadt',
            'Chris Dayton',
            'Dirken Huern',
            'Drimont Mandara',
            'Jack Ivonrud',
            'Jan Brooks',
            'Jiliur Beskolyda nav Raegos',
            'Mait Onega',
            'Mircas Rasune',
            'Naimen Ladosen',
            'Nathaniel Hinks',
            'Nicholai Asanova',
            'Nicodemo Guadalupe Piazzaro',
            'Rosh Arufin',
            'Sanor Cai',
            'Simon Blodgit',
            'Siovar Cai',
            'Steven Cue',
            'Travis Carpenter',
            'Chonge Kodwe',
            'Josiah MacArthur Hlow',
            'Lorrodi Raegos',
            'Blasius Gregöri János'
        ];

        for (const char of characters) {
            const byName = getCodexArticle(char);
            const bySlug = getCodexArticle(char.replace(/ /g, '_'));
            expect(byName, `Expected lookup for "${char}" to succeed`).toBeDefined();
            expect(bySlug, `Expected lookup for "${char.replace(/ /g, '_')}" to succeed`).toBeDefined();
        }
    });

    it('renders the Person Information infobox with header, fields, and image', () => {
        const sampleWikitext = `{{Person Information|
|name =Andreas Wilhelm Tischler
|image =[[Image:Andreas Tischler Portrait View.png]]
|caption =A portrait of Andreas Tischler.
|birth_date =October 20, [[2284]]
|birth_place =[[Tischler Clan]] Holdings, [[Mesar]], [[Centus System]]
|death_date =January 19, [[2324]]
|death_place =[[UMCS Krieger-Falke]]
|allegiance =[[United Mesarthrim Clans]]
|profession =Political Leader, Warrior
|recognitions =[[Clan Lord]] of the [[Tischler Clan]]
|achievements =Victory over the [[Anderung]]
}}

''Andreas Tischler'' was an influential leader.

[[Category:People]]
[[Category:Mesarthrim]]`;

        const html = CodexRenderer.render(sampleWikitext, {
            'Andreas_Tischler_Portrait_View.png': {
                legacy: 'assets/codex/Andreas_Tischler_Portrait_View.png',
                alt: 'Andreas Tischler'
            }
        });

        // Infobox structural checks
        expect(html).toContain('class="codex-infobox person-information"');
        expect(html).toContain('DOSSIER // PERSONNEL');
        expect(html).toContain('Andreas Wilhelm Tischler');
        expect(html).toContain('<th>Birth</th>');
        expect(html).toContain('<th>Death</th>');
        expect(html).toContain('<th>Allegiance(s)</th>');
        expect(html).toContain('<th>Profession</th>');
        expect(html).toContain('<th>Recognitions</th>');
        expect(html).toContain('<th>Achievements</th>');

        // Wikilink checks inside infobox
        expect(html).toContain('href="#/codex/2284"');
        expect(html).toContain('href="#/codex/Tischler%20Clan"');
        expect(html).toContain('href="#/codex/United%20Mesarthrim%20Clans"');

        // Image within infobox
        expect(html).toContain('codex-infobox-image');
        expect(html).toContain('A portrait of Andreas Tischler.');
        expect(html).toContain('data-can-toggle="false"');
        expect(html).not.toContain('codex-image-badge');

        // Category section
        expect(html).toContain('class="codex-categories-section"');
        expect(html).toContain('href="#/codex/Category:People"');
        expect(html).toContain('href="#/codex/Category:Mesarthrim"');
    });

    it('renders bullet lists from wikitext as structured tactical lists', () => {
        const html = CodexRenderer.render(peopleIndexArticle.rawContent);

        expect(html).toContain('<ul class="codex-list">');
        expect(html).toContain('<li class="codex-list-item">');
        expect(html).toContain('href="#/codex/Anthony%20Hadrian"');
        expect(html).toContain('href="#/codex/Lucius%20Black"');
        expect(html).toContain('href="#/codex/Category%3APeople%20by%20Nation"');
    });

    it('supports modern and legacy image toggle in infobox without badges', () => {
        const infoboxWithToggleImage = `{{Person Information|
|name =Test Commander
|image =Commander_Portrait.png
|caption =Tactical portrait
}}`;

        const html = CodexRenderer.render(infoboxWithToggleImage, {
            'Commander_Portrait.png': {
                modern: 'assets/codex/Commander_Portrait_modern.png',
                legacy: 'assets/codex/Commander_Portrait.png',
                alt: 'Test Commander'
            }
        });

        expect(html).toContain('data-can-toggle="true"');
        expect(html).toContain('data-current-mode="modern"');
        expect(html).toContain('Commander_Portrait_modern.png');
        expect(html).toContain('data-legacy-src=');
        expect(html).toContain('toggleable-cursor');
        expect(html).not.toContain('codex-image-badge');
    });
});

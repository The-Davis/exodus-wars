import { describe, it, expect } from 'vitest';
import { getCodexArticle } from './articleRegistry';
import { CodexRenderer } from './CodexRenderer';
import { corporationsIndexArticle } from './articles/Corporations_Index';

describe('Corporations Codex & Company Templates', () => {
    it('registers the Corporations and Companies directory under aliases', () => {
        expect(getCodexArticle('Corporations')).toBeDefined();
        expect(getCodexArticle('corporations')).toBeDefined();
        expect(getCodexArticle('Category:Corporations')).toBeDefined();
        expect(getCodexArticle('category:corporations')).toBeDefined();
        expect(getCodexArticle(':Category:Corporations')).toBeDefined();
        expect(getCodexArticle('Corporation')).toBeDefined();
        expect(getCodexArticle('Companies')).toBeDefined();
        expect(getCodexArticle('companies')).toBeDefined();
        expect(getCodexArticle('Category:Companies')).toBeDefined();
        expect(getCodexArticle('category:companies')).toBeDefined();
        expect(getCodexArticle(':Category:Companies')).toBeDefined();
        expect(getCodexArticle('Company')).toBeDefined();

        expect(getCodexArticle('Corporations')).toBe(corporationsIndexArticle);
        expect(getCodexArticle('Corporations')?.slug).toBe('Corporations');
        expect(getCodexArticle('Corporations')?.title).toBe('Corporations');
    });

    it('registers all 56 corporate entities across aerospace, defense, heavy industry, electronics, and energy', () => {
        const testCompanies = [
            'Antonov Company',
            'Consolidated Spaceworks',
            'Hyundai Heavy Industries',
            'Blasius állam-Nehézipar',
            'Rahn Industries',
            'Lycoming Airworks',
            'Sigori Helicopters',
            'Mesarbauer',
            'Fireline Industries',
            'Helsin Electronics',
            'Keh-Sor Terok',
            'Roseh Terok',
            'Parahs Forak Modar',
            'Reimao Airworks',
            'Alexi-Wrought Airworks',
            'Altoeing Foundries',
            'Freighterlines',
            'Kroning',
            'Northern Star',
            'Galvin Electronics',
            'Vor Krasin',
            'Hulsmeyer Internal Systems',
            'Rankine Generators',
            'Kodiak Arms',
            'Gavin Motor Company',
            'Meteor Corporation',
            'Civil Motor Company',
            'Jupiter Motor Company',
            'Tavou Imports Trading Group',
            'Global Electric',
            'Allied Body-Armor',
            'National MicroDynamics',
            'Astrolift Company',
            'Fairbrother Heavy Components',
            'New Dallas Industries',
            'Prudenski Chemical International',
            'Young-Watson Armory',
            'Saidia Optics',
            'Roberts Armory',
            'Ciran Arms Company',
            'Lariot Firearms Manufacturers',
            'State Industries of Kalidasa',
            'Tolwin Power Incorporated',
            'Dwight Propulsion Laboratories',
            'Strauss Energie',
            'Mesar Schnittstelle Gruppe',
            'Everest Composites',
            'Irridescent Energy Laboratories Incorporated',
            'Moravia Energy Laboratories',
            'Korshov Airworks',
            'Haven Shipyards',
            'Mystery Steel',
            'Congreve Drive Technologies',
            'Saeger Industrial Group',
            'Centusi Cargo',
            'Centusi-Luxusbehälter'
        ];

        for (const title of testCompanies) {
            const article = getCodexArticle(title);
            expect(article, `Expected lookup for "${title}" to succeed`).toBeDefined();
        }
    });

    it('renders the Company Information infobox with logo, corporate metadata, and styling', () => {
        const sampleWikitext = `{{Company Information|
|name = Antonov Company
|image = [[Image:AntonovCompanyLogo.png|200px]]
|caption = Antonov Company Logo.
|industry = Aerospace
|headquarters = Headquarter on [[Earth]]
|products = [[ADF Starfire]] & [[ADF Firestorm]]
}}
The Antonov Company was a major contractor.`;

        const html = CodexRenderer.render(sampleWikitext, {
            'AntonovCompanyLogo.png': {
                legacy: 'assets/codex/AntonovCompanyLogo.png',
                alt: 'Antonov Company Logo'
            }
        });

        expect(html).toContain('class="codex-infobox company-information"');
        expect(html).toContain('COMMERCIAL ENTITY // CORPORATE REGISTRY');
        expect(html).toContain('Antonov Company');
        expect(html).toContain('Aerospace');
        expect(html).toContain('Earth');
        expect(html).toContain('ADF Starfire');
        expect(html).toContain('assets/codex/AntonovCompanyLogo.png');
        expect(html).toContain('The Antonov Company was a major contractor.');
    });

    it('renders live company articles with logos and converted infoboxes', () => {
        const antonov = getCodexArticle('Antonov_Company');
        expect(antonov).toBeDefined();
        if (antonov) {
            const html = CodexRenderer.render(antonov.rawContent, antonov.images);
            expect(html).toContain('Antonov Company');
            expect(html).toContain('company-information');
            expect(html).toContain('Aerospace');
            expect(html).toContain('assets/codex/AntonovCompanyLogo.png');
        }

        const mesarbauer = getCodexArticle('Mesarbauer');
        expect(mesarbauer).toBeDefined();
        if (mesarbauer) {
            const html = CodexRenderer.render(mesarbauer.rawContent, mesarbauer.images);
            expect(html).toContain('Mesarbauer');
            expect(html).toContain('company-information');
            expect(html).toContain('assets/codex/Mb-logo.png');
        }

        const astrolift = getCodexArticle('Astrolift_Company');
        expect(astrolift).toBeDefined();
        if (astrolift) {
            const html = CodexRenderer.render(astrolift.rawContent, astrolift.images);
            expect(html).toContain('Astrolift Company');
            expect(html).toContain('company-information');
            expect(html).toContain('assets/codex/AstroliftLogo.png');
        }

        const rahn = getCodexArticle('Rahn_Industries');
        expect(rahn).toBeDefined();
        if (rahn) {
            const html = CodexRenderer.render(rahn.rawContent, rahn.images);
            expect(html).toContain('Rahn Industries');
            expect(html).toContain('assets/codex/RahnIndustriesLogo.png');
        }
    });
});

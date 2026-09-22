import { describe, it, expect } from 'vitest';
import {
    getCodexArticle,
    normalizeCategoryName,
    isCategoryArticle,
    getCategoryMembers,
    getAllUniqueArticles
} from './articleRegistry';
import { CodexRenderer } from './CodexRenderer';

describe('Codex Category Members & Directory Resolution', () => {
    describe('Category Helpers & Normalization', () => {
        it('normalizes category names consistently', () => {
            expect(normalizeCategoryName('Planets')).toBe('planets');
            expect(normalizeCategoryName('Category:Planets')).toBe('planets');
            expect(normalizeCategoryName(':Category:Planets')).toBe('planets');
            expect(normalizeCategoryName('category:planets')).toBe('planets');
            expect(normalizeCategoryName('Star Systems')).toBe('star systems');
            expect(normalizeCategoryName('Star_Systems')).toBe('star systems');
            expect(normalizeCategoryName('Category:Star_Systems')).toBe('star systems');
        });

        it('correctly identifies category articles', () => {
            const planetsArt = getCodexArticle('Planets');
            expect(planetsArt).toBeDefined();
            expect(isCategoryArticle(planetsArt)).toBe(true);

            const placesArt = getCodexArticle('Places');
            expect(placesArt).toBeDefined();
            expect(isCategoryArticle(placesArt)).toBe(true);

            const destroyersArt = getCodexArticle('Destroyers');
            expect(destroyersArt).toBeDefined();
            expect(isCategoryArticle(destroyersArt)).toBe(true);

            const earthArt = getCodexArticle('Earth');
            expect(earthArt).toBeDefined();
            expect(isCategoryArticle(earthArt)).toBe(false);

            expect(isCategoryArticle(null)).toBe(false);
            expect(isCategoryArticle(undefined)).toBe(false);
        });

        it('collects all unique articles', () => {
            const unique = getAllUniqueArticles();
            expect(unique.length).toBeGreaterThan(2000);
        });
    });

    describe('getCategoryMembers for Standard Categories', () => {
        it('resolves member planets for Category:Planets', () => {
            const result = getCategoryMembers('Planets');
            expect(result.categoryName).toBe('Planets');
            expect(result.totalCount).toBeGreaterThan(60);

            const pageSlugs = result.pages.map(p => p.slug);
            expect(pageSlugs).toContain('Earth');
            expect(pageSlugs).toContain('Mars');
            expect(pageSlugs).toContain('Torimur');
            expect(pageSlugs).toContain('Mesar');
            expect(pageSlugs).toContain('Adelson');
            expect(pageSlugs).toContain('Venus');

            // The Planets article itself should NOT be a member of Planets
            expect(pageSlugs).not.toContain('Planets');
            expect(result.subcategories.map(s => s.slug)).not.toContain('Planets');
        });

        it('resolves member moons for Category:Moons', () => {
            const result = getCategoryMembers('Moons');
            expect(result.totalCount).toBeGreaterThan(0);
            expect(result.pages.some(p => p.slug === 'Luna')).toBe(true);
        });

        it('resolves member galaxies for Category:Galaxies', () => {
            const result = getCategoryMembers('Galaxies');
            expect(result.totalCount).toBeGreaterThan(0);
            expect(result.pages.some(p => p.slug === 'Milky_Way' || p.title === 'Milky Way')).toBe(true);
        });

        it('resolves member spiral arms for Category:Spiral Arms', () => {
            const result = getCategoryMembers('Spiral Arms');
            expect(result.totalCount).toBeGreaterThan(0);
            const slugs = result.pages.map(p => p.slug);
            expect(slugs.some(s => s.includes('Orion_Arm') || s.includes('Perseus_Arm') || s.includes('Sagittarius_Arm'))).toBe(true);
        });

        it('resolves member sectors for Category:Sectors', () => {
            const result = getCategoryMembers('Sectors');
            expect(result.totalCount).toBeGreaterThan(5);
            const slugs = result.pages.map(p => p.slug);
            expect(slugs.some(s => s.includes('Sol_Sector') || s.includes('De_Mairan_Sector'))).toBe(true);
        });

        it('resolves member star systems for Category:Star Systems', () => {
            const result = getCategoryMembers('Star Systems');
            expect(result.totalCount).toBeGreaterThan(50);
        });

        it('resolves member cities for Category:Cities', () => {
            const result = getCategoryMembers('Cities');
            expect(result.totalCount).toBeGreaterThan(20);
        });

        it('resolves member years for Category:Years', () => {
            const result = getCategoryMembers('Years');
            expect(result.totalCount).toBeGreaterThan(250);
            const slugs = result.pages.map(p => p.slug);
            expect(slugs).toContain('2300');
            expect(slugs).toContain('2301');
            expect(slugs).toContain('100');
        });

        it('resolves member fighters and destroyers', () => {
            const fightersResult = getCategoryMembers('Fighters');
            expect(fightersResult.totalCount).toBeGreaterThan(50);

            const destroyersResult = getCategoryMembers('Destroyers');
            expect(destroyersResult.totalCount).toBeGreaterThan(15);
            expect(destroyersResult.pages.some(p => p.slug === 'ADF-4000_Class_Destroyer')).toBe(true);
        });

        it('resolves subcategories and pages for high-level hub Places', () => {
            const placesResult = getCategoryMembers('Places');
            expect(placesResult.subcategories.length).toBeGreaterThan(5);

            const subcatSlugs = placesResult.subcategories.map(s => s.slug);
            expect(subcatSlugs).toContain('Planets');
            expect(subcatSlugs).toContain('Moons');
            expect(subcatSlugs).toContain('Galaxies');
            expect(subcatSlugs).toContain('Spiral_Arms');
            expect(subcatSlugs).toContain('Sectors');

            expect(placesResult.pages.length).toBeGreaterThan(0);
        });
    });

    describe('Dynamic Category Fallback via getCodexArticle', () => {
        it('dynamically synthesizes category articles for valid categories with members', () => {
            const projWeaponsArt = getCodexArticle('Category:Projectile Weapons');
            expect(projWeaponsArt).toBeDefined();
            expect(isCategoryArticle(projWeaponsArt)).toBe(true);

            const members = getCategoryMembers(projWeaponsArt!);
            expect(members.totalCount).toBeGreaterThan(20);
        });
    });

    describe('CodexRenderer Integration', () => {
        it('renders category members section with letter index, badges, and wikilinks', () => {
            const planetsArt = getCodexArticle('Planets');
            expect(planetsArt).toBeDefined();

            const members = getCategoryMembers(planetsArt!);
            const html = CodexRenderer.render(planetsArt!.rawContent, planetsArt!.images, members);

            // Verify category members directory container
            expect(html).toContain('codex-category-members-section');
            expect(html).toContain('// ARCHIVE DIRECTORY');

            // Verify letter badges and letter jumps
            expect(html).toContain('codex-letter-badge');
            expect(html).toContain('codex-letter-jump');

            // Verify member links are working wikilinks with data-target
            expect(html).toContain('class="codex-wikilink"');
            expect(html).toContain('data-target="Earth"');
            expect(html).toContain('data-target="Mars"');
            expect(html).toContain('data-target="Torimur"');
            expect(html).toContain('data-target="Mesar"');
        });

        it('renders subcategories grid when subcategories are present', () => {
            const placesArt = getCodexArticle('Places');
            expect(placesArt).toBeDefined();

            const members = getCategoryMembers(placesArt!);
            const html = CodexRenderer.render(placesArt!.rawContent, placesArt!.images, members);

            expect(html).toContain('codex-subcat-grid');
            expect(html).toContain('codex-subcat-card');
            expect(html).toContain('data-target="Planets"');
            expect(html).toContain('data-target="Moons"');
        });

        it('renders empty notice when category has 0 records', () => {
            const emptyResult = {
                categoryName: 'Empty Category',
                subcategories: [],
                pages: [],
                totalCount: 0
            };
            const html = CodexRenderer.render('Sample description.', undefined, emptyResult);

            expect(html).toContain('codex-category-members-section');
            expect(html).toContain('NO ARCHIVE RECORDS CLASSIFIED UNDER THIS CATEGORY');
        });
    });
});

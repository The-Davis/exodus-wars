import { describe, it, expect } from 'vitest';
import { getCodexArticle } from './articleRegistry';
import { technologicalCatalogsIndexArticle } from './articles/Technological_Catalogs_Index';

describe('Technological Catalogs Category Resolution', () => {
    it('resolves Destroyers to a dedicated category page with 19 sub-articles, not Technological_Catalogs', () => {
        const destroyersArticle = getCodexArticle('Destroyers');
        expect(destroyersArticle).toBeDefined();
        expect(destroyersArticle?.slug).toBe('Destroyers');
        expect(destroyersArticle?.title).toBe('Category: Destroyers');
        expect(destroyersArticle).not.toBe(technologicalCatalogsIndexArticle);

        // Aliases resolve to the same category article
        expect(getCodexArticle('Category:Destroyers')).toBe(destroyersArticle);
        expect(getCodexArticle(':Category:Destroyers')).toBe(destroyersArticle);
        expect(getCodexArticle('category:destroyers')).toBe(destroyersArticle);

        // Content contains all key destroyers
        expect(destroyersArticle?.rawContent).toContain('[[Dauntless_Class_Destroyer|Dauntless Class Destroyer]]');
        expect(destroyersArticle?.rawContent).toContain('[[UEAS_Radiance|UEAS Radiance]]');
        expect(destroyersArticle?.rawContent).toContain('[[Wycliffe_class_Destroyer|Wycliffe class Destroyer]]');
        expect(destroyersArticle?.rawContent).toContain('[[Celeripes_Class|Celeripes Class Destroyer]]');
        expect(destroyersArticle?.rawContent).toContain('[[LAS_Kirov|LAS Kirov]]');
    });

    it('resolves all major naval combatant categories to dedicated hubs', () => {
        const categories = [
            'Battleships', 'Category:Battleships',
            'Cruisers', 'Category:Cruisers',
            'Frigates', 'Category:Frigates',
            'Corvettes', 'Category:Corvettes',
            'Carriers', 'Category:Carriers',
            'Warships', 'Category:Warships'
        ];

        for (const cat of categories) {
            const article = getCodexArticle(cat);
            expect(article, `Expected ${cat} to resolve`).toBeDefined();
            expect(article, `Expected ${cat} not to redirect back to Technological_Catalogs`).not.toBe(technologicalCatalogsIndexArticle);
            expect(article?.rawContent.length).toBeGreaterThan(100);
        }
    });

    it('resolves aircraft, vehicles, and armor categories to dedicated hubs', () => {
        const categories = [
            'Bombers', 'Category:Bombers',
            'VTOLs', 'Category:VTOLs',
            'Tanks', 'Category:Tanks',
            'Rigs', 'Category:Rigs',
            'Freighters', 'Category:Freighters',
            'Transport_Aircraft', 'Category:Transport_Aircraft',
            'Exploration_Vessels', 'Category:Exploration_Vessels',
            'Imperial_Military_M-Series', 'Category:Imperial_Military_M-Series'
        ];

        for (const cat of categories) {
            const article = getCodexArticle(cat);
            expect(article, `Expected ${cat} to resolve`).toBeDefined();
            expect(article, `Expected ${cat} not to redirect back to Technological_Catalogs`).not.toBe(technologicalCatalogsIndexArticle);
            expect(article?.rawContent.length).toBeGreaterThan(100);
        }
    });

    it('ensures sub-articles linked from Destroyers category page resolve to real articles', () => {
        const destroyersArticle = getCodexArticle('Destroyers');
        expect(destroyersArticle).toBeDefined();

        const wikilinkMatches = [...destroyersArticle!.rawContent.matchAll(/\[\[([^\|\]]+)(?:\|[^\]]+)?\]\]/g)];
        expect(wikilinkMatches.length).toBeGreaterThanOrEqual(19);

        for (const m of wikilinkMatches) {
            const target = m[1];
            if (target.startsWith('Category:')) continue;
            const article = getCodexArticle(target);
            expect(article, `Expected linked destroyer "${target}" to resolve to an article`).toBeDefined();
        }
    });
});

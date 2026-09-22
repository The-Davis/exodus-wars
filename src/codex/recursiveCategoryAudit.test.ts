import { describe, it, expect } from 'vitest';
import { getCodexArticle } from './articleRegistry';
import { technologicalCatalogsIndexArticle } from './articles/Technological_Catalogs_Index';
import { nationsIndexArticle } from './articles/Nations_Index';
import { placesIndexArticle } from './articles/Places_Index';
import { peopleIndexArticle } from './articles/People_Index';
import { corporationsIndexArticle } from './articles/Corporations_Index';
import { historyIndexArticle } from './articles/History_Index';
import { economicsIndexArticle } from './articles/Economics_Index';
import { racesIndexArticle } from './articles/Races_Index';
import { scientificPrinciplesIndexArticle } from './articles/Scientific_Principles_Index';
import { engineeringSystemsIndexArticle } from './articles/Engineering_Systems_Index';
import { architecturalAchievementsIndexArticle } from './articles/Architectural_Achievements_Index';
import { tacticsAndTreatisesIndexArticle } from './articles/Tactics_and_Treatises_Index';

describe('Codex Category Link & Recursion Audit', () => {
    const hubArticles = [
        { name: 'Technological Catalogs', article: technologicalCatalogsIndexArticle },
        { name: 'Nations', article: nationsIndexArticle },
        { name: 'Places', article: placesIndexArticle },
        { name: 'People', article: peopleIndexArticle },
        { name: 'Corporations', article: corporationsIndexArticle },
        { name: 'History', article: historyIndexArticle },
        { name: 'Economics', article: economicsIndexArticle },
        { name: 'Races', article: racesIndexArticle },
        { name: 'Scientific Principles', article: scientificPrinciplesIndexArticle },
        { name: 'Engineering Systems', article: engineeringSystemsIndexArticle },
        { name: 'Architectural Achievements', article: architecturalAchievementsIndexArticle },
        { name: 'Tactics and Treatises', article: tacticsAndTreatisesIndexArticle }
    ];

    it('identifies recursive self-redirects, empty stubs, or broken links across all index hubs', () => {
        const issues: Array<{ hub: string; link: string; type: 'recursive' | 'empty' | 'missing' }> = [];

        for (const { name, article } of hubArticles) {
            const matches = [...article.rawContent.matchAll(/\[\[:?([^\|\]]+)(?:\|[^\]]+)?\]\]/g)];
            for (const m of matches) {
                const rawTarget = m[1].trim();
                const cleanTarget = rawTarget.replace(/^:+/, '');

                // Skip non-navigational category tags at the bottom of the article
                if (
                    cleanTarget.startsWith('Category:') &&
                    article.categories.includes(cleanTarget.replace('Category:', '')) &&
                    !article.rawContent.includes(`*[[:${cleanTarget}`) &&
                    !article.rawContent.includes(`*[[:${cleanTarget.replace(/ /g, '_')}`)
                ) {
                    continue;
                }
                if (cleanTarget.toLowerCase().startsWith('image:') || cleanTarget.toLowerCase().startsWith('file:')) {
                    continue;
                }

                const resolved = getCodexArticle(cleanTarget);
                if (!resolved) {
                    issues.push({ hub: name, link: rawTarget, type: 'missing' });
                } else if (resolved === article || resolved.slug === article.slug) {
                    issues.push({ hub: name, link: rawTarget, type: 'recursive' });
                } else if (resolved.rawContent.trim() === '') {
                    issues.push({ hub: name, link: rawTarget, type: 'empty' });
                } else {
                    const bySlug = getCodexArticle(resolved.slug);
                    if (bySlug === article || bySlug?.slug === article.slug) {
                        issues.push({ hub: name, link: `${rawTarget} -> slug:${resolved.slug}`, type: 'recursive' });
                    }
                    if (cleanTarget.startsWith('Category:')) {
                        const stripped = cleanTarget.replace('Category:', '');
                        const byStripped = getCodexArticle(stripped);
                        if (byStripped === article || byStripped?.slug === article.slug) {
                            issues.push({ hub: name, link: `${rawTarget} -> base:${stripped}`, type: 'recursive' });
                        }
                    }
                }
            }
        }

        console.log('=== AUDIT RESULTS ===');
        console.log(`Found ${issues.length} issues across hub index pages:`);
        for (const issue of issues) {
            console.log(`[${issue.type.toUpperCase()}] on "${issue.hub}": "${issue.link}"`);
        }

        const recursiveIssues = issues.filter(i => i.type === 'recursive');
        expect(recursiveIssues, `Found recursive links: ${JSON.stringify(recursiveIssues)}`).toEqual([]);
    });

    it('specifically checks Places subcategories resolve to their dedicated articles and not Places hub', () => {
        const placeSubcats = [
            'Galaxies', 'Category:Galaxies', ':Category:Galaxies',
            'Spiral Arms', 'Category:Spiral Arms', 'Spiral_Arms', 'Category:Spiral_Arms',
            'Sectors', 'Category:Sectors',
            'Star Systems', 'Category:Star Systems', 'Star_Systems', 'Category:Star_Systems',
            'Planets', 'Category:Planets',
            'Moons', 'Category:Moons',
            'Regions', 'Category:Regions',
            'Cities', 'Category:Cities'
        ];

        for (const cat of placeSubcats) {
            const article = getCodexArticle(cat);
            expect(article, `Article for "${cat}" should exist`).toBeDefined();
            expect(article?.slug, `"${cat}" should not redirect to Places`).not.toBe('Places');
            expect(getCodexArticle(article!.slug)?.slug, `Slug for "${cat}" should resolve stably`).not.toBe('Places');
        }
    });

    it('specifically checks Nations subcategories resolve to their dedicated articles and not Nations hub', () => {
        const nationsSubcats = [
            'Terran Nations', 'Category:Terran Nations', 'Terran_Nations',
            'Ngrligru Nations', 'Category:Ngrligru Nations', 'Ngrligru_Nations',
            'Clans of the Mesarthrim', 'Category:Clans of the Mesarthrim', 'Clans_of_the_Mesarthrim',
            'Governments', 'Category:Governments',
            'Political Parties', 'Category:Political Parties', 'Political_Parties',
            'Treaty', 'Category:Treaty', 'Treaties', 'Category:Treaties',
            'Militaries', 'Category:Militaries',
            'Prefecture Military', 'Category:Prefecture Military', 'Prefecture_Military',
            'Prefecture Galactic Navy', 'Category:Prefecture Galactic Navy',
            'Prefecture Legion Corps', 'Category:Prefecture Legion Corps',
            'Prefecture Air Force', 'Category:Prefecture Air Force',
            'Royal Imperial Navy', 'Category:Royal Imperial Navy',
            'Mesarthrim Federation Military', 'Category:Mesarthrim Federation Military',
            'Remnant Military', 'Category:Remnant Military',
            'Military Ranks', 'Category:Military Ranks',
            'Head of State', 'Category:Head of State', 'Heads of State'
        ];

        for (const cat of nationsSubcats) {
            const article = getCodexArticle(cat);
            expect(article, `Article for "${cat}" should exist`).toBeDefined();
            expect(article?.slug, `"${cat}" should not redirect to Nations`).not.toBe('Nations');
            expect(getCodexArticle(article!.slug)?.slug, `Slug for "${cat}" should resolve stably`).not.toBe('Nations');
        }
    });

    it('specifically checks People subcategories resolve to their dedicated articles and not People hub', () => {
        const peopleSubcats = [
            'People by Profession', 'Category:People by Profession',
            'People by Nation', 'Category:People by Nation',
            'People by Race', 'Category:People by Race',
            'Military Leaders', 'Category:Military Leaders',
            'Military People', 'Category:Military People', 'Military Personnel',
            'National Leaders', 'Category:National Leaders',
            'Historical Leaders', 'Category:Historical Leaders',
            'Scientists', 'Category:Scientists',
            'Corporate Leaders', 'Category:Corporate Leaders',
            'Intelligence Operatives', 'Category:Intelligence Operatives',
            'Ambassadors', 'Category:Ambassadors',
            'Law Enforcement Officers', 'Category:Law Enforcement Officers',
            'Authors', 'Category:Authors',
            'People of the Federated Districts of the Prefecture',
            'People of the Onyx Empire',
            'People of the United Mesarthrim Clans',
            'People of the United Earth Alliance',
            'People of the Ikronin Jurekön',
            'People of the United Centusi States',
            'People of the Taviridis Somarchada',
            'People of the Auellal League',
            'People of the Rikaz o Fii Huern iv Lorithan',
            'People of the Colonial Commonwealth',
            'People of the Reigess Suverände',
            'People of the Meroniri Terinasi',
            'People of the Kabila Kimburu',
            'People of the Remnant'
        ];

        for (const cat of peopleSubcats) {
            const article = getCodexArticle(cat);
            expect(article, `Article for "${cat}" should exist`).toBeDefined();
            expect(article?.slug, `"${cat}" should not redirect to People`).not.toBe('People');
            expect(getCodexArticle(article!.slug)?.slug, `Slug for "${cat}" should resolve stably`).not.toBe('People');
        }
    });

    it('specifically checks History and Corporations subcategories resolve properly', () => {
        const histAndCorp = [
            { query: 'Years', notHub: 'History' },
            { query: 'Category:Years', notHub: 'History' },
            { query: 'Tempest War', notHub: 'History' },
            { query: 'Category:Tempest War', notHub: 'History' },
            { query: 'Rahn Industries', notHub: 'Corporations' },
            { query: 'Category:Rahn Industries', notHub: 'Corporations' }
        ];

        for (const { query, notHub } of histAndCorp) {
            const article = getCodexArticle(query);
            expect(article, `Article for "${query}" should exist`).toBeDefined();
            expect(article?.slug, `"${query}" should not redirect to ${notHub}`).not.toBe(notHub);
            expect(getCodexArticle(article!.slug)?.slug, `Slug for "${query}" should resolve stably`).not.toBe(notHub);
        }
    });
});

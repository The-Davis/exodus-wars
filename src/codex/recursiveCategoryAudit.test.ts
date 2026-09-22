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
                if (rawTarget.startsWith('Category:') && article.categories.includes(rawTarget.replace('Category:', ''))) {
                    // Category tag at bottom of article, not an inline navigational link
                    continue;
                }
                if (rawTarget.toLowerCase().startsWith('image:') || rawTarget.toLowerCase().startsWith('file:')) {
                    continue;
                }

                const resolved = getCodexArticle(rawTarget);
                if (!resolved) {
                    issues.push({ hub: name, link: rawTarget, type: 'missing' });
                } else if (resolved === article) {
                    issues.push({ hub: name, link: rawTarget, type: 'recursive' });
                } else if (resolved.rawContent.trim() === '') {
                    issues.push({ hub: name, link: rawTarget, type: 'empty' });
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
});

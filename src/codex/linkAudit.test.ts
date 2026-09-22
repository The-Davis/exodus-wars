import { describe, it } from 'vitest';
import { CODEX_ARTICLES, getCodexArticle } from './articleRegistry';

describe('Codex Link Resolution Audit', () => {
    it('audits all wikilinks across all codex articles', () => {
        const linkRegex = /\[\[:?([^\|\]]+)(?:\|([^\]]+))?\]\]/g;
        const missing = new Map<string, { count: number, sampleOrigin: string }>();
        const visitedArticles = new Set<string>();

        for (const [_key, article] of Object.entries(CODEX_ARTICLES)) {
            if (visitedArticles.has(article.slug)) continue;
            visitedArticles.add(article.slug);

            const content = article.rawContent || '';
            let match;
            while ((match = linkRegex.exec(content)) !== null) {
                const target = match[1].trim().replace(/^:+/, '');
                const cleanTarget = target.split('#')[0].trim();
                if (!cleanTarget) continue;
                if (cleanTarget.startsWith('Image:') || cleanTarget.startsWith('File:')) continue;

                const resolved = getCodexArticle(cleanTarget);
                if (!resolved) {
                    if (!missing.has(cleanTarget)) {
                        missing.set(cleanTarget, { count: 0, sampleOrigin: article.slug });
                    }
                    missing.get(cleanTarget)!.count++;
                }
            }
        }

        console.log(`Total unique missing targets: ${missing.size}`);
        const sorted = [...missing.entries()].sort((a, b) => b[1].count - a[1].count);
        // Log top 50 missing targets
        console.log('Top missing targets:');
        sorted.slice(0, 50).forEach(([tgt, info]) => {
            console.log(`- "${tgt}" (${info.count} refs, e.g. in ${info.sampleOrigin})`);
        });

        // Also check specifically for quote-related or dash-related missing
        const quoteRelated = sorted.filter(([tgt]) => tgt.includes('"') || tgt.includes('_-_') || tgt.endsWith('-_') || tgt.includes('\\'));
        console.log(`Missing targets with quotes or dashes: ${quoteRelated.length}`);
        quoteRelated.forEach(([tgt, info]) => {
            console.log(`* "${tgt}" (${info.count} refs in ${info.sampleOrigin})`);
        });
    });
});

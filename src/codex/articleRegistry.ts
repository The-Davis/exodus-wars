import { CodexArticle } from './types';
import { introArticle } from './articles/Introduction_to_the_Exodus_Wars_Universe';

export const CODEX_ARTICLES: Record<string, CodexArticle> = {
    'Introduction_to_the_Exodus_Wars_Universe': introArticle,
    'Introduction to the Exodus Wars Universe': introArticle,
    'introduction_to_the_exodus_wars_universe': introArticle,
};

export function getCodexArticle(slugOrTitle: string): CodexArticle | undefined {
    const key = slugOrTitle.trim().replace(/ /g, '_');
    return CODEX_ARTICLES[key] || CODEX_ARTICLES[key.toLowerCase()] || CODEX_ARTICLES[slugOrTitle];
}

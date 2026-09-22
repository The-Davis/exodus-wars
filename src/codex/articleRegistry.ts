import { CodexArticle } from './types';
import { introArticle } from './articles/Introduction_to_the_Exodus_Wars_Universe';
import { peopleIndexArticle } from './articles/People_Index';
import { PEOPLE_ARTICLES } from './articles/peopleArticles';
import { placesIndexArticle } from './articles/Places_Index';
import { PLACES_ARTICLES } from './articles/placesArticles';
import { historyIndexArticle } from './articles/History_Index';
import { HISTORY_ARTICLES } from './articles/historyArticles';
import { racesIndexArticle } from './articles/Races_Index';
import { RACE_ARTICLES } from './articles/raceArticles';
import { economicsIndexArticle } from './articles/Economics_Index';
import { ECONOMICS_ARTICLES } from './articles/economicsArticles';
import { nationsIndexArticle } from './articles/Nations_Index';
import { NATIONS_ARTICLES } from './articles/nationsArticles';

export const CODEX_ARTICLES: Record<string, CodexArticle> = {
    'Introduction_to_the_Exodus_Wars_Universe': introArticle,
    'Introduction to the Exodus Wars Universe': introArticle,
    'introduction_to_the_exodus_wars_universe': introArticle,
    'People': peopleIndexArticle,
    'people': peopleIndexArticle,
    'Category:People': peopleIndexArticle,
    'category:people': peopleIndexArticle,
    'Places': placesIndexArticle,
    'places': placesIndexArticle,
    'Category:Places': placesIndexArticle,
    'category:places': placesIndexArticle,
    'Category:Planets': placesIndexArticle,
    'category:planets': placesIndexArticle,
    'History': historyIndexArticle,
    'history': historyIndexArticle,
    'Category:History': historyIndexArticle,
    'category:history': historyIndexArticle,
    ':Category:History': historyIndexArticle,
    'Races': racesIndexArticle,
    'races': racesIndexArticle,
    'Category:Races': racesIndexArticle,
    'category:races': racesIndexArticle,
    ':Category:Races': racesIndexArticle,
    'Race': racesIndexArticle,
    'race': racesIndexArticle,
    'Category:Humans': racesIndexArticle,
    'category:humans': racesIndexArticle,
    'Economics': economicsIndexArticle,
    'economics': economicsIndexArticle,
    'Category:Economics': economicsIndexArticle,
    'category:economics': economicsIndexArticle,
    ':Category:Economics': economicsIndexArticle,
    'Economy': economicsIndexArticle,
    'economy': economicsIndexArticle,
    'Currency': economicsIndexArticle,
    'currency': economicsIndexArticle,
    'Category:Currency': economicsIndexArticle,
    'category:currency': economicsIndexArticle,
    ':Category:Currency': economicsIndexArticle,
    'Nations': nationsIndexArticle,
    'nations': nationsIndexArticle,
    'Category:Nations': nationsIndexArticle,
    'category:nations': nationsIndexArticle,
    ':Category:Nations': nationsIndexArticle,
    'Nation': nationsIndexArticle,
    'nation': nationsIndexArticle,
    'Alliance': nationsIndexArticle,
    'alliance': nationsIndexArticle,
    'Category:Alliance': nationsIndexArticle,
    'category:alliance': nationsIndexArticle,
    ':Category:Alliance': nationsIndexArticle,
};

function registerArticle(article: CodexArticle): void {
    const slug = article.slug;
    const title = article.title;
    CODEX_ARTICLES[slug] = article;
    CODEX_ARTICLES[slug.toLowerCase()] = article;
    CODEX_ARTICLES[title] = article;
    CODEX_ARTICLES[title.toLowerCase()] = article;
    CODEX_ARTICLES[slug.replace(/_/g, ' ')] = article;
    CODEX_ARTICLES[title.replace(/ /g, '_')] = article;

    const normSlug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const normTitle = title.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    CODEX_ARTICLES[normSlug] = article;
    CODEX_ARTICLES[normTitle] = article;
    CODEX_ARTICLES[normSlug.toLowerCase()] = article;
    CODEX_ARTICLES[normTitle.toLowerCase()] = article;
}

for (const person of PEOPLE_ARTICLES) {
    registerArticle(person);
}

for (const place of PLACES_ARTICLES) {
    registerArticle(place);
}

for (const history of HISTORY_ARTICLES) {
    registerArticle(history);
}

for (const race of RACE_ARTICLES) {
    registerArticle(race);
}

for (const econ of ECONOMICS_ARTICLES) {
    registerArticle(econ);
}

for (const nation of NATIONS_ARTICLES) {
    registerArticle(nation);
}

export function getCodexArticle(slugOrTitle: string): CodexArticle | undefined {
    let decoded = slugOrTitle;
    try {
        decoded = decodeURIComponent(slugOrTitle);
    } catch {
        // ignore
    }
    const clean = decoded.trim().replace(/^:+/, '');
    const asSlug = clean.replace(/ /g, '_');
    const asSpace = clean.replace(/_/g, ' ');
    const normClean = clean.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const normSlug = asSlug.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    return CODEX_ARTICLES[clean]
        || CODEX_ARTICLES[asSlug]
        || CODEX_ARTICLES[asSpace]
        || CODEX_ARTICLES[clean.toLowerCase()]
        || CODEX_ARTICLES[asSlug.toLowerCase()]
        || CODEX_ARTICLES[asSpace.toLowerCase()]
        || CODEX_ARTICLES[normClean]
        || CODEX_ARTICLES[normSlug]
        || CODEX_ARTICLES[normClean.toLowerCase()]
        || CODEX_ARTICLES[normSlug.toLowerCase()]
        || CODEX_ARTICLES[slugOrTitle];
}


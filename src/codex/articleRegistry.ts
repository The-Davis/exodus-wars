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
import { corporationsIndexArticle } from './articles/Corporations_Index';
import { CORPORATIONS_ARTICLES } from './articles/corporationsArticles';
import { scientificPrinciplesIndexArticle } from './articles/Scientific_Principles_Index';
import { SCIENCE_ARTICLES } from './articles/scienceArticles';
import { engineeringSystemsIndexArticle } from './articles/Engineering_Systems_Index';
import { ENGINEERING_ARTICLES } from './articles/engineeringArticles';
import { architecturalAchievementsIndexArticle } from './articles/Architectural_Achievements_Index';
import { ARCHITECTURAL_ARTICLES } from './articles/architecturalArticles';
import { tacticsAndTreatisesIndexArticle } from './articles/Tactics_and_Treatises_Index';
import { TACTICS_ARTICLES } from './articles/tacticsArticles';
import { technologicalCatalogsIndexArticle } from './articles/Technological_Catalogs_Index';
import { TECH_CATALOG_ARTICLES } from './articles/techCatalogArticles';

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
    'Corporations': corporationsIndexArticle,
    'corporations': corporationsIndexArticle,
    'Category:Corporations': corporationsIndexArticle,
    'category:corporations': corporationsIndexArticle,
    ':Category:Corporations': corporationsIndexArticle,
    'Corporation': corporationsIndexArticle,
    'corporation': corporationsIndexArticle,
    'Companies': corporationsIndexArticle,
    'companies': corporationsIndexArticle,
    'Category:Companies': corporationsIndexArticle,
    'category:companies': corporationsIndexArticle,
    ':Category:Companies': corporationsIndexArticle,
    'Company': corporationsIndexArticle,
    'company': corporationsIndexArticle,
    'Scientific_Principles': scientificPrinciplesIndexArticle,
    'Scientific Principles': scientificPrinciplesIndexArticle,
    'scientific_principles': scientificPrinciplesIndexArticle,
    'scientific principles': scientificPrinciplesIndexArticle,
    'Category:Scientific_Principles': scientificPrinciplesIndexArticle,
    'category:scientific_principles': scientificPrinciplesIndexArticle,
    'Category:Scientific Principles': scientificPrinciplesIndexArticle,
    'category:scientific principles': scientificPrinciplesIndexArticle,
    ':Category:Scientific_Principles': scientificPrinciplesIndexArticle,
    ':Category:Scientific Principles': scientificPrinciplesIndexArticle,
    'Science': scientificPrinciplesIndexArticle,
    'science': scientificPrinciplesIndexArticle,
    'Category:Science': scientificPrinciplesIndexArticle,
    'category:science': scientificPrinciplesIndexArticle,
    ':Category:Science': scientificPrinciplesIndexArticle,
    'Engineering_Systems': engineeringSystemsIndexArticle,
    'Engineering Systems': engineeringSystemsIndexArticle,
    'engineering_systems': engineeringSystemsIndexArticle,
    'engineering systems': engineeringSystemsIndexArticle,
    'Category:Engineering_Systems': engineeringSystemsIndexArticle,
    'category:engineering_systems': engineeringSystemsIndexArticle,
    'Category:Engineering Systems': engineeringSystemsIndexArticle,
    'category:engineering systems': engineeringSystemsIndexArticle,
    ':Category:Engineering_Systems': engineeringSystemsIndexArticle,
    ':Category:Engineering Systems': engineeringSystemsIndexArticle,
    'Engineering': engineeringSystemsIndexArticle,
    'engineering': engineeringSystemsIndexArticle,
    'Category:Engineering': engineeringSystemsIndexArticle,
    'category:engineering': engineeringSystemsIndexArticle,
    ':Category:Engineering': engineeringSystemsIndexArticle,
    'Architectural_Achievements': architecturalAchievementsIndexArticle,
    'Architectural Achievements': architecturalAchievementsIndexArticle,
    'architectural_achievements': architecturalAchievementsIndexArticle,
    'architectural achievements': architecturalAchievementsIndexArticle,
    'Category:Architectural_Achievements': architecturalAchievementsIndexArticle,
    'category:architectural_achievements': architecturalAchievementsIndexArticle,
    'Category:Architectural Achievements': architecturalAchievementsIndexArticle,
    'category:architectural achievements': architecturalAchievementsIndexArticle,
    ':Category:Architectural_Achievements': architecturalAchievementsIndexArticle,
    ':Category:Architectural Achievements': architecturalAchievementsIndexArticle,
    'Architecture': architecturalAchievementsIndexArticle,
    'architecture': architecturalAchievementsIndexArticle,
    'Category:Architecture': architecturalAchievementsIndexArticle,
    'category:architecture': architecturalAchievementsIndexArticle,
    ':Category:Architecture': architecturalAchievementsIndexArticle,
    'Tactics_and_Treatises': tacticsAndTreatisesIndexArticle,
    'Tactics and Treatises': tacticsAndTreatisesIndexArticle,
    'tactics_and_treatises': tacticsAndTreatisesIndexArticle,
    'tactics and treatises': tacticsAndTreatisesIndexArticle,
    'Category:Tactics_and_Treatises': tacticsAndTreatisesIndexArticle,
    'category:tactics_and_treatises': tacticsAndTreatisesIndexArticle,
    'Category:Tactics and Treatises': tacticsAndTreatisesIndexArticle,
    'category:tactics and treatises': tacticsAndTreatisesIndexArticle,
    ':Category:Tactics_and_Treatises': tacticsAndTreatisesIndexArticle,
    ':Category:Tactics and Treatises': tacticsAndTreatisesIndexArticle,
    'Tactics': tacticsAndTreatisesIndexArticle,
    'tactics': tacticsAndTreatisesIndexArticle,
    'Category:Tactics': tacticsAndTreatisesIndexArticle,
    'category:tactics': tacticsAndTreatisesIndexArticle,
    ':Category:Tactics': tacticsAndTreatisesIndexArticle,
    'Treatises': tacticsAndTreatisesIndexArticle,
    'treatises': tacticsAndTreatisesIndexArticle,
    'Category:Treatises': tacticsAndTreatisesIndexArticle,
    'category:treatises': tacticsAndTreatisesIndexArticle,
    ':Category:Treatises': tacticsAndTreatisesIndexArticle,
    'Doctrine': tacticsAndTreatisesIndexArticle,
    'doctrine': tacticsAndTreatisesIndexArticle,
    'Technological_Catalogs': technologicalCatalogsIndexArticle,
    'Technological Catalogs': technologicalCatalogsIndexArticle,
    'technological_catalogs': technologicalCatalogsIndexArticle,
    'technological catalogs': technologicalCatalogsIndexArticle,
    'Category:Technological_Catalogs': technologicalCatalogsIndexArticle,
    'category:technological_catalogs': technologicalCatalogsIndexArticle,
    'Category:Technological Catalogs': technologicalCatalogsIndexArticle,
    'category:technological catalogs': technologicalCatalogsIndexArticle,
    ':Category:Technological_Catalogs': technologicalCatalogsIndexArticle,
    ':Category:Technological Catalogs': technologicalCatalogsIndexArticle,
    'Technology': technologicalCatalogsIndexArticle,
    'technology': technologicalCatalogsIndexArticle,
    'Category:Technology': technologicalCatalogsIndexArticle,
    'category:technology': technologicalCatalogsIndexArticle,
    ':Category:Technology': technologicalCatalogsIndexArticle,
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

for (const corp of CORPORATIONS_ARTICLES) {
    registerArticle(corp);
}

for (const sci of SCIENCE_ARTICLES) {
    registerArticle(sci);
}

for (const eng of ENGINEERING_ARTICLES) {
    if (eng.slug !== 'Engineering_Systems' && eng.title !== 'Engineering Systems') {
        registerArticle(eng);
    }
}
registerArticle(engineeringSystemsIndexArticle);
CODEX_ARTICLES['Category:Engineering_Systems'] = engineeringSystemsIndexArticle;
CODEX_ARTICLES['category:engineering_systems'] = engineeringSystemsIndexArticle;
CODEX_ARTICLES['Category:Engineering Systems'] = engineeringSystemsIndexArticle;
CODEX_ARTICLES['category:engineering systems'] = engineeringSystemsIndexArticle;
CODEX_ARTICLES[':Category:Engineering_Systems'] = engineeringSystemsIndexArticle;
CODEX_ARTICLES[':Category:Engineering Systems'] = engineeringSystemsIndexArticle;

for (const arch of ARCHITECTURAL_ARTICLES) {
    registerArticle(arch);
}
registerArticle(architecturalAchievementsIndexArticle);
CODEX_ARTICLES['Category:Architectural_Achievements'] = architecturalAchievementsIndexArticle;
CODEX_ARTICLES['category:architectural_achievements'] = architecturalAchievementsIndexArticle;
CODEX_ARTICLES['Category:Architectural Achievements'] = architecturalAchievementsIndexArticle;
CODEX_ARTICLES['category:architectural achievements'] = architecturalAchievementsIndexArticle;
CODEX_ARTICLES[':Category:Architectural_Achievements'] = architecturalAchievementsIndexArticle;
CODEX_ARTICLES[':Category:Architectural Achievements'] = architecturalAchievementsIndexArticle;
CODEX_ARTICLES['Architecture'] = architecturalAchievementsIndexArticle;
CODEX_ARTICLES['architecture'] = architecturalAchievementsIndexArticle;
CODEX_ARTICLES['Category:Architecture'] = architecturalAchievementsIndexArticle;
CODEX_ARTICLES['category:architecture'] = architecturalAchievementsIndexArticle;
CODEX_ARTICLES[':Category:Architecture'] = architecturalAchievementsIndexArticle;

for (const item of TACTICS_ARTICLES) {
    registerArticle(item);
}
registerArticle(tacticsAndTreatisesIndexArticle);
CODEX_ARTICLES['Category:Tactics_and_Treatises'] = tacticsAndTreatisesIndexArticle;
CODEX_ARTICLES['category:tactics_and_treatises'] = tacticsAndTreatisesIndexArticle;
CODEX_ARTICLES['Category:Tactics and Treatises'] = tacticsAndTreatisesIndexArticle;
CODEX_ARTICLES['category:tactics and treatises'] = tacticsAndTreatisesIndexArticle;
CODEX_ARTICLES[':Category:Tactics_and_Treatises'] = tacticsAndTreatisesIndexArticle;
CODEX_ARTICLES[':Category:Tactics and Treatises'] = tacticsAndTreatisesIndexArticle;
CODEX_ARTICLES['Tactics'] = tacticsAndTreatisesIndexArticle;
CODEX_ARTICLES['tactics'] = tacticsAndTreatisesIndexArticle;
CODEX_ARTICLES['Category:Tactics'] = tacticsAndTreatisesIndexArticle;
CODEX_ARTICLES['category:tactics'] = tacticsAndTreatisesIndexArticle;
CODEX_ARTICLES[':Category:Tactics'] = tacticsAndTreatisesIndexArticle;
CODEX_ARTICLES['Treatises'] = tacticsAndTreatisesIndexArticle;
CODEX_ARTICLES['treatises'] = tacticsAndTreatisesIndexArticle;
CODEX_ARTICLES['Category:Treatises'] = tacticsAndTreatisesIndexArticle;
CODEX_ARTICLES['category:treatises'] = tacticsAndTreatisesIndexArticle;
CODEX_ARTICLES[':Category:Treatises'] = tacticsAndTreatisesIndexArticle;
CODEX_ARTICLES['Doctrine'] = tacticsAndTreatisesIndexArticle;
CODEX_ARTICLES['doctrine'] = tacticsAndTreatisesIndexArticle;

for (const item of TECH_CATALOG_ARTICLES) {
    registerArticle(item);
}
registerArticle(technologicalCatalogsIndexArticle);

const techCategories = [
    'Warships', 'Aircraft', 'Starships', 'Vehicles',
    'Battleships', 'Cruisers', 'Destroyers', 'Frigates', 'Corvettes', 'Carriers',
    'Fighters', 'Bombers', 'VTOLs', 'Transport_Aircraft', 'Transport Aircraft',
    'Recon_Aircraft', 'Recon Aircraft', 'Civilian_Aircraft', 'Civilian Aircraft',
    'Freighters', 'Starliners', 'Exploration_Vessels', 'Exploration Vessels',
    'Colony_Ships', 'Colony Ships',
    'Tanks', 'Rigs', 'Civilian_Vehicles', 'Civilian Vehicles'
];

for (const cat of techCategories) {
    const slug = cat.replace(/ /g, '_');
    const space = cat.replace(/_/g, ' ');
    if (!CODEX_ARTICLES[slug]) CODEX_ARTICLES[slug] = technologicalCatalogsIndexArticle;
    if (!CODEX_ARTICLES[space]) CODEX_ARTICLES[space] = technologicalCatalogsIndexArticle;
    if (!CODEX_ARTICLES[slug.toLowerCase()]) CODEX_ARTICLES[slug.toLowerCase()] = technologicalCatalogsIndexArticle;
    if (!CODEX_ARTICLES[space.toLowerCase()]) CODEX_ARTICLES[space.toLowerCase()] = technologicalCatalogsIndexArticle;

    CODEX_ARTICLES[`Category:${slug}`] = technologicalCatalogsIndexArticle;
    CODEX_ARTICLES[`category:${slug.toLowerCase()}`] = technologicalCatalogsIndexArticle;
    CODEX_ARTICLES[`Category:${space}`] = technologicalCatalogsIndexArticle;
    CODEX_ARTICLES[`category:${space.toLowerCase()}`] = technologicalCatalogsIndexArticle;
    CODEX_ARTICLES[`:Category:${slug}`] = technologicalCatalogsIndexArticle;
    CODEX_ARTICLES[`:Category:${space}`] = technologicalCatalogsIndexArticle;
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


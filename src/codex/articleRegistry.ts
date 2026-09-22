import { CodexArticle } from './types';
import { introArticle } from './articles/Introduction_to_the_Exodus_Wars_Universe';
import { peopleIndexArticle } from './articles/People_Index';
import { PEOPLE_ARTICLES } from './articles/peopleArticles';
import { placesIndexArticle } from './articles/Places_Index';
import { PLACES_ARTICLES } from './articles/placesArticles';
import { historyIndexArticle } from './articles/History_Index';
import { HISTORY_ARTICLES } from './articles/historyArticles';
import { HISTORY_SUBCATEGORY_ARTICLES } from './articles/historySubcategoryArticles';
import { racesIndexArticle } from './articles/Races_Index';
import { RACE_ARTICLES } from './articles/raceArticles';
import { economicsIndexArticle } from './articles/Economics_Index';
import { ECONOMICS_ARTICLES, currencyCategoryArticle } from './articles/economicsArticles';
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
import { PLACES_SUBCATEGORY_ARTICLES } from './articles/placesSubcategoryArticles';
import { TECH_SUBCATEGORY_ARTICLES } from './articles/techSubcategoryArticles';
import { HISTORY_ADDITIONAL_ARTICLES } from './articles/historyAdditionalArticles';
import { NATIONS_SUBCATEGORY_ARTICLES } from './articles/nationsSubcategoryArticles';
import { PEOPLE_SUBCATEGORY_ARTICLES } from './articles/peopleSubcategoryArticles';
import { PLACES_ADDITIONAL_ARTICLES } from './articles/placesAdditionalArticles';
import { TECH_STARSHIPS_ARTICLES } from './articles/techStarshipsArticles';
import { HISTORY_SERIES_ARTICLES } from './articles/historySeriesArticles';
import { HISTORY_YEARS_ARTICLES } from './articles/historyYearsArticles';
import { LANGUAGES_CULTURE_ARTICLES } from './articles/languagesCultureArticles';
import { NATIONS_ARCHIVES_ARTICLES } from './articles/nationsArchivesArticles';
import { FINAL_FLEETS_OPERATIONS_ARTICLES } from './articles/finalFleetsOperationsArticles';
import { FINAL_TECH_CORPORATE_ARTICLES } from './articles/finalTechCorporateArticles';
import { FINAL_INSTITUTIONS_LORE_ARTICLES } from './articles/finalInstitutionsLoreArticles';
import { FINAL_CATEGORY_ARTICLES } from './articles/finalCategoryArticles';
import { FINAL_REDIRECT_ALIASES } from './articles/finalRedirectAliases';
import { fightersCategoryArticle } from './articles/fightersCategoryArticle';
import {
    TECH_CATEGORY_ARTICLES,
    destroyersCategoryArticle,
    battleshipsCategoryArticle,
    cruisersCategoryArticle,
    frigatesCategoryArticle,
    corvettesCategoryArticle,
    carriersCategoryArticle,
    warshipsCategoryArticle,
    bombersCategoryArticle,
    vtolsCategoryArticle,
    tanksCategoryArticle,
    rigsCategoryArticle,
    freightersCategoryArticle,
    transportAircraftCategoryArticle,
    atmosphericCraftCategoryArticle,
    explorationVesselsCategoryArticle,
    mSeriesCategoryArticle,
    reconAircraftCategoryArticle,
    starlinersCategoryArticle,
    colonyShipsCategoryArticle,
    civilianVehiclesCategoryArticle
} from './articles/techCategoryArticles';
import { HISTORICAL_CHRONICLES_ARTICLES } from './articles/historicalChroniclesArticles';

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
    'Exodus Wars': introArticle,
    'Exodus_Wars': introArticle,
    'exodus wars': introArticle,
    'exodus_wars': introArticle,
    'Economics': economicsIndexArticle,
    'economics': economicsIndexArticle,
    'Category:Economics': economicsIndexArticle,
    'category:economics': economicsIndexArticle,
    ':Category:Economics': economicsIndexArticle,
    'Economy': economicsIndexArticle,
    'economy': economicsIndexArticle,
    'Currency': currencyCategoryArticle,
    'currency': currencyCategoryArticle,
    'Category:Currency': currencyCategoryArticle,
    'category:currency': currencyCategoryArticle,
    ':Category:Currency': currencyCategoryArticle,
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

function registerArticle(article: CodexArticle, overwrite = true): void {
    const slug = article.slug;
    const title = article.title;
    if (!overwrite && (CODEX_ARTICLES[slug] || CODEX_ARTICLES[title])) return;
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

for (const subHistory of HISTORY_SUBCATEGORY_ARTICLES) {
    registerArticle(subHistory);
    const catKey = `Category:${subHistory.slug}`;
    const catKeyLower = `category:${subHistory.slug.toLowerCase()}`;
    const catKeySpace = `Category:${subHistory.title}`;
    const catKeySpaceLower = `category:${subHistory.title.toLowerCase()}`;
    CODEX_ARTICLES[catKey] = subHistory;
    CODEX_ARTICLES[catKeyLower] = subHistory;
    CODEX_ARTICLES[catKeySpace] = subHistory;
    CODEX_ARTICLES[catKeySpaceLower] = subHistory;
    CODEX_ARTICLES[`:${catKey}`] = subHistory;
    CODEX_ARTICLES[`:${catKeySpace}`] = subHistory;
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
CODEX_ARTICLES['Doctrine'] = tacticsAndTreatisesIndexArticle;
CODEX_ARTICLES['doctrine'] = tacticsAndTreatisesIndexArticle;

for (const item of TECH_CATALOG_ARTICLES) {
    registerArticle(item);
}
registerArticle(technologicalCatalogsIndexArticle);
registerArticle(fightersCategoryArticle);

function registerCategoryAliases(categories: string[], targetArticle: CodexArticle, overwrite = true): void {
    for (const cat of categories) {
        const slug = cat.replace(/ /g, '_');
        const space = cat.replace(/_/g, ' ');
        if (overwrite || !CODEX_ARTICLES[slug]) CODEX_ARTICLES[slug] = targetArticle;
        if (overwrite || !CODEX_ARTICLES[space]) CODEX_ARTICLES[space] = targetArticle;
        if (overwrite || !CODEX_ARTICLES[slug.toLowerCase()]) CODEX_ARTICLES[slug.toLowerCase()] = targetArticle;
        if (overwrite || !CODEX_ARTICLES[space.toLowerCase()]) CODEX_ARTICLES[space.toLowerCase()] = targetArticle;

        if (overwrite || !CODEX_ARTICLES[`Category:${slug}`]) CODEX_ARTICLES[`Category:${slug}`] = targetArticle;
        if (overwrite || !CODEX_ARTICLES[`category:${slug.toLowerCase()}`]) CODEX_ARTICLES[`category:${slug.toLowerCase()}`] = targetArticle;
        if (overwrite || !CODEX_ARTICLES[`Category:${space}`]) CODEX_ARTICLES[`Category:${space}`] = targetArticle;
        if (overwrite || !CODEX_ARTICLES[`category:${space.toLowerCase()}`]) CODEX_ARTICLES[`category:${space.toLowerCase()}`] = targetArticle;
        if (overwrite || !CODEX_ARTICLES[`:Category:${slug}`]) CODEX_ARTICLES[`:Category:${slug}`] = targetArticle;
        if (overwrite || !CODEX_ARTICLES[`:Category:${space}`]) CODEX_ARTICLES[`:Category:${space}`] = targetArticle;
    }
}

const tacticsArticle = TACTICS_ARTICLES.find(a => a.slug === 'Tactics');
if (tacticsArticle) {
    registerCategoryAliases(['Tactics'], tacticsArticle);
}
const treatisesArticle = TACTICS_ARTICLES.find(a => a.slug === 'Treatises');
if (treatisesArticle) {
    registerCategoryAliases(['Treatises'], treatisesArticle);
}

registerCategoryAliases(['Fighters'], fightersCategoryArticle);
registerCategoryAliases(['Destroyers'], destroyersCategoryArticle);
registerCategoryAliases(['Battleships', 'Battleships & Dreadnoughts', 'Dreadnoughts'], battleshipsCategoryArticle);
registerCategoryAliases(['Cruisers', 'Battlecruisers'], cruisersCategoryArticle);
registerCategoryAliases(['Frigates'], frigatesCategoryArticle);
registerCategoryAliases(['Corvettes', 'Gunships'], corvettesCategoryArticle);
registerCategoryAliases(['Carriers'], carriersCategoryArticle);
registerCategoryAliases(['Warships'], warshipsCategoryArticle);
registerCategoryAliases(['Bombers'], bombersCategoryArticle);
registerCategoryAliases(['VTOLs', 'VTOL'], vtolsCategoryArticle);
registerCategoryAliases(['Transport_Aircraft', 'Transport Aircraft'], transportAircraftCategoryArticle);
registerCategoryAliases(['Atmospheric_Craft', 'Atmospheric Craft'], atmosphericCraftCategoryArticle);
registerCategoryAliases(['Tanks'], tanksCategoryArticle);
registerCategoryAliases(['Rigs', 'Combat Rigs'], rigsCategoryArticle);
registerCategoryAliases(['Freighters'], freightersCategoryArticle);
registerCategoryAliases(['Exploration_Vessels', 'Exploration Vessels'], explorationVesselsCategoryArticle);
registerCategoryAliases(['Imperial_Military_M-Series', 'Imperial Military M-Series'], mSeriesCategoryArticle);
registerCategoryAliases(['Recon_Aircraft', 'Recon Aircraft', 'Civilian_Aircraft', 'Civilian Aircraft'], reconAircraftCategoryArticle);
registerCategoryAliases(['Starliners', 'Starliner'], starlinersCategoryArticle);
registerCategoryAliases(['Colony_Ships', 'Colony Ships'], colonyShipsCategoryArticle);
registerCategoryAliases(['Civilian_Vehicles', 'Civilian Vehicles'], civilianVehiclesCategoryArticle);

registerArticle(currencyCategoryArticle);
registerCategoryAliases(['Currency'], currencyCategoryArticle);

const secondExodusWarArticle = HISTORY_ARTICLES.find(a => a.slug === 'Second_Exodus_War');
if (secondExodusWarArticle) {
    registerCategoryAliases(['Second Exodus War', 'Second_Exodus_War'], secondExodusWarArticle);
}
const volucrisWarArticle = HISTORY_ARTICLES.find(a => a.slug === 'Volucris_War');
if (volucrisWarArticle) {
    registerCategoryAliases(['Volucris War', 'Volucris_War'], volucrisWarArticle);
}
const volucrisIncursionArticle = HISTORY_ARTICLES.find(a => a.slug === 'Volucris_Incursion');
if (volucrisIncursionArticle) {
    registerCategoryAliases(['Volucris Incursion', 'Volucris_Incursion'], volucrisIncursionArticle);
}

const humansArticle = RACE_ARTICLES.find(a => a.slug === 'Humans');
if (humansArticle) {
    registerCategoryAliases(['Humans', 'Human'], humansArticle);
    CODEX_ARTICLES['human'] = humansArticle;
    CODEX_ARTICLES['humans'] = humansArticle;
}

const auellalArticle = NATIONS_ARTICLES.find(a => a.slug === 'Auellal_League');
if (auellalArticle) {
    CODEX_ARTICLES['Auellal'] = auellalArticle;
    CODEX_ARTICLES['auellal'] = auellalArticle;
}
const huernaArticle = NATIONS_ARTICLES.find(a => a.slug === 'Rikaz_o_Fii_Cai_iv_Huerna');
if (huernaArticle) {
    CODEX_ARTICLES['Huerna'] = huernaArticle;
    CODEX_ARTICLES['huerna'] = huernaArticle;
}
const siriusFamiliesArticle = NATIONS_ARTICLES.find(a => a.slug === 'Sirius_Families');
if (siriusFamiliesArticle) {
    CODEX_ARTICLES['Sirius System'] = siriusFamiliesArticle;
    CODEX_ARTICLES['sirius system'] = siriusFamiliesArticle;
    CODEX_ARTICLES['Sirius_System'] = siriusFamiliesArticle;
    CODEX_ARTICLES['sirius_system'] = siriusFamiliesArticle;
}
const reigessSuverandeArticle = NATIONS_ARTICLES.find(a => a.slug === 'Reigess_Suverände');
if (reigessSuverandeArticle) {
    CODEX_ARTICLES['Suverände'] = reigessSuverandeArticle;
    CODEX_ARTICLES['suverände'] = reigessSuverandeArticle;
    CODEX_ARTICLES['Suverande'] = reigessSuverandeArticle;
    CODEX_ARTICLES['suverande'] = reigessSuverandeArticle;
}

const ikroninMissilesArticle = ENGINEERING_ARTICLES.find(a => a.slug === 'Conventional_Missile_Warheads_-_Ikronin');
if (ikroninMissilesArticle) {
    CODEX_ARTICLES['Ikronin Conventional Missile Warheads'] = ikroninMissilesArticle;
    CODEX_ARTICLES['Ikronin_Conventional_Missile_Warheads'] = ikroninMissilesArticle;
    CODEX_ARTICLES['ikronin conventional missile warheads'] = ikroninMissilesArticle;
    CODEX_ARTICLES['ikronin_conventional_missile_warheads'] = ikroninMissilesArticle;
}

const prefectureIntelligence = NATIONS_ARCHIVES_ARTICLES.find(a => a.slug === 'Intelligence_of_the_Federated_Districts_of_the_Prefecture');
if (prefectureIntelligence) {
    CODEX_ARTICLES['Prefecture Department of Inquisition'] = prefectureIntelligence;
    CODEX_ARTICLES['Prefecture_Department_of_Inquisition'] = prefectureIntelligence;
    CODEX_ARTICLES['prefecture department of inquisition'] = prefectureIntelligence;
    CODEX_ARTICLES['Department of Inquisition'] = prefectureIntelligence;
    CODEX_ARTICLES['Department_of_Inquisition'] = prefectureIntelligence;
    CODEX_ARTICLES['department of inquisition'] = prefectureIntelligence;
}

const subcategoryGroups = [
    PLACES_SUBCATEGORY_ARTICLES,
    TECH_SUBCATEGORY_ARTICLES,
    HISTORY_ADDITIONAL_ARTICLES,
    NATIONS_SUBCATEGORY_ARTICLES,
    PEOPLE_SUBCATEGORY_ARTICLES,
    PLACES_ADDITIONAL_ARTICLES,
    TECH_STARSHIPS_ARTICLES,
    HISTORY_SERIES_ARTICLES,
    HISTORY_YEARS_ARTICLES,
    LANGUAGES_CULTURE_ARTICLES,
    NATIONS_ARCHIVES_ARTICLES,
    FINAL_FLEETS_OPERATIONS_ARTICLES,
    FINAL_TECH_CORPORATE_ARTICLES,
    FINAL_INSTITUTIONS_LORE_ARTICLES,
    FINAL_CATEGORY_ARTICLES,
    HISTORICAL_CHRONICLES_ARTICLES,
    TECH_CATEGORY_ARTICLES
];

for (const group of subcategoryGroups) {
    for (const item of group) {
        const isCat = Boolean(item.categories && item.categories.includes('Categories'));
        registerArticle(item, !isCat);
        if (isCat) {
            registerCategoryAliases([item.slug, item.title], item, false);
            const slug = item.slug;
            const title = item.title;
            CODEX_ARTICLES[`Category:${slug}`] = item;
            CODEX_ARTICLES[`Category:${title}`] = item;
            CODEX_ARTICLES[`category:${slug.toLowerCase()}`] = item;
            CODEX_ARTICLES[`category:${title.toLowerCase()}`] = item;
            CODEX_ARTICLES[`:Category:${slug}`] = item;
            CODEX_ARTICLES[`:Category:${title}`] = item;
            if (!CODEX_ARTICLES[slug]) {
                registerArticle(item, true);
            }
        }
    }
}

const treatyArticle = getCodexArticle('Treaty');
if (treatyArticle) {
    registerCategoryAliases(['Treaties'], treatyArticle, true);
}

const headOfStateArticle = getCodexArticle('Head_of_State');
if (headOfStateArticle) {
    registerCategoryAliases(['Heads of State', 'Heads_of_State'], headOfStateArticle, true);
}

const militaryPeopleArticle = getCodexArticle('Military_People');
if (militaryPeopleArticle) {
    registerCategoryAliases(['Military Personnel', 'Military_Personnel'], militaryPeopleArticle, true);
}

const tempestWarArticle = getCodexArticle('Tempest_War');
if (tempestWarArticle) {
    registerCategoryAliases(['Tempest War', 'Tempest_War'], tempestWarArticle, true);
}

export function getCodexArticle(slugOrTitle: string, visited: Set<string> = new Set()): CodexArticle | undefined {
    let decoded = slugOrTitle;
    try {
        decoded = decodeURIComponent(slugOrTitle);
    } catch {
        // ignore
    }
    const clean = decoded.trim().replace(/^:+/, '');
    if (clean.includes('#')) {
        const [pagePart] = clean.split('#');
        if (pagePart) {
            const foundPage = getCodexArticle(pagePart, visited);
            if (foundPage) return foundPage;
        }
    }
    const asSlug = clean.replace(/ /g, '_');
    const asSpace = clean.replace(/_/g, ' ');
    const normClean = clean.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const normSlug = asSlug.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const found = CODEX_ARTICLES[clean]
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

    if (found) return found;

    // Check redirect aliases
    const redirectKey = clean;
    if (!visited.has(redirectKey)) {
        visited.add(redirectKey);
        const target = FINAL_REDIRECT_ALIASES[clean]
            || FINAL_REDIRECT_ALIASES[asSlug]
            || FINAL_REDIRECT_ALIASES[asSpace]
            || FINAL_REDIRECT_ALIASES[slugOrTitle];

        if (target) {
            return getCodexArticle(target, visited);
        }
    }

    // Fallback 1: Quote and backslash stripping
    // e.g. 'F-04 Superiority Fighter - "Raven"' -> 'F-04 Superiority Fighter - Raven'
    const strippedQuotes = clean.replace(/["\\]/g, '').trim();
    if (strippedQuotes && strippedQuotes !== clean && !visited.has(strippedQuotes)) {
        visited.add(strippedQuotes);
        const resolved = getCodexArticle(strippedQuotes, visited);
        if (resolved) return resolved;
    }

    // Fallback 2: Quote & apostrophe stripping
    // e.g. 'VF-11 Imperial Naval Fighter Squadron - "Hell\'s Kittens"' -> 'VF-11 Imperial Naval Fighter Squadron - Hells Kittens'
    const strippedPunct = clean.replace(/["'\\’]/g, '').trim();
    if (strippedPunct && strippedPunct !== clean && strippedPunct !== strippedQuotes && !visited.has(strippedPunct)) {
        visited.add(strippedPunct);
        const resolved = getCodexArticle(strippedPunct, visited);
        if (resolved) return resolved;
    }

    // Fallback 3: Truncated slug/title prefix matching
    // Handles artifacts cut off at quotes, like 'F-04_Superiority_Fighter_-_', 'F-04_Superiority_Fighter_-_\\',
    // or 'M-38_Armored_Personnel_Carrier_-_'
    if (clean.includes('-_') || clean.includes(' - ')) {
        const trimmed = clean.replace(/[_ -]*-[_ -]*$/, '').replace(/[\\"]+$/, '').trim();
        if (trimmed.length > 3) {
            const slugPrefix = trimmed.replace(/ /g, '_') + '_-_';
            const titlePrefix = trimmed.replace(/_/g, ' ') + ' - ';
            for (const [k, art] of Object.entries(CODEX_ARTICLES)) {
                if (k.startsWith(slugPrefix) || k.startsWith(titlePrefix)) {
                    return art;
                }
            }
        }
    }

    return undefined;
}


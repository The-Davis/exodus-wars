import { CodexArticle } from '../types';
import { WARSHIP_ARTICLES } from './warshipArticles';
import { AIRCRAFT_ARTICLES } from './aircraftArticles';
import { STARSHIP_ARTICLES } from './starshipArticles';
import { VEHICLE_ARTICLES } from './vehicleArticles';

export { WARSHIP_ARTICLES } from './warshipArticles';
export { AIRCRAFT_ARTICLES } from './aircraftArticles';
export { STARSHIP_ARTICLES } from './starshipArticles';
export { VEHICLE_ARTICLES } from './vehicleArticles';

export const TECH_CATALOG_ARTICLES: CodexArticle[] = [
    ...WARSHIP_ARTICLES,
    ...AIRCRAFT_ARTICLES,
    ...STARSHIP_ARTICLES,
    ...VEHICLE_ARTICLES
];

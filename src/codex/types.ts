export interface CodexArticle {
    id: number;
    slug: string;
    title: string;
    author: string;
    lastUpdated: string;
    categories: string[];
    rawContent: string;
    summary?: string;
}

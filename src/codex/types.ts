export interface CodexImageEntry {
    legacy?: string;   // Path relative to public/, e.g. "assets/codex/EWLogo.png"
    modern?: string;   // Path relative to public/, e.g. "assets/codex/EWLogo_modern.png"
    alt?: string;
    caption?: string;
    title?: string;
}

export interface CodexArticle {
    id: number;
    slug: string;
    title: string;
    author: string;
    lastUpdated: string;
    categories: string[];
    rawContent: string;
    summary?: string;
    images?: Record<string, CodexImageEntry>;
}

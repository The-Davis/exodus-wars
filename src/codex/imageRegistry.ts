import { CodexImageEntry } from './types';

export const GLOBAL_IMAGE_REGISTRY: Record<string, CodexImageEntry> = {
    'EWLogo.png': {
        modern: 'assets/codex/EWLogo_modern.png',
        legacy: 'assets/codex/EWLogo.png',
        alt: 'Exodus Wars Universe Emblem',
        caption: 'Exodus Wars Insignia'
    }
};

export function resolveImageEntry(
    imageName: string,
    articleImages?: Record<string, CodexImageEntry>
): CodexImageEntry {
    const cleanName = imageName.trim();

    // 1. Check article-specific image overrides
    if (articleImages && articleImages[cleanName]) {
        return articleImages[cleanName];
    }

    // 2. Check global registry
    if (GLOBAL_IMAGE_REGISTRY[cleanName]) {
        return GLOBAL_IMAGE_REGISTRY[cleanName];
    }

    // 3. Fallback: treat as legacy-only
    return {
        legacy: `assets/codex/${cleanName}`,
        alt: cleanName
    };
}

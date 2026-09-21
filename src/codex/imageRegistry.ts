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
    const underscoreName = cleanName.replace(/ /g, '_');
    const spaceName = cleanName.replace(/_/g, ' ');

    // 1. Check article-specific image overrides
    if (articleImages) {
        if (articleImages[cleanName]) return articleImages[cleanName];
        if (articleImages[underscoreName]) return articleImages[underscoreName];
        if (articleImages[spaceName]) return articleImages[spaceName];
    }

    // 2. Check global registry
    if (GLOBAL_IMAGE_REGISTRY[cleanName]) return GLOBAL_IMAGE_REGISTRY[cleanName];
    if (GLOBAL_IMAGE_REGISTRY[underscoreName]) return GLOBAL_IMAGE_REGISTRY[underscoreName];
    if (GLOBAL_IMAGE_REGISTRY[spaceName]) return GLOBAL_IMAGE_REGISTRY[spaceName];

    // Check disk name normalization (e.g. Dulitåt.jpg / Dulitöt.jpg -> Dulitat.jpg)
    let diskName = underscoreName;
    if (diskName.toLowerCase().includes('dulit')) {
        diskName = 'Dulitat.jpg';
    }

    // 3. Fallback: treat as legacy-only
    return {
        legacy: `assets/codex/${diskName}`,
        alt: cleanName
    };
}


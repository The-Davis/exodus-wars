import { describe, it, expect } from 'vitest';
import { resolveImageEntry } from './imageRegistry';
import { CodexRenderer } from './CodexRenderer';
import { CodexImageEntry } from './types';

describe('Modern and Legacy Image Architecture', () => {
    it('resolves both modern and legacy when configured', () => {
        const entry = resolveImageEntry('EWLogo.png');
        expect(entry.modern).toBeDefined();
        expect(entry.legacy).toBeDefined();
        expect(entry.modern).toContain('EWLogo_modern.png');
        expect(entry.legacy).toContain('EWLogo.png');
    });

    it('falls back to legacy-only for unregistered images', () => {
        const entry = resolveImageEntry('Unregistered_Old_Ship.png');
        expect(entry.legacy).toBe('assets/codex/Unregistered_Old_Ship.png');
        expect(entry.modern).toBeUndefined();
    });

    it('supports article-specific overrides for modern-only or legacy-only', () => {
        const overrides: Record<string, CodexImageEntry> = {
            'ModernOnly.png': {
                modern: 'assets/codex/ModernOnly.png',
                alt: 'AI generated'
            },
            'LegacyOnly.png': {
                legacy: 'assets/codex/LegacyOnly.png',
                alt: 'Original 1998'
            }
        };

        const modernOnly = resolveImageEntry('ModernOnly.png', overrides);
        expect(modernOnly.modern).toBeDefined();
        expect(modernOnly.legacy).toBeUndefined();

        const legacyOnly = resolveImageEntry('LegacyOnly.png', overrides);
        expect(legacyOnly.legacy).toBeDefined();
        expect(legacyOnly.modern).toBeUndefined();
    });

    it('renders toggleable container without badge when both modern and legacy exist, defaulting to modern', () => {
        const wikitext = '[[Image:EWLogo.png]] Welcome!';
        const html = CodexRenderer.render(wikitext, {
            'EWLogo.png': {
                modern: 'assets/codex/EWLogo_modern.png',
                legacy: 'assets/codex/EWLogo.png',
                alt: 'Logo'
            }
        });

        expect(html).toContain('data-can-toggle="true"');
        expect(html).toContain('data-current-mode="modern"');
        expect(html).toContain('EWLogo_modern.png');
        expect(html).toContain('data-legacy-src=');
        expect(html).toContain('toggleable-cursor');
        expect(html).not.toContain('codex-image-badge');
    });

    it('disables click toggle when only modern is present without badge', () => {
        const wikitext = '[[Image:ModernOnly.png]] Modern asset';
        const html = CodexRenderer.render(wikitext, {
            'ModernOnly.png': {
                modern: 'assets/codex/ModernOnly.png',
                alt: 'Modern Only'
            }
        });

        expect(html).toContain('data-can-toggle="false"');
        expect(html).toContain('data-current-mode="modern"');
        expect(html).not.toContain('toggleable-cursor');
        expect(html).not.toContain('codex-image-badge');
    });

    it('disables click toggle when only legacy is present without badge', () => {
        const wikitext = '[[Image:LegacyOnly.png]] Legacy asset';
        const html = CodexRenderer.render(wikitext, {
            'LegacyOnly.png': {
                legacy: 'assets/codex/LegacyOnly.png',
                alt: 'Legacy Only'
            }
        });

        expect(html).toContain('data-can-toggle="false"');
        expect(html).toContain('data-current-mode="legacy"');
        expect(html).not.toContain('toggleable-cursor');
        expect(html).not.toContain('codex-image-badge');
    });
});

import { describe, it, expect } from 'vitest';
import { getAllUniqueArticles, getCodexArticle } from './articleRegistry';
import { CodexRenderer } from './CodexRenderer';

describe('Codex Frontmatter Metadata Audit & Runtime Sanitization', () => {
    const yamlFrontmatterRegex = /---[\r\n]+([\s\S]*?(?:page_id:|latest_revision_id:|is_redirect:|templates:|namespace:|last_updated:|title:)[\s\S]*?)[\r\n]+---(?:\r?\n)?/gi;

    it('verifies zero articles across the entire codex contain YAML frontmatter in rawContent', () => {
        const articles = getAllUniqueArticles();
        expect(articles.length).toBeGreaterThan(2000);

        const lingeringFrontmatter: Array<{ id: number; slug: string; snippet: string }> = [];

        for (const art of articles) {
            if (!art.rawContent) continue;
            const matches = [...art.rawContent.matchAll(yamlFrontmatterRegex)];
            if (matches.length > 0) {
                lingeringFrontmatter.push({
                    id: art.id,
                    slug: art.slug,
                    snippet: matches[0][1].slice(0, 80).replace(/\r?\n/g, ' ')
                });
            }
        }

        expect(lingeringFrontmatter).toEqual([]);
    });

    it('verifies specific previously affected articles are clean of frontmatter', () => {
        const testSlugs = [
            'F-09_Carrier_Fighter_-_Valkyrie',
            'O-24_Vadrie',
            'O-26_Milrok',
            'K-6_Eituk',
            'Fallen_King',
            'M-21_Goblin',
            'First_Contact',
            '20th_Century'
        ];

        for (const slug of testSlugs) {
            const article = getCodexArticle(slug);
            expect(article).toBeDefined();
            expect(article!.rawContent).not.toMatch(/---\r?\n[\s\S]*?page_id:/);
            expect(article!.rawContent).not.toMatch(/---\r?\n[\s\S]*?templates:/);
            expect(article!.rawContent).not.toMatch(/^---\r?\ntitle:/);
        }

        // F-09 Valkyrie should start directly with Aircraft Information
        const valkyrie = getCodexArticle('F-09_Carrier_Fighter_-_Valkyrie');
        expect(valkyrie!.rawContent.trimStart().startsWith('{{Aircraft Information|')).toBe(true);

        // O-24 Vadrie should contain both infobox and General Characteristics without frontmatter
        const vadrie = getCodexArticle('O-24_Vadrie');
        expect(vadrie!.rawContent).toContain('{{Aircraft Information|');
        expect(vadrie!.rawContent).toContain('General Characteristics');
        expect(vadrie!.rawContent).not.toContain('page_id: 970');

        // Fallen King should not contain corrupted export frontmatter
        const fallenKing = getCodexArticle('Fallen_King');
        expect(fallenKing!.rawContent.startsWith('The Fallen King')).toBe(true);
    });

    it('sanitizes runtime YAML frontmatter in CodexRenderer if ever encountered', () => {
        const dummyWithFrontmatter = `---
title: "Test_Article"
page_id: 9999
namespace: 0
namespace_name: "Main"
latest_revision_id: 12345
last_updated: "2026-09-22 20:00:00"
author: "TestAuthor"
is_redirect: false
categories:
  - "Test"
templates:
  - "Test_Information"
---

'''Test Article''' is a test.`;

        const html = CodexRenderer.render(dummyWithFrontmatter);
        expect(html).not.toContain('page_id');
        expect(html).not.toContain('latest_revision_id');
        expect(html).not.toContain('TestAuthor');
        expect(html).toContain('Test Article');
    });
});

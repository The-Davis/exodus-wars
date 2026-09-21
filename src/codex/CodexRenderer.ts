import { CodexImageEntry } from './types';
import { resolveImageEntry } from './imageRegistry';

export class CodexRenderer {
    public static render(rawWikitext: string, articleImages?: Record<string, CodexImageEntry>): string {
        const baseUrl = import.meta.env.BASE_URL;

        // Process line by line or block by block
        const blocks = rawWikitext.split(/\n\s*\n+/);
        const htmlBlocks: string[] = [];

        for (const block of blocks) {
            const trimmed = block.trim();
            if (!trimmed) continue;

            // Check if block contains Image embed
            // e.g. [[Image:EWLogo.png]] Welcome to the Exodus Wars Universe.
            const imageMatch = trimmed.match(/^\[\[(?:Image|File):([^\|\]]+)(?:\|[^\]]*)?\]\]\s*(.*)$/is);
            if (imageMatch) {
                const imageName = imageMatch[1].trim();
                const remainder = imageMatch[2].trim();
                const imageEntry = resolveImageEntry(imageName, articleImages);

                const hasModern = Boolean(imageEntry.modern);
                const hasLegacy = Boolean(imageEntry.legacy);
                const canToggle = hasModern && hasLegacy;
                const defaultMode = hasModern ? 'modern' : 'legacy';
                const defaultSrc = hasModern ? imageEntry.modern : imageEntry.legacy;

                const modernSrcAttr = hasModern ? `data-modern-src="${baseUrl}${imageEntry.modern}"` : '';
                const legacySrcAttr = hasLegacy ? `data-legacy-src="${baseUrl}${imageEntry.legacy}"` : '';

                let badgeHtml = '';
                if (canToggle) {
                    badgeHtml = `
                        <div class="codex-image-badge toggleable" title="Click image to switch between Modern and Original Legacy versions">
                            <span class="badge-icon">⇄</span>
                            <span class="badge-label">MODERN (CLICK FOR LEGACY)</span>
                        </div>
                    `;
                } else if (hasModern) {
                    badgeHtml = `
                        <div class="codex-image-badge modern-only">
                            <span class="badge-label">MODERN</span>
                        </div>
                    `;
                } else if (hasLegacy) {
                    badgeHtml = `
                        <div class="codex-image-badge legacy-only">
                            <span class="badge-label">LEGACY ARCHIVE</span>
                        </div>
                    `;
                }

                let imageHtml = '';
                if (imageName === 'EWLogo.png') {
                    imageHtml = `
                        <div class="codex-article-banner">
                            <div class="codex-image-container ${canToggle ? 'can-toggle' : ''}"
                                 data-image-name="${imageName}"
                                 data-can-toggle="${canToggle}"
                                 data-current-mode="${defaultMode}"
                                 ${modernSrcAttr}
                                 ${legacySrcAttr}>
                                <div class="codex-image-wrapper">
                                    <img src="${baseUrl}${defaultSrc}"
                                         alt="${imageEntry.alt || 'Exodus Wars Logo'}"
                                         class="codex-banner-logo codex-displayed-image ${canToggle ? 'toggleable-cursor' : ''}" />
                                    ${badgeHtml}
                                </div>
                            </div>
                            ${remainder ? `<h2 class="codex-banner-title">${this.formatInline(remainder)}</h2>` : ''}
                        </div>
                    `;
                } else {
                    imageHtml = `
                        <figure class="codex-image-figure">
                            <div class="codex-image-container ${canToggle ? 'can-toggle' : ''}"
                                 data-image-name="${imageName}"
                                 data-can-toggle="${canToggle}"
                                 data-current-mode="${defaultMode}"
                                 ${modernSrcAttr}
                                 ${legacySrcAttr}>
                                <div class="codex-image-wrapper">
                                    <img src="${baseUrl}${defaultSrc}"
                                         alt="${imageEntry.alt || imageName}"
                                         class="codex-displayed-image ${canToggle ? 'toggleable-cursor' : ''}" />
                                    ${badgeHtml}
                                </div>
                            </div>
                            ${remainder ? `<figcaption>${this.formatInline(remainder)}</figcaption>` : ''}
                        </figure>
                    `;
                }
                htmlBlocks.push(imageHtml);
                continue;
            }

            // Headings
            if (trimmed.startsWith('===')) {
                const title = trimmed.replace(/^===+\s*|\s*===+$/g, '');
                htmlBlocks.push(`<h3 class="codex-h3">// ${this.formatInline(title)}</h3>`);
                continue;
            }
            if (trimmed.startsWith('==')) {
                const title = trimmed.replace(/^==+\s*|\s*==+$/g, '');
                htmlBlocks.push(`<h2 class="codex-h2">// ${this.formatInline(title)}</h2>`);
                continue;
            }

            // Standard paragraph
            htmlBlocks.push(`<p class="codex-p">${this.formatInline(trimmed)}</p>`);
        }

        return htmlBlocks.join('\n');
    }

    private static formatInline(text: string): string {
        let out = text;

        // Wikilinks: [[Target|Label]]
        out = out.replace(/\[\[([^\|\]]+)\|([^\]]+)\]\]/g, (_m, target, label) => {
            const cleanTarget = target.trim();
            const cleanLabel = label.trim();
            return `<a href="#/codex/${encodeURIComponent(cleanTarget)}" class="codex-wikilink" data-target="${cleanTarget}">${cleanLabel}</a>`;
        });

        // Wikilinks: [[Target]]
        out = out.replace(/\[\[([^\]]+)\]\]/g, (_m, target) => {
            const cleanTarget = target.trim();
            return `<a href="#/codex/${encodeURIComponent(cleanTarget)}" class="codex-wikilink" data-target="${cleanTarget}">${cleanTarget}</a>`;
        });

        // Bold & italic: '''''text'''''
        out = out.replace(/'''''(.*?)'''''/g, '<strong><em>$1</em></strong>');

        // Bold: '''text'''
        out = out.replace(/'''(.*?)'''/g, '<strong>$1</strong>');

        // Italic: ''text''
        out = out.replace(/''(.*?)''/g, '<em>$1</em>');

        return out;
    }
}

export class CodexRenderer {
    public static render(rawWikitext: string): string {
        const baseUrl = import.meta.env.BASE_URL;

        // Process line by line or block by block
        const blocks = rawWikitext.split(/\n\s*\n+/);
        const htmlBlocks: string[] = [];

        for (const block of blocks) {
            let trimmed = block.trim();
            if (!trimmed) continue;

            // Check if block contains Image embed
            // e.g. [[Image:EWLogo.png]] Welcome to the Exodus Wars Universe.
            const imageMatch = trimmed.match(/^\[\[(?:Image|File):([^\|\]]+)(?:\|[^\]]*)?\]\]\s*(.*)$/is);
            if (imageMatch) {
                const imageName = imageMatch[1].trim();
                const remainder = imageMatch[2].trim();

                let bannerHtml = '';
                if (imageName === 'EWLogo.png') {
                    bannerHtml = `
                        <div class="codex-article-banner">
                            <img src="${baseUrl}assets/codex/EWLogo.png" alt="Exodus Wars Logo" class="codex-banner-logo" />
                            ${remainder ? `<h2 class="codex-banner-title">${this.formatInline(remainder)}</h2>` : ''}
                        </div>
                    `;
                } else {
                    bannerHtml = `
                        <figure class="codex-image-figure">
                            <img src="${baseUrl}assets/codex/${imageName}" alt="${imageName}" />
                            ${remainder ? `<figcaption>${this.formatInline(remainder)}</figcaption>` : ''}
                        </figure>
                    `;
                }
                htmlBlocks.push(bannerHtml);
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

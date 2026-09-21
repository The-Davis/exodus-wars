import { CodexImageEntry } from './types';
import { resolveImageEntry } from './imageRegistry';

export class CodexRenderer {
    public static render(rawWikitext: string, articleImages?: Record<string, CodexImageEntry>): string {
        const baseUrl = import.meta.env.BASE_URL;
        let text = rawWikitext;

        // 1. Parse Infobox templates if present
        let infoboxHtml = '';
        const personMatch = text.match(/\{\{Person[_ ]Information\s*\|?([\s\S]*?)\}\}/i);
        const planetMatch = text.match(/\{\{Planet[_ ]Information\s*\|?([\s\S]*?)\}\}/i);
        const stellarNavMatch = text.match(/\{\{Stellar[_ ]Navigation[_ ]Information\s*\|?([\s\S]*?)\}\}/i);
        const starMatch = text.match(/\{\{Star[_ ]Information\s*\|?([\s\S]*?)\}\}/i);

        if (personMatch) {
            text = text.replace(personMatch[0], '');
            infoboxHtml = this.renderPersonInformation(personMatch[1], articleImages, baseUrl);
        } else if (planetMatch) {
            text = text.replace(planetMatch[0], '');
            infoboxHtml = this.renderPlanetInformation(planetMatch[1], articleImages, baseUrl);
        } else if (stellarNavMatch) {
            text = text.replace(stellarNavMatch[0], '');
            infoboxHtml = this.renderStellarNavigationInformation(stellarNavMatch[1], articleImages, baseUrl);
        } else if (starMatch) {
            text = text.replace(starMatch[0], '');
            infoboxHtml = this.renderStarInformation(starMatch[1], articleImages, baseUrl);
        }

        // 2. Extract Category tags at the bottom
        const categories: string[] = [];
        text = text.replace(/\[\[Category:([^\]]+)\]\]/gi, (_m, cat) => {
            categories.push(cat.trim());
            return '';
        });

        // 3. Normalize headings so they are bounded by blank lines
        text = text.replace(/^(={2,}[^\n]+={2,})$/gm, '\n\n$1\n\n');

        // 4. Split into blocks
        const blocks = text.split(/\n\s*\n+/);
        const htmlBlocks: string[] = [];

        if (infoboxHtml) {
            htmlBlocks.push(infoboxHtml);
        }

        for (const block of blocks) {
            const trimmed = block.trim();
            if (!trimmed) continue;

            // Check if block contains Image embed
            // e.g. [[Image:EWLogo.png]] Welcome to the Exodus Wars Universe.
            // or [[Image:Andreas Tischler Full View.png|thumb|right|300px|Andreas Tischler, Lord of the Clans.]]
            const imageMatch = trimmed.match(/^\[\[(?:Image|File):([^\]]+)\]\]\s*(.*)$/is);
            if (imageMatch) {
                const parts = imageMatch[1].split('|').map(p => p.trim());
                const imageName = parts[0];
                let caption = imageMatch[2] ? imageMatch[2].trim() : '';
                let align = 'center';

                for (let i = 1; i < parts.length; i++) {
                    const p = parts[i];
                    const pLower = p.toLowerCase();
                    if (['right', 'left', 'center'].includes(pLower)) {
                        align = pLower;
                    } else if (!['thumb', 'thumbnail', 'frame'].includes(pLower) && !p.match(/^\d+px$/)) {
                        caption = caption ? `${caption} - ${p}` : p;
                    }
                }

                if (imageName === 'EWLogo.png') {
                    htmlBlocks.push(`
                        <div class="codex-article-banner">
                            ${this.renderImageContainer(imageName, articleImages, baseUrl, 'Exodus Wars Logo', '', true)}
                            ${caption ? `<h2 class="codex-banner-title">${this.formatInline(caption)}</h2>` : ''}
                        </div>
                    `);
                } else {
                    htmlBlocks.push(`
                        <figure class="codex-image-figure align-${align}">
                            ${this.renderImageContainer(imageName, articleImages, baseUrl, caption || imageName)}
                            ${caption ? `<figcaption>${this.formatInline(caption)}</figcaption>` : ''}
                        </figure>
                    `);
                }
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

            // Bullet Lists
            const lines = trimmed.split('\n').map(l => l.trim()).filter(l => Boolean(l));
            if (lines.length > 0 && lines.every(l => l.startsWith('*'))) {
                const items = lines
                    .map(l => `<li class="codex-list-item">${this.formatInline(l.replace(/^\*\s*/, ''))}</li>`)
                    .join('\n');
                htmlBlocks.push(`<ul class="codex-list">\n${items}\n</ul>`);
                continue;
            }

            // Standard paragraph
            htmlBlocks.push(`<p class="codex-p">${this.formatInline(trimmed)}</p>`);
        }

        // 5. Append categories section if present
        if (categories.length > 0) {
            const catLinks = categories
                .map(c => `<li><a href="#/codex/Category:${encodeURIComponent(c)}" class="codex-category-tag" data-target="Category:${c}">${c.replace(/_/g, ' ')}</a></li>`)
                .join(' ');
            htmlBlocks.push(`
                <div class="codex-categories-section">
                    <span class="codex-categories-label">// CATEGORIES:</span>
                    <ul class="codex-categories-list">
                        ${catLinks}
                    </ul>
                </div>
            `);
        }

        return htmlBlocks.join('\n');
    }

    private static parseTemplateParams(body: string): Record<string, string> {
        const params: Record<string, string> = {};
        let currentKey: string | null = null;

        for (const rawLine of body.split('\n')) {
            const line = rawLine.trim();
            const paramMatch = line.match(/^\|([a-zA-Z0-9_]+)\s*=\s*(.*)$/);
            if (paramMatch) {
                currentKey = paramMatch[1].trim();
                params[currentKey] = paramMatch[2].trim();
            } else if (currentKey && line) {
                params[currentKey] += ' ' + line;
            }
        }
        return params;
    }

    private static extractImageName(imageVal?: string): string {
        if (!imageVal) return '';
        const im = imageVal.match(/\[\[(?:Image|File):([^\|\]]+).*?\]\]/i);
        if (im) return im[1].trim();
        if (imageVal.match(/\.(png|jpg|jpeg|gif|webp)$/i)) return imageVal.trim();
        return '';
    }

    private static renderPersonInformation(
        body: string,
        articleImages: Record<string, CodexImageEntry> | undefined,
        baseUrl: string
    ): string {
        const params = this.parseTemplateParams(body);
        const name = params['name'] || 'Personnel Record';
        const imgName = this.extractImageName(params['image']);
        const caption = params['caption'] || '';
        const birthDate = params['birth_date'] || '';
        const birthPlace = params['birth_place'] || '';
        const deathDate = params['death_date'] || '';
        const deathPlace = params['death_place'] || '';
        const allegiance = params['allegiance'] || '';
        const profession = params['profession'] || '';
        const recognitions = params['recognitions'] || '';
        const achievements = params['achievements'] || '';

        const rows: string[] = [];
        if (birthDate || birthPlace) {
            const birthVal = `${this.formatInline(birthDate)}${birthDate && birthPlace ? '<br/>' : ''}${birthPlace ? `<small>${this.formatInline(birthPlace)}</small>` : ''}`;
            rows.push(`<tr><th>Birth</th><td>${birthVal}</td></tr>`);
        }
        if (deathDate || deathPlace) {
            const deathVal = `${this.formatInline(deathDate)}${deathDate && deathPlace ? '<br/>' : ''}${deathPlace ? `<small>${this.formatInline(deathPlace)}</small>` : ''}`;
            rows.push(`<tr><th>Death</th><td>${deathVal}</td></tr>`);
        }
        if (allegiance) {
            rows.push(`<tr><th>Allegiance(s)</th><td>${this.formatInline(allegiance)}</td></tr>`);
        }
        if (profession) {
            rows.push(`<tr><th>Profession</th><td>${this.formatInline(profession)}</td></tr>`);
        }
        if (recognitions) {
            rows.push(`<tr><th>Recognitions</th><td>${this.formatInline(recognitions)}</td></tr>`);
        }
        if (achievements) {
            rows.push(`<tr><th>Achievements</th><td>${this.formatInline(achievements)}</td></tr>`);
        }

        let imgHtml = '';
        if (imgName) {
            imgHtml = this.renderImageContainer(imgName, articleImages, baseUrl, name, caption, false, true);
        }

        return `
            <aside class="codex-infobox person-information">
                <div class="infobox-header">
                    <div class="infobox-subtitle">DOSSIER // PERSONNEL</div>
                    <h3 class="infobox-name">${this.formatInline(name)}</h3>
                </div>
                ${imgHtml ? `<div class="infobox-image-section">${imgHtml}</div>` : ''}
                <div class="infobox-divider"></div>
                <table class="infobox-table">
                    <tbody>
                        ${rows.join('\n                        ')}
                    </tbody>
                </table>
            </aside>
        `;
    }

    private static renderPlanetInformation(
        body: string,
        articleImages: Record<string, CodexImageEntry> | undefined,
        baseUrl: string
    ): string {
        const params = this.parseTemplateParams(body);
        const name = params['name'] || 'Planetary Record';
        const imgName = this.extractImageName(params['image']);
        const caption = params['caption'] || '';

        const starSystem = params['star_system'] || '';
        const population = params['population'] || '';
        const sovereign = params['sovereign'] || '';
        const capital = params['capital'] || '';
        const orbit = params['orbit'] || '';
        const rotation = params['rotation'] || '';
        const satellite = params['satellite'] || '';
        const satelliteOrbit = params['satellite_orbit'] || '';

        const rows: string[] = [];
        if (starSystem) rows.push(`<tr><th>Star System</th><td>${this.formatInline(starSystem)}</td></tr>`);
        if (population) rows.push(`<tr><th>Population</th><td>${this.formatInline(population)}</td></tr>`);
        if (sovereign) rows.push(`<tr><th>Sovereign</th><td>${this.formatInline(sovereign)}</td></tr>`);
        if (capital) rows.push(`<tr><th>Capital</th><td>${this.formatInline(capital)}</td></tr>`);
        if (orbit) rows.push(`<tr><th>Orbit</th><td>${this.formatInline(orbit)}</td></tr>`);
        if (rotation) rows.push(`<tr><th>Rotation</th><td>${this.formatInline(rotation)}</td></tr>`);
        if (satellite) rows.push(`<tr><th>Satellite(s)</th><td>${this.formatInline(satellite)}</td></tr>`);
        if (satelliteOrbit) rows.push(`<tr><th>Satellite Orbit</th><td>${this.formatInline(satelliteOrbit)}</td></tr>`);

        let imgHtml = '';
        if (imgName) {
            imgHtml = this.renderImageContainer(imgName, articleImages, baseUrl, name, caption, false, true);
        }

        return `
            <aside class="codex-infobox planet-information">
                <div class="infobox-header planet-header">
                    <div class="infobox-subtitle">ASTRONOMICAL SURVEY // PLANET</div>
                    <h3 class="infobox-name">${this.formatInline(name)}</h3>
                </div>
                ${imgHtml ? `<div class="infobox-image-section">${imgHtml}</div>` : ''}
                <div class="infobox-divider"></div>
                <table class="infobox-table">
                    <tbody>
                        ${rows.join('\n                        ')}
                    </tbody>
                </table>
            </aside>
        `;
    }

    private static renderStellarNavigationInformation(
        body: string,
        _articleImages: Record<string, CodexImageEntry> | undefined,
        _baseUrl: string
    ): string {
        const params = this.parseTemplateParams(body);
        const name = params['name'] || 'Navigation Point';
        const type = params['type'] || '';
        const partOf = params['part_of'] || '';

        const rows: string[] = [];
        if (type) rows.push(`<tr><th>Navigation Type</th><td>${this.formatInline(type)}</td></tr>`);
        if (partOf) rows.push(`<tr><th>Part Of</th><td>${this.formatInline(partOf)}</td></tr>`);

        return `
            <aside class="codex-infobox stellar-navigation">
                <div class="infobox-header stellar-nav-header">
                    <div class="infobox-subtitle">STELLAR CARTOGRAPHY // NAVIGATION POINT</div>
                    <h3 class="infobox-name">${this.formatInline(name)}</h3>
                </div>
                <div class="infobox-divider"></div>
                <table class="infobox-table">
                    <tbody>
                        ${rows.join('\n                        ')}
                    </tbody>
                </table>
            </aside>
        `;
    }

    private static renderStarInformation(
        body: string,
        _articleImages: Record<string, CodexImageEntry> | undefined,
        _baseUrl: string
    ): string {
        const params = this.parseTemplateParams(body);
        const name = params['name'] || 'Star System';
        const sector = params['sector'] || '';
        const stellarClass = params['stellar_class'] || '';
        const planets = params['planets'] || '';

        const rows: string[] = [];
        if (sector) rows.push(`<tr><th>Sector</th><td>${this.formatInline(sector)}</td></tr>`);
        if (stellarClass) rows.push(`<tr><th>Stellar Class</th><td>${this.formatInline(stellarClass)}</td></tr>`);
        if (planets) rows.push(`<tr><th>Planets</th><td>${this.formatInline(planets)}</td></tr>`);

        return `
            <aside class="codex-infobox star-information">
                <div class="infobox-header star-header">
                    <div class="infobox-subtitle">STELLAR CARTOGRAPHY // STAR SYSTEM</div>
                    <h3 class="infobox-name">${this.formatInline(name)}</h3>
                </div>
                <div class="infobox-divider"></div>
                <table class="infobox-table">
                    <tbody>
                        ${rows.join('\n                        ')}
                    </tbody>
                </table>
            </aside>
        `;
    }

    private static renderImageContainer(
        imageName: string,
        articleImages: Record<string, CodexImageEntry> | undefined,
        baseUrl: string,
        customAlt?: string,
        caption?: string,
        isBanner: boolean = false,
        isInfobox: boolean = false
    ): string {
        const imageEntry = resolveImageEntry(imageName, articleImages);
        const hasModern = Boolean(imageEntry.modern);
        const hasLegacy = Boolean(imageEntry.legacy);
        const canToggle = hasModern && hasLegacy;
        const defaultMode = hasModern ? 'modern' : 'legacy';
        const defaultSrc = hasModern ? imageEntry.modern : imageEntry.legacy;

        const modernSrcAttr = hasModern ? `data-modern-src="${baseUrl}${imageEntry.modern}"` : '';
        const legacySrcAttr = hasLegacy ? `data-legacy-src="${baseUrl}${imageEntry.legacy}"` : '';
        const altText = customAlt || imageEntry.alt || imageName;

        const imgClass = isBanner
            ? 'codex-banner-logo codex-displayed-image'
            : isInfobox
                ? 'codex-infobox-image codex-displayed-image'
                : 'codex-displayed-image';

        return `
            <div class="codex-image-container ${canToggle ? 'can-toggle' : ''} ${isInfobox ? 'infobox-img-container' : ''}"
                 data-image-name="${imageName}"
                 data-can-toggle="${canToggle}"
                 data-current-mode="${defaultMode}"
                 ${modernSrcAttr}
                 ${legacySrcAttr}>
                <div class="codex-image-wrapper">
                    <img src="${baseUrl}${defaultSrc}"
                         alt="${altText}"
                         class="${imgClass} ${canToggle ? 'toggleable-cursor' : ''}" />
                </div>
                ${caption ? `<div class="codex-infobox-caption">${this.formatInline(caption)}</div>` : ''}
            </div>
        `;
    }

    private static formatInline(text: string): string {
        let out = text;

        // Wikilinks: [[:Category:...|Label]] or [[Target|Label]]
        out = out.replace(/\[\[:?([^\|\]]+)\|([^\]]+)\]\]/g, (_m, target, label) => {
            const cleanTarget = target.trim().replace(/^:+/, '');
            const cleanLabel = label.trim();
            return `<a href="#/codex/${encodeURIComponent(cleanTarget)}" class="codex-wikilink" data-target="${cleanTarget}">${cleanLabel}</a>`;
        });

        // Wikilinks: [[:Category:...]] or [[Target]]
        out = out.replace(/\[\[:?([^\]]+)\]\]/g, (_m, target) => {
            const cleanTarget = target.trim().replace(/^:+/, '');
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


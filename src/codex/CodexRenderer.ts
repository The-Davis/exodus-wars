import { CodexImageEntry, CategoryMembersResult } from './types';
import { resolveImageEntry } from './imageRegistry';

export class CodexRenderer {
    public static render(
        rawWikitext: string,
        articleImages?: Record<string, CodexImageEntry>,
        categoryMembers?: CategoryMembersResult
    ): string {
        const baseUrl = import.meta.env.BASE_URL;
        let text = rawWikitext;

        // 0. Strip legacy YAML frontmatter blocks if present (dump metadata)
        text = text.replace(/---[\r\n]+[\s\S]*?(?:page_id:|latest_revision_id:|is_redirect:|templates:|namespace:|last_updated:|title:)[\s\S]*?[\r\n]+---(?:\r?\n)*/gi, '');
        text = text.replace(/^---[\r\n]+[\s\S]*?[\r\n]+---(?:\r?\n)*/, '');

        // 1. Parse Infobox templates if present
        let infoboxHtml = '';
        const personMatch = text.match(/\{\{Person[_ ]Information\s*\|?([\s\S]*?)\}\}/i);
        const planetMatch = text.match(/\{\{Planet[_ ]Information\s*\|?([\s\S]*?)\}\}/i);
        const stellarNavMatch = text.match(/\{\{Stellar[_ ]Navigation[_ ]Information\s*\|?([\s\S]*?)\}\}/i);
        const starMatch = text.match(/\{\{Star[_ ]Information\s*\|?([\s\S]*?)\}\}/i);
        const conflictMatch = text.match(/\{\{(?:Military[_ ]Conflict|War[_ ]Information|Military[_ ]Operation[_ ]Information)\s*\|?([\s\S]*?)\}\}/i);
        const periodMatch = text.match(/\{\{Historical[_ ]Period[_ ]Information\s*\|?([\s\S]*?)\}\}/i);
        const treatyMatch = text.match(/\{\{Treaty[_ ]Information\s*\|?([\s\S]*?)\}\}/i);
        const raceMatch = text.match(/\{\{(?:Race[_ ]Information|Species[_ ]Information)\s*\|?([\s\S]*?)\}\}/i);
        const currencyMatch = text.match(/\{\{Currency[_ ]Information\s*\|?([\s\S]*?)\}\}/i);
        const economyMatch = text.match(/\{\{(?:Economy[_ ]Information|Economic[_ ]Information)\s*\|?([\s\S]*?)\}\}/i);
        const nationMatch = text.match(/\{\{Nation[_ ]Information\s*\|?([\s\S]*?)\}\}/i);
        const allianceMatch = text.match(/\{\{Alliance[_ ]Information\s*\|?([\s\S]*?)\}\}/i);
        const companyMatch = text.match(/\{\{(?:Company[_ ]Information|Corporation[_ ]Information)\s*\|?([\s\S]*?)\}\}/i);
        const scienceMatch = text.match(/\{\{(?:Scientific[_ ]Principle[_ ]Information|Science[_ ]Information|Propulsion[_ ]Information)\s*\|?([\s\S]*?)\}\}/i);
        const weaponMatch = text.match(/\{\{(?:Weapon[_ ]Information|Engineering[_ ]System[_ ]Information|Defense[_ ]Information|Defense[_ ]System[_ ]Information)\s*\|?([\s\S]*?)\}\}/i);
        const structureMatch = text.match(/\{\{(?:Space[_ ]Station[_ ]Information|Structure[_ ]Information|Building[_ ]Information|Space[_ ]Elevator[_ ]Information)\s*\|?([\s\S]*?)\}\}/i);
        const doctrineMatch = text.match(/\{\{(?:Tactical[_ ]Doctrine[_ ]Information|Tactics[_ ]Information|Treatise[_ ]Information|Doctrine[_ ]Information)\s*\|?([\s\S]*?)\}\}/i);
        const starshipClassMatch = text.match(/\{\{Starship[_ ]Class[_ ]Information\s*\|?([\s\S]*?)\}\}/i);
        const starshipMatch = text.match(/\{\{Starship[_ ]Information\s*\|?([\s\S]*?)\}\}/i);
        const aircraftMatch = text.match(/\{\{Aircraft[_ ]Information\s*\|?([\s\S]*?)\}\}/i);
        const vehicleMatch = text.match(/\{\{Vehicle[_ ]Information\s*\|?([\s\S]*?)\}\}/i);
        const cityMatch = text.match(/\{\{City[_ ]Information\s*\|?([\s\S]*?)\}\}/i);
        const regionMatch = text.match(/\{\{Region[_ ]Information\s*\|?([\s\S]*?)\}\}/i);
        const militaryBranchMatch = text.match(/\{\{Military[_ ]Branch[_ ]Information\s*\|?([\s\S]*?)\}\}/i);
        const militaryForceMatch = text.match(/\{\{Military[_ ]Force[_ ]Information\s*\|?([\s\S]*?)\}\}/i);
        const militaryOverviewMatch = text.match(/\{\{Military[_ ]Overview[_ ]Information\s*\|?([\s\S]*?)\}\}/i);
        const infantryMatch = text.match(/\{\{Infantry[_ ]Information\s*\|?([\s\S]*?)\}\}/i);
        const squadronMatch = text.match(/\{\{Squadron[_ ]Information\s*\|?([\s\S]*?)\}\}/i);
        const intelligenceBranchMatch = text.match(/\{\{Intelligence[_ ]Branch[_ ]Information\s*\|?([\s\S]*?)\}\}/i);
        const fleetMatch = text.match(/\{\{(?:UCS|Mesarthrim)[_ ]Fleet\s*\|?([\s\S]*?)\}\}/i);

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
        } else if (conflictMatch) {
            text = text.replace(conflictMatch[0], '');
            infoboxHtml = this.renderConflictInformation(conflictMatch[1], articleImages, baseUrl);
        } else if (periodMatch) {
            text = text.replace(periodMatch[0], '');
            infoboxHtml = this.renderHistoricalPeriodInformation(periodMatch[1], articleImages, baseUrl);
        } else if (treatyMatch) {
            text = text.replace(treatyMatch[0], '');
            infoboxHtml = this.renderTreatyInformation(treatyMatch[1], articleImages, baseUrl);
        } else if (raceMatch) {
            text = text.replace(raceMatch[0], '');
            infoboxHtml = this.renderRaceInformation(raceMatch[1], articleImages, baseUrl);
        } else if (currencyMatch) {
            text = text.replace(currencyMatch[0], '');
            infoboxHtml = this.renderCurrencyInformation(currencyMatch[1], articleImages, baseUrl);
        } else if (economyMatch) {
            text = text.replace(economyMatch[0], '');
            infoboxHtml = this.renderEconomyInformation(economyMatch[1], articleImages, baseUrl);
        } else if (nationMatch) {
            text = text.replace(nationMatch[0], '');
            infoboxHtml = this.renderNationInformation(nationMatch[1], articleImages, baseUrl);
        } else if (allianceMatch) {
            text = text.replace(allianceMatch[0], '');
            infoboxHtml = this.renderAllianceInformation(allianceMatch[1], articleImages, baseUrl);
        } else if (companyMatch) {
            text = text.replace(companyMatch[0], '');
            infoboxHtml = this.renderCompanyInformation(companyMatch[1], articleImages, baseUrl);
        } else if (scienceMatch) {
            text = text.replace(scienceMatch[0], '');
            infoboxHtml = this.renderScientificPrincipleInformation(scienceMatch[1], articleImages, baseUrl);
        } else if (weaponMatch) {
            text = text.replace(weaponMatch[0], '');
            infoboxHtml = this.renderWeaponInformation(weaponMatch[1], articleImages, baseUrl);
        } else if (structureMatch) {
            text = text.replace(structureMatch[0], '');
            infoboxHtml = this.renderSpaceStationInformation(structureMatch[1], articleImages, baseUrl);
        } else if (doctrineMatch) {
            text = text.replace(doctrineMatch[0], '');
            infoboxHtml = this.renderTacticalDoctrineInformation(doctrineMatch[1], articleImages, baseUrl);
        } else if (starshipClassMatch) {
            text = text.replace(starshipClassMatch[0], '');
            infoboxHtml = this.renderStarshipClassInformation(starshipClassMatch[1], articleImages, baseUrl);
        } else if (starshipMatch) {
            text = text.replace(starshipMatch[0], '');
            infoboxHtml = this.renderStarshipInformation(starshipMatch[1], articleImages, baseUrl);
        } else if (aircraftMatch) {
            text = text.replace(aircraftMatch[0], '');
            infoboxHtml = this.renderAircraftInformation(aircraftMatch[1], articleImages, baseUrl);
        } else if (vehicleMatch) {
            text = text.replace(vehicleMatch[0], '');
            infoboxHtml = this.renderVehicleInformation(vehicleMatch[1], articleImages, baseUrl);
        } else if (cityMatch) {
            text = text.replace(cityMatch[0], '');
            infoboxHtml = this.renderCityInformation(cityMatch[1], articleImages, baseUrl);
        } else if (regionMatch) {
            text = text.replace(regionMatch[0], '');
            infoboxHtml = this.renderRegionInformation(regionMatch[1], articleImages, baseUrl);
        } else if (militaryBranchMatch) {
            text = text.replace(militaryBranchMatch[0], '');
            infoboxHtml = this.renderMilitaryBranchInformation(militaryBranchMatch[1], articleImages, baseUrl);
        } else if (militaryForceMatch) {
            text = text.replace(militaryForceMatch[0], '');
            infoboxHtml = this.renderMilitaryForceInformation(militaryForceMatch[1], articleImages, baseUrl);
        } else if (militaryOverviewMatch) {
            text = text.replace(militaryOverviewMatch[0], '');
            infoboxHtml = this.renderMilitaryOverviewInformation(militaryOverviewMatch[1], articleImages, baseUrl);
        } else if (infantryMatch) {
            text = text.replace(infantryMatch[0], '');
            infoboxHtml = this.renderInfantryInformation(infantryMatch[1], articleImages, baseUrl);
        } else if (squadronMatch) {
            text = text.replace(squadronMatch[0], '');
            infoboxHtml = this.renderSquadronInformation(squadronMatch[1], articleImages, baseUrl);
        } else if (intelligenceBranchMatch) {
            text = text.replace(intelligenceBranchMatch[0], '');
            infoboxHtml = this.renderIntelligenceBranchInformation(intelligenceBranchMatch[1], articleImages, baseUrl);
        } else if (fleetMatch) {
            text = text.replace(fleetMatch[0], '');
            infoboxHtml = this.renderFleetInformation(fleetMatch[1], articleImages, baseUrl);
        }

        // Inline variant spec cards
        text = text.replace(/\{\{Aircraft[_ ]Variant\s*\|?([\s\S]*?)\}\}/gi, (_m, vBody) => {
            return this.renderAircraftVariant(vBody);
        });

        // Clean out any unhandled navbox templates (e.g. {{Pelagrim Crisis Navbox}})
        text = text.replace(/\{\{[^}]*Navbox\}\}/gi, '');

        // 2. Extract Category tags at the bottom
        const categories: string[] = [];
        text = text.replace(/\[\[Category:([^\]]+)\]\]/gi, (_m, cat) => {
            categories.push(cat.trim());
            return '';
        });

        // 3. Extract MediaWiki tables ({| ... |})
        const tables: string[] = [];
        text = text.replace(/\{\|[\s\S]*?\|\}/g, (match) => {
            const index = tables.length;
            tables.push(this.renderTable(match, articleImages, baseUrl));
            return `\n\n__CODEX_TABLE_${index}__\n\n`;
        });

        // 4. Normalize headings, standalone image tags, and list blocks so they are bounded by blank lines
        text = text.replace(/^(={2,}[^\n]+={2,})$/gm, '\n\n$1\n\n');
        text = text.replace(/^(\[\[(?:Image|File):[^\]]+\]\])\s*$/gm, '\n\n$1\n\n');
        text = text.replace(/([^\n])\r?\n([*#]\s+)/g, '$1\n\n$2');
        text = text.replace(/([*#][^\n]+)\r?\n([^*#\s\n])/g, '$1\n\n$2');

        // 5. Split into blocks
        const blocks = text.split(/\n\s*\n+/);
        const htmlBlocks: string[] = [];

        if (infoboxHtml) {
            htmlBlocks.push(infoboxHtml);
        }

        for (const block of blocks) {
            const trimmed = block.trim();
            if (!trimmed) continue;

            // MediaWiki table placeholder check
            if (trimmed.includes('__CODEX_TABLE_')) {
                const replaced = trimmed.replace(/__CODEX_TABLE_(\d+)__/g, (_m, id) => {
                    const idx = parseInt(id, 10);
                    return tables[idx] || '';
                });
                htmlBlocks.push(replaced);
                continue;
            }

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

            // Bullet / Ordered / Mixed Lists and Paragraphs
            const lines = trimmed.split('\n').map(l => l.trim()).filter(l => Boolean(l));
            const hasListLines = lines.some(l => l.startsWith('*') || l.startsWith('#'));

            if (hasListLines) {
                let currentPara: string[] = [];
                let currentListType: 'ul' | 'ol' | null = null;
                let currentListItems: string[] = [];

                const flushPara = () => {
                    if (currentPara.length > 0) {
                        htmlBlocks.push(`<p class="codex-p">${this.formatInline(currentPara.join(' '))}</p>`);
                        currentPara = [];
                    }
                };

                const flushList = () => {
                    if (currentListType && currentListItems.length > 0) {
                        const tag = currentListType === 'ul' ? 'ul' : 'ol';
                        const cls = currentListType === 'ul' ? 'codex-list' : 'codex-ordered-list';
                        const renderedItems = currentListItems
                            .map(itemText => `<li class="codex-list-item">${this.formatInline(itemText)}</li>`)
                            .join('\n');
                        htmlBlocks.push(`<${tag} class="${cls}">\n${renderedItems}\n</${tag}>`);
                        currentListType = null;
                        currentListItems = [];
                    }
                };

                for (const line of lines) {
                    if (line.startsWith('*')) {
                        flushPara();
                        if (currentListType && currentListType !== 'ul') flushList();
                        currentListType = 'ul';
                        currentListItems.push(line.replace(/^\*+\s*/, ''));
                    } else if (line.startsWith('#')) {
                        flushPara();
                        if (currentListType && currentListType !== 'ol') flushList();
                        currentListType = 'ol';
                        currentListItems.push(line.replace(/^#+\s*/, ''));
                    } else {
                        if (currentListType) flushList();
                        currentPara.push(line);
                    }
                }
                flushPara();
                flushList();
                continue;
            }

            // Standard paragraph
            htmlBlocks.push(`<p class="codex-p">${this.formatInline(trimmed)}</p>`);
        }

        // 5. Append categories section if present
        if (categories.length > 0) {
            const catLinks = categories
                .map(c => `<li><a href="#/codex/Category:${encodeURIComponent(c)}" class="codex-category-tag" data-target="Category:${c.replace(/"/g, '&quot;')}">${c.replace(/_/g, ' ')}</a></li>`)
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
 
        // 6. Append Category Members Directory if present
        if (categoryMembers) {
            htmlBlocks.push(this.renderCategoryMembers(categoryMembers));
        }

        return htmlBlocks.join('\n');
    }

    private static renderCategoryMembers(members: CategoryMembersResult): string {
        if (members.totalCount === 0) {
            return `
                <div class="codex-category-members-section">
                    <div class="codex-category-section-header">// ARCHIVE DIRECTORY (0 RECORDS)</div>
                    <div class="codex-category-empty">// NO ARCHIVE RECORDS CLASSIFIED UNDER THIS CATEGORY</div>
                </div>
            `;
        }

        const parts: string[] = ['<div class="codex-category-members-section">'];

        // Subcategories
        if (members.subcategories.length > 0) {
            const countStr = members.subcategories.length === 1 ? '1 SUBCATEGORY' : `${members.subcategories.length} SUBCATEGORIES`;
            parts.push(`
                <div class="codex-category-subcats-block">
                    <div class="codex-category-section-header">// ${countStr}</div>
                    <div class="codex-subcat-grid">
            `);
            for (const subcat of members.subcategories) {
                const displayName = subcat.title.replace(/^Category:\s*/i, '');
                parts.push(`
                    <a href="#/codex/${encodeURIComponent(subcat.slug)}" class="codex-wikilink codex-subcat-card" data-target="${subcat.slug}">
                        <span class="codex-subcat-icon">📁</span>
                        <span class="codex-subcat-name">${displayName}</span>
                    </a>
                `);
            }
            parts.push(`
                    </div>
                </div>
            `);
        }

        // Member pages
        if (members.pages.length > 0) {
            const countStr = members.pages.length === 1 ? '1 RECORD' : `${members.pages.length} RECORDS`;

            const groups = new Map<string, typeof members.pages>();
            for (const page of members.pages) {
                const firstChar = (page.title.trim()[0] || '#').toUpperCase();
                const groupKey = /[A-Z]/.test(firstChar) ? firstChar : '#';
                if (!groups.has(groupKey)) {
                    groups.set(groupKey, []);
                }
                groups.get(groupKey)!.push(page);
            }

            const sortedKeys = Array.from(groups.keys()).sort((a, b) => {
                if (a === '#') return -1;
                if (b === '#') return 1;
                return a.localeCompare(b);
            });

            const quickLinks = sortedKeys.map(k => `<button type="button" class="codex-letter-jump" data-letter="${k}">${k}</button>`).join(' ');

            parts.push(`
                <div class="codex-category-pages-block">
                    <div class="codex-category-header-row">
                        <div class="codex-category-section-header">// ARCHIVE DIRECTORY (${countStr})</div>
                        <div class="codex-letter-index">${quickLinks}</div>
                    </div>
            `);

            for (const key of sortedKeys) {
                const items = groups.get(key)!;
                parts.push(`
                    <div class="codex-letter-group" id="codex-letter-${key}">
                        <div class="codex-letter-badge">${key}</div>
                        <div class="codex-category-page-list">
                `);
                for (const item of items) {
                    parts.push(`
                        <div class="codex-category-page-item">
                            <a href="#/codex/${encodeURIComponent(item.slug)}" class="codex-wikilink" data-target="${item.slug}">
                                ${item.title}
                            </a>
                        </div>
                    `);
                }
                parts.push(`
                        </div>
                    </div>
                `);
            }

            parts.push(`
                </div>
            `);
        }

        parts.push('</div>');
        return parts.join('\n');
    }

    private static parseTemplateParams(body: string): Record<string, string> {
        const params: Record<string, string> = {};
        let currentKey: string | null = null;

        for (const rawLine of body.split('\n')) {
            const line = rawLine.trim();
            const paramMatch = line.match(/^(?:\|\s*)?([a-zA-Z0-9_]+)\s*=\s*(.*)$/);
            if (paramMatch) {
                const rawKey = paramMatch[1].trim();
                currentKey = rawKey.toLowerCase();
                const val = paramMatch[2].trim();
                params[currentKey] = val;
                params[rawKey] = val;
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

    private static renderConflictInformation(
        body: string,
        articleImages: Record<string, CodexImageEntry> | undefined,
        baseUrl: string
    ): string {
        const params = this.parseTemplateParams(body);
        const name = params['conflict'] || params['name'] || 'Military Conflict';
        const partof = params['partof'] || '';
        const imgName = this.extractImageName(params['image']);
        const caption = params['caption'] || '';

        const date = params['date'] || '';
        const place = params['place'] || '';
        const territory = params['territory'] || '';
        const status = params['status'] || '';
        const result = params['result'] || '';
        const theater = params['operation_theater'] || params['theater'] || '';
        const executor = params['executor'] || '';
        const planner = params['planner'] || '';
        const timeframe = params['timeframe'] || '';

        const combatant1 = params['combatant1'] || '';
        const combatant2 = params['combatant2'] || '';
        const commander1 = params['commander1'] || '';
        const commander2 = params['commander2'] || '';
        const strength1 = params['strength1'] || '';
        const strength2 = params['strength2'] || '';

        const rows: string[] = [];
        if (theater) rows.push(`<tr><th>Operation Theater</th><td>${this.formatInline(theater)}</td></tr>`);
        if (timeframe) rows.push(`<tr><th>Timeframe</th><td>${this.formatInline(timeframe)}</td></tr>`);
        if (date) rows.push(`<tr><th>Date</th><td>${this.formatInline(date)}</td></tr>`);
        if (place) rows.push(`<tr><th>Place</th><td>${this.formatInline(place)}</td></tr>`);
        if (territory) rows.push(`<tr><th>Territory</th><td>${this.formatInline(territory)}</td></tr>`);
        if (executor) rows.push(`<tr><th>Executor(s)</th><td>${this.formatInline(executor)}</td></tr>`);
        if (planner) rows.push(`<tr><th>Planner(s)</th><td>${this.formatInline(planner)}</td></tr>`);
        if (status) rows.push(`<tr><th>Status</th><td>${this.formatInline(status)}</td></tr>`);
        if (result) rows.push(`<tr><th>Result</th><td>${this.formatInline(result)}</td></tr>`);

        if (combatant1 || combatant2) {
            rows.push(`
                <tr class="infobox-section-header-row"><th colspan="2" class="infobox-section-header">Belligerents</th></tr>
                <tr class="infobox-dual-row">
                    <td class="infobox-dual-col">${this.formatInline(combatant1)}</td>
                    <td class="infobox-dual-col">${this.formatInline(combatant2)}</td>
                </tr>
            `);
        }

        if (commander1 || commander2) {
            rows.push(`
                <tr class="infobox-section-header-row"><th colspan="2" class="infobox-section-header">Commanders</th></tr>
                <tr class="infobox-dual-row">
                    <td class="infobox-dual-col">${this.formatInline(commander1)}</td>
                    <td class="infobox-dual-col">${this.formatInline(commander2)}</td>
                </tr>
            `);
        }

        if (strength1 || strength2) {
            rows.push(`
                <tr class="infobox-section-header-row"><th colspan="2" class="infobox-section-header">Strength</th></tr>
                <tr class="infobox-dual-row">
                    <td class="infobox-dual-col">${this.formatInline(strength1)}</td>
                    <td class="infobox-dual-col">${this.formatInline(strength2)}</td>
                </tr>
            `);
        }

        let imgHtml = '';
        if (imgName) {
            imgHtml = this.renderImageContainer(imgName, articleImages, baseUrl, name, caption, false, true);
        }

        return `
            <aside class="codex-infobox conflict-information">
                <div class="infobox-header conflict-header">
                    <div class="infobox-subtitle">TACTICAL RECORD // MILITARY CONFLICT</div>
                    <h3 class="infobox-name">${this.formatInline(name)}</h3>
                    ${partof ? `<div class="infobox-partof"><small>Part of</small> <strong>${this.formatInline(partof)}</strong></div>` : ''}
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

    private static renderHistoricalPeriodInformation(
        body: string,
        _articleImages: Record<string, CodexImageEntry> | undefined,
        _baseUrl: string
    ): string {
        const params = this.parseTemplateParams(body);
        const name = params['period'] || params['name'] || 'Historical Period';
        const began = params['began'] || '';
        const ended = params['ended'] || '';

        const rows: string[] = [];
        if (began) rows.push(`<tr><th>Began</th><td>${this.formatInline(began)}</td></tr>`);
        if (ended) rows.push(`<tr><th>Ended</th><td>${this.formatInline(ended)}</td></tr>`);

        return `
            <aside class="codex-infobox period-information">
                <div class="infobox-header period-header">
                    <div class="infobox-subtitle">CHRONOLOGY // HISTORICAL PERIOD</div>
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

    private static renderTreatyInformation(
        body: string,
        _articleImages: Record<string, CodexImageEntry> | undefined,
        _baseUrl: string
    ): string {
        const params = this.parseTemplateParams(body);
        const name = params['treaty'] || params['name'] || 'Treaty Record';
        const date = params['date'] || '';
        const place = params['place'] || '';
        const result = params['result'] || '';
        const signatory1 = params['signatories1'] || params['signatory1'] || '';
        const signatory2 = params['signatories2'] || params['signatory2'] || '';

        const rows: string[] = [];
        if (date) rows.push(`<tr><th>Date</th><td>${this.formatInline(date)}</td></tr>`);
        if (place) rows.push(`<tr><th>Place</th><td>${this.formatInline(place)}</td></tr>`);
        if (result) rows.push(`<tr><th>Result</th><td>${this.formatInline(result)}</td></tr>`);

        if (signatory1 || signatory2) {
            rows.push(`
                <tr class="infobox-section-header-row"><th colspan="2" class="infobox-section-header">Signatories</th></tr>
                <tr class="infobox-dual-row">
                    <td class="infobox-dual-col">${this.formatInline(signatory1)}</td>
                    <td class="infobox-dual-col">${this.formatInline(signatory2)}</td>
                </tr>
            `);
        }

        return `
            <aside class="codex-infobox treaty-information">
                <div class="infobox-header treaty-header">
                    <div class="infobox-subtitle">DIPLOMATIC ACCORD // TREATY</div>
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

    private static renderRaceInformation(
        body: string,
        articleImages: Record<string, CodexImageEntry> | undefined,
        baseUrl: string
    ): string {
        const params = this.parseTemplateParams(body);
        const name = params['name'] || params['race'] || params['species'] || 'Species Record';
        const image = params['image'] || '';
        const caption = params['caption'] || '';
        const classification = params['classification'] || params['type'] || params['genus'] || '';
        const homeworld = params['homeworld'] || params['origin'] || params['origin_world'] || '';
        const height = params['average_height'] || params['height'] || '';
        const lifespan = params['average_lifespan'] || params['lifespan'] || '';
        const language = params['language'] || params['languages'] || '';
        const government = params['government'] || params['allegiance'] || params['major_nations'] || '';
        const metabolism = params['metabolism'] || params['diet'] || '';
        const status = params['status'] || '';

        const rows: string[] = [];
        if (classification) rows.push(`<tr><th>Classification</th><td>${this.formatInline(classification)}</td></tr>`);
        if (homeworld) rows.push(`<tr><th>Homeworld</th><td>${this.formatInline(homeworld)}</td></tr>`);
        if (height) rows.push(`<tr><th>Avg. Height</th><td>${this.formatInline(height)}</td></tr>`);
        if (lifespan) rows.push(`<tr><th>Avg. Lifespan</th><td>${this.formatInline(lifespan)}</td></tr>`);
        if (language) rows.push(`<tr><th>Language</th><td>${this.formatInline(language)}</td></tr>`);
        if (government) rows.push(`<tr><th>Government / Realm</th><td>${this.formatInline(government)}</td></tr>`);
        if (metabolism) rows.push(`<tr><th>Metabolism</th><td>${this.formatInline(metabolism)}</td></tr>`);
        if (status) rows.push(`<tr><th>Status</th><td>${this.formatInline(status)}</td></tr>`);

        let imgHtml = '';
        if (image) {
            const cleanImgName = image.replace(/^\[\[Image:([^\|\]]+).*\]\]$/, '$1').trim();
            imgHtml = this.renderImageContainer(cleanImgName, articleImages, baseUrl, name, caption, false, true);
        }

        return `
            <aside class="codex-infobox race-information">
                <div class="infobox-header race-header">
                    <div class="infobox-subtitle">XENOLOGICAL ARCHIVE // SAPIENT SPECIES</div>
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

    private static renderCurrencyInformation(
        body: string,
        articleImages: Record<string, CodexImageEntry> | undefined,
        baseUrl: string
    ): string {
        const params = this.parseTemplateParams(body);
        const name = params['name'] || params['currency'] || 'Currency Record';
        const image = params['image'] || '';
        const caption = params['caption'] || '';
        const symbol = params['symbol'] || params['code'] || params['iso_code'] || '';
        const issuer = params['issuer'] || params['nation'] || params['authority'] || '';
        const standard = params['standard'] || params['backing'] || params['peg'] || '';
        const subunit = params['subunit'] || params['subdivision'] || '';
        const introduced = params['introduced'] || params['introduction'] || params['date'] || params['established'] || '';
        const replaced = params['replaced'] || params['predecessor'] || '';
        const denominations = params['denominations'] || params['coins'] || '';
        const status = params['status'] || '';

        const rows: string[] = [];
        if (symbol) rows.push(`<tr><th>Symbol / Code</th><td>${this.formatInline(symbol)}</td></tr>`);
        if (issuer) rows.push(`<tr><th>Issuing Authority</th><td>${this.formatInline(issuer)}</td></tr>`);
        if (standard) rows.push(`<tr><th>Monetary Standard</th><td>${this.formatInline(standard)}</td></tr>`);
        if (subunit) rows.push(`<tr><th>Subunit</th><td>${this.formatInline(subunit)}</td></tr>`);
        if (introduced) rows.push(`<tr><th>Introduced</th><td>${this.formatInline(introduced)}</td></tr>`);
        if (replaced) rows.push(`<tr><th>Replaced</th><td>${this.formatInline(replaced)}</td></tr>`);
        if (denominations) rows.push(`<tr><th>Denominations</th><td>${this.formatInline(denominations)}</td></tr>`);
        if (status) rows.push(`<tr><th>Status</th><td>${this.formatInline(status)}</td></tr>`);

        let imgHtml = '';
        if (image) {
            const cleanImgName = image.replace(/^\[\[Image:([^\|\]]+).*\]\]$/, '$1').trim();
            imgHtml = this.renderImageContainer(cleanImgName, articleImages, baseUrl, name, caption, false, true);
        }

        return `
            <aside class="codex-infobox currency-information">
                <div class="infobox-header currency-header">
                    <div class="infobox-subtitle">FINANCIAL ARCHIVE // MONETARY SYSTEM</div>
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

    private static renderEconomyInformation(
        body: string,
        articleImages: Record<string, CodexImageEntry> | undefined,
        baseUrl: string
    ): string {
        const params = this.parseTemplateParams(body);
        const name = params['name'] || params['nation'] || params['economy'] || 'Macroeconomic Overview';
        const image = params['image'] || '';
        const caption = params['caption'] || '';
        const currency = params['currency'] || '';
        const gdp = params['gdp'] || '';
        const industries = params['industries'] || params['main_industries'] || '';
        const tradePartners = params['trade_partners'] || params['partners'] || '';
        const fiscalYear = params['fiscal_year'] || '';
        const status = params['status'] || '';

        const rows: string[] = [];
        if (currency) rows.push(`<tr><th>Currency</th><td>${this.formatInline(currency)}</td></tr>`);
        if (gdp) rows.push(`<tr><th>GDP</th><td>${this.formatInline(gdp)}</td></tr>`);
        if (industries) rows.push(`<tr><th>Key Industries</th><td>${this.formatInline(industries)}</td></tr>`);
        if (tradePartners) rows.push(`<tr><th>Trade Partners</th><td>${this.formatInline(tradePartners)}</td></tr>`);
        if (fiscalYear) rows.push(`<tr><th>Fiscal Year</th><td>${this.formatInline(fiscalYear)}</td></tr>`);
        if (status) rows.push(`<tr><th>Status</th><td>${this.formatInline(status)}</td></tr>`);

        let imgHtml = '';
        if (image) {
            const cleanImgName = image.replace(/^\[\[Image:([^\|\]]+).*\]\]$/, '$1').trim();
            imgHtml = this.renderImageContainer(cleanImgName, articleImages, baseUrl, name, caption, false, true);
        }

        return `
            <aside class="codex-infobox economy-information">
                <div class="infobox-header economy-header">
                    <div class="infobox-subtitle">ECONOMIC SURVEY // MACROECONOMICS</div>
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

    private static renderNationInformation(
        body: string,
        articleImages: Record<string, CodexImageEntry> | undefined,
        baseUrl: string
    ): string {
        const params = this.parseTemplateParams(body);
        const name = params['name'] || params['nation'] || 'Sovereign Nation';
        const image = params['image'] || params['flag'] || '';
        const caption = params['caption'] || '';
        const motto = params['motto'] || '';
        const anthem = params['anthem'] || '';
        const symbol = params['national_symbol'] || params['symbol'] || '';
        const capital = params['capital'] || '';
        const language = params['language'] || params['languages'] || '';
        const government = params['government'] || '';
        const headOfState = params['head_of_state'] || params['leader'] || '';
        const formation = params['formation'] || params['founded'] || '';
        const status = params['status'] || '';
        const area = params['area'] || '';
        const population = params['population'] || '';
        const gdp = params['gdp'] || '';
        const currency = params['currency'] || '';

        const rows: string[] = [];
        if (motto) rows.push(`<tr><th>Motto</th><td><em>"${this.formatInline(motto)}"</em></td></tr>`);
        if (anthem) rows.push(`<tr><th>Anthem</th><td><em>"${this.formatInline(anthem)}"</em></td></tr>`);
        if (symbol) rows.push(`<tr><th>National Symbol</th><td>${this.formatInline(symbol)}</td></tr>`);
        if (capital) rows.push(`<tr><th>Capital</th><td>${this.formatInline(capital)}</td></tr>`);
        if (language) rows.push(`<tr><th>Official Language(s)</th><td>${this.formatInline(language)}</td></tr>`);
        if (government) rows.push(`<tr><th>Government</th><td>${this.formatInline(government)}</td></tr>`);
        if (headOfState) rows.push(`<tr><th>Head of State</th><td>${this.formatInline(headOfState)}</td></tr>`);
        if (formation) rows.push(`<tr><th>Formation</th><td>${this.formatInline(formation)}</td></tr>`);
        if (status) rows.push(`<tr><th>Status</th><td>${this.formatInline(status)}</td></tr>`);
        if (area) rows.push(`<tr><th>Territory / Area</th><td>${this.formatInline(area)}</td></tr>`);
        if (population) rows.push(`<tr><th>Population</th><td>${this.formatInline(population)}</td></tr>`);
        if (gdp) rows.push(`<tr><th>GDP</th><td>${this.formatInline(gdp)}</td></tr>`);
        if (currency) rows.push(`<tr><th>Currency</th><td>${this.formatInline(currency)}</td></tr>`);

        let imgHtml = '';
        if (image) {
            const cleanImgName = image.replace(/^\[\[Image:([^\|\]]+).*\]\]$/, '$1').trim();
            imgHtml = this.renderImageContainer(cleanImgName, articleImages, baseUrl, name, caption, false, true);
        }

        return `
            <aside class="codex-infobox nation-information">
                <div class="infobox-header nation-header">
                    <div class="infobox-subtitle">POLITICAL ARCHIVE // SOVEREIGN NATION</div>
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

    private static renderAllianceInformation(
        body: string,
        articleImages: Record<string, CodexImageEntry> | undefined,
        baseUrl: string
    ): string {
        const params = this.parseTemplateParams(body);
        const name = params['name'] || params['alliance'] || 'Interstellar Alliance';
        const flag = params['flag'] || params['image'] || '';
        const badge = params['badge'] || '';
        const caption = params['caption'] || '';
        const building = params['building'] || '';
        const headquarters = params['headquarters'] || '';
        const hqFull = [building, headquarters].filter(Boolean).join(', ');
        const title = params['title'] || '';
        const leader = params['leader'] || '';
        const leaderFull = title && leader ? `<strong>${this.formatInline(title)}:</strong> ${this.formatInline(leader)}` : (leader || title);
        const event = params['event'] || '';
        const date = params['date'] || '';
        const number = params['number'] || '';
        const members = params['members'] || '';

        const rows: string[] = [];
        if (hqFull) rows.push(`<tr><th>Headquarters</th><td>${this.formatInline(hqFull)}</td></tr>`);
        if (leaderFull) rows.push(`<tr><th>Leadership</th><td>${leaderFull}</td></tr>`);
        if (event) rows.push(`<tr><th>Founding Accord</th><td>${this.formatInline(event)}</td></tr>`);
        if (date) rows.push(`<tr><th>Formation Date</th><td>${this.formatInline(date)}</td></tr>`);
        if (number) rows.push(`<tr><th>Member Count</th><td>${this.formatInline(number)}</td></tr>`);
        if (members) rows.push(`<tr><th>Members</th><td>${this.formatInline(members)}</td></tr>`);

        let imgHtml = '';
        if (flag) {
            const cleanImgName = flag.replace(/^\[\[Image:([^\|\]]+).*\]\]$/, '$1').trim();
            imgHtml += this.renderImageContainer(cleanImgName, articleImages, baseUrl, name, caption, false, true);
        }
        if (badge && badge !== flag) {
            const cleanBadgeName = badge.replace(/^\[\[Image:([^\|\]]+).*\]\]$/, '$1').trim();
            imgHtml += this.renderImageContainer(cleanBadgeName, articleImages, baseUrl, `${name} Badge`, '', false, true);
        }

        return `
            <aside class="codex-infobox alliance-information">
                <div class="infobox-header alliance-header">
                    <div class="infobox-subtitle">INTERSTELLAR TREATY // ALLIANCE ACCORD</div>
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

    private static renderCompanyInformation(
        body: string,
        articleImages: Record<string, CodexImageEntry> | undefined,
        baseUrl: string
    ): string {
        const params = this.parseTemplateParams(body);
        const name = params['name'] || params['company_name'] || params['company'] || 'Corporate Entity';
        const imgName = this.extractImageName(params['image'] || params['logo']);
        const caption = params['caption'] || '';
        const type = params['type'] || params['company_type'] || '';
        const founded = params['founded'] || '';
        const founder = params['founder'] || params['founders'] || '';
        const headquarters = params['headquarters'] || params['location'] || '';
        const keyPeople = params['key_people'] || params['leadership'] || '';
        const industry = params['industry'] || params['sector'] || '';
        const products = params['products'] || params['services'] || '';
        const revenue = params['revenue'] || '';
        const operatingIncome = params['operating_income'] || params['profit'] || '';
        const employees = params['employees'] || '';
        const parent = params['parent'] || params['parent_company'] || '';
        const subsidiaries = params['subsidiaries'] || params['divisions'] || '';
        const status = params['status'] || '';

        const rows: string[] = [];
        if (type) rows.push(`<tr><th>Type</th><td>${this.formatInline(type)}</td></tr>`);
        if (industry) rows.push(`<tr><th>Industry</th><td>${this.formatInline(industry)}</td></tr>`);
        if (founded) rows.push(`<tr><th>Founded</th><td>${this.formatInline(founded)}</td></tr>`);
        if (founder) rows.push(`<tr><th>Founder(s)</th><td>${this.formatInline(founder)}</td></tr>`);
        if (headquarters) rows.push(`<tr><th>Headquarters</th><td>${this.formatInline(headquarters)}</td></tr>`);
        if (keyPeople) rows.push(`<tr><th>Key People</th><td>${this.formatInline(keyPeople)}</td></tr>`);
        if (products) rows.push(`<tr><th>Products</th><td>${this.formatInline(products)}</td></tr>`);
        if (revenue) rows.push(`<tr><th>Revenue</th><td>${this.formatInline(revenue)}</td></tr>`);
        if (operatingIncome) rows.push(`<tr><th>Operating Income</th><td>${this.formatInline(operatingIncome)}</td></tr>`);
        if (employees) rows.push(`<tr><th>Employees</th><td>${this.formatInline(employees)}</td></tr>`);
        if (parent) rows.push(`<tr><th>Parent</th><td>${this.formatInline(parent)}</td></tr>`);
        if (subsidiaries) rows.push(`<tr><th>Subsidiaries</th><td>${this.formatInline(subsidiaries)}</td></tr>`);
        if (status) rows.push(`<tr><th>Status</th><td>${this.formatInline(status)}</td></tr>`);

        const imgHtml = imgName
            ? this.renderImageContainer(imgName, articleImages, baseUrl, `${name} Logo`, caption, false, true)
            : '';

        return `
            <aside class="codex-infobox company-information">
                <div class="infobox-header company-header">
                    <div class="infobox-subtitle">COMMERCIAL ENTITY // CORPORATE REGISTRY</div>
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

    private static renderScientificPrincipleInformation(
        body: string,
        articleImages: Record<string, CodexImageEntry> | undefined,
        baseUrl: string
    ): string {
        const params = this.parseTemplateParams(body);
        const name = params['name'] || params['principle'] || params['technology'] || 'Scientific Phenomenon';
        const imgName = this.extractImageName(params['image'] || params['diagram']);
        const caption = params['caption'] || '';
        const field = params['field'] || params['discipline'] || '';
        const subfield = params['subfield'] || params['branch'] || '';
        const classification = params['classification'] || params['type'] || '';
        const discoveredBy = params['discovered_by'] || params['developer'] || params['inventor'] || '';
        const date = params['date'] || params['era'] || '';
        const principles = params['principles'] || params['theory'] || '';
        const applications = params['applications'] || params['used_in'] || '';
        const status = params['status'] || '';

        const rows: string[] = [];
        if (field) rows.push(`<tr><th>Field</th><td>${this.formatInline(field)}</td></tr>`);
        if (subfield) rows.push(`<tr><th>Subfield</th><td>${this.formatInline(subfield)}</td></tr>`);
        if (classification) rows.push(`<tr><th>Classification</th><td>${this.formatInline(classification)}</td></tr>`);
        if (discoveredBy) rows.push(`<tr><th>Origin / Developer</th><td>${this.formatInline(discoveredBy)}</td></tr>`);
        if (date) rows.push(`<tr><th>Discovery Era</th><td>${this.formatInline(date)}</td></tr>`);
        if (principles) rows.push(`<tr><th>Theoretical Basis</th><td>${this.formatInline(principles)}</td></tr>`);
        if (applications) rows.push(`<tr><th>Applications</th><td>${this.formatInline(applications)}</td></tr>`);
        if (status) rows.push(`<tr><th>Status</th><td>${this.formatInline(status)}</td></tr>`);

        const imgHtml = imgName
            ? this.renderImageContainer(imgName, articleImages, baseUrl, `${name} Diagram`, caption, false, true)
            : '';

        return `
            <aside class="codex-infobox science-information">
                <div class="infobox-header science-header">
                    <div class="infobox-subtitle">SCIENTIFIC ARCHIVE // THEORETICAL PRINCIPLE</div>
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

    private static renderWeaponInformation(
        body: string,
        articleImages: Record<string, CodexImageEntry> | undefined,
        baseUrl: string
    ): string {
        const params = this.parseTemplateParams(body);
        const name = params['name'] || params['weapon'] || params['system'] || 'Tactical Engineering System';
        const imgName = this.extractImageName(params['image'] || params['diagram']);
        const caption = params['caption'] || '';
        const type = params['type'] || params['classification'] || '';
        const origin = params['origin'] || params['manufacturer'] || params['place_of_origin'] || '';
        const range = params['range'] || params['effective_range'] || '';
        const operator = params['operator'] || params['operators'] || params['user'] || '';
        const caliber = params['caliber'] || params['yield'] || params['power'] || '';
        const rateOfFire = params['rate_of_fire'] || '';
        const muzzleVelocity = params['muzzle_velocity'] || '';
        const feedSystem = params['feed_system'] || params['capacity'] || '';
        const status = params['status'] || '';

        const rows: string[] = [];
        if (type) rows.push(`<tr><th>Type</th><td>${this.formatInline(type)}</td></tr>`);
        if (origin) rows.push(`<tr><th>Origin</th><td>${this.formatInline(origin)}</td></tr>`);
        if (operator) rows.push(`<tr><th>Operator(s)</th><td>${this.formatInline(operator)}</td></tr>`);
        if (range) rows.push(`<tr><th>Effective Range</th><td>${this.formatInline(range)}</td></tr>`);
        if (caliber) rows.push(`<tr><th>Caliber / Output</th><td>${this.formatInline(caliber)}</td></tr>`);
        if (rateOfFire) rows.push(`<tr><th>Rate of Fire</th><td>${this.formatInline(rateOfFire)}</td></tr>`);
        if (muzzleVelocity) rows.push(`<tr><th>Muzzle Velocity</th><td>${this.formatInline(muzzleVelocity)}</td></tr>`);
        if (feedSystem) rows.push(`<tr><th>Feed System</th><td>${this.formatInline(feedSystem)}</td></tr>`);
        if (status) rows.push(`<tr><th>Status</th><td>${this.formatInline(status)}</td></tr>`);

        const imgHtml = imgName
            ? this.renderImageContainer(imgName, articleImages, baseUrl, `${name} Specification`, caption, false, true)
            : '';

        return `
            <aside class="codex-infobox weapon-information">
                <div class="infobox-header weapon-header">
                    <div class="infobox-subtitle">TACTICAL SYSTEM // ENGINEERING SPECIFICATION</div>
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

    private static renderSpaceStationInformation(
        body: string,
        articleImages: Record<string, CodexImageEntry> | undefined,
        baseUrl: string
    ): string {
        const params = this.parseTemplateParams(body);
        const name = params['name'] || params['station'] || params['structure'] || params['building'] || 'Architectural Structure';
        const imgName = this.extractImageName(params['image'] || params['diagram']);
        const caption = params['caption'] || '';
        const designation = params['designation'] || params['type'] || params['classification'] || '';
        const builder = params['builder'] || params['architect'] || params['manufacturer'] || '';
        const operator = params['operator'] || params['operator(s)'] || params['owner'] || params['affiliation'] || '';
        const location = params['location'] || params['planet'] || params['orbit'] || params['system'] || '';
        const crew = params['crew'] || params['capacity'] || params['personnel'] || '';
        const length = params['length'] || '';
        const beam = params['beam'] || params['width'] || '';
        const height = params['height'] || '';
        const totalVolume = params['total_volume'] || params['volume'] || params['footprint'] || '';
        const powerplant = params['powerplant'] || params['power_source'] || '';
        const sensors = params['sensors'] || params['avionics'] || '';
        const processingSystem = params['processing_system'] || params['computers'] || '';
        const aircraft = params['aircraft'] || params['hangar_capacity'] || params['docking_bays'] || '';
        const supportCapacity = params['support_capacity'] || '';
        const weapons = params['weapons'] || params['defenses'] || params['defense_systems'] || '';
        const armor = params['armor'] || '';
        const shields = params['shields'] || '';
        const special = params['special'] || params['features'] || '';
        const status = params['status'] || '';

        const rows: string[] = [];
        if (designation) rows.push(`<tr><th>Designation</th><td>${this.formatInline(designation)}</td></tr>`);
        if (builder) rows.push(`<tr><th>Builder(s)</th><td>${this.formatInline(builder)}</td></tr>`);
        if (operator) rows.push(`<tr><th>Operator(s)</th><td>${this.formatInline(operator)}</td></tr>`);
        if (location) rows.push(`<tr><th>Location / Orbit</th><td>${this.formatInline(location)}</td></tr>`);
        if (crew) rows.push(`<tr><th>Crew / Capacity</th><td>${this.formatInline(crew)}</td></tr>`);

        const dims: string[] = [];
        if (length) dims.push(`L: ${length}${/m(eters)?$/i.test(length) ? '' : ' m'}`);
        if (beam) dims.push(`W: ${beam}${/m(eters)?$/i.test(beam) ? '' : ' m'}`);
        if (height) dims.push(`H: ${height}${/m(eters)?$/i.test(height) ? '' : ' m'}`);
        if (dims.length > 0) {
            rows.push(`<tr><th>Dimensions</th><td>${dims.join(' &times; ')}</td></tr>`);
        }
        if (totalVolume) rows.push(`<tr><th>Total Volume</th><td>${this.formatInline(totalVolume)}${/m(eters)?\s*\^?3?$/i.test(totalVolume) ? '' : ' m&sup3;'}</td></tr>`);

        if (powerplant) rows.push(`<tr><th>Powerplant</th><td>${this.formatInline(powerplant)}</td></tr>`);
        if (sensors) rows.push(`<tr><th>Sensors</th><td>${this.formatInline(sensors)}</td></tr>`);
        if (processingSystem) rows.push(`<tr><th>Processing System</th><td>${this.formatInline(processingSystem)}</td></tr>`);
        if (aircraft) rows.push(`<tr><th>Hangar / Craft</th><td>${this.formatInline(aircraft)}</td></tr>`);
        if (supportCapacity) rows.push(`<tr><th>Support Capacity</th><td>${this.formatInline(supportCapacity)}</td></tr>`);
        if (weapons) rows.push(`<tr><th>Armament</th><td>${this.formatInline(weapons)}</td></tr>`);
        if (armor) rows.push(`<tr><th>Armor</th><td>${this.formatInline(armor)}</td></tr>`);
        if (shields) rows.push(`<tr><th>Shields</th><td>${this.formatInline(shields)}</td></tr>`);
        if (special) rows.push(`<tr><th>Special Systems</th><td>${this.formatInline(special)}</td></tr>`);
        if (status) rows.push(`<tr><th>Status</th><td>${this.formatInline(status)}</td></tr>`);

        const imgHtml = imgName
            ? this.renderImageContainer(imgName, articleImages, baseUrl, `${name} Blueprint`, caption, false, true)
            : '';

        return `
            <aside class="codex-infobox structure-information">
                <div class="infobox-header structure-header">
                    <div class="infobox-subtitle">ARCHITECTURAL ARCHIVE // STRUCTURAL SPECIFICATION</div>
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

    private static renderTacticalDoctrineInformation(
        body: string,
        articleImages: Record<string, CodexImageEntry> | undefined,
        baseUrl: string
    ): string {
        const params = this.parseTemplateParams(body);
        const name = params['name'] || params['title'] || params['doctrine'] || params['treatise'] || 'Tactical Doctrine';
        const imgName = this.extractImageName(params['image'] || params['diagram']);
        const caption = params['caption'] || '';
        const author = params['author'] || params['speaker'] || params['origin'] || '';
        const date = params['date'] || params['year'] || params['era'] || '';
        const type = params['type'] || params['classification'] || '';
        const subject = params['subject'] || params['topic'] || '';
        const theater = params['theater'] || params['domain'] || params['operational_scope'] || '';
        const keyPrinciples = params['key_principles'] || params['principles'] || params['takeaways'] || '';
        const status = params['status'] || '';

        const rows: string[] = [];
        if (type) rows.push(`<tr><th>Classification</th><td>${this.formatInline(type)}</td></tr>`);
        if (author) rows.push(`<tr><th>Author / Source</th><td>${this.formatInline(author)}</td></tr>`);
        if (date) rows.push(`<tr><th>Date / Era</th><td>${this.formatInline(date)}</td></tr>`);
        if (subject) rows.push(`<tr><th>Subject</th><td>${this.formatInline(subject)}</td></tr>`);
        if (theater) rows.push(`<tr><th>Theater / Domain</th><td>${this.formatInline(theater)}</td></tr>`);
        if (keyPrinciples) rows.push(`<tr><th>Key Principles</th><td>${this.formatInline(keyPrinciples)}</td></tr>`);
        if (status) rows.push(`<tr><th>Status</th><td>${this.formatInline(status)}</td></tr>`);

        const imgHtml = imgName
            ? this.renderImageContainer(imgName, articleImages, baseUrl, `${name} Illustration`, caption, false, true)
            : '';

        return `
            <aside class="codex-infobox doctrine-information">
                <div class="infobox-header doctrine-header">
                    <div class="infobox-subtitle">STRATEGIC COMMAND // TACTICAL DOCTRINE</div>
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

    private static formatUnit(val: string, unit: string): string {
        if (!val) return '';
        const trimmed = val.trim();
        if (/^\d+(\.\d+)?$/.test(trimmed)) {
            return `${trimmed} ${unit}`;
        }
        return trimmed;
    }

    private static renderStarshipClassInformation(
        body: string,
        articleImages: Record<string, CodexImageEntry> | undefined,
        baseUrl: string
    ): string {
        const params = this.parseTemplateParams(body);
        const name = params['name'] || params['title'] || 'Starship Class';
        const imgName = this.extractImageName(params['image']);
        const caption = params['caption'] || '';

        const classRows: string[] = [];
        if (params['designation']) classRows.push(`<tr><th>Designation</th><td>${this.formatInline(params['designation'])}</td></tr>`);
        if (params['builder']) classRows.push(`<tr><th>Builder(s)</th><td>${this.formatInline(params['builder'])}</td></tr>`);
        if (params['operator']) classRows.push(`<tr><th>Operator(s)</th><td>${this.formatInline(params['operator'])}</td></tr>`);
        if (params['number_of_ships'] || params['list_of_ships']) {
            const shipCount = params['number_of_ships'] ? `Total ${this.formatInline(params['number_of_ships'])}` : '';
            const shipList = params['list_of_ships'] ? `<br/>${this.formatInline(params['list_of_ships'])}` : '';
            classRows.push(`<tr><th>Ships in Class</th><td>${shipCount}${shipList}</td></tr>`);
        }

        const specRows: string[] = [];
        if (params['crew']) specRows.push(`<tr><th>Crew</th><td>${this.formatInline(params['crew'])}</td></tr>`);
        if (params['length']) specRows.push(`<tr><th>Length</th><td>${this.formatInline(this.formatUnit(params['length'], 'meters'))}</td></tr>`);
        if (params['beam']) specRows.push(`<tr><th>Beam</th><td>${this.formatInline(this.formatUnit(params['beam'], 'meters'))}</td></tr>`);
        if (params['height']) specRows.push(`<tr><th>Height</th><td>${this.formatInline(this.formatUnit(params['height'], 'meters'))}</td></tr>`);
        if (params['total_volume']) specRows.push(`<tr><th>Total Volume</th><td>${this.formatInline(this.formatUnit(params['total_volume'], 'm³'))}</td></tr>`);

        const sysRows: string[] = [];
        if (params['powerplant']) sysRows.push(`<tr><th>Powerplant</th><td>${this.formatInline(params['powerplant'])}</td></tr>`);
        if (params['propulsion']) sysRows.push(`<tr><th>Propulsion</th><td>${this.formatInline(params['propulsion'])}</td></tr>`);
        if (params['ftl_drive']) sysRows.push(`<tr><th>FTL Drive</th><td>${this.formatInline(params['ftl_drive'])}</td></tr>`);
        if (params['acceleration']) sysRows.push(`<tr><th>Acceleration</th><td>${this.formatInline(this.formatUnit(params['acceleration'], 'km/h/s'))}</td></tr>`);
        if (params['sensors']) sysRows.push(`<tr><th>Sensors</th><td>${this.formatInline(params['sensors'])}</td></tr>`);
        if (params['processing_system']) sysRows.push(`<tr><th>Processing System</th><td>${this.formatInline(params['processing_system'])}</td></tr>`);

        const capRows: string[] = [];
        if (params['aircraft']) capRows.push(`<tr><th>Aircraft Complement</th><td>${this.formatInline(params['aircraft'])}</td></tr>`);
        if (params['personnel']) capRows.push(`<tr><th>Personnel Capacity</th><td>${this.formatInline(params['personnel'])}</td></tr>`);
        if (params['support_capacity']) capRows.push(`<tr><th>Support Capacity</th><td>${this.formatInline(this.formatUnit(params['support_capacity'], 'm³'))}</td></tr>`);

        const combatRows: string[] = [];
        if (params['weapons']) combatRows.push(`<tr><th>Armament</th><td>${this.formatInline(params['weapons'])}</td></tr>`);
        if (params['armor']) combatRows.push(`<tr><th>Armor</th><td>${this.formatInline(params['armor'])}</td></tr>`);
        if (params['shields']) combatRows.push(`<tr><th>Shields</th><td>${this.formatInline(params['shields'])}</td></tr>`);
        if (params['special']) combatRows.push(`<tr><th>Special Systems</th><td>${this.formatInline(params['special'])}</td></tr>`);

        const allRows: string[] = [];
        if (classRows.length > 0) {
            allRows.push('<tr class="infobox-section-header-row"><th colspan="2" class="infobox-section-header">Class Features</th></tr>');
            allRows.push(...classRows);
        }
        if (specRows.length > 0) {
            allRows.push('<tr class="infobox-section-header-row"><th colspan="2" class="infobox-section-header">Dimensions & Personnel</th></tr>');
            allRows.push(...specRows);
        }
        if (sysRows.length > 0) {
            allRows.push('<tr class="infobox-section-header-row"><th colspan="2" class="infobox-section-header">Propulsion & Systems</th></tr>');
            allRows.push(...sysRows);
        }
        if (capRows.length > 0) {
            allRows.push('<tr class="infobox-section-header-row"><th colspan="2" class="infobox-section-header">Accommodations</th></tr>');
            allRows.push(...capRows);
        }
        if (combatRows.length > 0) {
            allRows.push('<tr class="infobox-section-header-row"><th colspan="2" class="infobox-section-header">Combat Systems</th></tr>');
            allRows.push(...combatRows);
        }

        const imgHtml = imgName
            ? this.renderImageContainer(imgName, articleImages, baseUrl, `${name} Blueprint`, caption, false, true)
            : '';

        return `
            <aside class="codex-infobox starship-information">
                <div class="infobox-header starship-header">
                    <div class="infobox-subtitle">NAVAL ARCHIVE // CAPITAL SHIP SPECIFICATION</div>
                    <h3 class="infobox-name">${this.formatInline(name)}</h3>
                </div>
                ${imgHtml ? `<div class="infobox-image-section">${imgHtml}</div>` : ''}
                <div class="infobox-divider"></div>
                <table class="infobox-table">
                    <tbody>
                        ${allRows.join('\n                        ')}
                    </tbody>
                </table>
            </aside>
        `;
    }

    private static renderStarshipInformation(
        body: string,
        articleImages: Record<string, CodexImageEntry> | undefined,
        baseUrl: string
    ): string {
        const params = this.parseTemplateParams(body);
        const name = params['name'] || params['title'] || 'Starship';
        const imgName = this.extractImageName(params['image']);
        const caption = params['caption'] || '';

        const descRows: string[] = [];
        if (params['ship_class']) descRows.push(`<tr><th>Ship Class</th><td>${this.formatInline(params['ship_class'])}</td></tr>`);
        if (params['laid_down']) descRows.push(`<tr><th>Laid Down</th><td>${this.formatInline(params['laid_down'])}</td></tr>`);
        if (params['launched']) descRows.push(`<tr><th>Launched</th><td>${this.formatInline(params['launched'])}</td></tr>`);
        if (params['commissioned']) descRows.push(`<tr><th>Commissioned</th><td>${this.formatInline(params['commissioned'])}</td></tr>`);
        if (params['status']) descRows.push(`<tr><th>Status</th><td>${this.formatInline(params['status'])}</td></tr>`);
        if (params['commander']) descRows.push(`<tr><th>Commander(s)</th><td>${this.formatInline(params['commander'])}</td></tr>`);

        const opRows: string[] = [];
        if (params['crew']) opRows.push(`<tr><th>Crew Complement</th><td>${this.formatInline(params['crew'])}</td></tr>`);
        if (params['processing_system']) opRows.push(`<tr><th>Processing System</th><td>${this.formatInline(params['processing_system'])}</td></tr>`);
        if (params['squadrons']) opRows.push(`<tr><th>Assigned Squadrons</th><td>${this.formatInline(params['squadrons'])}</td></tr>`);
        if (params['unique']) opRows.push(`<tr><th>Unique Features</th><td>${this.formatInline(params['unique'])}</td></tr>`);

        const allRows: string[] = [];
        if (descRows.length > 0) {
            allRows.push('<tr class="infobox-section-header-row"><th colspan="2" class="infobox-section-header">Hull Information</th></tr>');
            allRows.push(...descRows);
        }
        if (opRows.length > 0) {
            allRows.push('<tr class="infobox-section-header-row"><th colspan="2" class="infobox-section-header">Operational Registry</th></tr>');
            allRows.push(...opRows);
        }

        const imgHtml = imgName
            ? this.renderImageContainer(imgName, articleImages, baseUrl, `${name} Photo`, caption, false, true)
            : '';

        return `
            <aside class="codex-infobox starship-information">
                <div class="infobox-header starship-header">
                    <div class="infobox-subtitle">NAVAL REGISTRY // CAPITAL SHIP RECORD</div>
                    <h3 class="infobox-name">${this.formatInline(name)}</h3>
                </div>
                ${imgHtml ? `<div class="infobox-image-section">${imgHtml}</div>` : ''}
                <div class="infobox-divider"></div>
                <table class="infobox-table">
                    <tbody>
                        ${allRows.join('\n                        ')}
                    </tbody>
                </table>
            </aside>
        `;
    }

    private static renderAircraftInformation(
        body: string,
        articleImages: Record<string, CodexImageEntry> | undefined,
        baseUrl: string
    ): string {
        const params = this.parseTemplateParams(body);
        const name = params['name'] || params['title'] || 'Aircraft';
        const imgName = this.extractImageName(params['image']);
        const caption = params['caption'] || '';

        const descRows: string[] = [];
        if (params['mission_profile']) descRows.push(`<tr><th>Mission Profile</th><td>${this.formatInline(params['mission_profile'])}</td></tr>`);
        if (params['crew']) descRows.push(`<tr><th>Crew</th><td>${this.formatInline(params['crew'])}</td></tr>`);
        if (params['first_flight']) descRows.push(`<tr><th>First Flight</th><td>${this.formatInline(params['first_flight'])}</td></tr>`);
        if (params['manufacturer']) descRows.push(`<tr><th>Manufacturer(s)</th><td>${this.formatInline(params['manufacturer'])}</td></tr>`);
        if (params['operator']) descRows.push(`<tr><th>Operator(s)</th><td>${this.formatInline(params['operator'])}</td></tr>`);
        if (params['variants']) descRows.push(`<tr><th>Variants</th><td>${this.formatInline(params['variants'])}</td></tr>`);
        if (params['length']) descRows.push(`<tr><th>Length</th><td>${this.formatInline(this.formatUnit(params['length'], 'meters'))}</td></tr>`);
        if (params['wingspan']) descRows.push(`<tr><th>Wingspan</th><td>${this.formatInline(this.formatUnit(params['wingspan'], 'meters'))}</td></tr>`);
        if (params['height']) descRows.push(`<tr><th>Height</th><td>${this.formatInline(this.formatUnit(params['height'], 'meters'))}</td></tr>`);

        const sysRows: string[] = [];
        if (params['powerplant']) sysRows.push(`<tr><th>Powerplant</th><td>${this.formatInline(params['powerplant'])}</td></tr>`);
        if (params['propulsion']) sysRows.push(`<tr><th>Propulsion</th><td>${this.formatInline(params['propulsion'])}</td></tr>`);
        if (params['avionics']) sysRows.push(`<tr><th>Avionics Package</th><td>${this.formatInline(params['avionics'])}</td></tr>`);
        if (params['controls']) sysRows.push(`<tr><th>Control Systems</th><td>${this.formatInline(params['controls'])}</td></tr>`);
        if (params['sensors']) sysRows.push(`<tr><th>Sensors</th><td>${this.formatInline(params['sensors'])}</td></tr>`);
        if (params['communications']) sysRows.push(`<tr><th>Communications</th><td>${this.formatInline(params['communications'])}</td></tr>`);

        const perfRows: string[] = [];
        if (params['max_airspeed']) perfRows.push(`<tr><th>Max Airspeed</th><td>Mach ${this.formatInline(params['max_airspeed'])}</td></tr>`);
        if (params['cruising_airspeed']) perfRows.push(`<tr><th>Cruising Airspeed</th><td>${this.formatInline(this.formatUnit(params['cruising_airspeed'], 'km/h'))}</td></tr>`);
        if (params['acceleration_rate']) perfRows.push(`<tr><th>Acceleration Rate</th><td>${this.formatInline(this.formatUnit(params['acceleration_rate'], 'km/h/s'))}</td></tr>`);
        if (params['max_velocity']) perfRows.push(`<tr><th>Max Velocity</th><td>${this.formatInline(this.formatUnit(params['max_velocity'], 'km/s'))}</td></tr>`);
        if (params['operation_time']) perfRows.push(`<tr><th>Operation Time</th><td>${this.formatInline(this.formatUnit(params['operation_time'], 'hours'))}</td></tr>`);

        const combatRows: string[] = [];
        if (params['fixed_weapons']) combatRows.push(`<tr><th>Fixed Weapons</th><td>${this.formatInline(params['fixed_weapons'])}</td></tr>`);
        if (params['variable_payload']) combatRows.push(`<tr><th>Variable Payload</th><td>${this.formatInline(params['variable_payload'])}</td></tr>`);
        if (params['armor']) combatRows.push(`<tr><th>Armor</th><td>${this.formatInline(params['armor'])}</td></tr>`);
        if (params['shields']) combatRows.push(`<tr><th>Shields</th><td>${this.formatInline(params['shields'])}</td></tr>`);
        if (params['countermeasures']) combatRows.push(`<tr><th>Countermeasures</th><td>${this.formatInline(params['countermeasures'])}</td></tr>`);

        const allRows: string[] = [];
        if (descRows.length > 0) {
            allRows.push('<tr class="infobox-section-header-row"><th colspan="2" class="infobox-section-header">General Characteristics</th></tr>');
            allRows.push(...descRows);
        }
        if (sysRows.length > 0) {
            allRows.push('<tr class="infobox-section-header-row"><th colspan="2" class="infobox-section-header">Main Systems</th></tr>');
            allRows.push(...sysRows);
        }
        if (perfRows.length > 0) {
            allRows.push('<tr class="infobox-section-header-row"><th colspan="2" class="infobox-section-header">Performance Ratings</th></tr>');
            allRows.push(...perfRows);
        }
        if (combatRows.length > 0) {
            allRows.push('<tr class="infobox-section-header-row"><th colspan="2" class="infobox-section-header">Combat Systems</th></tr>');
            allRows.push(...combatRows);
        }

        const imgHtml = imgName
            ? this.renderImageContainer(imgName, articleImages, baseUrl, `${name} Blueprint`, caption, false, true)
            : '';

        return `
            <aside class="codex-infobox aircraft-information">
                <div class="infobox-header aircraft-header">
                    <div class="infobox-subtitle">AEROSPACE ARCHIVE // FLIGHT SYSTEM SPECIFICATION</div>
                    <h3 class="infobox-name">${this.formatInline(name)}</h3>
                </div>
                ${imgHtml ? `<div class="infobox-image-section">${imgHtml}</div>` : ''}
                <div class="infobox-divider"></div>
                <table class="infobox-table">
                    <tbody>
                        ${allRows.join('\n                        ')}
                    </tbody>
                </table>
            </aside>
        `;
    }

    private static renderAircraftVariant(body: string): string {
        const params = this.parseTemplateParams(body);
        const name = params['name'] || 'Aircraft Variant';

        const rows: string[] = [];
        if (params['powerplant']) rows.push(`<tr><th>Powerplant</th><td>${this.formatInline(params['powerplant'])}</td></tr>`);
        if (params['propulsion']) rows.push(`<tr><th>Propulsion</th><td>${this.formatInline(params['propulsion'])}</td></tr>`);
        if (params['max_airspeed']) rows.push(`<tr><th>Max Airspeed</th><td>Mach ${this.formatInline(params['max_airspeed'])}</td></tr>`);
        if (params['acceleration_rate']) rows.push(`<tr><th>Acceleration Rate</th><td>${this.formatInline(this.formatUnit(params['acceleration_rate'], 'km/h/s'))}</td></tr>`);
        if (params['fixed_weapons']) rows.push(`<tr><th>Weapons</th><td>${this.formatInline(params['fixed_weapons'])}</td></tr>`);

        return `
            <div class="aircraft-variant-card">
                <div class="variant-card-header">
                    <span class="variant-badge">AEROSPACE SPEC // VARIANT RECORD</span>
                    <h4 class="variant-title">${this.formatInline(name)}</h4>
                </div>
                <table class="variant-table">
                    <tbody>
                        ${rows.join('\n                        ')}
                    </tbody>
                </table>
            </div>
        `;
    }

    private static renderVehicleInformation(
        body: string,
        articleImages: Record<string, CodexImageEntry> | undefined,
        baseUrl: string
    ): string {
        const params = this.parseTemplateParams(body);
        const name = params['name'] || params['title'] || 'Combat Vehicle';
        const imgName = this.extractImageName(params['image']);
        const caption = params['caption'] || '';

        const descRows: string[] = [];
        if (params['mission_profile']) descRows.push(`<tr><th>Mission Profile</th><td>${this.formatInline(params['mission_profile'])}</td></tr>`);
        if (params['crew']) descRows.push(`<tr><th>Crew</th><td>${this.formatInline(params['crew'])}</td></tr>`);
        if (params['manufacturer']) descRows.push(`<tr><th>Manufacturer(s)</th><td>${this.formatInline(params['manufacturer'])}</td></tr>`);
        if (params['operator']) descRows.push(`<tr><th>Operator(s)</th><td>${this.formatInline(params['operator'])}</td></tr>`);

        const sysRows: string[] = [];
        if (params['powerplant']) sysRows.push(`<tr><th>Powerplant</th><td>${this.formatInline(params['powerplant'])}</td></tr>`);
        if (params['propulsion']) sysRows.push(`<tr><th>Propulsion</th><td>${this.formatInline(params['propulsion'])}</td></tr>`);
        if (params['max_speed']) sysRows.push(`<tr><th>Max Speed</th><td>${this.formatInline(this.formatUnit(params['max_speed'], 'km/h'))}</td></tr>`);
        if (params['fixed_weapons']) sysRows.push(`<tr><th>Fixed Weapons</th><td>${this.formatInline(params['fixed_weapons'])}</td></tr>`);
        if (params['armor']) sysRows.push(`<tr><th>Armor</th><td>${this.formatInline(params['armor'])}</td></tr>`);
        if (params['shields']) sysRows.push(`<tr><th>Shields</th><td>${this.formatInline(params['shields'])}</td></tr>`);
        if (params['countermeasures']) sysRows.push(`<tr><th>Countermeasures</th><td>${this.formatInline(params['countermeasures'])}</td></tr>`);

        const allRows: string[] = [];
        if (descRows.length > 0) {
            allRows.push('<tr class="infobox-section-header-row"><th colspan="2" class="infobox-section-header">Description</th></tr>');
            allRows.push(...descRows);
        }
        if (sysRows.length > 0) {
            allRows.push('<tr class="infobox-section-header-row"><th colspan="2" class="infobox-section-header">Systems & Ratings</th></tr>');
            allRows.push(...sysRows);
        }

        const imgHtml = imgName
            ? this.renderImageContainer(imgName, articleImages, baseUrl, `${name} Image`, caption, false, true)
            : '';

        return `
            <aside class="codex-infobox vehicle-information">
                <div class="infobox-header vehicle-header">
                    <div class="infobox-subtitle">TACTICAL ARCHIVE // MECHANIZED UNIT SPECIFICATION</div>
                    <h3 class="infobox-name">${this.formatInline(name)}</h3>
                </div>
                ${imgHtml ? `<div class="infobox-image-section">${imgHtml}</div>` : ''}
                <div class="infobox-divider"></div>
                <table class="infobox-table">
                    <tbody>
                        ${allRows.join('\n                        ')}
                    </tbody>
                </table>
            </aside>
        `;
    }

    private static renderCityInformation(
        body: string,
        articleImages: Record<string, CodexImageEntry> | undefined,
        baseUrl: string
    ): string {
        const params = this.parseTemplateParams(body);
        const name = params['name'] || params['city'] || 'Settlement';
        const imgName = this.extractImageName(params['image'] || params['photo'] || params['map']);
        const caption = params['caption'] || '';
        const planet = params['planet'] || params['world'] || '';
        const system = params['system'] || '';
        const sector = params['sector'] || '';
        const nation = params['nation'] || params['sovereign'] || params['government'] || '';
        const population = params['population'] || '';
        const classification = params['type'] || params['classification'] || '';
        const coordinates = params['coordinates'] || params['location'] || '';
        const mayor = params['mayor'] || params['leader'] || params['governor'] || '';
        const pointsOfInterest = params['points_of_interest'] || params['landmarks'] || '';

        const rows: string[] = [];
        if (planet) rows.push(`<tr><th>Planet</th><td>${this.formatInline(planet)}</td></tr>`);
        if (system) rows.push(`<tr><th>System</th><td>${this.formatInline(system)}</td></tr>`);
        if (sector) rows.push(`<tr><th>Sector</th><td>${this.formatInline(sector)}</td></tr>`);
        if (nation) rows.push(`<tr><th>Sovereignty</th><td>${this.formatInline(nation)}</td></tr>`);
        if (population) rows.push(`<tr><th>Population</th><td>${this.formatInline(population)}</td></tr>`);
        if (classification) rows.push(`<tr><th>Type</th><td>${this.formatInline(classification)}</td></tr>`);
        if (coordinates) rows.push(`<tr><th>Location</th><td>${this.formatInline(coordinates)}</td></tr>`);
        if (mayor) rows.push(`<tr><th>Governance</th><td>${this.formatInline(mayor)}</td></tr>`);
        if (pointsOfInterest) rows.push(`<tr><th>Key Landmarks</th><td>${this.formatInline(pointsOfInterest)}</td></tr>`);

        const imgHtml = imgName
            ? this.renderImageContainer(imgName, articleImages, baseUrl, `${name} Imagery`, caption, false, true)
            : '';

        return `
            <aside class="codex-infobox city-information">
                <div class="infobox-header city-header">
                    <div class="infobox-subtitle">GEOGRAPHIC DIRECTORY // CITY REGISTRY</div>
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

    private static renderRegionInformation(
        body: string,
        articleImages: Record<string, CodexImageEntry> | undefined,
        baseUrl: string
    ): string {
        const params = this.parseTemplateParams(body);
        const name = params['name'] || params['region'] || 'Geographic Region';
        const imgName = this.extractImageName(params['image'] || params['map']);
        const caption = params['caption'] || '';
        const planet = params['planet'] || params['location'] || '';
        const system = params['system'] || '';
        const sovereign = params['sovereign'] || params['nation'] || '';
        const population = params['population'] || '';
        const capital = params['capital'] || '';
        const majorCities = params['major_cities'] || params['cities'] || '';
        const terrain = params['terrain'] || params['climate'] || '';
        const history = params['history'] || '';

        const rows: string[] = [];
        if (planet) rows.push(`<tr><th>Location</th><td>${this.formatInline(planet)}</td></tr>`);
        if (system) rows.push(`<tr><th>System</th><td>${this.formatInline(system)}</td></tr>`);
        if (sovereign) rows.push(`<tr><th>Sovereignty</th><td>${this.formatInline(sovereign)}</td></tr>`);
        if (population) rows.push(`<tr><th>Population</th><td>${this.formatInline(population)}</td></tr>`);
        if (capital) rows.push(`<tr><th>Capital</th><td>${this.formatInline(capital)}</td></tr>`);
        if (majorCities) rows.push(`<tr><th>Major Settlements</th><td>${this.formatInline(majorCities)}</td></tr>`);
        if (terrain) rows.push(`<tr><th>Terrain / Environment</th><td>${this.formatInline(terrain)}</td></tr>`);
        if (history) rows.push(`<tr><th>Historical Notes</th><td>${this.formatInline(history)}</td></tr>`);

        const imgHtml = imgName
            ? this.renderImageContainer(imgName, articleImages, baseUrl, `${name} Map`, caption, false, true)
            : '';

        return `
            <aside class="codex-infobox region-information">
                <div class="infobox-header region-header">
                    <div class="infobox-subtitle">TERRITORIAL SURVEY // REGIONAL DESIGNATION</div>
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

    private static renderMilitaryBranchInformation(
        body: string,
        articleImages: Record<string, CodexImageEntry> | undefined,
        baseUrl: string
    ): string {
        const params = this.parseTemplateParams(body);
        const name = params['name'] || params['branch'] || 'Military Branch';
        const imgName = this.extractImageName(params['image'] || params['badge'] || params['flag'] || params['symbol']);
        const caption = params['caption'] || '';
        const nation = params['nation'] || params['government'] || '';
        const role = params['branch'] || params['role'] || params['type'] || '';
        const active = params['active'] || params['dates'] || '';
        const size = params['size'] || params['strength'] || '';
        const headquarters = params['headquarters'] || params['base'] || '';
        const motto = params['motto'] || '';
        const colors = params['colors'] || '';
        const march = params['march'] || '';
        const engagements = params['engagements'] || params['battles'] || '';
        const chiefOfOps = params['chief_of_operations'] || params['commander'] || '';
        const chiefOfStaff = params['chief_of_staff'] || '';
        const chiefEnlisted = params['chief_enlisted_staff'] || '';

        const rows: string[] = [];
        if (nation) rows.push(`<tr><th>Allegiance</th><td>${this.formatInline(nation)}</td></tr>`);
        if (role) rows.push(`<tr><th>Branch Role</th><td>${this.formatInline(role)}</td></tr>`);
        if (active) rows.push(`<tr><th>Service Era</th><td>${this.formatInline(active)}</td></tr>`);
        if (size) rows.push(`<tr><th>Force Strength</th><td>${this.formatInline(size)}</td></tr>`);
        if (headquarters) rows.push(`<tr><th>Headquarters</th><td>${this.formatInline(headquarters)}</td></tr>`);
        if (motto) rows.push(`<tr><th>Motto</th><td>${this.formatInline(motto)}</td></tr>`);
        if (colors) rows.push(`<tr><th>Colors</th><td>${this.formatInline(colors)}</td></tr>`);
        if (march) rows.push(`<tr><th>March</th><td>${this.formatInline(march)}</td></tr>`);
        if (engagements) rows.push(`<tr><th>Engagements</th><td>${this.formatInline(engagements)}</td></tr>`);
        if (chiefOfOps) rows.push(`<tr><th>Chief of Operations</th><td>${this.formatInline(chiefOfOps)}</td></tr>`);
        if (chiefOfStaff) rows.push(`<tr><th>Chief of Staff</th><td>${this.formatInline(chiefOfStaff)}</td></tr>`);
        if (chiefEnlisted) rows.push(`<tr><th>Senior Enlisted</th><td>${this.formatInline(chiefEnlisted)}</td></tr>`);

        const imgHtml = imgName
            ? this.renderImageContainer(imgName, articleImages, baseUrl, `${name} Insignia`, caption, false, true)
            : '';

        return `
            <aside class="codex-infobox military-branch-information">
                <div class="infobox-header military-branch-header">
                    <div class="infobox-subtitle">DEFENSE ARCHIVE // MILITARY SERVICE BRANCH</div>
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

    private static renderMilitaryForceInformation(
        body: string,
        articleImages: Record<string, CodexImageEntry> | undefined,
        baseUrl: string
    ): string {
        const params = this.parseTemplateParams(body);
        const name = params['name'] || params['force'] || 'Military Force';
        const imgName = this.extractImageName(params['image'] || params['badge'] || params['flag'] || params['insignia']);
        const caption = params['caption'] || '';
        const nation = params['nation'] || '';
        const branch = params['branch'] || '';
        const active = params['active'] || '';
        const size = params['size'] || '';
        const headquarters = params['headquarters'] || '';
        const commander = params['commander'] || '';
        const parentFormation = params['parent_formation'] || params['part_of'] || '';
        const engagements = params['engagements'] || '';

        const rows: string[] = [];
        if (nation) rows.push(`<tr><th>Allegiance</th><td>${this.formatInline(nation)}</td></tr>`);
        if (branch) rows.push(`<tr><th>Branch</th><td>${this.formatInline(branch)}</td></tr>`);
        if (active) rows.push(`<tr><th>Service History</th><td>${this.formatInline(active)}</td></tr>`);
        if (size) rows.push(`<tr><th>Force Strength</th><td>${this.formatInline(size)}</td></tr>`);
        if (headquarters) rows.push(`<tr><th>Station / Base</th><td>${this.formatInline(headquarters)}</td></tr>`);
        if (commander) rows.push(`<tr><th>Commander</th><td>${this.formatInline(commander)}</td></tr>`);
        if (parentFormation) rows.push(`<tr><th>Parent Unit</th><td>${this.formatInline(parentFormation)}</td></tr>`);
        if (engagements) rows.push(`<tr><th>Engagements</th><td>${this.formatInline(engagements)}</td></tr>`);

        const imgHtml = imgName
            ? this.renderImageContainer(imgName, articleImages, baseUrl, `${name} Badge`, caption, false, true)
            : '';

        return `
            <aside class="codex-infobox military-force-information">
                <div class="infobox-header military-force-header">
                    <div class="infobox-subtitle">ORDER OF BATTLE // MILITARY FORMATION</div>
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

    private static renderMilitaryOverviewInformation(
        body: string,
        articleImages: Record<string, CodexImageEntry> | undefined,
        baseUrl: string
    ): string {
        const params = this.parseTemplateParams(body);
        const name = params['name'] || 'Armed Forces Overview';
        const imgName = this.extractImageName(params['image'] || params['logo'] || params['seal']);
        const caption = params['caption'] || '';
        const branches = params['branches'] || '';
        const commanderInChief = params['commander_in_chief'] || params['leadership'] || '';
        const militaryAge = params['military_age'] || params['conscription'] || '';
        const active = params['active_personnel'] || params['strength'] || '';
        const budget = params['budget'] || '';
        const ranks = params['ranks'] || '';

        const rows: string[] = [];
        if (branches) rows.push(`<tr><th>Service Branches</th><td>${this.formatInline(branches)}</td></tr>`);
        if (commanderInChief) rows.push(`<tr><th>Commander-in-Chief</th><td>${this.formatInline(commanderInChief)}</td></tr>`);
        if (militaryAge) rows.push(`<tr><th>Service Eligibility</th><td>${this.formatInline(militaryAge)}</td></tr>`);
        if (active) rows.push(`<tr><th>Active Personnel</th><td>${this.formatInline(active)}</td></tr>`);
        if (budget) rows.push(`<tr><th>Defense Budget</th><td>${this.formatInline(budget)}</td></tr>`);
        if (ranks) rows.push(`<tr><th>Rank Structure</th><td>${this.formatInline(ranks)}</td></tr>`);

        const imgHtml = imgName
            ? this.renderImageContainer(imgName, articleImages, baseUrl, `${name} Insignia`, caption, false, true)
            : '';

        return `
            <aside class="codex-infobox military-overview-information">
                <div class="infobox-header military-overview-header">
                    <div class="infobox-subtitle">DEFENSE ARCHIVE // ARMED FORCES OVERVIEW</div>
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

    private static renderInfantryInformation(
        body: string,
        articleImages: Record<string, CodexImageEntry> | undefined,
        baseUrl: string
    ): string {
        const params = this.parseTemplateParams(body);
        const name = params['name'] || 'Infantry Equipment';
        const imgName = this.extractImageName(params['image'] || params['photo']);
        const caption = params['caption'] || '';
        const mission = params['mission'] || params['role'] || params['classification'] || '';
        const military = params['military'] || params['user'] || params['operator'] || '';
        const type = params['type'] || '';
        const manufacturer = params['manufacturer'] || params['developer'] || '';
        const armor = params['armor'] || params['protection'] || '';
        const fixedWeapons = params['fixed_weapons'] || params['armament'] || params['weapons'] || '';
        const payload = params['variable_payload'] || params['payload'] || '';
        const specs = params['specifications'] || params['equipment'] || '';

        const rows: string[] = [];
        if (mission) rows.push(`<tr><th>Mission Role</th><td>${this.formatInline(mission)}</td></tr>`);
        if (military) rows.push(`<tr><th>Service User</th><td>${this.formatInline(military)}</td></tr>`);
        if (type) rows.push(`<tr><th>Equipment Type</th><td>${this.formatInline(type)}</td></tr>`);
        if (manufacturer) rows.push(`<tr><th>Manufacturer</th><td>${this.formatInline(manufacturer)}</td></tr>`);
        if (armor) rows.push(`<tr><th>Armor / Materials</th><td>${this.formatInline(armor)}</td></tr>`);
        if (fixedWeapons) rows.push(`<tr><th>Armament</th><td>${this.formatInline(fixedWeapons)}</td></tr>`);
        if (payload) rows.push(`<tr><th>Payload / Gear</th><td>${this.formatInline(payload)}</td></tr>`);
        if (specs) rows.push(`<tr><th>Specifications</th><td>${this.formatInline(specs)}</td></tr>`);

        const imgHtml = imgName
            ? this.renderImageContainer(imgName, articleImages, baseUrl, `${name} Profile`, caption, false, true)
            : '';

        return `
            <aside class="codex-infobox infantry-information">
                <div class="infobox-header infantry-header">
                    <div class="infobox-subtitle">INFANTRY EQUIPMENT // COMBAT PROFILE</div>
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

    private static renderSquadronInformation(
        body: string,
        articleImages: Record<string, CodexImageEntry> | undefined,
        baseUrl: string
    ): string {
        const params = this.parseTemplateParams(body);
        const name = params['name'] || 'Squadron';
        const imgName = this.extractImageName(params['image'] || params['insignia'] || params['logo'] || params['photo']);
        const caption = params['caption'] || '';
        const active = params['active'] || params['dates'] || '';
        const nation = params['nation'] || params['allegiance'] || '';
        const militaryBranch = params['military_branch'] || params['branch'] || params['force'] || '';
        const aircraftType = params['aircraft_type'] || params['aircraft'] || params['type'] || '';
        const role = params['role'] || params['mission'] || '';
        const garrison = params['garrison'] || params['station'] || params['base'] || params['carrier'] || '';
        const nickname = params['nickname'] || '';
        const battles = params['battles'] || params['operations'] || params['engagements'] || '';

        const rows: string[] = [];
        if (nickname) rows.push(`<tr><th>Nickname</th><td>${this.formatInline(nickname)}</td></tr>`);
        if (active) rows.push(`<tr><th>Active Service</th><td>${this.formatInline(active)}</td></tr>`);
        if (nation) rows.push(`<tr><th>Allegiance</th><td>${this.formatInline(nation)}</td></tr>`);
        if (militaryBranch) rows.push(`<tr><th>Military Branch</th><td>${this.formatInline(militaryBranch)}</td></tr>`);
        if (aircraftType) rows.push(`<tr><th>Aircraft Type</th><td>${this.formatInline(aircraftType)}</td></tr>`);
        if (role) rows.push(`<tr><th>Operational Role</th><td>${this.formatInline(role)}</td></tr>`);
        if (garrison) rows.push(`<tr><th>Station / Garrison</th><td>${this.formatInline(garrison)}</td></tr>`);
        if (battles) rows.push(`<tr><th>Notable Battles</th><td>${this.formatInline(battles)}</td></tr>`);

        const imgHtml = imgName
            ? this.renderImageContainer(imgName, articleImages, baseUrl, `${name} Insignia`, caption, false, true)
            : '';

        return `
            <aside class="codex-infobox squadron-information">
                <div class="infobox-header squadron-header">
                    <div class="infobox-subtitle">AEROSPACE WING // SQUADRON ROSTER</div>
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

    private static renderIntelligenceBranchInformation(
        body: string,
        articleImages: Record<string, CodexImageEntry> | undefined,
        baseUrl: string
    ): string {
        const params = this.parseTemplateParams(body);
        const name = params['name'] || 'Intelligence Branch';
        const imgName = this.extractImageName(params['image'] || params['insignia'] || params['logo'] || params['photo']);
        const caption = params['caption'] || '';
        const nation = params['nation'] || params['allegiance'] || '';
        const designation = params['designation'] || params['type'] || params['role'] || '';
        const size = params['size'] || params['personnel'] || '';
        const headquarters = params['headquarters'] || params['hq'] || '';
        const command1 = params['command1'] || params['command'] || params['director'] || params['leader'] || '';
        const command2 = params['command2'] || params['deputy'] || '';
        const operations = params['operations'] || params['roles'] || '';

        const rows: string[] = [];
        if (nation) rows.push(`<tr><th>Allegiance</th><td>${this.formatInline(nation)}</td></tr>`);
        if (designation) rows.push(`<tr><th>Designation</th><td>${this.formatInline(designation)}</td></tr>`);
        if (size) rows.push(`<tr><th>Estimated Size</th><td>${this.formatInline(size)}</td></tr>`);
        if (headquarters) rows.push(`<tr><th>Headquarters</th><td>${this.formatInline(headquarters)}</td></tr>`);
        if (command1) rows.push(`<tr><th>Leadership</th><td>${this.formatInline(command1)}</td></tr>`);
        if (command2) rows.push(`<tr><th>Operations</th><td>${this.formatInline(command2)}</td></tr>`);
        if (operations) rows.push(`<tr><th>Directives</th><td>${this.formatInline(operations)}</td></tr>`);

        const imgHtml = imgName
            ? this.renderImageContainer(imgName, articleImages, baseUrl, `${name} Insignia`, caption, false, true)
            : '';

        return `
            <aside class="codex-infobox intelligence-branch-information">
                <div class="infobox-header intelligence-header">
                    <div class="infobox-subtitle">INTELLIGENCE ARCHIVE // CLANDESTINE SERVICE</div>
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

    private static renderFleetInformation(
        body: string,
        articleImages: Record<string, CodexImageEntry> | undefined,
        baseUrl: string
    ): string {
        const params = this.parseTemplateParams(body);
        const name = params['name'] || 'Naval Fleet';
        const imgName = this.extractImageName(params['image'] || params['insignia'] || params['badge'] || params['photo']);
        const caption = params['caption'] || '';
        const designation = params['designation'] || '';
        const motto = params['motto'] || '';
        const head = params['head'] || params['commander'] || '';
        const first = params['first'] || params['executive_officer'] || '';
        const commandant = params['commandant'] || '';
        const fleets = params['fleets'] || '';

        // Campaign records
        const campaigns: string[] = [];
        if (params['anderung']) campaigns.push(`Anderung War: ${params['anderung']}`);
        if (params['exodus']) campaigns.push(`Exodus War: ${params['exodus']}`);
        if (params['onyx']) campaigns.push(`Onyx Conflict: ${params['onyx']}`);
        if (params['mesarthrim']) campaigns.push(`Mesarthrim Campaign: ${params['mesarthrim']}`);
        if (params['tempest']) campaigns.push(`Tempest War: ${params['tempest']}`);

        // Decorations
        const honors: string[] = [];
        if (params['medal']) honors.push(params['medal']);
        if (params['citation']) honors.push(params['citation']);
        if (params['cross']) honors.push(params['cross']);

        const rows: string[] = [];
        if (designation) rows.push(`<tr><th>Designation</th><td>${this.formatInline(designation)}</td></tr>`);
        if (motto) rows.push(`<tr><th>Fleet Motto</th><td>${this.formatInline(motto)}</td></tr>`);
        if (head) rows.push(`<tr><th>Fleet Commander</th><td>${this.formatInline(head)}</td></tr>`);
        if (first) rows.push(`<tr><th>First Officer</th><td>${this.formatInline(first)}</td></tr>`);
        if (commandant) rows.push(`<tr><th>Commandant</th><td>${this.formatInline(commandant)}</td></tr>`);
        if (fleets) rows.push(`<tr><th>Order of Fleets</th><td>${this.formatInline(fleets)}</td></tr>`);
        if (campaigns.length > 0) rows.push(`<tr><th>Operational Record</th><td>${this.formatInline(campaigns.join('<br/>'))}</td></tr>`);
        if (honors.length > 0) rows.push(`<tr><th>Decorations & Honors</th><td>${this.formatInline(honors.join('<br/>'))}</td></tr>`);

        const imgHtml = imgName
            ? this.renderImageContainer(imgName, articleImages, baseUrl, `${name} Insignia`, caption, false, true)
            : '';

        return `
            <aside class="codex-infobox fleet-information">
                <div class="infobox-header fleet-header">
                    <div class="infobox-subtitle">NAVAL COMBAT GROUP // ORDER OF BATTLE</div>
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

    private static findAttrPipe(str: string): number {
        let inLink = 0;
        for (let i = 0; i < str.length; i++) {
            if (str[i] === '[' && str[i + 1] === '[') {
                inLink++;
                i++;
            } else if (str[i] === ']' && str[i + 1] === ']') {
                if (inLink > 0) inLink--;
                i++;
            } else if (str[i] === '|' && inLink === 0) {
                return i;
            }
        }
        return -1;
    }

    private static splitCells(line: string, delimiter: string): string[] {
        const cells: string[] = [];
        let current = '';
        let inLink = 0;
        for (let i = 0; i < line.length; i++) {
            if (line[i] === '[' && line[i + 1] === '[') {
                inLink++;
                current += line[i] + line[i + 1];
                i++;
            } else if (line[i] === ']' && line[i + 1] === ']') {
                if (inLink > 0) inLink--;
                current += line[i] + line[i + 1];
                i++;
            } else if (inLink === 0 && line.startsWith(delimiter, i)) {
                cells.push(current);
                current = '';
                i += delimiter.length - 1;
            } else {
                current += line[i];
            }
        }
        cells.push(current);
        return cells;
    }

    private static parseTableAttributes(attrStr: string): string {
        if (!attrStr) return '';
        const inlineStyles: string[] = [];
        const classes: string[] = [];
        const otherAttrs: string[] = [];
        const attrRegex = /\b(class|style|align|valign|width|height|colspan|rowspan|scope|bgcolor)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi;
        let m: RegExpExecArray | null;
        while ((m = attrRegex.exec(attrStr)) !== null) {
            const name = m[1].toLowerCase();
            const val = m[2] !== undefined ? m[2] : (m[3] !== undefined ? m[3] : m[4]);
            if (name === 'align') {
                inlineStyles.push(`text-align: ${val}`);
            } else if (name === 'valign') {
                inlineStyles.push(`vertical-align: ${val}`);
            } else if (name === 'bgcolor') {
                inlineStyles.push(`background-color: ${val}`);
            } else if (name === 'style') {
                inlineStyles.push(val.replace(/;?\s*$/, ''));
            } else if (name === 'class') {
                classes.push(val);
            } else {
                otherAttrs.push(`${name}="${val}"`);
            }
        }
        const result: string[] = [];
        if (classes.length > 0) {
            result.push(`class="${classes.join(' ')}"`);
        }
        if (inlineStyles.length > 0) {
            result.push(`style="${inlineStyles.join('; ')};"`);
        }
        result.push(...otherAttrs);
        return result.length > 0 ? ' ' + result.join(' ') : '';
    }

    private static parseTableCell(rawCell: string, isHeader: boolean): { isHeader: boolean; attrs: string; content: string } {
        const trimmed = rawCell.trim();
        let attrs = '';
        let content = trimmed;

        const pipeIdx = this.findAttrPipe(trimmed);
        if (pipeIdx !== -1) {
            const beforePipe = trimmed.slice(0, pipeIdx).trim();
            const afterPipe = trimmed.slice(pipeIdx + 1).trim();
            if (/\b(?:align|valign|width|height|style|class|colspan|rowspan|bgcolor)\s*=/i.test(beforePipe)) {
                attrs = this.parseTableAttributes(beforePipe);
                content = afterPipe;
            }
        }

        return { isHeader, attrs, content };
    }

    public static renderTable(
        rawTable: string,
        articleImages?: Record<string, CodexImageEntry>,
        baseUrl: string = ''
    ): string {
        const lines = rawTable.trim().split(/\r?\n/);
        if (!lines[0].startsWith('{|')) return rawTable;

        const tableAttrStr = lines[0].slice(2).trim();
        const isInfobox = /infobox/i.test(tableAttrStr);

        const classMatch = tableAttrStr.match(/\bclass\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
        const existingClasses = classMatch ? (classMatch[1] || classMatch[2] || classMatch[3] || '') : '';
        const mergedClasses = ['codex-table', existingClasses, isInfobox ? 'codex-table-infobox' : '']
            .filter(Boolean)
            .join(' ');

        const tableAttrsWithoutClass = tableAttrStr.replace(/\bclass\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/i, '').trim();
        const parsedTableAttrs = this.parseTableAttributes(tableAttrsWithoutClass);

        let caption = '';
        const rows: Array<{ attrs: string; cells: Array<{ isHeader: boolean; attrs: string; content: string }> }> = [];
        let currentRow: { attrs: string; cells: Array<{ isHeader: boolean; attrs: string; content: string }> } = { attrs: '', cells: [] };

        const flushRow = () => {
            if (currentRow.cells.length > 0) {
                rows.push(currentRow);
                currentRow = { attrs: '', cells: [] };
            }
        };

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line || line === '|}') continue;

            if (line.startsWith('|+')) {
                caption = line.slice(2).trim();
                continue;
            }

            if (line.startsWith('|-')) {
                flushRow();
                const rowAttrStr = line.replace(/^-+/, '').trim();
                currentRow.attrs = this.parseTableAttributes(rowAttrStr);
                continue;
            }

            if (line.startsWith('!')) {
                const cellParts = this.splitCells(line.slice(1), '!!');
                for (const part of cellParts) {
                    currentRow.cells.push(this.parseTableCell(part, true));
                }
                continue;
            }

            if (line.startsWith('|')) {
                const cellParts = this.splitCells(line.slice(1), '||');
                for (const part of cellParts) {
                    currentRow.cells.push(this.parseTableCell(part, false));
                }
                continue;
            }

            // Cell continuation
            if (currentRow.cells.length > 0) {
                currentRow.cells[currentRow.cells.length - 1].content += '\n' + line;
            }
        }
        flushRow();

        let html = `<div class="codex-table-container${isInfobox ? ' codex-table-container-infobox' : ''}">\n`;
        html += `  <table class="${mergedClasses}"${parsedTableAttrs}>\n`;

        if (caption) {
            html += `    <caption class="codex-table-caption">${this.formatInline(caption, articleImages, baseUrl)}</caption>\n`;
        }

        html += '    <tbody>\n';
        for (const row of rows) {
            html += `      <tr${row.attrs}>\n`;
            for (const cell of row.cells) {
                const tag = cell.isHeader ? 'th' : 'td';
                html += `        <${tag}${cell.attrs}>${this.formatInline(cell.content, articleImages, baseUrl)}</${tag}>\n`;
            }
            html += '      </tr>\n';
        }
        html += '    </tbody>\n  </table>\n</div>';
        return html;
    }

    private static formatInline(
        text: string,
        articleImages?: Record<string, CodexImageEntry>,
        baseUrl: string = ''
    ): string {
        let out = text;

        // Inline images: [[Image:...]] or [[File:...]]
        out = out.replace(/\[\[(?:Image|File):([^\]]+)\]\]/gi, (_m, raw) => {
            const parts = raw.split('|').map((p: string) => p.trim());
            const imgName = parts[0];
            let alt = imgName;
            for (let i = 1; i < parts.length; i++) {
                const p = parts[i];
                if (!['thumb', 'thumbnail', 'frame', 'right', 'left', 'center'].includes(p.toLowerCase()) && !p.match(/^\d+px$/)) {
                    alt = p;
                }
            }
            return this.renderImageContainer(imgName, articleImages, baseUrl, alt);
        });

        // Wikilinks: [[:Category:...|Label]] or [[Target|Label]]
        out = out.replace(/\[\[:?([^\|\]]+)\|([^\]]+)\]\]/g, (_m, target, label) => {
            const cleanTarget = target.trim().replace(/^:+/, '');
            const cleanLabel = label.trim();
            const safeTarget = cleanTarget.replace(/"/g, '&quot;');
            return `<a href="#/codex/${encodeURIComponent(cleanTarget)}" class="codex-wikilink" data-target="${safeTarget}">${cleanLabel}</a>`;
        });

        // Wikilinks: [[:Category:...]] or [[Target]]
        out = out.replace(/\[\[:?([^\]]+)\]\]/g, (_m, target) => {
            const cleanTarget = target.trim().replace(/^:+/, '');
            const safeTarget = cleanTarget.replace(/"/g, '&quot;');
            return `<a href="#/codex/${encodeURIComponent(cleanTarget)}" class="codex-wikilink" data-target="${safeTarget}">${cleanTarget}</a>`;
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


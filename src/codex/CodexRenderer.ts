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
        const conflictMatch = text.match(/\{\{(?:Military[_ ]Conflict|War[_ ]Information)\s*\|?([\s\S]*?)\}\}/i);
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
        }

        // Clean out any unhandled navbox templates (e.g. {{Pelagrim Crisis Navbox}})
        text = text.replace(/\{\{[^}]*Navbox\}\}/gi, '');

        // 2. Extract Category tags at the bottom
        const categories: string[] = [];
        text = text.replace(/\[\[Category:([^\]]+)\]\]/gi, (_m, cat) => {
            categories.push(cat.trim());
            return '';
        });

        // 3. Normalize headings and standalone image tags so they are bounded by blank lines
        text = text.replace(/^(={2,}[^\n]+={2,})$/gm, '\n\n$1\n\n');
        text = text.replace(/^(\[\[(?:Image|File):[^\]]+\]\])\s*$/gm, '\n\n$1\n\n');

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
            const paramMatch = line.match(/^(?:\|\s*)?([a-zA-Z0-9_]+)\s*=\s*(.*)$/);
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

        const combatant1 = params['combatant1'] || '';
        const combatant2 = params['combatant2'] || '';
        const commander1 = params['commander1'] || '';
        const commander2 = params['commander2'] || '';
        const strength1 = params['strength1'] || '';
        const strength2 = params['strength2'] || '';

        const rows: string[] = [];
        if (date) rows.push(`<tr><th>Date</th><td>${this.formatInline(date)}</td></tr>`);
        if (place) rows.push(`<tr><th>Place</th><td>${this.formatInline(place)}</td></tr>`);
        if (territory) rows.push(`<tr><th>Territory</th><td>${this.formatInline(territory)}</td></tr>`);
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


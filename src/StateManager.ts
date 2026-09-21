/* eslint-disable */
import { Universe, ClusterPOI, StarPOI, PlanetPOI } from './data/MockUniverse';
import { GalacticView } from './views/GalacticView';
import { ClusterView } from './views/ClusterView';
import { StarView } from './views/StarView';
import { PlanetView } from './views/PlanetView';
import { CodexArticle } from './codex/types';
import { getCodexArticle } from './codex/articleRegistry';
import { CodexRenderer } from './codex/CodexRenderer';

export enum ViewLevel {
  CODEX,
  GALACTIC,
  CLUSTER,
  STAR,
  PLANET
}

export class StateManager {
    private level: ViewLevel = ViewLevel.CODEX;
    private currentArticle: CodexArticle | null = null;
    private currentCluster: ClusterPOI | null = null;
    private currentStar: StarPOI | null = null;
    private currentPlanet: PlanetPOI | null = null;

    private galacticView: GalacticView;
    private clusterView: ClusterView;
    private starView: StarView;
    private planetView: PlanetView;

    constructor() {
        this.galacticView = new GalacticView(this);
        this.clusterView = new ClusterView(this);
        this.starView = new StarView(this);
        this.planetView = new PlanetView(this);
    
        this.updateUI();
    }

    public getLevel(): ViewLevel {
        return this.level;
    }

    public getCurrentArticle(): CodexArticle | null { return this.currentArticle; }
    public getCurrentCluster(): ClusterPOI | null { return this.currentCluster; }
    public getCurrentStar(): StarPOI | null { return this.currentStar; }
    public getCurrentPlanet(): PlanetPOI | null { return this.currentPlanet; }

    public setLevel(level: ViewLevel): void {
        this.level = level;
        this.updateUI();
    }

    public showCodex(articleSlugOrTitle?: string): void {
        this.currentCluster = null;
        this.currentStar = null;
        this.currentPlanet = null;

        if (articleSlugOrTitle) {
            const article = getCodexArticle(articleSlugOrTitle);
            this.currentArticle = article || null;
        } else {
            this.currentArticle = null;
        }

        this.setLevel(ViewLevel.CODEX);
    }

    public showStarmap(): void {
        this.setLevel(ViewLevel.GALACTIC);
    }

    public navigateToCluster(cluster: ClusterPOI): void {
        this.currentCluster = cluster;
        this.setLevel(ViewLevel.CLUSTER);
        this.clusterView.onEnter(cluster);
    }

    public navigateToStar(star: StarPOI): void {
        this.currentStar = star;
        this.setLevel(ViewLevel.STAR);
    }

    public navigateToPlanet(planet: PlanetPOI): void {
        this.currentPlanet = planet;
        this.setLevel(ViewLevel.PLANET);
    }

    public goBack(): void {
        if (this.level === ViewLevel.PLANET) {
            this.currentPlanet = null;
            this.setLevel(ViewLevel.STAR);
        } else if (this.level === ViewLevel.STAR) {
            this.currentStar = null;
            this.setLevel(ViewLevel.CLUSTER);
        } else if (this.level === ViewLevel.CLUSTER) {
            this.currentCluster = null;
            this.setLevel(ViewLevel.GALACTIC);
        } else if (this.level === ViewLevel.GALACTIC) {
            this.showCodex(this.currentArticle ? this.currentArticle.slug : undefined);
        } else if (this.level === ViewLevel.CODEX && this.currentArticle !== null) {
            this.currentArticle = null;
            window.location.hash = '#/codex';
            this.updateUI();
        }
    }

    public update(deltaTime: number): void {
        switch (this.level) {
            case ViewLevel.CODEX:
            case ViewLevel.GALACTIC: this.galacticView.update(deltaTime); break;
            case ViewLevel.CLUSTER: this.clusterView.update(deltaTime); break;
            case ViewLevel.STAR: this.starView.update(deltaTime); break;
            case ViewLevel.PLANET: this.planetView.update(deltaTime); break;
        }
    }

    public draw(ctx: CanvasRenderingContext2D, width: number, height: number): void {
        ctx.clearRect(0, 0, width, height);

        switch (this.level) {
            case ViewLevel.CODEX: {
                ctx.save();
                ctx.globalAlpha = 0.22;
                this.galacticView.draw(ctx, width, height);
                ctx.restore();
                break;
            }
            case ViewLevel.GALACTIC: this.galacticView.draw(ctx, width, height); break;
            case ViewLevel.CLUSTER: this.clusterView.draw(ctx, width, height); break;
            case ViewLevel.STAR: this.starView.draw(ctx, width, height); break;
            case ViewLevel.PLANET: this.planetView.draw(ctx, width, height); break;
        }
    }

    public handleMouseClick(x: number, y: number, width: number, height: number): void {
        switch (this.level) {
            case ViewLevel.CODEX: break;
            case ViewLevel.GALACTIC: this.galacticView.handleClick(x, y, width, height); break;
            case ViewLevel.CLUSTER: this.clusterView.handleClick(x, y, width, height); break;
            case ViewLevel.STAR: this.starView.handleClick(x, y, width, height); break;
            case ViewLevel.PLANET: this.planetView.handleClick(x, y, width, height); break;
        }
    }

    public handleMouseMove(x: number, y: number, width: number, height: number): void {
        switch (this.level) {
            case ViewLevel.CODEX: break;
            case ViewLevel.GALACTIC: this.galacticView.handleMouseMove(x, y, width, height); break;
            case ViewLevel.CLUSTER: this.clusterView.handleMouseMove(x, y, width, height); break;
            case ViewLevel.STAR: this.starView.handleMouseMove(x, y, width, height); break;
            case ViewLevel.PLANET: this.planetView.handleMouseMove(x, y, width, height); break;
        }
    }

    public updateUI(): void {
        const codexLanding = document.getElementById('codex-landing') as HTMLDivElement | null;
        const codexArticleView = document.getElementById('codex-article-view') as HTMLDivElement | null;
        const btnCodex = document.getElementById('btnCodex') as HTMLButtonElement | null;
        const btnBack = document.getElementById('btnBack') as HTMLButtonElement | null;
        const infobox = document.getElementById('infobox') as HTMLDivElement | null;
        const coordEl = document.getElementById('dev-coordinates');

        if (this.level === ViewLevel.CODEX) {
            if (this.currentArticle) {
                if (codexLanding) codexLanding.style.display = 'none';
                if (codexArticleView) {
                    codexArticleView.style.display = 'block';
                    codexArticleView.scrollTop = 0;
                    this.renderCurrentArticle();
                }
            } else {
                if (codexLanding) codexLanding.style.display = 'block';
                if (codexArticleView) codexArticleView.style.display = 'none';
            }
        } else {
            if (codexLanding) codexLanding.style.display = 'none';
            if (codexArticleView) codexArticleView.style.display = 'none';
        }

        if (btnCodex) {
            btnCodex.style.display = (this.level !== ViewLevel.CODEX) ? 'block' : 'none';
        }

        if (btnBack) {
            if (this.level === ViewLevel.CODEX || this.level === ViewLevel.GALACTIC) {
                btnBack.style.display = 'none';
            } else {
                btnBack.style.display = 'block';
                let label = 'Back';
                if (this.level === ViewLevel.CLUSTER) label = 'Return to Galaxy';
                if (this.level === ViewLevel.STAR) label = 'Return to Cluster';
                if (this.level === ViewLevel.PLANET) label = 'Return to Star System';
                btnBack.innerText = label;
            }
        }

        if (infobox) {
            if (this.level === ViewLevel.PLANET && this.currentPlanet) {
                infobox.style.display = 'block';
                document.getElementById('info-title')!.innerText = this.currentPlanet.name;
                document.getElementById('info-mass')!.innerText = this.currentPlanet.mass;
                document.getElementById('info-orbit')!.innerText = this.currentPlanet.orbitTime;
                document.getElementById('info-rotation')!.innerText = this.currentPlanet.rotation;
                document.getElementById('info-temp')!.innerText = this.currentPlanet.temperature;
                document.getElementById('info-desc')!.innerText = this.currentPlanet.history;
            } else {
                infobox.style.display = 'none';
            }
        }

        if (coordEl) {
            if (this.level !== ViewLevel.GALACTIC && this.level !== ViewLevel.CLUSTER) {
                coordEl.style.display = 'none';
            }
        }
    }

    private renderCurrentArticle(): void {
        if (!this.currentArticle) return;

        const titleEl = document.getElementById('articleTitle');
        const authorEl = document.getElementById('articleAuthor');
        const dateEl = document.getElementById('articleDate');
        const idEl = document.getElementById('articleId');
        const breadcrumbEl = document.getElementById('articleBreadcrumbTitle');
        const contentEl = document.getElementById('articleContent');

        if (titleEl) titleEl.innerText = this.currentArticle.title;
        if (authorEl) authorEl.innerText = `AUTHOR: ${this.currentArticle.author}`;
        if (dateEl) dateEl.innerText = `DATE: ${this.currentArticle.lastUpdated}`;
        if (idEl) idEl.innerText = `DOC ID: ${this.currentArticle.id}`;
        if (breadcrumbEl) breadcrumbEl.innerText = this.currentArticle.title.toUpperCase();

        if (contentEl) {
            contentEl.innerHTML = CodexRenderer.render(this.currentArticle.rawContent, this.currentArticle.images);
            this.bindArticleContentLinks(contentEl);
            this.bindArticleImageToggles(contentEl);
        }
    }

    private bindArticleImageToggles(container: HTMLElement): void {
        const imageContainers = container.querySelectorAll('.codex-image-container');

        imageContainers.forEach((containerEl) => {
            const canToggle = containerEl.getAttribute('data-can-toggle') === 'true';
            if (!canToggle) return; // Only toggle if both modern and legacy are present

            const imgEl = containerEl.querySelector('.codex-displayed-image') as HTMLImageElement | null;
            const badgeLabel = containerEl.querySelector('.badge-label') as HTMLSpanElement | null;
            const modernSrc = containerEl.getAttribute('data-modern-src');
            const legacySrc = containerEl.getAttribute('data-legacy-src');

            if (!imgEl || !modernSrc || !legacySrc) return;

            containerEl.addEventListener('click', (e) => {
                e.stopPropagation();
                const currentMode = containerEl.getAttribute('data-current-mode');

                if (currentMode === 'modern') {
                    imgEl.src = legacySrc;
                    containerEl.setAttribute('data-current-mode', 'legacy');
                    containerEl.classList.remove('mode-modern');
                    containerEl.classList.add('mode-legacy');
                    if (badgeLabel) badgeLabel.innerText = 'LEGACY (CLICK FOR MODERN)';
                } else {
                    imgEl.src = modernSrc;
                    containerEl.setAttribute('data-current-mode', 'modern');
                    containerEl.classList.remove('mode-legacy');
                    containerEl.classList.add('mode-modern');
                    if (badgeLabel) badgeLabel.innerText = 'MODERN (CLICK FOR LEGACY)';
                }
            });
        });
    }

    private bindArticleContentLinks(container: HTMLElement): void {
        const links = container.querySelectorAll('.codex-wikilink');
        const modal = document.getElementById('codex-modal');
        const modalTitle = document.getElementById('modalTitle');
        const modalMessage = document.getElementById('modalMessage');

        links.forEach((linkEl) => {
            linkEl.addEventListener('click', (e) => {
                const target = linkEl.getAttribute('data-target') || '';
                const article = getCodexArticle(target);

                if (article) {
                    // Navigate to imported article
                    e.preventDefault();
                    window.location.hash = `#/codex/${article.slug}`;
                    this.showCodex(article.slug);
                } else {
                    // Not yet imported - show modal
                    e.preventDefault();
                    if (modal && modalTitle && modalMessage) {
                        modalTitle.innerText = `ARCHIVE RECORD: ${target}`;
                        modalMessage.innerHTML = `You have selected <strong>${target}</strong> from the Galactic Codex archives.<br><br>Detailed article view and category imports are scheduled for the upcoming deployment phase.`;
                        modal.style.display = 'flex';
                    }
                }
            });
        });
    }
}

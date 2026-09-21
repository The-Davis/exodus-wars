/* eslint-disable */
import { Universe, ClusterPOI, StarPOI, PlanetPOI } from './data/MockUniverse';
import { GalacticView } from './views/GalacticView';
import { ClusterView } from './views/ClusterView';
import { StarView } from './views/StarView';
import { PlanetView } from './views/PlanetView';

export enum ViewLevel {
  CODEX,
  GALACTIC,
  CLUSTER,
  STAR,
  PLANET
}

export class StateManager {
    private level: ViewLevel = ViewLevel.CODEX;
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

    public getCurrentCluster(): ClusterPOI | null { return this.currentCluster; }
    public getCurrentStar(): StarPOI | null { return this.currentStar; }
    public getCurrentPlanet(): PlanetPOI | null { return this.currentPlanet; }

    public setLevel(level: ViewLevel): void {
        this.level = level;
        this.updateUI();
    }

    public showCodex(): void {
        this.currentCluster = null;
        this.currentStar = null;
        this.currentPlanet = null;
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
            this.showCodex();
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
        const codexLanding = document.getElementById('codex-landing') as HTMLDivElement;
        const btnCodex = document.getElementById('btnCodex') as HTMLButtonElement;
        const btnBack = document.getElementById('btnBack') as HTMLButtonElement;
        const infobox = document.getElementById('infobox') as HTMLDivElement;
        const coordEl = document.getElementById('dev-coordinates');

        if (codexLanding) {
            codexLanding.style.display = (this.level === ViewLevel.CODEX) ? 'block' : 'none';
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
}

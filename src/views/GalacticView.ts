/* eslint-disable */
import { StateManager } from '../StateManager';
import { Renderer } from '../Renderer';
import { Universe, ClusterPOI } from '../data/MockUniverse';

export class GalacticView {
    private stateManager: StateManager;
    private image: HTMLImageElement | null = null;
    private imageLoaded = false;
    private time = 0;
    private hoveredPOI: ClusterPOI | null = null;

    constructor(stateManager: StateManager) {
        this.stateManager = stateManager;
        this.image = new Image();
        this.image.src = import.meta.env.BASE_URL + 'assets/galaxy/Milkyway_Galaxy.png';
        this.image.onload = () => {
            this.imageLoaded = true;
        };
    }

    public update(deltaTime: number) {
        this.time += deltaTime;
    }

    public draw(ctx: CanvasRenderingContext2D, width: number, height: number) {
        if (this.imageLoaded && this.image) {
            // Draw Galaxy Background centered and fitted
            const scale = Math.min(width / this.image.width, height / this.image.height) * 0.9;
            const drawW = this.image.width * scale;
            const drawH = this.image.height * scale;
            const drawX = (width - drawW) / 2;
            const drawY = (height - drawH) / 2;
      
            ctx.globalAlpha = 0.8;
            ctx.drawImage(this.image, drawX, drawY, drawW, drawH);
            ctx.globalAlpha = 1.0;

            // Draw POIs
            for (const cluster of Universe.clusters) {
                const cx = drawX + cluster.x * drawW;
                const cy = drawY + cluster.y * drawH;
        
                Renderer.drawGlowingCircle(ctx, cx, cy, 4, '#00e5ff');
        
                if (this.hoveredPOI === cluster) {
                    Renderer.drawReticle(ctx, cx, cy, 20, '#00e5ff', this.time);
                    Renderer.drawLabel(ctx, cluster.name, cx, cy, '#00e5ff');
                }
            }
        }
    }

    public handleMouseMove(x: number, y: number, width: number, height: number) {
        if (!this.imageLoaded || !this.image) return;
    
        const scale = Math.min(width / this.image.width, height / this.image.height) * 0.9;
        const drawW = this.image.width * scale;
        const drawH = this.image.height * scale;
        const drawX = (width - drawW) / 2;
        const drawY = (height - drawH) / 2;

        const nx = (x - drawX) / drawW;
        const ny = (y - drawY) / drawH;
    
        const coordEl = document.getElementById('dev-coordinates');
        if (coordEl) {
          if (nx >= 0 && nx <= 1 && ny >= 0 && ny <= 1) {
            coordEl.innerText = `X: ${nx.toFixed(3)} | Y: ${ny.toFixed(3)}`;
            coordEl.style.display = 'block';
          } else {
            coordEl.style.display = 'none';
          }
        }

        this.hoveredPOI = null;
        document.body.style.cursor = 'default';

        for (const cluster of Universe.clusters) {
            const cx = drawX + cluster.x * drawW;
            const cy = drawY + cluster.y * drawH;
            const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      
            if (dist < 25) {
                this.hoveredPOI = cluster;
                document.body.style.cursor = 'pointer';
                break;
            }
        }
    }

    public handleClick(x: number, y: number, width: number, height: number) {
        if (this.hoveredPOI) {
            document.body.style.cursor = 'default';
            this.stateManager.navigateToCluster(this.hoveredPOI);
        }
    }
}

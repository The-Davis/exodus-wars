/* eslint-disable */
import { StateManager } from '../StateManager';
import { Renderer } from '../Renderer';
import { ClusterPOI, StarPOI } from '../data/MockUniverse';

export class ClusterView {
    private stateManager: StateManager;
    private image: HTMLImageElement | null = null;
    private imageLoaded = false;
    private time = 0;
    private hoveredPOI: StarPOI | null = null;
    private cluster: ClusterPOI | null = null;

    constructor(stateManager: StateManager) {
        this.stateManager = stateManager;
    }

    public onEnter(cluster: ClusterPOI) {
        this.cluster = cluster;
        this.imageLoaded = false;
        this.hoveredPOI = null;
    
        this.image = new Image();
        this.image.src = import.meta.env.BASE_URL + cluster.image.replace(/^\//, '');
        this.image.onload = () => {
            this.imageLoaded = true;
        };
    }

    public update(deltaTime: number) {
        this.time += deltaTime;
    }

    public draw(ctx: CanvasRenderingContext2D, width: number, height: number) {
        if (this.imageLoaded && this.image && this.cluster) {
            // Draw Cluster Background filling screen but preserving aspect ratio
            const scale = Math.max(width / this.image.width, height / this.image.height);
            const drawW = this.image.width * scale;
            const drawH = this.image.height * scale;
            const drawX = (width - drawW) / 2;
            const drawY = (height - drawH) / 2;
      
            ctx.globalAlpha = 0.5;
            ctx.drawImage(this.image, drawX, drawY, drawW, drawH);
            ctx.globalAlpha = 1.0;

            // Draw Star POIs
            for (const star of this.cluster.stars) {
                const cx = width * star.x;
                const cy = height * star.y;
        
                Renderer.drawGlowingCircle(ctx, cx, cy, 6, star.color);
        
                if (this.hoveredPOI === star) {
                    Renderer.drawReticle(ctx, cx, cy, 25, star.color, this.time);
                    Renderer.drawLabel(ctx, star.name, cx, cy, star.color);
                } else {
                    // small label
                    ctx.save();
                    ctx.font = '12px Jura';
                    ctx.fillStyle = 'rgba(255,255,255,0.7)';
                    ctx.fillText(star.name.toUpperCase(), cx + 15, cy - 15);
                    ctx.restore();
                }
            }
        }
    }

    public handleMouseMove(x: number, y: number, width: number, height: number) {
    if (!this.cluster) return;
    
    const nx = x / width;
    const ny = y / height;
    
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

        for (const star of this.cluster.stars) {
            const cx = width * star.x;
            const cy = height * star.y;
            const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      
            if (dist < 30) {
                this.hoveredPOI = star;
                document.body.style.cursor = 'pointer';
                break;
            }
        }
    }

    public handleClick(x: number, y: number, width: number, height: number) {
        if (this.hoveredPOI) {
            document.body.style.cursor = 'default';
            this.stateManager.navigateToStar(this.hoveredPOI);
        }
    }
}

/* eslint-disable */
import { StateManager } from '../StateManager';
import { Renderer } from '../Renderer';
import { PlanetPOI } from '../data/MockUniverse';

export class StarView {
    private stateManager: StateManager;
    private time = 0;
    private hoveredPOI: PlanetPOI | null = null;

    constructor(stateManager: StateManager) {
        this.stateManager = stateManager;
    }

    public update(deltaTime: number) {
        this.time += deltaTime;
    }

    public draw(ctx: CanvasRenderingContext2D, width: number, height: number) {
        const star = this.stateManager.getCurrentStar();
        if (!star) return;

        const cx = width / 2;
        const cy = height / 2;

        // Draw central star
        const starRadius = 50;
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, starRadius * 2);
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(0.2, star.color);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, starRadius * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();

        Renderer.drawGlowingCircle(ctx, cx, cy, starRadius, star.color, 40);

        // Draw planets
        for (let i = 0; i < star.planets.length; i++) {
            const planet = star.planets[i];
            // Simple orbital mechanics based on time
            const angle = (this.time * 0.0001) / (i + 1) + (i * Math.PI / 2);
            const px = cx + Math.cos(angle) * planet.orbitRadius;
            const py = cy + Math.sin(angle) * planet.orbitRadius;

            // Update positions for click detection
            planet.x = px;
            planet.y = py;

            // Draw orbit path
            Renderer.drawOrbit(ctx, cx, cy, planet.orbitRadius, planet.color);

            // Draw planet
            Renderer.drawGlowingCircle(ctx, px, py, 10, planet.color, 10);

            // Draw reticle if hovered
            if (this.hoveredPOI === planet) {
                Renderer.drawReticle(ctx, px, py, 30, planet.color, this.time);
                Renderer.drawLabel(ctx, planet.name, px, py, planet.color);
            } else {
                ctx.save();
                ctx.font = '12px Jura';
                ctx.fillStyle = 'rgba(255,255,255,0.7)';
                ctx.fillText(planet.name.toUpperCase(), px + 15, py - 15);
                ctx.restore();
            }
        }
    }

    public handleMouseMove(x: number, y: number, width: number, height: number) {
        const star = this.stateManager.getCurrentStar();
        if (!star) return;
    
        this.hoveredPOI = null;
        document.body.style.cursor = 'default';

        for (const planet of star.planets) {
            const dist = Math.sqrt((x - planet.x) ** 2 + (y - planet.y) ** 2);
      
            if (dist < 20) {
                this.hoveredPOI = planet;
                document.body.style.cursor = 'pointer';
                break;
            }
        }
    }

    public handleClick(x: number, y: number, width: number, height: number) {
        if (this.hoveredPOI) {
            document.body.style.cursor = 'default';
            this.stateManager.navigateToPlanet(this.hoveredPOI);
        }
    }
}

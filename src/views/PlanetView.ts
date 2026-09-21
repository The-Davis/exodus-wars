/* eslint-disable */
import { StateManager } from '../StateManager';
import { Renderer } from '../Renderer';

export class PlanetView {
    private stateManager: StateManager;
    private time = 0;

    constructor(stateManager: StateManager) {
        this.stateManager = stateManager;
    }

    public update(deltaTime: number) {
        this.time += deltaTime;
    }

    public draw(ctx: CanvasRenderingContext2D, width: number, height: number) {
        const planet = this.stateManager.getCurrentPlanet();
        if (!planet) return;

        // Draw the planet large on the left side of the screen
        const cx = width * 0.3;
        const cy = height * 0.5;
        const radius = Math.min(width, height) * 0.3;

        // Planet body
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    
        const gradient = ctx.createRadialGradient(cx - radius*0.3, cy - radius*0.3, 0, cx, cy, radius);
        gradient.addColorStop(0, planet.color);
        gradient.addColorStop(0.8, '#111');
        gradient.addColorStop(1, '#000');
    
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();

        // Atmosphere glow
        Renderer.drawGlowingCircle(ctx, cx, cy, radius, planet.color, 30);
    
        // Draw some techy scanlines/arcs around the planet
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(this.time * 0.0005);
        ctx.strokeStyle = planet.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(0, 0, radius + 20, 0, Math.PI);
        ctx.stroke();
    
        ctx.rotate(Math.PI / 2);
        ctx.beginPath();
        ctx.arc(0, 0, radius + 40, 0, Math.PI / 2);
        ctx.stroke();
        ctx.restore();
    }

    public handleMouseMove(x: number, y: number, width: number, height: number) {
    // Info box interaction is HTML handled, no canvas hover needed here right now
    }

    public handleClick(x: number, y: number, width: number, height: number) {
    // Click anywhere could perhaps go back, but we have a back button.
    }
}

export class Renderer {
    public static drawGlowingCircle(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        radius: number,
        color: string,
        glowStrength: number = 15
    ): void {
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = glowStrength;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    public static drawReticle(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        size: number,
        color: string,
        time: number
    ): void {
        const rotation = time * 0.001;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
    
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
    
        // Draw segmented arc
        ctx.beginPath();
        ctx.arc(0, 0, size, 0.2, Math.PI / 2 - 0.2);
        ctx.stroke();
    
        ctx.beginPath();
        ctx.arc(0, 0, size, Math.PI / 2 + 0.2, Math.PI - 0.2);
        ctx.stroke();
    
        ctx.beginPath();
        ctx.arc(0, 0, size, Math.PI + 0.2, Math.PI * 1.5 - 0.2);
        ctx.stroke();
    
        ctx.beginPath();
        ctx.arc(0, 0, size, Math.PI * 1.5 + 0.2, Math.PI * 2 - 0.2);
        ctx.stroke();
    
        ctx.restore();
    }

    public static drawLabel(
        ctx: CanvasRenderingContext2D,
        text: string,
        x: number,
        y: number,
        color: string
    ): void {
        ctx.save();
        ctx.font = '16px Jura';
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 5;
        ctx.textAlign = 'center';
    
        // Draw a small line and text
        ctx.beginPath();
        ctx.moveTo(x + 10, y - 10);
        ctx.lineTo(x + 30, y - 30);
        ctx.lineTo(x + 80, y - 30);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.stroke();
    
        ctx.textAlign = 'left';
        ctx.fillText(text.toUpperCase(), x + 35, y - 35);
    
        ctx.restore();
    }

    public static drawOrbit(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        radius: number,
        color: string
    ): void {
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 10]);
        ctx.globalAlpha = 0.3;
        ctx.stroke();
        ctx.restore();
    }
}

import { StateManager } from './StateManager';
import { InputHandler } from './InputHandler';

class App {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private stateManager: StateManager;
    private inputHandler: InputHandler;
  
    private lastTime: number = 0;

    constructor() {
        this.canvas = document.getElementById('mapCanvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d')!;
    
        this.stateManager = new StateManager();
        this.inputHandler = new InputHandler(this.stateManager, this.canvas);

        // Initial sizing
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        const style = document.createElement('style');
        style.innerHTML = `* { cursor: url('${import.meta.env.BASE_URL}assets/ui/cursor.png') 16 16, auto !important; }`;
        document.head.appendChild(style);

        requestAnimationFrame(this.loop.bind(this));
    }

    private loop(timestamp: number) {
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        this.stateManager.update(deltaTime);
        this.stateManager.draw(this.ctx, this.canvas.width, this.canvas.height);

        requestAnimationFrame(this.loop.bind(this));
    }
}

window.onload = () => {
    new App();
};

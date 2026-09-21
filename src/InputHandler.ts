import { StateManager } from './StateManager';

export class InputHandler {
    private stateManager: StateManager;
    private canvas: HTMLCanvasElement;

    constructor(stateManager: StateManager, canvas: HTMLCanvasElement) {
        this.stateManager = stateManager;
        this.canvas = canvas;

        this.bindEvents();
    }

    private bindEvents() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });
        this.resizeCanvas(); // initial size

        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.stateManager.handleMouseMove(x, y, this.canvas.width, this.canvas.height);
        });

        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.stateManager.handleMouseClick(x, y, this.canvas.width, this.canvas.height);
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.stateManager.goBack();
            }
        });

        const btnBack = document.getElementById('btnBack');
        if (btnBack) {
            btnBack.addEventListener('click', () => {
                this.stateManager.goBack();
            });
        }
    }

    private resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    
        // Also resize uiCanvas just in case we need it
        const uiCanvas = document.getElementById('uiCanvas') as HTMLCanvasElement;
        if (uiCanvas) {
            uiCanvas.width = window.innerWidth;
            uiCanvas.height = window.innerHeight;
        }
    }
}

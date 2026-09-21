import { StateManager } from './StateManager';

export class InputHandler {
    private stateManager: StateManager;
    private canvas: HTMLCanvasElement;

    constructor(stateManager: StateManager, canvas: HTMLCanvasElement) {
        this.stateManager = stateManager;
        this.canvas = canvas;

        this.bindEvents();
        this.bindCodexUI();
        this.handleInitialHash();
    }

    private bindEvents(): void {
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
                const modal = document.getElementById('codex-modal');
                if (modal && modal.style.display !== 'none') {
                    modal.style.display = 'none';
                } else {
                    this.stateManager.goBack();
                }
            }
        });

        window.addEventListener('hashchange', () => {
            this.handleInitialHash();
        });

        const btnBack = document.getElementById('btnBack');
        if (btnBack) {
            btnBack.addEventListener('click', () => {
                this.stateManager.goBack();
            });
        }
    }

    private handleInitialHash(): void {
        const hash = window.location.hash.toLowerCase();
        if (hash.includes('starmap')) {
            this.stateManager.showStarmap();
        } else {
            this.stateManager.showCodex();
        }
    }

    private bindCodexUI(): void {
        // Return to Codex button from Starmap
        const btnCodex = document.getElementById('btnCodex');
        if (btnCodex) {
            btnCodex.addEventListener('click', () => {
                window.location.hash = '#/codex';
                this.stateManager.showCodex();
            });
        }

        // Launch Starmap buttons on Codex landing page
        const btnLaunchTop = document.getElementById('btnLaunchStarmapTop');
        if (btnLaunchTop) {
            btnLaunchTop.addEventListener('click', () => {
                window.location.hash = '#/starmap';
                this.stateManager.showStarmap();
            });
        }

        const btnLaunchBottom = document.getElementById('btnLaunchStarmapBottom');
        if (btnLaunchBottom) {
            btnLaunchBottom.addEventListener('click', () => {
                window.location.hash = '#/starmap';
                this.stateManager.showStarmap();
            });
        }

        // Modal elements
        const modal = document.getElementById('codex-modal');
        const modalTitle = document.getElementById('modalTitle');
        const modalMessage = document.getElementById('modalMessage');
        const modalClose = document.getElementById('modalClose');
        const modalDismiss = document.getElementById('modalDismiss');

        const closeModal = (): void => {
            if (modal) modal.style.display = 'none';
        };

        if (modalClose) modalClose.addEventListener('click', closeModal);
        if (modalDismiss) modalDismiss.addEventListener('click', closeModal);
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal || (e.target as HTMLElement).classList.contains('modal-backdrop')) {
                    closeModal();
                }
            });
        }

        // Handle clicks on all codex links
        const codexLinks = document.querySelectorAll('.codex-link, .codex-link-primary, .topic-card');
        codexLinks.forEach((el) => {
            el.addEventListener('click', (e) => {
                const target = el as HTMLElement;
                const link = (target.tagName === 'A' ? target : target.querySelector('a')) as HTMLAnchorElement | null;
                const title = link ? (link.getAttribute('data-title') || link.innerText) : target.innerText;
                const type = link ? (link.getAttribute('data-type') || 'Article') : 'Archive Record';

                // Prevent default jump for non-starmap links
                e.preventDefault();

                if (modal && modalTitle && modalMessage) {
                    modalTitle.innerText = `${type.toUpperCase()}: ${title}`;
                    modalMessage.innerHTML = `You have selected <strong>${title}</strong> from the Galactic Codex archives.<br><br>Detailed article view and category imports are scheduled for the next deployment phase.`;
                    modal.style.display = 'flex';
                }
            });
        });
    }

    private resizeCanvas(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    
        const uiCanvas = document.getElementById('uiCanvas') as HTMLCanvasElement;
        if (uiCanvas) {
            uiCanvas.width = window.innerWidth;
            uiCanvas.height = window.innerHeight;
        }
    }
}

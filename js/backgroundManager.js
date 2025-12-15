// BackgroundManager - Manages background switching based on navigation
import { StartBackground } from './backgrounds/StartBackground.js';
import { ProjectsBackground } from './backgrounds/ProjectsBackground.js';
import { ArtBackground } from './backgrounds/ArtBackground.js';
import { ConnectBackground } from './backgrounds/ConnectBackground.js';
import { GameManager } from './game/GameManager.js';
export class BackgroundManager {
    constructor(containerId) {
        this.currentBackground = null;
        this.currentLayer = null;
        this.nextLayer = null;
        this.isTransitioning = false;
        this.currentBackgroundType = null;
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Background container with id "${containerId}" not found`);
        }
        this.container = container;
        this.gameManager = new GameManager();
    }
    createBackgroundLayer(type) {
        const layer = document.createElement('div');
        layer.className = 'background-layer';
        layer.style.position = 'absolute';
        layer.style.inset = '0';
        layer.style.opacity = '0';
        layer.style.transition = 'opacity 0.8s ease-in-out';
        layer.style.pointerEvents = 'none';
        this.container.appendChild(layer);
        // Create background in the layer
        let background;
        switch (type) {
            case 'home':
                background = new StartBackground(layer);
                break;
            case 'projects':
                background = new ProjectsBackground(layer);
                break;
            case 'art':
                background = new ArtBackground(layer);
                break;
            case 'connect':
                background = new ConnectBackground(layer);
                break;
        }
        // Store background reference on the layer
        layer.background = background;
        return layer;
    }
    switchToBackground(type) {
        // Prevent multiple transitions at once
        if (this.isTransitioning)
            return;
        this.isTransitioning = true;
        // Create new background layer
        this.nextLayer = this.createBackgroundLayer(type);
        // Small delay to ensure new layer is rendered
        setTimeout(() => {
            // Fade out current layer and fade in new layer simultaneously
            if (this.currentLayer) {
                this.currentLayer.style.opacity = '0';
            }
            this.nextLayer.style.opacity = '1';
            // After transition completes, clean up old layer
            setTimeout(() => {
                if (this.currentLayer) {
                    const oldBackground = this.currentLayer.background;
                    if (oldBackground) {
                        oldBackground.destroy();
                    }
                    this.currentLayer.remove();
                }
                this.currentLayer = this.nextLayer;
                this.nextLayer = null;
                this.currentBackground = this.currentLayer.background;
                this.currentBackgroundType = type;
                this.isTransitioning = false;
                // Start/stop game based on background type
                this.gameManager.startGame(type);
            }, 800); // Match transition duration
        }, 10);
    }
}
// Initialize background manager when DOM is ready
$(document).ready(function () {
    // Create background container if it doesn't exist
    if (!document.getElementById('background-container')) {
        const bgContainer = document.createElement('div');
        bgContainer.id = 'background-container';
        bgContainer.style.position = 'fixed';
        bgContainer.style.inset = '0';
        bgContainer.style.zIndex = '-1';
        bgContainer.style.pointerEvents = 'none';
        document.body.appendChild(bgContainer);
    }
    const bgManager = new BackgroundManager('background-container');
    // Store current background type in sessionStorage to restore after reload
    const storedBgType = sessionStorage.getItem('currentBackground') || 'home';
    // Set initial background based on stored type (without transition)
    const bgContainer = document.getElementById('background-container');
    if (bgContainer) {
        const initialLayer = document.createElement('div');
        initialLayer.className = 'background-layer';
        initialLayer.style.position = 'absolute';
        initialLayer.style.inset = '0';
        initialLayer.style.opacity = '1';
        initialLayer.style.pointerEvents = 'none';
        bgContainer.appendChild(initialLayer);
        let initialBackground;
        switch (storedBgType) {
            case 'home':
                initialBackground = new StartBackground(initialLayer);
                break;
            case 'projects':
                initialBackground = new ProjectsBackground(initialLayer);
                break;
            case 'art':
                initialBackground = new ArtBackground(initialLayer);
                break;
            case 'connect':
                initialBackground = new ConnectBackground(initialLayer);
                break;
            default:
                initialBackground = new StartBackground(initialLayer);
        }
        initialLayer.background = initialBackground;
        bgManager.currentLayer = initialLayer;
        bgManager.currentBackground = initialBackground;
        bgManager.currentBackgroundType = storedBgType;
        // Start game for initial background
        bgManager.gameManager.startGame(storedBgType);
    }
    // Store background type when switching (so it persists after reload)
    const originalSwitch = bgManager.switchToBackground.bind(bgManager);
    bgManager.switchToBackground = function (type) {
        sessionStorage.setItem('currentBackground', type);
        originalSwitch(type);
    };
    // Switch backgrounds on nav click
    $('.home').on('click', () => bgManager.switchToBackground('home'));
    $('.proj').on('click', () => bgManager.switchToBackground('projects'));
    $('.art').on('click', () => bgManager.switchToBackground('art'));
    $('.cnct').on('click', () => bgManager.switchToBackground('connect'));
    // Store bgManager globally for potential future use
    window.bgManager = bgManager;
});
//# sourceMappingURL=backgroundManager.js.map
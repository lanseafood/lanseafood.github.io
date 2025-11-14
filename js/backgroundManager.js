"use strict";
// BackgroundManager - Manages background switching based on navigation
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackgroundManager = void 0;
const StartBackground_1 = require("./backgrounds/StartBackground");
const ProjectsBackground_1 = require("./backgrounds/ProjectsBackground");
const ArtBackground_1 = require("./backgrounds/ArtBackground");
const ConnectBackground_1 = require("./backgrounds/ConnectBackground");
class BackgroundManager {
    constructor(containerId) {
        this.currentBackground = null;
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Background container with id "${containerId}" not found`);
        }
        this.container = container;
    }
    switchToBackground(type) {
        // Destroy current background
        if (this.currentBackground) {
            this.currentBackground.destroy();
            this.currentBackground = null;
        }
        // Create new background based on type
        switch (type) {
            case 'home':
                this.currentBackground = new StartBackground_1.StartBackground(this.container);
                break;
            case 'projects':
                this.currentBackground = new ProjectsBackground_1.ProjectsBackground(this.container);
                break;
            case 'art':
                this.currentBackground = new ArtBackground_1.ArtBackground(this.container);
                break;
            case 'connect':
                this.currentBackground = new ConnectBackground_1.ConnectBackground(this.container);
                break;
        }
    }
}
exports.BackgroundManager = BackgroundManager;
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
    // Set initial background to home
    bgManager.switchToBackground('home');
    // Switch backgrounds on nav click
    $('.home').on('click', () => bgManager.switchToBackground('home'));
    $('.proj').on('click', () => bgManager.switchToBackground('projects'));
    $('.art').on('click', () => bgManager.switchToBackground('art'));
    $('.cnct').on('click', () => bgManager.switchToBackground('connect'));
    // Store bgManager globally for potential future use
    window.bgManager = bgManager;
});
//# sourceMappingURL=backgroundManager.js.map
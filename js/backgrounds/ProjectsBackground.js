"use strict";
// ProjectsBackground - Space/tech themed background for projects page
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsBackground = void 0;
class ProjectsBackground {
    constructor(container) {
        this.container = container;
        this.init();
    }
    init() {
        this.container.innerHTML = '';
        this.container.className = 'background-container projects-background';
        // Dark space background
        const space = document.createElement('div');
        space.className = 'background-space';
        space.style.position = 'absolute';
        space.style.inset = '0';
        space.style.background = 'linear-gradient(180deg, #0a0a1a 0%, #1a1a3a 100%)';
        this.container.appendChild(space);
        // Stars
        const stars = document.createElement('div');
        stars.className = 'background-stars';
        stars.style.position = 'absolute';
        stars.style.inset = '0';
        stars.style.overflow = 'hidden';
        // Create multiple star layers
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.style.position = 'absolute';
            star.style.width = '2px';
            star.style.height = '2px';
            star.style.backgroundColor = 'white';
            star.style.borderRadius = '50%';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.opacity = (Math.random() * 0.8 + 0.2).toString();
            stars.appendChild(star);
        }
        this.container.appendChild(stars);
        // Grid pattern overlay (tech/code theme)
        const grid = document.createElement('div');
        grid.className = 'background-grid';
        grid.style.position = 'absolute';
        grid.style.inset = '0';
        grid.style.backgroundImage = `
      linear-gradient(rgba(100, 200, 255, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(100, 200, 255, 0.1) 1px, transparent 1px)
    `;
        grid.style.backgroundSize = '50px 50px';
        this.container.appendChild(grid);
    }
    destroy() {
        this.container.innerHTML = '';
    }
}
exports.ProjectsBackground = ProjectsBackground;
//# sourceMappingURL=ProjectsBackground.js.map
// All background classes in one file for easier bundling
// StartBackground - Game-style background with clouds and grass for home page
class StartBackground {
    constructor(container) {
        this.cloud1 = null;
        this.cloud2 = null;
        this.cloud3 = null;
        this.cloud4 = null;
        this.cloud5 = null;
        this.animationFrameId = null;
        this.container = container;
        this.init();
    }
    init() {
        this.container.innerHTML = '';
        this.container.className = 'background-container start-background';
        // Blue Sky
        const sky = document.createElement('div');
        sky.className = 'background-sky';
        this.container.appendChild(sky);
        // Calculate initial positions spread across the screen
        const screenWidth = window.innerWidth;
        const cloudWidth = 200; // Approximate max cloud width for spacing
        // Clouds - 5 total with varying positions, sizes, speeds, and opacities
        // Spread them across the screen: some off-left, some visible
        this.cloud1 = this.createCloud(-200, '20px', '128px', '64px', 0.3, 1, -200);
        this.cloud2 = this.createCloud(screenWidth * 0.15, '32px', '96px', '48px', 0.25, 0.7, -200);
        this.cloud3 = this.createCloud(screenWidth * 0.4, '16px', '112px', '56px', 0.2, 0.8, -200);
        this.cloud4 = this.createCloud(screenWidth * 0.65, '48px', '104px', '52px', 0.35, 0.9, -200);
        this.cloud5 = this.createCloud(screenWidth * 0.85, '12px', '88px', '44px', 0.15, 0.75, -200);
        this.container.appendChild(this.cloud1);
        this.container.appendChild(this.cloud2);
        this.container.appendChild(this.cloud3);
        this.container.appendChild(this.cloud4);
        this.container.appendChild(this.cloud5);
        // Green Grass with bushes
        const grass = this.createGrass();
        this.container.appendChild(grass);
        this.animate();
    }
    createCloud(initialX, top, width, height, speed, opacity, resetX = -200) {
        const cloud = document.createElement('div');
        cloud.className = 'background-cloud';
        cloud.style.position = 'absolute';
        cloud.style.top = top;
        cloud.style.left = `${initialX}px`;
        cloud.style.width = width;
        cloud.style.height = height;
        cloud.style.imageRendering = 'pixelated';
        cloud.speed = speed;
        cloud.resetX = resetX; // Position to reset to when looping
        // Cloud base
        const base = document.createElement('div');
        base.style.position = 'absolute';
        base.style.bottom = '0';
        base.style.left = '0';
        base.style.width = '100%';
        base.style.height = '50%';
        base.style.backgroundColor = 'white';
        base.style.opacity = opacity.toString();
        cloud.appendChild(base);
        // Cloud puffs
        const puff1 = document.createElement('div');
        puff1.style.position = 'absolute';
        puff1.style.bottom = '25%';
        puff1.style.left = '25%';
        puff1.style.width = '40%';
        puff1.style.height = '60%';
        puff1.style.backgroundColor = 'white';
        puff1.style.opacity = opacity.toString();
        cloud.appendChild(puff1);
        const puff2 = document.createElement('div');
        puff2.style.position = 'absolute';
        puff2.style.bottom = '25%';
        puff2.style.right = '25%';
        puff2.style.width = '40%';
        puff2.style.height = '60%';
        puff2.style.backgroundColor = 'white';
        puff2.style.opacity = opacity.toString();
        cloud.appendChild(puff2);
        const puff3 = document.createElement('div');
        puff3.style.position = 'absolute';
        puff3.style.bottom = '30%';
        puff3.style.left = '40%';
        puff3.style.width = '50%';
        puff3.style.height = '50%';
        puff3.style.backgroundColor = 'white';
        puff3.style.opacity = opacity.toString();
        cloud.appendChild(puff3);
        return cloud;
    }
    createGrass() {
        const grass = document.createElement('div');
        grass.className = 'background-grass';
        grass.style.position = 'absolute';
        grass.style.bottom = '0';
        grass.style.left = '0';
        grass.style.right = '0';
        grass.style.height = '128px';
        grass.style.backgroundColor = '#22c55e';
        grass.style.imageRendering = 'pixelated';
        // Bushes
        const bushConfigs = [
            { left: '8%', bundle: 'double', bottom: '7px', colors: ['#16a34a', '#15803d'], heights: ['35px', '45px'] },
            { left: '22%', bundle: 'single', bottom: '90px', colors: ['#15803d'], heights: ['50px'] },
            { left: '35%', bundle: 'triple', bottom: '40px', colors: ['#166534', '#15803d', '#16a34a'], heights: ['25px', '55px', '35px'] },
            { left: '48%', bundle: 'double', bottom: '32px', colors: ['#166534', '#4ade80'], heights: ['32px', '40px'] },
            { left: '62%', bundle: 'single', bottom: '10px', colors: ['#16a34a'], heights: ['40px'] },
            { left: '75%', bundle: 'triple', bottom: '20px', colors: ['#15803d', '#16a34a', '#4ade80'], heights: ['35px', '60px', '45px'] },
            { left: '88%', bundle: 'double', bottom: '100px', colors: ['#166534', '#15803d'], heights: ['30px', '40px'] },
        ];
        bushConfigs.forEach((config) => {
            const bush = this.createBush(config);
            grass.appendChild(bush);
        });
        return grass;
    }
    createBush(config) {
        const bush = document.createElement('div');
        bush.style.position = 'absolute';
        bush.style.left = config.left;
        bush.style.bottom = config.bottom;
        bush.style.imageRendering = 'pixelated';
        if (config.bundle === 'single') {
            const pole = document.createElement('div');
            pole.style.width = '20px';
            pole.style.height = config.heights[0];
            pole.style.backgroundColor = config.colors[0];
            pole.style.borderRadius = '10px 10px 0 0';
            bush.appendChild(pole);
        }
        else if (config.bundle === 'double') {
            const pole1 = document.createElement('div');
            pole1.style.position = 'absolute';
            pole1.style.width = '16px';
            pole1.style.height = config.heights[1];
            pole1.style.left = '10px';
            pole1.style.bottom = '0';
            pole1.style.backgroundColor = config.colors[1];
            pole1.style.borderRadius = '8px 8px 0 0';
            bush.appendChild(pole1);
            const pole2 = document.createElement('div');
            pole2.style.position = 'absolute';
            pole2.style.width = '20px';
            pole2.style.height = config.heights[0];
            pole2.style.left = '-6px';
            pole2.style.bottom = '0';
            pole2.style.backgroundColor = config.colors[0];
            pole2.style.borderRadius = '10px 10px 0 0';
            bush.appendChild(pole2);
        }
        else if (config.bundle === 'triple') {
            const pole1 = document.createElement('div');
            pole1.style.position = 'absolute';
            pole1.style.width = '30px';
            pole1.style.height = config.heights[1];
            pole1.style.left = '0px';
            pole1.style.bottom = '0';
            pole1.style.backgroundColor = config.colors[1];
            pole1.style.borderRadius = '15px 15px 0 0';
            bush.appendChild(pole1);
            const pole2 = document.createElement('div');
            pole2.style.position = 'absolute';
            pole2.style.width = '16px';
            pole2.style.height = config.heights[0];
            pole2.style.left = '-12px';
            pole2.style.bottom = '0';
            pole2.style.backgroundColor = config.colors[0];
            pole2.style.borderRadius = '8px 8px 0 0';
            bush.appendChild(pole2);
            const pole3 = document.createElement('div');
            pole3.style.position = 'absolute';
            pole3.style.width = '18px';
            pole3.style.height = config.heights[2];
            pole3.style.left = '19px';
            pole3.style.bottom = '0';
            pole3.style.backgroundColor = config.colors[2];
            pole3.style.borderRadius = '9px 9px 0 0';
            bush.appendChild(pole3);
        }
        return bush;
    }
    animate() {
        const animateCloud = (cloud) => {
            if (!cloud)
                return;
            const speed = cloud.speed;
            const resetX = cloud.resetX;
            let position = parseFloat(cloud.style.left) || resetX;
            position += speed;
            if (position > window.innerWidth + 200) {
                position = resetX;
            }
            cloud.style.left = `${position}px`;
        };
        const loop = () => {
            if (this.cloud1)
                animateCloud(this.cloud1);
            if (this.cloud2)
                animateCloud(this.cloud2);
            if (this.cloud3)
                animateCloud(this.cloud3);
            if (this.cloud4)
                animateCloud(this.cloud4);
            if (this.cloud5)
                animateCloud(this.cloud5);
            this.animationFrameId = requestAnimationFrame(loop);
        };
        loop();
    }
    destroy() {
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
        }
        this.container.innerHTML = '';
    }
}
// ProjectsBackground - Space/tech themed background
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
        // Grid pattern overlay
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
// ArtBackground - Creative/artistic themed background
class ArtBackground {
    constructor(container) {
        this.container = container;
        this.init();
    }
    init() {
        this.container.innerHTML = '';
        this.container.className = 'background-container art-background';
        // Colorful gradient background
        const gradient = document.createElement('div');
        gradient.className = 'background-gradient';
        gradient.style.position = 'absolute';
        gradient.style.inset = '0';
        gradient.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)';
        gradient.style.backgroundSize = '400% 400%';
        this.container.appendChild(gradient);
        // Abstract shapes
        const shapes = document.createElement('div');
        shapes.className = 'background-shapes';
        shapes.style.position = 'absolute';
        shapes.style.inset = '0';
        shapes.style.overflow = 'hidden';
        for (let i = 0; i < 8; i++) {
            const shape = document.createElement('div');
            const size = Math.random() * 150 + 50;
            const colors = ['rgba(255, 107, 107, 0.3)', 'rgba(255, 206, 84, 0.3)', 'rgba(75, 192, 192, 0.3)', 'rgba(255, 159, 64, 0.3)'];
            shape.style.position = 'absolute';
            shape.style.width = `${size}px`;
            shape.style.height = `${size}px`;
            shape.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            shape.style.borderRadius = Math.random() > 0.5 ? '50%' : '20%';
            shape.style.left = `${Math.random() * 100}%`;
            shape.style.top = `${Math.random() * 100}%`;
            shape.style.filter = 'blur(20px)';
            shapes.appendChild(shape);
        }
        this.container.appendChild(shapes);
    }
    destroy() {
        this.container.innerHTML = '';
    }
}
// ConnectBackground - Social/network themed background
class ConnectBackground {
    constructor(container) {
        this.container = container;
        this.init();
    }
    init() {
        this.container.innerHTML = '';
        this.container.className = 'background-container connect-background';
        // Warm gradient background
        const gradient = document.createElement('div');
        gradient.className = 'background-gradient';
        gradient.style.position = 'absolute';
        gradient.style.inset = '0';
        gradient.style.background = 'linear-gradient(180deg, #ffecd2 0%, #fcb69f 100%)';
        this.container.appendChild(gradient);
        // Network/connection lines pattern
        const network = document.createElement('div');
        network.className = 'background-network';
        network.style.position = 'absolute';
        network.style.inset = '0';
        network.style.overflow = 'hidden';
        // Create connection nodes
        const nodes = [];
        for (let i = 0; i < 15; i++) {
            const node = document.createElement('div');
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            nodes.push({ x, y });
            node.style.position = 'absolute';
            node.style.width = '8px';
            node.style.height = '8px';
            node.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
            node.style.borderRadius = '50%';
            node.style.left = `${x}%`;
            node.style.top = `${y}%`;
            node.style.transform = 'translate(-50%, -50%)';
            network.appendChild(node);
        }
        // Create canvas for connection lines
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.inset = '0';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = 1;
            // Draw connections between nearby nodes
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 30) {
                        ctx.beginPath();
                        ctx.moveTo((nodes[i].x / 100) * canvas.width, (nodes[i].y / 100) * canvas.height);
                        ctx.lineTo((nodes[j].x / 100) * canvas.width, (nodes[j].y / 100) * canvas.height);
                        ctx.stroke();
                    }
                }
            }
        }
        network.appendChild(canvas);
        this.container.appendChild(network);
    }
    destroy() {
        this.container.innerHTML = '';
    }
}
// BackgroundManager - Manages background switching
// $ is declared in carousel.ts
class BackgroundManager {
    constructor(containerId) {
        this.currentBackground = null;
        this.currentLayer = null;
        this.nextLayer = null;
        this.isTransitioning = false;
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Background container with id "${containerId}" not found`);
        }
        this.container = container;
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
                this.isTransitioning = false;
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
    // Set initial background to home (without transition)
    const bgContainer = document.getElementById('background-container');
    if (bgContainer) {
        const initialLayer = document.createElement('div');
        initialLayer.className = 'background-layer';
        initialLayer.style.position = 'absolute';
        initialLayer.style.inset = '0';
        initialLayer.style.opacity = '1';
        initialLayer.style.pointerEvents = 'none';
        bgContainer.appendChild(initialLayer);
        const initialBackground = new StartBackground(initialLayer);
        initialLayer.background = initialBackground;
        bgManager.currentLayer = initialLayer;
        bgManager.currentBackground = initialBackground;
    }
    // Switch backgrounds on nav click
    $('.home').on('click', () => bgManager.switchToBackground('home'));
    $('.proj').on('click', () => bgManager.switchToBackground('projects'));
    $('.art').on('click', () => bgManager.switchToBackground('art'));
    $('.cnct').on('click', () => bgManager.switchToBackground('connect'));
    // Store bgManager globally for potential future use
    window.bgManager = bgManager;
});
//# sourceMappingURL=backgrounds.js.map
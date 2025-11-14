// ProjectsBackground - Space/tech themed background for projects page
export class ProjectsBackground {
    constructor(container) {
        this.satellite1 = null;
        this.satellite2 = null;
        this.animationFrameId = null;
        this.container = container;
        this.init();
    }
    createSatellite(startX, startY, speed, rotationSpeed) {
        const satellite = document.createElement('div');
        satellite.style.position = 'absolute';
        satellite.style.width = '40px';
        satellite.style.height = '40px';
        satellite.style.left = `${startX}px`;
        satellite.style.top = `${startY}%`;
        satellite.style.transformOrigin = 'center center';
        // Satellite body (main rectangle)
        const body = document.createElement('div');
        body.style.position = 'absolute';
        body.style.width = '30px';
        body.style.height = '20px';
        body.style.left = '5px';
        body.style.top = '10px';
        body.style.backgroundColor = '#64b5f6';
        body.style.border = '1px solid #90caf9';
        body.style.borderRadius = '2px';
        satellite.appendChild(body);
        // Solar panel 1
        const panel1 = document.createElement('div');
        panel1.style.position = 'absolute';
        panel1.style.width = '8px';
        panel1.style.height = '25px';
        panel1.style.left = '0px';
        panel1.style.top = '7.5px';
        panel1.style.backgroundColor = '#1976d2';
        panel1.style.border = '1px solid #64b5f6';
        satellite.appendChild(panel1);
        // Solar panel 2
        const panel2 = document.createElement('div');
        panel2.style.position = 'absolute';
        panel2.style.width = '8px';
        panel2.style.height = '25px';
        panel2.style.right = '0px';
        panel2.style.top = '7.5px';
        panel2.style.backgroundColor = '#1976d2';
        panel2.style.border = '1px solid #64b5f6';
        satellite.appendChild(panel2);
        // Store animation properties
        satellite.speed = speed;
        satellite.rotationSpeed = rotationSpeed;
        satellite.rotation = 0;
        satellite.startX = startX;
        return satellite;
    }
    createMoonSurface() {
        const moonSurface = document.createElement('div');
        moonSurface.className = 'moon-surface';
        moonSurface.style.position = 'absolute';
        moonSurface.style.left = '0';
        moonSurface.style.right = '0';
        moonSurface.style.bottom = '-10vh';
        moonSurface.style.height = '40vh';
        moonSurface.style.borderRadius = '50% 50% 0 0';
        moonSurface.style.overflow = 'hidden';
        moonSurface.style.background = '#d3d3d3';
        // Texture layer using CSS gradient for a subtle texture effect
        const textureLayer = document.createElement('div');
        textureLayer.style.position = 'absolute';
        textureLayer.style.inset = '0';
        textureLayer.style.backgroundImage = `
      radial-gradient(circle at 20% 30%, rgba(200, 200, 200, 0.3) 1px, transparent 1px),
      radial-gradient(circle at 60% 70%, rgba(180, 180, 180, 0.3) 1px, transparent 1px),
      radial-gradient(circle at 80% 20%, rgba(190, 190, 190, 0.2) 1px, transparent 1px)
    `;
        textureLayer.style.backgroundSize = '64px 64px, 48px 48px, 56px 56px';
        textureLayer.style.opacity = '0.7';
        moonSurface.appendChild(textureLayer);
        // Create craters
        const craterConfigs = [
            { left: '15%', top: '30%', size: '60px', depth: '8px' },
            { left: '35%', top: '50%', size: '45px', depth: '6px' },
            { left: '55%', top: '25%', size: '50px', depth: '7px' },
            { left: '70%', top: '45%', size: '40px', depth: '5px' },
            { left: '85%', top: '35%', size: '55px', depth: '7px' },
            { left: '25%', top: '65%', size: '35px', depth: '4px' },
            { left: '60%', top: '70%', size: '42px', depth: '6px' },
            { left: '45%', top: '15%', size: '38px', depth: '5px' },
        ];
        craterConfigs.forEach((config) => {
            const crater = this.createCrater(config);
            moonSurface.appendChild(crater);
        });
        return moonSurface;
    }
    createCrater(config) {
        const crater = document.createElement('div');
        crater.style.position = 'absolute';
        crater.style.left = config.left;
        crater.style.top = config.top;
        crater.style.width = config.size;
        crater.style.height = config.size;
        crater.style.borderRadius = '50%';
        crater.style.background = `radial-gradient(circle at 30% 30%, rgba(180, 180, 180, 0.6), rgba(150, 150, 150, 0.8))`;
        crater.style.boxShadow = `inset 0 0 ${config.depth} rgba(100, 100, 100, 0.5)`;
        crater.style.transform = 'translate(-50%, -50%)';
        return crater;
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
        // Lunar surface at the bottom
        const moonSurface = this.createMoonSurface();
        this.container.appendChild(moonSurface);
        // Create two satellites with different paths and speeds
        this.satellite1 = this.createSatellite(-50, 25, 0.15, 0.02);
        this.satellite2 = this.createSatellite(-50, 65, 0.12, -0.015);
        this.container.appendChild(this.satellite1);
        this.container.appendChild(this.satellite2);
        this.animate();
    }
    animate() {
        const animateSatellite = (satellite) => {
            if (!satellite)
                return;
            const speed = satellite.speed;
            const rotationSpeed = satellite.rotationSpeed;
            let position = parseFloat(satellite.style.left) || satellite.startX;
            let rotation = satellite.rotation || 0;
            position += speed;
            rotation += rotationSpeed;
            // Reset position when off screen
            if (position > window.innerWidth + 50) {
                position = -50;
            }
            satellite.style.left = `${position}px`;
            satellite.style.transform = `rotate(${rotation}rad)`;
            satellite.rotation = rotation;
        };
        const loop = () => {
            if (this.satellite1)
                animateSatellite(this.satellite1);
            if (this.satellite2)
                animateSatellite(this.satellite2);
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
//# sourceMappingURL=ProjectsBackground.js.map
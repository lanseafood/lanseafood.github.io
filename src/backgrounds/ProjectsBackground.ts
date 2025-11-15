// ProjectsBackground - Space/tech themed background for projects page

export class ProjectsBackground {
  private container: HTMLElement;
  private satellite1: HTMLElement | null = null;
  private satellite2: HTMLElement | null = null;
  private animationFrameId: number | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
    this.init();
  }

  private createSatellite(startX: number, startY: number, speed: number, rotationSpeed: number): HTMLElement {
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
    (satellite as any).speed = speed;
    (satellite as any).rotationSpeed = rotationSpeed;
    (satellite as any).rotation = 0;
    (satellite as any).startX = startX;

    return satellite;
  }

  private createMoonSurface(): HTMLElement {
    const moonSurface = document.createElement('div');
    moonSurface.className = 'moon-surface';
    moonSurface.style.position = 'absolute';
    moonSurface.style.left = '-100px';
    moonSurface.style.right = '-100px';
    moonSurface.style.bottom = '0';
    moonSurface.style.height = '30vh';
    moonSurface.style.overflow = 'hidden';
    moonSurface.style.background = '#d3d3d3';
    
    // Create rounded left and right edges using border-radius
    // 50% border-radius on left and right creates a pill/capsule shape
    moonSurface.style.borderRadius = '50% 50% 0% 0%';

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

    // Add craters sporadically across the moon surface
    const numCraters = 6 + Math.floor(Math.random() * 4); // 6-9 craters
    for (let i = 0; i < numCraters; i++) {
      const crater = this.createCrater();
      // Position craters randomly across the width, mostly in the lower 70% of the surface
      const leftPercent = Math.random() * 100;
      const topPercent = 20 + Math.random() * 60; // Between 20% and 80% from top
      crater.style.left = `${leftPercent}%`;
      crater.style.top = `${topPercent}%`;
      crater.style.transform = 'translate(-50%, -50%)';
      // Random scale for variety (0.6x to 1.2x)
      const scale = 0.6 + Math.random() * 0.6;
      crater.style.transform += ` scale(${scale})`;
      moonSurface.appendChild(crater);
    }

    // Add rocks sporadically across the moon surface
    const numRocks = 8 + Math.floor(Math.random() * 5); // 8-12 rocks
    for (let i = 0; i < numRocks; i++) {
      const rock = this.createRock();
      // Position rocks randomly across the width, mostly in the lower 70% of the surface
      const leftPercent = Math.random() * 100;
      const topPercent = 20 + Math.random() * 60; // Between 20% and 80% from top
      rock.style.left = `${leftPercent}%`;
      rock.style.top = `${topPercent}%`;
      rock.style.transform = 'translate(-50%, -50%)';
      // Random scale for variety (0.7x to 1.3x)
      const scale = 0.7 + Math.random() * 0.6;
      rock.style.transform += ` scale(${scale})`;
      moonSurface.appendChild(rock);
    }

    return moonSurface;
  }

  private createCrater(): HTMLElement {
    const craterContainer = document.createElement('div');
    craterContainer.style.position = 'absolute';
    craterContainer.style.width = '180px';
    craterContainer.style.height = '80px';
    craterContainer.style.pointerEvents = 'none';
    
    const craterImg = document.createElement('img');
    craterImg.src = 'images/crater.svg';
    craterImg.style.width = '100%';
    craterImg.style.height = '100%';
    craterImg.style.display = 'block';
    craterContainer.appendChild(craterImg);
    
    return craterContainer;
  }

  private createRock(): HTMLElement {
    const rockContainer = document.createElement('div');
    rockContainer.style.position = 'absolute';
    rockContainer.style.width = '64px';
    rockContainer.style.height = '48px';
    rockContainer.style.pointerEvents = 'none';
    
    const rockImg = document.createElement('img');
    rockImg.src = 'images/rock.svg';
    rockImg.style.width = '100%';
    rockImg.style.height = '100%';
    rockImg.style.display = 'block';
    rockContainer.appendChild(rockImg);
    
    return rockContainer;
  }

  private init(): void {
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
    // Start in the middle area of the page (30-50% of screen width, 30-50% vertical)
    const screenWidth = window.innerWidth;
    const middleStartX1 = screenWidth * 0.3;
    const middleStartX2 = screenWidth * 0.35;
    this.satellite1 = this.createSatellite(middleStartX1, 35, 0.15, 0.02);
    this.satellite2 = this.createSatellite(middleStartX2, 45, 0.12, -0.015);
    this.container.appendChild(this.satellite1);
    this.container.appendChild(this.satellite2);

    this.animate();
  }

  private animate(): void {
    const animateSatellite = (satellite: HTMLElement) => {
      if (!satellite) return;
      const speed = (satellite as any).speed;
      const rotationSpeed = (satellite as any).rotationSpeed;
      let position = parseFloat(satellite.style.left) || (satellite as any).startX;
      let rotation = (satellite as any).rotation || 0;
      
      position += speed;
      rotation += rotationSpeed;
      
      // Reset position when off screen
      if (position > window.innerWidth + 50) {
        position = -50;
      }
      
      satellite.style.left = `${position}px`;
      satellite.style.transform = `rotate(${rotation}rad)`;
      
      (satellite as any).rotation = rotation;
    };

    const loop = () => {
      if (this.satellite1) animateSatellite(this.satellite1);
      if (this.satellite2) animateSatellite(this.satellite2);
      this.animationFrameId = requestAnimationFrame(loop);
    };

    loop();
  }

  public destroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.container.innerHTML = '';
  }
}


// StartBackground - Game-style background with clouds and grass for home page

export class StartBackground {
  private container: HTMLElement;
  private clouds: HTMLElement[] = [];
  private animationFrameId: number | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
    this.init();
  }

  private init(): void {
    this.container.innerHTML = '';
    this.container.className = 'background-container start-background';

    // Blue Sky
    const sky = document.createElement('div');
    sky.className = 'background-sky';
    this.container.appendChild(sky);

    // Create 5 clouds with random starting positions spread across the screen
    const screenWidth = window.innerWidth;
    const cloudConfigs = [
      { top: '80px', width: '128px', height: '64px', speed: 0.3, opacity: 1 },
      { top: '92px', width: '96px', height: '48px', speed: 0.25, opacity: 0.7 },
      { top: '76px', width: '112px', height: '56px', speed: 0.2, opacity: 0.8 },
      { top: '100px', width: '104px', height: '52px', speed: 0.35, opacity: 0.9 },
      { top: '68px', width: '120px', height: '60px', speed: 0.28, opacity: 0.75 }
    ];

    for (let i = 0; i < cloudConfigs.length; i++) {
      const config = cloudConfigs[i];
      // Spread clouds randomly across the screen width (some can start off-screen left)
      const initialX = (screenWidth * (i * 0.2 + Math.random() * 0.1)) - 200;
      const cloud = this.createCloud(initialX, config.top, config.width, config.height, config.speed, config.opacity);
      this.clouds.push(cloud);
      this.container.appendChild(cloud);
    }

    // Green Grass with bushes
    const grass = this.createGrass();
    this.container.appendChild(grass);

    this.animate();
  }

  private createCloud(initialX: number, top: string, width: string, height: string, speed: number, opacity: number): HTMLElement {
    const cloud = document.createElement('div');
    cloud.className = 'background-cloud';
    cloud.style.position = 'absolute';
    cloud.style.top = top;
    cloud.style.left = `${initialX}px`;
    cloud.style.width = width;
    cloud.style.height = height;
    cloud.style.imageRendering = 'pixelated';
    cloud.style.willChange = 'transform';
    cloud.style.transform = 'translateZ(0)';
    (cloud as any).speed = speed;
    (cloud as any).position = initialX;

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

  private createGrass(): HTMLElement {
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

    bushConfigs.forEach((config, i) => {
      const bush = this.createBush(config);
      grass.appendChild(bush);
    });

    return grass;
  }

  private createBush(config: any): HTMLElement {
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
    } else if (config.bundle === 'double') {
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
    } else if (config.bundle === 'triple') {
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

  private animate(): void {
    const animateCloud = (cloud: HTMLElement) => {
      if (!cloud) return;
      const speed = (cloud as any).speed;
      let position = (cloud as any).position;
      
      position += speed;
      
      // Reset to random position on the left when cloud goes off-screen right
      if (position > window.innerWidth + 200) {
        // Reset to a random position off-screen left
        position = -200 - Math.random() * 300;
      }
      
      (cloud as any).position = position;
      cloud.style.left = `${position}px`;
    };

    const loop = () => {
      this.clouds.forEach(cloud => animateCloud(cloud));
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


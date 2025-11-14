// StartBackground - Game-style background with clouds and grass for home page

export class StartBackground {
  private container: HTMLElement;
  private cloud1: HTMLElement | null = null;
  private cloud2: HTMLElement | null = null;
  private cloud3: HTMLElement | null = null;
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

    // Clouds
    this.cloud1 = this.createCloud(-200, '20px', '128px', '64px', 0.3, 1);
    this.cloud2 = this.createCloud(-150, '32px', '96px', '48px', 0.25, 0.7);
    this.cloud3 = this.createCloud(-100, '16px', '112px', '56px', 0.2, 0.8);
    this.container.appendChild(this.cloud1);
    this.container.appendChild(this.cloud2);
    this.container.appendChild(this.cloud3);

    // Green Grass with bushes
    const grass = this.createGrass();
    this.container.appendChild(grass);

    this.animate();
  }

  private createCloud(startX: number, top: string, width: string, height: string, speed: number, opacity: number): HTMLElement {
    const cloud = document.createElement('div');
    cloud.className = 'background-cloud';
    cloud.style.position = 'absolute';
    cloud.style.top = top;
    cloud.style.left = `${startX}px`;
    cloud.style.width = width;
    cloud.style.height = height;
    cloud.style.imageRendering = 'pixelated';
    (cloud as any).speed = speed;
    (cloud as any).startX = startX;

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
      const startX = (cloud as any).startX;
      let position = parseFloat(cloud.style.left) || startX;
      
      position += speed;
      if (position > window.innerWidth + 200) {
        position = startX;
      }
      cloud.style.left = `${position}px`;
    };

    const loop = () => {
      if (this.cloud1) animateCloud(this.cloud1);
      if (this.cloud2) animateCloud(this.cloud2);
      if (this.cloud3) animateCloud(this.cloud3);
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


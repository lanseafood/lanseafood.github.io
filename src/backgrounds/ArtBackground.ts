// ArtBackground - Creative/artistic themed background for art page

export class ArtBackground {
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.init();
  }

  private init(): void {
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
    
    // Create floating abstract shapes
    for (let i = 0; i < 17; i++) {
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

  public destroy(): void {
    this.container.innerHTML = '';
  }
}


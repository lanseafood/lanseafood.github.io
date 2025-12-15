// GameManager - Manages the minigame for different backgrounds

import { Player } from './Player.js';

export class GameManager {
  private container: HTMLElement | null = null;
  private player: Player | null = null;
  private animationFrameId: number | null = null;
  private keys: { left: boolean; right: boolean; up: boolean; down: boolean; space: boolean } = {
    left: false,
    right: false,
    up: false,
    down: false,
    space: false
  };
  private isActive: boolean = false;

  constructor() {
    this.setupKeyboardListeners();
  }

  private setupKeyboardListeners(): void {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          this.keys.left = true;
          e.preventDefault();
          break;
        case 'ArrowRight':
          this.keys.right = true;
          e.preventDefault();
          break;
        case 'ArrowUp':
          this.keys.up = true;
          e.preventDefault();
          break;
        case 'ArrowDown':
          this.keys.down = true;
          e.preventDefault();
          break;
        case ' ':
        case 'Spacebar':
          this.keys.space = true;
          e.preventDefault();
          break;
      }
    });

    window.addEventListener('keyup', (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          this.keys.left = false;
          e.preventDefault();
          break;
        case 'ArrowRight':
          this.keys.right = false;
          e.preventDefault();
          break;
        case 'ArrowUp':
          this.keys.up = false;
          e.preventDefault();
          break;
        case 'ArrowDown':
          this.keys.down = false;
          e.preventDefault();
          break;
        case ' ':
        case 'Spacebar':
          this.keys.space = false;
          e.preventDefault();
          break;
      }
    });
  }

  public startGame(backgroundType: 'home' | 'projects' | 'art' | 'connect'): void {
    // Only start game on home (grass) or projects (lunar surface) backgrounds
    if (backgroundType !== 'home' && backgroundType !== 'projects') {
      this.stopGame();
      return;
    }

    // Create or get game container (separate from background for highest z-index)
    let gameContainer = document.getElementById('game-container');
    if (!gameContainer) {
      gameContainer = document.createElement('div');
      gameContainer.id = 'game-container';
      gameContainer.style.position = 'fixed';
      gameContainer.style.zIndex = '50'; // Above background, below content
      gameContainer.style.pointerEvents = 'none';
      gameContainer.style.overflow = 'hidden'; // Constrain player to container
      document.body.appendChild(gameContainer);
    } else {
      // Clear any existing content
      gameContainer.innerHTML = '';
    }

    // Size container to match surface area
    // Container is 40vh tall to allow jumping above the 30vh surface
    if (backgroundType === 'home') {
      // Grass: 30vh surface, but 40vh container for jumping room
      gameContainer.style.left = '0';
      gameContainer.style.right = '0';
      gameContainer.style.bottom = '0';
      gameContainer.style.height = '60vh';
    //   gameContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    } else {
      // Projects (lunar surface): 30vh surface, but 40vh container for jumping room
      gameContainer.style.left = '0';
      gameContainer.style.right = '0';
      gameContainer.style.bottom = '0';
      gameContainer.style.height = '60vh';
    //   gameContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    }

    this.container = gameContainer;
    this.isActive = true;

    // Cancel any existing animation frame to prevent double execution
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    // Create or update player with background type for ground calculation
    if (!this.player) {
      this.player = new Player(this.container, backgroundType);
    } else {
      // Update player container and background type
      this.player.setContainer(this.container, backgroundType);
    }

    this.gameLoop();
  }

  public stopGame(): void {
    this.isActive = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.player) {
      this.player.destroy();
      this.player = null;
    }
    // Reset all keys to prevent stuck key states when game resumes
    this.keys = {
      left: false,
      right: false,
      up: false,
      down: false,
      space: false
    };
    // Clear game container but keep it for reuse
    const gameContainer = document.getElementById('game-container');
    if (gameContainer) {
      gameContainer.innerHTML = '';
    }
  }

  private gameLoop(): void {
    if (!this.isActive || !this.player) return;

    this.player.update(this.keys);
    this.checkCarouselCollision();
    
    this.animationFrameId = requestAnimationFrame(() => this.gameLoop());
  }

  private wasOverlapping: boolean = false; // Track previous overlap state

  private checkCarouselCollision(): void {
    if (!this.player || !this.container) return;
    
    // Don't check collision if already rotating or if background is transitioning
    if (this.isRotating) return;
    const bgManager = (window as any).bgManager;
    if (bgManager && (bgManager as any).isTransitioning) return;

    const carouselBox = document.querySelector('.box');
    if (!carouselBox) return;

    const playerPos = this.player.getPosition();
    const carouselRect = carouselBox.getBoundingClientRect();
    const containerRect = this.container.getBoundingClientRect();
    
    // Calculate player's screen position
    // Player x is relative to container left, y is from container bottom (increases upward)
    // getBoundingClientRect() uses coordinates from top of viewport
    const playerScreenX = containerRect.left + playerPos.x;
    // Player's bottom is at: container bottom - playerPos.y (from top of viewport)
    // Player's top is at: container bottom - playerPos.y - player height
    const playerBottom = containerRect.bottom - playerPos.y;
    const playerTop = playerBottom - playerPos.height;
    const playerLeft = playerScreenX;
    const playerRight = playerScreenX + playerPos.width;
    
    // Carousel bounding box
    const carouselLeft = carouselRect.left;
    const carouselRight = carouselRect.right;
    const carouselTop = carouselRect.top;
    const carouselBottom = carouselRect.bottom;
    
    // Check for overlap
    const overlaps = !(playerRight < carouselLeft || 
                       playerLeft > carouselRight || 
                       playerBottom < carouselTop || 
                       playerTop > carouselBottom);
    
    // Only trigger rotation when player first enters overlap (not continuously)
    if (overlaps && !this.wasOverlapping) {
      // Determine which side the player is closer to
      const playerCenterX = playerScreenX + playerPos.width / 2;
      const carouselCenterX = carouselRect.left + carouselRect.width / 2;
      
      // Get current rotation
      const currentRotation = (window as any).carouselRotation || 0;
      
      // Determine rotation direction
      // If player is on the right side, rotate clockwise (decrease angle)
      // If player is on the left side, rotate counterclockwise (increase angle)
      if (playerCenterX > carouselCenterX) {
        // Player is on the right side - rotate clockwise (next item)
        this.rotateCarousel(currentRotation - 90);
      } else {
        // Player is on the left side - rotate counterclockwise (previous item)
        this.rotateCarousel(currentRotation + 90);
      }
    }
    
    // Update overlap state
    this.wasOverlapping = overlaps;
  }

  private lastRotationTime: number = 0;
  private readonly ROTATION_COOLDOWN: number = 2000; // 2 second cooldown between rotations
  private isRotating: boolean = false; // Track if carousel is currently rotating

  private rotateCarousel(targetDeg: number): void {
    // Don't rotate if already rotating
    if (this.isRotating) {
      return;
    }
    
    // Normalize to -360 to 0 range
    targetDeg = targetDeg % 360;
    if (targetDeg > 0) targetDeg -= 360;
    
    // Check cooldown to prevent rapid rotations
    const now = Date.now();
    if (now - this.lastRotationTime < this.ROTATION_COOLDOWN) {
      return;
    }
    
    // Check if we're already at this rotation
    const currentRotation = (window as any).carouselRotation || 0;
    if (Math.abs(currentRotation - targetDeg) < 1) {
      return; // Already at target rotation
    }
    
    this.lastRotationTime = now;
    this.isRotating = true;
    
    // Update global rotation
    (window as any).carouselRotation = targetDeg;
    
    // Rotate the carousel
    const carousel = document.querySelector('.carousel') as HTMLElement;
    if (carousel) {
      const style = carousel.style as any;
      style.transition = 'transform 1s';
      style.transform = `rotateY(${targetDeg}deg)`;
      style.webkitTransform = `rotateY(${targetDeg}deg)`;
      style.mozTransform = `rotateY(${targetDeg}deg)`;
      style.oTransform = `rotateY(${targetDeg}deg)`;
    }
    
    // Also switch the background to match the carousel rotation
    const backgroundType = this.getBackgroundTypeFromRotation(targetDeg);
    const bgManager = (window as any).bgManager;
    if (bgManager && backgroundType) {
      bgManager.switchToBackground(backgroundType);
    }
    
    // Reset rotation flag after transition completes (1s transition + small buffer)
    setTimeout(() => {
      this.isRotating = false;
    }, 1100);
  }

  // Map carousel rotation angle to background type
  private getBackgroundTypeFromRotation(rotation: number): 'home' | 'projects' | 'art' | 'connect' | null {
    // Normalize rotation to -360 to 0 range
    rotation = rotation % 360;
    if (rotation > 0) rotation -= 360;
    
    // Map rotations to background types (matching carousel.ts)
    if (Math.abs(rotation - 0) < 1) return 'home';
    if (Math.abs(rotation - (-90)) < 1) return 'projects';
    if (Math.abs(rotation - (-180)) < 1) return 'art';
    if (Math.abs(rotation - (-270)) < 1) return 'connect';
    
    return null;
  }
}


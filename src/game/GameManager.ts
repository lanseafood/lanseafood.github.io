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
    // Clear game container but keep it for reuse
    const gameContainer = document.getElementById('game-container');
    if (gameContainer) {
      gameContainer.innerHTML = '';
    }
  }

  private gameLoop(): void {
    if (!this.isActive || !this.player) return;

    this.player.update(this.keys);
    
    this.animationFrameId = requestAnimationFrame(() => this.gameLoop());
  }
}


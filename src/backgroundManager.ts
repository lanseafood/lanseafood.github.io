// BackgroundManager - Manages background switching based on navigation

import { StartBackground } from './backgrounds/StartBackground';
import { ProjectsBackground } from './backgrounds/ProjectsBackground';
import { ArtBackground } from './backgrounds/ArtBackground';
import { ConnectBackground } from './backgrounds/ConnectBackground';

declare const $: any;

export class BackgroundManager {
  private container: HTMLElement;
  private currentBackground: StartBackground | ProjectsBackground | ArtBackground | ConnectBackground | null = null;

  constructor(containerId: string) {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Background container with id "${containerId}" not found`);
    }
    this.container = container;
  }

  public switchToBackground(type: 'home' | 'projects' | 'art' | 'connect'): void {
    // Destroy current background
    if (this.currentBackground) {
      this.currentBackground.destroy();
      this.currentBackground = null;
    }

    // Create new background based on type
    switch (type) {
      case 'home':
        this.currentBackground = new StartBackground(this.container);
        break;
      case 'projects':
        this.currentBackground = new ProjectsBackground(this.container);
        break;
      case 'art':
        this.currentBackground = new ArtBackground(this.container);
        break;
      case 'connect':
        this.currentBackground = new ConnectBackground(this.container);
        break;
    }
  }
}

// Initialize background manager when DOM is ready
$(document).ready(function(): void {
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
  (window as any).bgManager = bgManager;
});


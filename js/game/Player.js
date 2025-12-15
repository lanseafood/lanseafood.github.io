// Player - Main player sprite with animations and physics
export class Player {
    // Get physics values based on current background type
    getGravity() {
        return this.backgroundType === 'projects' ? this.LUNAR_GRAVITY : this.EARTH_GRAVITY;
    }
    getJumpStrength() {
        return this.backgroundType === 'projects' ? this.LUNAR_JUMP_STRENGTH : this.EARTH_JUMP_STRENGTH;
    }
    getWalkSpeed() {
        return this.backgroundType === 'projects' ? this.LUNAR_WALK_SPEED : this.EARTH_WALK_SPEED;
    }
    constructor(container, backgroundType = 'home') {
        this.backgroundType = 'home';
        this.x = 0;
        this.y = 0;
        this.velocityX = 0;
        this.velocityY = 0;
        this.isGrounded = true;
        this.facingRight = true;
        this.currentAnimation = 'idle';
        this.animationFrame = 0;
        this.animationTimer = 0;
        this.groundLevel = 0; // The horizontal plane the player stands on (y position)
        // Physics constants
        this.EARTH_GRAVITY = 0.8;
        this.LUNAR_GRAVITY = 0.8 / 6; // Lunar gravity is ~1/6th of Earth's (~0.133)
        this.EARTH_JUMP_STRENGTH = 18; // Jump strength on Earth
        // Lunar jump: slower initial velocity (~12) but reaches higher peak due to 1/6th gravity
        // Peak height formula: h = v^2 / (2*g)
        // Earth: 18^2 / (2*0.8) = 202.5
        // Moon: 12^2 / (2*0.133) = 144 / 0.266 = 541 (much higher!)
        this.LUNAR_JUMP_STRENGTH = 12; // Slower than Earth (12 vs 18) but higher peak
        this.EARTH_WALK_SPEED = 5;
        this.LUNAR_WALK_SPEED = 5 * 0.5; // Lunar walk is slower (~2.5)
        this.VERTICAL_SPEED = 4; // Speed for up/down arrow movement
        this.jumpPressed = false; // Track if jump was just pressed
        // Animation timing (frames per animation cycle)
        this.ANIMATION_SPEED = 0.15;
        this.IDLE_FRAMES = 4;
        this.WALK_FRAMES = 4;
        this.JUMP_FRAMES = 2;
        this.container = container;
        this.backgroundType = backgroundType;
        this.calculateGroundY(backgroundType);
        this.createPlayer();
        this.centerPlayer();
    }
    calculateGroundY(backgroundType) {
        // Ground is now at the bottom of the container (0)
        // Container height matches surface height
        this.GROUND_Y = 0; // Ground is at bottom of container
    }
    createPlayer() {
        this.element = document.createElement('div');
        this.element.className = 'game-player';
        this.element.style.position = 'absolute';
        this.element.style.width = '80px';
        this.element.style.height = '80px';
        this.element.style.zIndex = '100'; // Above background, below content
        this.element.style.pointerEvents = 'none';
        this.element.style.backgroundColor = '#ff0000'; // Bright red for visibility
        this.element.style.border = '4px solid #000';
        this.updateAnimation();
        this.container.appendChild(this.element);
    }
    centerPlayer() {
        const containerWidth = this.container.offsetWidth || window.innerWidth;
        this.x = (containerWidth - 80) / 2; // Center horizontally
        // Start at 15vh from bottom (middle of 30vh surface)
        const targetY = window.innerHeight * 0.15; // 15vh in pixels
        this.groundLevel = targetY; // Set initial ground level
        this.y = targetY; // Start at ground level
        this.updateAnimation();
    }
    setContainer(newContainer, backgroundType = 'home') {
        // Store current position, ground level, and y position before switching
        const currentX = this.x;
        const currentGroundLevel = this.groundLevel;
        const currentY = this.y;
        const wasGrounded = this.isGrounded;
        // Remove from old container
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        // Update container and recalculate ground
        this.container = newContainer;
        this.backgroundType = backgroundType;
        this.calculateGroundY(backgroundType);
        // Reattach to new container
        newContainer.appendChild(this.element);
        // Restore position (preserve x, ground level, and y when switching between backgrounds)
        const containerWidth = this.container.offsetWidth || window.innerWidth;
        const containerHeight = this.container.offsetHeight || (window.innerHeight * 0.6); // Container is 60vh
        // Keep the same horizontal position when switching
        this.x = Math.max(0, Math.min(currentX, containerWidth - 80));
        // Keep ground level, but ensure it's within bounds (0 to 30vh)
        // Max ground level is 30vh (top of surface), matching the update() method
        const maxGroundLevel = window.innerHeight * 0.3;
        this.groundLevel = Math.max(0, Math.min(currentGroundLevel, maxGroundLevel));
        // Preserve y position if player was in the air, otherwise use ground level
        // This ensures the player stays at the same visual position when switching
        if (!wasGrounded && currentY > currentGroundLevel) {
            // Player was jumping, preserve jump height relative to ground level
            const jumpOffset = currentY - currentGroundLevel;
            this.y = Math.min(this.groundLevel + jumpOffset, containerHeight - 80);
            this.isGrounded = false;
        }
        else {
            // Player was on ground, preserve their exact y position (which should equal groundLevel)
            // But if there's a mismatch, use groundLevel
            this.y = Math.max(this.groundLevel, Math.min(currentY, containerHeight - 80));
            // If y equals groundLevel, player is grounded
            if (Math.abs(this.y - this.groundLevel) < 1) {
                this.y = this.groundLevel;
                this.isGrounded = true;
                this.velocityY = 0; // Reset velocity when switching while grounded
            }
            else {
                this.isGrounded = false;
            }
        }
        this.updateAnimation();
    }
    update(keys) {
        const containerWidth = this.container.offsetWidth || window.innerWidth;
        const containerHeight = this.container.offsetHeight || (window.innerHeight * 0.6); // Container is 60vh
        const playerHeight = 80;
        // Max ground level is 30vh (top of grass/lunar surface), not container height
        const maxGroundLevel = window.innerHeight * 0.3; // Top of surface (30vh) so player can stand on top of it
        // Handle horizontal movement (slower on lunar surface)
        this.velocityX = 0;
        const walkSpeed = this.getWalkSpeed();
        if (keys.left) {
            this.velocityX = -walkSpeed;
            this.facingRight = false;
            if (this.isGrounded) {
                this.setAnimation('walk');
            }
        }
        else if (keys.right) {
            this.velocityX = walkSpeed;
            this.facingRight = true;
            if (this.isGrounded) {
                this.setAnimation('walk');
            }
        }
        else if (this.isGrounded) {
            this.setAnimation('idle');
        }
        // Handle up/down arrows - shift the ground level (horizontal plane player stands on)
        if (keys.up) {
            // Move ground level up (increase groundLevel)
            this.groundLevel += this.VERTICAL_SPEED;
            this.groundLevel = Math.min(this.groundLevel, maxGroundLevel); // Can't go above top of grass
            // If player is on ground, move them with the ground level
            if (this.isGrounded) {
                this.y = this.groundLevel;
            }
        }
        else if (keys.down) {
            // Move ground level down (decrease groundLevel)
            this.groundLevel -= this.VERTICAL_SPEED;
            this.groundLevel = Math.max(this.groundLevel, 0); // Can't go below bottom
            // If player is on ground, move them with the ground level
            if (this.isGrounded) {
                this.y = this.groundLevel;
            }
        }
        // Handle jumping - only spacebar (with gravity)
        // Jump always returns to the same ground level it started from
        // Weaker jump on lunar surface
        if (keys.space && this.isGrounded && !this.jumpPressed) {
            this.velocityY = this.getJumpStrength();
            this.isGrounded = false;
            this.jumpPressed = true;
            this.setAnimation('jump');
        }
        // Reset jump flag when space is released
        if (!keys.space) {
            this.jumpPressed = false;
        }
        // Apply gravity ONLY when jumping (not grounded)
        // Use lunar gravity on projects page, Earth gravity on home page
        if (!this.isGrounded) {
            // Apply gravity continuously during jump (decreases upward velocity)
            this.velocityY -= this.getGravity();
            this.setAnimation('jump');
        }
        // Update position
        this.x += this.velocityX;
        this.y += this.velocityY;
        // Horizontal bounds
        this.x = Math.max(0, Math.min(this.x, containerWidth - playerHeight));
        // Ground collision - player lands on their ground level
        if (this.y <= this.groundLevel) {
            this.y = this.groundLevel;
            this.velocityY = 0;
            this.isGrounded = true;
            this.jumpPressed = false; // Reset jump flag when grounded
            if (this.velocityX === 0) {
                this.setAnimation('idle');
            }
        }
        // Prevent going above container
        if (this.y >= containerHeight - playerHeight) {
            this.y = containerHeight - playerHeight;
            this.velocityY = 0;
        }
        this.updateAnimation();
    }
    setAnimation(animation) {
        if (this.currentAnimation !== animation) {
            this.currentAnimation = animation;
            this.animationFrame = 0;
            this.animationTimer = 0;
        }
    }
    updateAnimation() {
        this.animationTimer += this.ANIMATION_SPEED;
        let maxFrames;
        switch (this.currentAnimation) {
            case 'idle':
                maxFrames = this.IDLE_FRAMES;
                break;
            case 'walk':
                maxFrames = this.WALK_FRAMES;
                break;
            case 'jump':
                maxFrames = this.JUMP_FRAMES;
                break;
            default:
                // Fallback to idle if animation type is unexpected
                maxFrames = this.IDLE_FRAMES;
                break;
        }
        if (this.animationTimer >= 1) {
            this.animationFrame = (this.animationFrame + 1) % maxFrames;
            this.animationTimer = 0;
        }
        // Update sprite position and appearance
        // Position from bottom of container
        // y=0 is at bottom (ground), y increases as you move up in the container
        // For CSS bottom positioning, we use y directly (y=0 means bottom: 0)
        this.element.style.left = `${this.x}px`;
        this.element.style.bottom = `${this.y}px`;
        this.element.style.transform = this.facingRight ? 'scaleX(1)' : 'scaleX(-1)';
        // Debug: Make sure it's visible
        this.element.style.display = 'block';
        this.element.style.visibility = 'visible';
        this.element.style.opacity = '1';
        this.updateSpriteVisual();
    }
    updateSpriteVisual() {
        // Create temporary sprite using CSS (will be replaced with images later)
        const frame = this.animationFrame;
        const anim = this.currentAnimation;
        // Simple colored rectangle as placeholder - make it very visible
        const color = this.getColorForAnimation(anim, frame);
        this.element.style.backgroundColor = color;
        this.element.style.borderRadius = '8px';
        this.element.style.border = '4px solid #000';
        this.element.style.boxShadow = '0 4px 8px rgba(0,0,0,0.7)';
        // Add a simple face/character indicator
        this.element.innerHTML = '';
        const face = document.createElement('div');
        face.style.position = 'absolute';
        face.style.top = '12px';
        face.style.left = '20px';
        face.style.width = '40px';
        face.style.height = '40px';
        face.style.backgroundColor = '#fff';
        face.style.borderRadius = '50%';
        face.style.border = '3px solid #000';
        // Eyes
        const eye1 = document.createElement('div');
        eye1.style.position = 'absolute';
        eye1.style.top = '10px';
        eye1.style.left = '10px';
        eye1.style.width = '8px';
        eye1.style.height = '8px';
        eye1.style.backgroundColor = '#000';
        eye1.style.borderRadius = '50%';
        face.appendChild(eye1);
        const eye2 = document.createElement('div');
        eye2.style.position = 'absolute';
        eye2.style.top = '10px';
        eye2.style.right = '10px';
        eye2.style.width = '8px';
        eye2.style.height = '8px';
        eye2.style.backgroundColor = '#000';
        eye2.style.borderRadius = '50%';
        face.appendChild(eye2);
        this.element.appendChild(face);
    }
    getColorForAnimation(anim, frame) {
        // Different colors for different animations
        switch (anim) {
            case 'idle':
                return '#4a90e2';
            case 'walk':
                const walkColors = ['#4a90e2', '#5aa0f2', '#4a90e2', '#3a80d2'];
                return walkColors[frame % walkColors.length];
            case 'jump':
                return '#e24a4a';
            default:
                return '#4a90e2';
        }
    }
    updatePosition() {
        // Position is handled by transform in updateAnimation
    }
    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
    // Get player position for collision detection
    getPosition() {
        return {
            x: this.x,
            y: this.y,
            width: 80,
            height: 80
        };
    }
}
//# sourceMappingURL=Player.js.map
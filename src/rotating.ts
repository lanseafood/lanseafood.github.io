// THREE.js is loaded globally via script tag
declare const THREE: any;

let cube: any;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 200, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, 200);
document.body.appendChild(renderer.domElement);

// Making 'box' or cube
const geometry = new THREE.BoxGeometry(1, 1, 1);

// Create canvas texture with letter "M"
function createMTexture(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Clear canvas with transparent background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw letter "M"
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 180px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('M', canvas.width / 2, canvas.height / 2);
  }
  
  return canvas;
}

// Create texture from canvas
const canvas = createMTexture();
const texture = new THREE.CanvasTexture(canvas);
texture.needsUpdate = true;

// Create material with transparent faces and "M" texture
const material = new THREE.MeshBasicMaterial({ 
  map: texture,
  transparent: true,
  opacity: 0.9,
  side: THREE.DoubleSide
});

cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0, 0);

scene.add(cube);

camera.position.set(0, 0, 2.5);

// Continuous random rotation animation
let currentAxis = 1; // Start with Y axis
let currentDirection = 1;
let rotationCount = 0;
let targetRotations = 1; // Always do exactly 1 full rotation (360 degrees)
const rotationSpeed = 0.01; // Slow rotation speed

function pickNewRotation(): void {
  // Pick a random axis (x, y, or z)
  currentAxis = Math.floor(Math.random() * 3);
  // Pick a random direction
  currentDirection = Math.random() > 0.5 ? 1 : -1;
  rotationCount = 0;
  targetRotations = 1; // Always 360 degrees
}

function render(): void {
  requestAnimationFrame(render);
  
  const speed = rotationSpeed * currentDirection;
  rotationCount += Math.abs(speed);
  
  // Apply rotation based on current axis
  if (currentAxis === 0) {
    cube.rotation.x += speed;
  } else if (currentAxis === 1) {
    cube.rotation.y += speed;
  } else {
    cube.rotation.z += speed;
  }
  
  // After completing 360 degrees, pick a new random axis and direction
  if (rotationCount >= Math.PI * 2) {
    pickNewRotation();
  }
  
  renderer.render(scene, camera);
}

// Initialize with a random rotation
pickNewRotation();
render();


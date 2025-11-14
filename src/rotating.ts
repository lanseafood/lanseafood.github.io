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

// Commented out texture loading code for reference
// const loader = new THREE.TextureLoader();
// loader.load(
//   "images/llogo.png",
//   function(image) {
//     const material = new THREE.MeshBasicMaterial({ 
//       map: image
//     });
//     cube = new THREE.Mesh(geometry, material);
//     cube.position.set(0, 0, 0);
//     scene.add(cube);
//   }
// );

const material = new THREE.MeshBasicMaterial({ 
  color: 0xffffff 
});
cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0, 0);

scene.add(cube);

camera.position.set(0, 0, 2.5);

function render(): void {
  requestAnimationFrame(render);
  cube.rotation.y -= 0.01;
  renderer.render(scene, camera);
}

render();


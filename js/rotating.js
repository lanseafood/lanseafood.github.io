


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / 200, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer( { alpha: true } );
renderer.setSize( window.innerWidth, 200 );
document.body.appendChild( renderer.domElement );

//making 'box' or M 
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
var cube = new THREE.Mesh( geometry, material );
cube.position.set(0,0,0);

scene.add( cube );

// camera.position.z = 5;
camera.position.set(0,0,5);
function render() {
	requestAnimationFrame( render );
	cube.rotation.y -= 0.01;
	renderer.render( scene, camera );
}
render();

 

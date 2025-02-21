// script.js
// Initialize Three.js Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0xffffff, 1); // Set white background

// Light Settings
const light = new THREE.PointLight(0xffffff, 2);
light.position.set(5, 5, 5);
scene.add(light);

// Create Cubic Ring
const cubeGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3); // Smaller cubes
const cubeMaterial = new THREE.MeshStandardMaterial({
  color: 0x4a90e2,
  metalness: 0.3,
  roughness: 0.7,
});

const cubes = [];
const ringRadius = 0.7; // Smaller ring radius
const segments = 100; // Number of cubes in the ring

for (let i = 0; i < segments; i++) {
  let angle = (i / segments) * Math.PI * 2;
  let x = Math.cos(angle) * ringRadius;
  let y = Math.sin(angle) * ringRadius;
  let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.set(x, y, 0);
  cube.rotation.z = angle; // Rotate cubes to align with the ring
  cubes.push(cube);
  scene.add(cube);
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  cubes.forEach((cube) => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  });
  scene.rotation.z += 0.005; // Rotate the entire structure
  renderer.render(scene, camera);
  updateFPS();
}
animate();

// Responsive Resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

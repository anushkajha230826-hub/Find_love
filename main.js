import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";

// =====================
// SCENE
// =====================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// =====================
// CAMERA
// =====================
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 1.5, 6);

// =====================
// RENDERER
// =====================
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// =====================
// LIGHTS
// =====================
scene.add(new THREE.AmbientLight(0xffffff, 0.8));

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

// =====================
// FLOOR
// =====================
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 30),
  new THREE.MeshStandardMaterial({ color: 0x222222 })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// =====================
// LOADER
// =====================
const loader = new GLTFLoader();

let monkey, penguin, villain;

// =====================
// LOAD MONKEY (BF)
// =====================
loader.load(
  "./monkey.glb",
  (gltf) => {
    monkey = gltf.scene;
    monkey.scale.set(1, 1, 1);
    monkey.position.set(-1.5, 0, 0);
    scene.add(monkey);
    console.log("🐒 Monkey loaded");
  },
  undefined,
  (err) => console.error("Monkey error", err)
);

// =====================
// LOAD PENGUIN (GF)
// =====================
loader.load(
  "./penguin.glb",
  (gltf) => {
    penguin = gltf.scene;
    penguin.scale.set(1, 1, 1);
    penguin.position.set(1.5, 0, 0);
    scene.add(penguin);
    console.log("🐧 Penguin loaded");
  },
  undefined,
  (err) => console.error("Penguin error", err)
);

// =====================
// LOAD VILLAIN
// =====================
loader.load(
  "./villain.glb",
  (gltf) => {
    villain = gltf.scene;
    villain.scale.set(1, 1, 1);
    villain.position.set(0, 0, -3);
    scene.add(villain);
    console.log("👿 Villain loaded");
  },
  undefined,
  (err) => console.error("Villain error", err)
);

// =====================
// RESIZE
// =====================
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// =====================
// ANIMATION LOOP
// =====================
function animate() {
  requestAnimationFrame(animate);

  if (monkey) monkey.rotation.y += 0.005;
  if (penguin) penguin.rotation.y -= 0.005;
  if (villain) villain.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();

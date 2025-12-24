// ===== IMPORT THREE.JS (ES MODULES) =====
import * as THREE from "https://unpkg.com/three@0.155.0/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.155.0/examples/jsm/loaders/GLTFLoader.js";

// ===== SCENE =====
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// ===== CAMERA =====
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 3, 10);
camera.lookAt(0, 1, 0);

// ===== RENDERER =====
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// ===== LIGHTS =====
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

// ===== FLOOR =====
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 30),
  new THREE.MeshStandardMaterial({ color: 0x555555 })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// ===== DEBUG CUBE (CONFIRMS CAMERA WORKS) =====
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: 0xff0000 })
);
cube.position.set(0, 0.5, 0);
scene.add(cube);

// ===== LOADER =====
const loader = new GLTFLoader();

// ===== MONKEY =====
loader.load(
  "./monkey.glb",
  (gltf) => {
    const monkey = gltf.scene;
    monkey.scale.set(1, 1, 1);
    monkey.position.set(-3, 0, 0);
    scene.add(monkey);
    console.log("✅ MONKEY LOADED");
  },
  undefined,
  (err) => console.error("❌ MONKEY ERROR", err)
);

// ===== PENGUIN =====
loader.load(
  "./penguin.glb",
  (gltf) => {
    const penguin = gltf.scene;
    penguin.scale.set(1, 1, 1);
    penguin.position.set(3, 0, 0);
    scene.add(penguin);
    console.log("✅ PENGUIN LOADED");
  },
  undefined,
  (err) => console.error("❌ PENGUIN ERROR", err)
);

// ===== VILLAIN =====
loader.load(
  "./villain.glb",
  (gltf) => {
    const villain = gltf.scene;
    villain.scale.set(1, 1, 1);
    villain.position.set(0, 0, -4);
    scene.add(villain);
    console.log("✅ VILLAIN LOADED");
  },
  undefined,
  (err) => console.error("❌ VILLAIN ERROR", err)
);

// ===== RESIZE HANDLER =====
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ===== ANIMATE =====
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

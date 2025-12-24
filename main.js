import * as THREE from "https://unpkg.com/three@0.155.0/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.155.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1.5, 4);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Light
const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5);
scene.add(light);

// Loader
const loader = new GLTFLoader();

function loadModel(path, x) {
  loader.load(
    path,
    (gltf) => {
      const model = gltf.scene;
      model.position.set(x, 0, 0);
      model.scale.set(1, 1, 1);
      scene.add(model);
    },
    undefined,
    (e) => console.error("LOAD FAILED", e)
  );
}

// ⚠️ PATHS MUST MATCH EXACTLY
loadModel("./models/monkey.glb", -1.5);
loadModel("./models/penguin.glb", 1.5);
loadModel("./models/villain.glb", 0);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

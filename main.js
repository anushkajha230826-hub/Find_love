// ============================
// BASIC THREE.JS SETUP
// ============================

alert("JS IS RUNNING");

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/loaders/GLTFLoader.js";

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Camera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 1.5, 6);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// ============================
// LIGHTS
// ============================

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

// ============================
// FLOOR
// ============================

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({ color: 0x222222 })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// ============================
// LOAD MODELS
// ============================

const loader = new GLTFLoader();

let monkey, penguin, villain;

function loadModel(path, xPos, name) {
  loader.load(
    path,
    (gltf) => {
      const model = gltf.scene;
      model.scale.set(1, 1, 1);
      model.position.set(xPos, 0, 0);
      scene.add(model);

      console.log(name + " LOADED");

      if (name === "MONKEY") monkey = model;
      if (name === "PENGUIN") penguin = model;
      if (name === "VILLAIN") villain = model;
    },
    undefined,
    (err) => {
      console.error(name + " ERROR", err);
    }
  );
}

// ⚠️ IMPORTANT: files are in ROOT, NOT models folder
loadModel("/monkey.glb", -2, "MONKEY");
loadModel("/penguin.glb", 2, "PENGUIN");
loadModel("/villain.glb", 0, "VILLAIN");

// ============================
// RESIZE
// ============================

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ============================
// ANIMATION LOOP
// ============================

function animate() {
  requestAnimationFrame(animate);

  if (villain) villain.rotation.y += 0.01;
  if (monkey) monkey.rotation.y += 0.005;
  if (penguin) penguin.rotation.y -= 0.005;

  renderer.render(scene, camera);
}

animate();

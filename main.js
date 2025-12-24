window.onload = () => {

  // SCENE
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  // CAMERA
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 1.5, 6);

  // RENDERER
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  // LIGHTS
  scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 5);
  scene.add(light);

  // FLOOR
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: 0x222222 })
  );
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  // LOADER
  const loader = new THREE.GLTFLoader();

  let monkey, penguin, villain;

  // MONKEY
  loader.load(
    "./monkey.glb",
    (gltf) => {
      monkey = gltf.scene;
      monkey.position.set(-2, 0, 0);
      scene.add(monkey);
      console.log("MONKEY LOADED");
    },
    undefined,
    (e) => console.error("MONKEY ERROR", e)
  );

  // PENGUIN
  loader.load(
    "./penguin.glb",
    (gltf) => {
      penguin = gltf.scene;
      penguin.position.set(2, 0, 0);
      scene.add(penguin);
      console.log("PENGUIN LOADED");
    },
    undefined,
    (e) => console.error("PENGUIN ERROR", e)
  );

  // VILLAIN
  loader.load(
    "./villain.glb",
    (gltf) => {
      villain = gltf.scene;
      villain.position.set(0, 0, -3);
      scene.add(villain);
      console.log("VILLAIN LOADED");
    },
    undefined,
    (e) => console.error("VILLAIN ERROR", e)
  );

  // ANIMATE
  function animate() {
    requestAnimationFrame(animate);
    if (villain) villain.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  animate();

  // RESIZE
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
};

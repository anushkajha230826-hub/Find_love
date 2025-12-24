window.onload = function() {
  // Canvas setup
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = Math.max(window.innerWidth, window.innerHeight); // horizontal layout
  canvas.height = Math.min(window.innerWidth, window.innerHeight);

  // Load images
  const monkey = new Image();
  monkey.src = "monkey.png";

  const penguin = new Image();
  penguin.src = "penguin.png";

  const villain = new Image();
  villain.src = "villain.png";

  // Character positions
  let monkeyPos = { x: 50, y: canvas.height / 2 - 75 };
  const penguinPos = { x: 350, y: canvas.height / 2 - 75 };
  const villainPos = { x: 650, y: canvas.height / 2 - 75 };

  // Monkey movement
  let targetPos = { x: monkeyPos.x, y: monkeyPos.y };

  // Tap/click to move
  canvas.addEventListener('click', (e) => {
    targetPos.x = e.clientX - 75;
    targetPos.y = e.clientY - 75;
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background (fake 3D shadow effect)
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Move monkey towards target
    const dx = targetPos.x - monkeyPos.x;
    const dy = targetPos.y - monkeyPos.y;
    monkeyPos.x += dx * 0.1;
    monkeyPos.y += dy * 0.1;

    // Draw characters
    ctx.drawImage(monkey, monkeyPos.x, monkeyPos.y, 150, 150);
    ctx.drawImage(penguin, penguinPos.x, penguinPos.y, 150, 150);
    ctx.drawImage(villain, villainPos.x, villainPos.y, 150, 150);

    requestAnimationFrame(draw);
  }

  // Start drawing after all images load
  let imagesLoaded = 0;
  [monkey, penguin, villain].forEach(img => {
    img.onload = () => {
      imagesLoaded++;
      if (imagesLoaded === 3) draw();
    };
  });
};  ctx.drawImage(monkey, player.x, player.y, player.w, player.h);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

// Start only after images load
Promise.all([
  new Promise(r => monkey.onload = r),
  new Promise(r => penguin.onload = r),
  new Promise(r => villain.onload = r)
]).then(loop);

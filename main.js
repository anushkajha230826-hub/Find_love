const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const rotateUI = document.getElementById("rotate");

function resize() {
  if (window.innerWidth < window.innerHeight) {
    rotateUI.style.display = "flex";
  } else {
    rotateUI.style.display = "none";
  }

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// Load images
const monkey = new Image();
monkey.src = "monkey.png";

const penguin = new Image();
penguin.src = "penguin.png";

const villain = new Image();
villain.src = "villain.png";

const player = {
  x: 100,
  y: canvas.height / 2,
  w: 120,
  h: 120,
  targetX: 100,
  targetY: canvas.height / 2
};

const goal = {
  x: () => canvas.width - 200,
  y: () => canvas.height / 2,
  w: 140,
  h: 140
};

const enemy = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  w: 160,
  h: 160,
  dir: 1
};

// Tap / click movement
function move(e) {
  const touch = e.touches ? e.touches[0] : e;
  player.targetX = touch.clientX - player.w / 2;
  player.targetY = touch.clientY - player.h / 2;
}

canvas.addEventListener("click", move);
canvas.addEventListener("touchstart", move);

// Collision
function hit(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );
}

function update() {
  // Smooth movement
  player.x += (player.targetX - player.x) * 0.08;
  player.y += (player.targetY - player.y) * 0.08;

  // Enemy floating movement
  enemy.y += enemy.dir * 1.5;
  if (enemy.y < 100 || enemy.y > canvas.height - 200) enemy.dir *= -1;

  // Win
  if (hit(player, { ...goal, x: goal.x(), y: goal.y() })) {
    alert("You found love 🖤");
    location.reload();
  }

  // Lose
  if (hit(player, enemy)) {
    alert("Consumed by darkness");
    location.reload();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Subtle floor glow
  const g = ctx.createLinearGradient(0, canvas.height, 0, 0);
  g.addColorStop(0, "#000");
  g.addColorStop(1, "#111");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Penguin (goal)
  ctx.drawImage(penguin, goal.x(), goal.y(), goal.w, goal.h);

  // Villain
  ctx.drawImage(villain, enemy.x, enemy.y, enemy.w, enemy.h);

  // Monkey (player)
  ctx.drawImage(monkey, player.x, player.y, player.w, player.h);
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

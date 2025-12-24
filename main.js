const monkey = document.getElementById("monkey");
const penguin = document.getElementById("penguin");
const villain = document.getElementById("villain");
const overlay = document.getElementById("overlay");

let monkeyPos = { x: window.innerWidth / 2, y: window.innerHeight - 150 };
let targetPos = { ...monkeyPos };

let villainPos = { x: 100, y: 100 };

function place(el, pos) {
  el.style.left = pos.x + "px";
  el.style.top = pos.y + "px";
}

place(monkey, monkeyPos);
place(villain, villainPos);

// random penguin location
place(penguin, {
  x: Math.random() * (window.innerWidth - 200) + 100,
  y: Math.random() * (window.innerHeight - 300) + 150
});

// tap / click to move
document.addEventListener("pointerdown", e => {
  targetPos.x = e.clientX;
  targetPos.y = e.clientY;
});

// distance helper
function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

// game loop
function animate() {
  // monkey movement (smooth)
  monkeyPos.x += (targetPos.x - monkeyPos.x) * 0.08;
  monkeyPos.y += (targetPos.y - monkeyPos.y) * 0.08;
  place(monkey, monkeyPos);

  // villain slow chase
  villainPos.x += (monkeyPos.x - villainPos.x) * 0.01;
  villainPos.y += (monkeyPos.y - villainPos.y) * 0.01;
  place(villain, villainPos);

  // lose condition
  if (dist(monkeyPos, villainPos) < 80) {
    endGame("YOU WERE FOUND");
  }

  // win condition
  const penguinPos = {
    x: penguin.offsetLeft,
    y: penguin.offsetTop
  };

  if (dist(monkeyPos, penguinPos) < 80) {
    endGame("FOUND LOVE");
  }

  requestAnimationFrame(animate);
}

function endGame(text) {
  overlay.innerText = text;
  overlay.style.display = "flex";
  document.removeEventListener("pointerdown", () => {});
}

animate();

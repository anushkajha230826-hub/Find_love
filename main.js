const monkey = document.getElementById("monkey");
const penguin = document.getElementById("penguin");
const villain = document.getElementById("villain");
const msg = document.getElementById("msg");

let monkeyX = 50;
let gameEnded = false;

function moveMonkey() {
  if (gameEnded) return;

  monkeyX += 30;
  monkey.style.left = monkeyX + "px";

  checkCollision();
}

function checkCollision() {
  const m = monkey.getBoundingClientRect();
  const p = penguin.getBoundingClientRect();
  const v = villain.getBoundingClientRect();

  // Monkey hits villain
  if (intersect(m, v)) {
    msg.innerText = "💀 Villain blocked you!";
    shake(villain);
    monkeyX = 50;
    monkey.style.left = monkeyX + "px";
  }

  // Monkey reaches penguin
  if (intersect(m, p)) {
    msg.innerText = "🫂 Love Found!";
    gameEnded = true;
    hug();
  }
}

function intersect(a, b) {
  return !(
    a.right < b.left ||
    a.left > b.right ||
    a.bottom < b.top ||
    a.top > b.bottom
  );
}

function shake(el) {
  el.style.animation = "none";
  el.offsetHeight;
  el.style.animation = "shake 0.4s";
}

function hug() {
  penguin.style.transform = "scale(1.1)";
  monkey.style.transform = "scale(1.1)";
}

// tap / click
document.body.addEventListener("click", moveMonkey);

// villain idle movement
setInterval(() => {
  if (!gameEnded) {
    villain.style.left =
      40 + Math.sin(Date.now() / 600) * 10 + "%";
  }
}, 50);

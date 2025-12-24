const game = document.getElementById("game");

const width = window.innerWidth;
const height = window.innerHeight;

// ----- CREATE CHARACTER -----
function createCharacter(src, size) {
  const img = document.createElement("img");
  img.src = src;
  img.className = "character";
  img.style.width = size + "px";

  const shadow = document.createElement("div");
  shadow.className = "shadow";

  game.appendChild(shadow);
  game.appendChild(img);

  return { img, shadow };
}

// ----- CHARACTERS -----
const monkey = createCharacter("monkey.png", 120);
const penguin = createCharacter("penguin.png", 110);
const villain = createCharacter("villain.png", 130);

// ----- POSITIONS -----
let monkeyPos = { x: width * 0.2, y: height * 0.6 };
let penguinPos = { x: width * 0.75, y: height * 0.55 };
let villainPos = { x: width * 0.5, y: height * 0.35 };

let target = { ...monkeyPos };

// ----- PLACE FUNCTION -----
function place(char, pos, scale = 1) {
  char.img.style.left = pos.x + "px";
  char.img.style.top = pos.y + "px";
  char.img.style.transform = `translate(-50%, -50%) scale(${scale})`;

  char.shadow.style.left = pos.x + "px";
  char.shadow.style.top = (pos.y + 55) + "px";
}

// ----- INITIAL DRAW -----
place(monkey, monkeyPos, 1);
place(penguin, penguinPos, 0.9);
place(villain, villainPos, 1.05);

// ----- DEPTH EFFECT -----
function depthScale(y) {
  return 0.8 + (y / height) * 0.4;
}

// ----- MOVE -----
game.addEventListener("click", (e) => {
  target.x = e.clientX;
  target.y = e.clientY;
});

// ----- GAME LOOP -----
function update() {
  monkeyPos.x += (target.x - monkeyPos.x) * 0.08;
  monkeyPos.y += (target.y - monkeyPos.y) * 0.08;

  place(monkey, monkeyPos, depthScale(monkeyPos.y));
  place(penguin, penguinPos, depthScale(penguinPos.y));
  place(villain, villainPos, depthScale(villainPos.y));

  requestAnimationFrame(update);
}

update();

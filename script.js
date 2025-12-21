const puzzle = document.getElementById("puzzle");
const shuffleBtn = document.getElementById("shuffleBtn");
const adminBtn = document.getElementById("adminBtn");
const solveBtn = document.getElementById("solveBtn");
const movesText = document.getElementById("moves");

let tiles = [];
let moves = 0;
let adminAccess = false;

function createPuzzle() {
  puzzle.innerHTML = "";
  tiles = [];
  moves = 0;
  movesText.textContent = moves;

  for (let i = 0; i < 9; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");

    if (i === 8) {
      tile.classList.add("empty");
    } else {
      const x = (i % 3) * -100;
      const y = Math.floor(i / 3) * -100;
      tile.style.backgroundPosition = `${x}px ${y}px`;
    }

    tile.dataset.index = i;
    tile.addEventListener("click", () => moveTile(i));
    tiles.push(tile);
    puzzle.appendChild(tile);
  }
}

function moveTile(index) {
  const emptyIndex = tiles.findIndex(t => t.classList.contains("empty"));

  const validMoves = [
    emptyIndex - 1,
    emptyIndex + 1,
    emptyIndex - 3,
    emptyIndex + 3
  ];

  if (!validMoves.includes(index)) return;

  puzzle.insertBefore(tiles[index], tiles[emptyIndex]);
  [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];

  moves++;
  movesText.textContent = moves;
}

function shufflePuzzle() {
  for (let i = 0; i < 100; i++) {
    const emptyIndex = tiles.findIndex(t => t.classList.contains("empty"));
    const movesArr = [
      emptyIndex - 1,
      emptyIndex + 1,
      emptyIndex - 3,
      emptyIndex + 3
    ].filter(i => i >= 0 && i < 9);

    const rand = movesArr[Math.floor(Math.random() * movesArr.length)];
    moveTile(rand);
  }
  moves = 0;
  movesText.textContent = moves;
}

function solvePuzzle() {
  if (!adminAccess) return;
  createPuzzle();
}

adminBtn.addEventListener("click", () => {
  adminAccess = true;
  solveBtn.disabled = false;
  alert("Admin access granted");
});

shuffleBtn.addEventListener("click", shufflePuzzle);
solveBtn.addEventListener("click", solvePuzzle);

createPuzzle();

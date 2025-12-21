// ================================
// DOM
// ================================
const modeScreen = document.getElementById("modeScreen");
const game = document.getElementById("game");
const puzzle = document.getElementById("puzzle");
const movesEl = document.getElementById("moves");
const solveBtn = document.getElementById("solveBtn");

// ================================
// STATE
// ================================
let tiles = [1, 2, 3, 4, 5, 6, 7, 8, null];
let moves = 0;
let isAdmin = false;

// ================================
// MODE
// ================================
function startNormal() {
    isAdmin = false;
    solveBtn.style.display = "none";

    modeScreen.style.display = "none";
    game.style.display = "block";
    init();
}

function startAdmin() {
    const pwd = prompt("Enter admin password:");
    if (pwd === "67") {
        isAdmin = true;
        solveBtn.style.display = "inline-block";

        modeScreen.style.display = "none";
        game.style.display = "block";
        init();
    } else {
        alert("Wrong password");
    }
}

// ================================
// INIT
// ================================
function init() {
    moves = 0;
    movesEl.textContent = "Moves: 0";
    draw();
}

// ================================
// DRAW
// ================================
function draw() {
    puzzle.innerHTML = "";

    tiles.forEach((v, i) => {
        const tile = document.createElement("div");

        if (v === null) {
            tile.className = "tile empty";
        } else {
            tile.className = "tile";
            tile.style.backgroundPosition =
                `${-((v - 1) % 3) * 100}px ${-Math.floor((v - 1) / 3) * 100}px`;
            tile.onclick = () => move(i);
        }

        puzzle.appendChild(tile);
    });

    if (isSolved()) {
        puzzle.classList.add("win");
    } else {
        puzzle.classList.remove("win");
    }
}

// ================================
// MOVE LOGIC
// ================================
function move(index) {
    const empty = tiles.indexOf(null);

    const r = Math.floor(index / 3);
    const c = index % 3;
    const er = Math.floor(empty / 3);
    const ec = empty % 3;

    const adjacent =
        (r === er && Math.abs(c - ec) === 1) ||
        (c === ec && Math.abs(r - er) === 1);

    if (!adjacent) return;

    [tiles[index], tiles[empty]] = [tiles[empty], tiles[index]];
    moves++;
    movesEl.textContent = "Moves: " + moves;
    draw();
}

// ================================
// SHUFFLE (SOLVABLE)
// ================================
function shuffle() {
    for (let i = 0; i < 150; i++) {
        randomMove();
    }
    moves = 0;
    movesEl.textContent = "Moves: 0";
    draw();
}

function randomMove() {
    const empty = tiles.indexOf(null);
    const options = [];

    const r = Math.floor(empty / 3);
    const c = empty % 3;

    if (r > 0) options.push(empty - 3);
    if (r < 2) options.push(empty + 3);
    if (c > 0) options.push(empty - 1);
    if (c < 2) options.push(empty + 1);

    const choice = options[Math.floor(Math.random() * options.length)];
    [tiles[empty], tiles[choice]] = [tiles[choice], tiles[empty]];
}

// ================================
// SOLVE (ADMIN ONLY)
// ================================
function solvePuzzle() {
    if (!isAdmin) return;

    tiles = [1, 2, 3, 4, 5, 6, 7, 8, null];
    moves = 0;
    movesEl.textContent = "Moves: 0";
    draw();
}

// ================================
// SOLVED CHECK
// ================================
function isSolved() {
    for (let i = 0; i < 8; i++) {
        if (tiles[i] !== i + 1) return false;
    }
    return tiles[8] === null;
}

// ================================
// MOBILE SWIPE SUPPORT
// ================================
let startX = 0;
let startY = 0;

puzzle.addEventListener("touchstart", e => {
    const t = e.touches[0];
    startX = t.clientX;
    startY = t.clientY;
});

puzzle.addEventListener("touchend", e => {
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;

    const empty = tiles.indexOf(null);

    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 40) tryMove(empty - 1);
        else if (dx < -40) tryMove(empty + 1);
    } else {
        if (dy > 40) tryMove(empty - 3);
        else if (dy < -40) tryMove(empty + 3);
    }
});

function tryMove(i) {
    if (i >= 0 && i < 9) move(i);
}

// DOM
const modeScreen = document.getElementById("modeScreen");
const game = document.getElementById("game");
const puzzle = document.getElementById("puzzle");

// State
let tiles = [1, 2, 3, 4, 5, 6, 7, 8, null];

// ------------------
// MODE
// ------------------
function startNormal() {
    modeScreen.style.display = "none";
    game.style.display = "block";
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
            tile.textContent = ""; // IMPORTANT: remove numbers
            tile.onclick = () => move(i);
        }

        puzzle.appendChild(tile);
    });
}


// ------------------
// REAL SLIDE LOGIC
// ------------------
function moveTile(index) {
    const emptyIndex = tiles.indexOf(null);

    const row = Math.floor(index / 3);
    const col = index % 3;
    const erow = Math.floor(emptyIndex / 3);
    const ecol = emptyIndex % 3;

    const isAdjacent =
        (row === erow && Math.abs(col - ecol) === 1) ||
        (col === ecol && Math.abs(row - erow) === 1);

    if (isAdjacent) {
        [tiles[index], tiles[emptyIndex]] =
            [tiles[emptyIndex], tiles[index]];
        drawPuzzle();
    }
}

// ------------------
// SAFE SHUFFLE
// ------------------
function shuffle() {
    for (let i = 0; i < 200; i++) {
        const empty = tiles.indexOf(null);
        const moves = [];

        const r = Math.floor(empty / 3);
        const c = empty % 3;

        if (r > 0) moves.push(empty - 3);
        if (r < 2) moves.push(empty + 3);
        if (c > 0) moves.push(empty - 1);
        if (c < 2) moves.push(empty + 1);

        const m = moves[Math.floor(Math.random() * moves.length)];
        [tiles[empty], tiles[m]] = [tiles[m], tiles[empty]];
    }
    drawPuzzle();
}

// ===============================
// 3x3 SLIDING PUZZLE – FULL SCRIPT
// ===============================

// DOM
const puzzle = document.getElementById("puzzle");

// State
let tiles = [1, 2, 3, 4, 5, 6, 7, 8, null];

// -------------------------------
// DRAW PUZZLE
// -------------------------------
function drawPuzzle() {
    puzzle.innerHTML = "";

    tiles.forEach((value, index) => {
        const tile = document.createElement("div");

        if (value === null) {
            tile.className = "tile empty";
        } else {
            tile.className = "tile";
            tile.textContent = value;
            tile.onclick = () => moveTile(index);
        }

        puzzle.appendChild(tile);
    });
}

// -------------------------------
// MOVE TILE (USER MOVE)
// -------------------------------
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

// -------------------------------
// SHUFFLE (SAFE, ALWAYS SOLVABLE)
// -------------------------------
function shuffle() {
    for (let i = 0; i < 200; i++) {
        const emptyIndex = tiles.indexOf(null);
        const moves = [];

        const row = Math.floor(emptyIndex / 3);
        const col = emptyIndex % 3;

        if (row > 0) moves.push(emptyIndex - 3);
        if (row < 2) moves.push(emptyIndex + 3);
        if (col > 0) moves.push(emptyIndex - 1);
        if (col < 2) moves.push(emptyIndex + 1);

        const move = moves[Math.floor(Math.random() * moves.length)];
        [tiles[emptyIndex], tiles[move]] =
            [tiles[move], tiles[emptyIndex]];
    }
    drawPuzzle();
}

// -------------------------------
// SOLVER (BFS – SHORTEST PATH)
// -------------------------------
function getNeighbors(state) {
    const neighbors = [];
    const empty = state.indexOf(null);

    const row = Math.floor(empty / 3);
    const col = empty % 3;

    const moves = [];
    if (row > 0) moves.push(empty - 3);
    if (row < 2) moves.push(empty + 3);
    if (col > 0) moves.push(empty - 1);
    if (col < 2) moves.push(empty + 1);

    for (const m of moves) {
        const copy = state.slice();
        [copy[empty], copy[m]] = [copy[m], copy[empty]];
        neighbors.push(copy);
    }
    return neighbors;
}

function solvePuzzleBFS(start) {
    const goal = "1,2,3,4,5,6,7,8,";
    const queue = [[start]];
    const visited = new Set([start.join(",")]);

    while (queue.length) {
        const path = queue.shift();
        const state = path[path.length - 1];

        if (state.join(",") === goal) return path;

        for (const next of getNeighbors(state)) {
            const key = next.join(",");
            if (!visited.has(key)) {
                visited.add(key);
                queue.push([...path, next]);
            }
        }
    }
}

// -------------------------------
// ANIMATE SOLUTION
// -------------------------------
function animateSolution(path) {
    let step = 0;

    const interval = setInterval(() => {
        tiles = path[step];
        drawPuzzle();
        step++;

        if (step >= path.length) {
            clearInterval(interval);
        }
    }, 500);
}

// -------------------------------
// DEVTOOLS COMMAND
// -------------------------------
window.solveWithSteps = () => {
    const solution = solvePuzzleBFS(tiles.slice());
    if (solution) animateSolution(solution);
};

// -------------------------------
// INIT
// -------------------------------
drawPuzzle();

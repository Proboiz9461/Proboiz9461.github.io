// DOM
const puzzle = document.getElementById("puzzle");
const modeScreen = document.getElementById("modeScreen");
const game = document.getElementById("game");
const solveBtn = document.getElementById("solveBtn");

// STATE
let tiles = [1, 2, 3, 4, 5, 6, 7, 8, null];

// --------------------
// MODE LOGIC
// --------------------
function startNormal() {
    modeScreen.style.display = "none";
    game.style.display = "block";
    drawPuzzle();
}

function startAdmin() {
    const pwd = prompt("Enter admin password:");
    if (pwd === "67") {
        modeScreen.style.display = "none";
        game.style.display = "block";
        solveBtn.style.display = "inline-block";
        drawPuzzle();
    } else {
        alert("Wrong password ❌");
    }
}

// --------------------
// PUZZLE DRAW
// --------------------
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

// --------------------
// MOVE TILE
// --------------------
function moveTile(index) {
    const empty = tiles.indexOf(null);
    const r = Math.floor(index / 3);
    const c = index % 3;
    const er = Math.floor(empty / 3);
    const ec = empty % 3;

    if ((r === er && Math.abs(c - ec) === 1) ||
        (c === ec && Math.abs(r - er) === 1)) {
        [tiles[index], tiles[empty]] = [tiles[empty], tiles[index]];
        drawPuzzle();
    }
}

// --------------------
// SHUFFLE
// --------------------
function shuffle() {
    for (let i = 0; i < 200; i++) {
        const e = tiles.indexOf(null);
        const moves = [];
        const r = Math.floor(e / 3);
        const c = e % 3;

        if (r > 0) moves.push(e - 3);
        if (r < 2) moves.push(e + 3);
        if (c > 0) moves.push(e - 1);
        if (c < 2) moves.push(e + 1);

        const m = moves[Math.floor(Math.random() * moves.length)];
        [tiles[e], tiles[m]] = [tiles[m], tiles[e]];
    }
    drawPuzzle();
}

// --------------------
// SOLVER (BFS)
// --------------------
function getNeighbors(state) {
    const out = [];
    const e = state.indexOf(null);
    const r = Math.floor(e / 3);
    const c = e % 3;

    const moves = [];
    if (r > 0) moves.push(e - 3);
    if (r < 2) moves.push(e + 3);
    if (c > 0) moves.push(e - 1);
    if (c < 2) moves.push(e + 1);

    for (const m of moves) {
        const copy = state.slice();
        [copy[e], copy[m]] = [copy[m], copy[e]];
        out.push(copy);
    }
    return out;
}

function solvePuzzleBFS(start) {
    const goal = "1,2,3,4,5,6,7,8,";
    const queue = [[start]];
    const seen = new Set([start.join(",")]);

    while (queue.length) {
        const path = queue.shift();
        const state = path[path.length - 1];
        if (state.join(",") === goal) return path;

        for (const n of getNeighbors(state)) {
            const key = n.join(",");
            if (!seen.has(key)) {
                seen.add(key);
                queue.push([...path, n]);
            }
        }
    }
}

// --------------------
// ANIMATE SOLUTION
// --------------------
function animateSolution(path) {
    let i = 0;
    const t = setInterval(() => {
        tiles = path[i];
        drawPuzzle();
        i++;
        if (i >= path.length) clearInterval(t);
    }, 400);
}

// --------------------
// SOLVE BUTTON
// --------------------
solveBtn.onclick = () => {
    const solution = solvePuzzleBFS(tiles.slice());
    if (solution) animateSolution(solution);
};

// --------------------
// DEVTOOLS SOLVER (UNCHANGED)
// --------------------
window.solveWithSteps = () => {
    const solution = solvePuzzleBFS(tiles.slice());
    if (solution) animateSolution(solution);
};

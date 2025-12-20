// DOM
const modeScreen = document.getElementById("modeScreen");
const game = document.getElementById("game");
const puzzle = document.getElementById("puzzle");

// STATE
let tiles = [1, 2, 3, 4, 5, 6, 7, 8, null];

// MODE
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
        drawPuzzle();
    } else {
        alert("Wrong password");
    }
}

// DRAW
function drawPuzzle() {
    puzzle.innerHTML = "";
    tiles.forEach((value, index) => {
        const tile = document.createElement("div");
        tile.textContent = value ?? "";
        tile.style.width = "100px";
        tile.style.height = "100px";
        tile.style.display = "inline-flex";
        tile.style.alignItems = "center";
        tile.style.justifyContent = "center";
        tile.style.fontSize = "30px";
        tile.style.border = "1px solid white";
        tile.style.margin = "4px";
        puzzle.appendChild(tile);
    });
}

// SHUFFLE
function shuffle() {
    tiles.sort(() => Math.random() - 0.5);
    drawPuzzle();
}

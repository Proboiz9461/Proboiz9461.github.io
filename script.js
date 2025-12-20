// 🔴 PROOF THAT JS IS LOADED
alert("JavaScript loaded successfully");

// DOM
const modeScreen = document.getElementById("modeScreen");
const game = document.getElementById("game");
const puzzle = document.getElementById("puzzle");

// STATE
let tiles = [1, 2, 3, 4, 5, 6, 7, 8, null];

// MODE FUNCTIONS (GLOBAL — REQUIRED)
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

// PUZZLE
function drawPuzzle() {
    puzzle.innerHTML = "";
    tiles.forEach((v, i) => {
        const d = document.createElement("div");
        d.textContent = v ?? "";
        d.style.width = "100px";
        d.style.height = "100px";
        d.style.border = "1px solid white";
        d.style.display = "inline-flex";
        d.style.alignItems = "center";
        d.style.justifyContent = "center";
        d.style.fontSize = "30px";
        puzzle.appendChild(d);
    });
}

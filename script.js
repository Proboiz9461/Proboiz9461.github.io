const puzzle = document.getElementById("puzzle");

let tiles = [1, 2, 3, 4, 5, 6, 7, 8, null];

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

function moveTile(index) {
    const emptyIndex = tiles.indexOf(null);

    const validMoves = [
        index - 1,
        index + 1,
        index - 3,
        index + 3
    ];

    if (validMoves.includes(emptyIndex)) {
        [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
        drawPuzzle();
    }
}

function shuffle() {
    for (let i = 0; i < 100; i++) {
        moveTile(Math.floor(Math.random() * tiles.length));
    }
}

drawPuzzle();

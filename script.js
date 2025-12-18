const box = document.getElementById("box");
const gameArea = document.getElementById("gameArea");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");

let score;
let timeLeft;
let gameActive;
let timer;

// Initialize / Reset game
function startGame() {
    score = 0;
    timeLeft = 30;
    gameActive = true;

    scoreEl.textContent = score;
    timeEl.textContent = timeLeft;

    box.style.display = "block";
    moveBox();

    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

// Move box to random position
function moveBox() {
    const maxX = gameArea.clientWidth - box.clientWidth;
    const maxY = gameArea.clientHeight - box.clientHeight;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    box.style.left = `${x}px`;
    box.style.top = `${y}px`;
}

// Click handler
box.addEventListener("click", () => {
    if (!gameActive) return;

    score++;
    scoreEl.textContent = score;
    moveBox();
});

// Timer logic
function updateTimer() {
    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft <= 0) {
        endGame();
    }
}

// End game
function endGame() {
    gameActive = false;
    clearInterval(timer);
    box.style.display = "none";

    setTimeout(() => {
        alert(`Game Over!\nYour score: ${score}\nReload or refresh to play again.`);
    }, 100);
}

// Auto-start game on page load
window.onload = startGame;


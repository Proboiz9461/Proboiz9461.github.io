
const box = document.getElementById("box");
const gameArea = document.getElementById("gameArea");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");

let score = 0;
let timeLeft = 30;
let gameActive = true;

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

// Start position
moveBox();

// Timer
const timer = setInterval(() => {
    if (!gameActive) return;

    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft <= 0) {
        gameActive = false;
        clearInterval(timer);
        box.style.display = "none";
        alert(`Game Over! Your score: ${score}`);
    }
}, 1000);

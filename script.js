window.onload = () => {

    const box = document.getElementById("box");
    const gameArea = document.getElementById("gameArea");
    const scoreEl = document.getElementById("score");
    const timeEl = document.getElementById("time");

    let score = 0;
    let timeLeft = 30;
    let timer;

    function moveBox() {
        const maxX = gameArea.clientWidth - box.clientWidth;
        const maxY = gameArea.clientHeight - box.clientHeight;

        box.style.left = Math.random() * maxX + "px";
        box.style.top = Math.random() * maxY + "px";
    }

    box.addEventListener("click", () => {
        score++;
        scoreEl.textContent = score;
        moveBox();
    });

    function startGame() {
        score = 0;
        timeLeft = 30;
        scoreEl.textContent = score;
        timeEl.textContent = timeLeft;
        box.style.display = "block";
        moveBox();

        clearInterval(timer);
        timer = setInterval(() => {
            timeLeft--;
            timeEl.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timer);
                box.style.display = "none";
                alert("Game Over! Score: " + score);
            }
        }, 1000);
    }

    startGame();
};


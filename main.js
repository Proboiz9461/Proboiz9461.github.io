const hoverSound = new Audio("sounds/hover.mp3");
const clickSound = new Audio("sounds/click.mp3");

document.querySelectorAll(".launcher-tile, a").forEach(el => {
  el.addEventListener("mouseenter", () => {
    hoverSound.currentTime = 0;
    hoverSound.play();
  });

  el.addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.play();
  });
});

function openGame(gameFile) {
  setTimeout(() => {
    window.location.href = `play.html?game=${gameFile}`;
  }, 200);
}

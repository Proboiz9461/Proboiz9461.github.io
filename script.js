const circle = document.getElementById("circle");
const text = document.getElementById("text");

let breathing = false;
let interval;

function startBreathing() {
  if (breathing) return;
  breathing = true;

  text.innerText = "Inhale";
  circle.style.transform = "scale(1.4)";

  interval = setInterval(() => {
    text.innerText = "Inhale";
    circle.style.transform = "scale(1.4)";

    setTimeout(() => {
      text.innerText = "Hold";
    }, 4000);

    setTimeout(() => {
      text.innerText = "Exhale";
      circle.style.transform = "scale(1)";
    }, 7000);
  }, 12000);
}

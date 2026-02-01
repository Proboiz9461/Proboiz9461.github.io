document.addEventListener("DOMContentLoaded", () => {

  let startTime, interval;
  let running = false;
  let lapCount = 1;

  const timer = document.getElementById("timer");
  const solo = document.getElementById("solo");
  const laps = document.getElementById("laps");

  window.openSolo = function () {
    solo.classList.remove("hidden");
    startStopwatch();
  };

  window.openDuo = function () {
    alert("Duo mode coming soon 👥");
  };

  window.openCustom = function () {
    alert("Custom mode coming soon ⚙️");
  };

  function startStopwatch() {
    if (running) return;
    running = true;
    startTime = Date.now();
    interval = setInterval(updateTimer, 10);
  }

  function updateTimer() {
    const diff = Date.now() - startTime;
    const ms = Math.floor((diff % 1000) / 10);
    const sec = Math.floor(diff / 1000) % 60;
    const min = Math.floor(diff / 60000);

    timer.innerText =
      `${String(min).padStart(2, "0")}:` +
      `${String(sec).padStart(2, "0")}.` +
      `${String(ms).padStart(2, "0")}`;
  }

  window.stopTimer = function () {
    clearInterval(interval);
    running = false;
  };

  window.lapTimer = function () {
    if (!running) return;

    const li = document.createElement("li");
    li.innerText = `Lap ${lapCount++} — ${timer.innerText}`;
    laps.appendChild(li);
  };

});

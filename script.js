document.addEventListener("DOMContentLoaded", () => {

  let startTime, interval;
  let running = false;
  let eventCount = 1;

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

  function logEvent(label) {
    const li = document.createElement("li");
    li.textContent = `${eventCount++}. ${label} — ${timer.innerText}`;
    laps.appendChild(li);
  }

  window.withAir = function () {
    if (!running) return;
    logEvent("With Air 🌬️");
  };

  window.withoutAir = function () {
    if (!running) return;
    logEvent("Without Air 🚫");
  };

});

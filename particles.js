const container = document.getElementById("particles");

for (let i = 0; i < 40; i++) {
  const p = document.createElement("span");
  p.style.left = Math.random() * 100 + "vw";
  p.style.animationDuration = 10 + Math.random() * 20 + "s";
  container.appendChild(p);
}

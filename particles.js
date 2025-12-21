const container = document.getElementById("particles");

if (container) {
  for (let i = 0; i < 30; i++) {
    const p = document.createElement("span");
    p.style.left = Math.random() * 100 + "vw";
    p.style.animationDuration = 10 + Math.random() * 20 + "s";
    p.style.position = "fixed";
    p.style.width = "6px";
    p.style.height = "6px";
    p.style.background = "rgba(255,255,255,0.4)";
    p.style.borderRadius = "50%";
    p.style.animation = "float 20s linear infinite";
    container.appendChild(p);
  }
}

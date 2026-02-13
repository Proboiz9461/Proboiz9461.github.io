const input = document.getElementById('searchInput');
const cards = [...document.querySelectorAll('#toolGrid .card')];
const count = document.getElementById('count');
const cursorDot = document.getElementById('cursorDot');

function applySearch() {
  const q = input.value.trim().toLowerCase();
  let shown = 0;
  cards.forEach((card) => {
    const ok = card.innerText.toLowerCase().includes(q);
    card.style.display = ok ? '' : 'none';
    if (ok) shown += 1;
  });
  count.textContent = `${shown} shown / ${cards.length} tools`;
}

window.addEventListener('mousemove', (e) => {
  if (!cursorDot) return;
  cursorDot.style.left = `${e.clientX}px`;
  cursorDot.style.top = `${e.clientY}px`;
});

cards.forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(10px)';
  setTimeout(() => {
    card.style.transition = 'opacity .25s ease, transform .25s ease';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  }, i * 12);
});

input?.addEventListener('input', applySearch);
applySearch();

const input = document.getElementById('searchInput');
const cards = [...document.querySelectorAll('#toolGrid .card')];
const count = document.getElementById('count');
const cursorDot = document.getElementById('cursorDot');

const eggModal = document.getElementById('eggModal');
const eggCloseBtn = document.getElementById('eggCloseBtn');
const eggRandomBtn = document.getElementById('eggRandomBtn');

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

// Easter egg: type "proboiz" anywhere on the index page
let eggBuffer = '';
window.addEventListener('keydown', (e) => {
  if (e.key.length !== 1) return;
  eggBuffer = (eggBuffer + e.key.toLowerCase()).slice(-10);
  if (eggBuffer.includes('proboiz')) {
    eggModal?.classList.remove('hidden');
    eggModal?.setAttribute('aria-hidden', 'false');
    eggBuffer = '';
  }
});

eggCloseBtn?.addEventListener('click', () => {
  eggModal.classList.add('hidden');
  eggModal.setAttribute('aria-hidden', 'true');
});

eggModal?.addEventListener('click', (e) => {
  if (e.target === eggModal) {
    eggModal.classList.add('hidden');
    eggModal.setAttribute('aria-hidden', 'true');
  }
});

eggRandomBtn?.addEventListener('click', () => {
  if (!cards.length) return;
  const visible = cards.filter((c) => c.style.display !== 'none');
  const pool = visible.length ? visible : cards;
  const picked = pool[Math.floor(Math.random() * pool.length)];
  const link = picked.querySelector('a.btn');
  if (link) window.location.href = link.getAttribute('href');
});

});

input?.addEventListener('input', applySearch);
applySearch();

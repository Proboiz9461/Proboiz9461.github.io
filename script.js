const input = document.getElementById('searchInput');
const cards = [...document.querySelectorAll('#toolGrid .card')];
const count = document.getElementById('count');
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
const cursorStyle = document.getElementById('cursorStyle');

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

function setCursorTheme(mode) {
  const themes = {
    neo: { dot: '#8ec5ff', ring: '#7b8dff' },
    pink: { dot: '#ff8ed3', ring: '#b38dff' },
    ice: { dot: '#ffffff', ring: '#9cd9ff' },
  };
  const t = themes[mode] || themes.neo;
  if (cursorDot) cursorDot.style.background = `radial-gradient(circle, #fff, ${t.dot})`;
  if (cursorRing) {
    cursorRing.style.borderColor = t.ring;
    cursorRing.style.boxShadow = `0 0 18px ${t.ring}88`;
  }
  localStorage.setItem('cursor_theme', mode);
}

window.addEventListener('mousemove', (e) => {
  if (cursorDot) {
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;
  }
  if (cursorRing) {
    cursorRing.style.left = `${e.clientX}px`;
    cursorRing.style.top = `${e.clientY}px`;
  }
});

cards.forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(10px)';
  setTimeout(() => {
    card.style.transition = 'opacity .25s ease, transform .25s ease';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  }, i * 10);

  const open = () => {
    const href = card.getAttribute('data-href');
    if (href) window.location.href = href;
  };
  card.addEventListener('click', open);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open();
    }
  });
});

// Easter egg trigger fixed: only Ctrl+Shift+E
window.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'e') {
    eggModal?.classList.remove('hidden');
    eggModal?.setAttribute('aria-hidden', 'false');
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
  const visible = cards.filter((c) => c.style.display !== 'none');
  const pool = visible.length ? visible : cards;
  if (!pool.length) return;
  const picked = pool[Math.floor(Math.random() * pool.length)];
  const href = picked.getAttribute('data-href');
  if (href) window.location.href = href;
});

const savedTheme = localStorage.getItem('cursor_theme') || 'neo';
if (cursorStyle) {
  cursorStyle.value = savedTheme;
  cursorStyle.addEventListener('change', () => setCursorTheme(cursorStyle.value));
}
setCursorTheme(savedTheme);

input?.addEventListener('input', applySearch);
applySearch();

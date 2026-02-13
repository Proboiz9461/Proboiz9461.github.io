const input = document.getElementById('searchInput');
const cards = [...document.querySelectorAll('#toolGrid .card')];
const count = document.getElementById('count');

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

input?.addEventListener('input', applySearch);
applySearch();

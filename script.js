document.querySelectorAll('.launch').forEach(card => {
card.addEventListener('click', () => {
card.classList.add('fade-out');
setTimeout(() => {
window.location.href = card.dataset.link;
}, 300);
});
});

const grid = document.querySelector('.grid');


fetch('projects.json')
.then(res => res.json())
.then(data => {
data.forEach(p => {
const card = document.createElement('div');
card.className = 'card launch';
card.innerHTML = `<h3>${p.title}</h3><p>${p.desc}</p>`;


card.addEventListener('mouseenter', () => hoverSound.play());
card.addEventListener('click', () => {
launchSound.play();
document.body.classList.add('fade-out');
setTimeout(() => location.href = p.page, 400);
});


grid.appendChild(card);
});
});

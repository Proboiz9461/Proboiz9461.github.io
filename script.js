const grid = document.getElementById('grid');
const searchInput = document.getElementById('searchInput');
const tabs = [...document.querySelectorAll('.tab')];

const toolNames = [
  'Smart Calculator','BMI Analyzer','GCD Finder','LCM Finder','Prime Checker','Factorial','Fibonacci','Percentage','Power Tool','Square Root','Cube Root','Linear Solver','Quadratic Roots','Circle Area','Circle Circumference','Triangle Area','Rectangle Area','Simple Interest','Compound Interest','Average Finder','Median Finder','Mode Finder','Std Deviation','Decimal to Binary','Binary to Decimal','Decimal to Hex','Hex to Decimal','KM to Miles','Miles to KM','Celsius to Fahrenheit','Fahrenheit to Celsius','Seconds to HMS','Loan EMI','Discount Calculator','Tax Calculator','Tip Calculator','Age in Days','Leap Year Check','Roman Numeral','ASCII Char','Character Count','Word Count','Text Reverse','Palindrome Test','Random Number','Password Maker','UUID Lite','Slug Maker','Hash Lite','Color Generator'
];

const gameNames = [
  'Neon Guess','Cyber Dice Duel','Hyper Coin Toss','Quantum RPS','Pulse Reflex','Math Blaster','Target Lock','Code Breaker','Word Scramble','Memory Spark','Orbit Guess','Laser Odds','Data Rush','Rune Match','Cipher Sprint','Storm Pick','Crystal Flip','Nexus Numbers','Grid Hunter','Echo Choice','Pixel Duel','Turbo Toss','Lucky Reactor','Nova Smash','Blink Battle','Arcade Odds','Orbital Toss','Starfield Steps','Rapid Puzzle','Signal Tap','Wave Match','Helix Hunt','Prism Path','Fusion Flip','Aero Pick','Void Quest','Rocket Guess','Meteor Match','Cosmo Roll','Byte Clash','Circuit Spin','Holo Tactics','Plasma Toss','AI Duel','Speed Node','Pulse Clash','Cyber Quest','Infinity Pick','Zenith Zone','Galaxy Gamble'
];

const apps = [
  ...toolNames.map((name, i) => ({
    id: `tool-${String(i + 1).padStart(2, '0')}`,
    type: 'tool',
    name,
    description: 'Standalone tool (own HTML/CSS/JS files).',
    href: `apps/tools/tool-${String(i + 1).padStart(2, '0')}/index.html`
  })),
  ...gameNames.map((name, i) => ({
    id: `game-${String(i + 1).padStart(2, '0')}`,
    type: 'game',
    name,
    description: 'Standalone game (own HTML/CSS/JS files).',
    href: `apps/games/game-${String(i + 1).padStart(2, '0')}/index.html`
  }))
];

let activeFilter = 'all';

function render() {
  const term = searchInput.value.trim().toLowerCase();
  const list = apps.filter(app =>
    (activeFilter === 'all' || app.type === activeFilter) &&
    (`${app.name} ${app.id}`.toLowerCase().includes(term))
  );

  grid.innerHTML = list.map(app => `
    <article class="card">
      <small>${app.id.toUpperCase()}</small>
      <h3>${app.name}</h3>
      <p>${app.description}</p>
      <div class="row">
        <span class="tag">${app.type === 'tool' ? '🧰 TOOL' : '🎮 GAME'}</span>
        <a href="${app.href}"><button>Open File App</button></a>
      </div>
    </article>
  `).join('');
}

tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  activeFilter = tab.dataset.filter;
  render();
}));

searchInput.addEventListener('input', render);
render();

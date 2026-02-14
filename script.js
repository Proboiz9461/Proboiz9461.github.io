const toolNames=[
'Smart Calculator','BMI Analyzer','GCD Finder','LCM Finder','Prime Checker','Factorial','Fibonacci','Percentage','Power Tool','Square Root','Cube Root','Linear Solver','Quadratic Roots','Circle Area','Circle Circumference','Triangle Area','Rectangle Area','Simple Interest','Compound Interest','Average Finder','Median Finder','Mode Finder','Std Deviation','Decimal to Binary','Binary to Decimal','Decimal to Hex','Hex to Decimal','KM to Miles','Miles to KM','Celsius to Fahrenheit','Fahrenheit to Celsius','Seconds to HMS','Loan EMI','Discount Calculator','Tax Calculator','Tip Calculator','Age in Days','Leap Year Check','Roman Numeral','ASCII Char','Character Count','Word Count','Text Reverse','Palindrome Test','Random Number','Password Maker','UUID Lite','Slug Maker','Hash Lite','Color Generator'];
const gameNames=['Neon Guess','Cyber Dice Duel','Hyper Coin Toss','Quantum RPS','Pulse Reflex','Math Blaster','Target Lock','Code Breaker','Word Scramble','Memory Spark','Orbit Guess','Laser Odds','Data Rush','Rune Match','Cipher Sprint','Storm Pick','Crystal Flip','Nexus Numbers','Grid Hunter','Echo Choice','Pixel Duel','Turbo Toss','Lucky Reactor','Nova Smash','Blink Battle','Arcade Odds','Orbital Toss','Starfield Steps','Rapid Puzzle','Signal Tap','Wave Match','Helix Hunt','Prism Path','Fusion Flip','Aero Pick','Void Quest','Rocket Guess','Meteor Match','Cosmo Roll','Byte Clash','Circuit Spin','Holo Tactics','Plasma Toss','AI Duel','Speed Node','Pulse Clash','Cyber Quest','Infinity Pick','Zenith Zone','Galaxy Gamble'];

const apps=[
...toolNames.map((n,i)=>({id:`tool-${String(i+1).padStart(2,'0')}`,type:'tool',name:n,desc:'Standalone utility app',href:`apps/tools/tool-${String(i+1).padStart(2,'0')}/index.html`})),
...gameNames.map((n,i)=>({id:`game-${String(i+1).padStart(2,'0')}`,type:'game',name:n,desc:'Fun playable mini-game',href:`apps/games/game-${String(i+1).padStart(2,'0')}/index.html`})),
];

const grid=document.getElementById('grid');
const search=document.getElementById('search');
const tabs=[...document.querySelectorAll('.tab')];
let active='all';

function render(){
  const q=search.value.trim().toLowerCase();
  const list=apps.filter(a=>(active==='all'||a.type===active)&&(`${a.name} ${a.id}`).toLowerCase().includes(q));
  grid.innerHTML=list.map(a=>`<article class="card"><small>${a.id.toUpperCase()}</small><h3>${a.name}</h3><p>${a.desc}</p><div class="row"><span class="tag">${a.type==='tool'?'🧰 TOOL':'🎮 GAME'}</span><a href="${a.href}"><button>Open</button></a></div></article>`).join('');
}

tabs.forEach(t=>t.onclick=()=>{tabs.forEach(x=>x.classList.remove('active'));t.classList.add('active');active=t.dataset.type;render();});
search.addEventListener('input',render);
render();

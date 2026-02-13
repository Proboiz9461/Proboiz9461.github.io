const names = [
  ["Tap Speed Test", "game", "click"], ["Guess Number", "game", "guess"], ["Dice Duel", "game", "dice"],
  ["Coin Flip Arena", "game", "coin"], ["Rock Paper Scissors", "game", "rps"], ["Math Sprint", "game", "math"],
  ["Reaction Timer", "game", "reaction"], ["Memory Digits", "game", "memory"], ["Color Hunt", "game", "color"],
  ["Word Scramble", "game", "scramble"], ["Tic Hint", "game", "tic"], ["Lucky Wheel", "game", "wheel"],
  ["Odd One Out", "game", "odd"], ["Emoji Match", "game", "emoji"], ["Mini Quiz", "game", "quiz"],
  ["Fast Click 5s", "game", "click"], ["Prime Guess", "game", "guess"], ["Dice Race", "game", "dice"],
  ["Heads or Tails", "game", "coin"], ["RPS Turbo", "game", "rps"], ["Math Clash", "game", "math"],
  ["Reaction Pro", "game", "reaction"], ["Memory Blink", "game", "memory"], ["Color Tap", "game", "color"],
  ["Jumbled Words", "game", "scramble"], ["XO Practice", "game", "tic"], ["Fortune Wheel", "game", "wheel"],
  ["Pattern Pick", "game", "odd"],

  ["Text Reverser", "tool", "reverse"], ["Upper/Lower", "tool", "case"], ["Word Counter", "tool", "count"],
  ["Meme Message", "tool", "meme"], ["Random Compliment", "tool", "compliment"], ["Random Joke", "tool", "joke"],
  ["Password Idea", "tool", "password"], ["Name Shuffler", "tool", "shuffle"], ["Color Generator", "tool", "hex"],
  ["ASCII Box", "tool", "box"], ["Emoji Rain", "tool", "emojis"], ["Fancy Time", "tool", "time"],
  ["Tiny Notes", "tool", "notes"], ["Mood Meter", "tool", "mood"], ["Decision Helper", "tool", "decide"],
  ["Caps Lock Fun", "tool", "case"], ["Sentence Remix", "tool", "shuffle"], ["Nickname Maker", "tool", "meme"],
  ["HaHa Generator", "tool", "joke"], ["Strong Pass Mix", "tool", "password"], ["Palette Pop", "tool", "hex"],
  ["Text Framer", "tool", "box"], ["Emoji Mixer", "tool", "emojis"], ["Clock Sticker", "tool", "time"],
  ["Quick Pad", "tool", "notes"], ["Mood Spinner", "tool", "mood"], ["Yes/No Now", "tool", "decide"],
  ["Letter Count+", "tool", "count"]
];

const projects = names.map(([name, type, mode], i) => ({ id: i + 1, name, type, mode }));

const grid = document.getElementById('projectGrid');
const searchInput = document.getElementById('searchInput');
const countEl = document.getElementById('count');
const randomBtn = document.getElementById('randomBtn');
const filters = [...document.querySelectorAll('.filter')];
const playTitle = document.getElementById('playTitle');
const playArea = document.getElementById('playArea');

let activeType = 'all';

function visibleProjects() {
  const term = searchInput.value.trim().toLowerCase();
  return projects.filter((p) => (activeType === 'all' || p.type === activeType) && p.name.toLowerCase().includes(term));
}

function render() {
  const list = visibleProjects();
  countEl.textContent = `${list.length} shown / ${projects.length} total`;
  grid.innerHTML = list.map((p) => `
    <article class="card">
      <span class="tag">${p.type === 'game' ? 'Game' : 'Tool'}</span>
      <h3>${p.name}</h3>
      <button data-id="${p.id}" class="openBtn">Open Here</button>
    </article>
  `).join('');

  [...document.querySelectorAll('.openBtn')].forEach((btn) => {
    btn.addEventListener('click', () => openProject(Number(btn.dataset.id)));
  });
}

function openProject(id) {
  const p = projects.find((x) => x.id === id);
  if (!p) return;
  playTitle.textContent = `${p.name} (${p.type})`;
  renderMode(p.mode);
}

function renderMode(mode) {
  const rnd = (n) => Math.floor(Math.random() * n);
  if (mode === 'click') {
    let c = 0;
    playArea.innerHTML = `<p>Click as fast as you can.</p><button id="tapBtn">Tap: 0</button>`;
    document.getElementById('tapBtn').onclick = (e) => { c += 1; e.target.textContent = `Tap: ${c}`; };
  } else if (mode === 'guess') {
    const n = rnd(20) + 1;
    playArea.innerHTML = `<p>Guess number 1-20</p><input id="g" class="inline" type="number"/><button id="go">Check</button><p id="out"></p>`;
    document.getElementById('go').onclick = () => {
      const v = Number(document.getElementById('g').value);
      document.getElementById('out').textContent = v === n ? 'Correct 🎉' : (v < n ? 'Too low' : 'Too high');
    };
  } else if (mode === 'dice') {
    playArea.innerHTML = `<button id="roll">Roll Dice</button><p id="out">-</p>`;
    document.getElementById('roll').onclick = () => document.getElementById('out').textContent = `🎲 ${rnd(6)+1}`;
  } else if (mode === 'coin') {
    playArea.innerHTML = `<button id="flip">Flip Coin</button><p id="out">-</p>`;
    document.getElementById('flip').onclick = () => document.getElementById('out').textContent = rnd(2) ? 'Heads' : 'Tails';
  } else if (mode === 'rps') {
    playArea.innerHTML = `<button data-v="Rock" class="r">Rock</button><button data-v="Paper" class="r">Paper</button><button data-v="Scissors" class="r">Scissors</button><p id="out"></p>`;
    const arr = ['Rock', 'Paper', 'Scissors'];
    [...playArea.querySelectorAll('.r')].forEach((b) => b.onclick = () => document.getElementById('out').textContent = `You: ${b.dataset.v} | Bot: ${arr[rnd(3)]}`);
  } else if (mode === 'math') {
    const a = rnd(20), b = rnd(20);
    playArea.innerHTML = `<p>${a} + ${b} = ?</p><input id="ans" class="inline"/><button id="chk">Check</button><p id="out"></p>`;
    document.getElementById('chk').onclick = () => document.getElementById('out').textContent = Number(document.getElementById('ans').value) === a+b ? 'Right ✅' : 'Nope';
  } else if (mode === 'reaction') {
    playArea.innerHTML = `<button id="start">Start</button><p id="out">Wait for GO...</p>`;
    document.getElementById('start').onclick = () => {
      const out = document.getElementById('out');
      out.textContent = 'Wait...';
      const t0 = performance.now();
      setTimeout(() => { out.textContent = 'GO! click now'; playArea.onclick = () => { out.textContent = `${Math.round(performance.now()-t0)}ms`; playArea.onclick = null; }; }, 800 + rnd(2000));
    };
  } else if (mode === 'memory') {
    const num = String(rnd(9000)+1000);
    playArea.innerHTML = `<p>Remember: <b>${num}</b> (3 sec)</p><input id="m" class="inline" placeholder="type number"/><button id="c">Check</button><p id="out"></p>`;
    setTimeout(() => { playArea.querySelector('b').textContent = '????'; }, 3000);
    document.getElementById('c').onclick = () => document.getElementById('out').textContent = document.getElementById('m').value === num ? 'Correct' : `It was ${num}`;
  } else if (mode === 'color') {
    const colors = ['red','green','blue','yellow','purple'];
    const pick = colors[rnd(colors.length)];
    playArea.innerHTML = `<p>Click the word color: <b style="color:${pick}">${pick}</b></p>${colors.map(c=>`<button class="cc" data-c="${c}">${c}</button>`).join('')}<p id="out"></p>`;
    [...playArea.querySelectorAll('.cc')].forEach((b)=>b.onclick=()=>document.getElementById('out').textContent=b.dataset.c===pick?'Nice!':'Try again');
  } else if (mode === 'scramble') {
    const words = ['banana','coding','planet','cricket','guitar'];
    const w = words[rnd(words.length)];
    const s = w.split('').sort(()=>Math.random()-0.5).join('');
    playArea.innerHTML = `<p>Unscramble: <b>${s}</b></p><input id="u" class="inline"/><button id="ok">Check</button><p id="out"></p>`;
    document.getElementById('ok').onclick = ()=> document.getElementById('out').textContent = document.getElementById('u').value.toLowerCase()===w?'Correct':'Wrong';
  } else if (mode === 'tic') {
    playArea.innerHTML = '<p>XO board (practice):</p><div id="xo"></div>';
    const xo = document.getElementById('xo');
    let t = 'X';
    for (let i = 0; i < 9; i += 1) {
      const b = document.createElement('button'); b.textContent = '-'; b.style.width='48px';
      b.onclick = () => { if (b.textContent==='-') { b.textContent=t; t=t==='X'?'O':'X'; } };
      xo.appendChild(b);
    }
  } else if (mode === 'wheel') {
    const ops = ['Win','Retry','Jackpot','Bonus','Oops'];
    playArea.innerHTML = `<button id="sp">Spin</button><p id="out"></p>`;
    document.getElementById('sp').onclick = ()=>document.getElementById('out').textContent = ops[rnd(ops.length)];
  } else if (mode === 'odd') {
    const arr = ['🍎','🍎','🍎','🍊','🍎'];
    arr.sort(()=>Math.random()-0.5);
    playArea.innerHTML = `<p>Find odd emoji:</p>${arr.map(x=>`<button class="o">${x}</button>`).join('')}<p id="out"></p>`;
    [...playArea.querySelectorAll('.o')].forEach((b)=>b.onclick=()=>document.getElementById('out').textContent=b.textContent==='🍊'?'Correct':'Nope');
  } else if (mode === 'emoji') {
    playArea.innerHTML = `<p>Pick same emoji pair:</p><button class="e">😎</button><button class="e">😎</button><button class="e">🤖</button><p id="out"></p>`;
    let chosen = [];
    [...playArea.querySelectorAll('.e')].forEach((b)=>b.onclick=()=>{ chosen.push(b.textContent); if(chosen.length===2){document.getElementById('out').textContent = chosen[0]===chosen[1]?'Match':'No Match'; chosen=[];} });
  } else if (mode === 'quiz') {
    playArea.innerHTML = `<p>Which is JavaScript framework?</p><button class="q">React</button><button class="q">Photoshop</button><p id="out"></p>`;
    [...playArea.querySelectorAll('.q')].forEach((b)=>b.onclick=()=>document.getElementById('out').textContent = b.textContent==='React'?'Correct':'No');
  } else if (mode === 'reverse') {
    playArea.innerHTML = `<input id="t" class="inline" placeholder="type text"/><button id="r">Reverse</button><p id="out"></p>`;
    document.getElementById('r').onclick=()=>document.getElementById('out').textContent=document.getElementById('t').value.split('').reverse().join('');
  } else if (mode === 'case') {
    playArea.innerHTML = `<input id="t" class="inline" placeholder="text"/><button id="u">UPPER</button><button id="l">lower</button><p id="out"></p>`;
    document.getElementById('u').onclick=()=>document.getElementById('out').textContent=document.getElementById('t').value.toUpperCase();
    document.getElementById('l').onclick=()=>document.getElementById('out').textContent=document.getElementById('t').value.toLowerCase();
  } else if (mode === 'count') {
    playArea.innerHTML = `<textarea id="t" class="inline" rows="3" style="width:100%"></textarea><button id="c">Count</button><p id="out"></p>`;
    document.getElementById('c').onclick=()=>{const v=document.getElementById('t').value;document.getElementById('out').textContent=`Chars: ${v.length}, Words: ${v.trim()?v.trim().split(/\s+/).length:0}`;};
  } else if (mode === 'meme') {
    const arr=['Ultra Pro Max','Bro Moment','Certified Legend','404 Sleep Not Found'];
    playArea.innerHTML = `<button id="m">Generate Meme Text</button><p id="out"></p>`;
    document.getElementById('m').onclick=()=>document.getElementById('out').textContent=arr[rnd(arr.length)];
  } else if (mode === 'compliment') {
    const arr=['You are unstoppable!','Your ideas are fire 🔥','You code like a wizard 🧙'];
    playArea.innerHTML = `<button id="m">Get Compliment</button><p id="out"></p>`;
    document.getElementById('m').onclick=()=>document.getElementById('out').textContent=arr[rnd(arr.length)];
  } else if (mode === 'joke') {
    const arr=['Why do JS devs wear glasses? Because they do not C#.', 'I told my bug we are done. It came back with features.', 'Debugging: removing needles from haystack.'];
    playArea.innerHTML = `<button id="j">Tell Joke</button><p id="out"></p>`;
    document.getElementById('j').onclick=()=>document.getElementById('out').textContent=arr[rnd(arr.length)];
  } else if (mode === 'password') {
    playArea.innerHTML = `<button id="p">Generate Password</button><p id="out"></p>`;
    document.getElementById('p').onclick=()=>{const ch='ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$';let s='';for(let i=0;i<12;i++)s+=ch[rnd(ch.length)];document.getElementById('out').textContent=s;};
  } else if (mode === 'shuffle') {
    playArea.innerHTML = `<input id="t" class="inline" placeholder="text"/><button id="s">Shuffle Words</button><p id="out"></p>`;
    document.getElementById('s').onclick=()=>{const a=document.getElementById('t').value.split(' ').filter(Boolean);a.sort(()=>Math.random()-0.5);document.getElementById('out').textContent=a.join(' ');};
  } else if (mode === 'hex') {
    playArea.innerHTML = `<button id="h">Generate Color</button><p id="out"></p><div id="box" style="height:50px;border-radius:8px"></div>`;
    document.getElementById('h').onclick=()=>{const c='#'+Math.floor(Math.random()*16777215).toString(16).padStart(6,'0');document.getElementById('out').textContent=c;document.getElementById('box').style.background=c;};
  } else if (mode === 'box') {
    playArea.innerHTML = `<input id="t" class="inline" placeholder="text"/><button id="b">Frame</button><pre id="out"></pre>`;
    document.getElementById('b').onclick=()=>{const t=document.getElementById('t').value;const line='+'.padEnd(t.length+3,'-')+'+';document.getElementById('out').textContent=`${line}\n| ${t} |\n${line}`;};
  } else if (mode === 'emojis') {
    const arr=['😂','🔥','😎','🚀','🎉','🤖'];
    playArea.innerHTML = `<button id="e">Make Emoji Line</button><p id="out"></p>`;
    document.getElementById('e').onclick=()=>{let s='';for(let i=0;i<8;i++)s+=arr[rnd(arr.length)];document.getElementById('out').textContent=s;};
  } else if (mode === 'time') {
    playArea.innerHTML = `<button id="t">Show Time</button><p id="out"></p>`;
    document.getElementById('t').onclick=()=>document.getElementById('out').textContent=new Date().toLocaleString();
  } else if (mode === 'notes') {
    playArea.innerHTML = `<textarea id="n" class="inline" rows="4" style="width:100%" placeholder="Write note"></textarea><button id="s">Save Local</button><p id="out"></p>`;
    document.getElementById('s').onclick=()=>{localStorage.setItem('proboiz_note',document.getElementById('n').value);document.getElementById('out').textContent='Saved on this browser';};
    document.getElementById('n').value = localStorage.getItem('proboiz_note') || '';
  } else if (mode === 'mood') {
    const moods=['Happy 😄','Chill 😌','Focused 🧠','Sleepy 😴'];
    playArea.innerHTML = `<button id="m">Pick Mood</button><p id="out"></p>`;
    document.getElementById('m').onclick=()=>document.getElementById('out').textContent=moods[rnd(moods.length)];
  } else if (mode === 'decide') {
    playArea.innerHTML = `<input id="a" class="inline" placeholder="option 1"/> <input id="b" class="inline" placeholder="option 2"/> <button id="d">Decide</button><p id="out"></p>`;
    document.getElementById('d').onclick=()=>{const a=document.getElementById('a').value||'Option 1';const b=document.getElementById('b').value||'Option 2';document.getElementById('out').textContent=Math.random()<0.5?a:b;};
  } else {
    playArea.textContent = 'Loaded.';
  }
}

searchInput.addEventListener('input', render);
filters.forEach((btn) => btn.addEventListener('click', () => {
  activeType = btn.dataset.type;
  filters.forEach((b) => b.classList.remove('active'));
  btn.classList.add('active');
  render();
}));

randomBtn.addEventListener('click', () => {
  const list = visibleProjects();
  if (!list.length) return;
  openProject(list[Math.floor(Math.random() * list.length)].id);
});

render();

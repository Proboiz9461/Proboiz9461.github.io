const gameModes = [
  ['Tap Frenzy','click'],['Guess Number','guess'],['Dice Roller','dice'],['Coin Flip','coin'],['RPS Arena','rps'],
  ['Quick Math','math'],['Reaction Test','reaction'],['Memory Digits','memory'],['Word Scramble','scramble'],['Emoji Match','emoji'],
  ['Mini Quiz','quiz'],['Fortune Wheel','wheel'],['Odd Emoji','odd'],['XO Practice','tic'],['Color Hunt','color'],
  ['Tap Sprint','click'],['High-Low Guess','guess'],['Dice Duel','dice'],['Heads/Tails','coin'],['RPS Turbo','rps'],
  ['Math Clash','math'],['Reflex Pro','reaction'],['Brain Memory','memory'],['Jumbled Word','scramble'],['Emoji Pair','emoji'],
  ['Fast Quiz','quiz'],['Spin & Win','wheel'],['Odd One Out','odd'],['Tic Battle','tic'],['Color Tap','color']
];

const toolModes = [
  ['Calculator','calc'],['BMI Checker','bmi'],['Unit Converter','unit'],['JSON Formatter','json'],['Base64 Encode/Decode','base64'],
  ['Text Reverser','reverse'],['Upper/Lower','case'],['Word Counter','count'],['Password Generator','password'],['Color Generator','hex'],
  ['ASCII Box Maker','box'],['Decision Helper','decide'],['Notes Pad','notes'],['Random Joke','joke'],['Random Compliment','compliment'],
  ['Meme Text','meme'],['Shuffle Words','shuffle'],['Emoji Line','emojis'],['Clock','time'],['Binary Converter','binary'],
  ['Percentage Tool','percent'],['Tip Calculator','tip'],['Age Calculator','age'],['Palindrome Checker','palin'],['Case Alternator','altcase'],
  ['Text Cleaner','clean'],['Character Picker','char'],['URL Encoder','url'],['Timer','timer'],['Stopwatch','stopwatch']
];

const projects = [
  ...gameModes.map(([name, mode], i) => ({ id: i + 1, name, type: 'game', mode })),
  ...toolModes.map(([name, mode], i) => ({ id: i + 31, name, type: 'tool', mode }))
];

const grid = document.getElementById('projectGrid');
const searchInput = document.getElementById('searchInput');
const countEl = document.getElementById('count');
const randomBtn = document.getElementById('randomBtn');
const filters = [...document.querySelectorAll('.filter')];
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalArea = document.getElementById('modalArea');
const closeModal = document.getElementById('closeModal');
const cursorDot = document.getElementById('cursorDot');

let activeType = 'all';

window.addEventListener('mousemove', (e) => {
  cursorDot.style.left = `${e.clientX}px`;
  cursorDot.style.top = `${e.clientY}px`;
});

function visibleProjects() {
  const t = searchInput.value.trim().toLowerCase();
  return projects.filter((p) => (activeType === 'all' || p.type === activeType) && p.name.toLowerCase().includes(t));
}

function renderGrid() {
  const list = visibleProjects();
  countEl.textContent = `${list.length} shown / ${projects.length} total`;
  grid.innerHTML = list.map((p) => `
    <article class="card">
      <span class="tag">${p.type === 'game' ? '🎮 Game' : '🛠 Tool'}</span>
      <h3>${p.name}</h3>
      <button class="openBtn" data-id="${p.id}">Launch</button>
    </article>
  `).join('');
  [...document.querySelectorAll('.openBtn')].forEach((b) => b.onclick = () => openProject(Number(b.dataset.id)));
}

function openProject(id) {
  const p = projects.find((x) => x.id === id);
  if (!p) return;
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  modalTitle.textContent = `${p.name} • ${p.type}`;
  renderMode(p.mode);
}

function closePopup() {
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
}

closeModal.onclick = closePopup;
modal.onclick = (e) => { if (e.target === modal) closePopup(); };
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePopup(); });

function renderMode(mode) {
  const r = (n) => Math.floor(Math.random() * n);
  if (mode === 'click') {
    let c = 0;
    modalArea.innerHTML = `<p>Click fast!</p><button id="tap">Tap: 0</button>`;
    document.getElementById('tap').onclick = (e) => { c += 1; e.target.textContent = `Tap: ${c}`; };
  } else if (mode === 'guess') {
    const n = r(20) + 1;
    modalArea.innerHTML = `<p>Guess 1-20</p><input id="x" class="inline" type="number"/><button id="g">Check</button><p id="o"></p>`;
    document.getElementById('g').onclick = () => {
      const v = Number(document.getElementById('x').value);
      document.getElementById('o').textContent = v === n ? 'Correct 🎉' : (v < n ? 'Too low' : 'Too high');
    };
  } else if (mode === 'dice') {
    modalArea.innerHTML = `<button id="d">Roll</button><p id="o">-</p>`;
    document.getElementById('d').onclick = () => document.getElementById('o').textContent = `🎲 ${r(6)+1}`;
  } else if (mode === 'coin') {
    modalArea.innerHTML = `<button id="c">Flip</button><p id="o">-</p>`;
    document.getElementById('c').onclick = () => document.getElementById('o').textContent = r(2) ? 'Heads' : 'Tails';
  } else if (mode === 'rps') {
    modalArea.innerHTML = `<button class="r" data-v="Rock">Rock</button><button class="r" data-v="Paper">Paper</button><button class="r" data-v="Scissors">Scissors</button><p id="o"></p>`;
    const arr = ['Rock', 'Paper', 'Scissors'];
    [...modalArea.querySelectorAll('.r')].forEach((b) => b.onclick = () => document.getElementById('o').textContent = `You: ${b.dataset.v} | Bot: ${arr[r(3)]}`);
  } else if (mode === 'math') {
    const a = r(30), b = r(30);
    modalArea.innerHTML = `<p>${a} + ${b} = ?</p><input id="m" class="inline"/><button id="k">Check</button><p id="o"></p>`;
    document.getElementById('k').onclick = () => document.getElementById('o').textContent = Number(document.getElementById('m').value) === a+b ? 'Right ✅' : 'Nope';
  } else if (mode === 'reaction') {
    modalArea.innerHTML = `<button id="s">Start</button><p id="o">Wait for GO...</p>`;
    document.getElementById('s').onclick = () => {
      const o = document.getElementById('o');
      o.textContent = 'Wait...';
      const t0 = performance.now();
      setTimeout(() => { o.textContent = 'GO! click here'; modalArea.onclick = () => { o.textContent = `${Math.round(performance.now()-t0)} ms`; modalArea.onclick = null; }; }, 600 + r(1800));
    };
  } else if (mode === 'memory') {
    const n = String(r(9000) + 1000);
    modalArea.innerHTML = `<p>Remember: <b>${n}</b></p><input id="v" class="inline"/><button id="q">Check</button><p id="o"></p>`;
    setTimeout(() => { const b = modalArea.querySelector('b'); if (b) b.textContent = '????'; }, 2400);
    document.getElementById('q').onclick = () => document.getElementById('o').textContent = document.getElementById('v').value === n ? 'Correct' : `It was ${n}`;
  } else if (mode === 'scramble') {
    const w = ['coding','planet','guitar','banana','future'][r(5)];
    const s = w.split('').sort(()=>Math.random()-0.5).join('');
    modalArea.innerHTML = `<p>Unscramble: <b>${s}</b></p><input id="u" class="inline"/><button id="ok">Check</button><p id="o"></p>`;
    document.getElementById('ok').onclick = () => document.getElementById('o').textContent = document.getElementById('u').value.toLowerCase()===w?'Correct':'Try again';
  } else if (mode === 'emoji') {
    modalArea.innerHTML = `<button class="e">😎</button><button class="e">😎</button><button class="e">🤖</button><p id="o"></p>`;
    let p = [];
    [...modalArea.querySelectorAll('.e')].forEach((b)=>b.onclick=()=>{p.push(b.textContent);if(p.length===2){document.getElementById('o').textContent=p[0]===p[1]?'Match':'No match';p=[];}});
  } else if (mode === 'quiz') {
    modalArea.innerHTML = `<p>Which is a frontend framework?</p><button class="q">React</button><button class="q">Excel</button><p id="o"></p>`;
    [...modalArea.querySelectorAll('.q')].forEach((b)=>b.onclick=()=>document.getElementById('o').textContent=b.textContent==='React'?'Correct':'Nope');
  } else if (mode === 'wheel') {
    const arr = ['Win','Bonus','Try Again','Jackpot'];
    modalArea.innerHTML = `<button id="w">Spin</button><p id="o"></p>`;
    document.getElementById('w').onclick = ()=>document.getElementById('o').textContent=arr[r(arr.length)];
  } else if (mode === 'odd') {
    const arr = ['🍕','🍕','🍔','🍕'].sort(()=>Math.random()-0.5);
    modalArea.innerHTML = `${arr.map(x=>`<button class="o">${x}</button>`).join('')}<p id="o"></p>`;
    [...modalArea.querySelectorAll('.o')].forEach((b)=>b.onclick=()=>document.getElementById('o').textContent=b.textContent==='🍔'?'Correct':'No');
  } else if (mode === 'tic') {
    modalArea.innerHTML = '<div id="xo"></div><p>Practice board</p>';
    let t = 'X';
    for (let i=0;i<9;i++) { const b=document.createElement('button'); b.textContent='-'; b.style.width='45px'; b.onclick=()=>{if(b.textContent==='-'){b.textContent=t;t=t==='X'?'O':'X';}}; document.getElementById('xo').appendChild(b); }
  } else if (mode === 'color') {
    const colors = ['red','green','blue','yellow','purple'];
    const p = colors[r(colors.length)];
    modalArea.innerHTML = `<p>Pick this color: <b style="color:${p}">${p}</b></p>${colors.map(c=>`<button class="cc" data-c="${c}">${c}</button>`).join('')}<p id="o"></p>`;
    [...modalArea.querySelectorAll('.cc')].forEach((b)=>b.onclick=()=>document.getElementById('o').textContent=b.dataset.c===p?'Nice':'Try again');

  } else if (mode === 'calc') {
    modalArea.innerHTML = `<input id="a" class="inline" type="number" placeholder="A"/> <input id="b" class="inline" type="number" placeholder="B"/> <select id="op" class="inline"><option>+</option><option>-</option><option>*</option><option>/</option></select> <button id="go">=</button><p id="o"></p>`;
    document.getElementById('go').onclick=()=>{const a=Number(document.getElementById('a').value),b=Number(document.getElementById('b').value),op=document.getElementById('op').value;const v=op==='+'?a+b:op==='-'?a-b:op==='*'?a*b:(b? a/b :'∞');document.getElementById('o').textContent=`Result: ${v}`;};
  } else if (mode === 'bmi') {
    modalArea.innerHTML = `<input id="h" class="inline" type="number" placeholder="Height cm"/> <input id="w" class="inline" type="number" placeholder="Weight kg"/> <button id="b">Check BMI</button><p id="o"></p>`;
    document.getElementById('b').onclick=()=>{const h=Number(document.getElementById('h').value)/100;const w=Number(document.getElementById('w').value);const bmi=(w/(h*h)).toFixed(2);document.getElementById('o').textContent=`BMI: ${bmi}`;};
  } else if (mode === 'unit') {
    modalArea.innerHTML = `<input id="km" class="inline" type="number" placeholder="Kilometers"/> <button id="u">To Miles</button><p id="o"></p>`;
    document.getElementById('u').onclick=()=>{const km=Number(document.getElementById('km').value);document.getElementById('o').textContent=`${(km*0.621371).toFixed(3)} miles`;};
  } else if (mode === 'json') {
    modalArea.innerHTML = `<textarea id="j" class="inline" placeholder='{"name":"proboiz"}'></textarea><button id="f">Format JSON</button><pre id="o"></pre>`;
    document.getElementById('f').onclick=()=>{try{document.getElementById('o').textContent=JSON.stringify(JSON.parse(document.getElementById('j').value),null,2);}catch{document.getElementById('o').textContent='Invalid JSON';}};
  } else if (mode === 'base64') {
    modalArea.innerHTML = `<textarea id="t" class="inline" placeholder="text"></textarea><button id="e">Encode</button><button id="d">Decode</button><pre id="o"></pre>`;
    document.getElementById('e').onclick=()=>document.getElementById('o').textContent=btoa(unescape(encodeURIComponent(document.getElementById('t').value)));
    document.getElementById('d').onclick=()=>{try{document.getElementById('o').textContent=decodeURIComponent(escape(atob(document.getElementById('t').value)));}catch{document.getElementById('o').textContent='Invalid base64';}};
  } else if (mode === 'reverse') {
    modalArea.innerHTML = `<input id="t" class="inline" placeholder="text"/> <button id="r">Reverse</button><p id="o"></p>`;
    document.getElementById('r').onclick=()=>document.getElementById('o').textContent=document.getElementById('t').value.split('').reverse().join('');
  } else if (mode === 'case') {
    modalArea.innerHTML = `<input id="t" class="inline" placeholder="text"/> <button id="u">UPPER</button> <button id="l">lower</button><p id="o"></p>`;
    document.getElementById('u').onclick=()=>document.getElementById('o').textContent=document.getElementById('t').value.toUpperCase();
    document.getElementById('l').onclick=()=>document.getElementById('o').textContent=document.getElementById('t').value.toLowerCase();
  } else if (mode === 'count') {
    modalArea.innerHTML = `<textarea id="t" class="inline" placeholder="text"></textarea><button id="c">Count</button><p id="o"></p>`;
    document.getElementById('c').onclick=()=>{const v=document.getElementById('t').value;document.getElementById('o').textContent=`Chars: ${v.length}, Words: ${v.trim()?v.trim().split(/\s+/).length:0}`;};
  } else if (mode === 'password') {
    modalArea.innerHTML = `<button id="p">Generate Password</button><p id="o"></p>`;
    document.getElementById('p').onclick=()=>{const ch='ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$';let s='';for(let i=0;i<14;i++)s+=ch[r(ch.length)];document.getElementById('o').textContent=s;};
  } else if (mode === 'hex') {
    modalArea.innerHTML = `<button id="h">Generate Color</button><p id="o"></p><div id="bx" style="height:52px;border-radius:8px"></div>`;
    document.getElementById('h').onclick=()=>{const c='#'+Math.floor(Math.random()*16777215).toString(16).padStart(6,'0');document.getElementById('o').textContent=c;document.getElementById('bx').style.background=c;};
  } else if (mode === 'box') {
    modalArea.innerHTML = `<input id="t" class="inline" placeholder="text"/> <button id="b">Create Box</button><pre id="o"></pre>`;
    document.getElementById('b').onclick=()=>{const t=document.getElementById('t').value;const line='+'.padEnd(t.length+3,'-')+'+';document.getElementById('o').textContent=`${line}\n| ${t} |\n${line}`;};
  } else if (mode === 'decide') {
    modalArea.innerHTML = `<input id="a" class="inline" placeholder="Option A"/> <input id="b" class="inline" placeholder="Option B"/> <button id="d">Decide</button><p id="o"></p>`;
    document.getElementById('d').onclick=()=>{const a=document.getElementById('a').value||'A';const b=document.getElementById('b').value||'B';document.getElementById('o').textContent=Math.random()<0.5?a:b;};
  } else if (mode === 'notes') {
    modalArea.innerHTML = `<textarea id="n" class="inline" placeholder="Write notes"></textarea><button id="s">Save</button><p id="o"></p>`;
    const n = document.getElementById('n'); n.value = localStorage.getItem('proboiz_notes') || '';
    document.getElementById('s').onclick=()=>{localStorage.setItem('proboiz_notes',n.value);document.getElementById('o').textContent='Saved locally';};
  } else if (mode === 'joke') {
    const arr=['Why debug? Because panic is expensive.', 'My code works, I have no idea why.', 'Bug fixed by turning coffee into code.'];
    modalArea.innerHTML = `<button id="j">Tell Joke</button><p id="o"></p>`;
    document.getElementById('j').onclick=()=>document.getElementById('o').textContent=arr[r(arr.length)];
  } else if (mode === 'compliment') {
    const arr=['You are cracked at coding ⚡','Legend energy detected 👑','Your UI taste is elite 🔥'];
    modalArea.innerHTML = `<button id="c">Give Compliment</button><p id="o"></p>`;
    document.getElementById('c').onclick=()=>document.getElementById('o').textContent=arr[r(arr.length)];
  } else if (mode === 'meme') {
    const arr=['GOD MODE ENABLED', 'Bro deployed in production at 3AM', 'Ultra Pro Max Vibes'];
    modalArea.innerHTML = `<button id="m">Generate Meme Text</button><h3 id="o"></h3>`;
    document.getElementById('m').onclick=()=>document.getElementById('o').textContent=arr[r(arr.length)];
  } else if (mode === 'shuffle') {
    modalArea.innerHTML = `<input id="t" class="inline" placeholder="type sentence"/> <button id="s">Shuffle</button><p id="o"></p>`;
    document.getElementById('s').onclick=()=>{const a=document.getElementById('t').value.split(' ').filter(Boolean);a.sort(()=>Math.random()-0.5);document.getElementById('o').textContent=a.join(' ');};
  } else if (mode === 'emojis') {
    const arr=['😂','🔥','😎','🚀','🎉','🧠'];
    modalArea.innerHTML = `<button id="e">Generate</button><p id="o"></p>`;
    document.getElementById('e').onclick=()=>{let s='';for(let i=0;i<10;i++)s+=arr[r(arr.length)];document.getElementById('o').textContent=s;};
  } else if (mode === 'time') {
    modalArea.innerHTML = `<button id="t">Show Time</button><p id="o"></p>`;
    document.getElementById('t').onclick=()=>document.getElementById('o').textContent=new Date().toLocaleString();
  } else if (mode === 'binary') {
    modalArea.innerHTML = `<input id="t" class="inline" placeholder="text"/> <button id="b">To Binary</button><pre id="o"></pre>`;
    document.getElementById('b').onclick=()=>document.getElementById('o').textContent=[...document.getElementById('t').value].map(ch=>ch.charCodeAt(0).toString(2).padStart(8,'0')).join(' ');
  } else if (mode === 'percent') {
    modalArea.innerHTML = `<input id="p" class="inline" type="number" placeholder="Part"/> <input id="t" class="inline" type="number" placeholder="Total"/> <button id="go">Calc</button><p id="o"></p>`;
    document.getElementById('go').onclick=()=>{const p=Number(document.getElementById('p').value),t=Number(document.getElementById('t').value);document.getElementById('o').textContent=t?`${((p/t)*100).toFixed(2)}%`:'Invalid total';};
  } else if (mode === 'tip') {
    modalArea.innerHTML = `<input id="b" class="inline" type="number" placeholder="Bill"/> <input id="p" class="inline" type="number" placeholder="Tip %"/> <button id="go">Calc Tip</button><p id="o"></p>`;
    document.getElementById('go').onclick=()=>{const b=Number(document.getElementById('b').value),p=Number(document.getElementById('p').value);document.getElementById('o').textContent=`Tip: ${(b*p/100).toFixed(2)} | Total: ${(b+b*p/100).toFixed(2)}`;};
  } else if (mode === 'age') {
    modalArea.innerHTML = `<input id="d" class="inline" type="date"/> <button id="a">Calculate Age</button><p id="o"></p>`;
    document.getElementById('a').onclick=()=>{const dob=new Date(document.getElementById('d').value);const y=Math.floor((Date.now()-dob.getTime())/(365.25*24*60*60*1000));document.getElementById('o').textContent=`Approx age: ${y}`;};
  } else if (mode === 'palin') {
    modalArea.innerHTML = `<input id="t" class="inline" placeholder="text"/> <button id="p">Check</button><p id="o"></p>`;
    document.getElementById('p').onclick=()=>{const s=document.getElementById('t').value.toLowerCase().replace(/[^a-z0-9]/g,'');document.getElementById('o').textContent=s===s.split('').reverse().join('')?'Palindrome':'Not palindrome';};
  } else if (mode === 'altcase') {
    modalArea.innerHTML = `<input id="t" class="inline" placeholder="text"/> <button id="a">Alternate Case</button><p id="o"></p>`;
    document.getElementById('a').onclick=()=>{const s=document.getElementById('t').value;document.getElementById('o').textContent=[...s].map((ch,i)=>i%2?ch.toLowerCase():ch.toUpperCase()).join('');};
  } else if (mode === 'clean') {
    modalArea.innerHTML = `<textarea id="t" class="inline" placeholder="messy text"></textarea><button id="c">Clean Spaces</button><p id="o"></p>`;
    document.getElementById('c').onclick=()=>document.getElementById('o').textContent=document.getElementById('t').value.trim().replace(/\s+/g,' ');
  } else if (mode === 'char') {
    modalArea.innerHTML = `<input id="t" class="inline" placeholder="text"/> <button id="c">Pick Random Char</button><p id="o"></p>`;
    document.getElementById('c').onclick=()=>{const s=document.getElementById('t').value;document.getElementById('o').textContent=s?`Char: ${s[r(s.length)]}`:'Enter text';};
  } else if (mode === 'url') {
    modalArea.innerHTML = `<textarea id="t" class="inline" placeholder="url/text"></textarea><button id="e">Encode</button><button id="d">Decode</button><pre id="o"></pre>`;
    document.getElementById('e').onclick=()=>document.getElementById('o').textContent=encodeURIComponent(document.getElementById('t').value);
    document.getElementById('d').onclick=()=>{try{document.getElementById('o').textContent=decodeURIComponent(document.getElementById('t').value);}catch{document.getElementById('o').textContent='Invalid encoded input';}};
  } else if (mode === 'timer') {
    let it;
    modalArea.innerHTML = `<input id="s" class="inline" type="number" placeholder="seconds"/> <button id="st">Start Timer</button><p id="o"></p>`;
    document.getElementById('st').onclick=()=>{let n=Number(document.getElementById('s').value)||0;clearInterval(it);document.getElementById('o').textContent=`${n}s`;it=setInterval(()=>{n-=1;document.getElementById('o').textContent=n>0?`${n}s`:'Time up ⏰';if(n<=0)clearInterval(it);},1000);};
  } else if (mode === 'stopwatch') {
    let t=0,it;
    modalArea.innerHTML = `<button id="st">Start</button><button id="sp">Stop</button><button id="re">Reset</button><h3 id="o">0.0s</h3>`;
    const o=document.getElementById('o');
    document.getElementById('st').onclick=()=>{clearInterval(it);it=setInterval(()=>{t+=0.1;o.textContent=`${t.toFixed(1)}s`;},100);};
    document.getElementById('sp').onclick=()=>clearInterval(it);
    document.getElementById('re').onclick=()=>{clearInterval(it);t=0;o.textContent='0.0s';};
  } else {
    modalArea.textContent = 'Loaded.';
  }
}

searchInput.addEventListener('input', renderGrid);
filters.forEach((btn) => btn.addEventListener('click', () => {
  activeType = btn.dataset.type;
  filters.forEach((b) => b.classList.remove('active'));
  btn.classList.add('active');
  renderGrid();
}));
randomBtn.onclick = () => {
  const list = visibleProjects();
  if (!list.length) return;
  openProject(list[Math.floor(Math.random() * list.length)].id);
};

renderGrid();

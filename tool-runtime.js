const cfg = window.TOOL_CONFIG || { title: 'Tool', mode: 'calc' };
const app = document.getElementById('toolApp');
const clearBtn = document.getElementById('clearBtn');

if (!document.querySelector('.aurora')) {
  const aur = document.createElement('div');
  aur.className = 'aurora';
  document.body.prepend(aur);
}
if (!document.getElementById('cursorDot')) {
  const c = document.createElement('div');
  c.className = 'cursor-dot';
  c.id = 'cursorDot';
  document.body.appendChild(c);
}
if (!document.getElementById('cursorRing')) {
  const r = document.createElement('div');
  r.className = 'cursor-ring';
  r.id = 'cursorRing';
  document.body.appendChild(r);
}
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
function applyCursorTheme(mode) {
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
}
applyCursorTheme(localStorage.getItem('cursor_theme') || 'neo');
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
window.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'b') window.location.href = '../index.html';
});

const h = (s) => s.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
const rnd = (n) => Math.floor(Math.random() * n);
const out = () => document.getElementById('out');

function setUI(html) {
  app.innerHTML = html;
}

function bind(id, fn) { const el = document.getElementById(id); if (el) el.onclick = fn; }

function render(mode) {
  if (mode === 'calc') {
    setUI(`<input id=a type=number placeholder=A> <select id=op><option>+</option><option>-</option><option>*</option><option>/</option></select> <input id=b type=number placeholder=B> <button id=go>Calculate</button><div id=out class=out></div>`);
    bind('go', () => { const a = Number(aEl.value), b = Number(bEl.value), op = opEl.value; out().textContent = `Result: ${op==='+'?a+b:op==='-'?a-b:op==='*'?a*b:(b?a/b:'∞')}`; });
    var aEl=document.getElementById('a'), bEl=document.getElementById('b'), opEl=document.getElementById('op');
  } else if (mode === 'bmi') {
    setUI(`<input id=h type=number placeholder='Height cm'> <input id=w type=number placeholder='Weight kg'> <button id=go>Check</button><div id=out class=out></div>`);
    bind('go', () => { const hh = Number(h.value) / 100; const ww = Number(w.value); out().textContent = hh ? `BMI: ${(ww/(hh*hh)).toFixed(2)}` : 'Enter valid values'; });
  } else if (mode === 'km_miles') {
    setUI(`<input id=km type=number placeholder=KM> <button id=toM>To Miles</button> <input id=mi type=number placeholder=Miles> <button id=toK>To KM</button><div id=out class=out></div>`);
    bind('toM', () => out().textContent = `${(Number(km.value)*0.621371).toFixed(3)} miles`);
    bind('toK', () => out().textContent = `${(Number(mi.value)/0.621371).toFixed(3)} km`);
  } else if (mode === 'json') {
    setUI(`<textarea id=t rows=8 placeholder='{"a":1}'></textarea><button id=go>Format</button><pre id=out class=out></pre>`);
    bind('go', () => { try { out().textContent = JSON.stringify(JSON.parse(t.value), null, 2); } catch { out().textContent = 'Invalid JSON'; } });
  } else if (mode === 'base64') {
    setUI(`<textarea id=t rows=6 placeholder='text or base64'></textarea><button id=en>Encode</button> <button id=de>Decode</button><pre id=out class=out></pre>`);
    bind('en', () => out().textContent = btoa(unescape(encodeURIComponent(t.value))));
    bind('de', () => { try { out().textContent = decodeURIComponent(escape(atob(t.value))); } catch { out().textContent = 'Invalid base64'; } });
  } else if (mode === 'reverse') {
    setUI(`<input id=t placeholder='text'> <button id=go>Reverse</button><div id=out class=out></div>`); bind('go', ()=> out().textContent = t.value.split('').reverse().join(''));
  } else if (mode === 'case') {
    setUI(`<textarea id=t rows=5 placeholder='text'></textarea><button id=u>UPPER</button> <button id=l>lower</button><div id=out class=out></div>`); bind('u', ()=> out().textContent=t.value.toUpperCase()); bind('l', ()=> out().textContent=t.value.toLowerCase());
  } else if (mode === 'count') {
    setUI(`<textarea id=t rows=6 placeholder='text'></textarea><button id=go>Count</button><div id=out class=out></div>`); bind('go', ()=> { const v=t.value; out().textContent=`Chars: ${v.length}, Words: ${v.trim()?v.trim().split(/\s+/).length:0}`; });
  } else if (mode === 'password') {
    setUI(`<button id=go>Generate</button><div id=out class=out></div>`); bind('go', ()=> { const chars='ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*'; let s=''; for(let i=0;i<16;i++) s+=chars[rnd(chars.length)]; out().textContent=s; });
  } else if (mode === 'hex') {
    setUI(`<button id=go>Generate Color</button><div id=out class=out></div><div id=sw style='height:60px;border-radius:10px;border:1px solid #5d73b8;margin-top:8px;'></div>`); bind('go', ()=> { const c='#'+Math.floor(Math.random()*16777215).toString(16).padStart(6,'0'); out().textContent=c; sw.style.background=c; });
  } else if (mode === 'box') {
    setUI(`<input id=t placeholder='text'> <button id=go>Build</button><pre id=out class=out></pre>`); bind('go', ()=> {const x=t.value;const line='+'.padEnd(x.length+3,'-')+'+';out().textContent=`${line}\n| ${x} |\n${line}`});
  } else if (mode === 'decide') {
    setUI(`<input id=a placeholder='Option A'> <input id=b placeholder='Option B'> <button id=go>Pick</button><div id=out class=out></div>`); bind('go', ()=> out().textContent = Math.random() < .5 ? (a.value||'A') : (b.value||'B'));
  } else if (mode === 'notes') {
    setUI(`<textarea id=t rows=8 placeholder='Write notes...'></textarea><button id=go>Save</button><div id=out class=out></div>`); t.value = localStorage.getItem('proboiz_notes_tool') || ''; bind('go', ()=> { localStorage.setItem('proboiz_notes_tool', t.value); out().textContent='Saved locally'; });
  } else if (mode === 'joke') {
    const jokes=['Why do programmers mix up Halloween and Christmas? Because OCT 31 == DEC 25.','I changed my password to incorrect. So whenever I forget, it says your password is incorrect.','There are 10 kinds of people: those who know binary and those who don\'t.'];
    setUI(`<button id=go>New Joke</button><div id=out class=out></div>`); bind('go', ()=> out().textContent=jokes[rnd(jokes.length)]);
  } else if (mode === 'compliment') {
    const c=['You are building awesome stuff 🔥','Your productivity is elite ⚡','You ship features like a pro 🚀'];
    setUI(`<button id=go>Give Compliment</button><div id=out class=out></div>`); bind('go', ()=> out().textContent=c[rnd(c.length)]);
  } else if (mode === 'meme') {
    const m=['ULTRA PRO MAX MODE','Works on my machine ✅','Deploy Friday? Absolutely not'];
    setUI(`<button id=go>Generate</button><h3 id=out class=out></h3>`); bind('go', ()=> out().textContent=m[rnd(m.length)]);
  } else if (mode === 'shuffle') {
    setUI(`<textarea id=t rows=5 placeholder='sentence'></textarea><button id=go>Shuffle</button><div id=out class=out></div>`); bind('go', ()=> {const a=t.value.split(/\s+/).filter(Boolean);a.sort(()=>Math.random()-0.5);out().textContent=a.join(' ');});
  } else if (mode === 'emojis') {
    const e=['😂','🔥','😎','🚀','🎉','🧠','💯'];
    setUI(`<button id=go>Generate</button><div id=out class=out></div>`); bind('go', ()=> {let s='';for(let i=0;i<10;i++) s+=e[rnd(e.length)];out().textContent=s;});
  } else if (mode === 'time') {
    setUI(`<button id=go>Show Time</button><div id=out class=out></div>`); bind('go', ()=> out().textContent = new Date().toLocaleString());
  } else if (mode === 'binary') {
    setUI(`<input id=t placeholder='text'> <button id=go>Convert</button><pre id=out class=out></pre>`); bind('go', ()=> out().textContent=[...t.value].map(ch=>ch.charCodeAt(0).toString(2).padStart(8,'0')).join(' '));
  } else if (mode === 'percent') {
    setUI(`<input id=a type=number placeholder='Part'> <input id=b type=number placeholder='Total'> <button id=go>Calculate</button><div id=out class=out></div>`); bind('go', ()=> out().textContent = Number(b.value) ? `${((Number(a.value)/Number(b.value))*100).toFixed(2)}%` : 'Invalid total');
  } else if (mode === 'tip') {
    setUI(`<input id=bill type=number placeholder='Bill'> <input id=p type=number placeholder='Tip %'> <button id=go>Calculate</button><div id=out class=out></div>`); bind('go', ()=> {const b=Number(bill.value), p=Number(window.p.value);const tip=b*p/100;out().textContent=`Tip: ${tip.toFixed(2)} | Total: ${(b+tip).toFixed(2)}`});
  } else if (mode === 'age') {
    setUI(`<input id=d type=date> <button id=go>Calculate</button><div id=out class=out></div>`); bind('go', ()=> {const dob=new Date(d.value); const y=Math.floor((Date.now()-dob.getTime())/(365.25*86400000)); out().textContent=`Approx age: ${y}`;});
  } else if (mode === 'palin') {
    setUI(`<input id=t placeholder='text'> <button id=go>Check</button><div id=out class=out></div>`); bind('go', ()=> {const s=t.value.toLowerCase().replace(/[^a-z0-9]/g,''); out().textContent=s&&s===s.split('').reverse().join('')?'Palindrome':'Not palindrome';});
  } else if (mode === 'altcase') {
    setUI(`<input id=t placeholder='text'> <button id=go>Convert</button><div id=out class=out></div>`); bind('go', ()=> out().textContent=[...t.value].map((ch,i)=>i%2?ch.toLowerCase():ch.toUpperCase()).join(''));
  } else if (mode === 'clean') {
    setUI(`<textarea id=t rows=5 placeholder='messy text'></textarea><button id=go>Clean</button><div id=out class=out></div>`); bind('go', ()=> out().textContent=t.value.trim().replace(/\s+/g,' '));
  } else if (mode === 'char') {
    setUI(`<input id=t placeholder='text'> <button id=go>Pick</button><div id=out class=out></div>`); bind('go', ()=> out().textContent=t.value?`Picked: ${t.value[rnd(t.value.length)]}`:'Enter text');
  } else if (mode === 'url') {
    setUI(`<textarea id=t rows=5 placeholder='URL/text'></textarea><button id=e>Encode</button> <button id=d>Decode</button><pre id=out class=out></pre>`); bind('e', ()=> out().textContent=encodeURIComponent(t.value)); bind('d', ()=> {try{out().textContent=decodeURIComponent(t.value)}catch{out().textContent='Invalid encoded input'}});
  } else if (mode === 'timer') {
    let it;
    setUI(`<input id=s type=number placeholder='seconds'> <button id=go>Start</button><div id=out class=out></div>`);
    bind('go', ()=> { let n=Number(s.value)||0; clearInterval(it); out().textContent=`${n}s`; it=setInterval(()=>{n-=1; out().textContent = n>0?`${n}s`:'Time up ⏰'; if(n<=0) clearInterval(it);},1000); });
  } else if (mode === 'stopwatch') {
    let t=0,it;
    setUI(`<button id=st>Start</button> <button id=sp>Stop</button> <button id=re>Reset</button><div id=out class=out>0.0s</div>`);
    bind('st', ()=>{ clearInterval(it); it=setInterval(()=>{t+=0.1; out().textContent=`${t.toFixed(1)}s`;},100); });
    bind('sp', ()=>clearInterval(it));
    bind('re', ()=>{ clearInterval(it); t=0; out().textContent='0.0s'; });
  } else if (mode === 'prime') {
    setUI(`<input id=n type=number placeholder='number'> <button id=go>Check Prime</button><div id=out class=out></div>`);
    bind('go', ()=> { const x=Math.floor(Number(n.value)); if(x<2){out().textContent='Not prime';return;} for(let i=2;i*i<=x;i++){if(x%i===0){out().textContent='Not prime';return;}} out().textContent='Prime ✅'; });
  } else if (mode === 'factorial') {
    setUI(`<input id=n type=number placeholder='n'> <button id=go>Factorial</button><div id=out class=out></div>`); bind('go', ()=>{let x=Math.floor(Number(n.value));if(x<0||x>170){out().textContent='Use 0..170';return;}let f=1;for(let i=2;i<=x;i++)f*=i;out().textContent=`${x}! = ${f}`;});
  } else if (mode === 'fibonacci') {
    setUI(`<input id=n type=number placeholder='count'> <button id=go>Generate</button><div id=out class=out></div>`); bind('go', ()=>{let c=Math.floor(Number(n.value)||0);c=Math.min(Math.max(c,1),100);const a=[0,1];while(a.length<c)a.push(a.at(-1)+a.at(-2));out().textContent=a.slice(0,c).join(', ');});
  } else if (mode === 'gcd_lcm') {
    setUI(`<input id=a type=number placeholder='A'> <input id=b type=number placeholder='B'> <button id=go>Compute</button><div id=out class=out></div>`); bind('go', ()=>{let x=Math.abs(Number(a.value)),y=Math.abs(Number(b.value));let m=x,n=y;while(n){[m,n]=[n,m%n]}const gcd=m||0,lcm=(x&&y)?(x*y)/gcd:0;out().textContent=`GCD: ${gcd} | LCM: ${lcm}`});
  } else if (mode === 'rand_range') {
    setUI(`<input id=min type=number placeholder='min'> <input id=max type=number placeholder='max'> <button id=go>Generate</button><div id=out class=out></div>`); bind('go', ()=>{const mn=Math.floor(Number(min.value)), mx=Math.floor(Number(max.value)); if(mx<mn){out().textContent='max must be >= min';return;} out().textContent=String(Math.floor(Math.random()*(mx-mn+1))+mn);});
  } else if (mode === 'temp') {
    setUI(`<input id=c type=number placeholder='Celsius'> <button id=cf>→ Fahrenheit</button> <input id=f type=number placeholder='Fahrenheit'> <button id=fc>→ Celsius</button><div id=out class=out></div>`); bind('cf',()=>out().textContent=`${(Number(c.value)*9/5+32).toFixed(2)} °F`); bind('fc',()=>out().textContent=`${((Number(f.value)-32)*5/9).toFixed(2)} °C`);
  } else if (mode === 'currency') {
    setUI(`<p>Using fixed demo rate: 1 USD = 83 INR</p><input id=u type=number placeholder='USD'> <button id=ui>USD→INR</button> <input id=i type=number placeholder='INR'> <button id=iu>INR→USD</button><div id=out class=out></div>`); bind('ui',()=>out().textContent=`₹ ${(Number(u.value)*83).toFixed(2)}`); bind('iu',()=>out().textContent=`$ ${(Number(i.value)/83).toFixed(2)}`);
  } else if (mode === 'markdown') {
    setUI(`<textarea id=t rows=8 placeholder='# Title\n- item'></textarea><button id=go>Preview</button><div id=out class=out></div>`);
    bind('go', ()=>{ let s=h(t.value); s=s.replace(/^###\s(.+)$/gm,'<h3>$1</h3>').replace(/^##\s(.+)$/gm,'<h2>$1</h2>').replace(/^#\s(.+)$/gm,'<h1>$1</h1>').replace(/\*\*(.+?)\*\*/g,'<b>$1</b>').replace(/\*(.+?)\*/g,'<i>$1</i>').replace(/^\-\s(.+)$/gm,'• $1').replace(/\n/g,'<br>'); out().innerHTML=s; });
  } else if (mode === 'sort_lines') {
    setUI(`<textarea id=t rows=8 placeholder='one line per item'></textarea><button id=go>Sort</button><pre id=out class=out></pre>`); bind('go',()=>{out().textContent=t.value.split(/\r?\n/).sort((a,b)=>a.localeCompare(b)).join('\n')});
  } else if (mode === 'dedupe') {
    setUI(`<textarea id=t rows=8 placeholder='one line per item'></textarea><button id=go>Remove Duplicates</button><pre id=out class=out></pre>`); bind('go',()=>{out().textContent=[...new Set(t.value.split(/\r?\n/))].join('\n')});
  } else if (mode === 'slug') {
    setUI(`<input id=t placeholder='Title Here'> <button id=go>Create Slug</button><div id=out class=out></div>`); bind('go',()=>{out().textContent=t.value.toLowerCase().trim().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-')});
  } else if (mode === 'uuid') {
    setUI(`<button id=go>Generate UUID</button><div id=out class=out></div>`); bind('go',()=>{const u='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,c=>{const r=Math.random()*16|0,v=c==='x'?r:(r&0x3|0x8);return v.toString(16)});out().textContent=u});
  } else if (mode === 'sha256') {
    setUI(`<textarea id=t rows=5 placeholder='text'></textarea><button id=go>Hash</button><pre id=out class=out></pre>`);
    bind('go', async ()=>{const buf=await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t.value)); out().textContent=[...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,'0')).join('');});
  } else if (mode === 'diff') {
    setUI(`<textarea id=a rows=5 placeholder='Text A'></textarea><textarea id=b rows=5 placeholder='Text B'></textarea><button id=go>Compare</button><pre id=out class=out></pre>`);
    bind('go', ()=>{const A=a.value.split(/\r?\n/), B=b.value.split(/\r?\n/); const mx=Math.max(A.length,B.length); let r=''; for(let i=0;i<mx;i++){if((A[i]||'')===(B[i]||'')) r+=`  ${A[i]||''}\n`; else { if(A[i]!==undefined) r+=`- ${A[i]}\n`; if(B[i]!==undefined) r+=`+ ${B[i]}\n`; }} out().textContent=r||'No content';});
  } else if (mode === 'roman') {
    setUI(`<input id=n type=number placeholder='1..3999'> <button id=go>Convert</button><div id=out class=out></div>`);
    bind('go', ()=>{let x=Math.floor(Number(n.value)); if(x<1||x>3999){out().textContent='Use 1..3999';return;} const m=[[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']]; let s=''; for(const [v,t] of m){while(x>=v){s+=t;x-=v;}} out().textContent=s;});
  } else if (mode === 'tz') {
    setUI(`<button id=go>Show Times</button><div id=out class=out></div>`); bind('go',()=>{const d=new Date(); out().innerHTML=`Local: ${d.toString()}<br>UTC: ${d.toUTCString()}`});
  } else if (mode === 'salary') {
    setUI(`<input id=s type=number placeholder='Annual salary'> <button id=go>Breakdown</button><div id=out class=out></div>`); bind('go',()=>{const a=Number(s.value); out().textContent=`Monthly: ${(a/12).toFixed(2)} | Weekly: ${(a/52).toFixed(2)} | Daily: ${(a/365).toFixed(2)}`});
  } else if (mode === 'emi') {
    setUI(`<input id=p type=number placeholder='Principal'> <input id=r type=number placeholder='Annual rate %'> <input id=n type=number placeholder='Months'> <button id=go>Calculate EMI</button><div id=out class=out></div>`);
    bind('go',()=>{const P=Number(p.value), R=Number(r.value)/12/100, N=Number(n.value); if(!P||!N){out().textContent='Enter valid values';return;} const emi=R? (P*R*(1+R)**N)/(((1+R)**N)-1) : P/N; out().textContent=`EMI: ${emi.toFixed(2)}`;});
  } else if (mode === 'pct_change') {
    setUI(`<input id=a type=number placeholder='Old value'> <input id=b type=number placeholder='New value'> <button id=go>Calculate</button><div id=out class=out></div>`); bind('go',()=>{const A=Number(a.value),B=Number(b.value); out().textContent=A?`${(((B-A)/A)*100).toFixed(2)}%`:'Old value cannot be 0';});
  } else if (mode === 'qr') {
    setUI(`<input id=t placeholder='Text / URL'> <button id=go>Generate QR</button><div id=out class=out></div><div id=qrBox style='margin-top:8px'></div>`);
    bind('go',()=>{const v=encodeURIComponent(t.value.trim()); if(!v){out().textContent='Enter text';return;} const src=`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${v}`; qrBox.innerHTML=`<img alt='QR code' src='${src}'>`; out().textContent='QR generated';});
  } else {
    setUI(`<p>Tool mode not implemented: ${h(mode)}</p>`);
  }
}

clearBtn?.addEventListener('click', () => render(cfg.mode));
render(cfg.mode);

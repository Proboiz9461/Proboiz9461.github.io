const d=document.createElement('div');d.className='cursor-dot';
const r=document.createElement('div');r.className='cursor-ring';
document.body.append(d,r);
addEventListener('mousemove',e=>{d.style.left=r.style.left=e.clientX+'px';d.style.top=r.style.top=e.clientY+'px';});

const p=new URLSearchParams(location.search);
document.getElementById('issuedAt').textContent=p.get('issued')||new Date().toLocaleString();
document.getElementById('printBtn').onclick=()=>window.print();

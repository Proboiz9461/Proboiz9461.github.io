const d=document.createElement('div');
d.className='cursor-dot';
const r=document.createElement('div');
r.className='cursor-ring';
document.body.append(d,r);
addEventListener('mousemove',e=>{d.style.left=r.style.left=e.clientX+'px';d.style.top=r.style.top=e.clientY+'px';});

const phrase='I Am A Human , Not Nirbhay';
document.getElementById('verify').onclick=()=>{
  const q=document.getElementById('searchInput').value.trim();
  if(q===phrase){
    const issued=encodeURIComponent(new Date().toLocaleString());
    window.location.href=`certificate.html?issued=${issued}`;
  }else{
    alert('Phrase did not match exactly.');
  }
};

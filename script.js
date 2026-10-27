
const modal=document.getElementById('searchModal');
const input=document.getElementById('searchInput');
const results=document.getElementById('searchResults');
const sidebar=document.getElementById('sidebar');

document.querySelectorAll('.nav-group-title').forEach(btn=>{
  btn.addEventListener('click',()=>btn.parentElement.classList.toggle('open'));
});
document.getElementById('mobileMenu').addEventListener('click',()=>sidebar.classList.toggle('open'));
document.querySelectorAll('.sidebar a').forEach(a=>a.addEventListener('click',()=>sidebar.classList.remove('open')));

function openSearch(){modal.classList.add('open');modal.setAttribute('aria-hidden','false');setTimeout(()=>input.focus(),40)}
function closeSearch(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true')}
document.getElementById('searchOpen').addEventListener('click',openSearch);
document.getElementById('heroSearch').addEventListener('click',openSearch);
document.getElementById('searchClose').addEventListener('click',closeSearch);
modal.addEventListener('click',e=>{if(e.target===modal)closeSearch()});
document.addEventListener('keydown',e=>{
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openSearch()}
  if(e.key==='Escape')closeSearch()
});

const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
input.addEventListener('input',()=>{
  const q=normalize(input.value.trim());
  if(!q){results.innerHTML='<p>Digite uma palavra para encontrar uma regra.</p>';return}
  const cards=[...document.querySelectorAll('.rule-card')];
  const matches=cards.filter(c=>normalize(c.dataset.search||c.innerText).includes(q)).slice(0,20);
  if(!matches.length){results.innerHTML='<p>Nenhuma regra encontrada.</p>';return}
  results.innerHTML=matches.map(c=>{
    const title=c.querySelector('h3')?.textContent||'Regra';
    const category=c.closest('.category')?.querySelector('h2')?.textContent||'Medellín Roleplay';
    return `<a class="result" href="#${c.id}"><b>${title}</b><small>${category}</small></a>`;
  }).join('');
  results.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeSearch));
});

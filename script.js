
const cart = [];
const drawer = document.getElementById('drawer');
const shade = document.getElementById('shade');
const count = document.getElementById('cartCount');
const items = document.getElementById('cartItems');
const total = document.getElementById('cartTotal');
const title = document.getElementById('catalogTitle');
const subtitle = document.getElementById('catalogSubtitle');

function money(v){ return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); }

function renderCart(){
  count.textContent = cart.length;
  if(!cart.length){
    items.innerHTML = '<p class="empty">Seu carrinho está vazio.</p>';
    total.textContent = money(0); return;
  }
  items.innerHTML = cart.map((p,i)=>`
    <div class="cart-item">
      <div><b>${p.name}</b><br><small>${money(p.price)}</small></div>
      <button onclick="removeItem(${i})">Remover</button>
    </div>`).join('');
  total.textContent = money(cart.reduce((s,p)=>s+p.price,0));
}
window.removeItem=i=>{cart.splice(i,1);renderCart();}
function openCart(){drawer.classList.add('open');shade.classList.add('show')}
function closeCart(){drawer.classList.remove('open');shade.classList.remove('show')}

document.querySelectorAll('.buy').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const diamonds=Number(btn.dataset.diamonds||0);
    const name=btn.dataset.product || `💎 ${diamonds.toLocaleString('pt-BR')} Diamantes`;
    cart.push({name,price:Number(btn.dataset.price)});
    renderCart();openCart();
  });
});
document.getElementById('cartBtn').onclick=openCart;
document.getElementById('closeCart').onclick=closeCart;
shade.onclick=closeCart;

let currentFilter='diamantes';
function applyFilter(filter){
  currentFilter=filter;
  document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('active',b.dataset.filter===filter));
  document.querySelectorAll('.product-card').forEach(card=>{
    card.hidden = filter!=='all' && card.dataset.category!==filter;
  });
  if(filter==='diamantes'){title.textContent='Pacotes de Diamantes';subtitle.textContent='200 Diamantes = R$ 1,00. Escolha o pacote ideal para você.'}
  else if(filter==='outros'){title.textContent='Outros Produtos';subtitle.textContent='Serviços especiais da Medellín Roleplay.'}
  else {title.textContent='Catálogo Completo';subtitle.textContent='Todos os produtos disponíveis na loja.'}
}
document.querySelectorAll('.tab').forEach(btn=>btn.addEventListener('click',()=>applyFilter(btn.dataset.filter)));

document.getElementById('search').addEventListener('input',e=>{
  const q=e.target.value.toLowerCase().trim();
  document.querySelectorAll('.product-card').forEach(card=>{
    const allowed=currentFilter==='all'||card.dataset.category===currentFilter;
    card.hidden=!(allowed && card.dataset.name.toLowerCase().includes(q));
  });
});
applyFilter('diamantes');

document.getElementById('checkout').addEventListener('click',()=>{
  if(!cart.length){alert('Adicione um produto ao carrinho primeiro.');return;}
  alert('Carrinho pronto. O pagamento real ainda precisa ser conectado ao seu gateway/PIX.');
});

/* ===== Simple data-driven menu =====
   Edit the menuData array to add/remove items.
   Each item: id, section ('drinks' or 'milk'), name, price, desc, img (url), waText
*/
const menuData = [
  // Coffee Drinks
  {
    id: 'espresso',
    section: 'drinks',
    name: 'Espresso',
    price: '12 RMB',
    desc: 'Strong and fresh',
    img: 'https://source.unsplash.com/300x300/?espresso',
    waText: 'Salam Amine, bghit Espresso wahd'
  },
  {
    id: 'americano',
    section: 'drinks',
    name: 'Americano',
    price: '14 RMB',
    desc: 'Classic black coffee',
    img: 'https://source.unsplash.com/300x300/?americano',
    waText: 'Salam Amine, bghit Americano wahd'
  },

  // Coffee + Milk
  {
    id: 'latte',
    section: 'milk',
    name: 'Latte',
    price: '15 RMB',
    desc: 'Smooth coffee with milk foam',
    img: 'https://source.unsplash.com/300x300/?latte',
    waText: 'Salam Amine, bghit Latte wahd'
  },
  {
    id: 'cappuccino',
    section: 'milk',
    name: 'Cappuccino',
    price: '15 RMB',
    desc: 'Creamy with chocolate sprinkle',
    img: 'https://source.unsplash.com/300x300/?cappuccino',
    waText: 'Salam Amine, bghit Cappuccino wahd'
  }
];

/* ===== Helpers ===== */
function createCard(item) {
  const card = document.createElement('article');
  card.className = 'card';
  card.dataset.id = item.id;

  // image
  const img = document.createElement('img');
  img.className = 'thumb';
  img.src = item.img;
  img.alt = item.name;

  // content
  const content = document.createElement('div');
  content.className = 'content';
  const title = document.createElement('h3');
  title.className = 'title';
  title.textContent = item.name;
  const desc = document.createElement('div');
  desc.className = 'desc';
  desc.textContent = item.desc;
  const price = document.createElement('div');
  price.className = 'price';
  price.textContent = item.price;

  content.appendChild(title);
  content.appendChild(desc);
  content.appendChild(price);

  // actions (WhatsApp button)
  const actions = document.createElement('div');
  actions.className = 'actions';
  const btn = document.createElement('a');
  btn.className = 'btn-order';

  /* === IMPORTANT: Replace the phone number below with your WhatsApp number in international format.
     Example: Morocco 212XXXXXXXX  or China 86XXXXXXXXXX
  */
  const phone = '212652450553'; // <-- replace this with your number
  const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(item.waText)}`;
  btn.href = waLink;
  btn.target = '_blank';
  btn.rel = 'noopener';
  btn.textContent = 'Order';

  // Track click in localStorage (simple)
  btn.addEventListener('click', () => {
    incrementClickCount(item.id);
  });

  actions.appendChild(btn);

  // assemble
  card.appendChild(img);
  card.appendChild(content);
  card.appendChild(actions);

  return card;
}

function incrementClickCount(id) {
  const key = `click_${id}`;
  const current = Number(localStorage.getItem(key) || 0);
  localStorage.setItem(key, current + 1);
  // optional: console log
  console.log(`[track] ${id} clicked — total: ${current + 1}`);
}

/* ===== Render menu by section ===== */
function renderMenu() {
  const drinksGrid = document.getElementById('grid-coffee-drinks');
  const milkGrid = document.getElementById('grid-coffee-milk');
  drinksGrid.innerHTML = '';
  milkGrid.innerHTML = '';

  menuData.forEach(item => {
    const card = createCard(item);
    if (item.section === 'drinks') drinksGrid.appendChild(card);
    else if (item.section === 'milk') milkGrid.appendChild(card);
  });
}

/* initial render */
renderMenu();

/* ===== Optional: expose functions for dev console ===== */
window.menuData = menuData;
window.renderMenu = renderMenu;

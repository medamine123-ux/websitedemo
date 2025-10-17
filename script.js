const menuData = [
  {
    id: 'espresso',
    name: 'Espresso',
    variants: [
      { 
        name: 'Robusta', 
        price: '5 RMB', 
        waText: 'I want Robusta',
        img: './images/espresso1.png',
        desc: 'A bold and intense espresso made from pure Robusta beans — strong flavor with high caffeine.'
      },
      { 
        name: '75% Robusta / 25% Arabica', 
        price: '6 RMB', 
        waText: 'I want 75% Robusta / 25% Arabica',
        img: './images/75-25.png',
        desc: 'A balanced espresso blend — powerful Robusta mixed with smooth Arabica for rich aroma.'
      },
      { 
        name: '100% Arabica', 
        price: '8 RMB', 
        waText: 'I want 100% Arabica',
        img: './images/100.png',
        desc: 'A smooth and slightly sweet espresso with gentle acidity, made entirely from Arabica beans.'
      }
    ]
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    variants: [
      { 
        name: 'Cappuccino Classic', 
        price: '6 RMB', 
        waText: 'I want Cappuccino Classic',
        img: './images/test4.png',
        desc: 'A perfect mix of espresso, steamed milk, and milk foam — creamy and comforting.'
      },
      { 
        name: 'Cappuccino Chocolate', 
        price: '6 RMB', 
        waText: 'I want Cappuccino Chocolate',
        img: './images/capp2.png',
        desc: 'Rich cappuccino with a touch of chocolate — smooth, sweet, and delicious.'
      }
    ]
  },
  {
    id: 'latte',
    name: 'Latte',
    variants: [
      { 
        name: 'Latte', 
        price: '6 RMB', 
        waText: 'I want Latte',
        img: './images/Latte rosetta.png',
        desc: 'A gentle coffee with more milk for a smooth, creamy taste — light and easy to drink.'
      },
      { 
        name: 'Vanilla Latte', 
        price: '7 RMB', 
        waText: 'I want Vanilla Latte',
        img: './images/vanilla latte.png',
        desc: 'A latte with a soft touch of vanilla — aromatic, cozy, and perfectly sweet.'
      }
    ]
  },
  {
    id: 'milk-drinks',
    name: 'Milk Specials',
    variants: [
      { 
        name: 'Milk with Cacao', 
        price: '6 RMB', 
        waText: 'I want Milk with Cacao',
        img: './images/milk cacao.png',
        desc: 'Warm milk mixed with real cacao — smooth, sweet, and perfect for chocolate lovers.'
      },
      { 
        name: 'Milk with Nescafé', 
        price: '6 RMB', 
        waText: 'I want Milk with Nescafé',
        img: './images/nescafe.png',
        desc: 'A comforting mix of milk and Nescafé coffee — gentle flavor and smooth texture.'
      },
      { 
        name: 'Milk with Louisa Herb', 
        price: '6 RMB', 
        waText: 'I want Milk with Louisa Herb',
        img: './images/louisa.png',
        desc: 'Fresh milk with Louisa herb — lightly sweet and relaxing, great for calm moments.'
      }
    ]
  }
];

/* ===== Render Menu ===== */
function renderMenu() {
  const menuSection = document.getElementById('menu-section');
  const categoriesNav = document.getElementById('categories');
  menuSection.innerHTML = '';
  categoriesNav.innerHTML = '';

  // ==== Left categories ====
  menuData.forEach(item => {
    const catLink = document.createElement('div');
    catLink.className = 'category';
    catLink.textContent = item.name;
    catLink.dataset.id = item.id;
    categoriesNav.appendChild(catLink);

    catLink.addEventListener('click', () => {
      document.querySelectorAll('.category').forEach(c => c.classList.remove('active'));
      catLink.classList.add('active');

      const section = document.getElementById(`${item.id}-0`);
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ==== Right menu ====
  menuData.forEach(item => {
    const titleContainer = document.createElement('div');
    titleContainer.className = 'section-title';
    titleContainer.innerHTML = `
      <span class="line"></span>
      <h2>${item.name}</h2>
      <span class="line"></span>
    `;
    menuSection.appendChild(titleContainer);

    item.variants.forEach((variant, index) => {
      const section = document.createElement('div');
      section.className = 'menu-item-section';
      section.id = `${item.id}-${index}`;

      const card = document.createElement('div');
      card.className = 'card';

      const img = document.createElement('img');
      img.src = variant.img;
      img.alt = variant.name;
      img.className = 'thumb';

      const content = document.createElement('div');
      content.className = 'content';

      const title = document.createElement('h3');
      title.textContent = variant.name;

      const price = document.createElement('p');
      price.textContent = variant.price;
      price.style.fontWeight = 'bold';
      price.style.color = '#b8860b';

      const btn = document.createElement('button');
      btn.className = 'btn-small';
      btn.textContent = 'Order';
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openPopup(variant);
      });

      content.appendChild(title);
      content.appendChild(price);
      content.appendChild(btn);

      card.appendChild(img);
      card.appendChild(content);
      section.appendChild(card);
      menuSection.appendChild(section);

      card.addEventListener('click', () => openPopup(variant));
    });
  });
}

renderMenu();

/* ===== Popup Logic ===== */
const popup = document.getElementById('drinkPopup');
const popupImg = document.getElementById('popupImg');
const popupTitle = document.getElementById('popupTitle');
const popupPrice = document.getElementById('popupPrice');
const waLink = document.getElementById('waLink');
const popupClose = document.querySelector('.popup .close');

function openPopup(variant) {
  popupImg.src = variant.img;
  popupTitle.textContent = variant.name;
  popupPrice.textContent = variant.price;

  const descDiv = document.getElementById('drinkDesc');
  descDiv.innerHTML = `<p style="font-size: 0.95rem; color: #333; margin-top: 10px; margin-bottom: 50px;">
      ${variant.desc}
    </p>`;

  // Reset sugar
  const sugarNormal = document.getElementById('normal-sugar');
  if (sugarNormal) sugarNormal.checked = true;

  // Update WhatsApp link but keep the <i> icon intact
  function updateWaLink() {
    const selectedSugar = document.querySelector('input[name="sugar"]:checked').value;
    waLink.href = `https://wa.me/212652450553?text=${encodeURIComponent(variant.waText + " (" + selectedSugar + ")")}`;
    const span = waLink.querySelector('span');
    if (span) span.textContent = ' 💬 Order via WhatsApp 💚';

  }

  updateWaLink();
  document.querySelectorAll('input[name="sugar"]').forEach(radio => {
    radio.addEventListener('change', updateWaLink);
  });

  popup.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}


popupClose.addEventListener('click', closePopup);
popup.addEventListener('click', (e) => {
  if (e.target === popup) closePopup();
});

function closePopup() {
  popup.style.display = 'none';
  document.body.style.overflow = 'auto';
}

/* ===== Slider Logic ===== */
let slideIndex = 0;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

let autoSlide = setInterval(() => plusSlides(1), 6000);

function showSlides(n) {
  const slides = document.querySelectorAll(".slide");
  if (n >= slides.length) slideIndex = 0;
  if (n < 0) slideIndex = slides.length - 1;

  slides.forEach(slide => slide.style.display = "none");
  slides[slideIndex].style.display = "block";
}


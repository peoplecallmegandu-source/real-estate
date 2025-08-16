// Shared interactions for Horizon Realty website

// Mobile nav toggle (works across pages)
const navToggleBtn = document.getElementById('nav-toggle');
const mobileNav = document.getElementById('mobile-nav');
const navOpenIcon = document.getElementById('nav-open');
const navCloseIcon = document.getElementById('nav-close');
if (navToggleBtn) {
  navToggleBtn.addEventListener('click', () => {
    if (mobileNav && mobileNav.classList.contains('hidden')) {
      mobileNav.classList.remove('hidden');
      if (navOpenIcon) navOpenIcon.classList.add('hidden');
      if (navCloseIcon) navCloseIcon.classList.remove('hidden');
    } else if (mobileNav) {
      mobileNav.classList.add('hidden');
      if (navOpenIcon) navOpenIcon.classList.remove('hidden');
      if (navCloseIcon) navCloseIcon.classList.add('hidden');
    }
  });
}

// Year in footer (index.html)
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Listings filter (index.html)
const filterButtons = document.querySelectorAll('.filter-btn');
const listingCards = document.querySelectorAll('.listing-card');
if (filterButtons.length && listingCards.length) {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      // button style update
      filterButtons.forEach(b => b.classList.remove('bg-amber-700','text-white'));
      btn.classList.add('bg-amber-700','text-white');

      listingCards.forEach(card => {
        const t = card.getAttribute('data-type');
        if (filter === 'all' || t === filter) {
          card.classList.remove('hidden');
          card.classList.add('animate-floatUp');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// Listing modal logic
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalSub = document.getElementById('modal-sub');
const modalImg = document.getElementById('modal-img');
const modalDesc = document.getElementById('modal-desc');
const modalFeatures = document.getElementById('modal-features');
const modalClose = document.getElementById('modal-close');

function openModalFromCard(card) {
  if (!modal) return;
  const title = card.querySelector('.font-medium') ? card.querySelector('.font-medium').textContent : 'Property';
  const sub = card.querySelector('.text-sm') ? card.querySelector('.text-sm').textContent : '';
  const img = card.querySelector('img') ? card.querySelector('img').getAttribute('src') : '';
  const price = card.querySelector('.text-amber-700') ? card.querySelector('.text-amber-700').textContent : '';

  modalTitle.textContent = title;
  modalSub.textContent = sub + ' — ' + price;
  modalImg.setAttribute('src', img);
  modalDesc.textContent = 'Beautiful property offering quality finishes, great natural light, and convenient access to local amenities. Contact our agents for a full showing and disclosures.';

  // features
  modalFeatures.innerHTML = '';
  const features = ['Spacious layout','Nearby parks & schools','Updated kitchen','Easy commute'];
  features.forEach(f => {
    const li = document.createElement('li');
    li.textContent = f;
    modalFeatures.appendChild(li);
  });

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

if (modalClose) {
  modalClose.addEventListener('click', () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  });
}

// Attach event listeners to view buttons
const viewButtons = document.querySelectorAll('.view-btn');
viewButtons.forEach((btn, idx) => {
  btn.addEventListener('click', (e) => {
    const card = e.target.closest('.listing-card');
    if (card) openModalFromCard(card);
  });
});

// Keyboard accessibility: Enter on card opens modal
listingCards.forEach(card => {
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') openModalFromCard(card);
  });
});

// Smooth anchor scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Tiny utility to open contact flow when "Contact Agent" clicked
const contactButtons = document.querySelectorAll('.save-btn');
contactButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    window.location.href = './contact.html';
  });
});

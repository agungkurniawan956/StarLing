// toggle hamburger menu
const navbarNav = document.querySelector('.navbar-nav');

document.querySelector('#hamburger-menu').onclick = () => {
  navbarNav.classList.toggle('active');
};

// toggle search button
const searchForm = document.querySelector('.search-form');
const searchBox = document.getElementById('search-box');
const searchButton = document.getElementById('search-button');

searchButton.onclick = (e) => {
  searchForm.classList.toggle('active');
  searchBox.focus();
  e.preventDefault();
};

// Shopping cart
const btnCart = document.getElementById('btn-shopping-cart');
const cartForm = document.querySelector('.cart-form');

btnCart.onclick = (e) => {
  cartForm.classList.toggle('active');
  e.preventDefault();
};

// menutup sidebar
const hamburger = document.querySelector('#hamburger-menu');

document.addEventListener('click', function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active');
  }

  if (!searchButton.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove('active');
  }

  if (!btnCart.contains(e.target) && !cartForm.contains(e.target)) {
    cartForm.classList.remove('active');
  }
});

// Modal Product
const modalProduct = document.getElementById('modal-product');
const btnDetailProducts = document.querySelectorAll('.btn-detail-product');

btnDetailProducts.forEach((btn) => {
  btn.onclick = (e) => {
    modalProduct.classList.add('active');
    e.preventDefault();
  };
});

const btnCloseModal = document.querySelector(
  '.modal-container .btn-close-modal'
);

btnCloseModal.onclick = (e) => {
  modalProduct.classList.remove('active');
  e.preventDefault();
};

window.onclick = (e) => {
  if (e.target === modalProduct) {
    modalProduct.classList.remove('active');
  }
};

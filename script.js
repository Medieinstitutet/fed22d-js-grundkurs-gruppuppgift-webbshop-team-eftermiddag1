const menuButton = document.querySelector('.menuButton');
const menuClose = document.querySelector('.closeMenu');
const nav = document.querySelector('.nav');

menuButton.addEventListener('click', menuOpen);
menuClose.addEventListener('click', menuOpen);

function menuOpen() {
    nav.classList.toggle('open');
}
const menuButton = document.querySelector('.menuButton');
const nav = document.querySelector('.nav');

menuButton.addEventListener('click', menuOpen);

function menuOpen() {
    nav.classList.toggle('open');
}
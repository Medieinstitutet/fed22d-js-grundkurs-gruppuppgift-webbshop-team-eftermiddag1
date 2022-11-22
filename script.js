// Menyknapp
const menuButton = document.querySelector(".menuButton");
const menuClose = document.querySelector(".closeMenu");
const nav = document.querySelector(".nav");

menuButton.addEventListener("click", menuOpen);
menuClose.addEventListener("click", menuOpen);

function menuOpen() {
  nav.classList.toggle("open");
}

// Produktöversikt
const shoppingCart = document.querySelector(".shoppingCart");
const close = document.querySelector(".closeSummary");
const summary = document.querySelector(".summary");
const orderButton = document.querySelector('.order')

shoppingCart.addEventListener("click", summaryOpen);
close.addEventListener("click", summaryOpen);
orderButton.addEventListener("click", summaryOpen)

function summaryOpen() {
  summary.classList.toggle("open");
}

// Kort eller faktura
const invoiceButton = document.querySelector("#invoice");
const invoiceFields = document.querySelector(".invoice");
const cardButton = document.querySelector("#card");
const cardFields = document.querySelector(".card");

invoiceButton.addEventListener("click", showInvoiceFields);
cardButton.addEventListener("click", showCardFields);

function showInvoiceFields() {
  if (invoiceButton.checked) {
    invoiceFields.style.display = "block";
    cardFields.style.display = "none";
  }
}

function showCardFields() {
  if (cardButton.checked) {
    cardFields.style.display = "block";
    invoiceFields.style.display = "none";
  }
}

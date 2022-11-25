// Menyknapp
const menuButton = document.querySelector('.menuButton');
const menuClose = document.querySelector('.closeMenu');
const nav = document.querySelector('.nav');

menuButton.addEventListener("click", menuOpen);
menuClose.addEventListener("click", menuOpen);

function menuOpen() {
  nav.classList.toggle('open');
}

// Produktöversikt
const shoppingCart = document.querySelector('.shoppingCart');
const close = document.querySelector('.closeSummary');
const summary = document.querySelector('.summary');
const orderButton = document.querySelector('.order');

shoppingCart.addEventListener('click', summaryOpen);
close.addEventListener('click', summaryOpen);
orderButton.addEventListener('click', summaryOpen);

function summaryOpen() {
  summary.classList.toggle('open');
}

// Kort eller faktura samt beställningsformulär
const invoiceButton = document.querySelector('#invoice');
const invoiceFields = document.querySelector('.invoice');
const cardButton = document.querySelector('#card');
const cardFields = document.querySelector('.card');
const form = document.getElementById('form');
const clearOrderButton = document.getElementById('clearOrderButton');
const submitButton = document.getElementById('submitButton');
const ssnField = document.getElementById('ssn');
const cardNumberField = document.getElementById('cardNumber');
const monthField = document.getElementById('month');
const yearField = document.getElementById('year');
const cvcField = document.getElementById('cvc');

invoiceButton.addEventListener('click', showInvoiceFields);
cardButton.addEventListener('click', showCardFields);
clearOrderButton.addEventListener('click', resetForm);
form.addEventListener('change', enableSubmitButtonOnValidForm);

function showInvoiceFields() {
  invoiceFields.style.display = 'block';
  cardFields.style.display = 'none';
  ssnField.required = true;
  monthField.required = false;
  yearField.required = false;
  cvcField.required = false;
}

function showCardFields() {
  cardFields.style.display = 'block';
  invoiceFields.style.display = 'none';
  monthField.required = true;
  yearField.required = true;
  cvcField.required = true;
  ssnField.required = false;
}

function resetForm() {
  form.reset();
}

function enableSubmitButtonOnValidForm() {
  submitButton.disabled = !form.checkValidity();
}

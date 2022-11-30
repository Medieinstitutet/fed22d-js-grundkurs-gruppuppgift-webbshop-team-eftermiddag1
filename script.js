// Globalt
const discountSum = document.getElementById('discountSum');
const today = new Date();
const isLucia = today.getMonth() === 11 && today.getDate() === 13;
let shippingCostFunction = value => Math.round((25 + 0.1 * value) * 100) / 100;

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
const orderButton = document.querySelector(".order");

shoppingCart.addEventListener("click", summaryOpen);
close.addEventListener("click", summaryOpen);
orderButton.addEventListener("click", summaryOpen);

function summaryOpen() {
    summary.classList.toggle("open");
}

const initialDonuts = [
  {
    name: 'Almond',
    price: 23,
    amount: 0,
    category: 'glazed',
    rating: 3,
    Image: './images/donut_almond_snack.jpg',
    Image2: './images/almonds.jpg',
  },
  {
    name: 'Apricot',
    price: 12,
    amount: 0,
    category: 'sugar',
    rating: 4,
    Image: './images/donut_apricot_filling.jpg',
    Image2: './images/apricots.jpg',
  },
  {
    name: 'Classic',
    price: 14,
    amount: 0,
    category: 'sugar',
    rating: 3,
    Image: './images/cake_donut.jpg',
    Image2: './images/cake_donut_dough.jpg',
  },
  {
    name: 'Choco',
    price: 16,
    amount: 0,
    category: 'glazed',
    rating: 5,
    Image: './images/donut_choco_sweets_frosting.jpg',
    Image2: './images/donut_choco_sweets_crumble.jpg',
  },
  {
    name: 'Caramel',
    price: 18,
    amount: 0,
    category: 'glazed',
    rating: 4,
    Image: './images/donut_chocolate_caramel.jpg',
    Image2: './images/chocolate_caramel.jpg',
  },
  {
    name: 'Cute Bear',
    price: 20,
    amount: 0,
    category: 'glazed',
    rating: 5,
    Image: './images/donut_cute_bear.jpg',
    Image2: './images/cute_bear.jpg',
  },
  {
    name: 'Strawberry',
    price: 15,
    amount: 0,
    category: 'glazed',
    rating: 4,
    Image: './images/donut_frosted_pink_icing.jpg',
    Image2: './images/strawberry_pink_icing_donut.jpg',
  },
  {
    name: 'Dark Chocolate',
    price: 13,
    amount: 0,
    category: 'sprinkled',
    rating: 4,
    Image: './images/dunkin_chocolate_sprinkled.jpg',
    Image2: './images/chocolate_dark.jpg',
  },
  {
    name: 'Vanilla',
    price: 20,
    amount: 0,
    category: 'sprinkled',
    rating: 4,
    Image: './images/dunkin_vanilla_sprinkled.jpg',
    Image2: './images/vanilla_flower.jpg',
  },
  {
    name: 'Candy sprinkles',
    price: 17,
    amount: 0,
    category: 'sprinkled',
    rating: 5,
    Image: './images/pink_donut_kirby.jpg',
    Image2: './images/candy_sprinkles.jpg',
  },
];
let donuts = initialDonuts;
let discountFunction = () => 0;

const donutContainer = document.querySelector(".munkContainer");
const price = document.querySelector(".price");

function renderDonuts() {
    donutContainer.innerHTML = "";

    for (let i = 0; i < donuts.length; i++) {
        donutContainer.innerHTML += `
            <section class="sectionDonut">
            <h3>${donuts[i].name}</h3>
            <div class="donutContainer">
              <img id="img1" src="${donuts[i].Image}" width="200" height="200"/>
              <img id="img2" src="${donuts[i].Image2}" width="200" height="200"/>
            </div>
            <div class="slideshowBtn">
              <button id="leftArrow"><span class="left"><i class="fa-solid fa-chevron-left"></i></span></button>
              <button id="rightArrow"><span class="right"><i class="fa-solid fa-chevron-right"></i></span></button>
            </div>
            <p>${donuts[i].price}kr/st</p>
            <button class="plus" data-id=${i}>+</button>
            <input value="${donuts[i].amount}"/>
            <button class="minus" data-id=${i}>-</button>
            </section>
    `;
    }

    document.querySelectorAll("button.plus").forEach((btn) => {
        btn.addEventListener("click", updateDonutAmount);
    });

    document.querySelectorAll("button.minus").forEach((btn) => {
        btn.addEventListener("click", decreaseDonutAmount);
    });

    const sum = donuts.reduce((previousValue, donut) => {
        return donut.amount * donut.price + previousValue;
    }, 0);

    const sumAmount = donuts.reduce((previousValue, donut) => {
        return donut.amount + previousValue;
    }, 0);

    printOrderedDonuts();

  if (sumAmount > 15) {
    shippingCostFunction = () => 0;
  } else {
    shippingCostFunction = value => Math.round((25 + 0.1 * value) * 100) / 100;
  }

  const discount = discountFunction(sum);
  const shippingCost = shippingCostFunction(sum - discount);

  document.querySelector('.price').innerHTML = sum + ' kr';
  document.querySelector('.priceSummary').innerHTML = sum + ' kr';
  document.querySelector('.totalSummary').innerHTML =
    sum + shippingCost - discount + ' kr';
  document.querySelector('.amount').innerHTML = sumAmount;

  document.querySelector('.shippingSum').innerHTML = shippingCost + ' kr';

  discountSum.innerHTML = discount + ' kr';
}

function printOrderedDonuts() {
    document.querySelector(".donutsOrdered").innerHTML = "";

    for (let i = 0; i < donuts.length; i++) {
        if (donuts[i].amount > 0) {
            document.querySelector(".donutsOrdered").innerHTML += `
      <div class="donutSum">
      <img id="img1" src="${donuts[i].Image}" width="80" height="80"/>
      <span class="orderedDonuts">${donuts[i].name}</span>
      <span class="amountDonut">${donuts[i].amount}st</span>
      </div>
      `;
        }
    }
  }

  if (isLucia) {
    document.querySelector('.donutsOrdered').innerHTML += `
      <div class="donutSum">
      <span class="orderedDonuts">Luciamunk</span>
      <span class="amountDonut">1 st</span>
      </div>
      `;
  }
}

function updateDonutAmount(e) {
    const donutClicked = e.currentTarget.dataset.id;
    price.classList.toggle("open");
    donuts[donutClicked].amount += 1;

  renderDonuts();
}

function decreaseDonutAmount(e) {
    const donutClicked = e.currentTarget.dataset.id;

    if (donuts[donutClicked].amount > 0) {
        donuts[donutClicked].amount -= 1;
    }

    renderDonuts();
}

renderDonuts();

const rightArrow = document.querySelectorAll("#rightArrow");
const leftArrow = document.querySelectorAll("#leftArrow");

for (let i = 0; i < leftArrow.length; i++) {
    leftArrow[i].addEventListener("click", swap);
    rightArrow[i].addEventListener("click", swap);
}

function swap(e) {
    const image1 =
        e.currentTarget.parentElement.parentElement.querySelector("#img1");
    const image2 =
        e.currentTarget.parentElement.parentElement.querySelector("#img2");

  image1.setAttribute('src', donut2);
  image2.setAttribute('src', donut1);
}

// Kort eller faktura samt beställningsformulär
const invoiceButton = document.querySelector("#invoice");
const invoiceFields = document.querySelector(".invoice");
const cardButton = document.querySelector("#card");
const cardFields = document.querySelector(".card");
const form = document.getElementById("form");
const clearOrderButton = document.getElementById("clearOrderButton");
const submitButton = document.getElementById("submitButton");
const ssnField = document.getElementById("ssn");
const cardNumberField = document.getElementById("cardNumber");
const monthField = document.getElementById("month");
const yearField = document.getElementById("year");
const cvcField = document.getElementById("cvc");

invoiceButton.addEventListener("click", showInvoiceFields);
cardButton.addEventListener("click", showCardFields);
clearOrderButton.addEventListener("click", resetForm);
form.addEventListener("change", enableSubmitButtonOnValidForm);

function showInvoiceFields() {
    invoiceFields.style.display = "block";
    cardFields.style.display = "none";
    ssnField.required = true;
    monthField.required = false;
    yearField.required = false;
    cvcField.required = false;
}

function showCardFields() {
    cardFields.style.display = "block";
    invoiceFields.style.display = "none";
    monthField.required = true;
    yearField.required = true;
    cvcField.required = true;
    ssnField.required = false;
}

function resetForm() {
    form.reset();

    for (const donut of donuts) {
        donut.amount = 0;
    }

    renderDonuts();
}

function enableSubmitButtonOnValidForm() {
    submitButton.disabled = !form.checkValidity();
}

// Sortera donuts
const sortSelect = document.getElementById("sort");

sortSelect.addEventListener("change", sortDonuts);

function sortDonuts() {
    const sortValue = sortSelect.value;

    if (sortValue === "price") {
        donuts.sort((a, b) => a.price - b.price);
    } else if (sortValue === "name") {
        donuts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue === "category") {
        donuts.sort((a, b) => a.category.localeCompare(b.category));
    } else if (sortValue === "rating") {
        donuts.sort((a, b) => b.rating - a.rating);
    }

    renderDonuts();
}

// Filtrera donuts
const filterButton = document.querySelector(".filter");
const filterRange = document.querySelector(".filter-range");

filterButton.addEventListener("click", showFilter);

function showFilter() {
    if (filterRange.style.display === "none") {
        filterRange.style.display = "block";
    } else {
        filterRange.style.display = "none";
    }
}

// Filtera pris
const priceRange = document.getElementById("priceRange");
const maxPrice = document.getElementById("maxPrice");

priceRange.addEventListener("change", showPrice);

function showPrice() {
    maxPrice.innerHTML = priceRange.value + " kr";
    filterPrice();
}

function filterPrice() {
    const priceValue = priceRange.value;

    donuts = initialDonuts.filter((donut) => donut.price <= priceValue);

    renderDonuts();
}

//Beställningsbekräftelse

function initSummary() {
    const orderSummary = document.querySelector(".orderSummary");
    orderSummary.innerHTML = `<section>
      <h3> Tack för din beställning!</h3 >
      <p>Din beställning har beräknad leveranstid på 1-3 dagar.</p>
      <div>
          <span>Produkter</span>
          <span>Antal</span>
          <span>Pris</span>
      </div>
  </section>`;
    let summa = 0;
    for (let i = 0; i < donuts.length; i++) {
        if (donuts[i].amount > 0) {
            orderSummary.innerHTML += `<div>
          <span>${donuts[i].name}</span>
          <span>${donuts[i].amount}</span>
          <span>${donuts[i].price * donuts[i].amount}</span>
      </div>`;
            summa += donuts[i].price * donuts[i].amount;
        }
    }
    orderSummary.innerHTML += `<span>Summa: ${summa}</span>`;
    orderSummary.style.display = "inline-block";
}

submitButton.addEventListener('click', initSummary);

// Rabatter
const discountCodeField = document.getElementById('discountCode');
const discountCodeButton = document.getElementById('discountCodeButton');

discountCodeButton.addEventListener('click', validateDiscountCode);

function validateDiscountCode() {
  const discountCode = discountCodeField.value;
  if (discountCode === 'a_damn_fine-cup_of-coffee') {
    discountFunction = value => value;
    shippingCostFunction = () => 0;
    renderDonuts();
  }
}


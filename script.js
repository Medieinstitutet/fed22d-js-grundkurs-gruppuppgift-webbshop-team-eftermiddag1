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

const donuts = [
    {
        name: "Munk1",
        price: 10,
        amount: 0,
        Image: "./images/donut_almond_snack.jpg",
        Image2: "./images/almonds.jpg",
    },
    {
        name: "Munk2",
        price: 20,
        amount: 0,
        Image: "./images/donut_apricot_filling.jpg",
        Image2: "./images/apricots.jpg",
    },
    {
        name: "Munk3",
        price: 20,
        amount: 0,
        Image: "./images/cake_donut.jpg",
        Image2: "./images/cake_donut_dough.jpg",
    },
    {
        name: "Munk4",
        price: 20,
        amount: 0,
        Image: "./images/donut_choco_sweets_frosting.jpg",
        Image2: "./images/donut_choco_sweets_crumble.jpg",
    },
    {
        name: "Munk5",
        price: 20,
        amount: 0,
        Image: "./images/donut_chocolate_caramel.jpg",
        Image2: "./images/chocolate_caramel.jpg",
    },
    {
        name: "Munk6",
        price: 20,
        amount: 0,
        Image: "./images/donut_cute_bear.jpg",
        Image2: "./images/cute_bear.jpg",
    },
    {
        name: "Munk7",
        price: 20,
        amount: 0,
        Image: "./images/donut_frosted_pink_icing.jpg",
        Image2: "./images/strawberry_pink_icing_donut.jpg",
    },
    {
        name: "Munk8",
        price: 20,
        amount: 0,
        Image: "./images/dunkin_chocolate_sprinkled.jpg",
        Image2: "./images/chocolate_dark.jpg",
    },
    {
        name: "Munk9",
        price: 20,
        amount: 0,
        Image: "./images/dunkin_vanilla_sprinkled.jpg",
        Image2: "./images/vanilla_flower.jpg",
    },
    {
        name: "Munk10",
        price: 20,
        amount: 0,
        Image: "./images/pink_donut_kirby.jpg",
        Image2: "./images/candy_sprinkles.jpg",
    },
];

const donutContainer = document.querySelector(".munkContainer");
const price = document.querySelector(".price");

function renderDonuts() {
    donutContainer.innerHTML = "";

    for (let i = 0; i < donuts.length; i++) {
        donutContainer.innerHTML += `
            <section>
            <h3>${donuts[i].name}</h3>
            <div class="donutContainer">
              <img id="img1" src="${donuts[i].Image}" width="200" height="200"/>
              <img id="img2" src="${donuts[i].Image2}" width="200" height="200"/>
            </div>
            <div class="slideshowBtn">
              <button id="leftArrow"><span class="left"><i class="fa-solid fa-chevron-left"></i></span></button>
              <button id="rightArrow"><span class="right"><i class="fa-solid fa-chevron-right"></i></span></button>
            </div>
            <p>${donuts[i].price}kr</p>
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

    document.querySelector(".price").innerHTML = sum + "kr";
    document.querySelector(".priceSummary").innerHTML = sum;
    document.querySelector(".totalSummary").innerHTML = sum;
    document.querySelector(".amount").innerHTML = sumAmount;
}

function printOrderedDonuts() {
    document.querySelector(".donutsOrdered").innerHTML = "";

    for (let i = 0; i < donuts.length; i++) {
        if (donuts[i].amount > 0) {
            document.querySelector(".donutsOrdered").innerHTML += `
      <span class="orderedDonuts">${donuts[i].name}</span>
      <span class="amountDonut">${donuts[i].amount}st</span>
      `;
        }
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

const rightArrow = document.querySelectorAll('#rightArrow');
const leftArrow = document.querySelectorAll('#leftArrow');

for(let i = 0; i < leftArrow.length; i++){
  leftArrow[i].addEventListener('click', swap);
  rightArrow[i].addEventListener('click', swap);
}

function swap(e){
  const image1 =e.currentTarget.parentElement.parentElement.querySelector('#img1');
  const image2 =e.currentTarget.parentElement.parentElement.querySelector('#img2');

  const donut1 = image1.getAttribute('src');
  const donut2 = image2.getAttribute('src');

  image1.setAttribute('src', donut2);
  image2.setAttribute('src', donut1); 
};



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
}

function enableSubmitButtonOnValidForm() {
    submitButton.disabled = !form.checkValidity();
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
submitButton.addEventListener("click", initSummary);

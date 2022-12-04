// Globalt
const discountSum = document.getElementById("discountSum");
const today = new Date();
let tenDonutsDiscountSum;
const isLucia = today.getMonth() === 11 && today.getDate() === 13;
let shippingCostFunction = (value) =>
    Math.round((25 + 0.1 * value) * 100) / 100;

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
orderButton.addEventListener("click", openFormPage);

function summaryOpen() {
    summary.classList.toggle("open");
}
//Munkarray
const initialDonuts = [
    {
        name: "Almond",
        price: 23,
        amount: 0,
        category: "glazed",
        rating: 3,
        Image: "./images/donut_almond_snack.jpg",
        Image2: "./images/almonds.jpg",
    },
    {
        name: "Apricot",
        price: 12,
        amount: 0,
        category: "sugar",
        rating: 4,
        Image: "./images/donut_apricot_filling.jpg",
        Image2: "./images/apricots.jpg",
    },
    {
        name: "Classic",
        price: 14,
        amount: 0,
        category: "sugar",
        rating: 3,
        Image: "./images/cake_donut.jpg",
        Image2: "./images/cake_donut_dough.jpg",
    },
    {
        name: "Choco",
        price: 16,
        amount: 0,
        category: "glazed",
        rating: 5,
        Image: "./images/donut_choco_sweets_frosting.jpg",
        Image2: "./images/donut_choco_sweets_crumble.jpg",
    },
    {
        name: "Caramel",
        price: 18,
        amount: 0,
        category: "glazed",
        rating: 4,
        Image: "./images/donut_chocolate_caramel.jpg",
        Image2: "./images/chocolate_caramel.jpg",
    },
    {
        name: "Cute Bear",
        price: 20,
        amount: 0,
        category: "glazed",
        rating: 5,
        Image: "./images/donut_cute_bear.jpg",
        Image2: "./images/cute_bear.jpg",
    },
    {
        name: "Strawberry",
        price: 15,
        amount: 0,
        category: "glazed",
        rating: 4,
        Image: "./images/donut_frosted_pink_icing.jpg",
        Image2: "./images/strawberry_pink_icing_donut.jpg",
    },
    {
        name: "Dark Chocolate",
        price: 13,
        amount: 0,
        category: "sprinkled",
        rating: 4,
        Image: "./images/dunkin_chocolate_sprinkled.jpg",
        Image2: "./images/chocolate_dark.jpg",
    },
    {
        name: "Vanilla",
        price: 20,
        amount: 0,
        category: "sprinkled",
        rating: 4,
        Image: "./images/dunkin_vanilla_sprinkled.jpg",
        Image2: "./images/vanilla_flower.jpg",
    },
    {
        name: "Candy sprinkles",
        price: 17,
        amount: 0,
        category: "sprinkled",
        rating: 5,
        Image: "./images/pink_donut_kirby.jpg",
        Image2: "./images/candy_sprinkles.jpg",
    },
];

//Rita ut munkar
let donuts = initialDonuts;
let discountFunction = () => 0;

const donutContainer = document.querySelector(".munkContainer");
const price = document.querySelector(".price");

function renderDonuts() {
    donutContainer.innerHTML = "";

    for (let i = 0; i < donuts.length; i++) {
        const donut = donuts[i];
        let rating = "";

        for (let j = 0; j < donut.rating; j++) {
            rating += '<span class="material-symbols-outlined">star</span>';
        }

        donutContainer.innerHTML += `
            <section class="sectionDonut">
            <h3>${donut.name}</h3>
            <div>${rating}</div>
            <div class="donutContainer">
              <img class="img1" src="${donut.Image}" width="150" height="200"/>
              <img class="img2 hidden" src="${donut.Image2}" width="150" height="200"/>
            </div>
            <div class="slideshowBtn">
              <button class="leftArrow"><span class="left"><i class="fa-solid fa-chevron-left"></i></span></button>
              <button class="rightArrow"><span class="right"><i class="fa-solid fa-chevron-right"></i></span></button>
            </div>
            <p class="donutBlockPrice">${donut.price}kr/st</p>
            <button class="plus" data-id=${i}>+</button>
            <input value="${donut.amount}"/>
            <button class="minus" data-id=${i}>-</button>
            </section>
    `;
    }

    const isXmas = today.getMonth() === 11 && today.getDate() === 24;
    if (isXmas) {
        document.querySelectorAll(".donutBlockPrice").forEach((element) => {
            element.style.color = "red";
        });
        document.body.style.backgroundImage =
            "url('images/xmasBackground.jpg')";
    }

    //plus och minusknappar
    document.querySelectorAll("button.plus").forEach((btn) => {
        btn.addEventListener("click", updateDonutAmount);
    });

    document.querySelectorAll("button.minus").forEach((btn) => {
        btn.addEventListener("click", decreaseDonutAmount);
    });

    let sum = donuts.reduce((previousValue, donut) => {
        return donut.amount * donut.price + previousValue;
    }, 0);
    tenDonutsDiscountSum = 0;
    tenDonutsDiscountSum = donuts.reduce((previousValue, donut) => {
        if (donut.amount >= 10) {
            return donut.amount * donut.price * 0.1 + previousValue;
        }
    }, 0);
    sum -= tenDonutsDiscountSum;

    const sumAmount = donuts.reduce((previousValue, donut) => {
        return donut.amount + previousValue;
    }, 0);
    //Ordersammanställning
    printOrderedDonuts();

    if (sumAmount > 15) {
        shippingCostFunction = () => 0;
    } else {
        shippingCostFunction = (value) =>
            Math.round((25 + 0.1 * value) * 100) / 100;
    }
    const isMondayMorning = today.getDay() === 1 && today.getHours() < 10;
    if (isMondayMorning) {
        discountFunction = (sum) => sum * 0.1;
        document.querySelector(".donutsOrdered").innerHTML += `
        <span class="mondaySpecial">Måndagsrabatt: 10% på hela beställningen.</span>`;
    }
    const discount = discountFunction(sum);
    const shippingCost = shippingCostFunction(sum - discount);

    document.querySelector(".price").innerHTML = sum + " kr";
    document.querySelector(".priceSummary").innerHTML = sum + " kr";
    document.querySelector(".totalSummary").innerHTML =
        sum + shippingCost - discount + " kr";
    document.querySelector(".amount").innerHTML = sumAmount;

    document.querySelector(".shippingSum").innerHTML = shippingCost + " kr";

    discountSum.innerHTML = discount + " kr";

    const rightArrow = document.querySelectorAll(".rightArrow");
    const leftArrow = document.querySelectorAll(".leftArrow");

    for (let i = 0; i < leftArrow.length; i++) {
        leftArrow[i].addEventListener("click", swap);
        rightArrow[i].addEventListener("click", swap);
    }
}

function printOrderedDonuts() {
    document.querySelector(".donutsOrdered").innerHTML = "";

    for (let i = 0; i < donuts.length; i++) {
        if (donuts[i].amount > 0) {
            document.querySelector(".donutsOrdered").innerHTML += `
      <div class="donutSum">
      <img class="img1" src="${donuts[i].Image}" width="80" height="80"/>
      <span class="orderedDonuts">${donuts[i].name}</span>
      <span class="amountDonut">${donuts[i].amount}st</span>
      </div>
      `;
        }
    }
    if (isLucia) {
        document.querySelector(".donutsOrdered").innerHTML += `
      <div class="donutSum">
        <span class="orderedDonuts">Luciamunk</span>
        <span class="amountDonut">1 st</span>
      </div>
      `;
    }
}

function updateDonutAmount(e) {
    const donutClicked = e.currentTarget.dataset.id;
    donuts[donutClicked].amount += 1;
    price.classList.toggle("open");

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
//Slideshow
function swap(e) {
    const image1 =
        e.currentTarget.parentElement.parentElement.querySelector(".img1");
    const image2 =
        e.currentTarget.parentElement.parentElement.querySelector(".img2");

    image1.classList.toggle("hidden");
    image2.classList.toggle("hidden");
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
    document.querySelector(".munkContainer").style.display = "flex";

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

function initSummary(event) {
    event.preventDefault();
    const orderSummary = document.querySelector(".orderSummary");

    const rows = donuts
        .filter(({ amount }) => amount > 0)
        .map(
            ({ name, amount, price }) => `<tr>
                <td>${name}</td>
                <td>${amount} st</td>
                <td>${price * amount} kr</td>
            </tr>`
        )
        .join("");

    const sum = donuts.reduce(
        (sum, { price, amount }) => sum + price * amount,
        0
    );

    orderSummary.innerHTML = `<section>
        <h3> Tack för din beställning!</h3>
        <p>Din beställning har beräknad leveranstid:</p>
        <p>30 minuter.</p>
        <table>
            <thead>
                <tr>
                    <th>Produkter</th>
                    <th>Antal</th>
                    <th>Pris</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
        <p>Summa: ${sum} kr</p>
    </section>`;

    orderSummary.style.display = "block";
}

submitButton.addEventListener("click", initSummary);

// Rabatter
const discountCodeField = document.getElementById("discountCode");
const discountCodeButton = document.getElementById("discountCodeButton");

discountCodeButton.addEventListener("click", validateDiscountCode);

function validateDiscountCode() {
    const discountCode = discountCodeField.value;
    if (discountCode === "a_damn_fine-cup_of-coffee") {
        discountFunction = (value) => value;
        shippingCostFunction = () => 0;
        renderDonuts();
    }
}
// dark mode
const darkModeButton = document.getElementById("darkModeButton");

darkModeButton.addEventListener("click", darkmodeFunction);

function darkmodeFunction() {
    document.body.classList.toggle("dark-mode");
    if (darkModeButton.innerHTML === "Mörkt läge") {
        darkModeButton.innerHTML = "Ljust läge";
    } else {
        darkModeButton.innerHTML = "Mörkt läge";
    }
}

// Meddelande efter 15 min vid inaktivitet vid formuläret

const msgDiv = document.querySelector(".msg");

form.addEventListener("change", showAddedMessage);

function showAddedMessage() {
    setTimeout(clearForm, 1000 * 60 * 15);
}

function clearForm() {
    alert("Du har 15 minuter på dig att fullfölja beställningen.");
    document.getElementById("form").reset();
}

// Prispåslag mellan fre kl 15 till natten mot måndag kl 03

for (let i = 0; i < donuts.length; i++) {
    let today = new Date();

    if (
        ((today.getDay() == 5 && today.getHours() >= 15) ||
            today.getDay() > 5 ||
            today.getDay() <= 1) &&
        ((today.getDay() == 1 && today.getHours() <= 2) ||
            today.getDay() < 1 ||
            today.getDay() >= 5)
    ) {
        donuts[i].price = Math.round(donuts[i].price * 1.15);
    }
}

// Formulärsidan
const formPage = document.getElementById("formPage");
const formCloseIcon = document.querySelector(".closeForm");

formCloseIcon.addEventListener("click", () =>
    formPage.classList.remove("open")
);

function openFormPage() {
    formPage.classList.add("open");
}

const menuButton = document.querySelector('.menuButton');
const menuClose = document.querySelector('.closeMenu');
const nav = document.querySelector('.nav');

menuButton.addEventListener('click', menuOpen);
menuClose.addEventListener('click', menuOpen);

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
//Munkar
let munkar = [
    {
        name: "Cake donut",
        price: "17",
        rating: "3",
        category: "Övriga munkar",
    },
    {
        name: "Almond snack donut",
        price: "18",
        rating: "2",
        category: "Munkar med frosting",
    },
    {
        name: "Donut with apricot filling",
        price: "19",
        rating: "4",
        category: "Övriga munkar",
    },
    {
        name: "Choco sweet crumble donut",
        price: "20",
        rating: "5",
        category: "Chokladmunkar",
    },
    {
        name: "Caramel chocolate donut",
        price: "21",
        rating: "1",
        category: "Chokladmunkar",
    },
    {
        name: "Cute bear donut",
        price: "22",
        rating: "2",
        category: "Munkar med frosting",
    },
    {
        name: "Strawberry frosting donut",
        price: "23",
        rating: "3",
        category: "Munkar med frosting",
    },
    {
        name: "Chocolate sprinkle donut",
        price: "24",
        rating: "4",
        category: "Chokladmunkar",
    },
    {
        name: "Vanilla sprinkle donut",
        price: "25",
        rating: "5",
        category: "Munkar med frosting",
    },
    {
        name: "Pink sprinkle donut",
        price: "26",
        rating: "1",
        category: "Munkar med frosting",
    },
];

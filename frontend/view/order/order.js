// Fetch order data from local storage
function fetchOrder(){
    const order = JSON.parse(localStorage.getItem("order"));
    displayOrderId(order);
    displayProductsOrdered();
    displayFormData(order);
    displayTotalPrice();
}

window.onload = fetchOrder();

function createHTMLOrderId(order){
    const orderIdHTML = document.createElement("div");
    orderIdHTML.innerHTML = `<div class="card-text">${order.orderId}</div>`
    return orderIdHTML;
}

function displayOrderId(order){
    const orderIdDiv = createHTMLOrderId(order);
    const orderHTML = document.getElementById("order-id");
    orderHTML.append(orderIdDiv);
}

function createHTMLFormData(order){
    const divForm = document.createElement("div");
    divForm.innerHTML = `<div class="card">
                                    <div class="card-body text-center">
                                        <div class="card-text">Prénom : ${order.contact.firstName}</div>
                                        <div class="card-text">Nom : ${order.contact.lastName}</div>
                                        <div class="card-text">Adresse : ${order.contact.address}</div>
                                        <div class="card-text">Ville : ${order.contact.city}</div>
                                        <div class="card-text">Adresse e-mail : ${order.contact.email}</div>
                                    </div>
                                </div>`
    return divForm;
}

function displayFormData(orderData){
    const formCard = createHTMLFormData(orderData);
    const formData = document.getElementById("form-data");
    formData.append(formCard);
}

function displayProductsOrdered(){
    const order = JSON.parse(localStorage.getItem("order"));
    const productsCards = document.getElementById("order-products");
    order.products.forEach((product) => {
        productsCards.append(product.name);
        productsCards.append(product.price / 100);
    });
}

function getBasketPrice(){
    // Put price of each product currently in the basket in an array
    const basketItemList = JSON.parse(localStorage.getItem('productInBasket'));
    const basketPriceList = basketItemList.map((item) => item.price);
    // Calculate total of basket
    const reducer = (totalPrice, itemPrice) => totalPrice + itemPrice;
    return basketPriceList.reduce(reducer, 0);
}

function createHTMLTotalPrice(){
    const totalPrice = getBasketPrice();
    const totalPriceHTML = document.createElement("div");
    totalPriceHTML.innerHTML = "<div class='card-text'>" + totalPrice + "€" + "</div>"
    return totalPriceHTML;
}

function displayTotalPrice(){
    const totalPriceDiv = createHTMLTotalPrice();
    const totalPriceHTML = document.getElementById("total-price");
    totalPriceHTML.append(totalPriceDiv);
}
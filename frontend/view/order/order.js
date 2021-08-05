// Fetch order data from local storage
function fetchOrder(){
    const order = JSON.parse(localStorage.getItem("order"));
    displayOrderId(order);
    displayProductsOrdered();
    displayFormData(order);
    displayTotalPrice();
}

// Display order confirmation
window.onload = fetchOrder();

// Create HTML in order to display the id of the order
function createHTMLOrderId(order){
    const orderIdHTML = document.createElement("div");
    orderIdHTML.innerHTML = `<div class="card-text">${order.orderId}</div>`
    return orderIdHTML;
}

// Display HTML of order id
function displayOrderId(order){
    const orderIdDiv = createHTMLOrderId(order);
    const orderHTML = document.getElementById("order-id");
    orderHTML.append(orderIdDiv);
}

// create HTML in order to display the form with the data from the local storage
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

// Display HTML of form
function displayFormData(orderData){
    const formCard = createHTMLFormData(orderData);
    const formData = document.getElementById("form-data");
    formData.append(formCard);
}

function createHTMLProductsOrdered(){
    const order = JSON.parse(localStorage.getItem("order"));
    order.products.forEach((product) => {
        productName = product.name;
        productPrice = product.price / 100;
    });
    const productsListHTML = document.createElement("div");
    productsListHTML.innerHTML = `<div class="card-body">
                                        <div class="card-text">${productName}</div>
                                        <div class="card-text">${productPrice} €</div>
                                </div>`
    return productsListHTML;
}

// Display the list of products in the order
function displayProductsOrdered(){
    const productsList = createHTMLProductsOrdered();
    const productsCardsHTML = document.getElementById("order-products");
    productsCardsHTML.append(productsList);
}

console.log(displayProductsOrdered());

// Calculate price of basket from the list of products in basket
function getBasketPrice(){
    // Put price of each product currently in the basket in an array
    const basketItemList = JSON.parse(localStorage.getItem('productInBasket'));
    const basketPriceList = basketItemList.map((item) => item.price);
    // Calculate total of basket
    const reducer = (totalPrice, itemPrice) => totalPrice + itemPrice;
    return basketPriceList.reduce(reducer, 0);
}

// Create HTML of the sum of price in basket
function createHTMLTotalPrice(){
    const totalPrice = getBasketPrice();
    const totalPriceHTML = document.createElement("div");
    totalPriceHTML.innerHTML = "<div class='card-text'>" + totalPrice + "€" + "</div>"
    return totalPriceHTML;
}

// Display the total price
function displayTotalPrice(){
    const totalPriceDiv = createHTMLTotalPrice();
    const totalPriceHTML = document.getElementById("total-price");
    totalPriceHTML.append(totalPriceDiv);
}
// Fetch order data from local storage
function fetchOrder(){
    const order = JSON.parse(localStorage.getItem("order"));
    displayOrderId(order);
    displayProductsOrdered();
    displayFormData(order);
}

window.onload = fetchOrder();

function createHTMLOrderId(order){
    const orderIdHTML = document.createElement("div");
    orderIdHTML.innerHTML = `
        <div class="card-text">
            ${order.orderId}
        </div>`
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
                                    <div class="card-body">
                                        <div class="card-text">${order.contact.firstName}</div>
                                        <div class="card-text">${order.contact.lastName}</div>
                                        <div class="card-text">${order.contact.address}</div>
                                        <div class="card-text">${order.contact.city}</div>
                                        <div class="card-text">${order.contact.email}</div>
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
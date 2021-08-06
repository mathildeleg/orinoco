// RegEx for form
function isTextValid(text){
        return /^[A-Za-z][^0-9_!¡?÷?¿\\/+=@#$%ˆ&*¨(){}|~<>;:[\]]{1,20}$/.test(text)
}

function isAddressValid(address){
    return /^([0-9]{1,6})([a-zA-Z\s][^0-9._!¡?÷?¿\\/+=@#$%ˆ&*(){}|~<>;:[\]]{3,})$/.test(address)
}

function isEmailValid(email){
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*))@((\[[0-9]\.{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}

const FormValidation = {isTextValid, isAddressValid, isEmailValid};

// Fetch data for content of the basket
function getBasketContent(){
    const basketItemList = JSON.parse(localStorage.getItem('productInBasket'));
    displayBasket(basketItemList);
}

// Load content of the basket
window.onload = async () => {
    getBasketContent();
}

// Creates entirety of basket content and its card
function createHTMLBasketCard(basketContent){
    const basketCard = document.createElement("div");
    basketCard.innerHTML = `<div class="card my-4">
                                <div class="card-body">
                                    <img src="${basketContent.image}" class="img-fluid card-img-top" alt="product image"></img>
                                    <h2 class="card-title text-center pt-3">${basketContent.name}</h2>
                                    <div class="d-flex row justify-content-around">
                                        <p class="card-text">Vernis : ${basketContent.varnish}</p>
                                        <p class="card-text">Prix : ${basketContent.price}€</p>
                                    </div>
                                    <button type="submit" onclick="removeItemFromBasket('${basketContent.id}')" class="btn btn-primary">Retirer du panier</button>
                                </div>
                            </div>`;
    return basketCard;
}

// Creates list of each product in the basket
function createHTMLCardList(basketItemList){
    return basketItemList.map(createHTMLBasketCard);
}

// See if the basket is empty
function isBasketEmpty(basketItemList){
    return basketItemList.length === 0;
}

// If basket is empty, display empty div
function displayEmptyBasket(){
    const basketCards = document.getElementById("basket-container");
    const emptyBasket = `<div class="card m-5">
                            <div class="card-body">Votre panier est vide</div>
                        </div>`;
    basketCards.innerHTML = emptyBasket;
}

// If basket is full, display div with the products in the basket
function displayCardList(basketItemList){
    const basketCards = document.getElementById("basket-container");
    const HTMLCardList = createHTMLCardList(basketItemList);
    HTMLCardList.forEach(div => {
        basketCards.append(div);
    })
}

// Calculate each price to get total of basket
function getBasketPrice(basketItemList){
    // Put price of each product currently in the basket in an array
    const basketPriceList = basketItemList.map((item) => item.price);
    // Calculate total of basket
    const reducer = (totalPrice, itemPrice) => totalPrice + itemPrice;
    return basketPriceList.reduce(reducer, 0);
}

// Display the total in the div of the basket
function displayPrice(totalPrice){
    const basketCards = document.getElementById("basket-container");
    // Create totalPrice HTML
    const totalPriceDiv = `<div class="card m-5">
                                <div class="card-body">Prix total de votre panier : ${totalPrice} €</div>
                            </div>`
    // insert totalPrice HTML below the product cards
    basketCards.insertAdjacentHTML("beforeend", totalPriceDiv);
}

// Display basket cards whether it is empty or full
function displayBasket(basketItemList){
    // If basket is empty, tell user basket is empty
    if (isBasketEmpty(basketItemList)){
        displayEmptyBasket();
    // If basket is filled with products...
    }else{
        // display list of products in basket
        displayCardList(basketItemList);
        // with total price of the basket
        const totalPrice = getBasketPrice(basketItemList);
        displayPrice(totalPrice);
        // display the form
        displayForm();
        initSubmitButton();
    }
}

// Removes product from basket
function removeItemFromBasket(idItem){
    // Get basket content
    const basket = JSON.parse(localStorage.getItem("productInBasket"));
    // Find id of the product you want to remove from basket
    const isIdItemEqual = (item) => item.id === idItem;
    const index = basket.findIndex(isIdItemEqual);
    // Remove product selected from local storage
    const newbasket = basket.filter((item,i) => i !== index)
    localStorage.setItem("productInBasket", JSON.stringify(newbasket));
    // Reload the page
    window.location.href = "/frontend/view/basket/basket.html";
}

// Display the form after the basket
function displayForm(){
    const form = document.querySelector("#basket-container");
    const formDiv = `
    <div class="my-4">
            <h2 class="row justify-content-md-center mt-4">Vos coordonnées</h2>
            <form class="row g-3" method="post" novalidate>
                <div class="col-md-6">
                  <label for="first-name" class="form-label m-2">Votre prénom</label>
                  <input type="text" class="form-control" name="first-name" id="first-name" required>
                  <div class="text-danger p-2" id="first-name-error"></div>
                </div>

                <div class="col-md-6">
                  <label for="last-name" class="form-label m-2">Votre nom</label>
                  <input type="text" class="form-control" name="last-name" id="last-name" required>
                  <div class="text-danger p-2" id="last-name-error"></div>
                </div>

                <div class="col-12">
                  <label for="address" class="form-label m-2">Votre adresse</label>
                  <input type="text" class="form-control" name="address" id="address" for="address" placeholder="50 rue Pasteur" required>
                  <div class="text-danger p-2" id="address-error"></div>
                </div>

                <div class="col-md-6">
                  <label for="city" class="form-label m-2">Votre ville</label>
                  <input type="text" class="form-control" name="city" id="city" for="city" required>
                  <div class="text-danger p-2" id="city-error"></div>
                </div>

                <div class="col-md-6">
                    <label for="email" class="form-label m-2">Votre adresse e-mail</label>
                    <input type="email" class="form-control" name="email" id="email" required>
                    <div class="text-danger p-2" id="email-error"></div>
                  </div>

                <div class="col-12">
                  <button type="submit" id="submitOrder" class="btn btn-primary mt-3 mb-3">Valider votre commande</button>
                </div>
            </form>
        </div>`;
    form.insertAdjacentHTML("afterend", formDiv);
}

// // Display error for each part of the form to the user by using the functions below
function displayError(formData){
    displayErrorFirstName(formData);
    displayErrorLastName(formData);
    displayErrorCity(formData);
    displayErrorAddress(formData);
    displayErrorEmail(formData);
}

// // Display error in the "First Name" part of the form to the user
function displayErrorFirstName(formData){
    if(!FormValidation.isTextValid(formData.firstName)){
        document.getElementById("first-name-error").innerText = `Veuillez entrer votre prénom.`;
    }
}

// // Display error in the "Last Name" part of the form to the user
function displayErrorLastName(formData){
    if(!FormValidation.isTextValid(formData.lastName)){
        document.getElementById("last-name-error").innerText = `Veuillez entrer votre nom.`;
    }
}

// // Display error in the "City" part of the form to the user
function displayErrorCity(formData){
    if(!FormValidation.isTextValid(formData.city)){
        document.getElementById("city-error").innerText = `Veuillez entrer votre ville.`;
    }
}

// // Display error in the "Address" part of the form to the user
function displayErrorAddress(formData){
    if(!FormValidation.isTextValid(formData.address)){
        document.getElementById("address-error").innerText = `Veuillez entrer votre adresse.`;
    }
}

// // Display error in the "Email" part of the form to the user
function displayErrorEmail(formData){
    if(!FormValidation.isTextValid(formData.email)){
        document.getElementById("email-error").innerText = `Veuillez entrer votre adresse e-mail.`;
    }
}

// // Check whether the form is valid (if it's correctly filled)
function isFormValid(formData){
    if(FormValidation.isTextValid(formData.firstName) 
    && FormValidation.isTextValid(formData.lastName) 
    && FormValidation.isTextValid(formData.city)
    && FormValidation.isAddressValid(formData.address)
    && FormValidation.isEmailValid(formData.email)){
        return true;
    }
        return false;
}

// Fetch order data (id, list of products and form)
async function postOrder(){
    // Get data from the form
    const formData = {
        firstName: document.querySelector("#first-name").value,
        lastName: document.querySelector("#last-name").value,
        address: document.querySelector("#address").value,
        city: document.querySelector("#city").value,
        email: document.querySelector("#email").value.toLowerCase(),
    }
    // Get list of products in basket
    const basketItemList = JSON.parse(localStorage.getItem("productInBasket"));
    const productsId = basketItemList.map(product => product.id);
    // Fetch order data (id, list of products and form)
    const res = await fetch("http://localhost:3000/api/furniture/order", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contact: {firstName: formData.firstName, lastName: formData.lastName, address: formData.address, city: formData.city, email: formData.email},
            products: productsId,
        })
    })
    const order = await res.json();
    localStorage.setItem("order", JSON.stringify(order));
}

// Create button "submit order" with event listener
function initSubmitButton(){
    const btnSubmitOrder = document.querySelector("#submitOrder");
    btnSubmitOrder.addEventListener("click", (event) =>{
        event.preventDefault();
        // Get data from the form
        const formData = {
            firstName: document.querySelector("#first-name").value,
            lastName: document.querySelector("#last-name").value,
            address: document.querySelector("#address").value,
            city: document.querySelector("#city").value,
            email: document.querySelector("#email").value.toLowerCase(),
        }
        // 
        if(!isFormValid(formData)){
            displayError(formData);
        }else{
            // Fetch order data (id, list of products and form)
            postOrder();
            // Load to confirmation page
            // window.location.href = "/frontend/view/basket/basket.html";
            window.location.href = "/frontend/view/order/order.html";
        }
    })
}

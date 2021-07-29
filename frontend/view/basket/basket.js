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
    basketCard.innerHTML = `<div class="card">
                                <div class="card-body">
                                    <img src="${basketContent.image}" class="img-fluid card-img-top" alt="product image"></img>
                                    <h2 class="card-title">${basketContent.name}</h2>
                                    <p>Vernis : ${basketContent.varnish}</p>
                                    <p>Prix : ${basketContent.price}€</p>
                                    <button type="submit" onclick="removeItemFromBasket('${basketContent.id}')">Retirer du panier</button>
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

// Basket is empty, so display empty div
function displayEmptyBasket(){
    const basketCards = document.getElementById("basket-container");
    const emptyBasket = `<div class="card">
                            <div class="card-body">Votre panier est vide</div>
                        </div>`;
    basketCards.innerHTML = emptyBasket;
}

// Basket is full, so display div with the products in the basket
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
    // Create and insert totalPrice HTML
    const totalPriceDiv = `<div class="card">
                                <div class="card-body">Prix total de votre panier : ${totalPrice} €</div>
                                <button type="submit">Valider votre panier</button>
                            </div>`
    basketCards.insertAdjacentHTML("beforeend", totalPriceDiv);
}

// Display basket cards whether it is empty or full
function displayBasket(basketItemList){
    // If basket is empty, tell user basket is empty
    if (isBasketEmpty(basketItemList)){
        displayEmptyBasket();
    // If basket is filled with products, display list of products in basket
    }else{
        displayCardList(basketItemList);
        const totalPrice = getBasketPrice(basketItemList);
        displayPrice(totalPrice);
        displayForm();
        initSubmitButton();
    }
}

// Display the form after the basket
function displayForm(){
    const form = document.querySelector("#basket-container");
    const formDiv = 
            `<div>
                <form method="post">
                    <h2>Vos coordonnées</h2>

                    <div>
                        <label for="first-name">Votre prénom</label>
                        <input type="text" name="first-name" id="first-name" required>
                        <div id="first-name-error"></div>
                    </div>
                    <div>
                        <label for="last-name">Votre nom</label>
                        <input type="text" name="last-name" id="last-name" required>
                        <div id="last-name-error"></div>
                    </div>
                    <div>
                        <label for="address">Votre adresse</label>
                        <textarea name="address" id="address" required></textarea>
                        <div id="address-error"></div>
                    </div>
                    <div>
                        <label for="city">Votre ville</label>
                        <input type="text" name="city" id="city" required>
                        <div id="city-error"></div>
                    </div>
                    <div>
                        <label for="email">Votre adresse e-mail</label>
                        <input type="email" name="email" id="email" required>
                        <div id="email-error"></div>
                    </div>
		            <button type="submit" id="submitOrder">Valider votre commande</button>
                </form>
            </div>`;
    form.insertAdjacentHTML("afterend", formDiv);
}

// Display error for each part of the form to the user by using the functions below
function displayError(formData){
    displayErrorFirstName(formData);
    displayErrorLastName(formData);
    displayErrorCity(formData);
    displayErrorAddress(formData);
    displayErrorEmail(formData);
}

// Display error in the "First Name" part of the form to the user
function displayErrorFirstName(formData){
    if(!FormValidation.isTextValid(formData.firstName)){
        document.getElementById("first-name-error").innerText = `error first name`;
    }
}

// Display error in the "Last Name" part of the form to the user
function displayErrorLastName(formData){
    if(!FormValidation.isTextValid(formData.lastName)){
        document.getElementById("last-name-error").innerText = `error last name`;
    }
}

// Display error in the "City" part of the form to the user
function displayErrorCity(formData){
    if(!FormValidation.isTextValid(formData.city)){
        document.getElementById("city-error").innerText = `error city`;
    }
}

// Display error in the "Address" part of the form to the user
function displayErrorAddress(formData){
    if(!FormValidation.isTextValid(formData.address)){
        document.getElementById("address-error").innerText = `error address`;
    }
}

// Display error in the "Email" part of the form to the user
function displayErrorEmail(formData){
    if(!FormValidation.isTextValid(formData.email)){
        document.getElementById("email-error").innerText = `error email`;
    }
}

// Check whether the form is valid (if it's correctly filled)
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

function initSubmitButton(){
    // Create button "submit order" with event listener
    // const btnSubmitOrder = document.querySelector("#submitOrder");
    // btnSubmitOrder.addEventListener("click", (event) =>{
    //     event.preventDefault();
        // Get data from the form
        const formData = {
            firstName: document.querySelector("#first-name").value,
            lastName: document.querySelector("#last-name").value,
            address: document.querySelector("#address").value,
            city: document.querySelector("#city").value,
            email: document.querySelector("#email").value.toLowerCase(),
        }
        // Store data from the form in local and convert it into JSON format
            if(!isFormValid(formData)){
                displayError(formData);
            }
    // })
}


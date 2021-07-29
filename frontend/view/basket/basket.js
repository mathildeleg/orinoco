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
    let basketItemList = JSON.parse(localStorage.getItem('productInBasket'));
    displayBasket(basketItemList);
}

window.onload = async () => {
    getBasketContent();
}

// Creates basket content and its card
function createHTMLBasketCard(basketContent){
    const basketCard = document.createElement("div");
    basketCard.innerHTML = `<div class="card">
                                <div class="card-body">
                                    <img src="${basketContent.image}" class="img-fluid card-img-top" alt="product image"></img>
                                    <h2 class="card-title">${basketContent.name}</h2>
                                    <p>Vernis : ${basketContent.varnish}</p>
                                    <p>Prix : ${basketContent.price}€</p>
                                    <button type="submit">Retirer du panier</button>
                                </div>
                            </div>`;
    return basketCard;
}

function createHTMLCardList(basketItemList){
    return basketItemList.map(createHTMLBasketCard);
}

    // If empty, show empty div
function isBasketEmpty(basketItemList){
    return basketItemList.length === 0;
}

function displayEmptyBasket(){
    const basketCards = document.getElementById("basket-container");
    const emptyBasket = `<div class="card">
                            <div class="card-body">Votre panier est vide</div>
                        </div>`;
    basketCards.innerHTML = emptyBasket;
}

function displayCardList(basketItemList){
    const basketCards = document.getElementById("basket-container");
    const HTMLCardList = createHTMLCardList(basketItemList);
    HTMLCardList.forEach(div => {
        basketCards.append(div);
    })
}

function getBasketPrice(basketItemList){
    // Put price of each product currently in the basket in an array
    const basketPriceList = basketItemList.map((item) => item.price);
    // Calculate total of basket
    const reducer = (totalPrice, itemPrice) => totalPrice + itemPrice;
    return basketPriceList.reduce(reducer, 0);
}

function displayPrice(totalPrice){
    const basketCards = document.getElementById("basket-container");
    // Create and insert totalPrice HTML
    const totalPriceDiv = `<div class="card">
                                <div class="card-body">Prix total de votre panier : ${totalPrice} €</div>
                                <button type="submit">Valider votre panier</button>
                            </div>`
    basketCards.insertAdjacentHTML("beforeend", totalPriceDiv);
}

// Generates basket cards
function displayBasket(basketItemList){
    if (isBasketEmpty(basketItemList)){
        displayEmptyBasket();
    // If filled with products, show list of products in basket
    }else{
        displayCardList(basketItemList);
        const totalPrice = getBasketPrice(basketItemList);
        displayPrice(totalPrice);
        displayForm();
        initSubmitButton();
    }
}

function displayForm(){
    const form = document.querySelector("#basket-container");
    const formDiv = 
            `<div>
                <form method="post">
                    <h2>Vos coordonnées</h2>

                    <div>
                        <label for="first-name">Votre prénom</label>
                        <input type="text" name="first-name" id="first-name" required>
                    </div>
                    <div>
                        <label for="last-name">Votre nom</label>
                        <input type="text" name="last-name" id="last-name" required>
                    </div>
                    <div>
                        <label for="address">Votre adresse</label>
                        <textarea name="address" id="address" required></textarea>
                    </div>
                    <div>
                        <label for="city">Votre ville</label>
                        <input type="text" name="city" id="city" required>
                    </div>
                    <div>
                        <label for="email">Votre adresse e-mail</label>
                        <input type="email" name="email" id="email" required>
                    </div>
		            <button type="submit" id="submitOrder">Valider votre commande</button>
                </form>
            </div>`;
    form.insertAdjacentHTML("afterend", formDiv);
}

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
        // Store data from the form in local and convert it into JSON format
            if(isFormValid(formData)){
                localStorage.setItem("formData", JSON.stringify(formData));
            }else{
                alert("Veuillez remplir le formulaire correctement");
            }
    })
}

// Generates form once basket is full

// Removes product from basket
// function removeItem(){
//     const removeItem = document.getElementById("remove-from-basket");
//     // removeItem.addEventListener("click", (event) => {
//     //     event.preventDefault();
//     //     let productId = product[1]._id;
        
//     //     console.log(productId);
//     // for (let i = 0; i < removeFromBasket.length; i += 1){
//     //         if (basketCard[i].id === name) {     
//     //             basketCard.splice(i, 1)
//     //         } else {
//     //             basketCard.splice(i, 1)
//     //         }
//     // }
//     // })
// }

// console.log(removeItem());

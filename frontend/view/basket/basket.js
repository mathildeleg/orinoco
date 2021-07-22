// Fetch data for content of the basket
function getBasketContent(){
    let basketItemList = JSON.parse(localStorage.getItem('productInBasket'));
    showBasket(basketItemList);
}

window.onload = async () => {
    getBasketContent();
}

// Creates basket content and its card
function createBasketCard(basketContent){
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

// Generates basket cards
function showBasket(basketItemList){
    const card = basketItemList && basketItemList.map(createBasketCard);
    const basketCards = document.getElementById("basket-container");
    // If empty, show empty div
    if(card === null){
        const emptyBasket = `<div class="card">
                                <div class="card-body">Votre panier est vide</div>
                            </div>`;
        basketCards.innerHTML = emptyBasket;
        return emptyBasket;
    // If filled with products, show list of products in basket
    }else{
        card.forEach(div => {
        basketCards.append(div);
        })
        // Put price of each product currently in the basket in an array
        let sumPrice = [];
        for(let i = 0; i < basketItemList.length; i++){
        const productsPrices = basketItemList[i].price;
        sumPrice.push(productsPrices)
        }
        // Calculate total of basket
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const totalPrice = sumPrice.reduce(reducer, 0);
        // Create and insert totalPrice HTML
        const totalPriceDiv = `<div class="card">
                                    <div class="card-body">Prix total de votre panier : ${totalPrice} €</div>
                                    <button type="submit">Valider votre panier</button>
                                </div>`
        basketCards.insertAdjacentHTML("beforeend", totalPriceDiv);
        createForm();
    }
}

// Generates form once basket is full
function createForm(){
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

    // Create button "submit order" with event listener
    const btnSubmitOrder = document.querySelector("#submitOrder");
    btnSubmitOrder.addEventListener("click", (event) =>{
        event.preventDefault();
        // Get data from the form
        let formContent = {
            firstName: localStorage.getItem("first-name"),
            lastName: localStorage.getItem("last-name"),
            address: localStorage.getItem("address"),
            city: localStorage.getItem("city"),
            email: localStorage.getItem("email"),
        }

        const formData = {
            firstName: document.querySelector("#first-name").value,
            lastName: document.querySelector("#last-name").value,
            address: document.querySelector("#address").value,
            city: document.querySelector("#city").value,
            email: document.querySelector("#email").value,
        }

        // Ensure first name field is correctly filled out
        function checkText(text){
            if(/^[A-Za-z][^0-9_!¡?÷?¿\\/+=@#$%ˆ&*¨(){}|~<>;:[\]]{1,20}$/.test(text)){
                return text;
            }
            else{
                return null;
            }
        }
            // Check first name
            const checkedFirstName = checkText(formData.firstName);
            // Store data from the form in local and convert it into JSON format
            if(checkedFirstName){
                localStorage.setItem("formData", JSON.stringify(formData));
            }else{
                alert("Veuillez remplir le formulaire correctement");
            }

        // Ensure last name field is correctly filled out
            // Check last name
            const checkedLastName = checkText(formData.lastName);
            // Store data from the form in local and convert it into JSON format
            if(checkedLastName){
                localStorage.setItem("formData", JSON.stringify(formData));
            }else{
                alert("Veuillez remplir le formulaire correctement");
            }

        // Ensure city field is correctly filled out
            // Check city
            const checkedCity = checkText(formData.city);
            // Store data from the form in local and convert it into JSON format
            if(checkedCity){
                localStorage.setItem("formData", JSON.stringify(formData));
            }else{
                alert("Veuillez remplir le formulaire correctement");
            }

        // Ensure address field is correctly filled out
        function checkAddress(address){
            if(/^([0-9]{1,6})([a-zA-Z\s][^0-9._!¡?÷?¿\\/+=@#$%ˆ&*(){}|~<>;:[\]]{3,})$/.test(address)){
                return address;
            }else{
                return null;
            }
        }
            // Check address
            const checkedAdress = checkAddress(formData.address);
            // Store data from the form in local and convert it into JSON format
            if(checkedAdress){
                localStorage.setItem("formData", JSON.stringify(formData));
            }else{
                alert("Veuillez remplir le formulaire correctement");
            }

        // Ensure email field is correctly filled out
        function checkEmail(email){
            if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*))@((\[[0-9]\.{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
                return email;
            }else{
                return null;
            }
        }
            // Check email
            const checkedEmail = checkEmail(formData.email);
            // Store data from the form in local and convert it into JSON format
            if(checkedEmail){
                localStorage.setItem("formData", JSON.stringify(formData));
            }else{
                alert("Veuillez remplir le formulaire correctement");
            }
    })
}

// Get data from local storage for the form
// function getDataForForm(){
//     localStorage.setItem("first-name", document.querySelector("#first-name").value);
//     console.log(document.querySelector("#first-name").value);
// }

// function createArrayOfPrices(){
// let sumPrice = [];
// for(let i = 0; i < basketItemList.length; i++){
//     const productsPrices = basketItemList[i].price;
//     sumPrice.push(productsPrices)
// }
// }

// function calculateTotalPrice(){
// const reducer = (accumulator, currentValue) => accumulator + currentValue;
// const totalPrice = sumPrice.reduce(reducer, 0);
// }

// function insertTotalPrice(){
//     const totalPriceDiv = `<div class="card">
//                                     <div class="card-body">Prix total de votre panier : ${totalPrice} €</div>
//                                 </div>`
//     basketCards.insertAdjacentHTML("beforeend", totalPriceDiv);
// }
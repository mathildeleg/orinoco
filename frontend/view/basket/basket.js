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
        // Put price of each product in an array
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
                                </div>`
        basketCards.insertAdjacentHTML("beforeend", totalPriceDiv);
    }
}

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
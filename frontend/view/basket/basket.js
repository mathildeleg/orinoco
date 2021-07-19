// Fetch data for content of the basket
function getBasketContent(){
    let basketItemList = JSON.parse(localStorage.getItem('productInBasket'));
    showBasket(basketItemList);
}

window.onload = async () => {
    getBasketContent();
}

// Generates basket content and its card
function createBasketCard(basketContent){
    const basketCard = document.createElement("div");
    basketCard.innerHTML = `<div class="card">
                                <div class="card-body">
                                    <img src="${basketContent.image}" class="img-fluid card-img-top" alt="product image"></img>
                                    <h2 class="card-title">${basketContent.name}</h2>
                                    <p>${basketContent.price / 100}€</p>
                                    <p>${basketContent.varnish}</p>
                                </div>
                            </div>`;
    return basketCard;
}

function showBasket(basketItemList){
    const card = basketItemList && basketItemList.map(createBasketCard);
    const basketCards = document.getElementById("basket-container");
    if(card === null){
        const emptyBasket = `<div class="card">
                                <div class="card-body">Votre panier est vide</div>
                            </div>`;
        basketCards.innerHTML = emptyBasket;
        return emptyBasket;
    }else{
        card.forEach(div => {
        basketCards.append(div);
        })
    }   
}
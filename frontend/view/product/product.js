// Fetch API
async function fetchProductById(id){
    const res = await fetch(`http://localhost:3000/api/furniture/${id}`);
    const product = await res.json();
    showProduct(product);

    // Create button add to basket with event listener
        const addToBasket = document.querySelector("#add-to-basket");
        addToBasket.addEventListener("click", (event)=>{
            event.preventDefault();
            // Get id of varnish selected
            const varnishChoices = document.querySelector("#varnish-choices").value;
            // Get data from the product
            let productAddedToBasket = {
            image: product.imageUrl,
            name: product.name,
            price: product.price / 100,
            varnish: varnishChoices,
            id: product._id,
            }

            // Convert data from local storage into JSON format
            let basketContent = JSON.parse(localStorage.getItem("productInBasket"));

            // Store data of product(s) added to basket in local storage
            function basketLocalStorage(){
                basketContent.push(productAddedToBasket);
                localStorage.setItem("productInBasket", JSON.stringify(basketContent));
            }

            // If products already are in the local storage
            if(basketContent){
                basketLocalStorage()
            // If there are no products in the local storage
            }else{
                basketContent = [];
                basketLocalStorage()
            }
            })
}

window.onload = async () => {
    fetchProductById(getId());
}

// Get url id
function getId(){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}

// Generates product selected
function createCard(product){
    const divProduct = document.createElement("div");
    // fetch list of varnishes
    let varnishList = '';
    for (let varnish in product.varnish){
        varnishList += `<option value="${product.varnish[varnish]}">${product.varnish[varnish]}</option>`;
    }
    // HTML of product card
    divProduct.innerHTML = `<div class="card">
                                <img src="${product.imageUrl}" class="img-fluid card-img-top" alt="product image"></img>
                                <div class="card-body">
                                    <h2 class="card-title">${product.name}</h2>
                                    <p class="card-text">${product.description}</p>
                                    <p>${product.price/100}€</p>
                                    <div>
                                        <label for="varnish-choice">Vernis :</label>
                                        <select name="varnish" id="varnish-choices">${varnishList}</select>
                                    </div>
                                    <button type="submit" id="add-to-basket">Ajouter au panier <i class="fas fa-cart-plus"></i></button>
                                </div>
                            </div>`
    return divProduct;
}

// Generates product card
function showProduct(productData){
    const card = createCard(productData);
    const selectedProductContainer = document.getElementById("selected-product");
    selectedProductContainer.append(card);
}
// Fetch API
async function fetchProductById(id){
    const res = await fetch(`http://localhost:3000/api/furniture/${id}`);
    try {
        const product = await res.json();
        displayProduct(product);
        addProductToBasket(product);
    } catch (error) {
        console.error(error);
    }
}

window.onload = async () => {
    fetchProductById(getId());
}

// Get url id
function getId(){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}

// Generates HTML of product selected
function createHTMLProductCard(product){
    const divProduct = document.createElement("div");
    // Fetch list of varnishes
    let varnishList = '';
    for (let varnish in product.varnish){
        varnishList += `<option value="${product.varnish[varnish]}">${product.varnish[varnish]}</option>`;
    }
    // HTML of product card
    divProduct.innerHTML = `<div class="card m-4">
                                <img src="${product.imageUrl}" class="img-fluid card-img-top" alt="product image"></img>
                                <div class="card-body">
                                    <h2 class="card-title">${product.name}</h2>
                                    <p class="card-text">${product.description}</p>
                                    <p class="card-text">${product.price/100}€</p>
                                    <div class="container d-flex justify-content-center">
                                        <div class="d-flex flex-row align-items-center">
                                            <div class="d-flex flex-column m-2">
                                                <div class="d-flex flex-row align-center">
                                                    <label for="varnish-choices">Vernis : </label>
                                                    <div><select name="varnish" class="form-select" id="varnish-choices">${varnishList}</select></div>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-column m-2">
                                                <button type="submit" class="btn btn-outline-primary btn-lg mt-3 mb-2" id="add-to-basket">Ajouter au panier <i class="fas fa-cart-plus"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`
    return divProduct;
}

// Generates product card
function displayProduct(productData){
    const card = createHTMLProductCard(productData);
    const selectedProductContainer = document.getElementById("selected-product");
    selectedProductContainer.append(card);
}

// Create button add to basket with event listener
function addProductToBasket(product){
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
            window.alert("Ce produit a été ajouté à votre panier !");
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
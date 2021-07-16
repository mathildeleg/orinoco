// Fetch API

async function fetchProductById(id){
    const res = await fetch(`http://localhost:3000/api/furniture/${id}`);
    const product = await res.json();
    showProduct(product);
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
    // fetch varnish list
    let varnishList = '';
    for (let varnish in product.varnish){
        varnishList += `<option value="${product.varnish[varnish]}">${product.varnish[varnish]}</option>`;
    }
    // generates product card
    divProduct.innerHTML = `<div class="card">
                                <img src="${product.imageUrl}" class="img-fluid card-img-top" alt="product image"></img>
                                <div class="card-body">
                                    <h2 class="card-title">${product.name}</h2>
                                    <p class="card-text">${product.description}</p>
                                    <p>${product.price/100}€</p>
                                    <div>
                                        <label for="varnish-choice">Vernis :</label>
                                        <select name="varnish" id="varnish-choices">
                                        ${varnishList}
                                        </select>
                                    </div>
                                </div>
                            </div>`
    return divProduct;
}

function showProduct(productData){
    const card = createCard(productData);
    const selectedProductContainer = document.getElementById("selected-product");
    selectedProductContainer.append(card);
}

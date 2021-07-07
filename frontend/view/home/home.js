// Fetch API

async function fetchProduct(){
    const res = await fetch('http://localhost:3000/api/furniture');
    const products = await res.json();
    createCardList(products);
}

window.onload = async () => {
    fetchProduct();
}

// Generates list of products

function createCard(product){
    const div = document.createElement("div");
    div.innerHTML = `<div class="card">
                        <img src="${product.imageUrl}" class="img-fluid card-img-top" alt="product image"></img>
                            <div class="card-body">
                                <h2 class="card-title">${product.name}</h2>
                                <p class="card-text">${product.description}</p>
                                <p>${product.price}</p>
                                <a href="/frontend/view/product/product.html" class="stretched-link text-dark">
                            </div>
                        </a>
                    </div>`
    return div;
}

function createCardList(products){
    const cardDivList = products.map(createCard);
    const productContainer = document.getElementById("product");
    cardDivList.forEach(div => {
        productContainer.append(div);
    });
}
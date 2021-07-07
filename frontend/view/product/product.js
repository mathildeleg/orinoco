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
                        <div class="card-body">
                            <h2 class="card-title">${product.name}</h2>
                            <img src="${product.imageUrl}" class="img-fluid" alt="product image"></img>
                            <p class="card-text">${product.description}</p>
                            <p>${product.price}</p>
                        </div>
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
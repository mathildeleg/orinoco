// Fetch API

async function fetchProductById(id){
    const res = await fetch(`http://localhost:3000/api/furniture/${id}`);
    const product = await res.json();
    showProduct(product);
}

window.onload = async () => {
    fetchProductById(getId());
}

function getId(){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}
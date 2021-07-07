async function fetchProduct(){
    const res = await fetch('http://localhost:3000/api/furniture');
    const products = await res.json();
    createCardList(products);
}

window.onload = async () => {
    fetchProduct();
}
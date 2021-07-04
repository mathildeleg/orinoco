class Product{
    id;
    name;
    price;
    description;
    imageUrl;
    constructor(id, name, price, description){
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = this.imageUrl;
    }
}

let Product = new Product("5be9cc611c9d440000c1421e", "Cross Table", "59900€", "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "http://localhost:3000/images/oak_1.jpg");


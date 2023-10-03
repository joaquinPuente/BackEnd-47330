class ProductManager {
    constructor() {
        this.products = []
        this.id = 1;
    }

    getProducts(){
        return this.products;
    }

    generateID(){
        return this.id++;
    }


    addProduct(title, description, price, thumbnail, code, stock){
        if (title && description && price && thumbnail && code && stock) {
            if(this.products.find(product => product.code === code)){
                console.log('Codigo ya utilizado con anterioridad')
            }
            else{
            let id = this.generateID();
            const product = {id, title, description, price, thumbnail, code, stock};
            this.products.push(product);    
            }
   
        } else {
            console.log('En tu ultimo agregado de productos no están todos los campos completos');
        }
    }

    getElementById(id){
        return this.products.find(product => product.id === id) || console.log('producto no encontrado');
    }

}

const productos = new ProductManager
productos.addProduct('titulo')
productos.addProduct('Producto 1', 'Descripción 1', 1, 'imagen1.jpg', 'abc111', 50);
productos.addProduct('Producto 2', 'Descripción 2', 2, 'imagen2.jpg', 'abc111', 100);
productos.addProduct('Producto 2', 'Descripción 2', 2, 'imagen2.jpg', 'abc222', 150);
console.log('productos', productos.getProducts())
console.log('Su producto por ID es =>', productos.getElementById(2))
console.log('Su producto por ID es =>', productos.getElementById(3))
import fs from 'fs';

class ProductManager {
    constructor(path){
        this.path = path
        this.id = 1;
    }

    async getProducts(){
        return await getJSONFromFile(this.path);
    }

    async generateID() {
        const products = await this.getProducts();
        if (products.length === 0) {
            return 1;
        }
        const maxId = Math.max(...products.map(product => product.id));
        return maxId + 1;
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        if (title && description && price && thumbnail && code && stock) {
            const products = await this.getProducts();
            if (products.find(product => product.code === code)) {
                console.log('Código ya utilizado con anterioridad');
            } else {
                const id = await this.generateID();
                const product = { id, title, description, price, thumbnail, code, stock };
                products.push(product);
                console.log('Producto a agregar', product);
                await saveJSONToFile(this.path, products); // Guarda el array completo de productos
            }
        } else {
            console.log('En tu último agregado de productos no están todos los campos completos');
        }
    }

    async getElementById(id) {
        const products = await this.getProducts();
        const product = products.find(product => product.id === id);
        if (product) {
            return product;
        } else {
            console.log('Producto no encontrado');
            return null;
        }
    }

    async updateProductById(id, title, description, price, thumbnail, code, stock, category) {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id === id);
        if (index === -1) {
            console.log('Producto no encontrado');
            return;
        }
    
        const updatedProduct = { ...products[index], title, description, price, thumbnail, code, stock, category };
        products[index] = updatedProduct;
    
        await saveJSONToFile(this.path, products);
        console.log('Producto actualizado correctamente');
    }
    

    async deleteProduct(id) {
        const products = await this.getProducts();
        const index = await products.findIndex(product => product.id === id);
        if (index === -1) {
            throw new Error('Producto no encontrado'); // Lanzar un error si el producto no existe
        }
        products.splice(index, 1);
        await saveJSONToFile(this.path, products);
        console.log('Producto eliminado correctamente');
    }
    
}


const getJSONFromFile = async (path) => {
    try {
      await fs.promises.access(path);
    } catch (error) {
      return [];
    }
    const content = await fs.promises.readFile(path, 'utf-8');
    try {  
      return JSON.parse(content);
    } catch (error) {
      throw new Error(`El archivo ${path} no tiene un formato JSON válido.`);
    }
}
    
const saveJSONToFile = async (path, data) => {
    const content = JSON.stringify(data, null, '\t');
    try {
      await fs.promises.writeFile(path, content, 'utf-8');
    } catch (error) {
      throw new Error(`El archivo ${path} no pudo ser escrito.`);
    }
}

const ejemploAdd = async () => {
    try{
        const products = new ProductManager('../product.json')
        await products.addProduct('Producto 1', 'Descripción 1', 1, 'imagen1.jpg', 'abc111', 50)
        await products.addProduct('Producto 2', 'Descripción 2', 1, 'imagen2.jpg', 'abc112', 10)
        await products.addProduct('Producto 3', 'Descripción 3', 1, 'imagen3.jpg', 'abc113', 30)
        await products.addProduct('Producto 4', 'Descripción 4', 1, 'imagen4.jpg', 'abc114', 40)
        await products.addProduct('Producto 5', 'Descripción 5', 1, 'imagen5.jpg', 'abc115', 50)
        console.log('Producto/s agregado correctamente')
    }catch{
        console.log('Error al agregar el producto')
    }
}

export default ProductManager
import fs from 'fs'
import ProductManager from './ProductManager.js';



class CartManager {
  constructor(path) {
      this.path = path;
  }

  async getCarts() {
      return await getJSONFromFile(this.path);
  }

  async generateID() {
    const carts = await this.getCarts();
    if (carts && Array.isArray(carts)) {
        if (carts.length === 0) {
            return 1;
        }
        const maxId = Math.max(...carts.map(cart => cart.id));
        return maxId + 1;
    } else {
        return 1;
    }
  }


    async createCart() {
      const newCart = {
          id: await this.generateID(),
          products: []
      }
      const carts = await this.getCarts();
      carts.push(newCart);
      await saveJSONToFile(this.path, carts);
      return newCart;
    }

    async getCartById(id) {
        const carts = await this.getCarts();
        const carrito = await carts.find(cart => cart.id === id);
        if  (carrito) {
            return carrito;
        } else {
            console.log('Carrito no encontrado');
            return null;
        }
    }

    async putProducts(cid, cip) {
      const products = new ProductManager('../products.json')
      const producto = await products.getElementById(cip);
      const carrito = await this.getCartById(cid);
      if (producto && carrito) {
          const codeProduct = producto.id;
          const productCartList = carrito.products;
          const existingProduct = productCartList.find(item => item.id === codeProduct);
          if (existingProduct) {
              existingProduct.quantity = (existingProduct.quantity || 1) + 1;
          } else {
              productCartList.push({ id: codeProduct, quantity: 1 });
          }
          const carts = await this.getCarts();
          const updatedCarts = carts.map(cart => {
              if (cart.id === cid) {
                  return carrito;
              }
              return cart;
          });
          await saveJSONToFile(this.path, updatedCarts);
          console.log('Producto agregado al carrito correctamente');
      } else {
          console.log('Producto o carrito no encontrado');
      }
  }
  

}
////////////////////////////////////////////////
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
////////////////////////////////////////////////

const traer = async () => {
  const cart = new CartManager('../../carts.json')
    const carrito = await cart.getCarts();
    console.log('traer carrito', carrito);
}
//traer();
const crear = async () => {
    const cart = new CartManager('../../carts.json')
    const data = await cart.createCart()
    console.log('carrito creado',data)
}
//crear();
const traerID = async (ide)=>{
    const find = await cart.getCartById(ide)
    console.log( `Id=>${ide}: `,find)
}
//traerID(2);
const add = async()=>{
  const agregar= await cart.putProducts(1,2)
}
//add();

export default CartManager


import Express from "express";
import ProductManager from "./ProductManager.js";

const app = Express()
app.use(Express.urlencoded({ extended: true }));

const products = new ProductManager('../product.json')


app.get('/products', async (req,res)=>{
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        console.log('Limit:', limit);
        let productos;

        if(limit){
            const listado = await products.getProducts()
            productos = listado.slice(0,limit);
        }else{
            productos = await products.getProducts();
        }
        console.log('productos', productos)
        res.send(productos);
    } catch (error) {
        res.send('<h1>Error al traer los productos</h1>');
    }
    
})

app.get('/products/:id', async (req,res) =>{
    try {
        const productId = req.params.id;
        const productoID = await products.getElementById(parseInt(productId));
        if(!productoID){
            res.send('<h1>Producto no existe</h1>')
        }
        res.send(productoID)
    } catch (error) {
        res.send('<h1>Error al cargar la pagina</h1>')  
    }
})

app.listen(8080, ()=>{console.log('servidor corriendo en 8080')} )

//Test

//http://localhost:8080/products
//http://localhost:8080/products?limit=5
//http://localhost:8080/products/3
//http://localhost:8080/products/34123123
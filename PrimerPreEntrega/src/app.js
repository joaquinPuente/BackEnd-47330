import Express from "express";
import productRouter from './routers/productRouter.js'
import cartRouter from './routers/cartRouter.js'

const app = Express()
app.use(Express.urlencoded({ extended: true }));

app.use('/api/products', productRouter);

app.use('/api/carts', cartRouter);

app.listen(8080, ()=>{console.log('servidor corriendo en 8080')} )

//LinkS
//GET 127.0.0.1:8080/api/products/
//GET 127.0.0.1:8080/api/products/2
//POST 127.0.0.1:8080/api/products/  {"title": "Producto 11","description": "Descripción 11","price": 2,"thumbnail": "imagen11.jpg","code": "xyz211","stock": 15}
//DEL 127.0.0.1:8080/api/products/11
//POST 127.0.0.1:8080/api/carts/ (CREAR CARRITOS)
//GET 127.0.0.1:8080/api/carts/
//GET 127.0.0.1:8080/api/carts/:id
//POST 127.0.0.1:8080/api/carts/:cid/product/:pid
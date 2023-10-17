import {Router} from 'express'
import ProductManager from '../ProductManager.js';
import { io } from '../server.js';

const router = Router();
const products = new ProductManager('C:/Users/JPUENTE/Desktop/BackEnd-47330/Desafios/Sexto desafio/products.json')

router.get('/', async (req, res) => {
    try {
      const productos = await products.getProducts();
      res.render('home', { productos } );
    } catch (error) {
      console.error('Error al obtener productos:', error);
      res.status(500).send('Error al obtener productos');
    }
});

// Ruta para la página de productos en tiempo real
router.get('/realTimeProduct', async (req, res) => {
  try {
      const productos = await products.getProducts();
      res.render('realTimeProduct', { productos });
  } catch (error) {
      console.error('Error al obtener productos', error);
      res.status(500).send('Error al obtener productos');
  }
});

router.get('/addProduct', async (req, res) => {
    try {
      res.render('addProduct', {});
    } catch (error) {
      console.error('Error al  agregar producto', error);
      res.status(500).send('Error al agregar producto');
    }
});

// Agregar producto
router.post('/addProduct', async (req, res) => {
  try {
      const { title, description, price, thumbnail, code, stock } = req.body;
      await products.addProduct(title, description, price, thumbnail, code, stock);
      const productos = await products.getProducts();
      io.of('/realTimeProduct').emit('productos-actualizados', productos);

      res.redirect('/realTimeProduct'); 
  } catch (error) {
      console.error('Error al agregar producto', error);
      res.status(500).send('Error al agregar producto');
  }
});

router.get('/delProduct', async (req, res) => {
    try {
      res.render('delProduct', {});
    } catch (error) {
      console.error('Error al obtener formulario:', error);
      res.status(500).send('Error al obtener formulario');
    }
});

// Eliminar producto
router.post('/delProduct', async (req, res) => {
  try {
      const productId = parseInt(req.body.id);
      await products.deleteProduct(productId);
      const productos = await products.getProducts();
      io.of('/realTimeProduct').emit('productos-actualizados', productos);
      console.log(`ID: ${productId} fue eliminado correctamente.`);
      res.redirect('/realTimeProduct'); // Redirige a la página de productos en tiempo real
  } catch (error) {
      console.error('Error al eliminar producto', error);
      res.status(500).send('Error al eliminar producto');
  }
});


router.get('/updateProduct', async (req, res) => {
  try {
    res.render('updateProduct', {});
  } catch (error) {
    console.error('Error al obtener formulario:', error);
    res.status(500).send('Error al obtener formulario');
  }
});

//Actualiza producto
router.post('/updateProduct', async (req, res) => {
  try {
    const { id, title, description, price, thumbnail, code, stock } = req.body;
    const productoActualizado = await products.updateProductById(parseInt(id), title, description, price, thumbnail, code, stock);
    io.of('/realTimeProduct').emit('producto-actualizado', productoActualizado);
    console.log(`Su producto ID: ${id} fue actualizado correctamente.`);
    res.redirect('/realTimeProduct');
  } catch (error) {
    console.error('Error al actualizar producto', error);
    res.status(500).send('Error al actualizar producto');
  }
});

export default router
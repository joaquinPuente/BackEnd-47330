import {Router} from 'express'
import ProductManager from '../ProductManager.js';

const router = Router();
const product = new ProductManager("../../products.json")

router.get('/', async (req, res) => {
    try {
      const productos = await product.getProducts();
      console.log('Productos traidos: ', productos);
      res.render('index', { productos });
    } catch (error) {
      console.error('Error al obtener productos:', error);
      res.status(500).send('Error al obtener productos');
    }
});

export default router
import { Router } from 'express';
import ProductManager from '../ProductManager.js';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';

const router = Router();
router.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const jsonFilePath = path.join(__dirname, '../../products.json');
const productManager = new ProductManager(jsonFilePath);

router.get('/', async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
      const products = await productManager.getProducts();
  
      if (limit) {
        res.json(products.slice(0, limit));
      } else {
        res.json(products);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await productManager.getElementById(id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, price, thumbnail, code, stock, category } = req.body;
    await productManager.addProduct(title, description, price, thumbnail, code, stock, category);

    res.status(201).json({ success: true, message: 'Product added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, description, price, thumbnail, code, stock, category } = req.body;
    await productManager.updateProductById(id, title, description, price, thumbnail, code, stock, category);

    res.status(201).json({ success: true, message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const productDeleted = await productManager.deleteProduct(id);

    if (productDeleted) {
      res.status(200).json({ success: 'Product deleted' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;

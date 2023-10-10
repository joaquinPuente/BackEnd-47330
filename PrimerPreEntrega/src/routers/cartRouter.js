import { Router } from 'express';
import express from 'express';
import CartManager from '../CartManager.js'

const router = Router();
router.use(express.json());
const carrito = new CartManager('../carts.json')

router.get('/', async (req,res)=>{
    try {
        const cart = await carrito.getCarts();
        res.json(cart)
    } catch (error) {
        console.log('Error al traer los carritos');
    }
})

router.get('/:id', async (req,res)=>{
    try {
        const cid = req.params.id
        const cart = await carrito.getCartById( parseInt(cid));
        res.json(cart)
    } catch (error) {
        console.log('Error al traer los carritos');
    }
})

router.post('/', async (req,res)=>{
    try {
        const nuevoCarrito = await carrito.createCart();
        res.send(nuevoCarrito)
    } catch (error) {
        console.log('Error al crear un carrito');
    }
})

router.post('/:cid/product/:pid', async (req,res)=>{
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const add = await carrito.putProducts(parseInt(cid), parseInt(pid))
        res.send(add)
    } catch (error) {
        console.log('Error al agregar productos a un carrito');
    }

})


export default router;

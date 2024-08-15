import { Router } from "express"
import CartManager from "../controllers/cart.controller.js"
import mongoose from "mongoose";
const router = Router()
const manager = new CartManager()


router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        await manager.deleteProductCart(req.params.cid, req.params.pid);
        res.json({ message: 'Producto eliminado del carrito' });
    } catch (err) {
        res.status(400).send(err.message);
    }
});


router.put('/:cid', async (req, res) => {
    try {
        await manager.updateCart(req.params.cid, req.body.products);
        res.json({ message: 'Carrito actualizado' });
    } catch (err) {
        res.status(400).send(err.message);
    }
});


router.put('/:cid/products/:pid', async (req, res) => {
    try {
        await manager.updateProductQuantity(req.params.cid, req.params.pid);
        res.json({ message: 'Cantidad del producto actualizada' });
    } catch (err) {
        res.status(400).send(err.message);
    }
});


router.delete("/:cid", async (req, res) => {
    try {
        await manager.clearCart(req.params.cid);
        res.json({ message: 'Todos los productos eliminados del carrito' });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.put("/:cid", async (req, res) => {
    try {
        await manager.addCart();
        res.json({ message: 'Carrito creado' });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.put("/:cid/product/:pid", async (req, res) => {
    try {
        await manager.updateCart(parseInt(req.params.cid), parseInt(req.params.pid));
        res.json({ message: 'Carrito modificado' });
    } catch (err) {
        res.status(400).send(err.message);
    }
});


router.get('/:cid', async (req, res) => {
    try {
        const cart = await manager.getCartWithProducts(req.params.cid);
        res.json(cart);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const cartId = new mongoose.Types.ObjectId();
        await manager.addCart(cartId);
        res.json({ cartId });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

export default router
import { existsSync, writeFileSync, readFileSync } from "fs"
import ProductManager from '../controllers/product.controller.js'
import ProductsModel from "../models/product.model.js";
import CartModel from "../models/cart.model.js";

const managerProducts = new ProductManager('productos.json')

class CartManager {

    
    async deleteProductCart(cartId, productId) {
        const cart = await CartModel.findById(cartId);
        if (!cart) {
            throw new Error(`Cart with id ${cartId} not found`);
        }

        cart.products = cart.products.filter(p => !p.product._id.equals(productId));
        await cart.save();
    }

    
    async updateCart(cartId, products) {
        const cart = await CartModel.findById(cartId);
        if (!cart) {
            throw new Error(`Cart with id ${cartId} not found`);
        }

        cart.products = products;
        await cart.save();
    }

    
    async updateProductQuantity(cartId, productId) {
        const cart = await CartModel.findById(cartId);
        if (!cart) {
            throw new Error(`Cart with id ${cartId} not found`);
        }

        const product = cart.products.find((p) => p.product._id.equals(productId));
        if (!product) {
            cart.products.push({ product: productId, quantity:1 });
        } else {
            product.quantity = product.quantity+1;
        }
        await cart.save();
    }

    async clearCart(cartId) {
        const cart = await CartModel.findById(cartId);
        if (!cart) {
            throw new Error(`Cart with id ${cartId} not found`);
        }

        cart.products = [];
        await cart.save();
    }

    async getCartWithProducts(cartId) {
        const cart = await CartModel.findById(cartId).populate('products.product');
        if (!cart) {
            throw new Error(`Cart with id ${cartId} not found`);
        }

        return cart;
    }

     
     async addCart(cartId) {
        const newCart = new CartModel({ _id: cartId, products: [] });
        await newCart.save();
        return newCart;
    }

}

export default CartManager;
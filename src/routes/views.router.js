import { Router } from "express"
import ProductManager from '../controllers/product.controller.js'
import CartManager from '../controllers/cart.controller.js'

const router = Router()
const managerProducts = new ProductManager('productos.json')
const managerCarts = new CartManager('carrito.json')

// implementar limit
router.get("/",(req,res) => {
    // #swagger.tags = ['Products']
    let limit = parseInt(req.query.limit)
    let products = managerProducts.getProducts()

    if (!isNaN(limit) && limit > 0) {
        products = products.slice(0, limit)
    }

    let data = {
        productos: products
    }

    //res.json(products)
    res.render('home',data)
})
// implementar limit
router.get("/realtimeproducts",(req,res) => {
    // #swagger.tags = ['Products']
    let limit = parseInt(req.query.limit)
    let products = managerProducts.getProducts()

    if (!isNaN(limit) && limit > 0) {
        products = products.slice(0, limit)
    }

    let data = {
        productos: products
    }

    //res.json(products)
    res.render('realTimeProducts',data)
})


export default router
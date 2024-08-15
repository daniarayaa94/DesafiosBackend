import { Router } from "express"
import ProductManager from '../controllers/product.controller.js'
import CartManager from '../controllers/cart.controller.js'

const router = Router()
const managerProducts = new ProductManager('productos.json')
const managerCarts = new CartManager('carrito.json')


router.get("/", async (req,res) => {
    // #swagger.tags = ['Products']
    let products = await managerProducts.getProducts(req.query)  


    let data = {
        query: req.query.query,
        limit: req.query.limit||5,
        order: req.query.order,

        payload: products.docs,
        totalPayload: products.docs.lenght,
        totalPages: products.totalPages,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.prevLink = products.hasPrevPage ? `/?page=${products.prevPage}&query=${req.query.query||''}&limit=${req.query.limit||5}&order=${req.query.order||'price_desc'}` : null,
        nextLink: products.nextLink = products.hasNextPage ? `/?page=${products.nextPage}&query=${req.query.query||''}&limit=${req.query.limit||5}&order=${req.query.order||'price_desc'}` : null,
        isValid: products.docs.length > 0
    }

    //res.json(products)
    res.render('index',data)
})

router.get("/product/:id", async (req,res) => {
    // #swagger.tags = ['Products']
    const product = await managerProducts.getProductById(req.params.id);
    //res.json(products)
    
    let data = {
        
        product:{
            title: product.title,
            stock: product.stock,
            description: product.description,
            price: product.price,
            category: product.category,
        }
    }

    res.render('detalleProd',data)
})

router.get("/cart/:id", async (req,res) => {
    // #swagger.tags = ['Products']
    const cart = await managerCarts.getCartWithProducts(req.params.id);
    //res.json(products)
    
    
   
    res.render('detalleCarrito',cart)
})



export default router
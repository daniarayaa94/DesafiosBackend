import { Router } from "express"
import CartManager from "../controllers/cart.controller.js"

const router = Router()
const manager = new CartManager('carrito.json')

// implementar limit
router.get("/",(req,res) => {
    // #swagger.tags = ['Carts']
    
    res.json(manager.getCarts())
})

router.get("/:cid",(req,res) => {
    // #swagger.tags = ['Carts']
    res.json(manager.getCart(parseInt(req.params.cid)))
})


router.post("/",(req,res) => {
    // #swagger.tags = ['Carts']
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Add new cart.',
            schema: { $ref: '#/definitions/AddCart' }
    } */

    try{

        manager.addCart(req.body)
        res.json({message: 'Carrito agregado'})
    }catch(err){
        res.status(400).send(err.message);
    }
})

router.post("/:cid/product/:pid",(req,res) => {
    // #swagger.tags = ['Carts']
    /*  #swagger.parameters['body'] = {
            in: 'body',|
            description: 'Add producto to cart.',
            schema: { $ref: '#/definitions/AddCart' }
    } */

    try{

        manager.updateCart(parseInt(req.params.cid),parseInt(req.params.pid))
        res.json({message: 'Carrito modificado'})
    }catch(err){
        res.status(400).send(err.message);
    }
})

export default router
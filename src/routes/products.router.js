const express = require("express")
const router = express.Router()
const ProductManager = require('../controllers/product.controller')

const manager = new ProductManager('productos.json')

// implementar limit
router.get("/",(req,res) => {
    // #swagger.tags = ['Products']
    let limit = parseInt(req.query.limit)
    let products = manager.getProducts()

    if (!isNaN(limit) && limit > 0) {
        products = products.slice(0, limit)
    }

    res.json(products)
})

router.get("/:pid",(req,res) => {
    // #swagger.tags = ['Products']
    res.json(manager.getProductById(parseInt(req.params.pid)))
})


router.put("/:pid",(req,res) => {
     /* 
        #swagger.tags = ['Products']
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Update product.',
            schema: { $ref: '#/definitions/EditProduct' }
            } 
    */
   
    const {id, ...otrosCampos} =  req.body
    product = manager.updateProduct(parseInt(req.params.pid), otrosCampos)
    res.json({message: 'Producto modificado'})
})

router.delete("/:pid",(req,res) => {
    // #swagger.tags = ['Products']
    product = manager.deleteProduct(parseInt(req.params.pid))
    res.json({message: 'Producto eliminado'})
})


router.post("/",(req,res) => {
    /* 
        #swagger.tags = ['Products']
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Add new product.',
            schema: { $ref: '#/definitions/AddProduct' }
            } 
    */

    try{
        const newProduct = req.body
        manager.addProduct({ status:true , ...newProduct})
        res.json({message: 'Producto agregado'})
    }catch(err){
        res.status(400).send(err.message);
    }
    
})

module.exports = router
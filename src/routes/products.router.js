import { Router } from "express"
import ProductManager from '../controllers/product.controller.js'

const router = Router()
const manager = new ProductManager('productos.json')


const listadoProductos = (req) => {
    let products = manager.getProducts()

    const io = req.app.get('socketio');

    io.emit('actualizar_productos', products);
}

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
    const product = manager.updateProduct(parseInt(req.params.pid), otrosCampos)

    listadoProductos(req)

    res.json({message: 'Producto modificado'})
})

router.delete("/:pid",(req,res) => {
    // #swagger.tags = ['Products']
    const product = manager.deleteProduct(parseInt(req.params.pid))
    listadoProductos(req)
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
        listadoProductos(req)
        res.json({message: 'Producto agregado'})
    }catch(err){
        res.status(400).send(err.message);
    }
    
})

export default router
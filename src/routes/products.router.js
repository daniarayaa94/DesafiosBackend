import { Router } from "express"
import ProductManager from '../controllers/product.controller.js'

const router = Router()
const manager = new ProductManager('productos.json')

const listadoProductos = async (req) => {
    let products = await manager.getProducts({page:1,limit:10})

    const io = req.app.get('socketio');

    io.emit('actualizar_productos', products.docs);
}


// implementar limit
router.get("/", async (req,res) => {
    // #swagger.tags = ['Products']
    const result = await manager.getProducts(req.query);

    res.send({ 
        result: "success", 
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: products.prevLink = products.hasPrevPage ? `/realtimeproducts/?page=${products.prevPage}&query=${req.query.query}&limit=${req.query.limit}&order=${req.query.order}` : null,
        nextLink: products.nextLink = products.hasNextPage ? `/realtimeproducts/?page=${products.nextPage}&query=${req.query.query}&limit=${req.query.limit}&order=${req.query.order}` : null,
        isValid: result.docs.length > 0
    });
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


router.post("/", async (req,res) => {
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
        await manager.addProduct({ status:true , ...newProduct})
        listadoProductos(req)
        res.json({message: 'Producto agregado'})
    }catch(err){
        res.status(400).send(err.message);
    }
    
})

export default router
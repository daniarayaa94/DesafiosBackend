import { existsSync, writeFileSync, readFileSync } from "fs"
import ProductManager from '../controllers/product.controller.js'

const managerProducts = new ProductManager('productos.json')

class CartManager {

    constructor(filePath) {
        this.path = filePath
        this.initializeFile()
        this.nextId = this.getNextId() 
    }

    initializeFile() {
        if (!existsSync(this.path)) {
            writeFileSync(this.path, JSON.stringify([]))
        }
    }

    getNextId() {
        const carts = this.getCartsFromFile()
        if (carts.length === 0) {
            return 1
        }

        const maxId = carts.reduce((max, cart) => (cart.id > max ? cart.id : max), 0)
        return maxId + 1
    }

    addCart(cart) {
        const carts = this.getCartsFromFile()
        cart.id = this.nextId
        this.nextId += 1

        let products = managerProducts.getProductsFromFile()

        cart.products.forEach((prod)=>{
            let product = products.find(item => item.id === prod.idp)

            if(!product){
                throw new Error(`Producto con ID ${prod.idp} no existe`);
            }

            if(product.stock < prod.quantity){
                throw new Error(`Producto con ID ${prod.idp} no tiene suficiente stock`);
            }

        })


        carts.push(cart)
        this.saveCartsToFile(carts)

        
        // Restar el stock de los productos
        cart.products.forEach(item => {
            let prod = products.find(itemCP => item.idp == itemCP.id )
            
            let stock = item.stock - prod.quantity
            managerProducts.updateProduct(prod.id, { stock, ...prod });
        });
    }

    getCarts() {
        return this.getCartsFromFile()
    }

    getCart(id) {
        const carts = this.getCartsFromFile()
        
        return carts.find(cart => cart.id === id)
    }

    updateCart(idc, idp) {
        const carts = this.getCartsFromFile()
        const index = carts.findIndex(cart => cart.id === idc)
        const actualCart = carts[index]

        let products = managerProducts.getProductsFromFile()
        
        let product = products.find(item => item.id === idp)
        

        if(!product){
            throw new Error(`Producto con ID ${idp} no existe`);
        }

        if(product.stock < 1){
            throw new Error(`Producto con ID ${idp} no tiene suficiente stock`);
        }
        
        if (index !== -1) {
            
            let productoCarrito = actualCart.products.find(item => item.idp === idp)
            
            if (productoCarrito) {
                productoCarrito.quantity += 1;
            } else {
                actualCart.products.push({ idp: idp, quantity: 1 });
            }
            
            
            carts[index] = { ...carts[index], ...actualCart }
            this.saveCartsToFile(carts)
        }else{
            throw new Error('No existe el carrito solicitado');
        }

    }

    deleteCart(id) {
        let carts = this.getCartsFromFile()
        carts = carts.filter(cart => cart.id !== id)
        console.log(carts)
        this.saveCartsToFile(carts)
    }

    getCartsFromFile() {

        const data = readFileSync(this.path, "utf8")
        return JSON.parse(data)
    }

    saveCartsToFile(carts) {
        writeFileSync(this.path, JSON.stringify(carts, null, 2))
    }

}

export default  CartManager;
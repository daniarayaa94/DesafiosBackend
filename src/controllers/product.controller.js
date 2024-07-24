import { existsSync, writeFileSync, readFileSync } from "fs"
import Product from '../models/product.js'

class ProductManager {

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
        const products = this.getProductsFromFile()
        if (products.length === 0) {
            return 1
        }

        const maxId = products.reduce((max, product) => (product.id > max ? product.id : max), 0)
        return maxId + 1
    }

    addProduct(product) {
        const products = this.getProductsFromFile()
        
        const prod = new Product(this.nextId,product)

        console.log(prod)

        this.nextId += 1
        products.push(prod)
        this.saveProductsToFile(products)
    }

    getProducts() {
        return this.getProductsFromFile()
    }

    getProductById(id) {
        
        const products = this.getProductsFromFile()
        return products.find(product => product.id === id)
    }

    updateProduct(id, updatedFields) {
        
        const products = this.getProductsFromFile()
        const index = products.findIndex(product => product.id == id)
    
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedFields }
            this.saveProductsToFile(products)
        }
    }

    deleteProduct(id) {
        let products = this.getProductsFromFile()
        products = products.filter(product => product.id !== id)
        console.log(products)
        this.saveProductsToFile(products)
    }

    getProductsFromFile() {

        const data = readFileSync(this.path, "utf8")
        return JSON.parse(data)
    }

    saveProductsToFile(products) {
        writeFileSync(this.path, JSON.stringify(products, null, 2))
    }

}

export default ProductManager
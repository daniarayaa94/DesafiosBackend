import { existsSync, writeFileSync, readFileSync } from "fs"
import ProductsModel from "../models/product.model.js"

class ProductManager {

    

    addProduct = async (product) => {
        
        await ProductsModel.create(product)
    }

    getProducts = async (queryParams) => {
        let find = {};
        let sort = {};
        let page = parseInt(queryParams.page) || 1;
        let limit = parseInt(queryParams.limit) || 5;
        
        const { query, order } = queryParams;

        if (query) {
            find.$or = [
                { category: new RegExp(query, 'i') },
                { stock: !isNaN(query) ? Number(query) : -1 } 
            ];
        }
        
        if (order) {
            const [field, direction] = order.split('_');
            sort[field] = direction === 'asc' ? 1 : -1;
        }

        const options = {
            limit,
            sort,
            page,
            lean: true
        };

        try {
            const result = await ProductsModel.paginate(find, options);
            
            return result;
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: 'Error al traer productos', err });
        }
    }

    async getProductById(id) {
        try {
            const product = await ProductsModel.findById(id);
            return product;
        } catch (error) {
            console.error('Error getting product by ID:', error);
            throw error;
        }
    }

    async updateProduct(id, updatedFields) {
        try {
            const product = await ProductsModel.findByIdAndUpdate(id, updatedFields, { new: true });
            return product;
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            await ProductsModel.findByIdAndDelete(id);
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    }

}

export default ProductManager
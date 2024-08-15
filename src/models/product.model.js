import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2';

const productsCollection =  'products'

const productsSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        code: String,
        price: Number,
        stock: Number,
        status: Boolean,
        category: String,
        image: String,
    }
)


productsSchema.plugin(mongoosePaginate) 
const ProductsModel = mongoose.model(productsCollection,productsSchema)

export default ProductsModel 

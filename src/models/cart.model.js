import mongoose from "mongoose";

const cartCollection = "carts";

const cartSchema = mongoose.Schema({

    products: [
        {
            product: { 
                type: mongoose.Schema.Types.ObjectId,
                ref: "products"
            },
            quantity: { 
                type: Number, 
                default: 1
            }
        }
    ]
});

const CartModel = mongoose.model(cartCollection, cartSchema)

export default CartModel   
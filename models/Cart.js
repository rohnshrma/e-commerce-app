const mongoose = require("mongoose")

const cartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Types.ObjectId, ref: "product", required: true },
    quantity: { type: Number, required: true, default: 1 }
})

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    Items: [cartItemSchema]
})

const Cart = mongoose.model("Cart")
module.exports = Cart

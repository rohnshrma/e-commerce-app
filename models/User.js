const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minLength: 3 },
    email: { type: String, required: true, unique: true, minLength: 8 },
    password: { type: String, required: true, minLength: 8 },
    address: { type: String, required: true, minLength: 20 },
    phone: { type: Number, required: true, unique: true },
    orders: [{ type: mongoose.Types.ObjectId, ref: "Order" }],
    cart: [{ type: mongoose.Types.ObjectId, ref: "Cart" }],
    role: { type: String, enum: ["customer", "admin"], default: "customer" }
})




module.exports = mongoose.model("user", userSchema)
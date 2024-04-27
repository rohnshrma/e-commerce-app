const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minLength: 3 },
    email: { type: String, required: true, unique: true, minLength: 8 },
    password: { type: String, required: true, minLength: 8 },
    address: { type: String, required: true, minLength: 20 },
    phone: { type: Number, required: true, unique: true }
})




module.exports = mongoose.model("user", userSchema)
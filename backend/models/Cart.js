const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true}
}, {
    timestamps: true,
})

const Cart = mongoose.model('Cart', CartSchema)

module.exports = Cart
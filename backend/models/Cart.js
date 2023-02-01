const Product = require('./Product')
const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema({
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
    cartId: {type: String}
})

const Cart = mongoose.model('Cart', CartSchema)

module.exports = Cart
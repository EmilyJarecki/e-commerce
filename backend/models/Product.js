const mongoose = require("mongoose")
const Review = require('./Review')

const ProductSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String},
    reviews: [Review.schema]
}, {
    timestamps: true,
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product

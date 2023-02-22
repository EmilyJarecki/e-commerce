const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    shopping: {type: String},
    category: {type: String},
    owner: {
        //ObjectId lets us populate data
        type: mongoose.Types.ObjectId,
        // this is the model
        ref: 'User',
        // can prove to be buggy if there is data in the database
        required: true
    },
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]
}, {
    timestamps: true,
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product

const mongoose = require("mongoose")

const WishlistSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String},
}, {
    timestamps: true,
})

const Wishlist = mongoose.model('Wishlist', WishlistSchema)

module.exports = Wishlist
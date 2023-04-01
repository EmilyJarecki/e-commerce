const mongoose = require("mongoose")

const WishlistSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String},
    owner: {
        //ObjectId lets us populate data
        type: mongoose.Types.ObjectId,
        // this is the model
        ref: "User",
        // can prove to be buggy if there is data in the database
        required: true,
      },
}, {
    timestamps: true,
})

const Wishlist = mongoose.model('Wishlist', WishlistSchema)

module.exports = Wishlist
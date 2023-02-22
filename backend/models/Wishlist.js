const mongoose = require("mongoose")


const WishlistSchema = new mongoose.Schema({
    owner: {
        //ObjectId lets us populate data
        type: mongoose.Types.ObjectId,
        // this is the model
        ref: 'User',
        // can prove to be buggy if there is data in the database
        required: true
    },
    product: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}]
}, {
    timestamps: true,
})

const Wishlist = mongoose.model('Wishlist', WishlistSchema)

module.exports = Wishlist

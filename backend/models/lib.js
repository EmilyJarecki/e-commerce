const mongoose = require ('mongoose')

module.exports = {
    Product: require('./Product'),
    Review: require('./Review'),
    User: require('./User'),
    Wishlist: require('./Wishlist')
};

mongoose.connect( process.env.MONGODB_URI);

const mongoose = require ('mongoose')

module.exports = {
    Product: require('./Product'),
    Review: require('./Review'),
};

mongoose.connect( process.env.MONGODB_URI);

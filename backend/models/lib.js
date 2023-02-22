const mongoose = require ('mongoose')

module.exports = {
    Product: require('./Product'),
    Review: require('./Review'),
    User: require('./User'),
};

mongoose.connect( process.env.MONGODB_URI);

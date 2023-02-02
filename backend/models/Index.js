const mongoose = require ('mongoose')

module.exports = {
    Product: require('./Product'),
    Review: require('./Review'),
    Cart: require('./Cart'),
    Blog: require('./Blog'),
    Comment: require('./Comment')
};

mongoose.connect( process.env.MONGODB_URI || "mongodb+srv://Emily:Jarecki@cluster0.ilqsf5x.mongodb.net/capstone?retryWrites=true&w=majority" );

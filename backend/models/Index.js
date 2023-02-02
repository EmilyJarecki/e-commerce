const mongoose = require ('mongoose')

module.exports = {
    Product: require('./Product'),
    Review: require('./Review'),
};

mongoose.connect( process.env.MONGODB_URI || "mongodb+srv://Emily:Jarecki@cluster0.ilqsf5x.mongodb.net/capstone?retryWrites=true&w=majority" );

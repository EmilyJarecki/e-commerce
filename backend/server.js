// IMPORTS 
const express = require("express");
const app = express();

//APP DEPENDENCIES
const cors = require('cors')
const morgan = require('morgan')

// INITIALIZE .ENV VARIABLES
require("dotenv").config();
require("./config/db.connection")

const { PORT, MONGODB_URI } = process.env;

//CONTROLLER IMPORT
const productController = require('./controllers/product-controller')
const reviewController = require('./controllers/review-controller')
const authController = require('./controllers/auth-controller')

//MIDDLEWARE
app.use(cors())
app.use(morgan('dev'))
app.use(express.json());
app.use('/products', productController)
app.use('/review', reviewController)
app.use('/auth', authController)


// LISTENER
app.listen(process.env.PORT || 4000, () => console.log(`listening on PORT ${PORT}`));
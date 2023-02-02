const express = require('express')
const router = express.Router()
const { Product } = require('../models/Index')
const { Cart } = require('../models/Index')
const { Review } = require('../models/Index')

// REVIEW INDEX ROUTE
// when inputted in postman as /review/id , you get an array of reviews from that id object
router.get("/:id", async (req, res, next) => {
    try {
        const singleProduct = await Product.findById(req.params.id)
		res.status(200).json(singleProduct.reviews)
        console.log("You're coming from me.")
        console.log(singleProduct.reviews[0].id)
        // res.status(200).json(allReviews)
    }catch(error){
        res.status(400).json({error: "error"})
        return next(err)
    }
});

router.get("/single/:id", async (req, res, next) => {
    try {
        const singleReview = await Product.findById(req.params.id)
		res.status(200).json(singleProduct.reviews.id)
        console.log("t's here")
        // res.status(200).json(allReviews)
    }catch(error){
        res.status(400).json({error: "error"})
        return next(err)
    }
});


// POST ROUTE
router.post('/:id', async (req, res, next) => {
	try {
	const product = await Product.findById(req.params.id)
    // console.log("The product" + product)
    // console.log(req.body.name)
	const reviewToCreate = {
		name: req.body.name,
		body: req.body.body,
	}
    // console.log(product.reviews)
	product.reviews.push(reviewToCreate)
	await product.save()
    res.status(200).json({message:"success"})
	} catch(err) {
		next(err)
	} 
})

// SHOW ROUTE 
router.get('/', async (req, res, next) =>{
    try{
        const singleProduct = await Review.findById(req.params.id)
        console.log(singleProduct)
        console.log("I'm a GET in the review controller.")
        res.status(200).json(singleProduct)
    }catch(error){
        res.status(400).json({error: "error"})
        return next(err)
    }
});

// REVIEW DELETE ROUTE
router.delete("/:id", async (req, res, next) => {
	try{
		const deletedReview = await Product.findByIdAndDelete(req.params.id)
		// console.log(deletedTweet)
		res.status(200).json({message: "Deleted Review", deletedReview })	
	}catch(err){
		res.status(400).json({error: "error"})
        return next(err)
	}
});







module.exports = router 
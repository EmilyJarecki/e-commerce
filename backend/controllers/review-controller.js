const express = require('express')
const router = express.Router()
const { Product } = require('../models/Index')
const { Cart } = require('../models/Index')
const { Review } = require('../models/Index')

// REVIEW INDEX ROUTE
router.get("/", async (req, res, next) => {
    try {
        const allReviews = await Review.find({})
        res.status(200).json(allReviews)
    }catch(error){
        res.status(400).json({error: "error"})
        return next(err)
    }
});

// POST ROUTE
router.post('/:id', async (req, res, next) => {
	try {
	const product = await Product.findById(req.params.id)
    console.log(product)
    console.log(req.body.name)
	const reviewToCreate = {
		name: req.body.name,
		body: req.body.body,
	}
    console.log(product.reviews)
	product.reviews.push(reviewToCreate)
	await product.save()
    res.status(200).json({message:"success"})
	} catch(err) {
		next(err)
	} 
})

//SHOW ROUTE 
router.get('/:id/:id', async (req, res, next) =>{
    try{
        const singleProduct = await Review.findById(req.params.id)
        console.log(singleProduct)
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
		console.log(deletedTweet)
		res.status(200).json({message: "Deleted Review", deletedReview })	
	}catch(err){
		res.status(400).json({error: "error"})
        return next(err)
	}
});







module.exports = router 
const express = require('express')
const router = express.Router()
const { Product } = require('../models/lib')
const { Review } = require('../models/lib')

// REVIEW INDEX ROUTE
// when inputted in postman as /review/id , you get an array of reviews from that id object

// how to get: http://localhost:4000/review/63db06578afff9d94a178ab5
router.get("/:productid", async (req, res, next) => {
    try {
        const singleProduct = await Product.findById(req.params.productid)
		console.log("hello. I am the product id route")
		res.status(200).json(singleProduct.reviews)
    }catch(error){
        res.status(400).json({error: "error"})
        return next(err)
    }
});

router.delete("/:reviewid", async (req, res, next) => {
    try {
		const deletedReview = await Review.findByIdAndDelete(req.params.reviewid)
		console.log(deletedReview)
		res.status(200).json({message: "Deleted Review", deletedReview })
    }catch(error){
        res.status(400).json({error: "error"})
        return next(err)
    }
});

// how to post: review/product/productid
// POST ROUTE
router.post('/product/:productid', async (req, res, next) => {
	try {
	const product = await Product.findById(req.params.productid)
	const reviewToCreate = {
		name: req.body.name,
		body: req.body.body,
	}
	const newReview = await Review.create(reviewToCreate)
	product.reviews.push(newReview._id)
	await product.save()
    res.status(200).json({message:"success"})
	} catch(err) {
		next(err)
	} 
})

// REVIEW UPDATE ROUTE
router.put("/:id", async (req, res, next) => {
	try{
		const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body)
		console.log(updatedReview)
		res.status(200).json({message: "Successfully updated tweet", updatedReview})
	}catch(error){
		res.status(400).json({error: "error"})
        return next(err)
	}
});






module.exports = router 
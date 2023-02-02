const express = require('express')
const router = express.Router()
const { Product } = require('../models/Index')
const { Review } = require('../models/Index')

// REVIEW INDEX ROUTE
// when inputted in postman as /review/id , you get an array of reviews from that id object

// how to get: http://localhost:4000/review/63db06578afff9d94a178ab5
router.get("/:productid", async (req, res, next) => {
    try {
        const singleProduct = await Product.findById(req.params.productid)
		console.log("hello")
		res.status(200).json(singleProduct.reviews)
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
    // console.log("The product" + product)
    // console.log(req.body.name)
	const reviewToCreate = {
		name: req.body.name,
		body: req.body.body,
	}
    // console.log(product.reviews)
	const newReview = await Review.create(reviewToCreate)
	product.reviews.push(newReview._id)
	await product.save()
    res.status(200).json({message:"success"})
	} catch(err) {
		next(err)
	} 
})

// SHOW ROUTE 
// router.get('/:id', async (req, res, next) =>{
//     try {
// 		const allProducts = await Product.find({})
// 		res.status(200).json(allProducts[0])
// 		console.log(allProducts[0].name)
// 	}catch(err){
// 		res.status(400).json({error: "error"})
//         return next(err)
// 	}
// });

// REVIEW DELETE ROUTE
router.delete("/:id", async (req, res, next) => {
	try{
		const deletedReview = await Review.findByIdAndDelete(req.params.id)
		// console.log(deletedTweet)
		res.status(200).json({message: "Deleted Review", deletedReview })	
	}catch(err){
		res.status(400).json({error: "error"})
        return next(err)
	}
});







module.exports = router 
const express = require('express')
const router = express.Router()
const { Product } = require('../models/lib')
const { handleValidateOwnership, requireToken } = require("../middleware/auth");
const db = require('../models/lib') 

// SHOW ROUTE
router.get("/", async (req, res, next) => {
	try {
		const allProducts = await Product.find({}).populate('owner', 'username -_id').exec()
		res.status(200).json(allProducts)
		console.log(allProducts[0].name)
	}catch(err){
		res.status(400).json({error: "error"})
        return next(err)
	}
});

// SHOW INDEX ROUTE
router.get("/:id", async (req, res, next) => {
	try {	
		const singleProduct = await Product.findById(req.params.id).populate(['reviews', 'owner']).exec()
		res.status(200).json(singleProduct)
		console.log("show index")
		console.log(singleProduct.reviews)
	}catch(error){
		res.status(400).json({error: "error"})
        return next(err)
	}
});

// CREATE ROUTE
router.post("/", requireToken, async (req, res, next) =>  {
    try {
		const owner = req.user._id
		console.log(owner, req.user)
		req.body.owner = owner
        const createProduct = await Product.create(req.body)
        res.status(201).json(createProduct)
    } catch(err){
		res.status(400).json({error: "error"})
        return next(err)
    }
});
// UPDATE ROUTE
router.put("/:id", requireToken, async (req, res, next) => {
	try{
		handleValidateOwnership(req, await Product.findById(req.params.id))
		const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body)
		console.log(updatedProduct)
		res.status(200).json({message: "Successfully updated product", updatedProduct})
	}catch(error){
		res.status(400).json({error: "error"})
        return next(err)
	}
});

router.delete("/:id", requireToken, async (req, res, next) => {
	try{
		handleValidateOwnership(req, await Product.findById(req.params.id))
		const deletedProduct = await Product.findByIdAndDelete(req.params.id)
		console.log(deletedProduct)
		res.status(200).json({message: "Deleted product", deletedProduct })	
	}catch(err){
		res.status(400).json({error: "error"})
        return next(err)
	}
});
module.exports = router
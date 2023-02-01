const express = require('express')
const router = express.Router()
const Cart = require("../models/Cart");
const Product = require('../models/Product');

// INDEX ROUTE
router.get("/:id", async (req, res, next) => {
	try {
		// const allItems = await Cart.find({})
		const cart = await Cart.findById("63d984e71a12693f1c123e9c").populate("products")
		res.send(cart)
		console.log(cart)
		// res.status(200).json(cart)
	}catch(err){
		res.status(400).json({error: "error"})
        return next(err)
	}
});

// CREATE ROUTE
router.post("/", async (req, res, next) =>  {
    try {
        const addItem = await Cart.create(req.body)
        res.status(201).json(addItem)
    } catch(err){
		res.status(400).json({error: "error"})
        return next(err)
    }
});

// ADD ITEMS TO CART ROUTE
router.post("/:id", async (req, res, next) =>  {
	try {
		const cart = await Cart.findById("63d984e71a12693f1c123e9c")
		const allProducts = await Product.findById("63d87e23efdc9b59b557082b")
		// console.log(allProducts[0].id)

		// const productToAdd = {
		// 	id: allProducts
		// }
		cart.products.push(allProducts)
		await cart.save()
		res.status(201).json(await cart.populate("products"))
	} catch(err){
		res.status(400).json({error: "error"})
		return next(err)
	}
});





// SHOW ROUTE
// router.get("/:id", async (req, res, next) => {
// 	try {	
// 		const singleTweet = await Tweet.findById(req.params.id)
// 		console.log(singleTweet, "the single tweet")
// 		res.status(200).json(singleTweet)
// 	}catch(error){
// 		res.status(400).json({error: "error"})
//         return next(err)
// 	}
// });

// TWEET UPDATE ROUTE
router.put("/:id", async (req, res, next) => {
	try{
		const updatedItem = await Cart.findByIdAndUpdate(req.params.id, req.body)
		console.log(updatedItem)
		res.status(200).json({message: "Successfully updated tweet", updatedItem})
	}catch(error){
		res.status(400).json({error: "error"})
        return next(err)
	}
});

// DELETE ROUTE
router.delete("/:id", async (req, res, next) => {
	try{
		const deletedItem = await Cart.findByIdAndDelete(req.params.id)
		console.log(deletedItem)
		res.status(200).json({message: "Deleted Item", deletedItem })	
	}catch(err){
		res.status(400).json({error: "error"})
        return next(err)
	}
});

module.exports = router
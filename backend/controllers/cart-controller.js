const express = require('express')
const router = express.Router()
const { Product } = require('../models/Index')
const { Cart } = require('../models/Index')
const { Review } = require('../models/Index')

// INDEX ROUTE
router.get("/:id", async (req, res, next) => {
	try {
		const cart = await Cart.findById("63db33ad1f8a69eb32780c0f").populate("products").exec()
		// const Cart = await Cart.findById("63d9bfa9d0e8c157ee3cff51")
		console.log(cart.products)
		res.send(cart)
		// console.log(cart)
		// res.status(201).json(await Cart.populate("products"))
	}catch(err){
		res.status(400).json({error: "error"})
        return next(err)
	}
});


// ADD ITEMS TO CART ROUTE
router.post("/:id", async (req, res, next) =>  {
	try {
		const cart = await Cart.findById("63db33ad1f8a69eb32780c0f").populate("products").exec()
		// const allProducts = await Product.findById("63d87e23efdc9b59b557082b")
		// console.log(allProducts[0].id)
		console.log(cart)
		res.status(201).json()
		const productToAdd = new Product({
			name : req.body.name,
			image: req.body.image,
			description: req.body.description,
			price: req.body.description,
			category: req.body.description
		})

		console.log("below if the cart")
		console.log(cart.products[0])
		res.send(cart.products.push(productToAdd))
		await cart.save()
		res.status(201).json(await cart.populate("products"))
	} catch(err){
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
// SHOW ROUTE
router.get("/", async (req, res, next) => {
	try {
		const allProducts = await Product.find({})
		res.status(200).json(allProducts)
		console.log(allProducts[0].name)
	}catch(err){
		res.status(400).json({error: "error"})
        return next(err)
	}
});


router.put("/:id", async (req, res, next) => {
	try{
		const updatedItem = await Cart.findByIdAndUpdate(req.params.id, req.body)
		console.log(updatedItem)
		res.status(200).json({message: "Successfully updated cart", updatedItem})
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



const express = require('express')
const router = express.Router()
const Cart = require("../models/Cart")

// INDEX ROUTE
router.get("/", async (req, res, next) => {
	try {
		const allItems = await Cart.find({})
		res.status(200).json(allItems)
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
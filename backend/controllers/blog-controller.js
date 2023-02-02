const express = require('express')
const router = express.Router()
const { Blog } = require('../models/Index')

// INDEX ROUTE
router.get("/", async (req, res, next) => {
	try {
		const allTweets = await Blog.find({})
		res.status(200).json(allTweets)
	}catch(err){
		res.status(400).json({error: "error"})
        return next(err)
	}
});

// TWEET CREATE ROUTE
router.post("/", async (req, res, next) =>  {
    try {
        const createTweet = await Blog.create(req.body)
        res.status(201).json(createTweet)
    } catch(err){
		res.status(400).json({error: "error"})
        return next(err)
    }
});

// TWEET SHOW ROUTE
router.get("/:id", async (req, res, next) => {
	try {	
		const singleBlog = await Blog.findById(req.params.id)
		console.log(singleBlog, "the single blog")
		res.status(200).json(singleBlog)
	}catch(error){
		res.status(400).json({error: "error"})
        return next(err)
	}
});

// TWEET UPDATE ROUTE
router.put("/:id", async (req, res, next) => {
	try{
		const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body)
		console.log(updatedBlog)
		res.status(200).json({message: "Successfully updated blog", updatedBlog})
	}catch(error){
		res.status(400).json({error: "error"})
        return next(err)
	}
});

// TWEET DELETE ROUTE
router.delete("/:id", async (req, res, next) => {
	try{
		const deletedBlog = await Blog.findByIdAndDelete(req.params.id)
		console.log(deletedBlog)
		res.status(200).json({message: "Deleted Blog", deletedBlog })	
	}catch(err){
		res.status(400).json({error: "error"})
        return next(err)
	}
});

module.exports = router
const express = require('express')
const router = express.Router()
const { handleValidateOwnership, requireToken } = require("../middleware/auth");
const { User } = require('../models/lib')
const { Product } = require('../models/lib')
const { Wishlist } = require('../models/lib')


// Add a product to user's wishlist
// router.post('/', requireToken, async (req, res) => {
//     const { product } = req.body;
//     const newItem = new Wishlist({product})
//     newItem.save()
//       .then(item => res.json(item))
//       .catch(error => res.status(500).json({ error: error.message }))
//   });
  router.post('/', async (req, res, next) => {
    try {
      const item = await Product.findById(req.params.productid)
      const wishToCreate = {
        name: req.body.name,
      }
      const newWish = await Wishlist.create(wishToCreate)
      item.push(newWish._id)
      await item.save()
        res.status(200).json({message:"success"})
      } catch(err) {
        next(err)
      } 
  });




  // router.get('/', (req, res) => {
  //   Wishlist.find()
  //     .then(items => res.json(items))
  //     .catch(error => res.status(500).json({ error: error.message }));
  // });
  
  // router.put('/:id', (req, res) => {
  //   const { product } = req.body;
  //   Wishlist.findByIdAndUpdate(req.params.id, { product }, { new: true })
  //     .then(item => res.json(item))
  //     .catch(error => res.status(500).json({ error: error.message }));
  // });
  
  // router.delete('/:id', (req, res) => {
  //   Wishlist.findByIdAndDelete(req.params.id)
  //     .then(() => res.sendStatus(204))
  //     .catch(error => res.status(500).json({ error: error.message }));
  // });
  
  module.exports = router;
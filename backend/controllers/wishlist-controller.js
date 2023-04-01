const express = require("express");
const router = express.Router();
const { User, Wishlist } = require("../models/lib");
const { handleValidateOwnership, requireToken } = require("../middleware/auth");
const db = require("../models/lib");

// POST route to add an item to a user's wishlist
router.post("/", requireToken, async (req, res) => {
  try {
    // Find the authenticated user by their ID
    const user = await User.findById(req.user._id);

    if (!user) {
      // If user is not found, return an error message
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new wishlist item based on the request body
    const newItem = new Wishlist({
      name: req.body.name,
      image: req.body.image,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
    });

    // Add the new wishlist item to the user's wishlist
    user.wishlist.push(newItem);

    // Save the updated user document
    await user.save();

    // Return the updated user document with the new wishlist item
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/", requireToken, async (req, res) => {
  try {
    // Find the authenticated user by their ID
    const user = await User.findById(req.user._id);

    if (!user) {
      // If user is not found, return an error message
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user's wishlist items in the response
    res.status(200).json(user.wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});





module.exports = router;

const express = require("express");
const router = express.Router();
const { User, Wishlist } = require("../models/lib");
const { handleValidateOwnership, requireToken } = require("../middleware/auth");
const db = require("../models/lib");

router.post("/", requireToken, async (req, res, next) => {
  try {
    const owner = req.user._id;
    console.log(owner, req.user, req.user.wishlist);
    req.body.owner = owner;
    const createWish = await Wishlist.create(req.body);
    const user = await User.findByIdAndUpdate(owner, { $push: { wishlist: createWish._id } });
    res.status(201).json(createWish);
  } catch (err) {
    res.status(400).json({ error: "error" });
    return next(err);
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

router.delete("/:itemId", requireToken, async (req, res) => {
  try {
    // Find the authenticated user by their ID
    const user = await User.findById(req.user._id);

    if (!user) {
      // If user is not found, return an error message
      return res.status(404).json({ message: "User not found" });
    }

    // Find the wishlist item to remove
    const itemToRemove = user.wishlist.find((item) => item._id == req.params.itemId);

    if (!itemToRemove) {
      // If item is not found, return an error message
      return res.status(404).json({ message: "Wishlist item not found" });
    }

    // Remove the wishlist item from the user's wishlist
    user.wishlist.pull(itemToRemove);

    // Save the updated user document
    await user.save();

    // Return the updated user document without the removed wishlist item
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});




module.exports = router;

const express = require("express");
const router = express.Router();
const { User, Wishlist, Product } = require("../models/lib");
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

router.delete("/:id", requireToken, async (req, res, next) => {
  try {
    const wishId = req.params.id;
    const userId = req.user._id;

    // Find the user and remove the wish from their wishlist
    const user = await User.findByIdAndUpdate(userId, { $pull: { wishlist: wishId } });

    // If the user is not found, return an error message
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the wish by its ID and remove it
    const deletedWish = await Wishlist.findByIdAndDelete(wishId);

    // If the wish is not found, return an error message
    if (!deletedWish) {
      return res.status(404).json({ message: "Wish not found" });
    }

    // Send a success response
    res.status(200).json({ message: "Wish deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
    return next(err);
  }
});




module.exports = router;

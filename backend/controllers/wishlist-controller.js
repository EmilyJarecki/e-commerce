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
    const user = await User.findByIdAndUpdate(owner, {
      $push: { wishlist: createWish._id },
    });
    res.status(201).json(createWish);
  } catch (err) {
    res.status(400).json({ error: "error" });
    return next(err);
  }
});

//gets all wishlist items, not individual
router.get("/", async (req, res, next) => {
  try {
    const allWishes = await Wishlist.find({})
      .populate("owner", "username")
      .exec();
    res.status(200).json(allWishes);
    console.log(allWishes[0].name);
  } catch (err) {
    res.status(400).json({ error: "error" });
    return next(err);
  }
});

// router.get("/:ownerId", async (req, res, next) => {
//   const ownerId = req.params.ownerId;
//   try {
//     const allWishes = await Wishlist.find({ ownerId: ownerId });
//     res.status(200).json(allWishes);
//   } catch (error) {
//     res.status(400).json({ error: "error" });
//     return next(err);
//   }
// });
router.get("/:userId", requireToken, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("wishlist");
    res.status(200).json(user.wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
    return next(err);
  }
});




router.delete("/:id", requireToken, async (req, res, next) => {
  try {
    const wishId = req.params.id;
    const userId = req.user._id;

    // Find the user and remove the wish from their wishlist
    const user = await User.findByIdAndUpdate(userId, {
      $pull: { wishlist: wishId },
    });

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

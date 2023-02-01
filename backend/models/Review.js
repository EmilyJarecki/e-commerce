const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  name: {type: String, required: true},
  body: {type: String, required: true},
},{timestamps: true});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review
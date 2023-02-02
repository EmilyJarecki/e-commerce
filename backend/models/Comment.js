const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  name: {type: String, required: true},
  title: String,
},{timestamps: true});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment
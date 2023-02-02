const mongoose = require("mongoose");
const Comment = require('./Comment')

const BlogSchema = new mongoose.Schema({
  name: {type: String, required: true},
  title: String,
  image: String,
  comments: [Comment.schema]
},{timestamps: true});

const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog
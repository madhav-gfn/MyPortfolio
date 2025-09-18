const mongoose= require('mongoose');
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  content: {
    type: String,
    required: true,
    minlength: 20        // ensure blog has enough content
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  tags: [String]
}, { timestamps: true }); // ✅ createdAt & updatedAt

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true // Make the title field required
  },
  description: String,
  image: String,
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;

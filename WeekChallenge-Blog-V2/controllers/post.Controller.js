const Post = require('../models/post.model');



// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { title, content, author, category } = req.body;
    const post = new Post({ title, content, author, category });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single post by Title
exports.getPostByTitle = async (req, res) => {

};

// Update a post by TITLE
exports.updatePostByTitle = async (req, res) => {

};

// Delete a post by ID
exports.deletePostByTitle = async (req, res) => {

  
};

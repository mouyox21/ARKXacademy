// controllers/postController.js
const postModel = require('../models/post');

// Controller function to handle getting all posts
function getAllPosts(req, res) {
    const posts = postModel.getAllPosts();
    res.json(posts);
}

// Controller function to handle creating a new post
function createPost(req, res) {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
    }
    const newPost = postModel.createPost({ title, content });
    res.status(201).json(newPost);
}

// Controller function to handle getting a post by ID
function getPostById(req, res) {
    const postId = req.params.id;
    const post = postModel.getPostById(postId);
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
}

// Controller function to handle updating a post by ID
function updatePostById(req, res) {
    const postId = parseInt(req.params.id);
    const { title, content } = req.body;
    const updatedPost = postModel.updatePostById(postId, { title, content });
    if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
    }
    res.json(updatedPost);
}

// Controller function to handle deleting a post by ID
function deletePostById(req, res) {
    const postId = parseInt(req.params.id)
    const deletedPost = postModel.deletePostById(postId);
    if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' });
    }
    res.json(deletedPost);
}

module.exports = {
    getAllPosts,
    createPost,
    getPostById,
    updatePostById,
    deletePostById
};

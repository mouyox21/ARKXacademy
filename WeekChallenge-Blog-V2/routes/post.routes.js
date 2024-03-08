const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const PostController = require('../controllers/post.Controller');

// POST /posts
router.post('/', authMiddleware.authenticate, PostController.createPost);

// GET /posts
router.get('/', PostController.getAllPosts);

// GET /posts/:id
router.get('/:id', PostController.getPostByTitle);

// PUT /posts/:id
router.put('/:id', authMiddleware.authenticate, PostController.updatePostByTitle);

// DELETE /posts/:id
router.delete('/:id', authMiddleware.authenticate, PostController.deletePostByTitle);

module.exports = router;

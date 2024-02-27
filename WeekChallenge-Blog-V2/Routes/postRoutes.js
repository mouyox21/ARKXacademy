const express = require('express');
const router = express.Router();
const postController = require('../Controllers/postController');
const authenticate = require('../Middleware/authenticate');

router.get('/posts', postController.getAllPosts);
router.get('/posts/:id', postController.getPostById);
router.post('/posts', authenticate, postController.createPost);
router.put('/posts/:id', authenticate, postController.updatePost);
router.delete('/posts/:id', authenticate, postController.deletePost);

module.exports = router;

const express = require('express');
const router = express.Router();
const controller = require('../controllers/post.controller');
const {isAuthenticated} = require('../middlewares/auth.middleware');

// CRUD routes for Post
router.post('/', controller.create)
router.get('/', controller.findAll)
router.get('/:id', controller.findOne)
router.put('/:id', controller.update)
router.delete('/:id', controller.remove)

module.exports = router;

// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const UserController = require('../controllers/user.controllers');

// POST /users/register
router.post('/register', UserController.registerUser);

// POST /users/login
router.post('/login', authMiddleware.authenticate, UserController.authenticateUser);

// Protected routes
router.use(authMiddleware.authenticate);

// GET /users/profile
router.get('/profile', UserController.getUserProfile);

// PUT /users/profile
router.put('/profile', UserController.updateUserProfile);

// DELETE /users/profile
router.delete('/profile', UserController.deleteUserAccount);

module.exports = router;

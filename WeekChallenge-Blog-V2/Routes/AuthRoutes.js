const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');
const authenticate = require('../Middleware/authenticate');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/user', authenticate, authController.getCurrentUser);
router.get('/logout', authController.logout);

module.exports = router;
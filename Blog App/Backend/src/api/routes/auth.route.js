const express = require('express');
const passport = require('passport');
const controller = require('../controllers/auth.controller');
const {authenticate} = require('../middlewares/auth.middleware');
const validateLoginInput = require('../validations/loginInput.validator');
const validateRegisterInput = require('../validations/registerInput.validator');
const router = express.Router();

// CRUD routes for Post
router.post('/login' , [validateLoginInput] ,authenticate, controller.login);
router.post('/register', [validateRegisterInput] ,controller.register)
router.get('/logout', controller.destroy)


module.exports = router;

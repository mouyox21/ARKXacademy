// routes/userRoutes.js

const express = require('express');
const router = express.Router();

//  le contrôleur des utilisateurs
const userController = require('../Controllers/UserController');

//  les routes pour les utilisateurs

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);

module.exports = router;

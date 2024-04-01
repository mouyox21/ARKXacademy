const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');

// CRUD routes for User
router.post('/', controller.create)
router.get('/', controller.viewAll)
router.get('/:id', controller.findOne)
router.put('/:id', controller.update)
router.delete('/:id', controller.remove)

module.exports = router;

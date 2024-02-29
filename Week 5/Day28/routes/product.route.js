const express = require('express');
const router = express.Router();
const productController = require('../controllers/products.controllers');

router.get('/products', productController.getAllProducts);
router.post('/products', productController.addProduct);
router.get('/products/paginated', productController.getPaginatedProducts);
router.get('/products/count', productController.countProductsInStock);
router.get('/products/average-price', productController.calculateAveragePrice);
router.get('/products/sort-by-name', productController.sortProductsByNameAscending);
router.get('/products/sort-by-price', productController.sortProductsByPriceDescending);
router.get('/products/group-by-category', productController.groupProductsByCategory);

module.exports = router;

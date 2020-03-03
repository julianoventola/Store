const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const errorController = require('../controllers/errorController');

// PRODUCTS
router.get('/admin/add-product', productController.getAddProduct);
router.post('/admin/add-product', productController.storeProduct);

// MAIN
router.get('/', productController.getProduct);

// Route for 404 cases
router.get('*', errorController.get404page);

module.exports = router;

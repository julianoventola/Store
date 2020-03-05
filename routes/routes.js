const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const productController = require('../controllers/productController');
const errorController = require('../controllers/errorController');

// ADMIN - PRODUCTS
router.get('/admin/add-product', adminController.getAddProduct);
router.post('/admin/add-product', adminController.storeProduct);
router.get('/admin/products', adminController.getProducts);

// MAIN - SHOP
router.get('/', productController.getIndex);
router.get('/products', productController.getProducts);
router.get('/cart', productController.getCart);
router.get('/checkout', productController.getCheckout);

// Route for 404 cases
router.get('*', errorController.get404page);

module.exports = router;

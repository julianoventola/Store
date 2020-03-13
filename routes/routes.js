const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const productController = require('../controllers/productController');
const errorController = require('../controllers/errorController');

// ADMIN - PRODUCTS
router.get('/admin/add-product', adminController.getAddProduct); // Add product - GET
router.post('/admin/add-product', adminController.storeProduct); // Add product - POST
router.get('/admin/edit-product/:productId', adminController.getUpdateProduct); // Edit product - GET
router.post('/admin/edit-product/', adminController.updateProduct); // Edit product - POST
router.post('/admin/delete-product/', adminController.deleteProduct); // Delete product - POST
router.get('/admin/products', adminController.getProducts);

// MAIN - SHOP
router.get('/', productController.getIndex);
router.get('/products', productController.getProducts);
router.get('/products/:productId', productController.getProductById);
router.get('/cart', productController.getCart);
router.post('/cart', productController.postCart);
router.post('/cart-delete-item', productController.postCartDeleteProduct);
router.get('/orders', productController.getOrders);
router.get('/checkout', productController.getCheckout);

// Route for 404 cases
router.get('*', errorController.get404page);

module.exports = router;

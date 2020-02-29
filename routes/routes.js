const express = require('express');

const router = express.Router();

const productController = require('../controllers/productController');

// PRODUCTS
router.get('/admin/add-product', productController.getAddProduct);
router.post('/admin/add-product', productController.storeProduct);

// MAIN
router.get('/', productController.getProduct);

// Route for 404 cases
router.get('*', (req, res) => {
  res.status(404).render('404');
});

module.exports = router;

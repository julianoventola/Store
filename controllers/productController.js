const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
  // Rendering pug template
  res.render('add-product', {
    docTitle: 'Add Product',
    path: '/admin/add-product',
  });
};

exports.storeProduct = (req, res) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
};

exports.getProduct = (req, res) => {
  const products = Product.fetchAll();
  // Rendering pug template
  res.render('shop', {
    products,
    docTitle: 'Shop',
    path: '/',
  });
};

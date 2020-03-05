const Product = require('../models/product');
exports.getIndex = (req, res) => {
  Product.fetchAll(products => {
    // Rendering pug template
    res.render('shop', {
      products,
      docTitle: 'Shop',
      path: '/',
    });
  });
};

exports.getProducts = (req, res) => {
  Product.fetchAll(products => {
    // Rendering pug template
    res.render('products', {
      products,
      docTitle: 'All Products',
      path: '/products',
    });
  });
};

exports.getCart = (req, res) => {
  res.render('cart', {
    docTitle: 'Your cart',
    path: '/cart',
  });
};

exports.getCheckout = (req, res) => {
  res.render('checkout', {
    docTitle: 'checkout',
    path: '/checkout',
  });
};

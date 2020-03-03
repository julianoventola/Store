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
  Product.fetchAll(products => {
    // Rendering pug template
    res.render('shop', {
      products,
      docTitle: 'Shop',
      path: '/',
    });
  });
};

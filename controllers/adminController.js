const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
  // Rendering pug template
  res.render('admin-add-product', {
    docTitle: 'Add Product',
    path: '/admin/add-product',
  });
};

exports.storeProduct = (req, res) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res) => {
  Product.fetchAll(products => {
    // Rendering pug template
    res.render('admin-products', {
      products,
      docTitle: 'Admin Products',
      path: '/admin/products',
    });
  });
};

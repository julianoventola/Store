const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
  // Rendering pug template
  res.render('admin-add-product', {
    docTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

exports.storeProduct = (req, res) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getUpdateProduct = (req, res) => {
  const { productId } = req.params;
  Product.findById(productId, product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin-add-product', {
      docTitle: 'Edit Product',
      path: '/admin/edit-product',
      product,
      editing: true,
    });
  });
};

exports.updateProduct = (req, res) => {
  const { productId, title, imageUrl, price, description } = req.body;
  const updatedProduct = new Product(
    productId,
    title,
    imageUrl,
    description,
    price
  );
  updatedProduct.save();
  res.redirect('/admin/products');
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

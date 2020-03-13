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
  req.user
    .createProduct({ title, imageUrl, price, description })
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getUpdateProduct = (req, res) => {
  const { productId } = req.params;
  req.user
    .getProducts({ where: { id: productId } })
    .then(products => {
      const product = products[0];
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin-add-product', {
        docTitle: 'Edit Product',
        path: '/admin/edit-product',
        product,
        editing: true,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.updateProduct = (req, res) => {
  const { productId, title, imageUrl, price, description } = req.body;
  Product.findByPk(productId)
    .then(product => {
      product.title = title;
      product.imageUrl = imageUrl;
      product.price = price;
      product.description = description;
      return product.save();
    })
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.deleteProduct = (req, res) => {
  const { productId } = req.body;
  Product.destroy({ where: { id: productId } });
  res.redirect('/admin/products');
};

exports.getProducts = (req, res) => {
  req.user
    .getProducts()
    .then(products => {
      // Rendering pug template
      res.render('admin-products', {
        products,
        docTitle: 'Admin Products',
        path: '/admin/products',
      });
    })
    .catch(err => {
      console.log(err);
    });
};

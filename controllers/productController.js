const products = [];

exports.getAddProduct = (req, res) => {
  // Rendering pug template
  res.render('add-product', {
    docTitle: 'Add Product',
    path: '/admin/add-product',
  });
};

exports.storeProduct = (req, res) => {
  products.push({ title: req.body.title });

  res.redirect('/');
};

exports.getProduct = (req, res) => {
  // Rendering pug template
  res.render('shop', {
    products,
    docTitle: 'Shop',
    path: '/',
  });
};

const Product = require('../models/product');
const Cart = require('../models/cart');
exports.getIndex = (req, res) => {
  Product.findAll()
    .then(products => {
      res.render('shop', {
        products,
        docTitle: 'Shop',
        path: '/',
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProducts = (req, res) => {
  Product.findAll()
    .then(products => {
      res.render('products', {
        products,
        docTitle: 'All Products',
        path: '/products',
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProductById = (req, res) => {
  const { productId } = req.params;
  Product.findByPk(productId)
    .then(product => {
      res.render('details', {
        product,
        docTitle: product.title,
        path: '/products',
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (const product of products) {
        const productData = cart.products.find(prod => prod.id === product.id);
        if (productData) {
          cartProducts.push({ productData: product, qty: productData.qty });
        }
      }
      res.render('cart', {
        products: cartProducts,
        docTitle: 'Your cart',
        path: '/cart',
      });
    });
  });
};

exports.postCart = (req, res) => {
  const { productId } = req.body;
  Product.findById(productId, product => {
    Cart.addProduct(productId, product.price);
  });
  res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res) => {
  const { productId } = req.body;
  Product.findById(productId, product => {
    Cart.deleteProduct(productId, product.price);
  });
  res.redirect('/cart');
};

exports.getOrders = (req, res) => {
  res.render('orders', {
    docTitle: 'Orders',
    path: '/orders',
  });
};

exports.getCheckout = (req, res) => {
  res.render('checkout', {
    docTitle: 'checkout',
    path: '/checkout',
  });
};

const Product = require('../models/product');

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
  req.user
    .getCart()
    .then(cart => {
      return cart
        .getProducts()
        .then(products => {
          res.render('cart', {
            products,
            docTitle: 'Your cart',
            path: '/cart',
          });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postCart = (req, res) => {
  const { productId } = req.body;
  let fetchedCart;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      let newQuantity = 1;
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return fetchedCart.addProduct(product, {
          through: { quantity: newQuantity },
        });
      }
      return Product.findByPk(productId)
        .then(product => {
          return fetchedCart.addProduct(product, {
            through: { quantity: newQuantity },
          });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postCartDeleteProduct = (req, res) => {
  const { productId } = req.body;
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: productId } });
    })
    .then(products => {
      const product = products[0];
      product.cartItem.destroy();
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getOrders = (req, res) => {
  req.user
    .getOrders({ include: ['products'] })
    .then(orders => {
      res.render('orders', {
        docTitle: 'Orders',
        path: '/orders',
        orders,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postOrder = (req, res) => {
  let fetchedCart;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then(products => {
      return req.user
        .createOrder()
        .then(order => {
          return order.addProducts(
            products.map(product => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch(err => {
          console.log(err);
        });
    })
    .then(() => {
      return fetchedCart.setProducts(null);
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch(err => {
      console.log(err);
    });
};

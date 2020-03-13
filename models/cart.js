const fs = require('fs');
const path = require('path');
const JSONproduct = path.resolve(__dirname, '..', 'data', 'cart.json');

module.exports = class Cart {
  static getCart(cb) {
    fs.readFile(JSONproduct, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }

  static addProduct(id, productPrice) {
    fs.readFile(JSONproduct, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      const productExistsIndex = cart.products.findIndex(p => p.id === id);
      const productExists = cart.products[productExistsIndex];
      let updateProduct;
      if (productExists) {
        updateProduct = { ...productExists };
        updateProduct.qty = updateProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[productExistsIndex] = updateProduct;
      } else {
        updateProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updateProduct];
      }
      cart.totalPrice += +productPrice;
      fs.writeFile(JSONproduct, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(JSONproduct, (err, fileContent) => {
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find(product => product.id === id);
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        product => product.id !== id
      );
      updatedCart.totalPrice -= productPrice * productQty;

      fs.writeFile(JSONproduct, JSON.stringify(updatedCart), err => {
        console.log(err);
      });
    });
  }
};

const fs = require('fs');
const path = require('path');
const JSONproduct = path.resolve(__dirname, '..', 'data', 'cart.json');

module.exports = class Cart {
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
};

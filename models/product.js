const fs = require('fs');
const path = require('path');
const JSONproduct = path.resolve(__dirname, '..', 'data', 'products.json');

const getProductsFromFile = cb => {
  fs.readFile(JSONproduct, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if (this.id) {
        const productIndexExist = products.findIndex(
          product => product.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[productIndexExist] = this;
        fs.writeFile(JSONproduct, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(JSONproduct, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }
};

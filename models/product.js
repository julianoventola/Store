const fs = require('fs');
const path = require('path');
const JSONproduct = path.resolve(__dirname, '..', 'data', 'products.json');

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    fs.readFile(JSONproduct, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }
      products.push(this);
      fs.writeFile(JSONproduct, JSON.stringify(products), 'utf8', err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    fs.readFile(JSONproduct, (err, fileContent) => {
      if (err) {
        cb([]);
      }
      cb(JSON.parse(fileContent));
    });
  }
};

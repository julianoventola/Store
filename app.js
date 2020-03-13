const path = require('path');
const express = require('express');
const routes = require('./routes/routes');

// Models
const sequelizeConn = require('./config/database'); // Sequelize connection
const Product = require('./models/product');
const User = require('./models/user');

// Create server
const app = express();

// Pug template engine
app.set('views', 'views');
app.set('view engine', 'pug');

// UrlEncoded for form's data
app.use(express.urlencoded({ extended: false }));

// Static css folder for pages
app.use(express.static(path.resolve('./public')));

// --> ROUTES <--
app.use(routes);

// Model's relationship
Product.belongsTo(User), { constraints: true, onDelete: 'CASCADE' };
User.hasMany(Product);

sequelizeConn
  // 'force' will rewrite the models - not indicated in production!
  .sync({ force: true })
  .then(() => {
    // Listen to port 3000
    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  })
  .catch(err => {
    console.log(err);
  });

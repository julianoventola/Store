const path = require('path');
const express = require('express');
const routes = require('./routes/routes');

// Models
const sequelizeConn = require('./config/database'); // Sequelize connection
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

// Create server
const app = express();

// Pug template engine
app.set('views', 'views');
app.set('view engine', 'pug');

// UrlEncoded for form's data
app.use(express.urlencoded({ extended: false }));

// Static css folder for pages
app.use(express.static(path.resolve('./public')));

// 'Auth' Middleware
app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      console.log(err);
    });
});

// --> ROUTES <--
app.use(routes);

// Model's relationship
Product.belongsTo(User), { constraints: true, onDelete: 'CASCADE' };
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelizeConn
  // 'force' will rewrite the models - not indicated in production!
  //.sync({ force: true })
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      return User.create({
        name: 'Juliano Ventola',
        email: 'juliano@gmail.com',
      });
    }
    return user;
  })
  .then(() => {
    // Listen to port 3000
    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  })
  .catch(err => {
    console.log(err);
  });

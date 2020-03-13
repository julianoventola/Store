const Sequelize = require('sequelize');
// import connection
const sequelizeConn = require('../config/database');

// Model name / Model fields
const CartItem = sequelizeConn.define('cartItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = CartItem;

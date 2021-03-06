const Sequelize = require('sequelize');
// import connection
const sequelizeConn = require('../config/database');

// Model name / Model fields
const Cart = sequelizeConn.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Cart;

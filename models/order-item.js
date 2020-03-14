const Sequelize = require('sequelize');
// import connection
const sequelizeConn = require('../config/database');

// Model name / Model fields
const OrderItem = sequelizeConn.define('orderItem', {
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

module.exports = OrderItem;

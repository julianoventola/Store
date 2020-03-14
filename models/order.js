const Sequelize = require('sequelize');
// import connection
const sequelizeConn = require('../config/database');

// Model name / Model fields
const Order = sequelizeConn.define('order', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Order;

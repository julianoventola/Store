const Sequelize = require('sequelize');

// Mysql connection - database / user /password
const sequelize = new Sequelize('node-complete', 'root', 'root', {
  dialect: 'mysql',
});

module.exports = sequelize;

const Sequelize = require('sequelize');
// import connection
const sequelizeConn = require('../config/database');

// Model name / Model fields
const User = sequelizeConn.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
});

module.exports = User;

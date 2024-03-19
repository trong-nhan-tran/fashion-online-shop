'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, { foreignKey: "role_id", as: "roleData" });

      User.hasMany(models.Order, { foreignKey: "order_id", as: "orderData" });
    }
  }
  User.init({
    email: { type: DataTypes.STRING, primaryKey: true},
    phone: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    password: DataTypes.STRING,
    role_id: DataTypes.STRING,
    refresh_token: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
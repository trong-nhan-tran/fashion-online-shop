'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.User, {
        foreignKey: "role_id", 
        as: "userData"});
    }
  }
  Role.init({
    role_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    role_name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};
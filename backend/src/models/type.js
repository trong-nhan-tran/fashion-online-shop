'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    static associate(models) {
      Type.hasMany(models.Product, {
        foreignKey: "type_id", 
        as: "productData"});
    }
  }
  Type.init({
    type_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    type_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Type',
  });
  return Type;
}; 
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Product, {
        foreignKey: "category_id", 
        as: "productData"});
    }
  }
  Category.init({
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    category_name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
}; 
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    static associate(models) {
        Color.hasMany(models.Variant, {
          foreignKey: "color_id", 
          as: "variantData"});

        Color.hasMany(models.Image, {
          foreignKey: "color_id", 
          as: "imageData"});

        Color.belongsToMany(models.Product, {
          foreignKey: 'color_id',
          through: 'ProductColor',
          as: 'productData',
        });
    }
  }
  Color.init({
    color_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    color_name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Color',
  });
  return Color;
}; 
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Variant extends Model {
    static associate(models) {
      Variant.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "productData"
      });

      Variant.belongsTo(models.Color, {
        foreignKey: "color_id",
        as: "colorData"
      });

      Variant.belongsTo(models.Size, {
        foreignKey: "size_id",
        as: "sizeData"
      });


    }
  }
  Variant.init({
    product_id:{
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    color_id:{
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    size_id:{
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'Variant',
  });
  return Variant;
}; 
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, {
        foreignKey: "category_id",
        targetKey: "category_id",
        as: "categoryData",
      });

      Product.belongsTo(models.Type, {
        foreignKey: "type_id",
        targetKey: "type_id",
        as: "typeData",
      });

      Product.hasMany(models.Image, {
        foreignKey: "product_id",
        as: "imageData",
      });
      
      Product.hasMany(models.Variant, {
        foreignKey: "product_id",
        as: "variantData",
      });

      Product.belongsToMany(models.Color, {
        foreignKey: "product_id",
        through: "ProductColor",
        as: "colorData",
      });

      Product.belongsToMany(models.Size, {
        foreignKey: "product_id",
        through: "ProductSize",
        as: "sizeData",
      });
    }
  }
  Product.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      product_name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.FLOAT,
      category_id: DataTypes.INTEGER,
      type_id: DataTypes.INTEGER,
      thumbnail: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};

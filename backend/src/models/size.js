'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Size extends Model {
    static associate(models) {
        Size.hasMany(models.Variant, {
          foreignKey: "size_id", 
          as: "variantData"});
        
        Size.belongsToMany(models.Product, {
          foreignKey: 'size_id',
          through: 'ProductSize',
          as: 'productData',
        });
    }
  }
  Size.init({
    size_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: "size_id",
      autoIncrement: true
    },
    size_name: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Size',
  });
  return Size;
}; 
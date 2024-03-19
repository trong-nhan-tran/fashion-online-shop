'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
        Image.belongsTo(models.Product, {
          foreignKey: 'product_id',
          as: 'productData',
        });

        Image.belongsTo(models.Color, {
          foreignKey: 'color_id',
          as: 'colorData',
        });
    }
  }
  Image.init({
    product_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    color_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    image_path: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Image',
    indexes: [
      {
        fields: ['product_id']
      },
      {
        fields: ['color_id']
      }
    ]
  });
  return Image;
};

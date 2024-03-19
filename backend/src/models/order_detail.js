"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    static associate(models) {
      OrderDetail.belongsTo(models.Order, {
        foreignKey: "order_id",
        as: "orderData",
      });

      OrderDetail.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "productData"
      });

      OrderDetail.belongsTo(models.Color, {
        foreignKey: "color_id",
        as: "colorData"
      });

      OrderDetail.belongsTo(models.Size, {
        foreignKey: "size_id",
        as: "sizeData"
      });
    }
  }
  OrderDetail.init(
    {
      order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
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
      },
      quantity: DataTypes.INTEGER,
      amount: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "OrderDetail",
    }
  );
  return OrderDetail;
};

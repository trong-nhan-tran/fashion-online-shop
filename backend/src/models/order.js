"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: "email",
        as: "userData",
      });

      Order.belongsTo(models.Status, {
        foreignKey: "status_id",
        as: "statusData",
      });

      Order.hasMany(models.OrderDetail, {
        foreignKey: "order_id",
        as: "orderDetailData",
      });
    }
  }
  Order.init(
    {
      order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      customer_name: DataTypes.STRING,
      address: DataTypes.STRING,
      order_phone: DataTypes.STRING,
      status_id: DataTypes.INTEGER,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};

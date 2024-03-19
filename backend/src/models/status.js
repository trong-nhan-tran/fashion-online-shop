'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    static associate(models) {
        Status.hasMany(models.Order, {foreignKey: "status_id", sourceKey: "status_id", as: "orderData"});
    }
  }
  Status.init({
    status_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    status_name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Status',
  });
  return Status;
}; 
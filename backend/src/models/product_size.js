'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProductSize extends Model {
        static associate(models) {
            ProductSize.belongsTo(models.Product, { 
                foreignKey: 'product_id',
                as: "productData" });

            ProductSize.belongsTo(models.Size, { 
                foreignKey: 'size_id',
                as: "sizeData" });
        };

    }
    ProductSize.init(
    {
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        size_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
    }, 
    {
        sequelize,
        modelName: 'ProductSize',
    });



    return ProductSize;
};
  
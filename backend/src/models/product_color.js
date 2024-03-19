'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProductColor extends Model {
        static associate(models) {
            ProductColor.belongsTo(models.Product, { 
                foreignKey: 'product_id',
                as: "productData" });

            ProductColor.belongsTo(models.Color, { 
                foreignKey: 'color_id', 
                as: "colorData"});
        };

    }
    ProductColor.init(
    {
        product_id: {
            type: DataTypes.INTEGER,
        },
        color_id: {
            type: DataTypes.INTEGER,
        },
    }, 
    {
        sequelize,
        modelName: 'ProductColor',
    });



    return ProductColor;
};
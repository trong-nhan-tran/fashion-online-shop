'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('OrderDetails', {
            product_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references:{
                    model: "Products",
                    key: "product_id"
                }
            },

            color_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references:{
                    model: "Colors",
                    key: "color_id"
                }

            },
            size_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references:{
                    model: "Sizes",
                    key: "size_id"
                }
            },

            order_detail_quantity: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1
            },
            
            amount: {
                type: Sequelize.FLOAT,
                allowNull: false
            },

            createdAt: {
                allowNull: false,
                type: "TIMESTAMP",
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            },
            updatedAt: {
                allowNull: false,
                type: "TIMESTAMP",
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('OrderDetails');
    }
};
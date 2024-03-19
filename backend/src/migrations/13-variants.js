'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Variants', {
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
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
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
        await queryInterface.dropTable('Variants');
    }
};
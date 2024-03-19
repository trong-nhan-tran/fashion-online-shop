'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Images', {
            product_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Products",
                    key: "product_id"
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },

            color_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                in: true,
                references: {
                    model: "Colors",
                    key: "color_id"
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'

            },
            image_path: {
                type: Sequelize.STRING,
                allowNull: false,
                
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
        await queryInterface.dropTable('Images');
    }
};
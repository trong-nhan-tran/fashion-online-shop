'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductColors', {
        product_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Products',
            key: 'product_id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },

        color_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Colors',
            key: 'color_id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      });
  },
  async down(queryInterface, Sequelize){
    await queryInterface.dropTable('ProductColors');
  }
};
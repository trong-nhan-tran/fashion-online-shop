'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false

      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role_id: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "R2",
        references:{
          model: "Roles",
          key: "role_id"
        }
      },
      refresh_token:{
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Users');
  }
};
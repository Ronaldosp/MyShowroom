'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Specifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      car_id: {
        type: Sequelize.INTEGER,
        references:{
          model:"Cars"
        }
      },
      description: {
        type: Sequelize.STRING
      },
      exterior_desc: {
        type: Sequelize.STRING
      },
      interior_desc: {
        type: Sequelize.STRING
      },
      engine_desc: {
        type: Sequelize.STRING
      },
      safety_desc: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Specifications');
  }
};
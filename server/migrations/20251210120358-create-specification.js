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
      specificationCategory_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'SpecificationCategories',
        },
      },
      car_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'Cars',
        },
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
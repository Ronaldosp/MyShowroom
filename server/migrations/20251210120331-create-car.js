'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      model: {
        type: Sequelize.STRING
      },
      brand_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'Brands',
        },
      },
      thumbnail: {
        type: Sequelize.STRING
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'Categories',
        }
      },
      price: {
        type: Sequelize.INTEGER
      },
      dealer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'DealerProfiles',
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
    await queryInterface.dropTable('Cars');
  }
};
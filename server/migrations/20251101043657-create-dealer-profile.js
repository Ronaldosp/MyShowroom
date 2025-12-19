'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DealerProfiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      shopName: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      instagramLink: {
        type: Sequelize.STRING
      },
      whatsAppLink: {
        type: Sequelize.STRING
      },
      brand_id: {
        type: Sequelize.INTEGER,
        references:{
          model:"Brands"
        }
      },
      user_id: {
        type: Sequelize.INTEGER,
        references:{
          model:"UserProfiles",
          key: "id"
        }
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
    await queryInterface.dropTable('DealerProfiles');
  }
};
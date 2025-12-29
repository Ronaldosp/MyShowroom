'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Brands", [
      {
        name: "Toyota",
        country: "Japan",
        logo: "https://logo.clearbit.com/toyota.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Subaru",
        country: "Japan",
        logo: "https://logo.clearbit.com/honda.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "BMW",
        country: "German",
        logo: "https://logo.clearbit.com/bmw.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Mazda",
        country: "Japan",
        logo: "https://logo.clearbit.com/bmw.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Porsche",
        country: "Italy",
        logo: "https://logo.clearbit.com/bmw.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Lamborghini",
        country: "Italy",
        logo: "https://logo.clearbit.com/bmw.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Mercedes",
        country: "German",
        logo: "https://logo.clearbit.com/bmw.com",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Brands", null, {});
  }
};

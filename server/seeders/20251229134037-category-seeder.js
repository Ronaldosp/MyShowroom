'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Categories", [,
      { name: "Coupe", createdAt: new Date(), updatedAt: new Date() },
      { name: "SuperCar", createdAt: new Date(), updatedAt: new Date() },
      { name: "HyperCar", createdAt: new Date(), updatedAt: new Date() },
      { name: "Luxury", createdAt: new Date(), updatedAt: new Date() },
      { name: "SUV", createdAt: new Date(), updatedAt: new Date() },
      { name: "Sedan", createdAt: new Date(), updatedAt: new Date() },
      { name: "Hatchback", createdAt: new Date(), updatedAt: new Date() },
      { name: "MPV", createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  }
};

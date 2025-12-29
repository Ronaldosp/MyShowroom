'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("SpecificationCategories", [
      { name: "Engine", createdAt: new Date(), updatedAt: new Date() },
      { name: "Dimensions", createdAt: new Date(), updatedAt: new Date() },
      { name: "Performance", createdAt: new Date(), updatedAt: new Date() },
      { name: "Transmission", createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("SpecificationCategories", null, {});
  }
};

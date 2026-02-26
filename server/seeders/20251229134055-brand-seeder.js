'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Brands", [
      {
        name: "Toyota",
        country: "Japan",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMha4iBfMF-P54i0rxc5aSqqWuktU3_Ed0vA&s",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Subaru",
        country: "Japan",
        logo: "https://cdn.freebiesupply.com/logos/large/2x/subaru-10-logo-black-and-white.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "BMW",
        country: "German",
        logo: "https://i.pinimg.com/736x/32/bd/b9/32bdb973e27624441b16667bebccbcd5.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Mazda",
        country: "Japan",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXgaGpzW-c6R_D1uRD886hTdZ887p0SKX6yA&s",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Porsche",
        country: "Italy",
        logo: "https://di-uploads-pod3.dealerinspire.com/porscheoffremont/uploads/2018/09/porsche-logo.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Lamborghini",
        country: "Italy",
        logo: "https://mycarheaven.com/wp-content/smush-webp/2022/12/Lamborghini-Logo-Today-1200x710.jpg.webp",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Mercedes",
        country: "German",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM4rFHveyCOPAJtOdXcU4MksQDeyWAeD9feg&s",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Brands", null, {});
  }
};

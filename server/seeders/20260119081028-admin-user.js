'use strict';

const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   const admin = [{
    username: 'admin',
    email: 'admin@mail.com',
    password: hashPassword('admin123'),
          createdAt: new Date(),
          updatedAt: new Date(),
   }]
   await queryInterface.bulkInsert('Admins', admin);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Admins', null, {});
  }
};

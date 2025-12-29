'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("FeatureCategories", [
      { 
        name: "Technology",
        description: "Explore cutting-edge automotive technology that drives performance, safety, and innovation.", 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        name: "Gallery",
        description: "A visual showcase of design, detail, and craftsmanship.", 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        name: "Safety",
        description: "Advanced safety features designed to protect every journey.", 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        name: "Interior",
        description: "A refined interior crafted for comfort, technology, and control.", 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        name: "Exterior",
        description: "A bold exterior that defines style and performance.", 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        name: "Performance",
        description: "Engineered for power, speed, and precision.", 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        name: "Accessories",
        description: "Enhance style, comfort, and functionality with premium accessories.", 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      

    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("FeatureCategories", null, {});
  }
};

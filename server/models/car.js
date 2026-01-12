'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Car.belongsTo(models.Brand , {foreignKey:"brand_id"})
      Car.belongsTo(models.Category , {foreignKey:"category_id"})
      Car.belongsTo(models.DealerProfile , {foreignKey:"dealer_id"})
      Car.hasMany(models.Specification , {foreignKey:"car_id"})
      Car.hasMany(models.Feature , {foreignKey:"car_id"})
    }
  }
  Car.init({
    model: DataTypes.STRING,
    brand_id: DataTypes.INTEGER,
    thumbnail: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    dealer_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};
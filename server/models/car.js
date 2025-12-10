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
      // define association here
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
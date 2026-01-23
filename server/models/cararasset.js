'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CarARAsset extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CarARAsset.belongsTo(models.Car , {foreignKey:"car_id"})
    }
  }
  CarARAsset.init({
    car_id: DataTypes.INTEGER,
    desktopAsset: DataTypes.STRING,
    mobileAsset: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CarARAsset',
  });
  return CarARAsset;
};
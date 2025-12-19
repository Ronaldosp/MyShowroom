'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Specification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Specification.belongsTo(models.Car , {foreignKey:"car_id"})
      Specification.belongsTo(models.SpecificationCategory , {foreignKey:"specificationCategory_id"})
      Specification.hasMany(models.SpecificationField , {foreignKey:"specification_id"})
      Specification.hasMany(models.Feature , {foreignKey:"specification_id"})
    }
  }
  Specification.init({
    specificationCategory_id: DataTypes.INTEGER,
    car_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Specification',
  });
  return Specification;
};
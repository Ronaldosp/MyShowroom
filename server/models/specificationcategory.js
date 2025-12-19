'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpecificationCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SpecificationCategory.hasMany(models.Specification , {foreignKey:"specificationCategory_id"})
    }
  }
  SpecificationCategory.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Specification Category Name is required"
        },
        notNull:{
          msg:"Specification Category Name is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'SpecificationCategory',
  });
  return SpecificationCategory;
};
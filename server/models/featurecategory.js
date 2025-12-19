'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FeatureCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FeatureCategory.hasMany(models.Feature , {foreignKey:"featureCategory_id"})
    }
  }
  FeatureCategory.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Feature Category Name is required"
        },
        notNull:{
          msg:"Feature Category Name is required"
        }
      }
    },
    description: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Feature Category Description is required"
        },
        notNull:{
          msg:"Feature Category Description is required"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'FeatureCategory',
  });
  return FeatureCategory;
};
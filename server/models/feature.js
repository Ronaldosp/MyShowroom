'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Feature.belongsTo(models.Car , {foreignKey:"car_id"})
      Feature.belongsTo(models.FeatureCategory , {foreignKey:"featureCategory_id"})
    }
  }
  Feature.init({
    car_id: DataTypes.INTEGER,
    featureCategory_id: DataTypes.INTEGER,
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Feature Name is required"
        },
        notNull:{
          msg:"Feature Name is required"
        }
      }
    },
    description: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Feature Description is required"
        },
        notNull:{
          msg:"Feature Description is required"
        }
      }
    },
    thumbnail: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Feature',
  });
  return Feature;
};
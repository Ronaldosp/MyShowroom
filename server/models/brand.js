'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here\
      Brand.hasMany(models.Car , {foreignKey:"brand_id"})
      Brand.belongsToMany(models.DealerProfile, {
        through: models.DealerBrand,
        foreignKey: "brandId"
      });
    }
  }
  Brand.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Name is required (Brand) "
        },
        notNull:{
          msg:"Name is required (Brand)"
        }
      }
    },
    country: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Country is required (Brand) "
        },
        notNull:{
          msg:"Country is required (Brand)"
        }
      }
    },
    logo: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Logo is required (Brand) "
        },
        notNull:{
          msg:"Logo is required (Brand)"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Brand',
  });
  return Brand;
};
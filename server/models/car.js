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
      Car.belongsTo(models.Brand,{foreignKey:"brand_id"})
      Car.belongsTo(models.Category , {foreignKey:"category_id"})
      Car.hasMany(models.Specification,{foreignKey:"car_id"})
      Car.belongsTo(models.DealerProfile,{foreignKey:"car_id"})
    }
  }
  Car.init({
    model: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Model is required (Car) "
        },
        notNull:{
          msg:"Model is required (Car)"
        }
      }
    },
    brand_id: DataTypes.INTEGER,
    thumbnail: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Thumbnail is required (Car) "
        },
        notNull:{
          msg:"Thumbnail is required (Car)"
        }
      }
    },
    category_id: DataTypes.INTEGER,
    price: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Price is required (Car) "
        },
        notNull:{
          msg:"Price is required (Car)"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};
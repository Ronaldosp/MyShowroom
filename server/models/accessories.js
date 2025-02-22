'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Accessories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Accessories.belongsTo(models.Specification,{foreignKey:"specification_id"})
    }
  }
  Accessories.init({
    specification_id: DataTypes.INTEGER,
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Name is required (Accessories) "
        },
        notNull:{
          msg:"Name is required (Accessories)"
        }
      }
    },
    thumbnail: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Thumbnail is required (Accessories)"
        },
        notNull:{
          msg:"Thumbnail is required (Accessories)"
        }
      }
    },
    sequelize,
    modelName: 'Accessories',
  });
  return Accessories;
};
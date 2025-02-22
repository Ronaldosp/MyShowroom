'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gallery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Gallery.belongsTo(models.Specification, {foreignKey:"specification_id"})
    }
  }
  Gallery.init({
    specification_id: DataTypes.INTEGER,
    exterior_images: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Exterior Image is required (Gallery) "
        },
        notNull:{
          msg:"Exterior Image is required (Gallery)"
        }
      }
    },
    interior_images: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Interior Image is required (Gallery) "
        },
        notNull:{
          msg:"Interior Image is required (Gallery)"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Gallery',
  });
  return Gallery;
};
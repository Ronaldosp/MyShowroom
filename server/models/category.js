'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Car , {foreignKey:"category_id"})
    }
  }
  Category.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Name is required (Category) "
        },
        notNull:{
          msg:"Name is required (Category)"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};
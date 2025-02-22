'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Technology extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Technology.belongsTo(models.Specification, {foreignKey:"specification_id"})
    }
  }
  Technology.init({
    specification_id: DataTypes.INTEGER,
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Name is required (Technology) "
        },
        notNull:{
          msg:"Name is required (Technology)"
        }
      }
    },
    thumbnail: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Thumbnail is required (Technology) "
        },
        notNull:{
          msg:"Thumbnail is required (Technology)"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Technology',
  });
  return Technology;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Performance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Performance.belongsTo(models.Specification, {foreignKey:"specification_id"})
    }
  }
  Performance.init({
    specification_id: DataTypes.INTEGER,
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Name is required (Performance) "
        },
        notNull:{
          msg:"Name is required (Performance)"
        }
      }
    },
    thumbnail: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Thumbnail is required (Performance) "
        },
        notNull:{
          msg:"Thumbnail is required (Performance)"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Performance',
  });
  return Performance;
};
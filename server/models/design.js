'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Design extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Design.belongsTo(models.Specification, {foreignKey:"specification_id"})
    }
  }
  Design.init({
    specification_id: DataTypes.INTEGER,
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Name is required (Design) "
        },
        notNull:{
          msg:"Name is required (Design)"
        }
      }
    },
    color: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Color is required (Design) "
        },
        notNull:{
          msg:"Color is required (Design)"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Design',
  });
  return Design;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpecificationField extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SpecificationField.belongsTo(models.Specification , {foreignKey:"specification_id"})
    }
  }
  SpecificationField.init({
    specification_id: DataTypes.INTEGER,
    key: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Specification Field Key is required"
        },
        notNull:{
          msg:"Specification Field Key is required"
        }
      }
    },
    value: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Specification Field Value is required"
        },
        notNull:{
          msg:"Specification Field Value is required"
        }
      }
    },
    unit: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Specification Field Unit is required"
        },
        notNull:{
          msg:"Specification Field Unit is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'SpecificationField',
  });
  return SpecificationField;
};
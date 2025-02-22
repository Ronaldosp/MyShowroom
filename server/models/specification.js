'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Specification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Specification.belongsTo(models.Car , {foreignKey:"car_id"})
      Specification.hasMany(models.Accessories,{foreignKey:"specification_id"})
      Specification.hasMany(models.Design,{foreignKey:"specification_id"})
      Specification.hasMany(models.Gallery,{foreignKey:"specification_id"})
      Specification.hasMany(models.Performance,{foreignKey:"specification_id"})
      Specification.hasMany(models.Technology,{foreignKey:"specification_id"})
    }
  }
  Specification.init({
    car_id: DataTypes.INTEGER,
    description: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Description is required (Specification) "
        },
        notNull:{
          msg:"Description is required (Specification)"
        }
      }
    },
    exterior_desc: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Exterior Description is required (Specification) "
        },
        notNull:{
          msg:"Exterior Description is required (Specification)"
        }
      }
    },
    interior_desc: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Interior Description is required (Specification) "
        },
        notNull:{
          msg:"Interior Description is required (Specification)"
        }
      }
    },
    engine_desc: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Engine Description is required (Specification) "
        },
        notNull:{
          msg:"Engine Description is required (Specification)"
        }
      }
    },
    safety_desc: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Safety Description is required (Specification) "
        },
        notNull:{
          msg:"Safety Description is required (Specification)"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Specification',
  });
  return Specification;
};
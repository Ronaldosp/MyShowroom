'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DealerProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DealerProfile.belongsTo(models.UserProfile, { foreignKey: "user_id" });
      DealerProfile.hasMany(models.Car, { foreignKey: "dealer_id" });
    }
  }
  DealerProfile.init({
    shopName: DataTypes.STRING,
    car_id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    address: DataTypes.STRING,
    instagramLink: DataTypes.STRING,
    whatsAppLink: DataTypes.STRING,
    brand_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DealerProfile',
  });
  return DealerProfile;
};
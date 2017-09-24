module.exports = function(sequelize, DataTypes) {
    
      var db = require("../models");
      var Food = sequelize.define("food", {
        item: {
          type: DataTypes.STRING,
          // have a text value
          allowNull: false
        },
        category: {
          type: DataTypes.STRING, 
          allowNull: false
        },
        cholesterol: {
          type: DataTypes.DECIMAL,
          allowNull: true
        },
        servingSize: {
          type: DataTypes.STRING, 
          allowNull: true
        },
        gramWeight: {
          type: DataTypes.DECIMAL,
          allowNull: true
        },
        protein: {
          type: DataTypes.DECIMAL,
          allowNull: true
        },
        totalFat: {
          type: DataTypes.DECIMAL,
          allowNull: true
        },
        carbohydrates: {
          type: DataTypes.DECIMAL,
          allowNull: true
        },
        fiber: {
          type: DataTypes.DECIMAL,
          allowNull: true
        },
        sugar: {
          type: DataTypes.DECIMAL,
          allowNull: true
        },
        potassium: {
          type: DataTypes.DECIMAL,
          allowNull: true
        },
        vitaminC: {
          type: DataTypes.DECIMAL,
          allowNull: true
        },
        vitaminB12: {
          type: DataTypes.DECIMAL,
          allowNull: true
        },
        calcium: {
          type: DataTypes.DECIMAL,
          allowNull: true
        },
        iron: {
          type: DataTypes.DECIMAL,
          allowNull: true
        },
        betaCarotene: {
          type: DataTypes.DECIMAL,
          allowNull: true
        },
        saturatedFat: {
          type: DataTypes.DECIMAL,
          allowNull: true
        },
        monosaturatedFat: {
          type: DataTypes.DECIMAL,
          allowNull: true
        },
        polysaturatedFat: {
          type: DataTypes.DECIMAL,
          allowNull: true
        },
        sodium: {
          type: DataTypes.DECIMAL,
          allowNull: true
        },
        ndb_no: {
          type: DataTypes.STRING,
          allowNull: true
        }
      }, {
        timestamps: false
      });

      return Food;
  };

  //add recommended serving size, and some baseline nutrition, maybe calories
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
        calories: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: false
        },
        short_desc: {
          type: DataTypes.STRING,
          allowNull: true
        },
        cholesterol: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: false
        },
        servingSize: {
          type: DataTypes.STRING, 
          allowNull: true
        },
        gramWeight: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: false
        },
        protein: {
          type: DataTypes.DECIMAL(4,2),
          defaultValue: 0,
          allowNull: false
        },
        totalFat: {
          type: DataTypes.DECIMAL(4,2),
          defaultValue: 0,
          allowNull: false
        },
        carbohydrates: {
          type: DataTypes.DECIMAL(4,2),
          defaultValue: 0,
          allowNull: false
        },
        fiber: {
          type: DataTypes.DECIMAL(3,1),
          defaultValue: 0,
          allowNull: false
        },
        sugar: {
          type: DataTypes.DECIMAL(4,2),
          defaultValue: 0,
          allowNull: false
        },
        potassium: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: false
        },
        vitaminC: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: false
        },
        vitaminB12: {
          type: DataTypes.DECIMAL(3,2),
          defaultValue: 0,
          allowNull: false
        },
        calcium: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: false
        },
        iron: {
          type: DataTypes.DECIMAL(3,2),
          defaultValue: 0,
          allowNull: false
        },
        betaCarotene: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: false
        },
        saturatedFat: {
          type: DataTypes.DECIMAL(4,3),
          defaultValue: 0,
          allowNull: false
        },
        monosaturatedFat: {
          type: DataTypes.DECIMAL(4,3),
          defaultValue: 0,
          allowNull: false
        },
        polysaturatedFat: {
          type: DataTypes.DECIMAL(4,3),
          defaultValue: 0,
          allowNull: false
        },
        sodium: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: false
        },
        ndb_no: {
          type: DataTypes.STRING,
          allowNull: false
        }
      }, {
        timestamps: false
      });
      Food.associate = function(models) {
        Food.hasMany(models.log)
      }

      return Food;

  };

  //add recommended serving size, and some baseline nutrition, maybe calories
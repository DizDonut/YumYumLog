module.exports = function(sequelize, DataTypes) {
    
      var db = require("../models");
      var Log = sequelize.define("log", {
        item: {
            type: DataTypes.STRING,
            allowNull: false
        },
        count: {
            type: DataTypes.INTEGER, 
        },
        week: {
            type: DataTypes.INTEGER,
        }
      });

    Log.associate = function(models) {
        // When a food item is deleted
        Log.belongsTo(models.User,{ 
            foreignKey: {
                allowNull: false
            },
            onDelete: "CASCADE"
          });
        Log.belongsTo(models.goal, {
            foreignKey: {
              allowNull: false,
            },
            onDelete: "CASCADE"
        });
        Log.belongsTo(models.food, {
            foreignKey: {
                allowNull: false,
            }
        })
    }
      return Log;
  };
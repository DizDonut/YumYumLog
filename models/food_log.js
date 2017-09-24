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
        //will populate this at the time of entry with the current week (provided from the timeline table);
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
        // Log.belongsTo(models.timeline);
    }
      return Log;
  };
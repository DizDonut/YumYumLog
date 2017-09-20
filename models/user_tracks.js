module.exports = function(sequelize, DataTypes) {
    
      var db = require("../models");
      var Goal = sequelize.define("goal", {
          //create function will add this from a list of options
        category: {
          type: DataTypes.STRING
        },
        goal: {
          type: DataTypes.INTEGER 
        },
        //get the current week from timeline and log it here
        week: {
            type: DataTypes.INTEGER
        }
      });
      Goal.associate = function(models) {
          //generate a userid in the goal table
        Goal.belongsTo(models.user);
        Goal.belongsTo(models.timeline);
        //create an association between current track and all food entries? 
      }
      return Goal;
};
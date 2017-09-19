module.exports = function(sequelize, DataTypes) {
    
      var db = require("../models");
      var FoodIdx = sequelize.define("food", {
        item: {
          type: DataTypes.STRING,
          // have a text value
          allowNull: false
        },
        category: {
          type: DataTypes.STRING, 
        }
      });

      return FoodIdx;
  };
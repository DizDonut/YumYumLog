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
        }
      }, {
        timestamps: false
      });

      return Food;
  };

  //add recommended serving size, and some baseline nutrition, maybe calories
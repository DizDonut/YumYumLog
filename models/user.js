module.exports = function(sequelize, DataTypes) {
    
    var db = require("../models");
    var User = sequelize.define("user", {
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        username: {
            type: DataTypes.STRING 
        }
    });
    User.associate = function(models) {
        // Associating Customer with Burgers
        // When a customer is deleted, also delete any associated burgers
        User.hasOne(models.password, {
            onDelete: "cascade"
        })
        User.hasMany(models.log, {
            onDelete: "cascade"
        });
        User.hasMany(models.goal, {
            onDelete: "cascade"
        });
    };
      return User;
  };
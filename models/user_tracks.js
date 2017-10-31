module.exports = function(sequelize, DataTypes) {
    
      var db = require("../models");
      var Goal = sequelize.define("goal", {
        category: {
          type: DataTypes.STRING,
          allowNull: false
        },
        goal: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        //get the current week from timeline and log it here
        week: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
      });
      Goal.associate = function(models) {
          //associate userid with goals
        Goal.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          },
          onDelete: "CASCADE"
        });
        //associate goals to food logs
        Goal.hasMany(models.log, {
          onDelete: "CASCADE"
        })
      }
      return Goal;
};

// http://docs.sequelizejs.com/class/lib/sequelize.js~Sequelize.html#instance-method-query
// http://docs.sequelizejs.com/manual/tutorial/raw-queries.html#raw-queries
// https://www.w3resource.com/mysql/date-and-time-functions/mysql-week-function.php


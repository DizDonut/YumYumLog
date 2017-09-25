module.exports = function(sequelize, DataTypes) {
    
      var db = require("../models");
      var Goal = sequelize.define("goal", {
          //create function will add this from a list of options
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
          //generate a userid in the goal table
        Goal.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          },
          onDelete: "CASCADE"
        });
        Goal.hasMany(models.log, {
          onDelete: "CASCADE"
        })
        //create an association between current track and all food entries? 
      }
      return Goal;
};

// http://docs.sequelizejs.com/class/lib/sequelize.js~Sequelize.html#instance-method-query
// http://docs.sequelizejs.com/manual/tutorial/raw-queries.html#raw-queries
// https://www.w3resource.com/mysql/date-and-time-functions/mysql-week-function.php
// module.exports = function(sequelize, DataTypes) {
    
//   module.exports = function(sequelize, DataTypes) {
    
//       var db = require("../models");
//       var Timeline = sequelize.define("timeline", {
//           //create function will add this from a list of options
//         week: {
//           type: DataTypes.INTEGER
//         }
//       }, {timestamps: false});

//       Timeline.associate = function(models) {
//           //should join timeline to goals and food entries
//         Timeline.hasMany(models.goal);
//         Timeline.hasMany(models.log);
//       }
//       return Timeline;
// };
// http://docs.sequelizejs.com/class/lib/sequelize.js~Sequelize.html#instance-method-query
// http://docs.sequelizejs.com/manual/tutorial/raw-queries.html#raw-queries
// https://www.w3resource.com/mysql/date-and-time-functions/mysql-week-function.php
module.exports = function(sequelize, DataTypes) {
    
      var db = require("../models");
      var Timeline = sequelize.define("timeline", {
          //create function will add this from a list of options
        week: {
          type: DataTypes.INTEGER
        }
      });
      Timeline.associate = function(models) {
          //should join timeline to goals and food entries
        Timeline.hasMany(models.goal);
        Timeline.hasMany(models.log);
      }
      return Timeline;
};
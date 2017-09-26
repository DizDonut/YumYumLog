var db = require("../models");
var application = application = require('./application');
var moment = require("moment")

module.exports = function(app) {
    app.get("/dashboard",application.IsAuthenticated, function(req,res) {
        //for a given user, return the count of their items logged for the given track
        //find all of a a users logs for a given week, get the sum
        debugger;
        var userName = req.user.username
        var weekInput = moment().format();
        var weekNum = moment(weekInput).isoWeek();
        db.goal.findAll({
            // include: [[sequelize.fn('COUNT', sequelize.col('hats')), 'no_hats']]
            // [[db.sequelize.fn('COUNT', sequelize.col('count')), 'no_count']]
            where : {week : weekNum },
            include: [{model: db.log},{model:db.User}],
            order: [['week', 'DESC']]}).then(function(dbgoal) {
          // res.json(dbgoal);
          console.log(dbgoal);
          for (count in dbgoal) {
          }
          var hbsObj = {
            dashboard: dbgoal,
            user: {
                username : userName
            }
          }
          //count per week
          //for a given goal, given week, calculate the sum of the food log counts that match that week
          res.render("commDash",hbsObj)
        })

    })

    app.get("/dashboard/:id", function(req,res) {
        //find all goals, sum the associated log counts, store as count in goals
        db.goal.findAll({
            where: {UserId: req.params.id},
            include: [{model: db.log}],
            order : [['week', 'DESC']]
        }).then(function(dbgoal) {
            res.json(dbgoal);
            // var hbsObj = {
            //     dashboard : dbgoal
            // }
            // replace res.json with the rendered handlebars page - res.render("userDash",hbsObj)
        })

    })
}

// Sometimes it may be tiresome to list all the attributes of the model if you only want to add an aggregation:

// // This is a tiresome way of getting the number of hats...
// Model.findAll({
//   attributes: ['id', 'foo', 'bar', 'baz', 'quz', [sequelize.fn('COUNT', sequelize.col('hats')), 'no_hats']]
// });

// // This is shorter, and less error prone because it still works if you add / remove attributes
// Model.findAll({
//   attributes: { include: [[sequelize.fn('COUNT', sequelize.col('hats')), 'no_hats']] }
// });

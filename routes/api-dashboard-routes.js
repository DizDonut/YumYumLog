var db = require("../models");

module.exports = function(app) {
    app.get("/dashboard", function(req,res) {
        db.goal.findAll({
          include: [{model: db.log}],
          order: [['week', 'DESC']]}).then(function(dbgoal) {
          // res.json(dbgoal);
          var hbsObj = {
            dashboard: dbgoal
          }
          res.render("userDash",hbsObj)
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

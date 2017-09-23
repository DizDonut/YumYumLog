var db = require("../models");

module.exports = function(app) {
    app.get("/dashboard", function(req,res) {
        db.goal.findAll({
            include: [{model: db.log}],
            order: [['week', 'DESC']]}).then(function(dbgoal) {
            res.json(dbgoal);
            // var hbsObj = {
            //     dashboard : dbgoal
            // }
            // replace res.json with the rendered handlebars page - res.render("userDash",hbsObj)
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
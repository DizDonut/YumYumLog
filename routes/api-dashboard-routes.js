var db = require("../models");

module.exports = function(app) {
    app.get("/dashboard", function(req,res) {
        db.goal.findAll({order: db.sequelize.col('week')}).then(function(dbgoal) {
            res.json(dbgoal);
            // var hbsObj = {
            //     dashboard : dbgoal
            // }
            // replace res.json with the rendered handlebars page - res.render("userDash",hbsObj)
        })
        
    })

    app.get("/dashboard/:id", function(req,res) {
        db.goal.findAll({where: {UserId: req.params.id}}, {order: db.sequelize.col('week')}).then(function(dbgoal) {
            res.json(dbgoal);
            // var hbsObj = {
            //     dashboard : dbgoal
            // }
            // replace res.json with the rendered handlebars page - res.render("userDash",hbsObj)
        })
        
    })
}
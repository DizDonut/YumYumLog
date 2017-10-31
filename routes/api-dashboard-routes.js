var db = require("../models");
var application = application = require('./application');
var moment = require("moment")

module.exports = function(app) {
    app.get("/dashboard",application.IsAuthenticated, function(req,res) {
        
        var userName = req.user.username
        var weekInput = moment().format();
        var weekNum = req.query.week || moment(weekInput).isoWeek();
        db.goal.findAll({
            include: [{model: db.log, where : {week : weekNum }},{model:db.User, attributes: ['username'] }],
            order: [['week', 'DESC']]}).then(function(dbgoal) {
          var hbsObj = {
            dashboard: dbgoal,
            user: {
                username : userName
            },
            week : weekNum
          }
          res.render("commDash",hbsObj)
        })

    })

    app.get("/getWeeks",application.IsAuthenticated, function(req,res) {
        var userName = req.user.username
        var weekInput = moment().format();
        var weekNum = req.query.week || moment(weekInput).isoWeek();
        db.log.findAll().done(function(dblog) {
            var arr =[];
        for (var i=0; i< dblog.length; i++) {
            if (!arr.includes(dblog[i].week)) {
                arr.push(dblog[i].week)
            }
        }
        arr.sort(function(a, b) {
          return a - b;
        });
        res.json(arr);
        })
    });
}
var db = require("../models");
var passport = require("passport");
var moment = require("moment")
//require authentication for any route; make sure username is in the route parameter
var application = application = require('./application');

module.exports = function(app) {
    //wrapper function to check the property of existing objects (for testing purposes)
    function hasProp (obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
      }
    //renders the landing page
    app.get("/", function(req,res) {
        if (hasProp(req, 'user')) {
            var hbsObj = {
                username: req.user.username
            }
        }
        res.render("index",hbsObj)
    })
    //generate user dash page
    app.get("/users/:username/:week?",application.IsAuthenticated, function(req, res) {
        var userObj = req.user;
        var userName = req.user.username
        var weekInput = moment().format();
        var weekNum = req.params.week || moment(weekInput).isoWeek();
        db.User.findOne({
            where : {id : req.user.id}, 
            include : [
                {model: db.goal, include: [
                    {model:db.log, where : {week : weekNum }, include: [
                        {model:db.food}
                    ]}
                ]}
            ]
        }).then(function(dbgoal) {
            var handlebars = {
                dashboard : dbgoal,
                user : {
                    username :userName,
                    firstname : userObj.first_name,
                    lastname : userObj.last_name
                },
                week : weekNum
            }
            console.log(handlebars)
            res.render("userDash",handlebars)
        })
    })
    // userInputs page
    app.get("/addLog/:username", function(req,res) {
        var handleBars = {
            user: req.user
        }
        res.render("userInputs",handleBars)
    })
    //renders tracks page
    app.get("/trackPage/:username",application.IsAuthenticated, function(req,res) {
        db.User.findOne({
            where: {username: req.params.username},
            include: [{model: db.goal}]
        }).then(function(dbUser) {
            var hbsObj = {
                user: dbUser
            }
            res.render("userTracks",hbsObj)
        })
    })
}

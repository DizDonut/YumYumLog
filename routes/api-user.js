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
    //renders the landing page (no authentication needed)
    app.get("/", function(req,res) {
        if (hasProp(req, 'user')) {
            // console.log(req.user.username);
            var hbsObj = {
                username: req.user.username
            }
        }
        res.render("index",hbsObj)
    })

    //generates user data  and handlebars for the user dash page
    app.get("/users/:username",application.IsAuthenticated, function(req, res) {

        var userName = req.user.username
        var weekInput = moment().format();
        var weekNum = moment(weekInput).isoWeek();
        db.User.findOne({
            where : {id : req.user.id}, 
            include : [
                {model: db.goal, include: [
                    {model:db.log, include: [
                        {model:db.food}
                    ]}
                ]}
            ]
        }).then(function(dbgoal) {
            // res.json(dbgoal);
            var handlebars = {
                dashboard : dbgoal,
                user : {
                    username :userName
                }
            }
            console.log(handlebars)
            res.render("userDash",handlebars)
        })
        // res.render("userDash",hbsObj)
    })

    //generates user data and handlebars for the userInputs page
    app.get("/addLog/:username", function(req,res) {
        // console.log(req.user.username);
        var handleBars = {
            user: req.user
        }

        res.render("userInputs",handleBars)
    })

    //renders tracks page and current tracks (for use in the form)
    app.get("/trackPage/:username",application.IsAuthenticated, function(req,res) {
            //find all of the users tracks and deliver them to the page in an object
        db.User.findOne({
            where: {username: req.params.username},
            include: [{model: db.goal}]
        }).then(function(dbUser) {
            // console.log(dbUser)
            var hbsObj = {
                user: dbUser
            }
            res.render("userTracks",hbsObj)
        })

    })

}

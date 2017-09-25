var db = require("../models");
var passport = require("passport");
//require authentication for any route; make sure username is in the route parameter
var application = application = require('./application');

module.exports = function(app) {
    //wrapper function to check the property of existing objects (for testing purposes)
    function hasProp (obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
      }
        //currently not exporting because the same route passes through authentication (don't want to serve this route w/out authentication)
    app.get("/", function(req,res) {
        
        if (hasProp(req, 'user')) {
            console.log(req.user.username);
            var hbsObj = {
                username: req.user.username
            }
        }
        res.render("index",hbsObj)
    })


    app.get("/users/:username",application.IsAuthenticated, function(req,res) {
        if (hasProp(req, 'user')) {
            console.log(req.user.username);
            var hbsObj = {
                username: req.user.username
            }
        }
        res.render("userDash",hbsObj)
    })

    app.get("/addLog/:username",application.IsAuthenticated, function(req,res) {
        if (hasProp(req, 'user')) {
            console.log(req.user.username);
            var hbsObj = {
                user: req.user
            }
        }
        res.render("userInputs",hbsObj)
    })

    app.get("/trackPage/:username",application.IsAuthenticated, function(req,res) {
        //you wont need this if the model includes username
        // if (hasProp(req, 'user')) {
        //     console.log(req.user.username);
        //     var hbsObj = {
        //         user: req.user
        //     }
            //find all of the users tracks and deliver them to the page in an object
        db.User.findOne({
            where: {username: req.params.username},
            include: [{model: db.goal}]
        }).then(function(dbUser) {
            console.log(dbUser)
            var hbsObj = {
                user: dbUser
            }
            res.render("userTracks",hbsObj)
        })
        
    })
    //replacing old registration pathway
    // app.get("/signup", function(req,res) {
    //     res.render("signup")
    // })

    //not using this route right now; replaced with /register
    // app.post("/newUser/:first/:last/:user", function(req,res) {
    //     db.user.create({
    //         first_name: req.params.first,
    //         last_name: req.params.last,
    //         username: req.params.user
    //     }).then(function(dbUser){
    //         // res.redirect('back');
    //         res.json(dbUser)
    //     });
    // })

}

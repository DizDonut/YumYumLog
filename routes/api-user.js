var db = require("../models");
var passport = require("passport");
//require authentication for any route; make sure username is in the route parameter
var application = application = require('./application');

module.exports = function(app) {

        //currently not exporting because the same route passes through authentication (don't want to serve this route w/out authentication)
    app.get("/", function(req,res) {
        res.render("index")
    })


    app.get("/users/:username",application.IsAuthenticated, function(req,res) {
        res.render("userInputs")
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


// Import the model (burger.js) to use its database functions.
var db = require("../models");
var passport = require("passport");
var moment = require("moment")
//require authentication for any route; make sure username is in the route parameter
var application = application = require('./application');

module.exports = function(app) {
    //helper function to get prop of undefined obj
    function hasProp (obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
    }
    //send current goals to script. render in list options on userInputs page
    app.get("/getTracks/:UserId",application.IsAuthenticated,function(req,res) {
        db.goal.findAll({
            where: {UserId : req.params.UserId}
        }).then(function(dbGoal) {
            res.json(dbGoal)
        })
    })

    //list food by category
    app.post("/submitLog/:username",application.IsAuthenticated, function(req,res) {
        // debugger;
        var userName = req.user.username
        var userObj = req.user;
        db.User.findOne({
            where: {username: req.params.username},
            include: [{model: db.goal}]}).then(function(user) {
            var userData = user;
            //if category
            //if food item
            if (req.body.q) {
                // console.log(req.body.q);
                db.food.findAll({
                    where: {
                        item: {
                            $like: req.body.q
                        }
                    }
                })
                .then(function(dbfood) {
                    // debugger;
                    var goalId;
                    //for the length of the models array return goalId where categories match
                    for (var i=0; i < userData.goals.length; i++) {
                        if (dbfood[0].category === userData.goals[i].category) {
                            goalId = userData.goals[i].id
                        }
                    }
                    // var hbsObj = {
                    //     user : {
                    //         choice : dbfood,
                    //         trackId : goalId,
                    //         model : userData,
                    //         username : userName
                    //     }
                    // }
                    var hbsObj = {
                        id: goalId,
                        choice : dbfood,
                        data : userData,
                        userObject : userObj,
                        user: {
                            username : userName
                        }
                    }
                    console.log(hbsObj);
                   res.render("userInputs",hbsObj)
                });
            //if the query is category, return an object of the category to use for the food search
            } else if (req.body.category) {
                // console.log(req.body.category)
                db.food.findAll({
                    attributes: ['item'],
                    where: { 
                        category: req.body.category
                    }
                }).then(function(dbfood) {
                    var hbsObj = {
                        foods: dbfood,
                        user: {
                            username : userName
                        }
                    }
                    // console.log(hbsObj.foods);
                   res.render("userInputs",hbsObj)
                });
            } 
        })
    })
    //create a new goal
    app.post("/addTrack/:username",application.IsAuthenticated, function(req,res) {
        
        db.goal.create({
            category: req.body.category,
            goal: req.body.goal,
            week: req.body.week,
            UserId: req.body.UserId
        }).then(function(dbGoal) {   
            var hbsObj = {
                goals: dbGoal
            }
            res.redirect("back")
        })
    })
    //create food entry
    app.post("/addItem/:username",function(req,res) {
        var userObj = req.user
        var userName = req.user.username
        var choice = req.body.item
        // debugger;
        db.log.create({
            item: req.body.item,
            count: req.body.count,
            week: req.body.week,
            UserId: req.body.userId,
            goalId: req.body.goalId,
            foodId: req.body.foodId
        }).then(function(dbGoal) { 
            // res.json(dbGoal);
            var hbsObj = {
                item : choice,
                user : {
                    username : userName,
                    id : userObj.id
                }
            }
            res.render("userInputs",hbsObj)
        })
    })
    //find all goals, sum the associated log counts, store as count in goals
}
//export routes for server.js to use
// module.exports = router;

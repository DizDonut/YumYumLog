var db = require("../models");
var moment = require("moment")
var application = application = require('./application');

module.exports = function(app) {
    //helper function to get prop of undefined obj
    function hasProp (obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
    }
    //userInputs page
    app.get("/getTracks/:UserId",application.IsAuthenticated,function(req,res) {
        db.goal.findAll({
            where: {UserId : req.params.UserId}
        }).then(function(dbGoal) {
            res.json(dbGoal)
        })
    })
    //list food by category
    app.post("/submitLog/:id",application.IsAuthenticated, function(req,res) {
        var userName = req.user.username
        var userObj = req.user;
        db.User.findOne({
            where: {id: req.user.id},
            include: [{model: db.goal}]}).then(function(user) {
            var userData = user;
            if (req.body.q) {
                db.food.findAll({
                    where: {
                        item: {
                            $like: req.body.q
                        }
                    }
                })
                .then(function(dbfood) {
                    var goalId;
                    for (var i=0; i < userData.goals.length; i++) {
                        if (dbfood[0].category === userData.goals[i].category) {
                            goalId = userData.goals[i].id
                        }
                    }
                    var hbsObj = {
                        id: goalId,
                        choice : dbfood,
                        data : userData,
                        userObject : userObj,
                        user: {
                            username : userName,
                            id : userObj.id
                        }
                    }
                   res.render("userInputs",hbsObj)
                });
            } else if (req.body.category) { 
                db.food.findAll({
                    attributes: ['item'],
                    where: { 
                        category: req.body.category
                    }
                }).then(function(dbfood) {
                    var hbsObj = {
                        foods: dbfood,
                        userObject : userObj,
                        user: {
                            username : userName,
                            id : userObj.id
                        }
                    }
                   res.render("userInputs",hbsObj)
                });
            } 
        })
    })
    //create a new goal
    app.post("/addTrack/:username",application.IsAuthenticated, function(req,res) {
        var userObj = req.user
        var choiceObj = {
            category : req.body.category,
            goal : req.body.goal
        }
        db.goal.create({
            category: req.body.category,
            goal: req.body.goal,
            week: req.body.week,
            UserId: req.body.UserId
        }).then(function(dbGoal) {   
            var hbsObj = {
                goals: dbGoal,
                choice : choiceObj,
                user : {
                    username : userObj.username,
                    id: userObj.id,  
                }
            }
            res.render("userTracks",hbsObj)
        })
    })
    //create food entry
    app.post("/addItem/:username",function(req,res) {
        var userObj = req.user
        var userName = req.user.username
        var choice = req.body.item
        db.log.findAll()
        db.log.create({
            item: req.body.item,
            count: req.body.count,
            week: req.body.week,
            UserId: req.body.userId,
            goalId: req.body.goalId,
            foodId: req.body.foodId
        }).then(function(dbGoal) { 
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
}


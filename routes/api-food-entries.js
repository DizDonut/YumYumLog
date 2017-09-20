
// Import the model (burger.js) to use its database functions.
var db = require("../models");

module.exports = function(app) {


    app.get("/userInputs", function(req,res) {
        res.render("userInputs")
    })

    app.get("/search", function(req, res) {
        
        
        if (req.query.q) {
            console.log(req.query.q);
            db.food.findAll({
                where: { 
                    item: {
                        $like: req.query.q
                    }
                }
            })
            .then(function(dbfood) {
                var hbsObj = {
                    choice : dbfood
                }
                console.log(JSON.stringify(hbsObj));
                res.render("userInputs",hbsObj)
            });
          
        } else if (req.query.category) {
            console.log(req.query.category)
            db.food.findAll({
                where: { 
                    category: req.query.category
                }
            }).then(function(dbfood) {
                // res.json(dbfood)
                var hbsObj = {
                    foods: dbfood
                }
                res.render("userInputs",hbsObj)
            });
        }

    });

    //get the food items by category, display by category in handlebars
}
//export routes for server.js to use
// module.exports = router;

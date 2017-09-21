var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var path = require("path");

var PORT = 3000 || process.env.PORT

var db = require("./models");

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/api-food-entries.js")(app);
require("./routes/api-user.js")(app);
// Import routes and give the server access to them.
// var routes = require("./routes/food.js");

// app.use("/", routes);

//listener
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT: " + PORT);
    });
});

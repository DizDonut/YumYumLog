var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var session = require('express-session');
var methodOverride = require("method-override");
var path = require("path");
var http = require('http');
var passport = require('passport');
var passportConfig = require('./config/passport')
var application = require('./routes/application');
// var routes = require("./routes");

SALT_WORK_FACTOR = 12;
var PORT = process.env.PORT || 3000;
var db = require("./models");
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
//added from passport.js authentication example
app.use(cookieParser());
//settings from express-session
app.use(session({
    secret: 'yumyumkeepsyoulogged',
    resave: false,
    saveUninitialized: false}))
app.use(passport.initialize())
app.use(passport.session())

app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");
require('./public/assets/javascript/handlebars.js')(exphbs);
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// app.use(routes);
require("./routes/authenticate.js")(app);
require("./routes/api-food-entries.js")(app);
require("./routes/api-user.js")(app);
require("./routes/api-dashboard-routes.js")(app);
require("./routes/public-routes.js")(app);

function errorHandler (err, req, res, next) {
	res.status(500)
	res.render('error', { error: err })
  }
//listener
db.sequelize.sync()//{force:true}
	.then(function(err){
		// if (err) {
		// 	throw err[0]
		// } else {
		db.User.find({where: {username: 'admin'}}).then(function (user){
			if (!user) {
				db.User.build({
					username: 'admin', 
					password: 'admin', 
					first_name: 'Test', 
					last_name: 'User'}).save();
			};
		});
		app.listen(PORT, function() {
			console.log("App listening on PORT: " + PORT);
	});
})

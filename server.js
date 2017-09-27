var express = require("express");
var bodyParser = require("body-parser");
//for passport.js
var cookieParser = require('cookie-parser');
var session = require('express-session');

var methodOverride = require("method-override");
var path = require("path");
var http = require('http');
var passport = require('passport');
var passportConfig = require('./config/passport')
var application = require('./routes/application');


//determines encryption
SALT_WORK_FACTOR = 12;

var PORT = 3000 || process.env.PORT

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

// app.use(errorHandler)
// function errorHandler (err, req, res, next) {
// 	if (res.headersSent) {
// 	  return next(err)
// 	}
// 	res.status(500)
// 	res.render('error', { error: err })
//   }
//couldn't initiate
// if ('development' === app.get('env')) {
// 	app.use(express.errorHandler())
// }

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");
require('./public/assets/javascript/handlebars.js')(exphbs);
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/api-food-entries.js")(app);
require("./routes/api-user.js")(app);
require("./routes/api-dashboard-routes.js")(app);
require("./routes/public-routes.js")(app);
// Import routes and give the server access to them.
// var routes = require("./routes");
// app.use("/", routes);



//passport related routes
    //assuming the index route in the api-user file will do the same
// app.get('/', routes.index)
app.get('/login', application.IsAuthenticated, function(req,res) {
    // var hbsObj = {
    //     username : req.user.username
	// }
	// hbsObj
	//  + req.user.username
	// "/"+ req.user.username + "/users"
    res.redirect("/users/" + req.user.username)
})
app.post('/authenticate',
  passport.authenticate('local',{
	successRedirect: '/login',
	failureRedirect: '/'
  })
)
app.get('/logout', application.destroySession)
app.get('/signup', function(req,res) {
    res.render("signup")
})
app.post('/register', function(req, res){
	// console.log("req.username " + req.username)
	db.User.findOne({where: {username: req.username}}).then(function (user){
		if(!user) {
			db.User.create({
				username: req.body.username,
				password: req.body.password,
				first_name: req.body.firstName,
				last_name: req.body.lastName
			}).then(function(dbUser,err){
				// console.log(err);
				// console.log(dbUser)
                // res.redirect("/authenticate");
			});
		} else {
            console.log('user doesnt exist yet...');
			res.redirect('/signup')
		}
	})
	res.redirect('/')
});
//listener
db
.sequelize.sync({force:true})//
  // .then(function() {
  //     app.listen(PORT, function() {
  //         console.log("App listening on PORT: " + PORT);
  //     });
  // })
.then(function(err){
	// if (err) {
	// 	throw err[0]
	// } else {
		db.User.find({where: {username: 'admin'}}).then(function (user){
			if (!user) {
				db.User.build({username: 'admin', password: 'admin', first_name: 'Test', last_name: 'User'}).save();
			};
		});
		app.listen(PORT, function() {
            console.log("App listening on PORT: " + PORT);
        });
            //is this an older way of startin the server?
		// http.createServer(app).listen(app.get('port'), function(){
		// 	console.log('Express is listening on port ' + app.get('port'))
		// });
	// }
})

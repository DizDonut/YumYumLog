exports.IsAuthenticated = function(req, res, next){
    // console.log(req);
	if(req.isAuthenticated()){
		console.log("IsAuthenticated worked");
		next();
	} else {
		console.log("IsAuthenticated failed");
		next(new Error(401));
	}
}

exports.destroySession = function(req, res, next) {
	console.log("destroying session");
	req.logOut();
	req.session.destroy()
	res.redirect("/")
}
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

//deliver static files without running into issues with routing

  app.get("/assets", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/assets/css/style.css"));
  });

  app.get("/user_food", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/assets/javascript/scripts_user_food.js"));
  });

  app.get("/scripts", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/assets/javascript/scripts.js"));
  });

  // app.get("/images", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/assets/images"));
  // });

};
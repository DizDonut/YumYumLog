var db = require("./models");

function sideBar_Open() {
  document.getElementById("sidebar").style.marginLeft = "25%";
  document.getElementById("mySidebar").style.width = "25%";
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("openNav").style.display = 'none';
}
function sideBar_Close() {
  document.getElementById("sidebar").style.marginLeft = "0%";
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("openNav").style.display = "inline-block";
}


//below functions need to make sure the page loads first prior to running
window.onload = function(){

/*
  progress_Bar function displays a progress bar on our user dashboard. It
  compares values from two models: UserTrack and Goal, both of which belongTo
  the User model.  Set the width equal to the User.count property; if no goal
  exists, the element is cleared.  If not, we increment the width
*/
  function progress_Bar(){
    var elem = document.getElementById("curr_prog");
    var width = db.User.count; // TODO: check status of assignment here
    var goal = db.User.goal // TODO: check status of assignment here
    var id = setInterval(frame, 10);
    function frame() {
      if(!goal){
        clearInterval(id);
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }

/*
  check_Star function simply checks the goal vs the foodLog count and determines
  if the goal has been met.  If so, create an img element and assign it the star.png
  source and append to the div
*/
  function check_Star(){
    if (db.User.count >= db.User.goal) {
      var elem = document.createElement("img");
      elem.src = ("./assets/images/star.png")
      document.getElementById("star_complete").appendChild(elem);
    }
  } // end check_Star function
} // end onload listener

/*
  sideBar_Open is used to open the sidebar - https://www.w3schools.com/w3css/tryit.asp?filename=tryw3css_sidebar_shift
*/

function sideBar_Open() {
  document.getElementById("sidebar").style.marginLeft = "25%";
  document.getElementById("mySidebar").style.width = "25%";
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("openNav").style.display = 'none';
}

/*
  sideBar_Close is used to close the sidebar - https://www.w3schools.com/w3css/tryit.asp?filename=tryw3css_sidebar_shift
*/

function sideBar_Close() {
  document.getElementById("sidebar").style.marginLeft = "0%";
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("openNav").style.display = "inline-block";
}

/*
  carousel function is used to animate the slides/cards on the userTrack page.  The slides will contain
  additional nutriional details for random foods in the database 
*/

function carousel(){
  if (document.getElementsByClassName("mySlides")) {
    var slideIndex = 0;
    var i;
    var x = document.getElementsByClassName("mySlides");
    if (x.length > 0) {
      for (var i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      slideIndex++;
      if(slideIndex > x.length){
        slideIndex = 1
      }
    
      x[slideIndex-1].style.display = "block";
      setTimeout(carousel, 4000);
    }
  }
}

/*
  progress_Bar function displays a progress bar on our user dashboard. It
  compares values from two models: UserTrack and Goal, both of which belongTo
  the User model.  Set the width equal to the User.count property; if no goal
  exists, the element is cleared.  If not, we increment the width and return true if
  the width reaches 100% or greater
*/

function progressBar(){

  var currentURL = window.location.pathname
  var name = document.getElementById("username").innerHTML
  debugger;
    if (currentURL === "/dashboard" || currentURL === "/users/" + name ){   //or userDash/:username
      var elems = document.getElementsByClassName("curr_prog");

      //instead of doing an AJAX, pull the counts from the page and adjust progress bars accordingly?
      var countSpanArr = document.getElementsByClassName("count")
      var goalSpanArr = document.getElementsByClassName("goal")

      //for the length of the arr, push values to an obj
      //use the index postions to adjust the progress
      for (var i = 0; i < goalSpanArr.length; i++) {
        var elem = elems[i];
        var width = document.getElementsByClassName("count")[i].innerHTML; // TODO: check status of assignment here
        var goal = document.getElementsByClassName("goal")[i].innerHTML; // TODO: check status of assignment here
        console.log(width);
        console.log(goal);

        if(goal <= 0){
          clearInterval(id);
        } else {
          console.log(width);
          elem.style.width = ((width / goal) * 100) + "%";
          console.log(elem.style.width);
        }
      }
    }
    
  //return statement 
    if(elem.style.width >= 100%){
      return true;
    } else {
      return false;
    }
  }

/*
  check_Star function simply checks the goal vs the foodLog count and determines
  if the goal has been met.  If so, create an img element and assign it the star.png
  source and append to the div
*/

  function check_Star(){
    if (progress_Bar()) {
      var elem = document.createElement("img");
      elem.src = ("./assets/images/star.png")
      document.getElementById("star_complete").appendChild(elem);
    }
  } // end check_Star function

//below functions need to make sure the page loads first prior to running
window.onload = function(){

  progressBar();
  carousel();

} // end onload listener

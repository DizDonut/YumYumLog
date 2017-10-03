/*
  sideBar_Open is used to open the sidebar - https://www.w3schools.com/w3css/tryit.asp?filename=tryw3css_sidebar_shift
*/
function sideBar_Open() {
  document.getElementById("sidebar").style.marginLeft = "25%";
  document.getElementById("mySidebar").style.width = "25%";
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("openNav").style.display = 'none';
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}
/*
  sideBar_Close is used to close the sidebar - https://www.w3schools.com/w3css/tryit.asp?filename=tryw3css_sidebar_shift
*/
function sideBar_Close() {
  document.getElementById("sidebar").style.marginLeft = "0%";
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("openNav").style.display = "inline-block";
  document.body.style.backgroundColor = "white";
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

    if (/dashboard/.test(currentURL) || /users/.test(currentURL)) { 
      var elems = document.getElementsByClassName("curr_prog");
      var countSpanArr = document.getElementsByClassName("count")
      var goalSpanArr = document.getElementsByClassName("goal")
    
      for (var i = 0; i < goalSpanArr.length; i++) {
        var elem = elems[i];
        var width = parseInt(document.getElementsByClassName("count")[i].innerHTML); 
        var goal = parseInt(document.getElementsByClassName("goal")[i].innerHTML); 

        if(goal <= 0) {
          clearInterval(id);
        } else {
          elem.style.width = getWidth()
          var bool = false;
          function getWidth() {
            if (width/goal >= 1) {
              return "100%" 
            } else {
              return ((width / goal) * 100) + "%"
            }
          }
        }
      }
    }

  } //end progressBar function

/*
check_Star function simply checks the goal vs the foodLog count and determines
if the goal has been met.  If so, create an img element and assign it the star.png
source and append to the div
*/
  function check_Star(){
    //get the goal, get the count
    var countSpanArr = document.getElementsByClassName("count")
    var goalSpanArr = document.getElementsByClassName("goal")
    //for the length of the elems,
    var check = document.getElementsByClassName("star_complete") 
    //goal>= count do this
    var img = document.createElement("img");
    img.src = ("/images/star")
    for (var j=0; j< check.length; j++) {
      // var elem= check[j];
      var count = parseInt(countSpanArr[j].innerHTML);
      var goal = parseInt(goalSpanArr[j].innerHTML); 
      if (count >= goal) {
          check[j].appendChild(img);
      }
    }
  }
  
  function showTableElems() {
    //show the item column /date logged column if the category is clicked
    //show the food items under the item headers
    //hide the category that wasn't clicked
    $(".show-food").click(function(event) {
      var cat = this.innerHTML
      var showFood = document.getElementsByClassName("showNutrition");
      var col = document.getElementsByClassName("showFoodCol")
      for (var i=0; i< showFood.length; i++) {
        //if the text of the cat is vegetables
        if (showFood[i].className.indexOf("w3-show") == -1 && showFood[i].className.indexOf(cat) !== -1) {
          showFood[i].className += " w3-show";
          //hide the other category and any food items 
        } else { 
            showFood[i].className = showFood[i].className.replace(" w3-show", "");
        }
      }

      for (j=0; j < col.length; j++){
        if (col[j].className.indexOf("w3-show") == -1 && col[j].className.indexOf(cat) !== -1) {
          col[j].className += " w3-show"
        } else {
          col[j].className += col[j].className.replace(" w3-show","")
        }
      }
    })
  }

  function showNutrition () {
    $(".showNutrition").click(function(event) {
      var item = this.getAttribute("value")
      var modal = document.getElementsByClassName("nutrition-modal")
      var showNutrition = document.getElementsByClassName("nutrition");
      var col = document.getElementsByClassName("nutritionCol")
      for (k=0; k < modal.length; k++) {
        if (modal[k].className.indexOf("w3-show") == -1 && modal[k].className.indexOf(item) !== -1) {
          modal[k].style.display='block';
        } else {
          modal[k].style.display='none';
        }
      }
      for (j=0; j < col.length; j++){
        if (col[j].className.indexOf("w3-show") == -1 && col[j].className.indexOf(item) !== -1) {
          col[j].className += " w3-show"
        } else {
          col[j].className = col[j].className.replace(" w3-show","")
        }
      }
      for (var i=0; i< showNutrition.length; i++) {
      //   //if the text of the cat is vegetables
          if (showNutrition[i].className.indexOf("w3-show") == -1 && showNutrition[i].className.indexOf(item) !== -1) {
            showNutrition[i].className += " w3-show";
            //hide the other category and any food items 
          } else { 

              showNutrition[i].className = showNutrition[i].className.replace(" w3-show", "");
          }
      }
    })
  } // end showNutrition function

//below functions need to make sure the page loads first prior to running
window.onload = function(){
  check_Star()
  showNutrition();
  showTableElems();
  progressBar();
  carousel();
  /*
    progress_Bar function displays a progress bar on our user dashboard. It
    compares values from two models: UserTrack and Goal, both of which belongTo
    the User model.  Set the width equal to the User.count property; if no goal
    exists, the element is cleared.  If not, we increment the width
  */
  /*
    check_Star function simply checks the goal vs the foodLog count and determines
    if the goal has been met.  If so, create an img element and assign it the star.png
    source and append to the div
  */
} 


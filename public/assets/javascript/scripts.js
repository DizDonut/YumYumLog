
function sideBar_Open() {
  document.getElementById("sidebar").style.marginLeft = "25%";
  document.getElementById("mySidebar").style.width = "25%";
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("openNav").style.display = 'none';
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function sideBar_Close() {
  document.getElementById("sidebar").style.marginLeft = "0%";
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("openNav").style.display = "inline-block";
  document.body.style.backgroundColor = "white";
}

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

function progressBar(){

  var currentURL = window.location.pathname
  // var name = document.getElementById("username").innerHTML

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

  } 


  function check_Star(){
   
    var countSpanArr = document.getElementsByClassName("count")
    var goalSpanArr = document.getElementsByClassName("goal")
    var check = document.getElementsByClassName("star_complete") 
   
    var count,goal;
    for (var j=0; j< check.length; j++) {
      var img = document.createElement("img");
      img.src = ("/images/star")
      count = parseInt(countSpanArr[j].innerHTML);
      goal = parseInt(goalSpanArr[j].innerHTML); 
      if (count >= goal) {
        document.getElementsByClassName("star_complete")[j].appendChild(img);
      }
    }
  }
  
  function showTableElems() {
    $(".show-food").click(function(event) {
      var cat = this.innerHTML
      var showFood = document.getElementsByClassName("showNutrition");
      var col = document.getElementsByClassName("showFoodCol")
      for (var i=0; i< showFood.length; i++) {
        if (showFood[i].className.indexOf("w3-show") == -1 && showFood[i].className.indexOf(cat) !== -1) {
          showFood[i].className += " w3-show";
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
          if (showNutrition[i].className.indexOf("w3-show") == -1 && showNutrition[i].className.indexOf(item) !== -1) {
            showNutrition[i].className += " w3-show";
          } else { 

              showNutrition[i].className = showNutrition[i].className.replace(" w3-show", "");
          }
      }
    })
  } 


window.onload = function(){
  progressBar();
  check_Star()
  showNutrition();
  showTableElems();
  progressBar();
  carousel();
} 


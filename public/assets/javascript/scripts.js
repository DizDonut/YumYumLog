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

function progress_Bar(){
  var elem = document.getElementById("curr_prog");
  var width = 0;
  var goal = 100 // TODO: link to user track object with goal
  var id = setInterval(frame, 10);
  function frame() {
    if(width >= goal){
        clearInterval(id);
    } else {
      width++;
      elem.style.width = width + "%";
    }
  }
}

function check_Star(){
}

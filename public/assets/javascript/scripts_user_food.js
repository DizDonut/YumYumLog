
function setMoment() {
    var date = moment().format('dddd, MMMM Do YYYY'); // Current Date, September 24th 2017
    var weekInput = moment().format();
    var weekNum = moment(weekInput).isoWeek();

    var wkLabel = document.getElementById("momentLabel");
    var wkInput = document.getElementsByClassName("moment");
    if (wkLabel) {
        wkLabel.innerHTML = date
    }
    for (var i =0; i < wkInput.length; i++) {
        var temp = wkInput[i]
        temp.setAttribute("value",weekNum)
    }
}

function checkTracks() {
    //if statement for window goes here (for all windows affected)
    var currentURL = window.location.origin
    //get the value of the username from the page run ajax on it to get the data
    var name = document.getElementById("username").value
    var id = document.getElementById("user_Id").value
        $.ajax({url: currentURL + "/getTracks/" + id,method:"GET"}).done(function(data) {

            // console.log(data);
            var done = 0;
           
            //if veggies or fruits, disable in options
        if (window.location.pathname === "/trackPage/" + name || window.location.pathname === "/addTrack/" + name) {
            for (var i=0; i < data.length; i++) {
                if (data[i].category === "vegetables") {
                    document.getElementById("vegetables").disabled = true
                    done ++;
                }
                if (data[i].category === "fruits") {
                    document.getElementById("fruits").disabled = true
                    done ++
                }
                if (done >= 2) {
                    var update = document.getElementById("optMsg")
                    document.getElementById("goalInput").disabled = true
                    update.innerHTML = "You're already tracking both goals!"
                }
            }
        } else if (window.location.pathname === "/addLog/" + name || window.location.pathname === "/addItem/" + name ) {
           
            for (var i=0; i < data.length; i++) {
                var option = document.createElement("option")
                option.innerHTML = data[i].category
                option.className = "w3-center"
                option.setAttribute("value", data[i].category)
                option.setAttribute("name", data[i].category)
                var select = document.getElementById("trackName")
                select.append(option);
            }
        } else if (window.location.pathname === "/submitLog/" + name) {
        }
        })
}

function convertTime() {
    // for each item in the array, convert the time to a nice format
    var timeArr = document.getElementsByClassName("convert"); 

    for (var i=0; i< timeArr.length; i++) {
        var temp = timeArr[i].innerHTML
        var convert = moment(temp).format('dddd, MMM Do YYYY')
        timeArr[i].innerHTML = convert
    }
}

function displayWeeks() {
    // debugger;
    var currentURL = window.location.origin
    var name = document.getElementById("username").value
    // var id = document.getElementById("user_Id").value
        $.ajax({url: currentURL + "/getWeeks",method:"GET"}).done(function(data) {
            console.log(data);
            var done = 0; 
            for (var i=0; i < data.length; i++) {
                var option = document.createElement("option")
                option.innerHTML = `Week ${data[i]}`
                option.className = "w3-center"
                option.setAttribute("value", data[i])
                // option.setAttribute("name", data[i].category)
                var select = document.getElementById("getWeek")
                select.append(option);
            }  
        })
}

function changeFormAction () {
    $("#getWeek").change(function() {
        var val = $("option:selected").val()
        //on select of week, update the form action to the week selected 
        //get the username
        var name = document.getElementById("username").innerHTML
        var curForm = document.getElementById("userDashForm")   
        curForm.action = window.location.origin + "/users/" + name + "/" + val;
    })
}

changeFormAction();
displayWeeks();
convertTime();
setMoment();
checkTracks();
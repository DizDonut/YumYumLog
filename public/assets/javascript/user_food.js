
// console.log('im working');

//for now, we have one js file for all client side js. add it below


//user login
    //
//registration
    //

//add a goal/user_track
    //

//log food to the log model
    //

//community dashboard
    //grab the count values from the weekly objects, and tally them on the client side to display in a column header for progress ('tallly of counts' / 'db.obj.goal' repr. as a %)
        //OR  create an alias attribute in sequelize that returns the tally (or the progress %) for each user's goal
//user dashboard
    //same tally procredure as above

//user more details
    //display the food items for the selected 'week'

//styling and rendering

function setMoment() {
    var date = moment().format('dddd, MMMM Do YYYY'); // Current Date, September 24th 2017
    var weekInput = moment().format();
    var weekNum = moment(weekInput).isoWeek();
    var wkLabel = document.getElementById("momentLabel"); 
    var wkInput = document.getElementById("moment");
    wkLabel.innerHTML = date
    // wkInpt.setAttribute("placeholder", date)
    wkInput.setAttribute("value",weekNum )

    
}


setMoment()

function checkTracks() { 
    var currentURL = window.location.origin
    //get the value of the username from the page run ajax on it to get the data
    var name = document.getElementById("user_Id").value
    // console.log(`magic` + name)
    $.ajax({url: currentURL + "/getTracks/" + name,method:"GET"}).done(function(data) {
        console.log(data);
        var done = 0;
        //if veggies or fruits, disable in options
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
                //replace tracks with a message
                var update = document.getElementById("optMsg")
                document.getElementById("goalInput").disabled = true
                update.innerHTML = "You're already tracking both goals!"
            }
        }
        // console.log("i've got your goals right here" + data.goals.length);
    })

        //search database
}
checkTracks();
// momentjs sample code
// $(document).ready(function(){
//     var weeknumber = moment("2017-09-22 00:30:17", "MMDDYYYY HHmmss").week();
//     alert(`non iso week number ${weeknumber}`);
//   });
//    $(document).ready(function(){
//     var weeknumber = moment("09-21-2017", "MMDDYYYY").isoWeek();
//     alert(`iso week number ${weeknumber}`);
//     var week = moment().isoWeeks(1)
//     alert(`week given number ${week}`);
//     moment().format('[today] dddd');
//     alert(`week year ${moment().weekYear(38)}`)
//   });
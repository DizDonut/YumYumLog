
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
    var name = document.getElementById("username").value
    var id = document.getElementById("user_Id").value
    // console.log(`magic` + name)

        $.ajax({url: currentURL + "/getTracks/" + id,method:"GET"}).done(function(data) {
            console.log(data);
            var done = 0;
            debugger;
            //if veggies or fruits, disable in options
            // debugger;
        if (window.location.pathname === "/trackPage/" + name) {
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
        } else if (window.location.pathname === "/addLog/" + name) {
            for (var i=0; i < data.length; i++) {
                //create an option
                //add the text
                //display the option
                var option = document.createElement("option")
                option.innerHTML = data[i].category
                option.setAttribute("value", data[i].category)
                option.setAttribute("name", data[i].category)
                var select = document.getElementById("trackName")
                select.append(option);
            }
        }
            // console.log("i've got your goals right here" + data.goals.length);
        })
    //search database
}
checkTracks();

//get food index list ajax
    //on submit, search for food for a category
        //data object has food items
            //iterate them in the data list


//get one item
    //on submit, look for one item in the food index
        //return it to the page

//submit food log
    //on submit, post food item to db for user
        //include moment current week
        //include goalsId


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
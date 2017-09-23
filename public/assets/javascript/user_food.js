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
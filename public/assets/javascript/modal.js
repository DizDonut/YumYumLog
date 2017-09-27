// User Tracks
// ________________________________
// (starting on line 37)           
// function nutrition() {          
// var id = empid;
// $.ajax({
//     type: "POST",
//     url: "../Webservices/EmployeeService.asmx/GetEmployeeOrders", //not there yet (api route + variable)
//     data: "{empid: " + empid + "}",
//     contentType: "application/json; charset=utf-8",
//     dataType: "json",
//     success: function(result){
//         alert(result.d);
//         console.log(result);
//     }
// });
// }
// userDash.handlebars
// ________________________________
// (starting on line 27)
// <div class="item">
//       <form>
//         <button type="button">Nutrition Information</button>
//       </form>
//      </div>
// nutrition.handlebars
// ________________________________
// <div id="id01" class="w3-modal">
//   <div class="w3-modal-content w3-animate-top w3-card-4">
//     <header class="w3-container w3-teal"> 
//       <span onclick="document.getElementById('id01').style.display='none'" 
//       class="w3-button w3-display-topright">&times;</span>
//       <h2>Modal Header</h2>
//     </header>
//     <div class="w3-container">
//       <p>Nutrition Information</p>
     
//     </div>
//     <footer class="w3-container w3-teal">
//       <p>Modal Footer</p>
//     </footer>
//   </div>
// </div>
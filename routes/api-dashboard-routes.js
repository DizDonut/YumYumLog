var db = require("../models");
var application = application = require('./application');
var moment = require("moment")

module.exports = function(app) {
    app.get("/dashboard",application.IsAuthenticated, function(req,res) {

        var userName = req.user.username
        var weekInput = moment().format();
        var weekNum = moment(weekInput).isoWeek();
        db.goal.findAll({
            // include: [[sequelize.fn('COUNT', sequelize.col('hats')), 'no_hats']]
            // [[db.sequelize.fn('COUNT', sequelize.col('count')), 'no_count']]
            where : {week : weekNum },
            include: [{model: db.log},{model:db.User}],
            order: [['week', 'DESC']]}).then(function(dbgoal) {
          // res.json(dbgoal);
          console.log(dbgoal);
          for (count in dbgoal) {
          }
          var hbsObj = {
            dashboard: dbgoal,
            user: {
                username : userName
            }
          }
          //count per week
          //for a given goal, given week, calculate the sum of the food log counts that match that week
          res.render("commDash",hbsObj)
        })

    })

    // When eager loading we can also filter the associated model using where. This will return all Users in which the where clause of Tool model matches rows.
    
    // User.findAll({
    //     include: [{
    //         model: Tool,
    //         as: 'Instruments',
    //         where: { name: { $like: '%ooth%' } }
    //     }]

    // app.get("/dashboard/:username",application.IsAuthenticated, function(req,res) {
    //     //find all goals, sum the associated log counts, store as count in goals
    //     // debugger
    //     var userName = req.user.username
    //     var weekInput = moment().format();
    //     var weekNum = moment(weekInput).isoWeek();
    //     db.User.findOne({
    //         where : {id : req.user.id}, 
    //         include : [
    //             {model: db.goal, include: [
    //                 {model:db.log}]}
    //         ]
    //     }).then(function(dbgoal) {
    //         // res.json(dbgoal);
    //         var handlebars = {
    //             dashboard : dbgoal,
    //             user : {
    //                 username :userName
    //             }
    //         }
    //         console.log(handlebars)
    //         res.render("userDash",handlebars)
    //         // replace res.json with the rendered handlebars page - res.render("userDash",hbsObj)
    //     })

    // })
}

// Sometimes it may be tiresome to list all the attributes of the model if you only want to add an aggregation:

// // This is a tiresome way of getting the number of hats...
// Model.findAll({
//   attributes: ['id', 'foo', 'bar', 'baz', 'quz', [sequelize.fn('COUNT', sequelize.col('hats')), 'no_hats']]
// });

// // This is shorter, and less error prone because it still works if you add / remove attributes
// Model.findAll({
//   attributes: { include: [[sequelize.fn('COUNT', sequelize.col('hats')), 'no_hats']] }
// });


// Ordering Eager Loaded Associations

// In the case of a one-to-many relationship.

// Company.findAll({ include: [ Division ], order: [ [ Division, 'name' ] ] });
// Company.findAll({ include: [ Division ], order: [ [ Division, 'name', 'DESC' ] ] });
// Company.findAll({
//   include: [ { model: Division, as: 'Div' } ],
//   order: [ [ { model: Division, as: 'Div' }, 'name' ] ]
// });
// Company.findAll({
//   include: [ { model: Division, as: 'Div' } ],
//   order: [ [ { model: Division, as: 'Div' }, 'name', 'DESC' ] ]
// });
// Company.findAll({
//   include: [ { model: Division, include: [ Department ] } ],
//   order: [ [ Division, Department, 'name' ] ]
// });
// In the case of many-to-many joins, you are also able to sort by attributes in the through table.

// Company.findAll({
//   include: [ { model: Division, include: [ Department ] } ],
//   order: [ [ Division, DepartmentDivision, 'name' ] ]
// });
// Nested eager loading

// You can use nested eager loading to load all related models of a related model:

// User.findAll({
//   include: [
//     {model: Tool, as: 'Instruments', include: [
//       {model: Teacher, include: [ /* etc */]}
//     ]}
//   ]
// }).then(users => {
//   console.log(JSON.stringify(users))

//   /*
//     [{
//       "name": "John Doe",
//       "id": 1,
//       "createdAt": "2013-03-20T20:31:45.000Z",
//       "updatedAt": "2013-03-20T20:31:45.000Z",
//       "Instruments": [{ // 1:M and N:M association
//         "name": "Toothpick",
//         "id": 1,
//         "createdAt": null,
//         "updatedAt": null,
//         "userId": 1,
//         "Teacher": { // 1:1 association
//           "name": "Jimi Hendrix"
//         }
//       }]
//     }]
//   */
// })
// This will produce an outer join. However, a where clause on a related model will create an inner join and return only the instances that have matching sub-models. To return all parent instances, you should add required: false.

// User.findAll({
//   include: [{
//     model: Tool,
//     as: 'Instruments',
//     include: [{
//       model: Teacher,
//       where: {
//         school: "Woodstock Music School"
//       },
//       required: false
//     }]
//   }]
// }).then(users => {
//   /* ... */
// })
// The query above will return all users, and all their instruments, but only those teachers associated with Woodstock Music School.

// Include all also supports nested loading:

// User.findAll({ include: [{ all: true, nested: true }]});
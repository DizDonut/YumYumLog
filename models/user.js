//password encryption occurs before its logged to the database
var bcrypt = require('bcrypt-nodejs')

module.exports = function(sequelize, DataTypes) {

    var db = require("../models");
    var User = sequelize.define("User", {
        username: {type: DataTypes.STRING, unique: true, allowNull: false, validate: {notEmpty: true}},
        password: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
        first_name: {type: DataTypes.STRING},
        last_name: {type: DataTypes.STRING}
    },	{
		dialect: 'mysql'
	});
    User.validPassword = function(password, passwd, done, user){
        // console.log(`password is ${password}`)
        // console.log(`passwd is ${passwd}`)
        // console.log(user);
        bcrypt.compare(password, passwd, function(err, isMatch){
            if (err) console.log(err)
            if (isMatch) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
    };
    User.associate = function(models) {
        // Associating Customer with Burgers
        // When a customer is deleted, also delete any associated burgers
        // User.hasOne(models.password, {
        //     onDelete: "cascade"
        // })
        User.hasMany(models.log);
        User.hasMany(models.goal);
    };
    //encryption occurs here before password logged to database
    User.hook('beforeCreate', function(user, fn){
        var salt = bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
            return salt
        });
        bcrypt.hash(user.password, salt, null, function(err, hash){
            //replaced next() with console.log()
            var fn = function fn() {};
            if(err) return err;
            console.log(user.password);
            User.update({password: hash}, {where: {username:user.username}})
            // user.password = hash;
            console.log(user.password);
            return fn(null, user)
        });
    });
      return User;
};



//   module.exports = function(sequelize, DataTypes) {
//       var User = sequelize.define('User', {
//           username: {type: DataTypes.STRING, unique: true, validate: {notNull: true, notEmpty: true}},
//           password: {type: DataTypes.STRING, validate: {notNull: true, notEmpty: true}}
//       },
//       {
//           classMethods: {
//               validPassword: function(password, passwd, done, user){
//                   bcrypt.compare(password, passwd, function(err, isMatch){
//                       if (err) console.log(err)
//                       if (isMatch) {
//                           return done(null, user)
//                       } else {
//                           return done(null, false)
//                       }
//                   })
//               }
//           }
//       },
//       {
//           dialect: 'mysql'
//       }
//   );

//   User.hook('beforeCreate', function(user, fn){
//       var salt = bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
//           return salt
//       });
//       bcrypt.hash(user.password, salt, null, function(err, hash){
//           if(err) return next(err);
//           user.password = hash;
//           return fn(null, user)
//       });
//   })

//    return User
//   }

//old password file

// module.exports = function(sequelize, DataTypes) {

//     var db = require("../models");
//     var Password = sequelize.define("password", {
//         key: {
//             type: DataTypes.STRING
//         }
//         })
//         Password.associate = function(models) {
//             // Associating Customer with Burgers
//             // When a customer is deleted, also delete any associated burgers
//             Password.belongsTo(models.user, {
//                 onDelete: "cascade"
//             })
//         }
//         return Password;
// }

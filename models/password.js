module.exports = function(sequelize, DataTypes) {
    
    var db = require("../models");
    var Password = sequelize.define("password", {
        key: {
            type: DataTypes.STRING
        }
        })
        Password.associate = function(models) {
            // Associating Customer with Burgers
            // When a customer is deleted, also delete any associated burgers
            Password.belongsTo(models.user, {
                onDelete: "cascade"
            })
        }
        return Password;
}
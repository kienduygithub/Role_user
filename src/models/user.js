'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.belongsTo(models.Group, {
                foreignKey: 'groupId'
            });
            User.belongsToMany(models.Project, {
                through: 'Project_User'
            });
            User.hasMany(models.Project, {
                foreignKey: 'customerId'
            })
        }
    }
    User.init({
        username: DataTypes.STRING,
        address: DataTypes.STRING,
        phone: DataTypes.STRING,
        sex: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        groupId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};
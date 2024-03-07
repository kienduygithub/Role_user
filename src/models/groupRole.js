'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Group_Role extends Model {
        static associate(models) {

        }
    }
    Group_Role.init({
        groupId: DataTypes.INTEGER,
        roleId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Group_Role',
    });
    return Group_Role;
};
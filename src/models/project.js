'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Project extends Model {
        static associate(models) {
            Project.belongsToMany(models.User, {
                through: 'Project_User'
            });
            Project.belongsTo(models.User);
        }
    }
    Project.init({
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        startDate: DataTypes.STRING,
        customerId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Project',
    });
    return Project;
};
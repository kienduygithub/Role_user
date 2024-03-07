const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('jwt', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected!');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export default connectDB;
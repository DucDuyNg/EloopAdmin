const { Sequelize,DataTypes } = require('sequelize');

const sequelize = new Sequelize('Eloop', 'root', '0903302271', {
    host: 'localhost',
    dialect:'mysql',
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
    } catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = { sequelize,DataTypes } 

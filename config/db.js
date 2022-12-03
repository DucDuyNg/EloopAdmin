const { Sequelize,DataTypes } = require('sequelize');


//const sequelize = new Sequelize('Eloop', 'root', 'tyuio1234@', {

const sequelize = new Sequelize('heroku_b81a1d522329301', 'bc78da768c9b0e', '2476055f', {
    host: 'us-cdbr-east-06.cleardb.net',
    dialect:'mysql',
    
});


//const sequelize = new Sequelize('Eloop', 'root', 'tyuio1234@', {

    try {
      sequelize.authenticate();
        console.log('Connection has been established successfully.');
        } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    


module.exports = { sequelize,DataTypes } 

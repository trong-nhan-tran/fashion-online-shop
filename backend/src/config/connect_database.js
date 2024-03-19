const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('one_more_style', 'root', null, {
    host: 'localhost',
    dialect: "mysql",
    logging: false
});
 
let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to the database!');
    } catch (error) {
        console.error('Cannot connect to the database!', error); 
    }
};

module.exports = connectDB;


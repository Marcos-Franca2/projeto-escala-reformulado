const Sequelize = require('sequelize');
const connection = new Sequelize('princesadoscampos', 'root', '27012506',{
    host: 'localhost',
    dialect : 'mysql'
})
 
module.exports = connection;
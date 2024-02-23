const sequelize = require('sequelize');
const connection = require('./database');

//criando um model 

const Motoristas = connection.define('motoristas',{ // criando uma tbela no BD
 name: {  // criando as colunas da tabela
    type: sequelize.STRING,
    allowNull: false
 },
 matricula: {
    type: sequelize.INTEGER,
    allowNull: false
 }
});
 // impedindo de recriar a tabela
Motoristas.sync({force: false}).then(()=>{ // then te da um retorno no console

}); 

module.exports = Motoristas
const sequelize = require('sequelize');
const connection = require('./database');

//criando um model 

const Usuarios = connection.define('usuarios',{ // criando uma tbela no BD
 user: {  // criando as colunas da tabela
    type: sequelize.STRING,
    allowNull: false
 },
 password: {
    type: sequelize.CHAR,
    allowNull: false
 }
});
 // impedindo de recriar a tabela
 Usuarios.sync({force: false}).then(()=>{ // then te da um retorno no console
 console.log('tabela criada')
}); 

module.exports = Usuarios
const sequelize = require('sequelize');
const connection = require('./database');

//criando um model 

const HorariosIda = connection.define('horariosIda',{ // criando uma tbela no BD
 horario: {  // criando as colunas da tabela
    type: sequelize.TIME,
    allowNull: false
 },
 diasemana: {
    type: sequelize.STRING,
    allowNull: false
 }
});
 // impedindo de recriar a tabela
HorariosIda.sync({force: false}).then(()=>{ // then te da um retorno no console
 console.log('tabela criada')
}); 

module.exports = HorariosIda
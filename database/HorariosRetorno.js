const sequelize = require('sequelize');
const connection = require('./database');

//criando um model 

const HorariosRetorno = connection.define('horariosRetorno',{ // criando uma tbela no BD
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
HorariosRetorno.sync({force: false}).then(()=>{ // then te da um retorno no console

}); 

module.exports = HorariosRetorno
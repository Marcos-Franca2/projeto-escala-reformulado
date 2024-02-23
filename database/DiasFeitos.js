const sequelize = require('sequelize');
const connection = require('./database');

//criando um model 

const DiasFeitos = connection.define('DiasFeitos', { // criando uma tbela no BD
    // criando as colunas da tabela
    Dia: {
        type: sequelize.DATE,
        allowNull: false
    },
    motorista: {
        type: sequelize.STRING,
        allowNull: false
    },
    horarioIda: {
        type: sequelize.TIME,
        allowNull: false
    },
    horarioRetorno: {
        type: sequelize.TIME
    },
    extra: {
        type: sequelize.STRING
    }

});
// impedindo de recriar a tabela
DiasFeitos.sync({ force: false }).then(() => { // then te da um retorno no console
});

module.exports = DiasFeitos
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const connection = require("./database/database");
const Motoristas = require("./database/Motoristas");
const Usuarios = require("./database/Usuarios");
const HorariosIda = require("./database/HorariosIda");
const HorariosRetorno = require("./database/HorariosRetorno");
const DiasFeitos = require("./database/DiasFeitos");

connection
    .authenticate()
    .then(() => {// fazendo o teste se funcionou ou não a conexao
        console.log("conexão feita com sucesso")
    })
    .catch((msgErro) => {//caso a conexao nao funcione
        console.log(msgErro);
    });


app.set('view engine', 'ejs');
app.use(express.static('public'));// ultilizando arquivos estaticos 
app.use(bodyparser.urlencoded({ extended: false })); // vai traduzir os dados em JS o dado que o form enviou
app.use(bodyparser.json());

app.get("/", (req, res) =>{
    res.render("login")
});

app.get("/cadastroMotorista", (req, res) =>{
    res.render("cadastroMot")
});

app.listen(8080, () => {
    console.log("app rodando");
});

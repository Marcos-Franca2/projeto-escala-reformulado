const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const connection = require("./database/database");
const Motoristas = require("./database/Motoristas");
const Usuarios = require("./database/Usuarios");
const HorariosIda = require("./database/HorariosIda");
const HorariosRetorno = require("./database/HorariosRetorno");
const DiasFeitos = require("./database/DiasFeitos");
const port = 8080;
const session = require('express-session');
const {Op} = require('sequelize');

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
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: '123456', // Troque para uma string segura
  resave: false,
  saveUninitialized: true,
}));

// middleware de autenticação
function autenticar(req, res, next) {
    if (req.session.usuario) {
      next();
    } else {
      res.redirect('/');
    }
  }


app.get("/", (req, res) => {
    let alertUser = false
    let alertPass = false
    res.render("login",{alertPass: alertPass, alertUser: alertUser })
});

app.post("/verificarUsuario", (req, res) => {
    let user = req.body.user;
    let password = req.body.password;
    
    Usuarios.findOne({
        where: { user: user }
    }).then(teste => {
        if (teste != undefined) {
            let alertUser = false

            if(teste.password === password){
                let alertPass = false
                req.session.usuario = user;
                res.redirect("/cadastroMotorista")
            }else{
                let alertPass = true
                res.render("login",{alertPass: alertPass, alertUser: alertUser})
            }

        }else{
            let alertUser = true
            let alertPass = false
            res.render("login",{alertPass: alertPass, alertUser: alertUser })
        }
    });


    
});

// cadastros e tratamento de cadastros
app.get("/cadastre-se", (req, res) => {
    let alertUser = false 
    let alert = false
    res.render("cadastre-se", { alertPass: alert, alertUser: alertUser })
})
app.post("/cadastraUsuario", (req, res) => {
    let user = req.body.user
    let password = req.body.password
    let repeat = req.body.repeatpassword

    // testando se o usuario ja foi cadastrado alguma vez
    Usuarios.findOne({
        where: { user: user }
    }).then(teste => {
        if (teste != undefined) {
            let alertUser = true
            res.render("cadastre-se", { alertUser: alertUser })
        } else {
            let alertUser = false
            // testando se as senhas coicidem
            if (password === repeat) {
                Usuarios.create({
                    user: user,
                    password: password
                }).then(() => {
                    res.redirect("/")
                });
                console.log("cadastrado")
            } else {
                let alert = true
                res.render("cadastre-se", { alertPass: alert, alertUser: alertUser })
            }
        }
    })

});


// procurar metodo de recuperacao de senha (implantar)
app.get("/esqueceu-senha", (req, res) => {
    res.render("esqueceu-senha")
})


// cadastro de motoristas/exclusão
app.get("/cadastroMotorista",autenticar, (req, res) => {
    Motoristas.findAll({raw:true, order:[["matricula","ASC"]]}
    ).then(Motoristas=>{
        res.render("cadastroMot",{motoristas: Motoristas})  
    });
});
app.post("/cadastradoSuccess",(req, res)=>{
    let name = req.body.motorista;
    let matricula = req.body.matricula;
    name = name.toUpperCase();
    Motoristas.findOne({
        where:{ [Op.or]: [{name: name},{matricula: matricula}
    ]}}).then(motorista=>{
        if (motorista == undefined){

            Motoristas.create({
                name: name,
                matricula: matricula
            }).then(() => {
                res.redirect("/cadastroMotorista");
            });
        }else{
            res.redirect("/cadastroMotorista");
        } 
    });
});
app.delete('/deletarMotorista/:matricula', async (req, res) => {
    try {
      const matricula = req.params.matricula;
      await Motoristas.destroy({
        where: {
          matricula: matricula,
        },
      });
      console.log("Excluído Motorista", matricula);
      res.redirect("/cadastroMotorista");
    } catch (error) {
      console.error('Erro ao excluir motorista:', error);
      res.redirect("/cadastroMotorista");
    }

});



app.get("/cadastroHora", autenticar, (req, res)=>{
    res.render("cadastro-hora")
});

app.listen(8080, () => {
    console.log("app rodando");
});

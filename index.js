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
app.get("/cadastre-se", (req, res) =>{
    res.render("cadastre-se")
})
app.get("/esqueceu-senha", (req, res) =>{
    res.render("esqueceu-senha")
})
app.get("/cadastroMotorista", (req, res) =>{
    res.render("cadastroMot")
});
app.post("/cadastraUsuario",(req, res)=>{
 let user = req.body.user
 let password = req.body.password
 let repeat = req.body.repeatpassword

 // testando se o usuario ja foi cadastrado alguma vez

 Usuarios.findOne({
    where: {user: user}
 }).then(teste=>{
    if (teste != undefined){
        let alertUser = true
        res.render("cadastre-se",{alertUser: alertUser})
    }else{
        let alertUser = false

        // testando se as senhas coicidem
 if(password === repeat){
    Usuarios.create({
        user: user,
        password : password
    }).then(()=>{
        res.redirect("/")
    });
    console.log("cadastrado")
}else{
    let alert = true
    res.render("cadastre-se",{alertPass: alert,alertUser: alertUser })
 }
    }
 })

});

app.post("/verificarUsuario",(req, res)=>{
    let user = req.body.user;
    let password = req.body.password;
    console.log(user, password)
        res.redirect("/")
});

app.listen(8080, () => {
    console.log("app rodando");
});

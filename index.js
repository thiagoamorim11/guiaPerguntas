const express  = require("express");
const app = express();
const bodyParser = require("body-parser")
const connection = require("./database/database");
const Pergunta =require("./database/Pergunta");
//Database

connection
.authenticate()
.then(() =>{
console.log("Conexão feita com o banco de dados")

})
.catch((msgErro) => {
console.log(msgErro);
})

app.set('view engine','ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//rotas
app.get("/",(req, res) => {

    res.render("index");
});


app.get("/perguntar",(req, res) =>{
res.render("perguntar");
});

app.post("/salvarpergunta",(req,res) =>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() =>{

        res.redirect("/");
    });

//res.send("Formulário recebido! Titulo: " + titulo + "" + " descricao: " + descricao);
});

app. listen(8080,()=>{
    console.log("App rodando!");
});
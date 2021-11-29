const express  = require("express");
const app = express();
const bodyParser = require("body-parser")
const connection = require("./database/database");
const Pergunta =require("./database/Pergunta");
const Resposta =require("./database/Resposta");
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

Pergunta.findAll({raw: true, order:[
    ['id','DESC']
]}).then(perguntas => {
    //console.log(perguntas);
    res.render("index",{
        perguntas: perguntas
    });
});

    //res.render("index");
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

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where:{id: id}
    }).then(pergunta => {
if(pergunta != undefined){//pergunta encontrada
    res.render("pergunta", {
        pergunta: pergunta
    });

}else{ //não encontrada
res.redirect("/");
}
    })

});

app. listen(8080,()=>{
    console.log("App rodando!");
});
const express = require("express")
const server = express()
const session = require("express-session")
const bodyparse = require('body-parser')
const path = require("path")
const view = require("./src/view")
const port = process.env.PORT || 8081


server.use(session({ secret: 'adklfkkdçsl', resave: true, saveUninitialized: true }))
server.use(bodyparse.urlencoded({
    extended: true
}));

server.use(express.json())
server.use(express.urlencoded());


server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')//quem pode acessar a api
    res.header('Acess-Control-Allow-Headers', 'Origin,X-Requrested-With ,Content-Type, Accept,Autorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATH,DELETE,GET')//CRUD
        return res.status(200).send({});//resposta
    }
    next()
})


server.use(express.static(__dirname + '/public'));

server.get('/', (req, res) => { res.status(200).render('index.ejs') })
server.post('/acess/yt/:key',async (req,res)=>{
 await view(req.body.url).then((x)=>{res.send('20 seconds')})
   
})

server.listen(port, (x) => { console.log(`on in ${port}`) })
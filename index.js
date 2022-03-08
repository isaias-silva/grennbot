const express = require("express")
const server = express()
const session = require("express-session")
const bodyparse = require('body-parser')
const path = require("path")
const port = process.env.PORT || 8081
const http = require('http').Server(server);
const io = require('socket.io')(http)

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

server.get('/', (req, res) => {
    res.status(200).render('index.ejs')




})
server.post('/acess/attack/:key', (req, res,) => {
    const ipCliente = req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;

    io.emit('msg',`[${ipCliente}]---> attack`)
res.send('ok')


})


http.listen(port, (x) => { console.log(`on in ${port}`) })
//importações
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const {setupWebsocket} = require('./websocket');
//executa express
const app = express();
const server = http.Server(app);
setupWebsocket(server);
//conexão com banco
mongoose.connect('mongodb://user:<password>cluster0-shard-00-00-fcxnn.mongodb.net:27017,cluster0-shard-00-01-fcxnn.mongodb.net:27017,cluster0-shard-00-02-fcxnn.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
app.use(cors());
//faz express ler json
app.use(express.json());
//cadastra rotas
app.use(routes);
//escuta a porta
server.listen(3333);

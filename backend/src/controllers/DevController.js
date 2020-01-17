//importações
const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const {findConnections, sendMessage} = require('../websocket');
//exporta função
module.exports = {
    //função para listar usuarios
    async index(request, response){
        //procura devs
        const devs = await Dev.find();
        //retorna informações
        return response.json(devs);
    },
    //função para criar usuarios
    async store(request, response){
        //pega o username dentro do request.body
        const {github_username, techs, latitude, longitude} = request.body;
        //verrifica se já existe usuario no banco
        let dev = await Dev.findOne({github_username});
        if(!dev){
             //conecta com api do github
        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        //resposta do github 
        const {name = login, avatar_url,bio} = apiResponse.data;
        //converte em array e tira spaços em branco
        const techsArray = parseStringAsArray(techs);
        //cria o array com latitude e longitude
        const location = {
            type: 'Point',
            coordinates: [longitude,latitude],
        };
        //cadastra no banco de dados
        dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs:techsArray,
            location,
        })
        //filtrar as conexões que estão no máximo 10 km de distancia
        //e que o novo dev tenha pelo menis uma das tecnologias filtradas
        const sendSocketMessageTo = findConnections(
            {latitude,longitude},
            techsArray,
            )
            sendMessage(sendSocketMessageTo, 'new-dev',dev);
        }
       
        //exibe informações
        return response.json(dev);
    }
}
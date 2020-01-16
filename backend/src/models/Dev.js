//importações
const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');
//cria estrutura do dev
const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio:String,
    avatar_url:String,
    techs:[String],
    location:{
        type:  PointSchema,
        index:'2dsphere'
    }
});
//exporta
module.exports = mongoose.model('Dev',DevSchema);
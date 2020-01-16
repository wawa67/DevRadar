//importações
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
module.exports = {
    async index(request,response){
        //recebe informações
        const {latitude,longitude,techs} = request.query;
        //converte para array
        techsArray = parseStringAsArray(techs);
        //filtro de tecnologias
        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location:{
                $near:{
                    $geometry:{
                        type:'Point',
                        coordinates:[longitude,latitude],
                    },
                    $maxDistance: 10000,
                },
            }
        });
        //exibe as informações
        console.log(latitude,longitude,techsArray);
        return response.json({ devs });
    } 
}
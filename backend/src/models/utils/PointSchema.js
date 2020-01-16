//importações
const mongoose = require('mongoose');
//criar estrutura de point
const PointSchema = new mongoose.Schema({
    type:{
    type: String,
    enum: ['Point'],
    require: true,
    },
    coordinates:{
        type: [Number],
        required:true,
    }
});
//exporta PointSchema
module.exports = PointSchema;
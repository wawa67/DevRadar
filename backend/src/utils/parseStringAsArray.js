//exporta função para transformar string em Array
module.exports = function parseStringAsArray(arrayAsString){
    return  arrayAsString.split(',').map(tech => tech.trim());
}
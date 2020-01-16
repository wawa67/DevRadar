//importar metodo de rota
const {Router} = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');
//executa
const routes = Router(); 
//manda informações
routes.get('/devs',DevController.index);
routes.post('/devs', DevController.store);
routes.get('/search', SearchController.index);
//exporta routes
module.exports = routes;
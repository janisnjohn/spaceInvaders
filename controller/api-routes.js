// api routes for getting and posting game results
var express = require('express');
const db = require('../models/index.js');

var apiRouter = express.Router();

apiRouter.get('/leaderboard', function(request, response){
	console.log('/api/leaderboard GET');
	db.Record.findAll({
		order: [['score', 'DESC']],
	}).then(function(results){
		response.json(results)
	});
});


apiRouter.post('/score', function(request, response){
	console.log('/api/score POST');
	console.log(request.body);
    db.Record.create(request.body).then(function(results){
    	console.log('added record')
    	console.log(results)
    	response.status('200').end();
    });
});

module.exports = apiRouter;

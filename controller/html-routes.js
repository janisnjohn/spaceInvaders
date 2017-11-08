// api routes for getting and posting game results
var express = require('express');
var db = require('../models');

var htmlRouter = express.Router();

htmlRouter.get('/leaderboard', function(request, response){
	console.log('/leaderboard GET');
	// execute sequelize method to find records, chain promise to store data as object
	db.Record.findAll({
		// sort array of records descending from highest score
		order: [['score', 'DESC'],]
	}).then(function(data){
		let hbsObject = { Record: data };
		console.log(hbsObject);
		// render leaderboard view and attach handlebarsObject
		response.render("leaderboard", hbsObject);
	});

});

htmlRouter.get('/', function(request, response){
	console.log('/ GET');
	response.render("index");
});

htmlRouter.get('/game', function(request, response){
	console.log(request.url, 'GET');
    response.render("game");
});

htmlRouter.get('/gameOver/:score', function(request, response){
	console.log(request.url, 'GET');
	var gameScore = request.params.score
    response.render("gameOver", {gameScore: gameScore});
});


module.exports = htmlRouter;

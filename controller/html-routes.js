// api routes for getting and posting game results
var express = require('express');
var db = require('../models/index.js');


var htmlRouter = express.Router();

htmlRouter.get('/leaderboard', function(request, response){
	console.log('/leaderboard GET');
	response.render("leaderboard");
});

htmlRouter.get('/', function(request, response){
	console.log('/ GET');
	response.render("index");
});

htmlRouter.get('/game', function(request, response){
	console.log(request.url, 'GET');
    response.render("game");
});

htmlRouter.get('/gameOver', function(request, response){
	console.log(request.url, 'GET');
    response.render("gameOver");
});


module.exports = htmlRouter;

// api routes for getting and posting game results
var express = require('express');
var db = require('../models/index.js');

var htmlRouter = express.Router();

htmlRouter.get('/leaderboard', function(request, response){
	console.log('/leaderboard GET');
});

htmlRouter.get('/', function(request, response){
	console.log('/ GET');
});

htmlRouter.get('/game/:id', function(request, response){
	console.log(request.url, 'GET');
});

module.exports = htmlRouter;

// api routes for getting and posting game results
var express = require('express');
var db = require('../models/index.js');

var apiRouter = express.Router();

apiRouter.get('/leaderboard', function(request, response){
	console.log('/api/leaderboard GET');
	res.end();
});

apiRouter.post('/score', function(request, response){
	console.log('/api/score POST');
	res.end();
});

module.exports = apiRouter;

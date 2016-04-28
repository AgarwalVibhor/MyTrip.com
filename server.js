(function(){

	'use strict';
	var fs = require('fs');
	var path = require('path');
	var express = require('express');
	var bodyParser = require('body-parser');
	var nedb = require('nedb'), database = new nedb({filename : 'myTrip.db', autoload : true});
	var app = express();
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended : true}));

	app.get('/getDepartures', function(req, res){

		fs.readFile('./places.json', 'utf8', function(err, data){
			if(err) throw err;
			res.send(data);
		});
	});

	app.get('/getArrivals', function(req, res){

		fs.readFile('./places.json', 'utf8', function(err, data){
			if(err) throw err;
			res.send(data);
		});
	});

	app.get('/getAirlines', function(req, res){

		fs.readFile('./places.json', 'utf8', function(err, data){
			if(err) throw err;
			res.send(data);
		});
	});

	app.post('/addDetails', function(req, res){
		var count = 0;
		database.insert({
			departure : req.body.departure,
			arrival : req.body.arrival,
			date : req.body.date,
			departureTime : req.body.departureTime,
			arrivalTime : req.body.arrivalTime,
			airline : req.body.airline,
			duration : req.body.duration,
			price : req.body.price
		}, function(err){
			if(count == 0){
				console.log("Data could not be added successfully to the database file");
			}
		});
		count = count + 1;
		if(count == 1)
		{
			console.log("Data has been added successfully to the database file");
			res.send("yes");
		}
	});

	app.get('/findFlights', function(req, res){
		var flightDetails = {};
		flightDetails['details'] = []
		database.find({departure : req.query.departure, arrival : req.query.arrival, date : req.query.date}).sort({price : 1}).exec(function(err,docs){
			for(var i = 0; i < docs.length; i++)
			{
				flightDetails['details'].push(docs[i]);
			}
			res.send(JSON.stringify(flightDetails));
		});
	});

	app.get('/checkLogin', function(req, res){

		fs.readFile('./login.json', 'utf8', function(err, data){
			if(err) throw err;
			res.send(data);
		});
	});

	app.listen(process.env.PORT || 8082);
	console.log('Server is listening');
})();
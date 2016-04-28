(function(){

	'use strict';
	var MyTrip = angular.module('MyTrip',['ngRoute']);

	MyTrip.config(function($routeProvider){
		$routeProvider
		.when('/',{
			templateUrl : './views/home.html' // Here we specify the path from the index page to the required HTML Page.
		})
		.when('/loadFlights', {
			templateUrl : './views/loadFlights.html'
		})
		.when('/results', {
			templateUrl : './views/results.html'  // Here we specify the path from the index page to the required HTML Page.
		})
		.when('/login', {
			templateUrl : './views/login.html'
		});
	});
})();
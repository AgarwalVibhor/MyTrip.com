(function(){

	'use strict';
	angular.module('MyTrip').controller('ResultsController', ResultsController);

	ResultsController.$inject = ['$scope', '$http', '$rootScope'];
	function ResultsController($scope, $http, $rootScope){

		$(".nav a").on("click", function(){     // Used for the active link on the navigation bar inverse-collapse.
		   $(".nav").find(".active").removeClass("active");
		   $(this).parent().addClass("active");
		});	
		

		$scope.findFlights = findFlightsFn;
		$scope.getNames = getNamesFn;
		$scope.modifySearch = modifySearchFn;
		$scope.showFlightDetails = showFlightDetailsFn;
		$scope.flights = [];
		$scope.condition = true;

		function findFlightsFn(){
			var req = {
				method : 'GET',
				url : '/findFlights',
				params : {
					departure : $rootScope.departure,
					arrival : $rootScope.arrival,
					date : $rootScope.date
				}
			};
			$http(req).then(successFindFlights, function(res){
				console.log("An error occured in the findFlightsFn");
			});
		}

		function successFindFlights(res){
			$scope._date = $rootScope.date;
			$scope.flights = res.data.details;
			for(var i = 0; i < $scope.flights.length; i++)
			{
				if($scope.flights[i].airline == "1")
					$scope.flights[i].airline = 'Air.png';
				else if($scope.flights[i].airline == "2")
					$scope.flights[i].airline = 'Indigo.png';
				else if($scope.flights[i].airline == "3")
					$scope.flights[i].airline = 'Spice.png';
				else
					$scope.flights[i].airline = 'Jet.png';
			}
			$scope.noOfFlights = $scope.flights.length;
			if($scope.noOfFlights == 0)
				$scope.condition = false;
		}

		function getNamesFn(){
			var req = {
				method : 'GET',
				url : '/getDepartures'
			};
			$http(req).then(successGetNames, function(res){
				console.log("An error occured in getNamesFn");
			});
		}

		function successGetNames(res){
			$scope.names = res.data.departures;
			for(var i = 0; i < $scope.names.length; i++)
			{
				if($scope.names[i].id == $rootScope.departure)
					$scope._departure = $scope.names[i].place;
				if($scope.names[i].id == $rootScope.arrival)
					$scope._arrival = $scope.names[i].place;
			}
		}

		function modifySearchFn(){
			window.location = '#/';
			$('#linkResults').removeClass('active');
			$('#linkHome').addClass('active');
		}

		function showFlightDetailsFn(flight, _departure, _arrival){
			bootbox.dialog({
				message :  '<div class="row">' +
 								'<div class="col-md-12">' +
 									'<img src="./assets/logo/' + flight.airline + '" alt="Airline Image" style="margin-left: 200px; height: 100px; width: 100px;" />' +
									'<br />' +
 									'<br />' +
 									'<label style="margin-left: 20px;">Departure :</label>' +
 									'<span style="margin-left: 20px;">' + _departure + '</span>' +
 									'<hr />' +
 									'<label style="margin-left: 20px;">Arrival :</label>' +
 									'<span style="margin-left: 20px;">' + _arrival + '</span>' +
 									'<hr />' +
 									'<label style="margin-left: 20px;">Date :</label>' +
 									'<span style="margin-left: 20px;">' + flight.date + '</span>' +
 									'<hr />' +
 									'<label style="margin-left: 20px;">Departure Time :</label>' +
 									'<span style="margin-left: 20px;">' + flight.departureTime +  ' hours' + '</span>' +
 									'<hr />' +
 									'<label style="margin-left: 20px;">Arrival Time :</label>' +
 									'<span style="margin-left: 20px;">' + flight.arrivalTime + ' hours' + '</span>' +
 									'<hr />' +
 									'<label style="margin-left: 20px;">Duration :</label>' +
 									'<span style="margin-left: 20px;">' + flight.duration + ' hours' + '</span>' +
 									'<hr />' +
 									'<label style="margin-left: 20px;">Price :</label>' +
 									'<span style="margin-left: 20px;">' + '<i class="fa fa-inr" aria-hidden="true" style="font-size: 15px;"></i>' + flight.price + '</span>' +
 								'</div>' +
 							'</div>',
				title : "Flight Details",
				buttons : {
					success : {
						label : "< Back",
						className : "btn-primary",
						callback : function(){
							// If you do not specify anything within this, then when you click this button, dialog box will just disappear.
						}
					},
					danger : {
						label : "Continue Booking",
						className : "btn-danger",
						callback : function(){
							// If you do not specify anything within this, then when you click this button, dialog box will just disappear.
						}
					}
				}
			});
		}

		$scope.predicate = 'price';
  		$scope.reverse = true;
  		$scope.order = function(predicate) {
   			 $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
   			 $scope.predicate = predicate;
 			 };
		$scope.findFlights();
		$scope.getNames();
	}
})();



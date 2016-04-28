(function(){

	'use strict';
	angular.module('MyTrip').controller('HomeController', HomeController);

	HomeController.$inject = ['$scope', '$http', '$rootScope'];
	function HomeController($scope, $http, $rootScope){

		$(".nav a").on("click", function(){    // Used for the active link on the navigation bar inverse-collapse.
		   $(".nav").find(".active").removeClass("active");
		   $(this).parent().addClass("active");
		});	
		

		$scope.getDepartures = getDeparturesFn;
		$scope.getArrivals = getArrivalsFn;
		$scope.findFlights = findFlightsFn;
		$scope.departure = "0";
		$scope.arrival = "0";
		$scope.date = null;
		$scope.warning1 = false;
		$scope.warning2 = false;
		$scope.warning3 = false;
		$scope.setWarning1 = setWarning1Fn;
		$scope.setWarning2 = setWarning2Fn;
		$scope.setWarning3 = setWarning3Fn;

		function getDeparturesFn(){
			var req = {
				method : 'GET',
				url : '/getDepartures'
			};
			$http(req).then(successGetDepartures, function(res){
				console.log("An error occures in getting departures");
			});
		}

		function successGetDepartures(res){
			$scope.departures = res.data.departures;
		}

		function getArrivalsFn(){
			var req = {
				method : 'GET',
				url : '/getArrivals'
			};
			$http(req).then(successGetArrivals, function(res){
				console.log("An error occured in the getArrivalsFn");
			});
		}

		function successGetArrivals(res){
			$scope.arrivals = res.data.arrivals;
			for(var i = 0; i < $scope.arrivals.length; i++)
			{
				if($scope.departure == $scope.arrivals[i].id)
					$scope.arrivals.splice(i, 1);
			}
		}

		function getMinDateFn(num){
			var noOfMilliseconds = 24 * 60 *60 * 1000 * num;
			var date = new Date((new Date().getTime()) + noOfMilliseconds);
			var day = date.getDate();
			day = ("0" + day).slice(-2);
			var month = date.getMonth() + 1;
			month = ("0" + month).slice(-2);
			var year = date.getFullYear();
			var _date = year + '-' + month + '-' + day; // // The min and max in <input type="date" /> are of type YYYY-MM-DD
			return _date;
		}
		function getMaxDateFn(num){
			var noOfMilliseconds = 24 * 60 *60 * 1000 * num;
			var date = new Date((new Date().getTime()) + noOfMilliseconds);
			var day = date.getDate();
			day = ("0" + day).slice(-2);
			var month = date.getMonth() + 1;
			month = ("0" + month).slice(-2);
			var year = date.getFullYear() + 1;
			var _date = year + '-' + month + '-' + day; // The min and max in <input type="date" /> are of type YYYY-MM-DD
			return _date;
		}

		function findFlightsFn(){
			if($scope.departure == "0")
			{
				document.getElementById('departure').focus();
				$scope.warning1 = true;
				return false;
			}
			if($scope.arrival == "0")
			{
				document.getElementById('arrival').focus();
				$scope.warning2 = true;
				return false;
			}
			if($scope.date == null)
			{
				document.getElementById('date').focus();
				$scope.warning3 = true;
				return false;
			}

			$rootScope.departure = $scope.departure;
			$rootScope.arrival = $scope.arrival;
			$rootScope.date = $scope.date.toString().substring(4, 15);

			window.location = '#/results';
			$('#linkHome').removeClass('active');
			$('#linkResults').addClass('active');
		}

		function setWarning1Fn(){
			$scope.warning1 = false;
		}
		function setWarning2Fn(){
			$scope.warning2 = false;
		}
		function setWarning3Fn(){
			$scope.warning3 = false;
		}

		$scope.getDepartures();
		$scope.minDate = getMinDateFn(0);
		$scope.maxDate = getMaxDateFn(0);
	}
})();
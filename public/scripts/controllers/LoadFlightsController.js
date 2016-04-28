(function(){

	'use strict';
	angular.module('MyTrip').controller('LoadFlightsController', LoadFlightsController);

	LoadFlightsController.$inject = ['$scope', '$http', '$rootScope'];
	function LoadFlightsController($scope, $http, $rootScope){

		if(($rootScope._username == null) && ($rootScope._password == null))
		{
			window.location = '#/login';
		}

		$(".nav a").on("click", function(){     // Used for the active link on the navigation bar inverse-collapse.
		   $(".nav").find(".active").removeClass("active");
		   $(this).parent().addClass("active");
		});	
		
		$scope.getDepartures = getDeparturesFn;
		$scope.departure = "0";
		$scope.arrival = "0";
		$scope.warning1 = false;
		$scope.setWarning1 = setWarning1Fn;
		$scope.getArrivals = getArrivalsFn;
		$scope.warning2 = false;
		$scope.date = null;
		$scope.departureTime = null;
		$scope.arrivalTime = null;
		$scope.duration = null;
		$scope.price = null;
		$scope.setWarning2 = setWarning2Fn;
		$scope.warning3 = false;
		$scope.setWarning3 = setWarning3Fn;
		$scope.warning4 = false;
		$scope.setWarning4 = setWarning4Fn;
		$scope.warning5 = false;
		$scope.setWarning5 = setWarning5Fn;
		$scope.getAirlines = getAirlinesFn;
		$scope.airline = "0";
		$scope.warning6 = false;
		$scope.setWarning6 = setWarning6Fn;
		$scope.warning7 = false;
		$scope.setWarning7 = setWarning7Fn;
		$scope.warning8 = false;
		$scope.setWarning8 = setWarning8Fn;
		$scope.checkDetails = checkDetailsFn;
		$scope.addDetails = addDetailsFn;
		$scope.count = 0;
		$scope.added = false;

		function getDeparturesFn(){
			var req = {
				method : 'GET',
				url : '/getDepartures'
			};
			$http(req).then(successGetDepartures, function(res){
				console.log("An error occured in the getDeparturesFn -- loadFlightsController");
			});
		}
		function successGetDepartures(res){
			$scope.departures = res.data.departures;
		}
		function setWarning1Fn(){
			$scope.warning1 = false;
		}

		function getArrivalsFn(){
			var req = {
				method : 'GET',
				url : '/getArrivals'
			};
			$http(req).then(successGetArrivals, function(res){
				console.log("An error occured in the getArrivalsFn -- loadFlightsController");
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
		function setWarning2Fn(){
			$scope.warning2 = false;
		}

		function getMinDate(num){
			var noOfMilliseconds = 24 * 60 * 60 * 1000 * num;
			var date = new Date((new Date().getTime()) + noOfMilliseconds);
			var day = date.getDate();
			day = ("0" + day).slice(-2);
			var month = date.getMonth() + 1;
			month = ("0" + month).slice(-2);
			var year = date.getFullYear();
			var _date = year + '-' + month + '-' + day;
			return _date;
		}
		function getMaxDate(num){
			var noOfMilliseconds = 24 * 60 * 60 * 1000 * num;
			var date = new Date((new Date().getTime()) + noOfMilliseconds);
			var day = date.getDate();
			day = ("0" + day).slice(-2);
			var month = date.getMonth() + 1;
			month = ("0" + month).slice(-2);
			var year = date.getFullYear() + 1;
			var _date = year + '-' + month + '-' + day;
			return _date;
		}
		function setWarning3Fn(){
			$scope.warning3 = false;
		}
		function setWarning4Fn(){
			$scope.warning4 = false;
		}
		function setWarning5Fn(){
			$scope.warning5 = false;
		}

		function getAirlinesFn(){
			var req = {
				method : 'GET',
				url : '/getAirlines'
			};
			$http(req).then(successGetAirlines, function(res){
				console.log("An error occured in the getAirlinesFn -- LoadFlightsController")
			});
		}
		function successGetAirlines(res){
			$scope.airlines = res.data.airlines;
		}
		function setWarning6Fn(){
			$scope.warning6 = false;
		}

		function setWarning7Fn(){
			$scope.warning7 = false;
		}

		function setWarning8Fn(){
			$scope.warning8 = false;
		}

		function checkDetailsFn(){
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
				console.log($scope.warning3);
				return false;
			}
			if($scope.departureTime == null)
			{
				document.getElementById('departureTime').focus();
				$scope.warning4 = true;
				return false;
			}
			if($scope.arrivalTime == null)
			{
				document.getElementById('arrivalTime').focus();
				$scope.warning5 = true;
				return false;
			}
			if($scope.airline == "0")
			{
				document.getElementById('airline').focus();
				$scope.warning6 = true;
				return false;
			}
			if($scope.duration == null)
			{
				document.getElementById('duration').focus();
				$scope.warning7 = true;
				return false;
			}
			if($scope.price == null)
			{
				document.getElementById('price').focus();
				$scope.warning8 = true;
				return false;
			}
		}
		
		function addDetailsFn(){
			$scope.date = $scope.date.toString().substring(4, 15);
			$scope.departureTime = $scope.departureTime.toString().substring(16, 24);
			$scope.arrivalTime = $scope.arrivalTime.toString().substring(16, 24);
			$scope.duration = $scope.duration.toString().substring(16, 24);

			var req = {
				method : 'POST',
				url : '/addDetails',
				data : {
					departure : $scope.departure,
					arrival : $scope.arrival,
					date : $scope.date,
					departureTime : $scope.departureTime,
					arrivalTime : $scope.arrivalTime,
					airline : $scope.airline,
					duration : $scope.duration,
					price : $scope.price
				}
			};
			$http(req).then(successAddDetails, function(res){
				toaster.success("Flight Details added successfully");
				console.log("Data could not be added successfully -- LoadFlightsController");
			});
		}
		function successAddDetails(res){
			$scope.count = $scope.count + 1;
			$scope.added = true;
			console.log("Data has been added successfully -- LoadFlightsController");
		}

		$scope.minDate = getMinDate(0);
		$scope.maxDate = getMaxDate(0);
		$scope.getDepartures();

	}
})();
(function(){

	'use strict';
	angular.module('MyTrip').controller('LoginController', LoginController);

	LoginController.$inject = ['$scope', '$rootScope', '$http'];
	function LoginController($scope, $rootScope, $http){

		$(".nav a").on("click", function(){     // Used for the active link on the navigation bar inverse-collapse.
		   $(".nav").find(".active").removeClass("active");
		   $(this).parent().addClass("active");
		});	

		$scope.username = null;
		$scope.warning1 = false;
		$scope.setWarning1 = setWarning1Fn;
		$scope.password = null;
		$scope.warning2 = false;
		$scope.setWarning2 = setWarning2Fn;
		$scope.checkLogin = checkLoginFn;
		$scope.danger = false;
		$scope.setDanger = setDangerFn;
		var temp = false;

		function setWarning1Fn(){
			$scope.warning1 = false;
		}

		function setWarning2Fn(){
			$scope.warning2 = false;
		}

		function checkLoginFn(){
			var req = {
				method : 'GET',
				url : '/checkLogin'
			};
			$http(req).then(successCheckLogin, function(res){
				console.log("An error occured in the checkLoginFn -- LoginController");
			});
		}

		function successCheckLogin(res){

			$scope.login = res.data.login;
			console.log($scope.username);
			console.log($scope.password);
			for(var i = 0; i < $scope.login.length; i++)
			{
				
				if(($scope.username == $scope.login[i].username) && ($scope.password == $scope.login[i].password))
				{
					temp = true;
					break;
				}
				else
				{
					$scope.danger = true;
				}
			}
			if(temp == true)
			{
				$rootScope._username = $scope.username;
				$rootScope._password = $scope.password;
				window.location = '#/loadFlights';
			}
			else
				window.location = '#/login';

			console.log(temp);
		}

		function setDangerFn(){
			$scope.danger = false;
		}
	}
})();
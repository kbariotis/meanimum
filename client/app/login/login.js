angular.module('app.login', ['ngRoute'])

	.config([
		'$routeProvider', function ($routeProvider) {
			'use strict';

			$routeProvider.when('/login', {
				templateUrl: 'app/login/login.html',
				controller: 'LoginCtrl'
			}).when('/logout', {
				templateUrl: 'app/login/login.html',
				controller: 'LogoutCtrl'
			});
		}
	])

	.controller('LoginCtrl', [
		'$scope', '$location', 'Auth',
		function ($scope, $location, Auth) {
			'use strict';

			if(Auth.isAuthenticated()) {
				$location.path('/products');
			}

			$scope.login = function () {
				Auth.login({
					email: $scope.email,
					password: $scope.password
				}).then(function(){
					$location.path('/products');
				}, function(res){
					$scope.message = res.message;
				});
			};

		}
	])

	.controller('LogoutCtrl', [
		'$scope', '$location', 'Auth',
		function ($scope, $location, Auth) {
			'use strict';

			Auth.logout();
			$location.path('/');

		}
	]);

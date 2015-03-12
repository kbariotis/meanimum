angular.module('app', [
	'ngRoute',
	'ngStorage',
	'app.login',
	'app.products',
	'app.auth',
	'app.interceptor'
]).
	config([
		'$routeProvider', function ($routeProvider) {
			'use strict';

			$routeProvider.otherwise({redirectTo: '/login'});
		}
	])
	.run([
		'$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {

			$rootScope.loading = false;

			$rootScope.$on('$routeChangeStart', function () {
				if (!Auth.isAuthenticated()) {
					$location.path('/login');
				}
				$rootScope.loading = true;
			});
			$rootScope.$on('$routeChangeSuccess', function () {
				$rootScope.loading = false;
			});
			$rootScope.$on('$routeChangeError', function () {
				$rootScope.loading = false;
			});
		}
	]);

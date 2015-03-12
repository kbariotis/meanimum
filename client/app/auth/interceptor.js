angular.module('app.interceptor', [])
	.factory('AuthInterceptor', ['$q', '$injector', '$localStorage',
															 function ($q, $injector, $localStorage) {
		'use strict';

		return {
			request: function (config) {
				var token;
				if ($localStorage.auth_token) {
					token = $localStorage.auth_token;
				}
				if (token) {
					config.headers.Authorization = 'Bearer ' + token;
				}
				return config;
			},
			responseError: function (response) {
				if (response.status === 401 || response.status === 403) {
					delete $localStorage.auth_token;
					$injector.get('$location').path('/login');
				}
				return $q.reject(response);
			}
		};
	}])
	.config(['$httpProvider', function ($httpProvider) {
		$httpProvider.interceptors.push('AuthInterceptor');
	}]);

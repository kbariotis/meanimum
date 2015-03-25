angular.module('app.auth', ['ngStorage'])

	.factory('Auth', ['$q', '$http', '$localStorage', function ($q, $http, $localStorage) {
		'use strict';

		return {
			isAuthenticated: function () {
				return $localStorage.auth_token;
			},
			login: function (credentials) {
				var deferred = $q.defer();

				$http.post('/v1/auth/login', credentials)
					.success(function (result) {
						$localStorage.auth_token = result.token;
						deferred.resolve(result.token);
					})
					.error(function (result, status) {
						deferred.reject(result);
					});

				return deferred.promise;
			},
			logout: function () {
				delete $localStorage.auth_token;
			},
			register: function (formData) {
				var deferred = $q.defer();

				delete $localStorage.auth_token;

				$http.post('/v1/auth/register', formData)
					.success(function (result) {
						$localStorage.auth_token = result.token;
						deferred.resolve(result.token);
					});

				return deferred.promise;

			}
		};
	}]);

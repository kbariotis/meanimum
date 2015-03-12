'use strict';

describe('app.login module', function() {
	var $scope;

	beforeEach(module('app.auth'));
	beforeEach(module('app.login'));
	beforeEach(inject(function($rootScope, $controller) {
		$scope = $rootScope.$new();
		$controller('LoginCtrl', {$scope: $scope});
	}));

	describe('login controller', function(){

		it('should be defined', inject(function($controller) {
			expect($scope).toBeDefined();
		}));

		it('should has login()', inject(function($rootScope, $controller) {
			expect($scope.login).toBeDefined();
		}));

	});
});

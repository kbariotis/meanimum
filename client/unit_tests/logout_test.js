'use strict';

describe('app.login module', function() {
	var $scope;

	beforeEach(module('app.auth'));
	beforeEach(module('app.login'));
	beforeEach(inject(function($rootScope, $controller) {
		$scope = $rootScope.$new();
		$controller('LogoutCtrl', {$scope: $scope});
	}));

	describe('logout controller', function(){

		it('should be defined', inject(function() {
			expect($scope).toBeDefined();
		}));

	});
});

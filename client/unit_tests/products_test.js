'use strict';

describe('app.products module', function() {
	var $scope;

	beforeEach(module('app.products'));

	beforeEach(inject(function($rootScope, $controller) {
		$scope = $rootScope.$new();
		$controller('ProductsIndexCtrl', {$scope: $scope});
	}));

	describe('products controller', function(){

		it('should be defined', inject(function() {
			expect($scope).toBeDefined();
		}));

		it('should has populated products', inject(function() {
			setTimeout(function(){
				expect($scope.products).toBeDefined();
			}, 2000);
		}));

	});
});

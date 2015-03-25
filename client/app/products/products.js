angular.module('app.products', ['ngResource', 'ngRoute'])

	.config([
		'$routeProvider', function ($routeProvider) {
			'use strict';

			$routeProvider

				.when('/products', {
					templateUrl: 'app/products/templates/index.html',
					controller: 'ProductsIndexCtrl'
				})

				.when('/products/view/:productId', {
					templateUrl: 'app/products/templates/form.html',
					controller: 'ProductsEditCtrl'
				})

				.when('/products/new', {
					templateUrl: 'app/products/templates/form.html',
					controller: 'ProductsNewCtrl'
				});
		}
	])

	.factory('Products', [
		'$resource', function ($resource) {
			return $resource(
				'/v1/products/:productId',
				{
					productId: '@id',
					category: '@category',
					shop: '@shop',
					model: '@model',
					manufacturer: '@manufacturer'
				},
				{
					'update': {method: 'PUT', params: {productId: '@productId'}}
				}
			);
		}
	])

	.controller('ProductsIndexCtrl', [
		'$scope', 'Products',
		function ($scope, Products) {
			'use strict';

			var products = Products.query(function () {
				$scope.noProducts = !products.length;
				$scope.products = products;
			});

			$scope.filterByCategory = function (category) {
				Products.query({category: category}, function (products) {
					$scope.products = products;
				});
			};
			$scope.filterByModel = function (model) {
				Products.query({model: model}, function (products) {
					$scope.products = products;
				});
			};
			$scope.filterByShop = function (shop) {
				Products.query({shop: shop}, function (products) {
					$scope.products = products;
				});
			};
			$scope.filterByManufacturer = function (manufacturer) {
				Products.query({manufacturer: manufacturer}, function (products) {
					$scope.products = products;
				});
			};

		}
	])

	.controller('ProductsEditCtrl', [
		'$scope', '$routeParams', '$location', 'Products',
		function ($scope, $routeParams, $location, Products) {
			'use strict';

			var product = Products.get({productId: $routeParams.productId}, function () {
				$scope.product = product;
			});

			$scope.remove = function () {
				Products.delete({productId: product._id});
				$location.path('/products');
			};

			$scope.save = function () {
				Products.update({productId: product._id}, product);
			};

		}
	])

	.controller('ProductsNewCtrl', [
		'$scope', '$location', 'Products',
		function ($scope, $location, Products) {
			'use strict';

			var product = new Products();

			$scope.product = product;

			$scope.save = function () {
				product.$save();
				$location.path('/products');
			};

		}
	]);

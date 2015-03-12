'use strict';

describe('app.auth module', function() {

	//beforeEach(module('app'));
	beforeEach(module('app.auth'));

	describe('auth Factory', function(){

		it('should be defined', inject(function(Auth) {
			expect(Auth).toBeDefined();
		}));

	});
});

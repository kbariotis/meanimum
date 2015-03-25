var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var config = require('../app/config');

describe('Products', function () {
	var url = 'http://localhost:9090/v1';
	var userToken = '';
	var videoId = '';

	before(function (done) {

		mongoose.connect(config.mongo.uri, function () {
			mongoose.connection.db.dropDatabase(function () {

				request(url)
					.post('/auth/register')
					.send({
						email: 'odysseus@ithaca.gr',
						password: 'odysseus',
						passwordConfirmation: 'odysseus'
					})
					.expect(200)
					.end(function (err, res) {
						if (err) {
							throw err;
						}
						userToken = res.body.token;
						done();
					});
			})
		});
	});

	describe('Products Endpoint', function () {
		it('should create a product successfully', function (done) {
			request(url)
				.post('/products')
				.set('Authorization', 'Bearer ' + userToken)
				.send({
					name: 'name',
					model: 'model',
					manufacturer: 'manufacturer',
					category: 'category',
					description: 'description',
					comments: 'comments',
					partno: 'partno',
					ean: 23,
					upc: 32131
				})
				.expect(200)
				.end(function (err, res) {
					if (err) {
						throw err;
					}

					videoId = res.body.id;

					done();
				});
		});
		it('should report about required fields', function (done) {
			request(url)
				.post('/products')
				.set('Authorization', 'Bearer ' + userToken)
				.send({
					manufacturer: 'manufacturer',
					category: 'category',
					description: 'description',
					comments: 'comments',
					partno: 'partno',
					ean: 23,
					upc: 32131
				})
				.expect(400)
				.end(function (err, res) {
					if (err) {
						throw err;
					}
					done();
				});
		});
		it('should return a collection of Products', function (done) {
			request(url)
				.get('/products')
				.set('Authorization', 'Bearer ' + userToken)
				.expect(200)
				.end(function (err, res) {
					if (err)
						throw err;

					done()
				});
		});
		it('should return a collection of Products filtered by category', function (done) {
			request(url)
				.post('/products')
				.set('Authorization', 'Bearer ' + userToken)
				.send({
					name: 'name',
					model: 'model',
					manufacturer: 'manufacturer',
					category: 'category1',
					description: 'description',
					comments: 'comments',
					partno: 'partno',
					ean: 23,
					upc: 32131
				})
				.expect(200)
				.end(function(err, res){});

			request(url)
				.post('/products')
				.set('Authorization', 'Bearer ' + userToken)
				.send({
					name: 'name',
					model: 'model',
					manufacturer: 'manufacturer',
					category: 'category2',
					description: 'description',
					comments: 'comments',
					partno: 'partno',
					ean: 23,
					upc: 32131
				})
				.expect(200)
				.end(function(err, res){});

			request(url)
				.get('/products?category=category1')
				.set('Authorization', 'Bearer ' + userToken)
				.expect(200)
				.end(function (err, res) {
					if (err)
						throw err;

					should(res.body.length).equal(1);
					done()
				});
		});
		it('should return one product', function (done) {
			request(url)
				.get('/products/' + videoId)
				.set('Authorization', 'Bearer ' + userToken)
				.expect(200)
				.end(function (err, res) {
					if (err)
						throw err;

					should(res.body.name).equal('name');

					done()
				});
		});
		it('should update one product', function (done) {
			request(url)
				.put('/products/' + videoId)
				.set('Authorization', 'Bearer ' + userToken)
				.send({
					category: 'updatedCategory'
				})
				.expect(200)
				.end(function (err, res) {});

			request(url)
				.get('/products/' + videoId)
				.set('Authorization', 'Bearer ' + userToken)
				.expect(200)
				.end(function (err, res) {
					if (err)
						throw err;

					should(res.body.name).equal('name');

					should(res.body.category).equal('updatedCategory');

					done()
				});
		});
		it('should delete one product', function (done) {
			request(url)
				.delete('/products/' + videoId)
				.set('Authorization', 'Bearer ' + userToken)
				.expect(200)
				.end(function (err, res) {
					if (err)
						throw err;

					done()
				});
		});
	});
});

var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var config = require('../app/config');

describe('Main', function () {
	var url = 'http://localhost:9090/v1';

	before(function (done) {
		mongoose.connect(config.mongo.uri, function(){
			mongoose.connection.db.dropDatabase(function(){
				done();
			})
		});
	});

	describe('Authentication', function () {
		it('should return error when trying to access restricted area without Auth header', function (done) {
			request(url)
				.get('/products')
				.expect(401)
				.end(function (err, res) {
					if (err) {
						throw err;
					}

					done();
				});
		});
		it('should register user', function (done) {
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
					done();
				});
		});
		it('should report an error on bad user input', function (done) {
			request(url)
				.post('/auth/register')
				.send({
					email: 'odysseus@ithaca.gr',
					password: 'odysseus',
					passwordConfirmation: 'notcorrectconfirmation'
				})
				.expect(400)
				.end(function (err, res) {
					if (err) {
						throw err;
					}
					done();
				});
		});
		it('should report an error on failed login', function (done) {
			request(url)
				.post('/auth/login')
				.send({
					email: 'odysseus@ithaca.gr',
					password: 'wrongpassword'
				})
				.expect(401)
				.end(function (err, res) {
					if (err) {
						throw err;
					}
					done();
				});
		});
		it('should return JSON Web Token on successful login', function (done) {
			request(url)
				.post('/auth/login')
				.send({
					email: 'odysseus@ithaca.gr',
					password: 'odysseus'
				})
				.expect(200)
				.end(function (err, res) {
					if (err) {
						throw err;
					}
					done();
				});
		});
	});
});

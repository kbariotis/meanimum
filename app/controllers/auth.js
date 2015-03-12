/**
 * app/controllers/auth.js
 * @type {exports}
 */

var UserModel = require('../models/user'),
	InternalServerError = require('../errors/internal'),
	InvalidArgumentError = require('../errors/invalidArgument'),
	NotAuthorizedError = require('../errors/unauthorized');

/**
 * Authorization/Authentication Controller
 * @constructor
 */
var AuthController = function () {};

/**
 * Handle Register requests
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
AuthController.prototype.register = function (req, res, next) {

	var password = req.body.password || '';
	var email = req.body.email || '';
	var passwordConfirmation = req.body.passwordConfirmation || '';

	if (password == '' || password != passwordConfirmation) {
		var err = new InvalidArgumentError();
		err.message = 'Password and Password confirmation do not match.';
		return next(err);
	}

	UserModel.findOne({email: email})
		.exec()
		.then(function (user) {

			if (user) {
				var err = new InvalidArgumentError();
				err.message = 'Email already exists';
				return next(err);
			}

			if (user == undefined) {

				var newUser = new UserModel({
					password: password,
					email: email
				});

				newUser.save(function (err, user) {
					if (err) {
						var err = new InternalServerError();
						err.message = 'Error on registration';
						return next(err);
					}

					user.generateToken(function (err, token) {
						return res.status(200).send({token: token});
					});
				});
			}
		}, function () {
			var err = new InternalServerError();
			err.message = 'Error on Registration';
			return next(err);
		});
};

/**
 * Handle the login proccess
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
AuthController.prototype.login = function (req, res, next) {
	var password = req.body.password || '';
	var email = req.body.email || '';

	if (password == '' || email == '') {
		var err = new InvalidArgumentError();
		err.message = 'username or password fields are empty';
		return next(err);
	}

	UserModel.findOne({email: email})
		.exec()
		.then(function (user) {

			if (user == undefined) {
				var err = new InvalidArgumentError();
				err.message = 'This Email does not exists.';
				return next(err);
			}

			user.comparePassword(password, function (err, isMatch) {
				if (!isMatch) {
					var err = new NotAuthorizedError();
					err.message = 'Password/Username do not match';
					return next(err);
				}

				user.generateToken(function (err, token) {
					return res.status(200).send({token: token});
				});

			});
		}, function (err) {
			var err = new Error();
			err.message = 'Username or Password fields are empty';
			err.status = 401;
			return next(err);
		});
};

module.exports = new AuthController();

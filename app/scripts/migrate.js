/**
 * app/scripts/migrate.js
 * @type {exports}
 */

var UserModel = require('../models/user');

module.exports = function () {

	UserModel.findOne({username: 'test@gmail.com'}, function (err, user) {

		if (user == undefined) {

			var newUser = new UserModel({
				password: 'test1234',
				email: 'test@gmail.com'
			});

			newUser.save(function (user) {
				console.log('Dummy user imported');
			});
		}

	});

};

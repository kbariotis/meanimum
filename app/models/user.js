/**
 * app/models/user.js
 */

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt'),
	SALT_WORK_FACTOR = 10,
	jwt = require('jsonwebtoken'),
	cfg = require('../config'),
	secretKey = cfg.secret_key;

var UserSchema = new Schema({
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	created: {type: Date, default: Date.now}
});

/**
 * Generate Password Hash right before save
 */
UserSchema.pre('save', function (next) {
	var user = this;

	if (!user.isModified('password'))
		return next();

	bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
		if (err)
			return next(err);

		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err)
				return next(err);
			user.password = hash;
			next();
		});

	});

});

/**
 * Compare passwords
 * @param pwd
 * @param cb
 */
UserSchema.methods.comparePassword = function (pwd, cb) {
	bcrypt.compare(pwd, this.password, function (err, isMatch) {
		if (err)
			return cb(err);

		cb(null, isMatch);
	});
};

/**
 * Generate JSON Web Token
 * @param cb
 */
UserSchema.methods.generateToken = function (cb) {
	var token = jwt.sign({
		created: this.created,
		email: this.email
	}, secretKey, {expiresInMinutes: 60});

	cb(null, token);
};

module.exports = mongoose.model('User', UserSchema);

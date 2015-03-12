/**
 * Describe an Invalid Argument Error
 *
 * app/errors/internal.js
 */

var util = require('util');

function InvalidArgumentError(message) {
	Error.call(this);
	Error.captureStackTrace(this, arguments.callee);
	this.message = message;
	this.status = 400;
}

util.inherits(InvalidArgumentError, Error);

module.exports = InvalidArgumentError;

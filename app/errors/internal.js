/**
 * Describe an Internal Server Error
 *
 * app/errors/internal.js
 */

var util = require('util');

function InternalServerError(message) {
	Error.call(this);
	Error.captureStackTrace(this, arguments.callee);
	this.message = message;
	this.status = 500;
}

util.inherits(InternalServerError, Error);

module.exports = InternalServerError;

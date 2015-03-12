/**
 * Describe an Anauthorized Error
 *
 * app/errors/internal.js
 */

var util = require('util');

function AnuthorizedError(message) {
	Error.call(this);
	Error.captureStackTrace(this, arguments.callee);
	this.message = message;
	this.status = 401;
}

util.inherits(AnuthorizedError, Error);

module.exports = AnuthorizedError;

/**
 * Describe an Not Found Error
 *
 * app/errors/internal.js
 */

var util = require('util');

function NotFoundError(message) {
	Error.call(this);
	Error.captureStackTrace(this, arguments.callee);
	this.message = message;
	this.status = 404;
}

util.inherits(NotFoundError, Error);

module.exports = NotFoundError;

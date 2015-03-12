var env = process.env.NODE_ENV || 'development'
	, cfg = require('./config.'+env);

// Make sure to set NODE_ENV
module.exports = cfg;

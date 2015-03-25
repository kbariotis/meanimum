var config = require('./config.global');

config.env = 'development';

config.version = 'v1';

config.host = 'http://exerciseio.herokuapp.com';
config.path = '/' + config.version;
config.port = process.env.PORT || 8080;

config.mongo.db = 'exerciseio';
config.mongo.uri = process.env.MONGOLAB_URI ||
									 process.env.MONGOHQ_URL ||
									 'mongodb://localhost/' + config.mongo.db;

module.exports = config;

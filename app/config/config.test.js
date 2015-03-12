var config = require('./config.global');

config.env = 'test';

config.version = '0.1';

config.host = 'http://localhost';
config.path = '/' + config.version;
config.port = 9090;

config.mongo.db = 'exerciseio_test';
config.mongo.uri = 'mongodb://localhost/' + config.mongo.db;

module.exports = config;

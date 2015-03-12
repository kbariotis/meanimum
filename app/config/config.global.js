var config = {};

config.env = 'test';

config.secret_key = 'ThisIsWhatHappensWhenYouChooseDevForLiving';

config.version = '0.1';

config.host = 'http://localhost';
config.path = '/' + config.version;
config.port = 9090;

config.mongo = {};
config.mongo.uri = 'mongodb://localhost/';

module.exports = config;

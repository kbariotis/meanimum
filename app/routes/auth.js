/**
 * app/routes/auth.js
 * @type {exports}
 */

var AuthController = require('../controllers/auth'),
	express = require('express');

var auth = express.Router();

auth.post('/register', AuthController.register);
auth.post('/login', AuthController.login);

module.exports.auth = auth;

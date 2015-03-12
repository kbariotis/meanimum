/**
 * app/routes/product.js
 * @type {exports}
 */

var ProductController = require('../controllers/product'),
	cfg = require('../config'),
	expressJwt = require('express-jwt'),
	express = require('express');

var products = express.Router();

products.use(expressJwt({secret: cfg.secret_key}));

products.get('/', ProductController.get);
products.get('/:id', ProductController.getOne);
products.delete('/:id', ProductController.remove);
products.put('/:id', ProductController.update);
products.post('/', ProductController.create);

module.exports.products = products;

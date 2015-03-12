/**
 * app/controllers/product.js
 * @type {exports}
 */

var InvalidArgumentError = require('../errors/invalidArgument'),
	InternalServerError = require('../errors/internal'),
	ProductModel = require('../models/product');

var ProductController = function () {};

/**
 * Find one Product by Id
 *
 * @param req
 * @param res
 * @param next
 */
ProductController.prototype.getOne = function (req, res, next) {
	var id = req.params.id;

	ProductModel.findOne({_id: id}, function (err, product) {
		if (err) {
			var error = new InternalServerError('Internal Server Error: problem finding row');
			return next(error);
		}

		res.status(200).send(product);
	});
};

/**
 * Get a collection of Products
 *
 * @param req
 * @param res
 * @param next
 */
ProductController.prototype.get = function (req, res, next) {

	var shop = req.query.shop || null;
	var model = req.query.model || null;
	var manufacturer = req.query.manufacturer || null;
	var category = req.query.category || null;

	var query = {};
	if (shop) query.shop = shop;
	if (model) query.model = model;
	if (manufacturer) query.manufacturer = manufacturer;
	if (category) query.category = category;

	ProductModel.find(query,
		function (err, data) {
			if (err) {
				var error = new InternalServerError('Internal Server Error: problem saving product to DB');
				return next(error);
			}


			return res.status(200).send(data);
		});

};

/**
 * Create a Product
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
ProductController.prototype.create = function (req, res, next) {

	var name = req.body.name || '';
	var model = req.body.model || '';
	var manufacturer = req.body.manufacturer || '';
	var category = req.body.category || '';
	var description = req.body.description || '';
	var comments = req.body.comments || '';
	var partno = req.body.partno || '';
	var ean = req.body.ean || '';
	var upc = req.body.upc || '';

	if (name == '' || model == '' || manufacturer == '') {
		var err = new InvalidArgumentError('Name, Model, Manufacturer fields are required');
		return next(err);
	}

	var newProduct = new ProductModel({
		name: name,
		model: model,
		manufacturer: manufacturer,
		category: category,
		description: description,
		comments: comments,
		partno: partno,
		ean: ean,
		upc: upc
	});

	newProduct.save(function (err, data) {
		if (err) {
			var error = new InternalServerError('Internal Server Error: problem saving product to DB');
			return next(error);
		}

		return res.status(200).send({'id': data._id});
	});

};

/**
 * Update a Product
 *
 * @param req
 * @param res
 * @param next
 */
ProductController.prototype.update = function (req, res, next) {
	var id = req.params.id;

	var name = req.body.name || '';
	var model = req.body.model || '';
	var manufacturer = req.body.manufacturer || '';
	var category = req.body.category || '';
	var description = req.body.description || '';
	var comments = req.body.comments || '';
	var partno = req.body.partno || '';
	var ean = req.body.ean || '';
	var upc = req.body.upc || '';

	var doc = {};
	if (name) doc.name = name;
	if (model) doc.model = model;
	if (manufacturer) doc.manufacturer = manufacturer;
	if (category) doc.category = category;
	if (description) doc.description = description;
	if (comments) doc.comments = comments;
	if (partno) doc.partno = partno;
	if (ean) doc.ean = ean;
	if (upc) doc.upc = upc;

	ProductModel.update({_id: id}, doc, function (err) {
		if (err) {
			var error = new InternalServerError('Internal Server Error: problem updating row');
			return next(error);
		}

		res.status(200).send();
	});

};

/**
 * Remove a Product
 *
 * @param req
 * @param res
 * @param next
 */
ProductController.prototype.remove = function (req, res, next) {
	var id = req.params.id;

	ProductModel.findOne({_id: id}).remove(function (err) {
		if (err) {
			var error = new InternalServerError('Internal Server Error: problem finding row');
			return next(error);
		}

		res.status(200).send();
	});
};

module.exports = new ProductController();

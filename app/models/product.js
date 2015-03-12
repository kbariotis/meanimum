/**
 * app/models/product.js
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
	name: {type: String, required: true},
	model: {type: String, required: true},
	manufacturer: {type: String, required: true},
	category: {type: String},
	description: {type: String}
});

module.exports = mongoose.model('Product', ProductSchema);

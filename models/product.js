var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	pictureUrl: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("product", productSchema);

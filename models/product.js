var mongoose = require("mongoose");

var productSchema = mongoose.Schema(
	{
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
		slDaBan: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{versionKey: false}
);

module.exports = mongoose.model("product", productSchema);

var mongoose = require("mongoose");

var orderSchema = mongoose.Schema(
	{
		userId: {
			type: String,
			require: true,
		},
		dateCreated: {
			type: Date,
			default: Date.now(),
		},
		address: {
			type: String,
			require: true,
		},
		phone: {
			type: String,
			require: true,
		},
		products: {
			type: [{product: {type: Object, required: true}, quantity: {type: Number, required: true}}],
			required: true,
		},
		total: {
			type: Number,
			required: true,
		},
	},
	{versionKey: false}
);

module.exports = mongoose.model("order", orderSchema);

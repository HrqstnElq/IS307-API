var mongoose = require("mongoose");

var orderSchema = mongoose.Schema({
	userId: {
		type: String,
		require: true,
	},
	dateCreated: {
		type: Date,
		default: Date.now(),
	},
	products: {
		type: [{product: {type: Object, required: true}, quantity: {type: Number, required: true}}],
		required: true,
	},
	total: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model("order", orderSchema);

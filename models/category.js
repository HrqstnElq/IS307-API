var mongoose = require("mongoose");

var categorySchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		pictureUrl: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			required: true,
		},
	},
	{versionKey: false}
);

module.exports = mongoose.model("category", categorySchema);

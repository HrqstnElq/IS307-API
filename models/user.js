var mongoose = require("mongoose");

var userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		favorite: {
			type: [],
			default: [],
		},
	},
	{versionKey: false}
);

module.exports = mongoose.model("user", userSchema);

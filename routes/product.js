const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Category = require("../models/category");
const User = require("../models/user");

router.get("/", (req, res) => {
	Product.find({category: req.query.category || {$regex: ".*"}})
		.then((products) => {
			res.json(products);
		})
		.catch(() => {
			res.status(500).json({message: "Error"});
		});
});

router.get("/top", (req, res) => {
	Product.find(
		{},
		[], // Columns to Return
		{
			skip: 0, // Starting Row
			limit: 20, // Ending Row
			sort: {
				slDaBan: -1, //Sort by slDaBan DESC
			},
		},
		function (err, products) {
			res.json(products);
		}
	);
});

router.get("/categories", (req, res) => {
	Category.find({})
		.then((categories) => {
			res.json(categories);
		})
		.catch(() => {
			res.status(500).json({message: "Error"});
		});
});

router.get("/checkFavorite/:productId", auth, (req, res) => {
	User.findById(req.body.userId)
		.then((user) => {
			if (user) {
				var product = user.favorite.find((x) => x._id == req.params.productId);
				if (product) {
					res.status(200).send();
				} else {
					res.status(204).send();
				}
			} else {
				res.status(500).json({message: "user not exist"});
			}
		})
		.catch(() => {
			res.status(500).json({message: "Error"});
		});
});

module.exports = router;

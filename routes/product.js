const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Category = require("../models/category");

router.get("/", (req, res) => {
	Product.find({category: req.query.category || {$regex: ".*"}})
		.then((products) => {
			res.json(products);
		})
		.catch(() => {
			res.status(500).json({message: "Error"});
		});
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

module.exports = router;

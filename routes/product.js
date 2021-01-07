const express = require("express");
const router = express.Router();
const Product = require("../models/product");

router.get("/", (req, res) => {
	Product.find({category: req.query.category || {$regex: ".*"}}).then((products) => {
		res.json(products);
	});
});

module.exports = router;

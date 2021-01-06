const express = require("express");
const router = express.Router();
const Category = require("../../models/category");
const Product = require("../../models/product");

// get all /product
// get category product?category=value
router.get("/", (req, res) => {
	Product.find({category: req.query.category || {$regex: ".*"}}).then((products) => {
		res.render("product.ejs", {products: products});
	});
});

router.get("/add", (req, res) => {
	Category.find({}).then((categories) => {
		res.render("add_product.ejs", {categories: categories});
	});
});

router.post("/add", (req, res) => {
	new Product(req.body)
		.save()
		.then(() => {
			res.redirect("/admin");
		})
		.catch((err) => res.status(500).json(err));
});

router.get("/:id", (req, res) => {
	Product.findById(req.params.id)
		.then((product) => {
			Category.find({}).then((categories) => {
				res.render("edit_product.ejs", {product: product, categories: categories});
			});
		})
		.catch((err) => res.status(500).json(err));
});

router.post("/:id", (req, res) => {
	Product.findByIdAndUpdate(req.params.id, req.body)
		.then((doc) => {
			res.redirect("/admin/product");
		})
		.catch((err) => res.status(500).json(err));
});

router.delete("/:id", (req, res) => {
	Product.findByIdAndDelete(req.params.id, (err) => {
		if (err) res.status(500).json(err);
		else res.json({message: "delete success"});
	});
});

module.exports = router;

const express = require("express");
const router = express.Router();

const Category = require("../../models/category");
const Product = require("../../models/product");

//get all category
router.get("/", (req, res) => {
	Category.find({}).then((categories) => {
		res.render("category.ejs", {categories: categories});
	});
});

router.get("/add", (req, res) => {
	res.render("add_category.ejs");
});

router.post("/add", (req, res) => {
	new Category(req.body)
		.save()
		.then(() => {
			res.redirect("/admin/category");
		})
		.catch(() => {
			res.status(500).json({message: "Failed to save"});
		});
});

router.get("/:id", (req, res) => {
	Category.findById(req.params.id).then((category) => {
		res.render("edit_category", {category: category});
	});
});

router.post("/:id", (req, res) => {
	console.log(req.body);
	Category.findByIdAndUpdate(req.params.id, req.body)
		.then(async (category) => {
			await Product.updateMany({category: category.name}, {category: req.body.name});
			res.redirect("/admin/category");
		})
		.catch((err) => res.status(500).json(err));
});

module.exports = router;

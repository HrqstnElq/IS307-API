const express = require("express");
const router = express.Router();
const Product = require("../models/product");

/**
 * @swagger
 * tags:
 *   name: product
 *   description: Get products
 */

/**
 * @swagger
 * /product:
 *   get:
 *     description: Returns all product or product in category
 *     tags: [product]
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: category
 *     responses:
 *       200:
 *         description: users
 */
router.get("/", (req, res) => {
	Product.find({category: req.query.category || {$regex: ".*"}}).then((products) => {
		res.json(products);
	});
});

module.exports = router;

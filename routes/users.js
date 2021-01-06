const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

const express = require("express");
const router = express.Router();

const User = require("../models/user");
const Product = require("../models/product");
const {findById} = require("../models/product");

/** body :
 * {
 * 	username: string,
 * 	password : string
 * }
 */
router.post("/login", (req, res) => {
	if (req.body.username === undefined || req.body.password === "" || req.body.password === undefined || req.body.password === "") {
		res.status(400).json({message: "Username or password is required"});
	} else {
		User.findOne({username: req.body.username, password: req.body.password})
			.then((user) => {
				if (user) {
					var token = jwt.sign({userId: user._id}, process.env.SECRET_KEY);
					res.json({
						message: "success",
						token: token,
					});
				} else {
					res.status(400).json({message: "Username or password incorrect"});
				}
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	}
});

/** body :
 * {
 * 	name : string,
 *  username : string,
 * 	password :string,
 * 	passwordConfirm : string
 * }
 */
router.post("/register", (req, res) => {
	User.findOne({username: req.body.username})
		.then((user) => {
			if (user) {
				res.status(500).json({
					message: "User already exists",
				});
			} else {
				if (req.body.password === req.body.passwordConfirm) {
					new User({
						name: req.body.name,
						username: req.body.username,
						password: req.body.password,
					})
						.save()
						.then(() => {
							res.json({
								message: "Register successfully",
							});
						})
						.catch((err) => {
							res.status(500).json(err);
						});
				} else {
					res.status(500).json({
						message: "PasswordConfirm incorrect",
					});
				}
			}
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

//add product to favorite list
router.get("/favorite/:productId", auth, (req, res) => {
	Product.findById(req.params.productId)
		.then((product) => {
			User.findById(req.body.userId)
				.then((user) => {
					user.favorite.push(product);
					user.save()
						.then(() => {
							res.json({message: "favorite successfully"});
						})
						.catch(() => {
							res.status(500).json({message: "failed to save"});
						});
				})
				.catch((err) => res.status(500).json(err));
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

//remove product to favorite list
router.delete("/favorite/:productId", auth, (req, res) => {
	User.findById(req.body.userId)
		.then((user) => {
			Product.findById(req.params.productId)
				.then((product) => {
					user.favorite.pull(product);
					user.save()
						.then(() => {
							res.json({message: "unfavorite successfully"});
						})
						.catch(() => {
							res.json({message: "failed to save"});
						});
				})
				.catch(() => {
					res.json({message: "productId not found"});
				});
		})
		.catch((err) => res.status(500).json(err));
});

module.exports = router;

const router = require("express").Router();
const Order = require("../../models/order");

router.get("/", (req, res) => {
	Order.find({})
		.then((orders) => {
			res.json(orders);
		})
		.catch((err) => res.status(500).json(err));
});

module.exports = router;

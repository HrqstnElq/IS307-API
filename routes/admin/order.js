const router = require("express").Router();
const Order = require("../../models/order");

router.get("/", (req, res) => {
	Order.find({})
		.then((orders) => {
			res.render("order.ejs", {orders: orders});
		})
		.catch((err) => res.status(500).json(err));
});

router.get("/receive/:orderId", (req, res) => {
	Order.findByIdAndUpdate(req.params.orderId, {
		isReceive: true,
	})
		.then(() => {
			res.sendStatus(200);
		})
		.catch(() => {
			res.status(500).json({message: "order not found"});
		});
});

module.exports = router;

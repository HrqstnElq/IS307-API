const router = require("express").Router();
const auth = require("../middleware/auth");
const Order = require("../models/order");
const Product = require("../models/product");

router.get("/", auth, (req, res) => {
	Order.find({userId: req.body.userId})
		.then((orders) => {
			res.send(orders);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

/*
{
    "products" : [
    {
        "productId" : string,
        "quantity" : number
    }
]
}
*/
router.post("/", auth, async (req, res) => {
	const products = req.body.products;
	if (products && products.length > 0) {
		// total price : sum(price * quantity)
		let total = 0;
		let list_product = [];
		for (const item of products) {
			try {
				var product = await Product.findById(item.productId);
				list_product.push({
					product: product,
					quantity: item.quantity,
				});

				total += product.price * item.quantity;
			} catch (err) {
				res.status(500).json({message: "productId is not available"});
			}
		}

		new Order({
			userId: req.body.userId,
			products: list_product,
			total: total,
		})
			.save()
			.then(() => {
				res.json({message: "order created successfully"});
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	} else {
		res.status(500).json({message: "Product must be array has length great than 0"});
	}
});

module.exports = router;

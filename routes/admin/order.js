const router = require("express").Router();

router.get("/", (req, res) => {
	res.send("h");
});

module.exports = router;

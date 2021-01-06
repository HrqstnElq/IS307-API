const jwt = require("jsonwebtoken");

//middleware kiem ra token co hop le hay khong
const auth = (req, res, next) => {
	try {
		const token = req.header("x-auth-token");
		if (!token)
			return res.status(401).json({
				message: "token is missing",
			});

		const verified = jwt.verify(token, process.env.SECRET_KEY);
		if (!verified)
			return res.status(401).json({
				message: "Unauthorized",
			});

		req.body.userId = verified.userId;
		next();
	} catch (err) {
		res.status(500).json(err);
	}
};

module.exports = auth;

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();
require("./database");

const port = process.env.PORT || 3001;

//router
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const productRouter = require("./routes/product");
const orderRouter = require("./routes/order");
//routes admin
const adminRouter = require("./routes/admin");
const adminProductRouter = require("./routes/admin/product");
const adminCategoryRouter = require("./routes/admin/category");
const adminOrderRouter = require("./routes/admin/order");

const app = express();

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended: false}));

app.use(logger("dev"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);
app.use("/admin", adminRouter);
app.use("/admin/product", adminProductRouter);
app.use("/admin/category", adminCategoryRouter);
app.use("/admin/order", adminOrderRouter);

app.listen(port, () => {
	console.log(`listening at http://localhost:${port}`);
});
